---
title: Open Source Project - Blog Errata | 开源项目 - 勘误表
date: 2024-08-22 21:01:50
categories: 
- 笔记
- 开发
tags: 
---

---
### Written Ahead | 写在前面
The project presented in this article is to deploy an errata of your own in a Hexo environment. The code is based on a **Github Gist** implementation for static blog pages without a backend. Although this approach is easy to implement, **please do not use this approach if possible**. It is highly recommended that developers who are able to do so look for **open text databases** on their own, or implement this feature **on a backend**.

本文所介绍的项目是在 Hexo 环境中部署一个自己的勘误表。代码基于 **Github Gist** 实现，适用于没有后端的静态博客页面。虽然这种方式易于实现，但是**请尽可能不使用这种方式**。强烈建议有能力的开发者自行寻找**开放的文本数据库**，或**在后端上实现**这个功能。

好啦，自己人就多说几句。

这个项目是我自己开发的，翻译成英文只是为了让更多人看懂。  
还是费了很大功夫的，自己也都看过一遍了，请放心食用。

自己学的 `HTML` 和 `Javascript`，码风奇丑，请见谅。  
这个实现方式，我自己看了都过意不去，都对不起 Github。有能力部署服务器的还是尽可能部署一个，说实话，整多了也不好。

---
### Introduction
This is a blog errata open source project. You can create an errata page in your blog for academic sharing and communication. There are great security risks, so it is not uploaded to Github.

Here's an [example](../../apps/errata).

---
### Implementation Principle
This errata is based on the Github Gist. The errata are read and updated by a single user who can fetch and change the Gist.

---
### Preliminary Preparations
1. Create a Github user. Its Token will be exposed, so a new registration is recommended. You are responsible for this account.
2. Create a Gist using this Github user.

---
### Create Page
```bash
hexo new page errata
```
In this way, your errata will be implemented on the page `/errata`.

### Deploying Frontend JavaScript
Create new folders `js` and file `source/js/ex-func-errata.js` in the `/source` directory and write the following code in the file:

```javascript
function createXHR() {
	var XHR=[
		function (){return new XMLHttpRequest();},
		function (){return new ActiveXObject("Msxml2.XMLHTTP");},
		function (){return new ActiveXObject("Msxml3.XMLHTTP");},
		function (){return new ActiveXObject("Microsoft.XMLHTTP");}
	];
	var xhr=null;
	for (let i=0; i<XHR.length; ++i) {
		try {xhr=XHR[i]();} catch(e) {continue;}
		break;
	}
	return xhr;
}

function addToEachLine(inputString, insertString) {
    const lines=inputString.split('\n');
    const modifiedLines=lines.map(line => insertString + line);
    const resultString=modifiedLines.join('\n');
    return resultString;
}

```

The function `createXHR()` is used to return an `XMLHttpRequest` instance, while `addToEachLine()` inserts the `insertString` at the beginning of each line in `inputString`.

These codes are placed in a separate file, which means you can avoid rewriting them when using them in other projects. Of course, you can also combine them into the following file.

Next, create the file `source/js/ex-func-errata.js` and write the following code in it:

```javascript
const gistId='Your Github Gist ID';
var accessToken;

function getAccessToken() {
	xhr=createXHR();
	xhr.open('GET', 'Your Token Link', true);
	xhr.onload=function() {
		if (xhr.status >= 200 && xhr.status < 300) {
			accessToken=xhr.responseText;
		} else {
			console.error('Token Request Failed.');
		}
	};
	xhr.onerror=function() {
		console.error('Token Request Failed.');
	};
	xhr.send();
}
getAccessToken();

function readSubmitter() {
	return document.getElementById('submitterInput').value;
}
function readLink() {
	return document.getElementById('linkInput').value;
}
function readText() {
	return document.getElementById('textInput').value;
}

async function getErrata() {
	const url=`https://api.github.com/gists/${gistId}`;
	let res;
	try {
		const response=await fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': `token ${accessToken}`,
				'Accept': 'application/vnd.github.v3+json'
			}
		});
		if (!response.ok) {
			console.error('Request Status:', response.status);
			res='ERR: Request Failed.';
			return res;
		}
		const data=await response.json();
		console.log('Gist Data:', data);
		try {
			res=data["files"]["Blog-Errata.txt"]["content"];
		} catch (e) {
			console.error('Request Error.');
			res='ERR: Database error, unable to read the errata. Please contact the blog administrator.';
		}
	} catch (e) {
		console.error('Request Error:', e);
		res='ERR: Request error, unable to read the errata. Please check your network connection.';
	}
	return res;
}

