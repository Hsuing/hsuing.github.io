import{_ as s,o as n,c as a,R as l}from"./chunks/framework.PZ77rLUR.js";const u=JSON.parse('{"title":"1.golang流程控制关键字break","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/14-Go关键字.md","filePath":"guide/go/14-Go关键字.md","lastUpdated":1701229860000}'),p={name:"guide/go/14-Go关键字.md"},o=l(`<h1 id="_1-golang流程控制关键字break" tabindex="-1">1.golang流程控制关键字break <a class="header-anchor" href="#_1-golang流程控制关键字break" aria-label="Permalink to &quot;1.golang流程控制关键字break&quot;">​</a></h1><p><code>break</code>语句可以结束<code>for</code>、<code>switch</code>和<code>select</code>的代码块</p><blockquote><p>break注意事项</p><p>1.单独在<code>select</code>中使用<code>break</code>和不使用<code>break</code>没有啥区别</p><p>2.单独在表达式<code>switch</code>语句，并且没有<code>fallthough</code>,使用<code>break</code>和不使用<code>break</code>没有啥区别</p><p>3.单独在表达式<code>swithch</code>语句，并且有<code>fallthough</code>,使用<code>break</code>能够终止<code>fallthough</code>后面的<code>case</code>语句的执行</p><p>4.带标签的<code>break</code>,可以跳出多层<code>select/switch</code>作用域。使用<code>break</code>更加灵活，写法更加简单灵活，不需要使用控制变量一层一层跳出循环，没有带<code>break</code>的只能跳出当前语句块</p></blockquote><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">breakFunc</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//跳出for循环</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//退出循环</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i=</span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, i)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">breakFunc</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//跳出for循环</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">break</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//退出循环</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i=</span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, i)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">switchBreakFunc</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	i </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> i {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">		fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">		fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;2&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//使fallthrough失效</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">fallthrough</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">		fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;3&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">break</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">switchBreakFunc</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	i </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> i {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">		fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">		fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;2&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">break</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//使fallthrough失效</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">fallthrough</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">		fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;3&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">break</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LableFunc</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">MYLABEL:</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i:</span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, i)</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;"> MYLABEL</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;end....&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LableFunc</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">MYLABEL:</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i:</span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, i)</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">break</span><span style="color:#24292E;"> MYLABEL</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;end....&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_2-golang关键字contiune" tabindex="-1">2.golang关键字contiune <a class="header-anchor" href="#_2-golang关键字contiune" aria-label="Permalink to &quot;2.golang关键字contiune&quot;">​</a></h2><p><code>continue</code>只能在循环中，在go中只能在<code>for</code>循环中，它可以终止本次循环，进行下一次循环</p><p>在<code>continue</code>语句后添加标签时，表示开始标签对应的循环</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">forContinue</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> i</span><span style="color:#F97583;">%</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;i:</span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, i)</span></span>
<span class="line"><span style="color:#E1E4E8;">		} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">continue</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">forContinue</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> i</span><span style="color:#D73A49;">%</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;i:</span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, i)</span></span>
<span class="line"><span style="color:#24292E;">		} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">continue</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">continueMylabelFunc</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	MYLABEL:</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> j </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; j </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">; j</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> j </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">continue</span><span style="color:#E1E4E8;"> MYLABEL</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">			fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">%v</span><span style="color:#9ECBFF;">,</span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, i, j)</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">continueMylabelFunc</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	MYLABEL:</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> j </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; j </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">; j</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> j </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">continue</span><span style="color:#24292E;"> MYLABEL</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">			fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">%v</span><span style="color:#032F62;">,</span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, i, j)</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>continue执行到就会跳过本次执行，继续循环</p><p>break执行到后就会跳出循环</p></blockquote><h2 id="_3-关键字goto" tabindex="-1">3.关键字goto <a class="header-anchor" href="#_3-关键字goto" aria-label="Permalink to &quot;3.关键字goto&quot;">​</a></h2><p><code>goto</code>语句通过标签进行代码的<strong>无条件跳转</strong>。<code>goto</code>语句可以在快速跳出循环、避免重复退出上有一定的帮助。</p><p>Go语言中使用<code>goto</code>语句能简化一些代码的实现过程。例如双层嵌套的for循环要退出时：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">gotoFunc</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	i </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;2&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">goto</span><span style="color:#E1E4E8;"> END</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">END:</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;end...&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">gotoFunc</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	i </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;2&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">goto</span><span style="color:#24292E;"> END</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">END:</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;end...&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">forGotoFunc</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> j </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; j </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">; j</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> j </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">goto</span><span style="color:#E1E4E8;"> END</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">END:</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;end...&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">forGotoFunc</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> j </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; j </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">; j</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> j </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">goto</span><span style="color:#24292E;"> END</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">END:</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;end...&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,17),t=[o];function e(c,r,E,y,i,F){return n(),a("div",null,t)}const C=s(p,[["render",e]]);export{u as __pageData,C as default};
