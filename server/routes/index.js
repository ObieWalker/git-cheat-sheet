import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import Cheat from '../database/models/command';
import Category from '../database/models/category';
import User from '../database/models/user';

const router = express.Router();
let saltRound = 8;

  function getCheats (req, res){
    Cheat.find()
    .populate("category", "name")
    .exec()
    .then ((cheats) => {
      if (cheats) {
        if (cheats.length > 0) {
          res.json({
            success: true,
            cheats
          })
        } else {
          res.status(404)({
            success: false,
            cheats,
            message: "No Content available"
          })
        }
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err
      });
    })
  }

  function getCategories(req, res) {
    Category.find()
    .populate("command", "command description")
    .exec()
    .then ((categories) => {
      if (categories) {
        if (categories.length > 0) {
          res.json({
            success: true,
            categories
          })
        } else {
          res.status(404)({
            success: false,
            categories,
            message: "No Content available"
          })
        }
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err
      });
    })
  }

  function createCheat(req, res){
    const likeCategory = new RegExp(req.body.category, 'i')
    Category.find({ name: likeCategory })
    .then((category) => {
      if (category.length > 0){
        Cheat.create({
          category: category[0]._id,
          command: req.body.command,
          description: req.body.description,
          keywords: [req.body.keywords]
        })
        .then((cheat) => {
          Category.findOneAndUpdate({ _id : category[0]._id }, { $push : { command : cheat._id }})
          res.status(201).json({
            success: true,
            message: `${cheat.command} command has been added to '${category[0].name}'.`,
            cheat
          })
        })
      }
      else {
        Category.create({ name: req.body.category})
        .then((category) => {
          Cheat.create({
            category: category._id,
            command: req.body.command,
            description: req.body.description,
            keywords: [req.body.keywords]
          })
        .then ((cheat) => {
          if (cheat) {
            res.status(201).json({
              success: true,
              message: `${cheat.command} command has been added to '${category.name}'.`,
              cheat
            })
          }
        })
      })
    }
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cheat cannot be added at this time.`,
        err
      })
    })
  }

  function createCategory(req, res){
    const likeCategory = new RegExp(req.body.category, 'i')
    Category.find({ name: likeCategory })
    .then((category) => {
      if (category.length > 0){
        res.status(400).json({
          success: false,
          message: `It seems '${category[0].name}' already exists, try a different category name.`
        })
      }
      else {
        Category.create({ name: req.body.category})
        .then((category) => {
          if (category) {
            res.status(201).json({
              success: true,
              message: `'${category.name}' category has been created.`,
            })
          }
        })
      }
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Category cannot be added at this time.`,
        err
      })
    })
  }

  function deleteCheat(req, res) {
    const id = req.params.id
    Cheat.findByIdAndDelete(id)
    .then((deletedCheat) => {
      if (deletedCheat){
        res.json({
          success: true,
          message: `The '${deletedCheat.command}' cheat has been deleted.`
        })
      } else {
        res.status(404).json({
          success: false,
          message: "No such cheat"
        });
      }
    })
    .catch(err => {
      res.status(404).json({
        success: false,
        message: "Bad input ID"
      });
    })
  }

  function deleteCategory (req, res) {
    const id = req.params.id
    const deletedCategory = {
      category : {
        _id: id
      }
    }
    Cheat.deleteMany(deletedCategory)
    .then(() => {
      Category.findByIdAndDelete(id)
      .then((deleted) => {
        if (deleted){
          res.json({
            success: true,
            message: `The '${deleted.name}' category has been deleted.`
          })
        } else {
          res.status(404).json({
            success: false,
            message: "No such category"
          });
        }
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: "Bad input ID"
      });
    })
  }

  function updateCheat(req, res) {
    const cheatId = { _id : req.params.id }
    const newCheat = {
      command: req.body.command,
      description: req.body.description,
      keywords: [req.body.keywords]
    }
    Cheat.findOneAndUpdate(cheatId, { $set: newCheat }, {new:true})
    .then(cheat => {
      if(cheat){
        res.json({
          success: true,
          message: "The cheat has been updated",
          cheat
        })
      }  else {
        res.status(404).json({
          success: false,
          message: "No such cheat"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: "Wrong input ID",
        err
      });
    })
  }

  function updateCategory(req, res) {
    const categoryId = { _id : req.params.id }
    const newCategory = {
      name: req.body.category
    }
    Category.findOneAndUpdate(categoryId, { $set: newCategory }, {new:true})
    .then(category => {
      if(category){
        res.json({
          success: true,
          message: "The category has been updated",
          category
        })
      }  else {
        res.status(404).json({
          success: false,
          message: "No such category"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: "Bad input ID",
        err
      });
    })
  }

  function signup(req, res) {
    return User.find({
        email: req.body.email
    }).then((user) => {
      // checks to see if user already exist
      if (user.length > 0) {
        return res.status(409).json({
          message: 'User already exists'
        });
      } // ensures both entries to password match
      if (req.body.password !== req.body.verifyPassword) {
        // passwords must match
        return res.status(400).json({ message: 'passwords did not match' });
      } // password encrypt at 2 raised to power 13
      const myPassword = bcrypt.hashSync(req.body.password, saltRound);
      // creates account
      return User.create({
        username: req.body.username,
        password: myPassword,
        email: req.body.email
      })
        .then((user) => {
          const message = 'Your account has been created!, Your details';
          return res.status(201).json({
            message,
            user: {
              username: user.username,
              email: user.email
            }
          });
        })
        .catch(error =>
          res.status(500).json({ message: 'Server Error', error }));
    });
  }
  function signin(req, res) {
    User.findOne({
      email: req.body.email
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'Wrong email or password'
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, hash) => {
        if (!hash) {
          return res
            .status(403)
            .json({ success: false, message: 'Wrong email or password' });
        } else if (hash) {
          const payload = {
            email: user.email,
            username: user.username,
            id: user._id
          };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '24h'
          });
          return res.status(200).json({
            success: true,
            message: 'Login Successful!',
            token,
            user: {
              username: user.username,
              email: user.email,
              id: user._id
            }
          });
        }
      });
    })
    .catch((error) => {
      res.status(400).send({
        success: false,
        error
      });
    });
  }


  router.get('/cheats',getCheats)
  router.get('/category', getCategories)
  router.post('/cheats', createCheat)
  router.post('/category', createCategory)
  router.delete('/cheats/:id', deleteCheat) 
  router.delete('/category/:id', deleteCategory)
  router.patch('/cheats/:id', updateCheat)
  router.patch('/category/:id', updateCategory)
  router.post('/signup', signup)
  router.post('/signin', signin)

export default router;