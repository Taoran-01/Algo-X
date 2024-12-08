---
title: 对数运算
date: 2024-08-04 21:35:50
categories: 
- 笔记
- 数学
tags: 
---

---
### 写在前面
本文适用范围为高中数学，内容较浅，仅作总结回顾使用。  
无特殊说明，下面式子的前提条件均为真数大于 $0$、底数大于 $0$ 且不等于 $1$。

与 $\text{OI}$ 不同，在数学和生活中，$\log x$ 表示 $\log_{10}x$，即以 $10$ 为底的对数。而在 $\text{OI}$ 中默认表示以 $2$ 为底的对数，请注意区分。

---
### 对数的定义
$a^n=m\Leftrightarrow\log_am=n\ (m>0,\ a>0\land a\neq 1)$。其中，$a$ 称作**底数**，$m$ 称作**真数**，$n$ 称作**对数**。

$$
\log_\text{底数}\text{真数}=\text{对数},\ \text{底数}^\text{对数}=\text{真数}
$$

由此可见，对数运算是指数运算的逆运算。

---
### 指数与对数的关系
$$
\begin{array}{c|ccc}
&m=a^n&n=log_am&\text{范围}\\\\
\hline
a&\text{底数}&\text{底数}&a>0,a\neq1\\\\
m&\text{幂}&\text{真数}&m>0\\\\
n&\text{指数}&\text{对数}&n\in\mathbb R
\end{array}
$$

---
### 举例
$2^3=8\Leftrightarrow\log_28=3$  
$3^{\frac12}=\sqrt3\Leftrightarrow\log_3\sqrt3=\frac12$

---
### 特殊值
$a^1=a\Leftrightarrow\log_aa=1\ (a>0\land a\neq1)$，即 $1$ 的对数为 $0$。  
$a^0=1\Leftrightarrow\log_a1=0\ (a>0\land a\neq1)$，即底数的对数为 $1$。

---
### 性质
#### 对数恒等式
$$
a^{\log_am}=m
$$
基于底数的定义推导而来，揭示了任何一个数($a$)都可作为另一个数($m$)的底数。
#### 废话恒等式
$$
\log_aa^m=m
$$
等价于 $a^m=a^m$。
#### 同时取对数
$$
A=B\Leftrightarrow \log_aA=\log_aB
$$
不难理解，两个相等的数对同一个数取对数，结果依然相等。

---
### 运算
#### 一、积的对数等于对数的积
$$
\log_amn=\log_am+\log_an
$$
证明如下：  
令 $M=\log_am$，$N=\log_an$，  
则 $a^M=m$，$a^N=n$，  
所以 $mn=a^M\cdot a^N=a^{M+N}$；  
同时取对数，得 $\log_amn=\log_aa^{M+N}$；  
又因为 $\log_aa^{M+N}=M+N=\log_am+\log_an$，  
所以 $\log_amn=\log_am+\log_an$，得证。
#### 二、商的对数等于对数的差
$$
\log_a\frac mn=\log_am-\log_an
$$
证明如下：  
令 $M=\log_am$，$N=\log_an$，  
则 $a^M=m$，$a^N=n$，  
所以 $\frac mn=\frac {a^M}{a^N}=a^{M-N}$；  
同时取对数，得 $\log_a\frac mn=\log_aa^{M-N}$；  
又因为 $\log_aa^{M-N}=M-N=\log_am-\log_an$，  
所以 $\log_a\frac mn=\log_am-\log_an$，得证。
#### 三、幂的对数等于对数的积
$$
\log_am^n=n\log_am
$$
证明如下：  
令 $M=\log_am$，则 $a^M=m$，  
所以 $m^n=(a^M)^n=a^{Mn}$；  
同时取对数，得 $\log_am^n=\log_aa^{Mn}$；  
又因为 $\log_aa^{Mn}=Mn=n\log_am$，  
所以 $\log_am^n=n\log_am$，得证。

---
### 特殊底的对数
对于 $a^n=m\Leftrightarrow\log_am=n$：
1. 当 $a=10$ 时，$\log_{10}m$ 称为常用对数，记作 $\lg m$；
2. 当 $a=e$ 时，$\log_em$ 称为自然对数，记作 $\ln m$。

---
### 换底公式及其推论
#### 换底公式
$$
\log_ab=\frac{\log_cb}{\log_ca}
$$

证明如下：  
令 $m=\log_ab$，则 $a^m=b$，  
同时取对数，得 $\log_ca^m=\log_cb$；  
幂指数提前，得 $m\log_ca=\log_cb$，$m=\frac{\log_cb}{\log_ca}$；  
回代，得 $\log_ab=\frac{\log_cb}{\log_ca}$。
#### 底的幂
$$
\log_{a^n}m=\frac1n\log_am
$$
证明如下：
$$
\log_{a^n}m=\frac{\ln m}{\ln a^n}=\frac{\ln m}{n\ln a}=\frac1n\log_am
$$
另外，将该式与幂的对数综合可得：
$$
\log_{a^n}b^m=\frac mn\log_ab
$$
底数的指数变为分母，在下面；真数的指数变为分子，在上面。
#### 倒数运算
$$
\log_ab\cdot\log_ba=1,\ \text{i.e.}\ \frac1{\log_ab}=\log_ba
$$
证明如下：
$$
\log_ab\cdot\log_ba=\frac{\ln b}{\ln a}\cdot\frac{\ln a}{\ln b}=1
$$
