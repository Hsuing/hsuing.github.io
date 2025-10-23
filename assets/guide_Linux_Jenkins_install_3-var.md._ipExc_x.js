import{_ as a,o as s,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const b=JSON.parse('{"title":"1、环境变量","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/install/3-var.md","filePath":"guide/Linux/Jenkins/install/3-var.md","lastUpdated":1720533756000}'),l={name:"guide/Linux/Jenkins/install/3-var.md"},o=n(`<h1 id="_1、环境变量" tabindex="-1">1、环境变量 <a class="header-anchor" href="#_1、环境变量" aria-label="Permalink to &quot;1、环境变量&quot;">​</a></h1><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221703307.jpg" alt=""></p><h2 id="_1-1-查看系统内置环境变量" tabindex="-1">1.1 查看系统内置环境变量 <a class="header-anchor" href="#_1-1-查看系统内置环境变量" aria-label="Permalink to &quot;1.1 查看系统内置环境变量&quot;">​</a></h2><h3 id="方式一" tabindex="-1">方式一 <a class="header-anchor" href="#方式一" aria-label="Permalink to &quot;方式一&quot;">​</a></h3><p>直接在浏览器中访问 <code>\${YOUR_JENKINS_HOST}/env-vars.html</code> 页面就可以，比如 <code>http://localhost:8080/env-vars.html</code> ，每个变量的用途写的都很清楚</p><h3 id="方式二" tabindex="-1">方式二 <a class="header-anchor" href="#方式二" aria-label="Permalink to &quot;方式二&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">    agent any</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&quot;Env Variables&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &quot;printenv&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">    agent any</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    stages {</span></span>
<span class="line"><span style="color:#24292e;">        stage(&quot;Env Variables&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                sh &quot;printenv&quot;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_1-2-读取环境变量" tabindex="-1">1.2 读取环境变量 <a class="header-anchor" href="#_1-2-读取环境变量" aria-label="Permalink to &quot;1.2 读取环境变量&quot;">​</a></h2><p><a href="https://www.cnblogs.com/FraserYu/p/14249907.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/FraserYu/p/14249907.html</a></p><h2 id="_1-3-自定义环境变量" tabindex="-1">1.3 自定义环境变量 <a class="header-anchor" href="#_1-3-自定义环境变量" aria-label="Permalink to &quot;1.3 自定义环境变量&quot;">​</a></h2><h2 id="_1-4-重写环境变量" tabindex="-1">1.4 重写环境变量 <a class="header-anchor" href="#_1-4-重写环境变量" aria-label="Permalink to &quot;1.4 重写环境变量&quot;">​</a></h2><h2 id="_1-5-boolean值在环境变量中的使用" tabindex="-1">1.5 boolean值在环境变量中的使用 <a class="header-anchor" href="#_1-5-boolean值在环境变量中的使用" aria-label="Permalink to &quot;1.5 boolean值在环境变量中的使用&quot;">​</a></h2><h2 id="_1-6-shell结果赋值给环境变量" tabindex="-1">1.6 shell结果赋值给环境变量 <a class="header-anchor" href="#_1-6-shell结果赋值给环境变量" aria-label="Permalink to &quot;1.6 shell结果赋值给环境变量&quot;">​</a></h2>`,13),t=[o];function p(r,i,c,h,d,u){return s(),e("div",null,t)}const m=a(l,[["render",p]]);export{b as __pageData,m as default};
