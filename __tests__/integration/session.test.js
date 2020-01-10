import faker from 'faker';
import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Sessions', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to authenticate with the admin user', async () => {
    const password = faker.internet.password();

    const { email } = await factory.create('User', {
      password,
    });

    const response = await request(app)
      .post('/sessions')
      .send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should verify that the user attempting to authenticate exists', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: 'User not found' });
  });

  it('should verify that the password is correct to authenticate', async () => {
    const { email } = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email,
        password: faker.internet.password(),
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: 'Password does not match' });
  });

  it('should be allowed to verify that user has token', async () => {
    const { name, email } = await factory.create('User');

    const response = await request(app)
      .put(`/users`)
      .send({
        name,
        email,
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: 'Token not provided' });
  });

  it('should be allowed to verify if token is valid', async () => {
    const { name, email } = await factory.create('User');

    const response = await request(app)
      .put(`/users`)
      .set('Authorization', 'Bearer zzzzzzz')
      .send({
        name,
        email,
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: 'Token Invalid' });
  });
});
