const { User, Role, UserRole } = require('../models');
const helpers  = require ( "../lib/helpers.js")
const jwt = require('jsonwebtoken');
const authConfig = require("../config/auth")

const loginValidation = async (req, res) => {
  try {
    const user = await User.findOne({ 
      where: { username: req.body.username },
      attributes: ['id', 'name','email', 'username', 'RoleId', 'password', 'CenterId'], 
      include: [
        {
          model: Role,
          as: 'Role',
          attributes: ['name'], 
        }
      ]
    });

    if (!user) {
      throw error ('Username no encontrado')
    }

    const validPassword = await helpers.matchPassword(req.body.password, user.password);
    
    if (validPassword) {
      const token = jwt.sign({ "id": user.id, "email": user.email, "name": user.name }, authConfig.secret, {
        expiresIn: authConfig.expires
      });

      const { password,  ...userWithoutPassword } = user.toJSON(); 

      res.status(200).json({ 
        user: userWithoutPassword, 
        token: token
      });

      console.log('SUCCESS');
    } else {
      console.log('wrong');
      throw error ('Contraseña incorrecta')
     
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).json( {message: error.message});
  }
};


const logout = async (req, res) => {
  res.status(200).json("User logout")
}

module.exports = {
    loginValidation, 
    logout
}