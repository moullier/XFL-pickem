module.exports = function(sequelize, DataTypes) {
    let Result = sequelize.define("Result", {
        week: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        game_number: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        // true = home team won, false = away team won
        winner: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        winner_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        loser_name: {
            type: DataTypes.STRING,
            allowNull: false            
        }
    });

    return Result;
  };
  