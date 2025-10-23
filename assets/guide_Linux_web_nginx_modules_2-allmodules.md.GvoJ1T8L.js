import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1.0 chunked_transfer_encoding","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/modules/2-allmodules.md","filePath":"guide/Linux/web/nginx/modules/2-allmodules.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/modules/2-allmodules.md"},l=a(`<h1 id="_1-0-chunked-transfer-encoding" tabindex="-1">1.0 chunked_transfer_encoding <a class="header-anchor" href="#_1-0-chunked-transfer-encoding" aria-label="Permalink to &quot;1.0 chunked_transfer_encoding&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">启用 GZip 所需的 HTTP 最低版本</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">默认值为 HTTP/1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">HTTP 运行在 TCP 连接之上，自然也有着跟 TCP 一样的三次握手、慢启动等特性。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">启用持久连接情况下，服务器发出响应后让 TCP连接继续打开着。同一对客户/服务器之间的后续请求和响应可以通过这个连接发送</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">为了尽可能的提高 HTTP 性能，使用持久连接就显得尤为重要了。</span></span>
<span class="line"><span style="color:#e1e4e8;">HTTP/1.1默认支持 TCP持久连接， HTTP/1.0 也可以通过显式指定 Connection:keep-alive来启用持久连接。对于 TCP持久连接上的 HTTP 报文，客户端需要一种机制来准确判断结束位置，而在 HTTP/1.0中，这种机制只有 Content-Length。而在 HTTP/1.1中新增的 Transfer-Encoding:chunked 所对应的分块传输机制可以完美解决这类问题。</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx同样有着配置 chunked的属性 chunked_transfer_encoding，这个属性是默认开启的。</span></span>
<span class="line"><span style="color:#e1e4e8;">Nginx在启用了 GZip的情况下，不会等文件 GZip 完成再返回响应，而是边压缩边响应，这样可以显著提高 TTFB( TimeToFirstByte，首字节时间，WEB 性能优化重要指标)。这样唯一的问题是， Nginx 开始返回响应时，它无法知道将要传输的文件最终有多大，也就是无法给出 Content-Length这个响应头部。</span></span>
<span class="line"><span style="color:#e1e4e8;">所以，在 HTTP1.0中如果利用 Nginx启用了 GZip，是无法获得 Content-Length的，这导致HTTP1.0中开启持久链接和使用 GZip只能二选一，所以在这里 gzip_http_version默认设置为 1.1。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">开启: chunked_transfer_encoding</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">    chunked_transfer_encoding on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    #这个必须是在gziphttpversion 1.1才能使用;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">启用 GZip 所需的 HTTP 最低版本</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">默认值为 HTTP/1.1</span></span>
<span class="line"><span style="color:#24292e;">HTTP 运行在 TCP 连接之上，自然也有着跟 TCP 一样的三次握手、慢启动等特性。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">启用持久连接情况下，服务器发出响应后让 TCP连接继续打开着。同一对客户/服务器之间的后续请求和响应可以通过这个连接发送</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">为了尽可能的提高 HTTP 性能，使用持久连接就显得尤为重要了。</span></span>
<span class="line"><span style="color:#24292e;">HTTP/1.1默认支持 TCP持久连接， HTTP/1.0 也可以通过显式指定 Connection:keep-alive来启用持久连接。对于 TCP持久连接上的 HTTP 报文，客户端需要一种机制来准确判断结束位置，而在 HTTP/1.0中，这种机制只有 Content-Length。而在 HTTP/1.1中新增的 Transfer-Encoding:chunked 所对应的分块传输机制可以完美解决这类问题。</span></span>
<span class="line"><span style="color:#24292e;">nginx同样有着配置 chunked的属性 chunked_transfer_encoding，这个属性是默认开启的。</span></span>
<span class="line"><span style="color:#24292e;">Nginx在启用了 GZip的情况下，不会等文件 GZip 完成再返回响应，而是边压缩边响应，这样可以显著提高 TTFB( TimeToFirstByte，首字节时间，WEB 性能优化重要指标)。这样唯一的问题是， Nginx 开始返回响应时，它无法知道将要传输的文件最终有多大，也就是无法给出 Content-Length这个响应头部。</span></span>
<span class="line"><span style="color:#24292e;">所以，在 HTTP1.0中如果利用 Nginx启用了 GZip，是无法获得 Content-Length的，这导致HTTP1.0中开启持久链接和使用 GZip只能二选一，所以在这里 gzip_http_version默认设置为 1.1。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">开启: chunked_transfer_encoding</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">    chunked_transfer_encoding on;</span></span>
<span class="line"><span style="color:#24292e;">    #这个必须是在gziphttpversion 1.1才能使用;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_2-0-ocsp-stapling" tabindex="-1">2.0 OCSP Stapling <a class="header-anchor" href="#_2-0-ocsp-stapling" aria-label="Permalink to &quot;2.0 OCSP Stapling&quot;">​</a></h1><p>在线证书状态协议（Online Certificate Status Protocol），简称 OCSP，是一个用于获取 X.509 数字证书撤销状态的网际协议，在 RFC 6960 中定义。OCSP 用于检验证书合法性，查询服务一般由证书所属 CA 提供。</p><p>OCSP 查询的本质，是一次完整的 HTTP 请求加响应的过程，这中间涵括的 DNS 查询、建立 TCP 连接、Web 端工作等步骤，都将耗费更多时间，使得建立 TLS 花费更多时长。</p><p>而这时，OCSP Stapling 出现了。经由 OCSP Stapling（OCSP 封套），Web 端将主动获取 OCSP 查询结果，并随证书一起发送给客户端，以此让客户端跳过自己去寻求验证的过程，提高 TLS 握手效率</p><h2 id="_2-1-生成-ssl-trusted-certificate-文件" tabindex="-1">2.1 生成 ssl_trusted_certificate 文件 <a class="header-anchor" href="#_2-1-生成-ssl-trusted-certificate-文件" aria-label="Permalink to &quot;2.1 生成 ssl_trusted_certificate 文件&quot;">​</a></h2><p>经过以下步骤生成所需的用于 ssl_trusted_certificate 的文件。</p><p>首先，需要准备三份证书文件：</p><ul><li>站点证书（website.pem）</li><li>中间证书（intermediate.pem）</li><li>根证书（root.pem）</li><li>中间证书和根证书，需要根据你的证书 CA 下载对应的证书。</li></ul><p>这里列出 Let’s Encrypt 的中间证书和根证书的下载地址：</p><p>中间证书：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Let’s Encrypt Authority X1 https://letsencrypt.org/certs/lets-encrypt-x1-cross-signed.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">Let’s Encrypt Authority X2 https://letsencrypt.org/certs/lets-encrypt-x2-cross-signed.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">Let’s Encrypt Authority X3 https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">Let’s Encrypt Authority X4 https://letsencrypt.org/certs/lets-encrypt-x4-cross-signed.pem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Let’s Encrypt Authority X1 https://letsencrypt.org/certs/lets-encrypt-x1-cross-signed.pem</span></span>
<span class="line"><span style="color:#24292e;">Let’s Encrypt Authority X2 https://letsencrypt.org/certs/lets-encrypt-x2-cross-signed.pem</span></span>
<span class="line"><span style="color:#24292e;">Let’s Encrypt Authority X3 https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem</span></span>
<span class="line"><span style="color:#24292e;">Let’s Encrypt Authority X4 https://letsencrypt.org/certs/lets-encrypt-x4-cross-signed.pem</span></span></code></pre></div><p>根证书：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">DST Root CA X3 https://ssl-tools.net/certificates/dac9024f54d8f6df94935fb1732638ca6ad77c13.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">ISRG Root X1 https://letsencrypt.org/certs/isrgrootx1.pem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">DST Root CA X3 https://ssl-tools.net/certificates/dac9024f54d8f6df94935fb1732638ca6ad77c13.pem</span></span>
<span class="line"><span style="color:#24292e;">ISRG Root X1 https://letsencrypt.org/certs/isrgrootx1.pem</span></span></code></pre></div><p>以 DST Root CA X3 根证书 + Let’s Encrypt Authority X3 中间证书 为例（现在 Let’s Encrypt 签发的证书基本都是这样的组合）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 下载中间证书和根证书</span></span>
<span class="line"><span style="color:#e1e4e8;">wget -O intermediate.pem https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">wget -O root.pem https://ssl-tools.net/certificates/dac9024f54d8f6df94935fb1732638ca6ad77c13.pem</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 生成 CA Bundle 验证文件</span></span>
<span class="line"><span style="color:#e1e4e8;"># 中间证书在上、根证书在下</span></span>
<span class="line"><span style="color:#e1e4e8;">cat  intermediate.pem &gt; bundle.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">cat root.pem &gt;&gt; bundle.pem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 下载中间证书和根证书</span></span>
<span class="line"><span style="color:#24292e;">wget -O intermediate.pem https://letsencrypt.org/certs/lets-encrypt-x3-cross-signed.pem</span></span>
<span class="line"><span style="color:#24292e;">wget -O root.pem https://ssl-tools.net/certificates/dac9024f54d8f6df94935fb1732638ca6ad77c13.pem</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 生成 CA Bundle 验证文件</span></span>
<span class="line"><span style="color:#24292e;"># 中间证书在上、根证书在下</span></span>
<span class="line"><span style="color:#24292e;">cat  intermediate.pem &gt; bundle.pem</span></span>
<span class="line"><span style="color:#24292e;">cat root.pem &gt;&gt; bundle.pem</span></span></code></pre></div><p>这样，生成的 bundle.pem 就是所需的 ssl_trusted_certificate 文件</p><h2 id="_2-2-启用-ocsp-stapling-特性" tabindex="-1">2.2 启用 OCSP Stapling 特性 <a class="header-anchor" href="#_2-2-启用-ocsp-stapling-特性" aria-label="Permalink to &quot;2.2 启用 OCSP Stapling 特性&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ssl_stapling on;</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_stapling_verify on;</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_trusted_certificate .../bundle.pem;</span></span>
<span class="line"><span style="color:#e1e4e8;">resolver 8.8.8.8 valid=600s ipv6=off;</span></span>
<span class="line"><span style="color:#e1e4e8;">resolver_timeout 5s;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ssl_stapling on;</span></span>
<span class="line"><span style="color:#24292e;">ssl_stapling_verify on;</span></span>
<span class="line"><span style="color:#24292e;">ssl_trusted_certificate .../bundle.pem;</span></span>
<span class="line"><span style="color:#24292e;">resolver 8.8.8.8 valid=600s ipv6=off;</span></span>
<span class="line"><span style="color:#24292e;">resolver_timeout 5s;</span></span></code></pre></div><h2 id="_2-3-检查-ocsp-stapling-状态" tabindex="-1">2.3 检查 OCSP Stapling 状态 <a class="header-anchor" href="#_2-3-检查-ocsp-stapling-状态" aria-label="Permalink to &quot;2.3 检查 OCSP Stapling 状态&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">echo QUIT | openssl s_client -connect www.digitalocean.com:443 -status 2&gt; /dev/null | grep -A 17 &#39;OCSP response:&#39; | grep -B 17 &#39;Next Update&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">或者</span></span>
<span class="line"><span style="color:#e1e4e8;">openssl s_client -connect sometimesnaive.org:443 -status -tlsextdebug &lt; /dev/null 2&gt;&amp;1 | grep -i &quot;OCSP response&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">若站点已成功启用 OCSP Stapling，会返回以下：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">OCSP response:</span></span>
<span class="line"><span style="color:#e1e4e8;">OCSP Response Data:</span></span>
<span class="line"><span style="color:#e1e4e8;">    OCSP Response Status: successful (0x0)</span></span>
<span class="line"><span style="color:#e1e4e8;">    Response Type: Basic OCSP Response</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">若返回这个，明显就是失败了：</span></span>
<span class="line"><span style="color:#e1e4e8;">OCSP response: no response sent</span></span>
<span class="line"><span style="color:#e1e4e8;">也可以访问 ssllabs 进行 SSL 测试，其中也能看到 OCSP Stapling 开启与否的报告。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">echo QUIT | openssl s_client -connect www.digitalocean.com:443 -status 2&gt; /dev/null | grep -A 17 &#39;OCSP response:&#39; | grep -B 17 &#39;Next Update&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">或者</span></span>
<span class="line"><span style="color:#24292e;">openssl s_client -connect sometimesnaive.org:443 -status -tlsextdebug &lt; /dev/null 2&gt;&amp;1 | grep -i &quot;OCSP response&quot;</span></span>
<span class="line"><span style="color:#24292e;">若站点已成功启用 OCSP Stapling，会返回以下：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">OCSP response:</span></span>
<span class="line"><span style="color:#24292e;">OCSP Response Data:</span></span>
<span class="line"><span style="color:#24292e;">    OCSP Response Status: successful (0x0)</span></span>
<span class="line"><span style="color:#24292e;">    Response Type: Basic OCSP Response</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">若返回这个，明显就是失败了：</span></span>
<span class="line"><span style="color:#24292e;">OCSP response: no response sent</span></span>
<span class="line"><span style="color:#24292e;">也可以访问 ssllabs 进行 SSL 测试，其中也能看到 OCSP Stapling 开启与否的报告。</span></span></code></pre></div><p>openssl dhparam -out dhparam.pem 4096</p><h1 id="_3-0-with-debug" tabindex="-1">3.0 --with-debug <a class="header-anchor" href="#_3-0-with-debug" aria-label="Permalink to &quot;3.0 --with-debug&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">events {</span></span>
<span class="line"><span style="color:#e1e4e8;">        debug_connection  172.31.50.48/20;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@pcweb vhost]# nginx -t</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx: [warn] low address bits of 172.31.50.48/20 are meaningless in /data/apps/nginx/conf/nginx.conf:13</span></span>
<span class="line"><span style="color:#e1e4e8;">段错误</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">events {</span></span>
<span class="line"><span style="color:#24292e;">        debug_connection  172.31.50.48/20;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@pcweb vhost]# nginx -t</span></span>
<span class="line"><span style="color:#24292e;">nginx: [warn] low address bits of 172.31.50.48/20 are meaningless in /data/apps/nginx/conf/nginx.conf:13</span></span>
<span class="line"><span style="color:#24292e;">段错误</span></span></code></pre></div><h2 id="coredump" tabindex="-1">coredump <a class="header-anchor" href="#coredump" aria-label="Permalink to &quot;coredump&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mkdir /corefile     # 先建目录，还要确认nginx用户可以写此目录</span></span>
<span class="line"><span style="color:#e1e4e8;"> echo &quot;/corefile/core-%e-%p-%h-%t&quot; &gt; /proc/sys/kernel/core_pattern</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#调试</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost corefile]# gdb nginx core-nginx-14505-localhost.localdomain-1579140475</span></span>
<span class="line"><span style="color:#e1e4e8;">warning: Loadable section &quot;.note.gnu.property&quot; outside of ELF segments</span></span>
<span class="line"><span style="color:#e1e4e8;">Core was generated by \`nginx -t&#39;.</span></span>
<span class="line"><span style="color:#e1e4e8;">Program terminated with signal SIGSEGV, Segmentation fault.</span></span>
<span class="line"><span style="color:#e1e4e8;">#0  0x000000000069d6f2 in CRYPTO_THREAD_write_lock ()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">bt </span></span>
<span class="line"><span style="color:#e1e4e8;">run</span></span>
<span class="line"><span style="color:#e1e4e8;">file</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mkdir /corefile     # 先建目录，还要确认nginx用户可以写此目录</span></span>
<span class="line"><span style="color:#24292e;"> echo &quot;/corefile/core-%e-%p-%h-%t&quot; &gt; /proc/sys/kernel/core_pattern</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#调试</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost corefile]# gdb nginx core-nginx-14505-localhost.localdomain-1579140475</span></span>
<span class="line"><span style="color:#24292e;">warning: Loadable section &quot;.note.gnu.property&quot; outside of ELF segments</span></span>
<span class="line"><span style="color:#24292e;">Core was generated by \`nginx -t&#39;.</span></span>
<span class="line"><span style="color:#24292e;">Program terminated with signal SIGSEGV, Segmentation fault.</span></span>
<span class="line"><span style="color:#24292e;">#0  0x000000000069d6f2 in CRYPTO_THREAD_write_lock ()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">bt </span></span>
<span class="line"><span style="color:#24292e;">run</span></span>
<span class="line"><span style="color:#24292e;">file</span></span></code></pre></div>`,27),t=[l];function o(c,i,r,d,y,g){return n(),e("div",null,t)}const m=s(p,[["render",o]]);export{u as __pageData,m as default};
