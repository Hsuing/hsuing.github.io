import{_ as s,o as n,c as a,R as l}from"./chunks/framework.PZ77rLUR.js";const u=JSON.parse('{"title":"概述 #","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/体积优化.md","filePath":"guide/go/体积优化.md","lastUpdated":null}'),p={name:"guide/go/体积优化.md"},o=l(`<h1 id="概述" tabindex="-1">概述 <a href="https://golang.dbwu.tech/engineering/upx/#%E6%A6%82%E8%BF%B0" target="_blank" rel="noreferrer">#</a> <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述 [#](https://golang.dbwu.tech/engineering/upx/#概述)&quot;">​</a></h1><p>通常情况下，项目编译时会通过优化来减小编译后的文件体积，这样能够加快线上服务的测试和部署流程。 接下来分别从编译选项和第三方压缩工具两方面来介绍如何有效地减小编译后的文件体积。</p><h1 id="实验过程" tabindex="-1">实验过程 <a href="https://golang.dbwu.tech/engineering/upx/#%E5%AE%9E%E9%AA%8C%E8%BF%87%E7%A8%8B" target="_blank" rel="noreferrer">#</a> <a class="header-anchor" href="#实验过程" aria-label="Permalink to &quot;实验过程 [#](https://golang.dbwu.tech/engineering/upx/#实验过程)&quot;">​</a></h1><p>我们以一个 <code>文件基础操作</code> 代码进行演示。</p><h2 id="代码" tabindex="-1">代码 <a class="header-anchor" href="#代码" aria-label="Permalink to &quot;代码&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">log</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">os</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fileBaseOperate</span><span style="color:#E1E4E8;">(name </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">) (err </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 创建文件</span></span>
<span class="line"><span style="color:#E1E4E8;">	file, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> os.</span><span style="color:#79B8FF;">Create</span><span style="color:#E1E4E8;">(name)    </span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">defer</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 关闭文件</span></span>
<span class="line"><span style="color:#E1E4E8;">		err </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> file.</span><span style="color:#79B8FF;">Close</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 删除文件</span></span>
<span class="line"><span style="color:#E1E4E8;">		err </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> os.</span><span style="color:#79B8FF;">Remove</span><span style="color:#E1E4E8;">(name)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 向文件写入一些字符</span></span>
<span class="line"><span style="color:#E1E4E8;">	_, err </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> file.</span><span style="color:#79B8FF;">WriteString</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hello world&quot;</span><span style="color:#E1E4E8;">)   </span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	str </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">make</span><span style="color:#E1E4E8;">([]</span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1024</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 从文件读取一些字符</span></span>
<span class="line"><span style="color:#E1E4E8;">	_, err </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> file.</span><span style="color:#79B8FF;">Read</span><span style="color:#E1E4E8;">(str)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">fileBaseOperate</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/tmp/error_handle.log&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		log.</span><span style="color:#79B8FF;">Fatal</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">log</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">os</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fileBaseOperate</span><span style="color:#24292E;">(name </span><span style="color:#D73A49;">string</span><span style="color:#24292E;">) (err </span><span style="color:#D73A49;">error</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 创建文件</span></span>
<span class="line"><span style="color:#24292E;">	file, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> os.</span><span style="color:#005CC5;">Create</span><span style="color:#24292E;">(name)    </span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">defer</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 关闭文件</span></span>
<span class="line"><span style="color:#24292E;">		err </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> file.</span><span style="color:#005CC5;">Close</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 删除文件</span></span>
<span class="line"><span style="color:#24292E;">		err </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> os.</span><span style="color:#005CC5;">Remove</span><span style="color:#24292E;">(name)</span></span>
<span class="line"><span style="color:#24292E;">	}()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 向文件写入一些字符</span></span>
<span class="line"><span style="color:#24292E;">	_, err </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> file.</span><span style="color:#005CC5;">WriteString</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hello world&quot;</span><span style="color:#24292E;">)   </span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	str </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">make</span><span style="color:#24292E;">([]</span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1024</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 从文件读取一些字符</span></span>
<span class="line"><span style="color:#24292E;">	_, err </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> file.</span><span style="color:#005CC5;">Read</span><span style="color:#24292E;">(str)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">fileBaseOperate</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/tmp/error_handle.log&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		log.</span><span style="color:#005CC5;">Fatal</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="默认编译" tabindex="-1">默认编译 <a class="header-anchor" href="#默认编译" aria-label="Permalink to &quot;默认编译&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main.go</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ls</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-sh</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">1.9M</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">go</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main.go</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ls</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-sh</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">1.9M</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main</span></span></code></pre></div><p>默认编译完成的可执行文件大小是 1.9M。</p><h2 id="消除符号表" tabindex="-1">消除符号表 <a class="header-anchor" href="#消除符号表" aria-label="Permalink to &quot;消除符号表&quot;">​</a></h2><p>默认编译完成的可执行文件会带有符号表和调试信息，发布生产时可以删除调试信息，减小可执行文件体积。</p><ul><li>-s：忽略符号表和调试信息。</li><li>-w：忽略DWARFv3调试信息，使用该选项后将无法使用gdb进行调试。</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-ldflags=</span><span style="color:#9ECBFF;">&quot;-s -w&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main.go</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ls</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-sh</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">1.3M</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">go</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-ldflags=</span><span style="color:#032F62;">&quot;-s -w&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main.go</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ls</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-sh</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">1.3M</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main</span></span></code></pre></div><p>可以看到，经过 <code>消除符号表</code> 优化，编译后的文件体积已经降到了 <code>1.3M</code>, 优化了 <code>31%</code>。接下来，我们继续探索其他优化方案。</p><h2 id="upx" tabindex="-1">upx <a class="header-anchor" href="#upx" aria-label="Permalink to &quot;upx&quot;">​</a></h2><p><code>upx</code> 是一个常用的压缩动态库和可执行文件的工具，通常可减少 50-70% 的文件体积。</p><h3 id="安装" tabindex="-1">安装 <a href="https://golang.dbwu.tech/engineering/upx/#%E5%AE%89%E8%A3%85" target="_blank" rel="noreferrer">#</a> <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装 [#](https://golang.dbwu.tech/engineering/upx/#安装)&quot;">​</a></h3><p>这里以 <code>MacOS</code> 为例，其他平台请参照 <a href="https://github.com/upx/upx/releases/" target="_blank" rel="noreferrer">upx Github</a></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">brew</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">upx</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">upx</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--version</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">upx</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3.94</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">brew</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">upx</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">upx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--version</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">upx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3.94</span></span></code></pre></div><h3 id="使用" tabindex="-1">使用 <a href="https://golang.dbwu.tech/engineering/upx/#%E4%BD%BF%E7%94%A8" target="_blank" rel="noreferrer">#</a> <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用 [#](https://golang.dbwu.tech/engineering/upx/#使用)&quot;">​</a></h3><p><code>upx</code> 有很多参数，最重要的是压缩率，<code>1 - 9</code>，1 代表最低压缩率，9 代表最高压缩率。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-ldflags=</span><span style="color:#9ECBFF;">&quot;-s -w&quot;</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">main.go</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">upx</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-9</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 使用最高压缩率</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ls</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-sh</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">552K</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">go</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-ldflags=</span><span style="color:#032F62;">&quot;-s -w&quot;</span><span style="color:#24292E;">  </span><span style="color:#032F62;">main.go</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">upx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-9</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 使用最高压缩率</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ls</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-sh</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">552K</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main</span></span></code></pre></div><p>可以看到，经过 <code>upx</code> 优化，编译后的文件体积已经降到了 <code>552KB</code>, 比最初的文件体积优化超过 <code>70%</code>。</p><h3 id="原理" tabindex="-1">原理 <a href="https://golang.dbwu.tech/engineering/upx/#%E5%8E%9F%E7%90%86" target="_blank" rel="noreferrer">#</a> <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理 [#](https://golang.dbwu.tech/engineering/upx/#原理)&quot;">​</a></h3><p><code>upx</code> 压缩后的程序和压缩前的程序一样，无需解压仍然能够正常运行，这种压缩方法称之为带壳压缩，压缩包含两个部分：</p><ul><li>在程序开头或其他合适的地方插入解压代码</li><li>将程序的其他部分压缩</li></ul><p>程序执行时，也包含两个部分：</p><ul><li>首先执行的是程序开头的插入的解压代码，将原来的程序在内存中解压出来</li><li>再执行解压后的程序，也就是说，<code>upx</code> 在程序执行时，会有额外的解压动作，不过这个耗时几乎可以忽略</li></ul><h1 id="小结" tabindex="-1">小结 <a href="https://golang.dbwu.tech/engineering/upx/#%E5%B0%8F%E7%BB%93" target="_blank" rel="noreferrer">#</a> <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结 [#](https://golang.dbwu.tech/engineering/upx/#小结)&quot;">​</a></h1><p>通过对示例代码的编译过程不断优化，生成的可执行文件从最开始的 <code>1.9M</code> 一直压缩到 <code>552K</code>, 压缩率超过了 <code>70%</code>， 主要是通过 <strong>两个方法</strong> 来实现的:</p><ol><li>编译参数 <code>-ldflags=&quot;-s -w&quot;</code></li><li>upx</li></ol>`,31),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{u as __pageData,h as default};
