import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const l="/assets/hxYBiW-20211010013644.JF0X6HJf.jpg",_=JSON.parse('{"title":"基于 S3 + Nginx","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/22-s3.md","filePath":"guide/Linux/web/nginx/22-s3.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/22-s3.md"},o=e(`<h1 id="基于-s3-nginx" tabindex="-1">基于 S3 + Nginx <a class="header-anchor" href="#基于-s3-nginx" aria-label="Permalink to &quot;基于 S3 + Nginx&quot;">​</a></h1><ul><li>nginx</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 最多缓存 1000M, 缓存时间 30天</span></span>
<span class="line"><span style="color:#e1e4e8;">  proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=s3_cache:100m max_size=1000m inactive=30d;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 443;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name your_domain; # 替换成你自己的域名</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # s3 资源反向代理</span></span>
<span class="line"><span style="color:#e1e4e8;">    location ~ ^/resource/(.+)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_hide_header      x-amz-id-2;</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_hide_header      x-amz-request-id;</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_hide_header      x-amz-meta-server-side-encryption;</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_hide_header      x-amz-server-side-encryption;</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_hide_header      Set-Cookie;</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_ignore_headers   Set-Cookie;</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_set_header       Connection &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_set_header       Authorization &#39;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_set_header       Host your_bucket_name.s3.eu-west-2.amazonaws.com;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_cache            s3_cache;</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 如果源站响应状态码大于 300, 则返回 nginx 自己的错误页面，避免泄露源站信息</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_intercept_errors on;</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_cache_revalidate on;</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_cache_use_stale  error timeout updating http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_cache_lock       on;</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 状态码为 200 则缓存 30 天</span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_cache_valid      200 30d;</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 用户浏览器缓存 365 天</span></span>
<span class="line"><span style="color:#e1e4e8;">      add_header             Cache-Control max-age=31536000;</span></span>
<span class="line"><span style="color:#e1e4e8;">      # Cloudflare 缓存 365 天</span></span>
<span class="line"><span style="color:#e1e4e8;">      add_header             Cloudflare-CDN-Cache-Control max-age=31536000;</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 所有其他 CDN 缓存 365 天</span></span>
<span class="line"><span style="color:#e1e4e8;">      add_header             CDN-Cache-Control max-age=31536000;</span></span>
<span class="line"><span style="color:#e1e4e8;">      add_header             X-Cache-Status $upstream_cache_status;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_pass https://your_bucket_name.s3.eu-west-2.amazonaws.com/$1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">  # 最多缓存 1000M, 缓存时间 30天</span></span>
<span class="line"><span style="color:#24292e;">  proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=s3_cache:100m max_size=1000m inactive=30d;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 443;</span></span>
<span class="line"><span style="color:#24292e;">    server_name your_domain; # 替换成你自己的域名</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # s3 资源反向代理</span></span>
<span class="line"><span style="color:#24292e;">    location ~ ^/resource/(.+)$ {</span></span>
<span class="line"><span style="color:#24292e;">      proxy_hide_header      x-amz-id-2;</span></span>
<span class="line"><span style="color:#24292e;">      proxy_hide_header      x-amz-request-id;</span></span>
<span class="line"><span style="color:#24292e;">      proxy_hide_header      x-amz-meta-server-side-encryption;</span></span>
<span class="line"><span style="color:#24292e;">      proxy_hide_header      x-amz-server-side-encryption;</span></span>
<span class="line"><span style="color:#24292e;">      proxy_hide_header      Set-Cookie;</span></span>
<span class="line"><span style="color:#24292e;">      proxy_ignore_headers   Set-Cookie;</span></span>
<span class="line"><span style="color:#24292e;">      proxy_set_header       Connection &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">      proxy_set_header       Authorization &#39;&#39;;</span></span>
<span class="line"><span style="color:#24292e;">      proxy_set_header       Host your_bucket_name.s3.eu-west-2.amazonaws.com;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      proxy_cache            s3_cache;</span></span>
<span class="line"><span style="color:#24292e;">      # 如果源站响应状态码大于 300, 则返回 nginx 自己的错误页面，避免泄露源站信息</span></span>
<span class="line"><span style="color:#24292e;">      proxy_intercept_errors on;</span></span>
<span class="line"><span style="color:#24292e;">      proxy_cache_revalidate on;</span></span>
<span class="line"><span style="color:#24292e;">      proxy_cache_use_stale  error timeout updating http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span style="color:#24292e;">      proxy_cache_lock       on;</span></span>
<span class="line"><span style="color:#24292e;">      # 状态码为 200 则缓存 30 天</span></span>
<span class="line"><span style="color:#24292e;">      proxy_cache_valid      200 30d;</span></span>
<span class="line"><span style="color:#24292e;">      # 用户浏览器缓存 365 天</span></span>
<span class="line"><span style="color:#24292e;">      add_header             Cache-Control max-age=31536000;</span></span>
<span class="line"><span style="color:#24292e;">      # Cloudflare 缓存 365 天</span></span>
<span class="line"><span style="color:#24292e;">      add_header             Cloudflare-CDN-Cache-Control max-age=31536000;</span></span>
<span class="line"><span style="color:#24292e;">      # 所有其他 CDN 缓存 365 天</span></span>
<span class="line"><span style="color:#24292e;">      add_header             CDN-Cache-Control max-age=31536000;</span></span>
<span class="line"><span style="color:#24292e;">      add_header             X-Cache-Status $upstream_cache_status;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      proxy_pass https://your_bucket_name.s3.eu-west-2.amazonaws.com/$1;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="安全问题" tabindex="-1">安全问题 <a class="header-anchor" href="#安全问题" aria-label="Permalink to &quot;安全问题&quot;">​</a></h2><p>使用 S3 这种服务，流量通常都是按量付费的，如果你不想一觉醒来收到天价账单，就需要做一些防止刷流量的措施，防范于未然，常用的措施有以下几种：</p><ul><li>防盗链，就是只允许指定的网站访问你的文件，避免被滥用产生天价流量费，一般 CDN 都支持防盗链配置</li><li>防止绕过缓存，你需要避免源站 IP 和 S3 相关配置泄露，比如 Bucket 和 Endpoint，避免攻击者绕过缓存恶意刷流量，必要时你可以在 S3 控制台配置安全策略，只允许你自己的服务器 IP 访问</li></ul><h2 id="s3-安全配置" tabindex="-1">S3 安全配置 <a class="header-anchor" href="#s3-安全配置" aria-label="Permalink to &quot;S3 安全配置&quot;">​</a></h2><p>默认情况下如果别人知道了你的 Bucket 名称和 Endpoint 地址是可以直接绕过 CDN 直接访问 S3 源站的，这样就有被刷流量的风险，我们可以使用 S3 的存储桶策略来增强安全性</p><p>具体配置路径是：进入 S3 控制台 -&gt; 选择 Bucket -&gt; 点击 权限 Tab -&gt; 下拉找到 存储桶策略</p><p><img src="`+l+`" alt="s3-console-policy"></p><p>可以将 aws:Referer 设置成一个随机生成的字符串，这样后续访问 S3 如果没有携带这个 Referer 值就会被 S3 拦截</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;Version&quot;: &quot;2012-10-17&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;Id&quot;: &quot;Policy1633794210209&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;Statement&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;Sid&quot;: &quot;只允许指定的 Referer 访问公共资源&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;Effect&quot;: &quot;Deny&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;Principal&quot;: &quot;*&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;Action&quot;: &quot;s3:GetObject&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;Resource&quot;: [&quot;arn:aws:s3:::your_bucket/dir1/*&quot;, &quot;arn:aws:s3:::your_bucket/dir2/*&quot;],</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;Condition&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;StringNotEquals&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;aws:Referer&quot;: &quot;替换成任意字符串,你可以随机生成一个ID放在这里&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  &quot;Version&quot;: &quot;2012-10-17&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;Id&quot;: &quot;Policy1633794210209&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;Statement&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      &quot;Sid&quot;: &quot;只允许指定的 Referer 访问公共资源&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;Effect&quot;: &quot;Deny&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;Principal&quot;: &quot;*&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;Action&quot;: &quot;s3:GetObject&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;Resource&quot;: [&quot;arn:aws:s3:::your_bucket/dir1/*&quot;, &quot;arn:aws:s3:::your_bucket/dir2/*&quot;],</span></span>
<span class="line"><span style="color:#24292e;">      &quot;Condition&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;StringNotEquals&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">          &quot;aws:Referer&quot;: &quot;替换成任意字符串,你可以随机生成一个ID放在这里&quot;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>上面的 Resource 请替换成你自己的 Bucket 名称和目录</p><p>S3 安全策略配置完成后，需要在 Nginx 反向代理配置中用 proxy_set_header 指令加上 Referer 请求头，这样只有通过你的 Nginx 服务器才能访问 S3 的公共资源</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ ^/resource/(.+)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">      ...</span></span>
<span class="line"><span style="color:#e1e4e8;">      </span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_set_header Referer &quot;替换成S3存储桶策略里填写的 Referer 值&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">      </span></span>
<span class="line"><span style="color:#e1e4e8;">      ...</span></span>
<span class="line"><span style="color:#e1e4e8;">      </span></span>
<span class="line"><span style="color:#e1e4e8;">      proxy_pass https://your_bucket_name.s3.eu-west-2.amazonaws.com/$1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ ^/resource/(.+)$ {</span></span>
<span class="line"><span style="color:#24292e;">      ...</span></span>
<span class="line"><span style="color:#24292e;">      </span></span>
<span class="line"><span style="color:#24292e;">      proxy_set_header Referer &quot;替换成S3存储桶策略里填写的 Referer 值&quot;;</span></span>
<span class="line"><span style="color:#24292e;">      </span></span>
<span class="line"><span style="color:#24292e;">      ...</span></span>
<span class="line"><span style="color:#24292e;">      </span></span>
<span class="line"><span style="color:#24292e;">      proxy_pass https://your_bucket_name.s3.eu-west-2.amazonaws.com/$1;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><p>相关链接</p><ul><li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html#example-bucket-policies-use-case-4" target="_blank" rel="noreferrer">Restricting access to a specific HTTP referer</a></li><li><a href="https://zelark.github.io/nano-id-cc/" target="_blank" rel="noreferrer">使用 Nano ID 生成随机字符串</a></li></ul><h1 id="cloudflare" tabindex="-1">Cloudflare <a class="header-anchor" href="#cloudflare" aria-label="Permalink to &quot;Cloudflare&quot;">​</a></h1><p>Cloudflare 接连推出 <a href="https://blog.cloudflare.com/announcing-cloudflare-images/" target="_blank" rel="noreferrer">Cloudflare Images</a> 和 <a href="https://blog.cloudflare.com/introducing-r2-object-storage/" target="_blank" rel="noreferrer">Cloudflare R2 Storage</a>这两个服务，如果你是 Cloudflare 重度用户，可以研究下这两个服务，官方说法是相比传统方案它可以消除数据在不同服务商之间流转造成的大量流量出口费用</p><p><img src="https://gitee.com/freehan/imgs/raw/master/imgs/F0tFGP-20211008165056.jpg" alt="cloudflare-r2-vs-s3"></p><ul><li><a href="https://blog.sentry.io/2017/03/01/dodging-s3-downtime-with-nginx-and-haproxy" target="_blank" rel="noreferrer">Dodging S3 Downtime With Nginx and HAProxy</a></li><li><a href="https://serverfault.com/questions/583570/understanding-the-nginx-proxy-cache-path-directive/641572#641572" target="_blank" rel="noreferrer">Understanding the nginx proxy_cache_path directive</a></li></ul><h1 id="跨域" tabindex="-1">跨域 <a class="header-anchor" href="#跨域" aria-label="Permalink to &quot;跨域&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;AllowedHeaders&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;*&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;AllowedMethods&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;PUT&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;POST&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;DELETE&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;AllowedOrigins&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;*&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;ExposeHeaders&quot;: []</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;AllowedHeaders&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;*&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;AllowedMethods&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;PUT&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;POST&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;DELETE&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;AllowedOrigins&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;*&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;ExposeHeaders&quot;: []</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;AllowedHeaders&quot;: [],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;AllowedMethods&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;GET&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;AllowedOrigins&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;*&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;ExposeHeaders&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;x-amz-server-side-encryption&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;x-amz-request-id&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;x-amz-id-2&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;MaxAgeSeconds&quot;: 3000</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;AllowedHeaders&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">            &quot;*&quot;</span></span>
<span class="line"><span style="color:#24292e;">        ],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;AllowedMethods&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">            &quot;PUT&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;POST&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;DELETE&quot;</span></span>
<span class="line"><span style="color:#24292e;">        ],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;AllowedOrigins&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">            &quot;*&quot;</span></span>
<span class="line"><span style="color:#24292e;">        ],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;ExposeHeaders&quot;: []</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;AllowedHeaders&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">            &quot;*&quot;</span></span>
<span class="line"><span style="color:#24292e;">        ],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;AllowedMethods&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">            &quot;PUT&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;POST&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;DELETE&quot;</span></span>
<span class="line"><span style="color:#24292e;">        ],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;AllowedOrigins&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">            &quot;*&quot;</span></span>
<span class="line"><span style="color:#24292e;">        ],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;ExposeHeaders&quot;: []</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;AllowedHeaders&quot;: [],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;AllowedMethods&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">            &quot;GET&quot;</span></span>
<span class="line"><span style="color:#24292e;">        ],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;AllowedOrigins&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">            &quot;*&quot;</span></span>
<span class="line"><span style="color:#24292e;">        ],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;ExposeHeaders&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">            &quot;x-amz-server-side-encryption&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;x-amz-request-id&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;x-amz-id-2&quot;</span></span>
<span class="line"><span style="color:#24292e;">        ],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;MaxAgeSeconds&quot;: 3000</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">]</span></span></code></pre></div>`,23),t=[o];function c(r,i,u,y,d,q){return n(),a("div",null,t)}const x=s(p,[["render",c]]);export{_ as __pageData,x as default};
