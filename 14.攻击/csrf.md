## csrf
跨站请求伪造

### 攻击方式
主要来自于cookie的自动发送缺陷
cookie 会在请求目标站点时，自动携带
攻击者利用这个特性，在伪造网站请求目标网站 浏览器会自动携带目标网站cookie
攻击者将用户引导到伪造网站 如果用户恰好登陆过目标网站 那么其cookie就会被携带 造成攻击

### 如何解决
用户层面: 不点击陌生网站 及时退出登录 
开发者层面: 
     1. CSRF Token 发送表单的时候，先去服务器请求一个token，提交的时候把token也携带上去，由于ajax请求不可以跨域，所以攻击者无法拿到csrf token

     2. SameSite cookie的同站限制 
        strict: 在 SameSite=Strict 跨站的请求不可以携带cookie
        Lax: 跨站的请求不可以携带cookie，除了<a> <link> 这种 （默认）
        None: 没有任何限制

     3. 不用 cookie 存到localStorage内 并且通过 js加入到 Header的 Authoriztation: Bearer token 