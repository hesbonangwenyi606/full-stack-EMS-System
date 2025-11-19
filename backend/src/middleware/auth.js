import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if(!token) return res.status(401).json({ message: 'Not authorized, no token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if(!roles.includes(req.user?.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
