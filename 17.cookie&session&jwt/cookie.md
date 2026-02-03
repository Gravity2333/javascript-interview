### cookie

#### cookie 解决什么问题
解决 http没有状态的问题
cookie由服务器的 set-cookie设置，浏览器会保存这个cookie 并且在同站的情况下自动将其加入请求头的 cookie字段

#### 明文
cookie是明文传输，不要存储敏感数据，只使用cookie没办法做到登陆鉴权，需要配合 session & jwt

#### cookie属性
- key : cookie的key

- value: cookie的value

- max-age / expires 过期时间 （如果不携带过期时间 为会话cookie 关闭会话则删除 ）max-age: -1 可以主动删除 cookie

- domain cookie的域名 可以设置的更宽松（单点登录），比如wenku.baidu.com 可以设置baidu.com 但是不能设置更严格 比如 a.wenku.baidu.com 是不行的 domain匹配的时候是向更严格的方向匹配的，比如 wenku.baidu.com 会在你访问 a.wenku.baidu.com时 携带

- path cookie的路径 可以设置的更宽松 比如 /manager 可以设置为 / 但是比对的时候更严格 /manager => /manager/a

- sameSaite 跨站策略 防御CSRF 包含Strict Lax None

- secure 仅允许https传输

- http-only 不允许js获得cookie 用来防御xss

### js获取cookie 
使用 document.cookie = xxx设置和获取