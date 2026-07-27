import dns from "node:dns/promises";

export const connectDB = async () => {
  try {
    console.log(
      await dns.resolveSrv("_mongodb._tcp.cluster0.rtp5lls.mongodb.net")
    );

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("DB Error details:", err);
    throw err;
  }
};