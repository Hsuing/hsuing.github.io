import{_ as e,o as s,c as a,R as n}from"./chunks/framework.PZ77rLUR.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/modules/geoip.md","filePath":"guide/Linux/web/nginx/modules/geoip.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/modules/geoip.md"},o=n(`<p>Nginx GeoIP 用户访问城市地区位置信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1.所需两个组件库模块：</span></span>
<span class="line"><span style="color:#e1e4e8;">Nginx需要添加ngx_http_geoip_module模块</span></span>
<span class="line"><span style="color:#e1e4e8;">安装GeoIP library</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1.所需两个组件库模块：</span></span>
<span class="line"><span style="color:#24292e;">Nginx需要添加ngx_http_geoip_module模块</span></span>
<span class="line"><span style="color:#24292e;">安装GeoIP library</span></span></code></pre></div><ul><li>模块添加方法</li></ul><p>--with-http_geoip_module</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install GeoIP GeoIP-update GeoIP-devel -y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install GeoIP GeoIP-update GeoIP-devel -y</span></span></code></pre></div><h2 id="_3-nginx安装" tabindex="-1">3.nginx安装 <a class="header-anchor" href="#_3-nginx安装" aria-label="Permalink to &quot;3.nginx安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">--with-http_realip_module</span></span>
<span class="line"><span style="color:#e1e4e8;">--with-http_geoip_module</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">--with-http_realip_module</span></span>
<span class="line"><span style="color:#24292e;">--with-http_geoip_module</span></span></code></pre></div><h2 id="_4-测试geoip" tabindex="-1">4.测试geoip <a class="header-anchor" href="#_4-测试geoip" aria-label="Permalink to &quot;4.测试geoip&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">geoiplookup -f /usr/share/GeoIP/GeoLiteCity.dat 202.96.134.133　　　　#获取不到城市</span></span>
<span class="line"><span style="color:#e1e4e8;">GeoIP City Edition, Rev 1: CN, N/A, N/A, N/A, N/A, 34.772499, 113.726601, 0, 0</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">wget http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz #重新下载新的城市库</span></span>
<span class="line"><span style="color:#e1e4e8;">cp GeoLiteCity.dat GeoLiteCity.dat.bak</span></span>
<span class="line"><span style="color:#e1e4e8;">gunzip GeoLiteCity.dat</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">geoiplookup -f /usr/share/GeoIP/GeoLiteCity.dat 202.96.134.133　　#正常获取城市</span></span>
<span class="line"><span style="color:#e1e4e8;">GeoIP City Edition, Rev 1: CN, 30, Guangdong, Guangzhou, N/A, 23.116699, 113.250000, 0, 0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">geoiplookup -f /usr/share/GeoIP/GeoLiteCity.dat 202.96.134.133　　　　#获取不到城市</span></span>
<span class="line"><span style="color:#24292e;">GeoIP City Edition, Rev 1: CN, N/A, N/A, N/A, N/A, 34.772499, 113.726601, 0, 0</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">wget http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz #重新下载新的城市库</span></span>
<span class="line"><span style="color:#24292e;">cp GeoLiteCity.dat GeoLiteCity.dat.bak</span></span>
<span class="line"><span style="color:#24292e;">gunzip GeoLiteCity.dat</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">geoiplookup -f /usr/share/GeoIP/GeoLiteCity.dat 202.96.134.133　　#正常获取城市</span></span>
<span class="line"><span style="color:#24292e;">GeoIP City Edition, Rev 1: CN, 30, Guangdong, Guangzhou, N/A, 23.116699, 113.250000, 0, 0</span></span></code></pre></div><h2 id="_5-nginx配置测试" tabindex="-1">5.Nginx配置测试 <a class="header-anchor" href="#_5-nginx配置测试" aria-label="Permalink to &quot;5.Nginx配置测试&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">    ...</span></span>
<span class="line"><span style="color:#e1e4e8;">    geoip_country /usr/local/nginx/conf/GeoIP.dat;</span></span>
<span class="line"><span style="color:#e1e4e8;">    geoip_city /usr/local/nginx/conf/GeoLiteCity.dat;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ...</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">    ...</span></span>
<span class="line"><span style="color:#24292e;">    geoip_country /usr/local/nginx/conf/GeoIP.dat;</span></span>
<span class="line"><span style="color:#24292e;">    geoip_city /usr/local/nginx/conf/GeoLiteCity.dat;</span></span>
<span class="line"><span style="color:#24292e;">    ...</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><h2 id="_6-添加个测试日志格式" tabindex="-1">6.添加个测试日志格式 <a class="header-anchor" href="#_6-添加个测试日志格式" aria-label="Permalink to &quot;6.添加个测试日志格式&quot;">​</a></h2><p>增加（$geoip_country_name $geoip_region $geoip_city）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">log_format access &#39;$remote_addr – $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;&quot;$http_user_agent&quot; $http_x_forwarded_for&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;$geoip_country_name $geoip_region $geoip_city&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">log_format access &#39;$remote_addr – $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#24292e;">&#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#24292e;">&#39;&quot;$http_user_agent&quot; $http_x_forwarded_for&#39;</span></span>
<span class="line"><span style="color:#24292e;">&#39;$geoip_country_name $geoip_region $geoip_city&#39;;</span></span></code></pre></div>`,14),l=[o];function t(i,c,r,d,g,u){return s(),a("div",null,l)}const _=e(p,[["render",t]]);export{h as __pageData,_ as default};
