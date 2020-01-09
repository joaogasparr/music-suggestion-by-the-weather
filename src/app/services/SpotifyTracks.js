import api from '../../services/api';

class SpotifyTracks {
  async run(token, playlist) {
    const response = await api.get(
      `https://api.spotify.com/v1/playlists/${playlist}/tracks`,
      {
        params: {
          fields: 'items(track(name))',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
}

export default new SpotifyTracks();
