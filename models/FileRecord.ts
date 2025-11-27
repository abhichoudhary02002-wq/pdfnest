import mongoose from "mongoose";

const FileRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  originalName: String,
  storedName: String,
  tool: String,
  size: Number,
  downloadUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.FileRecord || mongoose.model("FileRecord", FileRecordSchema);
