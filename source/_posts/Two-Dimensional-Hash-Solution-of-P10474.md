---
title: 二维哈希 - 洛谷P10474 题解
date: 2024-07-28 09:12:11
categories: 
- 笔记
- 算法
tags: 
- SDSC 2024
---

---
### 知识前置
#### 哈希
一种映射，从大值域到小值域。本文中的哈希均指字符串哈希，即将数列 $\{a_n\}$ 视作 $p$ 进制数后对 $M$ 取模的结果，即 $H(a)=(\sum\limits_{i=1}^na_i\times p^{n-i})\operatorname{mod}M$。其中，$p$ 称为底，$M$ 称为模数。有以下性质：
1. 当在数列 $\{a_n\}$ 的末尾插入数 $d$ 时，数列 $\{a_{n+1}\}$ 的哈希值 $H(a+d)=(H(a)\times p+d)\operatorname{mod} M$。
2. 已知数列 $\{c_{n+m}\}$ 的哈希值为 $H(c)$，数列 $\{a_n\}$ 的哈希值为 $H(a)$ ，而数列 $\{c_{n+m}\}$ 由数列 $\{a_n\}$ 和数列 $\{b_m\}$ 拼接而成，则 $H(b)=(H(c)-H(a)\times p^{m})\operatorname{mod}M$。

上述两条性质不难理解，就是 $p$ 进制数的位移运算与加减运算。

