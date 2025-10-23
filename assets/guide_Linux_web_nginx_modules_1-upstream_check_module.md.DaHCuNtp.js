import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const l="/assets/nginxcheckupstream.qhJJd1aR.jpg",p="/assets/nginxcheckupdown.sVcOUE7-.jpg",t="/assets/nginxcheckjson.jZghPRqW.jpg",g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/modules/1-upstream_check_module.md","filePath":"guide/Linux/web/nginx/modules/1-upstream_check_module.md","lastUpdated":1701684699000}'),c={name:"guide/Linux/web/nginx/modules/1-upstream_check_module.md"},o=e(`<ul><li><p>安装省略。。。</p></li><li><p>1.配置</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream  operationApi {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        server   10.25.170.215:17011;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        server   10.25.170.216:17011;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        check interval=5000 rise=2 fall=2 timeout=3000 type=http;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        check_http_send &quot;GET /operationApi/login.jsp HTTP/1.0\\r\\n HOST na.szcq18.com\\r\\n\\r\\n&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">或者</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">upstream client2 {</span></span>
<span class="line"><span style="color:#e1e4e8;">        server 127.0.0.1:8090 weight=3 max_fails=3 fail_timeout=30s;  #模拟预发布服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">	    check interval=3000 rise=2 fall=5 timeout=1000 type=tcp;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#fail_timeout：有两层含义，</span></span>
<span class="line"><span style="color:#e1e4e8;">    一是在 3s 时间内最多容许 2 次失败；</span></span>
<span class="line"><span style="color:#e1e4e8;">    二是在经历了 2 次失败以后，3s时间内不分配请求到这台服务器</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#max_fails：允许请求失败的次数，默认为1。当超过最大次数时，返回proxy_next_upstream 模块定义的错误</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen       10001;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server_name  localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">         proxy_pass http://client2;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        location /status1 {</span></span>
<span class="line"><span style="color:#e1e4e8;">           stub_status on;      #配置nginx内置健康检查</span></span>
<span class="line"><span style="color:#e1e4e8;">           access_log  off;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        location /status2 {     #配置upstream_check_module模块健康检查</span></span>
<span class="line"><span style="color:#e1e4e8;">           check_status;</span></span>
<span class="line"><span style="color:#e1e4e8;">           access_log off;</span></span>
<span class="line"><span style="color:#e1e4e8;">           #allow SOME.IP.ADD.RESS; #可以设置允许网段访问</span></span>
<span class="line"><span style="color:#e1e4e8;">           #deny all;</span></span>
<span class="line"><span style="color:#e1e4e8;">       }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream  operationApi {</span></span>
<span class="line"><span style="color:#24292e;">                        server   10.25.170.215:17011;</span></span>
<span class="line"><span style="color:#24292e;">                        server   10.25.170.216:17011;</span></span>
<span class="line"><span style="color:#24292e;">                        check interval=5000 rise=2 fall=2 timeout=3000 type=http;</span></span>
<span class="line"><span style="color:#24292e;">                        check_http_send &quot;GET /operationApi/login.jsp HTTP/1.0\\r\\n HOST na.szcq18.com\\r\\n\\r\\n&quot;;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">或者</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">upstream client2 {</span></span>
<span class="line"><span style="color:#24292e;">        server 127.0.0.1:8090 weight=3 max_fails=3 fail_timeout=30s;  #模拟预发布服务器</span></span>
<span class="line"><span style="color:#24292e;">	    check interval=3000 rise=2 fall=5 timeout=1000 type=tcp;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#fail_timeout：有两层含义，</span></span>
<span class="line"><span style="color:#24292e;">    一是在 3s 时间内最多容许 2 次失败；</span></span>
<span class="line"><span style="color:#24292e;">    二是在经历了 2 次失败以后，3s时间内不分配请求到这台服务器</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#max_fails：允许请求失败的次数，默认为1。当超过最大次数时，返回proxy_next_upstream 模块定义的错误</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">        listen       10001;</span></span>
<span class="line"><span style="color:#24292e;">        server_name  localhost;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        location / {</span></span>
<span class="line"><span style="color:#24292e;">         proxy_pass http://client2;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        location /status1 {</span></span>
<span class="line"><span style="color:#24292e;">           stub_status on;      #配置nginx内置健康检查</span></span>
<span class="line"><span style="color:#24292e;">           access_log  off;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        location /status2 {     #配置upstream_check_module模块健康检查</span></span>
<span class="line"><span style="color:#24292e;">           check_status;</span></span>
<span class="line"><span style="color:#24292e;">           access_log off;</span></span>
<span class="line"><span style="color:#24292e;">           #allow SOME.IP.ADD.RESS; #可以设置允许网段访问</span></span>
<span class="line"><span style="color:#24292e;">           #deny all;</span></span>
<span class="line"><span style="color:#24292e;">       }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><p>参数解释</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">- interval：向后端发送的健康检查包的间隔ms。</span></span>
<span class="line"><span style="color:#e1e4e8;">    - fall(fall_count): 如果连续失败次数达到fall_count，服务器就被认为是down。</span></span>
<span class="line"><span style="color:#e1e4e8;">    - rise(rise_count): 如果连续成功次数达到rise_count，服务器就被认为是up。</span></span>
<span class="line"><span style="color:#e1e4e8;">    - timeout: 后端健康请求的超时时间。</span></span>
<span class="line"><span style="color:#e1e4e8;">    - default_down: 设定初始时服务器的状态，如果是true，就说明默认是down的，如果是false，就是up的。默认值是true，也就是一开始服务器认为是不可用，要等健康检查包达到一定成功次数以后才会被认为是健康的。</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    - type：健康检查包的类型，现在支持以下多种类型</span></span>
<span class="line"><span style="color:#e1e4e8;">        - tcp：简单的tcp连接，如果连接成功，就说明后端正常。</span></span>
<span class="line"><span style="color:#e1e4e8;">        - ssl_hello：发送一个初始的SSL hello包并接受服务器的SSL hello包。</span></span>
<span class="line"><span style="color:#e1e4e8;">        - http：发送HTTP请求，通过后端的回复包的状态来判断后端是否存活。</span></span>
<span class="line"><span style="color:#e1e4e8;">        - mysql: 向mysql服务器连接，通过接收服务器的greeting包来判断后端是否存活。</span></span>
<span class="line"><span style="color:#e1e4e8;">        - ajp：向后端发送AJP协议的Cping包，通过接收Cpong包来判断后端是否存活。</span></span>
<span class="line"><span style="color:#e1e4e8;">        -fastcgi：发送一个fastcgi请求，通过接受解析fastcgi响应来判断后端是否存活</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    - port: 指定后端服务器的检查端口。你可以指定不同于真实服务的后端服务器的端口，比如后端提供的是443端口的应用，你可以去检查80端口的状态来判断后端健康状况。默认是0，表示跟后端server提供真实服务的端口一样。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">- interval：向后端发送的健康检查包的间隔ms。</span></span>
<span class="line"><span style="color:#24292e;">    - fall(fall_count): 如果连续失败次数达到fall_count，服务器就被认为是down。</span></span>
<span class="line"><span style="color:#24292e;">    - rise(rise_count): 如果连续成功次数达到rise_count，服务器就被认为是up。</span></span>
<span class="line"><span style="color:#24292e;">    - timeout: 后端健康请求的超时时间。</span></span>
<span class="line"><span style="color:#24292e;">    - default_down: 设定初始时服务器的状态，如果是true，就说明默认是down的，如果是false，就是up的。默认值是true，也就是一开始服务器认为是不可用，要等健康检查包达到一定成功次数以后才会被认为是健康的。</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    - type：健康检查包的类型，现在支持以下多种类型</span></span>
<span class="line"><span style="color:#24292e;">        - tcp：简单的tcp连接，如果连接成功，就说明后端正常。</span></span>
<span class="line"><span style="color:#24292e;">        - ssl_hello：发送一个初始的SSL hello包并接受服务器的SSL hello包。</span></span>
<span class="line"><span style="color:#24292e;">        - http：发送HTTP请求，通过后端的回复包的状态来判断后端是否存活。</span></span>
<span class="line"><span style="color:#24292e;">        - mysql: 向mysql服务器连接，通过接收服务器的greeting包来判断后端是否存活。</span></span>
<span class="line"><span style="color:#24292e;">        - ajp：向后端发送AJP协议的Cping包，通过接收Cpong包来判断后端是否存活。</span></span>
<span class="line"><span style="color:#24292e;">        -fastcgi：发送一个fastcgi请求，通过接受解析fastcgi响应来判断后端是否存活</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    - port: 指定后端服务器的检查端口。你可以指定不同于真实服务的后端服务器的端口，比如后端提供的是443端口的应用，你可以去检查80端口的状态来判断后端健康状况。默认是0，表示跟后端server提供真实服务的端口一样。</span></span></code></pre></div><ul><li>http</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> check interval=5000 rise=2 fall=3 timeout=1000 type=http;</span></span>
<span class="line"><span style="color:#e1e4e8;">    check_http_send &quot;HEAD / HTTP/1.0\\r\\n\\r\\n&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    check_http_expect_alive http_2xx http_3xx;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> check interval=5000 rise=2 fall=3 timeout=1000 type=http;</span></span>
<span class="line"><span style="color:#24292e;">    check_http_send &quot;HEAD / HTTP/1.0\\r\\n\\r\\n&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    check_http_expect_alive http_2xx http_3xx;</span></span></code></pre></div><ul><li>效果图</li></ul><p><img src="`+l+`" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">check interval=3000 rise=2 fall=5 timeout=1000 type=tcp;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">interval检测间隔时间，单位为毫秒</span></span>
<span class="line"><span style="color:#e1e4e8;">rsie请求2次正常的话，标记此后端的状态为up</span></span>
<span class="line"><span style="color:#e1e4e8;">type  类型为tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">fall表示请求5次都失败的情况下，标记此后端的状态为down</span></span>
<span class="line"><span style="color:#e1e4e8;">timeout为超时时间，单位为毫秒</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">check interval=3000 rise=2 fall=5 timeout=1000 type=tcp;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">interval检测间隔时间，单位为毫秒</span></span>
<span class="line"><span style="color:#24292e;">rsie请求2次正常的话，标记此后端的状态为up</span></span>
<span class="line"><span style="color:#24292e;">type  类型为tcp</span></span>
<span class="line"><span style="color:#24292e;">fall表示请求5次都失败的情况下，标记此后端的状态为down</span></span>
<span class="line"><span style="color:#24292e;">timeout为超时时间，单位为毫秒</span></span></code></pre></div><ul><li>只想看宕机的设备</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http://192.168.0.137:10001/status2?status=down</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#只看</span></span>
<span class="line"><span style="color:#e1e4e8;">?status=down</span></span>
<span class="line"><span style="color:#e1e4e8;">?status=up</span></span>
<span class="line"><span style="color:#e1e4e8;">?status=all</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http://192.168.0.137:10001/status2?status=down</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#只看</span></span>
<span class="line"><span style="color:#24292e;">?status=down</span></span>
<span class="line"><span style="color:#24292e;">?status=up</span></span>
<span class="line"><span style="color:#24292e;">?status=all</span></span></code></pre></div><p><img src="`+p+'" alt="只想看宕机的设备"></p><ul><li>json 格式</li></ul><p><img src="'+t+`" alt="upstreamcheck"></p><h2 id="_1-http方式" tabindex="-1">1.http方式 <a class="header-anchor" href="#_1-http方式" aria-label="Permalink to &quot;1.http方式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream server-test {</span></span>
<span class="line"><span style="color:#e1e4e8;">  			# 一致性hash配置, 以xxx作为hash的key, 不需要此功能注释掉即可</span></span>
<span class="line"><span style="color:#e1e4e8;">  			consistent_hash $arg_xxx;</span></span>
<span class="line"><span style="color:#e1e4e8;">  			# server list  weight为权重，值越大访问比例越大</span></span>
<span class="line"><span style="color:#e1e4e8;">        server server001:8000 id=1004  weight=2;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server server002:8000 id=1005  weight=2;</span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">        # 黏性session</span></span>
<span class="line"><span style="color:#e1e4e8;">        # session_sticky;</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 每隔3秒检测一次状态, 两次成功则server可用，5次失败表示server不可用，检测使用http协议</span></span>
<span class="line"><span style="color:#e1e4e8;">        check interval=3000 rise=2 fall=5 timeout=1000 type=http;</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 该指令可以配置一个连接发送的请求数，其默认值为1，表示Tengine完成1次请求后即关闭连接。</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_keepalive_requests 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">				# 该指令可以配置http健康检查包发送的请求内容。为了减少传输数据量，推荐采用&quot;HEAD&quot;方法</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_http_send &quot;HEAD / HTTP/1.1\\r\\nConnection: keep-alive\\r\\n\\r\\n&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">  			# 该指令指定HTTP回复的成功状态，默认认为2XX和3XX的状态是健康的</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_http_expect_alive http_2xx http_3xx;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen       8100;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server_name  localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">    						# 由此引入上边的upstream</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_pass http://server-test;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        location /status {</span></span>
<span class="line"><span style="color:#e1e4e8;">               check_status;</span></span>
<span class="line"><span style="color:#e1e4e8;">               access_log off;</span></span>
<span class="line"><span style="color:#e1e4e8;">         }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream server-test {</span></span>
<span class="line"><span style="color:#24292e;">  			# 一致性hash配置, 以xxx作为hash的key, 不需要此功能注释掉即可</span></span>
<span class="line"><span style="color:#24292e;">  			consistent_hash $arg_xxx;</span></span>
<span class="line"><span style="color:#24292e;">  			# server list  weight为权重，值越大访问比例越大</span></span>
<span class="line"><span style="color:#24292e;">        server server001:8000 id=1004  weight=2;</span></span>
<span class="line"><span style="color:#24292e;">        server server002:8000 id=1005  weight=2;</span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">        # 黏性session</span></span>
<span class="line"><span style="color:#24292e;">        # session_sticky;</span></span>
<span class="line"><span style="color:#24292e;">        # 每隔3秒检测一次状态, 两次成功则server可用，5次失败表示server不可用，检测使用http协议</span></span>
<span class="line"><span style="color:#24292e;">        check interval=3000 rise=2 fall=5 timeout=1000 type=http;</span></span>
<span class="line"><span style="color:#24292e;">        # 该指令可以配置一个连接发送的请求数，其默认值为1，表示Tengine完成1次请求后即关闭连接。</span></span>
<span class="line"><span style="color:#24292e;">        check_keepalive_requests 1;</span></span>
<span class="line"><span style="color:#24292e;">				# 该指令可以配置http健康检查包发送的请求内容。为了减少传输数据量，推荐采用&quot;HEAD&quot;方法</span></span>
<span class="line"><span style="color:#24292e;">        check_http_send &quot;HEAD / HTTP/1.1\\r\\nConnection: keep-alive\\r\\n\\r\\n&quot;;</span></span>
<span class="line"><span style="color:#24292e;">  			# 该指令指定HTTP回复的成功状态，默认认为2XX和3XX的状态是健康的</span></span>
<span class="line"><span style="color:#24292e;">        check_http_expect_alive http_2xx http_3xx;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">        listen       8100;</span></span>
<span class="line"><span style="color:#24292e;">        server_name  localhost;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        location / {</span></span>
<span class="line"><span style="color:#24292e;">    						# 由此引入上边的upstream</span></span>
<span class="line"><span style="color:#24292e;">                proxy_pass http://server-test;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        location /status {</span></span>
<span class="line"><span style="color:#24292e;">               check_status;</span></span>
<span class="line"><span style="color:#24292e;">               access_log off;</span></span>
<span class="line"><span style="color:#24292e;">         }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="正式案例" tabindex="-1">正式案例 <a class="header-anchor" href="#正式案例" aria-label="Permalink to &quot;正式案例&quot;">​</a></h3><p><a href="http://tengine.taobao.org/document/http_upstream_check.html" target="_blank" rel="noreferrer">http://tengine.taobao.org/document/http_upstream_check.html</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">upstream bcwxjpa1UP {</span></span>
<span class="line"><span style="color:#e1e4e8;">	server 127.0.0.1:8000 max_fails=5 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server 127.0.0.1:8000 max_fails=5 fail_timeout=30s backup;</span></span>
<span class="line"><span style="color:#e1e4e8;">    check interval=4000 rise=2 fall=3 timeout=3500 type=http;</span></span>
<span class="line"><span style="color:#e1e4e8;">	check_keepalive_requests 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">	check_http_send &quot;GET / HTTP/1.1\\r\\nHost:\\r\\nConnection: keep-alive\\r\\n\\r\\n&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">	check_http_expect_alive http_4xx;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">upstream bcwxjpa1UP {</span></span>
<span class="line"><span style="color:#24292e;">	server 127.0.0.1:8000 max_fails=5 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#24292e;">	server 127.0.0.1:8000 max_fails=5 fail_timeout=30s backup;</span></span>
<span class="line"><span style="color:#24292e;">    check interval=4000 rise=2 fall=3 timeout=3500 type=http;</span></span>
<span class="line"><span style="color:#24292e;">	check_keepalive_requests 100;</span></span>
<span class="line"><span style="color:#24292e;">	check_http_send &quot;GET / HTTP/1.1\\r\\nHost:\\r\\nConnection: keep-alive\\r\\n\\r\\n&quot;;</span></span>
<span class="line"><span style="color:#24292e;">	check_http_expect_alive http_4xx;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>tcp</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream bcwxjpa1UP {</span></span>
<span class="line"><span style="color:#e1e4e8;">	server 127.0.0.1:8000 max_fails=5 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server 127.0.0.1:8000 max_fails=5 fail_timeout=30s backup;	</span></span>
<span class="line"><span style="color:#e1e4e8;">	check interval=4000 rise=2 fall=3 timeout=3500 type=tcp;</span></span>
<span class="line"><span style="color:#e1e4e8;">	check_keepalive_requests 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream bcwxjpa1UP {</span></span>
<span class="line"><span style="color:#24292e;">	server 127.0.0.1:8000 max_fails=5 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#24292e;">	server 127.0.0.1:8000 max_fails=5 fail_timeout=30s backup;	</span></span>
<span class="line"><span style="color:#24292e;">	check interval=4000 rise=2 fall=3 timeout=3500 type=tcp;</span></span>
<span class="line"><span style="color:#24292e;">	check_keepalive_requests 100;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,21),i=[o];function r(y,h,u,_,d,v){return n(),a("div",null,i)}const k=s(c,[["render",r]]);export{g as __pageData,k as default};
