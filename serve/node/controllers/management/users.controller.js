const { User, Role, Profile }  = require('../../models');
const helpers   =  require ("../../lib/helpers");
const jwt = require('jsonwebtoken');
const authConfig = require("../../config/auth")
const { sequelize } = require('../../models'); 

const includeUser = [
    { model: Role, as : 'Role'}
]
const  resetPassword =  async (email,res) => {
    Password = await helpers.encryptPassword("password");
    user = exists(email)
    if (user){
        await User.update({
            password: Password
        }).catch(err => console.log("err", err)) 
    }
}//resetpassword

const exists = async (email) => {
    try {
        const user = await User.findOne({ where: { email: email } });
        return user; 
    } catch (error) {
        console.log("Error in users.controller exists", error);
        throw new Error("Error al validar el correo");
    }
};

  
const Create = async (req, res) => {
    const t = await sequelize.transaction(); // Comienza una nueva transacción
    try {
        const { name, username, email, CenterId, RoleId, profileName, professionalCardNumber } = req.body;
        const existingUser = await exists(email);

        if (existingUser) {
            await t.rollback(); // Rollback si el usuario ya existe
            return res.status(400).json({
                message: "User con este email ya existe",
                user: existingUser
            });
        }

        // Encriptar la contraseña
        const password = await helpers.encryptPassword("password");

        // Crear el nuevo usuario con la contraseña encriptada
        const newUser = await User.create({ name, username, email, CenterId, RoleId, password }, { transaction: t });

        // Crear el perfil del usuario dentro de la misma transacción
        await Profile.create({
            name: profileName || '', // Asignar el nombre del perfil
            professionalCardNumber: professionalCardNumber || '', // Asignar el número de tarjeta profesional
            UserId: newUser.id // Asociar el perfil con el nuevo usuario
        }, { transaction: t });

        // Confirmar la transacción
        await t.commit();

        // Incluir el Centro y el Rol en la respuesta
        const user = await User.findByPk(newUser.id, { include: includeUser });

        res.status(200).json({
            message: "Usuario y perfil creados correctamente",
            data: user
        });
    } catch (error) {
        // Asegurarse de que solo intentamos hacer rollback si la transacción no ha sido comprometida
        if (t.finished === 'pending') {
            await t.rollback();
        }
        console.log("Error in users.controller Create", error);
        res.status(500).json({ message: error.message });
    }
};




const getUsers = (req, res) => {
    User.findAll({
        include: includeUser
    }).then( result => {
        res.json(result)
    }).catch( err => {
        res.status(404).json({
            "error ": err.message
        })
    });
}

const createUser = async (req, res) => {
    
    let new_ = helpers.buildParams([
        'username', 
        'name', 
        'password', 
        'confirmation_password',
        'email'
        ], {...req.body}) 
    console.log("use ", new_, req.body)
    if (new_) {
        req.body = { ...req.body, ...new_ };
        
        console.log("use ", new_)
        if (req.body.password === req.body.confirmation_password){
            req.body.password = await helpers.encryptPassword(req.body.password);
            User.create(req.body).then((result) => {
                UserRole.create({
                    UserId: result.id
                })
                token = jwt.sign({ "id" : result.id,"email" : result.email,"name":result.name },authConfig.secret,{
                    expiresIn: authConfig.expires
                });
                res.status(200).json({ 
                        user: result,
                        token : token 
                    });
                console.log('created user');
            }).catch((err) => {
                console.log('error', err.message )
                res.status(404).json(err.message)
            })
            
        
        }else{
            res.status(404).send('unmatch password');
        }
    }else{
        res.status(404).json({
            message : "Data no valid please confirm"
        })
    }
}


const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (user === null){
            res.status(404).json("id doesn't exit")
        }else{

            const deleted = await User.destroy({
                where: {
                  id: req.params.id
                }
              }).catch( error =>
              {
                res.status(404).send("delete error", error);  
              })
            res.status(200).json("deleted user")
            console.log(deleted);

        }
        
        
    } catch (error) {
        console.log('error', error)
        res.status(500);
    }
}

const update = async (req, res) => {
    try {
        const {  name, username, email, CenterId, RoleId } = req.body;
        const { id } = req.params;

        // Asegúrate de que el ID esté presente en la consulta
        if (!id) {
            return res.status(400).json({ message: "ID de usuario es requerido" });
        }

        // Actualiza el usuario con el ID especificado
        const [updated] = await User.update(
            { name, username, email, CenterId, RoleId },
            {
                where: { id: id },
                returning: true // Esto devuelve el número de filas actualizadas y los registros actualizados
            }
        );

        if (updated === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Encuentra el usuario actualizado para enviar en la respuesta
        const updatedUser = await User.findByPk(id, {include: includeUser});

        res.status(200).json({
            message: "Usuario actualizado correctamente",
            data: updatedUser
        });

    } catch (error) {
        console.error("Error en users.controller update", error);
        res.status(500).json({ message: "Ocurrió un error al actualizar el usuario, consulte con su administrador" });
    }
};


const validEmail = (req, res) => {
    User.findOne({where: {email: req.body.email}}).then((user) => {
       console.log(user instanceof User); // true
       console.log(req.body.email) 
       if (user instanceof User) {
        
            res.status(200).json({email : user.email});
            
        }else{
            res.status(404).json("email doesn't exits")
        }
    }).catch((err) => {
        res.status(404).json(err.message);
    });
    
    
}

const updateUsername = (req,res) => {
    username = req.body.username.toLowerCase().split(' ').join('')

    console.log("new username", username)
    User.update({
        username: username
    }, 
        {where: {
            id: req.params.id
        }}).then(result => {
            res.json({
                message: "username update",
                username: username
            })
        }).catch(error => {
            console.log("error updateUsername method user update", error)
            res.status(404).json(error.message)

        })
}

const resetPasswordById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Buscar el usuario por ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        // Encriptar la nueva contraseña
        const newPassword = await helpers.encryptPassword("password");

        // Actualizar la contraseña del usuario
        await user.update({ password: newPassword });

        res.status(200).json({
            message: "Contraseña restablecida correctamente",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                // No devolver la contraseña en la respuesta
            }
        });
    } catch (error) {
        console.error("Error en resetPasswordById", error);
        res.status(500).json({
            message: "Ocurrió un error al restablecer la contraseña, consulte con su administrador"
        });
    }
};


module.exports = {
    getUsers,
    createUser,
    deleteUser,
    update,
    validEmail,
    updateUsername,
    Create,
    includeUser,
    resetPasswordById
    

}