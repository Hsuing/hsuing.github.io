import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"pipeline","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/CICD/1-syntax.md","filePath":"guide/Linux/Jenkins/CICD/1-syntax.md","lastUpdated":1720606881000}'),p={name:"guide/Linux/Jenkins/CICD/1-syntax.md"},e=l(`<h1 id="pipeline" tabindex="-1">pipeline <a class="header-anchor" href="#pipeline" aria-label="Permalink to &quot;pipeline&quot;">​</a></h1><p>官方文档：</p><p><a href="https://www.jenkins.io/doc/pipeline/steps/workflow-basic-steps/#wrap-general-build-wrapper" target="_blank" rel="noreferrer">https://www.jenkins.io/doc/pipeline/steps/workflow-basic-steps/#wrap-general-build-wrapper</a></p><p><a href="https://www.jenkins.io/zh/node/" target="_blank" rel="noreferrer">https://www.jenkins.io/zh/node/</a></p><p><a href="https://www.jenkins.io/doc/book/pipeline/syntax/#declarative-pipeline" target="_blank" rel="noreferrer">https://www.jenkins.io/doc/book/pipeline/syntax/#declarative-pipeline</a></p><p>中文文档，<a href="https://www.jenkins.io/zh/doc/pipeline/tour/getting-started/" target="_blank" rel="noreferrer">https://www.jenkins.io/zh/doc/pipeline/tour/getting-started/</a></p><p><a href="https://www.jenkins.io/doc/book/pipeline/syntax/" target="_blank" rel="noreferrer">https://www.jenkins.io/doc/book/pipeline/syntax/</a></p><p>查看内置变量</p><p><a href="http://ip/env-vars.html/" target="_blank" rel="noreferrer">http://ip/env-vars.html/</a></p><p>可以参考，<a href="https://52wiki.cn/project-14/doc-616/" target="_blank" rel="noreferrer">https://52wiki.cn/project-14/doc-616/</a></p><p>Jenkins从根本上说是一个支持多种自动化模式的自动化引擎。Pipeline在Jenkins上增加了一套强大的自动化工具，支持从简单的持续集成到全面的CD管道的用例。通过对一系列相关任务建模，用户可以利用Pipeline的更多功能，如：</p><ol><li>可维护：管道是在代码中实现的，并且通常会被签入源代码管理，从而使团队能够编辑，审阅和迭代他们的交付管道。</li><li>可能出现：在继续进行管道运行之前，管道可以选择停止并等待人员输入或批准。</li><li>复杂场景：管道支持复杂的实际CD需求，包括分叉/连接，循环和并行执行工作的能力。</li><li>可扩展性：Pipeline插件支持对其DSL的定制扩展</li></ol><h2 id="_1-1-创建" tabindex="-1">1.1 创建 <a class="header-anchor" href="#_1-1-创建" aria-label="Permalink to &quot;1.1 创建&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092132069.jpg" alt="pipeline项目创建"></p><h2 id="_1-2-pipeline-script" tabindex="-1">1.2 pipeline script <a class="header-anchor" href="#_1-2-pipeline-script" aria-label="Permalink to &quot;1.2 pipeline script&quot;">​</a></h2><h3 id="script模式" tabindex="-1">Script模式 <a class="header-anchor" href="#script模式" aria-label="Permalink to &quot;Script模式&quot;">​</a></h3><p><strong>Scripted Pipeline</strong>则是旧版本中 Jenkins 支持的 Pipeline 模式，主要是写一些 groovy 的代码来制定流程</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092133537.jpg" alt="pipeline项目创建1"></p><blockquote><p>简单案例</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">node {</span></span>
<span class="line"><span style="color:#e1e4e8;">	stage(&#39;Build&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">		println &quot;Build&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">	stage(&#39;Test&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">		println &quot;Test&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">	stage(&#39;Deploy&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">		println &quot;Deploy&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#脚本化的流水线自由度更高，因此我们选择脚本的写法</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">node {</span></span>
<span class="line"><span style="color:#24292e;">	stage(&#39;Build&#39;){</span></span>
<span class="line"><span style="color:#24292e;">		println &quot;Build&quot;</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">	stage(&#39;Test&#39;){</span></span>
<span class="line"><span style="color:#24292e;">		println &quot;Test&quot;</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">	stage(&#39;Deploy&#39;){</span></span>
<span class="line"><span style="color:#24292e;">		println &quot;Deploy&quot;</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#脚本化的流水线自由度更高，因此我们选择脚本的写法</span></span></code></pre></div><ul><li>效果图</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092133942.jpg" alt="Script模式"></p><h3 id="declarative类型" tabindex="-1">Declarative类型 <a class="header-anchor" href="#declarative类型" aria-label="Permalink to &quot;Declarative类型&quot;">​</a></h3><p><strong>Declarative Pipeline</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Declarative Pipeline 最外层有个 pipeline 表明它是一个声明式流水线，下面会有 4 个主要的部分： agent，post，stages，steps</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Declarative Pipeline 最外层有个 pipeline 表明它是一个声明式流水线，下面会有 4 个主要的部分： agent，post，stages，steps</span></span></code></pre></div><h4 id="agent" tabindex="-1">Agent <a class="header-anchor" href="#agent" aria-label="Permalink to &quot;Agent&quot;">​</a></h4><p><code>agent</code> 主要用于描述整个 Pipeline 或者指定的 Stage 由什么规则来选择节点执行。Pipeline 级别的 agent 可以视为 Stage 级别的默认值，如果 stage 中没有指定，将会使用与 Pipeline 一致的规则。在最新的 Jenkins 版本中，可以支持指定任意节点(<code>any</code>)，不指定(<code>none</code>)，标签(<code>label</code>)，节点(<code>node</code>)，<code>docker</code>，<code>dockerfile</code> 和 <code>kubernetes</code> 等，具体的配置细节可以查看文档</p><p>Tips:</p><ul><li>如果 Pipeline 选择了 none，那么 stage 必须要指定一个有效的 agent，否则无法执行</li><li>Jenkins 总是会使用 master 来执行 scan multibranch 之类的操作，即使 master 配置了 0 executors</li><li>agent 指定的是规则而不是具体的节点，如果 stage 各自配置了自己的 agent，需要注意是不是在同一个节点执行的</li></ul><h4 id="stages-stage" tabindex="-1">Stages &amp;&amp; Stage <a class="header-anchor" href="#stages-stage" aria-label="Permalink to &quot;Stages &amp;&amp; Stage&quot;">​</a></h4><p>Stages 是 Pipeline 中最主要的组成部分，Jenkins 将会按照 Stages 中描述的顺序从上往下的执行。Stages 中可以包括任意多个 Stage，而 Stage 与 Stages 又能互相嵌套，除此以外还有 <code>parallel</code> 指令可以让内部的 Stage 并行运行。实际上可以把 Stage 当作最小单元，Stages 指定的是顺序运行，而 parallel 指定的是并行运行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">    agent none</span></span>
<span class="line"><span style="color:#e1e4e8;">    stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Sequential&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;In Sequential 1&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        echo &quot;In Sequential 1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;In Sequential 2&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        echo &quot;In Sequential 2&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;Parallel In Sequential&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    parallel {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        stage(&#39;In Parallel 1&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                                echo &quot;In Parallel 1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                            }</span></span>
<span class="line"><span style="color:#e1e4e8;">                        }</span></span>
<span class="line"><span style="color:#e1e4e8;">                        stage(&#39;In Parallel 2&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                                echo &quot;In Parallel 2&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                            }</span></span>
<span class="line"><span style="color:#e1e4e8;">                        }</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">    agent none</span></span>
<span class="line"><span style="color:#24292e;">    stages {</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Sequential&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            stages {</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;In Sequential 1&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    steps {</span></span>
<span class="line"><span style="color:#24292e;">                        echo &quot;In Sequential 1&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;In Sequential 2&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    steps {</span></span>
<span class="line"><span style="color:#24292e;">                        echo &quot;In Sequential 2&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;Parallel In Sequential&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    parallel {</span></span>
<span class="line"><span style="color:#24292e;">                        stage(&#39;In Parallel 1&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                            steps {</span></span>
<span class="line"><span style="color:#24292e;">                                echo &quot;In Parallel 1&quot;</span></span>
<span class="line"><span style="color:#24292e;">                            }</span></span>
<span class="line"><span style="color:#24292e;">                        }</span></span>
<span class="line"><span style="color:#24292e;">                        stage(&#39;In Parallel 2&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                            steps {</span></span>
<span class="line"><span style="color:#24292e;">                                echo &quot;In Parallel 2&quot;</span></span>
<span class="line"><span style="color:#24292e;">                            }</span></span>
<span class="line"><span style="color:#24292e;">                        }</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h4 id="steps" tabindex="-1">Steps <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;Steps&quot;">​</a></h4><p><code>steps</code> 是 Pipeline 中最核心的部分，每个 Stage 都需要指定 Steps。Steps 内部可以执行一系列的操作，任意操作执行出错都会返回错误。完整的 Steps 操作列表可以参考 <a href="https://jenkins.io/doc/pipeline/steps/" target="_blank" rel="noreferrer">Pipeline Steps Reference</a>，这里只说一些使用时需要注意的点。</p><ul><li>groovy 语法中有不同的字符串类型，其中 <code>&#39;abc&#39;</code> 是 Plain 字符串，不会转义 <code>\${WROKSPACE}</code> 这样的变量，而 <code>&quot;abc&quot;</code> 会做这样的转换。此外还有 <code>&#39;&#39;&#39; xxx &#39;&#39;&#39;</code> 支持跨行字符串，<code>&quot;&quot;&quot;</code> 同理。</li><li>调用函数的 <code>()</code> 可以省略，使得函数调用形如 <code>updateGitlabCommitStatus name: &#39;build&#39;, state: &#39;success&#39;</code>，通过 <code>,</code> 来分割不同的参数，支持换行。</li><li>可以在声明式流水线中通过 <code>script</code> 来插入一段 groovy 脚本</li></ul><h4 id="post" tabindex="-1">Post <a class="header-anchor" href="#post" aria-label="Permalink to &quot;Post&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">post 部分将会在 pipeline 的最后执行，经常用于一些测试完毕后的清理和通知操作。文档中给出了一系列的情况，比较常用的是 always，success 和 failure</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">post 部分将会在 pipeline 的最后执行，经常用于一些测试完毕后的清理和通知操作。文档中给出了一系列的情况，比较常用的是 always，success 和 failure</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">	agent any</span></span>
<span class="line"><span style="color:#e1e4e8;">	stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">		stage(&#39;Build&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">			steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">				println &quot;Build&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">			}</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">		</span></span>
<span class="line"><span style="color:#e1e4e8;">		stage(&#39;Test&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">			steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">				println &quot;Test&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">			}</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">		</span></span>
<span class="line"><span style="color:#e1e4e8;">		stage(&#39;Deploy&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">			steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">				println &quot;Deploy&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">			}</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">	agent any</span></span>
<span class="line"><span style="color:#24292e;">	stages {</span></span>
<span class="line"><span style="color:#24292e;">		stage(&#39;Build&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">			steps {</span></span>
<span class="line"><span style="color:#24292e;">				println &quot;Build&quot;</span></span>
<span class="line"><span style="color:#24292e;">			}</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">		</span></span>
<span class="line"><span style="color:#24292e;">		stage(&#39;Test&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">			steps {</span></span>
<span class="line"><span style="color:#24292e;">				println &quot;Test&quot;</span></span>
<span class="line"><span style="color:#24292e;">			}</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">		</span></span>
<span class="line"><span style="color:#24292e;">		stage(&#39;Deploy&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">			steps {</span></span>
<span class="line"><span style="color:#24292e;">				println &quot;Deploy&quot;</span></span>
<span class="line"><span style="color:#24292e;">			}</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092133534.jpg" alt="Declarative类型"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092133264.jpg" alt="Declarative类型1"></p><p>其中关键语法异同如下：</p><ul><li>pipeline 是声明性管道特定语法，它定义了一个包含执行整个管道的所有内容和指令的“块”。</li><li>agent 是声明式管道特定的语法，它指示Jenkins为整个管道分配执行程序（在节点上）和工作空间。</li><li>stage是描述此Pipeline阶段的语法块 。stage在Pipeline语法页面上阅读关于声明式管道语法块的更多信息。如所提到的上述，stage块在脚本管道语法可选的。</li><li>steps是声明式管道特定语法，用于描述要在此中运行的步骤stage。</li><li>sh是一个Pipeline 步骤（由 Pipeline：Nodes和Processes插件提供）执行给定的shell命令。</li><li>node是脚本化的管道特定语法，指示Jenkins在任何可用的代理/节点上执行此管道（以及其中包含的任何阶段）。这与agent声明式管道特定语法中的效果相同</li></ul><h2 id="_1-3-jekninsfile" tabindex="-1">1.3 Jekninsfile <a class="header-anchor" href="#_1-3-jekninsfile" aria-label="Permalink to &quot;1.3 Jekninsfile&quot;">​</a></h2><blockquote><p>作用 直接在服务端代码仓库根目录下面添加Jenkinsfile文件，Pipeline代码放到Jenkinsfile文件中,用于描述流水线构建流程</p></blockquote><blockquote><p>可以用以下地址作为 测试</p></blockquote><ul><li><a href="https://gitee.com/freehan/pipeline.git" target="_blank" rel="noreferrer">https://gitee.com/freehan/pipeline.git</a></li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092134882.jpg" alt="pipeline scm"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092134056.jpg" alt="pipeline scm git"></p><ul><li>git</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092134170.jpg" alt="pipeline scm git1"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092134065.jpg" alt="Jekninsfile1"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092134703.jpg" alt="位置不同"></p><ul><li>状态 <img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092134054.jpg" alt="Jekninsfile1"></li></ul><h1 id="_1-pipeline-开发工具" tabindex="-1">1.Pipeline 开发工具 <a class="header-anchor" href="#_1-pipeline-开发工具" aria-label="Permalink to &quot;1.Pipeline 开发工具&quot;">​</a></h1><p><strong>选择任意pipeline类型的作业，点击“流水线语法”即可进入pipeline开发工具页面</strong></p><h2 id="_1-1片段生成器" tabindex="-1">1.1片段生成器 <a class="header-anchor" href="#_1-1片段生成器" aria-label="Permalink to &quot;1.1片段生成器&quot;">​</a></h2><p>流水线代码片段生成器， 非常好用。在这里可以找到<strong>每个插件以及Jenkins内置的方法</strong>的使用方法。使用片段生成器可以根据个人需要生成方法，有些方法来源于插件，则需要先<strong>安装相关的插件才能使用</strong></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092134027.jpg" alt=""></p><h2 id="_1-2声明式语法生成器" tabindex="-1">1.2声明式语法生成器 <a class="header-anchor" href="#_1-2声明式语法生成器" aria-label="Permalink to &quot;1.2声明式语法生成器&quot;">​</a></h2><p>可以生成声明式流水线语法的语句块</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092134658.jpg" alt=""></p><h2 id="_1-3生成语法" tabindex="-1">1.3生成语法 <a class="header-anchor" href="#_1-3生成语法" aria-label="Permalink to &quot;1.3生成语法&quot;">​</a></h2><ul><li>Declarative Pipeline 脚本生成器 http://JENKINS_ROOT/directive-generator/</li><li>Script Pipeline 脚本生成器 http://JENKINS_ROOT/pipeline-syntax/</li></ul><p>入口在上边配置工程的最下边，如图 <code>流水线语法</code></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092134769.png" alt=""></p><ul><li>流水线语法使用示意</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092134132.png" alt=""></p><h1 id="_2-基本语法" tabindex="-1">2.基本语法 <a class="header-anchor" href="#_2-基本语法" aria-label="Permalink to &quot;2.基本语法&quot;">​</a></h1><h2 id="_2-0stages" tabindex="-1">2.0stages <a class="header-anchor" href="#_2-0stages" aria-label="Permalink to &quot;2.0stages&quot;">​</a></h2><p><a href="https://jenkins.io/zh/doc/book/pipeline/syntax/#stages" target="_blank" rel="noreferrer">stages文档</a></p><ul><li>关系： stages &gt; stage &gt; steps &gt; script</li><li>定义</li></ul><p>○ stages：包含多个stage阶段 ○ stage： 包含多个steps步骤 ○ steps: 包含一组特定的脚本（加上script后就可以实现在声明式脚本中嵌入脚本式语法了）</p><ul><li>案例</li></ul><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#在声明式语法中可以嵌入脚本式语法：</span></span>
<span class="line"><span style="color:#E1E4E8;">pipeline{</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent{label </span><span style="color:#9ECBFF;">&quot;build&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages{</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;echo the rr&#39;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps{</span></span>
<span class="line"><span style="color:#E1E4E8;">                script{</span></span>
<span class="line"><span style="color:#E1E4E8;">                    a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;\${a}&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#在声明式语法中可以嵌入脚本式语法：</span></span>
<span class="line"><span style="color:#24292E;">pipeline{</span></span>
<span class="line"><span style="color:#24292E;">    agent{label </span><span style="color:#032F62;">&quot;build&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">    stages{</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;echo the rr&#39;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            steps{</span></span>
<span class="line"><span style="color:#24292E;">                script{</span></span>
<span class="line"><span style="color:#24292E;">                    a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;\${a}&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>基本语法：</p><p>一个pipeline中只能包含一个stages</p><p>一个stages可以包含多个stage(&#39;xxx&#39;)</p><p>一个stage(&#39;xxx&#39;)可以包含<strong>一个</strong>steps</p><h2 id="_2-1预设指令" tabindex="-1">2.1预设指令 <a class="header-anchor" href="#_2-1预设指令" aria-label="Permalink to &quot;2.1预设指令&quot;">​</a></h2><p><a href="https://jenkins.io/zh/doc/book/pipeline/syntax/#%E5%A3%B0%E6%98%8E%E5%BC%8F%E6%B5%81%E6%B0%B4%E7%BA%BF" target="_blank" rel="noreferrer">pipeline文档</a></p><p>各种预设指令（Directive）的从属关系如下：图中，实线框表示必选模块，虚线框表示可选模块</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092135791.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092135342.jpg" alt=""></p><h2 id="_2-2-agent" tabindex="-1">2.2 agent <a class="header-anchor" href="#_2-2-agent" aria-label="Permalink to &quot;2.2 agent&quot;">​</a></h2><p><a href="https://jenkins.io/zh/doc/book/pipeline/syntax/#%E4%BB%A3%E7%90%86" target="_blank" rel="noreferrer">agent文档</a></p><p>agent 指令用于指定所在模块（pipeline、stage）的运行环境，可以是Jenkins 节点机或者 docker 容器</p><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>any</td><td>在任何可用的节点上执行pipeline</td></tr><tr><td>none</td><td>没有指定agent的时候默认</td></tr><tr><td>label</td><td>在指定标签上的节点运行pipeline</td></tr><tr><td>node</td><td>支持自定义流水线的工作目录</td></tr></tbody></table><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#在任一节点运行</span></span>
<span class="line"><span style="color:#E1E4E8;">agent any</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">#标签选择</span></span>
<span class="line"><span style="color:#E1E4E8;">agent { label </span><span style="color:#9ECBFF;">&quot;label Name&quot;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">#自定义节点、工作目录</span></span>
<span class="line"><span style="color:#E1E4E8;">agent { </span></span>
<span class="line"><span style="color:#E1E4E8;">   node {</span></span>
<span class="line"><span style="color:#E1E4E8;">      label </span><span style="color:#9ECBFF;">&quot;labelName&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      customWorkspace </span><span style="color:#9ECBFF;">&quot;/opt/agent/workspace&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#在任一节点运行</span></span>
<span class="line"><span style="color:#24292E;">agent any</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">#标签选择</span></span>
<span class="line"><span style="color:#24292E;">agent { label </span><span style="color:#032F62;">&quot;label Name&quot;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">#自定义节点、工作目录</span></span>
<span class="line"><span style="color:#24292E;">agent { </span></span>
<span class="line"><span style="color:#24292E;">   node {</span></span>
<span class="line"><span style="color:#24292E;">      label </span><span style="color:#032F62;">&quot;labelName&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      customWorkspace </span><span style="color:#032F62;">&quot;/opt/agent/workspace&quot;</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_2-3-environment" tabindex="-1">2.3 environment <a class="header-anchor" href="#_2-3-environment" aria-label="Permalink to &quot;2.3 environment&quot;">​</a></h2><p><code>$变量名</code> <a href="https://jenkins.io/zh/doc/book/pipeline/syntax/#environment" target="_blank" rel="noreferrer">environment文档</a></p><p>指定所在模块（pipeline、stage）的环境变量， <code>key = value</code> 的形式。Job 的参数，需要通过 environment 环境变量的方式 <code>\${params.xxxx}</code> 传递给执行脚本,分为==全局级别(流水线级别)和阶段级别==</p><ul><li>全局级别</li></ul><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">	environment {</span></span>
<span class="line"><span style="color:#E1E4E8;">  		</span><span style="color:#79B8FF;">USER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;username&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  		</span><span style="color:#79B8FF;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;xxxxxx&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  		type </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;\${params.type}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">	environment {</span></span>
<span class="line"><span style="color:#24292E;">  		</span><span style="color:#005CC5;">USER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;username&#39;</span></span>
<span class="line"><span style="color:#24292E;">  		</span><span style="color:#005CC5;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;xxxxxx&#39;</span></span>
<span class="line"><span style="color:#24292E;">  		type </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;\${params.type}&quot;</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>阶段级别</li></ul><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">..</span><span style="color:#E1E4E8;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">..</span><span style="color:#E1E4E8;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&quot;build&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            environment {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span></span>
<span class="line"><span style="color:#E1E4E8;">                </span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">VERSION</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;1.1.20&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                script {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    echo </span><span style="color:#9ECBFF;">&quot;\${VERSION}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">..</span><span style="color:#24292E;">.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">..</span><span style="color:#24292E;">.</span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&quot;build&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            environment {</span></span>
<span class="line"><span style="color:#24292E;">                </span></span>
<span class="line"><span style="color:#24292E;">                </span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">VERSION</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;1.1.20&quot;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                script {</span></span>
<span class="line"><span style="color:#24292E;">                    echo </span><span style="color:#032F62;">&quot;\${VERSION}&quot;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>==当全局变量和阶段变量冲突时，全局会覆盖阶段的变量==</p><h2 id="_2-4-triggers" tabindex="-1">2.4 triggers <a class="header-anchor" href="#_2-4-triggers" aria-label="Permalink to &quot;2.4 triggers&quot;">​</a></h2><ul><li><p>流水线的触发方式</p></li><li><ul><li>cron 定时触发: <code>triggers { cron(&#39;H */7 * * 1-5&#39;) }</code></li><li>pollSCM: <code>triggers { pollSCM(&#39;H */7 * * 1-5&#39;) }</code></li></ul></li></ul><p>指定如何触发 Pipeline ，这个选项里以时间条件触发最为常用：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">triggers {</span></span>
<span class="line"><span style="color:#E1E4E8;">  cron(</span><span style="color:#9ECBFF;">&#39;H */4 * * 1-5&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">triggers {</span></span>
<span class="line"><span style="color:#24292E;">  cron(</span><span style="color:#032F62;">&#39;H */4 * * 1-5&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>crontab 的写法（用 H 代替 0）和设置页面上的一致。其实最方便的还是从界面上设置</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline{</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent{ label </span><span style="color:#9ECBFF;">&quot;build&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">    triggers {</span></span>
<span class="line"><span style="color:#E1E4E8;">        cron </span><span style="color:#9ECBFF;">&#39;*/1 * * * *&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//cron(&#39;H */7 * * 1-5&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    stages{</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&quot;lovely&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            options{</span></span>
<span class="line"><span style="color:#E1E4E8;">                timestamps()</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps{</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&quot;lovely&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline{</span></span>
<span class="line"><span style="color:#24292E;">    agent{ label </span><span style="color:#032F62;">&quot;build&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">    triggers {</span></span>
<span class="line"><span style="color:#24292E;">        cron </span><span style="color:#032F62;">&#39;*/1 * * * *&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//cron(&#39;H */7 * * 1-5&#39;)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    stages{</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&quot;lovely&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            options{</span></span>
<span class="line"><span style="color:#24292E;">                timestamps()</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            steps{</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&quot;lovely&quot;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_2-5-libraries" tabindex="-1">2.5 libraries <a class="header-anchor" href="#_2-5-libraries" aria-label="Permalink to &quot;2.5 libraries&quot;">​</a></h2><p>由于 Declarative Pipeline 的声明格式比较固定，如果有需要重复执行的语句片段，需要抽象为函数，就难以支持。可以使用 <a href="https://jenkins.io/doc/book/pipeline/shared-libraries/" target="_blank" rel="noreferrer">Shared Libraries</a> 将共同的语句提取出来</p><p>其实如果是简单的逻辑，可以使用<code>Scripted Pipeline </code>实现</p><h2 id="_2-6-options" tabindex="-1">2.6 options <a class="header-anchor" href="#_2-6-options" aria-label="Permalink to &quot;2.6 options&quot;">​</a></h2><p>options指令允许从流水线内部配置特定于流水线的选项。流水线提供了许多这样的选项，比如buildDiscarder,也可以有插件提供，比如timestamps</p><h3 id="pipeline配置参数" tabindex="-1">Pipeline配置参数 <a class="header-anchor" href="#pipeline配置参数" aria-label="Permalink to &quot;Pipeline配置参数&quot;">​</a></h3><table><thead><tr><th>参数名</th><th>说明</th><th>例子</th></tr></thead><tbody><tr><td>buildDiscarder</td><td>保留最近历史构建记录的数量</td><td>buildDiscarder(logRotator(numToKeepStr: &#39;10&#39;)</td></tr><tr><td>checkoutToSubdirectory</td><td>将代码从版本控制库中拉取后，保存在工作目录的子目录</td><td>checkoutToSubdirectory(&#39;subdir&#39;)</td></tr><tr><td>disableConcurrentBuilds</td><td>禁用Jenkins同时执行多次该pipeline</td><td>disableConcurrentBuilds()</td></tr><tr><td>newContainerPerStage</td><td>agent为Docker或Dockerfile时，每个stage都分别运行在一个新容器中</td><td>newContainerPerStage()</td></tr><tr><td>retry</td><td>pipeline发生失败后重试次数</td><td>retry(4)</td></tr><tr><td>timeout</td><td>pipeline运行超时时间</td><td>timeout(time:10, unit: &#39;HOURS/MINUTES&#39;)</td></tr><tr><td>overridenIndexTriggers</td><td>允许覆盖分支索引触发器的默认处理</td><td></td></tr><tr><td>skipDefaultCheckout</td><td>在agent指令中，跳过从源代码控制中检出代码的默认情况</td><td></td></tr></tbody></table><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">## 设置保存最近的记录</span></span>
<span class="line"><span style="color:#E1E4E8;">options { buildDiscarder(logRotator(</span><span style="color:#79B8FF;">numToKeepStr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;1&#39;</span><span style="color:#E1E4E8;">)) }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">## 禁止并行构建</span></span>
<span class="line"><span style="color:#E1E4E8;">options { disableConcurrentBuilds() }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">## 跳过默认的代码检出</span></span>
<span class="line"><span style="color:#E1E4E8;">options { skipDefaultCheckout() }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">## 设定流水线的超时时间(可用于阶段级别)</span></span>
<span class="line"><span style="color:#E1E4E8;">options { timeout(</span><span style="color:#79B8FF;">time</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">unit</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;HOURS&#39;</span><span style="color:#E1E4E8;">) }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">## 设定流水线的重试次数(可用于阶段级别)</span></span>
<span class="line"><span style="color:#E1E4E8;">options { retry(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">) }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">## 设置日志时间输出(可用于阶段级别)</span></span>
<span class="line"><span style="color:#E1E4E8;">options { timestamps() }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"></span>
<span class="line"><span style="color:#24292E;">## 设置保存最近的记录</span></span>
<span class="line"><span style="color:#24292E;">options { buildDiscarder(logRotator(</span><span style="color:#005CC5;">numToKeepStr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;1&#39;</span><span style="color:#24292E;">)) }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">## 禁止并行构建</span></span>
<span class="line"><span style="color:#24292E;">options { disableConcurrentBuilds() }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">## 跳过默认的代码检出</span></span>
<span class="line"><span style="color:#24292E;">options { skipDefaultCheckout() }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">## 设定流水线的超时时间(可用于阶段级别)</span></span>
<span class="line"><span style="color:#24292E;">options { timeout(</span><span style="color:#005CC5;">time</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">unit</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;HOURS&#39;</span><span style="color:#24292E;">) }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">## 设定流水线的重试次数(可用于阶段级别)</span></span>
<span class="line"><span style="color:#24292E;">options { retry(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">) }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">## 设置日志时间输出(可用于阶段级别)</span></span>
<span class="line"><span style="color:#24292E;">options { timestamps() }</span></span></code></pre></div><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">LogRotator构造参数分别为</span><span style="color:#E1E4E8;">：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">daysToKeep</span><span style="color:#E1E4E8;">: 构建记录将保存的天数</span></span>
<span class="line"><span style="color:#79B8FF;">numToKeep</span><span style="color:#E1E4E8;">: 最多此数目的构建记录将被保存</span></span>
<span class="line"><span style="color:#79B8FF;">artifactDaysToKeep</span><span style="color:#E1E4E8;">: 比此早的发布包将被删除，但构建的日志、操作历史、报告等将被保留</span></span>
<span class="line"><span style="color:#79B8FF;">artifactNumToKeep</span><span style="color:#E1E4E8;">: 最多此数目的构建将保留他们的发布包</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">options {</span></span>
<span class="line"><span style="color:#E1E4E8;">    disableConcurrentBuilds()</span></span>
<span class="line"><span style="color:#E1E4E8;">    skipDefaultCheckout()</span></span>
<span class="line"><span style="color:#E1E4E8;">    buildDiscarder logRotator(</span><span style="color:#79B8FF;">artifactDaysToKeepStr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;7&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">artifactNumToKeepStr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;3&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">daysToKeepStr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;6&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">numToKeepStr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;6&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    timeout(</span><span style="color:#79B8FF;">time</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">unit</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;MINUTES&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    retry(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    timestamps()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">LogRotator构造参数分别为</span><span style="color:#24292E;">：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">daysToKeep</span><span style="color:#24292E;">: 构建记录将保存的天数</span></span>
<span class="line"><span style="color:#005CC5;">numToKeep</span><span style="color:#24292E;">: 最多此数目的构建记录将被保存</span></span>
<span class="line"><span style="color:#005CC5;">artifactDaysToKeep</span><span style="color:#24292E;">: 比此早的发布包将被删除，但构建的日志、操作历史、报告等将被保留</span></span>
<span class="line"><span style="color:#005CC5;">artifactNumToKeep</span><span style="color:#24292E;">: 最多此数目的构建将保留他们的发布包</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">options {</span></span>
<span class="line"><span style="color:#24292E;">    disableConcurrentBuilds()</span></span>
<span class="line"><span style="color:#24292E;">    skipDefaultCheckout()</span></span>
<span class="line"><span style="color:#24292E;">    buildDiscarder logRotator(</span><span style="color:#005CC5;">artifactDaysToKeepStr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;7&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">artifactNumToKeepStr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">daysToKeepStr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;6&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">numToKeepStr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;6&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    timeout(</span><span style="color:#005CC5;">time</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">unit</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;MINUTES&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    retry(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    timestamps()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span></code></pre></div><p>这是所在模块（pipeline、stage）的运行参数设置，有下面一些用途：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">options {</span></span>
<span class="line"><span style="color:#E1E4E8;">  timestamps() </span><span style="color:#6A737D;">//打开控制台日志的时间戳</span></span>
<span class="line"><span style="color:#E1E4E8;">  retry(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// 指定失败后的重试次数</span></span>
<span class="line"><span style="color:#E1E4E8;">  quietPeriod(</span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">） </span><span style="color:#6A737D;">// 指定启动前等待的秒数</span></span>
<span class="line"><span style="color:#E1E4E8;">  timeout(</span><span style="color:#79B8FF;">time</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">unit</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;HOURS&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// 指定任务的超时时间，超时将放弃该任务</span></span>
<span class="line"><span style="color:#E1E4E8;">  buildDiscarder logRotator(</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#79B8FF;">daysToKeepStr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;6&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#79B8FF;">numToKeepStr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;6&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            )</span></span>
<span class="line"><span style="color:#E1E4E8;">  disableConcurrentBuilds()</span><span style="color:#6A737D;">//禁止并行构建，因为用的worksapce还是同一个</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">options {</span></span>
<span class="line"><span style="color:#24292E;">  timestamps() </span><span style="color:#6A737D;">//打开控制台日志的时间戳</span></span>
<span class="line"><span style="color:#24292E;">  retry(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// 指定失败后的重试次数</span></span>
<span class="line"><span style="color:#24292E;">  quietPeriod(</span><span style="color:#005CC5;">30</span><span style="color:#24292E;">） </span><span style="color:#6A737D;">// 指定启动前等待的秒数</span></span>
<span class="line"><span style="color:#24292E;">  timeout(</span><span style="color:#005CC5;">time</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">unit</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;HOURS&#39;</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// 指定任务的超时时间，超时将放弃该任务</span></span>
<span class="line"><span style="color:#24292E;">  buildDiscarder logRotator(</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#005CC5;">daysToKeepStr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;6&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#005CC5;">numToKeepStr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;6&#39;</span></span>
<span class="line"><span style="color:#24292E;">            )</span></span>
<span class="line"><span style="color:#24292E;">  disableConcurrentBuilds()</span><span style="color:#6A737D;">//禁止并行构建，因为用的worksapce还是同一个</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_2-7-parameters" tabindex="-1">2.7 parameters <a class="header-anchor" href="#_2-7-parameters" aria-label="Permalink to &quot;2.7 parameters&quot;">​</a></h2><p>定义： 流水线在运行时设置的参数，UI页面的参数。所有的参数都存储在params对象</p><p>这是 Job 的运行参数设置，决定 Build With Parameters 界面上的参数列表。只有当 Job 运行一次、解析一次 Jenkinsfile 以后才会更新在界面上。</p><p>在 Pipeline 文件的其他模块里，parameters 的设置以 <code>params</code> 对象形象出现，可以用来读取自定义的参数。各类型的参数定义如下：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">	parameters {</span></span>
<span class="line"><span style="color:#E1E4E8;">  		string(</span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;DEPLOY_ENV&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">defaultValue</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;staging&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  		booleanParam(</span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;TOGGLE&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">defaultValue</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Toggle this value&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  		choice(</span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;CHOICE&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">choices</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&#39;One&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;Two&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;Three&#39;</span><span style="color:#E1E4E8;">], </span><span style="color:#79B8FF;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Pick something&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  		password(</span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;PASSWORD&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">defaultValue</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;SECRET&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Enter a password&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">     stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&quot;Build&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&quot;\${params.VERSION}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any</span></span>
<span class="line"><span style="color:#24292E;">	parameters {</span></span>
<span class="line"><span style="color:#24292E;">  		string(</span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;DEPLOY_ENV&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">defaultValue</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;staging&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  		booleanParam(</span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;TOGGLE&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">defaultValue</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Toggle this value&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  		choice(</span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;CHOICE&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">choices</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&#39;One&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;Two&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;Three&#39;</span><span style="color:#24292E;">], </span><span style="color:#005CC5;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Pick something&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  		password(</span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;PASSWORD&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">defaultValue</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;SECRET&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Enter a password&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">     stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&quot;Build&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&quot;\${params.VERSION}&quot;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="string" tabindex="-1">string <a class="header-anchor" href="#string" aria-label="Permalink to &quot;string&quot;">​</a></h4><p>字符串类型参数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">parameters {</span></span>
<span class="line"><span style="color:#e1e4e8;">  string(name: &#39;DEPLOY_ENV&#39;, defaultValue: &#39;staging&#39;, description: &#39;&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">parameters {</span></span>
<span class="line"><span style="color:#24292e;">  string(name: &#39;DEPLOY_ENV&#39;, defaultValue: &#39;staging&#39;, description: &#39;&#39;)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!groovy</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">String workspace = &quot;/opt/jenkins/workspace&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">	agent {</span></span>
<span class="line"><span style="color:#e1e4e8;">		node {</span></span>
<span class="line"><span style="color:#e1e4e8;">			lable &quot;master&quot; //指定运行节点</span></span>
<span class="line"><span style="color:#e1e4e8;">			customWorkspace &quot;\${workspace}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!groovy</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">String workspace = &quot;/opt/jenkins/workspace&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">	agent {</span></span>
<span class="line"><span style="color:#24292e;">		node {</span></span>
<span class="line"><span style="color:#24292e;">			lable &quot;master&quot; //指定运行节点</span></span>
<span class="line"><span style="color:#24292e;">			customWorkspace &quot;\${workspace}&quot;</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h4 id="booleanparam" tabindex="-1">booleanParam <a class="header-anchor" href="#booleanparam" aria-label="Permalink to &quot;booleanParam&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">parameters {</span></span>
<span class="line"><span style="color:#e1e4e8;">  booleanParam(name: &#39;TOGGLE&#39;, defaultValue: true, description: &#39;&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">parameters {</span></span>
<span class="line"><span style="color:#24292e;">  booleanParam(name: &#39;TOGGLE&#39;, defaultValue: true, description: &#39;&#39;)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_2-8-tools" tabindex="-1">2.8 tools <a class="header-anchor" href="#_2-8-tools" aria-label="Permalink to &quot;2.8 tools&quot;">​</a></h2><p>官方文档，插接件 <a href="https://jenkins.io/zh/doc/book/pipeline/syntax/#%E5%B7%A5%E5%85%B7" target="_blank" rel="noreferrer">tools文档</a></p><p>在 Jenkins 里 Manage Jenkins - Global Tool Configuration 里设置过的工具</p><p>获取通过自动安装或手动放置工具的环境变量。支持maven/jdk/gradle。工具的名称必须在系统设置-&gt;全局工具配置中定义</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092135307.png" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">    agent any</span></span>
<span class="line"><span style="color:#e1e4e8;">    tools {</span></span>
<span class="line"><span style="color:#e1e4e8;">        maven &#39;apache-maven-3.0.1&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Example&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &#39;mvn --version&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">    agent any</span></span>
<span class="line"><span style="color:#24292e;">    tools {</span></span>
<span class="line"><span style="color:#24292e;">        maven &#39;apache-maven-3.0.1&#39; </span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    stages {</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Example&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                sh &#39;mvn --version&#39;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>或者</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">stage (&quot;build&quot;){</span></span>
<span class="line"><span style="color:#e1e4e8;">    mavenHome = tool &#39;M3&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    sh &quot;\${mavenHome}/bin/mvn -v&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">stage (&quot;build&quot;){</span></span>
<span class="line"><span style="color:#24292e;">    mavenHome = tool &#39;M3&#39;</span></span>
<span class="line"><span style="color:#24292e;">    sh &quot;\${mavenHome}/bin/mvn -v&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_2-9-stages" tabindex="-1">2.9 stages <a class="header-anchor" href="#_2-9-stages" aria-label="Permalink to &quot;2.9 stages&quot;">​</a></h2><p>stages是 pipeline 模块下的必选项，这是所有 stage 的集合，其中要包含至少一个 stage</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline {  </span></span>
<span class="line"><span style="color:#e1e4e8;">    agent any  </span></span>
<span class="line"><span style="color:#e1e4e8;">    stages {  </span></span>
<span class="line"><span style="color:#e1e4e8;">            stage (&#39;Build&#39;) {  </span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &#39;hello&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }  </span></span>
<span class="line"><span style="color:#e1e4e8;">            stage (&#39;Test&#39;) {  </span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &#39;hello&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }  </span></span>
<span class="line"><span style="color:#e1e4e8;">            stage (&#39;QA&#39;) {  </span></span>
<span class="line"><span style="color:#e1e4e8;">               echo &#39;hello&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">            }  </span></span>
<span class="line"><span style="color:#e1e4e8;">            stage (&#39;Deploy&#39;) {  </span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &#39;hello&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }  </span></span>
<span class="line"><span style="color:#e1e4e8;">            stage (&#39;Monitor&#39;) {  </span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &#39;hello&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }  </span></span>
<span class="line"><span style="color:#e1e4e8;">    }  </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline {  </span></span>
<span class="line"><span style="color:#24292e;">    agent any  </span></span>
<span class="line"><span style="color:#24292e;">    stages {  </span></span>
<span class="line"><span style="color:#24292e;">            stage (&#39;Build&#39;) {  </span></span>
<span class="line"><span style="color:#24292e;">                echo &#39;hello&#39;</span></span>
<span class="line"><span style="color:#24292e;">            }  </span></span>
<span class="line"><span style="color:#24292e;">            stage (&#39;Test&#39;) {  </span></span>
<span class="line"><span style="color:#24292e;">                echo &#39;hello&#39;</span></span>
<span class="line"><span style="color:#24292e;">            }  </span></span>
<span class="line"><span style="color:#24292e;">            stage (&#39;QA&#39;) {  </span></span>
<span class="line"><span style="color:#24292e;">               echo &#39;hello&#39; </span></span>
<span class="line"><span style="color:#24292e;">            }  </span></span>
<span class="line"><span style="color:#24292e;">            stage (&#39;Deploy&#39;) {  </span></span>
<span class="line"><span style="color:#24292e;">                echo &#39;hello&#39;</span></span>
<span class="line"><span style="color:#24292e;">            }  </span></span>
<span class="line"><span style="color:#24292e;">            stage (&#39;Monitor&#39;) {  </span></span>
<span class="line"><span style="color:#24292e;">                echo &#39;hello&#39;</span></span>
<span class="line"><span style="color:#24292e;">            }  </span></span>
<span class="line"><span style="color:#24292e;">    }  </span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_3-0-stage" tabindex="-1">3.0 stage <a class="header-anchor" href="#_3-0-stage" aria-label="Permalink to &quot;3.0 stage&quot;">​</a></h2><p><a href="https://jenkins.io/zh/doc/book/pipeline/syntax/#stage" target="_blank" rel="noreferrer">stage文档</a></p><p>stage 真正执行语句的模块，有以下的特点：</p><ul><li>每一个 stage 在 Blue Ocean 界面上对应一个圆圈；</li><li>stage可以定义多个；</li><li>stage 有一个必选参数，就是名称，写在 stage 后面的括号里：<code>stage(&#39;Example&#39;) {...}</code></li><li>stage 里有许多参数和 顶级 pipeline 相同</li></ul><h3 id="agent-1" tabindex="-1">agent <a class="header-anchor" href="#agent-1" aria-label="Permalink to &quot;agent&quot;">​</a></h3><p>如果 pipeline 中的 agent 设置为 <code>none</code>，则每个 stage 中必须设置 agent</p><h3 id="environment" tabindex="-1">environment <a class="header-anchor" href="#environment" aria-label="Permalink to &quot;environment&quot;">​</a></h3><p>官方文档：<a href="https://www.jenkins.io/doc/pipeline/tour/environment/" target="_blank" rel="noreferrer">https://www.jenkins.io/doc/pipeline/tour/environment/</a></p><p>同 pipeline 里的 environment , 规定了当前 stage 内部的环境变量。</p><p>environment指令指定一个键值对序列，该序列将被定义为所有步骤的环境变量，或者是特定于阶段的步骤，这取决于environment指令在流水线内的位置</p><p>改指令支持一个特殊的方法credentials(),该方法可用于在jenkins环境中通过标识符访问预定义的凭证。对于类型为&quot;Secret Text&quot;的凭证，credentials()将确保指定的环境变量包含密码文本内容。对于类型为“SStandard username and password”的凭证，指定的环境变量指定为，username:password，并且两个额外的环境变量将被自动定义：分别为MYVARNAME_USR和MYVARNAME_PSW</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent {</span></span>
<span class="line"><span style="color:#E1E4E8;">        label </span><span style="color:#9ECBFF;">&#39;!windows&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    environment {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">DISABLE_AUTH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;true&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">DB_ENGINE</span><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;sqlite&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Build&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&quot;Database engine is \${DB_ENGINE}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&quot;DISABLE_AUTH is \${DISABLE_AUTH}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                sh </span><span style="color:#9ECBFF;">&#39;printenv&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent {</span></span>
<span class="line"><span style="color:#24292E;">        label </span><span style="color:#032F62;">&#39;!windows&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    environment {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">DISABLE_AUTH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;true&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">DB_ENGINE</span><span style="color:#24292E;">    </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;sqlite&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Build&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&quot;Database engine is \${DB_ENGINE}&quot;</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&quot;DISABLE_AUTH is \${DISABLE_AUTH}&quot;</span></span>
<span class="line"><span style="color:#24292E;">                sh </span><span style="color:#032F62;">&#39;printenv&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="tools" tabindex="-1">tools <a class="header-anchor" href="#tools" aria-label="Permalink to &quot;tools&quot;">​</a></h3><p>同 pipeline 里的 tools , 规定了当前 stage 内部适用的工具。</p><h3 id="input" tabindex="-1">input <a class="header-anchor" href="#input" aria-label="Permalink to &quot;input&quot;">​</a></h3><p>在 stage 开始执行前，暂停执行stage，等待用户输入信息。并不适用全自动化流水线</p><p>input用户在执行各个阶段的时候，由人工确认是否继续进行</p><p>参数：</p><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>message</td><td>呈现给用户的提示信息</td></tr><tr><td>id</td><td>可选，默认为stage名称</td></tr><tr><td>ok</td><td>默认表单上的ok文本</td></tr><tr><td>submitter</td><td>可选的,以逗号分隔的用户列表或允许提交的外部组名。默认允许任何用户</td></tr><tr><td>submitterParameter</td><td>环境变量的可选名称。如果存在，用<code>submitter</code> 名称设置</td></tr><tr><td>parameters</td><td>交互时用户选择的参数</td></tr></tbody></table><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            input {</span></span>
<span class="line"><span style="color:#E1E4E8;">                message </span><span style="color:#9ECBFF;">&quot;Should we continue?&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                ok </span><span style="color:#9ECBFF;">&quot;Yes, we should.&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                submitter </span><span style="color:#9ECBFF;">&quot;alice,bob&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                parameters {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    string(</span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;PERSON&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">defaultValue</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Mr Jenkins&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Who should I say hello to?&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&quot;Hello, \${PERSON}, nice to meet you.&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any</span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            input {</span></span>
<span class="line"><span style="color:#24292E;">                message </span><span style="color:#032F62;">&quot;Should we continue?&quot;</span></span>
<span class="line"><span style="color:#24292E;">                ok </span><span style="color:#032F62;">&quot;Yes, we should.&quot;</span></span>
<span class="line"><span style="color:#24292E;">                submitter </span><span style="color:#032F62;">&quot;alice,bob&quot;</span></span>
<span class="line"><span style="color:#24292E;">                parameters {</span></span>
<span class="line"><span style="color:#24292E;">                    string(</span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;PERSON&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">defaultValue</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Mr Jenkins&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Who should I say hello to?&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&quot;Hello, \${PERSON}, nice to meet you.&quot;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="when" tabindex="-1">when <a class="header-anchor" href="#when" aria-label="Permalink to &quot;when&quot;">​</a></h3><p><a href="https://jenkins.io/zh/doc/book/pipeline/syntax/#when" target="_blank" rel="noreferrer">when文档</a></p><p>when 指令允许流水线根据给定的条件决定是否应该执行阶段。 when 指令必须包含至少一个条件。 如果<code>when</code> 指令包含多个条件, 所有的子条件必须返回True，阶段才能执行。 这与子条件在 allOf 条件下嵌套的情况相同</p><p>判断条件</p><ul><li>根据环境变量判断</li><li>根据表达式判断</li><li>根据条件判断（not/allOf/anyOf）</li></ul><p>内置条件</p><ul><li><p>branch: 当正在构建的分支与模式给定的分支匹配时，执行这个阶段,这只适用于多分支流水线例如:</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">when { branch </span><span style="color:#9ECBFF;">&#39;master&#39;</span><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">when { branch </span><span style="color:#032F62;">&#39;master&#39;</span><span style="color:#24292E;"> }</span></span></code></pre></div></li><li><p>environment: 当指定的环境变量是给定的值时，执行这个步骤,例如:</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">when { environment </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;DEPLOY_TO&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">when { environment </span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;DEPLOY_TO&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;"> }</span></span></code></pre></div></li><li><p>expression 当指定的Groovy表达式评估为true时，执行这个阶段, 例如:</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">when { expression { </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> params</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">DEBUG_BUILD</span><span style="color:#E1E4E8;"> } }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">when { expression { </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> params</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">DEBUG_BUILD</span><span style="color:#24292E;"> } }</span></span></code></pre></div></li><li><p>not 当嵌套条件是错误时，执行这个阶段,必须包含一个条件，例如:</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">when { not { branch </span><span style="color:#9ECBFF;">&#39;master&#39;</span><span style="color:#E1E4E8;"> } }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">when { not { branch </span><span style="color:#032F62;">&#39;master&#39;</span><span style="color:#24292E;"> } }</span></span></code></pre></div></li><li><p>allOf 当所有的嵌套条件都正确时，执行这个阶段,必须包含至少一个条件，例如:</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">when { allOf { branch </span><span style="color:#9ECBFF;">&#39;master&#39;</span><span style="color:#E1E4E8;">; environment </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;DEPLOY_TO&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;"> } }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">when { allOf { branch </span><span style="color:#032F62;">&#39;master&#39;</span><span style="color:#24292E;">; environment </span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;DEPLOY_TO&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;"> } }</span></span></code></pre></div></li><li><p>anyOf 当至少有一个嵌套条件为真时，执行这个阶段,必须包含至少一个条件，例如:</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">when { anyOf { branch </span><span style="color:#9ECBFF;">&#39;master&#39;</span><span style="color:#E1E4E8;">; branch </span><span style="color:#9ECBFF;">&#39;staging&#39;</span><span style="color:#E1E4E8;"> } }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">when { anyOf { branch </span><span style="color:#032F62;">&#39;master&#39;</span><span style="color:#24292E;">; branch </span><span style="color:#032F62;">&#39;staging&#39;</span><span style="color:#24292E;"> } }</span></span></code></pre></div></li></ul><p>示例：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example Build&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example Deploy&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            options{</span></span>
<span class="line"><span style="color:#E1E4E8;">                timestamps()</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            when {</span></span>
<span class="line"><span style="color:#E1E4E8;">                branch </span><span style="color:#9ECBFF;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Deploying&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example Build&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example Deploy&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            when {</span></span>
<span class="line"><span style="color:#E1E4E8;">                branch </span><span style="color:#9ECBFF;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                environment </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;DEPLOY_TO&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Deploying&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example Build&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example Deploy&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            when {</span></span>
<span class="line"><span style="color:#E1E4E8;">                allOf {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    branch </span><span style="color:#9ECBFF;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    environment </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;DEPLOY_TO&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Deploying&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example Build&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example Deploy&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            when {</span></span>
<span class="line"><span style="color:#E1E4E8;">                branch </span><span style="color:#9ECBFF;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                anyOf {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    environment </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;DEPLOY_TO&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    environment </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;DEPLOY_TO&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;staging&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Deploying&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example Build&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example Deploy&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            when {</span></span>
<span class="line"><span style="color:#E1E4E8;">                expression { </span><span style="color:#79B8FF;">BRANCH_NAME</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==~</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">(production|staging)</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">                anyOf {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    environment </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;DEPLOY_TO&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    environment </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;DEPLOY_TO&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;staging&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Deploying&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent none</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example Build&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example Deploy&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            agent {</span></span>
<span class="line"><span style="color:#E1E4E8;">                label </span><span style="color:#9ECBFF;">&quot;some-label&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            when {</span></span>
<span class="line"><span style="color:#E1E4E8;">                beforeAgent </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">                branch </span><span style="color:#9ECBFF;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Deploying&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any</span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example Build&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example Deploy&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            options{</span></span>
<span class="line"><span style="color:#24292E;">                timestamps()</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            when {</span></span>
<span class="line"><span style="color:#24292E;">                branch </span><span style="color:#032F62;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Deploying&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any</span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example Build&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example Deploy&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            when {</span></span>
<span class="line"><span style="color:#24292E;">                branch </span><span style="color:#032F62;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#24292E;">                environment </span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;DEPLOY_TO&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Deploying&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any</span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example Build&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example Deploy&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            when {</span></span>
<span class="line"><span style="color:#24292E;">                allOf {</span></span>
<span class="line"><span style="color:#24292E;">                    branch </span><span style="color:#032F62;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#24292E;">                    environment </span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;DEPLOY_TO&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Deploying&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any</span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example Build&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example Deploy&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            when {</span></span>
<span class="line"><span style="color:#24292E;">                branch </span><span style="color:#032F62;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#24292E;">                anyOf {</span></span>
<span class="line"><span style="color:#24292E;">                    environment </span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;DEPLOY_TO&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#24292E;">                    environment </span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;DEPLOY_TO&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;staging&#39;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Deploying&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any</span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example Build&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example Deploy&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            when {</span></span>
<span class="line"><span style="color:#24292E;">                expression { </span><span style="color:#005CC5;">BRANCH_NAME</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==~</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/(production|staging)/</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">                anyOf {</span></span>
<span class="line"><span style="color:#24292E;">                    environment </span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;DEPLOY_TO&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#24292E;">                    environment </span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;DEPLOY_TO&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;staging&#39;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Deploying&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent none</span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example Build&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example Deploy&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            agent {</span></span>
<span class="line"><span style="color:#24292E;">                label </span><span style="color:#032F62;">&quot;some-label&quot;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            when {</span></span>
<span class="line"><span style="color:#24292E;">                beforeAgent </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">                branch </span><span style="color:#032F62;">&#39;production&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Deploying&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>条件判断（类似 if），决定所在的 stage 是否继续执行。when 的用法需要分两个维度解释：</p><ul><li>语句维度：</li></ul><p>when 里支持一些内置的判断条件，比如</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">when {</span></span>
<span class="line"><span style="color:#e1e4e8;">  environment name: &#39;DEPLOY_TO&#39;, value: &#39;production&#39; // 判断环境变量</span></span>
<span class="line"><span style="color:#e1e4e8;">  equals expected: 2, actual: currentBuild.number // 判断变量的值</span></span>
<span class="line"><span style="color:#e1e4e8;">  expression { BRANCH_NAME ==~ /(production|staging)/ } //Groovy布尔表达式</span></span>
<span class="line"><span style="color:#e1e4e8;">  triggeredBy &#39;TimerTrigger&#39; // 判断触发原因</span></span>
<span class="line"><span style="color:#e1e4e8;">  branch &#39;master&#39; // 多分支流水线里，判断当前所在的分支</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">when {</span></span>
<span class="line"><span style="color:#24292e;">  environment name: &#39;DEPLOY_TO&#39;, value: &#39;production&#39; // 判断环境变量</span></span>
<span class="line"><span style="color:#24292e;">  equals expected: 2, actual: currentBuild.number // 判断变量的值</span></span>
<span class="line"><span style="color:#24292e;">  expression { BRANCH_NAME ==~ /(production|staging)/ } //Groovy布尔表达式</span></span>
<span class="line"><span style="color:#24292e;">  triggeredBy &#39;TimerTrigger&#39; // 判断触发原因</span></span>
<span class="line"><span style="color:#24292e;">  branch &#39;master&#39; // 多分支流水线里，判断当前所在的分支</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>逻辑维度：</li></ul><p>when 里的条件支持与、或、非等逻辑运算： <code>allOf{}</code>, <code>anyOf{}</code>, <code>not{}</code>. 它们之间可以互相嵌套至任意深度</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">when {</span></span>
<span class="line"><span style="color:#e1e4e8;">  allOf {</span></span>
<span class="line"><span style="color:#e1e4e8;">    branch &#39;production&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    environment name: &#39;DEPLOY_TO&#39;, value: &#39;production&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">when {</span></span>
<span class="line"><span style="color:#24292e;">  allOf {</span></span>
<span class="line"><span style="color:#24292e;">    branch &#39;production&#39;</span></span>
<span class="line"><span style="color:#24292e;">    environment name: &#39;DEPLOY_TO&#39;, value: &#39;production&#39;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>多个条件并列默认是与关系，@allOf{}@ 可以省略，上面的例子等效于</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">when {</span></span>
<span class="line"><span style="color:#e1e4e8;">  branch &#39;production&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  environment name: &#39;DEPLOY_TO&#39;, value: &#39;production&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#比如，来指定某个 Stage 指定与否：比如要配置只有在 Master 分支上才执行 push，其他分支上都只运行 build</span></span>
<span class="line"><span style="color:#e1e4e8;">stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">  stage(&#39;Build&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    when {</span></span>
<span class="line"><span style="color:#e1e4e8;">      not { branch &#39;master&#39; }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">      sh &#39;./scripts/run.py build&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  stage(&#39;Run&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    when {</span></span>
<span class="line"><span style="color:#e1e4e8;">      branch &#39;master&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">      sh &#39;./scripts/run.py push&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">when {</span></span>
<span class="line"><span style="color:#24292e;">  branch &#39;production&#39;</span></span>
<span class="line"><span style="color:#24292e;">  environment name: &#39;DEPLOY_TO&#39;, value: &#39;production&#39;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#比如，来指定某个 Stage 指定与否：比如要配置只有在 Master 分支上才执行 push，其他分支上都只运行 build</span></span>
<span class="line"><span style="color:#24292e;">stages {</span></span>
<span class="line"><span style="color:#24292e;">  stage(&#39;Build&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">    when {</span></span>
<span class="line"><span style="color:#24292e;">      not { branch &#39;master&#39; }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    steps {</span></span>
<span class="line"><span style="color:#24292e;">      sh &#39;./scripts/run.py build&#39;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  stage(&#39;Run&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">    when {</span></span>
<span class="line"><span style="color:#24292e;">      branch &#39;master&#39;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    steps {</span></span>
<span class="line"><span style="color:#24292e;">      sh &#39;./scripts/run.py push&#39;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="steps-1" tabindex="-1">steps <a class="header-anchor" href="#steps-1" aria-label="Permalink to &quot;steps&quot;">​</a></h3><p><a href="https://jenkins.io/zh/doc/book/pipeline/syntax/#steps" target="_blank" rel="noreferrer">steps文档</a></p><h4 id="script" tabindex="-1">script <a class="header-anchor" href="#script" aria-label="Permalink to &quot;script&quot;">​</a></h4><p>声明式<code>pipeline</code>是不能直接在<code>steps</code>块中写<code>Groovy</code>代码。 <code>Jenkins pipeline</code>专门提供了一个<code>script</code>步骤，你能在<code>script</code>步骤中像写代码一样写<code>pipeline</code>逻辑。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">    agent any</span></span>
<span class="line"><span style="color:#e1e4e8;">    stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Build&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                script {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    result = sh (script: &quot;git log -1|grep &#39;Release&#39;&quot;, returnStatus: true) </span></span>
<span class="line"><span style="color:#e1e4e8;">                    echo &quot;result: \${result}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">    agent any</span></span>
<span class="line"><span style="color:#24292e;">    stages {</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Build&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                script {</span></span>
<span class="line"><span style="color:#24292e;">                    result = sh (script: &quot;git log -1|grep &#39;Release&#39;&quot;, returnStatus: true) </span></span>
<span class="line"><span style="color:#24292e;">                    echo &quot;result: \${result}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>script 步骤需要 [scripted-pipeline]块并在声明式流水线中执行。对于大多数用例来说,应该声明式流水线中的“脚本”步骤是不必要的，但是它可以提供一个有用的”逃生出口”。非平凡的规模和/或复杂性的<code>script</code>块应该被转移到 共享库 。</p><p>示例：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Example&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">                script {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> browsers </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;chrome&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;firefox&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> browsers</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">size(); </span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">i) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        echo </span><span style="color:#9ECBFF;">&quot;Testing the \${browsers[i]} browser&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any</span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Example&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;Hello World&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">                script {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> browsers </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;chrome&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;firefox&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> browsers</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">size(); </span><span style="color:#D73A49;">++</span><span style="color:#24292E;">i) {</span></span>
<span class="line"><span style="color:#24292E;">                        echo </span><span style="color:#032F62;">&quot;Testing the \${browsers[i]} browser&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><table><thead><tr><th>命令名</th><th>说明</th></tr></thead><tbody><tr><td>error</td><td>抛出异常，中断整个pipeline</td></tr><tr><td>timeout</td><td>timeout闭包内运行的步骤超时时间</td></tr><tr><td>waitUntil</td><td>一直循环运行闭包内容，直到return true，经常与timeout同时使用</td></tr><tr><td>retry</td><td>闭包内脚本重复执行次数</td></tr><tr><td>sleep</td><td>暂停pipeline一段时间，单位为秒</td></tr></tbody></table><p>真正的执行语句是放在 steps 里的，这里可以包括许多 预先定义好的 step , 这里列出一些常用的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">  echo &#39;debugging&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  sleep 120, unit: &#39;DAYS&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  retry 3</span></span>
<span class="line"><span style="color:#e1e4e8;">  error() //</span></span>
<span class="line"><span style="color:#e1e4e8;">  dir // 指定工作目录</span></span>
<span class="line"><span style="color:#e1e4e8;">  readFile</span></span>
<span class="line"><span style="color:#e1e4e8;">  fileExists</span></span>
<span class="line"><span style="color:#e1e4e8;">  withEnv</span></span>
<span class="line"><span style="color:#e1e4e8;">  script</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">steps {</span></span>
<span class="line"><span style="color:#24292e;">  echo &#39;debugging&#39;</span></span>
<span class="line"><span style="color:#24292e;">  sleep 120, unit: &#39;DAYS&#39;</span></span>
<span class="line"><span style="color:#24292e;">  retry 3</span></span>
<span class="line"><span style="color:#24292e;">  error() //</span></span>
<span class="line"><span style="color:#24292e;">  dir // 指定工作目录</span></span>
<span class="line"><span style="color:#24292e;">  readFile</span></span>
<span class="line"><span style="color:#24292e;">  fileExists</span></span>
<span class="line"><span style="color:#24292e;">  withEnv</span></span>
<span class="line"><span style="color:#24292e;">  script</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>文件目录相关步骤</li></ul><ul><li><p>deleteDir 删除当前目录，它是一个无参步骤，删除的是当前工作目录。通常它与<code>dir</code>步骤一起使用，用于删除指定目录下的内容。</p></li><li><p>dir 切换到目录。默认<code>pipeline</code>工作在工作空间目录下，<code>dir</code>步骤可以让我们切换到其它目录。例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">dir(&quot;/var/logs&quot;) { deleteDir() }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">dir(&quot;/var/logs&quot;) { deleteDir() }</span></span></code></pre></div></li><li><p>fileExists 判断文件是否存在。<code>fileExists(&#39;/tmp/a.jar&#39;)</code>判断<code>/tmp/a.jar</code>文件是否存在。如果参数是相对路径，则判断在相对当前工作目录下，该文件是否存在。结果返回布尔类型。</p></li><li><p>isUnix 判断是否为类<code>Unix</code>系统。如果当前<code>pipeline</code>运行在一个类<code>Unix</code>系统上，则返回<code>true</code>。</p></li><li><p>pwd 确认当前目录。<code>pwd</code>与<code>Linux</code>的<code>pwd</code>命令一样，返回当前所在目录。它有一个布尔类型的可选参数：<code>tmp</code>，如果参数值为<code>true</code>，则返回与当前工作空间关联的临时目录。</p></li><li><p>writeFile 将内容写入指定文件中。</p></li></ul><p><code>writeFile</code>支持的参数有： file：文件路径，可以是绝对路径，也可以是相对路径。 text：要写入的文件内容。 encoding（可选）：目标文件的编码。如果留空，则使用操作系统默认的编码。如果写的是<code>Base64</code>的数据，则可以使用<code>Base64</code>编码。</p><ul><li>readFile：读取指定文件的内容，以文本返回。</li></ul><p><code>readFile</code>支持的参数有： file：路径，可以是绝对路径，也可以是相对路径。 encoding（可选）：读取文件时使用的编码。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">script {</span></span>
<span class="line"><span style="color:#e1e4e8;">    // &quot;amVua2lucyBib29r&quot; 是&quot;jenkins book&quot;进行Base64编码后的值</span></span>
<span class="line"><span style="color:#e1e4e8;">    writeFile(file: &quot;base64File&quot;, text: &quot;amVua2lucyBib29r&quot;, encoding: &quot;Base64&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    def content = readFile(file: &quot;base64File&quot;, encoding: &quot;UTF-8&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    echo &quot;\${content}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 打印结果: jenkins book</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">script {</span></span>
<span class="line"><span style="color:#24292e;">    // &quot;amVua2lucyBib29r&quot; 是&quot;jenkins book&quot;进行Base64编码后的值</span></span>
<span class="line"><span style="color:#24292e;">    writeFile(file: &quot;base64File&quot;, text: &quot;amVua2lucyBib29r&quot;, encoding: &quot;Base64&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    def content = readFile(file: &quot;base64File&quot;, encoding: &quot;UTF-8&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    echo &quot;\${content}&quot;</span></span>
<span class="line"><span style="color:#24292e;">    // 打印结果: jenkins book</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h4 id="waituntil" tabindex="-1">waitUntil <a class="header-anchor" href="#waituntil" aria-label="Permalink to &quot;waitUntil&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline{</span></span>
<span class="line"><span style="color:#e1e4e8;">    agent any</span></span>
<span class="line"><span style="color:#e1e4e8;">    stages{</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;stash&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps{</span></span>
<span class="line"><span style="color:#e1e4e8;">                timeout(50){</span></span>
<span class="line"><span style="color:#e1e4e8;">                    waitUntil{</span></span>
<span class="line"><span style="color:#e1e4e8;">                        script{</span></span>
<span class="line"><span style="color:#e1e4e8;">                            def r = sh script: &#39;curl http://xxx&#39;, returnStatus: true</span></span>
<span class="line"><span style="color:#e1e4e8;">                            return (r == 0)</span></span>
<span class="line"><span style="color:#e1e4e8;">                        }</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                retry(10){</span></span>
<span class="line"><span style="color:#e1e4e8;">                    script{</span></span>
<span class="line"><span style="color:#e1e4e8;">                        sh script: &#39;curl http://xxx&#39;, returnStatus: true</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                sleep(20)</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    post{</span></span>
<span class="line"><span style="color:#e1e4e8;">        always{</span></span>
<span class="line"><span style="color:#e1e4e8;">            echo &quot;结束job&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline{</span></span>
<span class="line"><span style="color:#24292e;">    agent any</span></span>
<span class="line"><span style="color:#24292e;">    stages{</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;stash&#39;){</span></span>
<span class="line"><span style="color:#24292e;">            steps{</span></span>
<span class="line"><span style="color:#24292e;">                timeout(50){</span></span>
<span class="line"><span style="color:#24292e;">                    waitUntil{</span></span>
<span class="line"><span style="color:#24292e;">                        script{</span></span>
<span class="line"><span style="color:#24292e;">                            def r = sh script: &#39;curl http://xxx&#39;, returnStatus: true</span></span>
<span class="line"><span style="color:#24292e;">                            return (r == 0)</span></span>
<span class="line"><span style="color:#24292e;">                        }</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                retry(10){</span></span>
<span class="line"><span style="color:#24292e;">                    script{</span></span>
<span class="line"><span style="color:#24292e;">                        sh script: &#39;curl http://xxx&#39;, returnStatus: true</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                sleep(20)</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    post{</span></span>
<span class="line"><span style="color:#24292e;">        always{</span></span>
<span class="line"><span style="color:#24292e;">            echo &quot;结束job&quot;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="post-1" tabindex="-1">post <a class="header-anchor" href="#post-1" aria-label="Permalink to &quot;post&quot;">​</a></h2><p><a href="https://jenkins.io/zh/doc/book/pipeline/syntax/#post" target="_blank" rel="noreferrer">post文档</a></p><p>post 用于后处理，位于 pipeline 顶级或者 stage 内部。当一定场景满足后，执行条件块内的 steps</p><p>post 支持的 steps 和 <a href="https://www.lfhacks.com/tech/jenkins-declarative-pipeline/#steps" target="_blank" rel="noreferrer">stages 里的 steps</a> 相同。下面是各种常用的场景：</p><table><thead><tr><th>条件</th><th>执行场合</th></tr></thead><tbody><tr><td>always</td><td>总是执行</td></tr><tr><td>success</td><td>前面的 stage 全部成功时执行；如果 post 位于 stage 内部，则是 stage 成功时执行</td></tr><tr><td>failure</td><td>前面的 stage 有失败时执行；如果 post 位于 stage 内部，则是 stage 失败时执行</td></tr><tr><td>changed</td><td>只有当流水线或者阶段完成状态与之前不同时</td></tr><tr><td>unstable</td><td>只有当流水线或者阶段状态为“unstable”运行。列入：测试失败</td></tr><tr><td>aborted</td><td>只有当流水线或者阶段状态为“aborted”运行。列如：手动取消</td></tr></tbody></table><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">Jenkinsfile (Declarative Pipeline)</span></span>
<span class="line"><span style="color:#9ECBFF;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">stage(&#39;Example&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">echo &#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">post {</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">always {</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">echo &#39;I will always say Hello again!&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">Jenkinsfile (Declarative Pipeline)</span></span>
<span class="line"><span style="color:#032F62;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">agent any</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">stages {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">stage(&#39;Example&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">steps {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">echo &#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">post {</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">always {</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">echo &#39;I will always say Hello again!&#39;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="嵌套执行结构" tabindex="-1">嵌套执行结构 <a class="header-anchor" href="#嵌套执行结构" aria-label="Permalink to &quot;嵌套执行结构&quot;">​</a></h2><p>stage 下又可以嵌套 stages，继续向下嵌套多个 stage，呈顺序执行。</p><h2 id="并行执行结构" tabindex="-1">并行执行结构 <a class="header-anchor" href="#并行执行结构" aria-label="Permalink to &quot;并行执行结构&quot;">​</a></h2><p><a href="https://jenkins.io/zh/doc/book/pipeline/syntax/#%E5%B9%B6%E8%A1%8C" target="_blank" rel="noreferrer">parallel文档</a></p><p>声明式流水线的阶段可以在他们内部声明多隔嵌套阶段, 它们将并行执行。 注意，一个阶段必须只有一个 steps 或 <code>parallel</code>的阶段。 嵌套阶段本身不能包含 进一步的 <code>parallel</code> 阶段, 但是其他的阶段的行为与任何其他 stage<code>parallel</code>的阶段不能包含 <code>agent</code> 或 <code>tools</code>阶段, 因为他们没有相关 <code>steps</code>。</p><p>另外, 通过添加 <code>failFast true</code> 到包含<code>parallel</code>的 <code>stage</code>中， 当其中一个进程失败时，你可以强制所有的 <code>parallel</code> 阶段都被终止</p><p>一个 stage 可以声明为多个 stage 的并行执行，只要再加一层 parallel 指令，parallel 内的各个 stage 将并行执行，但是内部不能继续嵌套 parallel。基本结构为：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">  stage(</span><span style="color:#9ECBFF;">&#39;Parallel Stage&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    parallel {</span></span>
<span class="line"><span style="color:#E1E4E8;">      stage(</span><span style="color:#9ECBFF;">&#39;Branch A&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">..</span><span style="color:#E1E4E8;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      stage(</span><span style="color:#9ECBFF;">&#39;Branch B&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">..</span><span style="color:#E1E4E8;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      stage(</span><span style="color:#9ECBFF;">&#39;Branch C&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">..</span><span style="color:#E1E4E8;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">stages {</span></span>
<span class="line"><span style="color:#24292E;">  stage(</span><span style="color:#032F62;">&#39;Parallel Stage&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    parallel {</span></span>
<span class="line"><span style="color:#24292E;">      stage(</span><span style="color:#032F62;">&#39;Branch A&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">..</span><span style="color:#24292E;">.</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      stage(</span><span style="color:#032F62;">&#39;Branch B&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">..</span><span style="color:#24292E;">.</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      stage(</span><span style="color:#032F62;">&#39;Branch C&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">..</span><span style="color:#24292E;">.</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>但是由于 pipeline 文件本身是 Groovy 代码，所以并没有规定在 <code>pipeline {}</code> 以外不允许有 Groovy代码。正相反，额外的辅助代码，可以带来更多更灵活的功能</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent none</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Run Tests&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            failFast </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">            parallel {</span></span>
<span class="line"><span style="color:#E1E4E8;">                stage(</span><span style="color:#9ECBFF;">&#39;Test On Chrome&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    agent { label </span><span style="color:#9ECBFF;">&quot;chrome&quot;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        echo </span><span style="color:#9ECBFF;">&quot;Chrome UI测试&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                stage(</span><span style="color:#9ECBFF;">&quot;Test On Firefox&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    agent { label </span><span style="color:#9ECBFF;">&quot;firefox&quot;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        echo </span><span style="color:#9ECBFF;">&quot;Firefox UI测试&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                stage(</span><span style="color:#9ECBFF;">&quot;Test On IE&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    agent { label </span><span style="color:#9ECBFF;">&quot;ie&quot;</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        echo </span><span style="color:#9ECBFF;">&quot;IE UI测试&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent none</span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Run Tests&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            failFast </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">            parallel {</span></span>
<span class="line"><span style="color:#24292E;">                stage(</span><span style="color:#032F62;">&#39;Test On Chrome&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    agent { label </span><span style="color:#032F62;">&quot;chrome&quot;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">                    steps {</span></span>
<span class="line"><span style="color:#24292E;">                        echo </span><span style="color:#032F62;">&quot;Chrome UI测试&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                stage(</span><span style="color:#032F62;">&quot;Test On Firefox&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    agent { label </span><span style="color:#032F62;">&quot;firefox&quot;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">                    steps {</span></span>
<span class="line"><span style="color:#24292E;">                        echo </span><span style="color:#032F62;">&quot;Firefox UI测试&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                stage(</span><span style="color:#032F62;">&quot;Test On IE&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    agent { label </span><span style="color:#032F62;">&quot;ie&quot;</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">                    steps {</span></span>
<span class="line"><span style="color:#24292E;">                        echo </span><span style="color:#032F62;">&quot;IE UI测试&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>示例:</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Non-Parallel Stage&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;This stage will be executed first.&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Parallel Stage&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            when {</span></span>
<span class="line"><span style="color:#E1E4E8;">                branch </span><span style="color:#9ECBFF;">&#39;master&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            failFast </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">            parallel {</span></span>
<span class="line"><span style="color:#E1E4E8;">                stage(</span><span style="color:#9ECBFF;">&#39;Branch A&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    agent {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        label </span><span style="color:#9ECBFF;">&quot;for-branch-a&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        echo </span><span style="color:#9ECBFF;">&quot;On Branch A&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                stage(</span><span style="color:#9ECBFF;">&#39;Branch B&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    agent {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        label </span><span style="color:#9ECBFF;">&quot;for-branch-b&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        echo </span><span style="color:#9ECBFF;">&quot;On Branch B&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any</span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Non-Parallel Stage&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;This stage will be executed first.&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Parallel Stage&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            when {</span></span>
<span class="line"><span style="color:#24292E;">                branch </span><span style="color:#032F62;">&#39;master&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            failFast </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">            parallel {</span></span>
<span class="line"><span style="color:#24292E;">                stage(</span><span style="color:#032F62;">&#39;Branch A&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    agent {</span></span>
<span class="line"><span style="color:#24292E;">                        label </span><span style="color:#032F62;">&quot;for-branch-a&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                    steps {</span></span>
<span class="line"><span style="color:#24292E;">                        echo </span><span style="color:#032F62;">&quot;On Branch A&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                stage(</span><span style="color:#032F62;">&#39;Branch B&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    agent {</span></span>
<span class="line"><span style="color:#24292E;">                        label </span><span style="color:#032F62;">&quot;for-branch-b&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                    steps {</span></span>
<span class="line"><span style="color:#24292E;">                        echo </span><span style="color:#032F62;">&quot;On Branch B&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_3-编写规范" tabindex="-1">3.编写规范 <a class="header-anchor" href="#_3-编写规范" aria-label="Permalink to &quot;3.编写规范&quot;">​</a></h1><h1 id="_4-判断语句" tabindex="-1">4.判断语句 <a class="header-anchor" href="#_4-判断语句" aria-label="Permalink to &quot;4.判断语句&quot;">​</a></h1><h2 id="_4-1if" tabindex="-1">4.1if <a class="header-anchor" href="#_4-1if" aria-label="Permalink to &quot;4.1if&quot;">​</a></h2><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any    </span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;flow control&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                script {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ( </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;pass&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;failed&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#案例</span></span>
<span class="line"><span style="color:#E1E4E8;">stage(</span><span style="color:#9ECBFF;">&#39;deploy service&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">        sshagent(</span><span style="color:#79B8FF;">credentials</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&#39;online-mq&#39;</span><span style="color:#E1E4E8;">]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">//sh &quot;ssh -o StrictHostKeyChecking=no \${HOST_TEST} uname -a&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">//--exclude=appsettings.json</span></span>
<span class="line"><span style="color:#E1E4E8;">          sh </span><span style="color:#9ECBFF;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">			if [ &quot;\${HOST_TEST}&quot; == &quot;172&quot; ];then</span></span>
<span class="line"><span style="color:#9ECBFF;">			    echo &quot;\${HOST_TEST} is not &quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">				rsync -avzP --exclude=appsettings.json \${SOURCE_DIR_taskWeb}/* \${HOST_TEST}:\${TARGET_DIR_taskWeb}</span></span>
<span class="line"><span style="color:#9ECBFF;">            elif [ &quot;\${HOST_TEST}&quot; == &quot;172&quot; ];then</span></span>
<span class="line"><span style="color:#9ECBFF;">				echo &quot;\${HOST_TEST} is not &quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">                rsync -avzP --exclude=appsettings.json \${SOURCE_DIR_taskWeb}/* \${HOST_TEST}:\${TARGET_DIR_taskWeb}</span></span>
<span class="line"><span style="color:#9ECBFF;">            else</span></span>
<span class="line"><span style="color:#9ECBFF;">				echo &quot;\${HOST_TEST} is not &quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">				exit 0</span></span>
<span class="line"><span style="color:#9ECBFF;">			fi</span></span>
<span class="line"><span style="color:#9ECBFF;">          &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any    </span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;flow control&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                script {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ( </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#005CC5;">println</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;pass&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#005CC5;">println</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;failed&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#案例</span></span>
<span class="line"><span style="color:#24292E;">stage(</span><span style="color:#032F62;">&#39;deploy service&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      steps {</span></span>
<span class="line"><span style="color:#24292E;">        sshagent(</span><span style="color:#005CC5;">credentials</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&#39;online-mq&#39;</span><span style="color:#24292E;">]) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">//sh &quot;ssh -o StrictHostKeyChecking=no \${HOST_TEST} uname -a&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">//--exclude=appsettings.json</span></span>
<span class="line"><span style="color:#24292E;">          sh </span><span style="color:#032F62;">&#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#032F62;">			if [ &quot;\${HOST_TEST}&quot; == &quot;172&quot; ];then</span></span>
<span class="line"><span style="color:#032F62;">			    echo &quot;\${HOST_TEST} is not &quot;</span></span>
<span class="line"><span style="color:#032F62;">				rsync -avzP --exclude=appsettings.json \${SOURCE_DIR_taskWeb}/* \${HOST_TEST}:\${TARGET_DIR_taskWeb}</span></span>
<span class="line"><span style="color:#032F62;">            elif [ &quot;\${HOST_TEST}&quot; == &quot;172&quot; ];then</span></span>
<span class="line"><span style="color:#032F62;">				echo &quot;\${HOST_TEST} is not &quot;</span></span>
<span class="line"><span style="color:#032F62;">                rsync -avzP --exclude=appsettings.json \${SOURCE_DIR_taskWeb}/* \${HOST_TEST}:\${TARGET_DIR_taskWeb}</span></span>
<span class="line"><span style="color:#032F62;">            else</span></span>
<span class="line"><span style="color:#032F62;">				echo &quot;\${HOST_TEST} is not &quot;</span></span>
<span class="line"><span style="color:#032F62;">				exit 0</span></span>
<span class="line"><span style="color:#032F62;">			fi</span></span>
<span class="line"><span style="color:#032F62;">          &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><h2 id="_4-2-case" tabindex="-1">4.2 case <a class="header-anchor" href="#_4-2-case" aria-label="Permalink to &quot;4.2 case&quot;">​</a></h2><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any    </span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&#39;Case lab&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                echo </span><span style="color:#9ECBFF;">&#39;This stage will be executed first.&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                script{</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$contraller</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Job1&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;This is Job1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Job2&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;This is Job2&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Job3&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;This is Job3&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                        echo </span><span style="color:#9ECBFF;">&quot;############ wrong Job name ############&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any    </span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&#39;Case lab&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                echo </span><span style="color:#032F62;">&#39;This stage will be executed first.&#39;</span></span>
<span class="line"><span style="color:#24292E;">                script{</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">switch</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$contraller</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Job1&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#005CC5;">println</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;This is Job1&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Job2&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#005CC5;">println</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;This is Job2&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Job3&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#005CC5;">println</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;This is Job3&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">default</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                        echo </span><span style="color:#032F62;">&quot;############ wrong Job name ############&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_5-变量" tabindex="-1">5.变量 <a class="header-anchor" href="#_5-变量" aria-label="Permalink to &quot;5.变量&quot;">​</a></h1><p>Jenkins Pipeline通过全局变量公开环境变量</p><h2 id="_1-自定义变量-局部" tabindex="-1">1.自定义变量（局部） <a class="header-anchor" href="#_1-自定义变量-局部" aria-label="Permalink to &quot;1.自定义变量（局部）&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">def username = &#39;jenkins&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;hello Mr.\${username}&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">def username = &#39;jenkins&#39;</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;hello Mr.\${username}&quot;</span></span></code></pre></div><h2 id="_2-环境变量" tabindex="-1">2.环境变量 <a class="header-anchor" href="#_2-环境变量" aria-label="Permalink to &quot;2.环境变量&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">withEnv([&#39;JAVA_HOME=/data/jdk&#39;]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">　　sh &#39;$JAVA_HOME/bin/start.sh&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">withEnv([&#39;JAVA_HOME=/data/jdk&#39;]) {</span></span>
<span class="line"><span style="color:#24292e;">　　sh &#39;$JAVA_HOME/bin/start.sh&#39;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_3-环境变量-全局" tabindex="-1">3.环境变量（全局） <a class="header-anchor" href="#_3-环境变量-全局" aria-label="Permalink to &quot;3.环境变量（全局）&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">environment {</span></span>
<span class="line"><span style="color:#e1e4e8;">        JAVA_HOME=&#39;/data/jdk&#39;        </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot; java path $JAVA_HOME&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">environment {</span></span>
<span class="line"><span style="color:#24292e;">        JAVA_HOME=&#39;/data/jdk&#39;        </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot; java path $JAVA_HOME&quot;</span></span></code></pre></div><h2 id="_4-参数化构建-全局" tabindex="-1">4.参数化构建（全局） <a class="header-anchor" href="#_4-参数化构建-全局" aria-label="Permalink to &quot;4.参数化构建（全局）&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">parameters  {</span></span>
<span class="line"><span style="color:#e1e4e8;">        string(name: &#39;GIT_BRANCH&#39;, defaultValue: &#39;master&#39;, description: &#39;default build branch&#39;)  </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">调用：</span></span>
<span class="line"><span style="color:#e1e4e8;"> echo  &quot;\${params.name}&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">parameters  {</span></span>
<span class="line"><span style="color:#24292e;">        string(name: &#39;GIT_BRANCH&#39;, defaultValue: &#39;master&#39;, description: &#39;default build branch&#39;)  </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">调用：</span></span>
<span class="line"><span style="color:#24292e;"> echo  &quot;\${params.name}&quot;</span></span></code></pre></div><h1 id="_6-faq" tabindex="-1">6.FAQ <a class="header-anchor" href="#_6-faq" aria-label="Permalink to &quot;6.FAQ&quot;">​</a></h1><p><strong>没有找到相关的环境变量， 这个是我们在parameters中引用了流水线中的变量导致的，可能因为加载顺序不同导致的，解决方法是可以在pipeline{} 外部定义变量进行引用</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">roovy.lang.MissingPropertyException: No such property: DEPLOY_DESC for class: groovy.lang.Binding</span></span>
<span class="line"><span style="color:#e1e4e8;">	at groovy.lang.Binding.getVariable(Binding.java:63)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">roovy.lang.MissingPropertyException: No such property: DEPLOY_DESC for class: groovy.lang.Binding</span></span>
<span class="line"><span style="color:#24292e;">	at groovy.lang.Binding.getVariable(Binding.java:63)</span></span></code></pre></div>`,229),o=[e];function t(c,r,i,E,y,d){return n(),a("div",null,o)}const g=s(p,[["render",t]]);export{h as __pageData,g as default};
