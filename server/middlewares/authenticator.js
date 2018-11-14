import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User  from '../database/models/user';

dotenv.config();

export default class auth {
  static authenticate(req, res, next) {
    const token = req.body.token || req.query.token || req.headers.token;
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: 'Failed to authenticate user'
          });
        }
        User.findOne({ _id: decoded.id })
        .then((user) => {
          if (!user) {
            return res.status(401).json({
              message: 'User account does not exist'
            });
          }
          // the user data is stored
          req.decoded = decoded;
          next();
        });
      });
    } else {
      res.status(403).json({
        message: 'No token, please sign up or sign in'
      });
    }
  }
}
