import express from 'express';
import Employee from '../models/Employee.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protect all employee routes
router.use(protect);

// Create
router.post('/', async (req, res, next) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json(emp);
  } catch (e) { next(e); }
});

// Read (list with search & pagination)
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, q = '', department, role, email, name } = req.query;
    const filter = {};
    if(q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { department: { $regex: q, $options: 'i' } },
        { role: { $regex: q, $options: 'i' } }
      ];
    }
    if(department) filter.department = department;
    if(role) filter.role = role;
    if(email) filter.email = new RegExp(email, 'i');
    if(name) filter.name = new RegExp(name, 'i');

    const skip = (Number(page)-1) * Number(limit);
    const [items, total] = await Promise.all([
      Employee.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Employee.countDocuments(filter)
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total/Number(limit)) });
  } catch (e) { next(e); }
});

// Read single
router.get('/:id', async (req, res, next) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(!emp) return res.status(404).json({ message: 'Not found' });
    res.json(emp);
  } catch (e) { next(e); }
});

// Update
router.put('/:id', async (req, res, next) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!emp) return res.status(404).json({ message: 'Not found' });
    res.json(emp);
  } catch (e) { next(e); }
});

// Delete
router.delete('/:id', async (req, res, next) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if(!emp) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (e) { next(e); }
});

export default router;
