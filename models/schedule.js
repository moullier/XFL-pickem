module.exports = function(sequelize, DataTypes) {
    let Schedule = sequelize.define("Schedule", {
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
            allowNull: true
        },
        home_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        away_name: {
            type: DataTypes.STRING,
            allowNull: false            
        },
        game_occurred: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    return Schedule;
  };
  