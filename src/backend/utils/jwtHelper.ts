import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Use an environment variable in production

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (_) {
    console.log(_)
    return null;
  }
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '7d' }); // Longer expiration for refresh token
};

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey) as { id: string }; // Specify the type of decoded
    const newToken = jwt.sign({ id: decoded.id }, secretKey, { expiresIn: '1h' }); // Generate a new token
    return { token: newToken, refreshToken: token }; // Return both new token and refresh token
  } catch (_) {
    console.log(_);
    return null; // Return null if verification fails
  }
};




