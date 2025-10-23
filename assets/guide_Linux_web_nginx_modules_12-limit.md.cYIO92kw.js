import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const e="/assets/1.A8pmcjH4.jpg",p="/assets/2.b6NLmFtg.png",h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/modules/12-limit.md","filePath":"guide/Linux/web/nginx/modules/12-limit.md","lastUpdated":1701684699000}'),o={name:"guide/Linux/web/nginx/modules/12-limit.md"},t=l('<p>官方文档：<a href="http://nginx.org/en/docs/http/ngx_http_limit_req_module.html" target="_blank" rel="noreferrer">http://nginx.org/en/docs/http/ngx_http_limit_req_module.html</a></p><p>限制并发连接数,<a href="http://nginx.org/en/docs/http/ngx_http_limit_conn_module.html" target="_blank" rel="noreferrer">http://nginx.org/en/docs/http/ngx_http_limit_conn_module.html</a></p><p>限制传输速度(意思是请求的体积不能太),<a href="http://nginx.org/en/docs/http/ngx_http_core_module.html#limit_rate" target="_blank" rel="noreferrer">http://nginx.org/en/docs/http/ngx_http_core_module.html#limit_rate</a></p><p>nginx上面我们常见的三种限速操作分别是：限制请求数(request)、限制连接数(connection)、限制响应速度(rate)，对应在nginx的模块相关指令分别是<code>limit_req</code>、<code>limit_conn</code>和<code>limit_rate</code>三个系列</p><h2 id="多维防御" tabindex="-1">多维防御 <a class="header-anchor" href="#多维防御" aria-label="Permalink to &quot;多维防御&quot;">​</a></h2><p>所谓的多维防御，不仅仅针对 IP 进行限制，还可以从 URI、Cookie、状态码等多个维度进行限制，同时还可以组合起来进行精细化的限制，举例说明：</p><ul><li>状态码+IP，如果恶意扫描整个网站，必然会出现较多的 404 状态码，这时候结合其他维度，就可以进行一定的防御和限制</li><li>URI+Cookie，可以避免公司 IP 出口导致的请求被误伤，同时也解决了 IP 模式下阈值设置太大的问题</li></ul><h2 id="纵深防御" tabindex="-1">纵深防御 <a class="header-anchor" href="#纵深防御" aria-label="Permalink to &quot;纵深防御&quot;">​</a></h2><p>所谓的纵深防御，则是指针对单一维度，进行多层级的防御，实现精细化的限制。以 IP 维度为例进行说明：</p><ul><li>每秒钟，单个 IP 最多可以访问 100 次</li><li>每十秒钟，单个 IP 最多可以访问 500 次</li><li>每分钟，单个 IP 最多可以访问 1000 次</li></ul><h2 id="_1-限流算法" tabindex="-1">1.限流算法 <a class="header-anchor" href="#_1-限流算法" aria-label="Permalink to &quot;1.限流算法&quot;">​</a></h2><h3 id="令牌桶算法" tabindex="-1">令牌桶算法 <a class="header-anchor" href="#令牌桶算法" aria-label="Permalink to &quot;令牌桶算法&quot;">​</a></h3><p><img src="'+e+'" alt=""></p><p>算法思想是：</p><ul><li>令牌以固定速率产生，并缓存到令牌桶中；</li><li>令牌桶放满时，多余的令牌被丢弃；</li><li>请求要消耗等比例的令牌才能被处理；</li><li>令牌不够时，请求被缓存</li></ul><h3 id="漏桶算法" tabindex="-1">漏桶算法 <a class="header-anchor" href="#漏桶算法" aria-label="Permalink to &quot;漏桶算法&quot;">​</a></h3><p><img src="'+p+`" alt=""></p><p>算法思想是：</p><ul><li>水（请求）从上方倒入水桶，从水桶下方流出（被处理）；</li><li>来不及流出的水存在水桶中（缓冲），以固定速率流出；</li><li>水桶满后水溢出（丢弃）。</li><li>这个算法的核心是：缓存请求、匀速处理、多余的请求直接丢弃。 相比漏桶算法，令牌桶算法不同之处在于它不但有一只“桶”，还有个队列，这个桶是用来存放令牌的，队列才是用来存放请求的</li></ul><p>从作用上来说，漏桶和令牌桶算法最明显的区别就是是否允许突发流量(burst)的处理，漏桶算法能够强行限制数据的实时传输（处理）速率，对突发流量不做额外处理；而令牌桶算法能够在限制数据的平均传输速率的同时允许某种程度的突发传输</p><p>Nginx按请求速率限速模块使用的是漏桶算法，即能够强行保证请求的实时处理速度不会超过设置的阈值。</p><p>Nginx官方版本限制IP的连接和并发分别有两个模块：</p><ul><li><code>limit_req_zone</code> 用来限制单位时间内的请求数，即速率限制,采用的漏桶算法 &quot;leaky bucket&quot;。</li><li><code>limit_req_conn</code> 用来限制同一时间连接数，即并发限制</li></ul><h2 id="_2-limit-req-zone-参数配置" tabindex="-1">2.limit_req_zone 参数配置 <a class="header-anchor" href="#_2-limit-req-zone-参数配置" aria-label="Permalink to &quot;2.limit_req_zone 参数配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Syntax:	limit_req zone=name [burst=number] [nodelay];</span></span>
<span class="line"><span style="color:#e1e4e8;">Default:	—</span></span>
<span class="line"><span style="color:#e1e4e8;">Context:	http, server, location</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Syntax:	limit_req zone=name [burst=number] [nodelay];</span></span>
<span class="line"><span style="color:#24292e;">Default:	—</span></span>
<span class="line"><span style="color:#24292e;">Context:	http, server, location</span></span></code></pre></div><p>limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;</p><ul><li>第一个参数：$binary_remote_addr 表示通过remote_addr这个标识来做限制，“binary_”的目的是缩写内存占用量，是限制同一客户端ip地址。</li><li>第二个参数：zone=one:10m表示生成一个大小为10M，名字为one的内存区域，用来存储访问的频次信息,1M能保持大约16000个(IP)状态。</li><li>第三个参数：rate=1r/s表示允许相同标识的客户端的访问频次，这里限制的是每秒1次，还可以有比如30r/m的</li><li>rate：设定允许的最大请求速率。上面的例子是每秒十个请求(10r/s)。nginx实现的是<strong>毫秒级别的控制粒度</strong>，10r/s对应的就是1r/100ms，这也就意味着在没有设置<code>bursts</code>的情况下，如果一个请求接受处理之后的100ms内出现第二个请求，那么它就会被拒绝处理</li></ul><p>limit_req zone=one burst=5 nodelay;</p><ul><li>第一个参数：zone=one 设置使用哪个配置区域来做限制，与上面limit_req_zone 里的name对应。</li><li>第二个参数：burst=5，重点说明一下这个配置，burst爆发的意思，这个配置的意思是设置一个大小为5的缓冲区当有大量请求（爆发）过来时，超过了访问频次限制的请求可以先放到这个缓冲区内。</li><li>第三个参数：nodelay，如果设置，超过访问频次而且缓冲区也满了的时候就会直接返回503，如果没有设置，则所有请求会等待排队</li></ul><p>例子：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">limit_req_zone</span><span style="color:#E1E4E8;"> $binary_remote_addr </span><span style="color:#9ECBFF;">zone=one:10m</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rate=</span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">r/s</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/search/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">limit_req</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zone=one</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">burst=</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nodelay</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">http</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">limit_req_zone</span><span style="color:#24292E;"> $binary_remote_addr </span><span style="color:#032F62;">zone=one:10m</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rate=</span><span style="color:#005CC5;">1</span><span style="color:#032F62;">r/s</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/search/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">limit_req</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zone=one</span><span style="color:#24292E;"> </span><span style="color:#032F62;">burst=</span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nodelay</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>下面配置可以限制特定UA（比如搜索引擎）的访问：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">limit_req_zone</span><span style="color:#E1E4E8;">  $anti_spider  </span><span style="color:#9ECBFF;">zone=one:10m</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">rate=</span><span style="color:#79B8FF;">10</span><span style="color:#9ECBFF;">r/s</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">limit_req</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zone=one</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">burst=</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nodelay</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($http_user_agent </span><span style="color:#F97583;">~*</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;googlebot|bingbot|Feedfetcher-Google&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> $anti_spider $http_user_agent;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">limit_req_zone</span><span style="color:#24292E;">  $anti_spider  </span><span style="color:#032F62;">zone=one:10m</span><span style="color:#24292E;">   </span><span style="color:#032F62;">rate=</span><span style="color:#005CC5;">10</span><span style="color:#032F62;">r/s</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">limit_req</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zone=one</span><span style="color:#24292E;"> </span><span style="color:#032F62;">burst=</span><span style="color:#005CC5;">100</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nodelay</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($http_user_agent </span><span style="color:#D73A49;">~*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;googlebot|bingbot|Feedfetcher-Google&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $anti_spider $http_user_agent;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>其他参数</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Syntax:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">limit_req_log_level</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">info</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">notice</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">Default:</span><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#B392F0;">limit_req_log_level</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">error</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">Context:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">http,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">server,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">location</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Syntax:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">limit_req_log_level</span><span style="color:#24292E;"> </span><span style="color:#032F62;">info</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">notice</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">Default:</span><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#6F42C1;">limit_req_log_level</span><span style="color:#24292E;"> </span><span style="color:#032F62;">error</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">Context:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">http,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">server,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">location</span></span></code></pre></div><p>当服务器由于limit被限速或缓存时，配置写入日志。延迟的记录比拒绝的记录低一个级别。例子：<code>limit_req_log_level notice</code>延迟的的基本是info。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Syntax:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">limit_req_status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">code</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">Default:</span><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#B392F0;">limit_req_status</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">503</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">Context:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">http,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">server,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">location</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Syntax:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">limit_req_status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">code</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">Default:</span><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#6F42C1;">limit_req_status</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">503</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">Context:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">http,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">server,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">location</span></span></code></pre></div><p>设置拒绝请求的返回值。值只能设置 400 到 599 之间</p><h2 id="_3-ngx-http-limit-conn-module-参数配置" tabindex="-1">3.ngx_http_limit_conn_module 参数配置 <a class="header-anchor" href="#_3-ngx-http-limit-conn-module-参数配置" aria-label="Permalink to &quot;3.ngx_http_limit_conn_module 参数配置&quot;">​</a></h2><p>这个模块用来限制单个IP的请求数。并非所有的连接都被计数。只有在服务器处理了请求并且已经读取了整个请求头时，连接才被计数。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Syntax:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">limit_conn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zone</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">number</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">Default:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">—</span></span>
<span class="line"><span style="color:#B392F0;">Context:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">http,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">server,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">location</span></span>
<span class="line"><span style="color:#B392F0;">limit_conn_zone</span><span style="color:#E1E4E8;"> $binary_remote_addr </span><span style="color:#9ECBFF;">zone=addr:10m</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/download/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">limit_conn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">addr</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Syntax:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">limit_conn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zone</span><span style="color:#24292E;"> </span><span style="color:#032F62;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">Default:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">—</span></span>
<span class="line"><span style="color:#6F42C1;">Context:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">http,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">server,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">location</span></span>
<span class="line"><span style="color:#6F42C1;">limit_conn_zone</span><span style="color:#24292E;"> $binary_remote_addr </span><span style="color:#032F62;">zone=addr:10m</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/download/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">limit_conn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">addr</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><p>一次只允许每个IP地址一个连接。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">limit_conn_zone</span><span style="color:#E1E4E8;"> $binary_remote_addr </span><span style="color:#9ECBFF;">zone=perip:10m</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">limit_conn_zone</span><span style="color:#E1E4E8;"> $server_name </span><span style="color:#9ECBFF;">zone=perserver:10m</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">limit_conn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">perip</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">limit_conn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">perserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">limit_rate</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#9ECBFF;">k</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">$binary_remote_addr是限制同一客户端ip地址；</span></span>
<span class="line"><span style="color:#E1E4E8;">$server_name是限制同一server最大并发数；</span></span>
<span class="line"><span style="color:#B392F0;">limit_conn为限制并发连接数；</span></span>
<span class="line"><span style="color:#B392F0;">limit_rate为限制下载速度；</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">http</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">limit_conn_zone</span><span style="color:#24292E;"> $binary_remote_addr </span><span style="color:#032F62;">zone=perip:10m</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">limit_conn_zone</span><span style="color:#24292E;"> $server_name </span><span style="color:#032F62;">zone=perserver:10m</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">limit_conn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">perip</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">limit_conn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">perserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">limit_rate</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#032F62;">k</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">$binary_remote_addr是限制同一客户端ip地址；</span></span>
<span class="line"><span style="color:#24292E;">$server_name是限制同一server最大并发数；</span></span>
<span class="line"><span style="color:#6F42C1;">limit_conn为限制并发连接数；</span></span>
<span class="line"><span style="color:#6F42C1;">limit_rate为限制下载速度；</span></span></code></pre></div><p>可以配置多个limit_conn指令。例如，以上配置将限制每个客户端IP连接到服务器的数量，同时限制连接到虚拟服务器的总数。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Syntax:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">limit_conn_zone</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">key</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zone=name:size</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">Default:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">—</span></span>
<span class="line"><span style="color:#B392F0;">Context:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#B392F0;">limit_conn_zone</span><span style="color:#E1E4E8;"> $binary_remote_addr </span><span style="color:#9ECBFF;">zone=addr:10m</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Syntax:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">limit_conn_zone</span><span style="color:#24292E;"> </span><span style="color:#032F62;">key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zone=name:size</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">Default:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">—</span></span>
<span class="line"><span style="color:#6F42C1;">Context:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#6F42C1;">limit_conn_zone</span><span style="color:#24292E;"> $binary_remote_addr </span><span style="color:#032F62;">zone=addr:10m</span><span style="color:#24292E;">;</span></span></code></pre></div><p>在这里，客户端IP地址作为关键。</p><p>请注意，不是<code>$ remote_addr</code>，而是使用<code>$ binary_remote_addr</code>变量。 <code>$ remote_addr</code>变量的大小可以从7到15个字节不等。</p><p>存储的状态在32位平台上占用32或64字节的内存，在64位平台上总是占用64字节。</p><p>对于IPv4地址，<code>$ binary_remote_addr</code>变量的大小始终为4个字节，对于IPv6地址则为16个字节。</p><p>存储状态在32位平台上始终占用32或64个字节，在64位平台上占用64个字节。</p><p>一个兆字节的区域可以保持大约32000个32字节的状态或大约16000个64字节的状态。如果区域存储耗尽，服务器会将错误返回给所有其他请求。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Syntax:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">limit_conn_log_level</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">info</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">notice</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">Default:</span><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#B392F0;">limit_conn_log_level</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">error</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">Context:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">http,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">server,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">location</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Syntax:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">limit_conn_log_level</span><span style="color:#24292E;"> </span><span style="color:#032F62;">info</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">notice</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">Default:</span><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#6F42C1;">limit_conn_log_level</span><span style="color:#24292E;"> </span><span style="color:#032F62;">error</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">Context:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">http,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">server,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">location</span></span></code></pre></div><p>当服务器限制连接数时，设置所需的日志记录级别。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Syntax:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">limit_conn_status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">code</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">Default:</span><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#B392F0;">limit_conn_status</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">503</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">Context:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">http,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">server,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">location</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Syntax:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">limit_conn_status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">code</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">Default:</span><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#6F42C1;">limit_conn_status</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">503</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">Context:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">http,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">server,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">location</span></span></code></pre></div><p>设置拒绝请求的返回值</p><h2 id="_4-实战" tabindex="-1">4.实战 <a class="header-anchor" href="#_4-实战" aria-label="Permalink to &quot;4.实战&quot;">​</a></h2><h3 id="实例一-限制访问速率" tabindex="-1">实例一 限制访问速率 <a class="header-anchor" href="#实例一-限制访问速率" aria-label="Permalink to &quot;实例一 限制访问速率&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">limit_req_zone</span><span style="color:#E1E4E8;"> $binary_remote_addr </span><span style="color:#9ECBFF;">zone=mylimit:10m</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rate=</span><span style="color:#79B8FF;">2</span><span style="color:#9ECBFF;">r/s</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">limit_req</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zone=mylimit</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">limit_req_zone</span><span style="color:#24292E;"> $binary_remote_addr </span><span style="color:#032F62;">zone=mylimit:10m</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rate=</span><span style="color:#005CC5;">2</span><span style="color:#032F62;">r/s</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">limit_req</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zone=mylimit</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="实例二-burst缓存处理" tabindex="-1">实例二 burst缓存处理 <a class="header-anchor" href="#实例二-burst缓存处理" aria-label="Permalink to &quot;实例二 burst缓存处理&quot;">​</a></h3><p>我们看到，我们短时间内发送了大量请求，Nginx按照毫秒级精度统计，超出限制的请求直接拒绝。这在实际场景中未免过于苛刻，真实网络环境中请求到来不是匀速的，很可能有请求“突发”的情况，也就是“一股子一股子”的。Nginx考虑到了这种情况，可以通过burst关键字开启对突发请求的缓存处理，而不是直接拒绝。 来看我们的配置：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">limit_req_zone</span><span style="color:#E1E4E8;"> $binary_remote_addr </span><span style="color:#9ECBFF;">zone=mylimit:10m</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rate=</span><span style="color:#79B8FF;">2</span><span style="color:#9ECBFF;">r/s</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">limit_req</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zone=mylimit</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">burst=</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">limit_req_zone</span><span style="color:#24292E;"> $binary_remote_addr </span><span style="color:#032F62;">zone=mylimit:10m</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rate=</span><span style="color:#005CC5;">2</span><span style="color:#032F62;">r/s</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">limit_req</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zone=mylimit</span><span style="color:#24292E;"> </span><span style="color:#032F62;">burst=</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们加入了burst=4，意思是每个key(此处是每个IP)最多允许4个突发请求的到来</p><h3 id="实例三-nodelay降低排队时间" tabindex="-1">实例三 nodelay降低排队时间 <a class="header-anchor" href="#实例三-nodelay降低排队时间" aria-label="Permalink to &quot;实例三 nodelay降低排队时间&quot;">​</a></h3><p>实例二中我们看到，通过设置burst参数，我们可以允许Nginx缓存处理一定程度的突发，多余的请求可以先放到队列里，慢慢处理，这起到了平滑流量的作用。但是如果队列设置的比较大，请求排队的时间就会比较长，用户角度看来就是RT变长了，这对用户很不友好。有什么解决办法呢？nodelay参数允许请求在排队的时候就立即被处理，也就是说只要请求能够进入burst队列，就会立即被后台worker处理，请注意，这意味着burst设置了nodelay时，系统瞬间的QPS可能会超过rate设置的阈值。nodelay参数要跟burst一起使用才有作用。</p><p>延续实例二的配置，我们加入nodelay选项：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">limit_req_zone</span><span style="color:#E1E4E8;"> $binary_remote_addr </span><span style="color:#9ECBFF;">zone=mylimit:10m</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rate=</span><span style="color:#79B8FF;">2</span><span style="color:#9ECBFF;">r/s</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">limit_req</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zone=mylimit</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">burst=</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nodelay</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">limit_req_zone</span><span style="color:#24292E;"> $binary_remote_addr </span><span style="color:#032F62;">zone=mylimit:10m</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rate=</span><span style="color:#005CC5;">2</span><span style="color:#032F62;">r/s</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">limit_req</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zone=mylimit</span><span style="color:#24292E;"> </span><span style="color:#032F62;">burst=</span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nodelay</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="示例四-自定义返回值" tabindex="-1">示例四 自定义返回值 <a class="header-anchor" href="#示例四-自定义返回值" aria-label="Permalink to &quot;示例四 自定义返回值&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">limit_req_zone</span><span style="color:#E1E4E8;"> $binary_remote_addr </span><span style="color:#9ECBFF;">zone=mylimit:10m</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rate=</span><span style="color:#79B8FF;">2</span><span style="color:#9ECBFF;">r/s</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">limit_req</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zone=mylimit</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">burst=</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nodelay</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">limit_req_status</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">598</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">limit_req_zone</span><span style="color:#24292E;"> $binary_remote_addr </span><span style="color:#032F62;">zone=mylimit:10m</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rate=</span><span style="color:#005CC5;">2</span><span style="color:#032F62;">r/s</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">limit_req</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zone=mylimit</span><span style="color:#24292E;"> </span><span style="color:#032F62;">burst=</span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nodelay</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">limit_req_status</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">598</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_5-白名单" tabindex="-1">5.白名单 <a class="header-anchor" href="#_5-白名单" aria-label="Permalink to &quot;5.白名单&quot;">​</a></h2><p>限流主要针对外部访问，内网访问相对安全，可以不做限流，通过设置白名单即可。利用 Nginx <a href="http://nginx.org/en/docs/http/ngx_http_geo_module.html" target="_blank" rel="noreferrer">ngx_http_geo_module</a> 和 <a href="http://nginx.org/en/docs/http/ngx_http_map_module.html" target="_blank" rel="noreferrer">ngx_http_map_module</a> 两个工具模块即可</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">在 nginx.conf 的 http 部分中配置白名单：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">geo $limit {</span></span>
<span class="line"><span style="color:#e1e4e8;"> default 1;</span></span>
<span class="line"><span style="color:#e1e4e8;"> 10.0.0.0/8 0;</span></span>
<span class="line"><span style="color:#e1e4e8;"> 192.168.0.0/24 0;</span></span>
<span class="line"><span style="color:#e1e4e8;"> 172.20.0.35 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">map $limit $limit_key {</span></span>
<span class="line"><span style="color:#e1e4e8;"> 0 &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"> 1 $binary_remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req_zone $limit_key zone=myRateLimit:10m rate=10r/s;</span></span>
<span class="line"><span style="color:#e1e4e8;">geo 对于白名单(子网或IP都可以) 将返回0，其他IP将返回1。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">map 将 limit **转换为** limit_key，如果是 $limit 是0(白名单)，则返回空字符串；如果是1，则返回客户端实际IP</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">在 nginx.conf 的 http 部分中配置白名单：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">geo $limit {</span></span>
<span class="line"><span style="color:#24292e;"> default 1;</span></span>
<span class="line"><span style="color:#24292e;"> 10.0.0.0/8 0;</span></span>
<span class="line"><span style="color:#24292e;"> 192.168.0.0/24 0;</span></span>
<span class="line"><span style="color:#24292e;"> 172.20.0.35 0;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">map $limit $limit_key {</span></span>
<span class="line"><span style="color:#24292e;"> 0 &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;"> 1 $binary_remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_req_zone $limit_key zone=myRateLimit:10m rate=10r/s;</span></span>
<span class="line"><span style="color:#24292e;">geo 对于白名单(子网或IP都可以) 将返回0，其他IP将返回1。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">map 将 limit **转换为** limit_key，如果是 $limit 是0(白名单)，则返回空字符串；如果是1，则返回客户端实际IP</span></span></code></pre></div><p>limit_req_zone 限流的key不再使用 $binary_remote_addr，而是 **limit_key 来动态获取值。如果是白名单，limit_req_zone 的限流key则为空字符串，将不会限流；若不是白名单，将会对客户端真实IP进行限流</p><h2 id="_6-下载限制" tabindex="-1">6.下载限制 <a class="header-anchor" href="#_6-下载限制" aria-label="Permalink to &quot;6.下载限制&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">在限制单个链接速度的同时，为了防止开大量链接分段下载，然后进行合并文件的情况提速，对并发的链接也做限制</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">   limit_conn_zone $binary_remote_addr zone=addr:10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">   ...</span></span>
<span class="line"><span style="color:#e1e4e8;">   server {</span></span>
<span class="line"><span style="color:#e1e4e8;">  ...</span></span>
<span class="line"><span style="color:#e1e4e8;">  location /download/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">      limit_conn addr 1; #通过这个限制链接数，单个ip最多的可连接数</span></span>
<span class="line"><span style="color:#e1e4e8;">      limit_rate 100k;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">在限制单个链接速度的同时，为了防止开大量链接分段下载，然后进行合并文件的情况提速，对并发的链接也做限制</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">   limit_conn_zone $binary_remote_addr zone=addr:10m;</span></span>
<span class="line"><span style="color:#24292e;">   ...</span></span>
<span class="line"><span style="color:#24292e;">   server {</span></span>
<span class="line"><span style="color:#24292e;">  ...</span></span>
<span class="line"><span style="color:#24292e;">  location /download/ {</span></span>
<span class="line"><span style="color:#24292e;">      limit_conn addr 1; #通过这个限制链接数，单个ip最多的可连接数</span></span>
<span class="line"><span style="color:#24292e;">      limit_rate 100k;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_7-防抓" tabindex="-1">7.防抓 <a class="header-anchor" href="#_7-防抓" aria-label="Permalink to &quot;7.防抓&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">geo $addr_req_whitelist {</span></span>
<span class="line"><span style="color:#e1e4e8;">        ranges;</span></span>
<span class="line"><span style="color:#e1e4e8;">        default 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">        111.206.171.51-111.206.171.51 1;     #360 bjmd proxy</span></span>
<span class="line"><span style="color:#e1e4e8;">        180.149.134.10-180.149.134.10 1;     #weibo.com verification peer</span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">        # --- 百度免流IP段 2018-03-13 --- #</span></span>
<span class="line"><span style="color:#e1e4e8;">        180.97.106.0-180.97.106.255 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    map $http_x_forwarded_for $clientRealIp {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;&quot; $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ~^(?P&lt;firstAddr&gt;[0-9.]+),?.*$ $firstAddr;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    map $clientRealIp $clientRealIp2C {</span></span>
<span class="line"><span style="color:#e1e4e8;">        ~^(?P&lt;ip2c&gt;[0-9]+.[0-9]+.[0-9]+).[0-9]+$ $ip2c;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    map $http_user_agent $dirtyUserAgent {</span></span>
<span class="line"><span style="color:#e1e4e8;">        default $msec;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ~^.*(?P&lt;userAgent&gt;Mb2345Browser/9.0).*$ $userAgent;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ~^.*(?P&lt;userAgent&gt;LieBaoFast/4.51.3).*$ $userAgent;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ~^.*(?P&lt;userAgent&gt;OPPOsA33sBuild/LMY47V).*$ $userAgent;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ~^.*(?P&lt;userAgent&gt;MicroMessenger/6.5.16).*$ $userAgent;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ~^.*(?P&lt;userAgent&gt;UpdateRankQ0003).*$ $userAgent;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    map $http_user_agent $test_map {</span></span>
<span class="line"><span style="color:#e1e4e8;">        default $clientRealIp;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ~^.*(?P&lt;userAgent&gt;KHTML,slikesGecko).*$ $userAgent;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    limit_req_whitelist geo_var_name=addr_req_whitelist geo_var_value=1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    #这是白名单用户</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    limit_conn_zone $clientRealIp zone=addr_conn_whitelist:10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    limit_req_zone $clientRealIp zone=addr_req_whitelist:10m rate=4r/s;</span></span>
<span class="line"><span style="color:#e1e4e8;">    #如果这个ip属于白名单里边那么可以执行 rate=4r/s（每秒4个请求）</span></span>
<span class="line"><span style="color:#e1e4e8;">    #定义一个名为 addr_req_whitelist 的limit_req_zone用来存储session，大小是10M内存，　</span></span>
<span class="line"><span style="color:#e1e4e8;">    #注释　zone=addr_req_whitelist  中的 addr_req_whitelist 和</span></span>
<span class="line"><span style="color:#e1e4e8;">　　#1M能存储16000个状态，rete的值必须为整数，</span></span>
<span class="line"><span style="color:#e1e4e8;">　　   </span></span>
<span class="line"><span style="color:#e1e4e8;">    limit_req_zone $clientRealIp $request_uri zone=addr_request_uri_req_whitelist:10m rate=2r/s;</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    limit_req_zone $clientRealIp2C zone=addr2c_req_whitelist:10m rate=4r/s;</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    limit_req_zone $dirtyUserAgent zone=user_agent_req_whitelist:10m rate=3r/m;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">geo $addr_req_whitelist {</span></span>
<span class="line"><span style="color:#24292e;">        ranges;</span></span>
<span class="line"><span style="color:#24292e;">        default 0;</span></span>
<span class="line"><span style="color:#24292e;">        111.206.171.51-111.206.171.51 1;     #360 bjmd proxy</span></span>
<span class="line"><span style="color:#24292e;">        180.149.134.10-180.149.134.10 1;     #weibo.com verification peer</span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">        # --- 百度免流IP段 2018-03-13 --- #</span></span>
<span class="line"><span style="color:#24292e;">        180.97.106.0-180.97.106.255 1;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    map $http_x_forwarded_for $clientRealIp {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;&quot; $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        ~^(?P&lt;firstAddr&gt;[0-9.]+),?.*$ $firstAddr;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    map $clientRealIp $clientRealIp2C {</span></span>
<span class="line"><span style="color:#24292e;">        ~^(?P&lt;ip2c&gt;[0-9]+.[0-9]+.[0-9]+).[0-9]+$ $ip2c;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    map $http_user_agent $dirtyUserAgent {</span></span>
<span class="line"><span style="color:#24292e;">        default $msec;</span></span>
<span class="line"><span style="color:#24292e;">        ~^.*(?P&lt;userAgent&gt;Mb2345Browser/9.0).*$ $userAgent;</span></span>
<span class="line"><span style="color:#24292e;">        ~^.*(?P&lt;userAgent&gt;LieBaoFast/4.51.3).*$ $userAgent;</span></span>
<span class="line"><span style="color:#24292e;">        ~^.*(?P&lt;userAgent&gt;OPPOsA33sBuild/LMY47V).*$ $userAgent;</span></span>
<span class="line"><span style="color:#24292e;">        ~^.*(?P&lt;userAgent&gt;MicroMessenger/6.5.16).*$ $userAgent;</span></span>
<span class="line"><span style="color:#24292e;">        ~^.*(?P&lt;userAgent&gt;UpdateRankQ0003).*$ $userAgent;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    map $http_user_agent $test_map {</span></span>
<span class="line"><span style="color:#24292e;">        default $clientRealIp;</span></span>
<span class="line"><span style="color:#24292e;">        ~^.*(?P&lt;userAgent&gt;KHTML,slikesGecko).*$ $userAgent;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    limit_req_whitelist geo_var_name=addr_req_whitelist geo_var_value=1;</span></span>
<span class="line"><span style="color:#24292e;">    #这是白名单用户</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    limit_conn_zone $clientRealIp zone=addr_conn_whitelist:10m;</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    limit_req_zone $clientRealIp zone=addr_req_whitelist:10m rate=4r/s;</span></span>
<span class="line"><span style="color:#24292e;">    #如果这个ip属于白名单里边那么可以执行 rate=4r/s（每秒4个请求）</span></span>
<span class="line"><span style="color:#24292e;">    #定义一个名为 addr_req_whitelist 的limit_req_zone用来存储session，大小是10M内存，　</span></span>
<span class="line"><span style="color:#24292e;">    #注释　zone=addr_req_whitelist  中的 addr_req_whitelist 和</span></span>
<span class="line"><span style="color:#24292e;">　　#1M能存储16000个状态，rete的值必须为整数，</span></span>
<span class="line"><span style="color:#24292e;">　　   </span></span>
<span class="line"><span style="color:#24292e;">    limit_req_zone $clientRealIp $request_uri zone=addr_request_uri_req_whitelist:10m rate=2r/s;</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    limit_req_zone $clientRealIp2C zone=addr2c_req_whitelist:10m rate=4r/s;</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    limit_req_zone $dirtyUserAgent zone=user_agent_req_whitelist:10m rate=3r/m;</span></span></code></pre></div><h2 id="_8-生产配置" tabindex="-1">8.生产配置 <a class="header-anchor" href="#_8-生产配置" aria-label="Permalink to &quot;8.生产配置&quot;">​</a></h2><p>rate值不能低于并发的请求数，如果低于并发的情求数，会导致用户不能正常访问页面</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">	##1M能存储16000个状态，rete的值必须为整数</span></span>
<span class="line"><span style="color:#e1e4e8;">	limit_req_zone $binary_remote_addr zone=reqperip:20m rate=20r/s;</span></span>
<span class="line"><span style="color:#e1e4e8;">	limit_req_status 444; #默认是503</span></span>
<span class="line"><span style="color:#e1e4e8;">	limit_req_log_level error;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">	limit_req zone=reqperip burst=10 nodelay;</span></span>
<span class="line"><span style="color:#e1e4e8;">	</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">	##1M能存储16000个状态，rete的值必须为整数</span></span>
<span class="line"><span style="color:#24292e;">	limit_req_zone $binary_remote_addr zone=reqperip:20m rate=20r/s;</span></span>
<span class="line"><span style="color:#24292e;">	limit_req_status 444; #默认是503</span></span>
<span class="line"><span style="color:#24292e;">	limit_req_log_level error;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">	limit_req zone=reqperip burst=10 nodelay;</span></span>
<span class="line"><span style="color:#24292e;">	</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="同一时间连接数" tabindex="-1">同一时间连接数 <a class="header-anchor" href="#同一时间连接数" aria-label="Permalink to &quot;同一时间连接数&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#limit_conn_zone：限制并发连接数，即同一时间连接数</span></span>
<span class="line"><span style="color:#e1e4e8;">#设置一个自定义名字（perip）,大小为10M的缓存空间，$binary_remote_addr表示以每个IP地址来限制</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn_zone $binary_remote_addr zone=perip:10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">#设置一个自定义名字（perserver）,大小为10M的缓存空间，$server_name表示以server来限制</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_conn_zone $server_name zone=perserver:10m;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">server</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    limit_conn perip 2;  #每个ip的并发连接数</span></span>
<span class="line"><span style="color:#e1e4e8;">    limit_conn perserver 20; #server总并发连接数</span></span>
<span class="line"><span style="color:#e1e4e8;">    limit_rate 1024k;#限制下载速度；</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#limit_conn_zone：限制并发连接数，即同一时间连接数</span></span>
<span class="line"><span style="color:#24292e;">#设置一个自定义名字（perip）,大小为10M的缓存空间，$binary_remote_addr表示以每个IP地址来限制</span></span>
<span class="line"><span style="color:#24292e;">limit_conn_zone $binary_remote_addr zone=perip:10m;</span></span>
<span class="line"><span style="color:#24292e;">#设置一个自定义名字（perserver）,大小为10M的缓存空间，$server_name表示以server来限制</span></span>
<span class="line"><span style="color:#24292e;">limit_conn_zone $server_name zone=perserver:10m;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">server</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    limit_conn perip 2;  #每个ip的并发连接数</span></span>
<span class="line"><span style="color:#24292e;">    limit_conn perserver 20; #server总并发连接数</span></span>
<span class="line"><span style="color:#24292e;">    limit_rate 1024k;#限制下载速度；</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="单位时间内的请求数" tabindex="-1">单位时间内的请求数 <a class="header-anchor" href="#单位时间内的请求数" aria-label="Permalink to &quot;单位时间内的请求数&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">####</span></span>
<span class="line"><span style="color:#e1e4e8;">#limit_req_zone：限制单位时间内的请求数</span></span>
<span class="line"><span style="color:#e1e4e8;">#设置一个自定义名字（perip）,大小为10M的缓存空间，每个IP地址，每秒接受1个请求</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req_zone $binary_remote_addr zone=perip:10m rate=1r/s;</span></span>
<span class="line"><span style="color:#e1e4e8;">#设置一个自定义名字（perserver）,大小为10M的缓存空间，server，每秒接受10个请求</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req_zone $server_name zone=perserver:10m rate=10r/s;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">server</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">     #单个IP的请求数，burst：缓冲队列的长度，nodelay：大于缓冲长度的將直接503，不设置nodelay则会排队等待</span></span>
<span class="line"><span style="color:#e1e4e8;">    limit_req zone=perip burst=5 nodelay; </span></span>
<span class="line"><span style="color:#e1e4e8;">    limit_req zone=perserver burst=10; #总请求数</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">####</span></span>
<span class="line"><span style="color:#24292e;">#limit_req_zone：限制单位时间内的请求数</span></span>
<span class="line"><span style="color:#24292e;">#设置一个自定义名字（perip）,大小为10M的缓存空间，每个IP地址，每秒接受1个请求</span></span>
<span class="line"><span style="color:#24292e;">limit_req_zone $binary_remote_addr zone=perip:10m rate=1r/s;</span></span>
<span class="line"><span style="color:#24292e;">#设置一个自定义名字（perserver）,大小为10M的缓存空间，server，每秒接受10个请求</span></span>
<span class="line"><span style="color:#24292e;">limit_req_zone $server_name zone=perserver:10m rate=10r/s;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">server</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">     #单个IP的请求数，burst：缓冲队列的长度，nodelay：大于缓冲长度的將直接503，不设置nodelay则会排队等待</span></span>
<span class="line"><span style="color:#24292e;">    limit_req zone=perip burst=5 nodelay; </span></span>
<span class="line"><span style="color:#24292e;">    limit_req zone=perserver burst=10; #总请求数</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="url-cookie" tabindex="-1">url+cookie <a class="header-anchor" href="#url-cookie" aria-label="Permalink to &quot;url+cookie&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">limit_req_zone $ip  zone=1:10m  rate=100r/s;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req_zone $uri$ip  zone=2:10m  rate=100r/s;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req_zone $uri$ip$cookie  zone=3:10m  rate=100r/s;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req zone=1  burst=30  nodelay;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req zone=2 burst=10   nodelay;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">limit_req zone=3 burst=30   nodelay;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">limit_req_zone $ip  zone=1:10m  rate=100r/s;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_req_zone $uri$ip  zone=2:10m  rate=100r/s;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_req_zone $uri$ip$cookie  zone=3:10m  rate=100r/s;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_req zone=1  burst=30  nodelay;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_req zone=2 burst=10   nodelay;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">limit_req zone=3 burst=30   nodelay;</span></span></code></pre></div>`,85),r=[t];function c(i,y,E,d,_,F){return n(),a("div",null,r)}const u=s(o,[["render",c]]);export{h as __pageData,u as default};
