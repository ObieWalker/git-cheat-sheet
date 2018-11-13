const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User  = require('../database/models/user');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', function() {

mongoose.connection.db.dropDatabase();

  const users = [
    new User({
      username: "Admin",
      email: "admin@gmail.com",
      password: "brew install git"
    }),
    new User({
      username: "Admin2",
      email: "admin2@gmail.com",
      password: "brew install git"
    })
  ]

  let done = 0

  users.forEach((item) =>{
    item.save()
    .then(savedItem => {
      done++
      if (done === users.length){
        end();
      }
    })
    .catch(err => {
      console.log(err)
    })
  })

  const end = () => {
    mongoose.disconnect();
  }

});