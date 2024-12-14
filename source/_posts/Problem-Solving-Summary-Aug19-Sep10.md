---
title: 刷题记录 24-08-19 至 24-09-10
date: 2024-09-13 18:14:57
categories: 
- 笔记
- 算法
tags: 
---

---
### 线性基
这里指它的典型应用。

我没怎么学明白，原理没搞懂，只会写。  
汪老师说，线性基很特殊，它的原理和实现完全不一样。
#### 线性基
对于线性基所表示的所有数的集合 $S$，$S$ 中任意多个数异或所得的结果均能表示为线性基中的元素互相异或的结果。线性基能使用异或运算来表示原数集使用异或运算能表示的所有数。它可以完成以下操作：
1. `ins(x)` 插入 $x$；
2. `chk(x)` 查询x能否被S中的数异或得到；
3. `qmax()` 查询S中若干数异或起来的最大值；
4. `qmin()` 查询S中若干数异或起来的最小值；
5. `query(k)` 查询S中若干数异或起来第k小的值。

上述操作可以在 $O(\log^2V)$ 的时间复杂度内完成。

可以参考[OI-Wiki](https://oi-wiki.org/math/linear-algebra/basis/)和[模板题解](https://www.luogu.com.cn/article/xbfpsb9i)学习它的原理。
#### T1 线性基模板题
[洛谷P3812](https://www.luogu.com.cn/problem/P3812) 线性基

给出 $n$ 个数，求在这些数中选取任意个，使它们的异或和最大。

[AC](https://www.luogu.com.cn/record/173525136) 564.00KB 25ms
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

#define V 63 // log(range)
typedef unsigned long long ull;
struct Basis {
	ull a[V+1], tmp[V+1]; bool zf; // Zero Flag
	void ins(ull x) { // Insert
		for (int i=V; ~i; --i) if (x&1ULL<<i) {
			if (!a[i]) return a[i]=x, void();
			else x^=a[i];
		}
		zf=true;
	}
	bool chk(ull x) { // Check Exist
		for (int i=V; ~i; --i) if (x&1ULL<<i) {
			if (!a[i]) return false;
			x^=a[i];
		}
		return true;
	}
	ull qmax() { // Query Max
		ull res=0;
		for (int i=V; ~i; --i) res=max(res, res^a[i]);
		return res;
	}
	ull qmin() { // Query Min
		if (zf) return 0;
		for (int i=0; i<=V; ++i) if (a[i]) return a[i];
	}
	ull query(int k) { // Query the kth Smaller
		ull res=0; int cnt=0;
		k-=zf; if (!k) return 0;
		for (int i=0; i<=V; ++i) {
			for (int j=i-1; ~j; --j) if (a[i]&(1ULL<<j)) a[i]^=a[j];
			if (a[i]) tmp[cnt++]=a[i];
		}
		if (k>=(1ULL<<cnt)) return -1;
		for (int i=0; i<cnt; ++i) if (k&1ULL<<i) res^=tmp[i];
		return res;
	}
};

int n; ull t1;
Basis b;

signed main() {
	// freopen("b.in", "r", stdin);
	n=read();
	for (int i=1; i<=n; ++i) {
		t1=read();
		b.ins(t1);
	}
	printf("%llu", b.qmax());
	return 0;
}

```
#### 前缀线性基
使用 `pos[i]` 表示线性基的第 $i$ 个数受影响的数的最小编号，即 `pos[i]` 之后线性基 `a[i]` 才有效。贪心思想，使 `pos[i]` 尽可能大。每次插入一个新的数，都更新一遍 `pos[i]`。
1. ins(x) 插入x；
2. chk(x, l) 查询l之后x是否能被S中的数异或得到；
3. qmax(l) 查询l之后S中若干数异或起来的最大值。

查询区间[l,r]异或最大值，可以使用a[r].qmax(l)得到。

可以参考[这篇题解](https://www.luogu.com.cn/article/lc33siuq)理解。
#### T2 前缀线性基模板题
[CF1100F](https://codeforces.com/problemset/problem/1100/F) Ivan and Burgers | [洛谷](https://www.luogu.com.cn/problem/CF1100F)

给定长度为 $n$ 的序列和 $q$ 次询问，求从 $a_l,\ a_{l+1},\ \dots,\ a_r$ 中选若干个数，异或和最大为多少。

[AC](https://codeforces.com/contest/1100/submission/277118149) 180.66MB 530ms
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

#define V 30 // log(range)
typedef unsigned long long ull;
struct PrefixLinerBasis {
	ull a[V+1]; int pos[V+1]; bool zf; // Zero Flag
	void ins(ull x, int p) { // Insert(val, pos)
		for (int i=V; ~i; --i) if (x&1ULL<<i) {
			if (!a[i]) return a[i]=x, pos[i]=p, void();
			if (pos[i]<p) swap(pos[i], p), swap(a[i], x);
			x^=a[i];
		}
		zf=true;
	}
	bool chk(ull x, int l) { // Check Exist ( "pos" in Range [l, +INF) )
		for (int i=V; ~i; --i) if (x&1ULL<<i) {
			if (!a[i]||pos[i]<l) return false;
			x^=a[i];
		}
		return true;
	}
	ull qmax(int l) { // Query Max ( "pos" in Range [l, +INF) )
		ull res=0;
		for (int i=V; ~i; --i) {
			if (pos[i]<l) continue;
			res=max(res, res^a[i]);
		}
		return res;
	}
	ull qmin(int l) { // Query Min ( "pos" in Range [l, +INF) )
		if (zf) return 0;
		for (int i=0; i<=V; ++i) {
			if (pos[i]<l) continue;
			if (a[i]) return a[i];
		}
	}
};

#define N 500010
int n; ull t1;
int q, l, r;
PrefixLinerBasis a[N];

signed main() {
	// freopen("c.in", "r", stdin);
	n=read();
	for (int i=1; i<=n; ++i) t1=read(), a[i]=a[i-1], a[i].ins(t1, i); // Prefix
	q=read();
	while (q--) {
		l=read(), r=read();
		printf("%llu\n", a[r].qmax(l));
	}
	return 0;
}

```
可以参考[汪老师的代码](https://codeforces.com/contest/1100/submission/205951223)，会简洁得多。
#### T3 线段树套线性基 单点修区间查
[洛谷P4839](https://www.luogu.com.cn/problem/P4839) P 哥的桶

线段树套线性基：对于每个节点维护一个线性基，表示区间 $[l,r]$ 内的信息。

插入：找到表示 $k$ 的点，在线性基中插入 $x$。  
子树信息合并：将两个子树的线性基合并到根节点的线性基上。  
区间查询：找到对应的子区间，合并即可。

注：代码中的 `LinerBasis operator+` 表示的是线性基的合并。

[AC](https://www.luogu.com.cn/record/174004934) 50.05MB 6.97s
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

#define V 50
typedef unsigned long long ull;
struct LinerBasis {
	ull a[V+1];
	void clear() {memset(a, 0, sizeof(a));}
	void ins(ull x) {
		for (ll i=V; ~i; --i) if (x&1ULL<<i) {
			if (!a[i]) return a[i]=x, void();
			x^=a[i];
		}
	}
	ull qmax() {
		ull res=0;
		for (ll i=V; ~i; --i) res=max(res, res^a[i]);
		return res;
	}
};

LinerBasis operator+(LinerBasis a, LinerBasis b) {
	for (ll i=V; ~i; --i) if (b.a[i]) a.ins(b.a[i]);
	return a;
}

#define N 50010
ll n;

template <typename T> struct seg {
	#define ls (p<<1)
	#define rs (p<<1|1)
	T t[N<<2];
	void push_up(ll p) {t[p]=t[ls]+t[rs];}
	void modify(ll x, ll l, ll r, ll p, ll k) {
		if (l==r) return t[p].ins(k), void();
		ll mid=l+r>>1;
		if (x<=mid) modify(x, l, mid, ls, k);
		if (x>mid) modify(x, mid+1, r, rs, k);
		push_up(p);
	}
	void modify(ll x, ll k) {modify(x, 1, n, 1, k);}
	T query(ll nl, ll nr, ll l, ll r, ll p) {
		if (nl<=l&&r<=nr) return t[p];
		T res=T(); ll mid=l+r>>1;
		if (nl<=mid) res=res+query(nl, nr, l, mid, ls);
		if (nr>mid) res=res+query(nl, nr, mid+1, r, rs);
		return res;
	}
	T query(ll l, ll r) {return query(l, r, 1, n, 1);}
};

ll m, opt, l, r, k, pr;
seg<LinerBasis> t;

signed main() {
	// freopen("a.in", "r", stdin);
	m=read(), n=read();
	while (m--) {
		opt=read(), l=read(), r=read();
		if (opt==1) {
			t.modify(l, r);
		} else {
			printf("%llu\n", t.query(l, r).qmax());
		}
	}
	return 0;
}

```
#### T4 线段树套线性基 区间修区间查
[洛谷P5607](https://www.luogu.com.cn/problem/P5607) [Ynoi2013] 无力回天 NOI2017

思路和上一题差不多，使用差分完成区间修改。

可以参考[题解](https://www.luogu.com.cn/article/2ulffctx)理解一下。

[AC](https://www.luogu.com.cn/record/173591308) 33.08MB 31.36s
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

#define V 30
typedef unsigned long long ull;
struct LinerBasis {
	ull a[V+1];
	void clear() {memset(a, 0, sizeof(a));}
	void ins(ull x) {
		for (int i=V; ~i; --i) if (x&1ULL<<i) {
			if (!a[i]) return a[i]=x, void();
			x^=a[i];
		}
	}
	ull qmax() {
		ull res=0;
		for (int i=V; ~i; --i) res=max(res, res^a[i]);
		return res;
	}
};

LinerBasis operator+(LinerBasis a, LinerBasis b) {
	for (int i=V; ~i; --i) if (b.a[i]) a.ins(b.a[i]);
	return a;
}

#define N 50010
ll n, a[N];

template <typename T> struct seg {
	#define ls (p<<1)
	#define rs (p<<1|1)
	T t[N<<2];
	void push_up(ll p) {t[p]=t[ls]+t[rs];}
	void build(ll p, ll l, ll r) {
		if (l==r) return t[p].ins(a[l]), void(); ll mid=l+r>>1;
		build(ls, l, mid), build(rs, mid+1, r), push_up(p);
	}
	void build() {build(1, 1, n);}
	void modify(ll x, ll l, ll r, ll p, ll k) {
		if (l==r) return t[p].clear(), t[p].ins(a[l]^=k), void();
		ll mid=l+r>>1;
		if (x<=mid) modify(x, l, mid, ls, k);
		if (x>mid) modify(x, mid+1, r, rs, k);
		push_up(p);
	}
	void modify(ll x, ll k) {modify(x, 1, n, 1, k);}
	T query(ll nl, ll nr, ll l, ll r, ll p) {
		if (nl<=l&&r<=nr) return t[p];
		T res=T(); ll mid=l+r>>1;
		if (nl<=mid) res=res+query(nl, nr, l, mid, ls);
		if (nr>mid) res=res+query(nl, nr, mid+1, r, rs);
		return res;
	}
	T query(ll l, ll r) {return query(l, r, 1, n, 1);}
};

template <typename T> struct BIT {
	T c[N]; int lowbit(int x) {return x&(~x+1);}
	void modify(int x, T k) {while (x<=n) c[x]=c[x]^k, x+=lowbit(x);}
	T g(int x) {T ans=T(); while (x>0) ans=ans^c[x], x-=lowbit(x); return ans;}
	T query(int x) {return g(x);}
};

ll m, opt, l, r, k, pr;
seg<LinerBasis> t;
BIT<int> ta;

signed main() {
	// freopen("f.in", "r", stdin);
	n=read(), m=read();
	for (int i=1; i<=n; ++i) a[i]=read();
	for (int i=n; i>=2; --i) a[i]^=a[i-1];
	for (int i=1; i<=n; ++i) ta.modify(i, a[i]);
	t.build();
	while (m--) {
		opt=read(), l=read(), r=read(), k=read();
		if (opt==1) {
			ta.modify(l, k), t.modify(l, k);
			if (r<n) ta.modify(r+1, k), t.modify(r+1, k);
		} else {
			pr=ta.query(l);
			if (l==r) {printf("%d\n", max(pr^k, k)); continue;}
			LinerBasis cur=t.query(l+1, r);
			cur.ins(pr);
			for (int i=V; ~i; --i) k=max(1ULL*k, 1ULL*k^cur.a[i]);
			printf("%d\n", k);
		}
	}
	return 0;
}

```

---
### 组合数学
#### T1 基础好题
[洛谷P5689](https://www.luogu.com.cn/problem/P5689) [CSP-S2019 江西] 多叉堆

题意较为复杂，请移步洛谷查看。

维护两个信息：$\text{siz}_x$ 表示以 $x$ 为根的子树 $T_x$ 的大小，$\text{ans}_x$ 表示 $T_x$ 所能填的二叉堆个数 (即本题所求答案)。

<!--下面的LaTeX开始大面积地爆了-->
<!--出现“}_{”就需要换为“}\_{”-->

现在要将 $T_y$ 合并到 $T_x$ 上。  
堆的结构是确定的。这里一共有 $\text{siz}\_{x\leftarrow y}$ 个数，其中一个填到根节点 (这个必然是最小的 $0$)，剩下的填到两个地方：一是 $T_x$ 的子树，二是合并过来的 $T_y$。  
从 $\text{siz}_{x\leftarrow y}-1$ 中任选 $\text{siz}_y$ 个填到 $T_y$，剩下的填到 $T_x$ 子树中。

将 $\text{siz}_y$ 个数填到 $T_y$ 的方案数为 $\text{ans}_y$；将 $\text{siz}_x-1$ 个数填到 $\text{Subtree}_x$ 的方案数为 $\text{ans}_x$ (因为根节点是确定的，对方案数不做贡献)。

依据乘法原理，将 $\text{siz}\_{x\leftarrow y}$ 个数放到 $T\_{x\leftarrow y}$ 中的方案数 $\text{ans}\_{x\leftarrow y}=\text{ans}\_{x}\times\text{ans}_y\times\begin{pmatrix}\text{siz}_y\\\text{siz}\_{x\leftarrow y}-1\end{pmatrix}$。

注意到操作只与每棵树的根节点有关，考虑使用并查集+路径压缩维护。  
答案只在合并树时更新，故在 `merge()` 函数内完成计算。

[AC](https://www.luogu.com.cn/record/176172364) 12.89MB 368ms  
原先代码中的 $x$ 和 $y$ 与上文是反的。下面的代码调过来了，和上文一致。
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

#define mod 1000000007LL
#define N 300010
ll n, q, opt, lstans, t1, t2;
ll fac[N], inv[N], ans[N], siz[N], fa[N];

ll qpow(ll a, ll b) {
	ll res=1;
	while (b) {if (b&1) res=res*a%mod; a=a*a%mod, b>>=1;}
	return res;
}

ll A(ll n, ll m) {return fac[n]*inv[n-m]%mod;}
ll C(ll n, ll m) {return fac[n]*inv[n-m]%mod*inv[m]%mod;}

ll find(ll x) {return fa[x]==x?x:fa[x]=find(fa[x]);}
void merge(ll y, ll x) {
	y=find(y), x=find(x), siz[x]+=siz[y];
	ans[x]=ans[x]*ans[y]%mod*C(siz[x]-1, siz[y])%mod;
	fa[y]=x; return;
}

signed main() {
	// freopen("c.in", "r", stdin);
	n=read(), q=read(), fac[0]=siz[0]=ans[0]=1;
	for (ll i=1; i<=n; ++i) fa[i]=i, siz[i]=ans[i]=1;
	for (ll i=1; i<=n; ++i) fac[i]=fac[i-1]*i%mod;
	inv[n]=qpow(fac[n], mod-2LL);
	for (ll i=n-1; ~i; --i) inv[i]=inv[i+1]*(i+1LL)%mod;
	for (ll i=1; i<=q; ++i) {
		opt=read();
		if (opt==1) {
			t1=(read()+lstans)%n, t2=(read()+lstans)%n;
			merge(t1, t2);
		} else {
			t1=(read()+lstans)%n, t1=find(t1), lstans=ans[t1];
			printf("%lld\n", lstans);
		}
	}
	return 0;
}

```

---
### 矩阵乘法
左行右列：左边第 $i$ 行和右边第 $i$ 列依次相乘取和。
$$
C=A\times B\\\\
C_{i,j}=\sum_{k=1}^nA_{i,k}B_{k,j}
$$
详见[OI-Wiki](https://oi-wiki.org/math/linear-algebra/matrix/#%E7%9F%A9%E9%98%B5%E4%B9%98%E6%B3%95)。
#### 常数优化
枚举循环变量的顺序会影响到空间的连续性。这里将 $k$ 放在 $j$ 前面枚举，保证访问的是连续的若干段内存。
```cpp
Matrix operator*(Matrix &a, Matrix &b) {
	Matrix z=Matrix(); z.n=a.n, z.m=b.m;
	for (int i=1; i<=a.n; ++i) for (int j=1; j<=a.m; ++j) {
		for (int k=1; k<=b.m; ++k) z[i][k]=(z[i][k]+a[i][j]*b[j][k])%MOD;
	}
	return z;
}
```

---
### 矩阵快速幂
和普通的快速幂一样，使用二进制优化幂运算。

具体地，使用倍增思想。  
根据幂运算法则 $x^{a+b}=x^a\times x^b$、$(x^a)^b=x^{ab}$，二进制优化，计算整 $2^k$ 指数的结果，最后相乘即可得到答案。  
时间复杂度 $O(\log n)$，其中 $n$ 为迭代次数。

代码实现上，使用结构体实现矩阵，增加代码简洁度。  
其中，`.n` 表示行数，`.m` 表示列数。  
`operator[]` 表示中括号运算符，可类二维数组修改矩阵元素。例如，`a[i][j]` 表示第 $i$ 行第 $j$ 列的元素。
#### T1 模板
[洛谷P3390](https://www.luogu.com.cn/problem/P3390) 矩阵快速幂

给定 $n\times n$ 的矩阵 $A$，求 $A^k$。
```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
using namespace std;
typedef long long ll;
typedef unsigned long long ull;

char buf[1<<20], *p1, *p2;
#define getchar() (p1==p2&&(p2=(p1=buf)+fread(buf,1,1<<20,stdin),p1==p2)?0:*p1++)

inline ull read() {
	ull x=0, f=1; char ch=getchar();
	while (ch<'0'||ch>'9') {if (ch=='-') f=-1; ch=getchar();}
	while (ch>='0'&&ch<='9') x=(x<<1)+(x<<3)+(ch^48), ch=getchar();
	return x*f;
}

#define MN 110
#define MM 110
#define MOD 1000000007ULL

struct Matrix {
	int n, m; ull d[MN][MM];
	ull* operator[](int x) {return d[x];}
	Matrix() {n=0, m=0, memset(d, 0, sizeof(d));}
};

Matrix operator*(Matrix &a, Matrix &b) {
	Matrix z=Matrix(); z.n=a.n, z.m=b.m;
	for (int i=1; i<=a.n; ++i) for (int j=1; j<=a.m; ++j) {
		for (int k=1; k<=b.m; ++k) z[i][k]=(z[i][k]+a[i][j]*b[j][k])%MOD;
	}
	return z;
}
void operator*=(Matrix &a, Matrix b) {a=a*b;}

template <typename T> T qpow(T a, ull b) {
	T res=a; --b;
	while (b) {if (b&1) res*=a; a*=a, b>>=1;}
	return res;
}

int n; ull k;
Matrix a;

signed main() {
	// freopen("a.in", "r", stdin);
	n=read(), k=read(), a.n=n, a.m=n;
	for (int i=1; i<=n; ++i) for (int j=1; j<=n; ++j) a[i][j]=read();
	if (k==0) {
		for (int i=1; i<=n; ++i) {
			for (int j=1; j<=n; ++j) printf("%d ", i==j); puts("");
		}
		return 0;
	}
	a=qpow(a, k);
	for (int i=1; i<=n; ++i) {
		for (int j=1; j<=n; ++j) printf("%llu ", a[i][j]); puts("");
	}
	return 0;
}

```
#### 矩阵快速幂加速递推
以行向量为例，

- 求解问题特点：
  1. 可以抽象出长度为 $n$ 的一维向量，该向量在每个单位时间发生一次变化；
  2. 变化的形式是一个线性递推，仅包含加法和乘系数运算；
  3. 该递推式在每个时间可能作用于不同的数据上，但本身保持不变；
  4. 向量变化时间很长，但向量长度 $n$ 不大。
- 构造矩阵：
  1. 状态矩阵：长度为 $n$ 的一维向量；
  2. 转移矩阵：参加快速幂运算的不变的矩阵；
  3. 构造矩阵时，要将求解所求答案所需元素放入构造矩阵中；
  4. 若状态矩阵第 $x$ 个数对下一时间状态矩阵第 $y$ 个数产生影响，则应修改转移矩阵第 $x$ 行第 $y$ 列的数。
#### T2 递推式某项
[洛谷P1962](https://www.luogu.com.cn/problem/P1962) 斐波那契数列

$$
F_n=\begin{cases}
1&n\le2\\\\
F_{n-1}+F_{n-2}&n\ge3
\end{cases}
$$

求 $F_n\operatorname{mod}10^9+7$ 的值。

$$
\begin{aligned}
&f_i=f_{i-1}+f_{i-2}\\\\
\Rightarrow&
\begin{bmatrix}f_i&f_{i-1}\end{bmatrix}=
\begin{bmatrix}f_{i-1}&f_{i-2}\end{bmatrix}
\begin{bmatrix}1&1\\\\1&0\end{bmatrix}\\\\
\Rightarrow&
\begin{bmatrix}f_n&f_{n-1}\end{bmatrix}=
\begin{bmatrix}1&1\end{bmatrix}
\begin{bmatrix}1&1\\\\1&0\end{bmatrix}^{n-2}
\end{aligned}
$$

我们可以使用快速幂的方式计算出右侧矩阵，从而 $O(\log n)$ 地求出递推结果。

[AC](https://www.luogu.com.cn/record/174891972) 1.10MB 44ms
```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
using namespace std;
typedef long long ll;
typedef unsigned long long ull;

char buf[1<<20], *p1, *p2;
#define getchar() (p1==p2&&(p2=(p1=buf)+fread(buf,1,1<<20,stdin),p1==p2)?0:*p1++)

inline ull read() {
	ull x=0, f=1; char ch=getchar();
	while (ch<'0'||ch>'9') {if (ch=='-') f=-1; ch=getchar();}
	while (ch>='0'&&ch<='9') x=(x<<1)+(x<<3)+(ch^48), ch=getchar();
	return x*f;
}

#define MN 110
#define MM 110
#define MOD 1000000007ULL

struct Matrix {
	int n, m; ull d[MN][MM];
	ull* operator[](int x) {return d[x];}
	Matrix() {n=0, m=0, memset(d, 0, sizeof(d));}
};

Matrix operator*(Matrix &a, Matrix &b) {
	Matrix z=Matrix(); z.n=a.n, z.m=b.m;
	for (int i=1; i<=a.n; ++i) for (int j=1; j<=a.m; ++j) {
		for (int k=1; k<=b.m; ++k) z[i][k]=(z[i][k]+a[i][j]*b[j][k])%MOD;
	}
	return z;
}
void operator*=(Matrix &a, Matrix b) {a=a*b;}

template <typename T> T qpow(T a, ull b) {
	T res=a; --b;
	while (b) {if (b&1) res*=a; a*=a, b>>=1;}
	return res;
}

ull n;
Matrix a, b, ans;

signed main() {
	// freopen("a.in", "r", stdin);
	n=read();
	if (n<=2) return puts("1"), 0;
	a.n=1, a.m=2, b.n=2, b.m=2;
	a[1][1]=1, a[1][2]=1;
	b[1][1]=0, b[1][2]=1, b[2][1]=1, b[2][2]=1;
	ans=a, ans*=qpow(b, n-2), printf("%llu\n", ans[1][2]);
	return 0;
}

```
#### T3 递推式平方和
[洛谷P5175](https://www.luogu.com.cn/problem/P5175) 数列

一个数列 $a_n$，已知 $a_1$ 和 $a_2$。数列满足递推式 $a_n=x\times a_{n-1}+y\times a_{n-2}\ (n\ge3)$，求 $\sum\limits_{i=1}^na_i^2$。  
$T$ 组数据，每组五个数分别代表 $n$、$a_1$、$a_2$、$x$、$y$。

由于答案求的是平方和，所以考虑以 $S_i$ 和 $a_i^2$ 为核心元素构造矩阵。最终构造出的矩阵为：
$$
\begin{bmatrix}
S_i\\\\
x^2a_i^2+y^2a_{i-1}^2+2xya_ia_{i-1}\\\\
a_i^2\\\\
xa_i^2+ya_ia_{i-1}
\end{bmatrix}=\begin{bmatrix}
1&1&0&0\\\\
0&x^2&y^2&2xy\\\\
0&1&0&0\\\\
0&x&0&y
\end{bmatrix}\times\begin{bmatrix}
S_{i-1}\\\\
a_i^2\\\\
a_{i-1}^2\\\\
a_ia_{i-1}
\end{bmatrix}
$$
详细构造过程可以看[这篇题解](https://www.luogu.com.cn/article/94dtnhh9)。

[AC](https://www.luogu.com.cn/record/173976160) 1.43MB 3.13s
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

#define MN 10
#define MM 10
#define MOD 1000000007LL

struct Matrix {
	int n, m; ll d[MN][MM];
	ll* operator[](int x) {return d[x];}
	Matrix() {n=0, m=0, memset(d, 0, sizeof(d));}
};

Matrix operator*(Matrix &a, Matrix &b) {
	Matrix z=Matrix(); z.n=a.n, z.m=b.m; // a.m=b.n
	for (int i=1; i<=a.n; ++i) for (int j=1; j<=a.m; ++j) {
		for (int k=1; k<=b.m; ++k) z[i][k]=(z[i][k]+a[i][j]*b[j][k])%MOD;
	}
	return z;
}
void operator*=(Matrix &a, Matrix b) {a=a*b;}

template <typename T> T qpow(T a, ll b) {
	T res=a; --b;
	while (b) {if (b&1) res*=a; a*=a, b>>=1;}
	return res;
}

int T;
ll n, a1, a2, x, y;
Matrix a, b, ans;

signed main() {
	// freopen("b.in", "r", stdin);
	T=read();
	while (T--) {
		n=read(), a1=read()%MOD, a2=read()%MOD, x=read()%MOD, y=read()%MOD;
		if (n==1) {printf("%lld\n", a1*a1%MOD); continue;}
		a=b=ans=Matrix(), a.n=b.n=b.m=4, a.m=1;
		a[1][1]=a[3][1]=a1*a1%MOD, a[2][1]=a2*a2%MOD, a[4][1]=a1*a2%MOD;
		b[1][1]=b[1][2]=b[3][2]=1;
		b[2][2]=x*x%MOD, b[2][3]=y*y%MOD, b[2][4]=2*x*y%MOD;
		b[4][2]=x, b[4][4]=y; ans=qpow(b, n-1), ans*=a;
		printf("%lld\n", ans[1][1]);
	}
	return 0;
}

```
#### T4 加速DP
[洛谷P2106](https://www.luogu.com.cn/problem/P2106) Sam数

求有多少长为 $n$ 位且满足相邻位之差小于等于 $2$ 的数。

先考虑数位 DP。设 $f_{i,j}$ 表示第 $i$ 位为 $j$ 时的方案数。

初始状态：$f_{1,1}=f_{1,2}=\dots=f_{1,9}=1$。  
$f_{1,0}=0$，去除前导零。

转移方程：
$$
f_{i,j}=\sum_{k=j-2}^{j+2}f_{i-1,k}
$$
两个状态，可以约束数位和数字。每一位数字只与前一位有约束关系，故状态转移方程正确。

根据状态转移方程构造矩阵。
$$
\begin{bmatrix}
f_{i+1,0}&f_{i+1,1}&\dots&f_{i+1,9}
\end{bmatrix}=\begin{bmatrix}
f_{i,0}&f_{i,1}&\dots&f_{i,9}
\end{bmatrix}\times\begin{bmatrix}
1&1&1&0&0&0&0&0&0&0\\\\
1&1&1&1&0&0&0&0&0&0\\\\
1&1&1&1&1&0&0&0&0&0\\\\
0&1&1&1&1&1&0&0&0&0\\\\
0&0&1&1&1&1&1&0&0&0\\\\
0&0&0&1&1&1&1&1&0&0\\\\
0&0&0&0&1&1&1&1&1&0\\\\
0&0&0&0&0&1&1&1&1&1\\\\
0&0&0&0&0&0&1&1&1&1\\\\
0&0&0&0&0&0&0&1&1&1\\\\
\end{bmatrix}
$$

[AC](https://www.luogu.com.cn/record/174887953) 1.10MB 44ms
```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
using namespace std;
typedef long long ll;
typedef unsigned long long ull;

char buf[1<<20], *p1, *p2;
#define getchar() (p1==p2&&(p2=(p1=buf)+fread(buf,1,1<<20,stdin),p1==p2)?0:*p1++)

inline ull read() {
	ull x=0, f=1; char ch=getchar();
	while (ch<'0'||ch>'9') {if (ch=='-') f=-1; ch=getchar();}
	while (ch>='0'&&ch<='9') x=(x<<1)+(x<<3)+(ch^48), ch=getchar();
	return x*f;
}

#define MN 110
#define MM 110
#define MOD 1000000007ULL

struct Matrix {
	int n, m; ull d[MN][MM];
	ull* operator[](int x) {return d[x];}
	Matrix() {n=0, m=0, memset(d, 0, sizeof(d));}
};

Matrix operator*(Matrix &a, Matrix &b) {
	Matrix z=Matrix(); z.n=a.n, z.m=b.m;
	for (int i=1; i<=a.n; ++i) for (int j=1; j<=a.m; ++j) {
		for (int k=1; k<=b.m; ++k) z[i][k]=(z[i][k]+a[i][j]*b[j][k])%MOD;
	}
	return z;
}
void operator*=(Matrix &a, Matrix b) {a=a*b;}

template <typename T> T qpow(T a, ull b) {
	T res=a; --b;
	while (b) {if (b&1) res*=a; a*=a, b>>=1;}
	return res;
}

ull n, ans;
Matrix a, b;

signed main() {
	// freopen("a.in", "r", stdin);
	n=read(), a.m=b.n=b.m=10, a.n=1;
	if (n==1) return puts("10"), 0;
	for (int i=2; i<=10; ++i) a[1][i]=1; // a[1][1]=0 -> 去除前导零
	for (int i=1; i<=10; ++i) {
		for (int j=max(1, i-2); j<=min(10, i+2); ++j) {
			b[i][j]=1;
		}
	}
	b=qpow(b, n-1), a=a*b;
	for (int i=1; i<=10; ++i) ans=(ans+a[1][i])%MOD;
	printf("%llu\n", ans);
	return 0;
}

```

---
### 线段树
#### T1 区间取反与连续信息查询
[洛谷P2572](https://www.luogu.com.cn/problem/P2572) [SCOI2010] 序列操作

给定零一序列，完成区间覆盖、区间取反、区间查询、区间连续“$1$”个数查询。

考虑同时记录白色数量和黑色数量，这样就不需要记录区间长度计算了。  
代码中使用结构体 `D` 表示点的信息，极大缩减代码难度。

记录信息：
1. 区间白色数量 `w`；
2. 区间黑色数量 `b`；
3. 区间左边开始的连续白色数量 `lw`；
4. 区间左边开始的连续黑色数量 `lb`；
5. 区间右边开始的连续白色数量 `rw`；
6. 区间右边开始的连续黑色数量 `rb`；
7. 区间连续白色数量 `mw`；
8. 区间连续黑色数量 `mb`。

合并方式见代码。

`tg1` 表示覆盖懒标记，`tg2` 表示反转懒标记。

[AC](https://www.luogu.com.cn/record/173994834) 15.62MB 570ms
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

#define N 100010
ll n;
ll buildSource[N];

struct D {
	int w, b, lw, lb, rw, rb, mw, mb;
	D(int nw=0, int nb=0, int nlw=0, int nlb=0, int nrw=0, int nrb=0, 
		int nmw=0, int nmb=0) {
		w=nw, b=nb, lw=nlw, lb=nlb, rw=nrw, rb=nrb, mw=nmw, mb=nmb;
	}
};

D operator+(D a, D b) {
	return D(a.w+b.w, a.b+b.b, a.b?a.lw:a.w+b.lw, a.w?a.lb:a.b+b.lb,
			b.b?b.rw:b.w+a.rw, b.w?b.rb:b.b+a.rb,
			max(max(a.mw,b.mw),a.rw+b.lw), max(max(a.mb,b.mb),a.rb+b.lb));
}
void operator+=(D &a, D b) {a=a+b;}

template <typename T> struct seg {
	#define ls (p<<1)
	#define rs (p<<1|1)
	T t[N<<2]; int len[N], tg1[N], tg2[N];
	void push_up(ll p) {t[p]=t[ls]+t[rs];}
	void build(ll p, ll l, ll r) {
		len[p]=r-l+1, tg1[p]=-1;
		if (l==r) {int x=buildSource[l]; t[p]=D(x,x^1,x,x^1,x,x^1,x,x^1); return;}
		ll mid=l+r>>1; build(ls, l, mid), build(rs, mid+1, r), push_up(p);
	}
	void build() {build(1, 1, n);}
	void f(int p,int typ) {
		D &x=t[p];
		if(typ==0) tg2[p]=0, tg1[p]=0, x=D(0,len[p],0,len[p],0,len[p],0,len[p]);
		if(typ==1) tg2[p]=0, tg1[p]=1, x=D(len[p],0,len[p],0,len[p],0,len[p],0);
		if(typ==2) tg2[p]^=1,swap(x.w,x.b),swap(x.lw,x.lb),swap(x.rw,x.rb),swap(x.mw,x.mb);
	}
	void push_down(ll p, ll l, ll r) {
		ll mid=l+r>>1;
		if (~tg1[p]) f(ls, tg1[p]), f(rs, tg1[p]), tg1[p]=-1;
		if (tg2[p]) f(ls, 2), f(rs, 2), tg2[p]=0;
	}
	void modify(ll nl, ll nr, ll l, ll r, ll p, ll k) {
		if (nl<=l&&r<=nr) return f(p, k), void();
		push_down(p, l, r); ll mid=l+r>>1;
		if (nl<=mid) modify(nl, nr, l, mid, ls, k);
		if (nr>mid) modify(nl, nr, mid+1, r, rs, k);
		push_up(p);
	}
	void modify(ll l, ll r, ll k) {modify(l, r, 1, n, 1, k);}
	T query(ll nl, ll nr, ll l, ll r, ll p) {
		if (nl<=l&&r<=nr) return t[p];
		push_down(p, l, r); T res=0; ll mid=l+r>>1;
		if (nl<=mid) res+=query(nl, nr, l, mid, ls);
		if (nr>mid) res+=query(nl, nr, mid+1, r, rs);
		return res;
	}
	T query(ll l, ll r) {return query(l, r, 1, n, 1);}
};

seg<D> t;
int q, opt, l, r;

signed main() {
	// freopen("c.in", "r", stdin);
	n=read(), q=read();
	for (int i=1; i<=n; ++i) buildSource[i]=read();
	t.build();
	while (q--) {
		opt=read(), l=read()+1, r=read()+1;
		if (opt<=2) t.modify(l, r, opt);
		else {
			D x=t.query(l, r);
			printf("%d\n", opt==3?x.w:x.mw);
		}
	}
	return 0;
}

```
#### T2 维护隐含信息
[洛谷P6327](https://www.luogu.com.cn/problem/P6327) 区间加区间 sin 和

非常巧妙的一道题，为了让信息封闭能够合并还需要维护 $\cos$ 值。  
根据公式，同时维护 $\sin$ 和 $\cos$ 两个信息。
$$
\sin(\alpha+\beta)=\sin\alpha\cos\beta+\cos\alpha\sin\beta\\\\
\cos(\alpha+\beta)=\cos\alpha\cos\beta-\sin\alpha\sin\beta
$$
合并操作见代码。

[AC](https://www.luogu.com.cn/record/173544624) 20.74MB 3.25s
```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <cmath>
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

#define N 200010
ll n, bs[N];
double k1, k2; // sin(k) | cos(k)

template <typename T> struct seg {
	#define ls (p<<1)
	#define rs (p<<1|1)
	T t1[N<<2], t2[N<<2]; ll tag[N<<2]; // t1-sin t2-cos
	void push_up(ll p) {t1[p]=t1[ls]+t1[rs], t2[p]=t2[ls]+t2[rs];}
	void update(ll p, T a1, T a2) {
		T u1=t1[p], u2=t2[p]; t1[p]=u1*a2+u2*a1, t2[p]=u2*a2-u1*a1;
	}
	void build(ll p, ll l, ll r) {
		if (l==r) return t1[p]=sin(bs[l]), t2[p]=cos(bs[l]), void();
		ll mid=l+r>>1; build(ls, l, mid), build(rs, mid+1, r), push_up(p);
	}
	void build() {build(1, 1, n);}
	void push_down(ll p, ll l, ll r) {
		if (!tag[p]) return; T a1=sin(tag[p]), a2=cos(tag[p]);
		update(ls, a1, a2), update(rs, a1, a2);
		tag[ls]+=tag[p], tag[rs]+=tag[p], tag[p]=0;
	}
	void modify(ll nl, ll nr, ll l, ll r, ll p, T k) {
		if (nl<=l&&r<=nr) return update(p, k1, k2), tag[p]+=k, void();
		push_down(p, l, r); ll mid=l+r>>1;
		if (nl<=mid) modify(nl, nr, l, mid, ls, k);
		if (nr>mid) modify(nl, nr, mid+1, r, rs, k);
		push_up(p);
	}
	void modify(ll l, ll r, T k) {modify(l, r, 1, n, 1, k);}
	T query(ll nl, ll nr, ll l, ll r, ll p) {
		if (nl<=l&&r<=nr) return t1[p];
		push_down(p, l, r); T res=0; ll mid=l+r>>1;
		if (nl<=mid) res+=query(nl, nr, l, mid, ls);
		if (nr>mid) res+=query(nl, nr, mid+1, r, rs);
		return res;
	}
	T query(ll l, ll r) {return query(l, r, 1, n, 1);}
};

seg<double> t;
ll q, opt, l, r, k;

signed main() {
	// freopen("d.in", "r", stdin);
	n=read();
	for (int i=1; i<=n; ++i) bs[i]=read();
	t.build(), q=read();
	while (q--) {
		opt=read(), l=read(), r=read();
		if (opt==1) {
			k=read(), k1=sin(k), k2=cos(k);
			t.modify(l, r, k);
		} else printf("%.1lf\n", t.query(l, r));
	}
	return 0;
}

```
#### T3 结合二分答案
[洛谷P2824](https://www.luogu.com.cn/problem/P2824) [HEOI2016/TJOI2016] 排序

给定一个序列，需要维护区间升序排序和区间降序排序两个操作，最后询问 $q$ 位置上的数字。

线段树 $\text{0-1 Trick}$：  
使用二分答案，将排序操作转换为区间和和区间覆盖操作。

二分答案，$q$ 位置上最终为 $x$。将所有大于等于 $x$ 的数设为 $1$，所有小于 $x$ 的数设为 $0$。  
区间排序时，查询区间内 $1$ 的个数 $\text{cnt}$。升序排序将 $[l,r-\text{cnt}]$ 位置设为 $0$，将 $[r-\text{cnt}+1,r]$ 位置设为 $1$；降序排序将 $[l,l+\text{cnt}-1]$ 位置设为 $1$，将 $[l+cnt,r]$ 位置设为 $0$。

注意：线段树更新时需要加上 `if(nl>nr||nl<1||nr>n) return;`，否则会死循环导致[RE](https://www.luogu.com.cn/record/173570892)。  
因为序列全为 $0$ 时更新 $[l,l+cnt-1]$ 或全为 $1$ 时更新 $[l,r-cnt+1]$ 都会左端点大于右端点。

[AC](https://www.luogu.com.cn/record/173571287) 4.86MB 3.70s
```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
using namespace std;
typedef long long ll;

inline ll read() {
	ll x=0, f=1; char ch=getchar();
	while (ch<'0'||ch>'9') {if (ch=='-') f=-1; ch=getchar();}
	while (ch>='0'&&ch<='9') x=(x<<1)+(x<<3)+(ch^48), ch=getchar();
	return x*f;
}

#define N 100010
// #define INF -1
ll n, a[N];
ll x;

template <typename T> struct seg {
	#define ls (p<<1)
	#define rs (p<<1|1)
	T t[N<<2], tag[N<<2];
	void push_up(ll p) {t[p]=t[ls]+t[rs];}
	void build(ll p, ll l, ll r) {
		if (l==r) return t[p]=a[l]>=x, void(); ll mid=l+r>>1;
		build(ls, l, mid), build(rs, mid+1, r);
		t[p]=t[ls]+t[rs], tag[p]=0;
	}
	void build() {build(1, 1, n);}
	// void f(ll p, ll l, ll r, T k) {t[p]=k*(r-l+1), tag[p]=k;}
	// void push_down(ll p, ll l, ll r) {
	// 	if (tag[p]==INF) return; ll mid=l+r>>1;
	// 	f(ls, l, mid, tag[p]), f(rs, mid+1, r, tag[p]), tag[p]=INF;
	// }
	void push_down(ll p, ll l, ll r) {
		if (!tag[p]) return; ll mid=l+r>>1;
		tag[ls]=tag[rs]=tag[p];
		if (tag[p]==1) t[ls]=mid-l+1, t[rs]=r-mid;
		else t[ls]=t[rs]=0;
		tag[p]=0;
	}
	void modify(ll nl, ll nr, ll l, ll r, ll p, T k) {
		if(nl>nr||nl<1||nr>n) return; // Here
		if (nl<=l&&r<=nr) return t[p]=(k==1?r-l+1:0), tag[p]=k, void();
		push_down(p, l, r); ll mid=l+r>>1;
		if (nl<=mid) modify(nl, nr, l, mid, ls, k);
		if (nr>mid) modify(nl, nr, mid+1, r, rs, k);
		push_up(p);
	}
	void modify(ll l, ll r, T k) {modify(l, r, 1, n, 1, k);}
	T query(ll nl, ll nr, ll l, ll r, ll p) {
		if (nl<=l&&r<=nr) return t[p];
		push_down(p, l, r); T res=0; ll mid=l+r>>1;
		if (nl<=mid) res+=query(nl, nr, l, mid, ls);
		if (nr>mid) res+=query(nl, nr, mid+1, r, rs);
		return res;
	}
	T query(ll l, ll r) {return query(l, r, 1, n, 1);}
};

int m, opt[N], ml[N], mr[N], q;
int l, r, mid, ans;
seg<int> t;

bool chk() {
	t.build();
	for (int i=1; i<=m; ++i) {
		int cnt=t.query(ml[i], mr[i]);
		if (opt[i]) { // ml[i]==mr[i] -> range l<r
			t.modify(ml[i], ml[i]+cnt-1, 1); // This Line
			t.modify(ml[i]+cnt, mr[i], -1);
		} else {
			t.modify(ml[i], mr[i]-cnt, -1);
			t.modify(mr[i]-cnt+1, mr[i], 1); // This Line
		}
	}
	return t.query(q, q);
}

signed main() {
	// freopen("e.in", "r", stdin);
	n=read(), m=read();
	for (int i=1; i<=n; ++i) a[i]=read();
	for (int i=1; i<=m; ++i) opt[i]=read(), ml[i]=read(), mr[i]=read();
	q=read(), l=1, r=n;
	while (l<=r) {
		mid=(l+r)>>1, x=mid;
		if (chk()) ans=mid, l=mid+1;
		else r=mid-1;
	}
	printf("%d\n", ans);
	return 0;
}

```
#### T4 关注值域特点
[洛谷P8969](https://www.luogu.com.cn/problem/P8969) 幻梦 | Dream with Dynamic

长度为 $n$ 的序列 $a_n$，维护区间加、区间变 $\text{popcount}$、单点查询。  
区间变 $\text{popcount}$ 指的是对于 $\forall x\in[l,r]$，$a_i\leftarrow\operatorname{popcount}(a_i)$。

注意到区间加操作是可以合并的。也就是对于每一个数，合并后操作序列一定是这样 ($\text{add}$ 可能有也可能没有)：
$$
\text{add}\rightarrow\text{pcnt}\rightarrow\text{add}\rightarrow\text{pcnt}\rightarrow\text{add}\rightarrow\text{pcnt}\rightarrow\dots
$$

$\text{popcount}$ 操作的特点是进行之后值域变成 $O(\log V)$。则在线段树上维护加法标记和 $\text{popcount}$ 标记，第一次 $\text{popcount}$ 操作之后值域变成 $O(\log V)$，维护这些值经过之后操作的答案的函数。函数复合封闭，标记可以下传。时间复杂度 $O(n\log n\log V)$。(来自汪娟老师)

[AC](https://www.luogu.com.cn/record/173609137) 156.14MB 8.69s
```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <vector>
using namespace std;
typedef long long ll;

// char buf[1<<20], *p1, *p2;
// #define getchar() (p1==p2&&(p2=(p1=buf)+fread(buf,1,1<<20,stdin),p1==p2)?0:*p1++)

inline ll read() {
	ll x=0, f=1; char ch=getchar();
	while (ch<'0'||ch>'9') {if (ch=='-') f=-1; ch=getchar();}
	while (ch>='0'&&ch<='9') x=(x<<1)+(x<<3)+(ch^48), ch=getchar();
	return x*f;
}

#define N 300010
#define V 64
#define pcnt __builtin_popcountll

struct node {
	bool flg;
	ll a, b; short p[V];
	ll eval(ll x) {return flg?p[pcnt(x+a)]+b:x+b;}
	void clear() {flg=a=b=0, memset(p, 0, sizeof(p));}
};

void operator+=(node &x, node y) {
	if (!y.flg) return x.b+=y.b, void();
	if (!x.flg) return y.a+=x.b, x=y, void();
	// vector<int> q(V);
	for (int i=0; i<V; ++i) x.p[i]=y.p[pcnt(x.p[i]+x.b+y.a)];
	// for (int i=0; i<V; ++i) x.p[i]=q[i];
	x.b=y.b;
}

ll n, a[N];

template <typename T> struct seg {
	#define ls (p<<1)
	#define rs (p<<1|1)
	ll t[N<<2]; T tag[N<<2];
	void build(ll p, ll l, ll r) {
		tag[p]=0; if (l==r) return t[p]=a[l], void(); ll mid=l+r>>1;
		build(ls, l, mid), build(rs, mid+1, r);
	}
	void build() {build(1, 1, n);}
	void push_down(ll p, ll l, ll r) {
		tag[ls]+=tag[p], tag[rs]+=tag[p], tag[p].clear();
	}
	void modify(ll nl, ll nr, ll l, ll r, ll p, T k) {
		if (nl<=l&&r<=nr) return tag[p]+=k, void();
		push_down(p, l, r); ll mid=l+r>>1;
		if (nl<=mid) modify(nl, nr, l, mid, ls, k);
		if (nr>mid) modify(nl, nr, mid+1, r, rs, k);
	}
	void modify(ll l, ll r, T k) {modify(l, r, 1, n, 1, k);}
	ll query(ll x, ll l, ll r, ll p) {
		if (l==r) return tag[p].eval(a[x]);
		push_down(p, l, r); ll mid=l+r>>1;
		if (x<=mid) return query(x, l, mid, ls);
		if (x>mid) return query(x, mid+1, r, rs);
	}
	ll query(ll x) {return query(x, 1, n, 1);}
};

int q, l, r, x; char ch;
seg<node> t;

signed main() {
	// freopen("g.in", "r", stdin);
	n=read(), q=read();
	for (int i=1; i<=n; ++i) a[i]=read();
	while (q--) {
		ch=getchar(); while (ch<'A'||ch>'Z') ch=getchar();
		if (ch=='A') {
			l=read(), r=read(), x=read(); t.modify(l, r, (node){0, 0, x});
		} else if (ch=='P') {
			l=read(), r=read(); node nd=(node){1, 0, 0};
			for (int i=0; i<V; ++i) nd.p[i]=i; t.modify(l, r, nd);
		} else if (ch=='J') {
			x=read(), printf("%lld\n", t.query(x));
		}
	}
	return 0;
}

```

---
### 图论
#### T1 Kruskal 针对相同边权的优化
[洛谷P5687](https://www.luogu.com.cn/problem/P5687) [CSP-S2019 江西] 网格图

给出 $n\times m$ 的网格图。  
点 $(i,j)$ 与点 $(i,j+1)$ 间的边权为 $a_i$，点 $(i,j)$ 与点 $(i+1,j)$ 之间的边权为 $b_i$。  
求这个网格图的最小生成树。

考虑朴素的 Kruskal 最小生成树算法，边的量级在 $O(n^2)$，有大量相同权值的边在排序时处于连续位置。

突破点在于，只有 $n+m$ 条不同的边，所以只需要对这些边排序即可。步骤：
1. 将 $a$ 数组和 $b$ 数组分别升序排序，维护双指针 $i$、$j$ 分别指向 $a$、$b$ 数组。表示已取 $a_1\sim a_{i-1}$、$b_1\sim b_{j-1}$，待取 $a_i\sim a_n$、$b_j\sim b_m$。
2. $n1$ 表示 $a$ 中剩余边数，初始化为 $n$；$m1$ 同理。
3. 找到 $a_i$ 与 $b_j$ 中较小的一者，将其加入最小生成树中。未保证无环，加入 $a_i$ 时需要加入 $m1$ 条边，而加入 $b_j$ 时需要加入 $n1$ 条边。

[AC](https://www.luogu.com.cn/record/175751577) 6.00MB 396ms
```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <algorithm>
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

#define N 300010
#define INF 0x7f7f7f7f7f7f7f7fLL
ll n, m, n1, m1, ans;
ll a[N], b[N];

signed main() {
	// freopen("a.in", "r", stdin);
	n=read(), m=read(), n1=n-1, m1=m-1; // <-
	for (ll i=1; i<=n; ++i) a[i]=read();
	for (ll i=1; i<=m; ++i) b[i]=read();
	sort(a+1, a+n+1), sort(b+1, b+m+1);
	ans=a[1]*m1+b[1]*n1; // <- Not Essential
	for (ll i=2, j=2; i<=n&&j<=m; ) {
		if (a[i]<b[j]) {
			ans+=a[i]*m1;
			++i, --n1;
		} else {
			ans+=b[j]*n1;
			++j, --m1;
		}
	}
	printf("%lld\n", ans);
	return 0;
}

```
#### T2 分层图
[洛谷P1073](https://www.luogu.com.cn/problem/P1073) [NOIP2009 提高组] 最优贸易

有向图，旅行家从 $1$ 出发到 $n$ 结束，路上选择一个城市买东西，再选择一个城市卖掉。  
给出每个城市的售价，问最大利润。

典中典，建立分层图，共 $3$ 层。第 $1$ 层表示没有买，第 $2$ 层表示持有商品，第 $3$ 层表示已经卖完。  
各层边权为 $0$，$1\rightarrow2$ 层设为各点售价的相反数，$2\rightarrow3$ 层设为各点售价。  
从第 $1$ 层的 $1$ 号点开始，跑 SPFA 单源最长路。到第 $3$ 层的 $n$ 号点的最长路即为答案。

[AC](https://www.luogu.com.cn/record/175931700) 13.58MB 146ms
```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <queue>
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

#define N0 100010
#define M0 500010
#define N 300010
#define M 3500010
#define INF 0x3f3f3f3f3f3f3f3fLL
int n, m;
int a[N0];
int t1, t2, t3;

#define v e[i].to
#define w e[i].val
int head[N], tot;
struct edge {int to, nxt, val;} e[M];
void add_edge(int x, int y, int z) {e[++tot]={y, head[x], z}, head[x]=tot;}

ll dis[N];
queue<int> q; bool inq[N];

void spfa(int s) {
	// memset(dis, 0, sizeof(dis));
	for (int i=0; i<N; ++i) dis[i]=-INF;
	memset(inq, 0, sizeof(inq));
	dis[s]=0, q.push(s), inq[s]=1;
	while (!q.empty()) {
		int u=q.front(); q.pop(), inq[u]=0;
		for (int i=head[u]; i; i=e[i].nxt) {
			if (dis[u]+w<=dis[v]) continue;
			dis[v]=dis[u]+w;
			if (!inq[v]) q.push(v), inq[v]=1;
		}
	}
}

signed main() {
	// freopen("c.in", "r", stdin);
	n=read(), m=read();
	for (int i=1; i<=n; ++i) a[i]=read();
	for (int i=1; i<=m; ++i) {
		t1=read(), t2=read(), t3=read();
		add_edge(t1, t2, 0), add_edge(t1+n, t2+n, 0), add_edge(t1+n+n, t2+n+n, 0);
		if (t3!=2) continue;
		add_edge(t2, t1, 0), add_edge(t2+n, t1+n, 0), add_edge(t2+n+n, t1+n+n, 0);
	}
	for (int i=1; i<=n; ++i) add_edge(i, i+n, -a[i]), add_edge(i+n, i+n+n, a[i]);
	spfa(1);
	printf("%lld\n", dis[n+n+n]);
	return 0;
}

```
#### T3 奇偶性问题
[洛谷P5663](https://www.luogu.com.cn/problem/P5663) [CSP-J2019] 加工零件

题意较为复杂，请移步洛谷查看。

一开始还在想一个奇环控制奇偶，然后就一直被这个思路困住了，在第 $47\text{min}$ 才做出来。
##### 解法一 分奇偶的bfs
首先，将 $u\rightarrow1$ 的问题转化为 $1\rightarrow u$ 的问题，再从 $1$ 开始 BFS。  
注意到答案只与距离的奇偶性有关。即，能否用奇数步/偶数步在距离限制内从 $1$ 到达 $u$。  
考虑分别记录奇数距离和偶数距离。奇数距离由偶数距离转移，偶数距离由奇数距离转移。具体实现见代码。

[AC](https://www.luogu.com.cn/record/176139140) 4.98MB 153ms
```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <queue>
using namespace std;


char buf[1<<20], *p1, *p2;
#define getchar() (p1==p2&&(p2=(p1=buf)+fread(buf,1,1<<20,stdin),p1==p2)?0:*p1++)

inline ll read() {
	ll x=0, f=1; char ch=getchar();
	while (ch<'0'||ch>'9') {if (ch=='-') f=-1; ch=getchar();}
	while (ch>='0'&&ch<='9') x=(x<<1)+(x<<3)+(ch^48), ch=getchar();
	return x*f;
}

#define N 100010
#define M 200010
#define INF 0x3f3f3f3f
typedef pair<int, int> pii;
#define mp make_pair
#define fi first
#define se second
int n, m, Q;
int t1, t2;
int ai, li;

#define v e[i].to
int head[N], tot;
struct edge {int to, nxt;} e[M];
void add_edge(int x, int y) {e[++tot]={y, head[x]}, head[x]=tot;}

ll dis1[N], dis2[N];
queue<int> q; bool inq[N];

void bfs(int s) {
	memset(dis1, 0x3f, sizeof(dis1));
	memset(dis2, 0x3f, sizeof(dis2));
	memset(inq, 0, sizeof(inq));
	dis1[s]=0, q.push(s), inq[s]=1;
	while (!q.empty()) {
		int u=q.front(); q.pop(), inq[u]=0;
		for (int i=head[u]; i; i=e[i].nxt) { // Here ↓
			if (dis1[u]+1<dis2[v]) {
				dis2[v]=dis1[u]+1;
				if (!inq[v]) q.push(v), inq[v]=1;
			}
			if (dis2[u]+1<dis1[v]) {
				dis1[v]=dis2[u]+1;
				if (!inq[v]) q.push(v), inq[v]=1;
			}
		}
	}
}

signed main() {
	// freopen("a1.in", "r", stdin);
	n=read(), m=read(), Q=read();
	for (int i=1; i<=m; ++i) t1=read(), t2=read(), add_edge(t1, t2), add_edge(t2, t1);
	bfs(1);
	// for (int i=1; i<=n; ++i) printf("%d ", dis1[i]); puts("");
	// for (int i=1; i<=n; ++i) printf("%d ", dis2[i]); puts("");
	for (int i=1; i<=Q; ++i) {
		ai=read(), li=read();
		// if (li<dis1[ai]) {puts("No"); continue;}
		if (dis2[ai]<=li&&li%2==dis2[ai]%2) {puts("Yes"); continue;}
		if (dis1[ai]<=li&&li%2==dis1[ai]%2) {puts("Yes"); continue;}
		puts("No");
	}
	return 0;
}

```
##### 解法二 分层图
$\texttt{jky}$ 在机房里讲的，奇数点和偶数点分别处于两层图中。  
本质和上一算法近似，思路更直接。

---
### 简单题
#### T1 考虑答案贡献
[洛谷P1403](https://www.luogu.com.cn/problem/P1403) [AHOI2005] 约数研究

设 $f(i)$ 表示 $i$ 的约数个数，求 $\sum\limits_{i=1}^nf(i)$。

改变枚举顺序 + 整除分块优化。

首先，$i$ 的约数一定小于等于 $i$。对 $1$ 到 $n$ 进行枚举。  
$[1,n]$ 中 $i$ 的倍数一共有 $\lfloor\frac ni\rfloor$ 个，而这些数都有共同的因数 $i$。  
故答案为 $\sum\limits_{i=1}^n\lfloor\frac ni\rfloor$。

[AC](https://www.luogu.com.cn/record/173704250) 3.96MB 106ms  
代码过于简单，不展示。
#### T2 进出数据结构要维护信息
[洛谷B3602](https://www.luogu.com.cn/problem/B3602) [图论与代数结构 202] 最短路问题_2

写了 $+\infty$ 遍 SPFA 和一遍 Dijkstra。

SPFA [TLE](https://www.luogu.com.cn/record/173734121) 8.61MB 2.20s  
Dijkstra [AC](https://www.luogu.com.cn/record/173737025) 4.38MB 5ms  
代码过于简单，不展示。

SPFA 死亡原因：
```cpp
int u=q.front(); q.pop(); // 原来的代码
int u=q.front(); q.pop(), inq[u]=0; // 第五遍的正确TLE代码
```
#### T3 学会打表 1
[洛谷P9930](https://www.luogu.com.cn/problem/P9930) [NFLSPC #6] 1064 病毒

对数字串 $x$，设其中奇数数码，偶数数码和总数码个数分别为 $a,b,c$。定义 $g(x)$ 为将奇数数字个数、偶数数字个数、数字总位数依次写下得到的数字串，不忽略前导零。

设 $f_k(x)$ 表示将数字 $x$ 忽略前导零写成数字串 $x'$ 后，将 $g(x')$ 迭代 $k$ 次得到的数字串对应的数字，即设 $x^*=g(g(\cdots g(x')))$（共有 $k$ 个 $g$），则 $f_k(x)$ 为将 $x^*$ 写成数字后的结果。

给定 $n, k$，其中 $0\le n<k\le10^5$，求 $\sum\limits_{i=0}^{10^n-1} f_k(i)$。

打表发现 $k=1$ 时答案为 $11$，其余情况答案为 $213\times10^n$。

证明过程见[题解](https://www.luogu.com.cn/article/7i6vvkud)

[AC](https://www.luogu.com.cn/record/173952308) 564.00KB 7ms  
代码过于简单，不展示。
#### T4 学会打表 2
[洛谷P5657](https://www.luogu.com.cn/problem/P5657) [CSP-S2019] 格雷码

读题目。求 $n$ 位格雷码的 $k$ 号二进制串。

找规律即可，第 $i$ 位为 $k\oplus\lfloor\frac k2\rfloor$ 的第 $i$ 位。

[AC](https://www.luogu.com.cn/record/174736276) 680.00KB 69ms  
代码过于简单，不展示。

---
### 动态规划
#### T1 最大子段和
[洛谷P1115](https://www.luogu.com.cn/problem/P1115) 最大子段和

给出一个长度为 $n$ 的序列 $a$，选出其中连续且非空的一段使得这段和最大。
##### 解法一 动态规划
设 $f_i$ 表示以 $a_i$ 为结尾的最大子段和。则有转移方程：
$$
f_i=max\{f_{i-1}+a_i, a_i\}
$$
[AC](https://www.luogu.com.cn/record/175563308) 4.48MB 30ms  
代码过于简单，不展示。
##### 解法二 贪心
处理前缀和和前缀和前缀最小值，即：
$$
s_i=s_{i-1}+a_i\\\\
ms_i=\min_{j=1}^is_j=\min\{ms_{i-1},s_i\}
$$
这样，以 $i$ 为结尾的最大子段和即为 $s_i-ms_i$。  
感性理解：前缀和 - 前缀和前缀最小值 = 最大子段，因为前缀和是 $[1,j]$ 连续的。

[AC](https://www.luogu.com.cn/record/175570573) 6.00MB 32ms  
代码过于简单，不展示。
#### T2 双子段和
[洛谷P2642](https://www.luogu.com.cn/problem/P2642) 双子序列最大和

取两段子段，使得子段和最大。子段最少包含 $1$ 个数，子段间最少间隔 $1$ 个数。

求 $[1,i]$ 最大子段和和 $[i,n]$ 最大子段和，分别记录到 $f1$ 和 $f2$ 上。最终答案即为 $\max\limits_{i=2}^{n-1}f1_{i-1}+f2_{i+1}$。

[AC](https://www.luogu.com.cn/record/175565791) 24.36MB 109ms  
代码过于简单，不展示。
#### T3 带最大长度限制的最大子段和
[洛谷P1714](https://www.luogu.com.cn/problem/P1714) 切蛋糕

最大长度为 $m$ 的最大子段和。

参考最大子段和的贪心解法，不同的是前缀最小和的下标取值范围有限制。使用单调队列维护 $ms_i=\min\limits_{j=i-m}^{i-1}s_j$。

[AC](https://www.luogu.com.cn/record/175626690) 14.66MB 61ms  
不知道怎么就写成 `ms[i-1]` 了？
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

#define N 500010
#define INF 0x7f7f7f7f7f7f7f7fLL
ll n, m, ans;
ll a[N], s[N], ms[N];

ll q[N], l, r; // in range [l,r]

signed main() {
	// freopen("a3.in", "r", stdin);
	n=read(), m=read(), l=1, r=0, ans=-INF;
	for (int i=1; i<=n; ++i) a[i]=read();
	for (int i=1; i<=n; ++i) s[i]=a[i]+s[i-1];
	// for (int i=1; i<=n; ++i) ms[i]=min(ms[i-1], s[i]);
	q[++r]=0;
	for (int i=1; i<=n; ++i) {
		while (l<=r&&q[l]<i-m) ++l;
		ms[i-1]=s[q[l]];
		while (l<=r&&s[q[r]]>=s[i]) --r;
		q[++r]=i;
	}
	for (int i=1; i<=n; ++i) ans=max(ans, s[i]-ms[i-1]);
	printf("%lld\n", ans);
	return 0;
}

```
#### T4 环形最大子段和
没有源，环形最大子段和。  
即，在最大子段和的基础上，认为 $a_1$ 和 $a_n$ 是连续的。
##### 解法一 断环为链
线段树求最大子段和。

对环上 $n$ 个数复制一遍，再对这 $2n$ 个数建线段树。查询 $[1,n]$、$[2,n+1]$、$\dots$、$[n+1,2n]$ 区间的答案，取最大值即为最终答案。  
时间复杂度 $O(n\log n)$。
##### 解法二 DP
将环拆开，在 $1\sim n$ 的序列上进行操作。容易发现，最大子段只可能为以下两种情况：
1. 不经过断点 $n\rightarrow1$，答案区间 $[i,j]$；
2. 经过断点 $n\rightarrow1$，答案区间 $[i,n]\cup[1,j]$。

对于情况 $1$，直接在 $[1,n]$ 上做最大子段和即可。对于情况 $2$，可以在 $[1,n]$ 上做最小子段和，然后用整体减去最小子段和即可。

（我和 $\texttt{ltr}$ 看着表意模糊的题解想了半个多小时才想出来的，简直是无敌了）
#### T5 带权最长上升子序列
[AT_dp_q](https://atcoder.jp/contests/dp/tasks/dp_q) Flowers | [洛谷](https://www.luogu.com.cn/problem/AT_dp_q)

带权最长上升子序列。  
序列长度为 $n$，每个点有高度 $h_i$ 和权值 $a_i$。从中选出高度递增且权值最大的子序列。

振声2025级信竞选拔考 第一轮T4  
$\texttt{tmc}$ 告诉我的。实际上这道题我们统一刷过，但是我忘了。对于没能口糊 AK 下一级选拔考我感到很惭愧。

令 $f_i$ 表示以第 $i$ 个点为结尾的最长上升子序列，有状态转移方程：
$$
f_i=a_i+\max_{j=1}^{i-1}f_j[h_j<h_i]
$$
使用树状数组维护即可。

[AC](https://www.luogu.com.cn/record/176480173) 10.77MB 51ms
```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <algorithm>
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

#define N 200010
int n, m;
ll ans;
ll a[N], d[N], w[N];

template <typename T> struct BIT {
	T c[N]; int lowbit(int x) {return x&(~x+1);}
	void modify(int x, T k) {while (x<=n) c[x]=max(c[x], k), x+=lowbit(x);}
	T g(int x) {T ans=T(); while (x>0) ans=max(ans, c[x]), x-=lowbit(x); return ans;}
	T query(int x) {return g(x);} T query(int l, int r) {return g(r)-g(l-1);}
}; BIT<ll> ta;

signed main() {
	// freopen("a.in", "r", stdin);
	n=read(), ans=1;
	for (int i=1; i<=n; ++i) a[i]=d[i]=read();
	for (int i=1; i<=n; ++i) w[i]=read();
	sort(d+1, d+n+1), m=unique(d+1, d+n+1)-d-1;
	for (int i=1; i<=n; ++i) {
		int p=lower_bound(d+1, d+m+1, a[i])-d;
		ll t=ta.query(p-1)+w[i];
		ans=max(ans, t);
		ta.modify(p, t);
	}
	printf("%lld\n", ans);
	return 0;
}

```

---
### 写在后面
44876 字符，~~一点检查的欲望都没有~~。发现问题记得写在[勘误表](../../apps/errata)上，谢谢！

<!--这段时间看了一个很有意思的收支股票的题，关于 DP 状态设计的。$f$ 表示持有现金数量，$g$ 表示持有股票数量。最终状态只在 f 和 g 之间转移。记得总结一下！-->
