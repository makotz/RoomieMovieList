API_KEYS = require('../config/configKeys.js');
const tmdbAPI = API_KEYS.tmdbKey;
const restdbAPI = API_KEYS.restdbKey;
const restdburl = 'https://roomiemovielist-bd4d.restdb.io/rest/movies?apikey='+restdbAPI;

const api = {

  getMovies(){
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key='+tmdbAPI
    return fetch(url).then((res) => res.json());
  },

  findMovie(tmdbid){
    const url = 'https://api.themoviedb.org/3/movie/'+tmdbid+'?api_key='+tmdbAPI
    return fetch(url).then((res) => res.json());
  },

  getBucket(fbid){
    const q = '&q='+'{"fbID":'+fbid+'}'
    const url = restdburl+q
    console.log(url)
    return fetch(url).then((res) => res.json());
  },

  addToBucket(fbid, moviedd){
    const data = { fbID: fbid, tmdbID: moviedd }
    const url = restdburl
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data) // data can be `string` or {object}!
    }).then((res) => res.json());
  }
};

module.exports = api;
