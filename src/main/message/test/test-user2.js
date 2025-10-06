import { connectUser } from "./utils.js";

const userId = "user2-uuid";     // receiver user
const receiverId = "user1-uuid"; // sender user

connectUser(userId, receiverId);
