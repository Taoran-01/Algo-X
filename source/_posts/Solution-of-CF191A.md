---
title: CF191A 题解
date: 2024-05-28 22:53:43
categories: 
- 笔记
- 算法
tags: 
---

---
### 知识前置
#### 动态规划
见之前的文章[动态规划](../Dynamic-Programming/)。这个得自己学。
#### 记忆化搜索
一种通过记录已经遍历过的状态的信息，从而避免对同一状态重复遍历的搜索实现方式。详见[OI-Wiki](https://oi-wiki.org/dp/memo/)。  
本题解题思路与该思想有关。

---
### 前言
本蒟蒻通过此题又一次完成了场切蓝题的壮举。

---
### 题目描述
一个王朝的规定如下：  
1.王朝的名字为历代帝王姓名首字母拼接而成；  
2.本代帝王姓名首字母的第一个字母必须与前代帝王姓名首字母的最后一个字母相同；  
3.初代帝王姓名首字母的第一个字母必须与末代帝王姓名首字母的最后一个字母相同。

例如，帝王$ABC$、$CBA$可以构成王朝$ABCCBA$。  
$ABC$、$ABA$不可以构成王朝，因为不能满足条件$2$。  
$ABC$、$CBC$不可以构成王朝，因为不能满足条件$3$。

现在按顺序给出若干帝王，求可能构成的最长朝代的长度是多少。

数据范围：$1\le n\le5\times10^5$，$1\le|S|\le10$。

---
### 解题思路
王朝名称可以按名字分成多部分，并且均满足条件$2$。所以一个大的王朝可以视作两个不完全合格的王朝合并而成。  
例如，$ABC$、$CBC$、$CAB$、$BBA$构成的王朝$ABCCBCCABBBA$，可视作$ABCCBC$和$CABBBA$合并形成的。

这样，我们就可以将目前可能存在的王朝碎片化存储，再拼接检查是否合格即可。

---
### 实现
建立数组`d[i][j]`，表示当前几个帝王，能构成的首字母为$i$，末字母为$j$，王朝片段的最大长度。  
对于每个新加入的名字，首字母$f$，末尾字母$b$，则有状态转移方程：
$$\begin{gather}
\text{对于任意的}0\le x\le 26\text{，若}\exists d[x][f]\text{，则}d[x][b]=\max(d[j][b],\ d[j][f]+l)\text{；}\\\\
\text{另外，}d[f][b]=max(d[f][b],\ l)\text{。}
\end{gather}$$
第一个的意思是，若存在王朝$A\rightarrow B$及新名字$B\rightarrow C$，则用最大值更新$A\rightarrow C$的答案。  
第二个的意思是，用新名字$B\rightarrow C$更新王朝片段$B\rightarrow C$。  
注意，这两个操作不能合并，否则会出现一些问题。

最后统计答案就是每一个`d[x][x]`取最大值即可，首位相同的王朝片段才可构成完整王朝。

---
### 代码
```cpp
#include <iostream>
#include <cstdio>
#include <cstring>
#include <queue>
using namespace std;
typedef long long ll;

inline ll read() {
	ll x=0, f=1; char ch=getchar();
	while (ch<'0'||ch>'9') {if (ch=='-') f=-1; ch=getchar();}
	while (ch>='0'&&ch<='9') x=(x<<1)+(x<<3)+(ch^48), ch=getchar();
	return x*f;
}

#define N 500010
#define M 12
#define K 30
int n, ans;
char s[M];
int f[N], b[N], l[N];
int d[K][K];

signed main() {
	// freopen("a.in", "r", stdin);
	n=read();
	for (int i=1; i<=n; ++i) {
		scanf("%s", s), l[i]=strlen(s);
		f[i]=s[0]-'a', b[i]=s[l[i]-1]-'a';
		for (int j=0; j<26; ++j) {
			if (d[j][f[i]]) d[j][b[i]]=max(d[j][b[i]], d[j][f[i]]+l[i]);
		}
		d[f[i]][b[i]]=max(d[f[i]][b[i]], l[i]);
		ans=max(ans, d[b[i]][b[i]]);
	}
	printf("%d\n", ans);
	return 0;
}

```

---
### 总结
本题主要考察考生对DP的敏感程度。以$26$个字母设状态，以拼接形式列出状态转移方程。

