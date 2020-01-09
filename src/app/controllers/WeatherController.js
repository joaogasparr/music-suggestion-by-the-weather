import api from '../../services/api';
import SpotifyToken from '../services/SpotifyToken';
import SpotifyTracks from '../services/SpotifyTracks';

class WeatherController {
  async store(req, res) {
    const { city, units = 'metric' } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }

    const { data } = await api.get(
      'http://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          units,
          APPID: process.env.OPENWEATHER_KEY,
        },
      }
    );

    const temperature = data.main.temp;
    const accessToken = await SpotifyToken.run();
    let tracks = [];

    if (temperature > 25) {
      tracks = await SpotifyTracks.run(accessToken, '37i9dQZF1DWVLcZxJO5zyf');
    } else if (temperature >= 10 && temperature <= 25) {
      tracks = await SpotifyTracks.run(accessToken, '37i9dQZF1DWXRqgorJj26U');
    } else {
      tracks = await SpotifyTracks.run(accessToken, '37i9dQZF1DWV0gynK7G6pD');
    }

    return res.json(tracks);
  }
}

export default new WeatherController();
