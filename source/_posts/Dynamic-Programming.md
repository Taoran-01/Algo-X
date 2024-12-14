---
title: 动态规划
date: 2024-03-05 05:50:41
categories: 
- 笔记
- 算法
tags: 
---

---
### 一、算法原理
将大问题拆分成子问题，对每个子问题只求一次，汇总得到整个问题的最优解。
#### 1. 最优化原理
子问题的局部最优将导致整个问题的全局最优。后面的决策必须在前面的状态的基础上构成最优策略。
#### 2. 无后效性原则
某阶段的状态一旦确定，此后过程不受此前状态的影响。下一个状态只与当前状态有关。

---
### 二、基本构成
#### 1. 阶段
阶段根据时间和空间划分，能够将问题转化为多阶段决策过程。
#### 2. 状态
某一阶段的出发位置称为状态，一个阶段包含多个状态。
#### 3. 决策
在一定范围内，将一个状态转移到下一个阶段的对应状态。所有决策构成的整体称为策略。
#### 4. 状态转移方程
描述由第$i$阶到第$i+1$阶状态的演变规律的方程。

---
### 三、常见分类
线性、区间、树形、数位等等。