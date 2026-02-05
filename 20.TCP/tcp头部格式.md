### 头部格式
##### 固定长度 20B = 4B*5
src Port 2B
dst Port 2B
4B seq
4B ack
头部偏移 4bits 最大 15*4 = 60B
保留 4bits
6位标志 SYNC ACK URG PSH FIN RST
2B的窗口大小
2B的check sum
2B的紧急指针

剩下的 40B 都是可变化的 用来存放SACK

### 面相连接 -> 一条tcp连接 对应一个四元组

### TCP段数据最大长度
MTU 1500 - 最小TCP头部 20 = 1480B MSS

