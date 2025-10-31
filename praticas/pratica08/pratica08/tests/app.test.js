// tests/app.test.js
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('Recurso de autenticação + proteção de rota', () => {
  let token = null;

  test('GET /produtos sem token retorna 401 "Não autorizado"', async () => {
    const res = await request.get('/produtos')
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body).toHaveProperty('msg', 'Não autorizado');
  });

  test('GET /produtos com token inválido retorna 401 "Token inválido"', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', '123456789')
      .expect('Content-Type', /json/)
      .expect(401);

    expect(res.body).toHaveProperty('msg', 'Token inválido');
  });

  test('POST /usuarios/login retorna 200 e token', async () => {
    const res = await request
      .post('/usuarios/login')
      .send({ usuario: 'email@exemplo.com', senha: 'abcd1234' })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('GET /produtos com token válido retorna 200 e JSON', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', token)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /usuarios/renovar com token válido retorna 200 e novo token', async () => {
    const res = await request
      .post('/usuarios/renovar')
      .set('authorization', token)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('token');
    token = res.body.token; // salva novo token
  });

  test('GET /produtos com novo token retorna 200 e JSON', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', token)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });
});