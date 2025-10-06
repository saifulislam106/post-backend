import { io } from "socket.io-client";

export function connectUser(userId, receiverId) {
  const socket = io("http://localhost:4000", {
    query: { userId },
    transports: ['websocket'],
  });

  socket.on("connect", () => {
    console.log(`✅ Connected as ${userId}`);

    // Send message every 5 seconds
    setInterval(() => {
      const msg = {
        senderId: userId,
        receiverId,
        text: `Hello from ${userId} → ${receiverId}`,
      };
      console.log(`📤 Sending:`, msg);
      socket.emit("message", msg);
    }, 5000);
  });

  socket.on("message", (msg) => {
    console.log(`💬 Received (${userId}):`, msg);
  });

  socket.on("disconnect", () => {
    console.log(`❌ Disconnected: ${userId}`);
  });

  socket.on("connect_error", (err) => {
    console.error(`⚠️ Connection error for ${userId}:`, err.message);
  });
}
