import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Position - GetById', () => {

  it('Busca registro por id', async () => {

    const res1 = await testServer
      .post('/position')
      .send({ name: 'Dev Junior' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/position/${res1.body}`)
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('name');
  });
  it('Tenta buscar registro que não existe', async () => {

    const res1 = await testServer
      .get('/position/99999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});