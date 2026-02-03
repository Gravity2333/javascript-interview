### JWT 是一种token的格式 Json Web Token
其格式为  header.payload.signature
header 一般包含 算法 
{
  "alg": "HS256",
  "typ": "JWT"
}
paylaod就是负载信息
signature是服务端用一个对称密钥进行签名

最后把 header payload 转换成base64 并且和signature 用 . 拼接 如下:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkdlbWluaSIsImFkbWluIjp0cnVlLCJpYXQiOjE3MDY4NTAwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

signature 主要是为了防伪造！
需要注意 base64不是加密，jwt也不能携带敏感信息
但是能保证 jwt不会被伪造! 所以可以用来鉴权

### 存储
可以放到cookie 或者 localStorage