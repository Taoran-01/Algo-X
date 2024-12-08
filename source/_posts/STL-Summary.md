---
title: STL总结
date: 2024-08-16 23:10:58
categories: 
- 笔记
- 算法
tags: 
sitemap: false
---

---
### 容器
$$
\begin{array}{|c|c|c|c|c|c|}
\hline\text{容器}&\text{set}&\text{unordered_set}&\text{map}&\text{unordered_map}&\text{vector}\\\\
\hline\text{底层实现}&\text{红黑树}&\text{哈希表}&\text{红黑树}&\text{哈希表}&\text{动态数组}\\\\
\hline\text{元素顺序}&\text{有序}&\text{无序}&\text{有序}&\text{无序}&\text{插入顺序}\\\\
\hline\text{查找时间复杂度}&O(\log n)&\text{平均}O(1)\ \text{最坏}O(n)&O(\log n)&\text{平均}O(1)\ \text{最坏}O(n)&O(n)\\\\
\hline\text{插入时间复杂度}&O(\log n)&\text{平均}O(1)\ \text{最坏}O(n)&O(\log n)&\text{平均}O(1)\ \text{最坏}O(n)&\text{平均}O(1)\ \text{最坏}O(n)\\\\
\hline\text{元素唯一性}&\text{有唯一值}&\text{有唯一值}&\text{有唯一键}&\text{有唯一键}&\text{无}\\\\
\hline\text{随机访问}&\text{不支持}&\text{不支持}&\text{不支持}&\text{不支持}&\text{支持}\\\\
\hline
\end{array}
$$

---
### 迭代器
#### 定义
迭代器是一种类模板，也是一种 Smart Pointer。
#### input/output iterator | 输入/输出迭代器
只能进行读写操作，不允许外界修改。
#### forward iterator | 前向迭代器
可以进行读写操作和前进操作，类比 `std::forward_list` 记忆。

1. 声明 `std::forward_list<int>::iterator it;`
2. 赋值 `it=l.begin();`
3. 判断相等 `it!=l.end();`
4. 判断大小 (不支持)
5. 向前移动 `++it;`
6. 向后移动 (不支持)
7. 随机访问 (不支持)

`std::unordered_set` 和 `std::unordered_multiset` 都是前向迭代器，值类型为 `T`。  
`std::unordered_map` 和 `std::unordered_multimap` 都是前向迭代器，值类型为 `std::pair<const Key, T>`。
#### bidirectional iterator | 双向迭代器
可以进行读写操作和前进/后退操作，类比 `std::list` 记忆。

1. 声明 `std::list<int>::iterator it;`
2. 赋值 `it=l.begin();`
3. 判断相等 `it!=l.end()`
4. 判断大小 `it1<it2`
5. 向前移动 `++it;`
6. 向后移动 `--it;`
7. 随机访问 (不支持)

`std::set` `std::multiset` 和 `std::priority_queue` 都是双向迭代器，值类型为 `T`。  
`std::map` 和 `std::multimap` 都是双向迭代器，值类型为 `std::pair<const Key, T>`。
#### random access iterator | 随机迭代器
可以进行随机访问读写操作，类比 `std::vector` 记忆。

1. 声明 `std::vector<int>::iterator it;`
2. 赋值 `it=ve.begin();`
3. 判断相等 `it!=ve.end()`
4. 判断大小 `it1<it2`
5. 向前移动 `++it;`
6. 向后移动 `--it;`
7. 随机访问 `it=ve.begin()+5;` | `ve[5];`

`std::deque` `std::string` `std::bitset` `std::tuple` 等都是随机迭代器。

---
### 参考资料
std::set的全方位分析 - [CSDN-致守](https://blog.csdn.net/tjcwt2011/article/details/137609392)  
迭代器 - [OI-Wiki](https://oi-wiki.org/lang/csl/iterator/)  
STL六大组件之一迭代器(Iterator) - [CSDN-jiazel](https://blog.csdn.net/qq_57198230/article/details/132571158)
