---
title: 洛谷P3478 题解
date: 2024-03-15 22:51:20
categories: 
- 笔记
- 算法
tags: 
---

---
### 知识前置
#### 换根DP
请前往[另一篇文章](../Dynamic-Programming-with-Root-Replacement)。

---
### 题目描述
更详细的描述，请前往[洛谷](https://www.luogu.com.cn/problem/P3478)查看。

给定一个 $n$ 个点的树，请求出一个结点，使得以这个结点为根时，所有结点的深度之和最大。  
一个结点的深度之定义为该节点到根的简单路径上边的数量。

数据范围：$1\le n\le1\times10^6$，$1\le u,\ v\le n$。

---
### 解题思路
换根DP板子题，维护深度信息。  
先随便找一个根节点，跑一边DFS，计算到所有节点的深度。  
接着再来一个DFS换根，每次从母节点换到子节点时，当前子树内所有节点的深度减一，母节点及其他子树的所有节点深度加一。

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

#define N 1000010
#define v e[i].to
ll n, t1, t2, ans=1;
ll head[N], tot;
ll dep[N], siz[N], dp[N]; //dep[root] = 1

struct edge {
	ll to, nxt;
} e[N<<1];

void add_edge(ll x, ll y) {
	e[++tot].nxt=head[x];
	head[x]=tot;
	e[tot].to=y;
}

void dfs1(ll u, ll fa) {
	siz[u]=1, dep[u]=dep[fa]+1;
	for (ll i=head[u]; i; i=e[i].nxt) {
		if (v==fa) continue;
		dep[v]=dep[u]+1;
		dfs1(v, u);
		siz[u]+=siz[v];
	}
}

void dfs2(ll u, ll fa) {
	for (ll i=head[u]; i; i=e[i].nxt) {
		if (v==fa) continue;
		dp[v]=dp[u]+n-siz[v]-siz[v];
		dfs2(v, u);
	}
}

signed main() {
	n=read();
	for (ll i=1; i<n; ++i) {
		t1=read(), t2=read();
		add_edge(t1, t2), add_edge(t2, t1);
	}
	dfs1(1,0);
	for (ll i=1; i<=n; ++i) dp[1]+=dep[i];
	dfs2(1,0);
	for (ll i=2; i<=n; ++i) if (dp[i]>dp[ans]) ans=i;
	printf("%lld\n", ans);
	return 0;
}

```
