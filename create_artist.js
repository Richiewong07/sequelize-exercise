var db = require('./models');
var prompt = require('prompt-promise');


var promptUser = new Promise (
  function(resolve, reject) {
    var inputs = [];
    prompt('Enter Artist Name: ')
    .then(function (value) {
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

function createArtist(artist_name) {
  db.artist.create({
    name: artist_name
  })
  .then(function(artist) {
    console.log(artist);
  });
}

function enterArtist() {
  promptUser
    .then(function(inputs) {
      var artist_name = inputs[0];
      createArtist(artist_name);
    })
    .catch(function(error) {
      console.error(error);
    });
}

enterArtist();
