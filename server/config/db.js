import mongoose from "mongoose";
import dns from "node:dns/promises";
import net from "node:net";

export const connectDB = async () => {
  try {
    // Fix DNS issue on local Windows environment
    dns.setServers(["1.1.1.1", "8.8.8.8"]);

    const records = await dns.resolveSrv(
      "_mongodb._tcp.cluster0.rtp5lls.mongodb.net"
    );

    console.log("MongoDB SRV records:", records);

    const host = records[0].name;

    const socket = net.createConnection({
      host,
      port: 27017,
      timeout: 5000,
    });

    socket.on("connect", () => {
      console.log("TCP CONNECTION SUCCESS:", host);
      socket.destroy();
    });

    socket.on("error", (err) => {
      console.log("TCP CONNECTION ERROR:", err.message);
    });

    socket.on("timeout", () => {
      console.log("TCP CONNECTION TIMEOUT");
      socket.destroy();
    });

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("DB Error:", err);
    throw err;
  }
};