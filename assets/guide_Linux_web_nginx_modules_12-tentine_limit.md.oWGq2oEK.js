import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/modules/12-tentine_limit.md","filePath":"guide/Linux/web/nginx/modules/12-tentine_limit.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/modules/12-tentine_limit.md"},p=e(`<h3 id="tengine版本采用http-limit-req-module进行限制" tabindex="-1">Tengine版本采用http_limit_req_module进行限制 <a class="header-anchor" href="#tengine版本采用http-limit-req-module进行限制" aria-label="Permalink to &quot;Tengine版本采用http_limit_req_module进行限制&quot;">​</a></h3><p>具体连接请参考 <a href="http://tengine.taobao.org/document_cn/http_limit_req_cn.html" target="_blank" rel="noreferrer">http://tengine.taobao.org/document_cn/http_limit_req_cn.html</a></p><p>和官方nginx类似，不过支持多个变量，并且支持多个limit_req_zone的设置。比如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">limit_req_zone $binary_remote_addr zone=one:3m rate=1r/s;</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req_zone $binary_remote_addr $uri zone=two:3m rate=1r/s;               # $uri:不带客户端请求参数</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req_zone $binary_remote_addr $request_uri zone=thre:3m rate=1r/s;      # $request_uri:带客户端请求参数</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">limit_req_zone $binary_remote_addr zone=one:3m rate=1r/s;</span></span>
<span class="line"><span style="color:#24292e;">limit_req_zone $binary_remote_addr $uri zone=two:3m rate=1r/s;               # $uri:不带客户端请求参数</span></span>
<span class="line"><span style="color:#24292e;">limit_req_zone $binary_remote_addr $request_uri zone=thre:3m rate=1r/s;      # $request_uri:带客户端请求参数</span></span></code></pre></div><p>上面的第二个指令表示当相同的ip地址并且访问相同的uri，会导致进入limit req的限制（每秒1个请求）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Nginx官方版本限制IP的连接和并发分别有两个模块：</span></span>
<span class="line"><span style="color:#e1e4e8;">点击以下超链接可查看对应模块的官方详细介绍</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req_zone 用来限制单位时间内的请求数，即速率限制,采用的漏桶算法 &quot;leaky bucket&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req_conn 用来限制同一时间连接数，即并发限制</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">其中limit_req_conn模块可以根据源IP限制单用户并发访问的连接数或连接到该服务的总并发连接数</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> ​什么是漏桶算法？</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">我们假设系统是一个漏桶，当请求到达时，就是往漏桶里“加水”，而当请求被处理掉，就是水从漏桶的底部漏出。水漏出的速度是固定的，当“加水”太快，桶就会溢出，也就是“拒绝请求”。从而使得桶里的水的体积不可能超出桶的容量。​主要目的是控制数据注入到网络的速率，平滑网络上的突发流量。漏桶算法提供了一种机制，通过它，突发流量可以被整形以便为网络提供一个稳定的流量。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">示例如下：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn_log_level error;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn_status 503;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn_zone $binary_remote_addr zone=one:10m;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn_zone $server_name zone=perserver:10m;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req_zone $binary_remote_addr zone=allips:100m   rate=10r/s;   其中$binary_remote_addr有时需要根据自己已有的log_format变量配置进行替换</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                  …………………….</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                limit_conn  one  100;                                              </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                limit_conn perserver 1000;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                limit_req   zone=allips  burst=5  nodelay;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">               ………………….</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">         }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">参数解释：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Zone=one或allips 表示设置了名为“one”或“allips”的存储区，大小为10兆字节</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rate=10r/s 的意思是允许1秒钟不超过10个请求</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">burst=5 表示最大延迟请求数量不大于5。  如果太过多的请求被限制延迟是不需要的 ，这时需要使用nodelay参数，服务器会立刻返回503状态码。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn  one  100表示限制每个客户端IP的最大并发连接数100</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn perserver 1000表示该服务提供的总连接数不得超过1000,超过请求的会被拒绝</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-----------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">示例如下：   </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req_zone $binary_remote_addr zone=one:100m   rate=10r/m;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                  …………………….</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                  …………………….</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          limit_req   zone=one  burst=1  nodelay;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    ………………….</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rate=10r/m 的意思是允许1秒钟不超过1个请求，最大延迟请求数量不大于5.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果请求不需要被延迟，添加nodelay参数，服务器会立刻返回503状态码。如果没有该字段会造成大量的tcp连接请求等待。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">http{</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_zone one  $binary_remote_addr  10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">server</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">......</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn  one  1;</span></span>
<span class="line"><span style="color:#e1e4e8;">......</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">这里的 one 是声明一个 limit_zone 的名字，$binary_remote_addr是替代 $remore_addr 的变量，10m 是会话状态储存的空间</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn one 1 ,限制客户端并发连接数量为1， allow only one connection per an IP address at a time（每次）.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">d)按照字面的理解，lit_req_zone的功能是通过漏桶原理来限制用户的连接频率，(这个模块允许你去限制单个地址指定会话或特殊需要的请求数 )</span></span>
<span class="line"><span style="color:#e1e4e8;">而 limit_zone 功能是限制一个客户端的并发连接数。(这个模块可以限制单个地址的指定会话或者特殊情况的并发连接数)</span></span>
<span class="line"><span style="color:#e1e4e8;">一个是限制并发连接一个是限制连接频率，表面上似乎看不出来有什么区别，那就看看实际的效果吧~~~</span></span>
<span class="line"><span style="color:#e1e4e8;">在我的测试机上面加上这两个参数下面是我的部分配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">e)http{</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_zone one  $binary_remote_addr  10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">#limit_req_zone  $binary_remote_addr  zone=req_one:10m rate=1r/s;</span></span>
<span class="line"><span style="color:#e1e4e8;">server</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">......</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn   one  1;</span></span>
<span class="line"><span style="color:#e1e4e8;">#limit_req   zone=req_one  burst=120;</span></span>
<span class="line"><span style="color:#e1e4e8;">......</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">f)解释一下 limit_zone one  $binary_remote_addr  10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">这里的 one 是声明一个 limit_zone 的名字，$binary_remote_addr是替代 $remore_addr 的变量，10m是会话状态储存的空间</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn one 1 ,限制客户端并发连接数量为1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">二、limit_zone两种工作情况</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">a)limit_reqzone=one burst=10 ；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">i.默认情况下是这样配置的，这样每个请求就会有一个delay时间，</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req_zone$binary_remote_addr zone=one:100m rate=10r/m;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">就是每分钟有10个令牌供用户使用，按照a的配置情况，就会有一个delay，每个请求时间就是60/10,那每个请求时间就是6s。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">b)limit_reqzone=one burst=10 nodelay；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">i.添加nodelay配置，这样就是根据你的网络状况访问，一分钟访问够10次后，服务器直接返回503。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ii.Eg：imit_req_zone$binary_remote_addr zone=one:100m rate=10r/m;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">就是每分钟有10个令牌供用户使用，按照b的配置情况，就会根据网络情况访问url，如果一分钟超过10个令牌，服务器返回503，等待下一个一分钟领取访问令牌。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rate=10r/m 的意思是每个地址每分钟只能请求10次，也就是说根据漏桶原理burst=1 一共有1块令牌，并且每分钟只新增10块令牌，</span></span>
<span class="line"><span style="color:#e1e4e8;">1块令牌发完后多出来的那些请求就会返回503</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">加上 nodelay之后超过 burst大小的请求就会直接返回503，如果没有该字段会造成大量的tcp连接请求等待</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Nginx官方版本限制IP的连接和并发分别有两个模块：</span></span>
<span class="line"><span style="color:#24292e;">点击以下超链接可查看对应模块的官方详细介绍</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_req_zone 用来限制单位时间内的请求数，即速率限制,采用的漏桶算法 &quot;leaky bucket&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_req_conn 用来限制同一时间连接数，即并发限制</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">其中limit_req_conn模块可以根据源IP限制单用户并发访问的连接数或连接到该服务的总并发连接数</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> ​什么是漏桶算法？</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">我们假设系统是一个漏桶，当请求到达时，就是往漏桶里“加水”，而当请求被处理掉，就是水从漏桶的底部漏出。水漏出的速度是固定的，当“加水”太快，桶就会溢出，也就是“拒绝请求”。从而使得桶里的水的体积不可能超出桶的容量。​主要目的是控制数据注入到网络的速率，平滑网络上的突发流量。漏桶算法提供了一种机制，通过它，突发流量可以被整形以便为网络提供一个稳定的流量。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">示例如下：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_conn_log_level error;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_conn_status 503;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_conn_zone $binary_remote_addr zone=one:10m;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_conn_zone $server_name zone=perserver:10m;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_req_zone $binary_remote_addr zone=allips:100m   rate=10r/s;   其中$binary_remote_addr有时需要根据自己已有的log_format变量配置进行替换</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                  …………………….</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                limit_conn  one  100;                                              </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                limit_conn perserver 1000;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                limit_req   zone=allips  burst=5  nodelay;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">               ………………….</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">         }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">参数解释：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Zone=one或allips 表示设置了名为“one”或“allips”的存储区，大小为10兆字节</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rate=10r/s 的意思是允许1秒钟不超过10个请求</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">burst=5 表示最大延迟请求数量不大于5。  如果太过多的请求被限制延迟是不需要的 ，这时需要使用nodelay参数，服务器会立刻返回503状态码。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_conn  one  100表示限制每个客户端IP的最大并发连接数100</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_conn perserver 1000表示该服务提供的总连接数不得超过1000,超过请求的会被拒绝</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-----------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">示例如下：   </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_req_zone $binary_remote_addr zone=one:100m   rate=10r/m;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                  …………………….</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                  …………………….</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          limit_req   zone=one  burst=1  nodelay;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    ………………….</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rate=10r/m 的意思是允许1秒钟不超过1个请求，最大延迟请求数量不大于5.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果请求不需要被延迟，添加nodelay参数，服务器会立刻返回503状态码。如果没有该字段会造成大量的tcp连接请求等待。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">http{</span></span>
<span class="line"><span style="color:#24292e;">limit_zone one  $binary_remote_addr  10m;</span></span>
<span class="line"><span style="color:#24292e;">server</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">......</span></span>
<span class="line"><span style="color:#24292e;">limit_conn  one  1;</span></span>
<span class="line"><span style="color:#24292e;">......</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">这里的 one 是声明一个 limit_zone 的名字，$binary_remote_addr是替代 $remore_addr 的变量，10m 是会话状态储存的空间</span></span>
<span class="line"><span style="color:#24292e;">limit_conn one 1 ,限制客户端并发连接数量为1， allow only one connection per an IP address at a time（每次）.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">d)按照字面的理解，lit_req_zone的功能是通过漏桶原理来限制用户的连接频率，(这个模块允许你去限制单个地址指定会话或特殊需要的请求数 )</span></span>
<span class="line"><span style="color:#24292e;">而 limit_zone 功能是限制一个客户端的并发连接数。(这个模块可以限制单个地址的指定会话或者特殊情况的并发连接数)</span></span>
<span class="line"><span style="color:#24292e;">一个是限制并发连接一个是限制连接频率，表面上似乎看不出来有什么区别，那就看看实际的效果吧~~~</span></span>
<span class="line"><span style="color:#24292e;">在我的测试机上面加上这两个参数下面是我的部分配置文件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">e)http{</span></span>
<span class="line"><span style="color:#24292e;">limit_zone one  $binary_remote_addr  10m;</span></span>
<span class="line"><span style="color:#24292e;">#limit_req_zone  $binary_remote_addr  zone=req_one:10m rate=1r/s;</span></span>
<span class="line"><span style="color:#24292e;">server</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">......</span></span>
<span class="line"><span style="color:#24292e;">limit_conn   one  1;</span></span>
<span class="line"><span style="color:#24292e;">#limit_req   zone=req_one  burst=120;</span></span>
<span class="line"><span style="color:#24292e;">......</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">f)解释一下 limit_zone one  $binary_remote_addr  10m;</span></span>
<span class="line"><span style="color:#24292e;">这里的 one 是声明一个 limit_zone 的名字，$binary_remote_addr是替代 $remore_addr 的变量，10m是会话状态储存的空间</span></span>
<span class="line"><span style="color:#24292e;">limit_conn one 1 ,限制客户端并发连接数量为1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">二、limit_zone两种工作情况</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">a)limit_reqzone=one burst=10 ；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">i.默认情况下是这样配置的，这样每个请求就会有一个delay时间，</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_req_zone$binary_remote_addr zone=one:100m rate=10r/m;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">就是每分钟有10个令牌供用户使用，按照a的配置情况，就会有一个delay，每个请求时间就是60/10,那每个请求时间就是6s。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">b)limit_reqzone=one burst=10 nodelay；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">i.添加nodelay配置，这样就是根据你的网络状况访问，一分钟访问够10次后，服务器直接返回503。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ii.Eg：imit_req_zone$binary_remote_addr zone=one:100m rate=10r/m;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">就是每分钟有10个令牌供用户使用，按照b的配置情况，就会根据网络情况访问url，如果一分钟超过10个令牌，服务器返回503，等待下一个一分钟领取访问令牌。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rate=10r/m 的意思是每个地址每分钟只能请求10次，也就是说根据漏桶原理burst=1 一共有1块令牌，并且每分钟只新增10块令牌，</span></span>
<span class="line"><span style="color:#24292e;">1块令牌发完后多出来的那些请求就会返回503</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">加上 nodelay之后超过 burst大小的请求就会直接返回503，如果没有该字段会造成大量的tcp连接请求等待</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#如果想设置用户下载文件的前10m大小时不限速，大于10m后再以128kb/s限速可以增加以下配内容，修改nginx.conf文件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /download { </span></span>
<span class="line"><span style="color:#e1e4e8;">       limit_rate_after 10m; </span></span>
<span class="line"><span style="color:#e1e4e8;">       limit_rate 128k; </span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#如果想设置用户下载文件的前10m大小时不限速，大于10m后再以128kb/s限速可以增加以下配内容，修改nginx.conf文件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /download { </span></span>
<span class="line"><span style="color:#24292e;">       limit_rate_after 10m; </span></span>
<span class="line"><span style="color:#24292e;">       limit_rate 128k; </span></span>
<span class="line"><span style="color:#24292e;"> }</span></span></code></pre></div>`,7),o=[p];function c(r,t,i,y,_,m){return n(),a("div",null,o)}const b=s(l,[["render",c]]);export{u as __pageData,b as default};
