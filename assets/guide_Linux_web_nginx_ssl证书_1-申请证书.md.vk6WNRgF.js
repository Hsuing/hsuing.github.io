import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"查看修改 更新证书计划","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/ssl证书/1-申请证书.md","filePath":"guide/Linux/web/nginx/ssl证书/1-申请证书.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/ssl证书/1-申请证书.md"},p=n(`<p>acme.sh 实现了 acme 协议, 可以从 letsencrypt 生成免费的证书</p><h2 id="_1-安装-acme-sh" tabindex="-1">1. 安装 acme.sh <a class="header-anchor" href="#_1-安装-acme-sh" aria-label="Permalink to &quot;1. 安装 acme.sh&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl  https://get.acme.sh | sh</span></span>
<span class="line"><span style="color:#e1e4e8;">source ~/.bashrc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl  https://get.acme.sh | sh</span></span>
<span class="line"><span style="color:#24292e;">source ~/.bashrc</span></span></code></pre></div><p>普通用户和 root 用户都可以安装使用. 安装过程进行了以下几步: 把 acme.sh 安装到你的 home 目录下:~/.acme.sh/ 并创建 一个 bash 的 alias, 方便你的使用: acme.sh=~/.acme.sh/acme.sh</p><p>2). 自动为你创建 cronjob, 每天 0:00 点自动检测所有的证书, 如果快过期了, 需要更新, 则会自动更新证书. 更高级的安装选项请参考: <a href="https://github.com/Neilpang/acme.sh/wiki/How-to-install" target="_blank" rel="noreferrer">https://github.com/Neilpang/acme.sh/wiki/How-to-install</a> 安装过程不会污染已有的系统任何功能和文件, 所有的修改都限制在安装目录中: ~/.acme.sh/</p><h2 id="_2-生成泛域名证书" tabindex="-1">2. 生成泛域名证书 <a class="header-anchor" href="#_2-生成泛域名证书" aria-label="Permalink to &quot;2. 生成泛域名证书&quot;">​</a></h2><p>dns 方式的真正强大之处在于可以使用域名解析商提供的 api 自动添加 txt 记录完成验证. acme.sh 目前支持 cloudflare, dnspod, cloudxns, godaddy 以及 ovh 等数十种解析商的自动集成. 以 dnspod 为例, 你需要先登录到 dnspod 账号, 生成你的 api id 和 api key, 都是免费的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">export DP_Id=&quot;1234&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">export DP_Key=&quot;sADDsdasdgdsf&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">acme.sh --issue --dns dns_dp -d sundayle.com -d *.sundayle.com</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">export DP_Id=&quot;1234&quot;</span></span>
<span class="line"><span style="color:#24292e;">export DP_Key=&quot;sADDsdasdgdsf&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">acme.sh --issue --dns dns_dp -d sundayle.com -d *.sundayle.com</span></span></code></pre></div><h2 id="_3-copy-安装-证书" tabindex="-1">3. copy/安装 证书 <a class="header-anchor" href="#_3-copy-安装-证书" aria-label="Permalink to &quot;3. copy/安装 证书&quot;">​</a></h2><p>前面证书生成以后, 接下来需要把证书 copy 到真正需要用它的地方.</p><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>默认生成的证书都放在安装目录下: ~/.acme.sh/, 请不要直接使用此目录下的文件, 例如: 不要直接让 nginx/apache 的配置文件使用这下面的文件. 这里面的文件都是内部使用, 而且目录结构可能会变化.</p></div><h2 id="安装到nginx" tabindex="-1">安装到nginx <a class="header-anchor" href="#安装到nginx" aria-label="Permalink to &quot;安装到nginx&quot;">​</a></h2><p>正确的使用方法是使用 –installcert 命令,并指定目标位置, 然后证书文件会被copy到相应的位置, 例如:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mkdir /etc/nginx/ssl</span></span>
<span class="line"><span style="color:#e1e4e8;">acme.sh  --installcert  -d  sundayle.com   \\</span></span>
<span class="line"><span style="color:#e1e4e8;">        --key-file   /etc/nginx/ssl/sundayle.com.key \\</span></span>
<span class="line"><span style="color:#e1e4e8;">        --fullchain-file /etc/nginx/ssl/sundayle.com.cer \\</span></span>
<span class="line"><span style="color:#e1e4e8;">        --reloadcmd  &quot;/etc/init.d/nginx force-reload&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mkdir /etc/nginx/ssl</span></span>
<span class="line"><span style="color:#24292e;">acme.sh  --installcert  -d  sundayle.com   \\</span></span>
<span class="line"><span style="color:#24292e;">        --key-file   /etc/nginx/ssl/sundayle.com.key \\</span></span>
<span class="line"><span style="color:#24292e;">        --fullchain-file /etc/nginx/ssl/sundayle.com.cer \\</span></span>
<span class="line"><span style="color:#24292e;">        --reloadcmd  &quot;/etc/init.d/nginx force-reload&quot;</span></span></code></pre></div><p>必须是　force-reload</p><p>--installcert命令可以携带很多参数, 来指定目标文件. 并且可以指定 reloadcmd, 当证书更新以后, reloadcmd会被自动调用,让服务器生效.</p><h1 id="查看修改-更新证书计划" tabindex="-1">查看修改 更新证书计划 <a class="header-anchor" href="#查看修改-更新证书计划" aria-label="Permalink to &quot;查看修改 更新证书计划&quot;">​</a></h1><p>crontab -e</p><h1 id="nginx的配置" tabindex="-1">nginx的配置 <a class="header-anchor" href="#nginx的配置" aria-label="Permalink to &quot;nginx的配置&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 80端口直接转到443</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen      80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name    www.sundayle.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    return      301 https://$server_name$request_uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen       443 ssl http2;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name www.sundayle.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    root /www/sundayle.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    index index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate      /etc/nginx/ssl/sundayle.com.cer;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate_key  /etc/nginx/ssl/sundayle.com.key;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_session_cache    shared:SSL:10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_session_timeout  10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_ciphers  EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_prefer_server_ciphers  on;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_buffer_size 1400;</span></span>
<span class="line"><span style="color:#e1e4e8;">    add_header Strict-Transport-Security max-age=15768000;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_stapling on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_stapling_verify on;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 80端口直接转到443</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen      80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name    www.sundayle.com;</span></span>
<span class="line"><span style="color:#24292e;">    return      301 https://$server_name$request_uri;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen       443 ssl http2;</span></span>
<span class="line"><span style="color:#24292e;">    server_name www.sundayle.com;</span></span>
<span class="line"><span style="color:#24292e;">    root /www/sundayle.com;</span></span>
<span class="line"><span style="color:#24292e;">    index index.html;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    ssl on;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate      /etc/nginx/ssl/sundayle.com.cer;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate_key  /etc/nginx/ssl/sundayle.com.key;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_session_cache    shared:SSL:10m;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_session_timeout  10m;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_ciphers  EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_prefer_server_ciphers  on;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    ssl_buffer_size 1400;</span></span>
<span class="line"><span style="color:#24292e;">    add_header Strict-Transport-Security max-age=15768000;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_stapling on;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_stapling_verify on;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="刷新nginx服务" tabindex="-1">刷新nginx服务 <a class="header-anchor" href="#刷新nginx服务" aria-label="Permalink to &quot;刷新nginx服务&quot;">​</a></h2><p>service nginx reload</p><p>详细参数请参考: <a href="https://github.com/Neilpang/acme.sh#3-install-the-issued-cert-to-apachenginx-etc" target="_blank" rel="noreferrer">https://github.com/Neilpang/acme.sh#3-install-the-issued-cert-to-apachenginx-etc</a> 值得注意的是, 这里指定的所有参数都会被自动记录下来, 并在将来证书自动更新以后, 被再次自动调用.</p><h2 id="_4-更新证书" tabindex="-1">4. 更新证书 <a class="header-anchor" href="#_4-更新证书" aria-label="Permalink to &quot;4. 更新证书&quot;">​</a></h2><p>目前证书在 60 天以后会自动更新, 你无需任何操作. 今后有可能会缩短这个时间</p><h1 id="_5-更新-acme-sh" tabindex="-1">5. 更新 acme.sh <a class="header-anchor" href="#_5-更新-acme-sh" aria-label="Permalink to &quot;5. 更新 acme.sh&quot;">​</a></h1><p>目前由于 acme 协议和 letsencrypt CA 都在频繁的更新, 因此 acme.sh 也经常更新以保持同步.</p><p>升级 acme.sh 到最新版 :</p><p>acme.sh --upgrade 如果你不想手动升级, 可以开启自动升级:</p><p>acme.sh --upgrade --auto-upgrade 之后, acme.sh 就会自动保持更新了.</p><p>你也可以随时关闭自动更新:</p><p>acme.sh --upgrade --auto-upgrade 0</p><h1 id="_6-删除不用的证书" tabindex="-1">6. 删除不用的证书 <a class="header-anchor" href="#_6-删除不用的证书" aria-label="Permalink to &quot;6. 删除不用的证书&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">acme.sh --list </span></span>
<span class="line"><span style="color:#e1e4e8;">acme.sh  --remove  -d example.com</span></span>
<span class="line"><span style="color:#e1e4e8;">\`\`</span></span>
<span class="line"><span style="color:#e1e4e8;"># 7. 出错怎么办：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果出错, 请添加 debug log</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">acme.sh --list </span></span>
<span class="line"><span style="color:#24292e;">acme.sh  --remove  -d example.com</span></span>
<span class="line"><span style="color:#24292e;">\`\`</span></span>
<span class="line"><span style="color:#24292e;"># 7. 出错怎么办：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果出错, 请添加 debug log</span></span></code></pre></div><p>参考:</p><p><a href="https://github.com/Neilpang/acme.sh/wiki" target="_blank" rel="noreferrer">https://github.com/Neilpang/acme.sh/wiki</a><a href="https://github.com/Neilpang/acme.sh/blob/master/dnsapi/README.md" target="_blank" rel="noreferrer">https://github.com/Neilpang/acme.sh/blob/master/dnsapi/README.md</a> 英文高级配置：<a href="https://github.com/Neilpang/acme.sh" target="_blank" rel="noreferrer">https://github.com/Neilpang/acme.sh</a> 中文简单配置：<a href="https://github.com/Neilpang/acme.sh/wiki/%E8%AF%B4%E6%98%8E" target="_blank" rel="noreferrer">https://github.com/Neilpang/acme.sh/wiki/说明</a></p>`,36),c=[p];function o(t,i,r,d,h,y){return e(),a("div",null,c)}const g=s(l,[["render",o]]);export{u as __pageData,g as default};
