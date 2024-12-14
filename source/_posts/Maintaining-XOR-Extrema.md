---
title: 维护异或极值
date: 2024-05-24 21:59:35
categories: 
- 笔记
- 算法
tags: 
---

---
### 知识前置
#### 字典树
见之前的文章[Trie](../../2024/04/08/Trie/)。
#### 异或运算
符号$\oplus$。顾名思义，它是或运算的变形，意为“或且不同”。  
若前后两值相同则为$0$，反之则为$1$。法则如下：
$$
\begin{array}{|c|c|c|}
\hline\oplus&0&1\\\\
\hline0&0&1\\\\
\hline1&1&0\\\\
\hline\end{array}
$$
重要性质：$a\oplus b\oplus a=b$，即异或两次相当于没异或。

---
### 算法定义
解决最大异或对问题。

---
### 算法原理
利用字典树寻找最大异或。具体地，将数以二进制形式存储到字典树中，这个字典树就叫0-1Trie。  
查找$n$对应的最大异或数，只需从根节点开始向下贪心查询，第$k$对应二进制从左往右数第$k$位(记为$y$)。对于第$k$层，找与$y$不同的边，转移到对应节点进入下一层，若不存在就跳想通的，直到找到与原数差异最大的数。
#### 贪心正确性证明
在数的二进制形式下，数的大小由较高位决定，而贪心是由根节点向下的，所以会确保较高位最大，再贪较低位。
#### 有解性和不越界证明
由于建树时建了一个深度为$32$的树，查询也是到第$32$层，所以一定会到达一个终点。
#### 答案统计
在每一次成功找到不同节点时将$res$的对应位设为$1$，根据异或运算法则，答案即为$res$。
#### 伪代码
```cpp
if (该位为1) {
	if (存在边u->v且权值为0) {
		当前点转移到v，进入下一层。
	} else {
		当前点转移到子节点，进入下一层。
	}
} else if (该位为0) {
	if (存在边u->v且权值为1) {
		当前点转移到v，进入下一层。
	} else {
		当前点转移到子节点，进入下一层。
	}
}
```

---
### 代码实现
```cpp
void insert(ll u, ll rt) { // 以rt为根插入数u
	for (ll i=31; ~i; --i) {
		ll y=(u>>i)&1; // 当前位
		if (!trie[rt][y]) trie[rt][y]=++cnt; // 新开点
		rt=trie[rt][y]; // 转移
	}
}

ll query(ll u, ll rt) { // 以rt为根查找数u的最大异或值
	ll res=0;
	for (ll i=31; ~i; --i) {
		ll y=(u>>i)&1;
		if (trie[rt][y^1]) res+=(1<<i), rt=trie[rt][y^1]; // 找到，统计答案并转移
		else rt=trie[rt][y]; // 找不到，转移
	}
	return res;
}

```

---
### 注意事项
1.注意数组开多大，0-1Trie的空间一般要开$N\times32$。  
2.数字存到树上时需要从高位向低位，从树根到叶子结点对应存储，不要搞反。

---
### 例题
[洛谷P4551](https://www.luogu.com.cn/problem/P4551) 最长异或路径
#### 题目描述
求树上任意两点间简单路径上所有节点的异或和的最大值。
#### 题解
求根节点到每一个节点的异或值，根据性质$a\oplus b\oplus a=b$，可得$a\xrightarrow\oplus b=(a\xrightarrow\oplus\text{root})\oplus(\text{root}\xrightarrow\oplus b)$，因为$\text{LCA}\rightarrow\text{root}$这段路径走了两遍，相当于没走。  
于是，我们只需要$O(n)$预处理每个节点到根节点的异或值，即可$O(1)$求出任意两点间的异或值。

问题转化为，已知各节点到根节点的异或值，求这些异或值的最大异或值，即最大异或对问题。使用0-1Trie解决。
#### 代码
[AC](https://www.luogu.com.cn/record/159924634) 11.77MB 130ms
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
#define v e[i].to
#define w e[i].val
int n, t1, t2, t3;
int head[N], tot;
struct edge {int to, nxt, val;} e[N<<1];
void add_edge(int x, int y, int z) {e[++tot]={y, head[x], z}, head[x]=tot;}
int trie[N<<5][2], d[N], cnt, ans;

void dfs(int u, int fa, int pre) {
	d[u]=pre;
	for (int i=head[u]; i; i=e[i].nxt) {
		if (v==fa) continue;
		dfs(v, u, pre^w);
	}
}

void add(int u, int rt) {
	for (int i=31; ~i; --i) {
		int y=(u>>i)&1;
		if (!trie[rt][y]) trie[rt][y]=++cnt;
		rt=trie[rt][y];
	}
}

int query(int u, int rt) {
	int res=0;
	for (int i=31; ~i; --i) {
		int y=(u>>i)&1;
		if (trie[rt][y^1]) res+=(1<<i), rt=trie[rt][y^1];
		else rt=trie[rt][y];
	}
	return res;
}

signed main() {
	// freopen("a.in", "r", stdin);
	n=read();
	for (int i=1; i<n; ++i) {
		t1=read(), t2=read(), t3=read();
		add_edge(t1, t2, t3), add_edge(t2, t1, t3);
	}
	dfs(1, 0, 0);
	for (int i=1; i<=n; ++i) add(d[i], 0), ans=max(ans, query(d[i], 0));
	printf("%d\n", ans);
	return 0;
}

```

---
### 总结
最大异或极值问题需要转化为最大异或对问题，再将这些数按位转化为0-1Trie，树上贪心求解。
