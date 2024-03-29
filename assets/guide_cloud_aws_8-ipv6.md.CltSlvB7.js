import{_ as a,c as s,o,R as p}from"./chunks/framework.CIzs38F0.js";const d=JSON.parse('{"title":"1.文档","description":"","frontmatter":{},"headers":[],"relativePath":"guide/cloud/aws/8-ipv6.md","filePath":"guide/cloud/aws/8-ipv6.md","lastUpdated":1708502912000}'),n={name:"guide/cloud/aws/8-ipv6.md"},c=p('<h1 id="_1-文档" tabindex="-1">1.文档 <a class="header-anchor" href="#_1-文档" aria-label="Permalink to &quot;1.文档&quot;">​</a></h1><p><a href="https://docs.aws.amazon.com/zh_cn/vpc/latest/userguide/vpc-migrate-ipv6.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/vpc/latest/userguide/vpc-migrate-ipv6.html</a></p><h1 id="_2-ec2" tabindex="-1">2.EC2 <a class="header-anchor" href="#_2-ec2" aria-label="Permalink to &quot;2.EC2&quot;">​</a></h1><h2 id="_2-1实例开启-ipv6" tabindex="-1">2.1实例开启 IPv6 <a class="header-anchor" href="#_2-1实例开启-ipv6" aria-label="Permalink to &quot;2.1实例开启 IPv6&quot;">​</a></h2><p>通过AWS控制台开启EC2实例的IPv6地址和自动分配。</p><p>1.首先找到并打开VPC控制台</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202402211545390.png" alt="image-20240221154500016"></p><p>2.找到你已创建的VPC（如果没有也可以创建一个，注意区域），右上角选择“编辑CIDR”</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202402211545338.png" alt="image-20240221154553667"></p><p>3.下方选择“添加新的 IPv6 CIDR”，然后选择“Amazon 提供的 IPv6 CIDR 块”，如果你自己有IPv6块也可以选最后一项填进去，然后“选择CIDR”即可。</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202402211546495.png" alt="image-20240221154625143"></p><p>4.关闭后返回，左侧选择“子网”，右侧找到你机器所绑定的subnet，然后右上角操作-&gt;编辑 IPv6 CIDR</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202402211546252.png" alt="image-20240221154649818"></p><p>如果已经创建好主机了但是不知道哪个是自己的子网可以到EC2页面查询：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202402211547821.png" alt="image-20240221154714699"></p><p>5.下方选择“添加 IPv6 CIDR”，然后上面子网CIDR块填写<code>10</code>/<code>20</code>/<code>30</code>这种的IP地址块，然后保存退出。</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202402211547612.png" alt="image-20240221154746299"></p><blockquote><p>按照AWS的划分方法，每个可用区位于一个单独的子网之下，你需要单独为每个子网分配<code>/64</code>的子网CIDR，当然需要自定义的那个段是不同的</p></blockquote><p>6.左侧栏选择“路由表”，选择与你VPC关联的那个路由表，右上角选择“编辑路由”</p><p>7.选择“添加路由”，目标填写<code>::/0</code>，目标复制上方<code>0.0.0.0/0</code>那行的目标（整个复制下来），保存更改后退出</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202402211548700.png" alt="image-20240221154835751"></p><p>8.创建主机时记得选择对应的VPC和子网，然后启用自动分配IPv6即可</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202402211549684.png" alt="image-20240221154903897"></p><blockquote><p>如果已经创建好了EC2实例，则在进行到上面第8步完成时按照如下操作：</p></blockquote><p>1.打开EC2实例状态页面，下拉找到接口，点进去之后选择管理IP地址</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202402211553228.png" alt="image-20240221155333521"></p><p>2.选择分配新IP地址，自动分配即可，也可以自行指定</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202402211554848.png" alt="image-20240221155416314"></p><p>3.回到主机查看已经拥有了IPv6地址</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202402211554202.png" alt="image-20240221155453883"></p>',30),t=[c];function e(i,g,m,h,l,r){return o(),s("div",null,t)}const _=a(n,[["render",e]]);export{d as __pageData,_ as default};
