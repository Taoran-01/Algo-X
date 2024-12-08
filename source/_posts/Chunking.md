---
title: 分块思想
date: 2024-07-11 20:48:33
cateogries: 
- 笔记
- 算法
tags: 
---

---
### 分块的基本思想
解决序列问题。  
通过对原数据进行适当划分，再对操作分成整块和零块，从而通过一般的暴力算法取得较优秀的时间复杂度。

本文将针对分块思想的三种经典应用场景，简要说明分块的一般形式，以及如何具体运用。

---
### 分块的基本性质
分块的时间复杂度和空间复杂度都不及线段树优秀，但能处理许多线段树无法处理的区间问题。  
它的时空复杂度与分的块长密切相关，所以需要针对特定题目做出合适的块长选择。

---
### 区间和
[洛谷P3372](https://www.luogu.com.cn/problem/P3372) 线段树 1
#### 题目描述
维护数列，支持以下操作：  
1.区间 $[l,r]$ 全部加 $k$；  
2.求区间 $[l,r]$ 的和。
#### 数据分块
我们将数列 $\{a_n\}$ 按每 $s$ 个元素分一个块，那么它看起来是这样的：  
$\{a_n\}=\underline{a_1,a_2,a_3,\dots,a_s},\underline{a_{s+1},a_{s+2},\dots,a_{2s}},\dots,\underline{a_{n-?},\dots,a_{n-1},a_{n}}$  
这样，原数据就被分为了 $\lceil\frac n s\rceil$ 块。

不难发现，受 $n$ 的限制，最后一块往往不是整块。

针对区间加/查询操作，设 $sum_i$ 为第 $i$ 块的和；$add_i$ 为第 $i$ 块的懒标记，表示这一块额外加了多少(类似线段树中的LazyTag)。  
对整块的懒标记 $add_i$ 不计入 $sum_i$ 中。
#### 预处理
将 $a_i$ 读入，预处理出 $sum_i$，将 $add_i$ 赋值为 $0$。  
设 $t$ 为总块数，则 $t=\lceil\frac ns\rceil$。  
设 $bel_i$ 为 $a_i$ 所处的块，则 $bel_i=\lfloor\frac{n-1}s\rfloor+1$。  
设 $st_i$ 为第 $i$ 个块的起始位置(含)，则 $st_i=(i-1)\times s+1$。  
设 $ed_i$ 为第 $i$ 个块的结束位置(含)，则 $ed_i=i\times s$。

这样，第 $i$ 个数属于第 $bel_i$ 块，第 $i$ 个块对应数列下标 $[st_i,ed_i]$。
#### 修改操作
操作：区间 $[l,r]$ 所有数加 $k$。  
为表示方便和代码简洁，设 $pl=bel_l$，$pr=bel_r$。

当 $l$ 与 $r$ 在同一块内，即 $pl=pr$ 时，直接暴力处理。  
遍历 $i\in[l,r]$，$a_i\leftarrow a_i+k$。

当 $l$ 与 $r$ 不在同一块内，即 $pl\neq pr$ 时，为充分发挥分块的优势，整块的应整块处理，零散的单独处理。  
针对整块，其序号区间为 $[pl+1,pr-1]$ (因为 $pl$ 和 $pr$ 都是散块)。遍历 $i\in[pl+1,pr-1]$，$add_i\leftarrow add_i+k$。  
针对散块，其对应数列下标为 $[l,ed_{pl}]\cup[st_{pr},r]$。遍历 $i\in[l,ed_{pl}]\cup[st_{pr},r]$，$a_i\leftarrow a_i+k$，$sum_i\leftarrow sum_i+k$。
#### 查询操作
操作：查询区间 $[l,r]$ 所有树的和。  
为表示方便和代码简洁，设 $pl=bel_l$，$pr=bel_r$。

当 $l$ 与 $r$ 在同一块内，即 $pl=pr$ 时，直接暴力处理。  
遍历 $i\in[l,r]$，$ans\leftarrow ans+a_i$。

当 $l$ 与 $r$ 不在同一块内，即 $pl\neq pr$ 时，整块零散分别处理。  
针对整块，其序号区间为 $[pl+1,pr-1]$ (因为 $pl$ 和 $pr$ 都是散块)。遍历 $i\in[pl+1,pr-1]$，$ans\leftarrow ans+sum_i$，$ans\leftarrow ans+add_i\times (ed_i-st_i+1)$。(这里不直接用块长是防止缺的块，虽然确实不可能对短块进行这个操作，但还是这样计算比较好。)  
针对散块，其对应数列下标为 $[l,ed_{pl}]\cup[st_{pr},r]$。遍历 $i\in[l,ed_{pl}]\cup[st_{pr},r]$，$ans\leftarrow ans+k$，$ans\leftarrow ans+add_{pl/pr}$。
#### 小优化
注意到零散数据中，修改时的 $sum$ 每次都加了 $k$，查询时的 $add$ 每次都需要加。直接乘起来一起加即可，具体实现见代码。
#### 确定块长
时间复杂度 $O(\frac ns+s)$，由均值不等式得 $s=\sqrt n$ 时最优。
#### 代码
[AC](https://www.luogu.com.cn/record/164148062) 4.66MB 143ms (比我的线段树快了23ms)
```cpp
#define N 100010
ll n;
ll buildSource[N];

template <typename T> struct chunking_summation {
	ll block, t;
	ll st[N], ed[N], pos[N];
	T a[N], sum[N], add[N];
	void build() {
		block=sqrt(n), t=n/block; if (n%block) ++t;
		for (ll i=1; i<=t; ++i) st[i]=(i-1)*block+1, ed[i]=i*block; ed[t]=n;
		for (ll i=1; i<=n; ++i) pos[i]=(i-1)/block+1, a[i]=buildSource[i];
		for (ll i=1; i<=t; ++i) for (ll j=st[i]; j<=ed[i]; ++j) sum[i]+=a[j];
	}
	void modify(ll l, ll r, T k) {
		ll pl=pos[l], pr=pos[r];
		if (pl==pr) {
			for (ll i=l; i<=r; ++i) a[i]+=k;
			sum[pl]+=k*(r-l+1); return;
		}
		for (ll i=pl+1; i<=pr-1; ++i) add[i]+=k;
		for (ll i=l; i<=ed[pl]; ++i) a[i]+=k; sum[pl]+=k*(ed[pl]-l+1);
		for (ll i=st[pr]; i<=r; ++i) a[i]+=k; sum[pr]+=k*(r-st[pr]+1);
	}
	T query(ll l, ll r) {
		ll pl=pos[l], pr=pos[r]; T ans=0;
		if (pl==pr) {
			for (ll i=l; i<=r; ++i) ans+=a[i];
			ans+=add[pl]*(r-l+1); return ans;
		}
		for (ll i=pl+1; i<=pr-1; ++i) ans+=sum[i]+add[i]*(ed[i]-st[i]+1);
		for (ll i=l; i<=ed[pl]; ++i) ans+=a[i]; ans+=add[pl]*(ed[pl]-l+1);
		for (ll i=st[pr]; i<=r; ++i) ans+=a[i]; ans+=add[pr]*(r-st[pr]+1);
		return ans;
	}
};

```

---
### 区间排名
[洛谷P2801](https://www.luogu.com.cn/problem/P2801) 教主的魔法
#### 题目描述
维护序列，支持以下操作：  
1.区间 $[l,r]$ 整体加 $k$；  
2.求区间 $[l,r]$ 由多少数大于等于 $k$。
#### 分析
维护另一个块内单调不降序列 $b_i$。  
修改后重新排序，保持单调性；查询时整块区间二分查找 $k$ 的位置，后面的就都是合法的。
#### 数据分块
区别于“区间和”，不需要维护 $sum$，需要对每个区间维护排序数组 $b_i$，确保 $b_i$ 单调不降。
#### 预处理
每个区间内的 $b_i$ 排序，其余同上。
#### 修改操作
修改后每个区间内的 $b_i$ 排序，其余同上。
#### 查询操作
对于整块，二分查找 $k$ 的位置，根据单调性确定符合要求的数的数量；针对散数，暴力遍历，统计大于等于 $k$ 的数。其余同上。
#### 代码
[AC](https://www.luogu.com.cn/record/164168788) 38.92MB 415ms
```cpp
#define N 1000010
ll n;
ll buildSource[N];

template <typename T> struct chunking_ranking {
	ll block, t;
	ll st[N], ed[N], pos[N];
	T a[N], b[N], add[N];
	void build() {
		block=sqrt(n), t=n/block; if (n%block) ++t;
		for (ll i=1; i<=t; ++i) st[i]=(i-1)*block+1, ed[i]=i*block; ed[t]=n;
		for (ll i=1; i<=n; ++i) pos[i]=(i-1)/block+1, a[i]=b[i]=buildSource[i];
		for (ll i=1; i<=t; ++i) sort(b+st[i], b+ed[i]+1);
	}
	void reset(ll p) {
		for (ll i=st[p]; i<=ed[p]; ++i) b[i]=a[i]; sort(b+st[p], b+ed[p]+1);
	}
	ll find(ll p, T k) {
		ll l=st[p], r=ed[p], mid=0;
		while (l<=r) mid=l+r>>1, (b[mid]>=k)?r=mid-1:l=mid+1; return ed[p]-l+1;
	}
	void modify(ll l, ll r, T k) {
		ll pl=pos[l], pr=pos[r];
		if (pl==pr) {for (ll i=l; i<=r; ++i) a[i]+=k; reset(pl); return;}
		for (ll i=pl+1; i<=pr-1; ++i) add[i]+=k;
		for (ll i=l; i<=ed[pl]; ++i) a[i]+=k; reset(pl);
		for (ll i=st[pr]; i<=r; ++i) a[i]+=k; reset(pr);
	}
	ll query(ll l, ll r, T k) {
		ll pl=pos[l], pr=pos[r], ans=0;
		if (pl==pr) {
			for (ll i=l; i<=r; ++i) if (a[i]+add[pl]>=k) ++ans;
			return ans;
		}
		for (ll i=pl+1; i<=pr-1; ++i) ans+=find(i, k-add[i]);
		for (ll i=l; i<=ed[pl]; ++i) if (a[i]+add[pl]>=k) ++ans;
		for (ll i=st[pr]; i<=r; ++i) if (a[i]+add[pr]>=k) ++ans;
		return ans;
	}
};

```

---
### 分块哈希
[HDU4391](https://acm.hdu.edu.cn/showproblem.php?pid=4391) Paint The Wall
#### 题目描述
维护一个序列，支持以下操作：
1.区间 $[l,r]$ 全部变为 $k$；
2.查询区间 $[l,r]$ 有多少值为 $k$。
#### 分析
对每个块开一个map $mp$ 记录出现次数，$tag$ 表示全部设为多少。
#### 预处理
$mp$ 清空，$tag\leftarrow -1$。
#### 修改操作
对于整块，$tag\leftarrow k$；对于散块，暴力修改 $map$ 即可。
#### 更新操作
将 $tag$ 清空并将数据转移到 $mp$ 上，用于每次散块操作前。
#### 查询操作
对于整块，判断是否有 $tag$，若有按全覆盖算，若无则统计 $mp$；对于散块，循环枚举统计即可。
#### 确定块长
由于使用了map，块长应为 $\sqrt{n\log n}$，但是我这里用了 $\sqrt n$。
#### 代码
[AC](https://acm.hdu.edu.cn/viewcode.php?rid=39418125) 19.21MB 3775ms [Another Link](https://vjudge.net/solution/52351917/zYyyz9BeEubG7leSMxzF)
```cpp
#define N 200010
ll n;
ll buildSource[N];

template <typename T> struct chunking_hashing {
	ll block, t, st[N], ed[N], pos[N];
	T a[N], tag[N]; map<T, ll> mp[N];
	void build() {
		block=sqrt(n), t=n/block; if (n%block) ++t;
		for (ll i=1; i<=t; ++i) st[i]=(i-1)*block+1, ed[i]=min(n,i*block);
		for (ll i=1; i<=n; ++i) pos[i]=(i-1)/block+1, a[i]=buildSource[i];
		for (ll i=1; i<=t; ++i) mp[i].clear(), tag[i]=-1;
		for (ll i=1; i<=n; ++i) mp[pos[i]][a[i]]++;
	}
	void push_down(ll p) {
		if (!~tag[p]) return; for (ll i=st[p]; i<=ed[p]; ++i) a[i]=tag[p];
		mp[p].clear(), mp[p][tag[p]]=ed[p]-st[p]+1, tag[p]=-1; return;
	}
	void modify(ll l, ll r, T k) {
		ll pl=pos[l], pr=pos[r]; push_down(pl), push_down(pr);
		if (pl==pr) {
			for (ll i=l; i<=r; ++i) --mp[pl][a[i]], a[i]=k, ++mp[pl][a[i]];
			return;
		}
		for (ll i=pl+1; i<=pr-1; ++i) tag[i]=k;
		for (ll i=l; i<=ed[pl]; ++i) --mp[pl][a[i]], a[i]=k, ++mp[pl][a[i]];
		for (ll i=st[pr]; i<=r; ++i) --mp[pr][a[i]], a[i]=k, ++mp[pr][a[i]];
	}
	ll query(ll l, ll r, T k) {
		ll pl=pos[l], pr=pos[r], ans=0; push_down(pl), push_down(pr);
		if (pl==pr) {for (ll i=l; i<=r; ++i) ans+=a[i]==k; return ans;}
		for (ll i=pl+1; i<=pr-1; ++i) {
			if (~tag[i]) {if (tag[i]==k) ans+=ed[i]-st[i]+1;}
			else {if (mp[i].count(k)) ans+=mp[i][k];}
		}
		for (ll i=l; i<=ed[pl]; ++i) ans+=a[i]==k;
		for (ll i=st[pr]; i<=r; ++i) ans+=a[i]==k;
		return ans;
	}
};

```

---
### 总结
分块是一种思想，不同的题目有不同的做法，具体情况具体分析。  
分块强调整块的统一处理，算法设计十分重要。

块长直接决定了时间复杂度，合理选择块长能做到更短的时间。  
有的题会卡分块，这时块长可以改 $\sqrt n\pm1$、$\sqrt{\frac n{\lg n}}$ 或常数 $\sqrt N$。
