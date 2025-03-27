---
title: JavaScript 循环双端队列
author: Taoran
sitemap: false
date: 2024-12-23 18:08:36
categories: 
- 笔记
- 开发
tags: 
- 开源项目
---

基于内存预装载的循环双端队列，部署在 Node.js 环境。

[Github Repo](https://github.com/Taoran-01/JS-Circular-Deque) | [npm package](https://www.npmjs.com/package/circular-deque)
Language: [en](https://github.com/Taoran-01/JS-Circular-Deque) | [zh-cn](./)  
License: [MIT license](https://github.com/Taoran-01/JS-Circular-Deque?tab=MIT-1-ov-file)

---
### 原理
将队列以循环方式存储，维护队首及队尾指针。

队列空间不足时，将空间装载到原来的 $1.75$ 倍，并拷贝队列。

---
### 使用方法
#### 安装和导入模块
``` bash
npm install circular-deque
```
``` javascript
const deque = require('circular-deque');
```
#### 创建对象 | `constructor()`
``` javascript
const t = new deque();   // #1
const t = new deque(10); // #2
```
方法 #1：不预分配长度。  
方法 #2：根据程序需要预分配 $\text{length}$ 的长度。
#### 获取队首/队尾元素 | `front()` & `back()`
``` javascript
let x = t.front();
let x = t.back();
```
时间复杂度：$O(1)$。
#### 从队首/队尾插入元素 | `push_front()` & `push_back()`
```javascript
t.push_front(x);
t.push_back(x);
```
时间复杂度：大多数 $O(1)$，最坏 $O(\text{length})$ (需要扩展长度时)。
#### 从队首/队尾弹出元素 `pop_front()` & `pop_back()`
```javascript
t.pop_front();
t.pop_back();
```
时间复杂度：$O(1)$。

---
### 函数别名
```
push_back  <= enqueue | push | pushBack
pop_front  <= dequeue | pop | popFront
pop_back   <= popBack
push_front <= pushFront
```

---
### 往期版本
#### `v0.9.0`
1. [x] 添加 `README` 文档。
2. [x] 优化 `pop` 操作，减小空间开销。

---
### 开发计划
1. [ ] 根据数据结构性能表现，优化参数。
2. [ ] 检查内存泄漏。
