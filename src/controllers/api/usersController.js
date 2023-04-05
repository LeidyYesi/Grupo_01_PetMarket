const db = require('../../database/models');
const sequelize = db.sequelize;
const User = db.User;


const usersController = {
    'summary': (req, res) => {
        User.findAll()
            .then(users => {
                let userData =[];
                users.forEach(element => {
                    let userLiteral = {
                        id: element.id,
                        name:element.name,
                        lastname:element.lastname,
                        email:element.email,
                        detail: '/api/users/'+element.id
                    }
                    userData.push(userLiteral);
                });
                let respuesta = {
                    meta:{
                        status:200,
                        count: users.length,
                        url: '/api/users'
                    },
                    data: userData
                }
                res.json(respuesta)
            })
    },
    'detail': (req, res) => {
        User.findByPk(req.params.id)
            .then(user => {
                let userLiteral = {
                    id: user.id,
                    name:user.name,
                    lastname:user.lastname,
                    email:user.email,
                    detail: '/public/img/users/'+user.image
                }
                let respuesta = {
                    data: userLiteral
                }
                res.json(respuesta);
            });
    }

}

module.exports = usersController;