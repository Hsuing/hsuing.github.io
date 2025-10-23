import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const p="/assets/httpcache.zFA2tRm6.png",_=JSON.parse('{"title":"1. HTTP缓存控制/浏览器缓存控制","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/proxy/5-httpcache.md","filePath":"guide/Linux/web/nginx/proxy/5-httpcache.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/proxy/5-httpcache.md"},o=n('<h1 id="_1-http缓存控制-浏览器缓存控制" tabindex="-1">1. HTTP缓存控制/浏览器缓存控制 <a class="header-anchor" href="#_1-http缓存控制-浏览器缓存控制" aria-label="Permalink to &quot;1. HTTP缓存控制/浏览器缓存控制&quot;">​</a></h1><p><img src="'+p+`" alt="HTTP缓存控制/浏览器缓存控制"></p><blockquote><p>[!TIP]</p></blockquote><blockquote><p>浏览器的缓存，主要分为两种</p></blockquote><blockquote><p>强缓存 200 (from memory cache)和200 (from disk cache)</p></blockquote><blockquote><p>协商缓存 304 (Not Modified)</p></blockquote><h2 id="_1-2-强缓存" tabindex="-1">1.2 强缓存 <a class="header-anchor" href="#_1-2-强缓存" aria-label="Permalink to &quot;1.2 强缓存&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">如果启用了强缓存，请求资源时不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的network中看到请求返回的200状态码，并在状态码的后面跟着from disk cache 或者from memory cache关键字。两者的差别在于获取缓存的位置不一样。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">强缓存的控制头部是Cache-Control 和 Expires</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Cache-Control是 http1.1 时出现的header信息，主要是利用该字段的max-age值来进行判断，它是一个相对时间，例如Cache-Control:max-age=3600，代表着资源的有效期是3600秒。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Expires是http1.0的规范，它的值是一个绝对时间的GMT格式的时间字符串。比如 ：expires:Fri, 14 Apr 2017 10:47:02 GMT。这个时间代表这这个资源的失效时间，只要发送请求时间是在Expires之前，那么本地缓存始终有效，则在缓存中读取数据。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果同时出现Cache-Control:max-age和Expires，那么max-age优先级更高</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">如果启用了强缓存，请求资源时不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的network中看到请求返回的200状态码，并在状态码的后面跟着from disk cache 或者from memory cache关键字。两者的差别在于获取缓存的位置不一样。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">强缓存的控制头部是Cache-Control 和 Expires</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Cache-Control是 http1.1 时出现的header信息，主要是利用该字段的max-age值来进行判断，它是一个相对时间，例如Cache-Control:max-age=3600，代表着资源的有效期是3600秒。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Expires是http1.0的规范，它的值是一个绝对时间的GMT格式的时间字符串。比如 ：expires:Fri, 14 Apr 2017 10:47:02 GMT。这个时间代表这这个资源的失效时间，只要发送请求时间是在Expires之前，那么本地缓存始终有效，则在缓存中读取数据。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果同时出现Cache-Control:max-age和Expires，那么max-age优先级更高</span></span></code></pre></div><h2 id="_1-3-协商缓存" tabindex="-1">1.3 协商缓存 <a class="header-anchor" href="#_1-3-协商缓存" aria-label="Permalink to &quot;1.3 协商缓存&quot;">​</a></h2><p>协商缓存就是由服务器来确定缓存资源是否可用，所以客户端与服务器端要通过某种标识来进行通信，从而让服务器判断请求资源是否可以缓存访问，这主要涉及到下面两组header字段。这两组搭档都是成对出现的，即第一次请求的响应头带上某个字段（Last-Modified或者Etag），则后续请求则会带上对应的请求字段（If-Modified-Since或者If-None-Match），若响应头没有Last-Modified或者Etag字段，则请求头也不会有对应的字段。</p><p>通过这两组参数，如果符合，那么服务器就会返回304状态码并带上新的response header通知浏览器从缓存中读取资源</p><h3 id="_1-3-1-etag-if-none-match" tabindex="-1">1.3.1 ETag/If-None-Match <a class="header-anchor" href="#_1-3-1-etag-if-none-match" aria-label="Permalink to &quot;1.3.1 ETag/If-None-Match&quot;">​</a></h3><p>与Last-Modify/If-Modify-Since不同的是，Etag/If-None-Match返回的是一个校验码（Apache中，ETag的值，默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行Hash后得到的）。ETag可以保证每一个资源是唯一的，资源变化都会导致ETag变化。服务器根据浏览器上送的If-None-Match值来判断是否命中缓存。 与Last-Modified不一样的是，当服务器返回304 Not Modified的响应时，由于ETag重新生成过，response header中还会把这个ETag返回，即使这个ETag跟之前的没有变化</p><h3 id="_1-3-2-last-modify-if-modify-since" tabindex="-1">1.3.2 Last-Modify/If-Modify-Since <a class="header-anchor" href="#_1-3-2-last-modify-if-modify-since" aria-label="Permalink to &quot;1.3.2  Last-Modify/If-Modify-Since&quot;">​</a></h3><p>浏览器第一次请求一个资源的时候，服务器返回的header中会加上Last-Modify，Last-modify是一个时间标识该资源的最后修改时间，例如Last-Modify: Thu,31 Dec 2037 23:59:59 GMT。</p><p>当浏览器再次请求该资源时，request的请求头中会包含If-Modify-Since，该值为缓存之前返回的Last-Modify。服务器收到If-Modify-Since后，根据资源的最后修改时间判断是否命中缓存。</p><p>如果命中缓存，则返回304，并且不会返回资源内容，并且不会返回Last-Modify</p><p>Last-Modified与ETag是可以一起使用的，服务器会优先验证ETag，一致的情况下，才会继续比对Last-Modified，最后才决定是否返回304</p><h3 id="_1-3-3-为什么要有etag" tabindex="-1">1.3.3 为什么要有Etag <a class="header-anchor" href="#_1-3-3-为什么要有etag" aria-label="Permalink to &quot;1.3.3 为什么要有Etag&quot;">​</a></h3><p>使用Last-Modified已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要Etag呢？HTTP1.1中Etag的出现主要是为了解决几个Last-Modified比较难解决的问题</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新GET；</span></span>
<span class="line"><span style="color:#e1e4e8;">某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，If-Modified-Since能检查到的粒度是s级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；</span></span>
<span class="line"><span style="color:#e1e4e8;">某些服务器不能精确的得到文件的最后修改时间</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新GET；</span></span>
<span class="line"><span style="color:#24292e;">某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，If-Modified-Since能检查到的粒度是s级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；</span></span>
<span class="line"><span style="color:#24292e;">某些服务器不能精确的得到文件的最后修改时间</span></span></code></pre></div><p>如果什么缓存策略都没设置，没有Cache-Control也没有Expires，对于这种情况，浏览器会采用一个启发式的算法(LM-Factor)，通常会取响应头中的 Date 减去 Last-Modified 值的 10% （不同的浏览器可能不一样）作为缓存时间</p><h3 id="_1-3-4-cache-control" tabindex="-1">1.3.4 Cache-Control <a class="header-anchor" href="#_1-3-4-cache-control" aria-label="Permalink to &quot;1.3.4  Cache-Control&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf|js|css|html)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">            #禁止缓存，每次都从服务器请求</span></span>
<span class="line"><span style="color:#e1e4e8;">             #add_header Cache-Control no-store;</span></span>
<span class="line"><span style="color:#e1e4e8;">             #设置过期时间60秒，60秒过后向服务器重新请求数据</span></span>
<span class="line"><span style="color:#e1e4e8;">             add_header Cache-Control max-age=60;</span></span>
<span class="line"><span style="color:#e1e4e8;">           }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意：浏览器如果在过期时间内发现新的文件，不会使用缓存的数据，而是直接向服务器请求新的数据</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf|js|css|html)$ {</span></span>
<span class="line"><span style="color:#24292e;">            #禁止缓存，每次都从服务器请求</span></span>
<span class="line"><span style="color:#24292e;">             #add_header Cache-Control no-store;</span></span>
<span class="line"><span style="color:#24292e;">             #设置过期时间60秒，60秒过后向服务器重新请求数据</span></span>
<span class="line"><span style="color:#24292e;">             add_header Cache-Control max-age=60;</span></span>
<span class="line"><span style="color:#24292e;">           }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意：浏览器如果在过期时间内发现新的文件，不会使用缓存的数据，而是直接向服务器请求新的数据</span></span></code></pre></div><h3 id="_1-3-5expires" tabindex="-1">1.3.5expires <a class="header-anchor" href="#_1-3-5expires" aria-label="Permalink to &quot;1.3.5expires&quot;">​</a></h3><p>优先级比Cache-Control低</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf|js|css|html)?$</span></span>
<span class="line"><span style="color:#e1e4e8;">               {</span></span>
<span class="line"><span style="color:#e1e4e8;">               #设置缓存过期时间两分钟</span></span>
<span class="line"><span style="color:#e1e4e8;">                 expires 2m;</span></span>
<span class="line"><span style="color:#e1e4e8;">              # access_log off;</span></span>
<span class="line"><span style="color:#e1e4e8;">               }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf|js|css|html)?$</span></span>
<span class="line"><span style="color:#24292e;">               {</span></span>
<span class="line"><span style="color:#24292e;">               #设置缓存过期时间两分钟</span></span>
<span class="line"><span style="color:#24292e;">                 expires 2m;</span></span>
<span class="line"><span style="color:#24292e;">              # access_log off;</span></span>
<span class="line"><span style="color:#24292e;">               }</span></span></code></pre></div><ul><li>cdn</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(eot|svg|ttf|woff|jpg|jpeg|gif|png|ico|cur|gz|svgz|mp4|ogg|ogv|webm) {</span></span>
<span class="line"><span style="color:#e1e4e8;">		proxy_cache nginx-cache;</span></span>
<span class="line"><span style="color:#e1e4e8;">		proxy_cache_valid 200 304 302 5d;</span></span>
<span class="line"><span style="color:#e1e4e8;">		proxy_cache_key &#39;$host:$server_port$request_uri&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">		add_header X-Cache &#39;$upstream_cache_status from $host&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">		#所有静态文件直接读取硬盘</span></span>
<span class="line"><span style="color:#e1e4e8;">		root /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">		expires 30d; #缓存30天</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	location ~ .*\\.(js|css)?$</span></span>
<span class="line"><span style="color:#e1e4e8;">	{</span></span>
<span class="line"><span style="color:#e1e4e8;">		proxy_cache nginx-cache;</span></span>
<span class="line"><span style="color:#e1e4e8;">		proxy_cache_valid 200 304 302 5d;</span></span>
<span class="line"><span style="color:#e1e4e8;">		proxy_cache_key &#39;$host:$server_port$request_uri&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">		add_header X-Cache &#39;$upstream_cache_status from $host&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">		#所有静态文件直接读取硬盘</span></span>
<span class="line"><span style="color:#e1e4e8;">		root /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">		expires      12h;</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ .*\\.(eot|svg|ttf|woff|jpg|jpeg|gif|png|ico|cur|gz|svgz|mp4|ogg|ogv|webm) {</span></span>
<span class="line"><span style="color:#24292e;">		proxy_cache nginx-cache;</span></span>
<span class="line"><span style="color:#24292e;">		proxy_cache_valid 200 304 302 5d;</span></span>
<span class="line"><span style="color:#24292e;">		proxy_cache_key &#39;$host:$server_port$request_uri&#39;;</span></span>
<span class="line"><span style="color:#24292e;">		add_header X-Cache &#39;$upstream_cache_status from $host&#39;;</span></span>
<span class="line"><span style="color:#24292e;">		#所有静态文件直接读取硬盘</span></span>
<span class="line"><span style="color:#24292e;">		root /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#24292e;">		expires 30d; #缓存30天</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	location ~ .*\\.(js|css)?$</span></span>
<span class="line"><span style="color:#24292e;">	{</span></span>
<span class="line"><span style="color:#24292e;">		proxy_cache nginx-cache;</span></span>
<span class="line"><span style="color:#24292e;">		proxy_cache_valid 200 304 302 5d;</span></span>
<span class="line"><span style="color:#24292e;">		proxy_cache_key &#39;$host:$server_port$request_uri&#39;;</span></span>
<span class="line"><span style="color:#24292e;">		add_header X-Cache &#39;$upstream_cache_status from $host&#39;;</span></span>
<span class="line"><span style="color:#24292e;">		#所有静态文件直接读取硬盘</span></span>
<span class="line"><span style="color:#24292e;">		root /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#24292e;">		expires      12h;</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span></code></pre></div>`,29),t=[o];function c(i,r,h,d,y,g){return a(),e("div",null,t)}const u=s(l,[["render",c]]);export{_ as __pageData,u as default};
