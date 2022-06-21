const { Model, DataTypes } = require('sequelize')

class Address extends Model {
    static init(sequelize) {
        super.init({
            zipcode: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER
        }, {
            sequelize
        })
    }

    // criando relacionado entre as tabelas
    // a chave estrangeira dessa tabela pertence ao model User 
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }
}

module.exports = Address