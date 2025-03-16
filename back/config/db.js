const mongoose = require("mongoose");

const url = process.env.URL_LOCAL_DB;
const dbName = process.env.DB_NAME;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(`${url}/${dbName}`);
    console.log(`Connexion à la base de donnée ${dbName} réussie !`);
  } catch (error) {
    console.log(`Connexion à la base de donnée échouée ! : ${error}`);
  }
};

module.exports = connectToDatabase;