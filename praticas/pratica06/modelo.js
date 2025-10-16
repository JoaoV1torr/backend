// modelo.js
const { ObjectId } = require('mongodb');
const { conectarDb } = require('./database');

class Tarefa {
  constructor(nome, concluida = false) {
    this.id = null;
    this.nome = nome;
    this.concluida = concluida;
    this.db = null;
    this.collection = null;
  }

  // l) init: conecta e configura a coleção
  async init() {
    this.db = await conectarDb();
    this.collection = this.db.collection('tarefas');
  }

  // m–o) inserir
  async inserir() {
    const resultado = await this.collection.insertOne({ nome: this.nome, concluida: this.concluida });
    this.id = resultado.insertedId;
  }

  // p–q) alterar (por _id)
  async alterar() {
    if (!this.id) {
      // fallback: tenta buscar por nome se id não estiver setado
      const atual = await this.collection.findOne({ nome: this.nome });
      if (atual) this.id = atual._id;
    }
    await this.collection.updateOne(
      { _id: new ObjectId(this.id) },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );
  }

  // r–s) deletar (por nome)
  async deletar() {
    await this.collection.deleteOne({ nome: this.nome });
  }

  // t–v) buscar (por nome)
  async buscar() {
    const resultado = await this.collection.findOne({ nome: this.nome });
    if (resultado) {
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = !!resultado.concluida;
    }
  }
}

module.exports = { Tarefa };