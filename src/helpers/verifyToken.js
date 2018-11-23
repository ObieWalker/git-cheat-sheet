import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// returns true or false if token is verified
const verifyToken = () => {
  const { token } = window.localStorage;
  let verified;
  // if token exists and verified = true
  if (token) {
    jwt.verify(token, "12345678", (error) => {
      if (error) {
        verified = false;
      } else {
        verified = true;
      }
    });
  } else {
    verified = 0;
  }
  return verified;
};
export default verifyToken;
