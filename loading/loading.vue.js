import Loading from './Loading'
import Vue from 'vue'

/**
 *  挂载到Vue
 */
let instance
const LoadingConstructor = Vue.extend(Loading)

instance = new LoadingConstructor()
document.body.appendChild(instance.$mount().$el)
instance.show = false
const loading = {
  show (options = null) {
    instance.show = true
    if (options) {
      instance.text = options.text
    }
  },
  hide () {
    instance.isShow = false
  }
}

export default {
  install () {
    if (!Vue.$loading) {
      Vue.$loading = loading
    }
  }
}
