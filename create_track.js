var db = require('./models');
var prompt = require('prompt-promise');


var promptUser = new Promise (
  function(resolve, reject) {
    var inputs = [];
    prompt('Enter Track Name: ')
    .then(function(value) {
      inputs.push(value);
      return prompt ('Enter Track Duration: ');
    })
    .then(function(value) {
      inputs.push(value);
      return prompt('Enter Album ID: ');
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

function createTrack (track_name, track_duration, album_id) {
  db.track.create({
    name: track_name,
    duration: track_duration,
    albumID: album_id
  })
  .then(function(track) {
    console.log(track);
  })
}

function enterTrack() {
  promptUser
    .then(function(inputs) {
      var track_name = inputs[0];
      var track_duration = inputs[1];
      var album_id = inputs[2];
      createTrack(track_name, track_duration, album_id);
    })
    .catch(function(error) {
      console.log(error);
    });
}

enterTrack();
