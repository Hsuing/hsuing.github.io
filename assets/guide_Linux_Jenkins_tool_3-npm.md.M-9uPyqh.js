import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/tool/3-npm.md","filePath":"guide/Linux/Jenkins/tool/3-npm.md","lastUpdated":1720533756000}'),p={name:"guide/Linux/Jenkins/tool/3-npm.md"},o=l(`<h2 id="_1-下载" tabindex="-1">1.下载 <a class="header-anchor" href="#_1-下载" aria-label="Permalink to &quot;1.下载&quot;">​</a></h2><p><a href="https://nodejs.org/en/download/" target="_blank" rel="noreferrer">https://nodejs.org/en/download/</a></p><h2 id="_2-安装node" tabindex="-1">2.安装Node <a class="header-anchor" href="#_2-安装node" aria-label="Permalink to &quot;2.安装Node&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">xf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">node-v10.15.3-linux-x64.tar.xz</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-C</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/</span></span>
<span class="line"><span style="color:#6A737D;">#添加全局变量（/etc/profile）</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> NODE_HOME</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/usr/local/node-v10.15.3-linux-x64</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> PATH</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">$PATH</span><span style="color:#9ECBFF;">:</span><span style="color:#E1E4E8;"> $NODE_HOME/bin</span></span>
<span class="line"><span style="color:#79B8FF;">source</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/profile</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#032F62;">xf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">node-v10.15.3-linux-x64.tar.xz</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-C</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/</span></span>
<span class="line"><span style="color:#6A737D;">#添加全局变量（/etc/profile）</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> NODE_HOME</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/usr/local/node-v10.15.3-linux-x64</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> PATH</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">$PATH</span><span style="color:#032F62;">:</span><span style="color:#24292E;"> $NODE_HOME/bin</span></span>
<span class="line"><span style="color:#005CC5;">source</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/profile</span></span></code></pre></div><h2 id="_3-jenkins配置npm" tabindex="-1">3.Jenkins配置Npm <a class="header-anchor" href="#_3-jenkins配置npm" aria-label="Permalink to &quot;3.Jenkins配置Npm&quot;">​</a></h2><ul><li>打开系统管理——管理插件——可选插件，搜索NodeJS，选择NodeJS Plugin安装</li><li>系统管理 —— 全局工具配置 —— NodeJS，选择安装nodejs</li></ul><ul><li><p>在Jenkins全局工具配置中并没有node，可以直接通过Jenkinsfile定义使用。</p></li><li><p>Jenkinsfile</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">node {</span></span>
<span class="line"><span style="color:#E1E4E8;">stage (</span><span style="color:#9ECBFF;">&quot;npmbuild&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    sh </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">       export npmHome=/usr/local/node-v10.15.3-linux-x64</span></span>
<span class="line"><span style="color:#9ECBFF;">       export PATH=</span><span style="color:#79B8FF;">\\$</span><span style="color:#9ECBFF;">PATH:</span><span style="color:#79B8FF;">\\$</span><span style="color:#9ECBFF;">npmHome/bin</span></span>
<span class="line"><span style="color:#9ECBFF;">       npm -v</span></span>
<span class="line"><span style="color:#9ECBFF;">       &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}    </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">node {</span></span>
<span class="line"><span style="color:#24292E;">stage (</span><span style="color:#032F62;">&quot;npmbuild&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    sh </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">       export npmHome=/usr/local/node-v10.15.3-linux-x64</span></span>
<span class="line"><span style="color:#032F62;">       export PATH=</span><span style="color:#005CC5;">\\$</span><span style="color:#032F62;">PATH:</span><span style="color:#005CC5;">\\$</span><span style="color:#032F62;">npmHome/bin</span></span>
<span class="line"><span style="color:#032F62;">       npm -v</span></span>
<span class="line"><span style="color:#032F62;">       &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">}    </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li></ul><ul><li>或者</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407042234860.jpg" alt=""></p><ul><li>全局安装npm</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#npm install -g npm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看node 位置</span></span>
<span class="line"><span style="color:#6A737D;">#vim node</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#npm install -g npm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看node 位置</span></span>
<span class="line"><span style="color:#6A737D;">#vim node</span></span></code></pre></div><ul><li>jenkinsfile</li></ul><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!groovy</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">String</span><span style="color:#E1E4E8;"> buildShell </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;\${env.buildShell}</span></span>
<span class="line"><span style="color:#9ECBFF;">pipeline {</span></span>
<span class="line"><span style="color:#9ECBFF;">    agent {</span></span>
<span class="line"><span style="color:#9ECBFF;">        node {</span></span>
<span class="line"><span style="color:#9ECBFF;">            lable &quot;</span><span style="color:#E1E4E8;">master</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        }</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">    stages{</span></span>
<span class="line"><span style="color:#9ECBFF;">        stage(Npmbuild){</span></span>
<span class="line"><span style="color:#9ECBFF;">            steps{</span></span>
<span class="line"><span style="color:#9ECBFF;">                script{</span></span>
<span class="line"><span style="color:#9ECBFF;">                    npmHome = tool &quot;</span><span style="color:#E1E4E8;">nodev14</span><span style="color:#79B8FF;">.17</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">                    sh &quot;</span><span style="color:#E1E4E8;">export </span><span style="color:#79B8FF;">NODE_HOME</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">\${npmHome} </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> export </span><span style="color:#79B8FF;">PATH</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">\\$</span><span style="color:#79B8FF;">NODE_HOME</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">bin:</span><span style="color:#85E89D;font-weight:bold;">\\$</span><span style="color:#DBEDFF;">PATH &amp;&amp; \${npmHome}</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">npm \${buildShell}</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">                }</span></span>
<span class="line"><span style="color:#9ECBFF;">            }</span></span>
<span class="line"><span style="color:#9ECBFF;">        }</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!groovy</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">String</span><span style="color:#24292E;"> buildShell </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;\${env.buildShell}</span></span>
<span class="line"><span style="color:#032F62;">pipeline {</span></span>
<span class="line"><span style="color:#032F62;">    agent {</span></span>
<span class="line"><span style="color:#032F62;">        node {</span></span>
<span class="line"><span style="color:#032F62;">            lable &quot;</span><span style="color:#24292E;">master</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">        }</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">    stages{</span></span>
<span class="line"><span style="color:#032F62;">        stage(Npmbuild){</span></span>
<span class="line"><span style="color:#032F62;">            steps{</span></span>
<span class="line"><span style="color:#032F62;">                script{</span></span>
<span class="line"><span style="color:#032F62;">                    npmHome = tool &quot;</span><span style="color:#24292E;">nodev14</span><span style="color:#005CC5;">.17</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">                    sh &quot;</span><span style="color:#24292E;">export </span><span style="color:#005CC5;">NODE_HOME</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">\${npmHome} </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> export </span><span style="color:#005CC5;">PATH</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">\\$</span><span style="color:#005CC5;">NODE_HOME</span><span style="color:#032F62;">/bin:</span><span style="color:#22863A;font-weight:bold;">\\$</span><span style="color:#032F62;">PATH &amp;&amp; \${npmHome}/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">npm \${buildShell}</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">                }</span></span>
<span class="line"><span style="color:#032F62;">            }</span></span>
<span class="line"><span style="color:#032F62;">        }</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">}</span></span></code></pre></div><h2 id="_4-其他方式" tabindex="-1">4.其他方式 <a class="header-anchor" href="#_4-其他方式" aria-label="Permalink to &quot;4.其他方式&quot;">​</a></h2><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">    parameters { </span></span>
<span class="line"><span style="color:#E1E4E8;">        choice(</span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;NODE_VERSION&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">choices</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&#39;NodeJS 9.6.1&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;NodeJS 7.7.0&#39;</span><span style="color:#E1E4E8;">], </span><span style="color:#79B8FF;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    tools {</span></span>
<span class="line"><span style="color:#E1E4E8;">        nodejs params</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">NODE_VERSION</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    stages{</span></span>
<span class="line"><span style="color:#E1E4E8;">       stage(</span><span style="color:#9ECBFF;">&quot;Run&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps{</span></span>
<span class="line"><span style="color:#E1E4E8;">                sh </span><span style="color:#9ECBFF;">&#39;node --version&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any</span></span>
<span class="line"><span style="color:#24292E;">    parameters { </span></span>
<span class="line"><span style="color:#24292E;">        choice(</span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;NODE_VERSION&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">choices</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&#39;NodeJS 9.6.1&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;NodeJS 7.7.0&#39;</span><span style="color:#24292E;">], </span><span style="color:#005CC5;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    tools {</span></span>
<span class="line"><span style="color:#24292E;">        nodejs params</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">NODE_VERSION</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    stages{</span></span>
<span class="line"><span style="color:#24292E;">       stage(</span><span style="color:#032F62;">&quot;Run&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            steps{</span></span>
<span class="line"><span style="color:#24292E;">                sh </span><span style="color:#032F62;">&#39;node --version&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,15),e=[o];function c(t,r,i,y,E,F){return n(),a("div",null,e)}const h=s(p,[["render",c]]);export{u as __pageData,h as default};
