---
title: 莫比乌斯反演
date: 2024-06-28 15:48:29
categories: 
- 笔记
- 数学
tags: 
---

---
### 知识前置
#### 欧拉筛
又称线性筛，可以$O(n)$求$n$以内的素数，详见[OI-Wiki](https://oi-wiki.org/math/number-theory/sieve/#%E7%BA%BF%E6%80%A7%E7%AD%9B%E6%B3%95)。
#### 算术函数
又称数论函数，指定义域为正整数、陪域为复数的函数，每个算术函数都可视为复数的序列。详见[百度百科](https://baike.baidu.com/item/%E6%95%B0%E8%AE%BA%E5%87%BD%E6%95%B0/8555075)。  
无特殊声明，本文函数均为算术函数。
#### 数论分块
又称整除分块，在预处理出$f$前缀和的条件下，可以$O(\sqrt n)$处理形如$\sum\limits_{i=1}^nf(i)g(\lfloor\frac ni\rfloor)$。详见[OI-Wiki](https://oi-wiki.org/math/number-theory/sqrt-decomposition/)。

---
### 定义
对于某一特定的函数$f(d)$，若有$F(n)=\sum\limits_{d|n}f(d)$，其中$n,d\in\mathbb{N_+}$，则一定存在函数$\mu(d)$，使得$f(n)=\sum\limits_{n|d}\mu(d)F(\frac dn)$。  
更通俗地，在因数下，$F(n)$由$f(n)$推得，而借助$\mu(n)$就可以通过$F(n)$反推$f(n)$。

函数$\mu(n)$被称为**莫比乌斯函数**，而等式$f(n)=\sum\limits_{n|d}\mu(d)F(\frac dn)$则被称为**莫比乌斯反演公式**。
#### 为什么一定存在$f(n)$？
感性理解，因为$F(n)$是由若干个$f(n)$相加得到的，所以我们可以有选择地选取$F(n)$，相加或相减得到原函数$F(n)$。
#### $\mu(n)$的具体值
先给出结论：
$$\mu(n)=\begin{cases}
1,\ n=1\\\\
(-1)^k,\ n=p_1p_2\dots p_k\\\\
0,\ Otherwise
\end{cases}$$
更通俗的解释：
- 如果$n=1$，$\mu(n)=1$；
- 如果$n$是由$k$个不同的质数相乘，$k$奇则$\mu(n)=-1$，$k$偶则$\mu(n)=1$；
- 如果$n$中含平方因子，则$\mu(n)=0$。

性质：
$$F(n)=\sum_{d|n}\mu(d)=[n=1]=\begin{cases}
1,\ n=1\\\\
0,\ n\neq1
\end{cases}$$
#### 具体值的枚举验证
不妨令$f(n)=n$，枚举，得：  
$f(1)=1$，$f(2)=2$，$f(3)=3$，$f(4)=4$，$f(5)=5$，$f(6)=6$，$\dots$；  
$F(1)=1$，$F(2)=3$，$F(3)=4$，$F(4)=7$，$F(5)=6$，$F(6)=12$，$\dots$；  
$\mu(1)=1$，$\mu(2)=-1$，$\mu(3)=-1$，$\mu(4)=0$，$\mu(5)=-1$，$\mu(6)=1$，$\dots$；

$f(1)=\mu(1)F(1)=1$，$f(2)=\mu(1)F(2)+\mu(2)F(1)=3-1=2$，$f(3)=\mu(1)F(3)+\mu(3)F(1)=4-1=3$，$f(4)=\mu(1)F(4)+\mu(2)F(2)+\mu(4)F(1)=7-3=4$，$f(5)=\mu(1)F(5)+\mu(5)F(1)=6-1=5$，$f(6)=\mu(1)F(6)+\mu(2)F(3)+mu(3)F(2)+\mu(6)F(1)=12-4-3+1=6$，$\dots$；

通过更换不同的$f(n)$表达式和增加枚举个数，这个结论都是成立的。而且对于每一个不同的$f(n)$，$\mu(d)$的表达式总是相同的。
#### 具体值的证明
充分性证明：
$$\begin{gather}
F(n)=\sum_{d|n}f(d)=\sum_{d|n}f(\frac dn)\\\\
\sum_{d|n}\mu(d)F(\frac nd)=\sum_{d|n}\mu(d)\sum_{d_1|\frac nd}f(d_1)\\\\
\sum_{d|n}\sum_{d_1|\frac nd}\mu(d)f(d_1)\\\\
\sum_{d_1|n}\sum_{d|\frac n{d_1}}\mu(d)f(d_1)=\sum_{d_1|n}f(d_1)\sum_{d|\frac n{d_1}}\mu(d)=f(n)\\\\
\because\sum_{d|\frac n{d_1}}=\begin{cases}1,\ d_1=1\\\\0,\ d_1<n\end{cases}\\\\
\therefore f(n)=\sum_{d|n}\mu(d)F(\frac nd)=\sum_{d|n}\mu(\frac nd)F(d)\\\\
\end{gather}$$
必要性证明：
$$\begin{gather}
f(n)=\sum_{d|n}\mu(d)F(\frac nd)=\sum_{d|n}\mu(\frac nd)F(d)\\\\
\begin{aligned}
\sum_{d|n}F(d)&=\sum_{d|n}f(\frac nd)\\\\
&=\sum_{d|n}\sum_{d_1|\frac nd}\mu(\frac n{dd_1})F(d_1)\\\\
&=\sum_{dd_1|n}\mu(\frac n{dd_1})F(d_1)\\\\
&=\sum_{d_1|n}F(d_1)\sum_{d|\frac nd}\mu(\frac n{dd_1})\\\\
&=F(n)
\end{aligned}\\\\
\because\sum_{d|\frac n{d_1}}\mu(\frac n{dd_1})=\sum_{d|\frac n{d_1}}\mu(d)=\begin{cases}1,\ d_1=1\\\\0,\ d_1<n\end{cases}\\\\
\therefore F(n)=\sum_{d|n}f(d)=\sum_{d|n}f(\frac nd)
\end{gather}$$

---
### 手推莫比乌斯函数
根据定义和一个数$n$，我们可以通过分解质因数来手动求$\mu(n)$，只需要判断质因子数量和指数即可。

示例：  
$\mu(1)=1$；  
$6=2^1\times3^1,\ \mu(6)=1$；  
$30=2^1\times3^1\times5^1,\ \mu(30)=-1$；  
$12=2^2\times3^1,\ \mu(12)=0$；  
$\dots$

---
### 欧拉筛求莫比乌斯函数
考虑将上述过程转移到计算机上，就是暴力分解质因数之后判断质因子。  
优化一下，可以在筛质数的过程中顺便处理莫比乌斯函数。

具体地，可以参考如下代码：
```cpp
int n, cnt, prime[N], vis[N], mu[N];
// in function main():
vis[1]=1, mu[1]=1;
for (int i=2; i<=n; ++i) {
	if (!vis[i]) prime[++cnt]=i, mu[i]=-1;
	for (int j=1; j<=cnt&&i*prime[j]<=n; ++j) {
		vis[i*prime[j]]=1;
		if (i%prime[j]==0) {mu[i*prime[j]]=0; break;}
		else mu[i*prime[j]]=-mu[i];
	}
}
```
运行原理：
- $\mu(p)=-1$；
- $\mu(x\times k)=0,\ k|x$；
- $\mu(x\times k)=-\mu(x),\ x\ mod\ k\neq0$。

---
### 重要式子
由性质$F(n)=\sum\limits_{d|n}\mu(d)=[n=1]$，易得：
$$[\gcd(i,j)=1]=\sum_{d|gcd(i,j)}\mu(d)$$
变形，得：
$$\sum_{i=1}^n\sum_{j=1}^m[gcd(i,j)=1]=\sum_{d=1}^{\min(n,m)}\mu(d)\lfloor\frac nd\rfloor\lfloor\frac md\rfloor$$
再变形，得：
$$\sum_{i=1}^n\sum_{j=1}^m[gcd(i,j)=k]=\sum_{i=1}^{\lfloor\frac nk\rfloor}\sum_{j=1}^{\lfloor\frac mk\rfloor}[gcd(i,j)=1]=\sum_{d=1}^{\min(\lfloor\frac nk\rfloor,\lfloor\frac mk\rfloor)}\mu(d)\lfloor\frac {\lfloor\frac nk\rfloor}d\rfloor\lfloor\frac {\lfloor\frac mk\rfloor}d\rfloor$$
然后你可以发现这两个东西都可以使用整除分块求解。

---
### 板子
给定$n$、$m$和$k$，求满足条件$1\le i\le n$，$1\le j\le m$，$\gcd(i,j)=k$的个数。
#### 思路
莫比乌斯反演板子题，公式推导参照重要式子(3)，加上整除分块优化。
#### 代码
[AC](https://www.luogu.com.cn/record/162616994) 2.32s 2.28MB
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

#define N 50010
ll T, n, m, k, cnt, ans;
ll prime[N], vis[N], mu[N], sum[N];

signed main() {
	T=read(), vis[1]=1, mu[1]=1;
	for (ll i=2; i<N; ++i) {
		if (!vis[i]) prime[++cnt]=i, mu[i]=-1;
		for (ll j=1; j<=cnt&&i*prime[j]<N; ++j) {
			vis[i*prime[j]]=1;
			if (i%prime[j]==0) {mu[i*prime[j]]=0; break;}
			mu[i*prime[j]]=-mu[i];
		}
	}
	for (ll i=1; i<N; ++i) sum[i]=sum[i-1]+mu[i];
	while (T--) {
		n=read(), m=read(), k=read(), n/=k, m/=k, ans=0;
		for (ll l=1, r; l<=min(n, m); l=r+1) {
			r=min(n/(n/l), m/(m/l));
			ans+=(sum[r]-sum[l-1])*(n/l)*(m/l);
		}
		printf("%lld\n", ans);
	}
	return 0;
}

```

---
### 积函数反演
对于某一特定的函数$f(d)$，若有$F(n)=\prod\limits_{d|n}f(d)$，其中$n,d\in\mathbb{N_+}$，则一定存在函数$\mu(d)$，使得$f(n)=\prod\limits_{n|d}F(\frac dn)^{\mu(d)}$。  
此处的$\mu(d)$就是莫比乌斯函数，也就是说，莫比乌斯函数不止可以完成和函数反演，也可以完成积函数反演，只需要“积化幂”即可。

---
### 莫反做题方法
#### 一、基本公式
$[k=1]=\sum\limits_{d|k}\mu(d)$，一切问题往这里靠。
#### 二、变形
$[n=k]=[\frac nk=1]=\sum\limits_{d|\frac nk}\mu(d)$
#### 三、改变求和顺序
$\sum\limits_{i=1}^n\sum\limits_{j=1}^m[gcd(i,j)=1]=\sum\limits_{i=1}^n\sum\limits_{j=1}^m\sum\limits_{d|gcd(i,j)}\mu(d)=\sum\limits_{d=1}^{\min(n,m)}\mu(d)\lfloor\frac nd\rfloor\lfloor\frac md\rfloor$

思路：$d|\gcd(i,j)\Leftrightarrow d|i\ \\&\\&\ d|j$，将$d\Leftarrow i,j$转化为$d\Rightarrow i,j$。

原理：因为$d|gcd(i,j)$，令$i=k_1d\le n$，$j=k_2d\le m$，考虑哪些$i,j$对答案做了贡献。  
显然，所有的整数$k_1,k_2\le \min(n,m)$都会对答案做贡献。而对于一个确定的$d$，其对应的$k_1,k_2$数量为$\lfloor\frac nd\rfloor\lfloor\frac md\rfloor$个，对应的$\mu(d)$值也是相同的，故单个$d$对答案的贡献为$\mu(d)\lfloor\frac nd\rfloor\lfloor\frac md\rfloor$。  
再考虑$d$的数量，因为$d|gcd(i,j),\ i\le n,\ j\le m$，$d$的范围可能是$1\sim\min(n,m)$之内的任意整数。枚举$d$进行求和即可。

这样我们就完成了改变求和顺序，时间复杂度$O(n^2\log n)\rightarrow O(n)$。其他题目大多也有类似解题思路。
#### 四、预处理
因公式过于复杂，我们设$n=\min(n,m)$。  
$\sum\limits_{p=1}^n[p\ prime]\sum\limits_{i=1}^{\lfloor\frac np\rfloor}\sum\limits_{j=1}^{\lfloor\frac mp\rfloor}[gcd(i,j)=1]=\sum\limits_{p=1}^n[p\ prime]\sum\limits_{d=1}^{\lfloor\frac np\rfloor}\mu(d)\lfloor\frac n{d\cdot p}\rfloor\lfloor\frac m{d\cdot p}\rfloor$

令$d\cdot p=T$，后面的一坨（第二个$\Sigma$）就可以预处理。  
$\dots=\sum\limits_{T=1}^n\mu(d)\lfloor\frac nT\rfloor\lfloor\frac mT\rfloor\sum\limits_{p|T}\mu(\frac Tp)[p\ prime]$  
这样时间复杂度$O(n)\rightarrow O(\sqrt n)$。
#### 五、整除分块
数论中很多都是$\lfloor\frac nd\rfloor$求和，只有$\sqrt n$个取值，因此可以优化时间复杂度。  
例如：对于$\sum\limits_{d=1}^n\mu(d){\lfloor\frac nd\rfloor}^2$，只需求出$\mu(d)$前缀和，再判断$\frac nd$何时取整，即可使用整除分块优化时间复杂度$O(n)\rightarrow O(\sqrt n)$。