async function updateErrata() {
	var updateText=`Submitter: ${readSubmitter()}\nIssue Link: ${readLink()}\nIssue Content: \n${addToEachLine(readText(), '\t')}\nStatus: Pending\n----------`;
	// var res=getErrata();
	var res=await getErrata();
	if (res.slice(0,4)=='ERR') {
		return res;
	}
	updateText=`${res}\n${updateText}`;
	console.log(updateText);
	const requestData={
		files: {
			'Blog-Errata.txt': {
				content: updateText
			}
		}
	}
	const url=`https://api.github.com/gists/${gistId}`;
	try {
		const response=await fetch(url, {
			method: 'PATCH',
			headers: {
				'Authorization': `token ${accessToken}`,
				'Accept': 'application/vnd.github.raw+json',
				'Content-Type': 'application/json'
				// 'Cache-Control': 'no-cache' // Blocked by CORS Policy
			},
			body: JSON.stringify(requestData)
		})
		if (!response.ok) {
			console.error('Request Status:', response.status);
		}
		const data=response.json();
		try {
			console.log('Update Success:', data);
			res='Update successful! Please refresh to see the results.'
		} catch (e) {
			console.error('Update Error.');
			res='Request Error: Database error, unable to read the errata. Please contact the blog administrator.';
		}
	} catch(e) {
		console.error('Request Error:', e);
		res='Request error, unable to update the errata. Please check your network connection.';
	}
	return res;
}

```

To get the `Github Gist ID`, you need to open the Github Gist you created.

For example, here's a Gist: `https://gist.github.com/Username/GistID`  
Its Gist ID is the string at the end: `GistID`

