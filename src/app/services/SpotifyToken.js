import qs from 'qs';

import api from '../../services/api';

class SpotifyToken {
  async run() {
    const response = await api.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${new Buffer.from(
            `${process.env.SPOTIFY_CLIENTID}:${process.env.SPOTIFY_CLIENTSECRET}`
          ).toString('base64')}`,
        },
      }
    );

    return response.data.access_token;
  }
}

export default new SpotifyToken();
