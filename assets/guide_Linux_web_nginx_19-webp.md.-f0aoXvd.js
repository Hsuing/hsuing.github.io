import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const l="/assets/image-20220323144205546.7LhR0Fis.png",h=JSON.parse('{"title":"环境安装","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/19-webp.md","filePath":"guide/Linux/web/nginx/19-webp.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/19-webp.md"},o=e('<h2 id="实现逻辑" tabindex="-1">实现逻辑 <a class="header-anchor" href="#实现逻辑" aria-label="Permalink to &quot;实现逻辑&quot;">​</a></h2><p>​ 用户访问一张图片，nginx收到请求，通过读取 <code>Request Headers</code> 中的 <code>Accept</code> 字段值来判断浏览器是否支持WebP，如果支持则返回WebP，不支持则返回原图</p><p><img src="'+l+`" alt=""></p><h1 id="环境安装" tabindex="-1">环境安装 <a class="header-anchor" href="#环境安装" aria-label="Permalink to &quot;环境安装&quot;">​</a></h1><h2 id="安装libjpeg-libpng" tabindex="-1">安装libjpeg, libpng <a class="header-anchor" href="#安装libjpeg-libpng" aria-label="Permalink to &quot;安装libjpeg, libpng&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install libjpeg-turbo-devel libjpeg-turbo libpng-devel gcc-c++ -y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install libjpeg-turbo-devel libjpeg-turbo libpng-devel gcc-c++ -y</span></span></code></pre></div><h2 id="安装libtiff" tabindex="-1">安装LibTIFF <a class="header-anchor" href="#安装libtiff" aria-label="Permalink to &quot;安装LibTIFF&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cd /usr/local/src</span></span>
<span class="line"><span style="color:#e1e4e8;">wget http://download.osgeo.org/libtiff/tiff-4.0.8.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -zxvf tiff-4.0.8.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd tiff-4.0.8</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure &amp;&amp; make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cd /usr/local/src</span></span>
<span class="line"><span style="color:#24292e;">wget http://download.osgeo.org/libtiff/tiff-4.0.8.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar -zxvf tiff-4.0.8.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd tiff-4.0.8</span></span>
<span class="line"><span style="color:#24292e;">./configure &amp;&amp; make &amp;&amp; make install</span></span></code></pre></div><h2 id="安装giflib" tabindex="-1">安装giflib <a class="header-anchor" href="#安装giflib" aria-label="Permalink to &quot;安装giflib&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cd /usr/local/src</span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://sourceforge.net/projects/giflib/files/giflib-5.1.4.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxvf giflib-5.1.4.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd giflib-5.1.4</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure &amp;&amp; make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cd /usr/local/src</span></span>
<span class="line"><span style="color:#24292e;">wget https://sourceforge.net/projects/giflib/files/giflib-5.1.4.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar zxvf giflib-5.1.4.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd giflib-5.1.4</span></span>
<span class="line"><span style="color:#24292e;">./configure &amp;&amp; make &amp;&amp; make install</span></span></code></pre></div><h2 id="安装libwebp" tabindex="-1">安装libwebp <a class="header-anchor" href="#安装libwebp" aria-label="Permalink to &quot;安装libwebp&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cd /usr/local/src</span></span>
<span class="line"><span style="color:#e1e4e8;">wget http://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.2.0.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -zxvf libwebp-1.2.0.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd libwebp-1.2.0</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure --enable-libwebpmux \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--enable-libwebpdemux \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--enable-libwebpdecoder \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--enable-libwebpextras \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--enable-swap-16bit-csp \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--disable-static</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cd /usr/local/src</span></span>
<span class="line"><span style="color:#24292e;">wget http://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.2.0.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar -zxvf libwebp-1.2.0.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd libwebp-1.2.0</span></span>
<span class="line"><span style="color:#24292e;">./configure --enable-libwebpmux \\</span></span>
<span class="line"><span style="color:#24292e;">--enable-libwebpdemux \\</span></span>
<span class="line"><span style="color:#24292e;">--enable-libwebpdecoder \\</span></span>
<span class="line"><span style="color:#24292e;">--enable-libwebpextras \\</span></span>
<span class="line"><span style="color:#24292e;">--enable-swap-16bit-csp \\</span></span>
<span class="line"><span style="color:#24292e;">--disable-static</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span></code></pre></div><p><strong>编译完要检查输出是否支持 JPG、PNG、GIF、WEBP</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">WebP Configuration Summary</span></span>
<span class="line"><span style="color:#e1e4e8;">--------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Shared libraries: yes</span></span>
<span class="line"><span style="color:#e1e4e8;">Static libraries: no</span></span>
<span class="line"><span style="color:#e1e4e8;">Threading support: yes</span></span>
<span class="line"><span style="color:#e1e4e8;">libwebp: yes</span></span>
<span class="line"><span style="color:#e1e4e8;">libwebpdecoder: yes</span></span>
<span class="line"><span style="color:#e1e4e8;">libwebpdemux: yes</span></span>
<span class="line"><span style="color:#e1e4e8;">libwebpmux: yes</span></span>
<span class="line"><span style="color:#e1e4e8;">libwebpextras: yes</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Tools:</span></span>
<span class="line"><span style="color:#e1e4e8;">cwebp : yes</span></span>
<span class="line"><span style="color:#e1e4e8;">  Input format support</span></span>
<span class="line"><span style="color:#e1e4e8;">  ====================</span></span>
<span class="line"><span style="color:#e1e4e8;">  JPEG : yes</span></span>
<span class="line"><span style="color:#e1e4e8;">  PNG  : yes</span></span>
<span class="line"><span style="color:#e1e4e8;">  TIFF : yes</span></span>
<span class="line"><span style="color:#e1e4e8;">  WIC  : no</span></span>
<span class="line"><span style="color:#e1e4e8;">dwebp : yes</span></span>
<span class="line"><span style="color:#e1e4e8;">  Output format support</span></span>
<span class="line"><span style="color:#e1e4e8;">  =====================</span></span>
<span class="line"><span style="color:#e1e4e8;">  PNG  : yes</span></span>
<span class="line"><span style="color:#e1e4e8;">  WIC  : no</span></span>
<span class="line"><span style="color:#e1e4e8;">GIF support : yes</span></span>
<span class="line"><span style="color:#e1e4e8;">anim_diff   : yes</span></span>
<span class="line"><span style="color:#e1e4e8;">gif2webp    : yes</span></span>
<span class="line"><span style="color:#e1e4e8;">img2webp    : yes</span></span>
<span class="line"><span style="color:#e1e4e8;">webpmux     : yes</span></span>
<span class="line"><span style="color:#e1e4e8;">vwebp       : no</span></span>
<span class="line"><span style="color:#e1e4e8;">webpinfo    : yes</span></span>
<span class="line"><span style="color:#e1e4e8;">SDL support : no</span></span>
<span class="line"><span style="color:#e1e4e8;">vwebp_sdl   : no</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">WebP Configuration Summary</span></span>
<span class="line"><span style="color:#24292e;">--------------------------</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Shared libraries: yes</span></span>
<span class="line"><span style="color:#24292e;">Static libraries: no</span></span>
<span class="line"><span style="color:#24292e;">Threading support: yes</span></span>
<span class="line"><span style="color:#24292e;">libwebp: yes</span></span>
<span class="line"><span style="color:#24292e;">libwebpdecoder: yes</span></span>
<span class="line"><span style="color:#24292e;">libwebpdemux: yes</span></span>
<span class="line"><span style="color:#24292e;">libwebpmux: yes</span></span>
<span class="line"><span style="color:#24292e;">libwebpextras: yes</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Tools:</span></span>
<span class="line"><span style="color:#24292e;">cwebp : yes</span></span>
<span class="line"><span style="color:#24292e;">  Input format support</span></span>
<span class="line"><span style="color:#24292e;">  ====================</span></span>
<span class="line"><span style="color:#24292e;">  JPEG : yes</span></span>
<span class="line"><span style="color:#24292e;">  PNG  : yes</span></span>
<span class="line"><span style="color:#24292e;">  TIFF : yes</span></span>
<span class="line"><span style="color:#24292e;">  WIC  : no</span></span>
<span class="line"><span style="color:#24292e;">dwebp : yes</span></span>
<span class="line"><span style="color:#24292e;">  Output format support</span></span>
<span class="line"><span style="color:#24292e;">  =====================</span></span>
<span class="line"><span style="color:#24292e;">  PNG  : yes</span></span>
<span class="line"><span style="color:#24292e;">  WIC  : no</span></span>
<span class="line"><span style="color:#24292e;">GIF support : yes</span></span>
<span class="line"><span style="color:#24292e;">anim_diff   : yes</span></span>
<span class="line"><span style="color:#24292e;">gif2webp    : yes</span></span>
<span class="line"><span style="color:#24292e;">img2webp    : yes</span></span>
<span class="line"><span style="color:#24292e;">webpmux     : yes</span></span>
<span class="line"><span style="color:#24292e;">vwebp       : no</span></span>
<span class="line"><span style="color:#24292e;">webpinfo    : yes</span></span>
<span class="line"><span style="color:#24292e;">SDL support : no</span></span>
<span class="line"><span style="color:#24292e;">vwebp_sdl   : no</span></span></code></pre></div><h2 id="加载环境" tabindex="-1">加载环境 <a class="header-anchor" href="#加载环境" aria-label="Permalink to &quot;加载环境&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ldconfig</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ldconfig</span></span></code></pre></div><h3 id="测试转换" tabindex="-1">测试转换 <a class="header-anchor" href="#测试转换" aria-label="Permalink to &quot;测试转换&quot;">​</a></h3><p>Google提供了一组工具集合，叫 libwebp ，其中包括各种 webp 相关转换的命令：</p><ul><li>cwebp – 将其它图片转为webp格式图片 (不包括GIF)</li><li>dwebp – 将webp格式图片转为其它格式图片</li><li>vwebp – webp图片浏览器</li><li>webpmux – WebP muxing tool</li><li>gif2webp – 将GIF转换为webp图片 <ul><li><strong>不太建议使用</strong>，测试发现 75 质量的 webp 文件会出现比原文件还大的情况</li></ul></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># png -&gt; webp</span></span>
<span class="line"><span style="color:#e1e4e8;">cwebp -q 75 01.png -o 01.webp</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># gif -&gt; webp</span></span>
<span class="line"><span style="color:#e1e4e8;">gif2webp -q 80 02.gif -o 02.webp</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># webp -&gt; png</span></span>
<span class="line"><span style="color:#e1e4e8;">dwebp image.webp -o image.png</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># png -&gt; webp</span></span>
<span class="line"><span style="color:#24292e;">cwebp -q 75 01.png -o 01.webp</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># gif -&gt; webp</span></span>
<span class="line"><span style="color:#24292e;">gif2webp -q 80 02.gif -o 02.webp</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># webp -&gt; png</span></span>
<span class="line"><span style="color:#24292e;">dwebp image.webp -o image.png</span></span></code></pre></div><h3 id="方案一" tabindex="-1">方案一 <a class="header-anchor" href="#方案一" aria-label="Permalink to &quot;方案一&quot;">​</a></h3><p>在原资源目录下生成 webp 文件，此方案用于 webp 文件<strong>经常变更</strong>的情况下，每次随项目部署，路径自动清空临时 webp 文件，会影响初次加载</p><h4 id="引入-lua-脚本" tabindex="-1">引入 lua 脚本 <a class="header-anchor" href="#引入-lua-脚本" aria-label="Permalink to &quot;引入 lua 脚本&quot;">​</a></h4><ul><li>http</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">  lua_package_path &quot;/data/apps/luajit2/lib/?.lua;;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">  lua_package_path &quot;/data/apps/luajit2/lib/?.lua;;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>webp 转换脚本</li></ul><p>vim webp.lua</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- 检测文件是否存在</span></span>
<span class="line"><span style="color:#e1e4e8;">function file_exists(name)</span></span>
<span class="line"><span style="color:#e1e4e8;">    local f=io.open(name,&quot;r&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    if f~=nil then io.close(f) return true else return false end</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 接收 location 中定义的 $webp_filepath 变量</span></span>
<span class="line"><span style="color:#e1e4e8;">local newFile = ngx.var.webp_filepath;</span></span>
<span class="line"><span style="color:#e1e4e8;">--ngx.log(ngx.ERR, &quot; newFile:&quot;, newFile)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">local originalFile = newFile:sub(1, #newFile - 5); -- 去掉 .webp 的后缀</span></span>
<span class="line"><span style="color:#e1e4e8;">--ngx.log(ngx.ERR, &quot; originalFile:&quot;, originalFile)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if not file_exists(originalFile) then -- 原文件不存在</span></span>
<span class="line"><span style="color:#e1e4e8;">    ngx.log(ngx.ERR, &quot;The originalFile is NOT FOUND!&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    ngx.exit(404);</span></span>
<span class="line"><span style="color:#e1e4e8;">    return;</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 转换原图片到 webp 格式，这里的质量是 75 ，你也可以改成别的</span></span>
<span class="line"><span style="color:#e1e4e8;">os.execute(&quot;cwebp -q 75 &quot; .. originalFile .. &quot; -o &quot; .. newFile);</span></span>
<span class="line"><span style="color:#e1e4e8;">--ngx.log(ngx.ERR, &quot;converting to webp...&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if file_exists(newFile) then -- 如果新文件存在（转换成功）</span></span>
<span class="line"><span style="color:#e1e4e8;">    -- 转换 webp 成功，并返回 .webp 结尾的 uri 地址</span></span>
<span class="line"><span style="color:#e1e4e8;">    ngx.exec(ngx.var.webp_filename) -- Internal Redirect</span></span>
<span class="line"><span style="color:#e1e4e8;">else</span></span>
<span class="line"><span style="color:#e1e4e8;">    ngx.exit(404)</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- 检测文件是否存在</span></span>
<span class="line"><span style="color:#24292e;">function file_exists(name)</span></span>
<span class="line"><span style="color:#24292e;">    local f=io.open(name,&quot;r&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    if f~=nil then io.close(f) return true else return false end</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 接收 location 中定义的 $webp_filepath 变量</span></span>
<span class="line"><span style="color:#24292e;">local newFile = ngx.var.webp_filepath;</span></span>
<span class="line"><span style="color:#24292e;">--ngx.log(ngx.ERR, &quot; newFile:&quot;, newFile)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">local originalFile = newFile:sub(1, #newFile - 5); -- 去掉 .webp 的后缀</span></span>
<span class="line"><span style="color:#24292e;">--ngx.log(ngx.ERR, &quot; originalFile:&quot;, originalFile)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if not file_exists(originalFile) then -- 原文件不存在</span></span>
<span class="line"><span style="color:#24292e;">    ngx.log(ngx.ERR, &quot;The originalFile is NOT FOUND!&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    ngx.exit(404);</span></span>
<span class="line"><span style="color:#24292e;">    return;</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 转换原图片到 webp 格式，这里的质量是 75 ，你也可以改成别的</span></span>
<span class="line"><span style="color:#24292e;">os.execute(&quot;cwebp -q 75 &quot; .. originalFile .. &quot; -o &quot; .. newFile);</span></span>
<span class="line"><span style="color:#24292e;">--ngx.log(ngx.ERR, &quot;converting to webp...&quot;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if file_exists(newFile) then -- 如果新文件存在（转换成功）</span></span>
<span class="line"><span style="color:#24292e;">    -- 转换 webp 成功，并返回 .webp 结尾的 uri 地址</span></span>
<span class="line"><span style="color:#24292e;">    ngx.exec(ngx.var.webp_filename) -- Internal Redirect</span></span>
<span class="line"><span style="color:#24292e;">else</span></span>
<span class="line"><span style="color:#24292e;">    ngx.exit(404)</span></span>
<span class="line"><span style="color:#24292e;">end</span></span></code></pre></div><h4 id="域名配置" tabindex="-1">域名配置 <a class="header-anchor" href="#域名配置" aria-label="Permalink to &quot;域名配置&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 根据浏览器 accpet 请求头辨别是否支持webp</span></span>
<span class="line"><span style="color:#e1e4e8;">map $http_accept $webp_suffix {</span></span>
<span class="line"><span style="color:#e1e4e8;">    default &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;~*webp&quot; &quot;.webp&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen  80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name abc.xxx.com ;</span></span>
<span class="line"><span style="color:#e1e4e8;">    rewrite ^(.*)$  https://$host$1 permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen    443 ssl http2;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  abc.xxx.com ;</span></span>
<span class="line"><span style="color:#e1e4e8;">    charset utf-8;</span></span>
<span class="line"><span style="color:#e1e4e8;">    access_log  logs/$http_host.access.main.log  main;</span></span>
<span class="line"><span style="color:#e1e4e8;">    error_log  logs/abc.nestealin.com.error.log error;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate      /data/keys/server.cer;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate_key  /data/keys/server.key;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_session_timeout  5m;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_ecdh_curve X25519:P-256:P-384;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_ciphers TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-256-GCM-SHA384:TLS13-AES-128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-CHACHA20-POLY1305:EECDH+CHACHA20:EECDH+AES128;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 开启 TLS 1.3 0-RTT</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_early_data on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    # 添加 Early-Data 头告知后端, 防止重放攻击</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header Early-Data $ssl_early_data;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    set $origin_root /data/blogs/;</span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">    location @webp_redirect {</span></span>
<span class="line"><span style="color:#e1e4e8;">        content_by_lua_file &quot;/data/apps/nginx/conf/lua/webp.lua&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location ~ .*\\.(jpg|jpeg|png)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $webp_filename $uri$webp_suffix;</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $webp_filepath $origin_root$webp_filename;</span></span>
<span class="line"><span style="color:#e1e4e8;">				# 先去检测是否存在webp文件，如果没有，则内部跳转执行lua转换</span></span>
<span class="line"><span style="color:#e1e4e8;">        try_files $webp_filename @webp_redirect;</span></span>
<span class="line"><span style="color:#e1e4e8;">        root $origin_root;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        root $origin_root ;</span></span>
<span class="line"><span style="color:#e1e4e8;">        index index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">        if (!-e $request_filename) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            rewrite ^/(.*)$  / redirect;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 根据浏览器 accpet 请求头辨别是否支持webp</span></span>
<span class="line"><span style="color:#24292e;">map $http_accept $webp_suffix {</span></span>
<span class="line"><span style="color:#24292e;">    default &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    &quot;~*webp&quot; &quot;.webp&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen  80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name abc.xxx.com ;</span></span>
<span class="line"><span style="color:#24292e;">    rewrite ^(.*)$  https://$host$1 permanent;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen    443 ssl http2;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  abc.xxx.com ;</span></span>
<span class="line"><span style="color:#24292e;">    charset utf-8;</span></span>
<span class="line"><span style="color:#24292e;">    access_log  logs/$http_host.access.main.log  main;</span></span>
<span class="line"><span style="color:#24292e;">    error_log  logs/abc.nestealin.com.error.log error;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate      /data/keys/server.cer;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate_key  /data/keys/server.key;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_session_timeout  5m;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_ecdh_curve X25519:P-256:P-384;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_ciphers TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-256-GCM-SHA384:TLS13-AES-128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-CHACHA20-POLY1305:EECDH+CHACHA20:EECDH+AES128;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 开启 TLS 1.3 0-RTT</span></span>
<span class="line"><span style="color:#24292e;">    ssl_early_data on;</span></span>
<span class="line"><span style="color:#24292e;">    # 添加 Early-Data 头告知后端, 防止重放攻击</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header Early-Data $ssl_early_data;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    set $origin_root /data/blogs/;</span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">    location @webp_redirect {</span></span>
<span class="line"><span style="color:#24292e;">        content_by_lua_file &quot;/data/apps/nginx/conf/lua/webp.lua&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location ~ .*\\.(jpg|jpeg|png)$ {</span></span>
<span class="line"><span style="color:#24292e;">        set $webp_filename $uri$webp_suffix;</span></span>
<span class="line"><span style="color:#24292e;">        set $webp_filepath $origin_root$webp_filename;</span></span>
<span class="line"><span style="color:#24292e;">				# 先去检测是否存在webp文件，如果没有，则内部跳转执行lua转换</span></span>
<span class="line"><span style="color:#24292e;">        try_files $webp_filename @webp_redirect;</span></span>
<span class="line"><span style="color:#24292e;">        root $origin_root;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        root $origin_root ;</span></span>
<span class="line"><span style="color:#24292e;">        index index.html;</span></span>
<span class="line"><span style="color:#24292e;">        if (!-e $request_filename) {</span></span>
<span class="line"><span style="color:#24292e;">            rewrite ^/(.*)$  / redirect;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="方案二" tabindex="-1">方案二 <a class="header-anchor" href="#方案二" aria-label="Permalink to &quot;方案二&quot;">​</a></h3><p>将 webp 生成到临时目录</p><ul><li>此方案用于 webp 文件<strong>不经常更新</strong>的情况下，无需繁复重新生成，影响初次加载。</li><li>与方案一区别在于多了一层临时目录</li></ul><h4 id="创建临时目录" tabindex="-1">创建临时目录 <a class="header-anchor" href="#创建临时目录" aria-label="Permalink to &quot;创建临时目录&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mkdir /data/webp_data</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 给予 nginx/lua 脚本运行用户可写权限</span></span>
<span class="line"><span style="color:#e1e4e8;">chown -R nginx.nginx /data/webp_data</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mkdir /data/webp_data</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 给予 nginx/lua 脚本运行用户可写权限</span></span>
<span class="line"><span style="color:#24292e;">chown -R nginx.nginx /data/webp_data</span></span></code></pre></div><h4 id="引入-lua-脚本-1" tabindex="-1">引入 lua 脚本 <a class="header-anchor" href="#引入-lua-脚本-1" aria-label="Permalink to &quot;引入 lua 脚本&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">  lua_package_path &quot;/data/apps/luajit2/lib/?.lua;;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">  lua_package_path &quot;/data/apps/luajit2/lib/?.lua;;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>创建执行脚本</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vim /data/apps/nginx/conf/lua/webp_tmp_path.lua</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vim /data/apps/nginx/conf/lua/webp_tmp_path.lua</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">--检测路径是否为目录</span></span>
<span class="line"><span style="color:#e1e4e8;">local function is_dir(sPath)</span></span>
<span class="line"><span style="color:#e1e4e8;">    if type(sPath) ~= &quot;string&quot; then</span></span>
<span class="line"><span style="color:#e1e4e8;">        return false</span></span>
<span class="line"><span style="color:#e1e4e8;">    end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    local response = os.execute(&quot;cd &quot; .. sPath)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    if response == 0 then</span></span>
<span class="line"><span style="color:#e1e4e8;">        return true</span></span>
<span class="line"><span style="color:#e1e4e8;">    end</span></span>
<span class="line"><span style="color:#e1e4e8;">    return false</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">function file_exists(name)</span></span>
<span class="line"><span style="color:#e1e4e8;">  local f=io.open(name,&quot;r&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  if f~=nil then io.close(f) return true else return false end</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">local newFile = ngx.var.webp_filepath;</span></span>
<span class="line"><span style="color:#e1e4e8;">--ngx.log(ngx.ERR, &quot; newFile:&quot;, newFile)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">local originalFile = ngx.var.origin_filepath;</span></span>
<span class="line"><span style="color:#e1e4e8;">--ngx.log(ngx.ERR, &quot; originalFile:&quot;, originalFile)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if not file_exists(originalFile) then -- 原文件不存在</span></span>
<span class="line"><span style="color:#e1e4e8;">  ngx.log(ngx.ERR, &quot;The originalFile is NOT FOUND!&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  ngx.exit(404);</span></span>
<span class="line"><span style="color:#e1e4e8;">  return;</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--获取文件路径，不存在则新增</span></span>
<span class="line"><span style="color:#e1e4e8;">function getFileDir(filename)</span></span>
<span class="line"><span style="color:#e1e4e8;">    return string.match(filename, &quot;(.+)/[^/]*%.%w+$&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if not is_dir(getFileDir(newFile)) then</span></span>
<span class="line"><span style="color:#e1e4e8;">    ngx.log(ngx.ERR, &quot;creating webp tmp document...&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    os.execute(&quot;mkdir -p &quot; .. getFileDir(newFile))</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 转换原图片到 webp 格式，这里的质量是 75 ，你也可以改成别的</span></span>
<span class="line"><span style="color:#e1e4e8;">os.execute(&quot;cwebp -q 75 &quot; .. originalFile .. &quot; -o &quot; .. newFile); </span></span>
<span class="line"><span style="color:#e1e4e8;">ngx.log(ngx.ERR, &quot;converting to webp...&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if file_exists(newFile) then -- 如果新文件存在（转换成功）</span></span>
<span class="line"><span style="color:#e1e4e8;">  -- 转换 webp 成功，并返回 .webp 结尾的 uri 地址</span></span>
<span class="line"><span style="color:#e1e4e8;">  ngx.exec(ngx.var.webp_filename) -- Internal Redirect</span></span>
<span class="line"><span style="color:#e1e4e8;">else</span></span>
<span class="line"><span style="color:#e1e4e8;">  ngx.exit(404)</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">--检测路径是否为目录</span></span>
<span class="line"><span style="color:#24292e;">local function is_dir(sPath)</span></span>
<span class="line"><span style="color:#24292e;">    if type(sPath) ~= &quot;string&quot; then</span></span>
<span class="line"><span style="color:#24292e;">        return false</span></span>
<span class="line"><span style="color:#24292e;">    end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    local response = os.execute(&quot;cd &quot; .. sPath)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    if response == 0 then</span></span>
<span class="line"><span style="color:#24292e;">        return true</span></span>
<span class="line"><span style="color:#24292e;">    end</span></span>
<span class="line"><span style="color:#24292e;">    return false</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">function file_exists(name)</span></span>
<span class="line"><span style="color:#24292e;">  local f=io.open(name,&quot;r&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  if f~=nil then io.close(f) return true else return false end</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">local newFile = ngx.var.webp_filepath;</span></span>
<span class="line"><span style="color:#24292e;">--ngx.log(ngx.ERR, &quot; newFile:&quot;, newFile)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">local originalFile = ngx.var.origin_filepath;</span></span>
<span class="line"><span style="color:#24292e;">--ngx.log(ngx.ERR, &quot; originalFile:&quot;, originalFile)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if not file_exists(originalFile) then -- 原文件不存在</span></span>
<span class="line"><span style="color:#24292e;">  ngx.log(ngx.ERR, &quot;The originalFile is NOT FOUND!&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  ngx.exit(404);</span></span>
<span class="line"><span style="color:#24292e;">  return;</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--获取文件路径，不存在则新增</span></span>
<span class="line"><span style="color:#24292e;">function getFileDir(filename)</span></span>
<span class="line"><span style="color:#24292e;">    return string.match(filename, &quot;(.+)/[^/]*%.%w+$&quot;)</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if not is_dir(getFileDir(newFile)) then</span></span>
<span class="line"><span style="color:#24292e;">    ngx.log(ngx.ERR, &quot;creating webp tmp document...&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    os.execute(&quot;mkdir -p &quot; .. getFileDir(newFile))</span></span>
<span class="line"><span style="color:#24292e;">end</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 转换原图片到 webp 格式，这里的质量是 75 ，你也可以改成别的</span></span>
<span class="line"><span style="color:#24292e;">os.execute(&quot;cwebp -q 75 &quot; .. originalFile .. &quot; -o &quot; .. newFile); </span></span>
<span class="line"><span style="color:#24292e;">ngx.log(ngx.ERR, &quot;converting to webp...&quot;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if file_exists(newFile) then -- 如果新文件存在（转换成功）</span></span>
<span class="line"><span style="color:#24292e;">  -- 转换 webp 成功，并返回 .webp 结尾的 uri 地址</span></span>
<span class="line"><span style="color:#24292e;">  ngx.exec(ngx.var.webp_filename) -- Internal Redirect</span></span>
<span class="line"><span style="color:#24292e;">else</span></span>
<span class="line"><span style="color:#24292e;">  ngx.exit(404)</span></span>
<span class="line"><span style="color:#24292e;">end</span></span></code></pre></div><h4 id="域名配置-1" tabindex="-1">域名配置 <a class="header-anchor" href="#域名配置-1" aria-label="Permalink to &quot;域名配置&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 根据浏览器 accpet 请求头辨别是否支持webp</span></span>
<span class="line"><span style="color:#e1e4e8;">map $http_accept $webp_suffix {</span></span>
<span class="line"><span style="color:#e1e4e8;">    default &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;~*webp&quot; &quot;.webp&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen  80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name abc.xxx.com ;</span></span>
<span class="line"><span style="color:#e1e4e8;">    rewrite ^(.*)$  https://$host$1 permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen    443 ssl http2;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  abc.xxx.com ;</span></span>
<span class="line"><span style="color:#e1e4e8;">    charset utf-8;</span></span>
<span class="line"><span style="color:#e1e4e8;">    access_log  logs/$http_host.access.main.log  main;</span></span>
<span class="line"><span style="color:#e1e4e8;">    error_log  logs/abc.nestealin.com.error.log error;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate      /data/keys/server.cer;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate_key  /data/keys/server.key;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_session_timeout  5m;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_ecdh_curve X25519:P-256:P-384;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_ciphers TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-256-GCM-SHA384:TLS13-AES-128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-CHACHA20-POLY1305:EECDH+CHACHA20:EECDH+AES128;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 开启 TLS 1.3 0-RTT</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_early_data on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    # 添加 Early-Data 头告知后端, 防止重放攻击</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header Early-Data $ssl_early_data;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    #include firewall.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    set $origin_root /data/blogs/;</span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">    location @webp_redirect {</span></span>
<span class="line"><span style="color:#e1e4e8;">        content_by_lua_file &quot;/usr/local/nginx/conf/lua/webp_tmp_path.lua&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location ~ .*\\.(jpg|jpeg|png)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $webp_tmp_root /data/webp_data/;</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $webp_filename $uri$webp_suffix;</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $webp_filepath $webp_tmp_root$webp_filename;</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $origin_filepath $origin_root$uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">        # 兼容不支持 webp 的浏览器，直接返回原格式</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($webp_filename !~ .*\\.webp$) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            root $origin_root;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }    </span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">				# 先去检测是否存在webp文件，如果没有，则内部跳转执行lua转换</span></span>
<span class="line"><span style="color:#e1e4e8;">        try_files $webp_filename @webp_redirect;</span></span>
<span class="line"><span style="color:#e1e4e8;">        root $webp_tmp_root;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        root $origin_root ;</span></span>
<span class="line"><span style="color:#e1e4e8;">        index index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">        if (!-e $request_filename) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            rewrite ^/(.*)$  / redirect;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 根据浏览器 accpet 请求头辨别是否支持webp</span></span>
<span class="line"><span style="color:#24292e;">map $http_accept $webp_suffix {</span></span>
<span class="line"><span style="color:#24292e;">    default &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    &quot;~*webp&quot; &quot;.webp&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen  80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name abc.xxx.com ;</span></span>
<span class="line"><span style="color:#24292e;">    rewrite ^(.*)$  https://$host$1 permanent;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen    443 ssl http2;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  abc.xxx.com ;</span></span>
<span class="line"><span style="color:#24292e;">    charset utf-8;</span></span>
<span class="line"><span style="color:#24292e;">    access_log  logs/$http_host.access.main.log  main;</span></span>
<span class="line"><span style="color:#24292e;">    error_log  logs/abc.nestealin.com.error.log error;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate      /data/keys/server.cer;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate_key  /data/keys/server.key;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_session_timeout  5m;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_ecdh_curve X25519:P-256:P-384;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_ciphers TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-256-GCM-SHA384:TLS13-AES-128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-CHACHA20-POLY1305:EECDH+CHACHA20:EECDH+AES128;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 开启 TLS 1.3 0-RTT</span></span>
<span class="line"><span style="color:#24292e;">    ssl_early_data on;</span></span>
<span class="line"><span style="color:#24292e;">    # 添加 Early-Data 头告知后端, 防止重放攻击</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header Early-Data $ssl_early_data;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    #include firewall.conf;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    set $origin_root /data/blogs/;</span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">    location @webp_redirect {</span></span>
<span class="line"><span style="color:#24292e;">        content_by_lua_file &quot;/usr/local/nginx/conf/lua/webp_tmp_path.lua&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location ~ .*\\.(jpg|jpeg|png)$ {</span></span>
<span class="line"><span style="color:#24292e;">        set $webp_tmp_root /data/webp_data/;</span></span>
<span class="line"><span style="color:#24292e;">        set $webp_filename $uri$webp_suffix;</span></span>
<span class="line"><span style="color:#24292e;">        set $webp_filepath $webp_tmp_root$webp_filename;</span></span>
<span class="line"><span style="color:#24292e;">        set $origin_filepath $origin_root$uri;</span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">        # 兼容不支持 webp 的浏览器，直接返回原格式</span></span>
<span class="line"><span style="color:#24292e;">        if ($webp_filename !~ .*\\.webp$) {</span></span>
<span class="line"><span style="color:#24292e;">            root $origin_root;</span></span>
<span class="line"><span style="color:#24292e;">        }    </span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">				# 先去检测是否存在webp文件，如果没有，则内部跳转执行lua转换</span></span>
<span class="line"><span style="color:#24292e;">        try_files $webp_filename @webp_redirect;</span></span>
<span class="line"><span style="color:#24292e;">        root $webp_tmp_root;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        root $origin_root ;</span></span>
<span class="line"><span style="color:#24292e;">        index index.html;</span></span>
<span class="line"><span style="color:#24292e;">        if (!-e $request_filename) {</span></span>
<span class="line"><span style="color:#24292e;">            rewrite ^/(.*)$  / redirect;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,42),c=[o];function t(i,r,y,u,d,g){return n(),a("div",null,c)}const f=s(p,[["render",t]]);export{h as __pageData,f as default};
