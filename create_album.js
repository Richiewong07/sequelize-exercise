var db = require('./models');
var prompt = require('prompt-promise');



var promptUser = new Promise (
  function(resolve, reject) {
    var inputs = [];
    prompt('Enter Album Name: ')
    .then(function(value) {
      inputs.push(value);
      return prompt ('Enter Album Year: ');
    })
    .then(function(value) {
      inputs.push(value);
      return prompt('Enter Artist ID: ');
    })
    .then(function(value) {
      inputs.push(value);
      prompt.done();
      resolve(inputs);
    })
    .catch(function(error) {
      prompt.finish();
      reject(error);
    });
  }
);

function createAlbum (album_name, album_year, artist_id) {
  db.album.create({
    name: album_name,
    year: album_year,
    artistID: artist_id
  })
  .then(function(album) {
    console.log(album);
  });
}

function enterAlbum() {
  promptUser
    .then(function(inputs) {
      var album_name = inputs[0];
      var album_year = inputs[1];
      var artist_id = inputs[2];
      createAlbum(album_name, album_year, artist_id);
    })
    .catch(function(error) {
      console.log(error);
    });
}

enterAlbum();
