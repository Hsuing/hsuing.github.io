import{_ as s,o as a,c as n,R as l}from"./chunks/framework.zUbWieqp.js";const F=JSON.parse('{"title":"1. 什么是provider插件？✅","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/Terraform/6-provider.md","filePath":"guide/go/Terraform/6-provider.md","lastUpdated":1753370025000}'),p={name:"guide/go/Terraform/6-provider.md"},o=l(`<p><a href="https://registry.terraform.io/browse/providers?product_intent=terraform" target="_blank" rel="noreferrer">各云厂商提供的插件</a></p><h1 id="_1-什么是provider插件-✅" tabindex="-1">1. 什么是provider<a href="https://registry.terraform.io/browse/providers" target="_blank" rel="noreferrer">插件</a>？✅ <a class="header-anchor" href="#_1-什么是provider插件-✅" aria-label="Permalink to &quot;1. 什么是provider[插件](https://registry.terraform.io/browse/providers)？✅&quot;">​</a></h1><p>Terraform 是一个多云基础设施编排工具，是通过Provider来支持云基础架构。而Provider的本质是上游云厂商的API的逻辑抽象，他们负责理解API交互并暴露资源。</p><p>我们可以将Provider理解为各个云厂商提供的与云资源交互的后端驱动，不同的基础设施提供商都需要提供一个Provider来实现对自家基础设施的统一管理。</p><p>Terraform实现多云编排的方法就是Provider插件机制。</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250710132739600.png" alt="Terraform通过RPC调用插件，插件代码通过调用SDK操作远程资源"></p><p>Terraform 使用的是 HashiCorp 自研的 <a href="https://github.com/hashicorp/go-plugin" target="_blank" rel="noreferrer"><code>go-plugin</code> 库</a>，本质上各个 Provider 插件都是独立的进程，与 Terraform 进程之间通过 Rpc 进行调用。Terraform 引擎首先读取并分析用户编写的 Terraform 代码，形成一个由 <code>data</code> 与 <code>resource</code> 组成的图(Graph)，再通过 Rpc 调用这些 <code>data</code> 与 <code>resource</code> 所对应的 Provider 插件；Provider 插件的编写者根据 Terraform 所制定的插件框架来定义各种 <code>data</code> 和 <code>resource</code>，并实现相应的 CRUD 方法；在实现这些 CRUD 方法时，可以调用目标平台提供的 SDK，或是直接通过调用 Http(s) API来操作目标平台。</p><h2 id="_1-1-provider的四种类型✅" tabindex="-1">1.1 provider的四种类型✅ <a class="header-anchor" href="#_1-1-provider的四种类型✅" aria-label="Permalink to &quot;1.1 provider的四种类型✅&quot;">​</a></h2><ol><li><code>Official</code>：官方</li><li><code>Partner</code>：合作伙伴</li><li><code>Community</code>：社区</li><li><code>Archived</code>：归档</li></ol><table><thead><tr><th>类型</th><th>说明</th><th>维护者</th></tr></thead><tbody><tr><td>Official</td><td>官方供应商由HashiCorp拥有和维护</td><td>hashicorp</td></tr><tr><td>Partner</td><td>合作伙伴提供商由第三方公司根据自己的API编写、维护、验证和发布。</td><td>第三方组织，例如mongodb/mongodbatlas公司</td></tr><tr><td>Community</td><td>社区提供者由个人维护者、维护者组或Terraform社区的其他成员发布到Terraform注册中心。</td><td>维护者的个人或组织帐户，如DeviaVir/gsuite</td></tr><tr><td>Archived</td><td>存档的提供者是不再由HashiCorp或社区维护的官方或合作伙伴提供者。如果API被弃用或兴趣较低，则可能会发生这种情况。</td><td>hashicorp 或第三方</td></tr></tbody></table><p><code>Terraform</code> 通过 <code>provider</code> 管理基础设施，使用 <code>provider</code> 与云供应商 <code>API</code> 进行交互，每个 <code>Provider</code> 都包含相关的资源和数据源。</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250709175042973.png" alt="image-20250709175040219"></p><h2 id="_1-2-provider配置方式" tabindex="-1">1.2 provider配置方式 <a class="header-anchor" href="#_1-2-provider配置方式" aria-label="Permalink to &quot;1.2 provider配置方式&quot;">​</a></h2><blockquote><p>配置provider的访问方式，不同云厂商的配置方式有所不同，请参考各云厂商的provider文档。</p></blockquote><ul><li>查看provider下载地址</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">terraform</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">providers</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">Providers</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">required</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">by</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">configuration:</span></span>
<span class="line"><span style="color:#79B8FF;">.</span></span>
<span class="line"><span style="color:#B392F0;">└──</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">provider[registry.terraform.io/aliyun/alicloud]</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.253</span><span style="color:#9ECBFF;">.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">terraform</span><span style="color:#24292E;"> </span><span style="color:#032F62;">providers</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">Providers</span><span style="color:#24292E;"> </span><span style="color:#032F62;">required</span><span style="color:#24292E;"> </span><span style="color:#032F62;">by</span><span style="color:#24292E;"> </span><span style="color:#032F62;">configuration:</span></span>
<span class="line"><span style="color:#005CC5;">.</span></span>
<span class="line"><span style="color:#6F42C1;">└──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">provider[registry.terraform.io/aliyun/alicloud]</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.253</span><span style="color:#032F62;">.0</span></span></code></pre></div><h3 id="单provider方式✅" tabindex="-1">单provider方式✅ <a class="header-anchor" href="#单provider方式✅" aria-label="Permalink to &quot;单provider方式✅&quot;">​</a></h3><p><a href="https://registry.terraform.io/providers/aliyun/alicloud/latest/docs" target="_blank" rel="noreferrer">比如阿里云</a></p><p>vim provider.tf</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 定义provider</span></span>
<span class="line"><span style="color:#9ECBFF;">terraform {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">required_providers {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">alicloud = {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">source = &quot;aliyun/alicloud&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">version = &quot;1.253.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置provider</span></span>
<span class="line"><span style="color:#9ECBFF;">provider &quot;alicloud&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Configuration options</span></span>
<span class="line"><span style="color:#9ECBFF;">access_key = &quot;LTAIxxxxxxxxxxxxxxxxx&quot;</span><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">#修改成自己的ak</span></span>
<span class="line"><span style="color:#9ECBFF;">secret_key = &quot;hmbkxxxxxxxxxxxxxxxxxxxxxxxxx&quot;</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#修改成自己的sk</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">region     = &quot;cn-shanghai&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 定义provider</span></span>
<span class="line"><span style="color:#032F62;">terraform {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">required_providers {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">alicloud = {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">source = &quot;aliyun/alicloud&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">version = &quot;1.253.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置provider</span></span>
<span class="line"><span style="color:#032F62;">provider &quot;alicloud&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Configuration options</span></span>
<span class="line"><span style="color:#032F62;">access_key = &quot;LTAIxxxxxxxxxxxxxxxxx&quot;</span><span style="color:#24292E;">   </span><span style="color:#6A737D;">#修改成自己的ak</span></span>
<span class="line"><span style="color:#032F62;">secret_key = &quot;hmbkxxxxxxxxxxxxxxxxxxxxxxxxx&quot;</span><span style="color:#24292E;">  </span><span style="color:#6A737D;">#修改成自己的sk</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">region     = &quot;cn-shanghai&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="多provider方式✅" tabindex="-1">多provider方式✅ <a class="header-anchor" href="#多provider方式✅" aria-label="Permalink to &quot;多provider方式✅&quot;">​</a></h3><p>vim provider.tf</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">terraform {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 定义terraform版本</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">required_version = &quot;&gt;= v0.15.4&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;"># 定义provider</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">required_providers {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">aws = {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">source  = &quot;hashicorp/aws&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">version = &quot;&gt;= 3.28&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">alicloud = {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">source = &quot;aliyun/alicloud&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">version = &quot;&gt;=1.192.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">terraform {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 定义terraform版本</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">required_version = &quot;&gt;= v0.15.4&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;"># 定义provider</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">required_providers {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">aws = {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">source  = &quot;hashicorp/aws&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">version = &quot;&gt;= 3.28&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">alicloud = {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">source = &quot;aliyun/alicloud&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">version = &quot;&gt;=1.192.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="provider文件两种表示方式✅" tabindex="-1">provider文件两种表示方式✅ <a class="header-anchor" href="#provider文件两种表示方式✅" aria-label="Permalink to &quot;provider文件两种表示方式✅&quot;">​</a></h3><h4 id="合并设置" tabindex="-1"><strong>合并设置</strong> <a class="header-anchor" href="#合并设置" aria-label="Permalink to &quot;**合并设置**&quot;">​</a></h4><p>将定义provider和配置provider写在同一个文件provider.tf文件中。</p><p>vim provider.tf</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 定义provider</span></span>
<span class="line"><span style="color:#9ECBFF;">terraform {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">required_providers {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">alicloud = {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">source = &quot;aliyun/alicloud&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">version = &quot;1.253.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置provider</span></span>
<span class="line"><span style="color:#9ECBFF;">provider &quot;alicloud&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Configuration options</span></span>
<span class="line"><span style="color:#9ECBFF;">access_key = &quot;LTAIxxxxxxxxxxxxxxxxx&quot;</span><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">#修改成自己的ak</span></span>
<span class="line"><span style="color:#9ECBFF;">secret_key = &quot;hmbkxxxxxxxxxxxxxxxxxxxxxxxxx&quot;</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#修改成自己的sk</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">region     = &quot;cn-shanghai&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 定义provider</span></span>
<span class="line"><span style="color:#032F62;">terraform {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">required_providers {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">alicloud = {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">source = &quot;aliyun/alicloud&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">version = &quot;1.253.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置provider</span></span>
<span class="line"><span style="color:#032F62;">provider &quot;alicloud&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Configuration options</span></span>
<span class="line"><span style="color:#032F62;">access_key = &quot;LTAIxxxxxxxxxxxxxxxxx&quot;</span><span style="color:#24292E;">   </span><span style="color:#6A737D;">#修改成自己的ak</span></span>
<span class="line"><span style="color:#032F62;">secret_key = &quot;hmbkxxxxxxxxxxxxxxxxxxxxxxxxx&quot;</span><span style="color:#24292E;">  </span><span style="color:#6A737D;">#修改成自己的sk</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">region     = &quot;cn-shanghai&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="分开设置" tabindex="-1"><strong>分开设置</strong> <a class="header-anchor" href="#分开设置" aria-label="Permalink to &quot;**分开设置**&quot;">​</a></h4><p>分别建立<strong>provider.tf</strong>和<strong>version.tf</strong>，将定义provider写在version.tf中，将配置provider写在provider.tf中。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;"></span><span style="color:#E1E4E8;"> $Hsuin</span><span style="color:#9ECBFF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">D:/Terraform_project/tf_aliyun</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">❯</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tree</span></span>
<span class="line"><span style="color:#79B8FF;">.</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main.tf</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">provider.tf</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">terraform.tfstate</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">terraform.tfstate.backup</span></span>
<span class="line"><span style="color:#9ECBFF;">\`</span><span style="color:#B392F0;">--</span><span style="color:#9ECBFF;"> version.tf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;"></span><span style="color:#24292E;"> $Hsuin</span><span style="color:#032F62;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">D:/Terraform_project/tf_aliyun</span><span style="color:#24292E;"> </span><span style="color:#032F62;">❯</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tree</span></span>
<span class="line"><span style="color:#005CC5;">.</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">--</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main.tf</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">--</span><span style="color:#24292E;"> </span><span style="color:#032F62;">provider.tf</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">--</span><span style="color:#24292E;"> </span><span style="color:#032F62;">terraform.tfstate</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">--</span><span style="color:#24292E;"> </span><span style="color:#032F62;">terraform.tfstate.backup</span></span>
<span class="line"><span style="color:#032F62;">\`</span><span style="color:#6F42C1;">--</span><span style="color:#032F62;"> version.tf</span></span></code></pre></div><ul><li>provider.tf</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#定义云厂商</span></span>
<span class="line"><span style="color:#9ECBFF;">provider &quot;alicloud&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">region     = &quot;cn-shanghai&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">access_key = &quot;xx&quot;</span><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">#修改成自己的ak</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">secret_key = &quot;xx&quot;</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#修改成自己的sk</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#定义云厂商</span></span>
<span class="line"><span style="color:#032F62;">provider &quot;alicloud&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">region     = &quot;cn-shanghai&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">access_key = &quot;xx&quot;</span><span style="color:#24292E;">   </span><span style="color:#6A737D;">#修改成自己的ak</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">secret_key = &quot;xx&quot;</span><span style="color:#24292E;">  </span><span style="color:#6A737D;">#修改成自己的sk</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>version.tf</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">terraform {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">required_providers {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">alicloud = {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">source = &quot;aliyun/alicloud&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">version = &quot;1.253.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">terraform {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">required_providers {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">alicloud = {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">source = &quot;aliyun/alicloud&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">version = &quot;1.253.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">💡 说明</p><ul><li>Terraform 是一个多云基础设施编排工具，是通过Provider来支持云基础架构。其本质是上游云厂商的API调用。</li><li>provider有四种类型，分别是Official、Partner、Community、Archived。</li><li>不同云厂商的配置方式有所不同，请参考各云厂商的provider文档。</li><li>provider的定义与配置可以写在同一个.tf文件中，也可以分开填写。</li><li>同一个Terraform工程支持配置多个provider，只需要在required_providers中规范配置即可。</li><li>如果更换provider的文件模式，必须删除.terraform 目录，重新init</li></ul></div><h3 id="alias✅" tabindex="-1">alias✅ <a class="header-anchor" href="#alias✅" aria-label="Permalink to &quot;alias✅&quot;">​</a></h3><p>可以为同一个 <code>Provider</code> 定义多个配置，并选择基于每个资源或每个模块使用哪一个。这样做的主要原因是支持一个云平台的多个区域。</p><p>引用方式：</p><ul><li><code>&lt;PROVIDER NAME&gt;.&lt;ALIAS&gt;</code></li><li><code>alicloud.beiling</code></li><li><code>provider.hangzhou</code></li></ul><p>在其他配置文件中指定资源区域时，可以使用此模式引用</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">## provider.tf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">provider </span><span style="color:#9ECBFF;">&quot;alicloud&quot;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">access_key</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">var.alicloud.access_key</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">secret_key</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">var.alicloud.secret_key</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">provider </span><span style="color:#9ECBFF;">&quot;alicloud&quot;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">alias</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">&quot;beijing&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">region</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">&quot;cn-beijing-b&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">provider </span><span style="color:#9ECBFF;">&quot;alicloud&quot;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">alias</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">&quot;hangzhou&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">region</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">&quot;cn-hangzhou-a&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">## provider.tf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">provider </span><span style="color:#032F62;">&quot;alicloud&quot;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">access_key</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">var.alicloud.access_key</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">secret_key</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">var.alicloud.secret_key</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">provider </span><span style="color:#032F62;">&quot;alicloud&quot;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">alias</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">&quot;beijing&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">region</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">&quot;cn-beijing-b&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">provider </span><span style="color:#032F62;">&quot;alicloud&quot;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">alias</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">&quot;hangzhou&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">region</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">&quot;cn-hangzhou-a&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_1-3-指定下载插件和版本✅" tabindex="-1">1.3 指定下载插件和版本✅ <a class="header-anchor" href="#_1-3-指定下载插件和版本✅" aria-label="Permalink to &quot;1.3 指定下载插件和版本✅&quot;">​</a></h2><p>Terraform是通过解析required_providers知道需要哪些插件，一般习惯是定义一个verion.tf文件，把相关配置都放在这个文件里，比如：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">terraform {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">required_version = &quot;= v1.0.11&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">required_providers {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">local = {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">source  = &quot;hashicorp/local&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">version = &quot;= 2.1.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">random = {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">source  = &quot;hashicorp/random&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">version = &quot;3.1.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">terraform {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">required_version = &quot;= v1.0.11&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">required_providers {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">local = {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">source  = &quot;hashicorp/local&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">version = &quot;= 2.1.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">random = {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">source  = &quot;hashicorp/random&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">version = &quot;3.1.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>版本号有两个等于<code>=</code>号，会不会觉得奇怪？其实这是HCL语言的一个特性，除了<code>=</code>号，还可以是<code>&gt;</code>、<code>&lt;=</code>等，这样可以指定版本范围，而不只是某个特定版本。</p><blockquote><p>版本约束 =&gt;1.0 定义最低使用1.0版本；~&gt;1.0定义 最高使用1.0版本</p></blockquote><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">terraform</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">providers</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">Providers</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">required</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">by</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">configuration:</span></span>
<span class="line"><span style="color:#79B8FF;">.</span></span>
<span class="line"><span style="color:#B392F0;">└──</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">provider[registry.terraform.io/aliyun/alicloud]</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.253</span><span style="color:#9ECBFF;">.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">terraform</span><span style="color:#24292E;"> </span><span style="color:#032F62;">providers</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">Providers</span><span style="color:#24292E;"> </span><span style="color:#032F62;">required</span><span style="color:#24292E;"> </span><span style="color:#032F62;">by</span><span style="color:#24292E;"> </span><span style="color:#032F62;">configuration:</span></span>
<span class="line"><span style="color:#005CC5;">.</span></span>
<span class="line"><span style="color:#6F42C1;">└──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">provider[registry.terraform.io/aliyun/alicloud]</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.253</span><span style="color:#032F62;">.0</span></span></code></pre></div><h3 id="指定其它仓库" tabindex="-1">指定其它仓库 <a class="header-anchor" href="#指定其它仓库" aria-label="Permalink to &quot;指定其它仓库&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">terraform {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">required_version = &quot;= v1.0.11&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">required_providers {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">xxxowcloud = {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">source  = &quot;registry.xxx.com/examplecorp/xxx&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">version = &quot;0.1.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">terraform {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">required_version = &quot;= v1.0.11&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">required_providers {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">xxxowcloud = {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">source  = &quot;registry.xxx.com/examplecorp/xxx&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">version = &quot;0.1.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="没有网络" tabindex="-1">没有网络 <a class="header-anchor" href="#没有网络" aria-label="Permalink to &quot;没有网络&quot;">​</a></h3><p>当前目录的插件复制到特定目录</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">terraform</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">providers</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mirror</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/terraform/plugins</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">terraform</span><span style="color:#24292E;"> </span><span style="color:#032F62;">providers</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mirror</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/terraform/plugins</span></span></code></pre></div><ul><li>查看目录</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tree</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-a</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/terraform/plugins</span></span>
<span class="line"><span style="color:#B392F0;">/data/apps/terraform/plugins-localdisk</span></span>
<span class="line"><span style="color:#B392F0;">└──</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">registry.terraform.io</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">└──</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">hashicorp</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">├──</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">local</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">│</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">├──</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2.1</span><span style="color:#9ECBFF;">.0.json</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">│</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">├──</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">index.json</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">│</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">└──</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">terraform-provider-local_2.1.0_darwin_amd64.zip</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">└──</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">random</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">├──</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3.1</span><span style="color:#9ECBFF;">.0.json</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">├──</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">index.json</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">└──</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">terraform-provider-random_3.1.0_darwin_amd64.zip</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tree</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-a</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/terraform/plugins</span></span>
<span class="line"><span style="color:#6F42C1;">/data/apps/terraform/plugins-localdisk</span></span>
<span class="line"><span style="color:#6F42C1;">└──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">registry.terraform.io</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">└──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">hashicorp</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">├──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">local</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">│</span><span style="color:#24292E;">   </span><span style="color:#032F62;">├──</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2.1</span><span style="color:#032F62;">.0.json</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">│</span><span style="color:#24292E;">   </span><span style="color:#032F62;">├──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.json</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">│</span><span style="color:#24292E;">   </span><span style="color:#032F62;">└──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">terraform-provider-local_2.1.0_darwin_amd64.zip</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">└──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">random</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">├──</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3.1</span><span style="color:#032F62;">.0.json</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">├──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.json</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">└──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">terraform-provider-random_3.1.0_darwin_amd64.zip</span></span></code></pre></div><h3 id="指定插件目录实现复用" tabindex="-1">指定插件目录实现复用 <a class="header-anchor" href="#指定插件目录实现复用" aria-label="Permalink to &quot;指定插件目录实现复用&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">terraform</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-plugin-dir=/data/apps/terraform/plugins</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">terraform</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-plugin-dir=/data/apps/terraform/plugins</span></span></code></pre></div><h1 id="_2-常用插件" tabindex="-1">2. 常用插件 <a class="header-anchor" href="#_2-常用插件" aria-label="Permalink to &quot;2. 常用插件&quot;">​</a></h1><ul><li>local</li><li>random: <a href="https://registry.terraform.io/providers/hashicorp/random/latest" target="_blank" rel="noreferrer">https://registry.terraform.io/providers/hashicorp/random/latest</a></li><li>template</li><li>gcp</li><li>aws</li><li>aliyun</li></ul>`,59),e=[o];function r(t,c,i,y,E,d){return a(),n("div",null,e)}const h=s(p,[["render",r]]);export{F as __pageData,h as default};
