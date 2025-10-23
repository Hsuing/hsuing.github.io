import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const l="/assets/load.JvTPjqKN.png",_=JSON.parse('{"title":"总共方法","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/loadBalance/3-load.md","filePath":"guide/Linux/web/nginx/loadBalance/3-load.md","lastUpdated":1701928035000}'),p={name:"guide/Linux/web/nginx/loadBalance/3-load.md"},o=e('<h1 id="总共方法" tabindex="-1">总共方法 <a class="header-anchor" href="#总共方法" aria-label="Permalink to &quot;总共方法&quot;">​</a></h1><p><img src="'+l+`" alt="负载方式"></p><ul><li>轮询（默认）每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除</li><li>weight 指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况</li><li>ip_hash</li><li>url_hash</li><li>fair</li></ul><p>4种典型方式：轮询方式、权重方式、ip_hash方式、第三方模块方式</p><h2 id="_1-1-轮询" tabindex="-1">1.1 轮询 <a class="header-anchor" href="#_1-1-轮询" aria-label="Permalink to &quot;1.1 轮询&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">按照默认轮询的方式进行负载，</span></span>
<span class="line"><span style="color:#e1e4e8;">假设后端server down掉，能自己剔除。</span></span>
<span class="line"><span style="color:#e1e4e8;">缺点：可靠性地，负载不均衡，机器性能可能不一致</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">upstream backserver {</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 192.168.0.14;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 192.168.0.15;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">按照默认轮询的方式进行负载，</span></span>
<span class="line"><span style="color:#24292e;">假设后端server down掉，能自己剔除。</span></span>
<span class="line"><span style="color:#24292e;">缺点：可靠性地，负载不均衡，机器性能可能不一致</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">upstream backserver {</span></span>
<span class="line"><span style="color:#24292e;">    server 192.168.0.14;</span></span>
<span class="line"><span style="color:#24292e;">    server 192.168.0.15;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>轮询参数</li></ul><table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>fail_timeout</td><td>与max_fails结合使用</td></tr><tr><td>max_fails</td><td>设置在fail_timeout参数设置的时间内最大失败次数，如果在这个时间内，所有针对该服务器的请求都失败了，那么认为该服务器会被认为是停机了</td></tr><tr><td>fail_time</td><td>服务器会被认为停机的时间长度,默认为10s</td></tr><tr><td>backup</td><td>标记该服务器为备用服务器。当主服务器停止时，请求会被发送到它这里</td></tr><tr><td>down</td><td>标记服务器永久停机</td></tr></tbody></table><blockquote><p>[!TIP]注意： 在轮询中，如果服务器down掉了，会自动剔除该服务器。</p></blockquote><blockquote><p>缺省配置就是轮询策略。</p></blockquote><blockquote><p>此策略适合服务器配置相当，无状态且短平快的服务使用</p></blockquote><h2 id="_1-2-weight-权重方式" tabindex="-1">1.2 weight 权重方式 <a class="header-anchor" href="#_1-2-weight-权重方式" aria-label="Permalink to &quot;1.2 weight 权重方式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">考虑1和2的机器配置低，或者1和2的性能不如3的时候</span></span>
<span class="line"><span style="color:#e1e4e8;">这样将3的权重设置大一些，更多的请求会被分配到3上。</span></span>
<span class="line"><span style="color:#e1e4e8;">为1和2分担更多的请求。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">upstream backserver {</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 192.168.0.14 weight=3;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 192.168.0.15 weight=7;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">权重越高，在被访问的概率越大，如上例，分别是30%，70%</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">考虑1和2的机器配置低，或者1和2的性能不如3的时候</span></span>
<span class="line"><span style="color:#24292e;">这样将3的权重设置大一些，更多的请求会被分配到3上。</span></span>
<span class="line"><span style="color:#24292e;">为1和2分担更多的请求。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">upstream backserver {</span></span>
<span class="line"><span style="color:#24292e;">    server 192.168.0.14 weight=3;</span></span>
<span class="line"><span style="color:#24292e;">    server 192.168.0.15 weight=7;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">权重越高，在被访问的概率越大，如上例，分别是30%，70%</span></span></code></pre></div><h2 id="_1-3-ip-hash-依据ip分配方式" tabindex="-1">1.3 ip_hash 依据ip分配方式 <a class="header-anchor" href="#_1-3-ip-hash-依据ip分配方式" aria-label="Permalink to &quot;1.3 ip_hash 依据ip分配方式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">这里的IP说的是客户端的出口IP，这样经过 des_server_ip = hash(ip)</span></span>
<span class="line"><span style="color:#e1e4e8;">相应的ip在没有down掉的情况下，肯定会hash到固定的ip上</span></span>
<span class="line"><span style="color:#e1e4e8;">当有服务器需要剔除，必须手动down掉</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">upstream backserver {</span></span>
<span class="line"><span style="color:#e1e4e8;">    ip_hash;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 192.168.0.14:88;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 192.168.0.15:80;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在负载均衡系统中，假如用户在某台服务器上登录了，那么该用户第二次请求的时候，因为我们是负载均衡系统，每次请求都会重新定位到服务器集群中的某一个，那么已经登录某一个服务器的用户再重新定位到另一个服务器，其登录信息将会丢失，这样显然是不妥的。</span></span>
<span class="line"><span style="color:#e1e4e8;">我们可以采用ip_hash指令解决这个问题，如果客户已经访问了某个服务器，当用户再次访问时，会将该请求通过哈希算法，自动定位到该服务器。</span></span>
<span class="line"><span style="color:#e1e4e8;">每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">这里的IP说的是客户端的出口IP，这样经过 des_server_ip = hash(ip)</span></span>
<span class="line"><span style="color:#24292e;">相应的ip在没有down掉的情况下，肯定会hash到固定的ip上</span></span>
<span class="line"><span style="color:#24292e;">当有服务器需要剔除，必须手动down掉</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">upstream backserver {</span></span>
<span class="line"><span style="color:#24292e;">    ip_hash;</span></span>
<span class="line"><span style="color:#24292e;">    server 192.168.0.14:88;</span></span>
<span class="line"><span style="color:#24292e;">    server 192.168.0.15:80;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在负载均衡系统中，假如用户在某台服务器上登录了，那么该用户第二次请求的时候，因为我们是负载均衡系统，每次请求都会重新定位到服务器集群中的某一个，那么已经登录某一个服务器的用户再重新定位到另一个服务器，其登录信息将会丢失，这样显然是不妥的。</span></span>
<span class="line"><span style="color:#24292e;">我们可以采用ip_hash指令解决这个问题，如果客户已经访问了某个服务器，当用户再次访问时，会将该请求通过哈希算法，自动定位到该服务器。</span></span>
<span class="line"><span style="color:#24292e;">每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题</span></span></code></pre></div><h2 id="_1-4-fair-第三方" tabindex="-1">1.4 fair （第三方） <a class="header-anchor" href="#_1-4-fair-第三方" aria-label="Permalink to &quot;1.4 fair （第三方）&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">性能，相应时间分派：</span></span>
<span class="line"><span style="color:#e1e4e8;">按后端服务器的响应时间来分配请求。响应时间短的优先分配</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">upstream backserver {</span></span>
<span class="line"><span style="color:#e1e4e8;">    server server1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server server2;</span></span>
<span class="line"><span style="color:#e1e4e8;">    fair;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">性能，相应时间分派：</span></span>
<span class="line"><span style="color:#24292e;">按后端服务器的响应时间来分配请求。响应时间短的优先分配</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">upstream backserver {</span></span>
<span class="line"><span style="color:#24292e;">    server server1;</span></span>
<span class="line"><span style="color:#24292e;">    server server2;</span></span>
<span class="line"><span style="color:#24292e;">    fair;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_1-5-url-hash-第三方" tabindex="-1">1.5 url_hash（第三方） <a class="header-anchor" href="#_1-5-url-hash-第三方" aria-label="Permalink to &quot;1.5 url_hash（第三方）&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">按访问url的hash结果来分配请求，使每个url定向到同一个（对应的）后端服务器，后端服务器为缓存时比较有效</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">upstream urlhash { </span></span>
<span class="line"><span style="color:#e1e4e8;">    server 127.0.0.1:8080; </span></span>
<span class="line"><span style="color:#e1e4e8;">    server 127.0.0.2:7080; </span></span>
<span class="line"><span style="color:#e1e4e8;">    server 127.0.0.3:6305; </span></span>
<span class="line"><span style="color:#e1e4e8;">    hash $request_uri; </span></span>
<span class="line"><span style="color:#e1e4e8;">    hash_method crc32; </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">按照URI进行哈希，固定的URI Hash到固定的server上</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">按访问url的hash结果来分配请求，使每个url定向到同一个（对应的）后端服务器，后端服务器为缓存时比较有效</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">upstream urlhash { </span></span>
<span class="line"><span style="color:#24292e;">    server 127.0.0.1:8080; </span></span>
<span class="line"><span style="color:#24292e;">    server 127.0.0.2:7080; </span></span>
<span class="line"><span style="color:#24292e;">    server 127.0.0.3:6305; </span></span>
<span class="line"><span style="color:#24292e;">    hash $request_uri; </span></span>
<span class="line"><span style="color:#24292e;">    hash_method crc32; </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">按照URI进行哈希，固定的URI Hash到固定的server上</span></span></code></pre></div><h2 id="_1-6-least-conn-最少连接方式" tabindex="-1">1.6 least_conn 最少连接方式 <a class="header-anchor" href="#_1-6-least-conn-最少连接方式" aria-label="Permalink to &quot;1.6 least_conn 最少连接方式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">把请求转发给连接数较少的后端服务器。轮询算法是把请求平均的转发给各个后端，使它们的负载大致相同；但是，有些请求占用的时间很长，会导致其所在的后端负载较高。这种情况下，least_conn这种方式就可以达到更好的负载均衡效果</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> upstream dynamic {</span></span>
<span class="line"><span style="color:#e1e4e8;">        least_conn;    #把请求转发给连接数较少的后端服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">        server localhost:8080   weight=2;  #tomcat 7.0</span></span>
<span class="line"><span style="color:#e1e4e8;">        server localhost:8081;  #tomcat 8.0</span></span>
<span class="line"><span style="color:#e1e4e8;">        server localhost:8082 backup;  #tomcat 8.5</span></span>
<span class="line"><span style="color:#e1e4e8;">        server localhost:8083   max_fails=3 fail_timeout=20s;  #tomcat 9.0</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">把请求转发给连接数较少的后端服务器。轮询算法是把请求平均的转发给各个后端，使它们的负载大致相同；但是，有些请求占用的时间很长，会导致其所在的后端负载较高。这种情况下，least_conn这种方式就可以达到更好的负载均衡效果</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> upstream dynamic {</span></span>
<span class="line"><span style="color:#24292e;">        least_conn;    #把请求转发给连接数较少的后端服务器</span></span>
<span class="line"><span style="color:#24292e;">        server localhost:8080   weight=2;  #tomcat 7.0</span></span>
<span class="line"><span style="color:#24292e;">        server localhost:8081;  #tomcat 8.0</span></span>
<span class="line"><span style="color:#24292e;">        server localhost:8082 backup;  #tomcat 8.5</span></span>
<span class="line"><span style="color:#24292e;">        server localhost:8083   max_fails=3 fail_timeout=20s;  #tomcat 9.0</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><blockquote><p>[!TIP]注意： 此负载均衡策略适合请求处理时间长短不一造成服务器过载的情况</p></blockquote>`,22),c=[o];function t(r,i,h,d,y,u){return a(),n("div",null,c)}const b=s(p,[["render",t]]);export{_ as __pageData,b as default};
