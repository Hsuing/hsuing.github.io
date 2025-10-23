import{_ as s,o as a,c as n,R as l}from"./chunks/framework.zUbWieqp.js";const v=JSON.parse('{"title":"1. variable","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/Terraform/9-variable.md","filePath":"guide/go/Terraform/9-variable.md","lastUpdated":1753861882000}'),e={name:"guide/go/Terraform/9-variable.md"},o=l(`<h1 id="_1-variable" tabindex="-1">1. <a href="https://developer.hashicorp.com/terraform/tutorials/configuration-language/variables" target="_blank" rel="noreferrer">variable</a> <a class="header-anchor" href="#_1-variable" aria-label="Permalink to &quot;1. [variable](https://developer.hashicorp.com/terraform/tutorials/configuration-language/variables)&quot;">​</a></h1><p><a href="https://developer.hashicorp.com/terraform/language/values/variables" target="_blank" rel="noreferrer">https://developer.hashicorp.com/terraform/language/values/variables</a></p><h2 id="_1-1-使用说明✅" tabindex="-1">1.1 使用说明✅ <a class="header-anchor" href="#_1-1-使用说明✅" aria-label="Permalink to &quot;1.1 使用说明✅&quot;">​</a></h2><p>​ 输入变量允许我们自定义Terraform模块的各个方面，而无需更改模块自己的源代码。此功能允许我们跨不同的Terraform配置共享模块，使我们的模块可组合和可重用。</p><p>​ 当我们在配置的根模块中声明变量时，我们可以使用CLI选项和环境变量设置它们的值。当我们在子模块中声明它们时，调用的模块应该在模块中传递值。</p><p>vim variables.tf</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">variable &quot;aws_region&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">description = &quot;AWS region&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">type        = string</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">default     = &quot;us-west-2&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">variable &quot;aws_region&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">description = &quot;AWS region&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">type        = string</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">default     = &quot;us-west-2&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>在<code>variables.tf</code>文件中定义变量；</li><li>在同一个模块的所有变量中必须是唯一的；</li><li>可以从环境变量或者文本文件中读取；</li><li><code>Terraform</code>默认读取<code>terraform.tfvars</code>;</li></ul><h3 id="variable-可选参数-变量块有三个可选参数-加粗-。" tabindex="-1"><code>Variable</code> 可选参数 ，变量块有三个可选参数(加粗)。 <a class="header-anchor" href="#variable-可选参数-变量块有三个可选参数-加粗-。" aria-label="Permalink to &quot;\`Variable\` 可选参数 ，变量块有三个可选参数(加粗)。&quot;">​</a></h3><ul><li><code>default</code> <strong>变量的默认值</strong></li><li><code>type</code> <strong>变量的类型</strong></li><li><code>description</code> <strong>变量的描述信息</strong></li><li><code>validation</code> 定义变量验证规则</li><li><code>sensitive</code> 限制变量在UI中显示</li><li><code>nullable</code> 变量是否可为空</li></ul><h3 id="variable-参数类型" tabindex="-1"><code>Variable</code> 参数类型 <a class="header-anchor" href="#variable-参数类型" aria-label="Permalink to &quot;\`Variable\` 参数类型&quot;">​</a></h3><ul><li>any</li><li>string</li><li>number</li><li>bool</li><li>list()</li><li>set()</li><li>map()</li><li>object([ATTR_NAME = ATTR_TYPE, ...)</li><li>tuple([, ...])</li></ul><h4 id="map" tabindex="-1">map <a class="header-anchor" href="#map" aria-label="Permalink to &quot;map&quot;">​</a></h4><ul><li>变量读取优先级</li></ul><blockquote><ul><li>Environment variables</li><li>The <code>terraform.tfvars</code> file, if present.</li><li>The <code>terraform.tfvars.json</code> file, if present.</li><li>Any <code>*.auto.tfvars</code> or <code>*.auto.tfvars.json</code> files, processed in lexical order of their filenames.</li><li>Any <code>-var</code> and <code>-var-file</code> options on the command line, in the order they are provided. (This includes variables set by an HCP Terraform workspace.)</li></ul></blockquote><h2 id="_1-2-variable-block-常用写法✅" tabindex="-1">1.2 variable block 常用写法✅ <a class="header-anchor" href="#_1-2-variable-block-常用写法✅" aria-label="Permalink to &quot;1.2 variable block 常用写法✅&quot;">​</a></h2><p>vim variables.tf</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">variable &quot;region&quot; {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">variable region {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">type = string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">variable region {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">default = &quot;cn-beijing&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">//推荐这个方式</span></span>
<span class="line"><span style="color:#9ECBFF;">variable &quot;region&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">type = string</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">default = &quot;cn-beijing&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">description = &quot;The name of the ECS zone&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">variable &quot;region&quot; {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">variable region {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">type = string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">variable region {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">default = &quot;cn-beijing&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">//推荐这个方式</span></span>
<span class="line"><span style="color:#032F62;">variable &quot;region&quot; {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">type = string</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">default = &quot;cn-beijing&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">description = &quot;The name of the ECS zone&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_1-3-定义变量✅" tabindex="-1">1.3 定义变量✅ <a class="header-anchor" href="#_1-3-定义变量✅" aria-label="Permalink to &quot;1.3 定义变量✅&quot;">​</a></h2><p>变量允许自定义 <code>Terraform</code> 模块，而无需更改模块自己的源代码。这可以实现跨不同的 <code>Terraform</code> 配置共享模块，使模缺可组合和可重用。</p><p>vim variables.tf</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">variable &quot;region&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">description = &quot;custom region&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">type = string</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">default = &quot;cn-shanghai&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">variable &quot;ak&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">description = &quot;alicloud access key&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">type = string</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">sensitive = false</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">variable &quot;sk&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">description = &quot;alicloud secret key&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">type = string</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">sensitive = false</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">variable &quot;region&quot; {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">description = &quot;custom region&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">type = string</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">default = &quot;cn-shanghai&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">variable &quot;ak&quot; {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">description = &quot;alicloud access key&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">type = string</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">sensitive = false</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">variable &quot;sk&quot; {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">description = &quot;alicloud secret key&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">type = string</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">sensitive = false</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_1-4-使用变量-传参-✅" tabindex="-1">1.4 使用变量(传参)✅ <a class="header-anchor" href="#_1-4-使用变量-传参-✅" aria-label="Permalink to &quot;1.4 使用变量(传参)✅&quot;">​</a></h2><p>vim terraform.tfvars</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#引用变量</span></span>
<span class="line"><span style="color:#9ECBFF;">region  = &quot;cn-shanghai&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">ak      = &quot;xxx&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">sk      = &quot;xxx&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#引用变量</span></span>
<span class="line"><span style="color:#032F62;">region  = &quot;cn-shanghai&quot;</span></span>
<span class="line"><span style="color:#032F62;">ak      = &quot;xxx&quot;</span></span>
<span class="line"><span style="color:#032F62;">sk      = &quot;xxx&quot;</span></span></code></pre></div><p><code>使用var.变量名字，来调用该值</code></p><p>比如：</p><p>vim provider.tf</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#定义云厂商</span></span>
<span class="line"><span style="color:#9ECBFF;">provider &quot;alicloud&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">region     = var.region</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">access_key = var.ak</span><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">#修改成自己的ak</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">secret_key = var.sk</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#修改成自己的sk</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#定义云厂商</span></span>
<span class="line"><span style="color:#032F62;">provider &quot;alicloud&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">region     = var.region</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">access_key = var.ak</span><span style="color:#24292E;">   </span><span style="color:#6A737D;">#修改成自己的ak</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">secret_key = var.sk</span><span style="color:#24292E;">  </span><span style="color:#6A737D;">#修改成自己的sk</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>Terraform加载变量值的顺序：</strong></p><p>1.环境变量</p><p>2.terraform.tfvars 文件，在同一级别创建，否则识别不了</p><p>3.terraform.tfvars.json文件。</p><p>4.所有的.auto.tfvars或者.auto.tfvars.json文件，以字母顺序排序处理。</p><p>5.通过-var或是-var-file命令行参数传递的输入变量，按照在命令行参数中定义的顺序加载。</p><div class="warning custom-block"><p class="custom-block-title">💡 说明</p><ul><li><p>variables.tf通常与terraform.tfvars文件连用，程序会读取同目录下terraform.tfvars文件中的变量，当terraform.tfvars文件中有对应变量，则使用对应变量定义的值作为实参输入。若无对应变量，则在terraformapply时以交互的方式要求手动输入值。</p></li><li><p>terraform.tfvars文件名及扩展名为固定，不可更改为其他如terraform2.tfvars等，否则程序认不到。</p></li></ul></div>`,36),p=[o];function t(r,c,i,d,y,u){return a(),n("div",null,p)}const h=s(e,[["render",t]]);export{v as __pageData,h as default};
