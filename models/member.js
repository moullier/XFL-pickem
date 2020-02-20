module.exports = function(sequelize, DataTypes) {
    let Member = sequelize.define("Member", {
        // user_id: {
        //     type: DataTypes.INTEGER(10),
        //     allowNull: false,
        // }
        // group_id: {
        //     type: DataTypes.INTEGER(10),
        //     allowNull: false,
        // }
    });

    Member.associate = function(models) {
        // A Member should belong to a Group
        // A Member can't be created without a group
        // (This is also true for Users but I can't figure out how to modify that object yet without breaking passport)
        Member.belongsTo(models.Group, {
          foreignKey: {
            allowNull: false
          }
        });

        Member.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });

        Member.hasMany(models.Pick, {
            onDelete: "cascade"
        });


      };




    return Member;
  };
  