import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1. 什么是HCL语言✅","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/Terraform/5-hcl.md","filePath":"guide/go/Terraform/5-hcl.md","lastUpdated":1753370025000}'),p={name:"guide/go/Terraform/5-hcl.md"},o=l(`<h1 id="_1-什么是hcl语言✅" tabindex="-1">1. 什么是HCL语言✅ <a class="header-anchor" href="#_1-什么是hcl语言✅" aria-label="Permalink to &quot;1. 什么是HCL语言✅&quot;">​</a></h1><p>HCL（HashiCorp Configuration Language）是一种专门为构建结构化配置格式而设计的语法和API。 他由HashiCorp公司设计。</p><ul><li>HCL是一个用于创建结构化配置语言的工具包，主要针对DevOps工具、服务器等。</li><li>HCL既有一种原生语法，旨在让人类愉快地阅读和编写，也有一种基于json的变体，更容易让机器生成和解析。</li><li>HCL包含一个表达式语法，允许基本的内联计算，并且在调用应用程序的支持下，可以使用变量和函数来进行更动态的配置语言。</li></ul><h1 id="_2-terraform语言✅" tabindex="-1">2. Terraform语言✅ <a class="header-anchor" href="#_2-terraform语言✅" aria-label="Permalink to &quot;2. Terraform语言✅&quot;">​</a></h1><p>Terraform语言的主要目的是<strong>声明资源</strong>，这些资源表示基础设施对象。所有其他语言特性的存在只是为了使资源的定义<strong>更加灵活和方便</strong>。</p><p>Terraform配置是一个用Terraform语言编写的完整文档，它告诉Terraform如何管理给定的基础设施集合。</p><p>一个配置可以由多个文件和目录组成。</p><h2 id="_2-1-语法" tabindex="-1">2.1 语法 <a class="header-anchor" href="#_2-1-语法" aria-label="Permalink to &quot;2.1 语法&quot;">​</a></h2><p><a href="https://developer.hashicorp.com/terraform/language/syntax" target="_blank" rel="noreferrer">https://developer.hashicorp.com/terraform/language/syntax</a></p><h4 id="配置语法" tabindex="-1">配置语法 <a class="header-anchor" href="#配置语法" aria-label="Permalink to &quot;配置语法&quot;">​</a></h4><ul><li><code>Terraform</code> 的配置文件都是以 <code>.tf</code> 为后缀</li><li><code>Terraform</code> 支持两种模式 <code>HCL、JSON</code></li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&lt;BLOCK TYPE&gt; &quot;&lt;BLOCK LABEL&gt;&quot; &quot;&lt;BLOCK LABEL&gt;&quot; &quot;...&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Block body</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&lt;IDENTIFIER&gt; = &lt;EXPRESSION&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># Argument</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">或称</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">&lt;block type&gt; &quot;&lt;RESOURCE TYPE&gt;&quot; &quot;&lt;LOCAL NAME/LABEL&gt;&quot;{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Block body</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&lt;IDENTIFIER&gt; = &lt;EXPRESSION&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># Argument</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">块类型 &quot;块标签1/资源类型&quot; &quot;块标签2/本地名称/本地标签&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 块主体</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">参数 = 表达式</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">参数 = 表达式</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&lt;BLOCK TYPE&gt; &quot;&lt;BLOCK LABEL&gt;&quot; &quot;&lt;BLOCK LABEL&gt;&quot; &quot;...&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Block body</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&lt;IDENTIFIER&gt; = &lt;EXPRESSION&gt;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># Argument</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">或称</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">&lt;block type&gt; &quot;&lt;RESOURCE TYPE&gt;&quot; &quot;&lt;LOCAL NAME/LABEL&gt;&quot;{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Block body</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&lt;IDENTIFIER&gt; = &lt;EXPRESSION&gt;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># Argument</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">块类型 &quot;块标签1/资源类型&quot; &quot;块标签2/本地名称/本地标签&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 块主体</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">参数 = 表达式</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">参数 = 表达式</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>block（块）<strong>是其他内容的容器，通常表示某种对象的配置，如</strong>resource</strong>。block具有块类型，可以有<strong>零</strong>个或<strong>多个</strong>标签，并且具有包含<strong>任意数量</strong>的<strong>参数</strong>和嵌套块的<strong>主体</strong>。Terraform的大部分功能都由配置文件中的顶级块控制。</p><p>官方案例</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">terraform {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">required_providers {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">aws = {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">source  = &quot;hashicorp/aws&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">version = &quot;~&gt; 1.0.4&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">variable &quot;aws_region&quot; {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">variable &quot;base_cidr_block&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">description = &quot;A /16 CIDR range definition, such as 10.1.0.0/16, that the VPC will use&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">default = &quot;10.1.0.0/16&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">variable &quot;availability_zones&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">description = &quot;A list of availability zones in which to create subnets&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">type = list(string)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">provider &quot;aws&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">region = var.aws_region</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">resource &quot;aws_vpc&quot; &quot;main&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Referencing the base_cidr_block variable allows the network address</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># to be changed without modifying the configuration.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">cidr_block = var.base_cidr_block</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">resource &quot;aws_subnet&quot; &quot;az&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Create one subnet for each given availability zone.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">count = length(var.availability_zones)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># For each subnet, use one of the specified availability zones.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">availability_zone = var.availability_zones[count.index]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># By referencing the aws_vpc.main object, Terraform knows that the subnet</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># must be created only after the VPC is created.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">vpc_id = aws_vpc.main.id</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Built-in functions and operators can be used for simple transformations of</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># values, such as computing a subnet address. Here we create a /20 prefix for</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># each subnet, using consecutive addresses for each availability zone,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># such as 10.1.16.0/20 .</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">cidr_block = cidrsubnet(aws_vpc.main.cidr_block, 4, count.index+1)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">terraform {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">required_providers {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">aws = {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">source  = &quot;hashicorp/aws&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">version = &quot;~&gt; 1.0.4&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">variable &quot;aws_region&quot; {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">variable &quot;base_cidr_block&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">description = &quot;A /16 CIDR range definition, such as 10.1.0.0/16, that the VPC will use&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">default = &quot;10.1.0.0/16&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">variable &quot;availability_zones&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">description = &quot;A list of availability zones in which to create subnets&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">type = list(string)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">provider &quot;aws&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">region = var.aws_region</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">resource &quot;aws_vpc&quot; &quot;main&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Referencing the base_cidr_block variable allows the network address</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># to be changed without modifying the configuration.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">cidr_block = var.base_cidr_block</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">resource &quot;aws_subnet&quot; &quot;az&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Create one subnet for each given availability zone.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">count = length(var.availability_zones)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># For each subnet, use one of the specified availability zones.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">availability_zone = var.availability_zones[count.index]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># By referencing the aws_vpc.main object, Terraform knows that the subnet</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># must be created only after the VPC is created.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">vpc_id = aws_vpc.main.id</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Built-in functions and operators can be used for simple transformations of</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># values, such as computing a subnet address. Here we create a /20 prefix for</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># each subnet, using consecutive addresses for each availability zone,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># such as 10.1.16.0/20 .</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">cidr_block = cidrsubnet(aws_vpc.main.cidr_block, 4, count.index+1)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,15),e=[o];function t(c,r,i,E,y,u){return n(),a("div",null,e)}const g=s(p,[["render",t]]);export{h as __pageData,g as default};
