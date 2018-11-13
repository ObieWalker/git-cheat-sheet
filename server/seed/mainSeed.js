const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { seedCategory } = require('./seedCategory');

dotenv.config();


mongoose.connect(process.env.MONGODB_URI)

export const end = () => {
  mongoose.disconnect();
}

mongoose.connection.on('connected', function() {

mongoose.connection.db.dropDatabase();
seedCategory()
})