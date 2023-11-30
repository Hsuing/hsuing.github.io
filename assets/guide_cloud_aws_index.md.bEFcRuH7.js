import{_ as a,o as s,c as e,R as n}from"./chunks/framework.PZ77rLUR.js";const y=JSON.parse('{"title":"1. 什么是 Amazon CloudFront ?","description":"","frontmatter":{},"headers":[],"relativePath":"guide/cloud/aws/index.md","filePath":"guide/cloud/aws/index.md","lastUpdated":1701252391000}'),l={name:"guide/cloud/aws/index.md"},p=n(`<h1 id="_1-什么是-amazon-cloudfront" tabindex="-1">1. 什么是 Amazon CloudFront ? <a class="header-anchor" href="#_1-什么是-amazon-cloudfront" aria-label="Permalink to &quot;1. 什么是 Amazon CloudFront ?&quot;">​</a></h1><p>Amazon CloudFront 是 AWS 的 CDN，是一个用于加快将静态和动态的 Web 内容（如: .html, css, .js, 图片文件）分发给用户的Web 服务。举个简单的例子来说明。比如你在中国，想请求一张 Web 服务器位于美国的图片，在检索到图片之前，这个请求会从一个网络路由到另一个网络，在经历 n 多个路由后，才能到达该图片所在的服务器，这是一个非常大的跳数，同时会对性能、可用性和可靠性产生很大影响。但是如果将原始服务器与 CloudFront 关联（关联后 CloudFront 知道从哪些原始服务器获取资源），这时不再通过原始服务器访问图片，而是通过 CloudFront 分配的 URL 访问图片，则该请求将被路由到迟延最短的 CloudFront 边缘站点。如果该内容在迟延最短的 CloudFront 边缘站点的缓存中存在，则将直接从该边缘站点的缓存中返回图片。如果请求的内容不在该边缘站点的缓存中，才从源去取（请求的内容不在缓存中，这里写的比较笼统，这种情况下 CloudFront 是如何工作的，详细工作流程，见下面 Note 的解释）。这样大大减少了路由数，从而提高了性能。</p><h2 id="_1-1cdn优势" tabindex="-1">1.1CDN优势 <a class="header-anchor" href="#_1-1cdn优势" aria-label="Permalink to &quot;1.1CDN优势&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301609505.png" alt="优势"></p><h2 id="_1-2cdn技术支持" tabindex="-1">1.2CDN技术支持 <a class="header-anchor" href="#_1-2cdn技术支持" aria-label="Permalink to &quot;1.2CDN技术支持&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301609540.png" alt="CDN技术支持势"></p><h1 id="_2-cloudfront" tabindex="-1">2.CloudFront <a class="header-anchor" href="#_2-cloudfront" aria-label="Permalink to &quot;2.CloudFront&quot;">​</a></h1><ul><li>使用和部署</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301609100.png" alt="使用和部署"></p><ul><li>相关概念</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301609659.png" alt="相关概念"></p><ul><li>交互与安全</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301612788.png" alt="cdn5"></p><h1 id="_3-文档" tabindex="-1">3，文档 <a class="header-anchor" href="#_3-文档" aria-label="Permalink to &quot;3，文档&quot;">​</a></h1><h2 id="ec2介绍" tabindex="-1">ec2介绍 <a class="header-anchor" href="#ec2介绍" aria-label="Permalink to &quot;ec2介绍&quot;">​</a></h2><p><a href="https://aws.amazon.com/cn/ec2/instance-types/" target="_blank" rel="noreferrer">https://aws.amazon.com/cn/ec2/instance-types/</a></p><h2 id="aws预估费用" tabindex="-1">aws预估费用 <a class="header-anchor" href="#aws预估费用" aria-label="Permalink to &quot;aws预估费用&quot;">​</a></h2><p><em><strong>*<a href="http://calculator.s3.amazonaws.com/index.html%5C" target="_blank" rel="noreferrer">http://calculator.s3.amazonaws.com/index.html\\</a></strong></em>*</p><p><a href="https://aws.amazon.com/ec2/pr2icing/" target="_blank" rel="noreferrer">https://aws.amazon.com/ec2/pr2icing/</a></p><h2 id="磁盘" tabindex="-1">磁盘 <a class="header-anchor" href="#磁盘" aria-label="Permalink to &quot;磁盘&quot;">​</a></h2><p><a href="https://aws.amazon.com/cn/ebs/pricing/" target="_blank" rel="noreferrer">https://aws.amazon.com/cn/ebs/pricing/</a></p><h2 id="s3" tabindex="-1">s3 <a class="header-anchor" href="#s3" aria-label="Permalink to &quot;s3&quot;">​</a></h2><p><a href="https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/Welcome.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/Welcome.html</a></p><h2 id="ec2" tabindex="-1">ec2 <a class="header-anchor" href="#ec2" aria-label="Permalink to &quot;ec2&quot;">​</a></h2><p><a href="https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/general-purpose-instances.html#general-purpose-network-performance" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/general-purpose-instances.html#general-purpose-network-performance</a></p><ul><li>价格</li></ul><p><a href="https://www.instance-pricing.com/provider=aws-ec2/instance=m5zn.3xlarge/" target="_blank" rel="noreferrer">https://www.instance-pricing.com/provider=aws-ec2/instance=m5zn.3xlarge/</a></p><h4 id="aws-网络测试地址" tabindex="-1">AWS 网络测试地址 <a class="header-anchor" href="#aws-网络测试地址" aria-label="Permalink to &quot;AWS 网络测试地址&quot;">​</a></h4><p>测试你本地的网络到亚马逊各个可用区的网络 <a href="https://www.cloudping.info/" target="_blank" rel="noreferrer">https://www.cloudping.info/</a></p><h4 id="aws-测试ip获取" tabindex="-1">AWS 测试IP获取 <a class="header-anchor" href="#aws-测试ip获取" aria-label="Permalink to &quot;AWS 测试IP获取&quot;">​</a></h4><p>亚马逊提供的各个可用区和地域的网络 <a href="http://ec2-reachability.amazonaws.com/" target="_blank" rel="noreferrer">http://ec2-reachability.amazonaws.com/</a></p><h4 id="aws云服务器价格计算器" tabindex="-1">AWS云服务器价格计算器 <a class="header-anchor" href="#aws云服务器价格计算器" aria-label="Permalink to &quot;AWS云服务器价格计算器&quot;">​</a></h4><p>AWS WEB 价格计算器网址 <a href="https://calculator.s3.amazonaws.com/index.html" target="_blank" rel="noreferrer">https://calculator.s3.amazonaws.com/index.html</a></p><p>aws命令客户端引导：<a href="https://docs.aws.amazon.com/cli/latest/index.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/cli/latest/index.html</a></p><p>aws国内产品信息及定价：<a href="https://www.amazonaws.cn/products/" target="_blank" rel="noreferrer">https://www.amazonaws.cn/products/</a></p><p>aws海外产品价格计算：<a href="https://calculator.aws" target="_blank" rel="noreferrer">https://calculator.aws</a></p><h1 id="epel" tabindex="-1">epel <a class="header-anchor" href="#epel" aria-label="Permalink to &quot;epel&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Amazon Linux 2:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Install the EPEL release package for RHEL 7 and enable the EPEL repository.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sudo amazon-linux-extras install epel -y</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Amazon Linux Amazon Machine Image (AMI):</span></span>
<span class="line"><span style="color:#e1e4e8;">sudo yum-config-manager --enable epel</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">RHEL 8：</span></span>
<span class="line"><span style="color:#e1e4e8;">sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm -y</span></span>
<span class="line"><span style="color:#e1e4e8;">sudo dnf config-manager --set-enabled codeready-builder-for-rhel-8-rhui-rpms</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Install and enable the EPEL release package for RHEL 7.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sudo yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">CentOS 8:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Install the EPEL release package for RHEL 8. Enable both the EPEL and PowerTools repositories. The PowerTools repository contains development tools required by many EPEL packages.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm -y</span></span>
<span class="line"><span style="color:#e1e4e8;">sudo dnf config-manager --set-enabled PowerTools</span></span>
<span class="line"><span style="color:#e1e4e8;">CentOS 7:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Install and enable the EPEL release package. CentOS 7 includes the epel-release package in the base repositories.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sudo yum -y install epel-release</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Amazon Linux 2:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Install the EPEL release package for RHEL 7 and enable the EPEL repository.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sudo amazon-linux-extras install epel -y</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Amazon Linux Amazon Machine Image (AMI):</span></span>
<span class="line"><span style="color:#24292e;">sudo yum-config-manager --enable epel</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">RHEL 8：</span></span>
<span class="line"><span style="color:#24292e;">sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm -y</span></span>
<span class="line"><span style="color:#24292e;">sudo dnf config-manager --set-enabled codeready-builder-for-rhel-8-rhui-rpms</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Install and enable the EPEL release package for RHEL 7.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sudo yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">CentOS 8:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Install the EPEL release package for RHEL 8. Enable both the EPEL and PowerTools repositories. The PowerTools repository contains development tools required by many EPEL packages.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm -y</span></span>
<span class="line"><span style="color:#24292e;">sudo dnf config-manager --set-enabled PowerTools</span></span>
<span class="line"><span style="color:#24292e;">CentOS 7:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Install and enable the EPEL release package. CentOS 7 includes the epel-release package in the base repositories.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sudo yum -y install epel-release</span></span></code></pre></div><h1 id="faq" tabindex="-1">FAQ <a class="header-anchor" href="#faq" aria-label="Permalink to &quot;FAQ&quot;">​</a></h1><h2 id="_1-磁盘故障" tabindex="-1">1.磁盘故障 <a class="header-anchor" href="#_1-磁盘故障" aria-label="Permalink to &quot;1.磁盘故障&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">故障现象(2021-04-25)：</span></span>
<span class="line"><span style="color:#e1e4e8;">	1，出现问题时间节点将近晚上9点，持续报警，开始查看问题，联系aws</span></span>
<span class="line"><span style="color:#e1e4e8;">	2，经过aws最终查询是磁盘写入性能达到瓶颈，从而导致系统崩溃</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">解决方案：</span></span>
<span class="line"><span style="color:#e1e4e8;">	针对目前方式对磁盘升级，gp2的话1G可以增加3个 iops，现有磁盘是200g</span></span>
<span class="line"><span style="color:#e1e4e8;">    升级到600g  1800ips</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">故障现象(2021-04-25)：</span></span>
<span class="line"><span style="color:#24292e;">	1，出现问题时间节点将近晚上9点，持续报警，开始查看问题，联系aws</span></span>
<span class="line"><span style="color:#24292e;">	2，经过aws最终查询是磁盘写入性能达到瓶颈，从而导致系统崩溃</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">解决方案：</span></span>
<span class="line"><span style="color:#24292e;">	针对目前方式对磁盘升级，gp2的话1G可以增加3个 iops，现有磁盘是200g</span></span>
<span class="line"><span style="color:#24292e;">    升级到600g  1800ips</span></span></code></pre></div><p>blog：</p><p><a href="https://www.cnblogs.com/syavingcs/p/8583060.html#%E7%94%B3%E8%AF%B7%E5%BC%B9%E6%80%A7ip" target="_blank" rel="noreferrer">https://www.cnblogs.com/syavingcs/p/8583060.html#申请弹性ip</a></p>`,43),o=[p];function t(r,c,i,h,d,u){return s(),e("div",null,o)}const g=a(l,[["render",t]]);export{y as __pageData,g as default};
