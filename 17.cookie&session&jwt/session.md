## session
单独的cookie不能存储敏感数据 更不能用来鉴权 我们不能把用户的密码存在cookie里

session 就是把敏感数据存在后端服务器内 比如redis，并且把key作为session_id 返回给浏览器

浏览器可以通过set-cookie 或者localstorage的方式保存cookie

缺点就是对后台服务压力大，对分布式，负载均衡 不友好