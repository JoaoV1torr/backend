// database.js
const { MongoClient } = require('mongodb');


const url = "mongodb+srv://joaovitorfr28_db_user:2yotcFrTTZ1Vd6UK@cluster0.ej05h1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(url);

let dbCached = null;

async function conectarDb() {
  if (dbCached) return dbCached;           // reutiliza conexão
  await client.connect();                  // conecta uma vez
  dbCached = client.db('agenda');          // usa o DB 'agenda'
  return dbCached;
}

module.exports = { conectarDb };