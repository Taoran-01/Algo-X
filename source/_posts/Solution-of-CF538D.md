---
title: CF538D 题解
date: 2024-10-13 14:34:47
categories: 
- 笔记
- 算法
tags: 
---

---
### 题目描述
[CF538D](https://codeforces.com/contest/538/problem/D) Weird Chess | [洛谷](https://www.luogu.com.cn/problem/CF538D)

题目较复杂，完整翻译在[这里](https://www.luogu.com.cn/paste/au6y406i)。

给定一个 $n\times n$ 的棋盘，其中 $1\le n\le50$。棋盘上有一些棋子。已知棋盘上每个空位是否被攻击。现在要求你还原棋子的移动规则，或判断是否有误。

---
### 解题思路
这里很多人会绕进一个坑，就是我们根本不知道某个棋子会按哪种方式走哪几步。  
观察题目，我们只需要找出**某一种**移动方式并输出即可。不妨让所有棋子一步到位，走一步完成现有棋局情况。正确性稍后证明。

再次观察题目，注意到**棋子只有一种**，即棋盘上出现的所有棋子都需要满足同一种移动规律。这也就意味着，对于棋盘上的所有棋子，可以移动到的位置是交起来的，而不可移动到的位置是并起来的。  
也就是说，与其判断某个棋子可以攻击哪里，不如判断它不能攻击哪里。既然一些位置不能被攻击，那棋子在这个方向上一定是不可行的。我们只需要将不可行的全部排除，再检查可行范围是否矛盾即可。

观察数据范围，$n\le 50$，考虑 $O(n^4)$ 暴力。  
遍历每个棋子和每个空位，将棋子在空位方向上的移动规则标记为不可移动，剩下全部标记为可移动。这样构造出来的移动规则就是可能的答案。  
最后按照这个移动方案，检查所有应受攻击位置是否能受到攻击即可。

---
### 正确性证明
我们按照上面的方式生成移动规则，生成的位置一定是满的 (即下文所述“最大化”)。这也就意味着，在一步范围之内，所有可能被攻击的位置一定都能攻击。

接下来我们考虑这样一个问题：为什么走一步不能走出来的棋局，走多步也不可能走出来。

由于攻击范围是 $2n-1\times2n-1$ 的，一个棋子在整个棋局内的目标的行为都是确定的。由于生成的规则是满的，有解情况下，两步棋能到的一步棋都可以到。

---
### 无解情况
我们所选择的移动集是**最大化**的，这意味着如果再添加其他的移动，将会导致棋盘不再正确。

我们让所有棋子执行所有剩下的、未被标记为不可能的移动，并重新创建与原始相同位置的棋盘。
1. 如果某个格子在初始状态下没有被攻击，那么在新生成的棋盘中它也不会被攻击；
2. 某些之前被攻击的格子在新棋盘中未被攻击，那么原棋盘就不能构成任何合法的移动方式，因为移动集已最大化，添加一个新的攻击方向会导致其它棋子出现问题。

---
### 算法步骤
设原棋盘为 $n\times n$ 的矩阵 $A$，转移规律为 $2n-1\times2n-1$ 的矩阵 $D$。  
$0$ 表示 `.`，不可移动到/不可被攻击；$1$ 表示 `x`，可以移动到/可以被攻击；$2$ 表示 `o`，棋子所在位置。

1. 将每一种移动标记为可能，$D_{x,y}=1$。
2. 对每一个棋子 $(X_i,Y_i)$ 和每一个不可被攻击的位置 $(x_j,y_j)$，可以得到棋子不具有移动规律 $\begin{cases}X_i\leftarrow X_i+(x_j-X_i)\\Y_i\leftarrow Y_i+(y_j-Y_i)\end{cases}$。所以转移矩阵中 $D_{x_j-X_i,y_j-Y_i}=0$。
3. $D_{n,n}\leftarrow2$，表示移动规则的中心位置是自身棋子。
4. 根据移动规则还原棋局 $T$：$\forall A_{x,y}=2,\ D_{i,j}=1,\ x+i,y+j\in[1,n],\ T_{x+i,y+j}\leftarrow1$。  
   如果对于任意位置，原棋局中的受攻击情况与还原棋局不同，则说明无解。

---
### 代码实现
[AC](https://codeforces.com/contest/538/submission/285477853) 1.21MB 77ms
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

#define N 110
int n;
int a[N][N], d[N][N], t[N][N];

signed main() {
	// freopen("CF538D_1.in", "r", stdin);
	// freopen("CF538D_1.out", "w", stdout);
	n=read();
	for (int i=1; i<=n; ++i) for (int j=1; j<=n; ++j) {
		char ch=getchar(); while (ch!='x'&&ch!='o'&&ch!='.') ch=getchar();
		if (ch=='.') a[i][j]=0; if (ch=='x') a[i][j]=1; if (ch=='o') a[i][j]=2;
	}
	for (int i=1; i<=n*2-1; ++i) for (int j=1; j<=n*2-1; ++j) d[i][j]=1;
	for (int i=1; i<=n; ++i) for (int j=1; j<=n; ++j) if (a[i][j]==2) {
		for (int x=1; x<=n; ++x) for (int y=1; y<=n; ++y) {
			if (a[x][y]==0) d[x-i+n][y-j+n]=0;
		}
	}
	for (int i=1; i<=n; ++i) for (int j=1; j<=n; ++j) if (a[i][j]==2) {
		for (int x=1; x<=n*2-1; ++x) for (int y=1; y<=n*2-1; ++y) if (d[x][y]) {
			int x1=i+x-n, y1=j+y-n;
			if (x1>=1&&x1<=n&&y1>=1&&y1<=n) t[x1][y1]=1;
		}
	}
	bool flag=1;
	for (int i=1; i<=n; ++i) for (int j=1; j<=n; ++j) if (a[i][j]!=2) {
		flag&=(a[i][j]==1)==(t[i][j]==1);
	}
	d[n][n]=2;
	if (!flag) return puts("NO"), 0;
	puts("YES");
	for (int i=1; i<=2*n-1; ++i) {
		for (int j=1; j<=2*n-1; ++j) {
			putchar(".xo"[d[i][j]]);
		} puts("");
	}
	return 0;
}

```

---
### 总结
本体难点：理解“最大化”移动规则的创建方式和特殊性质。
