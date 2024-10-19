import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtHelper';

// Define a User type with properties id, username, and email
interface User {
  id: string
  // Add more user properties as needed
}

// Extend the Request type to include the user property
interface CustomRequest extends Request {
  user?: User; // Now using a specific type instead of 'any'
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer Token
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const decoded = verifyToken(token);
    console.log(token,decoded)

  if (decoded && typeof decoded === 'object' && 'id' in decoded) {
    req.user = decoded as User; // Cast decoded to User type after checking necessary properties
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
