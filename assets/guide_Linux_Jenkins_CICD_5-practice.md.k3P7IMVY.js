import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"语法","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/CICD/5-practice.md","filePath":"guide/Linux/Jenkins/CICD/5-practice.md","lastUpdated":1720533756000}'),p={name:"guide/Linux/Jenkins/CICD/5-practice.md"},e=l(`<h1 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-label="Permalink to &quot;语法&quot;">​</a></h1><blockquote><p>内置语法</p></blockquote><p><a href="http://192.168.0.137:9191/pipeline-syntax/" target="_blank" rel="noreferrer">http://192.168.0.137:9191/pipeline-syntax/</a></p><p><a href="https://jenkins.io/zh/doc/book/blueocean/creating-pipelines/" target="_blank" rel="noreferrer">https://jenkins.io/zh/doc/book/blueocean/creating-pipelines/</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">    agent any</span></span>
<span class="line"><span style="color:#e1e4e8;">    stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Build&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                println &quot;Build&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Test&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                println &quot;Test&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Deploy&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                println &quot;Deploy&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">//</span></span>
<span class="line"><span style="color:#e1e4e8;">    post { //这里定义的是后置处理</span></span>
<span class="line"><span style="color:#e1e4e8;">        success {</span></span>
<span class="line"><span style="color:#e1e4e8;">            // 构建成功</span></span>
<span class="line"><span style="color:#e1e4e8;">            echo &#39;构建完成，正在清理工作空间&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">            cleanWs();</span></span>
<span class="line"><span style="color:#e1e4e8;">            echo &#39;清理工作空间完成&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        failure {</span></span>
<span class="line"><span style="color:#e1e4e8;">            // 构建失败，这里使用sh是因为echo不支持使用参数</span></span>
<span class="line"><span style="color:#e1e4e8;">            sh &#39;echo &quot;构建失败，详情请查看$WORKSPACE&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        aborted {</span></span>
<span class="line"><span style="color:#e1e4e8;">            // 构建被中止</span></span>
<span class="line"><span style="color:#e1e4e8;">            echo &#39;构建被中止&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">    agent any</span></span>
<span class="line"><span style="color:#24292e;">    stages {</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Build&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                println &quot;Build&quot;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Test&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                println &quot;Test&quot;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Deploy&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                println &quot;Deploy&quot;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">//</span></span>
<span class="line"><span style="color:#24292e;">    post { //这里定义的是后置处理</span></span>
<span class="line"><span style="color:#24292e;">        success {</span></span>
<span class="line"><span style="color:#24292e;">            // 构建成功</span></span>
<span class="line"><span style="color:#24292e;">            echo &#39;构建完成，正在清理工作空间&#39;</span></span>
<span class="line"><span style="color:#24292e;">            cleanWs();</span></span>
<span class="line"><span style="color:#24292e;">            echo &#39;清理工作空间完成&#39;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        failure {</span></span>
<span class="line"><span style="color:#24292e;">            // 构建失败，这里使用sh是因为echo不支持使用参数</span></span>
<span class="line"><span style="color:#24292e;">            sh &#39;echo &quot;构建失败，详情请查看$WORKSPACE&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        aborted {</span></span>
<span class="line"><span style="color:#24292e;">            // 构建被中止</span></span>
<span class="line"><span style="color:#24292e;">            echo &#39;构建被中止&#39;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>切换目录</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> stage(&#39;Build&#39;) { </span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                dir(&#39;demo&#39;) { //切换目录到demo</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //执行构建镜像命令，这里起作用的是maven的插件</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //可以参考https://github.com/hellxz/SpringBoot-DockerDemo.git的使用方法，在docker-maven-plugin-2分支</span></span>
<span class="line"><span style="color:#e1e4e8;">                    sh &#39;mvn clean package docker:build -DskipTests&#39;  </span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> stage(&#39;Build&#39;) { </span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                dir(&#39;demo&#39;) { //切换目录到demo</span></span>
<span class="line"><span style="color:#24292e;">                    //执行构建镜像命令，这里起作用的是maven的插件</span></span>
<span class="line"><span style="color:#24292e;">                    //可以参考https://github.com/hellxz/SpringBoot-DockerDemo.git的使用方法，在docker-maven-plugin-2分支</span></span>
<span class="line"><span style="color:#24292e;">                    sh &#39;mvn clean package docker:build -DskipTests&#39;  </span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span></code></pre></div><ul><li>git clone</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">stage(</span><span style="color:#B392F0;">&#39;Pull Git Demo&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">steps</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">//清理工作空间</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">cleanWs</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">//拉取代码</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">checkout([$class:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;GitSCM&#39;,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">branches:</span><span style="color:#E1E4E8;"> [[name: </span><span style="color:#9ECBFF;">&#39;*/docker-maven-plugin-2&#39;]],</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">doGenerateSubmoduleConfigurations:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#9ECBFF;">,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">extensions:</span><span style="color:#E1E4E8;"> [[$class: </span><span style="color:#9ECBFF;">&#39;RelativeTargetDirectory&#39;,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">relativeTargetDir:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;demo&#39;]],</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">submoduleCfg:</span><span style="color:#E1E4E8;"> [], userRemoteConfigs: [[url: </span><span style="color:#9ECBFF;">&#39;https://github.com/hellxz/SpringBoot-DockerDemo.git&#39;</span><span style="color:#E1E4E8;">]]])</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">stage(</span><span style="color:#6F42C1;">&#39;Pull Git Demo&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">steps</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">//清理工作空间</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">cleanWs</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">//拉取代码</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">checkout([$class:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;GitSCM&#39;,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">branches:</span><span style="color:#24292E;"> [[name: </span><span style="color:#032F62;">&#39;*/docker-maven-plugin-2&#39;]],</span><span style="color:#24292E;"> </span><span style="color:#032F62;">doGenerateSubmoduleConfigurations:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#032F62;">,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">extensions:</span><span style="color:#24292E;"> [[$class: </span><span style="color:#032F62;">&#39;RelativeTargetDirectory&#39;,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">relativeTargetDir:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;demo&#39;]],</span><span style="color:#24292E;"> </span><span style="color:#032F62;">submoduleCfg:</span><span style="color:#24292E;"> [], userRemoteConfigs: [[url: </span><span style="color:#032F62;">&#39;https://github.com/hellxz/SpringBoot-DockerDemo.git&#39;</span><span style="color:#24292E;">]]])</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span></code></pre></div><h1 id="_2-shell命令的标准输出或者状态" tabindex="-1">2.shell命令的标准输出或者状态 <a class="header-anchor" href="#_2-shell命令的标准输出或者状态" aria-label="Permalink to &quot;2.shell命令的标准输出或者状态&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//获取标准输出</span></span>
<span class="line"><span style="color:#e1e4e8;">//第一种</span></span>
<span class="line"><span style="color:#e1e4e8;">result = sh returnStdout: true ,script: &quot;&lt;shell command&gt;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">result = result.trim()</span></span>
<span class="line"><span style="color:#e1e4e8;">//第二种</span></span>
<span class="line"><span style="color:#e1e4e8;">result = sh (script: &quot;&lt;shell command&gt;&quot;, returnStdout: true).trim()</span></span>
<span class="line"><span style="color:#e1e4e8;">//第三种</span></span>
<span class="line"><span style="color:#e1e4e8;">sh &quot;&lt;shell command&gt; &gt; commandResult&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">result = readFile(&#39;commandResult&#39;).trim()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//获取执行状态</span></span>
<span class="line"><span style="color:#e1e4e8;">//第一种</span></span>
<span class="line"><span style="color:#e1e4e8;">result = sh returnStatus: true ,script: &quot;&lt;shell command&gt;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">result = result.trim()</span></span>
<span class="line"><span style="color:#e1e4e8;">//第二种</span></span>
<span class="line"><span style="color:#e1e4e8;">result = sh (script: &quot;&lt;shell command&gt;&quot;, returnStatus: true).trim()</span></span>
<span class="line"><span style="color:#e1e4e8;">//第三种</span></span>
<span class="line"><span style="color:#e1e4e8;">sh &#39;&lt;shell command&gt;; echo $? &gt; status&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">def r = readFile(&#39;status&#39;).trim()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//获取标准输出</span></span>
<span class="line"><span style="color:#24292e;">//第一种</span></span>
<span class="line"><span style="color:#24292e;">result = sh returnStdout: true ,script: &quot;&lt;shell command&gt;&quot;</span></span>
<span class="line"><span style="color:#24292e;">result = result.trim()</span></span>
<span class="line"><span style="color:#24292e;">//第二种</span></span>
<span class="line"><span style="color:#24292e;">result = sh (script: &quot;&lt;shell command&gt;&quot;, returnStdout: true).trim()</span></span>
<span class="line"><span style="color:#24292e;">//第三种</span></span>
<span class="line"><span style="color:#24292e;">sh &quot;&lt;shell command&gt; &gt; commandResult&quot;</span></span>
<span class="line"><span style="color:#24292e;">result = readFile(&#39;commandResult&#39;).trim()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//获取执行状态</span></span>
<span class="line"><span style="color:#24292e;">//第一种</span></span>
<span class="line"><span style="color:#24292e;">result = sh returnStatus: true ,script: &quot;&lt;shell command&gt;&quot;</span></span>
<span class="line"><span style="color:#24292e;">result = result.trim()</span></span>
<span class="line"><span style="color:#24292e;">//第二种</span></span>
<span class="line"><span style="color:#24292e;">result = sh (script: &quot;&lt;shell command&gt;&quot;, returnStatus: true).trim()</span></span>
<span class="line"><span style="color:#24292e;">//第三种</span></span>
<span class="line"><span style="color:#24292e;">sh &#39;&lt;shell command&gt;; echo $? &gt; status&#39;</span></span>
<span class="line"><span style="color:#24292e;">def r = readFile(&#39;status&#39;).trim()</span></span></code></pre></div><p>groovy语句写法为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">    def exitValue = sh(script: &quot;grep -i &#39;xxx&#39; /etc/myfolder&quot;, returnStatus: true)</span></span>
<span class="line"><span style="color:#e1e4e8;">    echo &quot;return exitValue :\${exitValue}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    if(exitValue != 0){</span></span>
<span class="line"><span style="color:#e1e4e8;">    	执行操作</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">如果grep命令执行没有报错，正常情况下exitValue为0，报错则为非0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">    def exitValue = sh(script: &quot;grep -i &#39;xxx&#39; /etc/myfolder&quot;, returnStatus: true)</span></span>
<span class="line"><span style="color:#24292e;">    echo &quot;return exitValue :\${exitValue}&quot;</span></span>
<span class="line"><span style="color:#24292e;">    if(exitValue != 0){</span></span>
<span class="line"><span style="color:#24292e;">    	执行操作</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">如果grep命令执行没有报错，正常情况下exitValue为0，报错则为非0</span></span></code></pre></div><ul><li>输出日志</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> stage(&#39;输出日志&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                script{</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //调用方法得到日志 并 输出</span></span>
<span class="line"><span style="color:#e1e4e8;">                    def changeString = getChangeString()</span></span>
<span class="line"><span style="color:#e1e4e8;">                    echo &quot;$changeString&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> stage(&#39;输出日志&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                script{</span></span>
<span class="line"><span style="color:#24292e;">                    //调用方法得到日志 并 输出</span></span>
<span class="line"><span style="color:#24292e;">                    def changeString = getChangeString()</span></span>
<span class="line"><span style="color:#24292e;">                    echo &quot;$changeString&quot;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span></code></pre></div><h2 id="_3-输出保存到变量" tabindex="-1">3.输出保存到变量 <a class="header-anchor" href="#_3-输出保存到变量" aria-label="Permalink to &quot;3.输出保存到变量&quot;">​</a></h2><h3 id="stdout" tabindex="-1">StdOut <a class="header-anchor" href="#stdout" aria-label="Permalink to &quot;StdOut&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline{</span></span>
<span class="line"><span style="color:#e1e4e8;">  agent any</span></span>
<span class="line"><span style="color:#e1e4e8;">  stages{</span></span>
<span class="line"><span style="color:#e1e4e8;">    stage(&#39;sh输出&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">      steps{</span></span>
<span class="line"><span style="color:#e1e4e8;">        script{</span></span>
<span class="line"><span style="color:#e1e4e8;">          out = sh(</span></span>
<span class="line"><span style="color:#e1e4e8;">            label: &#39;listing directory&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            returnStdout: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">            script: &quot;ls /&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          )</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#这段话将运行 script 指定的命令，也就是 ls / 的标准输出 StdOut 赋值给 out 变量</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline{</span></span>
<span class="line"><span style="color:#24292e;">  agent any</span></span>
<span class="line"><span style="color:#24292e;">  stages{</span></span>
<span class="line"><span style="color:#24292e;">    stage(&#39;sh输出&#39;){</span></span>
<span class="line"><span style="color:#24292e;">      steps{</span></span>
<span class="line"><span style="color:#24292e;">        script{</span></span>
<span class="line"><span style="color:#24292e;">          out = sh(</span></span>
<span class="line"><span style="color:#24292e;">            label: &#39;listing directory&#39;,</span></span>
<span class="line"><span style="color:#24292e;">            returnStdout: true,</span></span>
<span class="line"><span style="color:#24292e;">            script: &quot;ls /&quot;</span></span>
<span class="line"><span style="color:#24292e;">          )</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#这段话将运行 script 指定的命令，也就是 ls / 的标准输出 StdOut 赋值给 out 变量</span></span></code></pre></div><h3 id="stderr" tabindex="-1">StdErr <a class="header-anchor" href="#stderr" aria-label="Permalink to &quot;StdErr&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">out = sh(</span></span>
<span class="line"><span style="color:#e1e4e8;">  label: &#39;listing directory&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  returnStdout: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">  script: &quot;ls /notExist&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">这个命令将在标准错误 StdErr 输出下面的信息：</span></span>
<span class="line"><span style="color:#e1e4e8;">ls: cannot access /notExist: No such file or directory</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#然而标准输出 StdOut 则为空。那么上面这种 Pipeline 写法有两个问题：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">不能返回执行命令的标准错误信息，只能返回 StdOut 内容，异常情况下为空</span></span>
<span class="line"><span style="color:#e1e4e8;">不能抛错，使当前和后续 stage 停止，也不能中断整个任务，更不能将整个任务的状态标记为 Failure</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">out = sh(</span></span>
<span class="line"><span style="color:#24292e;">  label: &#39;listing directory&#39;,</span></span>
<span class="line"><span style="color:#24292e;">  returnStdout: true,</span></span>
<span class="line"><span style="color:#24292e;">  script: &quot;ls /notExist&quot;</span></span>
<span class="line"><span style="color:#24292e;">)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">这个命令将在标准错误 StdErr 输出下面的信息：</span></span>
<span class="line"><span style="color:#24292e;">ls: cannot access /notExist: No such file or directory</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#然而标准输出 StdOut 则为空。那么上面这种 Pipeline 写法有两个问题：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">不能返回执行命令的标准错误信息，只能返回 StdOut 内容，异常情况下为空</span></span>
<span class="line"><span style="color:#24292e;">不能抛错，使当前和后续 stage 停止，也不能中断整个任务，更不能将整个任务的状态标记为 Failure</span></span></code></pre></div><p>目前的 Jenkins 版本，不提供输出标准错误 StdErr 的方法，不过可以通过下面的做法绕过：</p><ul><li>标准错误合并输出到标准输出，再输出到文件</li><li>判断运行状态 returnStatus</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline{</span></span>
<span class="line"><span style="color:#e1e4e8;">  agent any</span></span>
<span class="line"><span style="color:#e1e4e8;">  stages{</span></span>
<span class="line"><span style="color:#e1e4e8;">    stage(&#39;sh输出&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">      steps{</span></span>
<span class="line"><span style="color:#e1e4e8;">        script{</span></span>
<span class="line"><span style="color:#e1e4e8;">          status = sh(</span></span>
<span class="line"><span style="color:#e1e4e8;">            label: &#39;listing directory&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            // 返回运行状态</span></span>
<span class="line"><span style="color:#e1e4e8;">            returnStatus: true, </span></span>
<span class="line"><span style="color:#e1e4e8;">            // 合并标准错误 StdErr 到文件和标准输出 StdOut</span></span>
<span class="line"><span style="color:#e1e4e8;">            script: &quot;ls /ff \\&gt;test.log 2&gt;&amp;1&quot; </span></span>
<span class="line"><span style="color:#e1e4e8;">          )</span></span>
<span class="line"><span style="color:#e1e4e8;">          // 从文件读出标准错误 StdErr 信息</span></span>
<span class="line"><span style="color:#e1e4e8;">          out = readFile(file: &quot;test.log&quot;) </span></span>
<span class="line"><span style="color:#e1e4e8;">          if (status != 0) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            // 使当前 stage 运行失败，同时输出错误信息。</span></span>
<span class="line"><span style="color:#e1e4e8;">            error(&#39;TEST FAILED.&#39;) </span></span>
<span class="line"><span style="color:#e1e4e8;">          }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline{</span></span>
<span class="line"><span style="color:#24292e;">  agent any</span></span>
<span class="line"><span style="color:#24292e;">  stages{</span></span>
<span class="line"><span style="color:#24292e;">    stage(&#39;sh输出&#39;){</span></span>
<span class="line"><span style="color:#24292e;">      steps{</span></span>
<span class="line"><span style="color:#24292e;">        script{</span></span>
<span class="line"><span style="color:#24292e;">          status = sh(</span></span>
<span class="line"><span style="color:#24292e;">            label: &#39;listing directory&#39;,</span></span>
<span class="line"><span style="color:#24292e;">            // 返回运行状态</span></span>
<span class="line"><span style="color:#24292e;">            returnStatus: true, </span></span>
<span class="line"><span style="color:#24292e;">            // 合并标准错误 StdErr 到文件和标准输出 StdOut</span></span>
<span class="line"><span style="color:#24292e;">            script: &quot;ls /ff \\&gt;test.log 2&gt;&amp;1&quot; </span></span>
<span class="line"><span style="color:#24292e;">          )</span></span>
<span class="line"><span style="color:#24292e;">          // 从文件读出标准错误 StdErr 信息</span></span>
<span class="line"><span style="color:#24292e;">          out = readFile(file: &quot;test.log&quot;) </span></span>
<span class="line"><span style="color:#24292e;">          if (status != 0) {</span></span>
<span class="line"><span style="color:#24292e;">            // 使当前 stage 运行失败，同时输出错误信息。</span></span>
<span class="line"><span style="color:#24292e;">            error(&#39;TEST FAILED.&#39;) </span></span>
<span class="line"><span style="color:#24292e;">          }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_4-重试次数" tabindex="-1">4.重试次数 <a class="header-anchor" href="#_4-重试次数" aria-label="Permalink to &quot;4.重试次数&quot;">​</a></h1><p>实现重试的方法，是在 stage 内部增加 options，如下面的 Jenkinsfile 所示。</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">stage(</span><span style="color:#9ECBFF;">&#39;some node&#39;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">  agent {</span></span>
<span class="line"><span style="color:#E1E4E8;">    label </span><span style="color:#9ECBFF;">&#39;some agent&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  options{</span></span>
<span class="line"><span style="color:#E1E4E8;">    retry(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  steps{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 其他任务</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">stage(</span><span style="color:#032F62;">&#39;some node&#39;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">  agent {</span></span>
<span class="line"><span style="color:#24292E;">    label </span><span style="color:#032F62;">&#39;some agent&#39;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  options{</span></span>
<span class="line"><span style="color:#24292E;">    retry(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  steps{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 其他任务</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_5-如何及时中止pipeline" tabindex="-1">5.如何及时中止pipeline <a class="header-anchor" href="#_5-如何及时中止pipeline" aria-label="Permalink to &quot;5.如何及时中止pipeline&quot;">​</a></h1><h2 id="场景" tabindex="-1">场景 <a class="header-anchor" href="#场景" aria-label="Permalink to &quot;场景&quot;">​</a></h2><p>使用Jenkins的流水线时，有时明明某些Python或Shell执行结果错误，但仍会继续运行下去，甚至于最终提示成功。这并不合我们的预期——出现错误及时停止。当然，还有那种小错误不影响构建的，希望继续执行下去的情况。</p><p>所以，场景有两个：</p><ul><li>希望发现错误，及时中止执行的情况。</li><li>希望错误发生时，脚本仍继续执行的情况。</li></ul><p>本文以上两种场景分别给出示例。</p><blockquote><p>本文不考虑能被pipeline捕获的异常中断。</p></blockquote><h2 id="及时中止-如何做" tabindex="-1">及时中止，如何做？ <a class="header-anchor" href="#及时中止-如何做" aria-label="Permalink to &quot;及时中止，如何做？&quot;">​</a></h2><p>1、对于Jenkins流水线中，使用groovy语法实现的功能，可以考虑使用Java的异常。</p><p>示例：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">stage(</span><span style="color:#9ECBFF;">&#39;test&#39;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">	step{</span></span>
<span class="line"><span style="color:#E1E4E8;">		script{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> res </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> someGroovyMethod()</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(res </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">RuntimeException</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;提示信息&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">stage(</span><span style="color:#032F62;">&#39;test&#39;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">	step{</span></span>
<span class="line"><span style="color:#24292E;">		script{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> res </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> someGroovyMethod()</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(res </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">RuntimeException</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;提示信息&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>2、对于流水线中调用Shell，可以考虑匹配返回值，抛异常。</p><p>示例：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">stage(</span><span style="color:#9ECBFF;">&#39;test&#39;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">	step{</span></span>
<span class="line"><span style="color:#E1E4E8;">		script{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> res </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sh(</span><span style="color:#79B8FF;">label</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;测试分支是否存在：&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">script</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">						echo &#39;hello world!&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">						&quot;&quot;&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">returnStdout</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">res</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">contains(</span><span style="color:#9ECBFF;">&quot;hello world&quot;</span><span style="color:#E1E4E8;">)){</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">RuntimeException</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;提示信息&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">stage(</span><span style="color:#032F62;">&#39;test&#39;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">	step{</span></span>
<span class="line"><span style="color:#24292E;">		script{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> res </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sh(</span><span style="color:#005CC5;">label</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;测试分支是否存在：&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">script</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">						echo &#39;hello world!&#39;</span></span>
<span class="line"><span style="color:#032F62;">						&quot;&quot;&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">returnStdout</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">res</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">contains(</span><span style="color:#032F62;">&quot;hello world&quot;</span><span style="color:#24292E;">)){</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">RuntimeException</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;提示信息&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>除了 <code>returnStdout</code> 用于返回执行输出，还可以使用 <code>returnStatus</code>，<code>returnStatus</code> 与 <code>returnStdout</code> 不能同时使用，<code>returnStatus</code> 表示脚本执行完毕的返回值是0还是非0，非0值即有问题的。</p></blockquote><p>3、对于以上两种情况，只要能获取返回输出或状态，就可以终止流水线，使用 <code>error</code>。</p><p>示例：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">stage(</span><span style="color:#9ECBFF;">&#39;test&#39;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">	step{</span></span>
<span class="line"><span style="color:#E1E4E8;">		script{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> res </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> someGroovyMethod()</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(res </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">				error </span><span style="color:#9ECBFF;">&#39;提示信息&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">stage(</span><span style="color:#032F62;">&#39;test&#39;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">	step{</span></span>
<span class="line"><span style="color:#24292E;">		script{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> res </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> someGroovyMethod()</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(res </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">				error </span><span style="color:#032F62;">&#39;提示信息&#39;</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="报错忽略-如何做" tabindex="-1">报错忽略，如何做？ <a class="header-anchor" href="#报错忽略-如何做" aria-label="Permalink to &quot;报错忽略，如何做？&quot;">​</a></h2><p>1、使用异常捕获，try-catch block 或 try-catch-finally block。</p><p>示例：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">stage(</span><span style="color:#9ECBFF;">&#39;test&#39;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">	step{</span></span>
<span class="line"><span style="color:#E1E4E8;">		script{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">				someMethodMaybeThrowException()</span></span>
<span class="line"><span style="color:#E1E4E8;">			} </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">Exception</span><span style="color:#E1E4E8;"> e){</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#6A737D;">// do something you want. e.g,print logs.</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">stage(</span><span style="color:#032F62;">&#39;test&#39;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">	step{</span></span>
<span class="line"><span style="color:#24292E;">		script{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">try</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">				someMethodMaybeThrowException()</span></span>
<span class="line"><span style="color:#24292E;">			} </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">Exception</span><span style="color:#24292E;"> e){</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6A737D;">// do something you want. e.g,print logs.</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>2、使用Jenkins 流水线中的 <code>catchError</code> 忽略异常或可能中断构建的错误。</p><p>示例：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">stage(</span><span style="color:#9ECBFF;">&#39;test&#39;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">	step{</span></span>
<span class="line"><span style="color:#E1E4E8;">		script{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">//无论是否会报错，这个stage以及构建结果都不会因这个错误而失败。</span></span>
<span class="line"><span style="color:#E1E4E8;">			catchError(</span><span style="color:#79B8FF;">buildResult</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;SUCCESS&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">catchInterruptions</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			    someMethodMaybeThrowException()</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#6A737D;">//some post step will continued.</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">stage(</span><span style="color:#032F62;">&#39;test&#39;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">	step{</span></span>
<span class="line"><span style="color:#24292E;">		script{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">//无论是否会报错，这个stage以及构建结果都不会因这个错误而失败。</span></span>
<span class="line"><span style="color:#24292E;">			catchError(</span><span style="color:#005CC5;">buildResult</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;SUCCESS&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">catchInterruptions</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">			    someMethodMaybeThrowException()</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6A737D;">//some post step will continued.</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p><code>catchError</code> 的玩法还有很多，典型应用场景是针对一些后置的操作，比如构建完成发消息给构建者，保证这个消息不会因为脚本执行中断而停止</p></blockquote><h1 id="_6-try-catch" tabindex="-1">6. try-catch <a class="header-anchor" href="#_6-try-catch" aria-label="Permalink to &quot;6. try-catch&quot;">​</a></h1><p>加上try-catch之后如果try中的语句出错就会被catch捕获输出错误信息，而不会终止程序</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">script{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        gradleHome </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tool </span><span style="color:#9ECBFF;">&quot;GRADLE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        sh </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        \${gradleHome}/bin/gradle -v</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;">(e){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(e)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">script{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        gradleHome </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tool </span><span style="color:#032F62;">&quot;GRADLE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        sh </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">        \${gradleHome}/bin/gradle -v</span></span>
<span class="line"><span style="color:#032F62;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span><span style="color:#D73A49;">catch</span><span style="color:#24292E;">(e){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(e)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h2><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> hudson.model.*;</span></span>
<span class="line"><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;"> env</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">JOB_NAME</span></span>
<span class="line"><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;"> env</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">BUILD_NUMBER</span></span>
<span class="line"><span style="color:#E1E4E8;">pipeline{</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&quot;git checkout&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps{</span></span>
<span class="line"><span style="color:#E1E4E8;">                script {</span></span>
<span class="line"><span style="color:#E1E4E8;">                checkout([$</span><span style="color:#79B8FF;">class</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;GitSCM&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">branches</span><span style="color:#E1E4E8;">: [[</span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;*/master&#39;</span><span style="color:#E1E4E8;">]], </span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">doGenerateSubmoduleConfigurations</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">extensions</span><span style="color:#E1E4E8;">: [], </span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">submoduleCfg</span><span style="color:#E1E4E8;">: [], </span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">userRemoteConfigs</span><span style="color:#E1E4E8;">: [[</span><span style="color:#79B8FF;">credentialsId</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;e3e48ed7-dbce-4642-bb18-28e0c71ab962&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;http://192.168.132.132/root/hello-world-greeting.git&#39;</span><span style="color:#E1E4E8;">]]])</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&quot;Check file download&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                script {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">                    out </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sh(</span><span style="color:#79B8FF;">script</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;ls /opt &quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">returnStdout</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">toString()</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">trim()</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;"> out</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(out</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">contains(</span><span style="color:#9ECBFF;">&quot;Python-3.7.1.tgz&quot;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                            </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;file download successfully.&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                        }</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                            sh(</span><span style="color:#9ECBFF;">&quot;exit 1&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                        }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">Exception</span><span style="color:#E1E4E8;"> e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;e&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                        error(</span><span style="color:#9ECBFF;">&quot;fond error during check file download.&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> hudson.model.*;</span></span>
<span class="line"><span style="color:#005CC5;">println</span><span style="color:#24292E;"> env</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">JOB_NAME</span></span>
<span class="line"><span style="color:#005CC5;">println</span><span style="color:#24292E;"> env</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">BUILD_NUMBER</span></span>
<span class="line"><span style="color:#24292E;">pipeline{</span></span>
<span class="line"><span style="color:#24292E;">    agent any</span></span>
<span class="line"><span style="color:#24292E;">    stages{</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&quot;git checkout&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps{</span></span>
<span class="line"><span style="color:#24292E;">                script {</span></span>
<span class="line"><span style="color:#24292E;">                checkout([$</span><span style="color:#005CC5;">class</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;GitSCM&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">branches</span><span style="color:#24292E;">: [[</span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;*/master&#39;</span><span style="color:#24292E;">]], </span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">doGenerateSubmoduleConfigurations</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">extensions</span><span style="color:#24292E;">: [], </span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">submoduleCfg</span><span style="color:#24292E;">: [], </span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">userRemoteConfigs</span><span style="color:#24292E;">: [[</span><span style="color:#005CC5;">credentialsId</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;e3e48ed7-dbce-4642-bb18-28e0c71ab962&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;http://192.168.132.132/root/hello-world-greeting.git&#39;</span><span style="color:#24292E;">]]])</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&quot;Check file download&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                script {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">                    out </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sh(</span><span style="color:#005CC5;">script</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;ls /opt &quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">returnStdout</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">toString()</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">trim()</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#005CC5;">println</span><span style="color:#24292E;"> out</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(out</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">contains(</span><span style="color:#032F62;">&quot;Python-3.7.1.tgz&quot;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">                            </span><span style="color:#005CC5;">println</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;file download successfully.&quot;</span></span>
<span class="line"><span style="color:#24292E;">                        }</span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                            sh(</span><span style="color:#032F62;">&quot;exit 1&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                        }</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">Exception</span><span style="color:#24292E;"> e) {</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#005CC5;">println</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;e&quot;</span></span>
<span class="line"><span style="color:#24292E;">                        error(</span><span style="color:#032F62;">&quot;fond error during check file download.&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_7-获取状态" tabindex="-1">7.获取状态 <a class="header-anchor" href="#_7-获取状态" aria-label="Permalink to &quot;7.获取状态&quot;">​</a></h1><p>获取执行状态</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 执行脚本，并获取脚本的exit状态，针对不同状态，做逻辑</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> run_status </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sh (</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">script</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;&quot;cd \${ROOT_BIN_PATH} &amp;&amp;  \\</span></span>
<span class="line"><span style="color:#9ECBFF;">           ./run.sh  \${env.var1} &#39;\${str_param_1}&#39; &quot;&quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">returnStatus</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;"> run_status</span></span>
<span class="line"><span style="color:#6A737D;">// 失败强制退出</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (run_status </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;脚本执行失败，强制退出&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    sh </span><span style="color:#9ECBFF;">&#39;exit 1&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 执行脚本，并获取脚本的exit状态，针对不同状态，做逻辑</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> run_status </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sh (</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">script</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;&quot;cd \${ROOT_BIN_PATH} &amp;&amp;  \\</span></span>
<span class="line"><span style="color:#032F62;">           ./run.sh  \${env.var1} &#39;\${str_param_1}&#39; &quot;&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">returnStatus</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;"> run_status</span></span>
<span class="line"><span style="color:#6A737D;">// 失败强制退出</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (run_status </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;脚本执行失败，强制退出&#39;</span></span>
<span class="line"><span style="color:#24292E;">    sh </span><span style="color:#032F62;">&#39;exit 1&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_8-在目录下执行" tabindex="-1">8.在目录下执行 <a class="header-anchor" href="#_8-在目录下执行" aria-label="Permalink to &quot;8.在目录下执行&quot;">​</a></h1><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//例 在 **.git/QloudMartUI 目录下 执行编译命令</span></span>
<span class="line"><span style="color:#E1E4E8;">dir(</span><span style="color:#9ECBFF;">&#39;QloudMartUI/qloudmart&#39;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    sh </span><span style="color:#9ECBFF;">&#39;npm install&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//例 在 **.git/QloudMartUI 目录下 执行编译命令</span></span>
<span class="line"><span style="color:#24292E;">dir(</span><span style="color:#032F62;">&#39;QloudMartUI/qloudmart&#39;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    sh </span><span style="color:#032F62;">&#39;npm install&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,62),o=[e];function t(c,r,i,y,E,u){return n(),a("div",null,o)}const g=s(p,[["render",t]]);export{h as __pageData,g as default};
