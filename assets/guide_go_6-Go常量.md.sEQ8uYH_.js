import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const C=JSON.parse('{"title":"1.go语言常量","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/6-Go常量.md","filePath":"guide/go/6-Go常量.md","lastUpdated":1701229860000}'),p={name:"guide/go/6-Go常量.md"},o=l(`<p><a href="https://haicoder.net/golang/golang-float.html" target="_blank" rel="noreferrer">https://haicoder.net/golang/golang-float.html</a></p><h1 id="_1-go语言常量" tabindex="-1">1.go语言常量 <a class="header-anchor" href="#_1-go语言常量" aria-label="Permalink to &quot;1.go语言常量&quot;">​</a></h1><p>常量，就是程序<code>编译阶段</code>就确定下来的值，而程序在<code>运行时</code>则无法改变该值。g在Go程序里，常量可以是数值类型（包括整型、浮点型和复数类型）、布尔类型、字符串类型等。</p><h2 id="_1-1定义常量的语法" tabindex="-1">1.1定义常量的语法 <a class="header-anchor" href="#_1-1定义常量的语法" aria-label="Permalink to &quot;1.1定义常量的语法&quot;">​</a></h2><h3 id="const" tabindex="-1">const <a class="header-anchor" href="#const" aria-label="Permalink to &quot;const&quot;">​</a></h3><p>定义一个常量使用const关键字，语法格式如下</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> constantName [type]</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;">：定义常量关键字</span></span>
<span class="line"><span style="color:#E1E4E8;">constName: 常量名称</span></span>
<span class="line"><span style="color:#E1E4E8;">type： 常量类型</span></span>
<span class="line"><span style="color:#E1E4E8;">value：常量值</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//例子</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> PI float64 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3.14</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> PI </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3.1415</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//可以省略类型</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    	width </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span></span>
<span class="line"><span style="color:#E1E4E8;">    	height </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> i, j </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//多重赋值</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> a , b , c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;foo&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> constantName [type]</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;">：定义常量关键字</span></span>
<span class="line"><span style="color:#24292E;">constName: 常量名称</span></span>
<span class="line"><span style="color:#24292E;">type： 常量类型</span></span>
<span class="line"><span style="color:#24292E;">value：常量值</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//例子</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> PI float64 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3.14</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> PI </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3.1415</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//可以省略类型</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    	width </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span></span>
<span class="line"><span style="color:#24292E;">    	height </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> i, j </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//多重赋值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> a , b , c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;foo&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>const</code>同时声明多个常量时，如果省略了值则表示和上面一行的值相同</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    	a1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span></span>
<span class="line"><span style="color:#E1E4E8;">        a2</span></span>
<span class="line"><span style="color:#E1E4E8;">        a3</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a1: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">,a1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a2: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">,a2)</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a3: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">,a3)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    	a1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span></span>
<span class="line"><span style="color:#24292E;">        a2</span></span>
<span class="line"><span style="color:#24292E;">        a3</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a1: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">,a1)</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a2: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">,a2)</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a3: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">,a3)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="iota" tabindex="-1">iota <a class="header-anchor" href="#iota" aria-label="Permalink to &quot;iota&quot;">​</a></h3><p>iota比较特殊，可以被认为是一个可被编译器修改的常量，它默认开始值是0，每调用一次加1。遇到<code>const</code>关键字时被重置为0.</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    	a1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">iota</span></span>
<span class="line"><span style="color:#E1E4E8;">        a2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">iota</span></span>
<span class="line"><span style="color:#E1E4E8;">        a3 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">iota</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">     fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a1: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">,a1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a2: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">,a2)</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a3: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">,a3)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    	a1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">iota</span></span>
<span class="line"><span style="color:#24292E;">        a2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">iota</span></span>
<span class="line"><span style="color:#24292E;">        a3 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">iota</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">     fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a1: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">,a1)</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a2: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">,a2)</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a3: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">,a3)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>使用<code>_</code>跳过某些值</li></ul><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    	a1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">iota</span></span>
<span class="line"><span style="color:#E1E4E8;">        _</span></span>
<span class="line"><span style="color:#E1E4E8;">        a3 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">iota</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a1: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">,a1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a2: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">,a2)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    	a1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">iota</span></span>
<span class="line"><span style="color:#24292E;">        _</span></span>
<span class="line"><span style="color:#24292E;">        a3 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">iota</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a1: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">,a1)</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a2: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">,a2)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>声明中间插队</li></ul><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">		a1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">iota</span></span>
<span class="line"><span style="color:#E1E4E8;">		a2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span></span>
<span class="line"><span style="color:#E1E4E8;">		a3 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">iota</span></span>
<span class="line"><span style="color:#E1E4E8;">	)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a1: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">,a1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a2: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">,a2)</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a3: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">,a3)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">		a1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">iota</span></span>
<span class="line"><span style="color:#24292E;">		a2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span></span>
<span class="line"><span style="color:#24292E;">		a3 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">iota</span></span>
<span class="line"><span style="color:#24292E;">	)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a1: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">,a1)</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a2: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">,a2)</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a3: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">,a3)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><a href="https://www.bilibili.com/video/BV1zR4y1t7Wj/?p=11&amp;vd_source=271cfb4bb43eae8c9b0543f4ae14ec31" target="_blank" rel="noreferrer">https://www.bilibili.com/video/BV1zR4y1t7Wj/?p=11&amp;vd_source=271cfb4bb43eae8c9b0543f4ae14ec31</a></p><p><a href="https://www.cnblogs.com/liangyun/p/goland.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/liangyun/p/goland.html</a></p><p><a href="https://blog.jetbrains.com/go/2019/09/11/increase-productivity-with-custom-postfix-completion-templates/" target="_blank" rel="noreferrer">https://blog.jetbrains.com/go/2019/09/11/increase-productivity-with-custom-postfix-completion-templates/</a></p><p><a href="https://gitee.com/wuyumin/GoLand/blob/master/Skill.md" target="_blank" rel="noreferrer">https://gitee.com/wuyumin/GoLand/blob/master/Skill.md</a></p><p><a href="https://blog.csdn.net/le_17_4_6/article/details/123988756" target="_blank" rel="noreferrer">https://blog.csdn.net/le_17_4_6/article/details/123988756</a></p><p><a href="http://c.biancheng.net/view/6216.html" target="_blank" rel="noreferrer">http://c.biancheng.net/view/6216.html</a></p>`,22),e=[o];function t(c,r,y,E,i,F){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{C as __pageData,d as default};