`Your Token Link` is a static API that returns your user Token.  
You can use [TextDB](https://www.textdb.online/) to implement this feature, please refer to the API documentation for details.  
You can choose to update this Token regularly and delete the previous ones to prevent malicious access.

This setup helps protect your Token and complies with Github's deployment requirements, which do not allow other users' Tokens to be included.

The code uses techniques related to asynchronous requests. The `async-await` structure is used here to handle asynchronous requests.

Note the following code:
```javascript
var res=await getErrata();
if (res.slice(0,4)=='ERR') {
	return res;
}
```
When fetching the errata, if the errata cannot be retrieved, it will not be updated, and an error message will be returned.  
Without the `if` statement, your errata might be overwritten by the error message.

Therefore, if you modify the error message, keep the `ERR` prefix, or alternatively, create a separate `flag` to indicate the error message.

---
### Edit Page Markdown File
The Markdown file for the new page is at `/source/errata/index.md`. Edit the following code under `YAML Front`:

```markdown
<script src="../js/ex-func.js"></script>
<script src="../js/ex-func-errata.js"></script>

<!-- Prevent refreshing or leaving the page. -->
<!-- <script>
	window.addEventListener('beforeunload', function(e) {
		var confirmationMessage = 'Refreshing or leaving the page may lose information, are you sure?';
		e.returnValue = confirmationMessage;
		return confirmationMessage;
	});
</script> -->

<style>
	.tip-display-area {
		padding: 5px 10px;
		display: flex;
		background-color: #ffefef;
		color: black;
		border: 1px solid #f00;
		border-radius: 3px;
		align-items: center;
	}
	.login-button {
		background-color: #7f7f7f;
		color: white;
		padding: 5px 10px;
		border: none;
		cursor: pointer;
		border-radius: 3px;
		float: right;
		margin-left: auto;
	}
	.login-button:hover {
		background-color: #5f5f5f;
	}
	.text-container {
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
	}
	.link-input {
		width: 100%;
		box-sizing: border-box;
	}
	.text-input {
		width: 100%;
		box-sizing: border-box;
		resize: none;
		min-height: 200px;
	}
	.read-button {
		background-color: #005f9f;
		color: white;
		padding: 10px 20px;
		border: none;
		cursor: pointer;
		border-radius: 5px;
		/* float: left;
		margin-left: auto; */
	}
	.read-button:hover {
		background-color: #003f7f;
	}
	.submit-button {
		background-color: #4CAF50;
		color: white;
		padding: 10px 20px;
		border: none;
		cursor: pointer;
		border-radius: 5px;
		float: right;
		margin-left: auto;
	}
	.submit-button:hover {
		background-color: #45A049;
	}
	.errata-display-area {
		padding: 10px;
		border: 1px solid #000;
		border-radius: 3px;
		color: black;
		background-color: #f0f0f0;
		white-space: pre-wrap;
	}
</style>

<!-- <div class="tip-display-area" id="tipDisplayArea">
	Please log in to Github before using it.
	<button class="login-button" id="loginButton">Login Github</button>
</div> -->

Academic use only, please do not upload sensitive and undesirable information.

---
<div class="text-container">
	<!-- Submitter Sintle-Line Text Box -->
	<input class="link-input" id="submitterInput" placeholder="Edit question submitter here."></textarea>
</div>

<div class="text-container">
	<!-- Link Single-Line Text Box -->
	<input class="link-input" id="linkInput" placeholder="Edit the link to the issue page here."></textarea>
</div>

<div class="text-container">
	<!-- Question Multi-Line Text Box -->
	<textarea class="text-input" id="textInput" placeholder="Edit the content of the question here."></textarea>
</div>

<button class="read-button" id="readButton">Read Errata</button> <button class="submit-button" id="submitButton">Submit</button>

---
Errata:

<p class="errata-display-area" id="errataDisplayArea">Data pending readout.</p>

<script>
	document.getElementById('readButton').addEventListener('click', function() {
		(async() => {
			const res=await getErrata();
			document.getElementById('errataDisplayArea').textContent=res;
		})();
	});
	document.getElementById('submitButton').addEventListener('click', function(){
		(async() => {
			const res=await updateErrata();
			document.getElementById('errataDisplayArea').textContent=res;
		})();
	});
</script>

---
Thank you for your contribution!
```

The `Refresh Interface` and `Login to Github` code blocks are commented out. Good luck if you want to renew these features!

Next, run `hexo s` to debug if it succeeds, and then you can `deploy` it.

---
### 介绍
这是一个博客勘误表开源项目。你可以在博客中建立一个勘误表页面，以进行学术分享和交流。存在极大的安全隐患，所以没有上传到 Github 上。

[功能示例](../../apps/errata)

---
### 实现原理
这个勘误表是基于 Github Gist 实现的。通过一个独立用户实现 Gist 的获取与更改，以完成勘误表的读取与更新。

---
### 前期准备
1. 创建一个 Github 用户。它的 Token 将会被暴露，所以建议新注册一个。你要对该账号负责。
2. 使用这个 Github 用户创建一个 Gist，新建文件并命名为 `Blog-Errata.txt`。

---
### 创建页面
```bash
hexo new page errata
```
这样，你的勘误表将会在页面 `/errata` 上实现。

---
### 部署前端 Javascript
在 `/source` 文件夹中新建文件夹 `js` 和文件 `source/js/ex-func-errata.js`，并在文件中写入以下代码。

```javascript
function createXHR() {
	var XHR=[
		function (){return new XMLHttpRequest();},
		function (){return new ActiveXObject("Msxml2.XMLHTTP");},
		function (){return new ActiveXObject("Msxml3.XMLHTTP");},
		function (){return new ActiveXObject("Microsoft.XMLHTTP");}
	];
	var xhr=null;
	for (let i=0; i<XHR.length; ++i) {
		try {xhr=XHR[i]();} catch(e) {continue;}
		break;
	}
	return xhr;
}

function addToEachLine(inputString, insertString) {
    const lines=inputString.split('\n');
    const modifiedLines=lines.map(line => insertString + line);
    const resultString=modifiedLines.join('\n');
    return resultString;
}

```

函数 `createXHR()` 用于返回一个 `XMLHttpRequest` 实例，而函数 `addToEachLine()` 用于在 `inputString` 每一行的行首插入 `insertString`。

这些代码放在一个单独的文件中，这意味着你在其它项目中用到它时可以避免重写。当然，合并起来放在下面这个文件中也无妨。

接下来，创建文件 `source/js/ex-func-errata.js`，并在文件中写入以下代码。

```javascript
const gistId='你创建的 Github Gist ID';
var accessToken;

function getAccessToken() {
	xhr=createXHR();
	xhr.open('GET', '你的 Token 链接', true);
	xhr.onload=function() {
		if (xhr.status >= 200 && xhr.status < 300) {
			accessToken=xhr.responseText;
		} else {
			console.error('Token Request Failed.');
		}
	};
	xhr.onerror=function() {
		console.error('Token Request Failed.');
	};
	xhr.send();
}
getAccessToken();

function readSubmitter() {
	return document.getElementById('submitterInput').value;
}
function readLink() {
	return document.getElementById('linkInput').value;
}
function readText() {
	return document.getElementById('textInput').value;
}

async function getErrata() {
	const url=`https://api.github.com/gists/${gistId}`;
	let res;
	try {
		const response=await fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': `token ${accessToken}`,
				'Accept': 'application/vnd.github.v3+json'
			}
		});
		if (!response.ok) {
			console.error('Request Status:', response.status);
			res='ERR: 请求失败。';
			return res;
		}
		const data=await response.json();
		console.log('Gist Data:', data);
		try {
			res=data["files"]["Blog-Errata.txt"]["content"];
		} catch (e) {
			console.error('Request Error.');
			res='ERR: 数据库错误，勘误表无法读取，请联系博客管理员。';
		}
	} catch (e) {
		console.error('Request Error:', e);
		res='ERR: 请求错误，勘误表无法读取，请检查网络连接。';
	}
	return res;
}

