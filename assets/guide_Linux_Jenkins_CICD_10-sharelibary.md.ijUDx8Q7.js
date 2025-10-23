import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/CICD/10-sharelibary.md","filePath":"guide/Linux/Jenkins/CICD/10-sharelibary.md","lastUpdated":1720606881000}'),p={name:"guide/Linux/Jenkins/CICD/10-sharelibary.md"},o=l(`<p>官方文档，<a href="https://www.jenkins.io/zh/doc/book/pipeline/shared-libraries/" target="_blank" rel="noreferrer">https://www.jenkins.io/zh/doc/book/pipeline/shared-libraries/</a></p><h2 id="_1-什么是共享库" tabindex="-1">1.什么是共享库 <a class="header-anchor" href="#_1-什么是共享库" aria-label="Permalink to &quot;1.什么是共享库&quot;">​</a></h2><p>共享库并不是一个全新的概念，平时我们在写python，java等语言的时候，会引用各种包，比如<code>import xxx from xxx</code>。类似编程语言中的 <strong>代码复用</strong> ，不同阶段可能有 <strong>共用</strong> 的地方</p><p>在Jenkins的共享库中使用Groovy的语法，共享库中存储了Groovy的各种类，每个文件又可以编写各种的方法</p><h2 id="_2-共享库的结构" tabindex="-1">2.共享库的结构 <a class="header-anchor" href="#_2-共享库的结构" aria-label="Permalink to &quot;2.共享库的结构&quot;">​</a></h2><p>一般来说，共享库的结构分为可以分为<code>resource</code>，<code>src</code>，<code>vars</code>。其结构如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">(root)</span></span>
<span class="line"><span style="color:#e1e4e8;">+- src                     # Groovy source files</span></span>
<span class="line"><span style="color:#e1e4e8;">|   +- org</span></span>
<span class="line"><span style="color:#e1e4e8;">|       +- foo</span></span>
<span class="line"><span style="color:#e1e4e8;">|           +- Bar.groovy  # for org.foo.Bar class</span></span>
<span class="line"><span style="color:#e1e4e8;">+- vars</span></span>
<span class="line"><span style="color:#e1e4e8;">|   +- foo.groovy          # for global &#39;foo&#39; variable</span></span>
<span class="line"><span style="color:#e1e4e8;">|   +- foo.txt             # help for &#39;foo&#39; variable</span></span>
<span class="line"><span style="color:#e1e4e8;">+- resources               # resource files (external libraries only)</span></span>
<span class="line"><span style="color:#e1e4e8;">|   +- org</span></span>
<span class="line"><span style="color:#e1e4e8;">|       +- foo</span></span>
<span class="line"><span style="color:#e1e4e8;">|           +- bar.json    # static helper data for org.foo.Bar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">(root)</span></span>
<span class="line"><span style="color:#24292e;">+- src                     # Groovy source files</span></span>
<span class="line"><span style="color:#24292e;">|   +- org</span></span>
<span class="line"><span style="color:#24292e;">|       +- foo</span></span>
<span class="line"><span style="color:#24292e;">|           +- Bar.groovy  # for org.foo.Bar class</span></span>
<span class="line"><span style="color:#24292e;">+- vars</span></span>
<span class="line"><span style="color:#24292e;">|   +- foo.groovy          # for global &#39;foo&#39; variable</span></span>
<span class="line"><span style="color:#24292e;">|   +- foo.txt             # help for &#39;foo&#39; variable</span></span>
<span class="line"><span style="color:#24292e;">+- resources               # resource files (external libraries only)</span></span>
<span class="line"><span style="color:#24292e;">|   +- org</span></span>
<span class="line"><span style="color:#24292e;">|       +- foo</span></span>
<span class="line"><span style="color:#24292e;">|           +- bar.json    # static helper data for org.foo.Bar</span></span></code></pre></div><p>参数解释</p><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>resource</td><td>目录允许从&#39;外部库中&#39;使用步骤来&#39;加载相关联的非Groovy的资源文件</td></tr><tr><td>src</td><td>目录主要存放我们要&#39;编写的groovy类&#39;,执行流水线时,此目录将添加到class_path中</td></tr><tr><td>vars</td><td>是用来放各种参数文件，定义变量</td></tr></tbody></table><p>==其实也不是只有这些，一层目录也可以放诸如<code>doc</code>等文件来放文档。这都根据实际的需要==</p><h2 id="_3-jenkins上-配置做" tabindex="-1">3.jenkins上 配置做 <a class="header-anchor" href="#_3-jenkins上-配置做" aria-label="Permalink to &quot;3.jenkins上 配置做&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">manage</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Jenkins----</span><span style="color:#E1E4E8;">-</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">configure</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">system</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">---</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">ctrl+f(</span><span style="color:#B392F0;">Google浏览器</span><span style="color:#79B8FF;">)---</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">lib进行定位----</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">Global</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Pipeline</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Libraries</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">manage</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Jenkins----</span><span style="color:#24292E;">-</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">configure</span><span style="color:#24292E;"> </span><span style="color:#032F62;">system</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">---</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">ctrl+f(</span><span style="color:#6F42C1;">Google浏览器</span><span style="color:#005CC5;">)---</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">lib进行定位----</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">Global</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Pipeline</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Libraries</span></span></code></pre></div><ul><li>步骤</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092157901.jpg" alt=""></p><h2 id="_4-使用" tabindex="-1">4.使用 <a class="header-anchor" href="#_4-使用" aria-label="Permalink to &quot;4.使用&quot;">​</a></h2><p>在groovy脚本中的使用：@Library(&quot;库名称@分支&quot;) 这个库名称和分支就是在jenkins中设置的名称</p><p>调用方式：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@Library</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;jenkinslib@master&#39;</span><span style="color:#E1E4E8;">) _</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> tools </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> org.devops.tools()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//jenkinslib 这个名字随便写，不是仓库名字决定，但是这个名字必须和jenkins 配置共享库的名字一致</span></span>
<span class="line"><span style="color:#6A737D;">//注释，org.devops.tools 是src里脚本的位置，导入调用</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@Library</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;jenkinslib@master&#39;</span><span style="color:#24292E;">) _</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> tools </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> org.devops.tools()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//jenkinslib 这个名字随便写，不是仓库名字决定，但是这个名字必须和jenkins 配置共享库的名字一致</span></span>
<span class="line"><span style="color:#6A737D;">//注释，org.devops.tools 是src里脚本的位置，导入调用</span></span></code></pre></div><ul><li>多个库调用</li></ul><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 加载mylib共享库</span></span>
<span class="line"><span style="color:#F97583;">@Library</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mylib&#39;</span><span style="color:#E1E4E8;">) _</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#6A737D;">// 加载mylib共享库的1.0版本</span></span>
<span class="line"><span style="color:#F97583;">@Library</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;mylib@1.0&#39;</span><span style="color:#E1E4E8;">) _</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#6A737D;">// 加载多个共享库， mylib共享库的默认版本， yourlib共享库的2.0版本（分支）</span></span>
<span class="line"><span style="color:#F97583;">@Library</span><span style="color:#E1E4E8;">([</span><span style="color:#9ECBFF;">&#39;mylib&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;yourlib@2.0&#39;</span><span style="color:#E1E4E8;">]) _</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 加载mylib共享库</span></span>
<span class="line"><span style="color:#D73A49;">@Library</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;mylib&#39;</span><span style="color:#24292E;">) _</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;">// 加载mylib共享库的1.0版本</span></span>
<span class="line"><span style="color:#D73A49;">@Library</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;mylib@1.0&#39;</span><span style="color:#24292E;">) _</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;">// 加载多个共享库， mylib共享库的默认版本， yourlib共享库的2.0版本（分支）</span></span>
<span class="line"><span style="color:#D73A49;">@Library</span><span style="color:#24292E;">([</span><span style="color:#032F62;">&#39;mylib&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;yourlib@2.0&#39;</span><span style="color:#24292E;">]) _</span></span></code></pre></div><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!groovy</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">@Library</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;jenkinslib@master&#39;</span><span style="color:#E1E4E8;">) _</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> tools </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> org.devops.tools()</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">pipeline{</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent{</span></span>
<span class="line"><span style="color:#E1E4E8;">        node{</span></span>
<span class="line"><span style="color:#E1E4E8;">            label </span><span style="color:#9ECBFF;">&quot;master&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span></span>
<span class="line"><span style="color:#E1E4E8;">    stages{</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&quot;Build&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps{</span></span>
<span class="line"><span style="color:#E1E4E8;">                script{</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">tools.PrintMes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;执行打包&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;green&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                     </span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }  </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!groovy</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">@Library</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;jenkinslib@master&#39;</span><span style="color:#24292E;">) _</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> tools </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> org.devops.tools()</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">pipeline{</span></span>
<span class="line"><span style="color:#24292E;">    agent{</span></span>
<span class="line"><span style="color:#24292E;">        node{</span></span>
<span class="line"><span style="color:#24292E;">            label </span><span style="color:#032F62;">&quot;master&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">     </span></span>
<span class="line"><span style="color:#24292E;">    stages{</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&quot;Build&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            steps{</span></span>
<span class="line"><span style="color:#24292E;">                script{</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">tools.PrintMes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;执行打包&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;green&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                     </span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }  </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_4-1共享库创建" tabindex="-1">4.1<strong>共享库创建</strong> <a class="header-anchor" href="#_4-1共享库创建" aria-label="Permalink to &quot;4.1**共享库创建**&quot;">​</a></h3><p>在src/org/devops目录中创建utils.groovy文件，内容如下</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> org.devops</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getVersion</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">BUILD_NUMBER</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">GIT_COMMIT</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Date</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">format(</span><span style="color:#9ECBFF;">&#39;yyMM&#39;</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot;-\${BUILD_NUMBER}&quot;</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot;-\${GIT_COMMIT}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> org.devops</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getVersion</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;"> </span><span style="color:#E36209;">BUILD_NUMBER</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">String</span><span style="color:#24292E;"> </span><span style="color:#E36209;">GIT_COMMIT</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Date</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">format(</span><span style="color:#032F62;">&#39;yyMM&#39;</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot;-\${BUILD_NUMBER}&quot;</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot;-\${GIT_COMMIT}&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_4-2pipeline中的使用" tabindex="-1">4.2pipeline中的使用 <a class="header-anchor" href="#_4-2pipeline中的使用" aria-label="Permalink to &quot;4.2pipeline中的使用&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!groovy</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">@Library</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;jenkinslib@master&#39;</span><span style="color:#E1E4E8;">) _</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> util </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> org.devops.utils()</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">pipeline{</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent{</span></span>
<span class="line"><span style="color:#E1E4E8;">        node{</span></span>
<span class="line"><span style="color:#E1E4E8;">            label </span><span style="color:#9ECBFF;">&quot;master&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span></span>
<span class="line"><span style="color:#E1E4E8;">    stages{</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&quot;Build&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps{</span></span>
<span class="line"><span style="color:#E1E4E8;">                script{</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> v </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> util</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">getVersion(</span><span style="color:#9ECBFF;">&quot;\${BUILD_NUMBER}&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;\${GIT_COMMIT}&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                    echo </span><span style="color:#9ECBFF;">&quot;\${v}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!groovy</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">@Library</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;jenkinslib@master&#39;</span><span style="color:#24292E;">) _</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> util </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> org.devops.utils()</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">pipeline{</span></span>
<span class="line"><span style="color:#24292E;">    agent{</span></span>
<span class="line"><span style="color:#24292E;">        node{</span></span>
<span class="line"><span style="color:#24292E;">            label </span><span style="color:#032F62;">&quot;master&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">     </span></span>
<span class="line"><span style="color:#24292E;">    stages{</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&quot;Build&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            steps{</span></span>
<span class="line"><span style="color:#24292E;">                script{</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> v </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> util</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">getVersion(</span><span style="color:#032F62;">&quot;\${BUILD_NUMBER}&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;\${GIT_COMMIT}&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                    echo </span><span style="color:#032F62;">&quot;\${v}&quot;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">     </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_4-3resource" tabindex="-1"><strong>4.3resource</strong> <a class="header-anchor" href="#_4-3resource" aria-label="Permalink to &quot;**4.3resource**&quot;">​</a></h3><p><strong>使用resource/里的文件</strong></p><p><strong>用法：</strong></p><p><strong>1.resources/xxx.json文件</strong></p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cat jenkinslib</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">resources</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">config</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">json</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;jin tian&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cat jenkinslib</span><span style="color:#032F62;">/resources/</span><span style="color:#24292E;">config</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">json</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;jin tian&quot;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>2.vars/Pipeline.groovy</strong></p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cat jenkinslib</span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">vars</span><span style="color:#9ECBFF;">/</span><span style="color:#F97583;">Pipeline.</span><span style="color:#E1E4E8;">groovy</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> hwf.devops.Tools</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">Map</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> tools </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Tools</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">        agent { label </span><span style="color:#9ECBFF;">&quot;build&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        stages{</span></span>
<span class="line"><span style="color:#E1E4E8;">            stage(</span><span style="color:#9ECBFF;">&quot;build&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">                steps{</span></span>
<span class="line"><span style="color:#E1E4E8;">                    script{</span></span>
<span class="line"><span style="color:#E1E4E8;">                         </span><span style="color:#6A737D;">//加载resource里的文件</span></span>
<span class="line"><span style="color:#E1E4E8;">                        config </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> libraryResource </span><span style="color:#9ECBFF;">&#39;/config.json&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                        config </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> readJSON </span><span style="color:#79B8FF;">text</span><span style="color:#E1E4E8;">: config </span><span style="color:#F97583;">-</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                        value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">tools.PrintMsg</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hwf&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(config</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">name)</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cat jenkinslib</span><span style="color:#032F62;">/vars/</span><span style="color:#D73A49;">Pipeline.</span><span style="color:#24292E;">groovy</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> hwf.devops.Tools</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">Map</span><span style="color:#24292E;"> </span><span style="color:#E36209;">args</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> tools </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Tools</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    pipeline {</span></span>
<span class="line"><span style="color:#24292E;">        agent { label </span><span style="color:#032F62;">&quot;build&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        stages{</span></span>
<span class="line"><span style="color:#24292E;">            stage(</span><span style="color:#032F62;">&quot;build&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">                steps{</span></span>
<span class="line"><span style="color:#24292E;">                    script{</span></span>
<span class="line"><span style="color:#24292E;">                         </span><span style="color:#6A737D;">//加载resource里的文件</span></span>
<span class="line"><span style="color:#24292E;">                        config </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> libraryResource </span><span style="color:#032F62;">&#39;/config.json&#39;</span></span>
<span class="line"><span style="color:#24292E;">                        config </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> readJSON </span><span style="color:#005CC5;">text</span><span style="color:#24292E;">: config </span><span style="color:#D73A49;">-</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">                        value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">tools.PrintMsg</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hwf&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(config</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">name)</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_5-案例" tabindex="-1">5.案例 <a class="header-anchor" href="#_5-案例" aria-label="Permalink to &quot;5.案例&quot;">​</a></h2><h3 id="_5-1颜色案例" tabindex="-1">5.1颜色案例 <a class="header-anchor" href="#_5-1颜色案例" aria-label="Permalink to &quot;5.1颜色案例&quot;">​</a></h3><p>注意：我们需要安装 插件<code>AnsiColor</code>，这样才能使用ansiColor()方法，可以在<code>片段生成器</code>查看更多的用法</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">ansiColor(</span><span style="color:#9ECBFF;">&#39;css&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  sh </span><span style="color:#9ECBFF;">&quot;ls -al&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">echo </span><span style="color:#9ECBFF;">&#39;this will be rendered as-is&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// multiple ansiColor steps within one pipeline are also supported</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ansiColor(</span><span style="color:#9ECBFF;">&#39;vga&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  echo </span><span style="color:#9ECBFF;">&#39;</span><span style="color:#79B8FF;">\\0</span><span style="color:#9ECBFF;">33[42m</span><span style="color:#79B8FF;">\\0</span><span style="color:#9ECBFF;">33[97mWhite letters, green background</span><span style="color:#79B8FF;">\\0</span><span style="color:#9ECBFF;">33[0m&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">ansiColor(</span><span style="color:#032F62;">&#39;css&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  sh </span><span style="color:#032F62;">&quot;ls -al&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">echo </span><span style="color:#032F62;">&#39;this will be rendered as-is&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// multiple ansiColor steps within one pipeline are also supported</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ansiColor(</span><span style="color:#032F62;">&#39;vga&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  echo </span><span style="color:#032F62;">&#39;</span><span style="color:#005CC5;">\\0</span><span style="color:#032F62;">33[42m</span><span style="color:#005CC5;">\\0</span><span style="color:#032F62;">33[97mWhite letters, green background</span><span style="color:#005CC5;">\\0</span><span style="color:#032F62;">33[0m&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>创建tool.groovy</li></ul><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> org.devops</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//格式化输出</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PrintMes</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">color</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    colors </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;red&#39;</span><span style="color:#E1E4E8;">   : </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\0</span><span style="color:#9ECBFF;">33[40;31m &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;\${value}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt; </span><span style="color:#79B8FF;">\\0</span><span style="color:#9ECBFF;">33[0m&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&#39;blue&#39;</span><span style="color:#E1E4E8;">  : </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\0</span><span style="color:#9ECBFF;">33[47;34m \${value} </span><span style="color:#79B8FF;">\\0</span><span style="color:#9ECBFF;">33[0m&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&#39;green&#39;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\0</span><span style="color:#9ECBFF;">33[40;32m &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;\${value}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt; </span><span style="color:#79B8FF;">\\0</span><span style="color:#9ECBFF;">33[0m&quot;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    ansiColor(</span><span style="color:#9ECBFF;">&#39;xterm&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(colors[color])</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> org.devops</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//格式化输出</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PrintMes</span><span style="color:#24292E;">(</span><span style="color:#E36209;">value</span><span style="color:#24292E;">,</span><span style="color:#E36209;">color</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    colors </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;red&#39;</span><span style="color:#24292E;">   : </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\0</span><span style="color:#032F62;">33[40;31m &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;\${value}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt; </span><span style="color:#005CC5;">\\0</span><span style="color:#032F62;">33[0m&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&#39;blue&#39;</span><span style="color:#24292E;">  : </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\0</span><span style="color:#032F62;">33[47;34m \${value} </span><span style="color:#005CC5;">\\0</span><span style="color:#032F62;">33[0m&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&#39;green&#39;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\0</span><span style="color:#032F62;">33[40;32m &gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;\${value}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt; </span><span style="color:#005CC5;">\\0</span><span style="color:#032F62;">33[0m&quot;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">    ansiColor(</span><span style="color:#032F62;">&#39;xterm&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(colors[color])</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在<code>var</code>路径下创建一个<code>hello.groovy</code>的文件，我们只输出一个<code>hello</code></p><ul><li>创建hello.groovy</li></ul><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>使用共享库</li></ul><p>系统配置里找到 <code>Global Pipeline Libraries</code></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092157122.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092219035.jpg" alt="echo2"></p><ul><li>编写jenkinsfile</li></ul><p>在Jenkinsfile中使用@Library(&#39;jenkins-sharelib-tools&#39;) _来加载共享库，注意后面符号_用于加载。类的实例化def tools = new org.devops.tools(),使用类中的方法tools.PrintMes(&quot;获取代码&quot;,&#39;green&#39;)</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!groovy</span></span>
<span class="line"><span style="color:#F97583;">@Library</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;jenkins-sharelib-tools&#39;</span><span style="color:#E1E4E8;">) _     </span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> tools </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> org.devops.tools()</span></span>
<span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent { node {  label </span><span style="color:#9ECBFF;">&quot;master&quot;</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//下载代码</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&quot;GetCode&quot;</span><span style="color:#E1E4E8;">){ </span></span>
<span class="line"><span style="color:#E1E4E8;">            steps{  </span></span>
<span class="line"><span style="color:#E1E4E8;">                timeout(</span><span style="color:#79B8FF;">time</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">unit</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;MINUTES&quot;</span><span style="color:#E1E4E8;">){   </span></span>
<span class="line"><span style="color:#E1E4E8;">                    script{ </span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#F97583;">tools.PrintMes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;获取代码&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;green&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                        hello</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">call()</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!groovy</span></span>
<span class="line"><span style="color:#D73A49;">@Library</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;jenkins-sharelib-tools&#39;</span><span style="color:#24292E;">) _     </span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> tools </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> org.devops.tools()</span></span>
<span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent { node {  label </span><span style="color:#032F62;">&quot;master&quot;</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">stages {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//下载代码</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&quot;GetCode&quot;</span><span style="color:#24292E;">){ </span></span>
<span class="line"><span style="color:#24292E;">            steps{  </span></span>
<span class="line"><span style="color:#24292E;">                timeout(</span><span style="color:#005CC5;">time</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">unit</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;MINUTES&quot;</span><span style="color:#24292E;">){   </span></span>
<span class="line"><span style="color:#24292E;">                    script{ </span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#D73A49;">tools.PrintMes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;获取代码&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;green&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                        hello</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">call()</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>创建一个pipeline</li></ul><p>我们流水线的类型，选择<code>Pipeline script from SCM</code>。我们配置一个gitlab的仓库然后将jenkinsfile放入</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092157823.jpg" alt=""></p><blockquote><p>注意, 我们在同一个仓库下可以添加多个jenkinsfile，可以用名字来区分，也可以建多个路径，比如我放到tools路径下面，就需要配置<code>./tools/Jenkinsfile</code>.之前的共享库，其实也可以在<code>org</code>路径下，放多个文件，适用于不同的情况</p></blockquote><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092157628.jpg" alt=""></p><h3 id="_5-2gitlab" tabindex="-1">5.2gitlab <a class="header-anchor" href="#_5-2gitlab" aria-label="Permalink to &quot;5.2gitlab&quot;">​</a></h3><p>官方文档，<a href="https://docs.gitlab.com/ee/api/branches.html" target="_blank" rel="noreferrer">https://docs.gitlab.com/ee/api/branches.html</a></p><ul><li>postman 调试</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092157539.jpg" alt=""></p><ul><li>在jenkins中操作</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092157157.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092157236.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092157502.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092157289.jpg" alt=""></p><ul><li>配置gitlab token</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092157795.jpg" alt=""></p><ul><li>配置jenkins token</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092157067.jpg" alt=""></p><ul><li>生成pipeline</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092158309.jpg" alt=""></p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">withCredentials([string(</span><span style="color:#79B8FF;">credentialsId</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;e0c7ba82-67da-42a0-ae98-95cf0c019569&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">variable</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;GITLABTOKEN&#39;</span><span style="color:#E1E4E8;">)]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// some block</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">withCredentials([string(</span><span style="color:#005CC5;">credentialsId</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;e0c7ba82-67da-42a0-ae98-95cf0c019569&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">variable</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;GITLABTOKEN&#39;</span><span style="color:#24292E;">)]) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// some block</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>完整代码</li></ul><p>vi Jenkinsfile</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@Library</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;sharelib&quot;</span><span style="color:#E1E4E8;">) _</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//导入</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> gitab </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> org.devops.gitlab()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">	agent { label </span><span style="color:#9ECBFF;">&quot;master&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	stages{</span></span>
<span class="line"><span style="color:#E1E4E8;">		stage(</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">			steps{</span></span>
<span class="line"><span style="color:#E1E4E8;">				script{</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#6A737D;">/*withCredentials([string(credentialsId: &#39;e0c7ba82-67da-42a0-ae98-95cf0c019569&#39;, variable: &#39;GITLABTOKEN&#39;)]) {</span></span>
<span class="line"><span style="color:#6A737D;">					sh &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					//Create branch</span></span>
<span class="line"><span style="color:#6A737D;">						curl --location \\</span></span>
<span class="line"><span style="color:#6A737D;">						     --request POST \\</span></span>
<span class="line"><span style="color:#6A737D;">						     &quot;http://192.168.1.22/api/v4/projects/2/repository/branches?branch=\${env.branchName}&amp;ref=\${env.baseBranch}&quot; \\</span></span>
<span class="line"><span style="color:#6A737D;">						     --header &quot;PRIVATE-TOKEN: \${GITLABTOKEN}&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					}*/</span></span>
<span class="line"><span style="color:#E1E4E8;">					projectId </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">GetprojectId</span><span style="color:#E1E4E8;">(\${env</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">projectName}</span><span style="color:#9ECBFF;">&quot;)</span></span>
<span class="line"><span style="color:#9ECBFF;">					CreateBranch(projectId, &quot;</span><span style="color:#E1E4E8;">\${env</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">branchName}</span><span style="color:#9ECBFF;">&quot;, &quot;</span><span style="color:#E1E4E8;">\${env</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">baseBranch}</span><span style="color:#9ECBFF;">&quot;)</span></span>
<span class="line"><span style="color:#9ECBFF;">					</span></span>
<span class="line"><span style="color:#9ECBFF;">					/*</span></span>
<span class="line"><span style="color:#9ECBFF;">					projectId = gitlab.GetprojectId(\${env.projectName}&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">gitlab.CreateBranch</span><span style="color:#E1E4E8;">(projectId, </span><span style="color:#9ECBFF;">&quot;\${env.branchName}&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;\${env.baseBranch}&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">*/</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HttpReq</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">apiURL</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">method</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">	gitlabURL </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;http://192.168.1.22/api/v4&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	withCredentials([string(</span><span style="color:#79B8FF;">credentialsId</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;e0c7ba82-67da-42a0-ae98-95cf0c019569&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">variable</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;GITLABTOKEN&#39;</span><span style="color:#E1E4E8;">)]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">	sh </span><span style="color:#79B8FF;">returnStdout</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">script</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">					//Create branch</span></span>
<span class="line"><span style="color:#9ECBFF;">						curl --location \\</span></span>
<span class="line"><span style="color:#9ECBFF;">						     --request POST \\</span></span>
<span class="line"><span style="color:#9ECBFF;">						     &quot;\${gitlabURL}/\${apiURL}&quot; \\</span></span>
<span class="line"><span style="color:#9ECBFF;">						     --header &quot;PRIVATE-TOKEN: \${GITLABTOKEN}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">					&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> response</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//创建分支</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CreateBranch</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">projectId</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">branchName</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">baseBranch</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	apiURL </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;projects/\${projectId}/repository/branches?branch=\${branchName}&amp;ref=\${baseBranch}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">HttpReq</span><span style="color:#E1E4E8;">(apiURL, </span><span style="color:#9ECBFF;">&quot;POST&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">/*withCredentials([string(credentialsId: &#39;e0c7ba82-67da-42a0-ae98-95cf0c019569&#39;, variable: &#39;GITLABTOKEN&#39;)]) {</span></span>
<span class="line"><span style="color:#6A737D;">					sh &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					//Create branch</span></span>
<span class="line"><span style="color:#6A737D;">						curl --location \\</span></span>
<span class="line"><span style="color:#6A737D;">						     --request POST \\</span></span>
<span class="line"><span style="color:#6A737D;">						     &quot;http://192.168.1.22/api/v4/projects/\${projectId}/repository/branches?branch=\${branchName}&amp;ref=\${baseBranch}&quot; \\</span></span>
<span class="line"><span style="color:#6A737D;">						     --header &quot;PRIVATE-TOKEN: \${GITLABTOKEN}&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">	}*/</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//获取项目 id</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">GetprojectId</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">projectName</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">	apiURL </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;project?search=\${projectName}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">HttpReq</span><span style="color:#E1E4E8;">(apiURL, </span><span style="color:#9ECBFF;">&quot;GET&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> readJSON </span><span style="color:#79B8FF;">test</span><span style="color:#E1E4E8;">: result</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&quot;id&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">/*withCredentials([string(credentialsId: &#39;e0c7ba82-67da-42a0-ae98-95cf0c019569&#39;, variable: &#39;GITLABTOKEN&#39;)]) {</span></span>
<span class="line"><span style="color:#6A737D;">					sh &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					//Create branch</span></span>
<span class="line"><span style="color:#6A737D;">						curl --location \\</span></span>
<span class="line"><span style="color:#6A737D;">						     --request POST \\</span></span>
<span class="line"><span style="color:#6A737D;">						     &quot;http://192.168.1.22/api/v4/projects/\${projectId}/repository/branches?branch=\${branchName}&amp;ref=\${baseBranch}&quot; \\</span></span>
<span class="line"><span style="color:#6A737D;">						     --header &quot;PRIVATE-TOKEN: \${GITLABTOKEN}&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">	}*/</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@Library</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;sharelib&quot;</span><span style="color:#24292E;">) _</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//导入</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> gitab </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> org.devops.gitlab()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">	agent { label </span><span style="color:#032F62;">&quot;master&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	stages{</span></span>
<span class="line"><span style="color:#24292E;">		stage(</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">			steps{</span></span>
<span class="line"><span style="color:#24292E;">				script{</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#6A737D;">/*withCredentials([string(credentialsId: &#39;e0c7ba82-67da-42a0-ae98-95cf0c019569&#39;, variable: &#39;GITLABTOKEN&#39;)]) {</span></span>
<span class="line"><span style="color:#6A737D;">					sh &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					//Create branch</span></span>
<span class="line"><span style="color:#6A737D;">						curl --location \\</span></span>
<span class="line"><span style="color:#6A737D;">						     --request POST \\</span></span>
<span class="line"><span style="color:#6A737D;">						     &quot;http://192.168.1.22/api/v4/projects/2/repository/branches?branch=\${env.branchName}&amp;ref=\${env.baseBranch}&quot; \\</span></span>
<span class="line"><span style="color:#6A737D;">						     --header &quot;PRIVATE-TOKEN: \${GITLABTOKEN}&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					}*/</span></span>
<span class="line"><span style="color:#24292E;">					projectId </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">GetprojectId</span><span style="color:#24292E;">(\${env</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">projectName}</span><span style="color:#032F62;">&quot;)</span></span>
<span class="line"><span style="color:#032F62;">					CreateBranch(projectId, &quot;</span><span style="color:#24292E;">\${env</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">branchName}</span><span style="color:#032F62;">&quot;, &quot;</span><span style="color:#24292E;">\${env</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">baseBranch}</span><span style="color:#032F62;">&quot;)</span></span>
<span class="line"><span style="color:#032F62;">					</span></span>
<span class="line"><span style="color:#032F62;">					/*</span></span>
<span class="line"><span style="color:#032F62;">					projectId = gitlab.GetprojectId(\${env.projectName}&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">gitlab.CreateBranch</span><span style="color:#24292E;">(projectId, </span><span style="color:#032F62;">&quot;\${env.branchName}&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;\${env.baseBranch}&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">*/</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HttpReq</span><span style="color:#24292E;">(</span><span style="color:#E36209;">apiURL</span><span style="color:#24292E;">, </span><span style="color:#E36209;">method</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">	gitlabURL </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;http://192.168.1.22/api/v4&quot;</span></span>
<span class="line"><span style="color:#24292E;">	withCredentials([string(</span><span style="color:#005CC5;">credentialsId</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;e0c7ba82-67da-42a0-ae98-95cf0c019569&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">variable</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;GITLABTOKEN&#39;</span><span style="color:#24292E;">)]) {</span></span>
<span class="line"><span style="color:#24292E;">				response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;">	sh </span><span style="color:#005CC5;">returnStdout</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">script</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">					//Create branch</span></span>
<span class="line"><span style="color:#032F62;">						curl --location \\</span></span>
<span class="line"><span style="color:#032F62;">						     --request POST \\</span></span>
<span class="line"><span style="color:#032F62;">						     &quot;\${gitlabURL}/\${apiURL}&quot; \\</span></span>
<span class="line"><span style="color:#032F62;">						     --header &quot;PRIVATE-TOKEN: \${GITLABTOKEN}&quot;</span></span>
<span class="line"><span style="color:#032F62;">					&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> response</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//创建分支</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CreateBranch</span><span style="color:#24292E;">(</span><span style="color:#E36209;">projectId</span><span style="color:#24292E;">, </span><span style="color:#E36209;">branchName</span><span style="color:#24292E;">, </span><span style="color:#E36209;">baseBranch</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	apiURL </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;projects/\${projectId}/repository/branches?branch=\${branchName}&amp;ref=\${baseBranch}&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">HttpReq</span><span style="color:#24292E;">(apiURL, </span><span style="color:#032F62;">&quot;POST&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">/*withCredentials([string(credentialsId: &#39;e0c7ba82-67da-42a0-ae98-95cf0c019569&#39;, variable: &#39;GITLABTOKEN&#39;)]) {</span></span>
<span class="line"><span style="color:#6A737D;">					sh &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					//Create branch</span></span>
<span class="line"><span style="color:#6A737D;">						curl --location \\</span></span>
<span class="line"><span style="color:#6A737D;">						     --request POST \\</span></span>
<span class="line"><span style="color:#6A737D;">						     &quot;http://192.168.1.22/api/v4/projects/\${projectId}/repository/branches?branch=\${branchName}&amp;ref=\${baseBranch}&quot; \\</span></span>
<span class="line"><span style="color:#6A737D;">						     --header &quot;PRIVATE-TOKEN: \${GITLABTOKEN}&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">	}*/</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//获取项目 id</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">GetprojectId</span><span style="color:#24292E;">(</span><span style="color:#E36209;">projectName</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">	apiURL </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;project?search=\${projectName}&quot;</span></span>
<span class="line"><span style="color:#24292E;">	result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">HttpReq</span><span style="color:#24292E;">(apiURL, </span><span style="color:#032F62;">&quot;GET&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> readJSON </span><span style="color:#005CC5;">test</span><span style="color:#24292E;">: result</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&quot;id&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">/*withCredentials([string(credentialsId: &#39;e0c7ba82-67da-42a0-ae98-95cf0c019569&#39;, variable: &#39;GITLABTOKEN&#39;)]) {</span></span>
<span class="line"><span style="color:#6A737D;">					sh &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					//Create branch</span></span>
<span class="line"><span style="color:#6A737D;">						curl --location \\</span></span>
<span class="line"><span style="color:#6A737D;">						     --request POST \\</span></span>
<span class="line"><span style="color:#6A737D;">						     &quot;http://192.168.1.22/api/v4/projects/\${projectId}/repository/branches?branch=\${branchName}&amp;ref=\${baseBranch}&quot; \\</span></span>
<span class="line"><span style="color:#6A737D;">						     --header &quot;PRIVATE-TOKEN: \${GITLABTOKEN}&quot;</span></span>
<span class="line"><span style="color:#6A737D;">					&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#6A737D;">	}*/</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,73),e=[o];function t(c,r,E,y,i,u){return n(),a("div",null,e)}const g=s(p,[["render",t]]);export{d as __pageData,g as default};
