import{_ as s,o as e,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/modules/5-log.md","filePath":"guide/Linux/web/nginx/modules/5-log.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/modules/5-log.md"},p=a(`<h2 id="_1-修改时间格式" tabindex="-1">1.修改时间格式 <a class="header-anchor" href="#_1-修改时间格式" aria-label="Permalink to &quot;1.修改时间格式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$time_iso8601    生成格式：2019-04-20T09:24:35+08:00</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$time_local          生成格式： 20/Apr/2019:09:24:13 +0800</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$time_iso8601    生成格式：2019-04-20T09:24:35+08:00</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$time_local          生成格式： 20/Apr/2019:09:24:13 +0800</span></span></code></pre></div><h2 id="_1-2-time-local" tabindex="-1">1.2 time_local <a class="header-anchor" href="#_1-2-time-local" aria-label="Permalink to &quot;1.2 time_local&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">参考，http://nginx.org/en/docs/http/ngx_http_log_module.html</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">time_local 是日志产生的时间</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">nginx日志中的其他两个时间的解释 ：</span></span>
<span class="line"><span style="color:#e1e4e8;">1、request_time</span></span>
<span class="line"><span style="color:#e1e4e8;">官网描述：request processing time in seconds with a milliseconds resolution; time elapsed between the first bytes were read from the client and the log write after the last bytes were sent to the client 。</span></span>
<span class="line"><span style="color:#e1e4e8;">指的就是从接受用户请求的第一个字节到发送完响应数据的时间，即包括接收请求数据时间、程序响应时间、输出</span></span>
<span class="line"><span style="color:#e1e4e8;">响应数据时间。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2、upstream_response_time</span></span>
<span class="line"><span style="color:#e1e4e8;">官网描述：keeps times of responses obtained from upstream servers; times are kept in seconds with a milliseconds resolution. Several response times are separated by commas and colons like addresses in the $upstream_addr variable</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">是指从Nginx向后端（php-cgi)建立连接开始到接受完数据然后关闭连接为止的时间。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">从上面的描述可以看出，requesttime肯定比</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream_response_time值大，特别是使用POST方式传递参数时，因为Nginx会把request body缓存住，接受完毕后才会把数据一起发给后端。所以如果用户网络较差，或者传递数据较大时，requesttime会比upstream_response_time大很多</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">参考，http://nginx.org/en/docs/http/ngx_http_log_module.html</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">time_local 是日志产生的时间</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">nginx日志中的其他两个时间的解释 ：</span></span>
<span class="line"><span style="color:#24292e;">1、request_time</span></span>
<span class="line"><span style="color:#24292e;">官网描述：request processing time in seconds with a milliseconds resolution; time elapsed between the first bytes were read from the client and the log write after the last bytes were sent to the client 。</span></span>
<span class="line"><span style="color:#24292e;">指的就是从接受用户请求的第一个字节到发送完响应数据的时间，即包括接收请求数据时间、程序响应时间、输出</span></span>
<span class="line"><span style="color:#24292e;">响应数据时间。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2、upstream_response_time</span></span>
<span class="line"><span style="color:#24292e;">官网描述：keeps times of responses obtained from upstream servers; times are kept in seconds with a milliseconds resolution. Several response times are separated by commas and colons like addresses in the $upstream_addr variable</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">是指从Nginx向后端（php-cgi)建立连接开始到接受完数据然后关闭连接为止的时间。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">从上面的描述可以看出，requesttime肯定比</span></span>
<span class="line"><span style="color:#24292e;">upstream_response_time值大，特别是使用POST方式传递参数时，因为Nginx会把request body缓存住，接受完毕后才会把数据一起发给后端。所以如果用户网络较差，或者传递数据较大时，requesttime会比upstream_response_time大很多</span></span></code></pre></div>`,4),t=[p];function o(i,c,r,d,m,_){return e(),n("div",null,t)}const y=s(l,[["render",o]]);export{u as __pageData,y as default};
