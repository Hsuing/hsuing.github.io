import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/灰度/Geoip城市的灰度发布.md","filePath":"guide/Linux/web/nginx/灰度/Geoip城市的灰度发布.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/灰度/Geoip城市的灰度发布.md"},l=e(`<h2 id="_1-安装epel源" tabindex="-1">1.安装epel源 <a class="header-anchor" href="#_1-安装epel源" aria-label="Permalink to &quot;1.安装epel源&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget https://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;">rpm -ivh epel-release-6-8.noarch.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget https://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm</span></span>
<span class="line"><span style="color:#24292e;">rpm -ivh epel-release-6-8.noarch.rpm</span></span></code></pre></div><h2 id="_2-首先安装-maxmind-的-geoip-库" tabindex="-1">2.首先安装 MaxMind 的 GeoIP 库 <a class="header-anchor" href="#_2-首先安装-maxmind-的-geoip-库" aria-label="Permalink to &quot;2.首先安装 MaxMind 的 GeoIP 库&quot;">​</a></h2><blockquote><p><a href="http://www.maxmind.com" target="_blank" rel="noreferrer">http://www.maxmind.com</a></p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install GeoIP GeoIP-update GeoIP-devel -y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install GeoIP GeoIP-update GeoIP-devel -y</span></span></code></pre></div><h2 id="_3-nginx安装" tabindex="-1">3.nginx安装 <a class="header-anchor" href="#_3-nginx安装" aria-label="Permalink to &quot;3.nginx安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">--with-http_realip_module</span></span>
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
<span class="line"><span style="color:#24292e;">GeoIP City Edition, Rev 1: CN, 30, Guangdong, Guangzhou, N/A, 23.116699, 113.250000, 0, 0</span></span></code></pre></div><h2 id="_6-配置www-conf" tabindex="-1">6.配置www.conf <a class="header-anchor" href="#_6-配置www-conf" aria-label="Permalink to &quot;6.配置www.conf&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 加载ip库</span></span>
<span class="line"><span style="color:#e1e4e8;">geoip_country  /usr/share/GeoIP/GeoLiteCountry.dat;</span></span>
<span class="line"><span style="color:#e1e4e8;">geoip_city     /usr/share/GeoIP/GeoLiteCity.dat;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"># 地址库解析,国家代码2位，国家代码3位，国家名称</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_param GEOIP_CITY_COUNTRY_CODE $geoip_city_country_code;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_param GEOIP_CITY_COUNTRY_CODE3 $geoip_city_country_code3;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_param GEOIP_CITY_COUNTRY_NAME $geoip_city_country_name;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"># 所在地区，所在城市</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_param GEOIP_REGION $geoip_region;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_param GEOIP_CITY $geoip_city;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"># 邮政编码，所在洲，维度，经度</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_param GEOIP_POSTAL_CODE $geoip_postal_code;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_param GEOIP_CITY_CONTINENT_CODE $geoip_city_continent_code;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_param GEOIP_LATITUDE $geoip_latitude;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_param GEOIP_LONGITUDE $geoip_longitude;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"># 灰度版本</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream huiduserver {</span></span>
<span class="line"><span style="color:#e1e4e8;">        server 183.2.191.195:8202 weight=1;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"># 稳定版本</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        server 183.2.191.195:8201 weight=1;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen       80;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server_name  localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">        # 默认</span></span>
<span class="line"><span style="color:#e1e4e8;">        location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_redirect off;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">                # 灰度版本</span></span>
<span class="line"><span style="color:#e1e4e8;">                if ($geoip_city ~* Guangdong) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        proxy_pass http://huiduserver;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                if ($geoip_region = 30) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        proxy_pass http://huiduserver;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">                # 稳定版本</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_pass http://server;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 加载ip库</span></span>
<span class="line"><span style="color:#24292e;">geoip_country  /usr/share/GeoIP/GeoLiteCountry.dat;</span></span>
<span class="line"><span style="color:#24292e;">geoip_city     /usr/share/GeoIP/GeoLiteCity.dat;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"># 地址库解析,国家代码2位，国家代码3位，国家名称</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_param GEOIP_CITY_COUNTRY_CODE $geoip_city_country_code;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_param GEOIP_CITY_COUNTRY_CODE3 $geoip_city_country_code3;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_param GEOIP_CITY_COUNTRY_NAME $geoip_city_country_name;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"># 所在地区，所在城市</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_param GEOIP_REGION $geoip_region;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_param GEOIP_CITY $geoip_city;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"># 邮政编码，所在洲，维度，经度</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_param GEOIP_POSTAL_CODE $geoip_postal_code;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_param GEOIP_CITY_CONTINENT_CODE $geoip_city_continent_code;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_param GEOIP_LATITUDE $geoip_latitude;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_param GEOIP_LONGITUDE $geoip_longitude;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"># 灰度版本</span></span>
<span class="line"><span style="color:#24292e;">upstream huiduserver {</span></span>
<span class="line"><span style="color:#24292e;">        server 183.2.191.195:8202 weight=1;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"># 稳定版本</span></span>
<span class="line"><span style="color:#24292e;">upstream server {</span></span>
<span class="line"><span style="color:#24292e;">        server 183.2.191.195:8201 weight=1;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">        listen       80;</span></span>
<span class="line"><span style="color:#24292e;">        server_name  localhost;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">        # 默认</span></span>
<span class="line"><span style="color:#24292e;">        location / {</span></span>
<span class="line"><span style="color:#24292e;">                proxy_redirect off;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">                # 灰度版本</span></span>
<span class="line"><span style="color:#24292e;">                if ($geoip_city ~* Guangdong) {</span></span>
<span class="line"><span style="color:#24292e;">                        proxy_pass http://huiduserver;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                if ($geoip_region = 30) {</span></span>
<span class="line"><span style="color:#24292e;">                        proxy_pass http://huiduserver;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">                # 稳定版本</span></span>
<span class="line"><span style="color:#24292e;">                proxy_pass http://server;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span></code></pre></div><h2 id="_7-指定ip灰度发布" tabindex="-1">7.指定ip灰度发布 <a class="header-anchor" href="#_7-指定ip灰度发布" aria-label="Permalink to &quot;7.指定ip灰度发布&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_redirect off;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">if ($remote_addr ~ &quot;101.95.155.134&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">　　proxy_pass http://huiduserver;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">　　proxy_pass http://cgiservers;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">proxy_redirect off;</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">if ($remote_addr ~ &quot;101.95.155.134&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">　　proxy_pass http://huiduserver;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">　　proxy_pass http://cgiservers;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_8-指定us和cn国家返回404" tabindex="-1">8.指定US和CN国家返回404 <a class="header-anchor" href="#_8-指定us和cn国家返回404" aria-label="Permalink to &quot;8.指定US和CN国家返回404&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server </span></span>
<span class="line"><span style="color:#e1e4e8;">      if ($geoip_country_code ~* (US|CN)) { </span></span>
<span class="line"><span style="color:#e1e4e8;">      #return 404; </span></span>
<span class="line"><span style="color:#e1e4e8;">     }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server </span></span>
<span class="line"><span style="color:#24292e;">      if ($geoip_country_code ~* (US|CN)) { </span></span>
<span class="line"><span style="color:#24292e;">      #return 404; </span></span>
<span class="line"><span style="color:#24292e;">     }</span></span></code></pre></div><h2 id="_9-参数说明" tabindex="-1">9. 参数说明 <a class="header-anchor" href="#_9-参数说明" aria-label="Permalink to &quot;9. 参数说明&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$geoip_country_code 　　    #国家代码2位，如CN </span></span>
<span class="line"><span style="color:#e1e4e8;">$geoip_country_code3 　　   #国家代码3位，如CHN </span></span>
<span class="line"><span style="color:#e1e4e8;">$geoip_country_name 　　    #国家完整名称，如China </span></span>
<span class="line"><span style="color:#e1e4e8;">$geoip_region 　　　　　　   #所在地区 </span></span>
<span class="line"><span style="color:#e1e4e8;">$geoip_city 　　　　　　     #所在城市，如BeiJing </span></span>
<span class="line"><span style="color:#e1e4e8;">$geoip_postal_code 　　　　　#邮政编码 </span></span>
<span class="line"><span style="color:#e1e4e8;">$geoip_city_continent_code #所在洲，如AS </span></span>
<span class="line"><span style="color:#e1e4e8;">$geoip_latitude 　　　　　　 #纬度 </span></span>
<span class="line"><span style="color:#e1e4e8;">$geoip_longitude 　　　　   #经度</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$geoip_country_code 　　    #国家代码2位，如CN </span></span>
<span class="line"><span style="color:#24292e;">$geoip_country_code3 　　   #国家代码3位，如CHN </span></span>
<span class="line"><span style="color:#24292e;">$geoip_country_name 　　    #国家完整名称，如China </span></span>
<span class="line"><span style="color:#24292e;">$geoip_region 　　　　　　   #所在地区 </span></span>
<span class="line"><span style="color:#24292e;">$geoip_city 　　　　　　     #所在城市，如BeiJing </span></span>
<span class="line"><span style="color:#24292e;">$geoip_postal_code 　　　　　#邮政编码 </span></span>
<span class="line"><span style="color:#24292e;">$geoip_city_continent_code #所在洲，如AS </span></span>
<span class="line"><span style="color:#24292e;">$geoip_latitude 　　　　　　 #纬度 </span></span>
<span class="line"><span style="color:#24292e;">$geoip_longitude 　　　　   #经度</span></span></code></pre></div><h2 id="_10-相应的省份代码" tabindex="-1">10.相应的省份代码 <a class="header-anchor" href="#_10-相应的省份代码" aria-label="Permalink to &quot;10.相应的省份代码&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CN,01,&quot;Anhui&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,02,”Zhejiang”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,03,”Jiangxi”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,04,”Jiangsu”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,05,”Jilin”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,06,”Qinghai”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,07,”Fujian”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,08,”Heilongjiang”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,09,”Henan”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,10,”Hebei”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,11,”Hunan”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,12,”Hubei”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,13,”Xinjiang”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,14,”Xizang”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,15,”Gansu”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,16,”Guangxi”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,18,”Guizhou”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,19,”Liaoning”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,20,”Nei Mongol”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,21,”Ningxia”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,22,”Beijing”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,23,”Shanghai”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,24,”Shanxi”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,25,”Shandong”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,26,”Shaanxi”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,28,”Tianjin”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,29,”Yunnan”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,30,”Guangdong”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,31,”Hainan”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,32,”Sichuan”</span></span>
<span class="line"><span style="color:#e1e4e8;">CN,33,”Chongqing”</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CN,01,&quot;Anhui&quot;</span></span>
<span class="line"><span style="color:#24292e;">CN,02,”Zhejiang”</span></span>
<span class="line"><span style="color:#24292e;">CN,03,”Jiangxi”</span></span>
<span class="line"><span style="color:#24292e;">CN,04,”Jiangsu”</span></span>
<span class="line"><span style="color:#24292e;">CN,05,”Jilin”</span></span>
<span class="line"><span style="color:#24292e;">CN,06,”Qinghai”</span></span>
<span class="line"><span style="color:#24292e;">CN,07,”Fujian”</span></span>
<span class="line"><span style="color:#24292e;">CN,08,”Heilongjiang”</span></span>
<span class="line"><span style="color:#24292e;">CN,09,”Henan”</span></span>
<span class="line"><span style="color:#24292e;">CN,10,”Hebei”</span></span>
<span class="line"><span style="color:#24292e;">CN,11,”Hunan”</span></span>
<span class="line"><span style="color:#24292e;">CN,12,”Hubei”</span></span>
<span class="line"><span style="color:#24292e;">CN,13,”Xinjiang”</span></span>
<span class="line"><span style="color:#24292e;">CN,14,”Xizang”</span></span>
<span class="line"><span style="color:#24292e;">CN,15,”Gansu”</span></span>
<span class="line"><span style="color:#24292e;">CN,16,”Guangxi”</span></span>
<span class="line"><span style="color:#24292e;">CN,18,”Guizhou”</span></span>
<span class="line"><span style="color:#24292e;">CN,19,”Liaoning”</span></span>
<span class="line"><span style="color:#24292e;">CN,20,”Nei Mongol”</span></span>
<span class="line"><span style="color:#24292e;">CN,21,”Ningxia”</span></span>
<span class="line"><span style="color:#24292e;">CN,22,”Beijing”</span></span>
<span class="line"><span style="color:#24292e;">CN,23,”Shanghai”</span></span>
<span class="line"><span style="color:#24292e;">CN,24,”Shanxi”</span></span>
<span class="line"><span style="color:#24292e;">CN,25,”Shandong”</span></span>
<span class="line"><span style="color:#24292e;">CN,26,”Shaanxi”</span></span>
<span class="line"><span style="color:#24292e;">CN,28,”Tianjin”</span></span>
<span class="line"><span style="color:#24292e;">CN,29,”Yunnan”</span></span>
<span class="line"><span style="color:#24292e;">CN,30,”Guangdong”</span></span>
<span class="line"><span style="color:#24292e;">CN,31,”Hainan”</span></span>
<span class="line"><span style="color:#24292e;">CN,32,”Sichuan”</span></span>
<span class="line"><span style="color:#24292e;">CN,33,”Chongqing”</span></span></code></pre></div><h2 id="_11-完整配置" tabindex="-1">11 完整配置 <a class="header-anchor" href="#_11-完整配置" aria-label="Permalink to &quot;11 完整配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># vi /etc/nginx/nginx.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">   geoip_country  /usr/share/GeoIP/GeoLiteCountry.dat;</span></span>
<span class="line"><span style="color:#e1e4e8;">   geoip_city     /usr/share/GeoIP/GeoLiteCity.dat;</span></span>
<span class="line"><span style="color:#e1e4e8;">    fastcgi_param GEOIP_CITY_COUNTRY_CODE $geoip_city_country_code;  </span></span>
<span class="line"><span style="color:#e1e4e8;">	fastcgi_param GEOIP_CITY_COUNTRY_CODE3 $geoip_city_country_code3;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    fastcgi_param GEOIP_CITY_COUNTRY_NAME $geoip_city_country_name;  </span></span>
<span class="line"><span style="color:#e1e4e8;">	fastcgi_param GEOIP_REGION $geoip_region;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    fastcgi_param GEOIP_CITY $geoip_city;  </span></span>
<span class="line"><span style="color:#e1e4e8;">	fastcgi_param GEOIP_POSTAL_CODE $geoip_postal_code;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    fastcgi_param GEOIP_CITY_CONTINENT_CODE $geoip_city_continent_code;  </span></span>
<span class="line"><span style="color:#e1e4e8;">	fastcgi_param GEOIP_LATITUDE $geoip_latitude;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    fastcgi_param GEOIP_LONGITUDE $geoip_longitude;    </span></span>
<span class="line"><span style="color:#e1e4e8;">  upstream huiduserver{</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 10.47.204.23:80  weight=1 max_fails=2 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  upstream cgiservers{</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 10.46.19.224:80   weight=1 max_fails=2 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 10.174.118.156:80   weight=1 max_fails=2 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># vi /etc/nginx/nginx.conf</span></span>
<span class="line"><span style="color:#24292e;">   geoip_country  /usr/share/GeoIP/GeoLiteCountry.dat;</span></span>
<span class="line"><span style="color:#24292e;">   geoip_city     /usr/share/GeoIP/GeoLiteCity.dat;</span></span>
<span class="line"><span style="color:#24292e;">    fastcgi_param GEOIP_CITY_COUNTRY_CODE $geoip_city_country_code;  </span></span>
<span class="line"><span style="color:#24292e;">	fastcgi_param GEOIP_CITY_COUNTRY_CODE3 $geoip_city_country_code3;  </span></span>
<span class="line"><span style="color:#24292e;">    fastcgi_param GEOIP_CITY_COUNTRY_NAME $geoip_city_country_name;  </span></span>
<span class="line"><span style="color:#24292e;">	fastcgi_param GEOIP_REGION $geoip_region;  </span></span>
<span class="line"><span style="color:#24292e;">    fastcgi_param GEOIP_CITY $geoip_city;  </span></span>
<span class="line"><span style="color:#24292e;">	fastcgi_param GEOIP_POSTAL_CODE $geoip_postal_code;  </span></span>
<span class="line"><span style="color:#24292e;">    fastcgi_param GEOIP_CITY_CONTINENT_CODE $geoip_city_continent_code;  </span></span>
<span class="line"><span style="color:#24292e;">	fastcgi_param GEOIP_LATITUDE $geoip_latitude;  </span></span>
<span class="line"><span style="color:#24292e;">    fastcgi_param GEOIP_LONGITUDE $geoip_longitude;    </span></span>
<span class="line"><span style="color:#24292e;">  upstream huiduserver{</span></span>
<span class="line"><span style="color:#24292e;">    server 10.47.204.23:80  weight=1 max_fails=2 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  upstream cgiservers{</span></span>
<span class="line"><span style="color:#24292e;">    server 10.46.19.224:80   weight=1 max_fails=2 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#24292e;">    server 10.174.118.156:80   weight=1 max_fails=2 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span></code></pre></div><ul><li>PROXY</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat proxy.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"> server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen       81;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server_name  localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;">        access_log  /www/logs/proxy.access.log  main;</span></span>
<span class="line"><span style="color:#e1e4e8;">        error_log  /www/logs/proxy.error.log;</span></span>
<span class="line"><span style="color:#e1e4e8;">        #thread_pool default threads=8 max_queue=65536;</span></span>
<span class="line"><span style="color:#e1e4e8;">        aio threads=default;    </span></span>
<span class="line"><span style="color:#e1e4e8;">       location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_redirect off;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; </span></span>
<span class="line"><span style="color:#e1e4e8;">            if ($geoip_city ~* Shanghai) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_pass http://huiduserver;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">       	    if ($geoip_region = 23) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_pass http://huiduserver;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_pass http://cgiservers;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat proxy.conf</span></span>
<span class="line"><span style="color:#24292e;"> server {</span></span>
<span class="line"><span style="color:#24292e;">        listen       81;</span></span>
<span class="line"><span style="color:#24292e;">        server_name  localhost;</span></span>
<span class="line"><span style="color:#24292e;">        access_log  /www/logs/proxy.access.log  main;</span></span>
<span class="line"><span style="color:#24292e;">        error_log  /www/logs/proxy.error.log;</span></span>
<span class="line"><span style="color:#24292e;">        #thread_pool default threads=8 max_queue=65536;</span></span>
<span class="line"><span style="color:#24292e;">        aio threads=default;    </span></span>
<span class="line"><span style="color:#24292e;">       location / {</span></span>
<span class="line"><span style="color:#24292e;">            proxy_redirect off;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; </span></span>
<span class="line"><span style="color:#24292e;">            if ($geoip_city ~* Shanghai) {</span></span>
<span class="line"><span style="color:#24292e;">                proxy_pass http://huiduserver;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">       	    if ($geoip_region = 23) {</span></span>
<span class="line"><span style="color:#24292e;">                proxy_pass http://huiduserver;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">            proxy_pass http://cgiservers;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><p>参考资料：</p><p><a href="http://nginx.org/en/docs/http/ngx_http_geoip_module.html" target="_blank" rel="noreferrer">http://nginx.org/en/docs/http/ngx_http_geoip_module.html</a></p>`,25),o=[l];function c(i,t,r,y,_,d){return a(),n("div",null,o)}const u=s(p,[["render",c]]);export{h as __pageData,u as default};
