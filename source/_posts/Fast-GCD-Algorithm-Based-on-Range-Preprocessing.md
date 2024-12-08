---
title: 基于值域预处理的快速GCD算法
date: 2024-07-26 05:42:09
categories: 
- 笔记
- 算法
tags: 
- SDSC 2024
---

---
### 算法内容
$O(N)$ 预处理、$O(1)$ 查询任意 $\gcd(x,y)$。

---
### 引理1
对于 $\forall n\in\mathbb{N_+}$，$\exists n=xyz$，使得 $a\le b\le c$，$a,b\le\sqrt n\ \land\ (c\le\sqrt n\ \lor\ c\in\operatorname{Prime})$。
#### 证明
使用数学归纳法证明。

- 当 $n=1$ 时，存在 $a=b=c=1$ 使得 $n=abc$ 且 $a,b,c\le\sqrt n=1$。
- 当 $n>1$ 时，假设对于 $\forall n'\in\mathbb{N_+}$，$n'<n$，$n'$ 都可按上述命题拆分，即 $n$ 之前的数均已证明成立。
  - 若 $n$ 中存在大于等于 $\sqrt n$ 的质因子，按 $a,b\le\sqrt n\ \land\ c\in\operatorname{Prime}$ 划分。  
  令 $c$ 为 $n$ 的最大质因子，则 $c\ge \sqrt n$，$ab=\frac n c\le\sqrt n$，成立。
  - 若 $n$ 中不存在大于等于 $\sqrt n$ 的质因子，按 $a,b,c\le\sqrt n$ 划分。  
  设 $p$ 为 $n$ 的最小质因子，则令 $x=\frac np$，有 $x\in\mathbb{N_+}$，$x<n$。令 $x=a_1b_1c_1$，$a_1\le b_1\le c_1$。  
  因为 $a_1^3\le a_1b_1c_1=x=\frac np$，所以 $a_1\le\sqrt[3]{\frac np}$。  
  因为 $x<n$，由归纳和分类讨论条件得 $b_1\le\sqrt x=\sqrt{\frac np}$，$c_1\le\sqrt n$ 且 $c_1\le\sqrt{\frac nq}\ \lor\ c_1\in\operatorname{Prime}$。
    - 若 $a_1=1$，显然有 $p,b_1,c_1\le\sqrt n$，成立。此时 $p>\sqrt[4]n$。
    - 若 $a_1\neq1$，由于 $p$ 为最小质因子，有 $p\le a_1\le b_1\le c_1$，则有 $p\le\sqrt[4] n$，$a_1p\le\sqrt[3]{\frac np}\cdot p=\sqrt[3]{np^2}\le\sqrt[3]{n\sqrt n}=\sqrt n$。又由 $b_1\le\sqrt{\frac np}<\sqrt n$，$c_1\le\sqrt n$，可得 $n=a_1p\cdot b_1\cdot c_1$ 为一种可行拆分方案。故成立。

---
### 引理2
对于 $\forall x=abc$，有 $\gcd(x,y)=\gcd(y\operatorname{mod}a,a)\times\gcd(b,\frac y{\gcd(a,y)})\times\gcd(c,\frac y{\gcd(ab,y)})$。
#### 证明
从容斥原理方面理解。

$\gcd(a,y)$ 是 $a$ 与 $y$ 共有的因数，记作 $a'$；$\frac y{\gcd(a,y)}$ 是 $y$ 剖去 $a$ 的因数后所独有的因数，记作 $y_1$。  
$\gcd(b,y_1)$ 是 $b$ 与 $y_1$ 共有的因数，记作 $b'$；$\frac{y_1}{\gcd(b,y_1)}$ 是 $y_1$ 剖去 $b$ 的因数后所独有的因数，记作 $y_2$。  
$\gcd(c,y_2)$ 是 $c$ 与 $y_2$ 共有的因数，记作 $c'$。

带入，得：$y_1=\frac y{\gcd(a,y)}$，$y_2=\frac{\frac y{\gcd(a,y)}}{\gcd(b,\frac y{\gcd(a,y)})}=\frac y{\gcd(b\cdot\gcd(a,y),y)}=\frac y{\gcd(ab,y)}$。  
因为 $x=abc$，所以 $x$ 与 $y$ 共有的因数为 $a$、$b$、$c$ 与 $y$ 共有因数的并的积，即 $\gcd(x,y)=a'b'c'=\gcd(a,y)\times\gcd(b,\frac y{\gcd(a,y)})\times\gcd(c,\frac y{\gcd(ab,y)})$。  
又因为 $\gcd(a,y)=\gcd(y\operatorname{mod}a,a)$，所以 $\gcd(x,y)=\gcd(y\operatorname{mod}a,a)\times\gcd(b,\frac y{\gcd(a,y)})\times\gcd(c,\frac y{\gcd(ab,y)})$，得证。

