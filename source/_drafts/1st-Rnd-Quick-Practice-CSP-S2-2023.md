---
title: 第一轮真题速刷 - CSP-S2 2023
date: 2024-07-18 14:42:59
categories: 
- 笔记
- 算法
tags: 
---

---
### 知识点统计
来自[CCF官方](https://www.noi.cn/upload/resources/file/2024/04/11/a2f66c5248a2d0e1d67f655df344ba6f.pdf)，详细内容请自行查阅。
$$
\begin{array}{|c|c|c|}
\hline\text{板块}&\text{知识点}&\text{级别}\\\\
\hline\text{C++程序设计}&\text{略}&\text{入门}\\\\
\hline\text{数据结构}&\text{链表：单链表、双向链表、循环链表}&\text{入门}\\\\
\hline\text{数据结构}&\text{栈}&\text{入门}\\\\
\hline\text{数据结构}&\text{树的表示与存储}&\text{入门}\\\\
\hline\text{数据结构}&\text{字符串哈希函数构造}&\text{提高}\\\\
\hline\text{数据结构}&\text{字典树}&\text{提高}\\\\
\hline\text{算法}&\text{枚举法}&\text{入门}\\\\
\hline\text{算法}&\text{模拟法}&\text{入门}\\\\
\hline\text{算法}&\text{贪心法}&\text{入门}\\\\
\hline\text{算法}&\text{二分法}&\text{入门}\\\\
\hline\text{算法}&\text{深度优先搜索}&\text{入门}\\\\
\hline\text{算法}&\text{简单一维动态规划}&\text{入门}\\\\
\hline\text{算法}&\text{状态压缩动态规划}&\text{提高}\\\\
\hline\text{数学与其它}&\text{代数}&\text{入门}\\\\
\hline\end{array}
$$

---
### T1. 密码锁 (lock)
[洛谷P9752](https://www.luogu.com.cn/problem/P9752) 密码锁 | [数据下载](https://www.noi.cn/ccf/contentcore/resource/download?ID=4AD39BE362F68F60E71DB0FE39951C88E5F900DCF7F0EEF2CE1DEEF1457B8FFF)
#### 题目描述
给定 $n$ 种 $5$ 个数的结束位置，求有多少种初始位置能使得经过一次操作后到达这 $n$ 个结束位置。操作如下：
1. 对其中一个数进行 $x\leftarrow(x\plusmn1)\operatorname{mod}10$ 的操作；
2. 对其中连续的两个数进行 $x_{1,2}\leftarrow(x_{1,2}\plusmn1)\operatorname{mod}10$ 的操作；

数据范围：$n\le 10$，拨圈数量 $5$ 个。
#### 解题思路
枚举转动幅度，对每种情况都统计可以通过一步到达的原状态。最后枚举每个状态，如果 $n$ 种情况都可以统计到该状态，则这是一种答案。

具体地，落实到算法上是这样的：
1. 输入五个数字
2. 
#### 代码
[AC](https://www.luogu.com.cn/record/167048300) 868.00KB 40ms
```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
using namespace std;
typedef long long ll;

char buf[1<<20], *p1, *p2;
#define getchar() (p1==p2&&(p2=(p1=buf)+fread(buf,1,1<<20,stdin),p1==p2)?0:*p1++)

inline ll read() {
	ll x=0, f=1; char ch=getchar();
	while (ch<'0'||ch>'9') {if (ch=='-') f=-1; ch=getchar();}
	while (ch>='0'&&ch<='9') x=(x<<1)+(x<<3)+(ch^48), ch=getchar();
	return x*f;
}

#define N 15
int n, ans, t1, t2, t3, t4, t5;
int f[N][N][N][N][N];

signed main() {
	// freopen("a.in", "r", stdin);
	n=read();
	for (int k=1; k<=n; ++k) {
		t1=read(), t2=read(), t3=read(), t4=read(), t5=read();
		for (int i=1; i<=9; ++i) {
			++f[(t1+i)%10][t2][t3][t4][t5];
			++f[t1][(t2+i)%10][t3][t4][t5];
			++f[t1][t2][(t3+i)%10][t4][t5];
			++f[t1][t2][t3][(t4+i)%10][t5];
			++f[t1][t2][t3][t4][(t5+i)%10];
			++f[(t1+i)%10][(t2+i)%10][t3][t4][t5];
			++f[t1][(t2+i)%10][(t3+i)%10][t4][t5];
			++f[t1][t2][(t3+i)%10][(t4+i)%10][t5];
			++f[t1][t2][t3][(t4+i)%10][(t5+i)%10];
		}
	}
	for (t1=0; t1<=9; ++t1) for (t2=0; t2<=9; ++t2) {
		for (t3=0; t3<=9; ++t3) for (t4=0; t4<=9; ++t4) {
			for (t5=0; t5<=9; ++t5) ans+=f[t1][t2][t3][t4][t5]==n;
		}
	}
	printf("%lld\n", ans);
	return 0;
}

```
#### 感想
题目一做不对，题解一看就会。搁赛场上可能就拿 $80$ 分走人了QAQ。  
思路太窄，以后要多做题，特别是DP计数类题目。

---
### 参考资料
P9752 [CSP-S 2023] 密码锁 - [洛谷-wyb_dad](https://www.luogu.com.cn/article/doc4ht7s)
