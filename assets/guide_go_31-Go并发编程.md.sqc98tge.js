import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/31-Go并发编程.md","filePath":"guide/go/31-Go并发编程.md","lastUpdated":1701229860000}'),p={name:"guide/go/31-Go并发编程.md"},o=l(`<h2 id="_1-golang并发编程之协程" tabindex="-1">1.golang并发编程之协程 <a class="header-anchor" href="#_1-golang并发编程之协程" aria-label="Permalink to &quot;1.golang并发编程之协程&quot;">​</a></h2><p>golang中的并发是<code>函数</code>相互独立运行的能力。Goroutines是并发运行的函数。Golang提供了Goroutines作为并发处理操作的一种方式。</p><p>创建一个协程非常简单，就是在一个任务函数前面加一个go关键字：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">task</span><span style="color:#E1E4E8;">()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">go</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">task</span><span style="color:#24292E;">()</span></span></code></pre></div><p>例子：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">time</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">showMsg</span><span style="color:#E1E4E8;">(msg </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;msg: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, msg)</span></span>
<span class="line"><span style="color:#E1E4E8;">		time.</span><span style="color:#79B8FF;">Sleep</span><span style="color:#E1E4E8;">(time.Millisecond </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">showMsg</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;java11&quot;</span><span style="color:#E1E4E8;">)   </span><span style="color:#6A737D;">//go 启动了一个协程来执行 1</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">showMsg</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;golang11&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">//2</span></span>
<span class="line"><span style="color:#E1E4E8;">	time.</span><span style="color:#79B8FF;">Sleep</span><span style="color:#E1E4E8;">(time.Millisecond </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2000</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;main end...&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//主函数结束协程自动停止</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">time</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">showMsg</span><span style="color:#24292E;">(msg </span><span style="color:#D73A49;">string</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;msg: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, msg)</span></span>
<span class="line"><span style="color:#24292E;">		time.</span><span style="color:#005CC5;">Sleep</span><span style="color:#24292E;">(time.Millisecond </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">go</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">showMsg</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;java11&quot;</span><span style="color:#24292E;">)   </span><span style="color:#6A737D;">//go 启动了一个协程来执行 1</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">go</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">showMsg</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;golang11&quot;</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">//2</span></span>
<span class="line"><span style="color:#24292E;">	time.</span><span style="color:#005CC5;">Sleep</span><span style="color:#24292E;">(time.Millisecond </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2000</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;main end...&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//主函数结束协程自动停止</span></span></code></pre></div><h2 id="_2-golang并发编程之通道channel" tabindex="-1">2.golang并发编程之通道channel <a class="header-anchor" href="#_2-golang并发编程之通道channel" aria-label="Permalink to &quot;2.golang并发编程之通道channel&quot;">​</a></h2><p>Go提供了一种称为通道的机制，用于在gorutine之间共享数据。当您作为goroutine执行并发活动时，需要在goroutine之间共享资源或数据，通道充当goroutine之间的管道（管道）并提供一种机制来保证同步交换。</p><p>需要在声明通道时指定<code>数据类型</code>。可以共享内置、命名、结构和引用类型的值和指针。数据在通道上传递：在任何给定时间只有一个goroutine可以访问数据项：因此按照设计不会发生数据竞争。</p><p>根据数据交换的行为，有两种类型的通道：<strong>无缓冲通道和缓冲通道</strong>。无缓冲通道用于执行goroutine之间的同步通信，而缓冲通道用于执行异步通信。无缓冲通道保证在发送和接收发生的瞬间执行两个goroutine之间的交互。缓冲通道没有这样的保证。</p><p><code>通道是由make函数创建，该函数指定chan关键字和通道的元素类型</code></p><ul><li>语法</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Unbuffered := make(chan int) //整型无缓冲通道</span></span>
<span class="line"><span style="color:#e1e4e8;">buffered := make(chan int,10) //整型有缓冲通道</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Unbuffered := make(chan int) //整型无缓冲通道</span></span>
<span class="line"><span style="color:#24292e;">buffered := make(chan int,10) //整型有缓冲通道</span></span></code></pre></div><p>使用内置函数<code>make</code>创建无缓冲和缓冲通道。make的第一个参数需要关键字<code>chan</code>,然后是通道允许交换的数据类型。</p><p><strong>这是将值发送到通道的代码块需要使用<code>&lt;-</code>运算符：</strong></p><ul><li>语法</li></ul><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">goroutine1 </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">make</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">//字符串缓冲通道</span></span>
<span class="line"><span style="color:#E1E4E8;">goroutine1 </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;string&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//通过通道发送字符串</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">goroutine1 </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">make</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">string</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">//字符串缓冲通道</span></span>
<span class="line"><span style="color:#24292E;">goroutine1 </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;string&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//通过通道发送字符串</span></span></code></pre></div><p>一个包含5个值的缓冲区的字符串类型的goroutine1通道。然后通过通道字符串&quot;hello&quot;.</p><p><strong>这是从通道接收值的代码块：</strong></p><ul><li>语法</li></ul><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">data </span><span style="color:#F97583;">:=&lt;-</span><span style="color:#E1E4E8;">goroutine1 </span><span style="color:#6A737D;">//从通道接收字符串</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">data </span><span style="color:#D73A49;">:=&lt;-</span><span style="color:#24292E;">goroutine1 </span><span style="color:#6A737D;">//从通道接收字符串</span></span></code></pre></div><p><code>&lt;-</code>运算符附加到通道变量(goroutine1)的左侧，以接收来自通道的值</p><h3 id="无缓冲通道" tabindex="-1">无缓冲通道 <a class="header-anchor" href="#无缓冲通道" aria-label="Permalink to &quot;无缓冲通道&quot;">​</a></h3><p>在无缓冲通道中，在接收到任何值之前没有能力保存它。在这种类型的通道中，发送和接收goroutine在任何发送或接收操作完成之前的同一时刻都准备就绪。如果两个goroutine没有在同一时刻准备号，则通道会让执行其各自发送或接收操作的goroutine首先等待。同步是通道上发送和接收之间交互的基础。没有另一个就不可能发生。</p><h3 id="缓冲通道" tabindex="-1"><strong>缓冲通道</strong> <a class="header-anchor" href="#缓冲通道" aria-label="Permalink to &quot;**缓冲通道**&quot;">​</a></h3><p>在缓冲通道中，有能力在接收到一个或多个值之前保存它们。在这种类型的通道中，不要强制goroutine在同一时刻准备好执行发送和接收。当发送或接收阻塞时也有不同的条件。只有当通道中没有接收的值时，接收才会阻塞。仅当没有可用缓冲区来放置正在发送的值时，发送才会阻塞。</p><p><strong>通道的发送和接收特性</strong></p><p>1.对于同一个同道，发送操作之间时互斥的，接收操作之间也是互斥的。</p><p>2.发送操作和接收操作中对元素值的处理都是不可分割的。(原子性)</p><p>3.发送操作在完全完成之前会被阻塞。接收操作也是如此。</p><p>例子：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">math/rand</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">time</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> values </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">make</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">chan</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">send</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//从通道发送</span></span>
<span class="line"><span style="color:#E1E4E8;">	rand.</span><span style="color:#79B8FF;">Seed</span><span style="color:#E1E4E8;">(time.</span><span style="color:#79B8FF;">Now</span><span style="color:#E1E4E8;">().</span><span style="color:#79B8FF;">UnixNano</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">	value </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> rand.</span><span style="color:#79B8FF;">Intn</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;value: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, value)</span></span>
<span class="line"><span style="color:#E1E4E8;">	time.</span><span style="color:#79B8FF;">Sleep</span><span style="color:#E1E4E8;">(time.Second </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	values </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//从通道接收</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">defer</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">close</span><span style="color:#E1E4E8;">(values)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">send</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;wait...&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	value </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;-</span><span style="color:#E1E4E8;">values</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;value: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, value)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;end...&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">math/rand</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">time</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> values </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">make</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">chan</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">send</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//从通道发送</span></span>
<span class="line"><span style="color:#24292E;">	rand.</span><span style="color:#005CC5;">Seed</span><span style="color:#24292E;">(time.</span><span style="color:#005CC5;">Now</span><span style="color:#24292E;">().</span><span style="color:#005CC5;">UnixNano</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">	value </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> rand.</span><span style="color:#005CC5;">Intn</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;value: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, value)</span></span>
<span class="line"><span style="color:#24292E;">	time.</span><span style="color:#005CC5;">Sleep</span><span style="color:#24292E;">(time.Second </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	values </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//从通道接收</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">defer</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">close</span><span style="color:#24292E;">(values)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">go</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">send</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;wait...&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	value </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;-</span><span style="color:#24292E;">values</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;value: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, value)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;end...&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_3-golang并发编程waitgroup实现同步" tabindex="-1">3.golang并发编程WaitGroup实现同步 <a class="header-anchor" href="#_3-golang并发编程waitgroup实现同步" aria-label="Permalink to &quot;3.golang并发编程WaitGroup实现同步&quot;">​</a></h2><ul><li>实例</li></ul><p>查看添加WaitGroup和不添加WaitGroup的区别</p><p>不带waitgroup</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">showMsg11</span><span style="color:#E1E4E8;">(i </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, i)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">showMsg11</span><span style="color:#E1E4E8;">(i)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;end...&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//执行结果</span></span>
<span class="line"><span style="color:#E1E4E8;">i: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">i: </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">end</span><span style="color:#F97583;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">showMsg11</span><span style="color:#24292E;">(i </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, i)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">go</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">showMsg11</span><span style="color:#24292E;">(i)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;end...&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//执行结果</span></span>
<span class="line"><span style="color:#24292E;">i: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">i: </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">end</span><span style="color:#D73A49;">...</span></span></code></pre></div><p>带waitgroup</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">sync</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> wg sync.WaitGroup</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">showMsg11</span><span style="color:#E1E4E8;">(i </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">defer</span><span style="color:#E1E4E8;"> wg.</span><span style="color:#79B8FF;">Done</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i: </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, i)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">showMsg11</span><span style="color:#E1E4E8;">(i)</span></span>
<span class="line"><span style="color:#E1E4E8;">		wg.</span><span style="color:#79B8FF;">Add</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	wg.</span><span style="color:#79B8FF;">Wait</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;end...&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//执行结果</span></span>
<span class="line"><span style="color:#E1E4E8;">i: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">i: </span><span style="color:#79B8FF;">9</span></span>
<span class="line"><span style="color:#E1E4E8;">i: </span><span style="color:#79B8FF;">4</span></span>
<span class="line"><span style="color:#E1E4E8;">i: </span><span style="color:#79B8FF;">8</span></span>
<span class="line"><span style="color:#E1E4E8;">i: </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">i: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">i: </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">i: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">i: </span><span style="color:#79B8FF;">6</span></span>
<span class="line"><span style="color:#E1E4E8;">i: </span><span style="color:#79B8FF;">7</span></span>
<span class="line"><span style="color:#E1E4E8;">end</span><span style="color:#F97583;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">sync</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> wg sync.WaitGroup</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">showMsg11</span><span style="color:#24292E;">(i </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">defer</span><span style="color:#24292E;"> wg.</span><span style="color:#005CC5;">Done</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i: </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, i)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">go</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">showMsg11</span><span style="color:#24292E;">(i)</span></span>
<span class="line"><span style="color:#24292E;">		wg.</span><span style="color:#005CC5;">Add</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	wg.</span><span style="color:#005CC5;">Wait</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;end...&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//执行结果</span></span>
<span class="line"><span style="color:#24292E;">i: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">i: </span><span style="color:#005CC5;">9</span></span>
<span class="line"><span style="color:#24292E;">i: </span><span style="color:#005CC5;">4</span></span>
<span class="line"><span style="color:#24292E;">i: </span><span style="color:#005CC5;">8</span></span>
<span class="line"><span style="color:#24292E;">i: </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">i: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">i: </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">i: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">i: </span><span style="color:#005CC5;">6</span></span>
<span class="line"><span style="color:#24292E;">i: </span><span style="color:#005CC5;">7</span></span>
<span class="line"><span style="color:#24292E;">end</span><span style="color:#D73A49;">...</span></span></code></pre></div><h2 id="_4-golang并发编程之runtime包" tabindex="-1">4.golang并发编程之runtime包 <a class="header-anchor" href="#_4-golang并发编程之runtime包" aria-label="Permalink to &quot;4.golang并发编程之runtime包&quot;">​</a></h2><p><a href="https://www.youtube.com/watch?v=AE6Gzb57gL8&amp;list=PLUIDnuElzhVDVhJ4TZg6Zbz-PUZn5V1V9" target="_blank" rel="noreferrer">https://www.youtube.com/watch?v=AE6Gzb57gL8&amp;list=PLUIDnuElzhVDVhJ4TZg6Zbz-PUZn5V1V9</a></p><p><a href="https://www.youtube.com/watch?v=BiupyudQGyI&amp;list=PLE9Al-6R2SWnFYoN-CrmRZGbg3KSmKLwW" target="_blank" rel="noreferrer">https://www.youtube.com/watch?v=BiupyudQGyI&amp;list=PLE9Al-6R2SWnFYoN-CrmRZGbg3KSmKLwW</a></p>`,42),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{g as __pageData,d as default};
