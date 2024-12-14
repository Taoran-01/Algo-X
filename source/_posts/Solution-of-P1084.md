---
title: 洛谷P1084 题解
date: 2024-05-16 09:34:04
categories: 
- 笔记
- 算法
tags: 
---

---
### 知识前置
#### 倍增算法
本题用于倍增跳祖先，检查可行性。详见[OI-Wiki](https://oi-wiki.org/basic/binary-lifting/)。
#### 二分算法
满足单调性的答案求解，本题用于二分答案查找最少时间。详见[OI-Wiki](https://oi-wiki.org/basic/binary/#%E4%BA%8C%E5%88%86%E7%AD%94%E6%A1%88)。
#### 树上DFS遍历
自己学去。
#### 贪心算法
本题中用于匹配军队与子树。详见[OI-Wiki](https://oi-wiki.org/basic/greedy/)。

---
### 题目描述
更详细的描述，请前往[洛谷](https://www.luogu.com.cn/problem/P1084)查看。

树上根节点$1$爆发疫情，需要军队前往其它节点（不能是根节点）建立检查站，防止疫情扩散到叶子结点。  
一支军队只能建立一个检查站，行军时间为边的权值。  
军队原驻扎节点和树上距离已给出，求控制疫情所需的最小时间，若无法控制输出$-1$。

数据范围：$2\le m\le n\le5\times10^4$，$0\le w\le1\times10^9$

---
### 题目分析
#### 答案求解
注意到答案是单调的，即可行的解都连续且在一侧。  
考虑使用二分答案求解，寻找可行条件下的最小时间。  
问题转化为二分的`check()`函数，即对于给定的时长，确定疫情是否能被控制。
#### 军队移动
显然，需要控制根节点的疫情，军队应尽可能朝向根节点移动，以最小化检查点数量。

军队向根节点移动一定是百益而无一害的，因为这是一棵树。  
军队本来可以隔离的根节点，依旧在军队下方，建立检查点后可以受到隔离。  
上移过程中，还可能覆盖其它叶子结点，增加隔离范围。
#### 算法实现
由于时间已给定，可以先让军队向根节点移动，而不前往根节点。

此时军队有三种：  
1.距离根节点仅剩一条边，并且剩余时间可以前往根节点。  
2.距离根节点仅剩一条边，但是剩余时间不能前往根节点。  
3.连根节点的边都没碰到，还在路上的。  
对于第一种情况的军队，前往根节点并记录来时的子树。对于后两种情况的军队，在原地建立检查站并打上标记。

接着对每一棵子树，DFS从根节点自上而下遍历到叶子节点。如果路径上没有驻扎，标记该子树。

为这些子树分配军队，策略如下：  
1.优先选择自己子树来的且剩余时间较短的。这些军队实质上相当于上述第二种的军队，临近根节点后原地建立检查站。  
2.优先选择剩余时间较短的匹配所需时间较长的，以节省军队使用，保证正确性。  
对于上述两策略，不难发现应先对子树和军队排序，**子树按所需时间降序**，**军队按剩余时间升序**。

双指针从前向后遍历子树和军队，满足下列条件之一即可匹配：  
1.军队剩余时间可以到达子树。  
2.军队从该子树过来的。  
若匹配成功，换下一棵子树和下一支军队。若匹配失败，则换下一支军队。  
如果按照上述策略匹配，还有子树没有分配到军队，则证明给定的时长下问题无解，反之则有解。
#### 答案输出
分析得，时间大于$5\times10^5$即可认为无解。所以二分左端点$0$，右端点$5\times10^5$。  
若可行，更新答案为中间端点，右端点左移。若不可行，左端点右移。

---
### 代码实现
[AC](https://www.luogu.com.cn/record/158473671) 15.36MB 203ms
```cpp
#include <cstdio>
#include <cstring>
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

#define N 50010
#define v e[i].to
#define w e[i].val
int n, m, la, lb, t1, t2, t3;
int head[N], tot;
struct edge {int to, nxt, val;} e[N<<1]; // 树边
void add_edge(int x, int y, int z) {e[++tot]={y, head[x], z}, head[x]=tot;}
struct node {ll rst; int id; bool operator<(node x) {return rst>x.rst;}} a[N], b[N];
int f[N][18], d[N], vis1[N], vis2[N], rst[N]; // ↑军队和子树，记录所在点和时间↑
ll dis[N][18], rstmin[N], l, r, mid, ans;

void dfs1(int u, int fa, ll ra) { // 倍增
	f[u][0]=fa, dis[u][0]=ra;
	for (int i=1; i<=17; ++i) {
		f[u][i]=f[f[u][i-1]][i-1]; // 2^k祖先
		dis[u][i]=dis[u][i-1]+dis[f[u][i-1]][i-1]; // 到2^k祖先的距离
	}
	for (int i=head[u]; i; i=e[i].nxt) {
		if (v==fa) continue;
		dfs1(v, u, w);
	}
}

bool dfs2(int u, int fa) { // 检查叶子结点是否被隔离
	bool res=1, flag=0;
	if (vis1[u]) return 1; // 恰好为检查站
	for (int i=head[u]; i; i=e[i].nxt) {
		if (v==fa) continue; flag=1;
		if (dfs2(v, u)) continue; res=0;
		if (u==1) b[++lb]={w, v}; // 没有隔离的子树，记录编号和所需时间
		else return 0;
	}
	return flag&&res; // 目前是否可行
}

bool chk(ll lim) {
	int cur=1, u; ll num; la=0, lb=0;
	memset(vis1, 0, sizeof(vis1));
	memset(vis2, 0, sizeof(vis2));
	memset(rst, 0, sizeof(rst));
	for (int i=1; i<=m; ++i) {
		u=d[i], num=0;
		for (int j=17; ~j; --j) if (f[u][j]>1&&num+dis[u][j]<=lim) num+=dis[u][j], u=f[u][j];
		if (f[u][0]==1&&num+dis[u][0]<=lim) { // ←有能力去根节点的军队← ↑不断跳祖先到根节点旁边↑
			a[++la]={lim-num-dis[u][0], i};
			if (!rst[u]||a[la].rst<rstmin[u]) rstmin[u]=a[la].rst, rst[u]=i; // 记录最小时间军队
		} else vis1[u]=1; // 建立检查站
	}
	if (dfs2(1, 0)) return 1;
	sort(a+1, a+la+1), sort(b+1, b+lb+1), vis2[0]=1; // 贪心前排序
	for (int i=1; i<=lb; ++i) {
		if (!vis2[rst[b[i].id]]) {vis2[rst[b[i].id]]=1; continue;} // 自己子树来的最小剩余时间军队
		while (cur<=la&&(vis2[a[cur].id]||a[cur].rst<b[i].rst)) ++cur;
		if (cur>la) return 0; vis2[a[cur].id]=1; // 建立检查站
	}
	return 1;
}

signed main() {
	// freopen("a.in", "r", stdin);
	n=read(), r=(N<<1)+(N<<3), ans=-1;
	for (int i=1; i<n; ++i) {
		t1=read(), t2=read(), t3=read();
		add_edge(t1, t2, t3), add_edge(t2, t1, t3);
	}
	dfs1(1, 0, 0), m=read();
	for (int i=1; i<=m; ++i) d[i]=read(); // 军队节点
	while (l<=r) mid=l+r>>1, (chk(mid))?r=mid-1,ans=mid:l=mid+1; // 二分求解
	printf("%lld\n", ans); // 这里没有改答案就表示始终不可行，输出-1
	return 0;
}

```

---
### 总结
二分找答案，贪心判断可行性，倍增优化。
