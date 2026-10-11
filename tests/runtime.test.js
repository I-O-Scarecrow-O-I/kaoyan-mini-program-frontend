import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { beforeEach, test } from 'node:test'

const loginScript = readFileSync(new URL('../src/pages/My/My.vue', import.meta.url), 'utf8')
  .match(/<script>([\s\S]*?)<\/script>/)[1]
const { default: loginPage } = await import(`data:text/javascript;base64,${Buffer.from(loginScript).toString('base64')}`)

let requests
let loading
let toasts
let storage
let requestTask

beforeEach(async () => {
  requests = []
  loading = []
  toasts = []
  storage = new Map([['Token', 'saved-token']])
  requestTask = { abort() {} }
  globalThis.uni = {
    getStorageSync: key => storage.get(key),
    setStorageSync: (key, value) => storage.set(key, value),
    showLoading: options => loading.push(options),
    hideLoading: () => loading.push('hidden'),
    showToast: options => toasts.push(options),
    request: options => {
      requests.push(options)
      return requestTask
    }
  }
  await import(`../src/common/runtime.js?test=${Date.now()}-${Math.random()}`)
})

test('GET includes the stored token and returns the uni response without a wx global', async () => {
  const response = { data: { code: 0, data: { id: 11 } }, statusCode: 200 }
  const pending = uni.$http.get('students/session', { username: 'student' })
  assert.equal(requests[0].url, 'http://127.0.0.1:8081/students/session')
  assert.equal(requests[0].method, 'GET')
  assert.deepEqual(requests[0].data, { username: 'student' })
  assert.deepEqual(requests[0].header, { Token: 'saved-token' })
  requests[0].success(response)
  requests[0].complete(response)
  assert.equal(await pending, response)
})

test('POST sends registration data and closes loading on network failure', async () => {
  const data = { username: 'student', password: 'example' }
  const error = { errMsg: 'request:fail' }
  const pending = uni.$http.post('/students/register', data)
  assert.equal(requests[0].method, 'POST')
  assert.deepEqual(requests[0].data, data)
  assert.deepEqual(loading, [{ title: '正在加载...' }])
  requests[0].fail(error)
  requests[0].complete(error)
  await assert.rejects(pending, value => value === error)
  assert.equal(loading.at(-1), 'hidden')
})

test('message helper keeps default and custom toast behavior', () => {
  uni.$showMsg()
  uni.$showMsg('登录成功', 2000)
  assert.deepEqual(toasts, [
    { title: '数据请求失败', duration: 1500, icon: 'none' },
    { title: '登录成功', duration: 2000, icon: 'none' }
  ])
})

test('API and media URLs share a base while external URLs remain usable', () => {
  assert.equal(uni.$apiUrl('/upload/book.jpg'), 'http://127.0.0.1:8081/upload/book.jpg')
  assert.equal(uni.$apiUrl('https://example.com/book.jpg'), 'https://example.com/book.jpg')
})

test('login sends credentials in a POST body and updates token and login state', async () => {
  const page = { ...loginPage.data(), username: 'student', password: 'secret?&password' }
  const response = { data: { code: 0, token: 'new-token' } }
  const pending = loginPage.methods.login.call(page)
  assert.equal(requests[0].method, 'POST')
  assert.equal(requests[0].url, 'http://127.0.0.1:8081/students/login')
  assert.deepEqual(requests[0].data, { username: 'student', password: 'secret?&password' })
  requests[0].success(response)
  requests[0].complete(response)
  await pending
  assert.equal(page.loginDone, true)
  assert.equal(storage.get('Token'), 'new-token')
})

test('raw request preserves caller token, data, callbacks and request task without loading', () => {
  const callbacks = []
  const response = { data: { code: 0 }, statusCode: 200, header: { 'X-Request-ID': 'request-1' } }
  const task = uni.$http.request({
    url: '/answer/comment/makeComment',
    method: 'POST',
    data: { comment: 'example' },
    header: { Token: 'caller-token' },
    success: value => callbacks.push(['success', value]),
    complete: value => callbacks.push(['complete', value])
  })
  assert.equal(task, requestTask)
  assert.equal(requests[0].url, 'http://127.0.0.1:8081/answer/comment/makeComment')
  assert.equal(requests[0].method, 'POST')
  assert.deepEqual(requests[0].data, { comment: 'example' })
  assert.deepEqual(requests[0].header, { Token: 'caller-token' })
  requests[0].success(response)
  requests[0].complete(response)
  assert.deepEqual(callbacks.map(([event]) => event), ['success', 'complete'])
  assert.equal(callbacks[0][1], response)
  assert.equal(callbacks[1][1], response)
  assert.deepEqual(loading, [])
})

test('raw external request does not add a token and forwards failure and completion unchanged', () => {
  const callbacks = []
  const error = { errMsg: 'request:fail connection closed' }
  uni.$http.request({
    url: 'https://example.com/questions',
    method: 'GET',
    fail: value => callbacks.push(['fail', value]),
    complete: value => callbacks.push(['complete', value])
  })
  assert.equal(requests[0].url, 'https://example.com/questions')
  assert.equal(requests[0].header, undefined)
  requests[0].fail(error)
  requests[0].complete(error)
  assert.deepEqual(callbacks.map(([event]) => event), ['fail', 'complete'])
  assert.equal(callbacks[0][1], error)
  assert.equal(callbacks[1][1], error)
  assert.deepEqual(loading, [])
})

test('failed login keeps token and logged-out state and shows the existing message', async () => {
  const page = { ...loginPage.data(), username: 'student', password: 'wrong-password' }
  const response = { data: { code: 500, msg: '账号或密码不正确' } }
  const pending = loginPage.methods.login.call(page)
  requests[0].success(response)
  requests[0].complete(response)
  await pending
  assert.equal(page.loginDone, false)
  assert.equal(storage.get('Token'), 'saved-token')
  assert.deepEqual(toasts, [{ title: '账号或密码不正确', duration: 1500, icon: 'none' }])
})

test('empty login credentials show the existing prompt without sending a request', async () => {
  const page = loginPage.data()
  await loginPage.methods.login.call(page)
  assert.deepEqual(requests, [])
  assert.deepEqual(loading, [])
  assert.deepEqual(toasts, [{ title: '请将信息填写完整', duration: 1500, icon: 'none' }])
})
