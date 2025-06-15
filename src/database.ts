// src/database.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Interface cho cấu trúc người dùng trong database của bạn.
 * Đồng bộ với model User trong schema.prisma
 */
interface User {
  id: string;
  chatId: bigint; // Sử dụng bigint cho chatId
  isEnableNoti: boolean;
  createdAt: Date;
  updatedAt: Date;
  // ... các trường khác nếu có
}

/**
 * Lấy danh sách Telegram Chat IDs của tất cả người dùng đã bật thông báo.
 * @returns {Promise<number[]>} Một mảng các chat IDs.
 */
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