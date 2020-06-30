class Video {
  constructor(video, options) {
    this.video = video
  }

  setSrc(src) {
    this.video.src = src
  }

  setSource(src) {
    this.video.src = src
  }

  canPlayType() {
    this.video.canPlayType()
  }

  load() {
    this.video.load()
  }

  play() {
    this.video.play()
  }

  paused() {
    this.video.paused()
  }

  format(seconds) {
    if (isNaN(seconds)) return '...';

    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = '0' + seconds;

    return `${minutes}:${seconds}`;
  }
}

