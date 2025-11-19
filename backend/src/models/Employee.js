import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, index: 'text' },
  email: { type: String, required: true, unique: true, index: true },
  department: { type: String, index: true },
  role: { type: String, index: true },
  dateOfJoining: { type: Date },
  status: { type: String, enum: ['active','inactive'], default: 'active' }
}, { timestamps: true });

// Text index for name, plus individual indexes above help searches
employeeSchema.index({ name: 'text', email: 1, department: 1, role: 1 });

export default mongoose.model('Employee', employeeSchema);
