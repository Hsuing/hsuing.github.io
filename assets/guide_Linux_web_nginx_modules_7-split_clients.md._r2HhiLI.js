import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/modules/7-split_clients.md","filePath":"guide/Linux/web/nginx/modules/7-split_clients.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/modules/7-split_clients.md"},e=l(`<p>split_clients模块默认已经编译进Nginx , 通过–without-http_split_clients_module 禁用。</p><p>功能： 1、基于已有变量创建新变量，可为实现AB测试提供更多的可能性。 2、对已有变量的值执行MurmurHash2算法得到32位整型哈希数字，记为hash。 3、32位无符号整型的最大数字2^32-1，记为max。 4、哈希数字与最大数字相除hash/max，可以得到百分比percent。 5、配置指令中只是了各个百分比构成的范围，如0-1%，1%-5%等，及范围对应的值。 6、当percent落在哪个范围里，新变量的值就对应着其后的参数</p><p><strong>已有变量</strong> 1、字符串 2、一个或多个变量 3、变量与字符串的组合</p><p><strong>case规则</strong> 1、xx.xx% ，支持小数点后2位，所有项的百分比相加不能超过100% 。 2、* ，由它匹配剩余的百分比（100%减去以上所有相加的百分比）</p><p><strong>split_clients指令</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Syntax:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">split_clients</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">string</span><span style="color:#E1E4E8;"> $variable </span><span style="color:#9ECBFF;">{</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">...</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#B392F0;">Default:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">---</span></span>
<span class="line"><span style="color:#B392F0;">Context:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Syntax:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">split_clients</span><span style="color:#24292E;"> </span><span style="color:#032F62;">string</span><span style="color:#24292E;"> $variable </span><span style="color:#032F62;">{</span><span style="color:#24292E;"> </span><span style="color:#032F62;">...</span><span style="color:#24292E;"> </span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#6F42C1;">Default:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">---</span></span>
<span class="line"><span style="color:#6F42C1;">Context:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http</span></span></code></pre></div><h2 id="disk" tabindex="-1">disk <a class="header-anchor" href="#disk" aria-label="Permalink to &quot;disk&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">    lua_shared_dict nginxcache 60m;</span></span>
<span class="line"><span style="color:#e1e4e8;">    include       mime.types;</span></span>
<span class="line"><span style="color:#e1e4e8;">    default_type  application/octet-stream;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">​    log_format  session  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">​            &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">​            &#39;upstream_cache_status=$upstream_cache_status &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">​            &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot; &quot;request_time $request_time&quot;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">​    access_log  logs/access.log  session;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    error_log  logs/error.log  error;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">​    sendfile        on;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    keepalive_timeout  65;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    client_max_body_size 2m;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    client_body_buffer_size 512k;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">​    proxy_cache_revalidate on;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    proxy_cache_lock on;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    proxy_cache_lock_timeout 6s;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    proxy_cache_lock_age 6s;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    proxy_connect_timeout 75;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    proxy_send_timeout 75;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    proxy_read_timeout 75;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    proxy_buffer_size 16k;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    proxy_buffers 4 64k;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    proxy_busy_buffers_size 128k;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    proxy_temp_file_write_size 128k;</span></span>
<span class="line"><span style="color:#e1e4e8;">​    proxy_temp_path ../proxy_temp;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">​	upstream upstream {</span></span>
<span class="line"><span style="color:#e1e4e8;">​		server 192.168.1.10:8080 max_fails=1 fail_timeout=1m;</span></span>
<span class="line"><span style="color:#e1e4e8;">​	}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">​    #可是怎么让请求均匀的分配到这三块盘上呢，一般是配置split_clients方法，方法如下：</span></span>
<span class="line"><span style="color:#e1e4e8;">​	split_clients $request_uri $disk {</span></span>
<span class="line"><span style="color:#e1e4e8;">​        33% disk1;</span></span>
<span class="line"><span style="color:#e1e4e8;"> 		33% disk2;</span></span>
<span class="line"><span style="color:#e1e4e8;">          *   disk3;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">    #nginx做缓存的时候，可能用到多快盘。比如如下配置：</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache_path /disk1 levels=1:2 keys_zone=cache_disk1:600m max_size=10g inactive=7d use_temp_path=off;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache_path /disk2 levels=1:2 keys_zone=cache_disk2:600m max_size=10g inactive=7d use_temp_path=off;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache_path /disk3 levels=1:2 keys_zone=cache_disk3:600m max_size=10g inactive=7d use_temp_path=off;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;"> listen       8080;</span></span>
<span class="line"><span style="color:#e1e4e8;"> server_name  localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> #之后在location中配置如下：</span></span>
<span class="line"><span style="color:#e1e4e8;"> location ~ (amber\\.um38)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">     proxy_pass http://upstream;</span></span>
<span class="line"><span style="color:#e1e4e8;">     add_header Nginx-Cache &quot;$upstream_cache_status&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">     proxy_cache_valid 10s;</span></span>
<span class="line"><span style="color:#e1e4e8;">     proxy_cache_key $uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">     proxy_cache cache_$disk;</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">    lua_shared_dict nginxcache 60m;</span></span>
<span class="line"><span style="color:#24292e;">    include       mime.types;</span></span>
<span class="line"><span style="color:#24292e;">    default_type  application/octet-stream;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">​    log_format  session  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#24292e;">​            &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#24292e;">​            &#39;upstream_cache_status=$upstream_cache_status &#39;</span></span>
<span class="line"><span style="color:#24292e;">​            &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot; &quot;request_time $request_time&quot;&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">​    access_log  logs/access.log  session;</span></span>
<span class="line"><span style="color:#24292e;">​    error_log  logs/error.log  error;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">​    sendfile        on;</span></span>
<span class="line"><span style="color:#24292e;">​    keepalive_timeout  65;</span></span>
<span class="line"><span style="color:#24292e;">​    client_max_body_size 2m;</span></span>
<span class="line"><span style="color:#24292e;">​    client_body_buffer_size 512k;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">​    proxy_cache_revalidate on;</span></span>
<span class="line"><span style="color:#24292e;">​    proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span style="color:#24292e;">​    proxy_cache_lock on;</span></span>
<span class="line"><span style="color:#24292e;">​    proxy_cache_lock_timeout 6s;</span></span>
<span class="line"><span style="color:#24292e;">​    proxy_cache_lock_age 6s;</span></span>
<span class="line"><span style="color:#24292e;">​    proxy_connect_timeout 75;</span></span>
<span class="line"><span style="color:#24292e;">​    proxy_send_timeout 75;</span></span>
<span class="line"><span style="color:#24292e;">​    proxy_read_timeout 75;</span></span>
<span class="line"><span style="color:#24292e;">​    proxy_buffer_size 16k;</span></span>
<span class="line"><span style="color:#24292e;">​    proxy_buffers 4 64k;</span></span>
<span class="line"><span style="color:#24292e;">​    proxy_busy_buffers_size 128k;</span></span>
<span class="line"><span style="color:#24292e;">​    proxy_temp_file_write_size 128k;</span></span>
<span class="line"><span style="color:#24292e;">​    proxy_temp_path ../proxy_temp;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">​	upstream upstream {</span></span>
<span class="line"><span style="color:#24292e;">​		server 192.168.1.10:8080 max_fails=1 fail_timeout=1m;</span></span>
<span class="line"><span style="color:#24292e;">​	}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">​    #可是怎么让请求均匀的分配到这三块盘上呢，一般是配置split_clients方法，方法如下：</span></span>
<span class="line"><span style="color:#24292e;">​	split_clients $request_uri $disk {</span></span>
<span class="line"><span style="color:#24292e;">​        33% disk1;</span></span>
<span class="line"><span style="color:#24292e;"> 		33% disk2;</span></span>
<span class="line"><span style="color:#24292e;">          *   disk3;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">    #nginx做缓存的时候，可能用到多快盘。比如如下配置：</span></span>
<span class="line"><span style="color:#24292e;">proxy_cache_path /disk1 levels=1:2 keys_zone=cache_disk1:600m max_size=10g inactive=7d use_temp_path=off;</span></span>
<span class="line"><span style="color:#24292e;">proxy_cache_path /disk2 levels=1:2 keys_zone=cache_disk2:600m max_size=10g inactive=7d use_temp_path=off;</span></span>
<span class="line"><span style="color:#24292e;">proxy_cache_path /disk3 levels=1:2 keys_zone=cache_disk3:600m max_size=10g inactive=7d use_temp_path=off;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;"> listen       8080;</span></span>
<span class="line"><span style="color:#24292e;"> server_name  localhost;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> #之后在location中配置如下：</span></span>
<span class="line"><span style="color:#24292e;"> location ~ (amber\\.um38)$ {</span></span>
<span class="line"><span style="color:#24292e;">     proxy_pass http://upstream;</span></span>
<span class="line"><span style="color:#24292e;">     add_header Nginx-Cache &quot;$upstream_cache_status&quot;;</span></span>
<span class="line"><span style="color:#24292e;">     proxy_cache_valid 10s;</span></span>
<span class="line"><span style="color:#24292e;">     proxy_cache_key $uri;</span></span>
<span class="line"><span style="color:#24292e;">     proxy_cache cache_$disk;</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>其他例子</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">split_clients</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;\${</span><span style="color:#E1E4E8;">remote_addr</span><span style="color:#9ECBFF;">}AAA&quot;</span><span style="color:#E1E4E8;"> $variant </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">0.5%</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.one</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">2%</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.two</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">3%</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.eric</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">4%</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.yang</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">50%</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.thr</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">index</span><span style="color:#E1E4E8;">\${variant}</span><span style="color:#9ECBFF;">.html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/nginx/html/</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;one&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">index.one.html</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;two&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">index.two.html</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;eric&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">index.eric.html</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;thr&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">index.thr.html</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">关于测试，我们在</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">的错误日志上</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">输出</span><span style="color:#E1E4E8;"> \${variant} </span><span style="color:#9ECBFF;">变量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">log_format</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#B392F0;">&#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#B392F0;">&#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot; &quot;$variant&quot;&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">http</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">split_clients</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;\${</span><span style="color:#24292E;">remote_addr</span><span style="color:#032F62;">}AAA&quot;</span><span style="color:#24292E;"> $variant </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">0.5%</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.one</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">2%</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.two</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">3%</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.eric</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">4%</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.yang</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">50%</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.thr</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">index</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index</span><span style="color:#24292E;">\${variant}</span><span style="color:#032F62;">.html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/nginx/html/</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;one&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">index.one.html</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;two&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">index.two.html</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;eric&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">index.eric.html</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;thr&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">index.thr.html</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">关于测试，我们在</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">的错误日志上</span><span style="color:#24292E;"> </span><span style="color:#032F62;">输出</span><span style="color:#24292E;"> \${variant} </span><span style="color:#032F62;">变量</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">log_format</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6F42C1;">&#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6F42C1;">&#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot; &quot;$variant&quot;&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><ul><li>根据cookie</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> split_clients &quot;\${request_id}&quot; $variant {</span></span>
<span class="line"><span style="color:#e1e4e8;">                   50%               .old;</span></span>
<span class="line"><span style="color:#e1e4e8;">                   50%               .new;</span></span>
<span class="line"><span style="color:#e1e4e8;">		   *                  all; </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen      443 ssl;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  uatwww.gbw-china.com.cn;</span></span>
<span class="line"><span style="color:#e1e4e8;">    add_header Set-Cookie &quot; version=$variant;domain=.gbw-china.com.cn;path=/;expires=max&quot;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> split_clients &quot;\${request_id}&quot; $variant {</span></span>
<span class="line"><span style="color:#24292e;">                   50%               .old;</span></span>
<span class="line"><span style="color:#24292e;">                   50%               .new;</span></span>
<span class="line"><span style="color:#24292e;">		   *                  all; </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen      443 ssl;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  uatwww.gbw-china.com.cn;</span></span>
<span class="line"><span style="color:#24292e;">    add_header Set-Cookie &quot; version=$variant;domain=.gbw-china.com.cn;path=/;expires=max&quot;;</span></span></code></pre></div><ul><li>写入cookie为空</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">rewrite_by_lua_file</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/data/apps/nginx/conf/vhost/set.lua&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">try_files</span><span style="color:#E1E4E8;"> $uri $uri</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/index.html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#set.lua</span></span>
<span class="line"><span style="color:#F97583;">local</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cookie_name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;cookie_UT_ID&quot;</span></span>
<span class="line"><span style="color:#F97583;">local</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">request_uri</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ngx.var.request_uri</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ngx.var[cookie_name]</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nil</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">or</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ngx.var[cookie_name]</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#B392F0;">math.randomseed(1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">local</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">uuid</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">math.random</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">0,2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">local</span><span style="color:#E1E4E8;"> domain</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;gbw-china.com.cn&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">local</span><span style="color:#E1E4E8;"> paths</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">local</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mycookie</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">string.format</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">&quot;UT_ID=%s; domain=%s; path=%s; Expires=%s&quot;</span><span style="color:#B392F0;">,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">uuid,domain,paths,ngx.cookie_time</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">ngx.time</span><span style="color:#E1E4E8;">() + 86400 * 1000))</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">ngx.header[</span><span style="color:#B392F0;">&quot;Set-Cookie&quot;</span><span style="color:#B392F0;">]</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mycookie</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">ngx.header[</span><span style="color:#B392F0;">&quot;Location&quot;</span><span style="color:#B392F0;">]</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">request_uri</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">ngx.exit(302</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">rewrite_by_lua_file</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/data/apps/nginx/conf/vhost/set.lua&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">try_files</span><span style="color:#24292E;"> $uri $uri</span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/index.html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#set.lua</span></span>
<span class="line"><span style="color:#D73A49;">local</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cookie_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;cookie_UT_ID&quot;</span></span>
<span class="line"><span style="color:#D73A49;">local</span><span style="color:#24292E;"> </span><span style="color:#032F62;">request_uri</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ngx.var.request_uri</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ngx.var[cookie_name]</span><span style="color:#24292E;"> </span><span style="color:#032F62;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nil</span><span style="color:#24292E;"> </span><span style="color:#032F62;">or</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ngx.var[cookie_name]</span><span style="color:#24292E;"> </span><span style="color:#032F62;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">then</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6F42C1;">math.randomseed(1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">local</span><span style="color:#24292E;"> </span><span style="color:#032F62;">uuid</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">math.random</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">0,2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">local</span><span style="color:#24292E;"> domain</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;gbw-china.com.cn&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">local</span><span style="color:#24292E;"> paths</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">local</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mycookie</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">string.format</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">&quot;UT_ID=%s; domain=%s; path=%s; Expires=%s&quot;</span><span style="color:#6F42C1;">,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">uuid,domain,paths,ngx.cookie_time</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">ngx.time</span><span style="color:#24292E;">() + 86400 * 1000))</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ngx.header[</span><span style="color:#6F42C1;">&quot;Set-Cookie&quot;</span><span style="color:#6F42C1;">]</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mycookie</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ngx.header[</span><span style="color:#6F42C1;">&quot;Location&quot;</span><span style="color:#6F42C1;">]</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">request_uri</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ngx.exit(302</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div>`,14),o=[e];function t(c,r,y,i,E,_){return n(),a("div",null,o)}const d=s(p,[["render",t]]);export{u as __pageData,d as default};
