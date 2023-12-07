import{_ as s,o as n,c as a,R as p}from"./chunks/framework.PZ77rLUR.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/15-error.md","filePath":"guide/Linux/web/nginx/15-error.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/15-error.md"},o=p(`<h2 id="_104-案例" tabindex="-1">104 案例 <a class="header-anchor" href="#_104-案例" aria-label="Permalink to &quot;104 案例&quot;">​</a></h2><p>查看nginx error错误，发现上传接口报以下错：</p><p><strong>2019/10/10 19:58:25 [error] 299784#0: *5967188 readv() failed (104: Connection reset by peer) while reading upstream, client: 59.34.155.7, server: xxxxxxxx, request: &quot;POST /stream/tracking/file HTTP/1.1&quot;, upstream: &quot;<a href="http://xxxxxxxx/stream/tracking/file" target="_blank" rel="noreferrer">http://xxxxxxxx/stream/tracking/file</a>&quot;, host: &quot;xxxxxxxx&quot;</strong></p><p>这种错误日志不多，第一感觉就是上传文件过大，传输时间过长，然后连接被中断。</p><p><strong>当使用nginx作为反向代理时，为了支持长连接，需要做到两点：</strong></p><p><strong>从client到nginx的连接是长连接，对于客户端来说，nginx长连接是默认开启的。</strong><strong>从nginx到server的连接是长连接，需要自己开启</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">upstream</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bigdata</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10.0</span><span style="color:#9ECBFF;">.20.xx:18018</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10.0</span><span style="color:#9ECBFF;">.20.xx:18018</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10.0</span><span style="color:#9ECBFF;">.20.xx:18018</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10.0</span><span style="color:#9ECBFF;">.20.xx:18018</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">keepalive</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">;   </span><span style="color:#B392F0;">//根据qps来调整</span></span>
<span class="line"><span style="color:#E1E4E8;">}  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">~</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://bigdata</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#下面的timeout跟自己的业务相关设置对应的timeout</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">proxy_connect_timeout</span><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">120</span><span style="color:#E1E4E8;">;   </span><span style="color:#B392F0;">//加大120</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">proxy_send_timeout</span><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">120</span><span style="color:#E1E4E8;">;   </span><span style="color:#B392F0;">//加大120</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">proxy_read_timeout</span><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">120</span><span style="color:#E1E4E8;">;   </span><span style="color:#B392F0;">//加大120</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">proxy_http_version</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.1</span><span style="color:#E1E4E8;">;    </span><span style="color:#B392F0;">//开启后端，长连接</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Connection</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;  </span><span style="color:#B392F0;">//开启后端，长连接</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">upstream</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bigdata</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10.0</span><span style="color:#032F62;">.20.xx:18018</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10.0</span><span style="color:#032F62;">.20.xx:18018</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10.0</span><span style="color:#032F62;">.20.xx:18018</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10.0</span><span style="color:#032F62;">.20.xx:18018</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">keepalive</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">;   </span><span style="color:#6F42C1;">//根据qps来调整</span></span>
<span class="line"><span style="color:#24292E;">}  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://bigdata</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#下面的timeout跟自己的业务相关设置对应的timeout</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">proxy_connect_timeout</span><span style="color:#24292E;">      </span><span style="color:#005CC5;">120</span><span style="color:#24292E;">;   </span><span style="color:#6F42C1;">//加大120</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">proxy_send_timeout</span><span style="color:#24292E;">         </span><span style="color:#005CC5;">120</span><span style="color:#24292E;">;   </span><span style="color:#6F42C1;">//加大120</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">proxy_read_timeout</span><span style="color:#24292E;">         </span><span style="color:#005CC5;">120</span><span style="color:#24292E;">;   </span><span style="color:#6F42C1;">//加大120</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">proxy_http_version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.1</span><span style="color:#24292E;">;    </span><span style="color:#6F42C1;">//开启后端，长连接</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Connection</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;  </span><span style="color:#6F42C1;">//开启后端，长连接</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>注意：<strong>keepalive指定的数值是Nginx每个worker连接后端的最大长连接数，而不是整个Nginx的</strong></p><p><a href="https://blog.csdn.net/zzhongcy/article/details/89090193" target="_blank" rel="noreferrer">https://blog.csdn.net/zzhongcy/article/details/89090193</a></p><p><a href="https://www.cnblogs.com/yehaifeng/p/11819241.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/yehaifeng/p/11819241.html</a></p><p><a href="http://blog.51yip.com/category/safe" target="_blank" rel="noreferrer">http://blog.51yip.com/category/safe</a></p>`,11),e=[o];function t(r,c,y,E,i,F){return n(),a("div",null,e)}const _=s(l,[["render",t]]);export{C as __pageData,_ as default};
