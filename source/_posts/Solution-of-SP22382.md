---
title: SPOJ ETFD 题解
date: 2024-08-20 20:15:09
categories: 
- 笔记
- 算法
tags: 
---

---
### 知识前置
#### 欧拉函数
$\phi(n)$ 表示小于等于 $n$ 和 $n$ 互质的数的个数。有以下性质：
1. $\phi(p)=p-1$，其中 $p\in\text{Prime}$；
2. 若 $\gcd(a,b)=1$，有 $\phi(ab)=\phi(a)\times\phi(b)$。

根据这两条性质，我们可以使用[筛法](https://oi-wiki.org/math/number-theory/sieve/#%E7%AD%9B%E6%B3%95%E6%B1%82%E6%AC%A7%E6%8B%89%E5%87%BD%E6%95%B0)求欧拉函数。

详见[OI-Wiki](https://oi-wiki.org/math/number-theory/euler-totient/)。

---
### 题目描述
[SPOJ](https://www.spoj.com/problems/ETFD/) ETFD - Euler Totient Function Depth | [洛谷](https://www.luogu.com.cn/problem/SP22382)

给定整数 $m,n,k$，求出 $[m,n]$ 中有多少个整数不断对自己取欧拉函数刚好 $k$ 次结果为 $1$。

数据范围：$1\le m\le n\le10^6$，$0\le k<20$，$1\le T\le10^4$。

---
### 思路
#### 预处理
注意到 $T$ 非常大，考虑预处理。  
$\text{ans}\_{i,j}$ 表示 $[1,i]$ 中有多少个整数不断对自己取欧拉函数刚好 $j$ 次结果为 $1$，这样 $[m,n]$ 的答案即为 $\text{ans}\_{n,j}-\text{ans}_{m-1,j}$，类似前缀和。
<!--这里，总是会渲染错误。斜体开始的地方需要加一个反斜杠\。-->

接下来考虑怎么得到 $\text{ans}_{i,j}$。  
容易发现，答案从 $[1,i-1]$ 转移到 $[1,i]$ 只需要考虑 $i$ 能否取 $k$ 次到 $1$ 即可。

于是我们设 $f_{i,j}$ 表示 $i$ 不断对自己取欧拉函数是否刚好 $j$ 次结果为 $1$。  
$f_{i,j}$ 为 $1$，当且仅当 $i$ **恰好**取了 $j$ 次欧拉函数得到 $1$。  
有 $\text{ans}\_{i,j}=\text{ans}\_{i-1,j}+f_{i,j}$。
#### 转移 $f$
首先，有 $f_{1,0}=1$，表示 $1$ 不需要对自己取欧拉函数就可以得到 $1$。

考虑求 $f_{i,j}$。设 $x=\phi(i)$，显然 $i$ 取一次欧拉函数之后会得到 $x$。

$$
\begin{gathered}
f_{x,y}=1\Longleftrightarrow x\ \underbrace{\overset\phi\rightarrow x_1\overset\phi\rightarrow x_2\overset\phi\rightarrow\dots\overset\phi\rightarrow}\_{\text{Perform}\ y\ \phi\ \text{transformations.}}\ 1\\\\
\Downarrow\\\\
f_{i,y+1}=1\Longleftrightarrow i\ \underbrace{\overset\phi\rightarrow x\overset\phi\rightarrow x_1\overset\phi\rightarrow x_2\overset\phi\rightarrow\dots\overset\phi\rightarrow}\_{\text{Perform}\ y+1\ \phi\ \text{transformations.}}\ 1
\end{gathered}
$$

由此，$f_{i,y+1}$ 可由 $f_{x,y}$ 推得。更进一步，$f_{\phi(i),j-1}=f_{i,j}$。

综上，有递推式：
$$
f_{i,j}=\begin{cases}
1&(1,0)\\\\
f_{\phi(i),j-1}&\text{Otherwise.}\\\\
\end{cases}
$$

---
### 代码
[AC](https://www.luogu.com.cn/record/173764587) 115.00MB 160ms
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

#define N 1000010
#define K 22
int T, l, r, k;
int pri[N], tot; bool ntp[N]; // Not Prime
int phi[N]; // Euler's Totient Function
bool f[N][K]; int ans[N][K];

void init() {
	phi[1]=1, ntp[1]=1, f[1][0]=1;
	for (int i=2; i<N; ++i) {
		if (!ntp[i]) pri[++tot]=i, phi[i]=i-1;
		for (int j=1; j<=tot&&i*pri[j]<N; ++j) {
			ntp[i*pri[j]]=1;
			if (i%pri[j]==0) {phi[i*pri[j]]=phi[i]*pri[j]; break;}
			phi[i*pri[j]]=phi[i]*phi[pri[j]];
		}
	}
	for (int i=2; i<N; ++i) for (int j=0; j<K; ++j) f[i][j]=f[phi[i]][j-1];
	for (int i=1; i<N; ++i) for (int j=0; j<K; ++j) ans[i][j]=ans[i-1][j]+f[i][j];
}

signed main() {
	// freopen("f.in", "r", stdin);
	init(), T=read();
	while (T--) {
		l=read(), r=read(), k=read();
		printf("%d\n", ans[r][k]-ans[l-1][k]);
	}
	return 0;
}

```

---
### 参考资料
SP22382 题解 - [洛谷-Galex](https://www.luogu.com.cn/article/t9oiq403)
