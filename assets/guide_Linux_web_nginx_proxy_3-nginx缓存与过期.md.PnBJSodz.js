import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/proxy/3-nginx缓存与过期.md","filePath":"guide/Linux/web/nginx/proxy/3-nginx缓存与过期.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/proxy/3-nginx缓存与过期.md"},p=n(`<h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h1><p>nginx 缓存能够让网页打开速度享受质的飞跃。 当我们第一次访问一个页面时 将下载的css,js,html已经img等相关资源保存在本地。 在第二次，第三次…访问时，就可以不用去下载文件了。</p><p>通常来说，设置文件的缓存有两种方式，</p><ul><li>一种是在服务器内设置响应头文件</li><li>一个是使用h5的manifest文件来进行相关设置</li></ul><h2 id="服务器的缓存协商" tabindex="-1">服务器的缓存协商 <a class="header-anchor" href="#服务器的缓存协商" aria-label="Permalink to &quot;服务器的缓存协商&quot;">​</a></h2><p>这种方式设置的缓存有两种，一种是需要服务器验证，另外一种是不用发送请求验证</p><h2 id="etag-last-modified" tabindex="-1">ETag/Last-Modified <a class="header-anchor" href="#etag-last-modified" aria-label="Permalink to &quot;ETag/Last-Modified&quot;">​</a></h2><p>这两种方式做法类似，都要向服务器发送一次请求进行验证。简直，缓存就缓存呗，为什么还要验证呢？</p><p>其实，这是该协议的一种特有方式，发送一次验证主要是检查文件是否发生变化</p><h3 id="etag" tabindex="-1">ETag <a class="header-anchor" href="#etag" aria-label="Permalink to &quot;ETag&quot;">​</a></h3><p>ETag是用来计算文件的内容是否发生变化，比如，你在文件中删除一个空格，这样都算文件内容发生变化。 通常做法是用md5或者SHA1算法，计算出文件的唯一值。 在前端其实都可以完成， 找到一个文件文件解析的md5算法，然后将文件传入，就可以得到ETag的值。 不过这里，我们着重点并不是让你生成Etag，而是看看ETag在缓存中的重要作用。 ETag是HTTP/1.1A的一种办法，由Web服务器生成，并写入响应头中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//response Headers</span></span>
<span class="line"><span style="color:#e1e4e8;">ETag:&quot;751F63A30AB5F98F855D1D90D217B356&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//response Headers</span></span>
<span class="line"><span style="color:#24292e;">ETag:&quot;751F63A30AB5F98F855D1D90D217B356&quot;</span></span></code></pre></div><p>接着，到了浏览器之后，便缓存在本地。 当下次打开同样的文章时，会在请求头中发送If-None-Match, 给服务器检查文件是否发生变化。如果没有，则告诉浏览器使用本地的，否则返回新文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//request Headers</span></span>
<span class="line"><span style="color:#e1e4e8;">If-None-Match: &quot;751F63A30AB5F98F855D1D90D217B356&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//request Headers</span></span>
<span class="line"><span style="color:#24292e;">If-None-Match: &quot;751F63A30AB5F98F855D1D90D217B356&quot;</span></span></code></pre></div><p>通常情况下，服务器默认是打开Etag的，但是为了防止你的同事，或者后台哥哥的后台配置文件不正确，关闭了Etag，这时候，就需要你对对配置文件做一些设置。 这里我以Nginx为例: 打开ngnix.conf文件，检查是否有以下语句:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">etag off;</span></span>
<span class="line"><span style="color:#e1e4e8;">more_set_headers -s 404 -t &#39;ETag&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">more_clear_headers &#39;Etag&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">etag off;</span></span>
<span class="line"><span style="color:#24292e;">more_set_headers -s 404 -t &#39;ETag&#39;;</span></span>
<span class="line"><span style="color:#24292e;">more_clear_headers &#39;Etag&#39;;</span></span></code></pre></div><p>Etag打开之后会增加服务器的负载，造成性能的局限性，所以，关闭或者打开Etag都要经过权衡</p><h3 id="last-modified" tabindex="-1">Last-Modified <a class="header-anchor" href="#last-modified" aria-label="Permalink to &quot;Last-Modified&quot;">​</a></h3><p>Last-Modified：标示这个响应资源的最后修改时间。web服务器在响应请求时，告诉浏览器资源的最后修改时间。 这和文档内容信息验证不同，这里采用的是日期验证办法。 即服务器上会对文件打上一个文件改动的日期，然后客户端接受该日期，下次请求时，返回该日期，服务器验证，如果日期未变，则告诉浏览器使用本地缓存即可。 即在服务器的相应头中，可以设置Last-Modified，来启用这一缓存协议</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//Response Header</span></span>
<span class="line"><span style="color:#e1e4e8;">Last-Modified:Tue, 03 Mar 2015 01:38:18 GMT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//Response Header</span></span>
<span class="line"><span style="color:#24292e;">Last-Modified:Tue, 03 Mar 2015 01:38:18 GMT</span></span></code></pre></div><p>接受到这一响应头之后，浏览器会对该文件做一个缓存，并保存该日期。当下次请求的时候，会通过If-Modified-Since将日期传入并验证:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">If-Modified-Since:Tue, 03 Mar 2015 01:38:18 GMT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">If-Modified-Since:Tue, 03 Mar 2015 01:38:18 GMT</span></span></code></pre></div><p>如果日期未变，则告诉浏览器使用缓存。</p><p>那我们通常应该怎样启用服务器这一功能呢？ 默认情况下，服务器会对静态资源发送Last-modified的tag。 但是，需要注意，Last-Modified的更新时间只能以秒来计，如果你文件改动过于频繁，Last-Modified是无效的(不过，谁牛逼到1s内能多次更新文件嘞~) 实际上Last-Modified的这个标签的我们通常并不会单独使用它，通常与expires结合，形成一个可降级的缓存. Last-Modified/If-Modified-Since要配合Cache-Control使用</p><h2 id="expires-cache-control" tabindex="-1">Expires/Cache-Control <a class="header-anchor" href="#expires-cache-control" aria-label="Permalink to &quot;Expires/Cache-Control&quot;">​</a></h2><p>Expires/Cache协议与上述验证协议最大的不同在于，他可以省略发送验证请求环节，不需要服务器的验证，而直接使用本地缓存。 通常这种方式，适用于，项目稳定，版本迭代不多的时候</p><h3 id="expires" tabindex="-1">Expires <a class="header-anchor" href="#expires" aria-label="Permalink to &quot;Expires&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//Response Headers</span></span>
<span class="line"><span style="color:#e1e4e8;">Expires:Tue, 03 May 2016 09:33:34 GMT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//Response Headers</span></span>
<span class="line"><span style="color:#24292e;">Expires:Tue, 03 May 2016 09:33:34 GMT</span></span></code></pre></div><p>这告诉浏览器,在2016.5.3号之前,可以直接使用该文本的缓存副本。但是，可能会因为服务器和客户端的GMT时间不同，会有一定的bug。 所以，这里只提议在长时间缓存的情况下使用。否则，应该选择Cache-Control.</p><p>以Nginx服务器为例： 对于不经常修改的静态内容（如图片，JS，CSS），可以在服务器中设置expires过期时间，控制浏览器缓存，达到有效减小带宽流量，降低服务器压力的目的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(js|css)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">expires 10d; </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ .*\\.(js|css)$ {</span></span>
<span class="line"><span style="color:#24292e;">expires 10d; </span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>过期时间为10天，js css文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。 通过expires设置过期时间为一天，此时，服务器会根据当前的时间，加上一天.同时添加Expires和Cache-Control头部标签。 即,得到的Response Header为</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Expires: Fri, 28 Feb 2016 10:42:09 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">Cache-Control: max-age=864000 //24*60*6</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Expires: Fri, 28 Feb 2016 10:42:09 GMT</span></span>
<span class="line"><span style="color:#24292e;">Cache-Control: max-age=864000 //24*60*6</span></span></code></pre></div><p>(HTTP规定，如果出现max-age和expires，则max-age默认覆盖掉expires) 当expires为负数表示no-cache，正数或零表示max-age=time。 如果你不想缓存，可以直接设置:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">expires -1; //永远过期，Cache-Control: no-cache</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">expires -1; //永远过期，Cache-Control: no-cache</span></span></code></pre></div><h3 id="cache-control" tabindex="-1">Cache-Control <a class="header-anchor" href="#cache-control" aria-label="Permalink to &quot;Cache-Control&quot;">​</a></h3><p>这应该是HTTP1.1为了解决HTTP1.0中expires的时间差的bug，而新添加的一个tag. 他的配置项很多，其实完全都可以取代expires(现在大多数服务器都支持). 引用一段原话:</p><p>Cache-Control 头在 HTTP/1.1 规范中定义，取代了之前用来定义响应缓存策略的头（例如 Expires）。当前的所有浏览器都支持 Cache-Control，因此，使用它就够了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">General</span></span>
<span class="line"><span style="color:#e1e4e8;">  Request URL: https://www.sundayle.com/home/images/logo.png</span></span>
<span class="line"><span style="color:#e1e4e8;">  Request Method: GET</span></span>
<span class="line"><span style="color:#e1e4e8;">  Status Code: 200  (from memory cache)</span></span>
<span class="line"><span style="color:#e1e4e8;">  Remote Address: 123.31.46.176:443</span></span>
<span class="line"><span style="color:#e1e4e8;">  Referrer Policy: no-referrer-when-downgrade</span></span>
<span class="line"><span style="color:#e1e4e8;">Response Headers</span></span>
<span class="line"><span style="color:#e1e4e8;">  accept-ranges: bytes</span></span>
<span class="line"><span style="color:#e1e4e8;">  cache-control: max-age=2592000</span></span>
<span class="line"><span style="color:#e1e4e8;">  content-length: 3559</span></span>
<span class="line"><span style="color:#e1e4e8;">  content-type: image/png</span></span>
<span class="line"><span style="color:#e1e4e8;">  date: Thu, 31 May 2018 03:27:29 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">  etag: &quot;5ac1d72f-de7&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  expires: Sat, 30 Jun 2018 03:27:29 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">  last-modified: Mon, 02 Apr 2018 07:09:35 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">  server: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">  status: 200</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">General</span></span>
<span class="line"><span style="color:#24292e;">  Request URL: https://www.sundayle.com/home/images/logo.png</span></span>
<span class="line"><span style="color:#24292e;">  Request Method: GET</span></span>
<span class="line"><span style="color:#24292e;">  Status Code: 200  (from memory cache)</span></span>
<span class="line"><span style="color:#24292e;">  Remote Address: 123.31.46.176:443</span></span>
<span class="line"><span style="color:#24292e;">  Referrer Policy: no-referrer-when-downgrade</span></span>
<span class="line"><span style="color:#24292e;">Response Headers</span></span>
<span class="line"><span style="color:#24292e;">  accept-ranges: bytes</span></span>
<span class="line"><span style="color:#24292e;">  cache-control: max-age=2592000</span></span>
<span class="line"><span style="color:#24292e;">  content-length: 3559</span></span>
<span class="line"><span style="color:#24292e;">  content-type: image/png</span></span>
<span class="line"><span style="color:#24292e;">  date: Thu, 31 May 2018 03:27:29 GMT</span></span>
<span class="line"><span style="color:#24292e;">  etag: &quot;5ac1d72f-de7&quot;</span></span>
<span class="line"><span style="color:#24292e;">  expires: Sat, 30 Jun 2018 03:27:29 GMT</span></span>
<span class="line"><span style="color:#24292e;">  last-modified: Mon, 02 Apr 2018 07:09:35 GMT</span></span>
<span class="line"><span style="color:#24292e;">  server: nginx</span></span>
<span class="line"><span style="color:#24292e;">  status: 200</span></span></code></pre></div><p>当前每次发送请求之前浏览器会检查缓存系统里，是否有相应文件的备份，如果有的话，则直接从本地模仿一个Response头 理论知识铺垫完毕，我们来take a look. 看看cache-control 有哪些可以配置的属性(以下属性都跟在cache-control后)</p><ul><li>public: 共有缓存，可被缓存代理服务器缓存,比如CDN</li><li>private: 私有缓存，这些响应通常只为单个用户缓存，因此不允许任何中间缓存对其进行缓存。例如，用户的浏览器可以缓存包含用户私人信息的 HTML 网页，但 CDN 却不能缓存。</li><li>max-age=[秒]：表示在这个时间范围内缓存是新鲜的无需更新。类似Expires时间，不过这个时间是相对的，而不是绝对的。也就是某次请求成功后多少秒内缓存是新鲜的。 s-maxage=[秒]：类似max-age, 除了仅应用于共享缓存（如代理）。</li><li>no-cache：这里不是不缓存的意思，只是每次在使用缓存之前都强制发送请求给源服务器进行验证，检查文件该没改变(其实这里和ETag/Last区别不大)</li><li>no-store：就是禁止缓存，不让浏览器保留缓存副本</li><li>must-revalidate：告诉浏览器，你这必须再次验证检查信息是否过期, 返回的代号就不是200而是304了。</li><li>proxy-revalidate：类似must-revalidate，除了只能应用于代理缓存</li></ul><p>可以设置Cache-Control为:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//Response Headers</span></span>
<span class="line"><span style="color:#e1e4e8;">Cache-Control:private, max-age=0, must-revalidate</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//Response Headers</span></span>
<span class="line"><span style="color:#24292e;">Cache-Control:private, max-age=0, must-revalidate</span></span></code></pre></div><p>该文件是一个私有文件,只能被浏览器缓存，而不能被代理缓存。max-age标识该缓存立即过期，其实和no-cache实际上区别不大. 然后must-revalidate告诉浏览器，你必须给我再验证文件过没过期，比如接下来可能会验证Last-Modified或者ETag.如果没有过期则使用本地缓存. 其实上面可以直接等同于:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//Response Headers</span></span>
<span class="line"><span style="color:#e1e4e8;">Cache-Control:private,no-cache</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//Response Headers</span></span>
<span class="line"><span style="color:#24292e;">Cache-Control:private,no-cache</span></span></code></pre></div><p>使用no-store的结果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//Response Headers</span></span>
<span class="line"><span style="color:#e1e4e8;">Cache-Control:no-store;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//Response Headers</span></span>
<span class="line"><span style="color:#24292e;">Cache-Control:no-store;</span></span></code></pre></div><p>这样表明，不管一不一样都需要重新下载. 强烈表示，不让你使用缓存文件。后续的就不会去验证ETag了。 当然，如果你将IE6那种古老的浏览器考虑进来的话，那你干脆就做的不要脸一点，直接用下面的tag就行:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Cache-Control: no-cache, no-store, must-revalidate //HTTP1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">Pragma: no-cache //HTTP1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">Expires: 0 //Proxy</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Cache-Control: no-cache, no-store, must-revalidate //HTTP1.1</span></span>
<span class="line"><span style="color:#24292e;">Pragma: no-cache //HTTP1.0</span></span>
<span class="line"><span style="color:#24292e;">Expires: 0 //Proxy</span></span></code></pre></div><p>nginx怎么配置对应的cache-control头</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">##设置no-cache</span></span>
<span class="line"><span style="color:#e1e4e8;">//Nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">expires -1;</span></span>
<span class="line"><span style="color:#e1e4e8;">//cache-control</span></span>
<span class="line"><span style="color:#e1e4e8;">Cache-Control:no-cache</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##设置max-age=0</span></span>
<span class="line"><span style="color:#e1e4e8;">//Nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">expires 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">//cache-control</span></span>
<span class="line"><span style="color:#e1e4e8;">Cache-Control:max-age=0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##设置其他头部</span></span>
<span class="line"><span style="color:#e1e4e8;">//nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header  Cache-Control &quot;no-cache&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header  Pragma no-cache;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">##设置no-cache</span></span>
<span class="line"><span style="color:#24292e;">//Nginx</span></span>
<span class="line"><span style="color:#24292e;">expires -1;</span></span>
<span class="line"><span style="color:#24292e;">//cache-control</span></span>
<span class="line"><span style="color:#24292e;">Cache-Control:no-cache</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##设置max-age=0</span></span>
<span class="line"><span style="color:#24292e;">//Nginx</span></span>
<span class="line"><span style="color:#24292e;">expires 0;</span></span>
<span class="line"><span style="color:#24292e;">//cache-control</span></span>
<span class="line"><span style="color:#24292e;">Cache-Control:max-age=0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##设置其他头部</span></span>
<span class="line"><span style="color:#24292e;">//nginx</span></span>
<span class="line"><span style="color:#24292e;">add_header  Cache-Control &quot;no-cache&quot;;</span></span>
<span class="line"><span style="color:#24292e;">add_header  Pragma no-cache;</span></span></code></pre></div><p>上面说的基本上是服务器的响应头，那在浏览器的Request headers里存在cache-control代表什么呢？ 当请求头中有:Cache-Control: max-age=0,表示缓存需要进行验证(ETag||Last-Modified)，如果缓存未过期,则可以使用。 当请求头中有:Cache-Control: no-cache,表示浏览器只能获取最新的文件。 和Response Header中的no-store相对应。</p><p>在开发调试web的时候，经常会碰到因浏览器缓存(cache)而经常要去清空缓存或者强制刷新来测试的烦恼，提供下apache不缓存配置和nginx不缓存配置的设置。在常用的缓存设置里面有两种方式，都是使用add_header来设置：分别为Cache-Control和Pragma。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(css|js|swf|php|htm|html )$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header Cache-Control no-store;</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header Pragma no-cache;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ .*\\.(css|js|swf|php|htm|html )$ {</span></span>
<span class="line"><span style="color:#24292e;">add_header Cache-Control no-store;</span></span>
<span class="line"><span style="color:#24292e;">add_header Pragma no-cache;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=zh-cn" target="_blank" rel="noreferrer">https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=zh-cn</a>)]</p><h1 id="http强制缓存" tabindex="-1">http强制缓存 <a class="header-anchor" href="#http强制缓存" aria-label="Permalink to &quot;http强制缓存&quot;">​</a></h1><p>有一种缓存机制是，服务端通过响应头告诉浏览器，在哪个时间点之前（Expires），或在多长时间之内（Cache-Control: Max-age=…），不要再请求服务器了。这个机制通常称之为 HTTP 强缓存。</p><p>一旦资源被判强缓存规则后，再次访问资源会完全没有 HTTP 请求（Chrome 开发者工具的 Network 面板依然会显示请求，但会注明 from cache；Firefox 的 Firebug 也类似，会注明 BFCache），这能够大幅提升性能。所以我们一般会对 CSS、JS、IMG 等资源使用强缓存。</p><p>开启强缓存，需要配置如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ ^/static/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">    root       /home/site/static;</span></span>
<span class="line"><span style="color:#e1e4e8;">    etag      on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    expires 2h;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ ^/static/ {</span></span>
<span class="line"><span style="color:#24292e;">    root       /home/site/static;</span></span>
<span class="line"><span style="color:#24292e;">    etag      on;</span></span>
<span class="line"><span style="color:#24292e;">    expires 2h;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($request_filename ~* ^.*?.(js|html|css)$){</span></span>
<span class="line"><span style="color:#e1e4e8;">   add_header Cache-Control no-cache;</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($request_filename ~* ^.*?.(txt|doc|pdf|rar|gz|zip|docx|exe|xlsx|ppt|pptx|jpg|png)$){</span></span>
<span class="line"><span style="color:#e1e4e8;">    add_header Cache-Control max-age=864000;#缓存一天</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($request_filename ~* ^.*?.(js|html|css)$){</span></span>
<span class="line"><span style="color:#24292e;">   add_header Cache-Control no-cache;</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span>
<span class="line"><span style="color:#24292e;">if ($request_filename ~* ^.*?.(txt|doc|pdf|rar|gz|zip|docx|exe|xlsx|ppt|pptx|jpg|png)$){</span></span>
<span class="line"><span style="color:#24292e;">    add_header Cache-Control max-age=864000;#缓存一天</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="缓存配置" tabindex="-1">缓存配置 <a class="header-anchor" href="#缓存配置" aria-label="Permalink to &quot;缓存配置&quot;">​</a></h1><ul><li>可参考H5BP配置及文件管理方式 <ul><li><a href="https://github.com/h5bp/server-configs-nginx" target="_blank" rel="noreferrer">https://github.com/h5bp/server-configs-nginx</a></li></ul></li></ul><p>在用配置如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">   set $origin_root /data/blog/;</span></span>
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
<span class="line"><span style="color:#24292e;">   }</span></span></code></pre></div><h2 id="缓存知识点" tabindex="-1">缓存知识点 <a class="header-anchor" href="#缓存知识点" aria-label="Permalink to &quot;缓存知识点&quot;">​</a></h2><h3 id="强缓存" tabindex="-1">强缓存 <a class="header-anchor" href="#强缓存" aria-label="Permalink to &quot;强缓存&quot;">​</a></h3><ul><li>强缓存命中则直接读取浏览器本地的资源，在network中显示的是from memory或者from disk</li><li>控制强制缓存的字段有：Cache-Control（http1.1）和Expires（http1.0）</li><li>Cache-control是一个相对时间，用以表达自上次请求正确的资源之后的多少秒的时间段内缓存有效。</li><li>Expires是一个绝对时间。用以表达在这个时间点之前发起请求可以直接从浏览器中读取数据，而无需发起请求</li><li>Cache-Control的优先级比Expires的优先级高。前者的出现是为了解决Expires在浏览器时间被手动更改导致缓存判断错误的问题。</li><li>如果同时存在则使用Cache-control</li></ul><h4 id="强缓存–expires" tabindex="-1"><strong>强缓存–expires</strong> <a class="header-anchor" href="#强缓存–expires" aria-label="Permalink to &quot;**强缓存–expires**&quot;">​</a></h4><ul><li>该字段是服务器响应消息头字段，告诉浏览器在过期时间之前可以直接从浏览器缓存中存取数据。</li><li>Expires 是 HTTP 1.0 的字段，表示缓存到期时间，是一个绝对的时间 (当前时间+缓存时间)。在响应消息头中，设置这个字段之后，就可以告诉浏览器，在未过期之前不需要再次请求。</li><li>由于是绝对时间，用户可能会将客户端本地的时间进行修改，而导致浏览器判断缓存失效，重新请求该资源。此外，即使不考虑修改，时差或者误差等因素也可能造成客户端与服务端的时间不一致，致使缓存失效。</li><li>优势特点 <ul><li>1、HTTP 1.0 产物，可以在HTTP 1.0和1.1中使用，简单易用。</li><li>2、以时刻标识失效时间。</li></ul></li><li>劣势问题 <ul><li>1、时间是由服务器发送的(UTC)，如果服务器时间和客户端时间存在不一致，可能会出现问题。</li><li>2、存在版本问题，到期之前的修改客户端是不可知的</li></ul></li></ul><h4 id="强缓存–cache-control" tabindex="-1"><strong>强缓存–cache-control</strong> <a class="header-anchor" href="#强缓存–cache-control" aria-label="Permalink to &quot;**强缓存–cache-control**&quot;">​</a></h4><ul><li><p>已知Expires的缺点之后，在HTTP/1.1中，增加了一个字段 Cache-control ，该字段表示资源缓存的最大有效时间，在该时间内，客户端不需要向服务器发送请求。</p></li><li><p>这两者的区别就是前者是绝对时间，而后者是相对时间。下面列举一些</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Cache-control</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Cache-control</span></span></code></pre></div><p>字段常用的值：(完整的列表可以查看MDN)</p><ul><li><code>max-age</code>：即最大有效时间。</li><li><code>must-revalidate</code>：如果超过了 <code>max-age</code> 的时间，浏览器必须向服务器发送请求，验证资源是否还有效。</li><li><code>no-cache</code>：不使用强缓存，需要与服务器验证缓存是否新鲜。</li><li><code>no-store</code>: 真正意义上的“不要缓存”。所有内容都不走缓存，包括强制和对比。</li><li><code>public</code>：所有的内容都可以被缓存 (包括客户端和代理服务器， 如 CDN)</li><li><code>private</code>：所有的内容只有客户端才可以缓存，代理服务器不能缓存。默认值。</li></ul></li><li><p><strong>Cache-control 的优先级高于 Expires</strong>，为了兼容 HTTP/1.0 和 HTTP/1.1，实际项目中两个字段都可以设置。</p></li><li><p>该字段可以在请求头或者响应头设置，可组合使用多种指令：</p><ul><li>可缓存性： <ul><li>public：浏览器和缓存服务器都可以缓存页面信息</li><li>private：default，代理服务器不可缓存，只能被单个用户缓存</li><li>no-cache：浏览器器和服务器都不应该缓存页面信息，但仍可缓存，只是在缓存前需要向服务器确认资源是否被更改。可配合private， 过期时间设置为过去时间。</li><li>only-if-cache：客户端只接受已缓存的响应</li></ul></li><li>到期 <ul><li>max-age=：缓存存储的最大周期，超过这个周期被认为过期。</li><li>s-maxage=：设置共享缓存，比如can。会覆盖max-age和expires。</li><li>max-stale[=]：客户端愿意接收一个已经过期的资源</li><li>min-fresh=：客户端希望在指定的时间内获取最新的响应</li><li>stale-while-revalidate=：客户端愿意接收陈旧的响应，并且在后台一部检查新的响应。时间代表客户端愿意接收陈旧响应 的时间长度。</li><li>stale-if-error=：如新的检测失败，客户端则愿意接收陈旧的响应，时间代表等待时间。</li></ul></li><li>重新验证和重新加载 <ul><li>must-revalidate：如页面过期，则去服务器进行获取。</li><li>proxy-revalidate：用于共享缓存。</li><li>immutable：响应正文不随时间改变。</li></ul></li><li>其他 <ul><li>no-store：绝对禁止缓存</li><li>no-transform：不得对资源进行转换和转变。例如，不得对图像格式进行转换。</li></ul></li></ul></li><li><p>优势特点</p><ul><li>1、HTTP 1.1 产物，以时间间隔标识失效时间，解决了Expires服务器和客户端相对时间的问题。</li><li>2、比Expires多了很多选项设置。</li></ul></li><li><p>劣势问题</p><ul><li>1、存在版本问题，到期之前的修改客户端是不可知的</li></ul></li></ul><h3 id="浏览器反馈" tabindex="-1">浏览器反馈 <a class="header-anchor" href="#浏览器反馈" aria-label="Permalink to &quot;浏览器反馈&quot;">​</a></h3><h4 id="_1-打开新窗口" tabindex="-1">1. 打开新窗口 <a class="header-anchor" href="#_1-打开新窗口" aria-label="Permalink to &quot;1. 打开新窗口&quot;">​</a></h4><ul><li>public 会从缓存中读取资源, 也就是返回前两种200状态码</li><li>private, no-cache, no-store 都会重新访问服务器。</li><li>如果指定了max-age值，那么在此值内的时间里就不会重新访问服务器，例如</li></ul><h4 id="在原窗口按enter键" tabindex="-1">在原窗口按Enter键 <a class="header-anchor" href="#在原窗口按enter键" aria-label="Permalink to &quot;在原窗口按Enter键&quot;">​</a></h4><ul><li>public 会从缓存中读取资源, 也就是返回前两种200状态码</li><li>private或must-revalidate 则只有第一次访问时会访问服务器，以后就不再访问。</li><li>no-cache, no-store 每次都会访问。</li><li>如果指定了max-age值，那么在此值内的时间里就不会重新访问服务器</li></ul><h4 id="_3-点击刷新按钮" tabindex="-1">3. 点击刷新按钮 <a class="header-anchor" href="#_3-点击刷新按钮" aria-label="Permalink to &quot;3. 点击刷新按钮&quot;">​</a></h4><ul><li>无论将cache-control设置为什么值，浏览器都会重新访问服务器</li></ul><h4 id="_4-点击后退按钮" tabindex="-1">4. 点击后退按钮 <a class="header-anchor" href="#_4-点击后退按钮" aria-label="Permalink to &quot;4. 点击后退按钮&quot;">​</a></h4><ul><li>public、private、must-revalidate、max-age 都不会重新访问</li><li>no-cache 则每次都重复访问</li><li>cache-control是关于浏览器缓存的最重要的设置，因为它覆盖其他设置，比如 expires 和 last-modified。</li><li>另外，由于浏览器的行为基本相同，这个属性是处理跨浏览器缓存问题的最有效的方法</li></ul><h3 id="协商缓存" tabindex="-1"><strong>协商缓存</strong> <a class="header-anchor" href="#协商缓存" aria-label="Permalink to &quot;**协商缓存**&quot;">​</a></h3><p>协商缓存的状态码由服务器决策返回 200 或者 304</p><p>当浏览器的强缓存失效的时候或者请求头中设置了不走强缓存，并且在请求头中设置了If-Modified-Since 或者 If-None-Match 的时候，会将这两个属性值到服务端去验证是否命中协商缓存；</p><p>如果命中了协商缓存，会返回 304 状态，加载浏览器缓存，并且响应头会设置 Last-Modified 或者 ETag 属性。</p><p>对比缓存在请求数上和没有缓存是一致的，但如果是 304 的话，返回的仅仅是一个状态码而已，并没有实际的文件内容，因此 在响应体体积上的节省是它的优化点。</p><p>协商缓存有 2 组字段(不是两个)，控制协商缓存的字段有：</p><ul><li>Last-Modified/If-Modified-since（http1.0）</li><li>Etag/If-None-match（http1.1）</li></ul><p>Last-Modified/If-Modified-since 表示的是服务器的资源最后一次修改的时间；</p><p>Etag/If-None-match 表示的是服务器资源的唯一标识，只要资源变化，Etag就会重新生成。</p><p>Etag/If-None-match 的优先级比 Last-Modified/If-Modified-since 高</p><h4 id="协商缓存-协商缓存–last-modified-if-modified-since" tabindex="-1"><strong>协商缓存-协商缓存–Last-Modified/If-Modified-since</strong> <a class="header-anchor" href="#协商缓存-协商缓存–last-modified-if-modified-since" aria-label="Permalink to &quot;**协商缓存-协商缓存–Last-Modified/If-Modified-since**&quot;">​</a></h4><p>1.服务器通过 <code>Last-Modified</code> 字段告知客户端，资源最后一次被修改的时间，例如 <code>Last-Modified: Mon, 10 Nov 2018 09:10:11 GMT</code></p><p>2.浏览器将这个值和内容一起记录在缓存数据库中。</p><p>3.下一次请求相同资源时时，浏览器从自己的缓存中找出“不确定是否过期的”缓存。因此在请求头中将上次的 <code>Last-Modified</code> 的值写入到请求头的 <code>If-Modified-Since</code> 字段</p><p>4.服务器会将 <code>If-Modified-Since</code> 的值与 <code>Last-Modified</code> 字段进行对比。如果相等，则表示未修改，响应 304；反之，则表示修改了，响应 200 状态码，并返回数据。</p><p>优势特点</p><ul><li>1、不存在版本问题，每次请求都会去服务器进行校验。服务器对比最后修改时间如果相同则返回304，不同返回200以及资源内容。</li></ul><p>劣势问题</p><ul><li>1、只要资源修改，无论内容是否发生实质性的变化，都会将该资源返回客户端。例如周期性重写，这种情况下该资源包含的数据实际上一样的。</li><li>2、以时刻作为标识，无法识别一秒内进行多次修改的情况。 如果资源更新的速度是秒以下单位，那么该缓存是不能被使用的，因为它的时间单位最低是秒。</li><li>3、某些服务器不能精确的得到文件的最后修改时间。</li><li>4、如果文件是通过服务器动态生成的，那么该方法的更新时间永远是生成的时间，尽管文件可能没有变化，所以起不到缓存的作用</li></ul><h4 id="协商缓存–etag-if-none-match" tabindex="-1"><strong>协商缓存–Etag/If-None-match</strong> <a class="header-anchor" href="#协商缓存–etag-if-none-match" aria-label="Permalink to &quot;**协商缓存–Etag/If-None-match**&quot;">​</a></h4><p>为了解决上述问题，出现了一组新的字段 <code>Etag</code> 和 <code>If-None-Match</code></p><p><code>Etag</code> 存储的是文件的特殊标识(一般都是 hash 生成的)，服务器存储着文件的 <code>Etag</code> 字段。之后的流程和 <code>Last-Modified</code> 一致，只是 <code>Last-Modified</code> 字段和它所表示的更新时间改变成了 <code>Etag</code> 字段和它所表示的文件 hash，把 <code>If-Modified-Since</code> 变成了 <code>If-None-Match</code>。服务器同样进行比较，命中返回 304, 不命中返回新资源和 200。</p><p>浏览器在发起请求时，服务器返回在 Response header 中返回请求资源的唯一标识。在下一次请求时，会将上一次返回的Etag值赋值给 if-No-Matched 并添加在Request Header中。服务器将浏览器传来的 if-no-matched 跟自己的本地的资源的ETag做对比，如果匹配，则返回304通知浏览器读取本地缓存，否则返回200和更新后的资源。</p><p><strong>Etag 的优先级高于 Last-Modified</strong>。</p><p>优势特点</p><ul><li>1、可以更加精确的判断资源是否被修改，可以识别一秒内多次修改的情况。</li><li>2、不存在版本问题，每次请求都回去服务器进行校验。</li></ul><p>劣势问题</p><ul><li>1、计算ETag值需要性能损耗。</li><li>2、分布式服务器存储的情况下，计算 ETag 的算法如果不一样，会导致浏览器从一台服务器上获得页面内容后到另外一台服务器上进行验证时现 ETag 不匹配的情况。（ <strong>分布式下反而应该关闭 ETag</strong> ）</li></ul><h3 id="缓存状态金字塔" tabindex="-1">缓存状态金字塔 <a class="header-anchor" href="#缓存状态金字塔" aria-label="Permalink to &quot;缓存状态金字塔&quot;">​</a></h3><p>浏览器缓存逻辑图</p><ul><li>HTTP缓存都是从第二次请求开始的： <ul><li>第一次请求资源时，服务器返回资源，并在response header中回传资源的缓存策略；</li><li>第二次请求时，浏览器判断这些请求参数，击中强缓存就直接200，否则就把请求参数加到 request header 头中传给服务器，看是否击中协商缓存，击中则返回304，否则服务器会返回新的资源</li></ul></li></ul><p><img src="https://gitee.com/freehan/imgs/raw/master/imgs/image-20220323170634638.png" alt="image-20220323170634638"></p><p>浏览器缓存状态码释义</p><ul><li><strong>expires</strong>, <strong>cache-control</strong>, <strong>last-modified</strong>, <strong>etag</strong>.</li></ul><p><img src="https://gitee.com/freehan/imgs/raw/master/imgs/image-20220323170714951.png" alt="image-20220323170714951"></p>`,117),o=[p];function c(i,t,r,d,h,g){return a(),e("div",null,o)}const m=s(l,[["render",c]]);export{u as __pageData,m as default};
