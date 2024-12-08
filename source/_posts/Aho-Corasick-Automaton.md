---
title: AC自动机
date: 2024-04-18 22:25:29
categories: 
- 笔记
- 算法
tags: 
---

---
### 知识前置
#### DFA
请看上一篇文章[有限状态自动机](../Deterministic-Finite-Automaton/)，或前往[OI-Wiki](https://oi-wiki.org/string/automaton/)。
#### Trie
请看上上篇文章[Trie](../Trie/)，或前往[OI-Wiki](https://oi-wiki.org/string/trie/)。
#### KMP算法
一个在字符串中查找子串的算法，只能有单一模式串。  
可以尝试理解[破碎的笔记](https://www.luogu.com.cn/paste/95m0ojqm)，或前往[OI-Wiki](https://oi-wiki.org/string/kmp/)。

---
### 写在前面
OI-Wiki上的AC自动机讲解得十分全面，还有动图，建议去看一下。

---
### 算法定义
AC自动机，全称Aho-Corasick Automaton，可用于统计和排序大量的字符串，解决多模式串匹配问题。  
在文本串$S$中查找模式串$T_1,\ T_2,\ \cdots,\ T_n$各自出现的个数。  
构造时间复杂度$O(\sum|T_i|)$，匹配时间复杂度最快$O(|S|+N)$，空间复杂度$O(K\times\sum|T_i|)$。其中$N$表示AC自动机节点数，$K$表示字符种类数。

---
### 使用条件
对空间要求宽，有多模式串和单一文本串，要求线性时间复杂度。

---
### 算法原理
通过不断跳转$fail$指针，在字典树上完成对多个模式串的匹配。  
借助$fail$，AC自动机可以不遗漏任何一个模式串；并且有最小的时间复杂度，不重复读取。  
跑到标记节点记录编号，最终得到模式串的访问情况。

---
### 最朴素的算法实现
算法分为构造Trie、构造失配指针和模式匹配三步。
#### 构造Trie
这个不必多说，正常的Trie树构造。  
从根节点向下找，没有就构造新节点。
#### 构造失配指针
失配指针是在失配的时候用于跳转的指针，存储当前状态的最长后缀。这样在一个模式串失配时，自动机能立刻跳转到下一个可能匹配上的模式串。
##### 最长后缀
举个OI-Wiki上的例子，对于模式串`i`，`he`，`his`，`she`，`hers`的$fail$指针构造：
<img src="https://oi-wiki.org/string/images/ac-automaton4.png" alt="26-01" style="zoom:75%;" />  
以节点$6$为例：  
<img src="https://oi-wiki.org/string/images/ac-automaton1.png" alt="26-02" style="zoom:75%;" />  
假设文本串为`hishe`，在自动机上跑到节点$6$后，下一个字符是`h`，但字典树上没有连接节点，此时发生失配。  
`his`有两个非空后缀，按长度排序分别为`is`和`s`。从根节点开始，字典树上没有字符串`is`，但有`s`，所以自动机沿`fail[6]`跳转到节点$7$，这里有`his`的最长后缀`s`。  
读入下一个字符`h`，节点$7$有`h`的边，继续运行。

与KMP中的$next$指针类似，$fail$指针也是一个不断跳的过程。  
跳最长后缀是因为可能匹配上，如果匹配不上还可以再跳最长后缀，避免模式串的遗漏。  
如果字典树上没有后缀，`fail[i]`指向根节点$0$，代表这个字符没有再能匹配得上的。
##### 构建方式
对于字典树上的节点$u$构建`fail[u]`，父节点$p$，边$p\xrightarrow{c}u$，即`trie[fail[p]][c]`。假设小于$u$的深度的边都已求得。  
失配指针的构建分为以下几种情况：  
1.若`trie[fail[p]][c]`存在，则令`fail[u]=trie[fail[p]][c]`。表示当字典树有$fail_p\xrightarrow{c}fail_u$结构时，$u$的最长后缀就是父节点$p$的最长后缀加上字符$c$。  
2.若`trie[fail[p]][c]`不存在，则按照“1”的方法继续判断`trie[fail[fail[p]]]`的存在性。  
3.如果跳到根节点都没有，说明$trie$上的字符串$u$没有树上后缀，失配就得重新开始匹配，`fail[u]=根节点`。  
特别地，`fail[p]`指向根节点与存在`trie[fail[p]][c]`不矛盾，表示$p$没有最长后缀，而$u$的最长后缀是最后一个字符。

实际情况中，小于当前节点深度的节点的$fail$并未全部求得，此时需要BFS依次将子节点加入队列求$fail$指针。  
另外建字典图，避免跳$fail$，直接指向失配节点。  
这地方我也讲不明白，请前往[OI-Wiki](https://oi-wiki.org/string/ac-automaton/#%E5%AD%97%E5%85%B8%E6%A0%91%E4%B8%8E%E5%AD%97%E5%85%B8%E5%9B%BE)自行学习。
#### 模式匹配
从文本串最开头、$trie$根节点开始，按照$trie$的边走，走不通就按照$fail$指针跳转。  
走到被标记的$trie$节点时，`++vis`，代表一个模式串成功匹配完毕，跳转$fail$继续匹配。  
这里借助`query()`函数实现。

---
### 算法优化
注意到建图时每次都要跳$fail$指针，所以可以统计入读，查询是给`ans`打标计再使用拓扑排序求出答案。  
结合代码理解一下。

---
### 代码实现
例题 [洛谷P5357](https://www.luogu.com.cn/problem/P5357) AC自动机模板二次加强版
```cpp
#include <cmath>
#include <ctime>
#include <queue>
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

void getstr(char* s, int &len) {
	for (int pt=1; s[pt]; ++pt) s[pt]=0;
	char ch=getchar(); len=0;
	while (ch<'a'||ch>'z') ch=getchar();
	while (ch>='a'&&ch<='z') s[++len]=ch, ch=getchar();
}

#define N 8000010
#define c s[i]-'a'
#define v trie[u].son[i]
#define Fail trie[u].fail
int m, len, cnt;
int vis[N], rev[N], indeg[N];
char s[N];
queue<int> q;

struct trie_node {
	int son[30], fail, exist, ans;
} trie[N];

void insert(int num) {
	int u=1;
	for (int i=0; i<len; ++i) {
		if (!trie[u].son[c]) trie[u].son[c]=++cnt;
		u=trie[u].son[c];
	}
	if (!trie[u].exist) trie[u].exist=num;
	rev[num]=trie[u].exist;
	return;
}

void getfail() {
	for (int i=0; i<26; ++i) trie[0].son[i]=1;
	q.push(1), trie[1].fail=0;
	while (!q.empty()) {
		int u=q.front(); q.pop();
		for (int i=0; i<26; ++i) {
			if (!v) {v=trie[Fail].son[i]; continue;}
			trie[v].fail=trie[Fail].son[i];
			++indeg[trie[Fail].son[i]];
			q.push(v);
		}
	}
}

void topo() {
	for (int i=1; i<=cnt; ++i) {
		if (!indeg[i]) q.push(i);
	}
	while (!q.empty()) {
		int u=q.front(); q.pop();
		vis[trie[u].exist]=trie[u].ans;
		trie[Fail].ans+=trie[u].ans;
		if (!(--indeg[Fail])) q.push(Fail);
	}
}

void query() {
	int u=1;
	for (int i=0; i<len; ++i) {
		u=trie[u].son[c], ++trie[u].ans;
	}
}

int main() {
	m=read(), cnt=1;
	for (int i=1; i<=m; ++i) getstr(s-1, len), insert(i);
	getfail(), getstr(s-1, len), query(), topo();
	for (int i=1; i<=m; ++i) printf("%d\n", vis[rev[i]]);
	return 0;
}

```
