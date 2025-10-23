import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/nginx笔记/4-nginx全局变量.md","filePath":"guide/Linux/web/nginx/nginx笔记/4-nginx全局变量.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/nginx笔记/4-nginx全局变量.md"},l=a(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$remote_addr        //获取客户端 ip</span></span>
<span class="line"><span style="color:#e1e4e8;">$binary_remote_addr //客户端 ip（二进制)</span></span>
<span class="line"><span style="color:#e1e4e8;">$remote_port        //客户端 port，如：50472</span></span>
<span class="line"><span style="color:#e1e4e8;">$remote_user        //已经经过 Auth Basic Module 验证的用户名</span></span>
<span class="line"><span style="color:#e1e4e8;">$host           //请求主机头字段，否则为服务器名称，如:blog.sakmon.com</span></span>
<span class="line"><span style="color:#e1e4e8;">$request        //用户请求信息，如：GET ?a=1&amp;b=2 HTTP/1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">$request_filename   //当前请求的文件的路径名，由 root 或 alias 和 URI request 组合而成，如：/2013/81.html</span></span>
<span class="line"><span style="color:#e1e4e8;">$status         //请求的响应状态码,如:200</span></span>
<span class="line"><span style="color:#e1e4e8;">$body_bytes_sent        // 响应时送出的 body 字节数数量。即使连接中断，这个数据也是精确的,如：40</span></span>
<span class="line"><span style="color:#e1e4e8;">$content_length        // 等于请求行的“Content_Length”的值</span></span>
<span class="line"><span style="color:#e1e4e8;">$content_type          // 等于请求行的“Content_Type”的值</span></span>
<span class="line"><span style="color:#e1e4e8;">$http_referer          // 引用地址</span></span>
<span class="line"><span style="color:#e1e4e8;">$http_user_agent      // 客户端 agent 信息,如：Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36</span></span>
<span class="line"><span style="color:#e1e4e8;">$args            //与$query_string 相同 等于当中 URL 的参数(GET)，如 a=1&amp;b=2</span></span>
<span class="line"><span style="color:#e1e4e8;">$document_uri        //与$uri 相同  这个变量指当前的请求 URI，不包括任何参数(见$args) 如:/2013/81.html</span></span>
<span class="line"><span style="color:#e1e4e8;">$document_root       //针对当前请求的根路径设置值</span></span>
<span class="line"><span style="color:#e1e4e8;">$hostname        //如：centos53.localdomain</span></span>
<span class="line"><span style="color:#e1e4e8;">$http_cookie        //客户端 cookie 信息</span></span>
<span class="line"><span style="color:#e1e4e8;">$cookie_COOKIE      //cookie COOKIE 变量的值</span></span>
<span class="line"><span style="color:#e1e4e8;">$is_args    //如果有$args 参数，这个变量等于”?”，否则等于”&quot;，空值，如?</span></span>
<span class="line"><span style="color:#e1e4e8;">$limit_rate //这个变量可以限制连接速率，0 表示不限速</span></span>
<span class="line"><span style="color:#e1e4e8;">$query_string       // 与$args 相同 等于当中 URL 的参数(GET)，如 a=1&amp;b=2</span></span>
<span class="line"><span style="color:#e1e4e8;">$request_body      // 记录 POST 过来的数据信息</span></span>
<span class="line"><span style="color:#e1e4e8;">$request_body_file  //客户端请求主体信息的临时文件名</span></span>
<span class="line"><span style="color:#e1e4e8;">$request_method       //客户端请求的动作，通常为 GET 或 POST,如：GET</span></span>
<span class="line"><span style="color:#e1e4e8;">$request_uri          //包含请求参数的原始 URI，不包含主机名，如：/2013/81.html?a=1&amp;b=2</span></span>
<span class="line"><span style="color:#e1e4e8;">$scheme            //HTTP 方法（如 http，https）,如：http</span></span>
<span class="line"><span style="color:#e1e4e8;">$uri            //这个变量指当前的请求 URI，不包括任何参数(见$args) 如:/2013/81.html</span></span>
<span class="line"><span style="color:#e1e4e8;">$request_completion //如果请求结束，设置为 OK. 当请求未结束或如果该请求不是请求链串的最后一个时，为空(Empty)，如：OK</span></span>
<span class="line"><span style="color:#e1e4e8;">$server_protocol    //请求使用的协议，通常是 HTTP/1.0 或 HTTP/1.1，如：HTTP/1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">$server_addr        //服务器 IP 地址，在完成一次系统调用后可以确定这个值</span></span>
<span class="line"><span style="color:#e1e4e8;">$server_name        //服务器名称，如：blog.sakmon.com</span></span>
<span class="line"><span style="color:#e1e4e8;">$server_port        //请求到达服务器的端口号,如：80</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$remote_addr        //获取客户端 ip</span></span>
<span class="line"><span style="color:#24292e;">$binary_remote_addr //客户端 ip（二进制)</span></span>
<span class="line"><span style="color:#24292e;">$remote_port        //客户端 port，如：50472</span></span>
<span class="line"><span style="color:#24292e;">$remote_user        //已经经过 Auth Basic Module 验证的用户名</span></span>
<span class="line"><span style="color:#24292e;">$host           //请求主机头字段，否则为服务器名称，如:blog.sakmon.com</span></span>
<span class="line"><span style="color:#24292e;">$request        //用户请求信息，如：GET ?a=1&amp;b=2 HTTP/1.1</span></span>
<span class="line"><span style="color:#24292e;">$request_filename   //当前请求的文件的路径名，由 root 或 alias 和 URI request 组合而成，如：/2013/81.html</span></span>
<span class="line"><span style="color:#24292e;">$status         //请求的响应状态码,如:200</span></span>
<span class="line"><span style="color:#24292e;">$body_bytes_sent        // 响应时送出的 body 字节数数量。即使连接中断，这个数据也是精确的,如：40</span></span>
<span class="line"><span style="color:#24292e;">$content_length        // 等于请求行的“Content_Length”的值</span></span>
<span class="line"><span style="color:#24292e;">$content_type          // 等于请求行的“Content_Type”的值</span></span>
<span class="line"><span style="color:#24292e;">$http_referer          // 引用地址</span></span>
<span class="line"><span style="color:#24292e;">$http_user_agent      // 客户端 agent 信息,如：Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36</span></span>
<span class="line"><span style="color:#24292e;">$args            //与$query_string 相同 等于当中 URL 的参数(GET)，如 a=1&amp;b=2</span></span>
<span class="line"><span style="color:#24292e;">$document_uri        //与$uri 相同  这个变量指当前的请求 URI，不包括任何参数(见$args) 如:/2013/81.html</span></span>
<span class="line"><span style="color:#24292e;">$document_root       //针对当前请求的根路径设置值</span></span>
<span class="line"><span style="color:#24292e;">$hostname        //如：centos53.localdomain</span></span>
<span class="line"><span style="color:#24292e;">$http_cookie        //客户端 cookie 信息</span></span>
<span class="line"><span style="color:#24292e;">$cookie_COOKIE      //cookie COOKIE 变量的值</span></span>
<span class="line"><span style="color:#24292e;">$is_args    //如果有$args 参数，这个变量等于”?”，否则等于”&quot;，空值，如?</span></span>
<span class="line"><span style="color:#24292e;">$limit_rate //这个变量可以限制连接速率，0 表示不限速</span></span>
<span class="line"><span style="color:#24292e;">$query_string       // 与$args 相同 等于当中 URL 的参数(GET)，如 a=1&amp;b=2</span></span>
<span class="line"><span style="color:#24292e;">$request_body      // 记录 POST 过来的数据信息</span></span>
<span class="line"><span style="color:#24292e;">$request_body_file  //客户端请求主体信息的临时文件名</span></span>
<span class="line"><span style="color:#24292e;">$request_method       //客户端请求的动作，通常为 GET 或 POST,如：GET</span></span>
<span class="line"><span style="color:#24292e;">$request_uri          //包含请求参数的原始 URI，不包含主机名，如：/2013/81.html?a=1&amp;b=2</span></span>
<span class="line"><span style="color:#24292e;">$scheme            //HTTP 方法（如 http，https）,如：http</span></span>
<span class="line"><span style="color:#24292e;">$uri            //这个变量指当前的请求 URI，不包括任何参数(见$args) 如:/2013/81.html</span></span>
<span class="line"><span style="color:#24292e;">$request_completion //如果请求结束，设置为 OK. 当请求未结束或如果该请求不是请求链串的最后一个时，为空(Empty)，如：OK</span></span>
<span class="line"><span style="color:#24292e;">$server_protocol    //请求使用的协议，通常是 HTTP/1.0 或 HTTP/1.1，如：HTTP/1.1</span></span>
<span class="line"><span style="color:#24292e;">$server_addr        //服务器 IP 地址，在完成一次系统调用后可以确定这个值</span></span>
<span class="line"><span style="color:#24292e;">$server_name        //服务器名称，如：blog.sakmon.com</span></span>
<span class="line"><span style="color:#24292e;">$server_port        //请求到达服务器的端口号,如：80</span></span></code></pre></div><p>以&quot;<a href="http://www.findme.wang/blog/detail/id/512.html?v=3.1" target="_blank" rel="noreferrer">http://www.findme.wang/blog/detail/id/512.html?v=3.1</a>&quot;为例</p><p>其中，常用的变量值为：</p><p>$arg : v=3.1</p><p>$host : www.findme.wang</p><p>$remote_addr :61.183.118.242</p><p>$remote_prot：80</p><p>$request_uri：<a href="http://www.findme.wang/blog/detail/id/512.html?v=3.1" target="_blank" rel="noreferrer">http://www.findme.wang/blog/detail/id/512.html?v=3.1</a></p><p>$uri：/blog/detail/id/512.html?v=3.1</p>`,9),o=[l];function t(r,c,i,_,y,$){return n(),e("div",null,o)}const u=s(p,[["render",t]]);export{m as __pageData,u as default};