---
### 算法原理
假设需要 $O(1)$ 求解 $\gcd(x,y)$，其中 $x,y\in\mathbb{N_+}$ 且 $x,y\le N$。

对于所有 $i,j\le\sqrt N$，预处理出 $\gcd(i,j)$。这一步时间复杂度 $O(N)$。

令 $x=abc$，其中 $a\le b\le c$。  

- 若 $c\in\operatorname{Prime}$，只需判断 $c$ 是否整除 $y$，再进一步迭代即可。
  - 若 $c\mid y$，则 $\gcd(c,y)=c$，$\gcd(x,y)=\gcd(ab,\frac yc)$。
  - 若 $c\nmid y$，则 $\gcd(c,y)=1$，$\gcd(x,y)=\gcd(ab,y)$。
- 若 $c\notin\operatorname{Prime}$，  
  根据[引理1](#引理1)，可得：$a,b,c\le\sqrt x\le\sqrt N$；  
  根据[引理2](#引理2)，可得：$\gcd(x,y)=\gcd(y\operatorname{mod}c,c)\times\gcd(b,\frac y{\gcd(c,y)})\times\gcd(a,\frac y{\gcd(bc,y)})$。  
  此时 $y\operatorname{mod} c$，$c$，$b$，$\frac y{\gcd(c,y)}$，$a$，$\frac y{\gcd(bc,y)}$ 均小于等于 $\sqrt N$，可以 $O(1)$ 查表。

---
### 例题
[洛谷P5435](https://www.luogu.com.cn/problem/P5435) 基于值域预处理的快速GCD
#### 题目描述
给定 $2n$ 个正整数 $a_1,a_2,\dots,a_n$。对于每一个 $i\in[1,n]$，求出 $\sum\limits_{j=1}^ni^j\gcd(a_1,b_j)$。
#### 代码
[AC](https://www.luogu.com.cn/record/171645689) 17.16MB 6.03s
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

#define N 5010
#define MOD 998244353
int n, ans;
int a[N], b[N];

namespace qgcd {
	#define M 1000010 // range
	#define S 1010 // sqrt(range)
	bool ntp[M]; int pri[M>>3], tot; // not prime | prime array
	int fac[M][3], pre[S][S]; // splitting | gcd
	void init() {
		fac[1][0]=fac[1][1]=fac[1][2]=1;
		for (int i=2; i<M; ++i) {
			if (!ntp[i]) pri[++tot]=i, fac[i][0]=fac[i][1]=1, fac[i][2]=i;
			for (int j=1; pri[j]*i<M; ++j) {
				int c=pri[j]*i; ntp[c]=1; // composite number
				fac[c][0]=fac[i][0]*pri[j];
				fac[c][1]=fac[i][1], fac[c][2]=fac[i][2];
				if (fac[c][0]>fac[c][1]) swap(fac[c][0], fac[c][1]);
				if (fac[c][1]>fac[c][2]) swap(fac[c][1], fac[c][2]);
				if (i%pri[j]==0) break;
			}
		}
		for (int i=0; i<S; ++i) pre[0][i]=pre[i][0]=i;
		for (int i=1; i<S; ++i) for (int j=1; j<S; ++j) {
			pre[i][j]=pre[j][i]=pre[j][i%j];
		}
	}
	int qgcd(int a, int b) {
		int res=1, t=0;
		for (int i=0; i<=2; ++i) {
			int &f=fac[a][i];
			if (f<S) t=pre[f][b%f];
			else t=b%f?1:f;
			b/=t, res*=t;
		}
		return res;
	}
}

signed main() {
	// freopen("a.in", "r", stdin);
	qgcd::init(), n=read();
	for (int i=1; i<=n; ++i) a[i]=read();
	for (int i=1; i<=n; ++i) b[i]=read();
	for (int i=1; i<=n; ++i) {
		ans=0;
		for (int j=1, k=i; j<=n; ++j, k=1LL*k*i%MOD) {
			ans=(ans+1LL*k*qgcd::qgcd(a[i], b[j])%MOD)%MOD;
		}
		printf("%d\n", ans);
	}
	return 0;
}

```

---
### 参考资料
快速GCD算法 - [CSDN-OneInDark](https://blog.csdn.net/qq_42101694/article/details/122503771)  
数论入门 - SDSC 2024 D1
