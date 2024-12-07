import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Position - UpdateById', () => {

  it('Atualiza registro', async () => {

    const res1 = await testServer
      .post('/position')
      .send({ name: 'Dev Junior' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/position/${res1.body}`)
      .send({ name: 'Dev Junior' });

    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Tenta atualizar registro que não existe', async () => {

    const res1 = await testServer
      .put('/position/99999')
      .send({ name: 'Dev Junior' });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});