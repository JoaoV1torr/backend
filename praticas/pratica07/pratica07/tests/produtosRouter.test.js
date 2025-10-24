// tests/produtosRouter.test.js
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const request = supertest(app);

describe('Recurso /produtos (API REST)', () => {
  let produtoId = null;

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('POST /produtos com JSON válido retorna 201 e JSON com _id, nome, preco', async () => {
    const res = await request
      .post('/produtos')
      .send({ nome: 'Laranja', preco: 10.0 })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('nome', 'Laranja');
    expect(Number(res.body.preco)).toBe(10.0);

    produtoId = res.body._id; // salvar para os próximos testes
  });

  test('POST /produtos sem JSON retorna 422 e msg adequada', async () => {
    const res = await request
      .post('/produtos')
      .send({})
      .expect('Content-Type', /json/)
      .expect(422);

    expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('GET /produtos retorna 200 e array JSON', async () => {
    const res = await request.get('/produtos').expect('Content-Type', /json/).expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /produtos/${id} retorna 200 com _id, nome, preco', async () => {
    const res = await request
      .get(`/produtos/${produtoId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('_id', produtoId);
    expect(res.body).toHaveProperty('nome', 'Laranja');
    expect(Number(res.body.preco)).toBe(10.0);
  });

  test('GET /produtos/0 retorna 400 com msg "Parâmetro inválido"', async () => {
    const res = await request.get('/produtos/0').expect('Content-Type', /json/).expect(400);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('GET /produtos/000000000000000000000000 retorna 404 "Produto não encontrado"', async () => {
    const res = await request
      .get('/produtos/000000000000000000000000')
      .expect('Content-Type', /json/)
      .expect(404);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('PUT /produtos/${id} com JSON válido retorna 200 e objeto atualizado', async () => {
    const res = await request
      .put(`/produtos/${produtoId}`)
      .send({ nome: 'Laranja Pera', preco: 18.0 })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('_id', produtoId);
    expect(res.body).toHaveProperty('nome', 'Laranja Pera');
    expect(Number(res.body.preco)).toBe(18.0);
  });

  test('PUT /produtos/${id} sem JSON retorna 422 e msg adequada', async () => {
    const res = await request
      .put(`/produtos/${produtoId}`)
      .send({})
      .expect('Content-Type', /json/)
      .expect(422);

    expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('PUT /produtos/0 retorna 400 com msg "Parâmetro inválido"', async () => {
    const res = await request.put('/produtos/0').send({ nome: 'X', preco: 1 }).expect('Content-Type', /json/).expect(400);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('PUT /produtos/000000000000000000000000 retorna 404 "Produto não encontrado"', async () => {
    const res = await request
      .put('/produtos/000000000000000000000000')
      .send({ nome: 'Teste', preco: 99 })
      .expect('Content-Type', /json/)
      .expect(404);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('DELETE /produtos/${id} retorna 204 sem conteúdo', async () => {
    await request.delete(`/produtos/${produtoId}`).expect(204);
  });

  test('DELETE /produtos/0 retorna 400 "Parâmetro inválido"', async () => {
    const res = await request.delete('/produtos/0').expect('Content-Type', /json/).expect(400);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('DELETE /produtos/${id} inexistente retorna 404 "Produto não encontrado"', async () => {
    const res = await request
      .delete('/produtos/000000000000000000000000')
      .expect('Content-Type', /json/)
      .expect(404);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });
});