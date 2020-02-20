module.exports = function(sequelize, DataTypes) {
    let Pick = sequelize.define("Pick", {
        // member_fk: {
        //     type: DataTypes.INTEGER(10),
        //     allowNull: false
        // },
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


    Pick.associate = function(models) {
        // A Member should belong to a Group
        // A Member can't be created without a group
        // (This is also true for Users but I can't figure out how to modify that object yet without breaking passport)
        Pick.belongsTo(models.Member, {
            foreignKey: {
                allowNull: false
            }
        });
    }



    return Pick;
  };
  