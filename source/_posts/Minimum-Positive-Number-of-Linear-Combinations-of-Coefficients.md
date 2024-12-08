---
title: 整系数线性组合的最小正数
date: 2024-07-26 20:28:28
categories: 
- 笔记
- 算法
tags: 
- SDSC 2024
---

---
### 带余除法与线性组合
带余除法得到的商和余数是一种线性组合。

$a\div b=q\dots r$，亦可记作 $a=bq+r\\r=a-bq$。  
注意到此时 $r$ 是 $a$ 与 $b$ 的一种线性组合。

---
### 线性组合
标量的线性组合为标量集合 $\{a_1,a_2,\dots,a_n\}$ 与权重集合 $\{w_1,w_2,\dots,w_n\}$ 一一对应相乘后再相加，即 $a_1w_1+a_2w_2+\dots+a_nw_n$。详见[百度百科](https://baike.baidu.com/item/%E7%BA%BF%E6%80%A7%E7%BB%84%E5%90%88/8664061)。

---
### 两个数整系数线性组合的最小正数
设两个整数为 $a,b$。求它们的整系数线性组合的最小正数，就是寻找一个正数 $c=ax+by$，其中 $x,y\in\mathbb Z$。

---
### 引理1
两个数整系数线性组合的最小整数等于它们的最大公因数，即 $c=\gcd(a,b)=d$。
#### 证明
设 $c$ 为 $a,b$ 两个数的整系数线性组合的最小整数。

设 $q=\lfloor\frac ac\rfloor$，$r=a\operatorname{mod}c$。  
此时余数 $r$ 满足 $0\le r=a-cq<c$。  
将 $c=ax+by$ 代入，得 $r=a-axq-byq=a(1-xq)+b(-yq)$，其中 $1-xq,-yq\in\mathbb Z$。  
根据线性组合的定义，$r$ 是 $a$ 与 $b$ 的**整系数线性组合**。  
因为 $c$ 为 $a,b$ 的**整系数线性组合的最小正数**，而 $0\le r<c$，所以 $r=0$。  
所以 $a=cq$，$c\mid a$。

同理可证 $c\mid b$，所以 $c\mid d=\gcd(a,b)$。

$c=ax+by$，其中 $a,b,x,y\in\mathbb Z$。  
因为 $d\mid a$，$d\mid b$，所以 $d\mid ax$，$d\mid ay$，$d\mid c=ax+ay$。

综上，$c\mid d$，$d\mid c$，可得 $d=c$ ，即两个数整系数线性组合的最小整数等于它们的最大公因数。得证。

---
### 裴蜀定理
$\forall a,b\in\mathbb Z$，$\gcd(a,b)=d$，则对于 $\forall x,y\in\mathbb Z$，$d\mid ax+by$。特别地，$\exists x,y\in\mathbb Z$，使得 $ax+by=d$。

证明：对于命题 $1$，可使用整除性质解释。对于命题 $2$，可使用引理 $1$ 证明。

---
### 参考资料
线性组合 - [百度百科](https://baike.baidu.com/item/%E7%BA%BF%E6%80%A7%E7%BB%84%E5%90%88/8664061)  
裴蜀定理 - [百度百科](https://baike.baidu.com/item/%E8%A3%B4%E8%9C%80%E5%AE%9A%E7%90%86/5186593)  
裴蜀定理 - [OI-Wiki](https://oi-wiki.org/math/number-theory/bezouts/)  
数论入门 - SDSC 2024 D1