async function updateErrata() {
	var updateText=`提交者: ${readSubmitter()}\n问题链接: ${readLink()}\n问题内容: \n${addToEachLine(readText(), '\t')}\n状态: Pending\n----------`;
	// var res=getErrata();
	var res=await getErrata();
	if (res.slice(0,4)=='ERR') {
		return res;
	}
	updateText=`${res}\n${updateText}`;
	console.log(updateText);
	const requestData={
		files: {
			'Blog-Errata.txt': {
				content: updateText
			}
		}
	}
	const url=`https://api.github.com/gists/${gistId}`;
	try {
		const response=await fetch(url, {
			method: 'PATCH',
			headers: {
				'Authorization': `token ${accessToken}`,
				'Accept': 'application/vnd.github.raw+json',
				'Content-Type': 'application/json'
				// 'Cache-Control': 'no-cache' // Blocked by CORS Policy
			},
			body: JSON.stringify(requestData)
		})
		if (!response.ok) {
			console.error('Request Status:', response.status);
		}
		const data=response.json();
		try {
			console.log('Update Success:', data);
			res='更新成功！请刷新查看结果。'
		} catch (e) {
			console.error('Update Error.');
			res='Request Error: 数据库错误，勘误表无法读取，请联系博客管理员。';
		}
	} catch(e) {
		console.error('Request Error:', e);
		res='请求错误，勘误表无法更新，请检查网络连接。';
	}
	return res;
}

```

要获取 `Github Gist ID`，你需要打开你所创建的 Github Gist。

打个比方，这里是一个 Gist：`https://gist.github.com/Username/GistID`  
它的 Gist ID 就是后面的字符串：`GistID`

