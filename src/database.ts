import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { User, SessionData } from './type'



export async function getUserIdsFromDatabase(): Promise<number[]> {
  try {
    const enabledUsers = await prisma.user.findMany({
      where: {
        isEnableNoti: true,
      },
      select: {
        chatId: true,
      },
    });
    // Chuyển BigInt về number. Cẩn thận với các chatId quá lớn không vừa với number
    return enabledUsers.map(user => Number(user.chatId));
  } catch (error) {
    console.error('Error fetching user IDs from database:', error);
    throw error;
  } finally {
    // Không đóng kết nối ở đây nếu hàm này được gọi thường xuyên (ví dụ trong mỗi request)
    // Prisma Client quản lý kết nối hiệu quả.
    // await prisma.$disconnect(); // Chỉ đóng khi ứng dụng tắt hẳn
  }
}

export async function readConfigFromFile(filePath: string = './test_data.json'): Promise<Config> {
  try {
    // Read the file content
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Parse JSON content
    const config: Config = JSON.parse(fileContent);

    return config;
  } catch (error) {
    console.error(`Error reading or parsing config file ${filePath}:`, error);
    throw new Error(`Failed to read or parse ${filePath}: ${error.message}`);
  }
}

export async function generateNotifications(sessionData: SessionData, filePath: string = './test_data.json'): Promise<string[]> {
  try {
    // Read config data
    const config = await readConfigFromFile(filePath);

    // Get current time and 12 hours ago threshold
    const now = new Date();
    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);

    // Filter listings
    const notifications = config
      .filter((listing) => {
        // Check if listing matches session criteria
        const matchesType = (sessionData.isProjects && listing.type === 'project') ||
                          (sessionData.isBounties && listing.type !== 'project');
        const matchesSkills = sessionData.skills.length === 0 ||
                            listing.skills.some((skill) => sessionData.skills.includes(skill));
        const matchesLocation = !sessionData.location || listing.region === sessionData.location;
        const matchesTime = new Date(listing.publishedAt) <= twelveHoursAgo;
        const matchesStatus = listing.status === 'OPEN';

        return sessionData.isEnableNoti &&
               matchesType &&
               matchesSkills &&
               matchesLocation &&
               matchesTime &&
               matchesStatus;
      })
      .map((listing) => {
        // Format compensation
        let compensationText = '';
        if (listing.compensationType === 'variable') {
          compensationText = 'Variable Comp';
        } else if (listing.minRewardAsk && listing.maxRewardAsk) {
          compensationText = `${listing.minRewardAsk}-${listing.maxRewardAsk} ${listing.token}`;
        } else if (listing.rewardAmount) {
          compensationText = `${listing.rewardAmount} ${listing.token}`;
        } else {
          compensationText = 'Compensation TBD';
        }

        // Construct notification message
        return `
New Listing Alert!

Title: ${listing.title}
Sponsor: ${listing.sponsor.name}
Reward: ${compensationText}
Link: https://earn.superteam.fun/listings/${listing.type}/${listing.slug}?utm_source=telegrambot
Deadline: ${new Date(listing.deadline).toLocaleString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
})}
        `.trim();
      });

    return notifications;
  } catch (error) {
    console.error('Error generating notifications:', error);
    throw new Error(`Failed to generate notifications: ${error.message}`);
  }
}

export async function getFilteredSessionsMap(): Promise<Map<string, SessionData>> {
  try {
    // Fetch all sessions from the database
    const sessions = await prisma.session.findMany({
      select: {
        key: true,
        value: true,
      },
    });

    // Create a Map to store key -> SessionData
    const sessionMap = new Map<string, SessionData>();

    // Iterate through sessions, parse value, and filter
    for (const session of sessions) {
      try {
        // Parse the value string to SessionData object
        const sessionData: SessionData = JSON.parse(session.value);

        // Check if session meets filter criteria
        if (sessionData.hasSet === true && sessionData.isEnableNoti === true) {
          sessionMap.set(session.key, sessionData);
        }
      } catch (parseError) {
        console.error(`Error parsing session value for key ${session.key}:`, parseError);
        continue; // Skip invalid sessions
      }
    }

    return sessionMap;
  } catch (error) {
    console.error('Error fetching sessions from database:', error);
    throw error;
  }
}

// Hàm để kiểm tra kết nối database
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    // Thử truy vấn một cái gì đó đơn giản để đảm bảo kết nối hoạt động
    // Ví dụ: đếm số lượng người dùng
    await prisma.user.count();
    console.log('Database connection successful!');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  } finally {
    // Không đóng kết nối ở đây để tránh mở lại kết nối cho mỗi yêu cầu
    // prisma.$disconnect() chỉ nên gọi khi ứng dụng tắt
  }
}

// Export prisma client để các module khác có thể sử dụng (ví dụ để lưu user mới)
export { prisma };