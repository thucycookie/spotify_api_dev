// ref: https://medium.com/@kiesp/playing-with-spotify-api-using-expressjs-bd8f25392ff3

var express = require('express');
var router = express.Router();


var SpotifyWebApi = require('spotify-web-api-node');
scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private']

require('dotenv').config();

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_API_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URL,
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req,res) => {
  var html = spotifyApi.createAuthorizeURL(scopes)
  console.log(html)
  res.redirect(html+"&show_dialog=true")  
})

router.get('/callback', async (req,res) => {
  const { code } = req.query;
  console.log(code)
  try {
    var data = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    //re-directs after successfully authorize Spotify
    res.redirect('http://ec2-3-237-85-196.compute-1.amazonaws.com:3000');
  } catch(err) {
    res.redirect('/#/error/invalid token');
  }
});

//Examples of How to Use functions from spotifyApi
//Reference: https://github.com/kie-sp/myspotify/blob/master/routes/index.js

router.get('/userinfo', async (req,res) => {
  try {
    var result = await spotifyApi.getMe();
    console.log(result.body);
    res.status(200).send(result.body)
  } catch (err) {
    res.status(400).send(err)
  }
});

router.get('/playlists', async (req,res) => {
  try {
    var result = await spotifyApi.getUserPlaylists();
    console.log(result.body);
    res.status(200).send(result.body);
  } catch (err) {
    res.status(400).send(err)
  }
});

//Reference to spotifyAPI functions: https://github.com/thelinmichael/spotify-web-api-node/blob/4fae3c560c6c6a4aaf721019226ed3d619bd9910/src/spotify-web-api.js#L567
router.get('/topartists', async (req,res) => {
  try {
    var req_options = {'time_range' : 'short_term'};
    var result = await spotifyApi.getMyTopArtists();
    console.log(result.body);
    res.status(200).send(result.body);
  } catch (err) {
    res.status(400).send(err)
  }
});

module.exports = router;