import{_ as n,D as a,o as e,c as l,I as p,w as o,R as c,a as t}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/灰度/Openresty+Lua+Redis灰度发布.md","filePath":"guide/Linux/web/nginx/灰度/Openresty+Lua+Redis灰度发布.md","lastUpdated":1701928035000}'),i={name:"guide/Linux/web/nginx/灰度/Openresty+Lua+Redis灰度发布.md"},r=c(`<p>   灰度发布，简单来说，就是根据各种条件，让一部分用户使用旧版本，另一部分用户使用新版本。百度百科中解释：灰度发布是指在黑与白之间，能够平滑过渡的一种发布方式。AB test就是一种灰度发布方式，让一部分用户继续用A，一部分用户开始用B，如果用户对B没有什么反对意见，那么逐步扩大范围，把所有用户都迁移到B上面 来。灰度发布可以保证整体系统的稳定，在初始灰度的时候就可以发现、调整问题，以保证其影响度。上述描述的灰度方案A和B需要等量的服务器，这里我们所做的灰度发布稍作改变：用1-2台机器作为B，B测试成功再部署A。用于WEB系统新代码的测试发布，让一部分（IP）用户访问新版本，一部分用户仍然访问正常版本，原理如图:</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312071118025.jpg" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">执行过程：</span></span>
<span class="line"><span style="color:#e1e4e8;">1、当用户请求到达前端web（代理）服务器Openresty，内嵌的lua模块解析Nginx配置文件中的lua脚本代码；</span></span>
<span class="line"><span style="color:#e1e4e8;">2、Lua获取客户端IP地址，去查询Redis中是否有该键值，如果有返回值执行@clien2，否则执行@client1。</span></span>
<span class="line"><span style="color:#e1e4e8;">3、Location @client2把请求转发给预发布服务器，location @client1把请求转发给生产服务器，服务器返回结果，整个过程完成</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">执行过程：</span></span>
<span class="line"><span style="color:#24292e;">1、当用户请求到达前端web（代理）服务器Openresty，内嵌的lua模块解析Nginx配置文件中的lua脚本代码；</span></span>
<span class="line"><span style="color:#24292e;">2、Lua获取客户端IP地址，去查询Redis中是否有该键值，如果有返回值执行@clien2，否则执行@client1。</span></span>
<span class="line"><span style="color:#24292e;">3、Location @client2把请求转发给预发布服务器，location @client1把请求转发给生产服务器，服务器返回结果，整个过程完成</span></span></code></pre></div><h2 id="_1-1-nginx-lua-redis" tabindex="-1">1.1 nginx+lua+redis <a class="header-anchor" href="#_1-1-nginx-lua-redis" aria-label="Permalink to &quot;1.1 nginx+lua+redis&quot;">​</a></h2><blockquote><p>nginx 整合lua 省略</p></blockquote><ul><li>为lua添加resty-redis模块，使lua可以连接redis</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#下载resty-redis</span></span>
<span class="line"><span style="color:#e1e4e8;">https://github.com/Hsuing/lua-resty-redis.git</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#配置nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">http 区域</span></span>
<span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">    。。。</span></span>
<span class="line"><span style="color:#e1e4e8;">    lua_package_path &quot;/data/apps/nginx/conf/lua/redis.lua;;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ cat redis.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">upstream client1 { </span></span>
<span class="line"><span style="color:#e1e4e8;">        server 127.0.0.1:8080;  #模拟生产服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">upstream client2 {</span></span>
<span class="line"><span style="color:#e1e4e8;">        server 127.0.0.1:8090;  #模拟预发布服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen       8081;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server_name  localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">location /lua_redis {</span></span>
<span class="line"><span style="color:#e1e4e8;">        default_type text/plain;</span></span>
<span class="line"><span style="color:#e1e4e8;">        content_by_lua_file /data/apps/nginx/conf/lua/redis_test.lua;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        location /test {</span></span>
<span class="line"><span style="color:#e1e4e8;">            content_by_lua_file /data/apps/nginx/conf/lua/huidu.lua;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">        location @client1 {</span></span>
<span class="line"><span style="color:#e1e4e8;">		include /data/apps/nginx/conf/lua/huidu_proxy.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_pass http://client1;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        location @client2 {</span></span>
<span class="line"><span style="color:#e1e4e8;">		include /data/apps/nginx/conf/lua/huidu_proxy.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_pass http://client2;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">	access_log /var/log/nginx/huidu.log es;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#proxy.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">$ cat huidu_proxy.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">			proxy_next_upstream    error timeout;</span></span>
<span class="line"><span style="color:#e1e4e8;">			proxy_redirect          off;</span></span>
<span class="line"><span style="color:#e1e4e8;">			proxy_set_header        Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">			#proxy_set_header        X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">			proxy_set_header        X-Real-IP $http_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">			proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">			client_max_body_size    100m;</span></span>
<span class="line"><span style="color:#e1e4e8;">			client_body_buffer_size 256k;</span></span>
<span class="line"><span style="color:#e1e4e8;">			proxy_connect_timeout  180;</span></span>
<span class="line"><span style="color:#e1e4e8;">			proxy_send_timeout      180;</span></span>
<span class="line"><span style="color:#e1e4e8;">			proxy_read_timeout      180;</span></span>
<span class="line"><span style="color:#e1e4e8;">			proxy_buffer_size      8k;</span></span>
<span class="line"><span style="color:#e1e4e8;">			proxy_buffers          8 64k;</span></span>
<span class="line"><span style="color:#e1e4e8;">			proxy_busy_buffers_size 128k;</span></span>
<span class="line"><span style="color:#e1e4e8;">			proxy_temp_file_write_size 128k</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#下载resty-redis</span></span>
<span class="line"><span style="color:#24292e;">https://github.com/Hsuing/lua-resty-redis.git</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#配置nginx</span></span>
<span class="line"><span style="color:#24292e;">http 区域</span></span>
<span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">    。。。</span></span>
<span class="line"><span style="color:#24292e;">    lua_package_path &quot;/data/apps/nginx/conf/lua/redis.lua;;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ cat redis.conf </span></span>
<span class="line"><span style="color:#24292e;">upstream client1 { </span></span>
<span class="line"><span style="color:#24292e;">        server 127.0.0.1:8080;  #模拟生产服务器</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">upstream client2 {</span></span>
<span class="line"><span style="color:#24292e;">        server 127.0.0.1:8090;  #模拟预发布服务器</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">        listen       8081;</span></span>
<span class="line"><span style="color:#24292e;">        server_name  localhost;</span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">location /lua_redis {</span></span>
<span class="line"><span style="color:#24292e;">        default_type text/plain;</span></span>
<span class="line"><span style="color:#24292e;">        content_by_lua_file /data/apps/nginx/conf/lua/redis_test.lua;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        location /test {</span></span>
<span class="line"><span style="color:#24292e;">            content_by_lua_file /data/apps/nginx/conf/lua/huidu.lua;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">        location @client1 {</span></span>
<span class="line"><span style="color:#24292e;">		include /data/apps/nginx/conf/lua/huidu_proxy.conf;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_pass http://client1;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        location @client2 {</span></span>
<span class="line"><span style="color:#24292e;">		include /data/apps/nginx/conf/lua/huidu_proxy.conf;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_pass http://client2;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">	access_log /var/log/nginx/huidu.log es;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#proxy.conf</span></span>
<span class="line"><span style="color:#24292e;">$ cat huidu_proxy.conf </span></span>
<span class="line"><span style="color:#24292e;">			proxy_next_upstream    error timeout;</span></span>
<span class="line"><span style="color:#24292e;">			proxy_redirect          off;</span></span>
<span class="line"><span style="color:#24292e;">			proxy_set_header        Host $host;</span></span>
<span class="line"><span style="color:#24292e;">			#proxy_set_header        X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">			proxy_set_header        X-Real-IP $http_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">			proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">			client_max_body_size    100m;</span></span>
<span class="line"><span style="color:#24292e;">			client_body_buffer_size 256k;</span></span>
<span class="line"><span style="color:#24292e;">			proxy_connect_timeout  180;</span></span>
<span class="line"><span style="color:#24292e;">			proxy_send_timeout      180;</span></span>
<span class="line"><span style="color:#24292e;">			proxy_read_timeout      180;</span></span>
<span class="line"><span style="color:#24292e;">			proxy_buffer_size      8k;</span></span>
<span class="line"><span style="color:#24292e;">			proxy_buffers          8 64k;</span></span>
<span class="line"><span style="color:#24292e;">			proxy_busy_buffers_size 128k;</span></span>
<span class="line"><span style="color:#24292e;">			proxy_temp_file_write_size 128k</span></span></code></pre></div><ul><li>huidu.lua, 根据ip</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ cat huidu.lua </span></span>
<span class="line"><span style="color:#e1e4e8;">local redis = require &quot;resty.redis&quot; </span></span>
<span class="line"><span style="color:#e1e4e8;">local cache = redis.new() </span></span>
<span class="line"><span style="color:#e1e4e8;">cache:set_timeout(60000)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">local ok, err = cache.connect(cache, &#39;127.0.0.1&#39;, 6379) </span></span>
<span class="line"><span style="color:#e1e4e8;">if not ok then </span></span>
<span class="line"><span style="color:#e1e4e8;">    ngx.say(&quot;failed to connect:&quot;, err) </span></span>
<span class="line"><span style="color:#e1e4e8;">    return </span></span>
<span class="line"><span style="color:#e1e4e8;">end </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">local red, err = cache:auth(&quot;foobared&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">if not red then</span></span>
<span class="line"><span style="color:#e1e4e8;">    ngx.say(&quot;failed to authenticate: &quot;, err)</span></span>
<span class="line"><span style="color:#e1e4e8;">    return</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">local local_ip = ngx.req.get_headers()[&quot;X-Real-IP&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">if local_ip == nil then</span></span>
<span class="line"><span style="color:#e1e4e8;">    local_ip = ngx.req.get_headers()[&quot;x_forwarded_for&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if local_ip == nil then</span></span>
<span class="line"><span style="color:#e1e4e8;">    local_ip = ngx.var.remote_addr</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;">--ngx.say(&quot;local_ip is : &quot;, local_ip)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">local intercept = cache:get(local_ip) </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if intercept == local_ip then</span></span>
<span class="line"><span style="color:#e1e4e8;">    ngx.exec(&quot;@client2&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    return</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ngx.exec(&quot;@client1&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">local ok, err = cache:close() </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">if not ok then </span></span>
<span class="line"><span style="color:#e1e4e8;">    ngx.say(&quot;failed to close:&quot;, err) </span></span>
<span class="line"><span style="color:#e1e4e8;">    return </span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ cat huidu.lua </span></span>
<span class="line"><span style="color:#24292e;">local redis = require &quot;resty.redis&quot; </span></span>
<span class="line"><span style="color:#24292e;">local cache = redis.new() </span></span>
<span class="line"><span style="color:#24292e;">cache:set_timeout(60000)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">local ok, err = cache.connect(cache, &#39;127.0.0.1&#39;, 6379) </span></span>
<span class="line"><span style="color:#24292e;">if not ok then </span></span>
<span class="line"><span style="color:#24292e;">    ngx.say(&quot;failed to connect:&quot;, err) </span></span>
<span class="line"><span style="color:#24292e;">    return </span></span>
<span class="line"><span style="color:#24292e;">end </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">local red, err = cache:auth(&quot;foobared&quot;)</span></span>
<span class="line"><span style="color:#24292e;">if not red then</span></span>
<span class="line"><span style="color:#24292e;">    ngx.say(&quot;failed to authenticate: &quot;, err)</span></span>
<span class="line"><span style="color:#24292e;">    return</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">local local_ip = ngx.req.get_headers()[&quot;X-Real-IP&quot;]</span></span>
<span class="line"><span style="color:#24292e;">if local_ip == nil then</span></span>
<span class="line"><span style="color:#24292e;">    local_ip = ngx.req.get_headers()[&quot;x_forwarded_for&quot;]</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if local_ip == nil then</span></span>
<span class="line"><span style="color:#24292e;">    local_ip = ngx.var.remote_addr</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;">--ngx.say(&quot;local_ip is : &quot;, local_ip)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">local intercept = cache:get(local_ip) </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if intercept == local_ip then</span></span>
<span class="line"><span style="color:#24292e;">    ngx.exec(&quot;@client2&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    return</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ngx.exec(&quot;@client1&quot;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">local ok, err = cache:close() </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">if not ok then </span></span>
<span class="line"><span style="color:#24292e;">    ngx.say(&quot;failed to close:&quot;, err) </span></span>
<span class="line"><span style="color:#24292e;">    return </span></span>
<span class="line"><span style="color:#24292e;">end</span></span></code></pre></div><ul><li>测试lua 链接redis</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ cat redis_test.lua </span></span>
<span class="line"><span style="color:#e1e4e8;">local redis = require &quot;resty.redis&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">local cache = redis.new()</span></span>
<span class="line"><span style="color:#e1e4e8;">cache.connect(cache, &#39;127.0.0.1&#39;, &#39;6379&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">local res = cache:get(&quot;foo&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">if res==ngx.null then</span></span>
<span class="line"><span style="color:#e1e4e8;">    ngx.say(&quot;This is Null&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    return</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;">ngx.say(res)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ cat redis_test.lua </span></span>
<span class="line"><span style="color:#24292e;">local redis = require &quot;resty.redis&quot;</span></span>
<span class="line"><span style="color:#24292e;">local cache = redis.new()</span></span>
<span class="line"><span style="color:#24292e;">cache.connect(cache, &#39;127.0.0.1&#39;, &#39;6379&#39;)</span></span>
<span class="line"><span style="color:#24292e;">local res = cache:get(&quot;foo&quot;)</span></span>
<span class="line"><span style="color:#24292e;">if res==ngx.null then</span></span>
<span class="line"><span style="color:#24292e;">    ngx.say(&quot;This is Null&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    return</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;">ngx.say(res)</span></span></code></pre></div><p>访问<a href="http://192.168.0.137:8081/lua_redis" target="_blank" rel="noreferrer">http://192.168.0.137:8081/lua_redis</a></p><ul><li>配置nginxweb环境</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ tree html </span></span>
<span class="line"><span style="color:#e1e4e8;">html</span></span>
<span class="line"><span style="color:#e1e4e8;">├── 50x.html</span></span>
<span class="line"><span style="color:#e1e4e8;">├── huidu2</span></span>
<span class="line"><span style="color:#e1e4e8;">│?? ├── index.html</span></span>
<span class="line"><span style="color:#e1e4e8;">│?? └── test</span></span>
<span class="line"><span style="color:#e1e4e8;">│??     ├── iisstart.png</span></span>
<span class="line"><span style="color:#e1e4e8;">│??     └── index.html</span></span>
<span class="line"><span style="color:#e1e4e8;">├── index.html</span></span>
<span class="line"><span style="color:#e1e4e8;">└── test</span></span>
<span class="line"><span style="color:#e1e4e8;">    ├── index.html</span></span>
<span class="line"><span style="color:#e1e4e8;">    └── logo.png</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3 directories, 7 files</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#nginx1 8080</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">root@free:/data/apps/nginx/conf/vhost# cat test1.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name 127.0.0.1;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">	root html;</span></span>
<span class="line"><span style="color:#e1e4e8;">   	index index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#nginx2 8090 prod</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">root@free:/data/apps/nginx/conf/vhost# cat test2.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 8090;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name 127.0.0.1;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">	root html/huidu2;</span></span>
<span class="line"><span style="color:#e1e4e8;">   	index index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ tree html </span></span>
<span class="line"><span style="color:#24292e;">html</span></span>
<span class="line"><span style="color:#24292e;">├── 50x.html</span></span>
<span class="line"><span style="color:#24292e;">├── huidu2</span></span>
<span class="line"><span style="color:#24292e;">│?? ├── index.html</span></span>
<span class="line"><span style="color:#24292e;">│?? └── test</span></span>
<span class="line"><span style="color:#24292e;">│??     ├── iisstart.png</span></span>
<span class="line"><span style="color:#24292e;">│??     └── index.html</span></span>
<span class="line"><span style="color:#24292e;">├── index.html</span></span>
<span class="line"><span style="color:#24292e;">└── test</span></span>
<span class="line"><span style="color:#24292e;">    ├── index.html</span></span>
<span class="line"><span style="color:#24292e;">    └── logo.png</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3 directories, 7 files</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#nginx1 8080</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">root@free:/data/apps/nginx/conf/vhost# cat test1.conf </span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 8080;</span></span>
<span class="line"><span style="color:#24292e;">    server_name 127.0.0.1;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">	root html;</span></span>
<span class="line"><span style="color:#24292e;">   	index index.html;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#nginx2 8090 prod</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">root@free:/data/apps/nginx/conf/vhost# cat test2.conf </span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 8090;</span></span>
<span class="line"><span style="color:#24292e;">    server_name 127.0.0.1;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">	root html/huidu2;</span></span>
<span class="line"><span style="color:#24292e;">   	index index.html;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="配置redis" tabindex="-1">配置redis <a class="header-anchor" href="#配置redis" aria-label="Permalink to &quot;配置redis&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@free:/data/apps/nginx# redis-cli -h 127.0.0.1 -p 6379 -a foobared</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:6379&gt; set 192.168.0.137 192.168.0.137</span></span>
<span class="line"><span style="color:#e1e4e8;">OK</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:6379&gt; set 192.168.0.174 192.168.0.174</span></span>
<span class="line"><span style="color:#e1e4e8;">OK</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#注意：</span></span>
<span class="line"><span style="color:#e1e4e8;">    最好保证key 和value 保持一致</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@free:/data/apps/nginx# redis-cli -h 127.0.0.1 -p 6379 -a foobared</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:6379&gt; set 192.168.0.137 192.168.0.137</span></span>
<span class="line"><span style="color:#24292e;">OK</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:6379&gt; set 192.168.0.174 192.168.0.174</span></span>
<span class="line"><span style="color:#24292e;">OK</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#注意：</span></span>
<span class="line"><span style="color:#24292e;">    最好保证key 和value 保持一致</span></span></code></pre></div><h2 id="效果图" tabindex="-1">效果图 <a class="header-anchor" href="#效果图" aria-label="Permalink to &quot;效果图&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312071121335.jpg" alt="生产环境"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312071121839.jpg" alt="prod生产环境"></p>`,19);function y(d,u,h,_,g,x){const s=a("center");return e(),l("div",null,[p(s,null,{default:o(()=>[t("Openresty(nginx)+Lua+Redis灰度发布")]),_:1}),r])}const q=n(i,[["render",y]]);export{m as __pageData,q as default};
