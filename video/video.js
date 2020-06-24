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
}

