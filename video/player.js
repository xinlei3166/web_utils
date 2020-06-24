const defaultOptions = {
  container: 'body',
  width: '100%',
  height: '100%',
}

class Player {
  constructor(options) {
    this.options = {...defaultOptions, ...(options || {})}
  }

  init() {
    //
  }
}
