import faker from 'faker';
import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import jwt from '../util/jwt';
import truncate from '../util/truncate';

describe('Users', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be allowed to register new user', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be check if a user already exists', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: 'User already exists.' });
  });

  it('should be allowed to update a user', async () => {
    const token = await jwt();

    const name = faker.name.findName();
    const password = faker.internet.password();

    const { id, email, password: oldPassword } = await factory.create('User');

    const response = await request(app)
      .put(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name,
        email,
        oldPassword,
        password,
        confirmPassword: password,
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id, name, email });
  });

  it('should not allow you to change the current user email to another email from an existing user', async () => {
    const token = await jwt();

    const user = await factory.create('User');

    const email = faker.internet.email();
    const { name, password } = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send({ name, email, password });

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: user.name, email });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: 'User already exists.' });
  });

  it("should be able to verify that the user's password is correct", async () => {
    const token = await jwt();

    const { id, email, password } = await factory.create('User');

    const response = await request(app)
      .put(`/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: faker.name.findName(),
        email,
        oldPassword: faker.internet.password(),
        password,
        confirmPassword: password,
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ error: 'Password does not match' });
  });
});
