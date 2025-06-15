import { VercelRequest, VercelResponse } from '@vercel/node';
import { bot, MyContext } from '../src/bot'; // Import bot instance và MyContext từ src/bot.ts
import { getUserIdsFromDatabase } from '../src/database'; // Giả sử bạn có hàm này để lấy user IDs

// Đây chỉ là một ví dụ, bạn cần thay thế bằng logic lấy user IDs thực tế
// Giả sử src/database.ts có một hàm như sau:
// export async function getUserIdsFromDatabase(): Promise<number[]> {
//   // Logic để lấy tất cả chat IDs của người dùng đã bật thông báo
//   // Ví dụ: return [12345, 67890];
//   return []; // Thay thế bằng logic thực tế
// }


export default async function (req: VercelRequest, res: VercelResponse) {
  // Kiểm tra xem yêu cầu có đến từ Vercel Cron không (tùy chọn nhưng được khuyến nghị)
  // Vercel Cron gửi một tiêu đề 'x-vercel-cron-event'
  if (req.headers['x-vercel-cron-event'] !== 'cron') {
    return res.status(401).send('Unauthorized access');
  }

  try {
    console.log('Cron job for sending notifications started!');

    // Lấy danh sách tất cả user IDs từ database của bạn
    // Bạn cần triển khai hàm này để lấy các chat ID mà bạn muốn gửi thông báo
    const userIds = await getUserIdsFromDatabase(); //

    if (userIds.length === 0) {
      console.log('No users to send notifications to.');
      return res.status(200).send('No users found.');
    }

    // Logic gửi thông báo đến từng người dùng
    for (const userId of userIds) {
      try {
        await bot.api.sendMessage(userId, 'Đây là thông báo định kỳ của bạn từ bot!'); //
        console.log(`Notification sent to user: ${userId}`);
      } catch (error) {
        console.error(`Failed to send message to user ${userId}:`, error);
        // Xử lý lỗi cụ thể, ví dụ: xóa người dùng nếu bot bị chặn
      }
    }

    console.log('Cron job for sending notifications finished.');
    return res.status(200).send('Notifications sent successfully!');
  } catch (error) {
    console.error('Error in cron job:', error);
    return res.status(500).send('Error sending notifications.');
  }
}