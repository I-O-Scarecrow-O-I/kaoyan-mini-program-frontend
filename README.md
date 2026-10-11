# 考研小程序前端

uni-app（Vue 3）项目，使用 Vite CLI 构建，源码和页面配置位于 `src/`。当前阶段以保留原有页面和业务行为为目标。

## 环境要求

- Node.js `>=20.19.0`
- npm（仓库提供 `package-lock.json`，使用 npm 安装依赖）

```sh
npm ci
```

## 本地开发

```sh
# H5 开发服务
npm run dev:h5

# 微信小程序开发编译
npm run dev:mp-weixin
```

微信小程序开发编译后，可在微信开发者工具中打开 `dist/dev/mp-weixin`。

## 生产构建

```sh
# H5
npm run build:h5

# 微信小程序
npm run build:mp-weixin
```

构建产物分别写入 `dist/build/h5` 和 `dist/build/mp-weixin`。`npm run test` 运行回归测试；`npm run check` 依次运行测试和两个端的生产构建。

## 后端地址

接口基地址由 `VITE_API_BASE_URL` 设置，配置入口见 `.env.example`。本地默认值为 `http://127.0.0.1:8081`。可在项目根目录创建 `.env.local` 并设置实际地址，例如：

```dotenv
VITE_API_BASE_URL=https://api.example.com
```

`.env.local` 已加入忽略规则，不要提交包含个人环境地址的本地配置。H5 浏览器和开发服务器所在机器可使用本机后端地址；微信真机上的 `127.0.0.1` 指向手机自身，因此真机需要改为手机可访问的后端地址。微信小程序正式请求还要求使用 HTTPS，并在微信公众平台配置合法请求域名。

目前没有可用的真机后端地址，因此尚未完成微信真机或后端联调；开发者工具中的编译通过不代表这些联调已通过。

## 接口调用约定

学生账号登录使用 `POST /students/login`，凭据放在 JSON 请求体中：

```js
uni.$http.post('students/login', { username, password })
```

后端不再支持 `GET /students/login` 或通过查询参数传递登录凭据。

页面也可通过 `uni.$http.request(options)` 使用与 `uni.request` 兼容的回调式接口。相对 `url` 会拼接 `VITE_API_BASE_URL`，绝对 HTTP(S) 地址保持不变；成功、失败、完成回调及返回的请求任务沿用 `uni.request` 行为。此入口不会自动显示加载提示或附加 Token，需要时由调用方在 `options.header` 中设置。现有 `uni.$http.get(url, data)` 和 `uni.$http.post(url, data)` 仍返回 Promise，并保留原有加载提示和 Token 请求头行为。

## 生成文件

历史上曾被 Git 跟踪的 `node_modules/` 和 `unpackage/` 文件现已移出跟踪，本地文件仍保留；`.gitignore` 忽略 `node_modules/`、`unpackage/` 与 `dist/`。后续安装或构建后请检查 `git status`，不要提交依赖安装文件或构建产物。

## 当前阶段验证

迁移后的 4 项回归测试和 H5、微信小程序双端生产构建已在隔离副本通过。这是代码与构建检查，不代表页面业务验收、微信真机验证或后端联调完成。
