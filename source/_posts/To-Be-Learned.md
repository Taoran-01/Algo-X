---
title: 待学习
date: 2024-08-08 11:05:27
categories:
- 笔记
- 算法
tags: 
sitemap: false
---

---
### 写在前面
这个计划正在列，还没列完。

自己列的，没找人，所以选的题不是很合适。  
这是我的计划，不许抄袭。如果你觉得你也需要一个计划，等什么，赶紧去列。

---
### 注意事项（对自己）
题目列在哪里就用什么方法做。例如，列在“欧拉定理”下的题目就不要用“莫比乌斯反演”做，列在“随机化”下的题目就不要用“正解”做。

后面的东西赶紧列完，别拖，一拖又是好几周。

---
### 综述
杂项
1.  [x] 单调栈与单调队列
2.  [x] ST表
3.  [ ] 最长上升子序列
4.  [ ] 离散化
5.  [ ] 差分
6.  [ ] 线段树
7.  [ ] 动态规划 (背包 区间DP 树形DP 数位DP 状压DP)
8.  [ ] 点分治
9.  [ ] 树的直径
10. [ ] 二分 三分 整体二分 线段树分治
11. [ ] Tarjan与图的连通性
12. [ ] 逆序对
13. [ ] 随机化 (模拟退火 粒子群算法)

数论专项
1.  [ ] 扩展欧几里得算法
2.  [ ] 素数筛
3.  [ ] 质因数分解
4.  [ ] 素数筛 欧拉定理 欧拉反演 莫比乌斯反演
5.  [ ] 中国剩余定理

字符串专项
1.  [ ] 字典树 0-1Trie
2.  [ ] KMP算法 AC自动机 后缀数组
3.  [ ] Manacher算法
4.  [ ] 最小表示

杂项
1.  [ ] 分治法
2.  [ ] 动态规划 (计数DP 概率DP 期望DP)
3.  [ ] 分块
4.  [ ] 莫队 带修莫队
5.  [ ] 高斯消元
6.  [ ] 平衡树 (FHQ Treap, Splay, 红黑树) srd::rope pb_ds
7.  [ ] 网络流 (EK Dinic ISAP 二分图匹配 最大流最小割 最小费用最大流)
8.  [ ] 树链剖分 长链剖分
9.  [ ] 扫描线 离线二维数点
10. [ ] DP优化 (倍增优化 数据结构优化 单调队列优化 斜率优化 四边形不等式优化)
11. [ ] O(n)逆序对
12. [ ] 子集枚举
13. [ ] 高精度运算
14. [ ] 矩阵快速幂
15. [ ] 括号匹配类问题
16. [ ] 简单计算几何
17. [ ] 可持久化数据结构 (可持久化0-1Trie 可持久化并查集)
18. [ ] 矩阵优化DP WQS二分 FFT分治 CDQ分治
19. [ ] 反悔贪心
20. [ ] KD-Tree
21. [ ] 左偏树
22. [ ] 跳跃表
23. [ ] 树套树
24. [ ] 启发式搜索

