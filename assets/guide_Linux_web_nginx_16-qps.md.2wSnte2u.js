import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"性能测试基本概念","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/16-qps.md","filePath":"guide/Linux/web/nginx/16-qps.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/16-qps.md"},l=e(`<p>单位时间的请求数就是QPS</p><p>cat /var/log/nginx/access.log|awk &#39;{a[$4]+=1;}END{for (i in a) { printf(&quot;%s\\t%i\\n&quot;,i,a[i])}}&#39;|sort -gr -k2|head</p><p>awk做的主要工作是把access每行日志按分隔符分开,然后循环每一行,存到一个数组里,如果只按时间不区分脚本路径,数组里存的数据是比如arr[&#39;[28/Nov/2019:14:12:23&#39;]=20 key是时间,value是次数</p><p>pv指的就是，页面的刷新次数，每打开一个页面，就算1次 pv；</p><p>计算模式：</p><p>根据目前互联网行业来看，模型大概一致，白天时间访问量较高，晚上较少。</p><p>每台服务器每秒处理请求的数量=((80%<em>总PV量)/(24小时</em>60分<em>60秒</em>40%)) / 服务器数量 。 其中关键的参数是80%、40%。表示一天中有80%的请求发生在一天的40%的时间内。 24小时的40%是9.6小时，有80%的请求发生一天的9.6个小时当中</p><p>简单的计算结果：</p><p>((80%<em>500万)/(24小时</em>60分<em>60秒</em>40%))/1 = 115.7个请求/秒</p><p>((80%<em>100万)/(24小时</em>60分<em>60秒</em>40%))/1 = 23.1个请求/秒</p><h3 id="初步结论" tabindex="-1">初步结论： <a class="header-anchor" href="#初步结论" aria-label="Permalink to &quot;初步结论：&quot;">​</a></h3><p>现在我们在做压力测试时，就有了标准，如果你的服务器一秒能处理115.7个请求，就可以承受500万PV/每天. 如果你的服务器一秒能处理23.1个请求，就可以承受100万PV/每天。</p><p>以上结果都是处于“理想化”，真实环境要给服务器留有资源余地，比如说你服务器刚好并发115.7，那你跑500万PV是不行的，比如说网络延迟，或硬件问题等问题出现，服务器就立刻挂掉了，这样是必行的，所以要留有余量</p><h2 id="留足余量" tabindex="-1">留足余量： <a class="header-anchor" href="#留足余量" aria-label="Permalink to &quot;留足余量：&quot;">​</a></h2><p>以上请求数量是均匀的分布在白天的9.6个小时中，但实际情况并不会这么均匀的分布，会有高峰有低谷。 为了应对高峰时段，应该留一些余地，最少也要x2倍，x3倍也不为过。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">115.7个请求/秒 *2倍=231.4个请求/秒</span></span>
<span class="line"><span style="color:#e1e4e8;">115.7个请求/秒* 3倍=347.1个请求/秒</span></span>
<span class="line"><span style="color:#e1e4e8;">23.1个请求/秒 *2倍=46.2个请求/秒</span></span>
<span class="line"><span style="color:#e1e4e8;">23.1个请求/秒* 3倍=69.3个请求/秒</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">115.7个请求/秒 *2倍=231.4个请求/秒</span></span>
<span class="line"><span style="color:#24292e;">115.7个请求/秒* 3倍=347.1个请求/秒</span></span>
<span class="line"><span style="color:#24292e;">23.1个请求/秒 *2倍=46.2个请求/秒</span></span>
<span class="line"><span style="color:#24292e;">23.1个请求/秒* 3倍=69.3个请求/秒</span></span></code></pre></div><h3 id="最终结论" tabindex="-1">最终结论： <a class="header-anchor" href="#最终结论" aria-label="Permalink to &quot;最终结论：&quot;">​</a></h3><p>如果你的服务器一秒能处理231.4—347.1个请求/秒，就可以应对平均500万PV/每天。 如果你的服务器一秒能处理46.2—69.3个请求，就可以应对平均100万PV/每天</p><p>说明： 这里说明每秒N个请求，就是QPS。因为我关心的是应用程序处理业务的能力</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">实际经验：</span></span>
<span class="line"><span style="color:#e1e4e8;">1、根据实际经验，采用两台常规配置的机架式服务器，配置是很常见的配置，例如一个4核CPU+4G内存+服务器SAS硬盘。</span></span>
<span class="line"><span style="color:#e1e4e8;">2、个人武断的认为在服务器CPU领域Intel的CPU要优于AMD的CPU，有反对的就反对吧，我都说我武断了（请看CPU性能比较），不要太相信AMD的广告，比较CPU性能简单办法就是比价格，不要比频率与核心数，价格相差不多的性能也相差不多。</span></span>
<span class="line"><span style="color:#e1e4e8;">3、硬盘的性能很重要，由其是数据库服务器。一般的服务器都配1.5万转的SAS硬盘，高级一点的可以配SSD固态硬盘，性能会更好。最最最最重要的指标是“随机读写性能”而不是“顺序读写性能”。（本例还是配置最常见的1.5万转的SAS硬盘吧）</span></span>
<span class="line"><span style="color:#e1e4e8;">4、一台服务器跑Tomcat运行j2ee程序,一台服务器跑MySql数据库,程序写的中等水平(这个真的不好量化)，是论坛类型的应用(总有回帖,不太容易做缓存,也无法静态化)。</span></span>
<span class="line"><span style="color:#e1e4e8;">5、以上软硬件情况下，是可以承受100万PV/每天的。(已留有余量应对突然的访问高峰)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意机房的网络带宽：</span></span>
<span class="line"><span style="color:#e1e4e8;">有人说以上条件我都满足了，但实际性能还是达不到目标。这时请注意你对外的网络的带宽，在国内服务器便宜但带宽很贵，很可能你在机房是与大家共享一条100M的光纤，实际每个人可分到2M左右带宽。再好一点5M,再好一点双线机房10M独享，这已经很贵了（北京价格）。</span></span>
<span class="line"><span style="color:#e1e4e8;">一天总流量：每个页面20k字节*100万个页面/1024=19531M字节=19G字节，</span></span>
<span class="line"><span style="color:#e1e4e8;">19531M/9.6小时=2034M/小时=578K字节/s   如果请求是均匀分布的，需要5M（640K字节）带宽（5Mb=640KB 注意大小写，b是位，B是字节，差了8倍），但所有请求不可能是均匀分布的，当有高峰时5M带宽一定不够，X2倍就是10M带宽。10M带宽基本可以满足 要求。</span></span>
<span class="line"><span style="color:#e1e4e8;">以上是假设每个页面20k字节，基本不包含图片，要是包含图片就更大了，10M带宽也不能满足要求了</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">实际经验：</span></span>
<span class="line"><span style="color:#24292e;">1、根据实际经验，采用两台常规配置的机架式服务器，配置是很常见的配置，例如一个4核CPU+4G内存+服务器SAS硬盘。</span></span>
<span class="line"><span style="color:#24292e;">2、个人武断的认为在服务器CPU领域Intel的CPU要优于AMD的CPU，有反对的就反对吧，我都说我武断了（请看CPU性能比较），不要太相信AMD的广告，比较CPU性能简单办法就是比价格，不要比频率与核心数，价格相差不多的性能也相差不多。</span></span>
<span class="line"><span style="color:#24292e;">3、硬盘的性能很重要，由其是数据库服务器。一般的服务器都配1.5万转的SAS硬盘，高级一点的可以配SSD固态硬盘，性能会更好。最最最最重要的指标是“随机读写性能”而不是“顺序读写性能”。（本例还是配置最常见的1.5万转的SAS硬盘吧）</span></span>
<span class="line"><span style="color:#24292e;">4、一台服务器跑Tomcat运行j2ee程序,一台服务器跑MySql数据库,程序写的中等水平(这个真的不好量化)，是论坛类型的应用(总有回帖,不太容易做缓存,也无法静态化)。</span></span>
<span class="line"><span style="color:#24292e;">5、以上软硬件情况下，是可以承受100万PV/每天的。(已留有余量应对突然的访问高峰)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意机房的网络带宽：</span></span>
<span class="line"><span style="color:#24292e;">有人说以上条件我都满足了，但实际性能还是达不到目标。这时请注意你对外的网络的带宽，在国内服务器便宜但带宽很贵，很可能你在机房是与大家共享一条100M的光纤，实际每个人可分到2M左右带宽。再好一点5M,再好一点双线机房10M独享，这已经很贵了（北京价格）。</span></span>
<span class="line"><span style="color:#24292e;">一天总流量：每个页面20k字节*100万个页面/1024=19531M字节=19G字节，</span></span>
<span class="line"><span style="color:#24292e;">19531M/9.6小时=2034M/小时=578K字节/s   如果请求是均匀分布的，需要5M（640K字节）带宽（5Mb=640KB 注意大小写，b是位，B是字节，差了8倍），但所有请求不可能是均匀分布的，当有高峰时5M带宽一定不够，X2倍就是10M带宽。10M带宽基本可以满足 要求。</span></span>
<span class="line"><span style="color:#24292e;">以上是假设每个页面20k字节，基本不包含图片，要是包含图片就更大了，10M带宽也不能满足要求了</span></span></code></pre></div><h1 id="性能测试基本概念" tabindex="-1">性能测试基本概念 <a class="header-anchor" href="#性能测试基本概念" aria-label="Permalink to &quot;性能测试基本概念&quot;">​</a></h1><p>基本概念：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Throughput（吞吐量）：按照常规理解网络吞吐量表示在单位时间内通过网卡数据量之和，其中即包括本机网卡发送出去的数据量也包括本机 网卡接收到的数据量。 一个100Mb(位)的双工网卡，最大发送数据的速度是12.5M字节/s ， 最大接收数据的速度是12.5M字节/s， 可以 同时 收发 数据。</span></span>
<span class="line"><span style="color:#e1e4e8;">并发用户数：是同时执行操作的用户(线程数)。</span></span>
<span class="line"><span style="color:#e1e4e8;">响应时间：从请求发出到收到响应花费的时间 。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">QPS – Queries Per Second 每秒处理的查询数（如果是数据库，就相当于读取）</span></span>
<span class="line"><span style="color:#e1e4e8;">TPS – Transactions Per Second 每秒处理的事务数(如果是数据库，就相当于写入、修改)</span></span>
<span class="line"><span style="color:#e1e4e8;">IOPS，每秒磁盘进行的I/O操作次数</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">例如对某个数据库测试，分开两次测QPS与TPS。</span></span>
<span class="line"><span style="color:#e1e4e8;">QPS（读取）值总是高于TPS(写、改)，并且有倍率关系，因为：</span></span>
<span class="line"><span style="color:#e1e4e8;">1、数据库对查询可能有缓存。</span></span>
<span class="line"><span style="color:#e1e4e8;">2、机械硬盘或SSD硬盘的读就是比写快</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Throughput（吞吐量）：按照常规理解网络吞吐量表示在单位时间内通过网卡数据量之和，其中即包括本机网卡发送出去的数据量也包括本机 网卡接收到的数据量。 一个100Mb(位)的双工网卡，最大发送数据的速度是12.5M字节/s ， 最大接收数据的速度是12.5M字节/s， 可以 同时 收发 数据。</span></span>
<span class="line"><span style="color:#24292e;">并发用户数：是同时执行操作的用户(线程数)。</span></span>
<span class="line"><span style="color:#24292e;">响应时间：从请求发出到收到响应花费的时间 。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">QPS – Queries Per Second 每秒处理的查询数（如果是数据库，就相当于读取）</span></span>
<span class="line"><span style="color:#24292e;">TPS – Transactions Per Second 每秒处理的事务数(如果是数据库，就相当于写入、修改)</span></span>
<span class="line"><span style="color:#24292e;">IOPS，每秒磁盘进行的I/O操作次数</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">例如对某个数据库测试，分开两次测QPS与TPS。</span></span>
<span class="line"><span style="color:#24292e;">QPS（读取）值总是高于TPS(写、改)，并且有倍率关系，因为：</span></span>
<span class="line"><span style="color:#24292e;">1、数据库对查询可能有缓存。</span></span>
<span class="line"><span style="color:#24292e;">2、机械硬盘或SSD硬盘的读就是比写快</span></span></code></pre></div><h1 id="网站宽带计算方式" tabindex="-1">网站宽带计算方式 <a class="header-anchor" href="#网站宽带计算方式" aria-label="Permalink to &quot;网站宽带计算方式&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">阿里云官方给出的标准：1M的带宽1S可以打开1个请求的125KB的资源</span></span>
<span class="line"><span style="color:#e1e4e8;">即：1000/8=125</span></span>
<span class="line"><span style="color:#e1e4e8;">网站宽带 响应时间 请求数（并发数） 网站资源大小</span></span>
<span class="line"><span style="color:#e1e4e8;">1M 1s 1 125KB</span></span>
<span class="line"><span style="color:#e1e4e8;">1.6M 1s 1 200KB</span></span>
<span class="line"><span style="color:#e1e4e8;">800M 1s 500 200KB</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">阿里云官方给出的标准：1M的带宽1S可以打开1个请求的125KB的资源</span></span>
<span class="line"><span style="color:#24292e;">即：1000/8=125</span></span>
<span class="line"><span style="color:#24292e;">网站宽带 响应时间 请求数（并发数） 网站资源大小</span></span>
<span class="line"><span style="color:#24292e;">1M 1s 1 125KB</span></span>
<span class="line"><span style="color:#24292e;">1.6M 1s 1 200KB</span></span>
<span class="line"><span style="color:#24292e;">800M 1s 500 200KB</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">公式：网站宽带</span><span style="color:#E1E4E8;">=并发数*网站资源大小*8/1000  (此处按照1000来换算，标准是按照1024)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">公式：网站宽带</span><span style="color:#24292E;">=并发数*网站资源大小*8/1000  (此处按照1000来换算，标准是按照1024)</span></span></code></pre></div><p>1.响应时间(RT)</p><blockquote><p>响应时间是指系统对请求作出响应的时间。</p></blockquote><p>2.吞吐量(TPS)</p><blockquote><p>系统在单位时间内处理请求的数量</p></blockquote><p>3.并发用户数</p><blockquote><p>系统可以同时承载的正常使用系统功能的用户的数量</p></blockquote><p>4.QPS每秒查询率</p><blockquote><p>对一个特定的查询服务器在规定时间内所处理流量多少的衡量标准</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">保存在文件大小：45kb，700QPS/s = 700*45/1024 = 30MB，单个页面如果700QPS的话需要吐出来30MB/s的量</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">保存在文件大小：186kb，700QPS/s = 700*186/1024 = 100MB+，单个页面如果700QPS的话需要吐出来100MB/s的量</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">保存在文件大小：45kb，700QPS/s = 700*45/1024 = 30MB，单个页面如果700QPS的话需要吐出来30MB/s的量</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">保存在文件大小：186kb，700QPS/s = 700*186/1024 = 100MB+，单个页面如果700QPS的话需要吐出来100MB/s的量</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">分析原因:一个详情页html 主体达平均150 kb 那么在500QPS 已接近局域网宽带极限。75MB+，内网一般都是千兆带宽，千年带宽128MB/s，其实这个也是在往内网IO的一个瓶颈上边走</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">减少内网的通信，nginx本身也可以通过配置将数据缓存到本地硬盘上，下次请求直接请求nginx内部的硬盘缓存数据，这样也减少了内网的通信</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#配置缓存</span></span>
<span class="line"><span style="color:#e1e4e8;">        location ~*\\.(html|htm)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_set_header X-Forwarded-For $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_pass http://idig8;</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_cache cache_item;</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_cache_key $host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_cache_valid 200 304 12h;</span></span>
<span class="line"><span style="color:#e1e4e8;">          expires 7d;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">分析原因:一个详情页html 主体达平均150 kb 那么在500QPS 已接近局域网宽带极限。75MB+，内网一般都是千兆带宽，千年带宽128MB/s，其实这个也是在往内网IO的一个瓶颈上边走</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">减少内网的通信，nginx本身也可以通过配置将数据缓存到本地硬盘上，下次请求直接请求nginx内部的硬盘缓存数据，这样也减少了内网的通信</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#配置缓存</span></span>
<span class="line"><span style="color:#24292e;">        location ~*\\.(html|htm)$ {</span></span>
<span class="line"><span style="color:#24292e;">          proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">          proxy_set_header X-Forwarded-For $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">          proxy_pass http://idig8;</span></span>
<span class="line"><span style="color:#24292e;">          proxy_cache cache_item;</span></span>
<span class="line"><span style="color:#24292e;">          proxy_cache_key $host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#24292e;">          proxy_cache_valid 200 304 12h;</span></span>
<span class="line"><span style="color:#24292e;">          expires 7d;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">从用户的角度，http 1.1协议下，由于浏览器默认使用两个并发连接,因此计算方法：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   nginx作为http服务器的时候：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    max_clients = worker_processes * worker_connections/2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   nginx作为反向代理服务器的时候：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    max_clients = worker_processes * worker_connections/4</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">或者从一般建立连接的角度：客户并发连接为1.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   nginx作为http服务器的时候：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    max_clients = worker_processes * worker_connections</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   nginx作为反向代理服务器的时候：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    max_clients = worker_processes * worker_connections/2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">nginx做反向代理时，和客户端之间保持一个连接，和后端服务器保持一个连接。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">clients与用户数：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  同一时间的clients(客户端数)和用户数还是有区别的，当一个用户请求发送一个连接时这两个是相等的，但是当一个用户默认发送多个连接请求的时候，clients数就是用户数*默认发送的连接并发数了</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">从用户的角度，http 1.1协议下，由于浏览器默认使用两个并发连接,因此计算方法：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   nginx作为http服务器的时候：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    max_clients = worker_processes * worker_connections/2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   nginx作为反向代理服务器的时候：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    max_clients = worker_processes * worker_connections/4</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">或者从一般建立连接的角度：客户并发连接为1.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   nginx作为http服务器的时候：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    max_clients = worker_processes * worker_connections</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   nginx作为反向代理服务器的时候：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    max_clients = worker_processes * worker_connections/2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">nginx做反向代理时，和客户端之间保持一个连接，和后端服务器保持一个连接。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">clients与用户数：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  同一时间的clients(客户端数)和用户数还是有区别的，当一个用户请求发送一个连接时这两个是相等的，但是当一个用户默认发送多个连接请求的时候，clients数就是用户数*默认发送的连接并发数了</span></span></code></pre></div>`,37),o=[l];function c(t,i,r,y,d,h){return n(),a("div",null,o)}const k=s(p,[["render",c]]);export{u as __pageData,k as default};
