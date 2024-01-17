const User = require('../models/user.model');
const Role = require('../models/role.model');
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
  const users = await User.find().populate('roles');

  const usersWithRoleNames = users.map(user => {
    const userWithRoleName = {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      __v: user.__v,
      isBanned: user.isBanned,
      roles: user.roles.map(role => role.name),
      purchaseHistory: user.purchaseHistory
    };
    return userWithRoleName;
  });
  res.status(StatusCodes.OK).json({ usersWithRoleNames });
}

// const getUser = async (req, res) => {
//   const{
//     params: {_id: userId}
//   } = req;
//   const user = await User.findById(userId)
//   res.status(StatusCodes.OK).json({user});
// }

const patchUser = async (req, res) => {

  const userId = req.params.id;
  const {rolesNew, isBanned } = req.body;

  User.findById(userId, (err, user) => {

    Role.find(
      {
        name: {$in: rolesNew},
      },
      (err, roles) => {
        if(err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = roles.map((role) => role._id);
        user.isBanned = isBanned;
  
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role.name);
          console.log(user);
          res.status(StatusCodes.OK).send({ message: "User updated successfully!", user});
          return;
        });
      }
    )
  })

}

const updateUser = async (req, res) => {
  const {
    body: { userUpdated },
    params: {id: userId },
  } = req;
  User.findById(userId, (err, user) => {
    Role.find(
      {
        name: {$in: userUpdated.roles},
      },
      (err, roles) => {
        if(err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log(roles);

        user.roles = roles.map((role) => role._id);
        user.isBanned = userUpdated.isBanned;
        user.purchaseHistory = userUpdated.purchaseHistory;
        console.log(user);
        
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role.name);
          // console.log(user);
          res.status(StatusCodes.OK).send({ message: "User updated successfully!", user});
          return;
        });
      }
    )
  })
}

module.exports = {
  getAllUsers,
  updateUser,
  patchUser
}
