import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"一、Active-Choices-Plugin插件将十个Job合成一个","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/plus/4-Activechoices.md","filePath":"guide/Linux/Jenkins/plus/4-Activechoices.md","lastUpdated":1720606881000}'),p={name:"guide/Linux/Jenkins/plus/4-Activechoices.md"},l=a(`<h1 id="一、active-choices-plugin插件将十个job合成一个" tabindex="-1">一、Active-Choices-Plugin插件将十个Job合成一个 <a class="header-anchor" href="#一、active-choices-plugin插件将十个job合成一个" aria-label="Permalink to &quot;一、Active-Choices-Plugin插件将十个Job合成一个&quot;">​</a></h1><h2 id="_1-安装插件" tabindex="-1">1.安装插件 <a class="header-anchor" href="#_1-安装插件" aria-label="Permalink to &quot;1.安装插件&quot;">​</a></h2><ul><li>官方地址：wiki.jenkins.io/display/JEN…</li><li>安装方式：在Jenkins插件当中直接搜索即可安装。</li><li>功能说明：根据所选参数，自动调出对应参数所依赖的后续参数</li></ul><p><a href="https://plugins.jenkins.io/uno-choice/" target="_blank" rel="noreferrer">https://plugins.jenkins.io/uno-choice/</a></p><p><a href="https://plugins.jenkins.io/" target="_blank" rel="noreferrer">https://plugins.jenkins.io/</a></p><p>在jenkins&lt;管理插件&gt;中安装Active Choices插件，具体步骤略</p><h2 id="_2-使用前介绍" tabindex="-1">2.使用前介绍 <a class="header-anchor" href="#_2-使用前介绍" aria-label="Permalink to &quot;2.使用前介绍&quot;">​</a></h2><p>插件安装之后，可以在项目配置中的参数化配置中看到一些新增了的选项</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221827472.jpg" alt="ActiveChoices"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1，Active Choices Parameter（主动选择参数）</span></span>
<span class="line"><span style="color:#e1e4e8;">Active Choices参数使用Groovy脚本或Scriptler目录中的脚本动态生成构建参数的值选项列表。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2，Active Choices Reactive Parameter（主动选择反应参数）</span></span>
<span class="line"><span style="color:#e1e4e8;">根据主动选择参数的选项而提供不同的对应值或者列表选项。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3，Active Choices Reactive Reference Parameter（主动选择反应参考参数）</span></span>
<span class="line"><span style="color:#e1e4e8;">根据主动选择参数的选项而展示对应参数的一些说明，与第二项的区别在于本参数只作为说明信息，而不能够作为变量往下传递</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1，Active Choices Parameter（主动选择参数）</span></span>
<span class="line"><span style="color:#24292e;">Active Choices参数使用Groovy脚本或Scriptler目录中的脚本动态生成构建参数的值选项列表。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2，Active Choices Reactive Parameter（主动选择反应参数）</span></span>
<span class="line"><span style="color:#24292e;">根据主动选择参数的选项而提供不同的对应值或者列表选项。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3，Active Choices Reactive Reference Parameter（主动选择反应参考参数）</span></span>
<span class="line"><span style="color:#24292e;">根据主动选择参数的选项而展示对应参数的一些说明，与第二项的区别在于本参数只作为说明信息，而不能够作为变量往下传递</span></span></code></pre></div><p>1，eureka</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Gitlab地址：git@192.168.10.0:ishangjie/ishangjie-eureka-server.git</span></span>
<span class="line"><span style="color:#e1e4e8;">port：8761</span></span>
<span class="line"><span style="color:#e1e4e8;">包名：ishangjie-eureka-server-1.0.0.jar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Gitlab地址：git@192.168.10.0:ishangjie/ishangjie-eureka-server.git</span></span>
<span class="line"><span style="color:#24292e;">port：8761</span></span>
<span class="line"><span style="color:#24292e;">包名：ishangjie-eureka-server-1.0.0.jar</span></span></code></pre></div><p>2，user</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Gitlab地址：git@192.168.10.0:ishangjie/ishangjie-user-service.git</span></span>
<span class="line"><span style="color:#e1e4e8;">port：6666</span></span>
<span class="line"><span style="color:#e1e4e8;">包名：ishangjie-user-service-1.0.0.jar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Gitlab地址：git@192.168.10.0:ishangjie/ishangjie-user-service.git</span></span>
<span class="line"><span style="color:#24292e;">port：6666</span></span>
<span class="line"><span style="color:#24292e;">包名：ishangjie-user-service-1.0.0.jar</span></span></code></pre></div><h2 id="_3-创建项目" tabindex="-1">3.创建项目 <a class="header-anchor" href="#_3-创建项目" aria-label="Permalink to &quot;3.创建项目&quot;">​</a></h2><p>首先创建一个自由风格的Jenkins项目，然后配置一下项目构建保存历史</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221827458.jpg" alt="创建项目"></p><h2 id="_4-字符参数" tabindex="-1">4.字符参数 <a class="header-anchor" href="#_4-字符参数" aria-label="Permalink to &quot;4.字符参数&quot;">​</a></h2><p>添加一个名为branch的字符参数以用于控制代码分支的变量</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221828336.jpg" alt="字符参数"></p><h2 id="_4-选项参数" tabindex="-1">4.选项参数 <a class="header-anchor" href="#_4-选项参数" aria-label="Permalink to &quot;4.选项参数&quot;">​</a></h2><p>添加一个名为mode的选项参数以用于控制部署或者回滚的变量</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221828631.jpg" alt="选项参数"></p><h2 id="_5-选择参数" tabindex="-1">5.选择参数 <a class="header-anchor" href="#_5-选择参数" aria-label="Permalink to &quot;5.选择参数&quot;">​</a></h2><h3 id="_1-主动选择参数" tabindex="-1">1，主动选择参数 <a class="header-anchor" href="#_1-主动选择参数" aria-label="Permalink to &quot;1，主动选择参数&quot;">​</a></h3><p>首先添加一个主动选择参数，用于控制项目名称这个变量</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221828857.png" alt="主动选择参数"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    Name：project</span></span>
<span class="line"><span style="color:#e1e4e8;">    Groovy Script:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">return[</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;eureka&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;user&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    Description：选择对应的应用名称部署对应的应用。</span></span>
<span class="line"><span style="color:#e1e4e8;">    Choice Type：Radio Buttons</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    Name：project</span></span>
<span class="line"><span style="color:#24292e;">    Groovy Script:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">return[</span></span>
<span class="line"><span style="color:#24292e;">&quot;eureka&quot;,</span></span>
<span class="line"><span style="color:#24292e;">&quot;user&quot;</span></span>
<span class="line"><span style="color:#24292e;">]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    Description：选择对应的应用名称部署对应的应用。</span></span>
<span class="line"><span style="color:#24292e;">    Choice Type：Radio Buttons</span></span></code></pre></div><h3 id="_2-主动选择反应参数" tabindex="-1">2，主动选择反应参数 <a class="header-anchor" href="#_2-主动选择反应参数" aria-label="Permalink to &quot;2，主动选择反应参数&quot;">​</a></h3><p>接着添加一个主动选择反应参数，用于控制项目类型这个变量</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221828767.jpg" alt="主动选择反应参数"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Name：type</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Groovy Script:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">A=[&quot;server&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">B=[&quot;service&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">if(project.equals(&quot;eureka&quot;)){</span></span>
<span class="line"><span style="color:#e1e4e8;">return A</span></span>
<span class="line"><span style="color:#e1e4e8;">} else if(project.equals(&quot;user&quot;)){</span></span>
<span class="line"><span style="color:#e1e4e8;">return B</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    Description：跟随项目的选择自动弹出对应类型</span></span>
<span class="line"><span style="color:#e1e4e8;">    Choice Type：Single Select</span></span>
<span class="line"><span style="color:#e1e4e8;">    Referenced parameters：project</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Name：type</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Groovy Script:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">A=[&quot;server&quot;]</span></span>
<span class="line"><span style="color:#24292e;">B=[&quot;service&quot;]</span></span>
<span class="line"><span style="color:#24292e;">if(project.equals(&quot;eureka&quot;)){</span></span>
<span class="line"><span style="color:#24292e;">return A</span></span>
<span class="line"><span style="color:#24292e;">} else if(project.equals(&quot;user&quot;)){</span></span>
<span class="line"><span style="color:#24292e;">return B</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    Description：跟随项目的选择自动弹出对应类型</span></span>
<span class="line"><span style="color:#24292e;">    Choice Type：Single Select</span></span>
<span class="line"><span style="color:#24292e;">    Referenced parameters：project</span></span></code></pre></div><h3 id="_3-主动选择反应参数" tabindex="-1">3，主动选择反应参数 <a class="header-anchor" href="#_3-主动选择反应参数" aria-label="Permalink to &quot;3，主动选择反应参数&quot;">​</a></h3><p>然后再添加一个主动选择反应参数，用于控制项目端口这个变量</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221828836.png" alt="主动选择反应参数"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">    Name：port</span></span>
<span class="line"><span style="color:#e1e4e8;">    Groovy Script:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if(project.equals(&quot;eureka&quot;)){</span></span>
<span class="line"><span style="color:#e1e4e8;">return [&quot;8761&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">} else if (project.equals(&quot;user&quot;)){</span></span>
<span class="line"><span style="color:#e1e4e8;">return [&quot;6666&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    Description：跟随跟随项目的选择自动弹出对应端口</span></span>
<span class="line"><span style="color:#e1e4e8;">    Choice Type：Single Select</span></span>
<span class="line"><span style="color:#e1e4e8;">    Referenced parameters：project</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">大概有以下几个小的注意点需要注意：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1，参数的名称将是整个构建流程使用的一个变量，因此起名的时候需要注意。</span></span>
<span class="line"><span style="color:#e1e4e8;">2，创建了一个主动选择参数，和两个主动选择反应参数，是因为我们的实际需求需要两个真实有效的参数，如果最后的port项选择了主动选择反应参考参数，那么到后边是无法显式使用的。</span></span>
<span class="line"><span style="color:#e1e4e8;">3，注意后两个跟随参数中的Referenced parameters，都需要填写主动参数的名称，才能够前后贯通，实现联动。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">    Name：port</span></span>
<span class="line"><span style="color:#24292e;">    Groovy Script:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if(project.equals(&quot;eureka&quot;)){</span></span>
<span class="line"><span style="color:#24292e;">return [&quot;8761&quot;]</span></span>
<span class="line"><span style="color:#24292e;">} else if (project.equals(&quot;user&quot;)){</span></span>
<span class="line"><span style="color:#24292e;">return [&quot;6666&quot;]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    Description：跟随跟随项目的选择自动弹出对应端口</span></span>
<span class="line"><span style="color:#24292e;">    Choice Type：Single Select</span></span>
<span class="line"><span style="color:#24292e;">    Referenced parameters：project</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">大概有以下几个小的注意点需要注意：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1，参数的名称将是整个构建流程使用的一个变量，因此起名的时候需要注意。</span></span>
<span class="line"><span style="color:#24292e;">2，创建了一个主动选择参数，和两个主动选择反应参数，是因为我们的实际需求需要两个真实有效的参数，如果最后的port项选择了主动选择反应参考参数，那么到后边是无法显式使用的。</span></span>
<span class="line"><span style="color:#24292e;">3，注意后两个跟随参数中的Referenced parameters，都需要填写主动参数的名称，才能够前后贯通，实现联动。</span></span></code></pre></div><h2 id="_6-git地址配置" tabindex="-1">6.Git地址配置 <a class="header-anchor" href="#_6-git地址配置" aria-label="Permalink to &quot;6.Git地址配置&quot;">​</a></h2><p>接着就该添加Git地址了，同样，这个地方也应该合理利用项目标准化的优势，合理应用变量来进行配置</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221828343.jpg" alt="Git地址配置"></p><h2 id="_7-执行脚本" tabindex="-1">7.执行脚本 <a class="header-anchor" href="#_7-执行脚本" aria-label="Permalink to &quot;7.执行脚本&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">source /etc/profile</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;">##set color##</span></span>
<span class="line"><span style="color:#e1e4e8;">echoRed() { echo $&#39;\\e[0;31m&#39;&quot;$1&quot;$&#39;\\e[0m&#39;; }</span></span>
<span class="line"><span style="color:#e1e4e8;">echoGreen() { echo $&#39;\\e[0;32m&#39;&quot;$1&quot;$&#39;\\e[0m&#39;; }</span></span>
<span class="line"><span style="color:#e1e4e8;">echoYellow() { echo $&#39;\\e[0;33m&#39;&quot;$1&quot;$&#39;\\e[0m&#39;; }</span></span>
<span class="line"><span style="color:#e1e4e8;">##set color##</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;">version=\`date +%Y%m%d%H%M%S\`</span></span>
<span class="line"><span style="color:#e1e4e8;">echo -------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 克隆项目并编译</span></span>
<span class="line"><span style="color:#e1e4e8;">echoGreen &quot;开始进行mvn编译！&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">cd  $WORKSPACE &amp;&amp; mvn clean install -DskipTests=true</span></span>
<span class="line"><span style="color:#e1e4e8;">[ $? != 0 ] &amp;&amp; echoRed &quot;请注意，在执行mvn编译时出错，故而退出构建，需开发同学自检代码！&quot; &amp;&amp; exit 1</span></span>
<span class="line"><span style="color:#e1e4e8;">cd  $WORKSPACE/target/ &amp;&amp; mv ishangjie-$project-$type-1.0.0.jar app.jar</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 创建docker镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">cat &gt; run.sh &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">source /etc/profile</span></span>
<span class="line"><span style="color:#e1e4e8;">java -jar /opt/app.jar --spring.profiles.active=test1</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">chmod +x run.sh</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cat &gt;Dockerfile &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM 192.168.10.1/public/jdk:1.8</span></span>
<span class="line"><span style="color:#e1e4e8;">MAINTAINER eryajf &lt;liqilong@edspay.com&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">ENV LANG en_US.UTF-8</span></span>
<span class="line"><span style="color:#e1e4e8;">ADD   app.jar /opt/app.jar</span></span>
<span class="line"><span style="color:#e1e4e8;">ADD   run.sh  /</span></span>
<span class="line"><span style="color:#e1e4e8;">EXPOSE $port</span></span>
<span class="line"><span style="color:#e1e4e8;">ENTRYPOINT [ &quot;sh&quot;, &quot;-c&quot;, &quot;/run.sh&quot; ]</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 构建镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">echoGreen &quot;开始构建当次镜像！&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">docker build -t 192.168.10.1/isj/$project:$version .</span></span>
<span class="line"><span style="color:#e1e4e8;">[ $? != 0 ] &amp;&amp; echoRed &quot;请注意，在执行镜像构建时出错，故而退出构建，请联系运维同学处理！&quot; &amp;&amp; exit 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 上传到docker私服</span></span>
<span class="line"><span style="color:#e1e4e8;">echoGreen &quot;开始将镜像push到私服！&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">docker push 192.168.10.1/isj/$project:$version</span></span>
<span class="line"><span style="color:#e1e4e8;">[ $? != 0 ] &amp;&amp; echoRed &quot;请注意，在执行镜像上传时出错，故而退出构建，请联系运维同学处理！&quot; &amp;&amp; exit 1</span></span>
<span class="line"><span style="color:#e1e4e8;">docker rmi 192.168.10.1/isj/$project:$version</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#更新镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">echoGreen &quot;开始将最新镜像部署到远端！&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">rancher kubectl set image deployment/isj-$project isj-$project=192.168.10.1/isj/$project:$version -n isj-wfw</span></span>
<span class="line"><span style="color:#e1e4e8;">[ $? != 0 ] &amp;&amp; echoRed &quot;请注意，在执行镜像更新时出错，故而退出构建，请联系运维同学处理！&quot; &amp;&amp; exit 1</span></span>
<span class="line"><span style="color:#e1e4e8;">echoGreen &quot;部署完成！&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;">source /etc/profile</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;">##set color##</span></span>
<span class="line"><span style="color:#24292e;">echoRed() { echo $&#39;\\e[0;31m&#39;&quot;$1&quot;$&#39;\\e[0m&#39;; }</span></span>
<span class="line"><span style="color:#24292e;">echoGreen() { echo $&#39;\\e[0;32m&#39;&quot;$1&quot;$&#39;\\e[0m&#39;; }</span></span>
<span class="line"><span style="color:#24292e;">echoYellow() { echo $&#39;\\e[0;33m&#39;&quot;$1&quot;$&#39;\\e[0m&#39;; }</span></span>
<span class="line"><span style="color:#24292e;">##set color##</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;">version=\`date +%Y%m%d%H%M%S\`</span></span>
<span class="line"><span style="color:#24292e;">echo -------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 克隆项目并编译</span></span>
<span class="line"><span style="color:#24292e;">echoGreen &quot;开始进行mvn编译！&quot;</span></span>
<span class="line"><span style="color:#24292e;">cd  $WORKSPACE &amp;&amp; mvn clean install -DskipTests=true</span></span>
<span class="line"><span style="color:#24292e;">[ $? != 0 ] &amp;&amp; echoRed &quot;请注意，在执行mvn编译时出错，故而退出构建，需开发同学自检代码！&quot; &amp;&amp; exit 1</span></span>
<span class="line"><span style="color:#24292e;">cd  $WORKSPACE/target/ &amp;&amp; mv ishangjie-$project-$type-1.0.0.jar app.jar</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 创建docker镜像</span></span>
<span class="line"><span style="color:#24292e;">cat &gt; run.sh &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;">source /etc/profile</span></span>
<span class="line"><span style="color:#24292e;">java -jar /opt/app.jar --spring.profiles.active=test1</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">chmod +x run.sh</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cat &gt;Dockerfile &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#24292e;">FROM 192.168.10.1/public/jdk:1.8</span></span>
<span class="line"><span style="color:#24292e;">MAINTAINER eryajf &lt;liqilong@edspay.com&gt;</span></span>
<span class="line"><span style="color:#24292e;">ENV LANG en_US.UTF-8</span></span>
<span class="line"><span style="color:#24292e;">ADD   app.jar /opt/app.jar</span></span>
<span class="line"><span style="color:#24292e;">ADD   run.sh  /</span></span>
<span class="line"><span style="color:#24292e;">EXPOSE $port</span></span>
<span class="line"><span style="color:#24292e;">ENTRYPOINT [ &quot;sh&quot;, &quot;-c&quot;, &quot;/run.sh&quot; ]</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 构建镜像</span></span>
<span class="line"><span style="color:#24292e;">echoGreen &quot;开始构建当次镜像！&quot;</span></span>
<span class="line"><span style="color:#24292e;">docker build -t 192.168.10.1/isj/$project:$version .</span></span>
<span class="line"><span style="color:#24292e;">[ $? != 0 ] &amp;&amp; echoRed &quot;请注意，在执行镜像构建时出错，故而退出构建，请联系运维同学处理！&quot; &amp;&amp; exit 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 上传到docker私服</span></span>
<span class="line"><span style="color:#24292e;">echoGreen &quot;开始将镜像push到私服！&quot;</span></span>
<span class="line"><span style="color:#24292e;">docker push 192.168.10.1/isj/$project:$version</span></span>
<span class="line"><span style="color:#24292e;">[ $? != 0 ] &amp;&amp; echoRed &quot;请注意，在执行镜像上传时出错，故而退出构建，请联系运维同学处理！&quot; &amp;&amp; exit 1</span></span>
<span class="line"><span style="color:#24292e;">docker rmi 192.168.10.1/isj/$project:$version</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#更新镜像</span></span>
<span class="line"><span style="color:#24292e;">echoGreen &quot;开始将最新镜像部署到远端！&quot;</span></span>
<span class="line"><span style="color:#24292e;">rancher kubectl set image deployment/isj-$project isj-$project=192.168.10.1/isj/$project:$version -n isj-wfw</span></span>
<span class="line"><span style="color:#24292e;">[ $? != 0 ] &amp;&amp; echoRed &quot;请注意，在执行镜像更新时出错，故而退出构建，请联系运维同学处理！&quot; &amp;&amp; exit 1</span></span>
<span class="line"><span style="color:#24292e;">echoGreen &quot;部署完成！&quot;</span></span></code></pre></div><p>针对这个脚本有几点简单说明：</p><ul><li>1，因为应用到了颜色输出，因此记得在构建环境当中开启color颜色输出。</li><li>2，尽量在关键地方添加一下判断，然后输出明了的内容以提高生产效率，比如编译有问题，直接退出构建，输出开发自检，如果是后边构建问题，同样退出构建，输出联系运维解决。</li><li>3，巧用cat的EOF特性，从而也可以将不同的变量控制进来。</li><li>4，尽量将所有构建过程的内容都写到Jenkins这里来，以便于后期问题排查与分析。</li><li>5，因为这是实验，因此没有添加回滚功能，如果添加的话，就针对mode参数做一个判断即可</li></ul><h2 id="_8-构建后操作" tabindex="-1">8.构建后操作 <a class="header-anchor" href="#_8-构建后操作" aria-label="Permalink to &quot;8.构建后操作&quot;">​</a></h2><p>因为是多个项目在同一个WORKSPACE下工作，因此，为了避免出现不可预知问题，这里添加了构建后清空WORKSPACE的选项</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221829469.jpg" alt="Git地址配置"></p><ul><li>效果图</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221829002.gif" alt="Git地址配置"></p><ul><li>回滚案例</li></ul><h1 id="_2-拉菜单联动效果" tabindex="-1">2.拉菜单联动效果 <a class="header-anchor" href="#_2-拉菜单联动效果" aria-label="Permalink to &quot;2.拉菜单联动效果&quot;">​</a></h1><p>首先选择参数化构建过程，然后首先配置环境，环境分为：测试环境、预发布环境、正式环境，选择的组件为Choice Parameter，Name定义为environment，选项为test、pre、online，如下图</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221831991.png" alt="img"></p><p>接着为三个环境配置联动的域名以一个域名为例，首先添加Active Choices Reacitive Parameter组件，名称定义为域名（需要在配置文件中定义为可读取该域名），选择Groovy Script选项，然后添加Groovy脚本，下列脚本含义为：如果环境是测试环境，则返回test.xxx.com、test9981.xxx.com、test9982.xxx.com，并下拉菜单默认选中test.xxx.com，如果是线上则返回app.xxx.com:selected并默认选中，如果是预发布则返回apppub.xxx.com:selected并默认选中。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if(environment.equals(&quot;test&quot;))</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">return [&quot;test.xxx.com:selected&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;test9981.xxx.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;test9982.xxx.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">else if(environment.equals(&quot;online&quot;))</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">return [&quot;app.xxx.com:selected&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">}else if(environment.equals(&quot;pre&quot;))</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">return [&quot;apppub.xxx.com:selected&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if(environment.equals(&quot;test&quot;))</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">return [&quot;test.xxx.com:selected&quot;,</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&quot;test9981.xxx.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">&quot;test9982.xxx.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">else if(environment.equals(&quot;online&quot;))</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">return [&quot;app.xxx.com:selected&quot;]</span></span>
<span class="line"><span style="color:#24292e;">}else if(environment.equals(&quot;pre&quot;))</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">return [&quot;apppub.xxx.com:selected&quot;]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221832397.png" alt="img"></p><p>接着在Fallback Script中填入return[&quot;ERROR&quot;]，如果错误就返回error</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221832264.png" alt="img"></p><p>最后在Referenced parameters 中填入需要联动的环境的名称，这里是environment，最终就会呈现environment和域名的联动效果如下图</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221832415.png" alt="img"></p><p>参考：</p><p><a href="https://xuexb.com/post/jenkins-rollback.html" target="_blank" rel="noreferrer">https://xuexb.com/post/jenkins-rollback.html</a></p>`,61),o=[l];function c(t,i,r,u,y,h){return n(),e("div",null,o)}const g=s(p,[["render",c]]);export{m as __pageData,g as default};
