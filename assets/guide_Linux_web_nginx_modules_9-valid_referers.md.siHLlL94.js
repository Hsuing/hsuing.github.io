import{_ as e,o as s,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/modules/9-valid_referers.md","filePath":"guide/Linux/web/nginx/modules/9-valid_referers.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/modules/9-valid_referers.md"},p=n(`<p>官方文档，</p><p><a href="http://nginx.org/en/docs/http/ngx_http_referer_module.html#valid_referers" target="_blank" rel="noreferrer">http://nginx.org/en/docs/http/ngx_http_referer_module.html#valid_referers</a></p><h2 id="防盗链设置" tabindex="-1">防盗链设置 <a class="header-anchor" href="#防盗链设置" aria-label="Permalink to &quot;防盗链设置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">valid_referers none server_names *.test1.com ~\\.test2\\.;</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($invalid_referer){</span></span>
<span class="line"><span style="color:#e1e4e8;">    rewrite ^/ http://ojt4b2cr5.bkt.clouddn.com/blog/20171028/214345352.png;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">valid_referers none server_names *.test1.com ~\\.test2\\.;</span></span>
<span class="line"><span style="color:#24292e;">if ($invalid_referer){</span></span>
<span class="line"><span style="color:#24292e;">    rewrite ^/ http://ojt4b2cr5.bkt.clouddn.com/blog/20171028/214345352.png;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li><strong>none</strong> 代表请求的 refer 为空，也就是直接访问，比如在浏览器中直接访问图片 <code>www.vcmq.com/test1.png</code>，直接访问时，refer 会为空。</li><li><strong>blocked</strong> refer 来源不为空，但是里面的值被代理或者防火墙删除了</li><li><strong>server_names</strong> refer 来源包含当前的 <code>server_names</code> 即 <code>location</code> 的父节点 <code>server</code> 节点的 <code>server_name</code> 的值。</li><li><strong>字符串</strong> 定义服务器名称，比如 <code>*.test1.com</code>，配置后，来源是从 <code>test1.com</code> 就会被认为是合法的请求。</li><li><strong>正则表达式</strong> 匹配合法请求来源， 如 <code>~\\.test2\\.</code></li></ul><p>当请求的 <code>refer</code> 是合法的，即可以被后面任一参数所匹配， <code>$invalid_referer</code> 的值为0， 若不匹配则值为 1， 进入 <code>if</code> 的代码中。我这里的设置是，如果是不合法的请求，就统一返回一张图片，也可以直接返回 <code>403</code></p><h3 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">valid_referers *.jingpincart.com  ~\\.google\\. ~\\.baidu\\.;</span></span>
<span class="line"><span style="color:#e1e4e8;">	   if ($invalid_referer) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    		#rewrite ^/ https://www.jingpincart.com/imgs/c91b537ae2dcdabca9bab58fc3807f74259.jpg;</span></span>
<span class="line"><span style="color:#e1e4e8;">    		return 404;</span></span>
<span class="line"><span style="color:#e1e4e8;">    	  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">valid_referers *.jingpincart.com  ~\\.google\\. ~\\.baidu\\.;</span></span>
<span class="line"><span style="color:#24292e;">	   if ($invalid_referer) {</span></span>
<span class="line"><span style="color:#24292e;">    		#rewrite ^/ https://www.jingpincart.com/imgs/c91b537ae2dcdabca9bab58fc3807f74259.jpg;</span></span>
<span class="line"><span style="color:#24292e;">    		return 404;</span></span>
<span class="line"><span style="color:#24292e;">    	  }</span></span></code></pre></div><h2 id="另一种方式" tabindex="-1">另一种方式 <a class="header-anchor" href="#另一种方式" aria-label="Permalink to &quot;另一种方式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">map $http_referer $ifmyreferer {</span></span>
<span class="line"><span style="color:#e1e4e8;">        hostnames;</span></span>
<span class="line"><span style="color:#e1e4e8;">        *.example.com 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">        example.com 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">        .example.cn 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">        default 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    log_format  main  &#39;$clientip - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                      &#39;&quot;$http_user_agent&quot; &quot;$request_time&quot; &quot;$ifmyreferer&quot;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">map $http_referer $ifmyreferer {</span></span>
<span class="line"><span style="color:#24292e;">        hostnames;</span></span>
<span class="line"><span style="color:#24292e;">        *.example.com 1;</span></span>
<span class="line"><span style="color:#24292e;">        example.com 1;</span></span>
<span class="line"><span style="color:#24292e;">        .example.cn 1;</span></span>
<span class="line"><span style="color:#24292e;">        default 0;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    log_format  main  &#39;$clientip - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#24292e;">                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#24292e;">                      &#39;&quot;$http_user_agent&quot; &quot;$request_time&quot; &quot;$ifmyreferer&quot;&#39;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><blockquote><p>*.example.com 1; example.com 1;</p><p>可以合并为，.example.com 1;</p></blockquote><ul><li>server</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">        location ~* \\.(jpg|jpeg|png|gif|ico)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">            if ($ifmyreferer = 0) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                return 404;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">        location ~* \\.(jpg|jpeg|png|gif|ico)$ {</span></span>
<span class="line"><span style="color:#24292e;">            if ($ifmyreferer = 0) {</span></span>
<span class="line"><span style="color:#24292e;">                return 404;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span></code></pre></div><ul><li>测试</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># curl -H &#39;referer:www.example.com&#39; 10.2.1.105/xx.jpg</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># curl -H &#39;referer:www.baidu.com&#39; 10.2.1.105/xx.jpg</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># curl -H &#39;referer:www.example.com&#39; 10.2.1.105/xx.jpg</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># curl -H &#39;referer:www.baidu.com&#39; 10.2.1.105/xx.jpg</span></span></code></pre></div>`,15),o=[p];function t(r,c,i,d,u,g){return s(),a("div",null,o)}const h=e(l,[["render",t]]);export{y as __pageData,h as default};
