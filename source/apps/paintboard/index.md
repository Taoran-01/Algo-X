---
title: 绘版
date: 2024-10-04 19:24:22
---

<script src="../../js/ex-func.js"></script>
<script src="../../js/ex-func-luogu-paintboard-script.js"></script>
<link rel="stylesheet" href="../../css/ex-style.css">
<input type="file" id="imageInput" style="display: none"></input>

<style>
	.disperse-container {
		display: flex;
		justify-content: space-between;
	}
	.hidden-bordered-block {
		border: 1px solid #ccc;
		border-radius: 3px;
		padding: 10px;
		display: none;
	}
	.canvas-container {
		width: 100%;
		padding-bottom: 60%;
		position: relative;
		/* display: flex; */
		border: 1px solid #ccc;
		border-radius: 3px;
	}
	.canvas {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.info-child-container {
		width: 49.5%;
		height: 100px;
		overflow-y: hidden;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 3px;
		background: #f9f9f9;
		font-family: 'Times New Roman', serif;
		font-size: 0.75em;
	}
	.log-content-info {
		color: #9f9f9f;
	}
	.log-content-error {
		color: #ff0000;
		font-weight: bold;
	}
	.log-content-success {
		color: #007f00;
	}
	.text-tip {
		color: grey;
		margin: 2px 10px 0px 10px;
	}
	.text-tip-left {
		text-align: left;
		color: grey;
		margin: 2px 10px 0px 10px;
	}
	.text-tip-right {
		text-align: right;
		color: grey;
		margin: 2px 10px 0px 10px;
	}
	.link-input {
		width: 100%;
		box-sizing: border-box;
	}
	.text-input {
		width: 100%;
		box-sizing: border-box;
		resize: horizon;
		min-height: 150px;
	}
	.b-mv {
		position: absolute;
		width: 35px;
		height: 35px;
	}
	.b-cf {
		position: absolute;
		width: 70px;
		height: 35px;
	}
	.b-up {
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}
	.b-dn {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
	.b-lf {
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}
	.b-rt {
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}
	.b-ct {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.b-db-up {
		top: -10%;
		left: 50%;
		transform: translateX(-50%)
	}
	.b-db-dn {
		bottom: -10%;
		left: 50%;
		transform: translateX(-50%)
	}
	.b-db-lf {
		top: 50%;
		left: -10%;
		transform: translateY(-50%)
	}
	.b-db-rt {
		top: 50%;
		right: -10%;
		transform: translateY(-50%)
	}
</style>

<div style="width: 80%; margin: 0 auto;">
	<div class="canvas-container" id="canvasContainer">
		<canvas class="canvas" id="canvas" width="1000" height="600"></canvas>
		<!-- <canvas class="preview" id="preview" width="1000" height="600"></canvas> -->
		<canvas class="canvas" id="originalImage" width="1000" height="600" style="display: none;"></canvas>
		<canvas class="canvas" id="calculatedImage" width="1000" height="600" style="display: none;"></canvas>
		<canvas class="canvas" id="mask" width="1000" height="600" style="z-index: 1;"></canvas>
	</div>
	<div class="disperse-container">
		<div class="info-child-container" id="logArea"></div>
		<div class="info-child-container" id="infoArea"></div>
	</div>
	<div class="hidden-bordered-block" id="operateArea">
		<div class="select-wrapper" style="margin-bottom: 10px;">
			<div class="custom-select"></div>
			<div class="options"></div>
		</div>
		<div class="disperse-container" style="width: 270px; margin: 0 auto; padding: 20px;">
			<div style="position: relative; width: 110px; height: 110px;">
				<button class="blue-button b-mv b-db-up" id="mvUpDb"></button>
				<button class="blue-button b-mv b-db-dn" id="mvDnDb"></button>
				<button class="blue-button b-mv b-db-lf" id="mvLfDb"></button>
				<button class="blue-button b-mv b-db-rt" id="mvRtDb"></button>
				<button class="grey-button b-mv b-up" id="mvUp">↑</button>
				<button class="grey-button b-mv b-dn" id="mvDn">↓</button>
				<button class="grey-button b-mv b-lf" id="mvLf">←</button>
				<button class="grey-button b-mv b-rt" id="mvRt">→</button>
			</div>
			<div style=" position: relative; width: 70px; height: 110px; display: none;">
				<button class="grey-button b-cf b-up" id="zmIn">放大</button>
				<button class="grey-button b-cf b-ct" id="zmRst">复位</button>
				<button class="grey-button b-cf b-dn" id="zmOut">缩小</button>
			</div>
			<div style="position: relative; width: 70px; height: 110px;">
				<button class="green-button b-cf b-up" id="confirmOperation">确认 √</button>
				<button class="red-button b-cf b-ct" id="removeImage">删除 ◌</button>
				<button class="grey-button b-cf b-dn" id="cancelOperation">取消 ×</button>
			</div>
		</div>
	</div>
</div>

<div style="width: 100%; padding: 10px;">
	<div class="disperse-container">
		<p class="text-tip-left">绘版链接</p>
		<p class="text-tip-right">请在前方加入「http://」或「https://」</p>
	</div>
	<input class="link-input" id="linkInput" placeholder="编辑目标绘版链接" value="https://www.luogu.com.cn/paintboard"></textarea>
	<!-- <input class="link-input" id="linkInput" placeholder="编辑目标绘版链接" value="http://192.168.0.210:4000/paintboard"></textarea> -->
	<div class="disperse-container">
		<p class="text-tip-left">WebSocket连接</p>
		<p class="text-tip-right">请在前方加入「wss://」</p>
	</div>
	<input class="link-input" id="wsInput" placeholder="编辑目标服务器链接" value="wss://ws.luogu.com.cn/ws"></textarea>
	<!-- <input class="link-input" id="wsInput" placeholder="编辑目标服务器链接" value="wss://192.168.0.210:8000/ws"></textarea> -->
	<div class="disperse-container">
		<p class="text-tip-left">UID & 绘版Token</p>
		<p class="text-tip-right">「UID, TOKEN」换行分隔</p>
	</div>
	<textarea class="text-input" id="tokenInput" placeholder="编辑绘版Token | 格式：<UID>, <TOKEN>可以输入多个，换行为界"></textarea>
	<div class="disperse-container">
		<button class="blue-button" id="readButton">初始化</button>
		<button class="grey-button" id="uploadButton">上传图片</button>
		<button class="grey-button" id="operateButton">操作图片</button>
		<button class="green-button" id="togglePainting">开始绘制</button>
		<button class="grey-button" id="checkProgress">查看进度</button>
	</div>
</div>

<script>
	document.getElementById("readButton").addEventListener("click", function(){(async()=>{init();})();});
	document.getElementById("uploadButton").addEventListener("click", triggerFileInput);
	document.getElementById("operateButton").addEventListener("click", function() {
		const operateArea=document.getElementById("operateArea");
		if (getComputedStyle(operateArea).display=="none") operationStart();
		else operationEnd();
	});
	document.getElementById("mvUp").addEventListener("click", function() {moveImage(0, -1);});
	document.getElementById("mvDn").addEventListener("click", function() {moveImage(0, 1);});
	document.getElementById("mvLf").addEventListener("click", function() {moveImage(-1, 0);});
	document.getElementById("mvRt").addEventListener("click", function() {moveImage(1, 0);});
	document.getElementById("mvUpDb").addEventListener("click", function() {moveImage(0, -10);});
	document.getElementById("mvDnDb").addEventListener("click", function() {moveImage(0, 10);});
	document.getElementById("mvLfDb").addEventListener("click", function() {moveImage(-10, 0);});
	document.getElementById("mvRtDb").addEventListener("click", function() {moveImage(10, 0);});
	document.getElementById("confirmOperation").addEventListener("click", operationConfirm);
	document.getElementById("removeImage").addEventListener("click", operationRemove);
	document.getElementById("cancelOperation").addEventListener("click", operationCancel);
	document.getElementById("togglePainting").addEventListener("click", function() {
		if (onDrawing) stopPainting();
		else startPainting();
	});
</script>

<script>
	initSelection();
</script>
