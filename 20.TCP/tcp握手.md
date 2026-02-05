### 握手
#### TCP 三次握手 四次挥手

#### TCP 握手 三次
- 建立方发送SYNC 此时 标记位 SYNC = 1 seq = x ，发送方发送之后 进入 SYNC_SEND状态
- 接收方收到SYNC 发送 ACK = 1 ack = x+1 seq= y 进入 SYNC_RCVD 接收方此时确定自己有接受能力
- 发送方收到ACK 确定自己有发送和接受能力，返回 ACK = 1 ack = y+1 进入ESTABLISH
- 接收方接受到 确定自己有发送能力 进入ESTABLISH


#### TCP 挥手 四次
- 断开方发送 FIN =1 seq = x 进入 TIME_WAIT_1 状态
- 被断开方收到后，可能还有数据没传输完成 返回 ack = x+1 seq = y 进入CLOSE_WAIT状态
- 断开方接受到后，直接进入TIME_WAIT_2 状态
- 被断开方此时发送剩余数据 seq会增加 y+1+2... 此时tcp是半开放状态 
- 被断开方 发送完数据后 发送 FIN=1 seq=y+n 进入 LAST ACK状态 
- 断开方接受到 发送ack y+n+1 进入 TIME_WAIT 等待2MSL 保证链路中所有的 报文都被抛弃 进入关闭状态
- 接收方接受到 关闭

### 不要让服务器主动断开链接 会占用服务器资源！
