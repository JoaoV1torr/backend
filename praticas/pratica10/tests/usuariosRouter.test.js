const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('Recurso /usuarios', () => {
  let userId;
  let token;

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('POST /usuarios deve criar usuário e retornar 201', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({ email: 'usuario@email.com', senha: 'abcd1234' });

    expect(res.statusCode).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('email', 'usuario@email.com');

    userId = res.body._id;
  });

  test('POST /usuarios sem body deve retornar 422', async () => {
    const res = await request(app).post('/usuarios').send({});

    expect(res.statusCode).toBe(422);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty(
      'msg',
      'Email e Senha são obrigatórios'
    );
  });

  test('POST /usuarios/login com credenciais corretas deve retornar 200 e token', async () => {
    const res = await request(app)
      .post('/usuarios/login')
      .send({ usuario: 'usuario@email.com', senha: 'abcd1234' });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('token');

    token = res.body.token;
  });

  test('POST /usuarios/login sem body deve retornar 401', async () => {
    const res = await request(app).post('/usuarios/login').send({});

    expect(res.statusCode).toBe(401);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Credenciais inválidas');
  });

  test('POST /usuarios/renovar com token válido deve retornar 200 e novo token', async () => {
    const res = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /usuarios/renovar com token inválido deve retornar 401', async () => {
    const res = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', 'Bearer 123456789');

    expect(res.statusCode).toBe(401);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Token inválido');
  });

  test('DELETE /usuarios/:id com token válido deve retornar 204 sem conteúdo', async () => {
    const res = await request(app)
      .delete(`/usuarios/${userId}`)
      .set('authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual({});
  });
});