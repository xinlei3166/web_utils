import { Loading } from 'element-ui'

/*.icon-loading {
  display: inline-block;
  width: 60px;
  height: 60px;
  background: url('./assets/images/other/icon-loading.gif') no-repeat;
  background-size: 100% 100%;
}*/

let loading
function startLoading() {
  loading = Loading.service({
    fullscreen: true,
    lock: true,
    text: '加载中...',
    background: 'rgba(255, 255, 255, 0.6)',
    spinner: 'icon-loading',
    target: document.querySelector('.loadingtext') // 设置加载动画区域
  })
}

function endLoading() {
  loading.close();
}

let needLoadingRequestCount = 0;
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}