详见[OI-WIki](https://oi-wiki.org/string/hash/)中的第一种定义，或参考李煜东所著的《算法竞赛进阶指南》第75页。
#### 二维前缀和
二维哈希参考了二维前缀和的思想，使得哈希值可以 $O(1)$ 地从角落哈希值求出。

设 $Sum_{x_1,y_1,x_2,y_2}=\sum\limits_{i=x_1}^{x_2}\sum\limits_{j=y_1}^{y_2}a_{i,j}$，$S_{x,y}=Sum_{1,1,x,y}=\sum\limits_{i=1}^x\sum\limits_{j=1}^ya_{i,j}$，则有：
$$
\begin{gathered}
S_{x,y}=a_{x,y}+S_{x-1,y}+S_{x,y-1}-S_{x-1,y-1}\\\\
Sum_{x_1,y_1,x_2,y_2}=S_{x_2,y_2}-S_{x_1-1,y_2}-S_{x_2,y_1-1}+S_{x_1-1,y_1-1}
\end{gathered}
$$
自己画个图证明下就会了，详见[OI-Wiki](https://oi-wiki.org/basic/prefix-sum/#%E4%BA%8C%E7%BB%B4%E5%A4%9A%E7%BB%B4%E5%89%8D%E7%BC%80%E5%92%8C)。

---
### 二维哈希
将一个二维矩阵映射到一个值上，即：
$$
A=\begin{bmatrix}
a_{1,1}&\cdots&a_{1,m}\\\\
\vdots&\ddots&\vdots\\\\
a_{n,1}&\cdots&a_{n,m}
\end{bmatrix}\longrightarrow H(A)\in[0,M)\cap\mathbb Z
$$

---
### 整个矩阵哈希值的获取
#### 步骤一 按行哈希
将矩阵 $A$ 按行进行哈希得到矩阵 $F$。  
即，将矩阵 $A$ 视作 $n$ 个长度为 $m$ 的一维数列。
$$
A=\begin{bmatrix}
\color{orange}a_{1,1}&\color{orange}\cdots&\color{orange}a_{1,m}\\\\
\vdots&\ddots&\vdots\\\\
a_{n,1}&\cdots&a_{n,m}
\end{bmatrix}\longrightarrow
F=\begin{bmatrix}
f_{1,1}&\cdots&\color{orange}f_{1,m}\\\\
\vdots&\ddots&\vdots\\\\
f_{n,1}&\cdots&f_{n,m}
\end{bmatrix}
$$
设底为 $p_1$，模数为 $M$，则转移公式如下：
$$
f_{x,y}=(\sum_{i=1}^ya_{x,i}\times p_1^{y-i})\operatorname{mod}M
$$
根据一维哈希的性质，将公式进行优化：
$$
f_{x,y}=(f_{x,y-1}\times p_1+a_{x,y})\operatorname{mod}M
$$
#### 步骤二 按列哈希
将矩阵 $F$ 按列进行哈希得到矩阵 $G$。  
即，将矩阵 $F$ 视作 $m$ 个长度为 $n$ 的一维数列。
$$
F=\begin{bmatrix}
\color{orange}f_{1,1}&\cdots&f_{1,m}\\\\
\color{orange}\vdots&\ddots&\vdots\\\\
\color{orange}f_{n,1}&\cdots&f_{n,m}
\end{bmatrix}\longrightarrow
G=\begin{bmatrix}
g_{1,1}&\cdots&g_{1,m}\\\\
\vdots&\ddots&\vdots\\\\
\color{orange}g_{n,1}&\cdots&g_{n,m}
\end{bmatrix}
$$
设底为 $p_2$，模数为 $M$，则转移公式如下：
$$
g_{x,y}=(\sum_{i=1}^xf_{i,y}\times p_2^{x-i})\operatorname{mod}M
$$
根据一维哈希的性质，将公式进行优化：
$$
g_{x,y}=(g_{x-1,y}\times p_2+f_{x,y})\operatorname{mod}M
$$
#### 说明
先按行和先按列都是一样的。总而言之，不管你先做什么，最终的式子代进去都是这样的：
$$
g_{x,y}=(\sum_{i=1}^x\sum_{j=1}^ya_{i,j}\times p_2^{x-i}\times p_1^{y-j})\operatorname{mod}M
$$
依据总公式，仿照前缀和，你也可以在外面循环行，在里面循环列，同时求：
$$
g_{x,y}=(a_{x,y}+g_{x-1,y}\times p_2+g_{x,y-1}\times p_1-g_{x-1,y-1}\times p_1\times p_2)\operatorname{mod}M
$$
这个公式就有一部分包含下文子矩阵的思想了。
#### 步骤三 获取哈希值
经过上面两个步骤后，矩阵 $G$ 的右下角 $g_{n,m}$ 就是矩阵 $A$ 的哈希值。

另外，如果对上面的步骤保留矩阵，$G$ 数组的值也是 $A$ 左上角子矩阵的哈希值，如图所示。
$$
A=\begin{bmatrix}
\color{orange}a_{1,1}&\color{orange}a_{1,2}&a_{1,3}&\cdots&a_{1,m}\\\\
\color{orange}a_{2,1}&\color{orange}a_{2,2}&a_{2,3}&\cdots&a_{2,m}\\\\
\color{orange}a_{3,1}&\color{orange}a_{3,2}&a_{3,3}&\cdots&a_{3,m}\\\\
a_{4,1}&a_{4,2}&a_{4,3}&\cdots&a_{4,m}\\\\
\vdots&\vdots&\vdots&\ddots&\vdots\\\\
a_{n,1}&a_{n,2}&a_{n,3}&\cdots&a_{n,m}
\end{bmatrix}\longrightarrow
G=\begin{bmatrix}
g_{1,1}&g_{1,2}&g_{1,3}&\cdots&g_{1,m}\\\\
g_{2,1}&g_{2,2}&g_{2,3}&\cdots&g_{2,m}\\\\
g_{3,1}&\color{orange}g_{3,2}&g_{3,3}&\cdots&g_{3,m}\\\\
g_{4,1}&g_{4,2}&g_{4,3}&\cdots&g_{4,m}\\\\
\vdots&\vdots&\vdots&\ddots&\vdots\\\\
g_{n,1}&g_{n,2}&g_{n,3}&\cdots&g_{n,m}
\end{bmatrix}
$$
在不发生冲突的情况下，$g_{n,m}$ 表示唯一的矩阵 $A$。可以依据哈希值判断矩阵是否相同。
#### 正确性证明
先对行进行哈希，再对列进行哈希，使得不同位置的元素有不同的权重，确保了较小的冲突概率。
#### 需要知道的风险
在将较大的矩阵处理到较小的值域上时，冲突风险会加大。请选取适当的底和模数以减小出现问题的概率。  
如果不放心，可以使用[双模数哈希](https://oi-wiki.org/string/hash/#%E9%94%99%E8%AF%AF%E7%8E%87)，或不使用二维哈希，考虑其它算法。
#### 代码实现
开 `unsigned long long` 存储，使用自然溢出的方式取模。此时模数 $M=2^{64}$。具体代码见下方例题。

---
### 子矩阵的哈希值获取
这一部分比较难以理解，建议自己算一下看看。

设行数在 $x_1$ 到 $x_2$ 之间、列数在 $y_1$ 到 $y_2$ 之间子矩阵的哈希值为 $H(x_1,y_1,x_2,y_2)$。  
根据上述步骤，我们已经知道了所有的 $H(1,1,x,y)$，其中 $x\in[1,n]$，$y\in[1,m]$。

参考一维哈希的方法，视作 $p$ 进制数。不过这里将不同列视为 $p_1$ 进制数（因为按行哈希时列转移乘了 $p_1$），将不同行视为 $p_2$ 进制数。

这样，在原矩阵的右侧添加一列空列，矩阵的哈希值 $H(A)$ 变为 $(H(A)\times p_1)\operatorname{mod}M$。  
在原矩阵的下方添加一行空行，矩阵的哈希值 $H(A)$ 变为 $(H(A)\times p_2)\operatorname{mod}M$。  
感性理解一下，证明我不会。

虽然矩阵是先对每一行哈希，再对每一列哈希，先以 $p_1$ 为底再以 $p_2$ 为底，但是最后乘上 $p_1$ 依旧是左移。就相当于原本是以第 $x$ 列做哈希，现在以第 $x-1$ 列做哈希，先后顺序不影响。
#### 结论
现在，我们需要 $O(1)$ 求解所有的 $H_(x_1,y_1,x_2,y_2)$。根据上述结论，易推得：
$$
\begin{aligned}
H(x_1&,y_1,x_2,y_2)=\\\\
&\hspace{0.4cm}(H(1,1,x_2,y_2)&\small\text{全部}\\\\
&-H(1,1,x_1-1,y_2)\times p_2^{x_2-x_1+1}&\small\text{减上方}\\\\
&-H(1,1,x_2,y_1-1)\times p_1^{y_2-y_1+1}&\small\text{减左侧}\\\\
&+H(1,1,x_1-1,y_1-1)\times p_2^{x_2-x_1+1}\times p_1^{y_2-y_1+1}&\small\text{加左上角}\\\\
&\hspace{0.4cm})\operatorname{mod}M\\\\
\end{aligned}
$$
画出来是这样的：
$$
\begin{bmatrix}
\color{purple}g_{1,1}&\color{purple}\cdots&\color{purple}g_{1,x_1-1}&\color{red}g_{1,x_1}&\color{red}\cdots&\color{red}g_{1,x_2}&\color{darkgrey}\cdots&\color{darkgrey}g_{1,m}\\\\
\color{purple}\vdots&\color{purple}\ddots&\color{purple}\vdots&\color{red}\vdots&\color{red}\ddots&\color{red}\vdots&\color{darkgrey}\ddots&\color{darkgrey}\vdots\\\\
\color{purple}g_{y_1-1,1}&\color{purple}\cdots&\color{purple}g_{y_1-1,x_1-1}&\color{red}g_{y_1-1,x_1}&\color{red}\cdots&\color{red}g_{y_1-1,x_2}&\color{darkgrey}\cdots&\color{darkgrey}g_{y_1-1,m}\\\\
\color{blue}g_{y_1,1}&\color{blue}\cdots&\color{blue}g_{y_1,x_1-1}&\color{green}g_{y_1,x_1}&\color{green}\cdots&\color{green}g_{y_1,x_2}&\color{darkgrey}\cdots&\color{darkgrey}g_{y_1,m}\\\\
\color{blue}\vdots&\color{blue}\ddots&\color{blue}\vdots&\color{green}\vdots&\color{green}\ddots&\color{green}\vdots&\color{darkgrey}\ddots&\color{darkgrey}\vdots\\\\
\color{blue}g_{y_2,1}&\color{blue}\cdots&\color{blue}g_{y_2,x_1-1}&\color{green}g_{y_2,x_1}&\color{green}\cdots&\color{green}g_{y_2,x_2}&\color{darkgrey}\cdots&\color{darkgrey}g_{y_2,m}\\\\
\color{darkgrey}\vdots&\color{darkgrey}\ddots&\color{darkgrey}\vdots&\color{darkgrey}\vdots&\color{darkgrey}\ddots&\color{darkgrey}\vdots&\color{darkgrey}\ddots&\color{darkgrey}\vdots\\\\
\color{darkgrey}g_{m,1}&\color{darkgrey}\cdots&\color{darkgrey}g_{m,x_1-1}&\color{darkgrey}g_{m,x_1}&\color{darkgrey}\cdots&\color{darkgrey}g_{m,x_2}&\color{darkgrey}\cdots&\color{darkgrey}g_{n,m}
\end{bmatrix}
$$
其中，绿色为目标区域，(绿色+红色+蓝色+紫色)为全部区域，(红色+紫色)为上方区域，(蓝色+紫色)为左侧区域，紫色为重复的左上角区域，灰色为无关区域。
#### 为什么要乘
此处的颜色标记与上面的不同，请注意区分。  
下面的矩阵在哈希意义下，不是普通的矩阵，详细规则见上。请将矩阵视作哈希。  
为方便理解，矩阵中的 $0$ 记作 $0_{x,y}$ 以标识位置。  
下文证明及其不严谨，仅作理解。

首先，左侧区域原本是这样的：
$$
A=\begin{bmatrix}
\color{blue}g_{1,1}&\color{blue}\cdots&\color{blue}g_{1,x_1-1}\\\\
\color{blue}\vdots&\color{blue}\ddots&\color{blue}\vdots\\\\
\color{blue}g_{y_2,1}&\color{blue}\cdots&\color{blue}g_{y_2,x_1-1}
\end{bmatrix}
$$
整体长这样：
$$
C=\begin{bmatrix}
\color{blue}g_{1,1}&\color{blue}\cdots&\color{blue}g_{1,x_1-1}&\color{green}g_{1,x_1}&\color{green}\cdots&\color{green}g_{1,x_2}\\\\
\color{blue}\vdots&\color{blue}\ddots&\color{blue}\vdots&\color{green}\vdots&\color{green}\ddots&\color{green}\vdots\\\\
\color{blue}g_{y_2,1}&\color{blue}\cdots&\color{blue}g_{y_2,x_1-1}&\color{green}g_{y_2,x_1}&\color{green}\cdots&\color{green}g_{y_2,x_2}
\end{bmatrix}
$$
我们想要得到：
$$
B=\begin{bmatrix}
\color{green}g_{1,x_1}&\color{green}\cdots&\color{green}g_{1,x_2}\\\\
\color{green}\vdots&\color{green}\ddots&\color{green}\vdots\\\\
\color{green}g_{y_2,x_1}&\color{green}\cdots&\color{green}g_{y_2,x_2}
\end{bmatrix}
$$
注意，在上文所述的哈希（视作 $p_1$、$p_2$ 进制）中，可以向上方和左侧补前导零。所以有：
$$
B=\begin{bmatrix}
\color{green}g_{1,x_1}&\color{green}\cdots&\color{green}g_{1,x_2}\\\\
\color{green}\vdots&\color{green}\ddots&\color{green}\vdots\\\\
\color{green}g_{y_2,x_1}&\color{green}\cdots&\color{green}g_{y_2,x_2}
\end{bmatrix}=\begin{bmatrix}
\color{darkgrey}0_{1,1}&\color{darkgrey}\cdots&\color{darkgrey}0_{1,x_1-1}&\color{green}g_{1,x_1}&\color{green}\cdots&\color{green}g_{1,x_2}\\\\
\color{darkgrey}\vdots&\color{darkgrey}\ddots&\color{darkgrey}\vdots&\color{green}\vdots&\color{green}\ddots&\color{green}\vdots\\\\
\color{darkgrey}0_{y_2,1}&\color{darkgrey}\cdots&\color{darkgrey}0_{y_2,x_1-1}&\color{green}g_{y_2,x_1}&\color{green}\cdots&\color{green}g_{y_2,x_2}
\end{bmatrix}
$$
但不能在下方或右侧补零，因为这样改变了哈希大小。所以：
$$
A=\begin{bmatrix}
\color{blue}g_{1,1}&\color{blue}\cdots&\color{blue}g_{1,x_1-1}\\\\
\color{blue}\vdots&\color{blue}\ddots&\color{blue}\vdots\\\\
\color{blue}g_{y_2,1}&\color{blue}\cdots&\color{blue}g_{y_2,x_1-1}
\end{bmatrix}\neq\begin{bmatrix}
\color{blue}g_{1,1}&\color{blue}\cdots&\color{blue}g_{1,x_1-1}&\color{darkgrey}0_{1,x_1}&\color{darkgrey}\cdots&\color{darkgrey}0_{1,x_2}\\\\
\color{blue}\vdots&\color{blue}\ddots&\color{blue}\vdots&\color{darkgrey}\vdots&\color{darkgrey}\ddots&\color{darkgrey}\vdots\\\\
\color{blue}g_{y_2,1}&\color{blue}\cdots&\color{blue}g_{y_2,x_1-1}&\color{darkgrey}0_{y_2,x_1}&\color{darkgrey}\cdots&\color{darkgrey}0_{y_2,x_2}
\end{bmatrix}
$$
因此，我们不能直接将 $H(C)-H(A)$ 作为目标 $H(B)$ 的答案，因为 $A$ 没有与 $C$ 对齐。  
要想对齐，就要将 $A$ 左移 $(x_2-x_1+1)$ 列，也就是在 $A$ 的右边插入 $(x_2-x_1+1)$ 个空列。按照上面的证明方式，只需将 $A$ 的哈希值乘 $p_2^{x_2-x_1+1}$ 即可。
$$
A\times p_2^{x_2-x_1+1}=
\begin{bmatrix}
\color{blue}g_{1,1}&\color{blue}\cdots&\color{blue}g_{1,x_1-1}&\color{darkgrey}0_{1,x_1}&\color{darkgrey}\cdots&\color{darkgrey}0_{1,x_2}\\\\
\color{blue}\vdots&\color{blue}\ddots&\color{blue}\vdots&\color{darkgrey}\vdots&\color{darkgrey}\ddots&\color{darkgrey}\vdots\\\\
\color{blue}g_{y_2,1}&\color{blue}\cdots&\color{blue}g_{y_2,x_1-1}&\color{darkgrey}0_{y_2,x_1}&\color{darkgrey}\cdots&\color{darkgrey}0_{y_2,x_2}
\end{bmatrix}
$$
这样，$A$ 与 $C$ 对齐后我们就可以相减得到答案。
$$
\begin{gathered}\begin{aligned}B=&\begin{bmatrix}
\color{green}g_{1,x_1}&\color{green}\cdots&\color{green}g_{1,x_2}\\\\
\color{green}\vdots&\color{green}\ddots&\color{green}\vdots\\\\
\color{green}g_{y_2,x_1}&\color{green}\cdots&\color{green}g_{y_2,x_2}
\end{bmatrix}=\begin{bmatrix}
\color{darkgrey}0_{1,1}&\color{darkgrey}\cdots&\color{darkgrey}0_{1,x_1-1}&\color{green}g_{1,x_1}&\color{green}\cdots&\color{green}g_{1,x_2}\\\\
\color{darkgrey}\vdots&\color{darkgrey}\ddots&\color{darkgrey}\vdots&\color{green}\vdots&\color{green}\ddots&\color{green}\vdots\\\\
\color{darkgrey}0_{y_2,1}&\color{darkgrey}\cdots&\color{darkgrey}0_{y_2,x_1-1}&\color{green}g_{y_2,x_1}&\color{green}\cdots&\color{green}g_{y_2,x_2}
\end{bmatrix}\\\\=&\begin{bmatrix}
\color{blue}g_{1,1}&\color{blue}\cdots&\color{blue}g_{1,x_1-1}&\color{green}g_{1,x_1}&\color{green}\cdots&\color{green}g_{1,x_2}\\\\
\color{blue}\vdots&\color{blue}\ddots&\color{blue}\vdots&\color{green}\vdots&\color{green}\ddots&\color{green}\vdots\\\\
\color{blue}g_{y_2,1}&\color{blue}\cdots&\color{blue}g_{y_2,x_1-1}&\color{green}g_{y_2,x_1}&\color{green}\cdots&\color{green}g_{y_2,x_2}
\end{bmatrix}-\begin{bmatrix}
\color{blue}g_{1,1}&\color{blue}\cdots&\color{blue}g_{1,x_1-1}&\color{darkgrey}0_{1,x_1}&\color{darkgrey}\cdots&\color{darkgrey}0_{1,x_2}\\\\
\color{blue}\vdots&\color{blue}\ddots&\color{blue}\vdots&\color{darkgrey}\vdots&\color{darkgrey}\ddots&\color{darkgrey}\vdots\\\\
\color{blue}g_{y_2,1}&\color{blue}\cdots&\color{blue}g_{y_2,x_1-1}&\color{darkgrey}0_{y_2,x_1}&\color{darkgrey}\cdots&\color{darkgrey}0_{y_2,x_2}
\end{bmatrix}\\\\=&C-A\times p_2^{x_2-x_1+1}\end{aligned}\\\\
H(B)=(H(C)-H(A)\times p_2^{x_2-x_1+1})\operatorname{mod}M\end{gathered}
$$
同样地，通过位移操作，我们可以完成上方和左上角的矩阵操作，只需要对应乘 $p_1$、$p_2$ 的幂即可。

在程序中，由于会频繁进行 $p_1$、$p_2$ 的幂运算，我们通常会预处理出它们的 $1\sim n$ 次方，并存储到 `unsigned long long` 数组中。

---
### 举例
$p_1=7$，$p_2=239$，$M=+\infty$。
$$
\begin{gathered}
A=\begin{bmatrix}
1&2&3\\\\4&5&6
\end{bmatrix},\ 
F=\begin{bmatrix}
1&9&66\\\\4&33&237
\end{bmatrix},\ 
G=\begin{bmatrix}
1&9&66\\\\
143&2184&16011
\end{bmatrix}\\\\
\text{对于子矩阵：}
A'=\begin{bmatrix}
2&3\\\\5&6
\end{bmatrix},\ 
F'=\begin{bmatrix}
2&17\\\\5&41
\end{bmatrix},\ 
G'=\begin{bmatrix}
2&17\\\\483&4104
\end{bmatrix}
\end{gathered}
$$
验证：$16011-0\times57121-243\times49=16011-11907=4104$，成立。

---
### 例题
[洛谷P10474](https://www.luogu.com.cn/problem/P10474) [BeiJing2011] Matrix 矩阵哈希  
注：为方便书写，本文将题目中的 $M$ 和 $N$ 替换为了 $n$ 和 $m$，与原题目有出入。
#### 题目描述
给出一个 $n$ 行 $m$ 列的 $01$ 矩阵，以及 $q$ 个 $A$ 行 $B$ 列的 $01$ 矩阵，你需要求出这 $q$ 个矩阵中有哪些矩阵是大矩阵的子矩阵。

数据范围：$1\le n,m\le1000$，$q=1000$。
#### 思路
先对整体取哈希，把每个大小为 $A\times B$ 的存入 `unordered_map`；然后对每个子矩阵取哈希，判断是否在 `map` 中即可。时间复杂度 $O(n^2)$。
#### 代码
[AC](https://www.luogu.com.cn/record/169139975) 49.65MB 1.08s
```cpp
#include <cmath>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <unordered_map>
using namespace std;
typedef long long ll;
typedef unsigned long long ull;

char buf[1<<20], *p1, *p2;
#define getchar() (p1==p2&&(p2=(p1=buf)+fread(buf,1,1<<20,stdin),p1==p2)?0:*p1++)

inline ll read() {
	ll x=0, f=1; char ch=getchar();
	while (ch<'0'||ch>'9') {if (ch=='-') f=-1; ch=getchar();}
	while (ch>='0'&&ch<='9') x=(x<<1)+(x<<3)+(ch^48), ch=getchar();
	return x*f;
}

#define N 1010
int n, m, A, B, q;
ull a[N][N];
unordered_map<ull, bool> mp;

namespace tdh {
	#define P1 503ULL
	#define P2 1013ULL
	int n, m;
	ull f[N][N], g[N][N];
	ull p1[N], p2[N];
	void init(ull d[N][N], int n, int m) {
		p1[0]=p2[0]=1;
		for (int i=1; i<N; ++i) p1[i]=p1[i-1]*P1, p2[i]=p2[i-1]*P2;
		for (int i=1; i<=n; ++i) for (int j=1; j<=m; ++j) {
			f[i][j]=f[i][j-1]*P1+d[i][j];
		}
		for (int j=1; j<=m; ++j) for (int i=1; i<=n; ++i) {
			g[i][j]=g[i-1][j]*P2+f[i][j];
		}
	}
	ull get(int x1, int y1, int x2, int y2) {
		return g[x2][y2]-g[x1-1][y2]*p2[x2-x1+1]-g[x2][y1-1]*p1[y2-y1+1]
		+g[x1-1][y1-1]*p1[y2-y1+1]*p2[x2-x1+1];
	}
}

signed main() {
	// freopen("a.in", "r", stdin);
	n=read(), m=read(), A=read(), B=read();
	for (int i=1; i<=n; ++i) for (int j=1; j<=m; ++j) {
		char ch=getchar(); while (ch<'0'||ch>'1') ch=getchar(); a[i][j]=ch-'0';
	}
	tdh::init(a, n, m);
	for (int i=1; i<=n-A+1; ++i) for (int j=1; j<=m-B+1; ++j) {
		mp[(int)tdh::get(i, j, i+A-1, j+B-1)]=1;
	}
	q=read();
	while (q--) {
		for (int i=1; i<=A; ++i) for (int j=1; j<=B; ++j) {
			char ch=getchar(); while (ch<'0'||ch>'1') ch=getchar(); a[i][j]=ch-'0';
		}
		tdh::init(a, A, B), printf("%d\n", mp[(int)tdh::get(1,1,A,B)]);
	}
	return 0;
}

```

---
### 写在后面
使用 $(x,y)$ 的方式表示行列真的不标准，大家不要学我（  
$p_1$ 表示行内（不同 $y$ 之间）的底，$p_2$ 表示列内（不同 $x$ 之间）的底，为方便理解可自行替换为 $p_x$、$p_y$。

这个算法很冷，学了很大概率也用不上，随缘吧。
