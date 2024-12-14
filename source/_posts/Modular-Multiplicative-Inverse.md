---
title: 乘法逆元
date: 2024-07-17 11:32:09
categories: 
- 笔记
- 数学
tags: 
---

---
### 知识前置
#### 费马小定理
若 $p$ 为素数，$\gcd(a,p)=1$，则 $a^{p-1}\equiv1\ (\operatorname{mod} p)$，证明过程详见[OI-WIki](https://oi-wiki.org/math/number-theory/fermat/#%E8%B4%B9%E9%A9%AC%E5%B0%8F%E5%AE%9A%E7%90%86)。
#### 群论
见另[一篇文章](../Group-Theory/)，另外建议读完本文后详细阅读[这一段](../Group-Theory/#%E6%AD%A3%E6%95%B4%E6%95%B0%E9%9B%86%E4%B8%8E%E6%A8%A1%E6%84%8F%E4%B9%89%E4%B8%8B%E7%9A%84%E4%B9%98%E6%B3%95)，你也许会对乘法逆元有更深的理解。

---
### 定义
若线性同余方程 $ax\equiv 1\ (\operatorname{mod} b)$，则称 $x$ 为 $a\operatorname{mod}b$ 的逆元，记作 $a^{-1}$。

---
### 欧几里得算法求解逆元
当 $a$ 与 $b$ 互质时，$a^{-1}$ 有解，反之无解。然后你就可以发现这是个线性同余方程问题。
#### 伪代码
由于蒟蒻还不会打 $\LaTeX$ 伪代码，所以就先这样写了。

0. $\quad$假设要求 $a$ 关于 $f$ 的逆元 $x=a^{-1}$。
1. $\quad(x_1,x_2,x_3)\leftarrow(1,0,b)$
2. $\quad(y_1,y_2,y_3)\leftarrow(0,1,a)$
3. $\quad\operatorname{while}\ \operatorname{true}$
4. $\quad\qquad\operatorname{if}\ y_3=0\ \operatorname{then}$
5. $\quad\qquad\qquad\operatorname{do}\ x\leftarrow\operatorname{null}$
6. $\quad\qquad\qquad\operatorname{break}$
7. $\quad\qquad\operatorname{if}\ y_3=1\ \operatorname{then}$
8. $\quad\qquad\qquad\operatorname{do}\ x\leftarrow y_2$
9. $\quad\qquad\qquad\operatorname{break}$
10. $\quad\qquad q\leftarrow \lfloor\frac{x_3}{y_3}\rfloor$
11. $\quad\qquad(t_1,t_2,t_3)\leftarrow(x_1-qy_1,x_2-qy_2,x_3-qy_3)$
12. $\quad\qquad(x_1,x_2,x_3)\leftarrow(y_1,y_2,y_3)$
13. $\quad\qquad(y_1,y_2,y_3)\leftarrow(t_1,t_2,t_3)$
#### 代码实现
```cpp
ll exgcd(ll a, ll b, ll &x, ll &y) {
	if (!a&&!b) return -1ll;
	if (!b) return x=1, y=0, a;
	ll res=exgcd(b, a%b, y, x);
	return y-=a/b*x, res;
}

ll inv(ll a, ll b) {
	ll x=0, y=0, res=exgcd(a, b, x, y);
	if (res!=1) return -1ll;
	return x%b<=0?x%b+b:x%b;
}

```

---
### 快速幂求解逆元
由于使用到了费马小定理，该方法的前提条件是 $b$ 为**素数**（其实只要互质就可以）。
$$
\begin{aligned}
&\because ax\equiv1\ (\operatorname{mod}b)\\\\
&\therefore ax\equiv a^{b-1}\ (\operatorname{mod}b)\\\\
&\therefore x\equiv a^{b-2}\ (\operatorname{mod} b)
\end{aligned}
$$
然后就可以使用快速幂来求逆元了。

```cpp
#define inv(a, b) qpow(a, b-2, b)
ll qpow(ll a, ll b, ll mod) {
	ll ans=1;
	while (b) {
		if (b&1) ans=ans*a%mod;
		a=a*a%mod, b>>=1;
	}
	return ans;
}

```

---
### 线性求逆元
求 $1\sim n$ 关于 $p$ 的逆元，时间复杂度 $O(n)$。  
为方便分析，先采用递归的方式转移逆元。
#### 递归终点
$1^{-1}\equiv1\ (\operatorname{mod} p)$。
#### 转移过程
对于 $i^{-1}$，令 $k=\lfloor\frac pi\rfloor$，$j=p\operatorname{mod} i$，有 $p=ki+j$，在 $\operatorname{mod} p$ 意义下为 $ki+j\equiv 0\ (\operatorname{mod} p)$。

同余号两边同时乘上 $i^{-1}\times j^{-1}$，可得 $kj^{-1}+i^{-1}\equiv0$，$i^{-1}\equiv -kj^{-1}$。

此时将 $j=p\operatorname{mod} i$ 代入回来，得 $i^{-1}\equiv-\lfloor\frac pi\rfloor(p\operatorname{mod}i)^{-1}\ (\operatorname{mod}p)$，说明 $i$ 的逆元可以由 $p\operatorname{mod}i$ 的逆元转移得来。

由此，我们可以写下转移式：
$$
i^{-1}=\begin{cases}
1,&\operatorname{if}\ i=1\\\\
-\lfloor\frac pi\rfloor(p\operatorname{mod}i)^{-1},&\operatorname{otherwise}
\end{cases}\ (\operatorname{mod} p)
$$
#### 递归转递推
注意到转移过程中总是满足 $p\operatorname{mod}i<i$，所以可以直接按 $i$ 从小到大递推得到答案。
#### 代码实现
[洛谷P3811](https://www.luogu.com.cn/problem/P3811) 模意义下的乘法逆元

[AC](https://www.luogu.com.cn/record/166768230) 23.43MB 415ms
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

#define N 3000010
ll n, p, inv[N];

signed main() {
	n=read(), p=read(), inv[1]=1;
	for (int i=2; i<=n; ++i) {
		inv[i]=1LL*(p-p/i)*inv[p%i]%p;
	}
	for (ll i=1; i<=n; ++i) printf("%lld\n", inv[i]);
	return 0;
}

```

---
### 参考资料
乘法逆元 - [OI-Wiki](https://oi-wiki.org/math/number-theory/inverse/)  
乘法逆元 - [百度百科](https://baike.baidu.com/item/%E4%B9%98%E6%B3%95%E9%80%86%E5%85%83/5831857)
