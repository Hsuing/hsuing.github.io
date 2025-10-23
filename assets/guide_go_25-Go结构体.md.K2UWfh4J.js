import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1. golang结构体","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/25-Go结构体.md","filePath":"guide/go/25-Go结构体.md","lastUpdated":1725876562000}'),p={name:"guide/go/25-Go结构体.md"},o=l(`<h1 id="_1-golang结构体" tabindex="-1">1. golang结构体 <a class="header-anchor" href="#_1-golang结构体" aria-label="Permalink to &quot;1. golang结构体&quot;">​</a></h1><p>go语言没有面向对象的概念了，但是可以使用结构体来实现，面向对象编程的一些特性，例如：继承、组合等特性。</p><p>有时我们需要将不同类型的数据组合成一个有机的整体，如：一个学生有学号、性能、性别、年龄、地址等属性。如果一个一个定义变量会比较繁琐，数据不便于管理。这时就可以引入结构体了</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202409091746271.jpeg" alt="m_919a846007897080a41597f11bd5aa1e_r"></p><h2 id="_1-1-go语言结构体的定义" tabindex="-1">1.1 go语言结构体的定义 <a class="header-anchor" href="#_1-1-go语言结构体的定义" aria-label="Permalink to &quot;1.1 go语言结构体的定义&quot;">​</a></h2><p>结构体的定义和类型定义类似，只不过多了一个<code>struct</code>关键字，语法结构如下：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">struct_variable_type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	member 类型;</span></span>
<span class="line"><span style="color:#E1E4E8;">	member 类型;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">	member 类型;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">struct_variable_type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	member 类型;</span></span>
<span class="line"><span style="color:#24292E;">	member 类型;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">	member 类型;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>type</code>:结构体定义关键字</p><p><code>struct_variable_type</code>:结构体类型名称</p><p><code>struct</code>:结构体定义关键字</p><p><code>member 类型</code>: 成员定义</p><h4 id="实例" tabindex="-1">实例： <a class="header-anchor" href="#实例" aria-label="Permalink to &quot;实例：&quot;">​</a></h4><p>定义Person 的结构体</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	id </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">	age </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	email </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	id </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">	age </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	email </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>同类型的可以</code>合并到一行用<code>，</code>隔开</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	id,age </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	name,email </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	id,age </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	name,email </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_1-2-声明一个结构体变量" tabindex="-1">1.2 声明一个结构体变量 <a class="header-anchor" href="#_1-2-声明一个结构体变量" aria-label="Permalink to &quot;1.2 声明一个结构体变量&quot;">​</a></h2><p>声明一个结构体变量和声明一个普通变量相同</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//定义一个结构体</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	id    </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	name  </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">	age   </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	email </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> tom Person</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;tom: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, tom)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//定义一个结构体</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	id    </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	name  </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">	age   </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	email </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> tom Person</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;tom: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, tom)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>结构体成员，在没有赋值之前都是零值</p></blockquote><h2 id="_1-3访问结构体成员" tabindex="-1">1.3访问结构体成员 <a class="header-anchor" href="#_1-3访问结构体成员" aria-label="Permalink to &quot;1.3访问结构体成员&quot;">​</a></h2><p>可以使用<code>点运算符(.)</code>，来访问结构体成员</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	id, age     </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	name, email </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> tom Person</span></span>
<span class="line"><span style="color:#E1E4E8;">	tom.id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span></span>
<span class="line"><span style="color:#E1E4E8;">	tom.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	tom.age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20</span></span>
<span class="line"><span style="color:#E1E4E8;">	tom.email </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;xx@gmail.com&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;--------访问所有成员&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;tom: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, tom)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;--------访问单个成员&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;tom.id: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, tom.id)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	id, age     </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	name, email </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> tom Person</span></span>
<span class="line"><span style="color:#24292E;">	tom.id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span></span>
<span class="line"><span style="color:#24292E;">	tom.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#24292E;">	tom.age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span></span>
<span class="line"><span style="color:#24292E;">	tom.email </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;xx@gmail.com&quot;</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;--------访问所有成员&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;tom: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, tom)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;--------访问单个成员&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;tom.id: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, tom.id)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_1-4匿名结构体" tabindex="-1">1.4匿名结构体 <a class="header-anchor" href="#_1-4匿名结构体" aria-label="Permalink to &quot;1.4匿名结构体&quot;">​</a></h2><p>如果结构体是临时使用，可以不用起名字，直接使用</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> Cumster </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		id   </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">		name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	Cumster.id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span></span>
<span class="line"><span style="color:#E1E4E8;">	Cumster.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Cumster: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, Cumster)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> Cumster </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		id   </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">		name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	Cumster.id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span></span>
<span class="line"><span style="color:#24292E;">	Cumster.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Cumster: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, Cumster)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_2-结构体初始化" tabindex="-1">2.结构体初始化 <a class="header-anchor" href="#_2-结构体初始化" aria-label="Permalink to &quot;2.结构体初始化&quot;">​</a></h1><p>未初始化的结构体，成员都是零值 int 0 float 0.0 bool false string nil</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	id, age     </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	name, email </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> tom Person</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;tom: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, tom)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	id, age     </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	name, email </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> tom Person</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;tom: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, tom)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_2-1使用键值对" tabindex="-1">2.1使用键值对 <a class="header-anchor" href="#_2-1使用键值对" aria-label="Permalink to &quot;2.1使用键值对&quot;">​</a></h2><p><code>使用键值对对结构体初始化</code></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	id, age     </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	name, email </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	kite </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> Person{</span></span>
<span class="line"><span style="color:#E1E4E8;">		id:    </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		age:   </span><span style="color:#79B8FF;">19</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		name:  </span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		email: </span><span style="color:#9ECBFF;">&quot;xx@gmail.com&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;kite: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, kite)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	id, age     </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	name, email </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	kite </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> Person{</span></span>
<span class="line"><span style="color:#24292E;">		id:    </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		age:   </span><span style="color:#005CC5;">19</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		name:  </span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		email: </span><span style="color:#032F62;">&quot;xx@gmail.com&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;kite: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, kite)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_2-2使用值的列表" tabindex="-1">2.2使用值的列表 <a class="header-anchor" href="#_2-2使用值的列表" aria-label="Permalink to &quot;2.2使用值的列表&quot;">​</a></h2><p><code>使用值的列表初始化</code></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	id, age     </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	name, email </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	kite </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> Person{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">19</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;xx@gmail.com&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;kite: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, kite)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	id, age     </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	name, email </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	kite </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> Person{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">100</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">19</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;xx@gmail.com&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;kite: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, kite)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>[!NOTE]</p><p>1.必须初始化结构体的所有字段</p><p>2.初始值的填充顺序必须与字段在结构体中的声明顺序一致</p><p>3.该方式不能和键值初始化方式混用</p></blockquote><h2 id="_2-3部分成员初始化" tabindex="-1">2.3部分成员初始化 <a class="header-anchor" href="#_2-3部分成员初始化" aria-label="Permalink to &quot;2.3部分成员初始化&quot;">​</a></h2><p>用不到的成员，可以不进行初始化</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	id, age     </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	name, email </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//使用键值对，短变量方式</span></span>
<span class="line"><span style="color:#E1E4E8;">	kite </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> Person{</span></span>
<span class="line"><span style="color:#E1E4E8;">		id:  </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		age: </span><span style="color:#79B8FF;">19</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//或者</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> tom Person</span></span>
<span class="line"><span style="color:#E1E4E8;">	tom </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Person{</span></span>
<span class="line"><span style="color:#E1E4E8;">		id:  </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		age: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;kite: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, kite)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	id, age     </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	name, email </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//使用键值对，短变量方式</span></span>
<span class="line"><span style="color:#24292E;">	kite </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> Person{</span></span>
<span class="line"><span style="color:#24292E;">		id:  </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		age: </span><span style="color:#005CC5;">19</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//或者</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> tom Person</span></span>
<span class="line"><span style="color:#24292E;">	tom </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Person{</span></span>
<span class="line"><span style="color:#24292E;">		id:  </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		age: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;kite: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, kite)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_3-结构体指针" tabindex="-1">3.结构体指针 <a class="header-anchor" href="#_3-结构体指针" aria-label="Permalink to &quot;3.结构体指针&quot;">​</a></h1><p>结构体指针和普通变量指针相同</p><h2 id="_3-1普通变量指针" tabindex="-1">3.1普通变量指针 <a class="header-anchor" href="#_3-1普通变量指针" aria-label="Permalink to &quot;3.1普通变量指针&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">	name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> p_name </span><span style="color:#F97583;">*</span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">	p_name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">name</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//取指针地址</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(p_name)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//取指针地址值</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;*p_name: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">p_name)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">	name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> p_name </span><span style="color:#D73A49;">*</span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">	p_name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">name</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//取指针地址</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(p_name)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//取指针地址值</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;*p_name: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">p_name)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_3-2结构指针" tabindex="-1">3.2结构指针 <a class="header-anchor" href="#_3-2结构指针" aria-label="Permalink to &quot;3.2结构指针&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test2</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		id   </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">		name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> tom </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Person{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> p_person </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Person</span></span>
<span class="line"><span style="color:#E1E4E8;">	p_person </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">tom</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;p_person: </span><span style="color:#79B8FF;">%p\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, p_person)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;p_person: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">p_person)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test2</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		id   </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">		name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> tom </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Person{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> p_person </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Person</span></span>
<span class="line"><span style="color:#24292E;">	p_person </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">tom</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;p_person: </span><span style="color:#005CC5;">%p\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, p_person)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;p_person: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">p_person)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_3-3new创建结构体指针" tabindex="-1">3.3new创建结构体指针 <a class="header-anchor" href="#_3-3new创建结构体指针" aria-label="Permalink to &quot;3.3new创建结构体指针&quot;">​</a></h2><p>还可以通过new关键字对结构体进行实例化，得到的是结构体的地址</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test3</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		id   </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">		name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> p_person </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(Person)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;p_person: </span><span style="color:#79B8FF;">%p\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, p_person)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test3</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		id   </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">		name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> p_person </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(Person)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;p_person: </span><span style="color:#005CC5;">%p\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, p_person)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_3-4访问结构体成员" tabindex="-1">3.4访问结构体成员 <a class="header-anchor" href="#_3-4访问结构体成员" aria-label="Permalink to &quot;3.4访问结构体成员&quot;">​</a></h2><p>用<code>.</code>进行访问</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test3</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		id   </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">		name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> p_person </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">new</span><span style="color:#E1E4E8;">(Person)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//另一种方式，(*p_person).id=10 ,默认忽略星号</span></span>
<span class="line"><span style="color:#E1E4E8;">	p_person.id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">	p_person.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//取值</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;p_person: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">p_person)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test3</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		id   </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">		name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> p_person </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">new</span><span style="color:#24292E;">(Person)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//另一种方式，(*p_person).id=10 ,默认忽略星号</span></span>
<span class="line"><span style="color:#24292E;">	p_person.id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">	p_person.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//取值</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;p_person: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">p_person)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_4-结构体作为函数参数" tabindex="-1">4.结构体作为函数参数 <a class="header-anchor" href="#_4-结构体作为函数参数" aria-label="Permalink to &quot;4.结构体作为函数参数&quot;">​</a></h1><p>go结构体可以像普通函数一样，作为函数的参数，传递给函数，分两种情况</p><p>1.直接传递结构体，这是一个副本(拷贝)，在函数内部不会改变外面结构体内容</p><p>2.传递结构体指针，这时在函数内部，能够改变外部结构体内容</p><h2 id="_4-1直接传递结构体" tabindex="-1">4.1直接传递结构体 <a class="header-anchor" href="#_4-1直接传递结构体" aria-label="Permalink to &quot;4.1直接传递结构体&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Persons</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	id   </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">showPerson</span><span style="color:#E1E4E8;">(per Persons) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	per.id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span></span>
<span class="line"><span style="color:#E1E4E8;">	per.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;per: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, per)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	han </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> Persons{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">101</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;han&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;han: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, han)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;---------------&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">showPerson</span><span style="color:#E1E4E8;">(han)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;han: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, han)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#E1E4E8;">han: {</span><span style="color:#79B8FF;">101</span><span style="color:#E1E4E8;"> han}</span></span>
<span class="line"><span style="color:#F97583;">---------------</span></span>
<span class="line"><span style="color:#E1E4E8;">per: {</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;"> tom}</span></span>
<span class="line"><span style="color:#E1E4E8;">han: {</span><span style="color:#79B8FF;">101</span><span style="color:#E1E4E8;"> han}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Persons</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	id   </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">showPerson</span><span style="color:#24292E;">(per Persons) {</span></span>
<span class="line"><span style="color:#24292E;">	per.id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span></span>
<span class="line"><span style="color:#24292E;">	per.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;per: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, per)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	han </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> Persons{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">101</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;han&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;han: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, han)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;---------------&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">showPerson</span><span style="color:#24292E;">(han)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;han: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, han)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#24292E;">han: {</span><span style="color:#005CC5;">101</span><span style="color:#24292E;"> han}</span></span>
<span class="line"><span style="color:#D73A49;">---------------</span></span>
<span class="line"><span style="color:#24292E;">per: {</span><span style="color:#005CC5;">100</span><span style="color:#24292E;"> tom}</span></span>
<span class="line"><span style="color:#24292E;">han: {</span><span style="color:#005CC5;">101</span><span style="color:#24292E;"> han}</span></span></code></pre></div><p><code>从运行结构看，函数内部改变了结构体内容，函数外面并没有被改变</code></p><h2 id="_4-2传递结构体指针" tabindex="-1">4.2传递结构体指针 <a class="header-anchor" href="#_4-2传递结构体指针" aria-label="Permalink to &quot;4.2传递结构体指针&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Persons</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	id   </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">showPerson</span><span style="color:#E1E4E8;">(per </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Persons) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	per.id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span></span>
<span class="line"><span style="color:#E1E4E8;">	per.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;per: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, per)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	han </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> Persons{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">101</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;han&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;han: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, han)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;---------------&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">showPerson</span><span style="color:#E1E4E8;">(han)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;han: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, han)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#E1E4E8;">han: {</span><span style="color:#79B8FF;">101</span><span style="color:#E1E4E8;"> han}</span></span>
<span class="line"><span style="color:#F97583;">---------------</span></span>
<span class="line"><span style="color:#E1E4E8;">per: </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">{</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;"> tom}</span></span>
<span class="line"><span style="color:#E1E4E8;">han: {</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;"> tom}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Persons</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	id   </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">showPerson</span><span style="color:#24292E;">(per </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Persons) {</span></span>
<span class="line"><span style="color:#24292E;">	per.id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span></span>
<span class="line"><span style="color:#24292E;">	per.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;per: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, per)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	han </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> Persons{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">101</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;han&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;han: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, han)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;---------------&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">showPerson</span><span style="color:#24292E;">(han)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;han: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, han)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#24292E;">han: {</span><span style="color:#005CC5;">101</span><span style="color:#24292E;"> han}</span></span>
<span class="line"><span style="color:#D73A49;">---------------</span></span>
<span class="line"><span style="color:#24292E;">per: </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">{</span><span style="color:#005CC5;">100</span><span style="color:#24292E;"> tom}</span></span>
<span class="line"><span style="color:#24292E;">han: {</span><span style="color:#005CC5;">100</span><span style="color:#24292E;"> tom}</span></span></code></pre></div><h1 id="_5-结构体嵌套" tabindex="-1">5.结构体嵌套 <a class="header-anchor" href="#_5-结构体嵌套" aria-label="Permalink to &quot;5.结构体嵌套&quot;">​</a></h1><p>go语言没有面向对象编程思想，也没有继承关系，但是可以通过结构体嵌套来实现这种效果</p><p>一个人结构体，这个人还养了一个dog结构体</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Dog</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		name  </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">		color </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">		age   </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		dog  Dog</span></span>
<span class="line"><span style="color:#E1E4E8;">		name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">		age  </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	dog </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> Dog{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;嘿嘿&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;hei&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	per </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> Person{</span></span>
<span class="line"><span style="color:#E1E4E8;">		dog,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;per: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, per)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//单独访问dog</span></span>
<span class="line"><span style="color:#E1E4E8;">    fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;per.dog.name: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, per.dog.name)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#E1E4E8;">per: {{嘿嘿 hei </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">} tom </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Dog</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		name  </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">		color </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">		age   </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		dog  Dog</span></span>
<span class="line"><span style="color:#24292E;">		name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">		age  </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	dog </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> Dog{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;嘿嘿&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;hei&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	per </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> Person{</span></span>
<span class="line"><span style="color:#24292E;">		dog,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;per: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, per)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//单独访问dog</span></span>
<span class="line"><span style="color:#24292E;">    fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;per.dog.name: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, per.dog.name)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#24292E;">per: {{嘿嘿 hei </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">} tom </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_6-结构体标签" tabindex="-1">6.结构体标签 <a class="header-anchor" href="#_6-结构体标签" aria-label="Permalink to &quot;6.结构体标签&quot;">​</a></h1><h3 id="标签定义" tabindex="-1">标签定义 <a class="header-anchor" href="#标签定义" aria-label="Permalink to &quot;标签定义&quot;">​</a></h3><p>Tag是结构体在编译阶段关联到成员的元信息字符串，在运行的时候通过反射的机制读取出来。</p><p>结构体标签由一个或多个键值对组成。键与值使用冒号分隔，值用双引号括起来。键值对之间使用一个空格分隔，具体的格式如下：</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">\`key1:&quot;value1&quot; key2:&quot;value2&quot; key3:&quot;value3&quot;...\`  // 键值对用空格分隔</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">\`key1:&quot;value1&quot; key2:&quot;value2&quot; key3:&quot;value3&quot;...\`  // 键值对用空格分隔</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>key会指定反射的解析方式，如下： json(JSON标签) orm(Beego标签)、gorm(GORM标签)、bson(MongoDB标签)、form(表单标签)、binding(表单验证标签)</p><h3 id="标签选项" tabindex="-1">标签选项 <a class="header-anchor" href="#标签选项" aria-label="Permalink to &quot;标签选项&quot;">​</a></h3><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type Student struct {</span></span>
<span class="line"><span style="color:#e1e4e8;">    ID   int     \`json:&quot;-&quot;\`            // 该字段不进行序列化</span></span>
<span class="line"><span style="color:#e1e4e8;">    Name string  \`json:name,omitempy\`  // 如果为类型零值或空值，序列化时忽略该字段</span></span>
<span class="line"><span style="color:#e1e4e8;">    Age  int     \`json:age,string\`     // 指定类型，支持string、number、boolen</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type Student struct {</span></span>
<span class="line"><span style="color:#24292e;">    ID   int     \`json:&quot;-&quot;\`            // 该字段不进行序列化</span></span>
<span class="line"><span style="color:#24292e;">    Name string  \`json:name,omitempy\`  // 如果为类型零值或空值，序列化时忽略该字段</span></span>
<span class="line"><span style="color:#24292e;">    Age  int     \`json:age,string\`     // 指定类型，支持string、number、boolen</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>注：encoding/json<a href="https://link.juejin.cn?target=https%3A%2F%2Fstudygolang.com%2Fstatic%2Fpkgdoc%2Fpkg%2Fencoding_json.htm" target="_blank" rel="noreferrer">官方文档</a></p><h2 id="json标签" tabindex="-1">json标签 <a class="header-anchor" href="#json标签" aria-label="Permalink to &quot;json标签&quot;">​</a></h2><h3 id="json说明" tabindex="-1">JSON说明 <a class="header-anchor" href="#json说明" aria-label="Permalink to &quot;JSON说明&quot;">​</a></h3><p>JSON<code>数组</code>可以用于编码Go语言的<code>数组</code>和<code>slice</code>；由于JSON<code>对象</code>是一个字符串到值的映射，写成一系列的<code>name:value</code>对形式，因此JSON的<code>对象</code>类型可以用于编码Go语言的<code>map</code>和<code>结构体</code>。</p><p>将Go语言中结构体<code>slice</code>转为JSON的过程叫<code>编组</code>(marshaling)，编组通过<code>json.Marshal</code>函数完成。在编码时，默认使用Go语言结构体的成员名字作为JSON的对象（通过reflect反射技术）。只有导出的结构体成员才会被编码。</p><p>如果在结构体slice编码成JSON的时候使用自定义的成员名，可以使用<code>结构体成员Tag</code>来实现。</p><h3 id="json标签-1" tabindex="-1">JSON标签 <a class="header-anchor" href="#json标签-1" aria-label="Permalink to &quot;JSON标签&quot;">​</a></h3><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type User struct {</span></span>
<span class="line"><span style="color:#e1e4e8;">    ID   int \`json:&quot;id&quot;\`  // 编码后的字段名为 id</span></span>
<span class="line"><span style="color:#e1e4e8;">    Name string           // 编码后的字段名为 自定义成员名 Name</span></span>
<span class="line"><span style="color:#e1e4e8;">    age  int              // 未导出字段不能编码</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type User struct {</span></span>
<span class="line"><span style="color:#24292e;">    ID   int \`json:&quot;id&quot;\`  // 编码后的字段名为 id</span></span>
<span class="line"><span style="color:#24292e;">    Name string           // 编码后的字段名为 自定义成员名 Name</span></span>
<span class="line"><span style="color:#24292e;">    age  int              // 未导出字段不能编码</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p><code>json</code>为键名的标签对应的值用于控制<code>encoding/json</code>包的编码和解码的行为，并且<code>encoding/...</code>下面其它的包也遵循这个约定。</p><table><thead><tr><th>标签选项</th><th>使用说明</th></tr></thead><tbody><tr><td>-</td><td>字段不进行序列化 例：<code>json:&quot;-&quot;</code></td></tr><tr><td>omitempy</td><td>类型零值或空值，序列化时忽略该字段 例：<code>json:&quot;,omitempy&quot;</code> 字段名省略的话用结构体字段名</td></tr><tr><td>type</td><td>重新指定字段类型 例：<code>json:&quot;age,string&quot;</code></td></tr></tbody></table><h2 id="gorm标签" tabindex="-1">gorm标签 <a class="header-anchor" href="#gorm标签" aria-label="Permalink to &quot;gorm标签&quot;">​</a></h2><h3 id="模型定义" tabindex="-1">模型定义 <a class="header-anchor" href="#模型定义" aria-label="Permalink to &quot;模型定义&quot;">​</a></h3><p>模型是标准的 struct,由基本数据类型以及实现了 <a href="https://pkg.go.dev/database/sql#Scanner" target="_blank" rel="noreferrer">Scanner</a> 和 <a href="https://pkg.go.dev/database/sql/driver#Valuer" target="_blank" rel="noreferrer">Valuer</a> 接口的自定义类型及其指针或别名组成。</p><p>GORM 定义一个 gorm.Model 结构体，如下所示：</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type Model struct {</span></span>
<span class="line"><span style="color:#e1e4e8;">  ID        uint           \`gorm:&quot;primaryKey&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">  CreatedAt time.Time</span></span>
<span class="line"><span style="color:#e1e4e8;">  UpdatedAt time.Time</span></span>
<span class="line"><span style="color:#e1e4e8;">  DeletedAt gorm.DeletedAt \`gorm:&quot;index&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span>
<span class="line"><span style="color:#e1e4e8;">gorm\`为键名的标签遵循GORM的解析规则，GORM支持如下tag，tag名大小写不敏感，建议使用\`camelCase\`风格，多个标签定义用\`分号(;)分隔</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type Model struct {</span></span>
<span class="line"><span style="color:#24292e;">  ID        uint           \`gorm:&quot;primaryKey&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">  CreatedAt time.Time</span></span>
<span class="line"><span style="color:#24292e;">  UpdatedAt time.Time</span></span>
<span class="line"><span style="color:#24292e;">  DeletedAt gorm.DeletedAt \`gorm:&quot;index&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span>
<span class="line"><span style="color:#24292e;">gorm\`为键名的标签遵循GORM的解析规则，GORM支持如下tag，tag名大小写不敏感，建议使用\`camelCase\`风格，多个标签定义用\`分号(;)分隔</span></span></code></pre></div><p><code>[知识点]</code> Gorm建表时 AUTO_INCREMENT 不生效的问题</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// AUTO_INCREMENT 不生效</span></span>
<span class="line"><span style="color:#e1e4e8;">Id  uint64 \`gorm:&quot;column:id;primaryKey;type:bigint(20);autoIncrement;comment:&#39;主键&#39;&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">// AUTO_INCREMENT 不生效</span></span>
<span class="line"><span style="color:#e1e4e8;">Id  uint64 \`gorm:&quot;column:id;type:bigint(20);autoIncrement;comment:&#39;主键&#39;&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">// AUTO_INCREMENT 生效 gorm会自动根据字段类型设置数据库字段类型并设置为主键</span></span>
<span class="line"><span style="color:#e1e4e8;">Id  uint64 \`gorm:&quot;column:id;autoIncrement;comment:&#39;主键&#39;&quot;\` //写成AUTO_INCREMENT也可以</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// AUTO_INCREMENT 不生效</span></span>
<span class="line"><span style="color:#24292e;">Id  uint64 \`gorm:&quot;column:id;primaryKey;type:bigint(20);autoIncrement;comment:&#39;主键&#39;&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">// AUTO_INCREMENT 不生效</span></span>
<span class="line"><span style="color:#24292e;">Id  uint64 \`gorm:&quot;column:id;type:bigint(20);autoIncrement;comment:&#39;主键&#39;&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">// AUTO_INCREMENT 生效 gorm会自动根据字段类型设置数据库字段类型并设置为主键</span></span>
<span class="line"><span style="color:#24292e;">Id  uint64 \`gorm:&quot;column:id;autoIncrement;comment:&#39;主键&#39;&quot;\` //写成AUTO_INCREMENT也可以</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><table><thead><tr><th>标签选项</th><th>使用说明</th></tr></thead><tbody><tr><td>column</td><td>指定 db 列名</td></tr><tr><td>type</td><td>列数据类型，推荐使用兼容性好的通用类型，例如：所有数据库都支持 bool、int、uint、float、string、time、bytes 并且可以和其他标签一起使用，例如：<code>not null</code>、<code>size</code>, <code>autoIncrement</code>… 像 <code>varbinary(8)</code> 这样指定数据库数据类型也是支持的。在使用指定数据库数据类型时，它需要是完整的数据库数据类型，如：<code>MEDIUMINT UNSIGNED not NULL AUTO_INCREMENT</code></td></tr><tr><td>size</td><td>指定列大小，例如：<code>size:256</code></td></tr><tr><td>primaryKey</td><td>指定列为主键</td></tr><tr><td>unique</td><td>指定列为唯一</td></tr><tr><td>default</td><td>指定列的默认值，字符串默认值用单引号，例：<code>gorm:&quot;default:&#39;cn&#39;&quot;</code></td></tr><tr><td>precision</td><td>指定列的精度</td></tr><tr><td>scale</td><td>指定列大小</td></tr><tr><td>not null</td><td>指定列为 NOT NULL</td></tr><tr><td>autoIncrement</td><td>指定列为自动增长，不可与<code>primaryKey</code>、<code>type</code>同时使用否则不生效，看上面<code>知识点</code>部分</td></tr><tr><td>autoIncrementIncrement</td><td>自动步长，控制连续记录之间的间隔</td></tr><tr><td>embedded</td><td>嵌套字段</td></tr><tr><td>embeddedPrefix</td><td>嵌入字段的列名前缀</td></tr><tr><td>autoCreateTime</td><td>创建时追踪当前时间，对于 <code>int</code> 字段，它会追踪秒级时间戳，您可以使用 <code>nano</code>/<code>milli</code> 来追踪纳秒、毫秒时间戳，例如：<code>autoCreateTime:nano</code></td></tr><tr><td>autoUpdateTime</td><td>创建/更新时追踪当前时间，对于 <code>int</code> 字段，它会追踪秒级时间戳，您可以使用 <code>nano</code>/<code>milli</code> 来追踪纳秒、毫秒时间戳，例如：<code>autoUpdateTime:milli</code></td></tr><tr><td>index</td><td>根据参数创建索引，多个字段使用相同的名称则创建复合索引，查看 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgorm.io%2Fzh_CN%2Fdocs%2Findexes.html" target="_blank" rel="noreferrer">索引</a> 获取详情</td></tr><tr><td>uniqueIndex</td><td>与 <code>index</code> 相同，但创建的是唯一索引</td></tr><tr><td>check</td><td>创建检查约束，例如 <code>check:age &gt; 13</code>，查看 <a href="https://link.juejin.cn?target=https%3A%2F%2Fgorm.io%2Fzh_CN%2Fdocs%2Fconstraints.html" target="_blank" rel="noreferrer">约束</a> 获取详情</td></tr><tr><td>&lt;-</td><td>设置字段写入的权限， <code>&lt;-:create</code> 只创建、<code>&lt;-:update</code> 只更新、<code>&lt;-:false</code> 无写入权限、<code>&lt;-</code> 创建和更新权限</td></tr><tr><td>-&gt;</td><td>设置字段读的权限，<code>-&gt;:false</code> 无读权限</td></tr><tr><td>-</td><td>忽略该字段，<code>-</code> 无读写权限</td></tr><tr><td>comment</td><td>迁移时为字段添加注释</td></tr></tbody></table><p>示例：</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 内容模型</span></span>
<span class="line"><span style="color:#e1e4e8;">type Content struct {</span></span>
<span class="line"><span style="color:#e1e4e8;">    Model</span></span>
<span class="line"><span style="color:#e1e4e8;">    NewsId   uint64  \`gorm:&quot;column:news_id&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">    Content  string  \`gorm:&quot;column:content&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 内容模型</span></span>
<span class="line"><span style="color:#24292e;">type Content struct {</span></span>
<span class="line"><span style="color:#24292e;">    Model</span></span>
<span class="line"><span style="color:#24292e;">    NewsId   uint64  \`gorm:&quot;column:news_id&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">    Content  string  \`gorm:&quot;column:content&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p><code>知识点</code> 自定义唯一索引</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// Go 版本：go1.16.6   Gorm 版本：v1.9.16</span></span>
<span class="line"><span style="color:#e1e4e8;">// 尝试用 uniqueIndex 创建不生效,有解决方法的同学欢迎评论区留言 普通索引是生效的</span></span>
<span class="line"><span style="color:#e1e4e8;">Email string \`gorm:&quot;column:email;type:varchar(50);uniqueIndex:uidx_email&quot;\` // 不生效</span></span>
<span class="line"><span style="color:#e1e4e8;">Email string \`gorm:&quot;column:email;type:varchar(50);index:idx_email&quot;\`        // 生效</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 创建唯一索引 建表时会创建名称为 email 的唯一索引</span></span>
<span class="line"><span style="color:#e1e4e8;">Email string \`gorm:&quot;column:email;type:varchar(50);unique&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">// 创建自定义名称 uidx_email 的唯一索引</span></span>
<span class="line"><span style="color:#e1e4e8;">Email string \`gorm:&quot;column:email;type:varchar(50)&quot; sql:&quot;unique_index:uidx_email&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// Go 版本：go1.16.6   Gorm 版本：v1.9.16</span></span>
<span class="line"><span style="color:#24292e;">// 尝试用 uniqueIndex 创建不生效,有解决方法的同学欢迎评论区留言 普通索引是生效的</span></span>
<span class="line"><span style="color:#24292e;">Email string \`gorm:&quot;column:email;type:varchar(50);uniqueIndex:uidx_email&quot;\` // 不生效</span></span>
<span class="line"><span style="color:#24292e;">Email string \`gorm:&quot;column:email;type:varchar(50);index:idx_email&quot;\`        // 生效</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 创建唯一索引 建表时会创建名称为 email 的唯一索引</span></span>
<span class="line"><span style="color:#24292e;">Email string \`gorm:&quot;column:email;type:varchar(50);unique&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">// 创建自定义名称 uidx_email 的唯一索引</span></span>
<span class="line"><span style="color:#24292e;">Email string \`gorm:&quot;column:email;type:varchar(50)&quot; sql:&quot;unique_index:uidx_email&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p><code>知识点</code> 自动更新时间</p><p><code>GORM</code>约定使用<code>CreatedAt</code>、<code>UpdatedAt</code>追踪创建/更新时间。如果定义了这种字段，且默认值为零值，<code>GORM</code>在创建、更新时会自动填充当前时间。要使用不同名称的字段，您可以配置<code>autoCreateTime</code>、<code>autoUpdateTime</code>标签，如果想要保存 UNIX（毫/纳）秒时间戳，而不是 time，只需简单地将 time.Time 修改为 int 即可，毫/纳秒参数可以看上面表格示例。</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 时间自动创建和更新</span></span>
<span class="line"><span style="color:#e1e4e8;">type User struct { </span></span>
<span class="line"><span style="color:#e1e4e8;">    // 自定义字段  使用时间戳填纳秒数充更新时间 </span></span>
<span class="line"><span style="color:#e1e4e8;">    Updated   int64 \`gorm:&quot;autoUpdateTime:nano&quot;\` </span></span>
<span class="line"><span style="color:#e1e4e8;">    //自定义字段  使用时间戳毫秒数填充更新时间 </span></span>
<span class="line"><span style="color:#e1e4e8;">    Updated   int64 \`gorm:&quot;autoUpdateTime:milli&quot;\` </span></span>
<span class="line"><span style="color:#e1e4e8;">    //自定义字段  使用时间戳秒数填充创建时间 </span></span>
<span class="line"><span style="color:#e1e4e8;">    Created   int64 \`gorm:&quot;autoCreateTime&quot;\` </span></span>
<span class="line"><span style="color:#e1e4e8;">    // 默认创建时间字段  在创建时如果该字段值为零值，则使用当前时间填充 </span></span>
<span class="line"><span style="color:#e1e4e8;">    CreatedAt time.Time </span></span>
<span class="line"><span style="color:#e1e4e8;">    // 默认更新时间字段  在创建时该字段值为零值或者在更新时，使用当前时间戳秒数填充 </span></span>
<span class="line"><span style="color:#e1e4e8;">    UpdatedAt int      </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 时间自动创建和更新</span></span>
<span class="line"><span style="color:#24292e;">type User struct { </span></span>
<span class="line"><span style="color:#24292e;">    // 自定义字段  使用时间戳填纳秒数充更新时间 </span></span>
<span class="line"><span style="color:#24292e;">    Updated   int64 \`gorm:&quot;autoUpdateTime:nano&quot;\` </span></span>
<span class="line"><span style="color:#24292e;">    //自定义字段  使用时间戳毫秒数填充更新时间 </span></span>
<span class="line"><span style="color:#24292e;">    Updated   int64 \`gorm:&quot;autoUpdateTime:milli&quot;\` </span></span>
<span class="line"><span style="color:#24292e;">    //自定义字段  使用时间戳秒数填充创建时间 </span></span>
<span class="line"><span style="color:#24292e;">    Created   int64 \`gorm:&quot;autoCreateTime&quot;\` </span></span>
<span class="line"><span style="color:#24292e;">    // 默认创建时间字段  在创建时如果该字段值为零值，则使用当前时间填充 </span></span>
<span class="line"><span style="color:#24292e;">    CreatedAt time.Time </span></span>
<span class="line"><span style="color:#24292e;">    // 默认更新时间字段  在创建时该字段值为零值或者在更新时，使用当前时间戳秒数填充 </span></span>
<span class="line"><span style="color:#24292e;">    UpdatedAt int      </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>注：GORM模型 <a href="https://gorm.io/zh_CN/docs/models.html" target="_blank" rel="noreferrer">官方文档</a></p><h3 id="关联标签" tabindex="-1">关联标签 <a class="header-anchor" href="#关联标签" aria-label="Permalink to &quot;关联标签&quot;">​</a></h3><p>GORM的关联类型有多重类型：<code>belongs to</code>、<code>has one</code>、<code>has many</code>、<code>many to many</code>具体结构体定义可参考问<a href="https://link.juejin.cn?target=https%3A%2F%2Fgorm.io%2Fzh_CN%2Fdocs%2Fbelongs_to.html" target="_blank" rel="noreferrer">文档</a>，关联模式使用的标签选项如下所示：</p><table><thead><tr><th>标签选项</th><th>使用说明</th></tr></thead><tbody><tr><td>foreignKey</td><td>指定当前模型的列作为连接表的外键 例：<code>gorm:&quot;foreignKey:FieldId&quot;</code> 其中FieldID是外键字段名</td></tr><tr><td>references</td><td>指定引用表的列名，其将被映射为连接表外键</td></tr><tr><td>polymorphic</td><td>指定多态类型，比如模型名</td></tr><tr><td>polymorphicValue</td><td>指定多态值、默认表名</td></tr><tr><td>many2many</td><td>指定连接表表名</td></tr><tr><td>joinForeignKey</td><td>指定连接表的外键列名，其将被映射到当前表</td></tr><tr><td>joinReferences</td><td>指定连接表的外键列名，其将被映射到引用表</td></tr><tr><td>constraint</td><td>关系约束，例如：<code>OnUpdate</code>、<code>OnDelete</code></td></tr></tbody></table><p>示例：</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 新闻模型</span></span>
<span class="line"><span style="color:#e1e4e8;">type News struct {</span></span>
<span class="line"><span style="color:#e1e4e8;">    Model</span></span>
<span class="line"><span style="color:#e1e4e8;">    Title   string   \`gorm:&quot;column:title;type:string;not null,default:&#39;&#39;&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">    Content Content  \`gorm:&quot;foreignKey:NewsId&quot; json:&quot;content&quot;\` //指定外键</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 新闻模型</span></span>
<span class="line"><span style="color:#24292e;">type News struct {</span></span>
<span class="line"><span style="color:#24292e;">    Model</span></span>
<span class="line"><span style="color:#24292e;">    Title   string   \`gorm:&quot;column:title;type:string;not null,default:&#39;&#39;&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">    Content Content  \`gorm:&quot;foreignKey:NewsId&quot; json:&quot;content&quot;\` //指定外键</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>注：GORM关联模型 <a href="https://gorm.io/zh_CN/docs/associations.html#tags" target="_blank" rel="noreferrer">官方文档</a></p><h2 id="form标签" tabindex="-1">form标签 <a class="header-anchor" href="#form标签" aria-label="Permalink to &quot;form标签&quot;">​</a></h2><p>Gin中提供了模型绑定，将表单数据和模型进行绑定，方便参数校验和使用。</p><h3 id="模型绑定" tabindex="-1">模型绑定 <a class="header-anchor" href="#模型绑定" aria-label="Permalink to &quot;模型绑定&quot;">​</a></h3><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 表单数据</span></span>
<span class="line"><span style="color:#e1e4e8;">type LoginForm struct {</span></span>
<span class="line"><span style="color:#e1e4e8;">    Email     string    \`form:&quot;emial&quot;\`    </span></span>
<span class="line"><span style="color:#e1e4e8;">    Password  string    \`form:&quot;password&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">// model 或 service 层Model</span></span>
<span class="line"><span style="color:#e1e4e8;">type Email struct {</span></span>
<span class="line"><span style="color:#e1e4e8;">    Email       string</span></span>
<span class="line"><span style="color:#e1e4e8;">    Password    string</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 表单数据</span></span>
<span class="line"><span style="color:#24292e;">type LoginForm struct {</span></span>
<span class="line"><span style="color:#24292e;">    Email     string    \`form:&quot;emial&quot;\`    </span></span>
<span class="line"><span style="color:#24292e;">    Password  string    \`form:&quot;password&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">// model 或 service 层Model</span></span>
<span class="line"><span style="color:#24292e;">type Email struct {</span></span>
<span class="line"><span style="color:#24292e;">    Email       string</span></span>
<span class="line"><span style="color:#24292e;">    Password    string</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>通过 form:&quot;email&quot; 对表单email数据进行绑定。然后通过Bind()、ShouldBind()等方法获取参数值。</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">func EmailLogin (c *gin.Context) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    var email LoginForm</span></span>
<span class="line"><span style="color:#e1e4e8;">    if err := c.ShouldBind(&amp;email); err != nil {</span></span>
<span class="line"><span style="color:#e1e4e8;">        ...</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 获取表单数据局</span></span>
<span class="line"><span style="color:#e1e4e8;">    args := Email {</span></span>
<span class="line"><span style="color:#e1e4e8;">        Email:     email.Email,</span></span>
<span class="line"><span style="color:#e1e4e8;">        Password:  email.Password,</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 对参数进行后续使用</span></span>
<span class="line"><span style="color:#e1e4e8;">    ...</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">func EmailLogin (c *gin.Context) {</span></span>
<span class="line"><span style="color:#24292e;">    var email LoginForm</span></span>
<span class="line"><span style="color:#24292e;">    if err := c.ShouldBind(&amp;email); err != nil {</span></span>
<span class="line"><span style="color:#24292e;">        ...</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    // 获取表单数据局</span></span>
<span class="line"><span style="color:#24292e;">    args := Email {</span></span>
<span class="line"><span style="color:#24292e;">        Email:     email.Email,</span></span>
<span class="line"><span style="color:#24292e;">        Password:  email.Password,</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    // 对参数进行后续使用</span></span>
<span class="line"><span style="color:#24292e;">    ...</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><h2 id="binding标签" tabindex="-1">binding标签 <a class="header-anchor" href="#binding标签" aria-label="Permalink to &quot;binding标签&quot;">​</a></h2><p>Gin对于数据的校验使用的是 <code>validator.v10</code> <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fgo-playground%2Fvalidator" target="_blank" rel="noreferrer">包</a>，该包提供多种数据校验方法，通过<code>binding:&quot;&quot;</code>标签来进行数据校验。</p><p>我们对上面的表单模型添加数据校验标签如下：</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type LoginForm struct {</span></span>
<span class="line"><span style="color:#e1e4e8;">    Email     string    \`form:&quot;emial&quot; binding:&quot;email&quot;\`    </span></span>
<span class="line"><span style="color:#e1e4e8;">    Password  string    \`form:&quot;password&quot; binging:&quot;required,min=6,max=10&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type LoginForm struct {</span></span>
<span class="line"><span style="color:#24292e;">    Email     string    \`form:&quot;emial&quot; binding:&quot;email&quot;\`    </span></span>
<span class="line"><span style="color:#24292e;">    Password  string    \`form:&quot;password&quot; binging:&quot;required,min=6,max=10&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>特殊符号说明：</p><ul><li>逗号（,）:分隔多个标签选项，逗号之间不能有空格，否则panic；</li><li>横线（-）:跳过该字段不做校验；</li><li>竖线（|）:使用多个选项，满足其中一个即可。</li></ul><p>binding标签选项：</p><h3 id="必需校验" tabindex="-1">必需校验 <a class="header-anchor" href="#必需校验" aria-label="Permalink to &quot;必需校验&quot;">​</a></h3><table><thead><tr><th>标签选项</th><th>使用说明</th><th>示例</th></tr></thead><tbody><tr><td>required</td><td>表示该字段值必输设置，且不能为默认值</td><td><code>binding:required</code></td></tr><tr><td>omitempty</td><td>如果字段未设置，则忽略它</td><td><code>binding:reqomitemptyuired</code></td></tr></tbody></table><h3 id="范围校验" tabindex="-1">范围校验 <a class="header-anchor" href="#范围校验" aria-label="Permalink to &quot;范围校验&quot;">​</a></h3><p>范围验证: 切片、数组和map、字符串，验证其长度；数值，验证大小范围</p><table><thead><tr><th>标签选项</th><th>使用说明</th><th>示例</th></tr></thead><tbody><tr><td>len</td><td>参数值等于给定值</td><td><code>binding:&quot;len=8&quot;</code>等于8</td></tr><tr><td>ne</td><td>不等于</td><td><code>binding:&quot;ne=8&quot;</code>不等于8</td></tr><tr><td>max</td><td>最大值，小于等于参数值</td><td><code>binding:&quot;max=8&quot;</code>小于等于8</td></tr><tr><td>min</td><td>最小值，大于等于参数值</td><td><code>binding:&quot;min=8&quot;</code>大于等于8</td></tr><tr><td>lte</td><td>参数值小于等于给定值</td><td><code>binding:&quot;lte=8&quot;</code>小于等于8</td></tr><tr><td>gte</td><td>参数值大于等于给定值</td><td><code>binding:&quot;gte=8&quot;</code>大于等于8</td></tr><tr><td>lt</td><td>参数值小于给定值</td><td><code>binding:&quot;lt=8&quot;</code>小于8</td></tr><tr><td>gt</td><td>参数值大于给定值</td><td><code>binding:&quot;gt=8&quot;</code>大于8</td></tr><tr><td>oneof</td><td>参数值只能是枚举值中的一个，值必须是数值或字符串，以空格分隔，如果字符串中有空格，将字符串用单引号包围</td><td><code>binding:&quot;oneof=red green&quot;</code></td></tr></tbody></table><p>示例：</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type User struct {</span></span>
<span class="line"><span style="color:#e1e4e8;">    Name string \`form:&quot;name&quot; binding:&quot;required,min=1,max=10&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">    Age  unit8  \`form:&quot;age&quot; binding:&quot;lte=150,gte=0&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">    sex  string \`form:&quot;sex&quot; binding:&quot;oneof=male female&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type User struct {</span></span>
<span class="line"><span style="color:#24292e;">    Name string \`form:&quot;name&quot; binding:&quot;required,min=1,max=10&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">    Age  unit8  \`form:&quot;age&quot; binding:&quot;lte=150,gte=0&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">    sex  string \`form:&quot;sex&quot; binding:&quot;oneof=male female&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>注：<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fgo-playground%2Fvalidator%2Fblob%2Fmaster%2FREADME.md%23comparisons" target="_blank" rel="noreferrer">文档地址</a></p><h3 id="字符串校验" tabindex="-1">字符串校验 <a class="header-anchor" href="#字符串校验" aria-label="Permalink to &quot;字符串校验&quot;">​</a></h3><table><thead><tr><th>标签选项</th><th>使用说明</th><th>示例</th></tr></thead><tbody><tr><td>contains</td><td>参数值包含设置子串</td><td><code>binding:&quot;contains=tom&quot;</code>是否包含tom字符串</td></tr><tr><td>excludes</td><td>参数值不包含设置子串</td><td><code>binding:&quot;excludes=tom&quot;</code>是否不包含tom字符串</td></tr><tr><td>startswith</td><td>字符串前缀</td><td><code>binding:&quot;startswith=tom&quot;</code>是否以tom开头</td></tr><tr><td>endswith</td><td>字符串前缀</td><td><code>binding:&quot;endswith=tom&quot;</code>是否以tom结尾</td></tr></tbody></table><p>示例：</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type User struct {</span></span>
<span class="line"><span style="color:#e1e4e8;">    Name string \`form:&quot;name&quot; binding:&quot;required,contains=ac,endswith=ck&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type User struct {</span></span>
<span class="line"><span style="color:#24292e;">    Name string \`form:&quot;name&quot; binding:&quot;required,contains=ac,endswith=ck&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>注：<a href="https://github.com/go-playground/validator/blob/master/README.md#strings" target="_blank" rel="noreferrer">文档地址</a></p><h3 id="字段校验" tabindex="-1">字段校验 <a class="header-anchor" href="#字段校验" aria-label="Permalink to &quot;字段校验&quot;">​</a></h3><table><thead><tr><th>标签选项</th><th>使用说明</th></tr></thead><tbody><tr><td>eqcsfield</td><td>跨不同结构体字段相等，比如<code>struct1 field1</code> 是否等于<code>struct2 field2</code></td></tr><tr><td>necsfield</td><td>跨不同结构体字段不相等</td></tr><tr><td>eqfield</td><td>同一结构体字段相等验证，例如：输入两次密码</td></tr><tr><td>nefield</td><td>同一结构体字段不相等验证</td></tr><tr><td>gtefield</td><td>大于等于同一结构体字段</td></tr><tr><td>ltefield</td><td>小于等于同一结构体字段</td></tr></tbody></table><p>示例：</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 跨不同结构体字段相等</span></span>
<span class="line"><span style="color:#e1e4e8;">type Struct1 struct { </span></span>
<span class="line"><span style="color:#e1e4e8;">    Field1 string \`validate:eqcsfield=Struct2.Field2\` </span></span>
<span class="line"><span style="color:#e1e4e8;">    Struct2 struct { </span></span>
<span class="line"><span style="color:#e1e4e8;">        Field2 string </span></span>
<span class="line"><span style="color:#e1e4e8;">    } </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">// 同一结构体字段相等验证</span></span>
<span class="line"><span style="color:#e1e4e8;">type Email struct { </span></span>
<span class="line"><span style="color:#e1e4e8;">    Email  string \`validate:&quot;lte=4&quot;\` </span></span>
<span class="line"><span style="color:#e1e4e8;">    Pwd    string \`validate:&quot;min=10&quot;\` </span></span>
<span class="line"><span style="color:#e1e4e8;">    Pwd2   string \`validate:&quot;eqfield=Pwd&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">// 同一结构体字段验证不相等</span></span>
<span class="line"><span style="color:#e1e4e8;">type User struct { </span></span>
<span class="line"><span style="color:#e1e4e8;">    Name     string \`validate:&quot;lte=4&quot;\` </span></span>
<span class="line"><span style="color:#e1e4e8;">    Age      int \`validate:&quot;min=20&quot;\` </span></span>
<span class="line"><span style="color:#e1e4e8;">    Password string \`validate:&quot;min=10,nefield=Name&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 跨不同结构体字段相等</span></span>
<span class="line"><span style="color:#24292e;">type Struct1 struct { </span></span>
<span class="line"><span style="color:#24292e;">    Field1 string \`validate:eqcsfield=Struct2.Field2\` </span></span>
<span class="line"><span style="color:#24292e;">    Struct2 struct { </span></span>
<span class="line"><span style="color:#24292e;">        Field2 string </span></span>
<span class="line"><span style="color:#24292e;">    } </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">// 同一结构体字段相等验证</span></span>
<span class="line"><span style="color:#24292e;">type Email struct { </span></span>
<span class="line"><span style="color:#24292e;">    Email  string \`validate:&quot;lte=4&quot;\` </span></span>
<span class="line"><span style="color:#24292e;">    Pwd    string \`validate:&quot;min=10&quot;\` </span></span>
<span class="line"><span style="color:#24292e;">    Pwd2   string \`validate:&quot;eqfield=Pwd&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">// 同一结构体字段验证不相等</span></span>
<span class="line"><span style="color:#24292e;">type User struct { </span></span>
<span class="line"><span style="color:#24292e;">    Name     string \`validate:&quot;lte=4&quot;\` </span></span>
<span class="line"><span style="color:#24292e;">    Age      int \`validate:&quot;min=20&quot;\` </span></span>
<span class="line"><span style="color:#24292e;">    Password string \`validate:&quot;min=10,nefield=Name&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><h3 id="其他校验" tabindex="-1">其他校验 <a class="header-anchor" href="#其他校验" aria-label="Permalink to &quot;其他校验&quot;">​</a></h3><table><thead><tr><th>标签选项</th><th>使用说明</th><th>示例</th></tr></thead><tbody><tr><td>ip</td><td>合法IP地址校验</td><td><code>binding:&quot;ip&quot;</code></td></tr><tr><td>email</td><td>合法邮箱校验</td><td><code>binding:&quot;email&quot;</code></td></tr><tr><td>url</td><td>合法的URL</td><td><code>binding:&quot;url&quot;</code></td></tr><tr><td>uri</td><td>合法的URI</td><td><code>binding:&quot;uri&quot;</code></td></tr><tr><td>uuid</td><td>uuid验证</td><td><code>binding:&quot;uuid&quot;</code></td></tr><tr><td>datetime</td><td>合法时间格式值校验</td><td><code>binding:&quot;datetime=2006-01-02&quot;</code></td></tr><tr><td>json</td><td>JSON数据验证</td><td><code>validate:&quot;json&quot;</code></td></tr><tr><td>numeric</td><td>数值验证 正则：<code>^[-+]?[0-9]+(?:\\\\.[0-9]+)?$</code></td><td><code>validate:&quot;numeric&quot;</code></td></tr><tr><td>number</td><td>整数验证 正则：<code>^[0-9]+$</code></td><td><code>validate:&quot;number&quot;</code></td></tr><tr><td>alpha</td><td>字母字符串验证 正则：<code>^[a-zA-Z]+$</code></td><td><code>validate:&quot;alpha&quot;</code></td></tr><tr><td>alphanum</td><td>字母数字字符串验证 正则：<code>^[a-zA-Z0-9]+$</code></td><td><code>validate:&quot;alphanum&quot;</code></td></tr><tr><td>ascii</td><td>Ascii 字符验证</td><td><code>validate:&quot;ascii&quot;</code></td></tr></tbody></table><p>示例：</p><div class="language-golang vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">golang</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">type User struct { </span></span>
<span class="line"><span style="color:#e1e4e8;">    Name     string  \`validate:&quot;required,min=1,max=10&quot;\` </span></span>
<span class="line"><span style="color:#e1e4e8;">    Email    int     \`validate:&quot;required,email&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">    birthday string  \`validate:&quot;datetime=2006-01-02&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">    Pwd      string  \`validate:&quot;required,alphanum&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">    Score    srring  \`validate:&quot;numeric&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">复制代码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">type User struct { </span></span>
<span class="line"><span style="color:#24292e;">    Name     string  \`validate:&quot;required,min=1,max=10&quot;\` </span></span>
<span class="line"><span style="color:#24292e;">    Email    int     \`validate:&quot;required,email&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">    birthday string  \`validate:&quot;datetime=2006-01-02&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">    Pwd      string  \`validate:&quot;required,alphanum&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">    Score    srring  \`validate:&quot;numeric&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">复制代码</span></span></code></pre></div><p>注：<a href="https://github.com/go-playground/validator/blob/master/README.md#network" target="_blank" rel="noreferrer">文档地址</a></p><h2 id="ini标签" tabindex="-1">ini标签 <a class="header-anchor" href="#ini标签" aria-label="Permalink to &quot;ini标签&quot;">​</a></h2><p>在使用<code>go-ini</code>库操作.ini配置文件的时候，如果需要将配置文件字段映射到结构体变量，如果键名与字段名不相同，那么需要在结构标签中指定对应的键名。标准库<code>encoding/json</code>、<code>encoding/xml</code>解析时可以将键名<code>app_name</code>对应到字段名<code>AppName</code>，而go-ini库不可以，所以需要在结构体标签指定对应键名。</p><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">## 配置文件 cnf.ini</span></span>
<span class="line"><span style="color:#F97583;">app_name</span><span style="color:#E1E4E8;">  = awesome web</span></span>
<span class="line"><span style="color:#F97583;">log_level</span><span style="color:#E1E4E8;"> = DEBUG</span></span>
<span class="line"><span style="color:#E1E4E8;">复制代码</span></span>
<span class="line"><span style="color:#E1E4E8;">// 配置文件映射 结构体</span></span>
<span class="line"><span style="color:#E1E4E8;">type Config struct {</span></span>
<span class="line"><span style="color:#E1E4E8;">  AppName   string \`ini:</span><span style="color:#9ECBFF;">&quot;app_name&quot;</span><span style="color:#E1E4E8;">\`  // ini标签指定下键名</span></span>
<span class="line"><span style="color:#E1E4E8;">  LogLevel  string \`ini:</span><span style="color:#9ECBFF;">&quot;log_level&quot;</span><span style="color:#E1E4E8;">\`</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">## 配置文件 cnf.ini</span></span>
<span class="line"><span style="color:#D73A49;">app_name</span><span style="color:#24292E;">  = awesome web</span></span>
<span class="line"><span style="color:#D73A49;">log_level</span><span style="color:#24292E;"> = DEBUG</span></span>
<span class="line"><span style="color:#24292E;">复制代码</span></span>
<span class="line"><span style="color:#24292E;">// 配置文件映射 结构体</span></span>
<span class="line"><span style="color:#24292E;">type Config struct {</span></span>
<span class="line"><span style="color:#24292E;">  AppName   string \`ini:</span><span style="color:#032F62;">&quot;app_name&quot;</span><span style="color:#24292E;">\`  // ini标签指定下键名</span></span>
<span class="line"><span style="color:#24292E;">  LogLevel  string \`ini:</span><span style="color:#032F62;">&quot;log_level&quot;</span><span style="color:#24292E;">\`</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,142),e=[o];function t(c,r,i,y,E,d){return n(),a("div",null,e)}const g=s(p,[["render",t]]);export{m as __pageData,g as default};
