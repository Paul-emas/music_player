import axios from 'axios';

const baseURL = 'https://deezerdevs-deezer.p.rapidapi.com';

const https = axios.create({
  baseURL,
  headers: {
    'x-rapidapi-key': '05656dcc94msh69df9255274fc76p190679jsn8c893976af98',
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
  },
});

export default https;
