import { connectUser } from "./utils.js";

const userId = "user1-uuid";     // তোমার sender user id
const receiverId = "user2-uuid"; // তোমার receiver user id

connectUser(userId, receiverId);
