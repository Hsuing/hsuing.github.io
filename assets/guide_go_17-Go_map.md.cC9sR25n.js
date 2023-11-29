import{_ as s,o as a,c as n,R as p}from"./chunks/framework.PZ77rLUR.js";const m=JSON.parse('{"title":"1.golang map","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/17-Go_map.md","filePath":"guide/go/17-Go_map.md","lastUpdated":null}'),o={name:"guide/go/17-Go_map.md"},l=p(`<h1 id="_1-golang-map" tabindex="-1">1.golang map <a class="header-anchor" href="#_1-golang-map" aria-label="Permalink to &quot;1.golang map&quot;">​</a></h1><p>map是一种<code>key:value</code>键值对的数据结构容器。map内部实现是哈希表(<code>hash</code>).</p><p>map最重要的一点是通过key来快速检索数据，key类似于索引，指向数据的值。</p><p>map是引用类型的。</p><h2 id="_1-1map的语法格式" tabindex="-1">1.1map的语法格式 <a class="header-anchor" href="#_1-1map的语法格式" aria-label="Permalink to &quot;1.1map的语法格式&quot;">​</a></h2><p>可以使用内建函数make也可以使用map关键字来定义map</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 声明变量，默认map是nil */</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> map_variable </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[key_data_type]value_data_type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 使用make 函数 */</span></span>
<span class="line"><span style="color:#E1E4E8;">map_variable </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">make</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[key_data_type]value_data_type)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 声明变量，默认map是nil */</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> map_variable </span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[key_data_type]value_data_type</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 使用make 函数 */</span></span>
<span class="line"><span style="color:#24292E;">map_variable </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">make</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[key_data_type]value_data_type)</span></span></code></pre></div><p><code>map_variable</code>:map变量名称</p><p><code>key_data_type</code>:key的数据类型</p><p><code>value_data_type</code>:值的数据类型</p><h3 id="初始化" tabindex="-1">初始化 <a class="header-anchor" href="#初始化" aria-label="Permalink to &quot;初始化&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mapsFunc</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//类型声明</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> m1 </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">	m1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">make</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;m1: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, m1)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;m1: </span><span style="color:#79B8FF;">%T\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, m1)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;---------初始化1---------&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> m2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;20&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;email&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xx@163.com&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//map 打印是无序的</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;m2: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, m2)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;---------初始化2---------&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	m3 </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">make</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	m3[</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	m3[</span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;20&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	m3[</span><span style="color:#9ECBFF;">&quot;email&quot;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;xx@163.com&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;m3: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, m3)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mapsFunc</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//类型声明</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> m1 </span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">	m1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">make</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;m1: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, m1)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;m1: </span><span style="color:#005CC5;">%T\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, m1)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;---------初始化1---------&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> m2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">{</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;20&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;email&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xx@163.com&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//map 打印是无序的</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;m2: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, m2)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;---------初始化2---------&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	m3 </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">make</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	m3[</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#24292E;">	m3[</span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;20&quot;</span></span>
<span class="line"><span style="color:#24292E;">	m3[</span><span style="color:#032F62;">&quot;email&quot;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;xx@163.com&quot;</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;m3: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, m3)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="访问" tabindex="-1">访问 <a class="header-anchor" href="#访问" aria-label="Permalink to &quot;访问&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mapAccessFunc</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> m2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;20&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;email&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xx@163.com&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;name&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> m2[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;value: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, value)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mapAccessFunc</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> m2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">{</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;20&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;email&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xx@163.com&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;name&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> m2[key]</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;value: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, value)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="键位是否存在" tabindex="-1">键位是否存在 <a class="header-anchor" href="#键位是否存在" aria-label="Permalink to &quot;键位是否存在&quot;">​</a></h3><p>go语言中有个判断map中键是否存在的特殊写法，格式如下：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">value,ok</span><span style="color:#F97583;">:=map</span><span style="color:#E1E4E8;">[key]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">value,ok</span><span style="color:#D73A49;">:=map</span><span style="color:#24292E;">[key]</span></span></code></pre></div><p>如果ok为true，存在，否则，不存在</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">keyExitFunc</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> m2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;20&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;email&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xx@163.com&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> k1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;name&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> k2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;name1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	v, ok </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> m2[k1]</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;v: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, v)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;-----&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	v, ok </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> m2[k2]</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;v: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, v)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;ok: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, ok)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">keyExitFunc</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> m2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">{</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;20&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;email&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xx@163.com&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> k1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;name&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> k2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;name1&quot;</span></span>
<span class="line"><span style="color:#24292E;">	v, ok </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> m2[k1]</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;v: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, v)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;-----&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	v, ok </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> m2[k2]</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;v: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, v)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ok: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, ok)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_2-map遍历" tabindex="-1">2.map遍历 <a class="header-anchor" href="#_2-map遍历" aria-label="Permalink to &quot;2.map遍历&quot;">​</a></h1><p>可以使用<code>for range</code>循环进行map遍历，得到key和value值。</p><h2 id="_2-1遍历key" tabindex="-1">2.1遍历key <a class="header-anchor" href="#_2-1遍历key" aria-label="Permalink to &quot;2.1遍历key&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mapSearchFunc</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> m2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">map</span><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;20&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;email&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xx@163.com&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> key </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> m2 {</span></span>
<span class="line"><span style="color:#E1E4E8;">		fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;key: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, key)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mapSearchFunc</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> m2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">map</span><span style="color:#24292E;">[</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">{</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;20&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;email&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xx@163.com&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> key </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> m2 {</span></span>
<span class="line"><span style="color:#24292E;">		fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;key: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, key)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_2-2遍历key和value" tabindex="-1">2.2遍历key和value <a class="header-anchor" href="#_2-2遍历key和value" aria-label="Permalink to &quot;2.2遍历key和value&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mapSearchFunc</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;------------key-value&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> key, value </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> m2 {</span></span>
<span class="line"><span style="color:#E1E4E8;">		fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">:</span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, key, value)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mapSearchFunc</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;------------key-value&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> key, value </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> m2 {</span></span>
<span class="line"><span style="color:#24292E;">		fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">%v</span><span style="color:#032F62;">:</span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, key, value)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,25),t=[l];function e(c,r,E,y,i,F){return a(),n("div",null,t)}const q=s(o,[["render",e]]);export{m as __pageData,q as default};
