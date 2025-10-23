import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"4.配置存储位置","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/harbor/harbor.md","filePath":"guide/container/harbor/harbor.md","lastUpdated":1723447064000}'),l={name:"guide/container/harbor/harbor.md"},p=e(`<h1 id="_4-配置存储位置" tabindex="-1">4.配置存储位置 <a class="header-anchor" href="#_4-配置存储位置" aria-label="Permalink to &quot;4.配置存储位置&quot;">​</a></h1><h1 id="_5-自定义证书" tabindex="-1">5.自定义证书 <a class="header-anchor" href="#_5-自定义证书" aria-label="Permalink to &quot;5.自定义证书&quot;">​</a></h1><p>参考，<a href="https://goharbor.io/docs/2.6.0/install-config/configure-https/" target="_blank" rel="noreferrer">https://goharbor.io/docs/2.6.0/install-config/configure-https/</a></p><ul><li>创建CA</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cd /data/docker/harbor/cert/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">openssl genrsa -out ca.key 4096</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">openssl req -x509 -new -nodes -sha512 -days 3650 \\</span></span>
<span class="line"><span style="color:#e1e4e8;"> -subj &quot;/C=CN/ST=Beijing/L=Beijing/O=DEVOPS/OU=DEVOPS/CN=hub.guoliangjun.com&quot; \\</span></span>
<span class="line"><span style="color:#e1e4e8;"> -key ca.key \\</span></span>
<span class="line"><span style="color:#e1e4e8;"> -out ca.crt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cd /data/docker/harbor/cert/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">openssl genrsa -out ca.key 4096</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">openssl req -x509 -new -nodes -sha512 -days 3650 \\</span></span>
<span class="line"><span style="color:#24292e;"> -subj &quot;/C=CN/ST=Beijing/L=Beijing/O=DEVOPS/OU=DEVOPS/CN=hub.guoliangjun.com&quot; \\</span></span>
<span class="line"><span style="color:#24292e;"> -key ca.key \\</span></span>
<span class="line"><span style="color:#24292e;"> -out ca.crt</span></span></code></pre></div><ul><li>创建证书请求文件csr</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">openssl genrsa -out yourdomain.com.key 4096</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">openssl req -sha512 -new \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -subj &quot;/C=CN/ST=Beijing/L=Beijing/O=DEVOPS/OU=DEVOPS/CN=hub.guoliangjun.com&quot; \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -key hub.guoliangjun.com.key \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -out hub.guoliangjun.com.csr</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">openssl genrsa -out yourdomain.com.key 4096</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">openssl req -sha512 -new \\</span></span>
<span class="line"><span style="color:#24292e;">    -subj &quot;/C=CN/ST=Beijing/L=Beijing/O=DEVOPS/OU=DEVOPS/CN=hub.guoliangjun.com&quot; \\</span></span>
<span class="line"><span style="color:#24292e;">    -key hub.guoliangjun.com.key \\</span></span>
<span class="line"><span style="color:#24292e;">    -out hub.guoliangjun.com.csr</span></span></code></pre></div><ul><li>创建证书</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat &gt; v3.ext &lt;&lt;-EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">authorityKeyIdentifier=keyid,issuer</span></span>
<span class="line"><span style="color:#e1e4e8;">basicConstraints=CA:FALSE</span></span>
<span class="line"><span style="color:#e1e4e8;">keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment</span></span>
<span class="line"><span style="color:#e1e4e8;">extendedKeyUsage = serverAuth</span></span>
<span class="line"><span style="color:#e1e4e8;">subjectAltName = @alt_names</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[alt_names]</span></span>
<span class="line"><span style="color:#e1e4e8;">DNS.1=hub.guoliangjun.com</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">openssl x509 -req -sha512 -days 3650 \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -extfile v3.ext \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -CA ca.crt -CAkey ca.key -CAcreateserial \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -in hub.guoliangjun.com.csr \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -out hub.guoliangjun.com.crt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat &gt; v3.ext &lt;&lt;-EOF</span></span>
<span class="line"><span style="color:#24292e;">authorityKeyIdentifier=keyid,issuer</span></span>
<span class="line"><span style="color:#24292e;">basicConstraints=CA:FALSE</span></span>
<span class="line"><span style="color:#24292e;">keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment</span></span>
<span class="line"><span style="color:#24292e;">extendedKeyUsage = serverAuth</span></span>
<span class="line"><span style="color:#24292e;">subjectAltName = @alt_names</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[alt_names]</span></span>
<span class="line"><span style="color:#24292e;">DNS.1=hub.guoliangjun.com</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">openssl x509 -req -sha512 -days 3650 \\</span></span>
<span class="line"><span style="color:#24292e;">    -extfile v3.ext \\</span></span>
<span class="line"><span style="color:#24292e;">    -CA ca.crt -CAkey ca.key -CAcreateserial \\</span></span>
<span class="line"><span style="color:#24292e;">    -in hub.guoliangjun.com.csr \\</span></span>
<span class="line"><span style="color:#24292e;">    -out hub.guoliangjun.com.crt</span></span></code></pre></div><h1 id="_6-harbor双主镜像同步" tabindex="-1">6.Harbor双主镜像同步 <a class="header-anchor" href="#_6-harbor双主镜像同步" aria-label="Permalink to &quot;6.Harbor双主镜像同步&quot;">​</a></h1><p><a href="https://www.feiyiblog.com/2021/05/22/Harbor%E5%8F%8C%E4%B8%BB%E5%A4%8D%E5%88%B6/" target="_blank" rel="noreferrer">https://www.feiyiblog.com/2021/05/22/Harbor双主复制/</a></p><h1 id="_7-harbor高可用" tabindex="-1">7.Harbor高可用 <a class="header-anchor" href="#_7-harbor高可用" aria-label="Permalink to &quot;7.Harbor高可用&quot;">​</a></h1><p><a href="https://www.iblog.zone/archives/%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA%E9%AB%98%E5%8F%AF%E7%94%A8harbor/" target="_blank" rel="noreferrer">https://www.iblog.zone/archives/生产环境搭建高可用harbor/</a></p><p><a href="https://www.yfzblog.cn/service/63.html" target="_blank" rel="noreferrer">https://www.yfzblog.cn/service/63.html</a></p><h1 id="_8-harbor备份" tabindex="-1">8.Harbor备份 <a class="header-anchor" href="#_8-harbor备份" aria-label="Permalink to &quot;8.Harbor备份&quot;">​</a></h1><p><a href="https://blog.51cto.com/lidabai/5275200" target="_blank" rel="noreferrer">https://blog.51cto.com/lidabai/5275200</a></p><h1 id="_9-反向代理" tabindex="-1">9.反向代理 <a class="header-anchor" href="#_9-反向代理" aria-label="Permalink to &quot;9.反向代理&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">client_max_body_size</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2000</span><span style="color:#9ECBFF;">m</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;">       </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">server_name</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">harbor.xxx</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">443</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ssl</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">ssl_certificate</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/nginx/ssl/xxx.crt</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">ssl_certificate_key</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/nginx/ssl/xxx.key</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">ssl_session_timeout</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#9ECBFF;">m</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">ssl_session_cache</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">shared:sslcache:20m</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://192.168.100.15</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx.conf</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">client_max_body_size</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2000</span><span style="color:#032F62;">m</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;">       </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;">  </span><span style="color:#032F62;">harbor.xxx</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">443</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ssl</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">ssl_certificate</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/nginx/ssl/xxx.crt</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">ssl_certificate_key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/nginx/ssl/xxx.key</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">ssl_session_timeout</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#032F62;">m</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">ssl_session_cache</span><span style="color:#24292E;">    </span><span style="color:#032F62;">shared:sslcache:20m</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://192.168.100.15</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div>`,18),o=[p];function c(t,r,i,y,E,h){return a(),n("div",null,o)}const g=s(l,[["render",c]]);export{d as __pageData,g as default};