---
### 单调栈与单调队列
#### 内容
1.  [x] 单调栈 - [OI-Wiki](https://oi-wiki.org/ds/monotonous-stack/)
2.  [x] 单调队列 - [OI-Wiki](https://oi-wiki.org/ds/monotonous-queue/)
#### 习题
1.  [x] [洛谷P5788](https://www.luogu.com.cn/problem/P5788) 单调栈
2.  [x] [SPOJ HISTOGRA](https://www.spoj.com/problems/HISTOGRA/) Largest Rectangle in a Histogram
3.  [x] [洛谷P1886](https://www.luogu.com.cn/problem/P1886) 滑动窗口
4.  [ ] [洛谷P1440](https://www.luogu.com.cn/problem/P1440) 求m区间内的最小值

---
### ST表
#### 内容
1.  [x] ST表 - [OI-Wiki](https://oi-wiki.org/ds/sparse-table/) | [Algo-X.cn](../Sparse-Table/)
#### 习题
1.  [x] [洛谷P3865](https://www.luogu.com.cn/problem/P3865) ST表&RMQ问题
2.  [ ] [洛谷P2251](https://www.luogu.com.cn/problem/P2251) 质量检测

---
### 最长上升子序列
#### 内容
1.  [x] 朴素DP
2.  [x] 二分法
3.  [ ] 树状数组 - [gaawing](https://www.cnblogs.com/Rosebud/p/9845935.html)
#### 习题
1.  [x] [洛谷B3637](https://www.luogu.com.cn/problem/B3637) 最长上升子序列
2.  [ ] [ABC360G](https://www.luogu.com.cn/problem/AT_abc360_g) Suitable Edit for LIS

---
### 差分
#### 内容
1.  [ ] 差分 - [OI-Wiki](https://oi-wiki.org/basic/prefix-sum/#%E5%B7%AE%E5%88%86)
#### 习题
1.  [ ] [洛谷P1672](https://www.luogu.com.cn/problem/P1672) [USACO05FEB] Feed Accounting S
2.  [ ] [洛谷P8648](https://www.luogu.com.cn/problem/P8648) [蓝桥杯 2017 省 A] 油漆面积
3.  [ ] [洛谷P7962](https://www.luogu.com.cn/problem/P7962) [NOIP2021] 方差

---
### 线段树
#### 内容
1.  [ ] 普通线段树
2.  [ ] 权值线段树
3.  [ ] 动态开点线段树
4.  [ ] 线段树分裂
5.  [ ] 线段树合并
6.  [ ] 标记永久化
7.  [ ] 二维线段树
8.  [ ] 可持久化线段树
#### 习题
1.  [ ] [洛谷P3372](https://www.luogu.com.cn/problem/P3372) 线段树1
2.  [ ] [洛谷P3373](https://www.luogu.com.cn/problem/P3373) 线段树2
3.  [ ] [洛谷P1438](https://www.luogu.com.cn/problem/P1438) 无聊的数列
4.  [ ] [洛谷P1523](https://www.luogu.com.cn/problem/P1253) 扶苏的问题
5.  [ ] [HDU1394](https://acm.hdu.edu.cn/showproblem.php?pid=1394) Minimum Inversion Number
6.  [ ] [洛谷P1471](https://www.luogu.com.cn/problem/P1471) 方差
7.  [ ] [洛谷P1637](https://www.luogu.com.cn/problem/P1637) 三元上升子序列
8.  [ ] [洛谷P6327](https://www.luogu.com.cn/problem/P6327) 区间加区间 sin 和
9.  [ ] [洛谷P5494](https://www.luogu.com.cn/problem/P5494) 线段树分裂
10. [ ] [洛谷P4556](https://www.luogu.com.cn/problem/P4556) 线段树合并
11. [ ] [洛谷P3224](https://www.luogu.com.cn/problem/P3224) [HNOI2012] 永无乡
12. [ ] [洛谷P5298](https://www.luogu.com.cn/problem/P5298) [PKUWC2018] Minimax
13. [ ] [洛谷P1600](https://www.luogu.com.cn/problem/P1600) 天天爱跑步
14. [ ] [洛谷P8969](https://www.luogu.com.cn/problem/P8969) 幻梦 | Dream with Dynamic

---
### 背包
#### 内容
1.  [ ] 01背包
2.  [ ] 完全背包
3.  [ ] 多重背包
4.  [ ] 混合背包
5.  [ ] 滚动数组
6.  [ ] 二进制优化
7.  [ ] 有依赖的背包
#### 习题
1.  [ ] [洛谷P1048](https://www.luogu.com.cn/problem/P1048) [NOIP2005 普及组] 采药
2.  [ ] [洛谷P1616](https://www.luogu.com.cn/problem/P1616) 疯狂的采药
3.  [ ] [洛谷P1833](https://www.luogu.com.cn/problem/P1833) 樱花
4.  [ ] [洛谷P1064](https://www.luogu.com.cn/problem/P1064) [NOIP2006 提高组] 金明的预算方案
5.  [ ] [洛谷P2904](https://www.luogu.com.cn/problem/P2904) [USACO08MAR] River Crossing S

---
### 区间DP
#### 内容
1.  [ ] 区间DP - [OI-Wiki](https://oi-wiki.org/dp/interval/) | [endl](https://www.cnblogs.com/ljy-endl/p/11610549.html)
#### 习题
1.  [ ] [洛谷P1775](https://www.luogu.com.cn/problem/P1775) 石子合并
2.  [ ] [洛谷P1063](https://www.luogu.com.cn/problem/P1063) [NOIP2006 提高组] 能量项链
3.  [ ] [洛谷P4767](https://www.luogu.com.cn/problem/P4767) [IOI2000] 邮局 加强版
4.  [ ] [洛谷P1005](https://www.luogu.com.cn/problem/P1005) [NOIP2007 提高组] 矩阵取数游戏

---
### 树形DP
#### 内容
1.  [ ] 朴素树形DP
2.  [ ] 树形背包
3.  [ ] 换根DP
#### 习题
1.  [ ] [洛谷P1352](https://www.luogu.com.cn/problem/P1352) 没有上司的舞会
2.  [ ] [洛谷P2014](https://www.luogu.com.cn/problem/P2014) 选课
3.  [ ] [洛谷P4516](https://www.luogu.com.cn/problem/P4516) 潜入行动
4.  [ ] [洛谷P3177](https://www.luogu.com.cn/problem/P3177) [HAOI2015] 树上染色
5.  [ ] [洛谷P3698](https://www.luogu.com.cn/problem/P3698) [CQOI2017] 小Q的棋盘
6.  [ ] [洛谷P2899](https://www.luogu.com.cn/problem/P2899) [USACO08JAN] Cell Phone Network G
7.  [ ] [洛谷P3478](https://www.luogu.com.cn/problem/P3478) [POI2008] STA-Station
8.  [ ] [洛谷P3047](https://www.luogu.com.cn/problem/P3047) [USACO12FEB] Nearby Cows G
9.  [ ] [洛谷P2986](https://www.luogu.com.cn/problem/P2986) [USACO10MAR] Great Cow Gathering G

---
### 数位DP
#### 内容
1.  [ ] 数位DP - [OI-Wiki](https://oi-wiki.org/dp/number/)
#### 习题
1.  [ ] [洛谷P2602](https://www.luogu.com.cn/problem/P2602) [ZJOI2010] 数字计数
2.  [ ] [洛谷P4999](https://www.luogu.com.cn/problem/P4999) 烦人的数学作业
3.  [ ] [洛谷P2657](https://www.luogu.com.cn/problem/P2657) [SCOI2009] windy数

---
### 状压DP
#### 内容
1.  [ ] 状压DP - [OI-Wiki](https://oi-wiki.org/dp/state/)
#### 习题
1.  [ ] [洛谷P1896](https://www.luogu.com.cn/problem/P1896) [SCOI2005] 互不侵犯
2.  [ ] [洛谷P5911](https://www.luogu.com.cn/problem/P5911) [POI2004] PRZ
3.  [ ] [洛谷P2704](https://www.luogu.com.cn/problem/P2704) 炮兵阵地
4.  [ ] [洛谷P3959](https://www.luogu.com.cn/problem/P3959) 宝藏
5.  [ ] [洛谷P2150](https://www.luogu.com.cn/problem/P2150) 寿司晚宴

---
### 其它值得一做的DP
#### 习题
1.  [ ] [洛谷P4019](https://www.luogu.com.cn/problem/P4019) 多边形染色
2.  [ ] [洛谷P2389](https://www.luogu.com.cn/problem/P2389) 电脑班的裁员

---
### 点分治
#### 内容
1.  [ ] 点分治
2.  [ ] 点分树
#### 习题
1.  [ ] [洛谷P3806](https://www.luogu.com.cn/problem/P3806) 点分治1
2.  [ ] [洛谷P10461](https://www.luogu.com.cn/problem/P10461) Tree
3.  [ ] [洛谷P6329](https://www.luogu.com.cn/problem/P6329) 点分树
4.  [ ] [洛谷P2056](https://www.luogu.com.cn/problem/P2056) [ZJOI2007] 捉迷藏

---
### 二分
#### 习题
1.  [ ] [洛谷P1182](https://www.luogu.com.cn/problem/P1182) 数列分段 Section II
2.  [ ] [洛谷P1661](https://www.luogu.com.cn/problem/P1661) 扩散
3.  [ ] [洛谷P1404](https://www.luogu.com.cn/problem/P1404) 平均数

---
### 三分
#### 习题
1.  [ ] [洛谷P3382](https://www.luogu.com.cn/problem/P3382) 三分
2.  [ ] [洛谷P1883](https://www.luogu.com.cn/problem/P1883) 三分
3.  [ ] [UVA1476](https://www.luogu.com.cn/problem/UVA1476) Error Curves

---
### 整体二分
#### 内容
1.  [ ] 整体二分 [OI-Wiki](https://oi-wiki.org/misc/parallel-binsearch/)
#### 习题
1.  [ ] [洛谷P1257](https://www.luogu.com.cn/problem/P1527) [国家集训队] 矩阵乘法

---
### 线段树分治
#### 内容
1.  [ ] 线段树与区间询问 - [OI-WIki](https://oi-wiki.org/topic/segment-tree-offline/)
#### 习题
1.  [ ] [洛谷P5787](https://www.luogu.com.cn/problem/P5787) 线段树分治

---
### 强连通分量
#### 内容
1.  [ ] 强连通分量
2.  [ ] 缩点
3.  [ ] DAG上的DP - [OI-Wiki](https://oi-wiki.org/dp/dag/)
#### 习题
1.  [ ] [洛谷B3609](https://www.luogu.com.cn/problem/B3609) 强连通分量
2.  [ ] [洛谷P3387](https://www.luogu.com.cn/problem/P3387) 缩点
3.  [ ] [洛谷P2272](https://www.luogu.com.cn/problem/P2272) [ZJOI2007] 最大半连通子图
4.  [ ] [洛谷P4306](https://www.luogu.com.cn/problem/P4306) [JSOI2010] 连通数
5.  [ ] [洛谷P3627](https://www.luogu.com.cn/problem/P3627) [APIO2009] 抢掠计划

---
### 割点、点双联通分量与圆方树
#### 内容
1.  [ ] 割点
2.  [ ] 点双联通分量
3.  [ ] 圆方树
#### 习题
1.  [ ] [洛谷P3388](https://www.luogu.com.cn/problem/P3388) 割点
2.  [ ] [洛谷P8435](https://www.luogu.com.cn/problem/P8435) 点双联通分量
3.  [ ] [BZOJ3331](https://www.lydsy.com/JudgeOnline/problem.php?id=3331) [BJOI2013] 压力
4.  [ ] [CF487E](https://www.luogu.com.cn/problem/CF487E) Tourists

---
### 割边与边双联通分量
#### 内容
1.  [ ] 割边
2.  [ ] 边双联通分量
3.  [ ] 边双树
#### 例题
1.  [ ] [洛谷P8436](https://www.luogu.com.cn/problem/P8436) 边双连通分量
2.  [ ] [洛谷P8867](https://www.luogu.com.cn/problem/P8867) [NOIP2022] 建造军营
3.  [ ] [洛谷P3225](https://www.luogu.com.cn/problem/P3225) [HNOI2012] 矿场搭建

---
### 逆序对
#### 内容
1.  [ ] 归并排序 - [OI-Wiki](https://oi-wiki.org/basic/merge-sort/#%E9%80%86%E5%BA%8F%E5%AF%B9)
2.  [ ] 树状数组 - [Lee贤](https://blog.csdn.net/m0_64707620/article/details/130033642)
#### 习题
1.  [ ] [洛谷P1908](https://www.luogu.com.cn/problem/P1908) 逆序对
2.  [ ] [洛谷P1966](https://www.luogu.com.cn/problem/P1966) [NOIP2013 提高组] 火柴排队

----
### 随机化
#### 内容
1.  [ ] 模拟退火 - [OI-Wiki](https://oi-wiki.org/misc/simulated-annealing/) | [M_sea](https://www.luogu.com.cn/article/2mnd34y4)
2.  [ ] 粒子群算法
#### 习题
1.  [ ] [洛谷P1337](https://www.luogu.com.cn/problem/P1337) [JSOI2004] 平衡点 / 吊打XXX
2.  [ ] [洛谷P4035](https://www.luogu.com.cn/problem/P4035) [JSOI2008] 球形空间产生器
3.  [ ] [洛谷P7962](https://www.luogu.com.cn/problem/P7962) [NOIP2021] 方差

---
### 扩展欧几里得算法
#### 内容
1.  [ ] 裴蜀定理 - [OI-Wiki](https://oi-wiki.org/math/number-theory/bezouts/) | [Algo-X.cn](../Minimum-Positive-Number-of-Linear-Combinations-of-Coefficients/)
2.  [ ] 扩展欧几里得算法 - [OI-Wiki](https://oi-wiki.org/math/number-theory/gcd/#%E6%89%A9%E5%B1%95%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97%E7%AE%97%E6%B3%95)
#### 习题
1.  [ ] [CF510D](https://www.luogu.com.cn/problem/CF510D) Fox And Jumping

---
### 质因数分解
#### 内容
1.  [ ] 筛法 - [OI-Wiki](https://oi-wiki.org/math/number-theory/sieve/)
2.  [ ] Pollard-Rho算法 - [OI-Wiki](https://oi-wiki.org/math/number-theory/pollard-rho/#pollard-rho-%E7%AE%97%E6%B3%95)
#### 习题
2.  [ ] [洛谷P4718](https://www.luogu.com.cn/problem/P4718) Pollard-Rho

---
### 素数筛
#### 内容
1.  [ ] 筛法 - [OI-Wiki](https://oi-wiki.org/math/number-theory/sieve/)
#### 习题
1.  [ ] [洛谷P1036](https://www.luogu.com.cn/problem/P1036) [NOIP2002 普及组] 选数
2.  [ ] [洛谷P1069](https://www.luogu.com.cn/problem/P1069) [NOIP2009 普及组] 细胞分裂

---
### 欧拉定理
1.  [ ] 欧拉定理 - [OI-Wiki](https://oi-wiki.org/math/number-theory/fermat/#%E6%AC%A7%E6%8B%89%E5%AE%9A%E7%90%86)
2.  [ ] 扩展欧拉定理 - [OI-Wiki](https://oi-wiki.org/math/number-theory/fermat/#%E6%89%A9%E5%B1%95%E6%AC%A7%E6%8B%89%E5%AE%9A%E7%90%86)
#### 习题
1.  [ ] [洛谷P2158](https://www.luogu.com.cn/problem/P2158) [SDOI2008] 仪仗队
2.  [ ] [洛谷P1045](https://www.luogu.com.cn/problem/P1405) 苦恼的小明
3.  [ ] [洛谷P5901](https://www.luogu.com.cn/problem/P5901) 扩展欧拉定理

---
### 莫比乌斯反演
#### 内容
1.  [ ] 莫比乌斯反演 - [OI-Wiki](https://oi-wiki.org/math/number-theory/mobius/) | [Algo-X.cn](../Mobius-Inversion/)
#### 习题
1.  [ ] [洛谷P1390](https://www.luogu.com.cn/problem/P1390) 公约数的和

---
### 中国剩余定理
#### 内容
1.  [ ] 中国剩余定理 - [OI-Wiki](https://oi-wiki.org/math/number-theory/crt/)
#### 习题
1.  [ ] [洛谷P2480](https://www.luogu.com.cn/problem/P2480) [SDOI2010] 古代猪文

---
### Manacher算法
#### 内容
1.  [ ] Manacher算法 - [Wild-Donkey](https://www.cnblogs.com/Wild-Donkey/p/14654680.html)
#### 习题
1.  [ ] [洛谷P3805](https://www.luogu.com.cn/problem/P3805) Manacher

---
### 最小表示
#### 习题
1.  [ ] [洛谷P1368](https://www.luogu.com.cn/problem/P1368) 最小表示法
2.  [ ] [UVA1584](https://www.luogu.com.cn/problem/UVA1584) 环状序列 Circular Sequence

---
### 分治法
#### 习题
1.  [ ] [洛谷P7883](https://www.luogu.com.cn/problem/P7883) 平面最近点对（加强加强版）

---
### 高斯消元
#### 习题
1.  [ ] [洛谷P3389](https://www.luogu.com.cn/problem/P3389) 高斯消元法

---
### 网络流
#### 习题
1.  [ ] [洛谷P3376](https://www.luogu.com.cn/problem/P3376) 网络最大流
2.  [ ] [洛谷P3386](https://www.luogu.com.cn/problem/P3386) 二分图最大匹配
3.  [ ] [洛谷P4897](https://www.luogu.com.cn/problem/P4897) 最小割树
4.  [ ] [洛谷P3329](https://www.luogu.com.cn/problem/P3329) [ZJOI2011] 最小割

---
### 树链剖分
#### 习题
1.  [ ] [洛谷P2486](https://www.luogu.com.cn/problem/P2486) [SDOI2011] 染色

---
### 扫描线
#### 内容
1.  [x] 扫描线 - [OI-Wiki](https://oi-wiki.org/geometry/scanning/)
#### 习题
1.  [ ] [HDU1542](https://acm.hdu.edu.cn/showproblem.php?pid=1542) Atlantis
2.  [ ] [洛谷P1884](https://www.luogu.com.cn/problem/P1884) [USACO12FEB] Overplanting S
3.  [ ] [洛谷P1904](https://www.luogu.com.cn/problem/P1904) 天际线

---
### 离线二维数点
#### 内容
1.  [x] 二维数点 - [OI-Wiki](https://oi-wiki.org/geometry/scanning/#%E4%BA%8C%E7%BB%B4%E6%95%B0%E7%82%B9)
#### 习题
1.  [x] [洛谷P10814](https://www.luogu.com.cn/problem/P10814) 离线二维数点
2.  [ ] [洛谷P2163](https://www.luogu.com.cn/problem/P2163) [SHOI2007] 园丁的烦恼
3.  [ ] [洛谷P3755](https://www.luogu.com.cn/problem/P3755) [CQOI2017] 老C的任务

---
### 简单计算几何
#### 习题
1.  [ ] [洛谷P1027](https://www.luogu.com.cn/problem/P1027) [NOIP2001 提高组] Car 的旅行路线
2.  [ ] [洛谷P1172](https://www.luogu.com.cn/problem/P1142) 轰炸
3.  [ ] [洛谷P1652](https://www.luogu.com.cn/problem/P1652) 圆

---
### 斜率优化
#### 内容
1.  [ ] 斜率优化 - [OI-Wiki](https://oi-wiki.org/dp/opt/slope/) | [Algo-X.cn](../Slope-Optimization/)
#### 习题
1.  [ ] [洛谷P4360](https://www.luogu.com.cn/problem/P4360) [CEOI2004] 锯木厂选址
2.  [ ] [洛谷P1404](https://www.luogu.com.cn/problem/P1404) 平均数

---
### 四边形不等式优化
#### 习题
1.  [ ] [洛谷P1880](https://www.luogu.com.cn/problem/P1880) [NOI1995] 石子合并

---
### 矩阵快速幂
#### 内容
1.  [x] 矩阵加速递推 - [OI-Wiki](https://oi-wiki.org/math/linear-algebra/matrix/#%E7%9F%A9%E9%98%B5%E5%8A%A0%E9%80%9F%E9%80%92%E6%8E%A8)
#### 习题
1.  [x] [洛谷P3390](https://www.luogu.com.cn/problem/P3390) 矩阵快速幂
2.  [x] [洛谷P1962](https://www.luogu.com.cn/problem/P1962) 斐波那契数列
3.  [x] [洛谷P2106](https://www.luogu.com.cn/problem/P2106) Sam数
4.  [x] [洛谷P5175](https://www.luogu.com.cn/problem/P5175) 数列

---
### 可持久化0-1Trie
#### 习题
1.  [ ] [CF1665E](https://www.luogu.com.cn/problem/CF1665E) MinimizOR

---
### CDQ分治
#### 习题
1.  [ ] [洛谷P3810](https://www.luogu.com.cn/problem/P3810) 三维偏序
2.  [ ] [洛谷P3755](https://www.luogu.com.cn/problem/P3755) [CQOI2017] 老C的任务

---
### 反悔贪心
#### 习题
1.  [ ] [洛谷P1484](https://www.luogu.com.cn/problem/P1484) 种树
2.  [ ] [洛谷P10478](https://www.luogu.com.cn/problem/P10478) 生日礼物

---
### 写在最后
应该没有人能坚持看到这里……

我列这个计划的初心是证明我没有被抛弃。我要找到属于我自己的节奏，在短时间内达到更好的学习效果。

刚开始列这个计划的时候，我在图书馆做社会实践。都是新高一的，一小时的休息时间，周围的人聚在一起打游戏。我挑了两本竞赛书，坐在角落的凳子上。图书馆里的空调很吵，书架一眼望不到尽头……

NOIP的脚步声近了，希望我能拿到理想的成绩。
