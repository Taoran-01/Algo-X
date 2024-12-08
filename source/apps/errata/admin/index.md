---
title: Algo-X 勘误表 - 管理员页面
date: 2024-09-16 12:10:47
sitemap: false
---

<script src="../../../js/ex-func.js"></script>
<script src="../../../js/ex-func-errata.js"></script>
<link rel="stylesheet" href="../../css/ex-style.css">

<style>
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

<div class="text-container">
	<!-- 勘误表编辑文本框 -->
	<textarea class="text-input" id="textInput" placeholder="勘误表待读取"></textarea>
</div>

<button class="blue-button" id="readButton">读取勘误表</button> <button class="green-button" id="submitButton">提交</button>

<script>
	document.getElementById('readButton').addEventListener('click', function() {
		(async() => {
			const res=await getErrata();
			document.getElementById('textInput').value=res;
		})();
	});
	document.getElementById('submitButton').addEventListener('click', function(){
		(async() => {
			const updateText=document.getElementById('textInput').value;
			const res=await updateErrataDirectly(updateText);
			document.getElementById('errataDisplayArea').textContent=res;
		})();
	});
</script>

<p class="errata-display-area" id="errataDisplayArea">未提交</p>
