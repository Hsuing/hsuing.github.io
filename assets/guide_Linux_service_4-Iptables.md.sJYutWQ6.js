import{_ as s,c as a,o as e,R as n}from"./chunks/framework.CIzs38F0.js";const u=JSON.parse('{"title":"1.文档","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/service/4-Iptables.md","filePath":"guide/Linux/service/4-Iptables.md","lastUpdated":1715738069000}'),l={name:"guide/Linux/service/4-Iptables.md"},o=n(`<h1 id="_1-文档" tabindex="-1">1.文档 <a class="header-anchor" href="#_1-文档" aria-label="Permalink to &quot;1.文档&quot;">​</a></h1><p><a href="https://www.netfilter.org/" target="_blank" rel="noreferrer">https://www.netfilter.org/</a></p><p><a href="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/index" target="_blank" rel="noreferrer">https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/index</a></p><h1 id="_2-iptables简介" tabindex="-1">2.iptables简介 <a class="header-anchor" href="#_2-iptables简介" aria-label="Permalink to &quot;2.iptables简介&quot;">​</a></h1><ul><li>来自netfilter</li></ul><p><strong>iptables</strong> is the userspace command line program used to configure the Linux 2.4.x and later packet filtering ruleset. It is targeted towards system administrators.</p><p>Since Network Address Translation is also configured from the packet filter ruleset, <strong>iptables</strong> is used for this, too.</p><p>The <strong>iptables</strong> package also includes <strong>ip6tables</strong>. <strong>ip6tables</strong> is used for configuring the IPv6 packet filter.</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master yaml]# modinfo ip_tables</span></span>
<span class="line"><span style="color:#B392F0;">filename:</span><span style="color:#E1E4E8;">       </span><span style="color:#9ECBFF;">/lib/modules/4.19.12-1.el7.elrepo.x86_64/kernel/net/ipv4/netfilter/ip_tables.ko</span></span>
<span class="line"><span style="color:#79B8FF;">alias</span><span style="color:#E1E4E8;">:          </span><span style="color:#9ECBFF;">ipt_icmp</span></span>
<span class="line"><span style="color:#B392F0;">description:</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">IPv4</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">packet</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">filter</span></span>
<span class="line"><span style="color:#B392F0;">author:</span><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">Netfilter</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Core</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Team</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">coreteam@netfilter.or</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">license:</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">GPL</span></span>
<span class="line"><span style="color:#B392F0;">srcversion:</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">3967</span><span style="color:#9ECBFF;">C875058C2EE2475C9C2</span></span>
<span class="line"><span style="color:#B392F0;">depends:</span></span>
<span class="line"><span style="color:#B392F0;">intree:</span><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">Y</span></span>
<span class="line"><span style="color:#B392F0;">name:</span><span style="color:#E1E4E8;">           </span><span style="color:#9ECBFF;">ip_tables</span></span>
<span class="line"><span style="color:#B392F0;">vermagic:</span><span style="color:#E1E4E8;">       </span><span style="color:#79B8FF;">4.19</span><span style="color:#9ECBFF;">.12-1.el7.elrepo.x86_64</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">SMP</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mod_unload</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">modversions</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master yaml]# modinfo ip_tables</span></span>
<span class="line"><span style="color:#6F42C1;">filename:</span><span style="color:#24292E;">       </span><span style="color:#032F62;">/lib/modules/4.19.12-1.el7.elrepo.x86_64/kernel/net/ipv4/netfilter/ip_tables.ko</span></span>
<span class="line"><span style="color:#005CC5;">alias</span><span style="color:#24292E;">:          </span><span style="color:#032F62;">ipt_icmp</span></span>
<span class="line"><span style="color:#6F42C1;">description:</span><span style="color:#24292E;">    </span><span style="color:#032F62;">IPv4</span><span style="color:#24292E;"> </span><span style="color:#032F62;">packet</span><span style="color:#24292E;"> </span><span style="color:#032F62;">filter</span></span>
<span class="line"><span style="color:#6F42C1;">author:</span><span style="color:#24292E;">         </span><span style="color:#032F62;">Netfilter</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Core</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Team</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">coreteam@netfilter.or</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">license:</span><span style="color:#24292E;">        </span><span style="color:#032F62;">GPL</span></span>
<span class="line"><span style="color:#6F42C1;">srcversion:</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">3967</span><span style="color:#032F62;">C875058C2EE2475C9C2</span></span>
<span class="line"><span style="color:#6F42C1;">depends:</span></span>
<span class="line"><span style="color:#6F42C1;">intree:</span><span style="color:#24292E;">         </span><span style="color:#032F62;">Y</span></span>
<span class="line"><span style="color:#6F42C1;">name:</span><span style="color:#24292E;">           </span><span style="color:#032F62;">ip_tables</span></span>
<span class="line"><span style="color:#6F42C1;">vermagic:</span><span style="color:#24292E;">       </span><span style="color:#005CC5;">4.19</span><span style="color:#032F62;">.12-1.el7.elrepo.x86_64</span><span style="color:#24292E;"> </span><span style="color:#032F62;">SMP</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mod_unload</span><span style="color:#24292E;"> </span><span style="color:#032F62;">modversions</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master yaml]# lsmod </span><span style="color:#F97583;">|</span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ip_tables</span></span>
<span class="line"><span style="color:#B392F0;">ip_tables</span><span style="color:#E1E4E8;">              </span><span style="color:#79B8FF;">24576</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">iptable_filter,iptable_raw,iptable_nat,iptable_mangle</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master yaml]# lsmod </span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ip_tables</span></span>
<span class="line"><span style="color:#6F42C1;">ip_tables</span><span style="color:#24292E;">              </span><span style="color:#005CC5;">24576</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#032F62;">iptable_filter,iptable_raw,iptable_nat,iptable_mangle</span></span></code></pre></div><h1 id="_3-iptables的四表五链" tabindex="-1">3.iptables的四表五链 <a class="header-anchor" href="#_3-iptables的四表五链" aria-label="Permalink to &quot;3.iptables的四表五链&quot;">​</a></h1><p><strong>表的处理优先级：<code>raw</code>&gt;<code>mangle</code>&gt;<code>nat</code>&gt;<code>filter</code></strong></p><h2 id="_3-1-四表" tabindex="-1">3.1 四表 <a class="header-anchor" href="#_3-1-四表" aria-label="Permalink to &quot;3.1 四表&quot;">​</a></h2><p><code>iptables</code>的四个表<code>iptable_filter</code>，<code>iptable_mangle</code>，<code>iptable_nat</code>，<code>iptable_raw</code>，默认表是<code>filter</code>（没有指定表的时候就是filter表）</p><h3 id="filter-表" tabindex="-1">filter 表 <a class="header-anchor" href="#filter-表" aria-label="Permalink to &quot;filter 表&quot;">​</a></h3><p>用来对数据包进行过滤，具体的规则要求决定如何处理一个数据包。</p><p>对应的内核模块为：<code>iptable_filter</code>，其表内包括三个链：<code>input</code>、<code>forward</code>、<code>output</code>;</p><h3 id="nat-表" tabindex="-1">nat 表 <a class="header-anchor" href="#nat-表" aria-label="Permalink to &quot;nat 表&quot;">​</a></h3><p>nat 全称：network address translation 网络地址转换，主要用来修改数据包的 IP 地址、端口号信息。</p><p>对应的内核模块为：<code>iptable_nat</code>，其表内包括三个链：<code>prerouting</code>、<code>postrouting</code>、<code>output</code>;</p><h3 id="mangle-表" tabindex="-1">mangle 表 <a class="header-anchor" href="#mangle-表" aria-label="Permalink to &quot;mangle 表&quot;">​</a></h3><p>主要用来修改数据包的服务类型，生存周期，为数据包设置标记，实现流量整形、策略路由等。</p><p>对应的内核模块为：<code>iptable_mangle</code>，其表内包括五个链：<code>prerouting</code>、<code>postrouting</code>、<code>input</code>、<code>output</code>、<code>forward</code>;</p><h3 id="raw-表" tabindex="-1">raw 表 <a class="header-anchor" href="#raw-表" aria-label="Permalink to &quot;raw 表&quot;">​</a></h3><p>主要用来决定是否对数据包进行状态跟踪</p><p>对应的内核模块为：<code>iptable_raw</code>，其表内包括两个链：<code>output</code>、<code>prerouting</code>;</p><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>raw表只使用在<code>PREROUTING</code>链和<code>OUTPUT</code>链上,因为优先级最高，从而可以对收到的数据包在系统进行ip_conntrack（连接跟踪）前进行处理。一但用户使用了raw表,在某个链上，raw表处理完后，将跳过NAT表和ip_conntrack处理，即不再做地址转换和数据包的链接跟踪处理了。RAW表可以应用在那些不需要做nat的情况下，以提高性能</p></div><h2 id="_3-2-五链" tabindex="-1">3.2 五链 <a class="header-anchor" href="#_3-2-五链" aria-label="Permalink to &quot;3.2 五链&quot;">​</a></h2><p>iptables<code>的五个链</code>PREROUTING<code>，INPUT</code>，<code>FORWARD</code>，<code>OUTPUT</code>，<code>POSTROUTING</code></p><h3 id="input-链" tabindex="-1">input 链 <a class="header-anchor" href="#input-链" aria-label="Permalink to &quot;input 链&quot;">​</a></h3><p>当收到访问防火墙本机地址的数据包时，将应用此链中的规则</p><h3 id="output-链" tabindex="-1">output 链 <a class="header-anchor" href="#output-链" aria-label="Permalink to &quot;output 链&quot;">​</a></h3><p>当防火墙本机向外发送数据包时，将应用此链中的规则；</p><h3 id="forward-链" tabindex="-1">forward 链 <a class="header-anchor" href="#forward-链" aria-label="Permalink to &quot;forward 链&quot;">​</a></h3><p>当收到需要通过防火中转发给其他地址的数据包时，将应用此链中的规则，注意如果需要实现forward转发需要开启Linux内核中的ip_forward功能</p><h3 id="prerouting-链" tabindex="-1">prerouting 链 <a class="header-anchor" href="#prerouting-链" aria-label="Permalink to &quot;prerouting 链&quot;">​</a></h3><p>在对数据包做路由选择之前，将应用此链中的规则</p><h3 id="postrouting-链" tabindex="-1">postrouting 链 <a class="header-anchor" href="#postrouting-链" aria-label="Permalink to &quot;postrouting 链&quot;">​</a></h3><p>在对数据包做路由选择之后，将应用此链中的规则</p><h1 id="_4-iptables语法" tabindex="-1">4.iptables语法 <a class="header-anchor" href="#_4-iptables语法" aria-label="Permalink to &quot;4.iptables语法&quot;">​</a></h1><h2 id="_4-1基本语法" tabindex="-1">4.1基本语法 <a class="header-anchor" href="#_4-1基本语法" aria-label="Permalink to &quot;4.1基本语法&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">iptables [-t 表名] 管理选项 [链名] [匹配条件] [-j 控制类型]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">iptables [-t 表名] 管理选项 [链名] [匹配条件] [-j 控制类型]</span></span></code></pre></div><ul><li><code>表名</code>、<code>链名</code>：指定<code>iptables</code>命令所操作的<code>表</code>和<code>链</code>，未指定表名时将默认使用<code>filter</code>表；</li><li><code>管理选项</code>：表示<code>iptables</code>规则的操作方式，比如：<code>插入</code>、<code>增加</code>、<code>删除</code>、<code>查看</code>等；</li><li><code>匹配条件</code>：指定要处理的数据包的特征，不符合指定条件的数据包不处理；</li><li><code>控制类型</code>：指数据包的处理方式，比如：<code>允许accept</code>、<code>拒绝reject</code>、<code>丢弃drop</code>、<code>日志LOG</code>等；</li></ul><h2 id="_4-2常用参数" tabindex="-1">4.2常用参数 <a class="header-anchor" href="#_4-2常用参数" aria-label="Permalink to &quot;4.2常用参数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">iptables 命令的常用管理选项</span></span>
<span class="line"><span style="color:#e1e4e8;">-A:在指定链的末尾添加一条新的规则</span></span>
<span class="line"><span style="color:#e1e4e8;">-D:删除指定链中的某一条规则，可删除指定序号或具体内容</span></span>
<span class="line"><span style="color:#e1e4e8;">-I:在指定链中插入一条新规则，未指定序号时默认作为第一条规则</span></span>
<span class="line"><span style="color:#e1e4e8;">-R:修改、替换指定链中的某一条规则，可指定规则序号或具体内容</span></span>
<span class="line"><span style="color:#e1e4e8;">-L:列出指定链中所有的规则，未指定链名，则列出表中的所有链</span></span>
<span class="line"><span style="color:#e1e4e8;">-F:清空指定链中所有的规则，未指定链名，则清空表中的所有链</span></span>
<span class="line"><span style="color:#e1e4e8;">-P:设置指定链的默认策略</span></span>
<span class="line"><span style="color:#e1e4e8;">-n:使用数字形式显示输出结果</span></span>
<span class="line"><span style="color:#e1e4e8;">-v:查看规则列表时显示详细的信息</span></span>
<span class="line"><span style="color:#e1e4e8;">-h:查看命令帮助信息</span></span>
<span class="line"><span style="color:#e1e4e8;">--line-numbers:查看规则列表时，同时显示规则在链中的顺序号</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">iptables 命令的常用管理选项</span></span>
<span class="line"><span style="color:#24292e;">-A:在指定链的末尾添加一条新的规则</span></span>
<span class="line"><span style="color:#24292e;">-D:删除指定链中的某一条规则，可删除指定序号或具体内容</span></span>
<span class="line"><span style="color:#24292e;">-I:在指定链中插入一条新规则，未指定序号时默认作为第一条规则</span></span>
<span class="line"><span style="color:#24292e;">-R:修改、替换指定链中的某一条规则，可指定规则序号或具体内容</span></span>
<span class="line"><span style="color:#24292e;">-L:列出指定链中所有的规则，未指定链名，则列出表中的所有链</span></span>
<span class="line"><span style="color:#24292e;">-F:清空指定链中所有的规则，未指定链名，则清空表中的所有链</span></span>
<span class="line"><span style="color:#24292e;">-P:设置指定链的默认策略</span></span>
<span class="line"><span style="color:#24292e;">-n:使用数字形式显示输出结果</span></span>
<span class="line"><span style="color:#24292e;">-v:查看规则列表时显示详细的信息</span></span>
<span class="line"><span style="color:#24292e;">-h:查看命令帮助信息</span></span>
<span class="line"><span style="color:#24292e;">--line-numbers:查看规则列表时，同时显示规则在链中的顺序号</span></span></code></pre></div><p>参考</p><p><a href="https://tuxknight-notes.readthedocs.io/en/latest/iptables/iptables.html" target="_blank" rel="noreferrer">https://tuxknight-notes.readthedocs.io/en/latest/iptables/iptables.html</a></p><p><a href="https://www.360blogs.top/iptables-%E8%AF%A6%E8%A7%A3/" target="_blank" rel="noreferrer">https://www.360blogs.top/iptables-详解/</a></p><p><a href="https://tonydeng.github.io/sdn-handbook/basic/tcpip.html" target="_blank" rel="noreferrer">https://tonydeng.github.io/sdn-handbook/basic/tcpip.html</a></p><p>视频</p><p><a href="https://www.bilibili.com/video/BV1Yt4y1Z7so/?spm_id_from=333.788.recommend_more_video.11&amp;vd_source=271cfb4bb43eae8c9b0543f4ae14ec31" target="_blank" rel="noreferrer">https://www.bilibili.com/video/BV1Yt4y1Z7so/?spm_id_from=333.788.recommend_more_video.11&amp;vd_source=271cfb4bb43eae8c9b0543f4ae14ec31</a></p>`,51),p=[o];function t(r,c,i,d,h,y){return e(),a("div",null,p)}const E=s(l,[["render",t]]);export{u as __pageData,E as default};
