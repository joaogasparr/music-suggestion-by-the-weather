import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';
import request from 'supertest';

import app from '../../src/app';
import api from '../../src/services/api';
import jwt from '../util/jwt';
import truncate from '../util/truncate';

const apiMock = new MockAdapter(api);

describe("Weather's", () => {
  beforeEach(async () => {
    await truncate();
    jest.clearAllMocks();
  });

  it('should be able to verify that the city has been informed', async () => {
    const token = await jwt();

    const response = await request(app)
      .post('/weathers')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: 'City is required' });
  });

  it('should be able to list a playlist by temperature higher than 25ºC', async () => {
    const token = await jwt();

    const temp = 50;
    const access_token = faker.random.word();
    const name = faker.name.findName();

    apiMock.onGet('http://api.openweathermap.org/data/2.5/weather').reply(200, {
      main: {
        temp,
      },
    });

    apiMock.onPost('https://accounts.spotify.com/api/token').reply(200, {
      access_token,
    });

    apiMock
      .onGet(
        'https://api.spotify.com/v1/playlists/37i9dQZF1DWVLcZxJO5zyf/tracks'
      )
      .reply(200, {
        track: {
          name,
        },
      });

    const response = await request(app)
      .post('/weathers')
      .set('Authorization', `Bearer ${token}`)
      .query({ city: faker.name.firstName() });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ track: { name } });
  });

  it('should be able to list a playlist with a temperature between 10ºC to 25ºC', async () => {
    const token = await jwt();

    const temp = 18;
    const access_token = faker.random.word();
    const name = faker.name.findName();

    apiMock.onGet('http://api.openweathermap.org/data/2.5/weather').reply(200, {
      main: {
        temp,
      },
    });

    apiMock.onPost('https://accounts.spotify.com/api/token').reply(200, {
      access_token,
    });

    apiMock
      .onGet(
        'https://api.spotify.com/v1/playlists/37i9dQZF1DWXRqgorJj26U/tracks'
      )
      .reply(200, {
        track: {
          name,
        },
      });

    const response = await request(app)
      .post('/weathers')
      .set('Authorization', `Bearer ${token}`)
      .query({ city: faker.name.firstName() });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ track: { name } });
  });

  it('should be able to list a playlist with a temperature bellow 10ºC', async () => {
    const token = await jwt();

    const temp = 3;
    const access_token = faker.random.word();
    const name = faker.name.findName();

    apiMock.onGet('http://api.openweathermap.org/data/2.5/weather').reply(200, {
      main: {
        temp,
      },
    });

    apiMock.onPost('https://accounts.spotify.com/api/token').reply(200, {
      access_token,
    });

    apiMock
      .onGet(
        'https://api.spotify.com/v1/playlists/37i9dQZF1DWV0gynK7G6pD/tracks'
      )
      .reply(200, {
        track: {
          name,
        },
      });

    const response = await request(app)
      .post('/weathers')
      .set('Authorization', `Bearer ${token}`)
      .query({ city: faker.name.firstName() });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ track: { name } });
  });
});
