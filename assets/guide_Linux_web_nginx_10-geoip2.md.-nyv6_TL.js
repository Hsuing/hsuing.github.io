import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const _=JSON.parse('{"title":"一、安装","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/10-geoip2.md","filePath":"guide/Linux/web/nginx/10-geoip2.md","lastUpdated":1747663360000}'),p={name:"guide/Linux/web/nginx/10-geoip2.md"},e=l(`<h1 id="一、安装" tabindex="-1">一、安装 <a class="header-anchor" href="#一、安装" aria-label="Permalink to &quot;一、安装&quot;">​</a></h1><p>注册地址，<a href="https://www.maxmind.com/en/accounts/1169399/geoip/downloads" target="_blank" rel="noreferrer">https://www.maxmind.com/en/accounts/1169399/geoip/downloads</a></p><ul><li>参考</li></ul><p><a href="https://www.maxmind.com/en/geoip2-databases" target="_blank" rel="noreferrer">https://www.maxmind.com/en/geoip2-databases</a></p><p><a href="https://docs.nginx.com/nginx/admin-guide/dynamic-modules/geoip2/" target="_blank" rel="noreferrer">https://docs.nginx.com/nginx/admin-guide/dynamic-modules/geoip2/</a></p><p><a href="https://www.fengbohello.top/archives/ip2location-geolite2" target="_blank" rel="noreferrer">https://www.fengbohello.top/archives/ip2location-geolite2</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">yum install epel-release -y</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install gcc unzip gcc-c++ git wget bind-utils make iptables-services -y</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cd /usr/local/src</span></span>
<span class="line"><span style="color:#e1e4e8;">rm -rf *</span></span>
<span class="line"><span style="color:#e1e4e8;">mv /etc/localtime /etc/localtime.bak</span></span>
<span class="line"><span style="color:#e1e4e8;">/bin/cp -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &#39;ZONE=&quot;CST&quot;&#39; &gt; /etc/sysconfig/clock</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">setenforce 0</span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &quot;s/=enforcing/=disabled/g&quot; /etc/selinux/config</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl disable firewalld</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl stop firewalld</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">chkconfig iptables on</span></span>
<span class="line"><span style="color:#e1e4e8;">service iptables start</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -F</span></span>
<span class="line"><span style="color:#e1e4e8;">service iptables save</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cd /usr/local/src/</span></span>
<span class="line"><span style="color:#e1e4e8;">wget http://download.zhufunin.com/libmaxminddb-1.3.2.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -zxf libmaxminddb-1.3.2.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd libmaxminddb-1.3.2</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure</span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#e1e4e8;">[[ -z \`cat /etc/ld.so.conf |grep &quot;\\/usr\\/local\\/lib&quot;\` ]] &amp;&amp; echo &quot;/usr/local/lib&quot; &gt;&gt; /etc/ld.so.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">ldconfig</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /usr/local/nginx/temp</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /usr/local/nginx/geoip</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /usr/local/nginx/geoip</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">wget http://download.zhufunin.com/maxmind-city.mmdb.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxf maxmind-city.mmdb.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cd /usr/local/src/</span></span>
<span class="line"><span style="color:#e1e4e8;">wget http://download.zhufunin.com/openssl-1.1.0e.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxf openssl-1.1.0e.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">wget http://download.zhufunin.com/pcre-8.42.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxf pcre-8.42.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">wget http://download.zhufunin.com/zlib-1.2.11.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxf zlib-1.2.11.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">wget http://download.zhufunin.com/ngx_http_geoip2_module.zip</span></span>
<span class="line"><span style="color:#e1e4e8;">unzip -o ngx_http_geoip2_module.zip</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cd /usr/local/src</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">wget http://download.zhufunin.com/tengine-2.3.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">wget http://download.zhufunin.com/ngx_http_upstream_check_module.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">wget http://download.zhufunin.com/ngx_http_upstream_dynamic_module.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">wget http://download.zhufunin.com/ngx_http_upstream_keepalive_module.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#nginx-1.22</span></span>
<span class="line"><span style="color:#e1e4e8;">wget -c https://github.com/leev/ngx_http_geoip2_module/archive/refs/tags/3.4.tar.gz -O /usr/local/src/ngx_http_geoip2_module-3.4.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxvf tengine-2.3.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxvf ngx_http_upstream_check_module.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxvf ngx_http_upstream_dynamic_module.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxvf ngx_http_upstream_keepalive_module.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">useradd -M -s /sbin/nologin www</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /usr/local/src/tengine-2.3.1</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--user=www \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--group=www \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--prefix=/usr/local/nginx \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--with-http_ssl_module \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--with-http_v2_module \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--with-http_gzip_static_module \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--with-http_realip_module \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--error-log-path=/usr/local/nginx/logs/error.log \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--http-log-path=/usr/local/nginx/logs/access.log \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--http-client-body-temp-path=/usr/local/nginx/temp/client_body_temp \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--http-proxy-temp-path=/usr/local/nginx/temp/proxy_temp \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--with-openssl=/usr/local/src/openssl-1.1.0e \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--with-zlib=/usr/local/src/zlib-1.2.11 \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--with-pcre=/usr/local/src/pcre-8.42 \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--add-module=/usr/local/src/ngx_http_geoip2_module-master \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--add-module=/usr/local/src/ngx_http_upstream_dynamic_module \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--add-module=/usr/local/src/ngx_http_upstream_check_module</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;export PATH=$PATH:/usr/local/nginx/sbin/&quot; &gt;&gt; /etc/profile</span></span>
<span class="line"><span style="color:#e1e4e8;">source /etc/profile</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /usr/local/nginx/conf/autoconfig/vhost/</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /usr/local/nginx/conf/autoconfig/upstream/</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /usr/local/nginx/conf/autoconfig/cache/</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /usr/local/nginx/conf/include/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /usr/local/shell/data</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /usr/local/nginx/temp/proxy_store/client_body_temp</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /usr/local/nginx/challenges</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /usr/local/nginx/temp/proxy_store/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /usr/local/nginx/ssl</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">openssl req -x509 -nodes -days 10000 -newkey rsa:2048 -keyout /usr/local/nginx/nginx.key -out /usr/local/nginx/nginx.crt -subj &quot;/C=US/ST=US/L=US/O=ssl/OU=ssl/CN=ssl.com/emailAddress=admin@ssl.com&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;ulimit -n 65535&quot; &gt;&gt; /etc/profile</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;root soft nofile 65535&quot; &gt;&gt; /etc/security/limits.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;root hard nofile 65535&quot; &gt;&gt; /etc/security/limits.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;* soft nofile 65535&quot; &gt;&gt; /etc/security/limits.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;* hard nofile 65535&quot; &gt;&gt; /etc/security/limits.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">yum install epel-release -y</span></span>
<span class="line"><span style="color:#24292e;">yum install gcc unzip gcc-c++ git wget bind-utils make iptables-services -y</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cd /usr/local/src</span></span>
<span class="line"><span style="color:#24292e;">rm -rf *</span></span>
<span class="line"><span style="color:#24292e;">mv /etc/localtime /etc/localtime.bak</span></span>
<span class="line"><span style="color:#24292e;">/bin/cp -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime</span></span>
<span class="line"><span style="color:#24292e;">echo &#39;ZONE=&quot;CST&quot;&#39; &gt; /etc/sysconfig/clock</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">setenforce 0</span></span>
<span class="line"><span style="color:#24292e;">sed -i &quot;s/=enforcing/=disabled/g&quot; /etc/selinux/config</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">systemctl disable firewalld</span></span>
<span class="line"><span style="color:#24292e;">systemctl stop firewalld</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">chkconfig iptables on</span></span>
<span class="line"><span style="color:#24292e;">service iptables start</span></span>
<span class="line"><span style="color:#24292e;">iptables -F</span></span>
<span class="line"><span style="color:#24292e;">service iptables save</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cd /usr/local/src/</span></span>
<span class="line"><span style="color:#24292e;">wget http://download.zhufunin.com/libmaxminddb-1.3.2.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar -zxf libmaxminddb-1.3.2.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd libmaxminddb-1.3.2</span></span>
<span class="line"><span style="color:#24292e;">./configure</span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#24292e;">[[ -z \`cat /etc/ld.so.conf |grep &quot;\\/usr\\/local\\/lib&quot;\` ]] &amp;&amp; echo &quot;/usr/local/lib&quot; &gt;&gt; /etc/ld.so.conf</span></span>
<span class="line"><span style="color:#24292e;">ldconfig</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /usr/local/nginx/temp</span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /usr/local/nginx/geoip</span></span>
<span class="line"><span style="color:#24292e;">cd /usr/local/nginx/geoip</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">wget http://download.zhufunin.com/maxmind-city.mmdb.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar zxf maxmind-city.mmdb.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cd /usr/local/src/</span></span>
<span class="line"><span style="color:#24292e;">wget http://download.zhufunin.com/openssl-1.1.0e.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar zxf openssl-1.1.0e.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">wget http://download.zhufunin.com/pcre-8.42.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar zxf pcre-8.42.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">wget http://download.zhufunin.com/zlib-1.2.11.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar zxf zlib-1.2.11.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">wget http://download.zhufunin.com/ngx_http_geoip2_module.zip</span></span>
<span class="line"><span style="color:#24292e;">unzip -o ngx_http_geoip2_module.zip</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cd /usr/local/src</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">wget http://download.zhufunin.com/tengine-2.3.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">wget http://download.zhufunin.com/ngx_http_upstream_check_module.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">wget http://download.zhufunin.com/ngx_http_upstream_dynamic_module.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">wget http://download.zhufunin.com/ngx_http_upstream_keepalive_module.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#nginx-1.22</span></span>
<span class="line"><span style="color:#24292e;">wget -c https://github.com/leev/ngx_http_geoip2_module/archive/refs/tags/3.4.tar.gz -O /usr/local/src/ngx_http_geoip2_module-3.4.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">tar zxvf tengine-2.3.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar zxvf ngx_http_upstream_check_module.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar zxvf ngx_http_upstream_dynamic_module.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar zxvf ngx_http_upstream_keepalive_module.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">useradd -M -s /sbin/nologin www</span></span>
<span class="line"><span style="color:#24292e;">cd /usr/local/src/tengine-2.3.1</span></span>
<span class="line"><span style="color:#24292e;">./configure \\</span></span>
<span class="line"><span style="color:#24292e;">--user=www \\</span></span>
<span class="line"><span style="color:#24292e;">--group=www \\</span></span>
<span class="line"><span style="color:#24292e;">--prefix=/usr/local/nginx \\</span></span>
<span class="line"><span style="color:#24292e;">--with-http_ssl_module \\</span></span>
<span class="line"><span style="color:#24292e;">--with-http_v2_module \\</span></span>
<span class="line"><span style="color:#24292e;">--with-http_gzip_static_module \\</span></span>
<span class="line"><span style="color:#24292e;">--with-http_realip_module \\</span></span>
<span class="line"><span style="color:#24292e;">--error-log-path=/usr/local/nginx/logs/error.log \\</span></span>
<span class="line"><span style="color:#24292e;">--http-log-path=/usr/local/nginx/logs/access.log \\</span></span>
<span class="line"><span style="color:#24292e;">--http-client-body-temp-path=/usr/local/nginx/temp/client_body_temp \\</span></span>
<span class="line"><span style="color:#24292e;">--http-proxy-temp-path=/usr/local/nginx/temp/proxy_temp \\</span></span>
<span class="line"><span style="color:#24292e;">--with-openssl=/usr/local/src/openssl-1.1.0e \\</span></span>
<span class="line"><span style="color:#24292e;">--with-zlib=/usr/local/src/zlib-1.2.11 \\</span></span>
<span class="line"><span style="color:#24292e;">--with-pcre=/usr/local/src/pcre-8.42 \\</span></span>
<span class="line"><span style="color:#24292e;">--add-module=/usr/local/src/ngx_http_geoip2_module-master \\</span></span>
<span class="line"><span style="color:#24292e;">--add-module=/usr/local/src/ngx_http_upstream_dynamic_module \\</span></span>
<span class="line"><span style="color:#24292e;">--add-module=/usr/local/src/ngx_http_upstream_check_module</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;export PATH=$PATH:/usr/local/nginx/sbin/&quot; &gt;&gt; /etc/profile</span></span>
<span class="line"><span style="color:#24292e;">source /etc/profile</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /usr/local/nginx/conf/autoconfig/vhost/</span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /usr/local/nginx/conf/autoconfig/upstream/</span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /usr/local/nginx/conf/autoconfig/cache/</span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /usr/local/nginx/conf/include/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /usr/local/shell/data</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /usr/local/nginx/temp/proxy_store/client_body_temp</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /usr/local/nginx/challenges</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /usr/local/nginx/temp/proxy_store/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /usr/local/nginx/ssl</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">openssl req -x509 -nodes -days 10000 -newkey rsa:2048 -keyout /usr/local/nginx/nginx.key -out /usr/local/nginx/nginx.crt -subj &quot;/C=US/ST=US/L=US/O=ssl/OU=ssl/CN=ssl.com/emailAddress=admin@ssl.com&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;ulimit -n 65535&quot; &gt;&gt; /etc/profile</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;root soft nofile 65535&quot; &gt;&gt; /etc/security/limits.conf</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;root hard nofile 65535&quot; &gt;&gt; /etc/security/limits.conf</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;* soft nofile 65535&quot; &gt;&gt; /etc/security/limits.conf</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;* hard nofile 65535&quot; &gt;&gt; /etc/security/limits.conf</span></span></code></pre></div><h1 id="二、配置" tabindex="-1">二、配置 <a class="header-anchor" href="#二、配置" aria-label="Permalink to &quot;二、配置&quot;">​</a></h1><ul><li>nginx 上配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">geoip2 /data/apps/nginx/geoip/maxmind-city.mmdb {</span></span>
<span class="line"><span style="color:#e1e4e8;">    $geoip2_data_country_code default=CN source=$http_x_forwarded_for country iso_code;</span></span>
<span class="line"><span style="color:#e1e4e8;">    $geoip2_data_country_name country names en;</span></span>
<span class="line"><span style="color:#e1e4e8;">    $geoip2_data_city_name default=Beijing city names en;</span></span>
<span class="line"><span style="color:#e1e4e8;">   </span></span>
<span class="line"><span style="color:#e1e4e8;">    $geoip2_data_subdivisions_name default=Beijing subdivisions 0 names en;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    $geoip2_data_province_name subdivisions 0 names en;</span></span>
<span class="line"><span style="color:#e1e4e8;">    $geoip2_data_province_isocode subdivisions 0 iso_code;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_format es &#39;$server_addr\`$host\`$remote_addr\`$http_x_forwarded_for\`$time_local\`$request_uri\`$request_length\`$bytes_sent\`$request_time\`$status\`$upstream_addr\`$upstream_cache_status\`$upstream_response_time\`$request_method\`$http_user_agent\`$upstream_status\`$geoip2_data_city_name\`$geoip2_data_subdivisions_name\`$geoip2_data_country_name\`$geoip2_data_country_code&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$geoip2_data_country_name:请求所属的国家</span></span>
<span class="line"><span style="color:#e1e4e8;">$geoip2_data_subdivisions_name:请求所属的省份或地区</span></span>
<span class="line"><span style="color:#e1e4e8;">$geoip2_data_city_name:请求所属的城市</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">geoip2 /data/apps/nginx/geoip/maxmind-city.mmdb {</span></span>
<span class="line"><span style="color:#24292e;">    $geoip2_data_country_code default=CN source=$http_x_forwarded_for country iso_code;</span></span>
<span class="line"><span style="color:#24292e;">    $geoip2_data_country_name country names en;</span></span>
<span class="line"><span style="color:#24292e;">    $geoip2_data_city_name default=Beijing city names en;</span></span>
<span class="line"><span style="color:#24292e;">   </span></span>
<span class="line"><span style="color:#24292e;">    $geoip2_data_subdivisions_name default=Beijing subdivisions 0 names en;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    $geoip2_data_province_name subdivisions 0 names en;</span></span>
<span class="line"><span style="color:#24292e;">    $geoip2_data_province_isocode subdivisions 0 iso_code;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_format es &#39;$server_addr\`$host\`$remote_addr\`$http_x_forwarded_for\`$time_local\`$request_uri\`$request_length\`$bytes_sent\`$request_time\`$status\`$upstream_addr\`$upstream_cache_status\`$upstream_response_time\`$request_method\`$http_user_agent\`$upstream_status\`$geoip2_data_city_name\`$geoip2_data_subdivisions_name\`$geoip2_data_country_name\`$geoip2_data_country_code&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$geoip2_data_country_name:请求所属的国家</span></span>
<span class="line"><span style="color:#24292e;">$geoip2_data_subdivisions_name:请求所属的省份或地区</span></span>
<span class="line"><span style="color:#24292e;">$geoip2_data_city_name:请求所属的城市</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>vhost</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name test.freehan.ink;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  add_header Geo-City &quot;$geoip2_data_city_name&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">  add_header Geo-Country &quot;$geoip2_data_country_code&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;">	rewrite /hello /go/index.html last;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /myip {</span></span>
<span class="line"><span style="color:#e1e4e8;">        default_type text/plain;</span></span>
<span class="line"><span style="color:#e1e4e8;">        return 200 &quot;$remote_addr $geoip2_data_city_name $geoip2_data_country_name $geoip2_data_country_code&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">	access_log /var/log/nginx/cdn.log es;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name test.freehan.ink;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  add_header Geo-City &quot;$geoip2_data_city_name&quot;;</span></span>
<span class="line"><span style="color:#24292e;">  add_header Geo-Country &quot;$geoip2_data_country_code&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;">	rewrite /hello /go/index.html last;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /myip {</span></span>
<span class="line"><span style="color:#24292e;">        default_type text/plain;</span></span>
<span class="line"><span style="color:#24292e;">        return 200 &quot;$remote_addr $geoip2_data_city_name $geoip2_data_country_name $geoip2_data_country_code&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">	access_log /var/log/nginx/cdn.log es;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>效果</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">172.17.155.86\`xxx.com\`47.92.50.96\`-\`30/Dec/2019:16:41:56 +0800\`/\`185\`0\`0.000\`200\`-\`-\`-\`GET\`Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:36.0) Gecko/20100101 Firefox/36.0\`-\`Shenzhen\`China\`CN</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">172.17.155.86\`xxx.com\`47.92.50.96\`-\`30/Dec/2019:16:41:56 +0800\`/\`185\`0\`0.000\`200\`-\`-\`-\`GET\`Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:36.0) Gecko/20100101 Firefox/36.0\`-\`Shenzhen\`China\`CN</span></span></code></pre></div><ul><li>定期更新geoip2</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /usr/local/nginx/geoip/</span></span>
<span class="line"><span style="color:#e1e4e8;">rm -rf /usr/local/nginx/geoip/GeoLite2-City_*</span></span>
<span class="line"><span style="color:#e1e4e8;">rm -rf /usr/local/nginx/geoip/GeoLite2-City.tar.gz*</span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://geolite.maxmind.com/download/geoip/database/GeoLite2-City.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">code=&quot;$?&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo $code</span></span>
<span class="line"><span style="color:#e1e4e8;">if test &quot;$code&quot; -ne 0 ;then</span></span>
<span class="line"><span style="color:#e1e4e8;">    echo &quot;Download is failed&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    exit 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxf GeoLite2-City.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd GeoLite2-City_*</span></span>
<span class="line"><span style="color:#e1e4e8;">if test ! -e GeoLite2-City.mmdb; then</span></span>
<span class="line"><span style="color:#e1e4e8;">    exit 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;">size=\`du -s ./GeoLite2-City.mmdb |awk &#39;{print $1}&#39;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">if test &quot;$size&quot; -lt 50000;then</span></span>
<span class="line"><span style="color:#e1e4e8;">    exit 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;mv GeoLite2-City.mmdb maxmind-city.mmdb&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">mv GeoLite2-City.mmdb maxmind-city.mmdb</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;mv maxmind-city.mmdb /usr/local/nginx/geoip/&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">mv maxmind-city.mmdb /usr/local/nginx/geoip/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;">cd /usr/local/nginx/geoip/</span></span>
<span class="line"><span style="color:#24292e;">rm -rf /usr/local/nginx/geoip/GeoLite2-City_*</span></span>
<span class="line"><span style="color:#24292e;">rm -rf /usr/local/nginx/geoip/GeoLite2-City.tar.gz*</span></span>
<span class="line"><span style="color:#24292e;">wget https://geolite.maxmind.com/download/geoip/database/GeoLite2-City.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">code=&quot;$?&quot;</span></span>
<span class="line"><span style="color:#24292e;">echo $code</span></span>
<span class="line"><span style="color:#24292e;">if test &quot;$code&quot; -ne 0 ;then</span></span>
<span class="line"><span style="color:#24292e;">    echo &quot;Download is failed&quot;</span></span>
<span class="line"><span style="color:#24292e;">    exit 0;</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;">tar zxf GeoLite2-City.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd GeoLite2-City_*</span></span>
<span class="line"><span style="color:#24292e;">if test ! -e GeoLite2-City.mmdb; then</span></span>
<span class="line"><span style="color:#24292e;">    exit 0;</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;">size=\`du -s ./GeoLite2-City.mmdb |awk &#39;{print $1}&#39;\`</span></span>
<span class="line"><span style="color:#24292e;">if test &quot;$size&quot; -lt 50000;then</span></span>
<span class="line"><span style="color:#24292e;">    exit 0;</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;mv GeoLite2-City.mmdb maxmind-city.mmdb&quot;</span></span>
<span class="line"><span style="color:#24292e;">mv GeoLite2-City.mmdb maxmind-city.mmdb</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;mv maxmind-city.mmdb /usr/local/nginx/geoip/&quot;</span></span>
<span class="line"><span style="color:#24292e;">mv maxmind-city.mmdb /usr/local/nginx/geoip/</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#免费库</span></span>
<span class="line"><span style="color:#e1e4e8;">https://www.maxmind.com/en/accounts/1169399/geoip/downloads</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#免费库</span></span>
<span class="line"><span style="color:#24292e;">https://www.maxmind.com/en/accounts/1169399/geoip/downloads</span></span></code></pre></div><ul><li>另一种配置</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 1.在 nginx.conf 中进行如下几个关键部分配置。</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx.conf</span></span>
<span class="line"><span style="color:#B392F0;">worker_processes</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">auto</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;"># -- 关键点: 加载 geoip2 模块动态链接库</span></span>
<span class="line"><span style="color:#B392F0;">load_module</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">modules/ngx_http_geoip2_module.so</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">load_module</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">modules/ngx_stream_geoip2_module.so</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#79B8FF;">....</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># -- 关键点: 日志格式</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">log_format</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">demo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;$remote_addr - [ $geoip2_country_code $geoip2_data_city_name ] - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">&#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">&#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot; rt=$request_time urt=$upstream_response_time&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;"># -- 关键点: geoip 模块变量绑定</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">geoip2</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/GeoIP2/GeoLite2-Country.mmdb</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">      $geoip2_country_code </span><span style="color:#9ECBFF;">country</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">names</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">en</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">geoip2</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/GeoIP2/GeoLite2-City.mmdb</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">      $geoip2_data_country_name </span><span style="color:#9ECBFF;">country</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">names</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">en</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      $geoip2_data_country_code </span><span style="color:#9ECBFF;">default=China</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">source=</span><span style="color:#E1E4E8;">$remote_addr </span><span style="color:#9ECBFF;">country</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">iso_code</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      $geoip2_data_city_name </span><span style="color:#9ECBFF;">city</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">names</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">en</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      $geoip2_data_province_name </span><span style="color:#9ECBFF;">subdivisions</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">names</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">en</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      $geoip2_data_province_isocode </span><span style="color:#9ECBFF;">subdivisions</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">iso_code</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      $geoip2_continent_code </span><span style="color:#9ECBFF;">continent</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">code</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 2.在 demo.conf 配置如下 location 以验证 GeoIP。</span></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#79B8FF;">....</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># -- 关键点: 访问日志设置</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">access_log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/log/nginx/demo-</span><span style="color:#E1E4E8;">\${logdate}</span><span style="color:#9ECBFF;">.log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">demo</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># -- 关键点: 该路径显示当前请求访问地址信息</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/api/v1/info</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#B392F0;">default_type</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">text/plain</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$remote_addr</span><span style="color:#9ECBFF;">\\n geoip2_country_code=</span><span style="color:#E1E4E8;">$geoip2_country_code</span><span style="color:#9ECBFF;">\\n geoip2_data_country_name=</span><span style="color:#E1E4E8;">$geoip2_data_country_name</span><span style="color:#9ECBFF;"> \\n geoip2_data_country_code=</span><span style="color:#E1E4E8;">$geoip2_data_country_code</span><span style="color:#9ECBFF;"> \\n geoip2_data_city_name=</span><span style="color:#E1E4E8;">$geoip2_data_city_name</span><span style="color:#9ECBFF;"> \\n geoip2_continent_code=</span><span style="color:#E1E4E8;">$geoip2_continent_code</span><span style="color:#9ECBFF;"> \\n geoip2_data_province_name=</span><span style="color:#E1E4E8;">$geoip2_data_province_name</span><span style="color:#9ECBFF;"> \\n geoip2_data_province_isocode=</span><span style="color:#E1E4E8;">$geoip2_data_province_isocode</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 1.在 nginx.conf 中进行如下几个关键部分配置。</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx.conf</span></span>
<span class="line"><span style="color:#6F42C1;">worker_processes</span><span style="color:#24292E;">  </span><span style="color:#032F62;">auto</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;"># -- 关键点: 加载 geoip2 模块动态链接库</span></span>
<span class="line"><span style="color:#6F42C1;">load_module</span><span style="color:#24292E;"> </span><span style="color:#032F62;">modules/ngx_http_geoip2_module.so</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">load_module</span><span style="color:#24292E;"> </span><span style="color:#032F62;">modules/ngx_stream_geoip2_module.so</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#005CC5;">....</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">http</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># -- 关键点: 日志格式</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">log_format</span><span style="color:#24292E;"> </span><span style="color:#032F62;">demo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;$remote_addr - [ $geoip2_country_code $geoip2_data_city_name ] - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">&#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">&#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot; rt=$request_time urt=$upstream_response_time&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;"># -- 关键点: geoip 模块变量绑定</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">geoip2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/GeoIP2/GeoLite2-Country.mmdb</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">      $geoip2_country_code </span><span style="color:#032F62;">country</span><span style="color:#24292E;"> </span><span style="color:#032F62;">names</span><span style="color:#24292E;"> </span><span style="color:#032F62;">en</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">geoip2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/GeoIP2/GeoLite2-City.mmdb</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">      $geoip2_data_country_name </span><span style="color:#032F62;">country</span><span style="color:#24292E;"> </span><span style="color:#032F62;">names</span><span style="color:#24292E;"> </span><span style="color:#032F62;">en</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      $geoip2_data_country_code </span><span style="color:#032F62;">default=China</span><span style="color:#24292E;"> </span><span style="color:#032F62;">source=</span><span style="color:#24292E;">$remote_addr </span><span style="color:#032F62;">country</span><span style="color:#24292E;"> </span><span style="color:#032F62;">iso_code</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      $geoip2_data_city_name </span><span style="color:#032F62;">city</span><span style="color:#24292E;"> </span><span style="color:#032F62;">names</span><span style="color:#24292E;"> </span><span style="color:#032F62;">en</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      $geoip2_data_province_name </span><span style="color:#032F62;">subdivisions</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#032F62;">names</span><span style="color:#24292E;"> </span><span style="color:#032F62;">en</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      $geoip2_data_province_isocode </span><span style="color:#032F62;">subdivisions</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#032F62;">iso_code</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      $geoip2_continent_code </span><span style="color:#032F62;">continent</span><span style="color:#24292E;"> </span><span style="color:#032F62;">code</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 2.在 demo.conf 配置如下 location 以验证 GeoIP。</span></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#005CC5;">....</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># -- 关键点: 访问日志设置</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">access_log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/log/nginx/demo-</span><span style="color:#24292E;">\${logdate}</span><span style="color:#032F62;">.log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">demo</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># -- 关键点: 该路径显示当前请求访问地址信息</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/api/v1/info</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6F42C1;">default_type</span><span style="color:#24292E;"> </span><span style="color:#032F62;">text/plain</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$remote_addr</span><span style="color:#032F62;">\\n geoip2_country_code=</span><span style="color:#24292E;">$geoip2_country_code</span><span style="color:#032F62;">\\n geoip2_data_country_name=</span><span style="color:#24292E;">$geoip2_data_country_name</span><span style="color:#032F62;"> \\n geoip2_data_country_code=</span><span style="color:#24292E;">$geoip2_data_country_code</span><span style="color:#032F62;"> \\n geoip2_data_city_name=</span><span style="color:#24292E;">$geoip2_data_city_name</span><span style="color:#032F62;"> \\n geoip2_continent_code=</span><span style="color:#24292E;">$geoip2_continent_code</span><span style="color:#032F62;"> \\n geoip2_data_province_name=</span><span style="color:#24292E;">$geoip2_data_province_name</span><span style="color:#032F62;"> \\n geoip2_data_province_isocode=</span><span style="color:#24292E;">$geoip2_data_province_isocode</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http{</span></span>
<span class="line"><span style="color:#e1e4e8;">    ...</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    geoip2 /usr/local/share/GeoIP/GeoLite2-Country.mmdb {</span></span>
<span class="line"><span style="color:#e1e4e8;">          $geoip2_country_code country iso_code;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    map $geoip2_country_code $is_cn_country {</span></span>
<span class="line"><span style="color:#e1e4e8;">        default no;</span></span>
<span class="line"><span style="color:#e1e4e8;">        CN yes;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen       80;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server_name  localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;">        #加上响应头方便调试</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header country $geoip2_country_code;</span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">     </span></span>
<span class="line"><span style="color:#e1e4e8;">        location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">            set $rootpath html/a;</span></span>
<span class="line"><span style="color:#e1e4e8;">            if ($is_jp_country = no) {</span></span>
<span class="line"><span style="color:#e1e4e8;">              set $rootpath html/b;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">            add_header rootpath $rootpath;</span></span>
<span class="line"><span style="color:#e1e4e8;">            add_header country $geoip2_country_code;</span></span>
<span class="line"><span style="color:#e1e4e8;">            root $rootpath;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">            index index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http{</span></span>
<span class="line"><span style="color:#24292e;">    ...</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    geoip2 /usr/local/share/GeoIP/GeoLite2-Country.mmdb {</span></span>
<span class="line"><span style="color:#24292e;">          $geoip2_country_code country iso_code;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    map $geoip2_country_code $is_cn_country {</span></span>
<span class="line"><span style="color:#24292e;">        default no;</span></span>
<span class="line"><span style="color:#24292e;">        CN yes;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    server {</span></span>
<span class="line"><span style="color:#24292e;">        listen       80;</span></span>
<span class="line"><span style="color:#24292e;">        server_name  localhost;</span></span>
<span class="line"><span style="color:#24292e;">        #加上响应头方便调试</span></span>
<span class="line"><span style="color:#24292e;">        add_header country $geoip2_country_code;</span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">     </span></span>
<span class="line"><span style="color:#24292e;">        location / {</span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">            set $rootpath html/a;</span></span>
<span class="line"><span style="color:#24292e;">            if ($is_jp_country = no) {</span></span>
<span class="line"><span style="color:#24292e;">              set $rootpath html/b;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">            add_header rootpath $rootpath;</span></span>
<span class="line"><span style="color:#24292e;">            add_header country $geoip2_country_code;</span></span>
<span class="line"><span style="color:#24292e;">            root $rootpath;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">            index index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="非中国区域不能访问" tabindex="-1">非中国区域不能访问 <a class="header-anchor" href="#非中国区域不能访问" aria-label="Permalink to &quot;非中国区域不能访问&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">geoip2 /data/apps/nginx/geoip/maxmind-city.mmdb {</span></span>
<span class="line"><span style="color:#e1e4e8;">    $geoip2_data_country_code default=CN source=$http_x_forwarded_for country iso_code;</span></span>
<span class="line"><span style="color:#e1e4e8;">    $geoip2_data_country_name country names en;</span></span>
<span class="line"><span style="color:#e1e4e8;">    $geoip2_data_city_name default=Shenzhen city names en;</span></span>
<span class="line"><span style="color:#e1e4e8;">    $geoip2_data_subdivisions_name default=Beijing subdivisions 0 names en;</span></span>
<span class="line"><span style="color:#e1e4e8;">    $geoip2_data_province_name subdivisions 0 names en;</span></span>
<span class="line"><span style="color:#e1e4e8;">    $geoip2_data_province_isocode subdivisions 0 iso_code;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_format es &#39;$server_addr\`$host\`$remote_addr\`$http_x_forwarded_for\`$time_local\`$request_uri\`$request_length\`$bytes_sent\`$request_time\`$status\`$upstream_addr\`$upstream_cache_status\`$upstream_response_time\`$request_method\`$http_user_agent\`$upstream_status\`$geoip2_data_city_name\`$geoip2_data_subdivisions_name\`$geoip2_data_country_name\`$geoip2_data_country_code&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($geoip2_data_country_name != China){</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($geoip2_data_country_code != CN) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">geoip2 /data/apps/nginx/geoip/maxmind-city.mmdb {</span></span>
<span class="line"><span style="color:#24292e;">    $geoip2_data_country_code default=CN source=$http_x_forwarded_for country iso_code;</span></span>
<span class="line"><span style="color:#24292e;">    $geoip2_data_country_name country names en;</span></span>
<span class="line"><span style="color:#24292e;">    $geoip2_data_city_name default=Shenzhen city names en;</span></span>
<span class="line"><span style="color:#24292e;">    $geoip2_data_subdivisions_name default=Beijing subdivisions 0 names en;</span></span>
<span class="line"><span style="color:#24292e;">    $geoip2_data_province_name subdivisions 0 names en;</span></span>
<span class="line"><span style="color:#24292e;">    $geoip2_data_province_isocode subdivisions 0 iso_code;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_format es &#39;$server_addr\`$host\`$remote_addr\`$http_x_forwarded_for\`$time_local\`$request_uri\`$request_length\`$bytes_sent\`$request_time\`$status\`$upstream_addr\`$upstream_cache_status\`$upstream_response_time\`$request_method\`$http_user_agent\`$upstream_status\`$geoip2_data_city_name\`$geoip2_data_subdivisions_name\`$geoip2_data_country_name\`$geoip2_data_country_code&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($geoip2_data_country_name != China){</span></span>
<span class="line"><span style="color:#24292e;">    return 444;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if ($geoip2_data_country_code != CN) {</span></span>
<span class="line"><span style="color:#24292e;">    return 444;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($geoip2_data_subdivisions_name != Beijing){</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($geoip2_data_country_name != China){</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($geoip2_data_country_code != CN) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($geoip2_data_subdivisions_name != Beijing){</span></span>
<span class="line"><span style="color:#24292e;">    return 444;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if ($geoip2_data_country_name != China){</span></span>
<span class="line"><span style="color:#24292e;">    return 444;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> if ($geoip2_data_country_code != CN) {</span></span>
<span class="line"><span style="color:#24292e;">    return 444;</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span></code></pre></div><ul><li>获取用户ip属于区域</li></ul><p>在前面编译安装<code>libmaxminddb</code>库后，便可以使用 mmdblookup 工具</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mmdblookup</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--file</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">GeoLite2-City.mmdb</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--ip</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">x.x.x.x</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">&quot;continent&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;code&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">&quot;AS&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;geoname_id&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">6255147</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">uint3</span><span style="color:#F97583;">2&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;names&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;de&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Asien&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;en&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Asia&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;es&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Asia&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;fr&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Asie&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;ja&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;アジア&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;pt-BR&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Ásia&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;ru&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Азия&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;zh-CN&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;亚洲&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">&quot;country&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;geoname_id&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">1562822</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">uint3</span><span style="color:#F97583;">2&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;iso_code&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">&quot;VN&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;names&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;de&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Vietnam&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;en&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Vietnam&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;es&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Vietnam&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;fr&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Vietnam&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;ja&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;ベトナム&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;pt-BR&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Vietnã&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;ru&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Вьетнам&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;zh-CN&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;越南&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">&quot;location&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;accuracy_radius&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">50</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">uint1</span><span style="color:#F97583;">6&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;latitude&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">16.002300</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">doubl</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;longitude&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">105.999900</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">doubl</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;time_zone&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">&quot;Asia/Ho_Chi_Minh&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">&quot;registered_country&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;geoname_id&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">1562822</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">uint3</span><span style="color:#F97583;">2&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;iso_code&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">&quot;VN&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;names&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;de&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Vietnam&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;en&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Vietnam&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;es&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Vietnam&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;fr&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Vietnam&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;ja&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;ベトナム&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;pt-BR&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Vietnã&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;ru&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;Вьетнам&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">&quot;zh-CN&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">&quot;越南&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">utf8_strin</span><span style="color:#E1E4E8;">g</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mmdblookup</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--file</span><span style="color:#24292E;"> </span><span style="color:#032F62;">GeoLite2-City.mmdb</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--ip</span><span style="color:#24292E;"> </span><span style="color:#032F62;">x.x.x.x</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">&quot;continent&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;code&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">&quot;AS&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;geoname_id&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">6255147</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">uint3</span><span style="color:#D73A49;">2&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;names&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;de&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Asien&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;en&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Asia&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;es&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Asia&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;fr&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Asie&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;ja&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;アジア&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;pt-BR&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Ásia&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;ru&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Азия&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;zh-CN&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;亚洲&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">&quot;country&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;geoname_id&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">1562822</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">uint3</span><span style="color:#D73A49;">2&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;iso_code&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">&quot;VN&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;names&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;de&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Vietnam&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;en&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Vietnam&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;es&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Vietnam&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;fr&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Vietnam&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;ja&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;ベトナム&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;pt-BR&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Vietnã&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;ru&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Вьетнам&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;zh-CN&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;越南&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">&quot;location&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;accuracy_radius&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">50</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">uint1</span><span style="color:#D73A49;">6&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;latitude&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">16.002300</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">doubl</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;longitude&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">105.999900</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">doubl</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;time_zone&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">&quot;Asia/Ho_Chi_Minh&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">&quot;registered_country&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;geoname_id&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">1562822</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">uint3</span><span style="color:#D73A49;">2&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;iso_code&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">&quot;VN&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;names&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;de&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Vietnam&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;en&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Vietnam&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;es&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Vietnam&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;fr&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Vietnam&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;ja&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;ベトナム&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;pt-BR&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Vietnã&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;ru&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;Вьетнам&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">&quot;zh-CN&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">&quot;越南&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">utf8_strin</span><span style="color:#24292E;">g</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span></code></pre></div>`,27),o=[e];function t(c,r,i,y,E,u){return n(),a("div",null,o)}const g=s(p,[["render",t]]);export{_ as __pageData,g as default};
