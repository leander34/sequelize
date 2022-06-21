const { Op } = require('sequelize')
const User = require('../model/User')

module.exports = {
    async show(req, res) {
        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.like]: '%@rocketseat.com.br',
                }
            },
            include: [{
                association: 'addresses',
                attributes: ['zipcode', 'street', 'number'],
                where: {
                    street: 'Rua Guilherme Gemballa'
                }
            }, {
                association: 'techs',
                attributes: ['name'],
                required: false,
                where: {
                    name: {
                        [Op.like]: 'React%'
                    }
                },
                through: {
                    attributes: []
                }
            }]
        })

        return res.json(users)
    }
}