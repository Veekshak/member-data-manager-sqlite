import { DataTypes } from "sequelize";
import sequelize from "../util/database.js";

const Members = sequelize.define("Members", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  phone_number: {
    type: DataTypes.STRING, 
    allowNull:false
  },
  father_name: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  cur_state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dir: {
    type: DataTypes.STRING,
  },
});

export default Members;
