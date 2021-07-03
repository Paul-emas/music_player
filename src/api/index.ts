import axios from 'axios';

const baseURL = 'https://deezerdevs-deezer.p.rapidapi.com';

const https = axios.create({
  baseURL,
  headers: {
    'x-rapidapi-key': 'eaee7376bamsh1f6b7a078e4c602p14509cjsncb1cc3839f1e',
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
  },
});

export default https;
