const User = require('../model/User')
const Address = require('../model/Address')

module.exports = {

    async index(req, res) {
        const { user_id } = req.params;
        const user = await User.findByPk(user_id, {
            include: {
                association: 'addresses'
            }
        })

        // como foi feito a associacao 1 para muitos
        // um usuário pode ter vários endereços, mas cada endereço pertence a um usuário
        // posso pegar os endereços de um usuário dessa forma
        // const teste = await user.getAddresses()

        return res.json(user)
    },
    async store(req, res) {
        const { user_id } = req.params;
        const { zipcode, street, number } = req.body;

        const user = await User.findByPk(user_id)

        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }

        const address = await Address.create({
            zipcode,
            street,
            number,
            user_id
        })

        return res.json(address)
    }
}