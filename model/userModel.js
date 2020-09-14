
const Sequelize = require('sequelize')
const sequelize = require('../common/dbConfig')

const User = sequelize.define('user', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1.replace(/\-/g, '')
    },
    name: Sequelize.STRING(16),
    age: Sequelize.INTEGER(4),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.DATE,
    isSuper: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    }
}, {
    tableName: 'user'
});

User.sync({ force: true })
