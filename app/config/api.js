API_KEYS = require('../config/configKeys.js');
const tmbdAPI = API_KEYS.tmdbKey;
const restdbAPI = API_KEYS.restdb;
const restdburl = 'https://'+restdbAPI+'.restdb.io/rest/movies'

const api = {

  getMovies(){
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key='+tmbdAPI
    return fetch(url).then((res) => res.json());
  },

  getBucket(fbId){
    const q = '?q='+"{'fbid': "+fbid+" }"
    const url = restdburl+q
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
