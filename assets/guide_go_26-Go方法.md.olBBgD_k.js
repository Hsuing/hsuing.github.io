import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1. golang方法","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/26-Go方法.md","filePath":"guide/go/26-Go方法.md","lastUpdated":1726049713000}'),l={name:"guide/go/26-Go方法.md"},o=p(`<h1 id="_1-golang方法" tabindex="-1">1. golang方法 <a class="header-anchor" href="#_1-golang方法" aria-label="Permalink to &quot;1. golang方法&quot;">​</a></h1><p>go语言没有面向对象的特征，也没有类对象的概念。但是，可以使用结构体来模拟这些特征，我们都知道面向对象里面有类方法等概念。我们可以声明一些方法，属于某个结构体。</p><p>在面向对象编程中，一个对象其实也就是一个简单的值或者一个变量，在这个对象中会包含一些函数，<code>这种带有接收者的函数，我们称之为方法（method）</code>。本质上，一个方法则是一个和特殊类型关联的函数。</p><p>一个面向对象的程序会用方法来表达其属性和对应的操作，这样使用这个对象的用户就不需要直接去操作对象，而是借助方法来做这些事情。</p><p>在 Go 语言中，可以给任意自定义类型（包括内置类型，但不包括指针类型）添加相应的方法。</p><p>方法总是绑定对象实例，并隐式将实例作为第一实参（receiver）</p><h2 id="_1-1-go语言放的语法" tabindex="-1">1.1 go语言放的语法 <a class="header-anchor" href="#_1-1-go语言放的语法" aria-label="Permalink to &quot;1.1 go语言放的语法&quot;">​</a></h2><p>Go中的方法，是一种特殊的函数，定义于struct之上（与struct关联、绑定），被称为struct的接受者（receiver）。</p><p>通俗的讲，方法就是有接受者的函数。</p><ul><li>语法格式：</li></ul><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mytype</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (recv mytype)</span><span style="color:#79B8FF;">my_method</span><span style="color:#E1E4E8;">(para) return_type{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (recv </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">mytype)</span><span style="color:#79B8FF;">my_method</span><span style="color:#E1E4E8;">(para) return_type{}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mytype</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (recv mytype)</span><span style="color:#005CC5;">my_method</span><span style="color:#24292E;">(para) return_type{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (recv </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">mytype)</span><span style="color:#005CC5;">my_method</span><span style="color:#24292E;">(para) return_type{}</span></span></code></pre></div><p><code>mytype</code>:定义一个结构体</p><p><code>recv</code>:接受该方法的结构体(receiver)</p><p><code>my_method</code>:方法名称</p><p><code>para</code>:参数列表</p><p><code>return_type</code>:返回值类型</p><blockquote><p>从语法格式可以看出，一个方法和一个函数非常相似，多了一个接受类型</p></blockquote><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 属性</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 方法</span></span>
<span class="line"><span style="color:#6A737D;">// (per Person)接收者 receiver</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (per Person) </span><span style="color:#B392F0;">eat</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;eat...: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, per.name)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (per Person) </span><span style="color:#B392F0;">sleep</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;sleep...: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, per.name)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// other</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Customer</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (customer Customer) </span><span style="color:#B392F0;">login</span><span style="color:#E1E4E8;">(name </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">, pwd </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">bool</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> name </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> pwd </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;123&quot;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">	} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	cus </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> Customer{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	logins </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> cus.</span><span style="color:#79B8FF;">login</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;123&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;logins: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, logins)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">/*per := Person{</span></span>
<span class="line"><span style="color:#6A737D;">		&quot;tom&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">	}</span></span>
<span class="line"><span style="color:#6A737D;">	per.eat()</span></span>
<span class="line"><span style="color:#6A737D;">	per.sleep()*/</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 属性</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 方法</span></span>
<span class="line"><span style="color:#6A737D;">// (per Person)接收者 receiver</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (per Person) </span><span style="color:#6F42C1;">eat</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;eat...: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, per.name)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (per Person) </span><span style="color:#6F42C1;">sleep</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;sleep...: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, per.name)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// other</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Customer</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (customer Customer) </span><span style="color:#6F42C1;">login</span><span style="color:#24292E;">(name </span><span style="color:#D73A49;">string</span><span style="color:#24292E;">, pwd </span><span style="color:#D73A49;">string</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">bool</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> name </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> pwd </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;123&quot;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">	} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	cus </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> Customer{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	logins </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> cus.</span><span style="color:#005CC5;">login</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;123&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;logins: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, logins)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">/*per := Person{</span></span>
<span class="line"><span style="color:#6A737D;">		&quot;tom&quot;,</span></span>
<span class="line"><span style="color:#6A737D;">	}</span></span>
<span class="line"><span style="color:#6A737D;">	per.eat()</span></span>
<span class="line"><span style="color:#6A737D;">	per.sleep()*/</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>go语言方法的注意事项</li></ul><p>1.方法的receiver type并非一定是struct类型，type定义的类型别名、slice、map、channel、func类型等都可以</p><p>2.struct结合它的方法就等价于面向对象中的类。只不过struct可以和它的方法拆开，并非一定要属于同一个文件，但必须属于同一个包。</p><p>3.方法有两种接受类型：<code>(T Type)和(T *Type)</code>,它们之间有区别。</p><p>4.方法就是函数，所以Go中中没有方法重载(overload)的说法，也就是说同一个类型中的所有方法名必须都唯一。</p><p>5.如果receiver是一个指针类型，则会自动解除引用</p><p>6.方法和type是分开的，意味着实例的行为（behavior）和数据存储(field)是分开的，但是它们通过receiver建立起关联关系。</p><h2 id="_1-2-go方法接收者类型" tabindex="-1">1.2 go方法接收者类型 <a class="header-anchor" href="#_1-2-go方法接收者类型" aria-label="Permalink to &quot;1.2 go方法接收者类型&quot;">​</a></h2><p>结构体实例，有值类型和指针类型，那么方法的接受者是结构体，那么有值类型和指针类型。区别就是接收者是否复制结构体副本。值类型复制，指针类型不复制。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	p1 </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> Person{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	p2 </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">Person{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;p1: </span><span style="color:#79B8FF;">%T\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, p1)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;p2: </span><span style="color:#79B8FF;">%T\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, p2)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#输出结果</span></span>
<span class="line"><span style="color:#E1E4E8;">p1: main.Person</span></span>
<span class="line"><span style="color:#E1E4E8;">p2: </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">main.Person</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	p1 </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> Person{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	p2 </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">Person{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;p1: </span><span style="color:#005CC5;">%T\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, p1)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;p2: </span><span style="color:#005CC5;">%T\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, p2)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#输出结果</span></span>
<span class="line"><span style="color:#24292E;">p1: main.Person</span></span>
<span class="line"><span style="color:#24292E;">p2: </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">main.Person</span></span></code></pre></div><ul><li>传参结构体例子</li></ul><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test1</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	p1 </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> Person{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	p2 </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">Person{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;tom&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;p1: </span><span style="color:#79B8FF;">%T\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, p1)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;p2: </span><span style="color:#79B8FF;">%T\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, p2)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">showPerson</span><span style="color:#E1E4E8;">(per Person1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	per.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">showPerson2</span><span style="color:#E1E4E8;">(per </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Person1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//per.name自动解引用</span></span>
<span class="line"><span style="color:#E1E4E8;">	per.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	p1 </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> Person1{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;tom...&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	p2 </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">Person1{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;tom...&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">showPerson</span><span style="color:#E1E4E8;">(p1)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;p1: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, p1)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;----------------------&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">showPerson2</span><span style="color:#E1E4E8;">(p2)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;p2: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">p2)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//从结果看，p1是值传递，拷贝了副本，本地发生了改变，而p2是指针类型，地址没有变化</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#结果</span></span>
<span class="line"><span style="color:#E1E4E8;">p1: {tom</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">----------------------</span></span>
<span class="line"><span style="color:#E1E4E8;">p2: {tom}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test1</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	p1 </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> Person{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	p2 </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">Person{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;tom&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;p1: </span><span style="color:#005CC5;">%T\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, p1)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;p2: </span><span style="color:#005CC5;">%T\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, p2)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">showPerson</span><span style="color:#24292E;">(per Person1) {</span></span>
<span class="line"><span style="color:#24292E;">	per.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">showPerson2</span><span style="color:#24292E;">(per </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Person1) {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//per.name自动解引用</span></span>
<span class="line"><span style="color:#24292E;">	per.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	p1 </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> Person1{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;tom...&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	p2 </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">Person1{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;tom...&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">showPerson</span><span style="color:#24292E;">(p1)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;p1: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, p1)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;----------------------&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">showPerson2</span><span style="color:#24292E;">(p2)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;p2: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">p2)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//从结果看，p1是值传递，拷贝了副本，本地发生了改变，而p2是指针类型，地址没有变化</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#结果</span></span>
<span class="line"><span style="color:#24292E;">p1: {tom</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">----------------------</span></span>
<span class="line"><span style="color:#24292E;">p2: {tom}</span></span></code></pre></div><h2 id="_1-3-方法的值类型和指针类型接受者" tabindex="-1">1.3 方法的值类型和指针类型接受者 <a class="header-anchor" href="#_1-3-方法的值类型和指针类型接受者" aria-label="Permalink to &quot;1.3 方法的值类型和指针类型接受者&quot;">​</a></h2><p>值类型和指针类型接受者，本质上和函数传参道理相同</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">struct</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	name </span><span style="color:#F97583;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (per Person1) </span><span style="color:#B392F0;">showPerson3</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	per.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (per </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">Person1) </span><span style="color:#B392F0;">showPerson4</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//per.name自动解引用</span></span>
<span class="line"><span style="color:#E1E4E8;">	per.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	p1 </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> Person1{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;tom...&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	p2 </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">Person1{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;tom...&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//从结果看，p1是值传递，拷贝了副本，本地发生了改变，而p2是指针类型，地址没有变化</span></span>
<span class="line"><span style="color:#E1E4E8;">	p1.</span><span style="color:#79B8FF;">showPerson3</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;p1: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, p1)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;----------------------&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	p2.</span><span style="color:#79B8FF;">showPerson4</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;p2: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">p2)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">struct</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	name </span><span style="color:#D73A49;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (per Person1) </span><span style="color:#6F42C1;">showPerson3</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	per.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (per </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">Person1) </span><span style="color:#6F42C1;">showPerson4</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//per.name自动解引用</span></span>
<span class="line"><span style="color:#24292E;">	per.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;tom&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	p1 </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> Person1{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;tom...&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	p2 </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">Person1{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;tom...&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//从结果看，p1是值传递，拷贝了副本，本地发生了改变，而p2是指针类型，地址没有变化</span></span>
<span class="line"><span style="color:#24292E;">	p1.</span><span style="color:#005CC5;">showPerson3</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;p1: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, p1)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;----------------------&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	p2.</span><span style="color:#005CC5;">showPerson4</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;p2: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">p2)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_2-面向对象和面向过程" tabindex="-1">2. 面向对象和面向过程 <a class="header-anchor" href="#_2-面向对象和面向过程" aria-label="Permalink to &quot;2. 面向对象和面向过程&quot;">​</a></h1><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//实现2数相加</span></span>
<span class="line"><span style="color:#6A737D;">//面向过程</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Add01</span><span style="color:#E1E4E8;">(a, b </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> b</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//面向对象，通过方法，就是给某个类型绑定一个函数</span></span>
<span class="line"><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">long</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//a 叫接收者，接收者就是传递一个参数</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (a long) </span><span style="color:#B392F0;">Add02</span><span style="color:#E1E4E8;">(b long) long {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> b</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> s1 </span><span style="color:#F97583;">int</span></span>
<span class="line"><span style="color:#E1E4E8;">	s1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Add01</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;s1 = &quot;</span><span style="color:#E1E4E8;">, s1)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//定义一个变量</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> s2 long </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//调用方法格式： 变量名.函数(所需参数)</span></span>
<span class="line"><span style="color:#E1E4E8;">	r </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> s2.</span><span style="color:#79B8FF;">Add02</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;r = &quot;</span><span style="color:#E1E4E8;">, r)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//面向对象只是换了一种表现形式</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//实现2数相加</span></span>
<span class="line"><span style="color:#6A737D;">//面向过程</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Add01</span><span style="color:#24292E;">(a, b </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> b</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//面向对象，通过方法，就是给某个类型绑定一个函数</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">long</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//a 叫接收者，接收者就是传递一个参数</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (a long) </span><span style="color:#6F42C1;">Add02</span><span style="color:#24292E;">(b long) long {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> b</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> s1 </span><span style="color:#D73A49;">int</span></span>
<span class="line"><span style="color:#24292E;">	s1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Add01</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;s1 = &quot;</span><span style="color:#24292E;">, s1)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//定义一个变量</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> s2 long </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//调用方法格式： 变量名.函数(所需参数)</span></span>
<span class="line"><span style="color:#24292E;">	r </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> s2.</span><span style="color:#005CC5;">Add02</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;r = &quot;</span><span style="color:#24292E;">, r)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//面向对象只是换了一种表现形式</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,35),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const C=s(l,[["render",t]]);export{m as __pageData,C as default};
