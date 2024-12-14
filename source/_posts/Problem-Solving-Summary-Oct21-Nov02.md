---
title: Problem-Solving-Summary-Oct21-Nov02
date: 2024-11-10 22:48:30
tags:
---


<!-- 做题总结 24-10-21 至 24-11-02 -->

### Floyd 最短路
**先遍历枚举中间转折节点 $k$。**

无特殊说明，下文中的 $d_{i,j}$ 均指最短路 $\text{dis}_{i,j}$，$w_{i,j}$ 均指边 $(i,j)$ 的权值。

#### T
<!-- Floyd -->
[洛谷P2047](https://www.luogu.com.cn/problem/P2047) [NOI2007] 社交网络

给定一个包含 $n$ 个节点和 $m$ 条边的加权无向连通图，每条边有一个正数权值 $c$，权值越小表示关系越密切。要求计算每个节点在社交网络中的重要程度，重要程度定义为：经过该节点的所有最短路径数目之和，除以图中所有不同最短路径的总数。

考虑 Floyd。  
问题分解为，最短路 $i\rightsquigarrow j$ 上有多少条最短路、及经过点 $k$ 的最短路有几条。

首先统计最短路个数。记 $\text{cnt}_{i,j}$ 表示 $i\rightsquigarrow j$ 的最短路个数。

1. 若成功松弛，即 $d_{i,k}+d_{k,j}<d_{i,j}$，则之前最短路全部作废，统计从 $k$ 开始。  
   $\text{cnt}_{i,j}\leftarrow \text{cnt}_{i,k}\times\text{cnt}_{k,j}$。
2. 若恰好相等，即 $d_{i,k}+d_{k,j}=d_{i,j}$，则找到了一类经过 $k$ 的新的最短路。由于 $k$ 顺序遍历，$k$ 没被统计过，故在原基础上叠加。  
   $\text{cnt}_{i,j}\leftarrow \text{cnt}_{i,j}+\text{cnt}_{i,k}\times\text{cnt}_{k,j}$。

最后对每一个点 $k$ 统计答案。  
如果一个点 $k$ 在最短路 $i\rightsquigarrow j$ 上，则有 $d_{i,k}+d_{k,j}=d_{i,j}$。  
$O(n^2)$ 枚举节点 $i,j,\ i,j\neq k$，判断 $k$ 是否在最短路 $i\rightsquigarrow j$ 上。  
如果在，答案累加 $\frac{i\rightsquigarrow j\text{最短路径数}}{i\rightsquigarrow j\text{且经过}k\text{的最短路径数}}=\frac{\text{cnt}_{i,j}}{\text{cnt}_{i,k}\times\text{cnt}_{k,j}}$。

[AC](https://www.luogu.com.cn/record/183704181) 680.00KB 51ms

#### T
<!-- Floyd -->
[洛谷P1522](https://www.luogu.com.cn/problem/P1522) [USACO2.4] 牛的旅行 Cow Tours

现有多个不连通的牧场，需要在两个不同牧场间添加一条路径，使得新形成的牧场直径最小（也就是说要从这些连通块里随便找两个使其联通，询问新形成连通块的最小直径）。输入包括牧区数量、牧区坐标和牧区间的邻接矩阵。输出新牧场的最小直径，保留六位小数。

先将坐标转化为边权 $w_{i,j}\leftarrow\begin{cases}\sqrt{(x_i-x_j)^2+(y_i-y_j)^2}&\exist(i,j)\\+\infty&\cancel\exist(i,j)\end{cases}$。复杂度 $O(n^2)$。

使用 Floyd 预处理出各连通块内的全源最短路，同时处理出每一个点 $u$ 在自身连通块内距离最远的点的最短路径 $\text{far}_u$ 及连通块 $i$ 内的直径 $\text{diam}_i$。复杂度 $O(n^3)$。  
形式化地：$\text{far}_u=\max\limits_{u,v\in S_i}d_{u,v}$，$\text{diam}_i=\max\limits_{u\in S_i}\text{far}_u$。

最后从若干联通块中遍历枚举选择的连通块 $V_1,V_2$，再遍历枚举各自连通块内的一个点 $i,j$，计算将 $i$ 与 $j$ 直接相连后形成的直径大小。令 $\text{dist}\leftarrow\sqrt{(x_i-x_j)^2+(y_i-y_j)^2}$，则新连通块的直径为 $\max\{\text{diam}_{V_1},\ \text{diam}_{V_2},\ \text{far}_i+\text{dist}+\text{far}_j\}$。

这里有个点，新连通块的直径大小不一定为 $\text{far}_i+\text{dist}+\text{far}_j$，可以构造 Hack。

[AC](https://www.luogu.com.cn/record/183714692) 668.00KB 62ms

#### T
<!-- Floyd -->
[洛谷P6175](https://www.luogu.com.cn/problem/P6175) 无向图的最小环问题 | [洛谷P10927](https://www.luogu.com.cn/problem/P10927) Sightseeing trip

给定一张无向图，求图中至少包含3个点的环，使得环上节点不重复且边的长度之和最小。

见 [题解](https://www.luogu.com.cn/article/3xwjphkd)。

[AC](https://www.luogu.com.cn/record/183765349) 712.00KB 41ms

#### T
<!-- Topo -->
[洛谷P1983](https://www.luogu.com.cn/problem/P1983) [NOIP2013 普及组] 车站分级

一条单向铁路线上有 $n$ 个火车站，现有 $m$ 趟车次运行情况。要求推算出这 $n$ 个火车站至少分为几个不同的级别，以满足车次停靠要求，即所有停靠站台的等级大于所有不停靠站台的等级。

从 停靠站台 向 不停靠站台 建 $O({s_i}^2)$ 的有向边，拓扑排序求层数即可。

[AC](https://www.luogu.com.cn/record/183993799) 6.46MB 204ms

还可以在两堆点中间建立虚点，经过虚点特判一下，边数缩减到 $O({s_i})$ 量级。

还可以线段树优化建图，具体见 [Bob_Wang 的题解](https://www.luogu.com.cn/article/yus0z9y8)。

#### T
<!-- Euler -->
[洛谷P6066](https://www.luogu.com.cn/problem/P6066) Watchcow S | [洛谷P7771](https://www.luogu.com.cn/problem/P7771) 欧拉路径

求有向图中字典序最小的欧拉路径。

DFS，每经过一条边就删除。在邻接表上可以通过修改 `head[]` 头指针实现。

对于欧拉回路：从 $1$ 开始 DFS；    
对于欧拉通路：从出度比别的点都小的点开始 DFS。

点的出边按终节点升序排序，即可完成字典序输出。

[AC](https://www.luogu.com.cn/record/184162183) 16.65MB 166ms

#### T
<!-- Shortest-Path -->
[洛谷P5960](https://www.luogu.com.cn/problem/P5960) 差分约束

给定一组包含 $m$ 个不等式和 $n$ 个未知数的约束条件，求解出任意一组满足这些不等式的解。输入包含未知数的数量和不等式的数量，接着是每个不等式的详细描述。输出一组可行解或 `NO` 表示无解。

令 $w(u,v)$ 表示链接 $u,v$ 两点的**有向边**长度(若不存在即为 $+\infty$)，$\text{dis}_u$ 表示源点 $s$ 到 $u$ 的最短路。  
则点 $u,v$ 满足以下性质：  
$$
\text{dis}_u+w(u,v)\le\text{dis}_v\\
\text{dis}_u-\text{dis}_v\le-w(u,v)
$$

与题目要求相比较：
$$
x_{u_i}-x_{v_i}\le y_i
$$

发现，可以使用最短路表示未知数的解。  
先建立超级源点 $s$，向每一个点建长度为 $0$ 的边，再从 $u_i$ 向 $v_i$ 建一条权值为 $-y_i$ 的边即可。

这样求出来的是 $x_i\le0$ 所有 $x$ 的最大解。

SPFA 最短路 [AC](https://www.luogu.com.cn/record/184168137) 872.00KB 49ms

$\text{dis}_u$ 表示源点 $s$ 到 $u$ 的最长路，则点 $u,v$ 满足以下性质：  
$$
\text{dis}_u+w(u,v)\ge\text{dis}_v\\
\text{dis}_v-\text{dis}_u\le w(u,v)
$$

类似地，最长路也可以做差分约束，得到的是 $x_i\ge0$ 所有 $x$ 的最小解。

SPFA 最长路 [AC](https://www.luogu.com.cn/record/184167396) 760.00KB 67ms

#### T
<!-- DP-on-DAG -->
[洛谷P1954](https://www.luogu.com.cn/problem/P1954) [NOI2010] 航空管制

在机场中有 $n$ 个航班和 $m$ 条起飞顺序限制 $k_i$。每个航班有最晚起飞时间限制，并且一些航班之间有相对起飞顺序的要求。要求计算出一个可行的航班起飞序列，并求出每个航班在所有可行序列中的最小起飞序号。

首先，对于给定的限制 $(a,b)$(航班 $a$ 必须先于航班 $b$ 起飞)，建立有向边 $b\rightarrow a$。  
后起飞的航班指向先起飞的航班，构成有向无环图。

根据航班之间的相对起飞顺序，计算出每个航班的真正最晚起飞时间限制。  
如果航班 $x$ 在航班 $y$ 之后起飞，那么一定有 $k_y\le k_x-1$。  
考虑使用拓扑序处理，使用后起飞的航班更新先起飞的航班。这样一次即可处理完毕，复杂度 $O(n)$。

第一问答案：  
飞机按 $k_i$ 从小到大排序，依次输出。由于答案保证有解，这种起飞顺序一定正确。

记录每一个 $k_i$ 对应几个飞机，这个值就是**所有飞机**都按**最晚起飞时间**起飞时的飞机数量。

接下来考虑对于每一个航班 $x$，它的最小起飞序号。  
航班 $x$ 尽可能早起飞，意味着先于它起飞的飞机(即DAG上的祖先)也要尽可能早起飞。  
$\star$ 由于 $k_i$ 限制的是**最晚起飞时间**，故考虑**安排其它飞机的最晚起飞时间**以代替安排当前航班的最早起飞时间。

标记 $x$ 的所有祖先。对于所有未标记的飞机，按 $k_i$ 从大到小排序，依次占掉最晚起飞时间。  
由于 $x$ 是被标记飞机中起飞最晚的，剩下占不掉的最晚起飞时间就是 $x$ 的最早起飞时间。

[AC](https://www.luogu.com.cn/record/184250597) 728.00KB 105ms

#### T
<!-- Meet-in-the-Middle -->
[洛谷P11122](https://www.luogu.com.cn/problem/P11122) [ROIR 2024 Day 1] 表格游戏

给定一个 $h\times w$ 的表格，要求通过删除行和列的操作使表格的元素总和为 $s$。输入包含表格的大小及其元素，输出是否可以达到该总和，若可以，给出具体操作步骤。

数据范围：$1\le h\le w\le15$

直接爆搜是 $2^{30}$，过不了。

考虑 Meet in the Middle 优化

$2^{30}nm$ 暴力 [TLE](https://www.luogu.com.cn/record/184445346) 40pts 64.53MB 2.94s

$2^{23}nm$ 朴素 Meet in the Middle [TLE](https://www.luogu.com.cn/record/184467141) 53pts 680.00KB 2.21s

`lowbit` 优化 Meet in the Middle [TLE](https://www.luogu.com.cn/record/184475236) 59pts 608.00KB 1.55s

题解 预处理优化 [AC](https://www.luogu.com.cn/record/185356943) 64.57MB 1.03s

#### T
<!-- SA -->
[洛谷P4035](https://www.luogu.com.cn/problem/P4035) [JSOI2008] 球形空间产生器

在 $n$ 维空间中，给定 $n+1$ 个点的坐标，要求计算出这些点构成的球体的球心坐标。输入包含点的坐标，输出球心的坐标，保留三位小数。

爬山算法(处理单峰情况)：
1. 温度 $T$ 随时间递减。
2. 随机一个方向，判断是否更优，保留更优方向。  
   此题较为特殊，大致转移方向可根据差值判断。
3. 向方向移动 $T$ 距离。  
   此题较为特殊，根据差值判断各维移动距离，再乘上温度 $T$。

[AC](https://www.luogu.com.cn/record/185370070) 560.00KB 5.56s

#### T
<!-- SA -->
[洛谷P1337](https://www.luogu.com.cn/problem/P1337) [JSOI2004] 平衡点 / 吊打XXX

模拟退火算法(处理多峰情况)：
1. 温度 $T$ 随时间递减
2. 根据温度划定随机转移范围，温度越低范围越小。
3. 随机找状态 $(x,y)$，计算能量差 $\Delta E$。
4. 高能量状态自然转移，低能量状态转移概率 $\exp(\frac{-\Delta E}T)$。

给定 $n$ 个重物和其位置 $(x_i,y_i)$ 及重量 $w_i$，求公共绳结在平衡状态下的坐标。输入包含每个重物的位置和重量，输出绳结的坐标，保留三位小数。

位置 $(x,y)$ 的能量 $E=\sum\limits_{i=1}^nw_i\sqrt{(x-x_i)^2+(y-y_i)^2}$。

[AC](https://www.luogu.com.cn/record/185362868) 680.00KB 931ms

#### T
<!-- Binary-Search -->
[洛谷P11125](https://www.luogu.com.cn/problem/P11125) [ROIR 2024 Day 2] 细菌

有 $n$ 个细菌根据计划在不同时间进入培养皿，并在成熟后繁殖。要求确定培养菌落规模首次恰好等于 $m$ 的时间，若永远无法达到，则输出 -1。输入包含细菌数量、期望规模及细菌的进入和成熟时间。

解法一：  
注意到某个细菌在特定时间下的存在数量可以 $O(1)$ 计算，考虑使用二分答案。  
注意：$2^n$ 极大可能会爆 `long long`，特判分裂时间 $\ge30$ 则无答案。

解法二：  
注意到第一个细菌开始分裂后会在 $30s$ 内增长到 $10^9$ 量级，将 $30s$ 逐秒判断即可。  
另外，细菌可能在最后 $30s$ 之前就到达 $m$，所以需要特判。找到第 $m$ 个放入的细菌即可。

解法三：  
和解法二类似，时间跳跃。见[题解](https://www.luogu.com.cn/article/67zfs085)。

[AC](https://www.luogu.com.cn/record/185602951) 8.34MB 122ms

#### T
<!-- Easy -->
[洛谷P5019](https://www.luogu.com.cn/problem/P5019) [NOIP2018 提高组] 铺设道路 | [洛谷P1969](https://www.luogu.com.cn/problem/P1969) [NOIP2013 提高组] 积木大赛

给定一条长度为 $n$ 的道路，每个区域的下陷深度为 $d_i$。每天可以选择一个连续区间将其中每块区域的下陷深度减少 $1$，前提是该区间内的深度不为 $0$。求将整个道路的下陷深度变为 $0$ 最少需要多少天。

$O(n\times\max d_i)$ 比较好想，枚举每一个高度有多少连续段即可。

$O(n)$ 算法结论：处理出差分数组 $c_i=\begin{cases}d_1&i=1\\d_i-d_{i-1}&i>1\end{cases}$，答案即为 $\sum\limits_{i=1}^nc_i[c_i>0]$。

场上猜结论，看了下对称性没问题就写了，没有严密证明。

考虑每次在原道路的右端新增道路时，更小的下陷可以延续上一个的修复深度。只有更大的下陷程度才会增加修复的代价，且增加的代价为深度差。

[AC](https://www.luogu.com.cn/record/185702923) 1.16MB 35ms

#### T
<!-- DFS -->
[洛谷P5022](https://www.luogu.com.cn/problem/P5022) [NOIP2018 提高组] 旅行

有 $n$ 个城市和 $m$ 条双向道路，城市之间可以互相到达。选择一个城市作为起点，从起点出发，每次可以选择一条未访问的道路前往新城市或返回上一个城市，直到回到起点。要求记录的城市编号形成字典序最小的序列。输出该序列。

数据范围：$1\le n\le5000\land(m=n-1\lor m=n)$。

下位蓝，实际难度远远达不到蓝的水平。

$m=n-1$ 时，原图为一棵树。对边排序后 DFS 即可。时间复杂度 $O(m\log m)$。  
$m=n$ 时，考虑枚举删除每一条边，转化为 $m=n-1$。时间复杂度 $O(m^2)$。

[AC](https://www.luogu.com.cn/record/185742810) 868.00KB 1.84s

这道题有 $O(m\log m)$ 的做法，从环上断边可以 $O(n)$ 做。  
见 [洛谷P5049](https://www.luogu.com.cn/problem/P5049) [NOIP2018 提高组] 旅行 加强版

#### T
<!-- DP -->
[洛谷P5021](https://www.luogu.com.cn/problem/P5021) [NOIP2018 提高组] 赛道修建

在一个城市中，有 $n$ 个路口和 $n-1$ 条双向道路。每条道路的长度已知。设计一种修建 $m$ 条赛道的方案，使得修建的赛道中长度最小的赛道尽可能长。输出长度最小的赛道的最大值。

答案具有单调性，二分最小赛道的最大值 $\text{mid}$。将查询最小值的最大值问题转化为长度 $\ge\text{mid}$ 的赛道个数的问题。

对整棵树进行 DFS。

子树递归中进行以下操作：
1. 统计子树传上来的可供组合的链，长度加上 $w(u,v)$。
2. 如果链长 $\ge\text{mid}$，直接统计 $\text{cnt}\leftarrow\text{cnt}+1$；否则统计进 `multiset`。

子树递归结束后进行以下操作：
1. 反复从 `multiset` 中取出来最大的链，找到刚好能匹配出长度 $\ge\text{mid}$ 的第二条链。两条链从 `multiset` 中删去，更新 $\text{cnt}\leftarrow\text{cnt}+1$。
2. 如果只剩一条或找不到可匹配的链，停止操作。
3. 从 `multiset` 中找最大的链返回，作为父亲的一条可供组合的链。

正确性：
1. 长的链，单链构成构造。因为已经达成要求，上传叠加长度或再添另一条链无意义。
2. 较短的链，找到最小匹配。贪心地将更长的链留在后面。
3. 遍历每一个节点，保证每一条链都起最大作用。

[AC](https://www.luogu.com.cn/record/185794477) 10.74MB 879ms

#### T
[洛谷P3545](https://www.luogu.com.cn/problem/P3545) [POI2012] HUR-Warehouse Store

有 $n$ 天，第一天进货 $A_i$ 件商品，午间顾客需购买 $B_i$ 件商品。问最多能满足多少顾客的需求，并输出满足需求的天数。

反悔贪心。

大根堆以剩余物品量作为第一关键字，保证返回过程中总价值不变，而剩余的势能最大。

优先满足当天顾客的需求。
1. 如果能够满足，修改剩余物品，并将顾客及商品量加入堆中。
2. 如果不能满足，尝试取出堆顶元素并反悔：取回购买的物品，将物品给当天顾客后，更新堆顶。  
   反悔条件：当前顾客消费比堆顶更少，**反悔后有更多商品留给后面的客户**；

正确性证明：  
反悔时，购买的总人数不变，而剩余的商品变多。保证答案不劣的情况下优化剩余答案。  
另外，一个人只能被反悔一次，出堆后不再进堆。

[AC](https://www.luogu.com.cn/record/185811816) 11.07MB 184ms

#### T
[AT_agc006_d](https://atcoder.jp/contests/agc006/tasks/agc006_d) Median Pyramid Hard | [洛谷](https://www.luogu.com.cn/problem/AT_agc006_d)

给定一个 $N$ 层的金字塔，底层数字已知，其他层的数字由下方相邻数字的中位数生成。求第一层的数字。

二分顶端数字 $\text{mid}$。  
注意到中位数运算只与数字的大小关系有关，故设 $b_i=\begin{cases}0&a_i<\text{mid}\\1&a_i\ge\text{mid}\end{cases}$。

接下来，处理 $b_i$ 的金字塔。发扬人类智慧，发现相邻的连续两个 $00$ 或 $11$ 会“传播”到上面，答案被最靠近中央($n$ 位置)的连续两个相同数决定。

特判不存在相邻两个相同数的情况，答案为 $b_1$。

[AC](https://atcoder.jp/contests/agc006/submissions/59292610) 6.48MB 29ms

#### T
[洛谷P4155](https://www.luogu.com.cn/problem/P4155) [SCOI2015] 国旗计划

给定 $N$ 名边防战士和 $M$ 个边防站。每名边防战士负责两个边防站之间的奔袭区间。需要确定最少需要多少名边防战士才能覆盖所有边防站。同时，要求在每名边防战士必须参与的前提下，计算所需的最少边防战士数量。

断环为链。处理好 $C_i$ 和 $D_i$，如果在下一圈就 $+m$。再在下一圈相同的 $C_i+m$ 和 $D_i+m$ 再建一个区间。  
现在求第 $i$ 个战士参与的最小边防战士数量，答案即为 $D_i$ 跑到 $C_i+m$ 的数量 $+1$。

首先考虑最少布局：  
对区间按照左端点进行排序，右端点必然是递增的，因为题目保证奔袭区间不重叠。  
此时对于每一个区间，贪心地对右端点找下一个区间左端点的最大值。双指针维护。

接下来考虑倍增优化：  
根据贪心策略，每一个区间最优的下一个区间是唯一的。因此我们可以预处理出区间的下两个区间、下四个区间……下 $2^k$ 个区间。处理方式类似倍增求 LCA，时间复杂度 $O(n\log n)$。  
查询第 $i$ 个战士的答案相当于询问从 $i$ 跳多少下后右端点可以到达 $C_i+m$，再加 $1$。跳的过程可以利用倍增，在 $O(\log n)$ 的复杂度内得到答案。总时间复杂度 $O(n\log n)$。

[AC](https://www.luogu.com.cn/record/186120156) 38.81MB 582ms

#### T
[洛谷P10463](https://www.luogu.com.cn/problem/P10463) Interval GCD

给定一个长度为 $N$ 的数列和 $M$ 条指令。指令分为两种：一种是给数列某个区间内的元素加上一个值，另一种是查询某个区间内元素的最大公约数。对于每个查询，输出该区间的最大公约数。

根据 $\gcd(a,b)=\gcd(a,b-a)$，可以推出来，在差分数组上的 $\gcd$ 等于原序列的 $\gcd$，即：

$$
\gcd\limits_{i=1}^na_i=\gcd(a_1,\gcd\limits_{i=2}^na_i-a_{i-1})
$$

将原序列差分：$a_i\leftarrow\begin{cases}a_1&i=1\\a_i-a_{i-1}&i\neq1\end{cases}$  
对差分后的序列建线段树，维护两个信息：区间 $\text{sum}$ 和区间 $\gcd$。

<!--
信息合并：$\text{sum}_l+\text{sum}_r$，$\gcd(\gcd_l,\gcd_r)$。  
区间 $[l,r]$ 加：朴素差分操作。  
区间 $[l,r]$ 查询：$\text{ans}=\gcd\limits_{i=l}^r=\begin{cases}\sum\limits_{i=1}^l\text{sum}_i&l=r\\\gcd(\sum\limits_{i=1}^l\text{sum}_i,\gcd\limits_{i=l+1}^r\gcd_i)&l\neq r\end{cases}$
-->

[AC](https://www.luogu.com.cn/record/186298169) 23.80MB 468ms
