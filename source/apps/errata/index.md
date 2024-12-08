---
title: Algo-X 勘误表
date: 2024-08-09 21:33:32
sitemap: false
---

<script src="../../js/ex-func.js"></script>
<script src="../../js/ex-func-errata.js"></script>
<link rel="stylesheet" href="../../css/ex-style.css">

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

<!-- --- -->

仅限学术用途，请勿上传敏感和不良信息。

---
<div class="text-container">
	<!-- 提交者单行文本框，直接套用linkInput了 -->
	<input class="link-input" id="submitterInput" placeholder="在此处编辑问题提交者 | 可以填“匿名”，不可以填“/bx”"></textarea>
</div>

<div class="text-container">
	<!-- 链接单行文本框 -->
	<input class="link-input" id="linkInput" placeholder="在此处编辑问题页面链接"></textarea>
</div>

<div class="text-container">
	<!-- 问题多行文本框 -->
	<textarea class="text-input" id="textInput" placeholder="在此处编辑问题内容"></textarea>
</div>

<button class="blue-button" id="readButton">读取勘误表</button> <button class="green-button" id="submitButton">提交</button>

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
