## xss
### xss 攻击的种类
1. 反射型
 一般存在于ssr 服务端渲染，比如恶意用户在url的参数 输入攻击脚本，服务端没有加任何的检验和过滤，直接将其拼接到html中返回，可能造成xss攻击
2. dom型 类似于反射型 也是浏览器中 js直接读取url地址的参数信息，并且直接渲染到页面上，此时如果参数中包含攻击信息，就可能导致xss
3. 存储型xss 恶意用户通过 比如评论输入框 把恶意代码存到数据库内，其他用户访问的时候，可能会被攻击  影响范围最大

### 如何解决
主要解决办法 过滤 
把  & < > ' " \ 都转换成实体 比如 & => &amp < => &lt > => &gt

可以使用的库 比如 xss / DOMPurify

SPA 中 React Vue 对于使用 {} 插入的文本 会做过滤

Content-Security-Policy CSP 内容安全策略
比如 default-src 'self' 只允许加载同源
    script-src 'self' 只允许本站的脚本

HTTP-only 
防止恶意代码 读取cookie信息