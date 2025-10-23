import{_ as s,o as e,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"Jenkins Pipeline 配置企业微信通知","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/plus/12-webchatWaring.md","filePath":"guide/Linux/Jenkins/plus/12-webchatWaring.md","lastUpdated":1720533756000}'),l={name:"guide/Linux/Jenkins/plus/12-webchatWaring.md"},t=a(`<h1 id="jenkins-pipeline-配置企业微信通知" tabindex="-1">Jenkins Pipeline 配置企业微信通知 <a class="header-anchor" href="#jenkins-pipeline-配置企业微信通知" aria-label="Permalink to &quot;Jenkins Pipeline 配置企业微信通知&quot;">​</a></h1><p>目前 Jenkins 有自带的 qy-wechat-notification-plugin这个插件可以直接配置企业微信机器人的 Webhook 地址，即可实现build之后进行企业微信通知的功能。但是这个插件只能在 Freestyle project 等带有 Post build action 的Project中调用 若 Project 为 <strong>Pipeline</strong> ，那么是无法直接调用此插件，原因是<strong>Pipeline</strong>中没有<strong>Post-build Actions</strong>这个参数</p><p><strong>send_message.sh</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/bin/sh</span></span>
<span class="line"><span style="color:#e1e4e8;"># 此脚本可实现jenkins往企业微信和钉钉推送消息</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">usage(){</span></span>
<span class="line"><span style="color:#e1e4e8;">	echo &quot;usage: $0 TYPE TITLE CONTENT [URL]&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	echo &quot;       TYPE: wechat|dingtalk&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">TYPE=&quot;$1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">TITLE=&quot;$2&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">CONTENT=&quot;$3&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">URL=&quot;$4&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">CHAT_CONTENT_TYPE=&#39;Content-Type: application/json&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">DEFAULT_PIC_URL=&quot;https://img-blog.csdnimg.cn/20191227152859635.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9saXVtaWFvY24uYmxvZy5jc2RuLm5ldA==,size_16,color_FFFFFF,t_70&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">DINGTALK_DEFAULT_WORDS=&quot; [LiuMiaoMsg]&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">if [ $# -lt 3 ]; then</span></span>
<span class="line"><span style="color:#e1e4e8;">  usage</span></span>
<span class="line"><span style="color:#e1e4e8;">  exit 1</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if [ _&quot;\${TYPE}&quot; = _&quot;wechat&quot; ]; then</span></span>
<span class="line"><span style="color:#e1e4e8;">  CHAT_WEBHOOK_URL=&#39;https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">elif [ _&quot;\${TYPE}&quot; = _&quot;dingtalk&quot; ]; then</span></span>
<span class="line"><span style="color:#e1e4e8;">  CHAT_WEBHOOK_URL=&#39;https://oapi.dingtalk.com/robot/send?access_token&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">else</span></span>
<span class="line"><span style="color:#e1e4e8;">  usage</span></span>
<span class="line"><span style="color:#e1e4e8;">  exit 1</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if [ _&quot;\${CHAT_WEBHOOK_KEY}&quot; = _&quot;&quot; ]; then</span></span>
<span class="line"><span style="color:#e1e4e8;">  echo &quot;please make sure CHAT_WEBHOOK_KEY has been exported as environment variable&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  usage</span></span>
<span class="line"><span style="color:#e1e4e8;">  exit 1</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if [ _&quot;\${URL}&quot; = _&quot;&quot; ]; then</span></span>
<span class="line"><span style="color:#e1e4e8;">  URL=&quot;https://blog.csdn.net/Mr_rsq/article/details/110956983&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;## send message for : \${TYPE}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">if [ _&quot;\${TYPE}&quot; = _&quot;wechat&quot; ]; then</span></span>
<span class="line"><span style="color:#e1e4e8;">  curl &quot;\${CHAT_WEBHOOK_URL}=\${CHAT_WEBHOOK_KEY}&quot; \\</span></span>
<span class="line"><span style="color:#e1e4e8;">   -H &quot;\${CHAT_CONTENT_TYPE}&quot; \\</span></span>
<span class="line"><span style="color:#e1e4e8;">   -d &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">   {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;msgtype&quot;: &quot;news&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;news&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">           &quot;articles&quot; : [</span></span>
<span class="line"><span style="color:#e1e4e8;">              {</span></span>
<span class="line"><span style="color:#e1e4e8;">                  &quot;title&quot; : &quot;&#39;&quot;\${TITLE}&quot;&#39;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                  &quot;description&quot; : &quot;&#39;&quot;\${CONTENT}&quot;&#39;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                  &quot;url&quot; : &quot;&#39;&quot;\${URL}&quot;&#39;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                  &quot;picurl&quot; : &quot;&#39;&quot;\${DEFAULT_PIC_URL}&quot;&#39;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">              }</span></span>
<span class="line"><span style="color:#e1e4e8;">           ]</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">   }&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">elif [ _&quot;\${TYPE}&quot; = _&quot;dingtalk&quot; ]; then</span></span>
<span class="line"><span style="color:#e1e4e8;">  curl &quot;\${CHAT_WEBHOOK_URL}=\${CHAT_WEBHOOK_KEY}&quot; \\</span></span>
<span class="line"><span style="color:#e1e4e8;">   -H &quot;\${CHAT_CONTENT_TYPE}&quot; \\</span></span>
<span class="line"><span style="color:#e1e4e8;">   -d &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">   {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;msgtype&quot;: &quot;link&quot;, </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;link&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;text&quot;: &quot;&#39;&quot;\${CONTENT}\${DINGTALK_DEFAULT_WORDS}&quot;&#39;&quot;, </span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;title&quot;: &quot;&#39;&quot;\${TITLE}&quot;&#39;&quot;, </span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;picUrl&quot;: &quot;&#39;&quot;\${DEFAULT_PIC_URL}&quot;&#39;&quot;, </span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;messageUrl&quot;: &quot;&#39;&quot;\${URL}&quot;&#39;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">   }&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">else</span></span>
<span class="line"><span style="color:#e1e4e8;">  usage</span></span>
<span class="line"><span style="color:#e1e4e8;">  exit 1</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/bin/sh</span></span>
<span class="line"><span style="color:#24292e;"># 此脚本可实现jenkins往企业微信和钉钉推送消息</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">usage(){</span></span>
<span class="line"><span style="color:#24292e;">	echo &quot;usage: $0 TYPE TITLE CONTENT [URL]&quot;</span></span>
<span class="line"><span style="color:#24292e;">	echo &quot;       TYPE: wechat|dingtalk&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">TYPE=&quot;$1&quot;</span></span>
<span class="line"><span style="color:#24292e;">TITLE=&quot;$2&quot;</span></span>
<span class="line"><span style="color:#24292e;">CONTENT=&quot;$3&quot;</span></span>
<span class="line"><span style="color:#24292e;">URL=&quot;$4&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">CHAT_CONTENT_TYPE=&#39;Content-Type: application/json&#39;</span></span>
<span class="line"><span style="color:#24292e;">DEFAULT_PIC_URL=&quot;https://img-blog.csdnimg.cn/20191227152859635.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9saXVtaWFvY24uYmxvZy5jc2RuLm5ldA==,size_16,color_FFFFFF,t_70&quot;</span></span>
<span class="line"><span style="color:#24292e;">DINGTALK_DEFAULT_WORDS=&quot; [LiuMiaoMsg]&quot;</span></span>
<span class="line"><span style="color:#24292e;">if [ $# -lt 3 ]; then</span></span>
<span class="line"><span style="color:#24292e;">  usage</span></span>
<span class="line"><span style="color:#24292e;">  exit 1</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if [ _&quot;\${TYPE}&quot; = _&quot;wechat&quot; ]; then</span></span>
<span class="line"><span style="color:#24292e;">  CHAT_WEBHOOK_URL=&#39;https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key&#39;</span></span>
<span class="line"><span style="color:#24292e;">elif [ _&quot;\${TYPE}&quot; = _&quot;dingtalk&quot; ]; then</span></span>
<span class="line"><span style="color:#24292e;">  CHAT_WEBHOOK_URL=&#39;https://oapi.dingtalk.com/robot/send?access_token&#39;</span></span>
<span class="line"><span style="color:#24292e;">else</span></span>
<span class="line"><span style="color:#24292e;">  usage</span></span>
<span class="line"><span style="color:#24292e;">  exit 1</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if [ _&quot;\${CHAT_WEBHOOK_KEY}&quot; = _&quot;&quot; ]; then</span></span>
<span class="line"><span style="color:#24292e;">  echo &quot;please make sure CHAT_WEBHOOK_KEY has been exported as environment variable&quot;</span></span>
<span class="line"><span style="color:#24292e;">  usage</span></span>
<span class="line"><span style="color:#24292e;">  exit 1</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if [ _&quot;\${URL}&quot; = _&quot;&quot; ]; then</span></span>
<span class="line"><span style="color:#24292e;">  URL=&quot;https://blog.csdn.net/Mr_rsq/article/details/110956983&quot;</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;## send message for : \${TYPE}&quot;</span></span>
<span class="line"><span style="color:#24292e;">if [ _&quot;\${TYPE}&quot; = _&quot;wechat&quot; ]; then</span></span>
<span class="line"><span style="color:#24292e;">  curl &quot;\${CHAT_WEBHOOK_URL}=\${CHAT_WEBHOOK_KEY}&quot; \\</span></span>
<span class="line"><span style="color:#24292e;">   -H &quot;\${CHAT_CONTENT_TYPE}&quot; \\</span></span>
<span class="line"><span style="color:#24292e;">   -d &#39;</span></span>
<span class="line"><span style="color:#24292e;">   {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;msgtype&quot;: &quot;news&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        &quot;news&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">           &quot;articles&quot; : [</span></span>
<span class="line"><span style="color:#24292e;">              {</span></span>
<span class="line"><span style="color:#24292e;">                  &quot;title&quot; : &quot;&#39;&quot;\${TITLE}&quot;&#39;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                  &quot;description&quot; : &quot;&#39;&quot;\${CONTENT}&quot;&#39;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                  &quot;url&quot; : &quot;&#39;&quot;\${URL}&quot;&#39;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                  &quot;picurl&quot; : &quot;&#39;&quot;\${DEFAULT_PIC_URL}&quot;&#39;&quot;</span></span>
<span class="line"><span style="color:#24292e;">              }</span></span>
<span class="line"><span style="color:#24292e;">           ]</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">   }&#39;</span></span>
<span class="line"><span style="color:#24292e;">elif [ _&quot;\${TYPE}&quot; = _&quot;dingtalk&quot; ]; then</span></span>
<span class="line"><span style="color:#24292e;">  curl &quot;\${CHAT_WEBHOOK_URL}=\${CHAT_WEBHOOK_KEY}&quot; \\</span></span>
<span class="line"><span style="color:#24292e;">   -H &quot;\${CHAT_CONTENT_TYPE}&quot; \\</span></span>
<span class="line"><span style="color:#24292e;">   -d &#39;</span></span>
<span class="line"><span style="color:#24292e;">   {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;msgtype&quot;: &quot;link&quot;, </span></span>
<span class="line"><span style="color:#24292e;">    &quot;link&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;text&quot;: &quot;&#39;&quot;\${CONTENT}\${DINGTALK_DEFAULT_WORDS}&quot;&#39;&quot;, </span></span>
<span class="line"><span style="color:#24292e;">        &quot;title&quot;: &quot;&#39;&quot;\${TITLE}&quot;&#39;&quot;, </span></span>
<span class="line"><span style="color:#24292e;">        &quot;picUrl&quot;: &quot;&#39;&quot;\${DEFAULT_PIC_URL}&quot;&#39;&quot;, </span></span>
<span class="line"><span style="color:#24292e;">        &quot;messageUrl&quot;: &quot;&#39;&quot;\${URL}&quot;&#39;&quot;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">   }&#39;</span></span>
<span class="line"><span style="color:#24292e;">else</span></span>
<span class="line"><span style="color:#24292e;">  usage</span></span>
<span class="line"><span style="color:#24292e;">  exit 1</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span></code></pre></div><p>过使用curl命令的<code>-d</code>和<code>-H</code>参数去<code>模拟json格式的post请求</code>，通过往<strong>send_message.sh</strong>脚本中传入<strong>title</strong>和<strong>picUrl</strong>等参数，从而实现企业微信通知的功能</p><p>脚本使用： （1）在使用send_message脚本之前需要先配置CHAT_WEBHOOK_KEY</p><p>export CHAT_WEBHOOK_KEY=xxxxxxxxxx （2）然后直接执行脚本</p><p>bash send_message.sh wechat &quot;rsq_test&quot; &quot;This is a test messages.&quot;</p><h2 id="try-catch捕获build-failed" tabindex="-1">try-catch捕获build failed <a class="header-anchor" href="#try-catch捕获build-failed" aria-label="Permalink to &quot;try-catch捕获build failed&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">try{</span></span>
<span class="line"><span style="color:#e1e4e8;">	node(LINUX) {</span></span>
<span class="line"><span style="color:#e1e4e8;">		stage(&#39;Build - Linux&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">			// build scripts ...</span></span>
<span class="line"><span style="color:#e1e4e8;">		} // stage</span></span>
<span class="line"><span style="color:#e1e4e8;">	} //node</span></span>
<span class="line"><span style="color:#e1e4e8;">} //try</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">catch (e){</span></span>
<span class="line"><span style="color:#e1e4e8;">	// 捕获错误，当Failed的时候给currentBuild.result赋值</span></span>
<span class="line"><span style="color:#e1e4e8;">	currentBuild.result = &#39;FAILURE&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">} //catch</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if(currentBuild.result == &#39;FAILURE&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">	node(env.BuildMachineLabel){</span></span>
<span class="line"><span style="color:#e1e4e8;">		stage(&quot;Post Build&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">			dir(env.ws_linux) {</span></span>
<span class="line"><span style="color:#e1e4e8;">				// 在使用send_message脚本之前需要先配置CHAT_WEBHOOK_KEY</span></span>
<span class="line"><span style="color:#e1e4e8;">				sh &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">				export CHAT_WEBHOOK_KEY=xxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">				bash send_message.sh wechat &quot;Linux %JOB_NAME% build failed.&quot; &quot;URL: %BUILD_URL%&quot; &quot;%BUILD_URL%&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">				&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">			} // dir</span></span>
<span class="line"><span style="color:#e1e4e8;">		} // stage</span></span>
<span class="line"><span style="color:#e1e4e8;">	} // node</span></span>
<span class="line"><span style="color:#e1e4e8;">} // if</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">try{</span></span>
<span class="line"><span style="color:#24292e;">	node(LINUX) {</span></span>
<span class="line"><span style="color:#24292e;">		stage(&#39;Build - Linux&#39;){</span></span>
<span class="line"><span style="color:#24292e;">			// build scripts ...</span></span>
<span class="line"><span style="color:#24292e;">		} // stage</span></span>
<span class="line"><span style="color:#24292e;">	} //node</span></span>
<span class="line"><span style="color:#24292e;">} //try</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">catch (e){</span></span>
<span class="line"><span style="color:#24292e;">	// 捕获错误，当Failed的时候给currentBuild.result赋值</span></span>
<span class="line"><span style="color:#24292e;">	currentBuild.result = &#39;FAILURE&#39;</span></span>
<span class="line"><span style="color:#24292e;">} //catch</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if(currentBuild.result == &#39;FAILURE&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">	node(env.BuildMachineLabel){</span></span>
<span class="line"><span style="color:#24292e;">		stage(&quot;Post Build&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">			dir(env.ws_linux) {</span></span>
<span class="line"><span style="color:#24292e;">				// 在使用send_message脚本之前需要先配置CHAT_WEBHOOK_KEY</span></span>
<span class="line"><span style="color:#24292e;">				sh &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">				export CHAT_WEBHOOK_KEY=xxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">				bash send_message.sh wechat &quot;Linux %JOB_NAME% build failed.&quot; &quot;URL: %BUILD_URL%&quot; &quot;%BUILD_URL%&quot;</span></span>
<span class="line"><span style="color:#24292e;">				&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">			} // dir</span></span>
<span class="line"><span style="color:#24292e;">		} // stage</span></span>
<span class="line"><span style="color:#24292e;">	} // node</span></span>
<span class="line"><span style="color:#24292e;">} // if</span></span></code></pre></div><p>通过Jenkins的内置变量，最后可以直接推送build failed的Job_url，执行如下命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">bash send_message.sh wechat &quot;Ubuntu %JOB_NAME% build failed.&quot; &quot;URL: %BUILD_URL%&quot; &quot;%BUILD_URL%&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">bash send_message.sh wechat &quot;Ubuntu %JOB_NAME% build failed.&quot; &quot;URL: %BUILD_URL%&quot; &quot;%BUILD_URL%&quot;</span></span></code></pre></div><h2 id="声明式脚本" tabindex="-1">声明式脚本 <a class="header-anchor" href="#声明式脚本" aria-label="Permalink to &quot;声明式脚本&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">    agent any </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Build&#39;) { </span></span>
<span class="line"><span style="color:#e1e4e8;">            steps { </span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &#39;echo Build stage ...&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &#39;export CHAT_WEBHOOK_KEY=your_owen_wechat_key_info; send_message.sh wechat &quot;Build Stage&quot; &quot;Build Stage has been successfully completed...&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Test&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &#39;echo Test stage ...&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &#39;export CHAT_WEBHOOK_KEY=your_owen_wechat_key_info; send_message.sh wechat &quot;Test Stage&quot; &quot;Test Stage has been successfully completed...&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Deploy&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &#39;echo Deploy stage ...&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &#39;export CHAT_WEBHOOK_KEY=your_owen_wechat_key_info; send_message.sh wechat &quot;Deploy Stage&quot; &quot;Deploy Stage has been successfully completed...&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">    agent any </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    stages {</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Build&#39;) { </span></span>
<span class="line"><span style="color:#24292e;">            steps { </span></span>
<span class="line"><span style="color:#24292e;">                sh &#39;echo Build stage ...&#39; </span></span>
<span class="line"><span style="color:#24292e;">                sh &#39;export CHAT_WEBHOOK_KEY=your_owen_wechat_key_info; send_message.sh wechat &quot;Build Stage&quot; &quot;Build Stage has been successfully completed...&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Test&#39;){</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                sh &#39;echo Test stage ...&#39; </span></span>
<span class="line"><span style="color:#24292e;">                sh &#39;export CHAT_WEBHOOK_KEY=your_owen_wechat_key_info; send_message.sh wechat &quot;Test Stage&quot; &quot;Test Stage has been successfully completed...&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Deploy&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                sh &#39;echo Deploy stage ...&#39; </span></span>
<span class="line"><span style="color:#24292e;">                sh &#39;export CHAT_WEBHOOK_KEY=your_owen_wechat_key_info; send_message.sh wechat &quot;Deploy Stage&quot; &quot;Deploy Stage has been successfully completed...&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span></code></pre></div><p><strong>try-catch支持的命令</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">acceptGitLabMR, addGitLabMRComment, archive, bat, build, catchError, checkout, container, containerLog, deleteDir, dir, dockerFingerprintFrom, dockerFingerprintRun, dockerNode, echo, emailext, emailextrecipients, envVarsForTool, error, fileExists, findBuildScans, getContext, git, gitlabBuilds, gitlabCommitStatus, httpRequest, input, isUnix, junit, library, libraryResource, load, lock, mail, milestone, node, p4, p4approve, p4publish, p4sync, p4tag, p4unshelve, parallel, podTemplate, powershell, properties, publishHTML, pwd, pwsh, readFile, readTrusted, resolveScm, retry, script, sh, sleep, stage, stash, step, svn, timeout, timestamps, tm, tool, unarchive, unstable, unstash, updateGitlabCommitStatus, validateDeclarativePipeline, waitUntil, warnError, withContext, withCredentials, withDockerContainer, withDockerRegistry, withDockerServer, withEnv, wrap, writeFile, ws] or symbols [all, allOf, allure, always, ant, antFromApache, antOutcome, antTarget, any, anyOf, apiToken, approve, architecture, archiveArtifacts, artifactManager, attach, authorizationMatrix, autoClean, batchFile, bitbucket, booleanParam, branch, brokenBuildSuspects, brokenTestsSuspects, buildButton, buildDescription, buildDiscarder, buildName, buildTimestamp, buildTimestampExtraProperties, buildingTag, caseInsensitive, caseSensitive, certificate, changeRequest, changelog, changeset, checkoutToSubdirectory, choice, choiceParam, cleanWs, cleanup, clientSpec, clock, cloud, command, configMapVolume, containerEnvVar, containerLivenessProbe, containerTemplate, credentials, cron, crumb, culprits, default, defaultView, demand, depotSource, developers, disableConcurrentBuilds, disableResume, docker, dockerCert, dockerfile, downloadSettings, downstream, dumb, durabilityHint, dynamicPVC, emptyDirVolume, emptyDirWorkspaceVolume, envVar, envVars, environment, equals, expression, file, fileParam, filePath, fingerprint, fishEye, flushOnly, forceClean, frameOptions, freeStyle, freeStyleJob, fromScm, fromSource, git, gitBranchDiscovery, gitHubBranchDiscovery, gitHubBranchHeadAuthority, gitHubForkDiscovery, gitHubSshCheckout, gitHubTagDiscovery, gitHubTrustContributors, gitHubTrustEveryone, gitHubTrustNobody, gitHubTrustPermissions, gitLabConnection, gitTagDiscovery, github, githubPush, gitlab, globalLib, gradle, graphClean, graphSource, headRegexFilter, headWildcardFilter, hostPathVolume, hostPathWorkspaceVolume, hyperlink, hyperlinkToModels, incremental, inheriting, inheritingGlobal, installSource, isRestartedRun, jdk, jdkInstaller, jgit, jgitapache, jnlp, jobName, kubernetes, label, lastDuration, lastFailure, lastGrantedAuthorities, lastStable, lastSuccess, legacy, legacySCM, list, local, location, logRotator, loggedInUsersCanDoAnything, manualSpec, masterBuild, matrix, maven, maven3Mojos, mavenErrors, mavenMojos, mavenWarnings, merge, modernSCM, multiBranch, multiGraph, multiStreams, multiSwarm, myView, never, newContainerPerStage, nfsVolume, nfsWorkspaceVolume, node, nodeProperties, nonInheriting, none, not, note, onFailure, openGrok, override, overrideIndexTriggers, p4Trigger, p4Web, p4cleanup, p4groovy, p4sync, paneStatus, parallel, parallelsAlwaysFailFast, parameterizedCron, parameters, password, pathFilter, pattern, perforce, permanent, persistentVolumeClaim, persistentVolumeClaimWorkspaceVolume, pipeline-model, pipelineTriggers, plainText, plugin, podAnnotation, podEnvVar, podLabel, pollSCM, portMapping, preserveStashes, previewOnly, projectNamingStrategy, proxy, publish, queueItemAuthenticator, quietPeriod, qyWechatNotification, rateLimitBuilds, recipients, requestor, run, runParam, sSHLauncher, schedule, scmRetryCount, scriptApproval, scriptApprovalLink, search, secretEnvVar, secretVolume, security, shell, shelve, skipDefaultCheckout, skipStagesAfterUnstable, slave, sourceRegexFilter, sourceWildcardFilter, specFileSpec, ssh, sshUserPrivateKey, stackTrace, standard, staticSpec, status, streamSource, streamSpec, string, stringParam, submit, swapSpace, swarm, syncOnly, tag, templateSource, templateSpec, text, textParam, ticket, ticketMode, tmpSpace, toolLocation, triggeredBy, trust, unsecured, unshelve, upstream, upstreamDevelopers, user, userFilter, userSeed, usernameColonPassword, usernamePassword, viewFilter, viewPattern, viewsTabBar, weather, withAnt, zfs, zip] or globals [currentBuild, docker, env, params, pipeline, scm]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">acceptGitLabMR, addGitLabMRComment, archive, bat, build, catchError, checkout, container, containerLog, deleteDir, dir, dockerFingerprintFrom, dockerFingerprintRun, dockerNode, echo, emailext, emailextrecipients, envVarsForTool, error, fileExists, findBuildScans, getContext, git, gitlabBuilds, gitlabCommitStatus, httpRequest, input, isUnix, junit, library, libraryResource, load, lock, mail, milestone, node, p4, p4approve, p4publish, p4sync, p4tag, p4unshelve, parallel, podTemplate, powershell, properties, publishHTML, pwd, pwsh, readFile, readTrusted, resolveScm, retry, script, sh, sleep, stage, stash, step, svn, timeout, timestamps, tm, tool, unarchive, unstable, unstash, updateGitlabCommitStatus, validateDeclarativePipeline, waitUntil, warnError, withContext, withCredentials, withDockerContainer, withDockerRegistry, withDockerServer, withEnv, wrap, writeFile, ws] or symbols [all, allOf, allure, always, ant, antFromApache, antOutcome, antTarget, any, anyOf, apiToken, approve, architecture, archiveArtifacts, artifactManager, attach, authorizationMatrix, autoClean, batchFile, bitbucket, booleanParam, branch, brokenBuildSuspects, brokenTestsSuspects, buildButton, buildDescription, buildDiscarder, buildName, buildTimestamp, buildTimestampExtraProperties, buildingTag, caseInsensitive, caseSensitive, certificate, changeRequest, changelog, changeset, checkoutToSubdirectory, choice, choiceParam, cleanWs, cleanup, clientSpec, clock, cloud, command, configMapVolume, containerEnvVar, containerLivenessProbe, containerTemplate, credentials, cron, crumb, culprits, default, defaultView, demand, depotSource, developers, disableConcurrentBuilds, disableResume, docker, dockerCert, dockerfile, downloadSettings, downstream, dumb, durabilityHint, dynamicPVC, emptyDirVolume, emptyDirWorkspaceVolume, envVar, envVars, environment, equals, expression, file, fileParam, filePath, fingerprint, fishEye, flushOnly, forceClean, frameOptions, freeStyle, freeStyleJob, fromScm, fromSource, git, gitBranchDiscovery, gitHubBranchDiscovery, gitHubBranchHeadAuthority, gitHubForkDiscovery, gitHubSshCheckout, gitHubTagDiscovery, gitHubTrustContributors, gitHubTrustEveryone, gitHubTrustNobody, gitHubTrustPermissions, gitLabConnection, gitTagDiscovery, github, githubPush, gitlab, globalLib, gradle, graphClean, graphSource, headRegexFilter, headWildcardFilter, hostPathVolume, hostPathWorkspaceVolume, hyperlink, hyperlinkToModels, incremental, inheriting, inheritingGlobal, installSource, isRestartedRun, jdk, jdkInstaller, jgit, jgitapache, jnlp, jobName, kubernetes, label, lastDuration, lastFailure, lastGrantedAuthorities, lastStable, lastSuccess, legacy, legacySCM, list, local, location, logRotator, loggedInUsersCanDoAnything, manualSpec, masterBuild, matrix, maven, maven3Mojos, mavenErrors, mavenMojos, mavenWarnings, merge, modernSCM, multiBranch, multiGraph, multiStreams, multiSwarm, myView, never, newContainerPerStage, nfsVolume, nfsWorkspaceVolume, node, nodeProperties, nonInheriting, none, not, note, onFailure, openGrok, override, overrideIndexTriggers, p4Trigger, p4Web, p4cleanup, p4groovy, p4sync, paneStatus, parallel, parallelsAlwaysFailFast, parameterizedCron, parameters, password, pathFilter, pattern, perforce, permanent, persistentVolumeClaim, persistentVolumeClaimWorkspaceVolume, pipeline-model, pipelineTriggers, plainText, plugin, podAnnotation, podEnvVar, podLabel, pollSCM, portMapping, preserveStashes, previewOnly, projectNamingStrategy, proxy, publish, queueItemAuthenticator, quietPeriod, qyWechatNotification, rateLimitBuilds, recipients, requestor, run, runParam, sSHLauncher, schedule, scmRetryCount, scriptApproval, scriptApprovalLink, search, secretEnvVar, secretVolume, security, shell, shelve, skipDefaultCheckout, skipStagesAfterUnstable, slave, sourceRegexFilter, sourceWildcardFilter, specFileSpec, ssh, sshUserPrivateKey, stackTrace, standard, staticSpec, status, streamSource, streamSpec, string, stringParam, submit, swapSpace, swarm, syncOnly, tag, templateSource, templateSpec, text, textParam, ticket, ticketMode, tmpSpace, toolLocation, triggeredBy, trust, unsecured, unshelve, upstream, upstreamDevelopers, user, userFilter, userSeed, usernameColonPassword, usernamePassword, viewFilter, viewPattern, viewsTabBar, weather, withAnt, zfs, zip] or globals [currentBuild, docker, env, params, pipeline, scm]</span></span></code></pre></div><h1 id="_2-企业微信python" tabindex="-1">2.<strong>企业微信python</strong> <a class="header-anchor" href="#_2-企业微信python" aria-label="Permalink to &quot;2.**企业微信python**&quot;">​</a></h1><h2 id="企业微信配置" tabindex="-1">企业微信配置 <a class="header-anchor" href="#企业微信配置" aria-label="Permalink to &quot;企业微信配置&quot;">​</a></h2><p>如上图，首先创建一个群组，然后通过“...”，弹出快捷菜单，创建机器人，然后使用webhook地址进行配置。详细的机器人配置方式地址：<a href="https://work.weixin.qq.com/api/doc/90000/90136/91770" target="_blank" rel="noreferrer"> https://work.weixin.qq.com/api/doc/90000/90136/91770</a></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406242139794.png" alt=""></p><h2 id="_3、jenkins插件" tabindex="-1">3、jenkins插件 <a class="header-anchor" href="#_3、jenkins插件" aria-label="Permalink to &quot;3、jenkins插件&quot;">​</a></h2><p>&#39;Extended Choice Parameter&#39;：实现复选框功能</p><p>&#39;Execute Python script&#39;：实现获取jenkins内置环境变量</p><p>&#39;Build Timestamp Plugin&#39;：实现获取job构建时间</p><p>任务中，多选框配置如下图：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406242139431.png" alt=""></p><p>name：AlarmContact，用于下面Python环境变量中获取value值</p><p>Description：选择发布联系人，解释说明</p><p>Parameter Type：Check Boxes，表示多选或单选</p><p>Number of Visible Items：10，表示当前页面展示10条</p><p>Delimiter：，表示value的分隔符</p><p>value：企业微信的’weixin_id‘,特别注意</p><h2 id="python环境变量配置如下图" tabindex="-1">Python环境变量配置如下图： <a class="header-anchor" href="#python环境变量配置如下图" aria-label="Permalink to &quot;Python环境变量配置如下图：&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406242140744.png" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/usr/bin/python3</span></span>
<span class="line"><span style="color:#e1e4e8;"># -*- coding: iso-8859-15 -*-</span></span>
<span class="line"><span style="color:#e1e4e8;">import os</span></span>
<span class="line"><span style="color:#e1e4e8;"># 获取的都是jenkins内置环境变量</span></span>
<span class="line"><span style="color:#e1e4e8;">BuildTime=os.getenv(&quot;BUILD_TIMESTAMP&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">BuildNumber=os.getenv(&quot;BUILD_NUMBER&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">JobName=os.getenv(&quot;JOB_NAME&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">UrlJob=os.getenv(&quot;BUILD_URL&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">alarm_contact=os.getenv(&quot;AlarmContact&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">GitCommit=os.getenv(&quot;GIT_COMMIT&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">GIT_BRANCH=os.getenv(&quot;GIT_BRANCH&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">WeChat_url = &quot;企业微信上webhook地址&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">import json</span></span>
<span class="line"><span style="color:#e1e4e8;">import requests</span></span>
<span class="line"><span style="color:#e1e4e8;">import sys</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">data = json.dumps(</span></span>
<span class="line"><span style="color:#e1e4e8;">            {</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;msgtype&quot;: &quot;markdown&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;markdown&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    &quot;content&quot;: &quot;# &lt;font color=\\&quot;warning\\&quot;&gt;jenkins发布提醒&lt;/font&gt; \\n&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                               &quot;&gt;任务名称：&lt;font color=\\&quot;info\\&quot;&gt;%s&lt;/font&gt; \\n&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                               &quot;&gt;构建时间：&lt;font color=\\&quot;info\\&quot;&gt;%s&lt;/font&gt; \\n&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                               &quot;&gt;任务分支：&lt;font color=\\&quot;comment\\&quot;&gt;%s&lt;/font&gt; \\n&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                               &quot;&gt;构建次数：&lt;font color=\\&quot;comment\\&quot;&gt;%s&lt;/font&gt; \\n&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                               &quot;&gt;任务地址：[%s](%s) \\n&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                               &quot;&gt;构建版本：&lt;font color=\\&quot;comment\\&quot;&gt;%s&lt;/font&gt; \\n&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                               &quot;&gt;任务已构建完成确认：&lt;font color=\\&quot;info\\&quot;&gt;%s&lt;/font&gt; \\n&quot;  %(JobName, BuildTime,GIT_BRANCH,BuildNumber,UrlJob, UrlJob,GitCommit,alarm_contact),</span></span>
<span class="line"><span style="color:#e1e4e8;">                },</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        )</span></span>
<span class="line"><span style="color:#e1e4e8;">requests.post(WeChat_url, data, auth=(&#39;Content-Type&#39;, &#39;application/json&#39;))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/usr/bin/python3</span></span>
<span class="line"><span style="color:#24292e;"># -*- coding: iso-8859-15 -*-</span></span>
<span class="line"><span style="color:#24292e;">import os</span></span>
<span class="line"><span style="color:#24292e;"># 获取的都是jenkins内置环境变量</span></span>
<span class="line"><span style="color:#24292e;">BuildTime=os.getenv(&quot;BUILD_TIMESTAMP&quot;)</span></span>
<span class="line"><span style="color:#24292e;">BuildNumber=os.getenv(&quot;BUILD_NUMBER&quot;)</span></span>
<span class="line"><span style="color:#24292e;">JobName=os.getenv(&quot;JOB_NAME&quot;)</span></span>
<span class="line"><span style="color:#24292e;">UrlJob=os.getenv(&quot;BUILD_URL&quot;)</span></span>
<span class="line"><span style="color:#24292e;">alarm_contact=os.getenv(&quot;AlarmContact&quot;)</span></span>
<span class="line"><span style="color:#24292e;">GitCommit=os.getenv(&quot;GIT_COMMIT&quot;)</span></span>
<span class="line"><span style="color:#24292e;">GIT_BRANCH=os.getenv(&quot;GIT_BRANCH&quot;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">WeChat_url = &quot;企业微信上webhook地址&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">import json</span></span>
<span class="line"><span style="color:#24292e;">import requests</span></span>
<span class="line"><span style="color:#24292e;">import sys</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">data = json.dumps(</span></span>
<span class="line"><span style="color:#24292e;">            {</span></span>
<span class="line"><span style="color:#24292e;">                &quot;msgtype&quot;: &quot;markdown&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                &quot;markdown&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">                    &quot;content&quot;: &quot;# &lt;font color=\\&quot;warning\\&quot;&gt;jenkins发布提醒&lt;/font&gt; \\n&quot;</span></span>
<span class="line"><span style="color:#24292e;">                               &quot;&gt;任务名称：&lt;font color=\\&quot;info\\&quot;&gt;%s&lt;/font&gt; \\n&quot;</span></span>
<span class="line"><span style="color:#24292e;">                               &quot;&gt;构建时间：&lt;font color=\\&quot;info\\&quot;&gt;%s&lt;/font&gt; \\n&quot;</span></span>
<span class="line"><span style="color:#24292e;">                               &quot;&gt;任务分支：&lt;font color=\\&quot;comment\\&quot;&gt;%s&lt;/font&gt; \\n&quot;</span></span>
<span class="line"><span style="color:#24292e;">                               &quot;&gt;构建次数：&lt;font color=\\&quot;comment\\&quot;&gt;%s&lt;/font&gt; \\n&quot;</span></span>
<span class="line"><span style="color:#24292e;">                               &quot;&gt;任务地址：[%s](%s) \\n&quot;</span></span>
<span class="line"><span style="color:#24292e;">                               &quot;&gt;构建版本：&lt;font color=\\&quot;comment\\&quot;&gt;%s&lt;/font&gt; \\n&quot;</span></span>
<span class="line"><span style="color:#24292e;">                               &quot;&gt;任务已构建完成确认：&lt;font color=\\&quot;info\\&quot;&gt;%s&lt;/font&gt; \\n&quot;  %(JobName, BuildTime,GIT_BRANCH,BuildNumber,UrlJob, UrlJob,GitCommit,alarm_contact),</span></span>
<span class="line"><span style="color:#24292e;">                },</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        )</span></span>
<span class="line"><span style="color:#24292e;">requests.post(WeChat_url, data, auth=(&#39;Content-Type&#39;, &#39;application/json&#39;))</span></span></code></pre></div>`,35),o=[t];function p(c,i,r,u,y,d){return e(),n("div",null,o)}const h=s(l,[["render",p]]);export{g as __pageData,h as default};
