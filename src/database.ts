// Import các thư viện database cần thiết (bỏ comment và uncomment dòng phù hợp với database của bạn)
// import { Pool } from 'pg'; // Cho PostgreSQL
// import { MongoClient, Collection } from 'mongodb'; // Cho MongoDB

/**
 * Interface cho cấu trúc người dùng trong database của bạn.
 * Điều chỉnh interface này để khớp với schema thực tế của bạn.
 */
interface User {
  id?: string; // ID nội bộ của database (nếu có)
  chatId: number; // Telegram Chat ID
  isEnableNoti: boolean; // Cờ bật/tắt thông báo
  // Thêm các trường khác của người dùng nếu cần, ví dụ: skills, settings, v.v.
}

// --- Cấu hình Database (chọn một phần và điền thông tin của bạn) ---

// ############## VÍ DỤ 1: SỬ DỤNG MẢNG TRONG BỘ NHỚ (CHỈ ĐỂ TEST CỤC BỘ) ##############
// KHÔNG DÙNG CÁI NÀY TRONG MÔI TRƯỜNG SẢN XUẤT! Dữ liệu sẽ bị mất khi khởi động lại server.
const inMemoryUsers: User[] = [
  { chatId: 1306365691, isEnableNoti: true }, // Thay bằng Telegram Chat ID thật của bạn để test
//   { chatId: 987654321, isEnableNoti: true },
//   { chatId: 112233445, isEnableNoti: false }, // Người dùng này sẽ không nhận thông báo
];

// ############## VÍ DỤ 2: CẤU HÌNH CHO PostgreSQL ##############
/*
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Đảm bảo bạn có biến môi trường này
  ssl: {
    rejectUnauthorized: false // Chỉ sử dụng nếu bạn gặp lỗi SSL và hiểu rủi ro bảo mật
  }
});
*/

// ############## VÍ DỤ 3: CẤU HÌNH CHO MongoDB ##############
/*
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'telegram_bot_db';
let client: MongoClient;
let usersCollection: Collection<User>;

async function connectToMongo() {
  if (client && client.isConnected()) {
    return; // Đã kết nối
  }
  client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(DB_NAME);
  usersCollection = db.collection<User>('users'); // 'users' là tên collection của bạn
  console.log('Connected to MongoDB!');
}
*/

// --- Hàm lấy User IDs ---

/**
 * Lấy danh sách Telegram Chat IDs của tất cả người dùng đã bật thông báo.
 * @returns {Promise<number[]>} Một mảng các chat IDs.
 */
export async function getUserIdsFromDatabase(): Promise<number[]> {
  try {
    // ############## CHỌN MỘT TRONG CÁC PHƯƠNG PHÁP DƯỚI ĐÂY ##############

    // --- PHƯƠNG PHÁP 1: SỬ DỤNG MẢNG TRONG BỘ NHỚ (CHỈ ĐỂ TEST CỤC BỘ) ---
    const enabledUsers = inMemoryUsers.filter(user => user.isEnableNoti);
    return enabledUsers.map(user => user.chatId);

    // --- PHƯƠNG PHÁP 2: SỬ DỤNG PostgreSQL ---
    /*
    const result = await pool.query('SELECT "chatId" FROM users WHERE "isEnableNoti" = TRUE');
    return result.rows.map(row => row.chatId);
    */

    // --- PHƯƠNG PHƯƠNG 3: SỬ DỤNG MongoDB ---
    /*
    await connectToMongo(); // Đảm bảo kết nối
    const enabledUsers = await usersCollection.find({ isEnableNoti: true }).toArray();
    return enabledUsers.map(user => user.chatId);
    */

    // ############## END CHỌN PHƯƠNG PHÁP ##############

    // Mặc định trả về mảng rỗng nếu không có phương pháp nào được chọn
    console.warn('No database method selected in getUserIdsFromDatabase. Returning empty array.');
    return [];

  } catch (error) {
    console.error('Error fetching user IDs from database:', error);
    // Tùy chọn: ném lỗi hoặc trả về mảng rỗng tùy thuộc vào cách bạn muốn xử lý
    throw error;
  }
}

// Nếu bạn sử dụng MongoDB, bạn có thể muốn export client để đóng kết nối khi cần
/*
export async function closeMongoConnection() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}
*/