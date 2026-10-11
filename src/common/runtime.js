const baseUrl = (import.meta.env?.VITE_API_BASE_URL || 'http://127.0.0.1:8081').replace(/\/+$/, '')

uni.$apiUrl = function(path) {
  if (/^https?:\/\//i.test(path)) return path
  return `${baseUrl}/${String(path).replace(/^\/+/, '')}`
}

function request(method, url, data) {
  uni.showLoading({ title: '正在加载...' })
  return new Promise((resolve, reject) => {
    uni.$http.request({
      url,
      method,
      data,
      header: { Token: uni.getStorageSync('Token') },
      success: resolve,
      fail: reject,
      complete: () => uni.hideLoading()
    })
  })
}

uni.$http = {
  request(options) {
    return uni.request({ ...options, url: uni.$apiUrl(options.url) })
  },
  get(url, data = {}) {
    return request('GET', url, data)
  },
  post(url, data = {}) {
    return request('POST', url, data)
  }
}

uni.$showMsg = function(title = '数据请求失败', duration = 1500) {
  uni.showToast({ title, duration, icon: 'none' })
}
