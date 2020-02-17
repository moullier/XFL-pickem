module.exports = function(sequelize, DataTypes) {
    let Pick = sequelize.define("Pick", {
        member_fk: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        week: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        game_number: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        prediction: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return Pick;
  };
  