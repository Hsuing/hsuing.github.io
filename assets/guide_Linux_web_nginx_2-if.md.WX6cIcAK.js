import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const _=JSON.parse('{"title":"1,屏蔽method","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/2-if.md","filePath":"guide/Linux/web/nginx/2-if.md","lastUpdated":1733304370000}'),p={name:"guide/Linux/web/nginx/2-if.md"},l=e(`<h1 id="_1-屏蔽method" tabindex="-1">1,屏蔽method <a class="header-anchor" href="#_1-屏蔽method" aria-label="Permalink to &quot;1,屏蔽method&quot;">​</a></h1><ul><li>在server 、location 中</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($request_method !~ ^(GET|HEAD)$ ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            return    444;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($request_method !~ ^(GET|HEAD)$ ) {</span></span>
<span class="line"><span style="color:#24292e;">            return    444;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_2-if中的几种判断条件" tabindex="-1">2,if中的几种判断条件 <a class="header-anchor" href="#_2-if中的几种判断条件" aria-label="Permalink to &quot;2,if中的几种判断条件&quot;">​</a></h1><h2 id="正则表达式匹配" tabindex="-1">正则表达式匹配： <a class="header-anchor" href="#正则表达式匹配" aria-label="Permalink to &quot;正则表达式匹配：&quot;">​</a></h2><ul><li>== 等值比较;</li><li>~ 与指定正则表达式模式匹配时返回“真”，判断匹配与否时区分字符大小写；</li><li>~* 与指定正则表达式模式匹配时返回“真”，判断匹配与否时不区分字符大小写；</li><li>!~ 与指定正则表达式模式不匹配时返回“真”，判断匹配与否时区分字符大小写；</li><li>!~* 与指定正则表达式模式不匹配时返回“真”，判断匹配与否时不区分字符大小写；</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if语法</span></span>
<span class="line"><span style="color:#e1e4e8;">if (表达式) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    ...</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">当变量的值为空字符串或“ 0”时，变量为false ;在1.0.1版之前，任何以“ 0” 开头的字符串都被视为false值。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">使用“ =”和“ !=”运算符比较变量和字符串;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">变量使用“ ~”（对于区分大小写的匹配）和“ ~*”（对于不区分大小写的匹配）运算符与正则表达式进行匹配。正则表达式可以包含可供以后在$1.. $9变量中重用的捕获。也可以使用!取反。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">使用“ -f”和“ !-f”运算符检查文件是否存在;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">使用“ -d”和“ !-d”运算符检查目录是否存在;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">使用“ -e”和“ !-e”运算符检查文件，目录或符号链接是否存在;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">使用“ -x”和“ !-x”运算符检查可执行文件。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#为了配置if的条件判断，这里需要用到nginx中内置的全局变量</span></span>
<span class="line"><span style="color:#e1e4e8;">$args               这个变量等于请求行中的参数，同$query_string</span></span>
<span class="line"><span style="color:#e1e4e8;">$content_length     请求头中的Content-length字段。</span></span>
<span class="line"><span style="color:#e1e4e8;">$content_type       请求头中的Content-Type字段。</span></span>
<span class="line"><span style="color:#e1e4e8;">$document_root      当前请求在root指令中指定的值。</span></span>
<span class="line"><span style="color:#e1e4e8;">$host               请求主机头字段，否则为服务器名称。</span></span>
<span class="line"><span style="color:#e1e4e8;">$http_user_agent    客户端agent信息</span></span>
<span class="line"><span style="color:#e1e4e8;">$http_cookie        客户端cookie信息</span></span>
<span class="line"><span style="color:#e1e4e8;">$limit_rate         这个变量可以限制连接速率。</span></span>
<span class="line"><span style="color:#e1e4e8;">$request_method     客户端请求的动作，通常为GET或POST。</span></span>
<span class="line"><span style="color:#e1e4e8;">$remote_addr        客户端的IP地址。</span></span>
<span class="line"><span style="color:#e1e4e8;">$remote_port        客户端的端口。</span></span>
<span class="line"><span style="color:#e1e4e8;">$remote_user        已经经过Auth Basic Module验证的用户名。</span></span>
<span class="line"><span style="color:#e1e4e8;">$request_filename   当前请求的文件路径，由root或alias指令与URI请求生成。</span></span>
<span class="line"><span style="color:#e1e4e8;">$scheme             HTTP方法（如http，https）。</span></span>
<span class="line"><span style="color:#e1e4e8;">$server_protocol    请求使用的协议，通常是HTTP/1.0或HTTP/1.1。</span></span>
<span class="line"><span style="color:#e1e4e8;">$server_addr        服务器地址，在完成一次系统调用后可以确定这个值。</span></span>
<span class="line"><span style="color:#e1e4e8;">$server_name        服务器名称。</span></span>
<span class="line"><span style="color:#e1e4e8;">$server_port        请求到达服务器的端口号。</span></span>
<span class="line"><span style="color:#e1e4e8;">$request_uri        包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。</span></span>
<span class="line"><span style="color:#e1e4e8;">$uri                不带请求参数的当前URI，$uri不包含主机名，如”/foo/bar.html”。</span></span>
<span class="line"><span style="color:#e1e4e8;">$document_uri       与$uri相同</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if语法</span></span>
<span class="line"><span style="color:#24292e;">if (表达式) {</span></span>
<span class="line"><span style="color:#24292e;">    ...</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">当变量的值为空字符串或“ 0”时，变量为false ;在1.0.1版之前，任何以“ 0” 开头的字符串都被视为false值。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">使用“ =”和“ !=”运算符比较变量和字符串;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">变量使用“ ~”（对于区分大小写的匹配）和“ ~*”（对于不区分大小写的匹配）运算符与正则表达式进行匹配。正则表达式可以包含可供以后在$1.. $9变量中重用的捕获。也可以使用!取反。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">使用“ -f”和“ !-f”运算符检查文件是否存在;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">使用“ -d”和“ !-d”运算符检查目录是否存在;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">使用“ -e”和“ !-e”运算符检查文件，目录或符号链接是否存在;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">使用“ -x”和“ !-x”运算符检查可执行文件。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#为了配置if的条件判断，这里需要用到nginx中内置的全局变量</span></span>
<span class="line"><span style="color:#24292e;">$args               这个变量等于请求行中的参数，同$query_string</span></span>
<span class="line"><span style="color:#24292e;">$content_length     请求头中的Content-length字段。</span></span>
<span class="line"><span style="color:#24292e;">$content_type       请求头中的Content-Type字段。</span></span>
<span class="line"><span style="color:#24292e;">$document_root      当前请求在root指令中指定的值。</span></span>
<span class="line"><span style="color:#24292e;">$host               请求主机头字段，否则为服务器名称。</span></span>
<span class="line"><span style="color:#24292e;">$http_user_agent    客户端agent信息</span></span>
<span class="line"><span style="color:#24292e;">$http_cookie        客户端cookie信息</span></span>
<span class="line"><span style="color:#24292e;">$limit_rate         这个变量可以限制连接速率。</span></span>
<span class="line"><span style="color:#24292e;">$request_method     客户端请求的动作，通常为GET或POST。</span></span>
<span class="line"><span style="color:#24292e;">$remote_addr        客户端的IP地址。</span></span>
<span class="line"><span style="color:#24292e;">$remote_port        客户端的端口。</span></span>
<span class="line"><span style="color:#24292e;">$remote_user        已经经过Auth Basic Module验证的用户名。</span></span>
<span class="line"><span style="color:#24292e;">$request_filename   当前请求的文件路径，由root或alias指令与URI请求生成。</span></span>
<span class="line"><span style="color:#24292e;">$scheme             HTTP方法（如http，https）。</span></span>
<span class="line"><span style="color:#24292e;">$server_protocol    请求使用的协议，通常是HTTP/1.0或HTTP/1.1。</span></span>
<span class="line"><span style="color:#24292e;">$server_addr        服务器地址，在完成一次系统调用后可以确定这个值。</span></span>
<span class="line"><span style="color:#24292e;">$server_name        服务器名称。</span></span>
<span class="line"><span style="color:#24292e;">$server_port        请求到达服务器的端口号。</span></span>
<span class="line"><span style="color:#24292e;">$request_uri        包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。</span></span>
<span class="line"><span style="color:#24292e;">$uri                不带请求参数的当前URI，$uri不包含主机名，如”/foo/bar.html”。</span></span>
<span class="line"><span style="color:#24292e;">$document_uri       与$uri相同</span></span></code></pre></div><h1 id="_3、if实现多重判断" tabindex="-1">3、if实现多重判断 <a class="header-anchor" href="#_3、if实现多重判断" aria-label="Permalink to &quot;3、if实现多重判断&quot;">​</a></h1><h2 id="_1种" tabindex="-1">1种 <a class="header-anchor" href="#_1种" aria-label="Permalink to &quot;1种&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Nginx.conf中加入在你项目的正确位置</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    set $my_ip &#39;&#39;; </span></span>
<span class="line"><span style="color:#e1e4e8;">    if ( $remote_addr = 222.222.222.222){set $my_ip 1;} #注意这里的$remote_addr如何用了负载均衡的话,这里应该是$http_x_forwarded_for</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ( $remote_addr = 192.168.1.170 ){ set $my_ip 1;}</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ( $remote_addr = 192.168.1.169 ){ set $my_ip 1;}</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ( $my_ip != 1) {rewrite ^/design/(.*)\\.php$ /tingfu.html?$1&amp;;}  #将*.php转到tingfu.html</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2、访问某个php应用的时候我只想让内部的某个IP访问，其他的IP都转到另一个PHP上。如下:</span></span>
<span class="line"><span style="color:#e1e4e8;">访问test.php，且IP不等222.222.222.222的跳转到55555.php</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">set $test &#39;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $request_uri ~* /img/test.php ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $test P;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $http_x_forwarded_for !~* ^222\\.222\\.222\\.222.* ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $test &quot;\${test}C&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $test = PC ) {  #当条件符合 访问test.php并且 ip不是222.222.222.222的 转发到55555.php</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^(.*)$ /img/55555.php permanent;  </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Nginx.conf中加入在你项目的正确位置</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    set $my_ip &#39;&#39;; </span></span>
<span class="line"><span style="color:#24292e;">    if ( $remote_addr = 222.222.222.222){set $my_ip 1;} #注意这里的$remote_addr如何用了负载均衡的话,这里应该是$http_x_forwarded_for</span></span>
<span class="line"><span style="color:#24292e;">    if ( $remote_addr = 192.168.1.170 ){ set $my_ip 1;}</span></span>
<span class="line"><span style="color:#24292e;">    if ( $remote_addr = 192.168.1.169 ){ set $my_ip 1;}</span></span>
<span class="line"><span style="color:#24292e;">    if ( $my_ip != 1) {rewrite ^/design/(.*)\\.php$ /tingfu.html?$1&amp;;}  #将*.php转到tingfu.html</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2、访问某个php应用的时候我只想让内部的某个IP访问，其他的IP都转到另一个PHP上。如下:</span></span>
<span class="line"><span style="color:#24292e;">访问test.php，且IP不等222.222.222.222的跳转到55555.php</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">set $test &#39;&#39;;</span></span>
<span class="line"><span style="color:#24292e;">if ( $request_uri ~* /img/test.php ) {</span></span>
<span class="line"><span style="color:#24292e;">        set $test P;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ( $http_x_forwarded_for !~* ^222\\.222\\.222\\.222.* ) {</span></span>
<span class="line"><span style="color:#24292e;">        set $test &quot;\${test}C&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ( $test = PC ) {  #当条件符合 访问test.php并且 ip不是222.222.222.222的 转发到55555.php</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^(.*)$ /img/55555.php permanent;  </span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_2种" tabindex="-1">2种 <a class="header-anchor" href="#_2种" aria-label="Permalink to &quot;2种&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($remote_addr ~ &quot;^(12.34|56.78)&quot; &amp;&amp; $http_user_agent ~* &quot;spider&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">set $flag 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($remote_addr ~ &quot;^(12.34|56.78)&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    set $flag &quot;\${flag}1&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_user_agent ~* &quot;spider&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    set $flag &quot;\${flag}2&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($flag = &quot;012&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($request_uri ~ &quot;xxx.php?xxx&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">	set $iftmp Y;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_user_agent ~ &quot;Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1)&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">	set $iftmp &quot;\${iftmp}Y&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($iftmp = YY) { return 400;}</span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_pass https://172.0.0.11;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($remote_addr ~ &quot;^(12.34|56.78)&quot; &amp;&amp; $http_user_agent ~* &quot;spider&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">    return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">set $flag 0;</span></span>
<span class="line"><span style="color:#24292e;">if ($remote_addr ~ &quot;^(12.34|56.78)&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">    set $flag &quot;\${flag}1&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if ($http_user_agent ~* &quot;spider&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">    set $flag &quot;\${flag}2&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if ($flag = &quot;012&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">    return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($request_uri ~ &quot;xxx.php?xxx&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">	set $iftmp Y;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if ($http_user_agent ~ &quot;Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1)&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">	set $iftmp &quot;\${iftmp}Y&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if ($iftmp = YY) { return 400;}</span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">	proxy_pass https://172.0.0.11;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>重点一 set $iftmp Y 将iftmp设置为Y</p><p>重点二 还是set部分set $iftmp &quot;\${iftmp}Y&quot; 在set里面 \${iftmp}Y将参数叠加一次，\${iftmp}是一个大大的亮点.</p><p>$request_uri是客户端请求的完整请求路径,$http_user_agent是用户端发出请求的浏览器参数. 上面的if判断是一个简单防cc攻击的原型,一般普通的cc攻击会固定攻击页面,然后浏览器参数也大多不变,当前两个if参数同时满足后第三个if就直接返回给请求端400错误</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> if ($remote_addr ~ &quot;/forum.php&quot; &amp;&amp; $query_string ~* &quot;mod=ajax&amp;action=downremoteimg&amp;message=&quot;) {  </span></span>
<span class="line"><span style="color:#e1e4e8;">  return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">#等同于</span></span>
<span class="line"><span style="color:#e1e4e8;"> set $flag 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($request_uri ~* &quot;/forum.php&quot;){</span></span>
<span class="line"><span style="color:#e1e4e8;">            set $flag &quot;\${flag}1&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($query_string ~* &quot;mod=ajax&amp;action=downremoteimg&amp;message=&quot; ){</span></span>
<span class="line"><span style="color:#e1e4e8;">            set $flag &quot;\${flag}2&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($flag = &quot;012&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> if ($remote_addr ~ &quot;/forum.php&quot; &amp;&amp; $query_string ~* &quot;mod=ajax&amp;action=downremoteimg&amp;message=&quot;) {  </span></span>
<span class="line"><span style="color:#24292e;">  return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">#等同于</span></span>
<span class="line"><span style="color:#24292e;"> set $flag 0;</span></span>
<span class="line"><span style="color:#24292e;">        if ($request_uri ~* &quot;/forum.php&quot;){</span></span>
<span class="line"><span style="color:#24292e;">            set $flag &quot;\${flag}1&quot;;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        if ($query_string ~* &quot;mod=ajax&amp;action=downremoteimg&amp;message=&quot; ){</span></span>
<span class="line"><span style="color:#24292e;">            set $flag &quot;\${flag}2&quot;;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        if ($flag = &quot;012&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">            return 403;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span></code></pre></div><p>遇到不法商家伪造站点跳转真实页面怎么办？</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ( $http_referer  ~* &quot;https://www.xxxx.com&quot; )  </span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">        return 307 https://weidian.com/?userid=163279346;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ( $http_referer  ~* &quot;https://www.xxxx.com&quot; )  </span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">        return 307 https://weidian.com/?userid=163279346;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><h2 id="ip访问" tabindex="-1">ip访问 <a class="header-anchor" href="#ip访问" aria-label="Permalink to &quot;ip访问&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">set $my_ip &#39;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 注意这里的 $remote_addr 如何用了负载均衡的话,这里应该是 $http_x_forwarded_for</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $remote_addr = 222.222.222.222) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    set $my_ip 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $remote_addr = 192.168.1.170 ) { </span></span>
<span class="line"><span style="color:#e1e4e8;">    set $my_ip 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $remote_addr = 192.168.1.169 ) { </span></span>
<span class="line"><span style="color:#e1e4e8;">    set $my_ip 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 将 *.php 转到 tingfu.html</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $my_ip != 1) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    rewrite ^/design/(.*)\\.php$ /tingfu.html?$1&amp;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">set $my_ip &#39;&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 注意这里的 $remote_addr 如何用了负载均衡的话,这里应该是 $http_x_forwarded_for</span></span>
<span class="line"><span style="color:#24292e;">if ( $remote_addr = 222.222.222.222) {</span></span>
<span class="line"><span style="color:#24292e;">    set $my_ip 1;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if ( $remote_addr = 192.168.1.170 ) { </span></span>
<span class="line"><span style="color:#24292e;">    set $my_ip 1;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if ( $remote_addr = 192.168.1.169 ) { </span></span>
<span class="line"><span style="color:#24292e;">    set $my_ip 1;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 将 *.php 转到 tingfu.html</span></span>
<span class="line"><span style="color:#24292e;">if ( $my_ip != 1) {</span></span>
<span class="line"><span style="color:#24292e;">    rewrite ^/design/(.*)\\.php$ /tingfu.html?$1&amp;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="访问特定页面" tabindex="-1">访问特定页面 <a class="header-anchor" href="#访问特定页面" aria-label="Permalink to &quot;访问特定页面&quot;">​</a></h2><p>访问test.php，且IP不等 <code>222.222.222.222</code> 的跳转到 55555.php</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">set $test &#39;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $request_uri ~* /img/test.php ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    set $test P;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $http_x_forwarded_for !~* ^222\\.222\\.222\\.222.* ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    set $test &quot;\${test}C&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $test = PC ) {  #当条件符合 访问 test.php 并且 ip 不是 222.222.222.222 的 转发到 55555.php</span></span>
<span class="line"><span style="color:#e1e4e8;">    rewrite ^(.*)$ /img/55555.php permanent; </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">set $test &#39;&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ( $request_uri ~* /img/test.php ) {</span></span>
<span class="line"><span style="color:#24292e;">    set $test P;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ( $http_x_forwarded_for !~* ^222\\.222\\.222\\.222.* ) {</span></span>
<span class="line"><span style="color:#24292e;">    set $test &quot;\${test}C&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ( $test = PC ) {  #当条件符合 访问 test.php 并且 ip 不是 222.222.222.222 的 转发到 55555.php</span></span>
<span class="line"><span style="color:#24292e;">    rewrite ^(.*)$ /img/55555.php permanent; </span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_4-允许特定域名访问" tabindex="-1">4.允许特定域名访问 <a class="header-anchor" href="#_4-允许特定域名访问" aria-label="Permalink to &quot;4.允许特定域名访问&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($host !~* &#39;^(www\\.)?gallopgo\\.com$&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($host !~* &#39;^(www\\.)?gallopgo\\.com$&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">    return 444;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="geoip2" tabindex="-1">geoip2 <a class="header-anchor" href="#geoip2" aria-label="Permalink to &quot;geoip2&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($geoip2_data_country_code != CN) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($geoip2_data_country_name != China){</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($geoip2_data_country_code != CN) {</span></span>
<span class="line"><span style="color:#24292e;">    return 444;</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span>
<span class="line"><span style="color:#24292e;">if ($geoip2_data_country_name != China){</span></span>
<span class="line"><span style="color:#24292e;">    return 444;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">geoip_country /usr/share/GeoIP/GeoIP.dat;   #GeoIP所在目录</span></span>
<span class="line"><span style="color:#e1e4e8;">map $geoip_country_code $allowed_country {  #变量判断</span></span>
<span class="line"><span style="color:#e1e4e8;">default yes;   #允许</span></span>
<span class="line"><span style="color:#e1e4e8;">CN no;  #区域不允许，这个CN就是代表中国，如果是多个地区，就是CN下面加就行</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">geoip_country GeoIP/GeoIP.dat;</span></span>
<span class="line"><span style="color:#e1e4e8;">geoip_city GeoIP/GeoLiteCity.dat;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">root /data/wwwroot/test;  #网站目录</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($allowed_country = no) {  #这里的no，就是上面html里面CN on，就是判断no区域</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">#if ($allowed_country = no) 也可以用if ($geoip_country_code = CN) 来代替，如果是多个区域就在CN后面几个|然后加区域代码</span></span>
<span class="line"><span style="color:#e1e4e8;">return 403;   #返回403提示</span></span>
<span class="line"><span style="color:#e1e4e8;">return http://域名; #跳转到其他人网站去 ，return也可以用rewrite，具体看自己网站的配置文件怎么设置的</span></span>
<span class="line"><span style="color:#e1e4e8;">root /data/wwwroot/test1;  #跳转到自己服务器的另外一个文件夹下面去</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">    # 只提取关键配置参数</span></span>
<span class="line"><span style="color:#e1e4e8;">     </span></span>
<span class="line"><span style="color:#e1e4e8;">    geoip2 /usr/local/GeoLite2-Country_20190507/GeoLite2-Country.mmdb {</span></span>
<span class="line"><span style="color:#e1e4e8;">        $geoip2_data_country_code default=CN country iso_code;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">    server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &quot;country&quot; $geoip2_data_country_code; #添加个响应头，方便查。</span></span>
<span class="line"><span style="color:#e1e4e8;">         </span></span>
<span class="line"><span style="color:#e1e4e8;">        location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">            if ($geoip2_data_country_code = CN) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                root /mnt/cn;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">             </span></span>
<span class="line"><span style="color:#e1e4e8;">            if ($geoip2_data_country_code != CN) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                root /mnt/other;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##############</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">set $deny 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($geoip_country_code != &quot;CN&quot;){</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $deny 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">        return 302 $scheme://$host/405.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($deny = 1){</span></span>
<span class="line"><span style="color:#e1e4e8;">        return 302 $scheme://$host/405.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">geoip_country /usr/share/GeoIP/GeoIP.dat;   #GeoIP所在目录</span></span>
<span class="line"><span style="color:#24292e;">map $geoip_country_code $allowed_country {  #变量判断</span></span>
<span class="line"><span style="color:#24292e;">default yes;   #允许</span></span>
<span class="line"><span style="color:#24292e;">CN no;  #区域不允许，这个CN就是代表中国，如果是多个地区，就是CN下面加就行</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">geoip_country GeoIP/GeoIP.dat;</span></span>
<span class="line"><span style="color:#24292e;">geoip_city GeoIP/GeoLiteCity.dat;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">root /data/wwwroot/test;  #网站目录</span></span>
<span class="line"><span style="color:#24292e;">if ($allowed_country = no) {  #这里的no，就是上面html里面CN on，就是判断no区域</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">#if ($allowed_country = no) 也可以用if ($geoip_country_code = CN) 来代替，如果是多个区域就在CN后面几个|然后加区域代码</span></span>
<span class="line"><span style="color:#24292e;">return 403;   #返回403提示</span></span>
<span class="line"><span style="color:#24292e;">return http://域名; #跳转到其他人网站去 ，return也可以用rewrite，具体看自己网站的配置文件怎么设置的</span></span>
<span class="line"><span style="color:#24292e;">root /data/wwwroot/test1;  #跳转到自己服务器的另外一个文件夹下面去</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">    # 只提取关键配置参数</span></span>
<span class="line"><span style="color:#24292e;">     </span></span>
<span class="line"><span style="color:#24292e;">    geoip2 /usr/local/GeoLite2-Country_20190507/GeoLite2-Country.mmdb {</span></span>
<span class="line"><span style="color:#24292e;">        $geoip2_data_country_code default=CN country iso_code;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">    server {</span></span>
<span class="line"><span style="color:#24292e;">        add_header &quot;country&quot; $geoip2_data_country_code; #添加个响应头，方便查。</span></span>
<span class="line"><span style="color:#24292e;">         </span></span>
<span class="line"><span style="color:#24292e;">        location / {</span></span>
<span class="line"><span style="color:#24292e;">            if ($geoip2_data_country_code = CN) {</span></span>
<span class="line"><span style="color:#24292e;">                root /mnt/cn;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">             </span></span>
<span class="line"><span style="color:#24292e;">            if ($geoip2_data_country_code != CN) {</span></span>
<span class="line"><span style="color:#24292e;">                root /mnt/other;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##############</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">set $deny 0;</span></span>
<span class="line"><span style="color:#24292e;">    if ($geoip_country_code != &quot;CN&quot;){</span></span>
<span class="line"><span style="color:#24292e;">        set $deny 1;</span></span>
<span class="line"><span style="color:#24292e;">        return 302 $scheme://$host/405.html;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    if ($deny = 1){</span></span>
<span class="line"><span style="color:#24292e;">        return 302 $scheme://$host/405.html;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div>`,28),o=[l];function t(c,i,r,y,d,u){return n(),a("div",null,o)}const $=s(p,[["render",t]]);export{_ as __pageData,$ as default};
