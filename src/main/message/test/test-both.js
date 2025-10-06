import { connectUser } from "./utils.js";

connectUser("user1-uuid", "user2-uuid");
connectUser("user2-uuid", "user1-uuid");
