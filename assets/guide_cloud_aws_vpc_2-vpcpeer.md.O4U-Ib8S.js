import{_ as s,D as e,o as n,c as p,I as l,w as o,R as c,a as t}from"./chunks/framework.PZ77rLUR.js";const v=JSON.parse('{"title":"一、对等子网架构图","description":"","frontmatter":{},"headers":[],"relativePath":"guide/cloud/aws/vpc/2-vpcpeer.md","filePath":"guide/cloud/aws/vpc/2-vpcpeer.md","lastUpdated":1701252391000}'),i={name:"guide/cloud/aws/vpc/2-vpcpeer.md"},r=c(`<h1 id="一、对等子网架构图" tabindex="-1">一、对等子网架构图 <a class="header-anchor" href="#一、对等子网架构图" aria-label="Permalink to &quot;一、对等子网架构图&quot;">​</a></h1><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311291711174.png" alt="子网架构图"></p><h1 id="二、vpc-peering-特性" tabindex="-1">二、VPC Peering 特性 <a class="header-anchor" href="#二、vpc-peering-特性" aria-label="Permalink to &quot;二、VPC Peering 特性&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">不需要 Internet Gateway 或者虚拟网关</span></span>
<span class="line"><span style="color:#e1e4e8;">无单点故障</span></span>
<span class="line"><span style="color:#e1e4e8;">无带宽瓶颈</span></span>
<span class="line"><span style="color:#e1e4e8;">流量始终位于 AWS 全球网络主干上</span></span>
<span class="line"><span style="color:#e1e4e8;">可以跨区域进行连接</span></span>
<span class="line"><span style="color:#e1e4e8;">一对一连接，不支持网络传递</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">不需要 Internet Gateway 或者虚拟网关</span></span>
<span class="line"><span style="color:#24292e;">无单点故障</span></span>
<span class="line"><span style="color:#24292e;">无带宽瓶颈</span></span>
<span class="line"><span style="color:#24292e;">流量始终位于 AWS 全球网络主干上</span></span>
<span class="line"><span style="color:#24292e;">可以跨区域进行连接</span></span>
<span class="line"><span style="color:#24292e;">一对一连接，不支持网络传递</span></span></code></pre></div><h1 id="三、vpc-peering-安全性" tabindex="-1">三、VPC Peering 安全性 <a class="header-anchor" href="#三、vpc-peering-安全性" aria-label="Permalink to &quot;三、VPC Peering 安全性&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">双向握手以建立对等连接</span></span>
<span class="line"><span style="color:#e1e4e8;">路由控制：路由表用于控制可路由到远程子网的本地子网</span></span>
<span class="line"><span style="color:#e1e4e8;">安全组用于控制实例可以发送或接收哪些流量</span></span>
<span class="line"><span style="color:#e1e4e8;">网络 ACL 用于控制子网可以发送或接收哪些流量</span></span>
<span class="line"><span style="color:#e1e4e8;">无边到边的路由或传递信托：减少意外创建的网络连接</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">双向握手以建立对等连接</span></span>
<span class="line"><span style="color:#24292e;">路由控制：路由表用于控制可路由到远程子网的本地子网</span></span>
<span class="line"><span style="color:#24292e;">安全组用于控制实例可以发送或接收哪些流量</span></span>
<span class="line"><span style="color:#24292e;">网络 ACL 用于控制子网可以发送或接收哪些流量</span></span>
<span class="line"><span style="color:#24292e;">无边到边的路由或传递信托：减少意外创建的网络连接</span></span></code></pre></div><h1 id="四、vpc-peering-设置" tabindex="-1">四、VPC Peering 设置 <a class="header-anchor" href="#四、vpc-peering-设置" aria-label="Permalink to &quot;四、VPC Peering 设置&quot;">​</a></h1><h2 id="_4-1、创建-vpc-和子网" tabindex="-1">4.1、创建 VPC 和子网 <a class="header-anchor" href="#_4-1、创建-vpc-和子网" aria-label="Permalink to &quot;4.1、创建 VPC 和子网&quot;">​</a></h2><p>打开你所在区域的 ××× Console，按照我们的架构图，创建好 VPC 和子网。</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311291712896.png" alt="创建 VPC 和子网"></p><h2 id="_4-2、可选设置" tabindex="-1">4.2、可选设置 <a class="header-anchor" href="#_4-2、可选设置" aria-label="Permalink to &quot;4.2、可选设置&quot;">​</a></h2><p>创建 IGW，并关联子网 创建通往公网的路由表，并关联到公有子网</p><h2 id="_4-3、创建-vpc-peering" tabindex="-1">4.3、创建 VPC Peering <a class="header-anchor" href="#_4-3、创建-vpc-peering" aria-label="Permalink to &quot;4.3、创建 VPC Peering&quot;">​</a></h2><p>我们这里跳过第二步，直接当做私有子网，去对等连接 AWS 默认 VPC</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311291712723.png" alt="创建 VPC 和子网"></p><p>然后点击接受 VPC Peering 请求，如果是请求的另外一个区域，需要到对应区域中去点击接受请求</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311291712235.png" alt="创建 VPC 和子网"></p><h2 id="_4-4、添加路由规则" tabindex="-1">4.4、添加路由规则 <a class="header-anchor" href="#_4-4、添加路由规则" aria-label="Permalink to &quot;4.4、添加路由规则&quot;">​</a></h2><p>自己创建 VPC 的路由表，如果有多个路由表关联不同子网，只有填写了路由规则的子网才可以对等连接</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311291712600.png" alt="创建 VPC 和子网"></p><p>AWS 默认路由表的路由规则</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311291712663.png" alt="创建 VPC 和子网"></p><p>然后你就可以创建 EC2 实例去进行通信</p><h2 id="_4-5、可以开启-dns-设置" tabindex="-1">4.5、可以开启 DNS 设置 <a class="header-anchor" href="#_4-5、可以开启-dns-设置" aria-label="Permalink to &quot;4.5、可以开启 DNS 设置&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311291712426.png" alt="创建 VPC 和子网"></p>`,25);function h(d,g,u,m,P,_){const a=e("center");return n(),p("div",null,[l(a,null,{default:o(()=>[t("同账号不同区域vpc互通")]),_:1}),r])}const C=s(i,[["render",h]]);export{v as __pageData,C as default};