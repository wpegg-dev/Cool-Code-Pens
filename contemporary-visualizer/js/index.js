var canvas = {
  init: function() {
    this.frame = document.getElementsByTagName('canvas')[0];
    this.context = this.frame.getContext('2d');
    this.width = 400;
    this.height = 100;
  },

  render: function() {
    var that = canvas;

    var fWidth = 2;
    var fHeight = 0;
    var x = 0;

    if (app.isPlaying) audio.analyser.getByteFrequencyData(audio.frequencyData);

    that.context.clearRect(0, 0, that.width, that.height);
    that.context.fillStyle = '#FFB74D';
    that.context.beginPath();
    for (var i = 0; i < audio.bufferLength; i++) {
      fHeight = audio.frequencyData[i] / 3;

      if (audio.frequencyData[i] > 0 && !app.isPlaying) {
        audio.frequencyData[i] -= audio.frequencyData[i] / 20;
      }

      that.context.lineTo(x, that.height - fHeight);
      x += fWidth;
    }

    that.context.lineTo(that.width, that.height);
    that.context.lineTo(0, that.height);

    that.context.fill();
    that.context.closePath();

    call = requestAnimationFrame(that.render);
  }
};

var audio = {
  init: function() {
    this.context = new AudioContext();
    this.analyser, this.bufferLength, this.frequencyData, this.bufferNode;
    this.bufferContainer = [];

    this.currentTime = 0;
    this.loaded = false;
    this.track = 0;

    this.trackList = [{
      title: 'Do or Die',
      url: 'https://s3-us-west-2.amazonaws.com/harriscarney/audio/Do+or+Die.mp3',
      position: '0px'
    }, {
      title: 'Drop the Game',
      url: 'https://s3-us-west-2.amazonaws.com/harriscarney/audio/Drop+the+Game.mp3',
      position: '-400px'
    }, {
      title: 'Retrograde',
      url: 'https://s3-us-west-2.amazonaws.com/harriscarney/audio/Retrograde.mp3',
      position: '-800px'
    }, {
      title: 'Warriors',
      url: 'https://s3-us-west-2.amazonaws.com/harriscarney/audio/Warriors.mp3',
      position: '-1200px'
    }, {
      title: 'Stay with Me',
      url: 'https://s3-us-west-2.amazonaws.com/harriscarney/audio/Stay+with+Me.mp3',
      position: '-1600px'
    }, {
      title: 'Mad World',
      url: 'https://s3-us-west-2.amazonaws.com/harriscarney/audio/Mad+World.mp3',
      position: '-2000px'
    }];
  },

  loadTrack: function() {
    var that = audio;

    if (that.bufferContainer.length > 0) that.bufferContainer[0].disconnect();

    that.bufferContainer = that.bufferContainer.filter(function() {
      return false;
    });

    var bufferSource = that.context.createBufferSource();

    that.bufferContainer.push(bufferSource);

    that.bufferNode = that.bufferContainer[0];

    that.analyser = that.context.createAnalyser();

    var track = that.track;

    var request = new XMLHttpRequest();
    request.open('GET', this.trackList[track].url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      that.context.decodeAudioData(request.response, function(buffer) {
        that.bufferNode.buffer = buffer;

        that.duration = buffer.duration;
        that.loaded = true;
      });
    }

    request.send();

    that.analyser.connect(that.context.destination);
    that.bufferNode.start();

    that.bufferLength = that.analyser.frequencyBinCount;
    that.frequencyData = new Uint8Array(that.bufferLength);
  },

  play: function() {
    this.bufferNode.connect(this.analyser);
  },

  pause: function() {
    this.bufferNode.disconnect();
  }
};

var ui = {
  init: function() {
    this.textContainer = document.getElementsByClassName('text-container')[0];
    this.progress = document.getElementsByClassName('progress-bar-value')[0];
    this.play = document.getElementsByClassName('play')[0];
    this.pause = document.getElementsByClassName('pause')[0];
    this.previous = document.getElementsByClassName('previous')[0];
    this.next = document.getElementsByClassName('next')[0];
  },

  playFunc: function() {
    this.play.style.display = 'none';
    this.pause.style.display = 'block';
  },

  pauseFunc: function() {
    this.pause.style.display = 'none';
    this.play.style.display = 'block';
  },

  updateTrack: function() {
    this.textContainer.style.left = audio.trackList[audio.track].position;
  }
};

var app = {
  init: function() {
    this.firstRender = true;
    this.firstLoad = true;
    this.firstPlay = true;
    this.isPlaying = false;

    this.counter;

    canvas.init();

    canvas.frame.width = canvas.width;
    canvas.frame.height = canvas.height;

    audio.init();
    ui.init();

    audio.loadTrack();
  },

  play: function() {
    if (this.firstPlay && !this.firstLoad) audio.loadTrack();

    if (this.firstRender) canvas.render();

    if (typeof this.counter === 'undefined') this.counter = setInterval(this.count, 100);

    ui.playFunc();
    ui.updateTrack();
    audio.play();

    this.firstRender = false;
    this.firstLoad = false;
    this.firstPlay = false;
    this.isPlaying = true;
  },

  pause: function() {
    ui.pauseFunc();
    audio.pause();
    this.isPlaying = false;
  },

  end: function() {
    this.pause();
    this.firstPlay = true;
    audio.loaded = false;

    audio.currentTime = 0;
  },

  count: function() {
    if (app.isPlaying && audio.loaded) audio.currentTime += 0.1;

    ui.progress.style.width = (audio.currentTime * 100 / audio.duration).toString() + '%';

    if (audio.currentTime >= audio.duration) app.end();
  }
};

app.init();

ui.play.onclick = function() {
  app.play();
};

ui.pause.onclick = function() {
  app.pause();
};

ui.previous.onclick = function() {
  if (app.isPlaying) app.pause();

  if (audio.currentTime == 0) {
    audio.track--;
    audio.track < 0 ? audio.track = audio.trackList.length - 1 : null;

    ui.updateTrack();
  }

  app.firstPlay = true;
  audio.loaded = false;

  audio.currentTime = 0;
}

ui.next.onclick = function() {
  if (app.isPlaying) app.pause();

  audio.track++;
  audio.track > audio.trackList.length - 1 ? audio.track = 0 : null;
  ui.updateTrack();

  app.firstLoad = false;
  app.firstPlay = true;
  audio.loaded = false;

  audio.currentTime = 0;
}