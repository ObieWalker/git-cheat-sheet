const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User  = require('../database/models/user');
const bcrypt = require('bcrypt');

dotenv.config();

let done = 0
exports.seedUsers = function seedUsers() {
  const users = [
    {
      username: process.env.ADMIN1_USERNAME,
      email: process.env.ADMIN1_EMAIL,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
    },
    {
      username: process.env.ADMIN2_USERNAME,
      email: process.env.ADMIN2_EMAIL,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
    }
  ]

  User.find({}).exec(function (err, collection) {

    users.forEach((user) =>{
      User.create({ 
        username: user.username,
        email: user.email,
        password: user.password
      })
      .then(savedUser => {
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
      console.log("Users document has been seeded")
    }
  })
}
