---
title: 离线二维数点算法
date: 2024-09-16 12:30:36
categories: 
- 笔记
- 算法
tags: 
---

---
### 知识前置
#### 树状数组
一种可以单点修改、区间查询的简便数据结构。结合差分可以实现区间修改、区间查询。详见[OI-Wiki](https://oi-wiki.org/ds/fenwick/)。
```cpp
template <typename T> struct BIT {
	T c[N]; int lowbit(int x) {return x&(~x+1);}
	void modify(int x, T k) {while (x<=n) c[x]=c[x]+k, x+=lowbit(x);}
	T g(int x) {T ans=T(); while (x>0) ans=ans+c[x], x-=lowbit(x); return ans;}
	T query(int x) {return g(x);} T query(int l, int r) {return g(r)-g(l-1);}
};
```
#### 离散化
一种保留大小关系的映射，$O(V)\rightarrow O(n)$。详见[OI-Wiki](https://oi-wiki.org/misc/discrete/)。

---
### 解决问题
平面上有 $n$ 个点，坐标 $(x_i,y_i)$。给出 $m$ 个矩形，左上角 $(x1_j,y1_j)$，右上角 $(x2_j,y2_j)$。询问有多少个点在各个矩阵里，即对于每个 $j$，满足 $x1_j\le x_i\le x2_j\land y1_j\le y_i\le y2_j$ 的 $i$ 的个数。$1\le i\le n$，$1\le j\le m。$

---
### 一、朴素算法
适用于 $n$、$m$ 的规模较小的情况，对 $x$ 和 $y$ 的值域无限制。

枚举每个点和每个矩阵，检查点 $i$ 是否在矩阵 $j$ 内。若在，$\text{ans}_j\leftarrow \text{ans}_j+1$。  
这样正确性可以保证，因为一个点和对一个矩阵只会做一次贡献。

时间复杂度 $O(nm)$。

---
### 二、扫描线
适用于 $x$ 值域无限制、$y$ 值域较小的情况。
#### 例题
[洛谷P10814](https://www.luogu.com.cn/problem/P10814) 离线二维数点

给你一个长为 $n$ 的序列 $a$，有 $m$ 次询问，每次询问给定 $l,r,x$，求 $[l,r]$ 区间中小于等于 $x$ 的元素个数。
#### 思路
借助前缀和思想，我们将询问拆成两条：
1. $[1,r]$ 的分询问，权值为 $1$；
2. $[1,l-1]$ 的分询问，权值为 $-1$。

分询问 $\times$ 权值 的和即为询问的答案。

在平面上用一条线从左向右 (从 $1$ 到 $n$) 扫，每扫到一个点就将它“附着”在直线上。这样，$[1,x]$ 的询问就是直线扫到 $i=x$ 后附着的点在区域 $[1,y]$ 内的答案。

<div style="display: block; margin-left: auto; margin-right: auto; aspect-ratio: 4/3; width: 100%;">
	<iframe src="https://www.desmos.com/calculator/zufqboqk5h?embed" style="width: 100%; height: 100%; border: 1px solid #ccc;"></iframe>
</div>

#### 代码实现
实现上，使用 `vector<node> c[N]` 表示每个横坐标的查询。  
使用值域树状数组维护单点修改和区间查询，查询小于等于某个高度的点数量。

时间复杂度 $O(n\log n+km)$，$k=2$。

[AC](https://www.luogu.com.cn/record/176082688) 150.16MB 2.00s  
由于用的不多，代码我放到了[这里](../../source/accessories/tdpc-1.cpp)。

---
### 三、扫描线 + 离散化
适用于 $x$、$y$ 值域无限制的情况。

[洛谷P2163](https://www.luogu.com.cn/problem/P2163) [SHOI2007] 园丁的烦恼  
一上离散化就成蓝题了。
#### 代码实现
使用离散化，将点的规模从 $O(V)$ 降至 $O(n)$。同时，由于插入/查询只需要全序关系，所以正确性可以保证。

将点和询问统一处理，点优先于询问处理。  
类前缀和思想，将一个询问拆成四份，以处理一个矩形内的询问。

时间复杂度 $O((n+km)\log(n+km))$，$k=4$。

[AC](https://www.luogu.com.cn/record/176327207) 54.70MB 1.25s  
由于用的不多，代码我放到了[这里](../../source/accessories/tdpc-2.cpp)。

注：由于使用了离散化，时间复杂度有所增加，故不能通过 P10814。

---
### 四、带权的点
不需要将带权点拆为 $k$ 个点，那样会使时间复杂度大幅增加。

只需要在代码上做一点小改动即可，在树状数组上插入时将权值插入。
#### 代码实现
[洛谷P3755](https://www.luogu.com.cn/problem/P3755) [CQOI2017] 老C的任务  
[AC](https://www.luogu.com.cn/record/176329996) 27.35MB 1.06s
```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <vector>
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

#define N 500010
#define M 500010
int n, m; // n modifications & m queries in total.

namespace tdpc {
	int n, X[N+(M<<2)], Y[N+(M<<2)], nx, ny; ll ans[M]; // n points in total.
	struct node {int x, y, val, id, cof;} p[N+(M<<2)]; // M: val | Q: id, cof
	bool operator<(node a, node b) {return a.x==b.x?abs(a.cof)<abs(b.cof):a.x<b.x;}
	template <typename T> struct BIT {
		T c[N]; int lowbit(int x) {return x&(~x+1);}
		void modify(int x, T k) {while (x<=n) c[x]=c[x]+k, x+=lowbit(x);}
		T g(int x) {T ans=T(); while (x>0) ans=ans+c[x], x-=lowbit(x); return ans;}
		T query(int x) {return g(x);} T query(int l, int r) {return g(r)-g(l-1);}
	}; BIT<ll> ta;
	void np(int x, int y, int val, int id, int cof) { // Make a new point.
		p[++n]={x, y, val, id, cof}, X[n]=x, Y[n]=y;
	}
	void set_point(int x, int y, int val) {np(x, y, val, 0, 0);}
	void set_query(int id, int x1, int y1, int x2, int y2) {
		if (x1>x2) swap(x1, x2); if (y1>y2) swap(y1, y2);
		np(x2, y2, 0, id, 1), np(x1-1, y1-1, 0, id, 1);
		np(x2, y1-1, 0, id, -1), np(x1-1, y2, 0, id, -1);
	}
	void process() {
		sort(X+1, X+n+1), nx=unique(X+1, X+n+1)-X-1;
		sort(Y+1, Y+n+1), ny=unique(Y+1, Y+n+1)-Y-1;
		for (int i=1; i<=n; ++i) {
			p[i].x=lower_bound(X+1, X+nx+1, p[i].x)-X;
			p[i].y=lower_bound(Y+1, Y+ny+1, p[i].y)-Y;
		}
		sort(p+1, p+n+1);
		for (int i=1; i<=n; ++i) {
			if (p[i].cof==0) {ta.modify(p[i].y, p[i].val); continue;}
			ans[p[i].id]+=p[i].cof*ta.query(p[i].y);
		}
	}
}

signed main() {
	// freopen("d.in", "r", stdin);
	n=read(), m=read();
	for (int i=1; i<=n; ++i) {
		int x=read(), y=read(), val=read();
		tdpc::set_point(x, y, val);
	}
	for (int i=1; i<=m; ++i) {
		int x1=read(), y1=read(), x2=read(), y2=read();
		tdpc::set_query(i, x1, y1, x2, y2);
	}
	tdpc::process();
	for (int i=1; i<=m; ++i) printf("%lld\n", tdpc::ans[i]);
	return 0;
}

```
机房内一位大佬 $\texttt{wyz}$ 说我写的太长了，我也不知道哪里出了问题导致这么长 QWQ。

---
### 其他求解方法
可以使用 CDQ 分治求解三位偏序的方法求解。

还是考虑将原询问拆为四个，点和询问统一处理。然后构建三维偏序关系：
1. 第一维：$a_i=x_i$，$a_i\le a_j$；
2. 第二维：$b_i=y_i$，$b_i\le b_j$；
3. 第三维：$c_i=[i\in\text{Points}]=[i\notin\text{Queries}]$，$c_i<c_j$。  
   这一维保证查询只能查询到点，而不会查询到别的询问。

对于每个 $j$，满足偏序的 $i$ 的数量即为子询问 $j$ 的答案，再按对应位置权值加起来即可。

由此可见，三位偏序一定可以解二维数点，但二维数点不能解三维偏序。
