---
title: FHQ Treap
date: 2024-07-09 20:37:41
categories: 
- 笔记
- 算法
tags: 
---

---
### 知识前置
#### 二叉搜索树
**左子树**点权均**小于**根节点，**右子树**点权都**大于**根节点的二叉树。  
它有很多好的性质，详见[OI-Wiki](https://oi-wiki.org/ds/bst/#%E5%AE%9A%E4%B9%89)。
#### 平衡树
左右子树高度差不太大的二叉树，详见[OI-Wiki](https://oi-wiki.org/ds/bst/#%E5%B9%B3%E8%A1%A1%E6%A0%91%E7%AE%80%E4%BB%8B)。  
阅读本文，你并不需要了解平衡树的旋转操作。
#### Treap
=Tree+Heap，同时满足二叉搜索树和堆的性质。详见[OI-Wiki](https://oi-wiki.org/ds/treap/)。
#### 范浩强
IOI金牌，天才AI少年，旷世奇才。自己[百度一下](https://www.baidu.com/s?wd=%E8%8C%83%E6%B5%A9%E5%BC%BA)感受强者风范。  
本文所介绍的FHQ Treap正是这位大佬发明的，实现方法尤为**精妙**。

---
### 算法定义
FHQ Treap (也叫非旋Treap)，是一个数据结构，可以通过分裂和合并完成插入、删除和查询排名等操作。  
与其它维护平衡树的基本算法不同，FHQ Treap不需要旋转。

维护信息：左右儿子 $ls$、$rs$，权值 $val$、子树大小 $siz$ 及随机优先级 $rnd$。

---
### 基础操作

#### 新建节点
赋值 $val\leftarrow v$，$siz\leftarrow1$。  
$rnd$ 赋值为某个随机数即可。
```cpp
int add(int v) {return val[++tot]=v, rnd[tot]=rand(), siz[tot]=1, tot;}
```
#### 更新答案
将左右儿子的答案更新到父节点。
```cpp
void push(int p) {siz[p]=siz[ls[p]]+siz[rs[p]]+1;}
```
#### 分裂
一般按权值分裂，少数题目需要按子树大小分裂。(按大小分裂我还没搞明白，可以多看看相关题目的题解自主学习。)

通过按权值分裂与合并维护的FHQ Treap满足右儿子大于左儿子。即，对于任意节点 $u$，满足 $val_{ls}\le val_u<val_{rs}$。

若将原平衡树 $T$ 按权值 $v$ 分裂为两个平衡树 $T_x$ 和 $T_y$，则对于任意 $i\in T_x$，$j\in T_y$，均满足 $val_i\le v<val_j$。

设当前节点为 $p$。  
1.如果 $val_p\le v$，则 $p$ 属于 $T_x$，同时 $p$ 的左子树 $T_{ls_p}$ 中所有节点权值也均小于或等于 $v$，属于 $T_x$。  
2.如果 $val_p>v$，则 $p$ 属于 $T_y$，同时 $p$ 的右子树 $T_{rs_p}$ 中所有节点权值也均大于 $v$，属于 $T_y$。
```cpp
// 将子树p按权值v分裂为以x和y为根节点的两棵树
void spl(int p, int v, int &x, int &y) {
	if (!p) return x=y=0, void();
	if (val[p]<=v) spl(rs[p], v, rs[x=p], y);
	else spl(ls[p], v, x, ls[y=p]);
	push(p);
}
```
#### 合并
合并两棵树 $T_x$、$T_y$，必须满足对于任意 $i\in T_x$，$j\in T_y$，都有 $val_i<val_j$，即 $T_x$ 树上最大节点小于 $T_y$ 树上最小节点。

FHQ Treap的合并遵循Treap的原则，以 $rnd$ 作为判断节点父子关系的标准，以 $val$ 作为判断左右儿子的标准。至于为什么 $rnd$ 决定上下，在后文里会解释。

假设合并节点 $x$、$y$，且 $val_x<val_y$。  
1.当 $rnd_x>rnd_y$，即 $x$ 为 $y$ 的父亲时，$y$ 是 $x$ 的右儿子。将 $T_y$ 合并到 $x$ 右子树上，$rs_x$ 赋值为 $\operatorname{merge}(rs_x,y)$ 即可。  
2.当 $rnd_x\le rnd_y$，即 $y$ 为 $x$ 的父亲时，$x$ 是 $y$ 的左儿子。将 $T_x$ 合并到 $y$ 左子树上，$ls_y$ 赋值为 $\operatorname{merge}(ls_y,x)$ 即可。  
3.当 $T_x$ 或 $T_y$ 为空时，返回非空的那棵树即可。  
合并完成后需要更新答案(push)。
```cpp
// 将根节点为x和y的两棵树合并，返回合并后的根节点
int mer(int x, int y) {
	if (!x||!y) return x|y;
	if (rnd[x]<rnd[y]) return ls[y]=mer(x, ls[y]), push(y), y;
	return rs[x]=mer(rs[x], y), push(x), x;
}
int mer(int x, int y, int z) {return mer(x, mer(y, z));}
```

---
### 复杂操作
#### 插入
将树分裂为两部分后，在中间插入新节点。  
分裂时按新节点权值分裂，以保证有序。
```cpp
// 在树rt中插入权值为v的点
void ins(int v) {int x=0, y=0; spl(rt, v-1, x, y), rt=mer(x, add(v), y);}
```
#### 删除
假设需要删除的点的权值为 $k$，将原树 $T$ 按 $v$ 拆为 $T_x$、$T_y$、$T_z$ 三个子树。  
对于任意 $p\in T_x$，$val_p\le v-1$；  
对于任意 $p\in T_y$，$val_p=v$；  
对于任意 $p\in T_z$，$val_p> v$。

接着，将 $T_y$ 的根节点删除，再将左右子树合并构成新的 $T_y$，然后将 $T_x$、$T_y$ 和 $T_z$ 依次合并还原原树 $T$。  
这样，保证删去的点恰为一个，且权值为 $k$。
```cpp
// 在树rt中删除一个权值为v的点
void del(int v) {
	int x=0, y=0, z=0; spl(rt, v-1, x, y), spl(y, v, y, z);
	y=mer(ls[y], rs[y]), rt=mer(x, y, z);
}
```
#### 查询第k大
根据FHQ Treap的有序性，只需要根据子树大小决定前往左/右子树查找即可。

假设需要查找第 $k$ 大，且当前遍历到了点 $p$。  
1.若 $k<siz_{ls_p}+1$，则说明找的 $p$ 过了，需要向左儿子递归。  
2.若 $k=siz_{ls_p}+1$，则说明找的 $p$ 恰好是第 $k$ 个，返回即可。  
3.若 $k>siz_{ls_p}+1$，则说明找的 $p$ 少了，需要向右儿子递归。
```cpp
// 查询第k大的节点权值并返回
int kth(int k) {
	for (int p=rt; ; ) {
		if (k<siz[ls[p]]+1) p=ls[p];
		else if (k>siz[ls[p]]+1) k-=siz[ls[p]]+1, p=rs[p];
		else return val[p];
	}
}
```
#### 查询前驱/后继
下面是第一种做法，在 $T$ 中查询 $val_p=v\pm1$ 的点。  
借助FHQ Treap的有序性，大了向左子树找，小了向右子树找，直到叶子节点。每一次存下答案，以便找小于 $k$ 的最大值(前驱)或大于 $k$ 的最小值(后继)。
```cpp
// 查询权值小于v的最大权值
int pre(int v) {
	for (int p=rt, ans=0; ; ) {
		if (!p) return ans;
		else if (v<=val[p]) p=ls[p];
		else ans=val[p], p=rs[p];
	}
}
// 查询权值大于v的最小权值
int suc(int v) {
	for (int p=rt, ans=0; ; ) {
		if (!p) return ans;
		else if (v>=val[p]) p=rs[p];
		else ans=val[p], p=ls[p];
	}
}
```
还有一种基于分裂的做法。  
1.前驱：按权值 $v-1$ 将原树 $T$ 分为 $T_x$ 和 $T_y$，使得任意 $p\in T_x$，均满足 $val_p\le v-1$。再从 $T_x$ 中沿右儿子遍历到叶子节点，找最大节点，即为前缀。  
2.后继：按权值 $v$ 将原树 $T$ 分为 $T_x$ 和 $T_y$，使得任意 $p\in T_y$，均满足 $val_p>v$。再从 $T_y$ 中沿左儿子遍历到叶子节点，找最小节点，即为后继。  
3.合并 $T_x$、$T_y$，复原原树 $T$。

代码很简单不再写了，这种做法相较上一种常数较大。
#### 查询排名
按权值 $v-1$ 将原树 $T$ 分为 $T_x$ 和 $T_y$，使得任意 $p\in T_x$，均满足 $val_p\le v-1$。  
这样，小于 $v$ 的点均位于 $T_x$ 上，$siz_x$ 即为前面的点的总数，而 $siz_x+1$ 即为排名。
```cpp
// 查询权值v的排名，相同大小的不跳过
int rnk(int v) {
	int x=0, y=0, ans=0;
	spl(rt, v-1, x, y), ans=siz[x]+1, rt=mer(x, y);
	return ans;
}
```

---
### rnd生成目的
感性理解：Treap需要一个关键字 $val$，用以满足二叉树(Tree)的性质；需要一个顺序 $rnd$，以满足堆(Heap)的性质。  
理性理解：如果没有 $rnd$，Treap会退化成一条**链**，进而无法达到 $O(\log n)$ 的时间复杂度，变为了 $O(n)$。

我们需要一个 $rnd$ 保证Treap不会退化成链，保持其有层次；还需要一个权值 $val$ 保证Treap有秩序以解决问题。故 $rnd$ 是为了满足大根堆性质而取的随机数，真正的权值 $val$ 是关键字。

由于 $rnd$ 是随机取的，所以FHQ Treap是期望平衡，不是严格平衡。而这也是其常数大于Splay算法的根本原因。

---
### 例题
[洛谷P3369](https://www.luogu.com.cn/problem/P3369) 普通平衡树
#### 题目描述
您需要写一种数据结构，来维护一些数，其中需要提供以下操作：  
1.插入一个数 $x$。  
2.删除一个数 $x$（若有多个相同的数，应只删除一个）。  
3.定义排名为比当前数小的数的个数 $+1$。查询 $x$ 的排名。  
4.查询数据结构中排名为 $x$ 的数。  
5.求 $x$ 的前驱（前驱定义为小于 $x$，且最大的数）。  
6.求 $x$ 的后继（后继定义为大于 $x$，且最小的数）。

对于操作 3,5,6，不保证当前数据结构中存在数 $x$。
#### 代码
[AC](https://www.luogu.com.cn/record/161257312) 2.21MB 194ms
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
int n, opt, x;

namespace FHQ {
	int rt, tot;
	int ls[N], rs[N], val[N], rnd[N], siz[N];
	void push(int p) {siz[p]=siz[ls[p]]+siz[rs[p]]+1;}
	void spl(int p, int v, int &x, int &y) {
		if (!p) return x=y=0, void();
		if (val[p]<=v) spl(rs[p], v, rs[x=p], y);
		else spl(ls[p], v, x, ls[y=p]);
		push(p);
	}
	int mer(int x, int y) {
		if (!x||!y) return x|y;
		if (rnd[x]<rnd[y]) return ls[y]=mer(x, ls[y]), push(y), y;
		return rs[x]=mer(rs[x], y), push(x), x;
	}
	int mer(int x, int y, int z) {return mer(x, mer(y, z));}
	int add(int v) {return val[++tot]=v, rnd[tot]=rand(), siz[tot]=1, tot;}
	void ins(int v) {int x=0, y=0; spl(rt, v-1, x, y), rt=mer(x, add(v), y);}
	void del(int v) {
		int x=0, y=0, z=0; spl(rt, v-1, x, y), spl(y, v, y, z);
		y=mer(ls[y], rs[y]), rt=mer(x, y, z);
	}
	int kth(int k) {
		for (int p=rt; ; ) {
			if (k<siz[ls[p]]+1) p=ls[p];
			else if (k>siz[ls[p]]+1) k-=siz[ls[p]]+1, p=rs[p];
			else return val[p];
		}
	}
	int pre(int v) {
		for (int p=rt, ans=0; ; ) {
			if (!p) return ans;
			else if (v<=val[p]) p=ls[p];
			else ans=val[p], p=rs[p];
		}
	}
	int suc(int v) {
		for (int p=rt, ans=0; ; ) {
			if (!p) return ans;
			else if (v>=val[p]) p=rs[p];
			else ans=val[p], p=ls[p];
		}
	}
	int rnk(int v) {
		int x=0, y=0, ans=0;
		spl(rt, v-1, x, y), ans=siz[x]+1, rt=mer(x, y);
		return ans;
	}
}

signed main() {
	n=read();
	for (int i=1; i<=n; ++i) {
		opt=read(), x=read();
		if (opt==1) FHQ::ins(x);
		if (opt==2) FHQ::del(x);
		if (opt==3) printf("%d\n", FHQ::rnk(x));
		if (opt==4) printf("%d\n", FHQ::kth(x));
		if (opt==5) printf("%d\n", FHQ::pre(x));
		if (opt==6) printf("%d\n", FHQ::suc(x));
	}
	return 0;
}

```

---
### 总结
范浩强太强了，能想出如此巧妙的平衡树实现方法！  
FHQ Treap代码简洁，通俗易懂。虽速度最慢，但对初学选手相当友好。

FHQ Treap通过分裂与合并，完成平衡树的插入、删除和查询等操作。  
注意分裂时按什么标准去分，是 $v$，还是 $v+1$、$v-1$。  
注意递归/循环查询的终止条件。
