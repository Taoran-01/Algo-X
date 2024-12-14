---
title: 火箭发动机工作过程中的性能参数
date: 2024-07-03 09:38:10
categories: 
- 笔记
- 物理
tags: 
- 液体火箭发动机
---

---
### 对于整个火箭发动机系统
下面这个公式适用于多火箭发动机的总参数。

$$(I_s)_{oa}=\frac{\sum F}{\sum \dot\omega}=\frac{\sum F}{g_0\sum\dot m}$$

$$\dot\omega_{oa}=\sum\dot\omega\ \text{或}\ \dot m_{oa}=\sum\dot m$$

$$\gamma_{oa}=\frac{\sum\dot\omega_0}{\sum\dot\omega_f}=\frac{\sum\dot m_0}{\sum\dot m_f}$$

下标$oa$、$o$和$f$分别表示整个发动机系统、氧化剂和燃料。  
$\dot\omega$表示流量重力，单位$N/s$。  
$\dot m$表示流量质量，单位$kg/s$。  
$\gamma_{oa}$表示表示整个系统的混合比。

---
### 总冲
整个燃烧时间$t$内推力$P$的积分，单位$N\cdot s$，即
$$I_t=\int_0^tPdt$$
总冲是火箭发动机的重要性能参数，它包括发动机推力所持续的时间，反应了综合工作能力的大小。

---
### 比冲
指燃料燃烧$1kg$推进剂所产生的冲量，单位$s$。设$m_p$为推进剂有效总质量，则平均比冲
$$I_s=\frac{I_t}{m_p}$$
对液体火箭发动机而言，比冲的含义是每秒钟消耗$1kg$质量的推进剂所产生的推力大小，即
$$I_s=\frac{I_t}{\dot m}\ \text{或}\ I_s=\frac P{\dot m}$$
比冲是火箭发动机的一个重要性能参数，它对运载火箭、航天器性能有较大影响。比冲越高，意味着在消耗相同质量的推进剂时，火箭发动机能够产生更大的推力，或者在产生相同推力的情况下消耗更少的推进剂。高比冲的发动机可以更有效地将火箭送入太空，因为它们能够更有效地转换推进剂的化学能为火箭的动能。

---
### 密度比冲
定义为单位体积推进剂流量所产生的推力，单位$s\cdot kg/m^3$，即
$$I_{s,\rho}=\frac PV=\frac P{\dot m/\rho_T}=I_s\rho_t$$
其中$\rho_T$表示推进剂密度。

---
### 推进剂混合比
定义为氧化剂流量与燃烧剂流量之比，即
$$MR=\frac{m_0}{m_f}$$
混合比直接影响燃烧室内的化学反应。一个适当的混合比可以确保燃料和氧化剂完全燃烧，从而最大化能量的释放。混合比会影响比冲的大小，一个合适的混合比可以提高比冲，从而提高火箭的有效载荷能力。

---
### 书籍参考
液体火箭发动机燃烧过程建模与数值仿真/王振国编著.—北京：国防工业出版社，2012.10  
ISBN 978-7-118-08525-9

I. ①液··· II. ①王··· III. ①液体推进剂火箭发动机—燃烧过程—建立模型②液体推进剂火箭发动机—燃烧过程—数值方法 IV ①V434

中国版本图书馆CIP数据核字（2012）第279370号