`你的 Token 链接` 是一个静态的 API，返回值是你的用户 Token。  
你可以使用 [TextDB](https://www.textdb.online/) 实现这个功能，具体请阅读 API 文档。  
你可以选择定期更新这个 Token，并删除以前的，以防止有人图谋不轨。

建立这个一是防止有人偷你的 Token，二是 Github Deploy 要求不能携带其它用户的 Token。

代码中使用了有关异步请求的相关技术。这里使用了 `async-await` 结构来关闭异步请求。

需要注意的是下面这段代码：
```javascript
var res=await getErrata();
if (res.slice(0,4)=='ERR') {
	return res;
}
```
在获取勘误表时，如果勘误表无法获取，就不要更新，并返回报错信息。  
如果没有 `if` 语句，你的勘误表可能会被报错信息覆盖。

所以，如果你修改了报错信息，请保留前面的 `ERR`，或者另外立一个 `flag` 表示报错信息。

---
### 编辑页面 Markdown 文件
新建页面的 Markdown 文件在 `/source/errata/index.md`。在 `YAML Front` 下面编辑如下代码：

```markdown
<script src="../js/ex-func.js"></script>
<script src="../js/ex-func-errata.js"></script>

<!-- 阻止刷新或离开页面 -->
<!-- <script>
	window.addEventListener('beforeunload', function(e) {
		var confirmationMessage = '注意到刷新或离开页面可能会丢失信息，你确定吗？';
		e.returnValue = confirmationMessage;
		return confirmationMessage;
	});
</script> -->

<style>
	.tip-display-area {
		padding: 5px 10px;
		display: flex;
		background-color: #ffefef;
		color: black;
		border: 1px solid #f00;
		border-radius: 3px;
		align-items: center;
	}
	.login-button {
		background-color: #7f7f7f;
		color: white;
		padding: 5px 10px;
		border: none;
		cursor: pointer;
		border-radius: 3px;
		float: right;
		margin-left: auto;
	}
	.login-button:hover {
		background-color: #5f5f5f;
	}
	.text-container {
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
	}
	.link-input {
		width: 100%;
		box-sizing: border-box;
	}
	.text-input {
		width: 100%;
		box-sizing: border-box;
		resize: none;
		min-height: 200px;
	}
	.read-button {
		background-color: #005f9f;
		color: white;
		padding: 10px 20px;
		border: none;
		cursor: pointer;
		border-radius: 5px;
		/* float: left;
		margin-left: auto; */
	}
	.read-button:hover {
		background-color: #003f7f;
	}
	.submit-button {
		background-color: #4CAF50;
		color: white;
		padding: 10px 20px;
		border: none;
		cursor: pointer;
		border-radius: 5px;
		float: right;
		margin-left: auto;
	}
	.submit-button:hover {
		background-color: #45A049;
	}
	.errata-display-area {
		padding: 10px;
		border: 1px solid #000;
		border-radius: 3px;
		color: black;
		background-color: #f0f0f0;
		white-space: pre-wrap;
	}
</style>

<!-- <div class="tip-display-area" id="tipDisplayArea">
	在使用之前，请先登录Github。
	<button class="login-button" id="loginButton">登录Github</button>
</div> -->

仅限学术用途，请勿上传敏感和不良信息。

---
<div class="text-container">
	<!-- 提交者单行文本框，直接套用linkInput了 -->
	<input class="link-input" id="submitterInput" placeholder="在此处编辑问题提交者"></textarea>
</div>

<div class="text-container">
	<!-- 链接单行文本框 -->
	<input class="link-input" id="linkInput" placeholder="在此处编辑问题页面链接"></textarea>
</div>

<div class="text-container">
	<!-- 问题多行文本框 -->
	<textarea class="text-input" id="textInput" placeholder="在此处编辑问题内容"></textarea>
</div>

<button class="read-button" id="readButton">读取勘误表</button> <button class="submit-button" id="submitButton">提交</button>

---
勘误表：

<p class="errata-display-area" id="errataDisplayArea">数据待读取</p>

<script>
	document.getElementById('readButton').addEventListener('click', function() {
		(async() => {
			const res=await getErrata();
			document.getElementById('errataDisplayArea').textContent=res;
		})();
	});
	document.getElementById('submitButton').addEventListener('click', function(){
		(async() => {
			const res=await updateErrata();
			document.getElementById('errataDisplayArea').textContent=res;
		})();
	});
</script>

---
谢谢你的贡献！
```

注意到有 `刷新界面` 和 `登录 Github` 两处代码块被注释掉了。如果你想续写这些功能，祝你好运！

接下来，执行 `hexo s` 调试是否成功，没问题就可以 `deploy` 了。
