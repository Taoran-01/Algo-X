---
title: WordNet Linux 配置指南
date: 2024-08-23 21:05:35
categories: 
- 笔记
- 开发
tags: 
---

---
### 前言
WordNet 是普林斯顿大学开发的一个大型的英文词汇数据库，旨在帮助计算机理解自然语言。它是由普林斯顿大学的计算机科学家 $\text{George A. Miller}$ 和他的团队创建的。WordNet 主要用于自然语言处理、计算语言学以及人工智能研究。

WordNet 将英语词汇组织成一个语义网络，其中的词汇按照其意义分组，并通过各种语义关系（如同义词、反义词、上下位词等）相互连接。这种结构使得计算机能够更好地理解词汇之间的关系，进而提高其在语言处理任务中的表现。

这里是它的[官网](https://wordnet.princeton.edu/)和[技术文档](https://wordnet.princeton.edu/documentation)。

本文将以 Raspberry Pi 为例，简单介绍 WordNet 在 Linux 中的安装及使用方法。

---
### tcl/tk 安装
在终端中执行命令：
```bash
sudo apt-get install tcl-dev && sudo apt-get install tk-dev
```

---
### WordNet 安装
新建一个文件夹，后面的操作都将在文件夹中进行。

在终端中执行命令：
```bash
mkdir WordNet && cd WordNet
wget https://wordnetcode.princeton.edu/3.0/WordNet-3.0.tar.gz
tar -zxvf WordNet-3.0.tar.gz
cd WordNet-3.0
```

WordNet 项目已于2006年停止更新。在此期间，tcl 经过了一次接口更改，导致直接编译无法运行。

所以，我修改了一下源代码，以适配最新版的 tcl。  
修改的文件是 `/src/stubs.c`，源码我放在了[本网站](../../source/accessories/WordNet/stubs.c)。
```bash
wget https://algo-x.cn/source/accessories/WordNet/stubs.c
sudo mv stubs.c ./src
```

接下来，生成并执行 `make`。
```bash
./configure
make && sudo make install
```

---
### 清理文件
```bash
cd ../..
sudo rm -r WordNet
```

---
### 运行
```bash
cd /usr/local/WordNet-3.0/bin
```
在这里，你可以执行可执行文件。

以最常用的 `wn -over` 为例，输入 `./wn 单词 -over`，即可查阅单词的释义(overview)。
```
Creative@Creative:/usr/local/WordNet-3.0/bin $ ./wn test -over

Overview of noun test

The noun test has 6 senses (first 5 from tagged texts)

1. (19) trial, trial run, test, tryout -- (trying something to find out about it; "a sample for ten days free trial"; "a trial of progesterone failed to relieve the pain")
2. (7) test, mental test, mental testing, psychometric test -- (any standardized procedure for measuring sensitivity or memory or intelligence or aptitude or personality etc; "the test was standardized on a large sample of students")
3. (2) examination, exam, test -- (a set of questions or exercises evaluating skill or knowledge; "when the test was stolen the professor had to make a new set of questions")
4. (2) test, trial -- (the act of undergoing testing; "he survived the great test of battle"; "candidates must compete in a trial of skill")
5. (2) test, trial, run -- (the act of testing something; "in the experimental trials the amount of carbon was measured separately"; "he called each flip of the coin a new trial")
6. test -- (a hard outer covering as of some amoebas and sea urchins)

Overview of verb test

The verb test has 7 senses (first 3 from tagged texts)

1. (32) test, prove, try, try out, examine, essay -- (put to the test, as for its quality, or give experimental use to; "This approach has been tried with good results"; "Test this recipe")
2. (9) screen, test -- (test or examine for the presence of disease or infection; "screen the blood for the HIV virus")
3. (4) quiz, test -- (examine someone's knowledge of something; "The teacher tests us every week"; "We got quizzed on French irregular verbs")
4. test -- (show a certain characteristic when tested; "He tested positive for HIV")
5. test -- (achieve a certain score or rating on a test; "She tested high on the LSAT and was admitted to all the good law schools")
6. test -- (determine the presence or properties of (a substance))
7. test -- (undergo a test; "She doesn't test well")

```

---
### 后记
项目启动者，计算机科学家 $\text{Dr. Miller}$ 于2012年7月22日离世，享年92岁。

WordNet 的官方版本在很长一段时间里停留在2006年发布的 Linux 3.0 版本。但作为一个研究工具和资源，它仍然在学术界和自然语言处理领域中被广泛使用。

讲得较为简略，欢迎大家前往[技术文档](https://wordnet.princeton.edu/documentation)探索 WordNet 的深层用法。
