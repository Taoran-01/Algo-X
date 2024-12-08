---
title: AT_dp_j 题解
date: 2024-03-05 18:31:26
categories: 
- 笔记
- 算法
tags: 
---

---
### 知识前置
#### 离散型数学期望
离散型随机变量$X$的概率分布为$p_i=P\{X=x_i\}$。
$$
EX=\sum^\infty_{i=1}x_ip_i
$$
简单来说，就是 $\text{期望}=\text{概率}\times\text{结果}$。
#### 期望DP
详见[OI-Wiki](https://oi-wiki.org/dp/probability/#dp-%E6%B1%82%E6%9C%9F%E6%9C%9B)。

---
### 题目描述
现有$N$哥盘子，编号为$1,\ 2,\ 3,\ \dots,\ N$。第$i$个盘子中放有$a_i$个$Sushi$。

接下来每次执行以下操作，直至吃完所有的寿司。若没有$Sushi$则不吃。

若将所有$Sushi$吃完，请问此时操作次数的数学期望是多少？

数据范围：$1\le N\le300$，$1\le a_i\le3$，答案精确到$1\times10^{-9}$。

---
### 解题思路
#### 暴力算法
设$f[a_1][a_2]\cdots[a_n]$表示第$i$盘还剩$a_i$个$Sushi$的期望，显然可以得到：
$$
f[a_1][a_2]\cdots[a_n]=1+\sum^n_{i=1}\frac{f[a_1][a_2]\cdots[max(a_i-1, 0)]\dots[a_n]}{n}
$$
这种做法在时间上和空间上都会爆掉。
#### 优化
注意到对于每一个状态，哪一个盘子剩的$Sushi$其实并不重要，需要注意的是每种盘子的个数。所以根据盘子内$Sushi$剩余数量设状态。  
另外，盘子的总个数为$n$，所以空盘子数量=n-剩余盘子，只需设三维即可。由此设$f[i][j][k]$为剩下$i$盘一个，$j$盘两个和$q$盘三个的期望。
#### 状态转移
当剩一个$Sushi$的盘子被选中吃掉时，这类盘子就少了一个，此时$\{i,\ j,\ k\}\rightarrow\{i-1,\ j,\ k\}$。  
当剩两个$Sushi$的盘子被选中吃掉时，这类盘子就少了一个，同时剩一个$Sushi$的盘子多了一个，此时$\{i,\ j,\ k\}\rightarrow\{i+1,\ j-1,\ k\}$。  
当剩三个$Sushi$的盘子被选中吃掉时，这类盘子就少了一个，同时剩两个$Sushi$的盘子多了一个，此时$\{i,\ j,\ k\}\rightarrow\{i,\ j-1,\ k+1\}$。  
由此可以得到状态转移方程：
$$
f[i][j][k]=\frac{n}{i+j+k}+\frac{i\times f[i-1][j][k]}{i+j+k}+\frac{j\times f[i+1][j-1][k]}{i+j+k}+\frac{k\times f[i][j+1][k-1]}{i+j+k}
$$
#### 初始状态
开始所有期望都为$0$，$f[0][0][0]=0$。
#### 代码实现
从吃完到一个没吃，倒推。$i$，$j$，$k$自$0$到$n$递增，时间复杂度$O(n^3)$。

---
### AC代码
```cpp
#include <cmath>
#include <ctime>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <iostream>
#include <algorithm>
using namespace std;
typedef long long ll;

char buf[1<<20], *p1, *p2;
#define getchar() (p1==p2&&(p2=(p1=buf)+fread(buf,1,1<<20,stdin),p1==p2)?0:*p1++)

inline ll read() {
	ll x=0, f=1;
	char ch=getchar();
	while (ch<'0'||ch>'9') {if (ch=='-') f=-1;ch=getchar();}
	while (ch>='0'&&ch<='9') {x=(x<<3)+(x<<1)+(ch^48);ch=getchar();}
	return x*f;
}

#define N 305
int n, d[N];
double f[N][N][N];

signed main() {
	n=read();
	for (int i=1; i<=n; ++i) ++d[read()];
	for (int c=0; c<=n; ++c) for (int b=0; b<=n; ++b) for (int a=0; a<=n; ++a) {
		if (a==0&&b==0&&c==0) continue;
		f[a][b][c]=double(n)/double(a+b+c);
		if (a!=0) f[a][b][c]+=f[a-1][b][c]*a/(a+b+c);
		if (b!=0) f[a][b][c]+=f[a+1][b-1][c]*b/(a+b+c);
		if (c!=0) f[a][b][c]+=f[a][b+1][c-1]*c/(a+b+c);
	}
	printf("%.10lf\n", f[d[1]][d[2]][d[3]]);
	return 0;
}

```

---
### 总结
#### 对于这道题
1.找到$a_i\le3$的突破口，根据剩余$Sushi$数量设置状态。  
2.通过$Sushi$总数量为$n$简化状态，从四维减小到三维。  
3.倒推求解。
#### 对于期望DP
1.倒推求解。  
2.状态转移方程需要化简。  
3.根据数据范围倒推状态设计。