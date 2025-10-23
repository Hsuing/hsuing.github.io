import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const l="/assets/1657867477553978._vn6UE87.png",p="/assets/3.v2WP6k5P.jpg",_=JSON.parse('{"title":"2.1 over HTTPS","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/nginx案例.md","filePath":"guide/Linux/web/nginx/nginx案例.md","lastUpdated":1747060331000}'),o={name:"guide/Linux/web/nginx/nginx案例.md"},t=e(`<h2 id="_1-1-nginx转发带应用名的url" tabindex="-1">1.1 Nginx转发带应用名的URL <a class="header-anchor" href="#_1-1-nginx转发带应用名的url" aria-label="Permalink to &quot;1.1 Nginx转发带应用名的URL&quot;">​</a></h2><ul><li>实现 原始URL：<a href="http://brand.uat.test.com/vendor/login.htm,%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AENginx%E5%8F%AF%E4%BB%A5%E5%8F%AA%E8%BE%93%E5%85%A5http://brand.uat.test.com/%EF%BC%8C%E5%B0%B1%E8%83%BD%E6%AD%A3%E5%B8%B8%E8%AE%BF%E9%97%AE" target="_blank" rel="noreferrer">http://brand.uat.test.com/vendor/login.htm,如何配置Nginx可以只输入http://brand.uat.test.com/，就能正常访问</a></li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#vim /usr/local/nginx/conf/nginx.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">在http段配置中添加如下代码</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">       </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">server_name</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">brand.uat.test.com</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">charset</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">utf-8</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">access_log</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">logs/brand.uat.test.log</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">main</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">rewrite</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^/</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">.</span><span style="color:#E1E4E8;">*)$ </span><span style="color:#9ECBFF;">/vendor/</span><span style="color:#FFAB70;">$1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">last</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">~</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^/vendor/.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">$ </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Host</span><span style="color:#E1E4E8;"> $host;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Real-IP</span><span style="color:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Forwarded-For</span><span style="color:#E1E4E8;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://127.0.0.1:8084</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#vim /usr/local/nginx/conf/nginx.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">在http段配置中添加如下代码</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">       </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;">  </span><span style="color:#032F62;">brand.uat.test.com</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">charset</span><span style="color:#24292E;"> </span><span style="color:#032F62;">utf-8</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">access_log</span><span style="color:#24292E;">  </span><span style="color:#032F62;">logs/brand.uat.test.log</span><span style="color:#24292E;">  </span><span style="color:#032F62;">main</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">rewrite</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^/</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">.</span><span style="color:#24292E;">*)$ </span><span style="color:#032F62;">/vendor/</span><span style="color:#E36209;">$1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">last</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~</span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^/vendor/.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">$ </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Host</span><span style="color:#24292E;"> $host;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Real-IP</span><span style="color:#24292E;"> $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Forwarded-For</span><span style="color:#24292E;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://127.0.0.1:8084</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span></code></pre></div><h2 id="_1-2-nginx自动跳转https" tabindex="-1">1.2 Nginx自动跳转https <a class="header-anchor" href="#_1-2-nginx自动跳转https" aria-label="Permalink to &quot;1.2 Nginx自动跳转https&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#vim nginx.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">www.test.com</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">charset</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">utf-8</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">301</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://</span><span style="color:#E1E4E8;">$server_name$request_uri;  </span><span style="color:#6A737D;">#添加这行，即可以实现从http跳转到https</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">           </span><span style="color:#B392F0;">rewrite</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^/</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">.</span><span style="color:#E1E4E8;">*)$ </span><span style="color:#9ECBFF;">//</span><span style="color:#FFAB70;">$1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">last</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^~</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">//</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">http://127.0.0.1:8064</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_redirect</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Real-IP</span><span style="color:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Forwarded-For</span><span style="color:#E1E4E8;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#6A737D;">#或者</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($ssl_protocol = </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">) { </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">301</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://</span><span style="color:#E1E4E8;">$host$request_uri; }     </span><span style="color:#6A737D;">#http请求自动301跳转到https</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#vim nginx.conf</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">www.test.com</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">charset</span><span style="color:#24292E;"> </span><span style="color:#032F62;">utf-8</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">301</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://</span><span style="color:#24292E;">$server_name$request_uri;  </span><span style="color:#6A737D;">#添加这行，即可以实现从http跳转到https</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">           </span><span style="color:#6F42C1;">rewrite</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^/</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">.</span><span style="color:#24292E;">*)$ </span><span style="color:#032F62;">//</span><span style="color:#E36209;">$1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">last</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^~</span><span style="color:#24292E;"> </span><span style="color:#032F62;">//</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;">   </span><span style="color:#032F62;">http://127.0.0.1:8064</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_redirect</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Real-IP</span><span style="color:#24292E;"> $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Forwarded-For</span><span style="color:#24292E;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;">#或者</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($ssl_protocol = </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">) { </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">301</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://</span><span style="color:#24292E;">$host$request_uri; }     </span><span style="color:#6A737D;">#http请求自动301跳转到https</span></span></code></pre></div><h2 id="_1-3-nginx根据客户端版本号跳转至后台相应服务器" tabindex="-1">1.3 Nginx根据客户端版本号跳转至后台相应服务器 <a class="header-anchor" href="#_1-3-nginx根据客户端版本号跳转至后台相应服务器" aria-label="Permalink to &quot;1.3 Nginx根据客户端版本号跳转至后台相应服务器&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Nginx通过客户端的APP版本号来判定跳转后台对应的版本号的服务器，配置如下：</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">upstream</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">appserver{</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10.9</span><span style="color:#9ECBFF;">.14.1:799</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">weight=</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">uatv2.yaok.com</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^~</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/appapi/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">               </span><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> $newIp </span><span style="color:#9ECBFF;">&quot;10.7.4.49:8180&quot;</span><span style="color:#E1E4E8;">;   </span></span>
<span class="line"><span style="color:#E1E4E8;">               </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($http_appVersion  = </span><span style="color:#9ECBFF;">&quot;1.4.0&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> $newIp </span><span style="color:#9ECBFF;">&quot;10.9.54.128:799&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">               } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#以上代码意思是，如果客户端版本是1.4.0，则跳转至10.9.54.128:799，否则跳转至10.7.4.49:8180这台服务器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;http://</span><span style="color:#E1E4E8;">$newIp</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_redirect</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Real-IP</span><span style="color:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Forwarded-For</span><span style="color:#E1E4E8;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^~</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/pay/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://appserver/pay/</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_redirect</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Real-IP</span><span style="color:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Forwarded-For</span><span style="color:#E1E4E8;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^~</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/uploadapi/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://appserver/uploadapi/</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_redirect</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Real-IP</span><span style="color:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Forwarded-For</span><span style="color:#E1E4E8;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">           </span><span style="color:#B392F0;">rewrite</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^/</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">.</span><span style="color:#E1E4E8;">*)$ </span><span style="color:#9ECBFF;">//</span><span style="color:#FFAB70;">$1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">last</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#这段要放在未尾才能跳转成功</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Nginx通过客户端的APP版本号来判定跳转后台对应的版本号的服务器，配置如下：</span><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">upstream</span><span style="color:#24292E;"> </span><span style="color:#032F62;">appserver{</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10.9</span><span style="color:#032F62;">.14.1:799</span><span style="color:#24292E;">  </span><span style="color:#032F62;">weight=</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">uatv2.yaok.com</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^~</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/appapi/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">               </span><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $newIp </span><span style="color:#032F62;">&quot;10.7.4.49:8180&quot;</span><span style="color:#24292E;">;   </span></span>
<span class="line"><span style="color:#24292E;">               </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($http_appVersion  = </span><span style="color:#032F62;">&quot;1.4.0&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $newIp </span><span style="color:#032F62;">&quot;10.9.54.128:799&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">               } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#以上代码意思是，如果客户端版本是1.4.0，则跳转至10.9.54.128:799，否则跳转至10.7.4.49:8180这台服务器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;http://</span><span style="color:#24292E;">$newIp</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_redirect</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Real-IP</span><span style="color:#24292E;"> $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Forwarded-For</span><span style="color:#24292E;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^~</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/pay/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://appserver/pay/</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_redirect</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Real-IP</span><span style="color:#24292E;"> $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Forwarded-For</span><span style="color:#24292E;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^~</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/uploadapi/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://appserver/uploadapi/</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_redirect</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Real-IP</span><span style="color:#24292E;"> $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Forwarded-For</span><span style="color:#24292E;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">           </span><span style="color:#6F42C1;">rewrite</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^/</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">.</span><span style="color:#24292E;">*)$ </span><span style="color:#032F62;">//</span><span style="color:#E36209;">$1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">last</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#这段要放在未尾才能跳转成功</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><h2 id="_1-4nginx按访问条件进行重写" tabindex="-1">1.4Nginx按访问条件进行重写 <a class="header-anchor" href="#_1-4nginx按访问条件进行重写" aria-label="Permalink to &quot;1.4Nginx按访问条件进行重写&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">需求：tg.linuxhub.cn/tx/100.html此链接PC访问时内容不变，</span></span>
<span class="line"><span style="color:#e1e4e8;">手机访问时内容换成 tg.linuxhub.cn/star/qq 此链接的内容</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">set $tags &#39;0&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_user_agent ~* &#39;(Android|webOS|iPhone|iPod|BlackBerry)&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $tags &#39;1&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">if ($host = &quot;tg.linuxhub.cn&quot;){</span></span>
<span class="line"><span style="color:#e1e4e8;">    set $tags &quot;\${tags}a&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $uri ~ ^/tx/100.html ){</span></span>
<span class="line"><span style="color:#e1e4e8;">         set $tags &quot;\${tags}20170105&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $tags = &quot;1a20170105&quot; ){</span></span>
<span class="line"><span style="color:#e1e4e8;">       rewrite . /star.php?thems=qq last;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">需求：tg.linuxhub.cn/tx/100.html此链接PC访问时内容不变，</span></span>
<span class="line"><span style="color:#24292e;">手机访问时内容换成 tg.linuxhub.cn/star/qq 此链接的内容</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">set $tags &#39;0&#39;;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">if ($http_user_agent ~* &#39;(Android|webOS|iPhone|iPod|BlackBerry)&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">        set $tags &#39;1&#39;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">if ($host = &quot;tg.linuxhub.cn&quot;){</span></span>
<span class="line"><span style="color:#24292e;">    set $tags &quot;\${tags}a&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">if ( $uri ~ ^/tx/100.html ){</span></span>
<span class="line"><span style="color:#24292e;">         set $tags &quot;\${tags}20170105&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">if ( $tags = &quot;1a20170105&quot; ){</span></span>
<span class="line"><span style="color:#24292e;">       rewrite . /star.php?thems=qq last;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_1-5nginx-正则" tabindex="-1">1.5nginx 正则 <a class="header-anchor" href="#_1-5nginx-正则" aria-label="Permalink to &quot;1.5nginx 正则&quot;">​</a></h2><ul><li><a href="https://rubular.com/r/WxbGSkXWRi" target="_blank" rel="noreferrer">https://rubular.com/r/WxbGSkXWRi</a></li></ul><p>日志格式</p><p>&#39;$http_host $server_addr $remote_addr &quot;$http_x_forwarded_for&quot; [$time_local] &quot;$request&quot; $status $body_bytes_sent &quot;$http_referer&quot; &quot;$http_user_agent&quot; $request_time $upstream_response_time&#39;;</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">([^\\s]*)              #匹配 $http_host</span></span>
<span class="line"><span style="color:#e1e4e8;">(\\d+\\.\\d+\\.\\d+\\.\\d+)  #匹配 $server_addr,$remote_addr</span></span>
<span class="line"><span style="color:#e1e4e8;">(\\&quot;\\d+\\.\\d+\\.\\d+\\.\\d+\\,\\s\\d+\\.\\d+\\.\\d+\\.\\d+\\&quot;|\\&quot;\\d+\\.\\d+\\.\\d+\\.\\d+\\&quot;) #匹配 &quot;$http_x_forwarded_for&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">(\\[[^\\[\\]]+\\])     #匹配[$time_local]</span></span>
<span class="line"><span style="color:#e1e4e8;">(\\&quot;(?:[^&quot;]|\\&quot;)+|-\\&quot;)   #匹配&quot;$request&quot;,&quot;$http_referer&quot;，&quot;$http_user_agent&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">(\\d{3})            #匹配$status </span></span>
<span class="line"><span style="color:#e1e4e8;">(\\d+|-)            #匹配$body_bytes_sent</span></span>
<span class="line"><span style="color:#e1e4e8;">(\\d*\\.\\d*|\\-)      #匹配$request_time,$upstream_response_time&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">^                  #匹配每行数据的开头</span></span>
<span class="line"><span style="color:#e1e4e8;">$                  #匹配每行数据的结局</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">([^\\s]*)              #匹配 $http_host</span></span>
<span class="line"><span style="color:#24292e;">(\\d+\\.\\d+\\.\\d+\\.\\d+)  #匹配 $server_addr,$remote_addr</span></span>
<span class="line"><span style="color:#24292e;">(\\&quot;\\d+\\.\\d+\\.\\d+\\.\\d+\\,\\s\\d+\\.\\d+\\.\\d+\\.\\d+\\&quot;|\\&quot;\\d+\\.\\d+\\.\\d+\\.\\d+\\&quot;) #匹配 &quot;$http_x_forwarded_for&quot;</span></span>
<span class="line"><span style="color:#24292e;">(\\[[^\\[\\]]+\\])     #匹配[$time_local]</span></span>
<span class="line"><span style="color:#24292e;">(\\&quot;(?:[^&quot;]|\\&quot;)+|-\\&quot;)   #匹配&quot;$request&quot;,&quot;$http_referer&quot;，&quot;$http_user_agent&quot;</span></span>
<span class="line"><span style="color:#24292e;">(\\d{3})            #匹配$status </span></span>
<span class="line"><span style="color:#24292e;">(\\d+|-)            #匹配$body_bytes_sent</span></span>
<span class="line"><span style="color:#24292e;">(\\d*\\.\\d*|\\-)      #匹配$request_time,$upstream_response_time&#39;</span></span>
<span class="line"><span style="color:#24292e;">^                  #匹配每行数据的开头</span></span>
<span class="line"><span style="color:#24292e;">$                  #匹配每行数据的结局</span></span></code></pre></div><h2 id="_1-6nginx在alias别名目录下解析php文件" tabindex="-1">1.6Nginx在alias别名目录下解析php文件 <a class="header-anchor" href="#_1-6nginx在alias别名目录下解析php文件" aria-label="Permalink to &quot;1.6Nginx在alias别名目录下解析php文件&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#静态文件</span></span>
<span class="line"><span style="color:#e1e4e8;">location /svn {</span></span>
<span class="line"><span style="color:#e1e4e8;">        alias /data/web/www.linxuhub.cn/data/svn/;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">#动态文件</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ ^/svn/.+\\.php$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">        root /data/web/www.linxuhub.cn/data/svn;</span></span>
<span class="line"><span style="color:#e1e4e8;">        rewrite /svn/(.*\\.php?) /$1 break;</span></span>
<span class="line"><span style="color:#e1e4e8;">        fastcgi_pass  unix:/tmp/php-cgi.sock;</span></span>
<span class="line"><span style="color:#e1e4e8;">        fastcgi_index index.php;</span></span>
<span class="line"><span style="color:#e1e4e8;">        include fastcgi.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#静态文件</span></span>
<span class="line"><span style="color:#24292e;">location /svn {</span></span>
<span class="line"><span style="color:#24292e;">        alias /data/web/www.linxuhub.cn/data/svn/;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">#动态文件</span></span>
<span class="line"><span style="color:#24292e;">location ~ ^/svn/.+\\.php$ {</span></span>
<span class="line"><span style="color:#24292e;">        root /data/web/www.linxuhub.cn/data/svn;</span></span>
<span class="line"><span style="color:#24292e;">        rewrite /svn/(.*\\.php?) /$1 break;</span></span>
<span class="line"><span style="color:#24292e;">        fastcgi_pass  unix:/tmp/php-cgi.sock;</span></span>
<span class="line"><span style="color:#24292e;">        fastcgi_index index.php;</span></span>
<span class="line"><span style="color:#24292e;">        include fastcgi.conf;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_1-7-nginx根据手机端与电脑端设备相同地址显示不同页面内容" tabindex="-1">1.7 Nginx根据手机端与电脑端设备相同地址显示不同页面内容 <a class="header-anchor" href="#_1-7-nginx根据手机端与电脑端设备相同地址显示不同页面内容" aria-label="Permalink to &quot;1.7 Nginx根据手机端与电脑端设备相同地址显示不同页面内容&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">描述:</span></span>
<span class="line"><span style="color:#e1e4e8;">根据用户访问的设备类型，相同的地址显示不同的内容</span></span>
<span class="line"><span style="color:#e1e4e8;">比如，电脑上访问http://192.168.0.100/shop/s888_a.html这个页面显示内容是”aaaaa”</span></span>
<span class="line"><span style="color:#e1e4e8;">然后用手机访问http://192.168.0.100/shop/s888_a.html这个页面内容是“bbbbb”,</span></span>
<span class="line"><span style="color:#e1e4e8;">但访问的URL链接地址是一样，相同的地址显示不同的内容</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1,</span></span>
<span class="line"><span style="color:#e1e4e8;">电脑访问： http://192.168.0.100/shop/s888_a.html  </span></span>
<span class="line"><span style="color:#e1e4e8;">手机访问:  http://192.168.0.100/shop/s888_a.html (URL不变内容改变)</span></span>
<span class="line"><span style="color:#e1e4e8;">           http://192.168.0.100/shop/article-256.html (显示这个页面的内容)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2,</span></span>
<span class="line"><span style="color:#e1e4e8;">电脑访问： http://192.168.0.100/shop/10086.html  </span></span>
<span class="line"><span style="color:#e1e4e8;">手机访问:  http://192.168.0.100/shop/10086.html (URL不变内容改变)</span></span>
<span class="line"><span style="color:#e1e4e8;">           http://192.168.0.100/shop/article-512.html (显示这个页面的内容)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">描述:</span></span>
<span class="line"><span style="color:#24292e;">根据用户访问的设备类型，相同的地址显示不同的内容</span></span>
<span class="line"><span style="color:#24292e;">比如，电脑上访问http://192.168.0.100/shop/s888_a.html这个页面显示内容是”aaaaa”</span></span>
<span class="line"><span style="color:#24292e;">然后用手机访问http://192.168.0.100/shop/s888_a.html这个页面内容是“bbbbb”,</span></span>
<span class="line"><span style="color:#24292e;">但访问的URL链接地址是一样，相同的地址显示不同的内容</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1,</span></span>
<span class="line"><span style="color:#24292e;">电脑访问： http://192.168.0.100/shop/s888_a.html  </span></span>
<span class="line"><span style="color:#24292e;">手机访问:  http://192.168.0.100/shop/s888_a.html (URL不变内容改变)</span></span>
<span class="line"><span style="color:#24292e;">           http://192.168.0.100/shop/article-256.html (显示这个页面的内容)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2,</span></span>
<span class="line"><span style="color:#24292e;">电脑访问： http://192.168.0.100/shop/10086.html  </span></span>
<span class="line"><span style="color:#24292e;">手机访问:  http://192.168.0.100/shop/10086.html (URL不变内容改变)</span></span>
<span class="line"><span style="color:#24292e;">           http://192.168.0.100/shop/article-512.html (显示这个页面的内容)</span></span></code></pre></div><ul><li>nginx 配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 0 是PC端</span></span>
<span class="line"><span style="color:#e1e4e8;">set $tags &#39;0&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"># 1 是手机</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_user_agent ~* &#39;(Android|webOS|iPhone|iPod|BlackBerry)&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">         set $tags &#39;1&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $uri ~ ^/shop/s888_a.html){</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $tags &quot;\${tags}1&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $uri ~ ^/shop/10086.html){</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $tags &quot;\${tags}2&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"># /shop/s888_a.html</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $tags = &quot;11&quot; ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">           rewrite  .  /article.php?mod=info&amp;id=256 last;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"># /shop/10086.html</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $tags = &quot;12&quot; ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">             rewrite  .  /article.php?mod=info&amp;id=512 last;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"># 这几条是原来Nginx的伪静态重写</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite  ^/article-([0-9]+).html$           /article.php?mod=info&amp;id=$1  last;</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite  ^/shop/s([0-9]+)(\\w*)\\.html$  /goods.php?goods_id=$1&amp;alias=$2&amp;show=1 last;</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^/shop/([0-9]+).html$       /goods.php?goods_id=$1  last;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 0 是PC端</span></span>
<span class="line"><span style="color:#24292e;">set $tags &#39;0&#39;;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"># 1 是手机</span></span>
<span class="line"><span style="color:#24292e;">if ($http_user_agent ~* &#39;(Android|webOS|iPhone|iPod|BlackBerry)&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">         set $tags &#39;1&#39;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">if ( $uri ~ ^/shop/s888_a.html){</span></span>
<span class="line"><span style="color:#24292e;">        set $tags &quot;\${tags}1&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">if ( $uri ~ ^/shop/10086.html){</span></span>
<span class="line"><span style="color:#24292e;">        set $tags &quot;\${tags}2&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"># /shop/s888_a.html</span></span>
<span class="line"><span style="color:#24292e;">if ( $tags = &quot;11&quot; ) {</span></span>
<span class="line"><span style="color:#24292e;">           rewrite  .  /article.php?mod=info&amp;id=256 last;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"># /shop/10086.html</span></span>
<span class="line"><span style="color:#24292e;">if ( $tags = &quot;12&quot; ) {</span></span>
<span class="line"><span style="color:#24292e;">             rewrite  .  /article.php?mod=info&amp;id=512 last;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"># 这几条是原来Nginx的伪静态重写</span></span>
<span class="line"><span style="color:#24292e;">rewrite  ^/article-([0-9]+).html$           /article.php?mod=info&amp;id=$1  last;</span></span>
<span class="line"><span style="color:#24292e;">rewrite  ^/shop/s([0-9]+)(\\w*)\\.html$  /goods.php?goods_id=$1&amp;alias=$2&amp;show=1 last;</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^/shop/([0-9]+).html$       /goods.php?goods_id=$1  last;</span></span></code></pre></div><ul><li>那如果反过来呢，手机端访问内容不变，PC端访问内容改变</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 0 是PC端</span></span>
<span class="line"><span style="color:#e1e4e8;"># 1 是手机端</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $tags = &quot;01&quot; ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">           rewrite  .  /article.php?mod=info&amp;id=256 last;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 0 是PC端</span></span>
<span class="line"><span style="color:#24292e;"># 1 是手机端</span></span>
<span class="line"><span style="color:#24292e;">if ( $tags = &quot;01&quot; ) {</span></span>
<span class="line"><span style="color:#24292e;">           rewrite  .  /article.php?mod=info&amp;id=256 last;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="_1-7-1同一个域名显示手机和pc" tabindex="-1">1.7.1同一个域名显示手机和ｐｃ <a class="header-anchor" href="#_1-7-1同一个域名显示手机和pc" aria-label="Permalink to &quot;1.7.1同一个域名显示手机和ｐｃ&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#前提是没有try情况下</span></span>
<span class="line"><span style="color:#e1e4e8;">set $mobile_request 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">      if ($http_user_agent ~* (android|ip(ad|hone|od)|kindle|blackberry|windows\\s(ce|phone))) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        set  $mobile_request 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">   location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">	   root /data/wwwroot/forum/forum_pc; </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	    if ($mobile_request = 1) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            root /data/wwwroot/forum/forum_h5;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">#wap</span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ( $http_user_agent ~ &quot;(MIDP)|(WAP)|(UP.Browser)|(Smartphone)|(Obigo)|(Mobile)|(AU.Browser)|(wxd.Mms)|(WxdB.Browser)|(CLDC)|(UP.Link)|(KM.Browser)|(UCWEB)|(SEMC-Browser)|(Mini)|(Symbian)|(Palm)|(Nokia)|(Panasonic)|(MOT-)|(SonyEricsson)|(NEC-)|(Alcatel)|(Ericsson)|(BENQ)|(BenQ)|(Amoisonic)|(Amoi-)|(Capitel)|(PHILIPS)|(SAMSUNG)|(Lenovo)|(Mitsu)|(Motorola)|(SHARP)|(WAPPER)|(LG-)|(LG/)|(EG900)|(CECT)|(Compal)|(kejian)|(Bird)|(BIRD)|(G900/V1.0)|(Arima)|(CTL)|(TDG)|(Daxian)|(DAXIAN)|(DBTEL)|(Eastcom)|(EASTCOM)|(PANTECH)|(Dopod)|(Haier)|(HAIER)|(KONKA)|(KEJIAN)|(LENOVO)|(Soutec)|(SOUTEC)|(SAGEM)|(SEC-)|(SED-)|(EMOL-)|(INNO55)|(ZTE)|(iPhone)|(Android)|(Windows CE)|(Wget)|(Java)|(curl)|(Opera)&quot; ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        rewrite ^/(.*)$ http://mobile.kuangex.com/ last;		#跳转到手机端的二级域名上访问！</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">---------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#Nginx区分PC或手机访问不同域名（存在try）</span></span>
<span class="line"><span style="color:#e1e4e8;">在PC端访问www.xxx.cn或m.xxx.cn时，跳转到www.xxx.cn。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">当在移动端访问www.xxx.cn或m.xxx.cn时，跳转到m.xxx.cn</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#pc配置</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen       80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  www.xxx.cn;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($http_host !~ &quot;www.xxx.cn$&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        rewrite ^(.*) http://www.xxx.cn$1 permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($http_user_agent ~* &#39;(Android|webOS|iPhone|iPod|BlackBerry)&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        rewrite ^(.*) http://m.xxx.cn$1 permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        root /var/www/space/space;</span></span>
<span class="line"><span style="color:#e1e4e8;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;">        try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#m配置</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen       80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  m.xxx.cn;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($http_user_agent !~* &#39;(Android|webOS|iPhone|iPod|BlackBerry)&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        rewrite ^(.*) http://www.xxx.cn$1 permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        root /var/www/space/spaceMobile;</span></span>
<span class="line"><span style="color:#e1e4e8;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;">        try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#前提是没有try情况下</span></span>
<span class="line"><span style="color:#24292e;">set $mobile_request 0;</span></span>
<span class="line"><span style="color:#24292e;">      if ($http_user_agent ~* (android|ip(ad|hone|od)|kindle|blackberry|windows\\s(ce|phone))) {</span></span>
<span class="line"><span style="color:#24292e;">        set  $mobile_request 1;</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">   location / {</span></span>
<span class="line"><span style="color:#24292e;">	   root /data/wwwroot/forum/forum_pc; </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	    if ($mobile_request = 1) {</span></span>
<span class="line"><span style="color:#24292e;">            root /data/wwwroot/forum/forum_h5;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">#wap</span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">    if ( $http_user_agent ~ &quot;(MIDP)|(WAP)|(UP.Browser)|(Smartphone)|(Obigo)|(Mobile)|(AU.Browser)|(wxd.Mms)|(WxdB.Browser)|(CLDC)|(UP.Link)|(KM.Browser)|(UCWEB)|(SEMC-Browser)|(Mini)|(Symbian)|(Palm)|(Nokia)|(Panasonic)|(MOT-)|(SonyEricsson)|(NEC-)|(Alcatel)|(Ericsson)|(BENQ)|(BenQ)|(Amoisonic)|(Amoi-)|(Capitel)|(PHILIPS)|(SAMSUNG)|(Lenovo)|(Mitsu)|(Motorola)|(SHARP)|(WAPPER)|(LG-)|(LG/)|(EG900)|(CECT)|(Compal)|(kejian)|(Bird)|(BIRD)|(G900/V1.0)|(Arima)|(CTL)|(TDG)|(Daxian)|(DAXIAN)|(DBTEL)|(Eastcom)|(EASTCOM)|(PANTECH)|(Dopod)|(Haier)|(HAIER)|(KONKA)|(KEJIAN)|(LENOVO)|(Soutec)|(SOUTEC)|(SAGEM)|(SEC-)|(SED-)|(EMOL-)|(INNO55)|(ZTE)|(iPhone)|(Android)|(Windows CE)|(Wget)|(Java)|(curl)|(Opera)&quot; ) {</span></span>
<span class="line"><span style="color:#24292e;">        rewrite ^/(.*)$ http://mobile.kuangex.com/ last;		#跳转到手机端的二级域名上访问！</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">---------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292e;">#Nginx区分PC或手机访问不同域名（存在try）</span></span>
<span class="line"><span style="color:#24292e;">在PC端访问www.xxx.cn或m.xxx.cn时，跳转到www.xxx.cn。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">当在移动端访问www.xxx.cn或m.xxx.cn时，跳转到m.xxx.cn</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#pc配置</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen       80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  www.xxx.cn;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    if ($http_host !~ &quot;www.xxx.cn$&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">        rewrite ^(.*) http://www.xxx.cn$1 permanent;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    if ($http_user_agent ~* &#39;(Android|webOS|iPhone|iPod|BlackBerry)&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">        rewrite ^(.*) http://m.xxx.cn$1 permanent;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        root /var/www/space/space;</span></span>
<span class="line"><span style="color:#24292e;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;">        try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#m配置</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen       80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  m.xxx.cn;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    if ($http_user_agent !~* &#39;(Android|webOS|iPhone|iPod|BlackBerry)&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">        rewrite ^(.*) http://www.xxx.cn$1 permanent;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        root /var/www/space/spaceMobile;</span></span>
<span class="line"><span style="color:#24292e;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;">        try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="_1-7-2配置区分手机和pc网页" tabindex="-1">1.7.2配置区分手机和PC网页 <a class="header-anchor" href="#_1-7-2配置区分手机和pc网页" aria-label="Permalink to &quot;1.7.2配置区分手机和PC网页&quot;">​</a></h3><h4 id="手机的配置" tabindex="-1">手机的配置 <a class="header-anchor" href="#手机的配置" aria-label="Permalink to &quot;手机的配置&quot;">​</a></h4><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">server</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">listen</span><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">server_name</span><span style="color:#E1E4E8;">       </span><span style="color:#79B8FF;">m</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">in83</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">com</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">access_log</span><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">/var/</span><span style="color:#79B8FF;">www</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">nginx</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">m</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">in83</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">com</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">log</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">index</span><span style="color:#E1E4E8;">             </span><span style="color:#79B8FF;">index</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">htm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">index</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">root</span><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">/var/</span><span style="color:#79B8FF;">www</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">in83</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">m</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">location</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">=/</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">index</span><span style="color:#E1E4E8;">             </span><span style="color:#79B8FF;">index</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">htm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">index</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">root</span><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">/var/</span><span style="color:#79B8FF;">www</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">in83</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">m</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">location</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">proxy_set_header</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Host</span><span style="color:#E1E4E8;">             $host;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">proxy_set_header</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">X</span><span style="color:#F97583;">-Real-</span><span style="color:#79B8FF;">IP</span><span style="color:#E1E4E8;">        $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">proxy_set_header</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">X</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">Forwarded</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">For</span><span style="color:#E1E4E8;">  $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> $mobile_request </span><span style="color:#9ECBFF;">&#39;0&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($http_user_agent </span><span style="color:#F97583;">~*</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;(Android|webOS|iPhone|iPod|BlackBerry)&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> $mobile_request </span><span style="color:#9ECBFF;">&#39;1&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($mobile_request </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;1&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">rewrite</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">^</span><span style="color:#F97583;">.</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">http</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//www.in83.com$uri;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!-</span><span style="color:#79B8FF;">f</span><span style="color:#E1E4E8;"> $request_filename) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">proxy_pass</span><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">http</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//115.159.142.246:2020;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">listen</span><span style="color:#24292E;">            </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">server_name</span><span style="color:#24292E;">       </span><span style="color:#005CC5;">m</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">in83</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">com</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">access_log</span><span style="color:#24292E;">        </span><span style="color:#D73A49;">/var/</span><span style="color:#005CC5;">www</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">nginx</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">m</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">in83</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">com</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">log</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">index</span><span style="color:#24292E;">             </span><span style="color:#005CC5;">index</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">htm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">index</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">root</span><span style="color:#24292E;">              </span><span style="color:#D73A49;">/var/</span><span style="color:#005CC5;">www</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">in83</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">m</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">location</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">=/</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">index</span><span style="color:#24292E;">             </span><span style="color:#005CC5;">index</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">htm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">index</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">root</span><span style="color:#24292E;">              </span><span style="color:#D73A49;">/var/</span><span style="color:#005CC5;">www</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">in83</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">m</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">location</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">proxy_set_header</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">Host</span><span style="color:#24292E;">             $host;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">proxy_set_header</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">X</span><span style="color:#D73A49;">-Real-</span><span style="color:#005CC5;">IP</span><span style="color:#24292E;">        $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">proxy_set_header</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">X</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">Forwarded</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">For</span><span style="color:#24292E;">  $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $mobile_request </span><span style="color:#032F62;">&#39;0&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($http_user_agent </span><span style="color:#D73A49;">~*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;(Android|webOS|iPhone|iPod|BlackBerry)&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $mobile_request </span><span style="color:#032F62;">&#39;1&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($mobile_request </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;1&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">rewrite</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">^</span><span style="color:#D73A49;">.</span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">http</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//www.in83.com$uri;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!-</span><span style="color:#005CC5;">f</span><span style="color:#24292E;"> $request_filename) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">proxy_pass</span><span style="color:#24292E;">        </span><span style="color:#005CC5;">http</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//115.159.142.246:2020;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="pc的配置" tabindex="-1">PC的配置 <a class="header-anchor" href="#pc的配置" aria-label="Permalink to &quot;PC的配置&quot;">​</a></h4><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">server</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">listen</span><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">server_name</span><span style="color:#E1E4E8;">       </span><span style="color:#79B8FF;">in83</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">com</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">www</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">in83</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">com</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">access_log</span><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">/var/</span><span style="color:#79B8FF;">www</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">nginx</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">www</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">in83</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">com</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">log</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">index</span><span style="color:#E1E4E8;">             </span><span style="color:#79B8FF;">index</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">htm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">index</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">root</span><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">/var/</span><span style="color:#79B8FF;">www</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">in83</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">www</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">location</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">=/</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">index</span><span style="color:#E1E4E8;">             </span><span style="color:#79B8FF;">index</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">htm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">index</span><span style="color:#F97583;">.</span><span style="color:#79B8FF;">html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">root</span><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">/var/</span><span style="color:#79B8FF;">www</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">in83</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">www</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">location</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">proxy_set_header</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Host</span><span style="color:#E1E4E8;">             $host;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">proxy_set_header</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">X</span><span style="color:#F97583;">-Real-</span><span style="color:#79B8FF;">IP</span><span style="color:#E1E4E8;">        $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">proxy_set_header</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">X</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">Forwarded</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">For</span><span style="color:#E1E4E8;">  $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($http_user_agent </span><span style="color:#F97583;">~*</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;(Android|webOS|iPhone|iPod|BlackBerry)&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> $mobile_request </span><span style="color:#9ECBFF;">&#39;1&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($mobile_request </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;1&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">rewrite</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">^</span><span style="color:#F97583;">.</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">http</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//m.in83.com$uri;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!-</span><span style="color:#79B8FF;">f</span><span style="color:#E1E4E8;"> $request_filename) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">proxy_pass</span><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">http</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//115.159.142.246:2020;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">server</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">listen</span><span style="color:#24292E;">            </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">server_name</span><span style="color:#24292E;">       </span><span style="color:#005CC5;">in83</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">com</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">www</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">in83</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">com</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">access_log</span><span style="color:#24292E;">        </span><span style="color:#D73A49;">/var/</span><span style="color:#005CC5;">www</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">nginx</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">www</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">in83</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">com</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">log</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">index</span><span style="color:#24292E;">             </span><span style="color:#005CC5;">index</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">htm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">index</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">root</span><span style="color:#24292E;">              </span><span style="color:#D73A49;">/var/</span><span style="color:#005CC5;">www</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">in83</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">www</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">location</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">=/</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">index</span><span style="color:#24292E;">             </span><span style="color:#005CC5;">index</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">htm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">index</span><span style="color:#D73A49;">.</span><span style="color:#005CC5;">html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">root</span><span style="color:#24292E;">              </span><span style="color:#D73A49;">/var/</span><span style="color:#005CC5;">www</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">in83</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">www</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">location</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">proxy_set_header</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">Host</span><span style="color:#24292E;">             $host;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">proxy_set_header</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">X</span><span style="color:#D73A49;">-Real-</span><span style="color:#005CC5;">IP</span><span style="color:#24292E;">        $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">proxy_set_header</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">X</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">Forwarded</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">For</span><span style="color:#24292E;">  $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($http_user_agent </span><span style="color:#D73A49;">~*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;(Android|webOS|iPhone|iPod|BlackBerry)&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $mobile_request </span><span style="color:#032F62;">&#39;1&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($mobile_request </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;1&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">rewrite</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">^</span><span style="color:#D73A49;">.</span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">http</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//m.in83.com$uri;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!-</span><span style="color:#005CC5;">f</span><span style="color:#24292E;"> $request_filename) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">proxy_pass</span><span style="color:#24292E;">        </span><span style="color:#005CC5;">http</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//115.159.142.246:2020;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_1-8-nginx阻止来源域名禁止访问" tabindex="-1">1.8 Nginx阻止来源域名禁止访问 <a class="header-anchor" href="#_1-8-nginx阻止来源域名禁止访问" aria-label="Permalink to &quot;1.8 Nginx阻止来源域名禁止访问&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Nginx阻止来源域名禁止访问</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_referer ~* www.test.com ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">              return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">阻止来源的url中包含的路径</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $uri ~ ^/test/10086.html ){</span></span>
<span class="line"><span style="color:#e1e4e8;">      return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">阻止来源并重新转到另一个页面</span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ( $http_referer ~* &#39;http://www.test.com/test.html&#39; ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">               proxy_pass      http://www.linuxhub.org;</span></span>
<span class="line"><span style="color:#e1e4e8;">               break;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Nginx阻止来源域名禁止访问</span></span>
<span class="line"><span style="color:#24292e;">if ($http_referer ~* www.test.com ) {</span></span>
<span class="line"><span style="color:#24292e;">              return 403;</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">阻止来源的url中包含的路径</span></span>
<span class="line"><span style="color:#24292e;">if ( $uri ~ ^/test/10086.html ){</span></span>
<span class="line"><span style="color:#24292e;">      return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">阻止来源并重新转到另一个页面</span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">        if ( $http_referer ~* &#39;http://www.test.com/test.html&#39; ) {</span></span>
<span class="line"><span style="color:#24292e;">               proxy_pass      http://www.linuxhub.org;</span></span>
<span class="line"><span style="color:#24292e;">               break;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="禁止后缀文件访问" tabindex="-1">禁止后缀文件访问 <a class="header-anchor" href="#禁止后缀文件访问" aria-label="Permalink to &quot;禁止后缀文件访问&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^~</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/upload{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/share/html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($request_filename </span><span style="color:#F97583;">~*</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">.</span><span style="color:#E1E4E8;">*)</span><span style="color:#79B8FF;">\\.</span><span style="color:#E1E4E8;">php){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">403</span><span style="color:#E1E4E8;">;  </span><span style="color:#6A737D;">#拒绝访问</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^~</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/upload{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">root</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/share/html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($request_filename </span><span style="color:#D73A49;">~*</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">.</span><span style="color:#24292E;">*)</span><span style="color:#005CC5;">\\.</span><span style="color:#24292E;">php){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">403</span><span style="color:#24292E;">;  </span><span style="color:#6A737D;">#拒绝访问</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_1-9-本地图片缓存案例" tabindex="-1">1.9 本地图片缓存案例 <a class="header-anchor" href="#_1-9-本地图片缓存案例" aria-label="Permalink to &quot;1.9 本地图片缓存案例&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">nginx可以通过 expires 指令来设置浏览器的Header</span></span>
<span class="line"><span style="color:#e1e4e8;">语法： expires [time|epoch|max|off]</span></span>
<span class="line"><span style="color:#e1e4e8;">默认值： expires off</span></span>
<span class="line"><span style="color:#e1e4e8;">作用域： http, server, location</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">使用本指令可以控制HTTP应答中的“Expires”和“Cache-Control”的头标，（起到控制页面缓存的作用）。</span></span>
<span class="line"><span style="color:#e1e4e8;">可以在time值中使用正数或负数。“Expires”头标的值将通过当前系统时间加上您设定的 time 值来获得。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">epoch 指定“Expires”的值为 1 January, 1970, 00:00:01 GMT。</span></span>
<span class="line"><span style="color:#e1e4e8;">max 指定“Expires”的值为 31 December 2037 23:59:59 GMT，“Cache-Control”的值为10年。</span></span>
<span class="line"><span style="color:#e1e4e8;">-1 指定“Expires”的值为 服务器当前时间 -1s,即永远过期</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">图片缓存30天</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~.*\\.(jpg|png|jpeg)$</span></span>
<span class="line"><span style="color:#e1e4e8;">   {</span></span>
<span class="line"><span style="color:#e1e4e8;">  expires 30d;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">js css缓存一小时</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~.*\\.(js|css)?$</span></span>
<span class="line"><span style="color:#e1e4e8;">   {</span></span>
<span class="line"><span style="color:#e1e4e8;">  expires 1h;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">nginx可以通过 expires 指令来设置浏览器的Header</span></span>
<span class="line"><span style="color:#24292e;">语法： expires [time|epoch|max|off]</span></span>
<span class="line"><span style="color:#24292e;">默认值： expires off</span></span>
<span class="line"><span style="color:#24292e;">作用域： http, server, location</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">使用本指令可以控制HTTP应答中的“Expires”和“Cache-Control”的头标，（起到控制页面缓存的作用）。</span></span>
<span class="line"><span style="color:#24292e;">可以在time值中使用正数或负数。“Expires”头标的值将通过当前系统时间加上您设定的 time 值来获得。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">epoch 指定“Expires”的值为 1 January, 1970, 00:00:01 GMT。</span></span>
<span class="line"><span style="color:#24292e;">max 指定“Expires”的值为 31 December 2037 23:59:59 GMT，“Cache-Control”的值为10年。</span></span>
<span class="line"><span style="color:#24292e;">-1 指定“Expires”的值为 服务器当前时间 -1s,即永远过期</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">图片缓存30天</span></span>
<span class="line"><span style="color:#24292e;">location ~.*\\.(jpg|png|jpeg)$</span></span>
<span class="line"><span style="color:#24292e;">   {</span></span>
<span class="line"><span style="color:#24292e;">  expires 30d;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">js css缓存一小时</span></span>
<span class="line"><span style="color:#24292e;">location ~.*\\.(js|css)?$</span></span>
<span class="line"><span style="color:#24292e;">   {</span></span>
<span class="line"><span style="color:#24292e;">  expires 1h;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span></code></pre></div><h2 id="_2-0-nginx-压缩功能" tabindex="-1">2.0 nginx 压缩功能 <a class="header-anchor" href="#_2-0-nginx-压缩功能" aria-label="Permalink to &quot;2.0 nginx 压缩功能&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">压缩功能对于WEB服务器来说太重要了，主要体现在以下两个方向：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">​ 1）提升用户体验：传输数据变小，用户等待时间变短。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">​ 2）节省公司带宽成本：压缩后传输，传输数据变小，带宽占用的更少。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">既然能给用户好的体验，又能给公司省钱。这么好的事情何乐不为呢，所以这个是工作中必备配置神器。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">但是配置压缩需要更大家说一下注意事项：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">​ 1）图片、音视频不要压缩</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">​ 2）小于1K的不要压缩，否则越压越大</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">​ 3）压缩级别越大，就越消耗CPU</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">gzip on;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_http_version 1.1;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_disable &quot;MSIE [1-6].&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_proxied any;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_min_length 1024;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_buffers 4 8k;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_comp_level 3;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_types text/plain text/css application/x-javascript application/javascript application/xml;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">gzip on;      （启用 gzip 压缩功能）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_http_version 1.1; 它的默认值是HTTP/1.1，就是说对HTTP/1.1协议的请求才会进行gzip压缩</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_disable &quot;MSIE [1-6].&quot;;设置是禁用IE1-6版本的gzip压缩</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_proxied any;  （nginx 做前端代理时启用该选项，表示无论后端服务器的headers头返回什么信息，都无条件启用压缩）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_min_length  1024; （最小压缩的页面，如果页面过于小，可能会越压越大，这里规定大于1K的页面才启用压缩）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_buffers     4 8k; （设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流  按照原始数据大小以8K为单位申请4倍内存空间）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_comp_level 3; （压缩级别，1压缩比最小处理速度最快，9压缩比最大但处理最慢，同时也最消耗CPU,一般设置为3就可以了）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_types       text/plain text/css application/x-javascript application/javascript application/xml; （什么类型的页面或文档启用压缩）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">压缩功能对于WEB服务器来说太重要了，主要体现在以下两个方向：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">​ 1）提升用户体验：传输数据变小，用户等待时间变短。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">​ 2）节省公司带宽成本：压缩后传输，传输数据变小，带宽占用的更少。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">既然能给用户好的体验，又能给公司省钱。这么好的事情何乐不为呢，所以这个是工作中必备配置神器。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">但是配置压缩需要更大家说一下注意事项：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">​ 1）图片、音视频不要压缩</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">​ 2）小于1K的不要压缩，否则越压越大</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">​ 3）压缩级别越大，就越消耗CPU</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">gzip on;</span></span>
<span class="line"><span style="color:#24292e;">gzip_http_version 1.1;</span></span>
<span class="line"><span style="color:#24292e;">gzip_disable &quot;MSIE [1-6].&quot;;</span></span>
<span class="line"><span style="color:#24292e;">gzip_proxied any;</span></span>
<span class="line"><span style="color:#24292e;">gzip_min_length 1024;</span></span>
<span class="line"><span style="color:#24292e;">gzip_buffers 4 8k;</span></span>
<span class="line"><span style="color:#24292e;">gzip_comp_level 3;</span></span>
<span class="line"><span style="color:#24292e;">gzip_types text/plain text/css application/x-javascript application/javascript application/xml;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">gzip on;      （启用 gzip 压缩功能）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">gzip_http_version 1.1; 它的默认值是HTTP/1.1，就是说对HTTP/1.1协议的请求才会进行gzip压缩</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">gzip_disable &quot;MSIE [1-6].&quot;;设置是禁用IE1-6版本的gzip压缩</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">gzip_proxied any;  （nginx 做前端代理时启用该选项，表示无论后端服务器的headers头返回什么信息，都无条件启用压缩）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">gzip_min_length  1024; （最小压缩的页面，如果页面过于小，可能会越压越大，这里规定大于1K的页面才启用压缩）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">gzip_buffers     4 8k; （设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流  按照原始数据大小以8K为单位申请4倍内存空间）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">gzip_comp_level 3; （压缩级别，1压缩比最小处理速度最快，9压缩比最大但处理最慢，同时也最消耗CPU,一般设置为3就可以了）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">gzip_types       text/plain text/css application/x-javascript application/javascript application/xml; （什么类型的页面或文档启用压缩）</span></span></code></pre></div><h1 id="_2-1-over-https" tabindex="-1">2.1 over HTTPS <a class="header-anchor" href="#_2-1-over-https" aria-label="Permalink to &quot;2.1 over HTTPS&quot;">​</a></h1><p>was loaded over HTTPS, but requested an insecure form action &#39;<a href="http://xxxxx" target="_blank" rel="noreferrer">http://xxxxx</a>&#39;.This request has been blocked;the content must be served over HTTPS</p><p>解决办法： 在nginx server location配置中添加** proxy_set_header X-Forwarded-Proto https;** 示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">   location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://192.168.1.100:8082/;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host $host; </span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-Proto  https;#指定跳转后的$scheme为https</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">   location / {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://192.168.1.100:8082/;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host $host; </span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-Proto  https;#指定跳转后的$scheme为https</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><h1 id="_2-2-域名跨域访问" tabindex="-1">2.2 域名跨域访问 <a class="header-anchor" href="#_2-2-域名跨域访问" aria-label="Permalink to &quot;2.2 域名跨域访问&quot;">​</a></h1><h3 id="什么是跨域" tabindex="-1">什么是跨域 <a class="header-anchor" href="#什么是跨域" aria-label="Permalink to &quot;什么是跨域&quot;">​</a></h3><p>域： 是指浏览器不能执行其他网站的脚本</p><p>跨域： 它是由浏览器的 同源策略 造成的,是浏览器对 JavaScript 实施的安全限制，所谓同源（即指在同一个域）就是两个页面具有相同的协议 protocol，主机 host 和端口号 port 则就会造成 跨域</p><p><img src="`+l+`" alt=""></p><h3 id="跨域场景" tabindex="-1">跨域场景 <a class="header-anchor" href="#跨域场景" aria-label="Permalink to &quot;跨域场景&quot;">​</a></h3><table><thead><tr><th>当前url</th><th>请求url</th><th>是否跨域</th><th>原因</th></tr></thead><tbody><tr><td><a href="http://www.autofelix.cn" target="_blank" rel="noreferrer">http://www.autofelix.cn</a></td><td><a href="http://www.autofelix.cn/api.php" target="_blank" rel="noreferrer">http://www.autofelix.cn/api.php</a></td><td>否</td><td>协议/域名/端口都相同</td></tr><tr><td><a href="http://www.autofelix.cn" target="_blank" rel="noreferrer">http://www.autofelix.cn</a></td><td><a href="https://www.autofelix.cn/api.php" target="_blank" rel="noreferrer">https://www.autofelix.cn/api.php</a></td><td>是</td><td>协议不同</td></tr><tr><td><a href="http://www.autofelix.cn" target="_blank" rel="noreferrer">http://www.autofelix.cn</a></td><td><a href="http://www.rabbit.cn" target="_blank" rel="noreferrer">http://www.rabbit.cn</a></td><td>是</td><td>主域名不同</td></tr><tr><td><a href="http://www.autofelix.cn" target="_blank" rel="noreferrer">http://www.autofelix.cn</a></td><td><a href="http://api.autofelix.cn" target="_blank" rel="noreferrer">http://api.autofelix.cn</a></td><td>是</td><td>子域名不同</td></tr><tr><td><a href="http://www.autofelix.cn:80" target="_blank" rel="noreferrer">http://www.autofelix.cn:80</a></td><td><a href="http://www.autofelix.cn:8080" target="_blank" rel="noreferrer">http://www.autofelix.cn:8080</a></td><td>是</td><td>端口不同</td></tr></tbody></table><blockquote><p>如果域名走内网并且走openvpn 记的把域名解析成内网地址，否则出现跨域错误</p></blockquote><h2 id="🎈-解决跨域的四种方式" tabindex="-1">🎈 解决跨域的四种方式 <a class="header-anchor" href="#🎈-解决跨域的四种方式" aria-label="Permalink to &quot;🎈 解决跨域的四种方式&quot;">​</a></h2><h3 id="_2-2-1-允许指定单个域名跨域访问" tabindex="-1">2.2.1 允许指定单个域名跨域访问 <a class="header-anchor" href="#_2-2-1-允许指定单个域名跨域访问" aria-label="Permalink to &quot;2.2.1 允许指定单个域名跨域访问&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location /{</span></span>
<span class="line"><span style="color:#e1e4e8;">    #add_header Access-Control-Allow-Origin *; #允许所有域名不安全</span></span>
<span class="line"><span style="color:#e1e4e8;">    add_header &#39;Access-Control-Allow-Origin&#39; &#39;https://www.sundayle.com&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    add_header &#39;Access-Control-Allow-Credentials&#39; &#39;true&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET,POST,OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    add_header &#39;Access-Control-Allow-Headers&#39; &#39;Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,X-Requested-With&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($request_method = &#39;OPTIONS&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        return 204;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location /{</span></span>
<span class="line"><span style="color:#24292e;">    #add_header Access-Control-Allow-Origin *; #允许所有域名不安全</span></span>
<span class="line"><span style="color:#24292e;">    add_header &#39;Access-Control-Allow-Origin&#39; &#39;https://www.sundayle.com&#39;;</span></span>
<span class="line"><span style="color:#24292e;">    add_header &#39;Access-Control-Allow-Credentials&#39; &#39;true&#39;;</span></span>
<span class="line"><span style="color:#24292e;">    add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET,POST,OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#24292e;">    add_header &#39;Access-Control-Allow-Headers&#39; &#39;Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,X-Requested-With&#39;;</span></span>
<span class="line"><span style="color:#24292e;">    if ($request_method = &#39;OPTIONS&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">        return 204;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>第一条指令：接受www.sundayle.com 跨域请求</li><li>第二条指令：当该标志为真时，响应于该请求是否可以被暴露(可选)</li><li>第三条指令：指定请求的方法，可以是GET, POST, OPTIONS, PUT, DELETE等(可选)</li><li>第四条指令：允许脚本访问的返回头(可选)</li><li>第五条指令：给OPTIONS 添加 204的返回，是为了处理在发送POST请求时Nginx依然拒绝访问的错误，发送”预检请求”时，需要用到方法 OPTIONS ,所以服务器需要允许该方法</li></ul><h3 id="_2-2-2-允许多个域名跨域访问" tabindex="-1">2.2.2 允许多个域名跨域访问 <a class="header-anchor" href="#_2-2-2-允许多个域名跨域访问" aria-label="Permalink to &quot;2.2.2 允许多个域名跨域访问&quot;">​</a></h3><ul><li>单个虚拟机</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">set $allow_origin &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $http_origin ~ &#39;^https?://(www|m).sundayle.com&#39; ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">      set $allow_origin $http_origin;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">    location /{</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Origin&#39; $allow_origin;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Credentials&#39; &#39;true&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET,POST,OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Headers&#39; &#39;Token,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,X_Requested_With,If-Modified-Since,Cache-Control,Content-Type&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($request_method = &#39;OPTIONS&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            return 204;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">set $allow_origin &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">if ( $http_origin ~ &#39;^https?://(www|m).sundayle.com&#39; ) {</span></span>
<span class="line"><span style="color:#24292e;">      set $allow_origin $http_origin;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">    location /{</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Origin&#39; $allow_origin;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Credentials&#39; &#39;true&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET,POST,OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Headers&#39; &#39;Token,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,X_Requested_With,If-Modified-Since,Cache-Control,Content-Type&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        if ($request_method = &#39;OPTIONS&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            return 204;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 解决跨域问题</span></span>
<span class="line"><span style="color:#e1e4e8;">         set $flag &#39;0&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">         location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">             # 将 api.domain.xyz 域名上的请求代理到 http://127.0.0.1:3000</span></span>
<span class="line"><span style="color:#e1e4e8;">             proxy_pass  http://127.0.0.1:3000;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">             # 配置 domain.xyx 域名下的 所有 二级或多级域名 允许跨域请求</span></span>
<span class="line"><span style="color:#e1e4e8;">             if ($http_origin ~* &quot;(https?:\\/\\/.*\\.domain\\.xyz($|\\/))&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                  set $flag &#39;1&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">             }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">             # 如果有 允许其它域名 进行跨域请求</span></span>
<span class="line"><span style="color:#e1e4e8;">             # if ($http_origin ~* &quot;(https?:\\/\\/.*\\.otherdomain\\.xyz($|\\/))&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">             #    set $flag &#39;1&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">             # }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">            if ($flag = &#39;1&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                 # 添加允许跨域的响应头</span></span>
<span class="line"><span style="color:#e1e4e8;">                 # add_header Access-Control-Allow-Origin &quot;*&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">                 add_header Access-Control-Allow-Origin &quot;$http_origin&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">                 ###带上用户认证信息</span></span>
<span class="line"><span style="color:#e1e4e8;">                 add_header Access-Control-Allow-Credentials  true;</span></span>
<span class="line"><span style="color:#e1e4e8;">                 ##允许的方法 post,get ...</span></span>
<span class="line"><span style="color:#e1e4e8;">                 add_header Access-Control-Allow-Methods  &quot;POST, GET, PUT, PATCH, DELETE&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">                 # add_header Access-Control-Allow-Headers &quot;xxx-xx-xx&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 解决跨域问题</span></span>
<span class="line"><span style="color:#24292e;">         set $flag &#39;0&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">         location / {</span></span>
<span class="line"><span style="color:#24292e;">             # 将 api.domain.xyz 域名上的请求代理到 http://127.0.0.1:3000</span></span>
<span class="line"><span style="color:#24292e;">             proxy_pass  http://127.0.0.1:3000;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">             # 配置 domain.xyx 域名下的 所有 二级或多级域名 允许跨域请求</span></span>
<span class="line"><span style="color:#24292e;">             if ($http_origin ~* &quot;(https?:\\/\\/.*\\.domain\\.xyz($|\\/))&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">                  set $flag &#39;1&#39;;</span></span>
<span class="line"><span style="color:#24292e;">             }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">             # 如果有 允许其它域名 进行跨域请求</span></span>
<span class="line"><span style="color:#24292e;">             # if ($http_origin ~* &quot;(https?:\\/\\/.*\\.otherdomain\\.xyz($|\\/))&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">             #    set $flag &#39;1&#39;;</span></span>
<span class="line"><span style="color:#24292e;">             # }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">            if ($flag = &#39;1&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                 # 添加允许跨域的响应头</span></span>
<span class="line"><span style="color:#24292e;">                 # add_header Access-Control-Allow-Origin &quot;*&quot;;</span></span>
<span class="line"><span style="color:#24292e;">                 add_header Access-Control-Allow-Origin &quot;$http_origin&quot;;</span></span>
<span class="line"><span style="color:#24292e;">                 ###带上用户认证信息</span></span>
<span class="line"><span style="color:#24292e;">                 add_header Access-Control-Allow-Credentials  true;</span></span>
<span class="line"><span style="color:#24292e;">                 ##允许的方法 post,get ...</span></span>
<span class="line"><span style="color:#24292e;">                 add_header Access-Control-Allow-Methods  &quot;POST, GET, PUT, PATCH, DELETE&quot;;</span></span>
<span class="line"><span style="color:#24292e;">                 # add_header Access-Control-Allow-Headers &quot;xxx-xx-xx&quot;;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span></code></pre></div><ul><li>MAP</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">map $http_origin $allow_origin {</span></span>
<span class="line"><span style="color:#e1e4e8;">    default &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;~^(https?://localhost(:[0-9]+)?)&quot; $1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;~^(https?://127.0.0.1(:[0-9]+)?)&quot; $1; </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;~^(https?://192.168.10.[\\d]+(:[0-9]+)?)&quot; $1; </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;~^https://www.sunday.com&quot; https://www.sundayle.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;~^https://m.sundayle.com&quot; https://m.sundayle.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;~^(https?://[\\w]+.open.sundayle.com)&quot; $1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    #&quot;~^(https?://([\\w]+.)?[\\w]+.open.sundayle.com)&quot; $1;  #允许一级和二级域名</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    location /{</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Origin&#39; $allow_origin;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Credentials&#39; &#39;true&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET,POST,OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Headers&#39; &#39;Token,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,X_Requested_With,If-Modified-Since,Cache-Control,Content-Type&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($request_method = &#39;OPTIONS&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            return 204;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">map $http_origin $allow_origin {</span></span>
<span class="line"><span style="color:#24292e;">    default &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    &quot;~^(https?://localhost(:[0-9]+)?)&quot; $1;</span></span>
<span class="line"><span style="color:#24292e;">    &quot;~^(https?://127.0.0.1(:[0-9]+)?)&quot; $1; </span></span>
<span class="line"><span style="color:#24292e;">    &quot;~^(https?://192.168.10.[\\d]+(:[0-9]+)?)&quot; $1; </span></span>
<span class="line"><span style="color:#24292e;">    &quot;~^https://www.sunday.com&quot; https://www.sundayle.com;</span></span>
<span class="line"><span style="color:#24292e;">    &quot;~^https://m.sundayle.com&quot; https://m.sundayle.com;</span></span>
<span class="line"><span style="color:#24292e;">    &quot;~^(https?://[\\w]+.open.sundayle.com)&quot; $1;</span></span>
<span class="line"><span style="color:#24292e;">    #&quot;~^(https?://([\\w]+.)?[\\w]+.open.sundayle.com)&quot; $1;  #允许一级和二级域名</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    location /{</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Origin&#39; $allow_origin;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Credentials&#39; &#39;true&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET,POST,OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Headers&#39; &#39;Token,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,X_Requested_With,If-Modified-Since,Cache-Control,Content-Type&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        if ($request_method = &#39;OPTIONS&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            return 204;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>跨域测试</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -I -X OPTIONS -H &quot;Origin: https://www.sundayle.com&quot; &quot;https://api.sundayle.com&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#e1e4e8;">Access-Control-Allow-Origin: https://www.sundayle.com</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -I -X OPTIONS -H &quot;Origin: https://www.sundayle.com&quot; &quot;https://api.sundayle.com&quot;</span></span>
<span class="line"><span style="color:#24292e;">HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#24292e;">Access-Control-Allow-Origin: https://www.sundayle.com</span></span>
<span class="line"><span style="color:#24292e;">...</span></span></code></pre></div><ul><li>if Nginx 更多判断</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">     if ($request_method = &#39;OPTIONS&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Origin&#39; &#39;https://www.sundayle.com&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET, POST, OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Headers&#39; &#39;DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Max-Age&#39; 1728000; # 20days</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Content-Type&#39; &#39;text/plain; charset=utf-8&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Content-Length&#39; 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">        return 204;</span></span>
<span class="line"><span style="color:#e1e4e8;">     }</span></span>
<span class="line"><span style="color:#e1e4e8;">     if ($request_method = &#39;POST&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Origin&#39; &#39;https://www.sundayle.com&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET, POST, OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Headers&#39; &#39;DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Expose-Headers&#39; &#39;Content-Length,Content-Range&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">     }</span></span>
<span class="line"><span style="color:#e1e4e8;">     if ($request_method = &#39;GET&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Origin&#39; &#39;https://www.sundayle.com&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET, POST, OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Headers&#39; &#39;DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Expose-Headers&#39; &#39;Content-Length,Content-Range&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">     }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">     if ($request_method = &#39;OPTIONS&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Origin&#39; &#39;https://www.sundayle.com&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET, POST, OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Headers&#39; &#39;DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Max-Age&#39; 1728000; # 20days</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Content-Type&#39; &#39;text/plain; charset=utf-8&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Content-Length&#39; 0;</span></span>
<span class="line"><span style="color:#24292e;">        return 204;</span></span>
<span class="line"><span style="color:#24292e;">     }</span></span>
<span class="line"><span style="color:#24292e;">     if ($request_method = &#39;POST&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Origin&#39; &#39;https://www.sundayle.com&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET, POST, OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Headers&#39; &#39;DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Expose-Headers&#39; &#39;Content-Length,Content-Range&#39;;</span></span>
<span class="line"><span style="color:#24292e;">     }</span></span>
<span class="line"><span style="color:#24292e;">     if ($request_method = &#39;GET&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Origin&#39; &#39;https://www.sundayle.com&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET, POST, OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Headers&#39; &#39;DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Expose-Headers&#39; &#39;Content-Length,Content-Range&#39;;</span></span>
<span class="line"><span style="color:#24292e;">     }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>正则表达试地址 <a href="https://c.runoob.com/front-end/854" target="_blank" rel="noreferrer">https://c.runoob.com/front-end/854</a></p><h1 id="_2-3-nginx-获取-cookie" tabindex="-1">2.3 nginx 获取 cookie <a class="header-anchor" href="#_2-3-nginx-获取-cookie" aria-label="Permalink to &quot;2.3  nginx 获取 cookie&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">set $key &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $http_cookie ~* &quot;pin.name=(.+?)(?=;|$)&quot; ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  set $key $1;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">set $key &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">if ( $http_cookie ~* &quot;pin.name=(.+?)(?=;|$)&quot; ) {</span></span>
<span class="line"><span style="color:#24292e;">  set $key $1;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_2-4-判断域名" tabindex="-1">2.4 判断域名 <a class="header-anchor" href="#_2-4-判断域名" aria-label="Permalink to &quot;2.4 判断域名&quot;">​</a></h1><ul><li>简单点</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($host ! = &#39;sundayle.com&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">   return 301 http://www.sundayle.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($host ! = &#39;sundayle.com&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">   return 301 http://www.sundayle.com;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>复杂点</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name sundayle.com www.sundayle.com *.sundayle.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    root /www/sunayle.com;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    set $myhost &#39;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($host = &#39;sundayle.com&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $myhost 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($host = &#39;www.sundayle.com&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $myhost 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($myhost != 1) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            rewrite ^/(.*)$ http://sundayle.com/$1 permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        try_files $uri $uri/ =404;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name sundayle.com www.sundayle.com *.sundayle.com;</span></span>
<span class="line"><span style="color:#24292e;">    root /www/sunayle.com;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    set $myhost &#39;&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    if ($host = &#39;sundayle.com&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">        set $myhost 1;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    if ($host = &#39;www.sundayle.com&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">        set $myhost 1;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    if ($myhost != 1) {</span></span>
<span class="line"><span style="color:#24292e;">            rewrite ^/(.*)$ http://sundayle.com/$1 permanent;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        try_files $uri $uri/ =404;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>更高效可以用两个server, 再return</p><h1 id="_2-5-nginx-的临时维护页面" tabindex="-1">2.5 Nginx 的临时维护页面 <a class="header-anchor" href="#_2-5-nginx-的临时维护页面" aria-label="Permalink to &quot;2.5 Nginx 的临时维护页面&quot;">​</a></h1><p>每当服务器遇到 502 代码时，就自动转到临时维护的静态页</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">     listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">     server_name mydomain.com;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">     # ... 省略掉 N 行代码</span></span>
<span class="line"><span style="color:#e1e4e8;">     error_page 502 = @tempdown;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">     location @tempdown {</span></span>
<span class="line"><span style="color:#e1e4e8;">         rewrite ^(.*)$ /pages/maintain.html break;</span></span>
<span class="line"><span style="color:#e1e4e8;">     }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">     listen 80;</span></span>
<span class="line"><span style="color:#24292e;">     server_name mydomain.com;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">     # ... 省略掉 N 行代码</span></span>
<span class="line"><span style="color:#24292e;">     error_page 502 = @tempdown;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">     location @tempdown {</span></span>
<span class="line"><span style="color:#24292e;">         rewrite ^(.*)$ /pages/maintain.html break;</span></span>
<span class="line"><span style="color:#24292e;">     }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>如果你只想要【临时维护页面】就这样写（适合服务器更新东西或者改版）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">     listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">     server_name mydomain.com;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">     # ... 省略掉 N 行代码</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">     # 所有页面都转跳到维护页</span></span>
<span class="line"><span style="color:#e1e4e8;">     rewrite ^(.*)$ /pages/maintain.html break;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">     listen 80;</span></span>
<span class="line"><span style="color:#24292e;">     server_name mydomain.com;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">     # ... 省略掉 N 行代码</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">     # 所有页面都转跳到维护页</span></span>
<span class="line"><span style="color:#24292e;">     rewrite ^(.*)$ /pages/maintain.html break;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>注： 临时维护页要找对正确的路径，我的例子是 <a href="http://mydomain.com/page/maintain.html%E3%80%82%E6%89%80%E4%BB%A5%E8%B7%AF%E5%BE%84%E6%98%AF" target="_blank" rel="noreferrer">http://mydomain.com/page/maintain.html。所以路径是</a> /page/maintain.html</p><h1 id="_2-6-给favicon-ico和robots-txt设置过期时间" tabindex="-1">2.6 给favicon.ico和robots.txt设置过期时间 <a class="header-anchor" href="#_2-6-给favicon-ico和robots-txt设置过期时间" aria-label="Permalink to &quot;2.6 给favicon.ico和robots.txt设置过期时间&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">这里为favicon.ico为99天,robots.txt为7天并不记录404错误日志</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location ~(favicon.ico) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                 log_not_found off;</span></span>
<span class="line"><span style="color:#e1e4e8;">                 expires 99d;</span></span>
<span class="line"><span style="color:#e1e4e8;">                 break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">#如果不记录404日志会导致看不到这个图标</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location ~(robots.txt) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                 log_not_found off;</span></span>
<span class="line"><span style="color:#e1e4e8;">                 expires 7d;</span></span>
<span class="line"><span style="color:#e1e4e8;">                 break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> # location ~ ^/favicon\\.ico$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">          location = /favicon.ico {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    root /data/nginx/images123;</span></span>
<span class="line"><span style="color:#e1e4e8;">         }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">这里为favicon.ico为99天,robots.txt为7天并不记录404错误日志</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location ~(favicon.ico) {</span></span>
<span class="line"><span style="color:#24292e;">                 log_not_found off;</span></span>
<span class="line"><span style="color:#24292e;">                 expires 99d;</span></span>
<span class="line"><span style="color:#24292e;">                 break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">#如果不记录404日志会导致看不到这个图标</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location ~(robots.txt) {</span></span>
<span class="line"><span style="color:#24292e;">                 log_not_found off;</span></span>
<span class="line"><span style="color:#24292e;">                 expires 7d;</span></span>
<span class="line"><span style="color:#24292e;">                 break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> # location ~ ^/favicon\\.ico$ {</span></span>
<span class="line"><span style="color:#24292e;">          location = /favicon.ico {</span></span>
<span class="line"><span style="color:#24292e;">                    root /data/nginx/images123;</span></span>
<span class="line"><span style="color:#24292e;">         }</span></span></code></pre></div><h1 id="_2-7-设定某个文件的过期时间" tabindex="-1">2.7 设定某个文件的过期时间 <a class="header-anchor" href="#_2-7-设定某个文件的过期时间" aria-label="Permalink to &quot;2.7 设定某个文件的过期时间&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ^~ /html/scripts/loadhead_1.js {</span></span>
<span class="line"><span style="color:#e1e4e8;">                 access_log   off;</span></span>
<span class="line"><span style="color:#e1e4e8;">                 root /opt/lampp/htdocs/web;</span></span>
<span class="line"><span style="color:#e1e4e8;">                 expires 600;</span></span>
<span class="line"><span style="color:#e1e4e8;">                 break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ^~ /html/scripts/loadhead_1.js {</span></span>
<span class="line"><span style="color:#24292e;">                 access_log   off;</span></span>
<span class="line"><span style="color:#24292e;">                 root /opt/lampp/htdocs/web;</span></span>
<span class="line"><span style="color:#24292e;">                 expires 600;</span></span>
<span class="line"><span style="color:#24292e;">                 break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_2-8三级域名跳转" tabindex="-1">2.8三级域名跳转 <a class="header-anchor" href="#_2-8三级域名跳转" aria-label="Permalink to &quot;2.8三级域名跳转&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($http_host ~* &quot;^(.*)/.i/.c1gstudio/.com$&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    rewrite ^(.*) http://top.yingjiesheng.com$1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($http_host ~* &quot;^(.*)/.i/.c1gstudio/.com$&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">    rewrite ^(.*) http://top.yingjiesheng.com$1;</span></span>
<span class="line"><span style="color:#24292e;">    break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_2-9-配置add-header不生效解决办法" tabindex="-1">2.9 配置add_header不生效解决办法 <a class="header-anchor" href="#_2-9-配置add-header不生效解决办法" aria-label="Permalink to &quot;2.9 配置add_header不生效解决办法&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">遇到一个项目，产生了跨域问题，因为这种问题很好解决，只要在nginx上面配置允许跨域即可，但是却遇到了add_header不生效的问题。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">nginx配置如下</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header Access-Control-Allow-Origin * always;</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header Access-Control-Allow-Headers X-Requested-With;</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header Access-Control-Allow-Methods PUT,POST,GET,DELETE,OPTIONS;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">遇到一个项目，产生了跨域问题，因为这种问题很好解决，只要在nginx上面配置允许跨域即可，但是却遇到了add_header不生效的问题。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">nginx配置如下</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header Access-Control-Allow-Origin * always;</span></span>
<span class="line"><span style="color:#24292e;">add_header Access-Control-Allow-Headers X-Requested-With;</span></span>
<span class="line"><span style="color:#24292e;">add_header Access-Control-Allow-Methods PUT,POST,GET,DELETE,OPTIONS;</span></span></code></pre></div><p>Nginx add_header 只对200,201，204,206,301,302,303,304,307 这些状态码生效，对于401 405 403这些状态码是不生效的</p><p>解决办法:</p><p>add_header Access-Control-Allow-Origin * always;</p><h1 id="_3-0-nginx支持在线预览" tabindex="-1">3.0 nginx支持在线预览 <a class="header-anchor" href="#_3-0-nginx支持在线预览" aria-label="Permalink to &quot;3.0 nginx支持在线预览&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">  location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">         autoindex on;  </span></span>
<span class="line"><span style="color:#e1e4e8;">         autoindex_exact_size on;  </span></span>
<span class="line"><span style="color:#e1e4e8;">         autoindex_localtime on; </span></span>
<span class="line"><span style="color:#e1e4e8;">         if ($request_filename ~* ^.*?\\.(txt|doc|pdf|rar|gz|zip|docx|exe|xlsx|ppt|pptx)$){</span></span>
<span class="line"><span style="color:#e1e4e8;">            add_header Content-Disposition: &#39;p_w_upload;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">         }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">  location / {</span></span>
<span class="line"><span style="color:#24292e;">         autoindex on;  </span></span>
<span class="line"><span style="color:#24292e;">         autoindex_exact_size on;  </span></span>
<span class="line"><span style="color:#24292e;">         autoindex_localtime on; </span></span>
<span class="line"><span style="color:#24292e;">         if ($request_filename ~* ^.*?\\.(txt|doc|pdf|rar|gz|zip|docx|exe|xlsx|ppt|pptx)$){</span></span>
<span class="line"><span style="color:#24292e;">            add_header Content-Disposition: &#39;p_w_upload;&#39;;</span></span>
<span class="line"><span style="color:#24292e;">         }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><h1 id="_4-0-针对get请求-进行跳转" tabindex="-1">4.0 针对GET请求，进行跳转 <a class="header-anchor" href="#_4-0-针对get请求-进行跳转" aria-label="Permalink to &quot;4.0 针对GET请求，进行跳转&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">set $flag 0;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($scheme !~ &quot;https&quot;){ set $flag &quot;\${flag}1&quot;;}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($request_method = &quot;GET&quot; ){ set $flag &quot;\${flag}2&quot;;}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($remote_addr !~ 192.168.*|8.8.8.8){ set $flag &quot;\${flag}3&quot;;}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($request_uri !~ ^(/admin/|/js/|/css/) ){ set $flag &quot;\${flag}4&quot;;}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($flag = &quot;01234&quot;) {rewrite (.*) https://$host$1 permanent;}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">set $flag 0;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($scheme !~ &quot;https&quot;){ set $flag &quot;\${flag}1&quot;;}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($request_method = &quot;GET&quot; ){ set $flag &quot;\${flag}2&quot;;}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($remote_addr !~ 192.168.*|8.8.8.8){ set $flag &quot;\${flag}3&quot;;}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($request_uri !~ ^(/admin/|/js/|/css/) ){ set $flag &quot;\${flag}4&quot;;}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($flag = &quot;01234&quot;) {rewrite (.*) https://$host$1 permanent;}</span></span></code></pre></div><h1 id="_4-1-slb-cdn获取用户真实ip" tabindex="-1">4.1 slb/CDN获取用户真实IP <a class="header-anchor" href="#_4-1-slb-cdn获取用户真实ip" aria-label="Permalink to &quot;4.1 slb/CDN获取用户真实IP&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http location 位置上</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from ip_range1;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from ip_range2;</span></span>
<span class="line"><span style="color:#e1e4e8;">....</span></span>
<span class="line"><span style="color:#e1e4e8;">real_ip_header    X-Forwarded-For;</span></span>
<span class="line"><span style="color:#e1e4e8;">real_ip_recursive on;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#ipv4</span></span>
<span class="line"><span style="color:#e1e4e8;">map $http_x_forwarded_for  $clientRealIp {    #clientRealIp是用户真实ip匹配结果</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;&quot;    $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ~^(?P&lt;firstAddr&gt;[0-9\\.]+),?.*$    $firstAddr;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#兼容ipv6</span></span>
<span class="line"><span style="color:#e1e4e8;">#realip</span></span>
<span class="line"><span style="color:#e1e4e8;">map $http_x_forwarded_for $clientRealIp {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;&quot;  $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ~^(?P&lt;firstAddr&gt;[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+|[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+),?.*$ $firstAddr;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_format website &#39;$clientRealIp - [$http_x_forwarded_for]- $remote_user [$time_local] &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                 &#39;&quot;$request&quot; $status $body_bytes_sent &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                 &#39;&quot;$http_referer&quot; &quot;$http_user_agent&quot;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">说明 这里的ip_range1,2,...指高防IP的回源IP地址，需要添加多条。如果高防IP后还有WAF、CDN，则需要写WAF、CDN的回源IP地址，即需要写离源站最近的一层七层代理的回源IP段</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_format  main  &#39;$http_x_forwarded_for - $remote_user [$time_local] &quot;$request&quot; &#39; &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39; &#39;&quot;$http_user_agent&quot; &#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">https://www.cnblogs.com/hftian/p/11127152.html</span></span>
<span class="line"><span style="color:#e1e4e8;">https://blog.csdn.net/bloodzer0/article/details/104660256</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http location 位置上</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from ip_range1;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from ip_range2;</span></span>
<span class="line"><span style="color:#24292e;">....</span></span>
<span class="line"><span style="color:#24292e;">real_ip_header    X-Forwarded-For;</span></span>
<span class="line"><span style="color:#24292e;">real_ip_recursive on;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#ipv4</span></span>
<span class="line"><span style="color:#24292e;">map $http_x_forwarded_for  $clientRealIp {    #clientRealIp是用户真实ip匹配结果</span></span>
<span class="line"><span style="color:#24292e;">    &quot;&quot;    $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">    ~^(?P&lt;firstAddr&gt;[0-9\\.]+),?.*$    $firstAddr;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#兼容ipv6</span></span>
<span class="line"><span style="color:#24292e;">#realip</span></span>
<span class="line"><span style="color:#24292e;">map $http_x_forwarded_for $clientRealIp {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;&quot;  $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        ~^(?P&lt;firstAddr&gt;[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+|[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+),?.*$ $firstAddr;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_format website &#39;$clientRealIp - [$http_x_forwarded_for]- $remote_user [$time_local] &#39;</span></span>
<span class="line"><span style="color:#24292e;">                 &#39;&quot;$request&quot; $status $body_bytes_sent &#39;</span></span>
<span class="line"><span style="color:#24292e;">                 &#39;&quot;$http_referer&quot; &quot;$http_user_agent&quot;&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">说明 这里的ip_range1,2,...指高防IP的回源IP地址，需要添加多条。如果高防IP后还有WAF、CDN，则需要写WAF、CDN的回源IP地址，即需要写离源站最近的一层七层代理的回源IP段</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_format  main  &#39;$http_x_forwarded_for - $remote_user [$time_local] &quot;$request&quot; &#39; &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39; &#39;&quot;$http_user_agent&quot; &#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">https://www.cnblogs.com/hftian/p/11127152.html</span></span>
<span class="line"><span style="color:#24292e;">https://blog.csdn.net/bloodzer0/article/details/104660256</span></span></code></pre></div><h1 id="_5-nginx-代理jenkins" tabindex="-1">5. nginx 代理jenkins <a class="header-anchor" href="#_5-nginx-代理jenkins" aria-label="Permalink to &quot;5. nginx 代理jenkins&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_set_header   Authorization &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header x-for $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header x-server $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header x-agent $http_user_agent;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass     http://kongjinshan/;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">	proxy_set_header   Authorization &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header x-for $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header x-server $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header x-agent $http_user_agent;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass     http://kongjinshan/;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><h1 id="_6-http-x-forwarded-for来进行限制" tabindex="-1">6.<code>$http_x_forwarded_for</code>来进行限制 <a class="header-anchor" href="#_6-http-x-forwarded-for来进行限制" aria-label="Permalink to &quot;6.\`$http_x_forwarded_for\`来进行限制&quot;">​</a></h1><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">set $allow </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($http_x_forwarded_for </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;211.144.204.2|192.168.1.2&quot;</span><span style="color:#E1E4E8;">) { set $allow </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">; }</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($http_x_forwarded_for </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;108.2.66.[89]&quot;</span><span style="color:#E1E4E8;">) { set $allow </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">; }</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($allow </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">) { </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">404</span><span style="color:#E1E4E8;">; }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">set $allow </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($http_x_forwarded_for </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;211.144.204.2|192.168.1.2&quot;</span><span style="color:#24292E;">) { set $allow </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">; }</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($http_x_forwarded_for </span><span style="color:#D73A49;">~</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;108.2.66.[89]&quot;</span><span style="color:#24292E;">) { set $allow </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">; }</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($allow </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">) { </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">404</span><span style="color:#24292E;">; }</span></span></code></pre></div><h1 id="_7-中文日志十六进制编码问题" tabindex="-1">7.中文日志十六进制编码问题 <a class="header-anchor" href="#_7-中文日志十六进制编码问题" aria-label="Permalink to &quot;7.中文日志十六进制编码问题&quot;">​</a></h1><p>问题解决方案：</p><ol><li>nginx版本需大于1.11.8</li><li>在定义 access log 格式时，加上 <code>escape=json</code></li></ol><p>日志格式示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">log_format main escape=json \`\`&#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;\` \`&#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;\` \`&#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;\`\`;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">log_format main escape=json \`\`&#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;\` \`&#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;\` \`&#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;\`\`;</span></span></code></pre></div><h1 id="_8-防盗链" tabindex="-1">8.<strong>防盗链</strong> <a class="header-anchor" href="#_8-防盗链" aria-label="Permalink to &quot;8.**防盗链**&quot;">​</a></h1><p><strong>一：一般的防盗链如下：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~* \\.(gif|jpg|png|swf|flv)$ { </span></span>
<span class="line"><span style="color:#e1e4e8;"> valid_referers none blocked www.jzxue.com jzxue.com ; </span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($invalid_referer) { </span></span>
<span class="line"><span style="color:#e1e4e8;">  rewrite ^/ http://www.jzxue.com/retrun.html; </span></span>
<span class="line"><span style="color:#e1e4e8;">   #return 403; </span></span>
<span class="line"><span style="color:#e1e4e8;"> } </span></span>
<span class="line"><span style="color:#e1e4e8;">} </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">第一行：gif|jpg|png|swf|flv </span></span>
<span class="line"><span style="color:#e1e4e8;">表示对gif、jpg、png、swf、flv后缀的文件实行防盗链 </span></span>
<span class="line"><span style="color:#e1e4e8;">第二行： 表示对www.ingnix.com这2个来路进行判断 </span></span>
<span class="line"><span style="color:#e1e4e8;">if{}里面内容的意思是，如果来路不是指定来思是，如果来路不是指定来路就跳转到http://www.jzxue.com/retrun.html页面，当然直接返回403也是可以的。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~* \\.(gif|jpg|png|swf|flv)$ { </span></span>
<span class="line"><span style="color:#24292e;"> valid_referers none blocked www.jzxue.com jzxue.com ; </span></span>
<span class="line"><span style="color:#24292e;"> if ($invalid_referer) { </span></span>
<span class="line"><span style="color:#24292e;">  rewrite ^/ http://www.jzxue.com/retrun.html; </span></span>
<span class="line"><span style="color:#24292e;">   #return 403; </span></span>
<span class="line"><span style="color:#24292e;"> } </span></span>
<span class="line"><span style="color:#24292e;">} </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">第一行：gif|jpg|png|swf|flv </span></span>
<span class="line"><span style="color:#24292e;">表示对gif、jpg、png、swf、flv后缀的文件实行防盗链 </span></span>
<span class="line"><span style="color:#24292e;">第二行： 表示对www.ingnix.com这2个来路进行判断 </span></span>
<span class="line"><span style="color:#24292e;">if{}里面内容的意思是，如果来路不是指定来思是，如果来路不是指定来路就跳转到http://www.jzxue.com/retrun.html页面，当然直接返回403也是可以的。</span></span></code></pre></div><p><strong>二：针对图片目录防止盗链</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location /p_w_picpaths/ { </span></span>
<span class="line"><span style="color:#e1e4e8;"> alias /data/p_w_picpaths/; </span></span>
<span class="line"><span style="color:#e1e4e8;"> valid_referers none blocked server_names *.xok.la xok.la ; </span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($invalid_referer) {return 403;} </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location /p_w_picpaths/ { </span></span>
<span class="line"><span style="color:#24292e;"> alias /data/p_w_picpaths/; </span></span>
<span class="line"><span style="color:#24292e;"> valid_referers none blocked server_names *.xok.la xok.la ; </span></span>
<span class="line"><span style="color:#24292e;"> if ($invalid_referer) {return 403;} </span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><strong>三：使用第三方模块****ngx_http_accesskey_module实现Nginx防盗链</strong> **</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">**实现方法如下： </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">实现方法如下：</span></span>
<span class="line"><span style="color:#e1e4e8;">1. 下载NginxHttpAccessKeyModule模块文件：http://wiki.nginx.org/File:Nginx-accesskey-2.0.3.tar.gz；</span></span>
<span class="line"><span style="color:#e1e4e8;">2. 解压此文件后，找到nginx-accesskey-2.0.3下的config文件。编辑此文件：替换其中的”$HTTP_ACCESSKEY_MODULE”为”ngx_http_accesskey_module”；</span></span>
<span class="line"><span style="color:#e1e4e8;">3. 用一下参数重新编译nginx：</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure --add-module=path/to/nginx-accesskey</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">上面需要加上原有到编译参数，然后执行: make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">**实现方法如下： </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">实现方法如下：</span></span>
<span class="line"><span style="color:#24292e;">1. 下载NginxHttpAccessKeyModule模块文件：http://wiki.nginx.org/File:Nginx-accesskey-2.0.3.tar.gz；</span></span>
<span class="line"><span style="color:#24292e;">2. 解压此文件后，找到nginx-accesskey-2.0.3下的config文件。编辑此文件：替换其中的”$HTTP_ACCESSKEY_MODULE”为”ngx_http_accesskey_module”；</span></span>
<span class="line"><span style="color:#24292e;">3. 用一下参数重新编译nginx：</span></span>
<span class="line"><span style="color:#24292e;">./configure --add-module=path/to/nginx-accesskey</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">上面需要加上原有到编译参数，然后执行: make &amp;&amp; make install</span></span></code></pre></div><ol start="4"><li><p>修改nginx的conf文件，添加以下几行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">4. location /download {</span></span>
<span class="line"><span style="color:#e1e4e8;">    accesskey on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    accesskey_hashmethod md5;</span></span>
<span class="line"><span style="color:#e1e4e8;">    accesskey_arg &quot;key&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    accesskey_signature &quot;mypass$remote_addr&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;">   其中：</span></span>
<span class="line"><span style="color:#e1e4e8;">   accesskey为模块开关；</span></span>
<span class="line"><span style="color:#e1e4e8;">   accesskey_hashmethod为加密方式MD5或者SHA-1；</span></span>
<span class="line"><span style="color:#e1e4e8;">   accesskey_arg为url中的关键字参数；</span></span>
<span class="line"><span style="color:#e1e4e8;">   accesskey_signature为加密值，此处为mypass和访问IP构成的字符串。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">访问测试脚本download.php：</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;?</span></span>
<span class="line"><span style="color:#e1e4e8;">$ipkey= md5(&quot;mypass&quot;.$_SERVER[&#39;REMOTE_ADDR&#39;]);</span></span>
<span class="line"><span style="color:#e1e4e8;">$output_add_key=&quot;&lt;a  href=http://www.jzxue.com/download/G3200507120520LM.rar?key=&quot;.$ipkey.&quot;&gt;download_add_key&lt;/a&gt;&lt;br /&gt;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">$output_org_url=&quot;&lt;a href=http://www.jzxue.com/download/G3200507120520LM.rar&gt;download_org_path&lt;/a&gt;&lt;br /&gt;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo $output_add_key;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo $output_org_url;</span></span>
<span class="line"><span style="color:#e1e4e8;">?&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">访问第一个download_add_key链接可以正常下载，第二个链接download_org_path会返回403 Forbidden错误</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">4. location /download {</span></span>
<span class="line"><span style="color:#24292e;">    accesskey on;</span></span>
<span class="line"><span style="color:#24292e;">    accesskey_hashmethod md5;</span></span>
<span class="line"><span style="color:#24292e;">    accesskey_arg &quot;key&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    accesskey_signature &quot;mypass$remote_addr&quot;;</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;">   其中：</span></span>
<span class="line"><span style="color:#24292e;">   accesskey为模块开关；</span></span>
<span class="line"><span style="color:#24292e;">   accesskey_hashmethod为加密方式MD5或者SHA-1；</span></span>
<span class="line"><span style="color:#24292e;">   accesskey_arg为url中的关键字参数；</span></span>
<span class="line"><span style="color:#24292e;">   accesskey_signature为加密值，此处为mypass和访问IP构成的字符串。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">访问测试脚本download.php：</span></span>
<span class="line"><span style="color:#24292e;">&lt;?</span></span>
<span class="line"><span style="color:#24292e;">$ipkey= md5(&quot;mypass&quot;.$_SERVER[&#39;REMOTE_ADDR&#39;]);</span></span>
<span class="line"><span style="color:#24292e;">$output_add_key=&quot;&lt;a  href=http://www.jzxue.com/download/G3200507120520LM.rar?key=&quot;.$ipkey.&quot;&gt;download_add_key&lt;/a&gt;&lt;br /&gt;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">$output_org_url=&quot;&lt;a href=http://www.jzxue.com/download/G3200507120520LM.rar&gt;download_org_path&lt;/a&gt;&lt;br /&gt;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">echo $output_add_key;</span></span>
<span class="line"><span style="color:#24292e;">echo $output_org_url;</span></span>
<span class="line"><span style="color:#24292e;">?&gt;</span></span>
<span class="line"><span style="color:#24292e;">访问第一个download_add_key链接可以正常下载，第二个链接download_org_path会返回403 Forbidden错误</span></span></code></pre></div><ul><li>代理方式</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~* \\.(gif)$</span></span>
<span class="line"><span style="color:#e1e4e8;">        {</span></span>
<span class="line"><span style="color:#e1e4e8;">        root /var/www/;</span></span>
<span class="line"><span style="color:#e1e4e8;">        expires 7d;</span></span>
<span class="line"><span style="color:#e1e4e8;">        accesskey             on;</span></span>
<span class="line"><span style="color:#e1e4e8;">        accesskey_hashmethod  md5;</span></span>
<span class="line"><span style="color:#e1e4e8;">        accesskey_arg         &quot;site&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        accesskey_signature   &quot;dasiyebushuo$remote_addr&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        error_page 404 = @fallback;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">location @fallback {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_cache_valid 200 304 5d;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_cache_valid 301 302 30m;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_cache_valid any 30m;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_cache_key $host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host pic1.xxxx.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-forwarded-For $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://pic.xxxx.com_server_pool;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~* \\.(gif)$</span></span>
<span class="line"><span style="color:#24292e;">        {</span></span>
<span class="line"><span style="color:#24292e;">        root /var/www/;</span></span>
<span class="line"><span style="color:#24292e;">        expires 7d;</span></span>
<span class="line"><span style="color:#24292e;">        accesskey             on;</span></span>
<span class="line"><span style="color:#24292e;">        accesskey_hashmethod  md5;</span></span>
<span class="line"><span style="color:#24292e;">        accesskey_arg         &quot;site&quot;;</span></span>
<span class="line"><span style="color:#24292e;">        accesskey_signature   &quot;dasiyebushuo$remote_addr&quot;;</span></span>
<span class="line"><span style="color:#24292e;">        error_page 404 = @fallback;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">location @fallback {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_cache_valid 200 304 5d;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_cache_valid 301 302 30m;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_cache_valid any 30m;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_cache_key $host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host pic1.xxxx.com;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-forwarded-For $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://pic.xxxx.com_server_pool;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div></li></ol><h1 id="_9-爬虫" tabindex="-1">9.爬虫 <a class="header-anchor" href="#_9-爬虫" aria-label="Permalink to &quot;9.爬虫&quot;">​</a></h1><p>一般识别爬虫的方法有两种：</p><p>1、通过dnspod的方式</p><p>2、通过UserAgent，这种办法最直接，但也很容易伪造</p><h2 id="网站反爬虫的原因" tabindex="-1"><strong>网站反爬虫的原因</strong> <a class="header-anchor" href="#网站反爬虫的原因" aria-label="Permalink to &quot;**网站反爬虫的原因**&quot;">​</a></h2><ul><li>不遵守规范的爬虫会影响网站的正常使用</li><li>网站上的数据是公司的重要资产</li><li>爬虫对网站的爬取会造成网站统计数据的污染</li></ul><h2 id="常见反爬虫手段" tabindex="-1"><strong>常见反爬虫手段</strong> <a class="header-anchor" href="#常见反爬虫手段" aria-label="Permalink to &quot;**常见反爬虫手段**&quot;">​</a></h2><ol><li><p>根据 IP 访问频率封禁 IP</p></li><li><p>设置账号登陆时长，账号访问过多封禁 设置账号的登录限制，只有登录才能展现内容 设置账号登录的时长，时间一到则自动退出</p></li><li><p>弹出数字验证码和图片确认验证码 爬虫访问次数过多，弹出验证码要求输入</p></li><li><p>对 API 接口的限制 每天限制一个登录账户后端 api 接口的调用次数 对后台 api 返回信息进行加密处理</p></li></ol><p><img src="`+p+`" alt=""></p><h2 id="第一层" tabindex="-1"><strong>第一层</strong> <a class="header-anchor" href="#第一层" aria-label="Permalink to &quot;**第一层**&quot;">​</a></h2><h3 id="robots-txt" tabindex="-1"><strong>robots.txt</strong> <a class="header-anchor" href="#robots-txt" aria-label="Permalink to &quot;**robots.txt**&quot;">​</a></h3><p>robots是网站跟爬虫间的协议，用简单直接的txt格式文本方式告诉对应的爬虫被允许的权限，也就是说robots.txt是搜索引擎中访问网站的时候要查看的第一个文件。</p><p>注意：它只是做了协议规定，是否允许将爬取的数据收录，不影响网页访问。</p><p>备注：对于手动写爬虫技术人员而言，一般都是直接忽略掉的。</p><p>如果不允许所有的爬虫蜘蛛访问，内容如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">User</span><span style="color:#F97583;">-</span><span style="color:#B392F0;">agent</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">*</span></span>
<span class="line"><span style="color:#B392F0;">Disallow</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">User</span><span style="color:#D73A49;">-</span><span style="color:#6F42C1;">agent</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">*</span></span>
<span class="line"><span style="color:#6F42C1;">Disallow</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">/</span></span></code></pre></div><h2 id="第二层" tabindex="-1"><strong>第二层</strong> <a class="header-anchor" href="#第二层" aria-label="Permalink to &quot;**第二层**&quot;">​</a></h2><h3 id="useragent特征拦截" tabindex="-1"><strong>useragent特征拦截</strong> <a class="header-anchor" href="#useragent特征拦截" aria-label="Permalink to &quot;**useragent特征拦截**&quot;">​</a></h3><p>因为user-agent带有Bytespider爬虫标记，这可以通过Nginx规则来限定流氓爬虫的访问，直接返回403错误。</p><p>具体操作，请查看上面的nginx配置。</p><p>备注：这样可以防止一部分爬虫访问，以及初级爬虫人员</p><h2 id="第三层" tabindex="-1"><strong>第三层</strong> <a class="header-anchor" href="#第三层" aria-label="Permalink to &quot;**第三层**&quot;">​</a></h2><h3 id="js发送鼠标点击事件" tabindex="-1"><strong>JS发送鼠标点击事件</strong> <a class="header-anchor" href="#js发送鼠标点击事件" aria-label="Permalink to &quot;**JS发送鼠标点击事件**&quot;">​</a></h3><p>有些网站，你从浏览器可以打开正常的页面，而在requests里面却被要求输入验证码或者是重定向到其他的页面。 原理：当点击登录时，触发js加密代码，复杂的加密算法参数+时间戳+sig值，后台进行 参数+时间的限制。验证成功后，才可以登录。</p><p>备注：爬虫高手需要模拟浏览器行为，加载js代码以及图片识别，才能正常登陆</p><h2 id="第四层" tabindex="-1"><strong>第四层</strong> <a class="header-anchor" href="#第四层" aria-label="Permalink to &quot;**第四层**&quot;">​</a></h2><h3 id="后台接口限制" tabindex="-1"><strong>后台接口限制</strong> <a class="header-anchor" href="#后台接口限制" aria-label="Permalink to &quot;**后台接口限制**&quot;">​</a></h3><ol><li>根据 IP 访问频率封禁 IP(注意：频率要控制好，否则容易误伤。) 2. 设置账号登陆时长，账号访问过多封禁。 设置账号的登录限制，只有登录才能展现内容\v设置账号登录的时长，时间一到则自动退出 3.弹出数字验证码和图片确认验证码 爬虫访问次数过多，前端弹出验证码要求输入 4.对 API 接口的限制 每天的登录账户，请求后端 api 接口时，做调用次数限制。对后台 api 返回信息进行加密处理</li></ol><h2 id="配置方法" tabindex="-1">配置方法 <a class="header-anchor" href="#配置方法" aria-label="Permalink to &quot;配置方法&quot;">​</a></h2><ul><li>实现在nginx中使用map指令来匹配一个变量</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> map $http_user_agent $is_bot {</span></span>
<span class="line"><span style="color:#e1e4e8;">      default 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">      ~[a-z]bot[^a-z] 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">      ~[sS]pider[^a-z] 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &#39;Yahoo! Slurp China&#39; 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &#39;Mediapartners-Google&#39; 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &#39;YisouSpider&#39; 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> map $http_user_agent $is_bot {</span></span>
<span class="line"><span style="color:#24292e;">      default 0;</span></span>
<span class="line"><span style="color:#24292e;">      ~[a-z]bot[^a-z] 1;</span></span>
<span class="line"><span style="color:#24292e;">      ~[sS]pider[^a-z] 1;</span></span>
<span class="line"><span style="color:#24292e;">      &#39;Yahoo! Slurp China&#39; 1;</span></span>
<span class="line"><span style="color:#24292e;">      &#39;Mediapartners-Google&#39; 1;</span></span>
<span class="line"><span style="color:#24292e;">      &#39;YisouSpider&#39; 1;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span></code></pre></div><p>在这里我们生成了一个名为 $is_bot 的变量，该变量默认值是 0 ，如果匹配到上述 4 种正则表达式的情况后，值就变成1。你可以继续往 map 中添加新的表达式规则</p><ul><li>在location中使用该变量</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">    error_page 418 =200 @bots;</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($is_bot) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        return 418;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://91donkey_web;</span></span>
<span class="line"><span style="color:#e1e4e8;">    include proxy.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">    access_log /export/home/logs/91donkey/access.log main;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">    error_page 418 =200 @bots;</span></span>
<span class="line"><span style="color:#24292e;">    if ($is_bot) {</span></span>
<span class="line"><span style="color:#24292e;">        return 418;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://91donkey_web;</span></span>
<span class="line"><span style="color:#24292e;">    include proxy.conf;</span></span>
<span class="line"><span style="color:#24292e;">    access_log /export/home/logs/91donkey/access.log main;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>@bots的定义</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location @bots {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://91donkey_spider_web;</span></span>
<span class="line"><span style="color:#e1e4e8;">    include proxy.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">    access_log /export/home/logs/91donkey_spider/access.log main;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location @bots {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://91donkey_spider_web;</span></span>
<span class="line"><span style="color:#24292e;">    include proxy.conf;</span></span>
<span class="line"><span style="color:#24292e;">    access_log /export/home/logs/91donkey_spider/access.log main;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">当判断当前请求是爬虫的时候，返回 418 错误码。</span></span>
<span class="line"><span style="color:#e1e4e8;">通过 error_page 将 418 错误码改为 200 （正常请求响应码），然后进入 @bots 这个 location 进行下一步处理。@bots 中将请求反向代理到你指定的后端应用。</span></span>
<span class="line"><span style="color:#e1e4e8;">如此便可将正常的用户访问和爬虫访问独立开来，使二者不会互相影响</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">当判断当前请求是爬虫的时候，返回 418 错误码。</span></span>
<span class="line"><span style="color:#24292e;">通过 error_page 将 418 错误码改为 200 （正常请求响应码），然后进入 @bots 这个 location 进行下一步处理。@bots 中将请求反向代理到你指定的后端应用。</span></span>
<span class="line"><span style="color:#24292e;">如此便可将正常的用户访问和爬虫访问独立开来，使二者不会互相影响</span></span></code></pre></div><ul><li>禁止访问指定目录下的所有文件和目录</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ ^/(static)/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">                deny all;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">配置禁止访问指定的单个或多个目录</span></span>
<span class="line"><span style="color:#e1e4e8;">        location ~ ^/static {</span></span>
<span class="line"><span style="color:#e1e4e8;">                deny all;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ ^/(static)/ {</span></span>
<span class="line"><span style="color:#24292e;">                deny all;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">配置禁止访问指定的单个或多个目录</span></span>
<span class="line"><span style="color:#24292e;">        location ~ ^/static {</span></span>
<span class="line"><span style="color:#24292e;">                deny all;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span></code></pre></div><p>只允许百度谷歌等搜索引擎蜘蛛访问，正常用户无法访问，ua头根据自身情况进行增加删减</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#在nginx的server字段中配置下面内容即可</span></span>
<span class="line"><span style="color:#e1e4e8;">set $ua &#39;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_user_agent ~* (Baiduspider|googlebot|bing|sogou|yahoo)){</span></span>
<span class="line"><span style="color:#e1e4e8;">set $ua 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($ua != 1) {</span></span>
<span class="line"><span style="color:#e1e4e8;">return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#在nginx的server字段中配置下面内容即可</span></span>
<span class="line"><span style="color:#24292e;">set $ua &#39;&#39;;</span></span>
<span class="line"><span style="color:#24292e;">if ($http_user_agent ~* (Baiduspider|googlebot|bing|sogou|yahoo)){</span></span>
<span class="line"><span style="color:#24292e;">set $ua 1;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if ($ua != 1) {</span></span>
<span class="line"><span style="color:#24292e;">return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>map方式</p><p>在http字段下加入一个map做匹配引导</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">map $http_user_agent $limit_bots {</span></span>
<span class="line"><span style="color:#e1e4e8;">  default 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ~*(baiduspider|google|soso|bing|yandex|sogou|yahoo|sohu-search|yodao|YoudaoBot|robozilla|msnbot|MJ12bot|NHN|Twiceler) 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ~*(AltaVista|Googlebot|Slurp|BlackWidow|Bot|ChinaClaw|Custo|DISCo|Download|Demon|eCatch|EirGrabber|EmailSiphon|EmailWolf|SuperHTTP|Surfbot|WebWhacker) 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ~*(Express|WebPictures|ExtractorPro|EyeNetIE|FlashGet|GetRight|GetWeb!|Go!Zilla|Go-Ahead-Got-It|GrabNet|Grafula|HMView|Go!Zilla|Go-Ahead-Got-It) 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ~*(rafula|HMView|HTTrack|Stripper|Sucker|Indy|InterGET|Ninja|JetCar|Spider|larbin|LeechFTP|Downloader|tool|Navroad|NearSite|NetAnts|tAkeOut|WWWOFFLE) 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ~*(GrabNet|NetSpider|Vampire|NetZIP|Octopus|Offline|PageGrabber|Foto|pavuk|pcBrowser|RealDownload|ReGet|SiteSnagger|SmartDownload|SuperBot|WebSpider) 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ~*(Teleport|VoidEYE|Collector|WebAuto|WebCopier|WebFetch|WebGo|WebLeacher|WebReaper|WebSauger|eXtractor|Quester|WebStripper|WebZIP|Wget|Widow|Zeus) 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ~*(Twengabot|htmlparser|libwww|Python|perl|urllib|scan|Curl|email|PycURL|Pyth|PyQ|WebCollector|WebCopy|webcraw) 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">再到server字段或者是location字段下加入if判断：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($limit_bots = 1) {  return 403;  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">map $http_user_agent $limit_bots {</span></span>
<span class="line"><span style="color:#24292e;">  default 0;</span></span>
<span class="line"><span style="color:#24292e;">  ~*(baiduspider|google|soso|bing|yandex|sogou|yahoo|sohu-search|yodao|YoudaoBot|robozilla|msnbot|MJ12bot|NHN|Twiceler) 1;</span></span>
<span class="line"><span style="color:#24292e;">  ~*(AltaVista|Googlebot|Slurp|BlackWidow|Bot|ChinaClaw|Custo|DISCo|Download|Demon|eCatch|EirGrabber|EmailSiphon|EmailWolf|SuperHTTP|Surfbot|WebWhacker) 1;</span></span>
<span class="line"><span style="color:#24292e;">  ~*(Express|WebPictures|ExtractorPro|EyeNetIE|FlashGet|GetRight|GetWeb!|Go!Zilla|Go-Ahead-Got-It|GrabNet|Grafula|HMView|Go!Zilla|Go-Ahead-Got-It) 1;</span></span>
<span class="line"><span style="color:#24292e;">  ~*(rafula|HMView|HTTrack|Stripper|Sucker|Indy|InterGET|Ninja|JetCar|Spider|larbin|LeechFTP|Downloader|tool|Navroad|NearSite|NetAnts|tAkeOut|WWWOFFLE) 1;</span></span>
<span class="line"><span style="color:#24292e;">  ~*(GrabNet|NetSpider|Vampire|NetZIP|Octopus|Offline|PageGrabber|Foto|pavuk|pcBrowser|RealDownload|ReGet|SiteSnagger|SmartDownload|SuperBot|WebSpider) 1;</span></span>
<span class="line"><span style="color:#24292e;">  ~*(Teleport|VoidEYE|Collector|WebAuto|WebCopier|WebFetch|WebGo|WebLeacher|WebReaper|WebSauger|eXtractor|Quester|WebStripper|WebZIP|Wget|Widow|Zeus) 1;</span></span>
<span class="line"><span style="color:#24292e;">  ~*(Twengabot|htmlparser|libwww|Python|perl|urllib|scan|Curl|email|PycURL|Pyth|PyQ|WebCollector|WebCopy|webcraw) 1;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">再到server字段或者是location字段下加入if判断：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> if ($limit_bots = 1) {  return 403;  }</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#禁垃圾蜘蛛</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_user_agent ~* &quot;CheckMarkNetwork|Synapse|Bingbot|Googlebot|Nimbostratus-Bot|Dark|scraper|LMAO|Hakai|Gemini|Wappalyzer|masscan|crawler4j|Mappy|Center|eright|aiohttp|MauiBot|Crawler|researchscan|Dispatch|AlphaBot|Census|ips-agent|NetcraftSurveyAgent|ToutiaoSpider|EasyHttp|Iframely|sysscan|fasthttp|muhstik|DeuSu|mstshash|HTTP_Request|ExtLinksBot|package|SafeDNSBot|CPython|SiteExplorer|SSH|MegaIndex|BUbiNG|CCBot|NetTrack|Digincore|aiHitBot|SurdotlyBot|null|SemrushBot|Test|Copied|ltx71|Nmap|DotBot|AdsBot|InetURL|Pcore-HTTP|PocketParser|Wotbox|newspaper|DnyzBot|redback|PiplBot|SMTBot|WinHTTP|Auto Spider 1.0|GrabNet|TurnitinBot|Go-Ahead-Got-It|Download Demon|Go!Zilla|GetWeb!|GetRight|libwww-perl|Cliqzbot|MailChimp|SMTBot|Dataprovider|XoviBot|linkdexbot|SeznamBot|Qwantify|spbot|evc-batch|zgrab|Go-http-client|FeedDemon|JikeSpider|Indy Library|Alexa Toolbar|AskTbFXTV|AhrefsBot|CrawlDaddy|CoolpadWebkit|Java|UniversalFeedParser|ApacheBench|Microsoft URL Control|Swiftbot|ZmEu|jaunty|Python-urllib|lightDeckReports Bot|YYSpider|DigExt|HttpClient|MJ12bot|EasouSpider|LinkpadBot|Ezooms|YoudaoBot|YandexBot|Rogerbot|exabot|ia_archiver|Teoma|gigabot|DOCOMO Sprider|AhrefsBot|SemrushBot|Sosospider|Yahoo! Slurp China|Yahoo! Slurp|MSNBot|MSNot-media|FlightDeckReports Bot|Bytespider|Mail.RU_Bot&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#过滤url参数</span></span>
<span class="line"><span style="color:#e1e4e8;">set $URL $request_uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($URL ~* &quot;member|plus|base|data|dede|public|plug|Vote|tool|feed|components|skin|tinyMCE|version|sysimage|wp-content|wp-admin|static|common|face|shell|swfupload|utility|convert|sitemap|siteserver|BackupDB|file|user|system|upimg|install|wap|multiupload|ewebeditor|office|wallet|backup|bitcoin|maccms|vendor|apply|bjebhgm|photo|module|external|Analytics|tools|subdomains|notes|md5|ckeditor|bbs|ajax|zhuitanyun|logbaak|help|weki|dxyylc|Somnus|manage|J4H7eFjWoBa3bO6U|SiteFiles|dowds|source|ucenter|phpcms|language|TeatchClass|taglib|sql|allowurl|shitan|root|wp-login|houtai|admin001|htadmin|clock2|webadmin&quot;){</span></span>
<span class="line"><span style="color:#e1e4e8;">return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#禁特殊后缀</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~* \\.(asp|xml|jsp|aspx|dev|aspx|ewebeditor|sql|xsl|asmx|htaccess|ini|env|git|project|cgi|md5|ajax.js|swf|tpl.php)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#禁特殊请求工具</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_user_agent ~* &quot;Wget|Curl&quot; ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#禁部分爬取工具</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_user_agent ~* &quot;crawl|curb|git|Wtrace|Scrapy|python|http://www.snsbianpofanghu.com/&quot; ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#禁压缩包</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~* \\.(tgz|bak|zip|rar|tar|gz|bz2|xz|tar.gz)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#forbidden not GET|HEAD|POST method access</span></span>
<span class="line"><span style="color:#e1e4e8;">  if ($request_method !~ ^(GET|HEAD|POST)$) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">+++++++++++++++++++++++++++++++++++++++++++++</span></span>
<span class="line"><span style="color:#e1e4e8;">FeedDemon             内容采集</span></span>
<span class="line"><span style="color:#e1e4e8;">BOT/0.1 (BOT for JCE) sql注入</span></span>
<span class="line"><span style="color:#e1e4e8;">CrawlDaddy            sql注入</span></span>
<span class="line"><span style="color:#e1e4e8;">Java                  内容采集</span></span>
<span class="line"><span style="color:#e1e4e8;">Jullo                 内容采集</span></span>
<span class="line"><span style="color:#e1e4e8;">Feedly                内容采集</span></span>
<span class="line"><span style="color:#e1e4e8;">UniversalFeedParser   内容采集</span></span>
<span class="line"><span style="color:#e1e4e8;">ApacheBench           cc攻击器</span></span>
<span class="line"><span style="color:#e1e4e8;">Swiftbot              无用爬虫</span></span>
<span class="line"><span style="color:#e1e4e8;">YandexBot             无用爬虫</span></span>
<span class="line"><span style="color:#e1e4e8;">AhrefsBot             无用爬虫</span></span>
<span class="line"><span style="color:#e1e4e8;">YisouSpider           无用爬虫（已被UC神马搜索收购，此蜘蛛可以放开！）</span></span>
<span class="line"><span style="color:#e1e4e8;">jikeSpider            无用爬虫</span></span>
<span class="line"><span style="color:#e1e4e8;">MJ12bot               无用爬虫</span></span>
<span class="line"><span style="color:#e1e4e8;">ZmEu phpmyadmin       漏洞扫描</span></span>
<span class="line"><span style="color:#e1e4e8;">WinHttp               采集cc攻击</span></span>
<span class="line"><span style="color:#e1e4e8;">EasouSpider           无用爬虫</span></span>
<span class="line"><span style="color:#e1e4e8;">HttpClient            tcp攻击</span></span>
<span class="line"><span style="color:#e1e4e8;">Microsoft URL Control 扫描</span></span>
<span class="line"><span style="color:#e1e4e8;">YYSpider              无用爬虫</span></span>
<span class="line"><span style="color:#e1e4e8;">jaunty                wordpress爆破扫描器</span></span>
<span class="line"><span style="color:#e1e4e8;">oBot                  无用爬虫</span></span>
<span class="line"><span style="color:#e1e4e8;">Python-urllib         内容采集</span></span>
<span class="line"><span style="color:#e1e4e8;">Python-requests       内容采集</span></span>
<span class="line"><span style="color:#e1e4e8;">Indy Library          扫描</span></span>
<span class="line"><span style="color:#e1e4e8;">FlightDeckReports Bot 无用爬虫</span></span>
<span class="line"><span style="color:#e1e4e8;">Linguee Bot           无用爬虫</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#禁垃圾蜘蛛</span></span>
<span class="line"><span style="color:#24292e;">if ($http_user_agent ~* &quot;CheckMarkNetwork|Synapse|Bingbot|Googlebot|Nimbostratus-Bot|Dark|scraper|LMAO|Hakai|Gemini|Wappalyzer|masscan|crawler4j|Mappy|Center|eright|aiohttp|MauiBot|Crawler|researchscan|Dispatch|AlphaBot|Census|ips-agent|NetcraftSurveyAgent|ToutiaoSpider|EasyHttp|Iframely|sysscan|fasthttp|muhstik|DeuSu|mstshash|HTTP_Request|ExtLinksBot|package|SafeDNSBot|CPython|SiteExplorer|SSH|MegaIndex|BUbiNG|CCBot|NetTrack|Digincore|aiHitBot|SurdotlyBot|null|SemrushBot|Test|Copied|ltx71|Nmap|DotBot|AdsBot|InetURL|Pcore-HTTP|PocketParser|Wotbox|newspaper|DnyzBot|redback|PiplBot|SMTBot|WinHTTP|Auto Spider 1.0|GrabNet|TurnitinBot|Go-Ahead-Got-It|Download Demon|Go!Zilla|GetWeb!|GetRight|libwww-perl|Cliqzbot|MailChimp|SMTBot|Dataprovider|XoviBot|linkdexbot|SeznamBot|Qwantify|spbot|evc-batch|zgrab|Go-http-client|FeedDemon|JikeSpider|Indy Library|Alexa Toolbar|AskTbFXTV|AhrefsBot|CrawlDaddy|CoolpadWebkit|Java|UniversalFeedParser|ApacheBench|Microsoft URL Control|Swiftbot|ZmEu|jaunty|Python-urllib|lightDeckReports Bot|YYSpider|DigExt|HttpClient|MJ12bot|EasouSpider|LinkpadBot|Ezooms|YoudaoBot|YandexBot|Rogerbot|exabot|ia_archiver|Teoma|gigabot|DOCOMO Sprider|AhrefsBot|SemrushBot|Sosospider|Yahoo! Slurp China|Yahoo! Slurp|MSNBot|MSNot-media|FlightDeckReports Bot|Bytespider|Mail.RU_Bot&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">return 403;</span></span>
<span class="line"><span style="color:#24292e;">break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#过滤url参数</span></span>
<span class="line"><span style="color:#24292e;">set $URL $request_uri;</span></span>
<span class="line"><span style="color:#24292e;">if ($URL ~* &quot;member|plus|base|data|dede|public|plug|Vote|tool|feed|components|skin|tinyMCE|version|sysimage|wp-content|wp-admin|static|common|face|shell|swfupload|utility|convert|sitemap|siteserver|BackupDB|file|user|system|upimg|install|wap|multiupload|ewebeditor|office|wallet|backup|bitcoin|maccms|vendor|apply|bjebhgm|photo|module|external|Analytics|tools|subdomains|notes|md5|ckeditor|bbs|ajax|zhuitanyun|logbaak|help|weki|dxyylc|Somnus|manage|J4H7eFjWoBa3bO6U|SiteFiles|dowds|source|ucenter|phpcms|language|TeatchClass|taglib|sql|allowurl|shitan|root|wp-login|houtai|admin001|htadmin|clock2|webadmin&quot;){</span></span>
<span class="line"><span style="color:#24292e;">return 403;</span></span>
<span class="line"><span style="color:#24292e;">break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#禁特殊后缀</span></span>
<span class="line"><span style="color:#24292e;">location ~* \\.(asp|xml|jsp|aspx|dev|aspx|ewebeditor|sql|xsl|asmx|htaccess|ini|env|git|project|cgi|md5|ajax.js|swf|tpl.php)$ {</span></span>
<span class="line"><span style="color:#24292e;">return 403;</span></span>
<span class="line"><span style="color:#24292e;">break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#禁特殊请求工具</span></span>
<span class="line"><span style="color:#24292e;">if ($http_user_agent ~* &quot;Wget|Curl&quot; ) {</span></span>
<span class="line"><span style="color:#24292e;">return 403;</span></span>
<span class="line"><span style="color:#24292e;">break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#禁部分爬取工具</span></span>
<span class="line"><span style="color:#24292e;">if ($http_user_agent ~* &quot;crawl|curb|git|Wtrace|Scrapy|python|http://www.snsbianpofanghu.com/&quot; ) {</span></span>
<span class="line"><span style="color:#24292e;">return 403;</span></span>
<span class="line"><span style="color:#24292e;">break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#禁压缩包</span></span>
<span class="line"><span style="color:#24292e;">location ~* \\.(tgz|bak|zip|rar|tar|gz|bz2|xz|tar.gz)$ {</span></span>
<span class="line"><span style="color:#24292e;">return 403;</span></span>
<span class="line"><span style="color:#24292e;">break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#forbidden not GET|HEAD|POST method access</span></span>
<span class="line"><span style="color:#24292e;">  if ($request_method !~ ^(GET|HEAD|POST)$) {</span></span>
<span class="line"><span style="color:#24292e;">    return 403;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">+++++++++++++++++++++++++++++++++++++++++++++</span></span>
<span class="line"><span style="color:#24292e;">FeedDemon             内容采集</span></span>
<span class="line"><span style="color:#24292e;">BOT/0.1 (BOT for JCE) sql注入</span></span>
<span class="line"><span style="color:#24292e;">CrawlDaddy            sql注入</span></span>
<span class="line"><span style="color:#24292e;">Java                  内容采集</span></span>
<span class="line"><span style="color:#24292e;">Jullo                 内容采集</span></span>
<span class="line"><span style="color:#24292e;">Feedly                内容采集</span></span>
<span class="line"><span style="color:#24292e;">UniversalFeedParser   内容采集</span></span>
<span class="line"><span style="color:#24292e;">ApacheBench           cc攻击器</span></span>
<span class="line"><span style="color:#24292e;">Swiftbot              无用爬虫</span></span>
<span class="line"><span style="color:#24292e;">YandexBot             无用爬虫</span></span>
<span class="line"><span style="color:#24292e;">AhrefsBot             无用爬虫</span></span>
<span class="line"><span style="color:#24292e;">YisouSpider           无用爬虫（已被UC神马搜索收购，此蜘蛛可以放开！）</span></span>
<span class="line"><span style="color:#24292e;">jikeSpider            无用爬虫</span></span>
<span class="line"><span style="color:#24292e;">MJ12bot               无用爬虫</span></span>
<span class="line"><span style="color:#24292e;">ZmEu phpmyadmin       漏洞扫描</span></span>
<span class="line"><span style="color:#24292e;">WinHttp               采集cc攻击</span></span>
<span class="line"><span style="color:#24292e;">EasouSpider           无用爬虫</span></span>
<span class="line"><span style="color:#24292e;">HttpClient            tcp攻击</span></span>
<span class="line"><span style="color:#24292e;">Microsoft URL Control 扫描</span></span>
<span class="line"><span style="color:#24292e;">YYSpider              无用爬虫</span></span>
<span class="line"><span style="color:#24292e;">jaunty                wordpress爆破扫描器</span></span>
<span class="line"><span style="color:#24292e;">oBot                  无用爬虫</span></span>
<span class="line"><span style="color:#24292e;">Python-urllib         内容采集</span></span>
<span class="line"><span style="color:#24292e;">Python-requests       内容采集</span></span>
<span class="line"><span style="color:#24292e;">Indy Library          扫描</span></span>
<span class="line"><span style="color:#24292e;">FlightDeckReports Bot 无用爬虫</span></span>
<span class="line"><span style="color:#24292e;">Linguee Bot           无用爬虫</span></span></code></pre></div><h1 id="_10-nginx四层负载均衡实现tcp的转发" tabindex="-1">10.nginx四层负载均衡实现tcp的转发 <a class="header-anchor" href="#_10-nginx四层负载均衡实现tcp的转发" aria-label="Permalink to &quot;10.nginx四层负载均衡实现tcp的转发&quot;">​</a></h1><ul><li>Nginx使用proxy_pass及rewrite使用二级目录请求</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">~</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^/artH5.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">$ </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">deny.conf</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">rewrite</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^/artH5/</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">.</span><span style="color:#E1E4E8;">*) </span><span style="color:#9ECBFF;">/</span><span style="color:#FFAB70;">$1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">break</span><span style="color:#E1E4E8;">;    </span><span style="color:#6A737D;">#处理artH5多余的路由，实现根目录请求源地址效果</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://xxx:8080</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">proxy.conf</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">error_log</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">logs/artH5_error.log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">info</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">access_log</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">logs/artH5_access.log</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">main</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~</span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^/artH5.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">$ </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">include</span><span style="color:#24292E;"> </span><span style="color:#032F62;">deny.conf</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">rewrite</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^/artH5/</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">.</span><span style="color:#24292E;">*) </span><span style="color:#032F62;">/</span><span style="color:#E36209;">$1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">break</span><span style="color:#24292E;">;    </span><span style="color:#6A737D;">#处理artH5多余的路由，实现根目录请求源地址效果</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://xxx:8080</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">include</span><span style="color:#24292E;"> </span><span style="color:#032F62;">proxy.conf</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">error_log</span><span style="color:#24292E;">  </span><span style="color:#032F62;">logs/artH5_error.log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">info</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">access_log</span><span style="color:#24292E;">  </span><span style="color:#032F62;">logs/artH5_access.log</span><span style="color:#24292E;">  </span><span style="color:#032F62;">main</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>浏览器查看日志</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen   80;        </span></span>
<span class="line"><span style="color:#e1e4e8;">        location /logs/fanlai {</span></span>
<span class="line"><span style="color:#e1e4e8;">            autoindex on;</span></span>
<span class="line"><span style="color:#e1e4e8;">            root /root/;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        location ^/logs/fanlai~*\\.(log|txt)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">                add_header Content-Type text/plain;</span></span>
<span class="line"><span style="color:#e1e4e8;">                root /root/;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen   80;        </span></span>
<span class="line"><span style="color:#24292e;">        location /logs/fanlai {</span></span>
<span class="line"><span style="color:#24292e;">            autoindex on;</span></span>
<span class="line"><span style="color:#24292e;">            root /root/;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        location ^/logs/fanlai~*\\.(log|txt)$ {</span></span>
<span class="line"><span style="color:#24292e;">                add_header Content-Type text/plain;</span></span>
<span class="line"><span style="color:#24292e;">                root /root/;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span></code></pre></div><h1 id="_11-优化nginx数据包头缓存" tabindex="-1">11.优化Nginx数据包头缓存 <a class="header-anchor" href="#_11-优化nginx数据包头缓存" aria-label="Permalink to &quot;11.优化Nginx数据包头缓存&quot;">​</a></h1><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">URL=http://192.168.4.5/index.html?</span></span>
<span class="line"><span style="color:#e1e4e8;">for i in {1..5000}</span></span>
<span class="line"><span style="color:#e1e4e8;">do</span></span>
<span class="line"><span style="color:#e1e4e8;">    URL=\${URL}v$i=$i</span></span>
<span class="line"><span style="color:#e1e4e8;">done</span></span>
<span class="line"><span style="color:#e1e4e8;">curl $URL</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;">URL=http://192.168.4.5/index.html?</span></span>
<span class="line"><span style="color:#24292e;">for i in {1..5000}</span></span>
<span class="line"><span style="color:#24292e;">do</span></span>
<span class="line"><span style="color:#24292e;">    URL=\${URL}v$i=$i</span></span>
<span class="line"><span style="color:#24292e;">done</span></span>
<span class="line"><span style="color:#24292e;">curl $URL</span></span></code></pre></div><p>测试头脚本</p><h1 id="_12-修改tengine-版本号" tabindex="-1">12.修改tengine 版本号 <a class="header-anchor" href="#_12-修改tengine-版本号" aria-label="Permalink to &quot;12.修改tengine 版本号&quot;">​</a></h1><p><strong>第一步：修改src/core/nginx.h（Nginx内部的名称和版本号）</strong></p><ol><li>#define NGINX_VERSION &quot;1.8.0&quot;</li><li>#define NGINX_VER &quot;NGINX/&quot; NGINX_VERSION</li></ol><p>NGINX_VERSION是版本号，NGINX_VER是名称</p><p><strong>第二步:修改src/http/ngx_http_header_filter_module.c（HTTP Response<strong><strong>Header，就是调试的时候看到的</strong></strong>）</strong></p><p>static char ngx_http_server_string[] = &quot;Server: nginx&quot; CRLF;</p><p><strong>第三步：修改src/http/ngx_http_special_response.c（修改错误页的底部Footer）</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">static u_char ngx_http_error_tail[] =</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;&lt;hr&gt;&lt;center&gt;nginx&lt;/center&gt;&quot; CRLF</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;&lt;/body&gt;&quot; CRLF</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;&lt;/html&gt;&quot; CRLF</span></span>
<span class="line"><span style="color:#e1e4e8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">static u_char ngx_http_error_tail[] =</span></span>
<span class="line"><span style="color:#24292e;">&quot;&lt;hr&gt;&lt;center&gt;nginx&lt;/center&gt;&quot; CRLF</span></span>
<span class="line"><span style="color:#24292e;">&quot;&lt;/body&gt;&quot; CRLF</span></span>
<span class="line"><span style="color:#24292e;">&quot;&lt;/html&gt;&quot; CRLF</span></span>
<span class="line"><span style="color:#24292e;">;</span></span></code></pre></div><p>结束</p><h1 id="_13-使用cloudflare-cdn加速配置" tabindex="-1">13.使用CloudFlare CDN加速配置 <a class="header-anchor" href="#_13-使用cloudflare-cdn加速配置" aria-label="Permalink to &quot;13.使用CloudFlare CDN加速配置&quot;">​</a></h1><ul><li>获取cfip</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">filename=cfip.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://www.cloudflare.com/ips-v4</span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://www.cloudflare.com/ips-v6</span></span>
<span class="line"><span style="color:#e1e4e8;">#处理IPV4地址</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;#IPv4&quot; &gt;&gt; $filename</span></span>
<span class="line"><span style="color:#e1e4e8;">#记得把环回地址加入白名单，否则像是API的本地调用会无法正常工作</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;allow 127.0.0.1;&quot; &gt;&gt; $filename</span></span>
<span class="line"><span style="color:#e1e4e8;">cat ips-v4 | while read line</span></span>
<span class="line"><span style="color:#e1e4e8;">do</span></span>
<span class="line"><span style="color:#e1e4e8;">    echo &quot;allow $line;&quot; &gt;&gt; $filename</span></span>
<span class="line"><span style="color:#e1e4e8;">done</span></span>
<span class="line"><span style="color:#e1e4e8;">#处理IPV6地址</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;#IPv6&quot; &gt;&gt; $filename</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;allow ::1;&quot; &gt;&gt; $filename</span></span>
<span class="line"><span style="color:#e1e4e8;">cat ips-v6 | while read line</span></span>
<span class="line"><span style="color:#e1e4e8;">do</span></span>
<span class="line"><span style="color:#e1e4e8;">    echo &quot;allow $line;&quot; &gt;&gt; $filename</span></span>
<span class="line"><span style="color:#e1e4e8;">done</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rm -f ips-v4</span></span>
<span class="line"><span style="color:#e1e4e8;">rm -f ips-v6</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">filename=cfip.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">wget https://www.cloudflare.com/ips-v4</span></span>
<span class="line"><span style="color:#24292e;">wget https://www.cloudflare.com/ips-v6</span></span>
<span class="line"><span style="color:#24292e;">#处理IPV4地址</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;#IPv4&quot; &gt;&gt; $filename</span></span>
<span class="line"><span style="color:#24292e;">#记得把环回地址加入白名单，否则像是API的本地调用会无法正常工作</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;allow 127.0.0.1;&quot; &gt;&gt; $filename</span></span>
<span class="line"><span style="color:#24292e;">cat ips-v4 | while read line</span></span>
<span class="line"><span style="color:#24292e;">do</span></span>
<span class="line"><span style="color:#24292e;">    echo &quot;allow $line;&quot; &gt;&gt; $filename</span></span>
<span class="line"><span style="color:#24292e;">done</span></span>
<span class="line"><span style="color:#24292e;">#处理IPV6地址</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;#IPv6&quot; &gt;&gt; $filename</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;allow ::1;&quot; &gt;&gt; $filename</span></span>
<span class="line"><span style="color:#24292e;">cat ips-v6 | while read line</span></span>
<span class="line"><span style="color:#24292e;">do</span></span>
<span class="line"><span style="color:#24292e;">    echo &quot;allow $line;&quot; &gt;&gt; $filename</span></span>
<span class="line"><span style="color:#24292e;">done</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rm -f ips-v4</span></span>
<span class="line"><span style="color:#24292e;">rm -f ips-v6</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#CloudFlare real ip</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   199.27.128.0/21;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   173.245.48.0/20;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   103.21.244.0/22;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   103.22.200.0/22;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   103.31.4.0/22;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   141.101.64.0/18;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   108.162.192.0/18;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   190.93.240.0/20;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   188.114.96.0/20; </span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   197.234.240.0/22;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   198.41.128.0/17;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   162.158.0.0/15;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   104.16.0.0/12</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   172.64.0.0/13</span></span>
<span class="line"><span style="color:#e1e4e8;">ipv6:</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   2400:cb00::/32;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   2606:4700::/32;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   2803:f800::/32;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   2405:b500::/32;</span></span>
<span class="line"><span style="color:#e1e4e8;">set_real_ip_from   2405:8100::/32;</span></span>
<span class="line"><span style="color:#e1e4e8;">real_ip_header     CF-Connecting-IP;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#Proxy Configuration</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header Host $proxy_host;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header User-Agent $http_user_agent;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header referer http://$proxy_host$request_uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header X-Forwarded-For $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header Accept-Encoding &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header Cf-Ray &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header X-Forwarded-Proto &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header CF-Visitor &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header CF-Connection-IP &quot;&quot;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#CloudFlare real ip</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   199.27.128.0/21;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   173.245.48.0/20;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   103.21.244.0/22;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   103.22.200.0/22;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   103.31.4.0/22;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   141.101.64.0/18;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   108.162.192.0/18;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   190.93.240.0/20;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   188.114.96.0/20; </span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   197.234.240.0/22;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   198.41.128.0/17;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   162.158.0.0/15;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   104.16.0.0/12</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   172.64.0.0/13</span></span>
<span class="line"><span style="color:#24292e;">ipv6:</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   2400:cb00::/32;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   2606:4700::/32;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   2803:f800::/32;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   2405:b500::/32;</span></span>
<span class="line"><span style="color:#24292e;">set_real_ip_from   2405:8100::/32;</span></span>
<span class="line"><span style="color:#24292e;">real_ip_header     CF-Connecting-IP;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#Proxy Configuration</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header Host $proxy_host;</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header User-Agent $http_user_agent;</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header referer http://$proxy_host$request_uri;</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header X-Forwarded-For $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header Accept-Encoding &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header Cf-Ray &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header X-Forwarded-Proto &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header CF-Visitor &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header CF-Connection-IP &quot;&quot;;</span></span></code></pre></div><h1 id="_14-反向代理proxy不能转发header报头" tabindex="-1">14.<strong>反向代理proxy不能转发header报头</strong> <a class="header-anchor" href="#_14-反向代理proxy不能转发header报头" aria-label="Permalink to &quot;14.**反向代理proxy不能转发header报头**&quot;">​</a></h1><p>原来是对header name的字符做了限制，默认 underscores_in_headers 为off，表示如果header name中包含下划线，则忽略掉。</p><p>恰好我自定义的header中都是用的下划线。</p><p>处理办法：</p><p>1：配置中http部分 增加underscores_in_headers on; 配置</p><p>2：用减号-替代下划线符号_，避免这种变态问题。nginx默认忽略掉下划线可能有些原因。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">可以加到http或者server中</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">语法：underscores_in_headers on|off</span></span>
<span class="line"><span style="color:#e1e4e8;">默认值：off</span></span>
<span class="line"><span style="color:#e1e4e8;">使用字段：http, server</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">是否允许在header的字段中带下划线</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">可以加到http或者server中</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">语法：underscores_in_headers on|off</span></span>
<span class="line"><span style="color:#24292e;">默认值：off</span></span>
<span class="line"><span style="color:#24292e;">使用字段：http, server</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">是否允许在header的字段中带下划线</span></span></code></pre></div><h1 id="_15-防止host头攻击" tabindex="-1">15.防止Host头攻击 <a class="header-anchor" href="#_15-防止host头攻击" aria-label="Permalink to &quot;15.防止Host头攻击&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#方式1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">       listen 80 default;</span></span>
<span class="line"><span style="color:#e1e4e8;">       server_name _;</span></span>
<span class="line"><span style="color:#e1e4e8;">       return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#针对443</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">     listen 443 default_server ssl http2;</span></span>
<span class="line"><span style="color:#e1e4e8;">     server_name _;</span></span>
<span class="line"><span style="color:#e1e4e8;">     ssl_certificate   /data/apps/nginx/ssl/6425218_cyweb.leihuofeng.net.pem;      </span></span>
<span class="line"><span style="color:#e1e4e8;">     ssl_certificate_key /data/apps/nginx/ssl/6425218_cyweb.leihuofeng.net.key;</span></span>
<span class="line"><span style="color:#e1e4e8;">     return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#方式2</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">       server_name  192.168.0.171;</span></span>
<span class="line"><span style="color:#e1e4e8;">       listen       8888;</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($http_Host !~* ^192.168.0.171:8888$)</span></span>
<span class="line"><span style="color:#e1e4e8;">        {</span></span>
<span class="line"><span style="color:#e1e4e8;">        	return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">       include /etc/nginx/default.d/*.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">       location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">       		root /www/dvwa;</span></span>
<span class="line"><span style="color:#e1e4e8;">       		index index.php index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;">       }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">可以逃过IP扫描，比如</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $host !~* &#39;abc.com&#39; ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#方式1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">       listen 80 default;</span></span>
<span class="line"><span style="color:#24292e;">       server_name _;</span></span>
<span class="line"><span style="color:#24292e;">       return 444;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#针对443</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">     listen 443 default_server ssl http2;</span></span>
<span class="line"><span style="color:#24292e;">     server_name _;</span></span>
<span class="line"><span style="color:#24292e;">     ssl_certificate   /data/apps/nginx/ssl/6425218_cyweb.leihuofeng.net.pem;      </span></span>
<span class="line"><span style="color:#24292e;">     ssl_certificate_key /data/apps/nginx/ssl/6425218_cyweb.leihuofeng.net.key;</span></span>
<span class="line"><span style="color:#24292e;">     return 444;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#方式2</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">       server_name  192.168.0.171;</span></span>
<span class="line"><span style="color:#24292e;">       listen       8888;</span></span>
<span class="line"><span style="color:#24292e;">        if ($http_Host !~* ^192.168.0.171:8888$)</span></span>
<span class="line"><span style="color:#24292e;">        {</span></span>
<span class="line"><span style="color:#24292e;">        	return 403;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">       include /etc/nginx/default.d/*.conf;</span></span>
<span class="line"><span style="color:#24292e;">       location / {</span></span>
<span class="line"><span style="color:#24292e;">       		root /www/dvwa;</span></span>
<span class="line"><span style="color:#24292e;">       		index index.php index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;">       }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">可以逃过IP扫描，比如</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ( $host !~* &#39;abc.com&#39; ) {</span></span>
<span class="line"><span style="color:#24292e;">    return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_16-图片" tabindex="-1">16.图片 <a class="header-anchor" href="#_16-图片" aria-label="Permalink to &quot;16.图片&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">	listen 9330;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server_name localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;">	</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(gif|jpg|jpeg|png)$ {  </span></span>
<span class="line"><span style="color:#e1e4e8;">    expires 24h;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    root /WebServer/imgs/;#指定图片存放路径  </span></span>
<span class="line"><span style="color:#e1e4e8;">    access_log /WebServer/imgs/log;#图片路径  </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_store on;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_store_access user:rw group:rw all:rw;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_temp_path         /WebServer/imgs/;#图片路径  </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_redirect          off;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header        Host 127.0.0.1;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header        X-Real-IP $remote_addr;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    client_max_body_size    10m;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    client_body_buffer_size 1280k;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_connect_timeout   900;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_send_timeout      900;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_read_timeout      900;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_buffer_size       40k;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_buffers           40 320k;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_busy_buffers_size 640k;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_temp_file_write_size 640k;  </span></span>
<span class="line"><span style="color:#e1e4e8;">}   </span></span>
<span class="line"><span style="color:#e1e4e8;">	location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">		root html;</span></span>
<span class="line"><span style="color:#e1e4e8;">		index index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">	</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">	listen 9330;</span></span>
<span class="line"><span style="color:#24292e;">	server_name localhost;</span></span>
<span class="line"><span style="color:#24292e;">	</span></span>
<span class="line"><span style="color:#24292e;">location ~ .*\\.(gif|jpg|jpeg|png)$ {  </span></span>
<span class="line"><span style="color:#24292e;">    expires 24h;  </span></span>
<span class="line"><span style="color:#24292e;">    root /WebServer/imgs/;#指定图片存放路径  </span></span>
<span class="line"><span style="color:#24292e;">    access_log /WebServer/imgs/log;#图片路径  </span></span>
<span class="line"><span style="color:#24292e;">    proxy_store on;  </span></span>
<span class="line"><span style="color:#24292e;">    proxy_store_access user:rw group:rw all:rw;  </span></span>
<span class="line"><span style="color:#24292e;">    proxy_temp_path         /WebServer/imgs/;#图片路径  </span></span>
<span class="line"><span style="color:#24292e;">    proxy_redirect          off;  </span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header        Host 127.0.0.1;  </span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header        X-Real-IP $remote_addr;  </span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;  </span></span>
<span class="line"><span style="color:#24292e;">    client_max_body_size    10m;  </span></span>
<span class="line"><span style="color:#24292e;">    client_body_buffer_size 1280k;  </span></span>
<span class="line"><span style="color:#24292e;">    proxy_connect_timeout   900;  </span></span>
<span class="line"><span style="color:#24292e;">    proxy_send_timeout      900;  </span></span>
<span class="line"><span style="color:#24292e;">    proxy_read_timeout      900;  </span></span>
<span class="line"><span style="color:#24292e;">    proxy_buffer_size       40k;  </span></span>
<span class="line"><span style="color:#24292e;">    proxy_buffers           40 320k;  </span></span>
<span class="line"><span style="color:#24292e;">    proxy_busy_buffers_size 640k;  </span></span>
<span class="line"><span style="color:#24292e;">    proxy_temp_file_write_size 640k;  </span></span>
<span class="line"><span style="color:#24292e;">}   </span></span>
<span class="line"><span style="color:#24292e;">	location / {</span></span>
<span class="line"><span style="color:#24292e;">		root html;</span></span>
<span class="line"><span style="color:#24292e;">		index index.html;</span></span>
<span class="line"><span style="color:#24292e;">	</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_17-nginx-cookies" tabindex="-1">17.nginx_cookies <a class="header-anchor" href="#_17-nginx-cookies" aria-label="Permalink to &quot;17.nginx_cookies&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">proxy_cookie_path source target;</span></span>
<span class="line"><span style="color:#e1e4e8;">source 源路径</span></span>
<span class="line"><span style="color:#e1e4e8;">target 目标路径</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># elastic-job 代理配置</span></span>
<span class="line"><span style="color:#e1e4e8;">    location /etc-job/api/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">       proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">       proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">       proxy_pass http://10.55.3.139:8088/api/;</span></span>
<span class="line"><span style="color:#e1e4e8;">       proxy_cookie_path / /etc-job/api/;</span></span>
<span class="line"><span style="color:#e1e4e8;">       proxy_set_header   Cookie $http_cookie;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">proxy_cookie_path source target;</span></span>
<span class="line"><span style="color:#24292e;">source 源路径</span></span>
<span class="line"><span style="color:#24292e;">target 目标路径</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># elastic-job 代理配置</span></span>
<span class="line"><span style="color:#24292e;">    location /etc-job/api/ {</span></span>
<span class="line"><span style="color:#24292e;">       proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">       proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">       proxy_pass http://10.55.3.139:8088/api/;</span></span>
<span class="line"><span style="color:#24292e;">       proxy_cookie_path / /etc-job/api/;</span></span>
<span class="line"><span style="color:#24292e;">       proxy_set_header   Cookie $http_cookie;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><h1 id="_18-防刷接口" tabindex="-1">18.防刷接口 <a class="header-anchor" href="#_18-防刷接口" aria-label="Permalink to &quot;18.防刷接口&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ /account(/.*)  { </span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_referer ~  &quot;https://www.xx.com/account/sendPhoneCode&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">   #如果匹配就直接返回200，返回404，自己定。不传给后端web</span></span>
<span class="line"><span style="color:#e1e4e8;">                return 200;        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    #不匹配，传给后端web</span></span>
<span class="line"><span style="color:#e1e4e8;"> proxy_pass  http://web_group/account/;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">https://www.mianshigee.com/note/detail/80107nmk/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ /account(/.*)  { </span></span>
<span class="line"><span style="color:#24292e;">if ($http_referer ~  &quot;https://www.xx.com/account/sendPhoneCode&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">   #如果匹配就直接返回200，返回404，自己定。不传给后端web</span></span>
<span class="line"><span style="color:#24292e;">                return 200;        }</span></span>
<span class="line"><span style="color:#24292e;">    #不匹配，传给后端web</span></span>
<span class="line"><span style="color:#24292e;"> proxy_pass  http://web_group/account/;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">https://www.mianshigee.com/note/detail/80107nmk/</span></span></code></pre></div><h1 id="_19-修改自带server头" tabindex="-1">19.修改自带Server头 <a class="header-anchor" href="#_19-修改自带server头" aria-label="Permalink to &quot;19.修改自带Server头&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">more_set_headers &#39;Server:my-server&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">more_set_headers &#39;Server:my-server&#39;;</span></span></code></pre></div><h1 id="_20-swagger代理" tabindex="-1">20.swagger代理 <a class="header-anchor" href="#_20-swagger代理" aria-label="Permalink to &quot;20.swagger代理&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">先看调整前的swagger代码：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">app.UseSwagger();</span></span>
<span class="line"><span style="color:#e1e4e8;">app.UseSwaggerUI(c =&gt; c.SwaggerEndpoint(&quot;/swagger/v1/swagger.json&quot;, &quot;MyAPI v1&quot;));</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">解决步骤：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1、调整nginx配置，在location下增加“proxy_set_header X-Forwarded-Prefix wdapi;”配置</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /myapi/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://localhost:5000/; # 被代理服务器的站点地址</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header   X-Forwarded-Proto $scheme; # 将请求使用的协议告知被代理服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header   Host $http_host; # 将请求的地址告知被代理服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header   X-Forwarded-Prefix myapi; # 将路由名称&quot;myapi&quot;告知被代理服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2、调整项目中调用swagger中间件的代码</span></span>
<span class="line"><span style="color:#e1e4e8;">app.UseSwagger(c =&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    c.PreSerializeFilters.Add((doc, item) =&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">        //根据代理服务器提供的协议、地址和路由，生成api文档服务地址</span></span>
<span class="line"><span style="color:#e1e4e8;">        doc.Servers = new List&lt;OpenApiServer&gt; { new OpenApiServer { Url = $&quot;{item.Scheme}://{item.Host.Value}/{item.Headers[&quot;X-Forwarded-Prefix&quot;]}&quot; } };</span></span>
<span class="line"><span style="color:#e1e4e8;">    });</span></span>
<span class="line"><span style="color:#e1e4e8;">});</span></span>
<span class="line"><span style="color:#e1e4e8;">//使用相对路径提供</span></span>
<span class="line"><span style="color:#e1e4e8;">app.UseSwaggerUI(c =&gt; c.SwaggerEndpoint(&quot;v1/swagger.json&quot;, &quot;MyApi v1&quot;));</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">解决步骤：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /cloud/swagger {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass     http://172.19.149.143:10020/swagger;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host $http_host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#完整配置</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream yapiUP {</span></span>
<span class="line"><span style="color:#e1e4e8;">	server 172.16.195.194:10031 max_fails=2 fail_timeout=30s ;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen   80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name yiduyapi.xxx.net;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /att/swagger {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass     http://yapiUP/swagger;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host $http_host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">		proxy_set_header Upgrade $http_upgrade; </span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Connection $connection_upgrade;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">先看调整前的swagger代码：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">app.UseSwagger();</span></span>
<span class="line"><span style="color:#24292e;">app.UseSwaggerUI(c =&gt; c.SwaggerEndpoint(&quot;/swagger/v1/swagger.json&quot;, &quot;MyAPI v1&quot;));</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">解决步骤：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1、调整nginx配置，在location下增加“proxy_set_header X-Forwarded-Prefix wdapi;”配置</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /myapi/ {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://localhost:5000/; # 被代理服务器的站点地址</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header   X-Forwarded-Proto $scheme; # 将请求使用的协议告知被代理服务器</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header   Host $http_host; # 将请求的地址告知被代理服务器</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header   X-Forwarded-Prefix myapi; # 将路由名称&quot;myapi&quot;告知被代理服务器</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2、调整项目中调用swagger中间件的代码</span></span>
<span class="line"><span style="color:#24292e;">app.UseSwagger(c =&gt;</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    c.PreSerializeFilters.Add((doc, item) =&gt;</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">        //根据代理服务器提供的协议、地址和路由，生成api文档服务地址</span></span>
<span class="line"><span style="color:#24292e;">        doc.Servers = new List&lt;OpenApiServer&gt; { new OpenApiServer { Url = $&quot;{item.Scheme}://{item.Host.Value}/{item.Headers[&quot;X-Forwarded-Prefix&quot;]}&quot; } };</span></span>
<span class="line"><span style="color:#24292e;">    });</span></span>
<span class="line"><span style="color:#24292e;">});</span></span>
<span class="line"><span style="color:#24292e;">//使用相对路径提供</span></span>
<span class="line"><span style="color:#24292e;">app.UseSwaggerUI(c =&gt; c.SwaggerEndpoint(&quot;v1/swagger.json&quot;, &quot;MyApi v1&quot;));</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">解决步骤：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /cloud/swagger {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass     http://172.19.149.143:10020/swagger;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host $http_host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#完整配置</span></span>
<span class="line"><span style="color:#24292e;">upstream yapiUP {</span></span>
<span class="line"><span style="color:#24292e;">	server 172.16.195.194:10031 max_fails=2 fail_timeout=30s ;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen   80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name yiduyapi.xxx.net;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /att/swagger {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass     http://yapiUP/swagger;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host $http_host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">		proxy_set_header Upgrade $http_upgrade; </span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Connection $connection_upgrade;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_21访问控制" tabindex="-1">21访问控制 <a class="header-anchor" href="#_21访问控制" aria-label="Permalink to &quot;21访问控制&quot;">​</a></h1><h2 id="location" tabindex="-1">location <a class="header-anchor" href="#location" aria-label="Permalink to &quot;location&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location /aming/</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    deny all;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">说明：针对/aming/目录，全部禁止访问，这里的deny all可以改为return 403</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ &quot;.bak|\\.ht&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">说明：访问的uri中包含.bak字样的或者包含.ht的直接返回403状态码</span></span>
<span class="line"><span style="color:#e1e4e8;">测试链接举例：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">www.aminglinux.com/123.bak</span></span>
<span class="line"><span style="color:#e1e4e8;">www.aminglinux.com/aming/123/.htalskdjf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location /aming/</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    deny all;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">说明：针对/aming/目录，全部禁止访问，这里的deny all可以改为return 403</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location ~ &quot;.bak|\\.ht&quot;</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">说明：访问的uri中包含.bak字样的或者包含.ht的直接返回403状态码</span></span>
<span class="line"><span style="color:#24292e;">测试链接举例：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">www.aminglinux.com/123.bak</span></span>
<span class="line"><span style="color:#24292e;">www.aminglinux.com/aming/123/.htalskdjf</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ (data|cache|tmp|image|attachment).*\\.php$</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    deny all;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">说明：请求的uri中包含data、cache、tmp、image、attachment并且以.php结尾的，全部禁止访问</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">测试链接举例：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">www.aminglinux.com/aming/cache/1.php</span></span>
<span class="line"><span style="color:#e1e4e8;">www.aminglinux.com/image/123.phps</span></span>
<span class="line"><span style="color:#e1e4e8;">www.aminglinux.com/aming/datas/1.php</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ (data|cache|tmp|image|attachment).*\\.php$</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    deny all;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">说明：请求的uri中包含data、cache、tmp、image、attachment并且以.php结尾的，全部禁止访问</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">测试链接举例：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">www.aminglinux.com/aming/cache/1.php</span></span>
<span class="line"><span style="color:#24292e;">www.aminglinux.com/image/123.phps</span></span>
<span class="line"><span style="color:#24292e;">www.aminglinux.com/aming/datas/1.php</span></span></code></pre></div><h2 id="document-uri" tabindex="-1">$document_uri <a class="header-anchor" href="#document-uri" aria-label="Permalink to &quot;$document_uri&quot;">​</a></h2><p>变量<code>$document_uri</code>，根据前面所学内容，该变量等价于<code>$uri</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($document_uri ~ &quot;/admin/&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">说明：当请求的uri中包含/admin/时，直接返回403.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if结构中不支持使用allow和deny</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">测试链接：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">www.aminglinux.com/123/admin/1.html 匹配</span></span>
<span class="line"><span style="color:#e1e4e8;">www.aminglinux.com/admin123/1.html 不匹配</span></span>
<span class="line"><span style="color:#e1e4e8;">www.aminglinux.com/admin.php 不匹配</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($document_uri ~ &quot;/admin/&quot;)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">说明：当请求的uri中包含/admin/时，直接返回403.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if结构中不支持使用allow和deny</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">测试链接：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">www.aminglinux.com/123/admin/1.html 匹配</span></span>
<span class="line"><span style="color:#24292e;">www.aminglinux.com/admin123/1.html 不匹配</span></span>
<span class="line"><span style="color:#24292e;">www.aminglinux.com/admin.php 不匹配</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($document_uri = /admin.php)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">说明：请求的uri为/admin.php时返回403状态码。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">测试链接：</span></span>
<span class="line"><span style="color:#e1e4e8;">www.aminglinux.com/admin.php 匹配</span></span>
<span class="line"><span style="color:#e1e4e8;">www.aminglinux.com/123/admin.php 不匹配</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($document_uri = /admin.php)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">说明：请求的uri为/admin.php时返回403状态码。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">测试链接：</span></span>
<span class="line"><span style="color:#24292e;">www.aminglinux.com/admin.php 匹配</span></span>
<span class="line"><span style="color:#24292e;">www.aminglinux.com/123/admin.php 不匹配</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($document_uri ~ &#39;/data/|/cache/.*\\.php$&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">说明：请求的uri包含data或者cache目录，并且是php时，返回403状态码。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">测试链接：</span></span>
<span class="line"><span style="color:#e1e4e8;"> www.aminglinux.com/data/123.php 匹配</span></span>
<span class="line"><span style="color:#e1e4e8;">www.aminglinux.com/cache1/123.php 不匹配</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($document_uri ~ &#39;/data/|/cache/.*\\.php$&#39;)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">说明：请求的uri包含data或者cache目录，并且是php时，返回403状态码。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">测试链接：</span></span>
<span class="line"><span style="color:#24292e;"> www.aminglinux.com/data/123.php 匹配</span></span>
<span class="line"><span style="color:#24292e;">www.aminglinux.com/cache1/123.php 不匹配</span></span></code></pre></div><h2 id="request-uri" tabindex="-1">$request_uri <a class="header-anchor" href="#request-uri" aria-label="Permalink to &quot;$request_uri&quot;">​</a></h2><p><code>$request_uri</code>比<code>$docuemnt_uri</code>多了请求的参数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($request_uri ~ &quot;gid=\\d{9,12}&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">说明：\\d{9,12}是正则表达式，表示9到12个数字，例如gid=1234567890就符号要求。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">测试链接：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">www.aminglinux.com/index.php?gid=1234567890&amp;pid=111 匹配</span></span>
<span class="line"><span style="color:#e1e4e8;">www.aminglinux.com/gid=123 不匹配</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($request_uri ~ &quot;gid=\\d{9,12}&quot;)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">说明：\\d{9,12}是正则表达式，表示9到12个数字，例如gid=1234567890就符号要求。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">测试链接：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">www.aminglinux.com/index.php?gid=1234567890&amp;pid=111 匹配</span></span>
<span class="line"><span style="color:#24292e;">www.aminglinux.com/gid=123 不匹配</span></span></code></pre></div><h2 id="user-agent" tabindex="-1">$user_agent <a class="header-anchor" href="#user-agent" aria-label="Permalink to &quot;$user_agent&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($user_agent ~ &#39;YisouSpider|MJ12bot/v1.4.2|YoudaoBot|Tomato&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($user_agent ~ &#39;YisouSpider|MJ12bot/v1.4.2|YoudaoBot|Tomato&#39;)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="http-referer" tabindex="-1">$http_referer <a class="header-anchor" href="#http-referer" aria-label="Permalink to &quot;$http_referer&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($http_referer ~ &#39;baidu.com&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 404;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_referer ~ &#39;baidu.com&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 200 &quot;&lt;html&gt;&lt;script&gt;window.location.href=&#39;//$host$request_uri&#39;;&lt;/script&gt;&lt;/html&gt;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($http_referer ~ &#39;baidu.com&#39;)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    return 404;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($http_referer ~ &#39;baidu.com&#39;)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    return 200 &quot;&lt;html&gt;&lt;script&gt;window.location.href=&#39;//$host$request_uri&#39;;&lt;/script&gt;&lt;/html&gt;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_22-禁止ip访问服务" tabindex="-1">22.禁止ip访问服务 <a class="header-anchor" href="#_22-禁止ip访问服务" aria-label="Permalink to &quot;22.禁止ip访问服务&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#443</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">     listen 443 default_server;</span></span>
<span class="line"><span style="color:#e1e4e8;">     server_name _ ;</span></span>
<span class="line"><span style="color:#e1e4e8;">     ssl on;</span></span>
<span class="line"><span style="color:#e1e4e8;">     ssl_certificate         随便设置一个ssl证书;                </span></span>
<span class="line"><span style="color:#e1e4e8;">     ssl_certificate_key 随便设置一个ssl证书的key;</span></span>
<span class="line"><span style="color:#e1e4e8;">     return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#80</span></span>
<span class="line"><span style="color:#e1e4e8;">#deny dns</span></span>
<span class="line"><span style="color:#e1e4e8;">server  </span></span>
<span class="line"><span style="color:#e1e4e8;">{  </span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80 default_server;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name _; #标示空主机头 使用“ – “ 和” ！@＃ “也可以</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 444;  </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#443</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">     listen 443 default_server;</span></span>
<span class="line"><span style="color:#24292e;">     server_name _ ;</span></span>
<span class="line"><span style="color:#24292e;">     ssl on;</span></span>
<span class="line"><span style="color:#24292e;">     ssl_certificate         随便设置一个ssl证书;                </span></span>
<span class="line"><span style="color:#24292e;">     ssl_certificate_key 随便设置一个ssl证书的key;</span></span>
<span class="line"><span style="color:#24292e;">     return 444;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#80</span></span>
<span class="line"><span style="color:#24292e;">#deny dns</span></span>
<span class="line"><span style="color:#24292e;">server  </span></span>
<span class="line"><span style="color:#24292e;">{  </span></span>
<span class="line"><span style="color:#24292e;">    listen 80 default_server;  </span></span>
<span class="line"><span style="color:#24292e;">    server_name _; #标示空主机头 使用“ – “ 和” ！@＃ “也可以</span></span>
<span class="line"><span style="color:#24292e;">    return 444;  </span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_31-控制爬虫速度" tabindex="-1">31.控制爬虫速度 <a class="header-anchor" href="#_31-控制爬虫速度" aria-label="Permalink to &quot;31.控制爬虫速度&quot;">​</a></h1><p>全局配置nginx.conf</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">limit_req_zone $ning_spider zone=ning_spider:10m rate=200r/m;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">limit_req_zone $ning_spider zone=ning_spider:10m rate=200r/m;</span></span></code></pre></div><p>某个server中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($http_user_agent ~* &quot;baiduspider|Googlebot&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;"> set $ning_spider $http_user_agent;</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span>
<span class="line"><span style="color:#e1e4e8;"> limit_req zone=ning_spider burst=5 nodelay;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($http_user_agent ~* &quot;baiduspider|Googlebot&quot;) {</span></span>
<span class="line"><span style="color:#24292e;"> set $ning_spider $http_user_agent;</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span>
<span class="line"><span style="color:#24292e;"> limit_req zone=ning_spider burst=5 nodelay;</span></span></code></pre></div><ul><li>模拟</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#! /bin/bash  </span></span>
<span class="line"><span style="color:#e1e4e8;">sum=0;  </span></span>
<span class="line"><span style="color:#e1e4e8;">for i in {1..1000}  </span></span>
<span class="line"><span style="color:#e1e4e8;">do  </span></span>
<span class="line"><span style="color:#e1e4e8;">((sum = sum + i))  </span></span>
<span class="line"><span style="color:#e1e4e8;">curl -I -A &quot;Baiduspider&quot; http://www.hezongtianxia.com</span></span>
<span class="line"><span style="color:#e1e4e8;">curl -I -A &quot;Sogou web spider&quot; http://www.hezongtianxia.com</span></span>
<span class="line"><span style="color:#e1e4e8;">done  </span></span>
<span class="line"><span style="color:#e1e4e8;">echo $sum</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#! /bin/bash  </span></span>
<span class="line"><span style="color:#24292e;">sum=0;  </span></span>
<span class="line"><span style="color:#24292e;">for i in {1..1000}  </span></span>
<span class="line"><span style="color:#24292e;">do  </span></span>
<span class="line"><span style="color:#24292e;">((sum = sum + i))  </span></span>
<span class="line"><span style="color:#24292e;">curl -I -A &quot;Baiduspider&quot; http://www.hezongtianxia.com</span></span>
<span class="line"><span style="color:#24292e;">curl -I -A &quot;Sogou web spider&quot; http://www.hezongtianxia.com</span></span>
<span class="line"><span style="color:#24292e;">done  </span></span>
<span class="line"><span style="color:#24292e;">echo $sum</span></span></code></pre></div><p>参考：<a href="http://tengine.taobao.org/nginx_docs/cn/docs/http/ngx_http_limit_req_module.html" target="_blank" rel="noreferrer">http://tengine.taobao.org/nginx_docs/cn/docs/http/ngx_http_limit_req_module.html</a></p><h1 id="_33-缓存" tabindex="-1">33.缓存 <a class="header-anchor" href="#_33-缓存" aria-label="Permalink to &quot;33.缓存&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># code-1</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($request_filename ~ .*\\.(htm|html)$) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            add_header Cache-Control &#39;no-store, no-cache, must-revalidate&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">        # code-2</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($request_filename ~ .*.(js|css)$) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            expires 30d;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># code-1</span></span>
<span class="line"><span style="color:#24292e;">        if ($request_filename ~ .*\\.(htm|html)$) {</span></span>
<span class="line"><span style="color:#24292e;">            add_header Cache-Control &#39;no-store, no-cache, must-revalidate&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">        # code-2</span></span>
<span class="line"><span style="color:#24292e;">        if ($request_filename ~ .*.(js|css)$) {</span></span>
<span class="line"><span style="color:#24292e;">            expires 30d;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span></code></pre></div><h2 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">   set $origin_root /data/blog/;</span></span>
<span class="line"><span style="color:#e1e4e8;">   root $origin_root ;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   location @webp_redirect {</span></span>
<span class="line"><span style="color:#e1e4e8;">       content_by_lua_file &quot;/usr/local/nginx/conf/lua/webp_tmp_path.lua&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   # Feed</span></span>
<span class="line"><span style="color:#e1e4e8;">   location ~* \\.(?:rss|atom)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">       expires 1h;</span></span>
<span class="line"><span style="color:#e1e4e8;">       #add_header Cache-Control max-age=40;</span></span>
<span class="line"><span style="color:#e1e4e8;">       #add_header Cache-Control &quot;public&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   # CSS and Javascript</span></span>
<span class="line"><span style="color:#e1e4e8;">   location ~* \\.(?:css|js|ttf|woff|woff2)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">       add_header X-Content-Type-Options &quot;nosniff&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">       add_header X-XSS-Protection &quot;1; mode=block&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">       #add_header Cache-Control max-age=50;</span></span>
<span class="line"><span style="color:#e1e4e8;">       expires 12h;</span></span>
<span class="line"><span style="color:#e1e4e8;">       #access_log off;</span></span>
<span class="line"><span style="color:#e1e4e8;">       #add_header Cache-Control &quot;public&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   # Media: images, icons, video, audio, HTC</span></span>
<span class="line"><span style="color:#e1e4e8;">   location ~* \\.(?:gif|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">       expires 7d;</span></span>
<span class="line"><span style="color:#e1e4e8;">       #add_header Cache-Control max-age=30;</span></span>
<span class="line"><span style="color:#e1e4e8;">       #access_log off;</span></span>
<span class="line"><span style="color:#e1e4e8;">       #add_header Cache-Control &quot;public&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   location ~ .*\\.(jpg|jpeg|png)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">       set $webp_tmp_root /data/webp_data/;</span></span>
<span class="line"><span style="color:#e1e4e8;">       set $webp_filename $uri$webp_suffix;</span></span>
<span class="line"><span style="color:#e1e4e8;">       set $webp_filepath $webp_tmp_root$webp_filename;</span></span>
<span class="line"><span style="color:#e1e4e8;">       set $origin_filepath $origin_root$uri;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">       #add_header Cache-Control max-age=20;</span></span>
<span class="line"><span style="color:#e1e4e8;">       expires 7d;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">       # 兼容不支持 webp 的浏览器，直接返回原格式</span></span>
<span class="line"><span style="color:#e1e4e8;">       if ($webp_filename !~ .*\\.webp$) {</span></span>
<span class="line"><span style="color:#e1e4e8;">           root $origin_root;</span></span>
<span class="line"><span style="color:#e1e4e8;">       }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 先去检测是否存在webp文件，如果没有，则内部跳转执行lua转换</span></span>
<span class="line"><span style="color:#e1e4e8;">       try_files $webp_filename @webp_redirect;</span></span>
<span class="line"><span style="color:#e1e4e8;">       root $webp_tmp_root;</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   location ~ \\.(html|htm|xml)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">       add_header Cache-Control no-cache;</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">       #include firewall.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">       root $origin_root ;</span></span>
<span class="line"><span style="color:#e1e4e8;">       index index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">       if (!-e $request_filename) {</span></span>
<span class="line"><span style="color:#e1e4e8;">           rewrite ^/(.*)$  / redirect;</span></span>
<span class="line"><span style="color:#e1e4e8;">       }</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">   set $origin_root /data/blog/;</span></span>
<span class="line"><span style="color:#24292e;">   root $origin_root ;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   location @webp_redirect {</span></span>
<span class="line"><span style="color:#24292e;">       content_by_lua_file &quot;/usr/local/nginx/conf/lua/webp_tmp_path.lua&quot;;</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   # Feed</span></span>
<span class="line"><span style="color:#24292e;">   location ~* \\.(?:rss|atom)$ {</span></span>
<span class="line"><span style="color:#24292e;">       expires 1h;</span></span>
<span class="line"><span style="color:#24292e;">       #add_header Cache-Control max-age=40;</span></span>
<span class="line"><span style="color:#24292e;">       #add_header Cache-Control &quot;public&quot;;</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   # CSS and Javascript</span></span>
<span class="line"><span style="color:#24292e;">   location ~* \\.(?:css|js|ttf|woff|woff2)$ {</span></span>
<span class="line"><span style="color:#24292e;">       add_header X-Content-Type-Options &quot;nosniff&quot;;</span></span>
<span class="line"><span style="color:#24292e;">       add_header X-XSS-Protection &quot;1; mode=block&quot;;</span></span>
<span class="line"><span style="color:#24292e;">       #add_header Cache-Control max-age=50;</span></span>
<span class="line"><span style="color:#24292e;">       expires 12h;</span></span>
<span class="line"><span style="color:#24292e;">       #access_log off;</span></span>
<span class="line"><span style="color:#24292e;">       #add_header Cache-Control &quot;public&quot;;</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   # Media: images, icons, video, audio, HTC</span></span>
<span class="line"><span style="color:#24292e;">   location ~* \\.(?:gif|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {</span></span>
<span class="line"><span style="color:#24292e;">       expires 7d;</span></span>
<span class="line"><span style="color:#24292e;">       #add_header Cache-Control max-age=30;</span></span>
<span class="line"><span style="color:#24292e;">       #access_log off;</span></span>
<span class="line"><span style="color:#24292e;">       #add_header Cache-Control &quot;public&quot;;</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   location ~ .*\\.(jpg|jpeg|png)$ {</span></span>
<span class="line"><span style="color:#24292e;">       set $webp_tmp_root /data/webp_data/;</span></span>
<span class="line"><span style="color:#24292e;">       set $webp_filename $uri$webp_suffix;</span></span>
<span class="line"><span style="color:#24292e;">       set $webp_filepath $webp_tmp_root$webp_filename;</span></span>
<span class="line"><span style="color:#24292e;">       set $origin_filepath $origin_root$uri;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">       #add_header Cache-Control max-age=20;</span></span>
<span class="line"><span style="color:#24292e;">       expires 7d;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">       # 兼容不支持 webp 的浏览器，直接返回原格式</span></span>
<span class="line"><span style="color:#24292e;">       if ($webp_filename !~ .*\\.webp$) {</span></span>
<span class="line"><span style="color:#24292e;">           root $origin_root;</span></span>
<span class="line"><span style="color:#24292e;">       }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 先去检测是否存在webp文件，如果没有，则内部跳转执行lua转换</span></span>
<span class="line"><span style="color:#24292e;">       try_files $webp_filename @webp_redirect;</span></span>
<span class="line"><span style="color:#24292e;">       root $webp_tmp_root;</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   location ~ \\.(html|htm|xml)$ {</span></span>
<span class="line"><span style="color:#24292e;">       add_header Cache-Control no-cache;</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   location / {</span></span>
<span class="line"><span style="color:#24292e;">       #include firewall.conf;</span></span>
<span class="line"><span style="color:#24292e;">       root $origin_root ;</span></span>
<span class="line"><span style="color:#24292e;">       index index.html;</span></span>
<span class="line"><span style="color:#24292e;">       if (!-e $request_filename) {</span></span>
<span class="line"><span style="color:#24292e;">           rewrite ^/(.*)$  / redirect;</span></span>
<span class="line"><span style="color:#24292e;">       }</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span></code></pre></div><h1 id="_34-nginx配置google-analytics" tabindex="-1">34.Nginx配置Google Analytics <a class="header-anchor" href="#_34-nginx配置google-analytics" aria-label="Permalink to &quot;34.Nginx配置Google Analytics&quot;">​</a></h1><p><code>http</code> 块加入</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">userid on;</span></span>
<span class="line"><span style="color:#e1e4e8;">userid_name cid;</span></span>
<span class="line"><span style="color:#e1e4e8;">userid_domain example.net;</span></span>
<span class="line"><span style="color:#e1e4e8;">userid_path /;</span></span>
<span class="line"><span style="color:#e1e4e8;">userid_expires max;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">userid on;</span></span>
<span class="line"><span style="color:#24292e;">userid_name cid;</span></span>
<span class="line"><span style="color:#24292e;">userid_domain example.net;</span></span>
<span class="line"><span style="color:#24292e;">userid_path /;</span></span>
<span class="line"><span style="color:#24292e;">userid_expires max;</span></span></code></pre></div><ul><li>其他主机</li></ul><p>注意，TRACKING-ID</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($http_accept_language ~* &#39;^(.+?),&#39;) {    # 获取用户语言</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $first_language $1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    location @tracker {</span></span>
<span class="line"><span style="color:#e1e4e8;">        internal;</span></span>
<span class="line"><span style="color:#e1e4e8;">        resolver 8.8.8.8 [2001:4860:4860::8888];</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_method GET;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass https://www.google-analytics.com/collect?v=1&amp;tid=UA-[TRACKING-ID]&amp;$uid_set$uid_got&amp;t=pageview&amp;dh=$host&amp;dp=$request_uri&amp;uip=$remote_addr&amp;dr=$http_referer&amp;ul=$first_language&amp;z=$msec;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header User-Agent $http_user_agent;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass_request_headers off;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass_request_body off;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">        set $flag &quot;0&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        if (-f $request_filename) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            set $flag &quot;\${flag}1&quot;;    # 过滤访问不存在文件的请求</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($http_user_agent !~* &quot;GroupHigh|CCBot|YisouSpider|MJ12bot|SemrushBot|bingbot|YandexBot|DotBot|AhrefsBot|msnbot|IABot|SMTBot|SEOkicks|qihoobot|Baiduspider|Googlebot|Googlebot-Mobile|Googlebot-Image|Mediapartners-Google|Adsbot-Google|Feedfetcher-Google|Yahoo! Slurp|Yahoo! Slurp China|YoudaoBot|Sosospider|Sogou spider|Sogou web spider|MSNBot|ia_archiver|Tomato Bot|YiSou Spider&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            set $flag &quot;\${flag}2&quot;;    # 过滤 bots</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($http_dnt != 1) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            set $flag &quot;\${flag}3&quot;;    # respect DNT</span></span>
<span class="line"><span style="color:#e1e4e8;">            rewrite ^/(.*)$  /$1 break;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($flag = &quot;0123&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            post_action @tracker;</span></span>
<span class="line"><span style="color:#e1e4e8;">            rewrite ^/(.*)$  /$1 break;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    if ($http_accept_language ~* &#39;^(.+?),&#39;) {    # 获取用户语言</span></span>
<span class="line"><span style="color:#24292e;">        set $first_language $1;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    location @tracker {</span></span>
<span class="line"><span style="color:#24292e;">        internal;</span></span>
<span class="line"><span style="color:#24292e;">        resolver 8.8.8.8 [2001:4860:4860::8888];</span></span>
<span class="line"><span style="color:#24292e;">        proxy_method GET;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass https://www.google-analytics.com/collect?v=1&amp;tid=UA-[TRACKING-ID]&amp;$uid_set$uid_got&amp;t=pageview&amp;dh=$host&amp;dp=$request_uri&amp;uip=$remote_addr&amp;dr=$http_referer&amp;ul=$first_language&amp;z=$msec;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header User-Agent $http_user_agent;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass_request_headers off;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass_request_body off;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">        set $flag &quot;0&quot;;</span></span>
<span class="line"><span style="color:#24292e;">        if (-f $request_filename) {</span></span>
<span class="line"><span style="color:#24292e;">            set $flag &quot;\${flag}1&quot;;    # 过滤访问不存在文件的请求</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        if ($http_user_agent !~* &quot;GroupHigh|CCBot|YisouSpider|MJ12bot|SemrushBot|bingbot|YandexBot|DotBot|AhrefsBot|msnbot|IABot|SMTBot|SEOkicks|qihoobot|Baiduspider|Googlebot|Googlebot-Mobile|Googlebot-Image|Mediapartners-Google|Adsbot-Google|Feedfetcher-Google|Yahoo! Slurp|Yahoo! Slurp China|YoudaoBot|Sosospider|Sogou spider|Sogou web spider|MSNBot|ia_archiver|Tomato Bot|YiSou Spider&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">            set $flag &quot;\${flag}2&quot;;    # 过滤 bots</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        if ($http_dnt != 1) {</span></span>
<span class="line"><span style="color:#24292e;">            set $flag &quot;\${flag}3&quot;;    # respect DNT</span></span>
<span class="line"><span style="color:#24292e;">            rewrite ^/(.*)$  /$1 break;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        if ($flag = &quot;0123&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">            post_action @tracker;</span></span>
<span class="line"><span style="color:#24292e;">            rewrite ^/(.*)$  /$1 break;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li><a href="https://support.google.com/analytics/answer/1034823?hl=zh-Hans" target="_blank" rel="noreferrer">https://support.google.com/analytics/answer/1034823?hl=zh-Hans</a></li><li><a href="https://support.google.com/analytics/answer/1034380?hl=zh-Hans" target="_blank" rel="noreferrer">https://support.google.com/analytics/answer/1034380?hl=zh-Hans</a></li><li><a href="https://support.google.com/analytics/answer/1034832?hl=zh-Hans" target="_blank" rel="noreferrer">https://support.google.com/analytics/answer/1034832?hl=zh-Hans</a></li></ul><h1 id="_35-代理google-分析" tabindex="-1">35.代理google 分析 <a class="header-anchor" href="#_35-代理google-分析" aria-label="Permalink to &quot;35.代理google 分析&quot;">​</a></h1><p>nginx 配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 443 ssl spdy;</span></span>
<span class="line"><span style="color:#e1e4e8;">  server_name analytics.example.com;      </span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate /usr/local/tengine/certs/example.crt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ssl_certificate_key /usr/local/tengine/certs/example.key; </span></span>
<span class="line"><span style="color:#e1e4e8;">  location /ga_proxy {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header            X-real-ip $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">    rewrite ^/ga_proxy/(.*)$ /$1?$args&amp;uip=$remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://www.google-analytics.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    break;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  location /analytics.js {</span></span>
<span class="line"><span style="color:#e1e4e8;">    default_type text/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    subs_filter_types text/css text/xml text/javascript;</span></span>
<span class="line"><span style="color:#e1e4e8;">    subs_filter &#39;www.google-analytics.com&#39; &#39;analytics.example.com/ga_proxy&#39; g;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header            X-real-ip $remote_addr; </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header Referer https://www.google-analytics.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header Host www.google-analytics.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass https://www.google-analytics.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header Accept-Encoding &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 80;</span></span>
<span class="line"><span style="color:#24292e;">    listen 443 ssl spdy;</span></span>
<span class="line"><span style="color:#24292e;">  server_name analytics.example.com;      </span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate /usr/local/tengine/certs/example.crt;</span></span>
<span class="line"><span style="color:#24292e;">  ssl_certificate_key /usr/local/tengine/certs/example.key; </span></span>
<span class="line"><span style="color:#24292e;">  location /ga_proxy {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header            X-real-ip $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">    rewrite ^/ga_proxy/(.*)$ /$1?$args&amp;uip=$remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://www.google-analytics.com;</span></span>
<span class="line"><span style="color:#24292e;">    break;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  location /analytics.js {</span></span>
<span class="line"><span style="color:#24292e;">    default_type text/html;</span></span>
<span class="line"><span style="color:#24292e;">    subs_filter_types text/css text/xml text/javascript;</span></span>
<span class="line"><span style="color:#24292e;">    subs_filter &#39;www.google-analytics.com&#39; &#39;analytics.example.com/ga_proxy&#39; g;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header            X-real-ip $remote_addr; </span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header Referer https://www.google-analytics.com;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header Host www.google-analytics.com;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass https://www.google-analytics.com;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header Accept-Encoding &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>客戶端 JS 代碼</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">(function(i,s,o,g,r,a,m){i[&#39;GoogleAnalyticsObject&#39;]=r;i[r]=i[r]||function(){</span></span>
<span class="line"><span style="color:#e1e4e8;">(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),</span></span>
<span class="line"><span style="color:#e1e4e8;">m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)</span></span>
<span class="line"><span style="color:#e1e4e8;">})(window,document,&#39;script&#39;,&#39;//analytics.example.com/analytics.js&#39;,&#39;ga&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">ga(&#39;create&#39;, &#39;UA-EXAMPLE-0&#39;, &#39;auto&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">ga(&#39;send&#39;, &#39;pageview&#39;);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">(function(i,s,o,g,r,a,m){i[&#39;GoogleAnalyticsObject&#39;]=r;i[r]=i[r]||function(){</span></span>
<span class="line"><span style="color:#24292e;">(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),</span></span>
<span class="line"><span style="color:#24292e;">m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)</span></span>
<span class="line"><span style="color:#24292e;">})(window,document,&#39;script&#39;,&#39;//analytics.example.com/analytics.js&#39;,&#39;ga&#39;);</span></span>
<span class="line"><span style="color:#24292e;">ga(&#39;create&#39;, &#39;UA-EXAMPLE-0&#39;, &#39;auto&#39;);</span></span>
<span class="line"><span style="color:#24292e;">ga(&#39;send&#39;, &#39;pageview&#39;);</span></span></code></pre></div><h1 id="_36-alias" tabindex="-1">36.alias <a class="header-anchor" href="#_36-alias" aria-label="Permalink to &quot;36.alias&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location /files {</span></span>
<span class="line"><span style="color:#e1e4e8;">    alias /home/;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如上配置 建议 把/files改为/files/的格式，以/结尾,缺少斜杠可能导致目录穿越</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location /files {</span></span>
<span class="line"><span style="color:#24292e;">    alias /home/;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如上配置 建议 把/files改为/files/的格式，以/结尾,缺少斜杠可能导致目录穿越</span></span></code></pre></div><h1 id="_37-视频播放器" tabindex="-1">37.视频播放器 <a class="header-anchor" href="#_37-视频播放器" aria-label="Permalink to &quot;37.视频播放器&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">	listen 10091;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server_name  172.26.143.132;</span></span>
<span class="line"><span style="color:#e1e4e8;">	    index index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">            root   /data/apps/nginx/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">	</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	location ~* /videos/.*\\.mp4 {</span></span>
<span class="line"><span style="color:#e1e4e8;">        rewrite ^/videos/(.*)\\.(mp4) /$1.$2 break; #此处去掉ideos只保留后面的路径,不在二次匹配</span></span>
<span class="line"><span style="color:#e1e4e8;">        root /data/apps/nginx/html/videos/;</span></span>
<span class="line"><span style="color:#e1e4e8;">        mp4;</span></span>
<span class="line"><span style="color:#e1e4e8;">        mp4_buffer_size 1m;#处理mp4初始内存大小</span></span>
<span class="line"><span style="color:#e1e4e8;">        mp4_max_buffer_size 50m;#处理mp4最大内存大小</span></span>
<span class="line"><span style="color:#e1e4e8;">        limit_rate 150k; #限速</span></span>
<span class="line"><span style="color:#e1e4e8;">        limit_rate_after 20m;   #在20m后限速</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">	listen 10091;</span></span>
<span class="line"><span style="color:#24292e;">	server_name  172.26.143.132;</span></span>
<span class="line"><span style="color:#24292e;">	    index index.html;</span></span>
<span class="line"><span style="color:#24292e;">            root   /data/apps/nginx/html;</span></span>
<span class="line"><span style="color:#24292e;">	</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	location ~* /videos/.*\\.mp4 {</span></span>
<span class="line"><span style="color:#24292e;">        rewrite ^/videos/(.*)\\.(mp4) /$1.$2 break; #此处去掉ideos只保留后面的路径,不在二次匹配</span></span>
<span class="line"><span style="color:#24292e;">        root /data/apps/nginx/html/videos/;</span></span>
<span class="line"><span style="color:#24292e;">        mp4;</span></span>
<span class="line"><span style="color:#24292e;">        mp4_buffer_size 1m;#处理mp4初始内存大小</span></span>
<span class="line"><span style="color:#24292e;">        mp4_max_buffer_size 50m;#处理mp4最大内存大小</span></span>
<span class="line"><span style="color:#24292e;">        limit_rate 150k; #限速</span></span>
<span class="line"><span style="color:#24292e;">        limit_rate_after 20m;   #在20m后限速</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>创建index.html</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">	&lt;video  controls  width=&quot;960&quot; height=&quot;400&quot;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    	&lt;source src=&quot;http://8.142.27.86:10091/videos/1.mp4&quot;&gt;&lt;/source&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">	&lt;/video&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">	&lt;video  controls  width=&quot;960&quot; height=&quot;400&quot;&gt;</span></span>
<span class="line"><span style="color:#24292e;">    	&lt;source src=&quot;http://8.142.27.86:10091/videos/1.mp4&quot;&gt;&lt;/source&gt;</span></span>
<span class="line"><span style="color:#24292e;">	&lt;/video&gt;</span></span></code></pre></div><h1 id="_38-自定义错误页面" tabindex="-1">38.自定义错误页面 <a class="header-anchor" href="#_38-自定义错误页面" aria-label="Permalink to &quot;38.自定义错误页面&quot;">​</a></h1><p>error_page 503 /503.html</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vim 503.html</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;CTYPE html&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  &lt;html&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;head&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;meta charset=&quot;utf-8&quot;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;title&gt;亚瑟&lt;/title&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;/head&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;body&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      &lt;h1&gt;亚瑟的大宝剑提示您：限流了&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;/body&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  &lt;/html&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vim 503.html</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&lt;CTYPE html&gt;</span></span>
<span class="line"><span style="color:#24292e;">  &lt;html&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;head&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;meta charset=&quot;utf-8&quot;&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;title&gt;亚瑟&lt;/title&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;/head&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;body&gt;</span></span>
<span class="line"><span style="color:#24292e;">      &lt;h1&gt;亚瑟的大宝剑提示您：限流了&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#24292e;">    &lt;/body&gt;</span></span>
<span class="line"><span style="color:#24292e;">  &lt;/html&gt;</span></span></code></pre></div><h1 id="_39-pdf预览" tabindex="-1">39.pdf预览 <a class="header-anchor" href="#_39-pdf预览" aria-label="Permalink to &quot;39.pdf预览&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ^~ /download/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">        alias /data/wwwroot/share/;</span></span>
<span class="line"><span style="color:#e1e4e8;">		</span></span>
<span class="line"><span style="color:#e1e4e8;">	if ($request_filename ~* ^.*?\\.(html|doc|pdf|zip|docx)$) {</span></span>
<span class="line"><span style="color:#e1e4e8;">		add_header Content-Disposition: &#39;p_w_upload;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">            sendfile on;   # 开启高效文件传输模式</span></span>
<span class="line"><span style="color:#e1e4e8;">            autoindex on;  # 开启目录文件列表</span></span>
<span class="line"><span style="color:#e1e4e8;">            autoindex_exact_size on;  # 显示出文件的确切大小，单位是bytes</span></span>
<span class="line"><span style="color:#e1e4e8;">            autoindex_localtime on;  # 显示的文件时间为文件的服务器时间</span></span>
<span class="line"><span style="color:#e1e4e8;">            charset utf-8,gbk;  # 避免中文乱码</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ^~ /download/ {</span></span>
<span class="line"><span style="color:#24292e;">        alias /data/wwwroot/share/;</span></span>
<span class="line"><span style="color:#24292e;">		</span></span>
<span class="line"><span style="color:#24292e;">	if ($request_filename ~* ^.*?\\.(html|doc|pdf|zip|docx)$) {</span></span>
<span class="line"><span style="color:#24292e;">		add_header Content-Disposition: &#39;p_w_upload;&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">            sendfile on;   # 开启高效文件传输模式</span></span>
<span class="line"><span style="color:#24292e;">            autoindex on;  # 开启目录文件列表</span></span>
<span class="line"><span style="color:#24292e;">            autoindex_exact_size on;  # 显示出文件的确切大小，单位是bytes</span></span>
<span class="line"><span style="color:#24292e;">            autoindex_localtime on;  # 显示的文件时间为文件的服务器时间</span></span>
<span class="line"><span style="color:#24292e;">            charset utf-8,gbk;  # 避免中文乱码</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span></code></pre></div><h1 id="_40-自定义header" tabindex="-1">40.自定义header <a class="header-anchor" href="#_40-自定义header" aria-label="Permalink to &quot;40.自定义header&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream backend {</span></span>
<span class="line"><span style="color:#e1e4e8;">server 172.29.88.226:8080 weight=1;</span></span>
<span class="line"><span style="color:#e1e4e8;">server 172.29.88.227:8080 weight=1;</span></span>
<span class="line"><span style="color:#e1e4e8;">sticky;}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##Custom Header##</span></span>
<span class="line"><span style="color:#e1e4e8;">  map $upstream_addr $server_x_tag{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;172.29.88.226:8080&#39; &#39;NOD1&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">     &#39;172.29.88.227:8080 &#39; &#39;NOD2&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">  server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen       80 default;</span></span>
<span class="line"><span style="color:#e1e4e8;">     ....</span></span>
<span class="line"><span style="color:#e1e4e8;">     ....</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://backend;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ....</span></span>
<span class="line"><span style="color:#e1e4e8;">        ....</span></span>
<span class="line"><span style="color:#e1e4e8;">        ....</span></span>
<span class="line"><span style="color:#e1e4e8;">       add_header X-Upstream $server_x_tag;</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream backend {</span></span>
<span class="line"><span style="color:#24292e;">server 172.29.88.226:8080 weight=1;</span></span>
<span class="line"><span style="color:#24292e;">server 172.29.88.227:8080 weight=1;</span></span>
<span class="line"><span style="color:#24292e;">sticky;}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##Custom Header##</span></span>
<span class="line"><span style="color:#24292e;">  map $upstream_addr $server_x_tag{</span></span>
<span class="line"><span style="color:#24292e;">    &#39;172.29.88.226:8080&#39; &#39;NOD1&#39;;</span></span>
<span class="line"><span style="color:#24292e;">     &#39;172.29.88.227:8080 &#39; &#39;NOD2&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">  server {</span></span>
<span class="line"><span style="color:#24292e;">    listen       80 default;</span></span>
<span class="line"><span style="color:#24292e;">     ....</span></span>
<span class="line"><span style="color:#24292e;">     ....</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://backend;</span></span>
<span class="line"><span style="color:#24292e;">        ....</span></span>
<span class="line"><span style="color:#24292e;">        ....</span></span>
<span class="line"><span style="color:#24292e;">        ....</span></span>
<span class="line"><span style="color:#24292e;">       add_header X-Upstream $server_x_tag;</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><h1 id="_41-https问题" tabindex="-1">41.https问题 <a class="header-anchor" href="#_41-https问题" aria-label="Permalink to &quot;41.https问题&quot;">​</a></h1><p>Nginx强制配置301永久跳转后，APP发起POST请求会出现405错误，这是因为301跳转的操作让浏览器把POST请求变成了GET请求</p><ul><li>301跳转示例：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">return 301 https://www.xxx.com$request_uri;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">return 301 https://www.xxx.com$request_uri;</span></span></code></pre></div><ul><li>解决办法：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">return 307 https://www.xxx.com$request_uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">或</span></span>
<span class="line"><span style="color:#e1e4e8;">return 308 https://www.xxx.com$request_uri;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">return 307 https://www.xxx.com$request_uri;</span></span>
<span class="line"><span style="color:#24292e;">或</span></span>
<span class="line"><span style="color:#24292e;">return 308 https://www.xxx.com$request_uri;</span></span></code></pre></div><ul><li><p>301 Moved Permanently</p><p>被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一</p></li><li><p>307 Temporary Redirect</p><p>请求的资源现在临时从不同的URI 响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求</p></li><li><p>308 永久重定向</p><p>308状态代码[永久重定向],类似于301(永久移动)，但不允许将请求方法从POST更改为GET.</p></li></ul><h5 id="_301和308的区别" tabindex="-1">301和308的区别 <a class="header-anchor" href="#_301和308的区别" aria-label="Permalink to &quot;301和308的区别&quot;">​</a></h5><p>在 HTTP 协议中， 308 Permanent Redirect（永久重定向）是表示重定向的响应状态码，说明请求的资源已经被永久的移动到了由 Location 首部指定的 URL 上。在重定向过程中，请求方法和消息主体不会发生改变!</p><p>然而在 301 状态码的情况下，请求方法有时候会被客户端错误地修改为 GET 方法</p><h1 id="_42-403自定义页面" tabindex="-1">42.403自定义页面 <a class="header-anchor" href="#_42-403自定义页面" aria-label="Permalink to &quot;42.403自定义页面&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">403</span><span style="color:#9ECBFF;">.html</span></span>
<span class="line"><span style="color:#B392F0;">Page</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">放到网站主页面目录下</span></span>
<span class="line"><span style="color:#B392F0;">--------------------------------------</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">allow</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.1.0/24</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">deny</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">error_page</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">403</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/403.html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">/403.html</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">allow</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">     }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/nginx/conf/403.conf</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#cat 403.conf</span></span>
<span class="line"><span style="color:#B392F0;">error_page</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">404</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">403</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/403.html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">/403.html</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">allow</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">403</span><span style="color:#032F62;">.html</span></span>
<span class="line"><span style="color:#6F42C1;">Page</span><span style="color:#24292E;"> </span><span style="color:#032F62;">error</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">放到网站主页面目录下</span></span>
<span class="line"><span style="color:#6F42C1;">--------------------------------------</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">allow</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.1.0/24</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">deny</span><span style="color:#24292E;"> </span><span style="color:#032F62;">all</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">error_page</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">403</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/403.html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;">  </span><span style="color:#032F62;">/403.html</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">allow</span><span style="color:#24292E;">   </span><span style="color:#032F62;">all</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">     }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">include</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/nginx/conf/403.conf</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#cat 403.conf</span></span>
<span class="line"><span style="color:#6F42C1;">error_page</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">404</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">403</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/403.html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;">  </span><span style="color:#032F62;">/403.html</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">allow</span><span style="color:#24292E;">   </span><span style="color:#032F62;">all</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_43-host、-http-host和-proxy-host区别" tabindex="-1">43.$host、$http_host和$proxy_host区别 <a class="header-anchor" href="#_43-host、-http-host和-proxy-host区别" aria-label="Permalink to &quot;43.$host、$http_host和$proxy_host区别&quot;">​</a></h1><table><thead><tr><th>变量</th><th>是否显示端口</th><th>值</th></tr></thead><tbody><tr><td>$host</td><td>不显示端口</td><td>浏览器请求的ip，不显示端口</td></tr><tr><td>$http_host</td><td>端口存在则显示</td><td>浏览器请求的ip和端口号</td></tr><tr><td>$proxy_host</td><td>默认80端口不显示，其它显示</td><td>被代理服务的ip和端口号</td></tr></tbody></table><h1 id="_44-不缓存动态数据" tabindex="-1">44. 不缓存动态数据 <a class="header-anchor" href="#_44-不缓存动态数据" aria-label="Permalink to &quot;44. 不缓存动态数据&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//配置PHP不缓存</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(php|php5)?$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header Cache-Control no-cache;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">//配置缓存2分钟</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~* ^.+\\.(js|css)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">        expires 120s;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//配置PHP不缓存</span></span>
<span class="line"><span style="color:#24292e;">location ~ .*\\.(php|php5)?$ {</span></span>
<span class="line"><span style="color:#24292e;">        add_header Cache-Control no-cache;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">//配置缓存2分钟</span></span>
<span class="line"><span style="color:#24292e;">location ~* ^.+\\.(js|css)$ {</span></span>
<span class="line"><span style="color:#24292e;">        expires 120s;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><h1 id="_45-获取header" tabindex="-1">45. 获取header <a class="header-anchor" href="#_45-获取header" aria-label="Permalink to &quot;45. 获取header&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">worker_processes</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">error_log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">logs/error.log</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">events</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">worker_connections</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1024</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">log_format</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">log_req_resp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;$remote_addr - $remote_user [$time_local] &#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&#39;&quot;$request&quot; $status $body_bytes_sent &#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&#39;&quot;$http_referer&quot; &quot;$http_user_agent&quot; $request_time req_body:&quot;$request_body&quot;&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&#39; resp_body:&quot;$resp_body&quot; resp_header:&quot;$resp_header&quot;&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8082</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">access_log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">logs/access.log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">log_req_resp</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> $resp_header </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">header_filter_by_lua</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">            local h = ngx.resp.get_headers()</span></span>
<span class="line"><span style="color:#9ECBFF;">            for k, v in pairs(h) do</span></span>
<span class="line"><span style="color:#9ECBFF;">            ngx.var.resp_header=ngx.var.resp_header..k..&quot;: &quot;..v</span></span>
<span class="line"><span style="color:#9ECBFF;">            end</span></span>
<span class="line"><span style="color:#9ECBFF;">        &#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">lua_need_request_body</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> $resp_body </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">body_filter_by_lua</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">            local resp_body = string.sub(ngx.arg[1], 1, 1000)</span></span>
<span class="line"><span style="color:#9ECBFF;">            ngx.ctx.buffered = (ngx.ctx.buffered or &quot;&quot;) .. resp_body</span></span>
<span class="line"><span style="color:#9ECBFF;">            if ngx.arg[2] then</span></span>
<span class="line"><span style="color:#9ECBFF;">                ngx.var.resp_body = ngx.ctx.buffered</span></span>
<span class="line"><span style="color:#9ECBFF;">            end</span></span>
<span class="line"><span style="color:#9ECBFF;">        &#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Hello World!&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">worker_processes</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">error_log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">logs/error.log</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">events</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">worker_connections</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1024</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">http</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">log_format</span><span style="color:#24292E;"> </span><span style="color:#032F62;">log_req_resp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;$remote_addr - $remote_user [$time_local] &#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&#39;&quot;$request&quot; $status $body_bytes_sent &#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&#39;&quot;$http_referer&quot; &quot;$http_user_agent&quot; $request_time req_body:&quot;$request_body&quot;&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&#39; resp_body:&quot;$resp_body&quot; resp_header:&quot;$resp_header&quot;&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8082</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">access_log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">logs/access.log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">log_req_resp</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $resp_header </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">header_filter_by_lua</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;</span></span>
<span class="line"><span style="color:#032F62;">            local h = ngx.resp.get_headers()</span></span>
<span class="line"><span style="color:#032F62;">            for k, v in pairs(h) do</span></span>
<span class="line"><span style="color:#032F62;">            ngx.var.resp_header=ngx.var.resp_header..k..&quot;: &quot;..v</span></span>
<span class="line"><span style="color:#032F62;">            end</span></span>
<span class="line"><span style="color:#032F62;">        &#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">lua_need_request_body</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $resp_body </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">body_filter_by_lua</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;</span></span>
<span class="line"><span style="color:#032F62;">            local resp_body = string.sub(ngx.arg[1], 1, 1000)</span></span>
<span class="line"><span style="color:#032F62;">            ngx.ctx.buffered = (ngx.ctx.buffered or &quot;&quot;) .. resp_body</span></span>
<span class="line"><span style="color:#032F62;">            if ngx.arg[2] then</span></span>
<span class="line"><span style="color:#032F62;">                ngx.var.resp_body = ngx.ctx.buffered</span></span>
<span class="line"><span style="color:#032F62;">            end</span></span>
<span class="line"><span style="color:#032F62;">        &#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Hello World!&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_46-配置header" tabindex="-1">46. 配置header <a class="header-anchor" href="#_46-配置header" aria-label="Permalink to &quot;46. 配置header&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 防止网站被嵌入恶意网页中，避免点击劫持</span></span>
<span class="line"><span style="color:#B392F0;">add_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Frame-Options</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;SAMEORIGIN&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 启用浏览器XSS防护功能，并在检测到攻击时，停止渲染页面</span></span>
<span class="line"><span style="color:#B392F0;">add_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-XSS-Protection</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;1; mode=block&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 禁止浏览器猜测（嗅探）资源的MIME类型，防止资源类型混淆攻击</span></span>
<span class="line"><span style="color:#B392F0;">add_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Content-Type-Options</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;nosniff&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 控制引用地址信息的传递，增强隐私保护</span></span>
<span class="line"><span style="color:#B392F0;">add_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Referrer-Policy</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;strict-origin-origin-when-cross-origin&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 内容安全策略，控制资源加载来源，防止XSS等攻击</span></span>
<span class="line"><span style="color:#6A737D;"># default-src &#39;self&#39;: 只允许加载同源资源</span></span>
<span class="line"><span style="color:#6A737D;"># http: https:: 允许通过HTTP和HTTPS加载资源</span></span>
<span class="line"><span style="color:#6A737D;"># data:: 允许data:URI的资源（如base64编码的图片）</span></span>
<span class="line"><span style="color:#6A737D;"># blob:: 允许blob:URI的资源（如视频流）</span></span>
<span class="line"><span style="color:#6A737D;"># &#39;unsafe-inline&#39;: 允许内联脚本和样式（根据需要配置）</span></span>
<span class="line"><span style="color:#B392F0;">add_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Content-Security-Policy</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;default-src &#39;self&#39; http: https: data: blob: &#39;unsafe-inline&#39;&quot;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 防止网站被嵌入恶意网页中，避免点击劫持</span></span>
<span class="line"><span style="color:#6F42C1;">add_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Frame-Options</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;SAMEORIGIN&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 启用浏览器XSS防护功能，并在检测到攻击时，停止渲染页面</span></span>
<span class="line"><span style="color:#6F42C1;">add_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-XSS-Protection</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;1; mode=block&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 禁止浏览器猜测（嗅探）资源的MIME类型，防止资源类型混淆攻击</span></span>
<span class="line"><span style="color:#6F42C1;">add_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Content-Type-Options</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;nosniff&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 控制引用地址信息的传递，增强隐私保护</span></span>
<span class="line"><span style="color:#6F42C1;">add_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Referrer-Policy</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;strict-origin-origin-when-cross-origin&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 内容安全策略，控制资源加载来源，防止XSS等攻击</span></span>
<span class="line"><span style="color:#6A737D;"># default-src &#39;self&#39;: 只允许加载同源资源</span></span>
<span class="line"><span style="color:#6A737D;"># http: https:: 允许通过HTTP和HTTPS加载资源</span></span>
<span class="line"><span style="color:#6A737D;"># data:: 允许data:URI的资源（如base64编码的图片）</span></span>
<span class="line"><span style="color:#6A737D;"># blob:: 允许blob:URI的资源（如视频流）</span></span>
<span class="line"><span style="color:#6A737D;"># &#39;unsafe-inline&#39;: 允许内联脚本和样式（根据需要配置）</span></span>
<span class="line"><span style="color:#6F42C1;">add_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Content-Security-Policy</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;default-src &#39;self&#39; http: https: data: blob: &#39;unsafe-inline&#39;&quot;</span><span style="color:#24292E;">;</span></span></code></pre></div><h1 id="_47-502" tabindex="-1">47. 502 <a class="header-anchor" href="#_47-502" aria-label="Permalink to &quot;47. 502&quot;">​</a></h1><p>现象</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream prematurely closed connection while reading response header from upstream</span></span>
<span class="line"><span style="color:#e1e4e8;">从上游读取响应头时，上游提前关闭连接</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream prematurely closed connection while reading response header from upstream</span></span>
<span class="line"><span style="color:#24292e;">从上游读取响应头时，上游提前关闭连接</span></span></code></pre></div><p>解决：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#表示与后端服务器连接的超时时间，即发起握手等候响应的超时时间。一般建议不要超过75s，默认时间60s。</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">proxy_connect_timeout</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">90</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#表示后端服务器的数据回传时间，即在规定时间之内后端服务器必须传完所有的数据，否则，Nginx将断开这个连接。默认时间60s。 </span></span>
<span class="line"><span style="color:#B392F0;">proxy_send_timeout</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">90</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#6A737D;">#设置Nginx从代理的后端服务器获取信息的时间，表示连接建立成功后，Nginx等待后端服务器的响应时间，其实是Nginx已经进入后端的排队之中等候处理的时间。默认时间60s。 </span></span>
<span class="line"><span style="color:#B392F0;">proxy_read_timeout</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">90</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置缓冲区大小，默认该缓冲区大小等于指令proxy_buffers设置的大小。</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">proxy_buffer_size</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">4</span><span style="color:#9ECBFF;">k</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#6A737D;">#设置缓冲区的数量和大小。Nginx从代理的后端服务器获取的响应信息，会放置到缓冲区。 </span></span>
<span class="line"><span style="color:#B392F0;">proxy_buffers</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">32</span><span style="color:#9ECBFF;">k</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#6A737D;">#用于设置系统很忙时可以使用的 proxy_buffers 大小， 官方推荐的大小为 proxy_buffers*2。 </span></span>
<span class="line"><span style="color:#B392F0;">proxy_busy_buffers_size</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">64</span><span style="color:#9ECBFF;">k</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">proxy_http_version</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.1</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Connection</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">Nginx默认使用HTTP1.0从后端获取响应返还给客户端，但是HTTP/1.0不支持keepalive，因此需要配置proxy_http_version</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.1</span><span style="color:#9ECBFF;">，proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Connection默认close：通知后端服务器主动关闭连接，这样会导致任何一个客户端的请求都在后端服务器上产生了一个TIME-WAIT状态的连接。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#表示与后端服务器连接的超时时间，即发起握手等候响应的超时时间。一般建议不要超过75s，默认时间60s。</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">proxy_connect_timeout</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">90</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">#表示后端服务器的数据回传时间，即在规定时间之内后端服务器必须传完所有的数据，否则，Nginx将断开这个连接。默认时间60s。 </span></span>
<span class="line"><span style="color:#6F42C1;">proxy_send_timeout</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">90</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#6A737D;">#设置Nginx从代理的后端服务器获取信息的时间，表示连接建立成功后，Nginx等待后端服务器的响应时间，其实是Nginx已经进入后端的排队之中等候处理的时间。默认时间60s。 </span></span>
<span class="line"><span style="color:#6F42C1;">proxy_read_timeout</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">90</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置缓冲区大小，默认该缓冲区大小等于指令proxy_buffers设置的大小。</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">proxy_buffer_size</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">4</span><span style="color:#032F62;">k</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#6A737D;">#设置缓冲区的数量和大小。Nginx从代理的后端服务器获取的响应信息，会放置到缓冲区。 </span></span>
<span class="line"><span style="color:#6F42C1;">proxy_buffers</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">32</span><span style="color:#032F62;">k</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#6A737D;">#用于设置系统很忙时可以使用的 proxy_buffers 大小， 官方推荐的大小为 proxy_buffers*2。 </span></span>
<span class="line"><span style="color:#6F42C1;">proxy_busy_buffers_size</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">64</span><span style="color:#032F62;">k</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">proxy_http_version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.1</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Connection</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">Nginx默认使用HTTP1.0从后端获取响应返还给客户端，但是HTTP/1.0不支持keepalive，因此需要配置proxy_http_version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.1</span><span style="color:#032F62;">，proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Connection默认close：通知后端服务器主动关闭连接，这样会导致任何一个客户端的请求都在后端服务器上产生了一个TIME-WAIT状态的连接。</span></span></code></pre></div>`,277),c=[t];function r(i,y,d,h,u,E){return n(),a("div",null,c)}const m=s(o,[["render",r]]);export{_ as __pageData,m as default};
