import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/cloud/aws/3-s3.md","filePath":"guide/cloud/aws/3-s3.md","lastUpdated":1709272809000}'),l={name:"guide/cloud/aws/3-s3.md"},p=n(`<p><a href="https://blog.51cto.com/thedream/1893168" target="_blank" rel="noreferrer">https://blog.51cto.com/thedream/1893168</a></p><p><a href="https://www.cnblogs.com/hei-ma/p/10155004.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/hei-ma/p/10155004.html</a></p><h2 id="_1-s3-cmd" tabindex="-1">1.S3 cmd <a class="header-anchor" href="#_1-s3-cmd" aria-label="Permalink to &quot;1.S3 cmd&quot;">​</a></h2><p>官方网站 <a href="http://s3tools.org/s3cmd" target="_blank" rel="noreferrer">http://s3tools.org/s3cmd</a></p><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><p>pip install s3cmd</p><p>第一次使用 <code>s3cmd</code> 前，需要先填写必要的信息。运行 <code>s3cmd --configure</code>，填入 csv 文件中的 access key 和 secret key，其余选项通常可以使用默认设定。设置结束后，在 <code>$HOME</code> 目录下会出现一个 <code>.s3cfg</code> 文件，里面存储了所有的设置信息。你可以使用文本编辑器进一步修改它</p><h3 id="创建一个-bucket" tabindex="-1">创建一个 bucket <a class="header-anchor" href="#创建一个-bucket" aria-label="Permalink to &quot;创建一个 bucket&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">s3cmd mb s3://bucket-name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">s3cmd mb s3://bucket-name</span></span></code></pre></div><h3 id="显示所有-bucket" tabindex="-1">显示所有 bucket <a class="header-anchor" href="#显示所有-bucket" aria-label="Permalink to &quot;显示所有 bucket&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">s3cmd ls</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">s3cmd ls</span></span></code></pre></div><h3 id="显示一个-bucket-中的内容" tabindex="-1">显示一个 bucket 中的内容 <a class="header-anchor" href="#显示一个-bucket-中的内容" aria-label="Permalink to &quot;显示一个 bucket 中的内容&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 只显示根目录下的文件和文件夹</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd ls s3://bucket-1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 显示所有文件和文件夹</span></span>
<span class="line"><span style="color:#e1e4e8;"># -r 可以用 --recursive 代替，下同</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd ls -r s3://bucket-1</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd la s3://bucket-1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 只显示根目录下的文件和文件夹</span></span>
<span class="line"><span style="color:#24292e;">s3cmd ls s3://bucket-1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 显示所有文件和文件夹</span></span>
<span class="line"><span style="color:#24292e;"># -r 可以用 --recursive 代替，下同</span></span>
<span class="line"><span style="color:#24292e;">s3cmd ls -r s3://bucket-1</span></span>
<span class="line"><span style="color:#24292e;">s3cmd la s3://bucket-1</span></span></code></pre></div><h3 id="上传文件" tabindex="-1">上传文件 <a class="header-anchor" href="#上传文件" aria-label="Permalink to &quot;上传文件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 上传单个文件</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd put file-1 s3://bucket-1/dir-1/file-1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 上传整个文件夹</span></span>
<span class="line"><span style="color:#e1e4e8;"># dir-1 将存放在 dir-2 之下</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd put -r dir-1 s3://bucket-1/dir-2/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 与 put -r 类似</span></span>
<span class="line"><span style="color:#e1e4e8;"># 但只上传已修改的文件</span></span>
<span class="line"><span style="color:#e1e4e8;"># 相当于 Linux 中的 rsync</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd sync dir-1 s3://bucket-1/dir-2/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 上传单个文件</span></span>
<span class="line"><span style="color:#24292e;">s3cmd put file-1 s3://bucket-1/dir-1/file-1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 上传整个文件夹</span></span>
<span class="line"><span style="color:#24292e;"># dir-1 将存放在 dir-2 之下</span></span>
<span class="line"><span style="color:#24292e;">s3cmd put -r dir-1 s3://bucket-1/dir-2/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 与 put -r 类似</span></span>
<span class="line"><span style="color:#24292e;"># 但只上传已修改的文件</span></span>
<span class="line"><span style="color:#24292e;"># 相当于 Linux 中的 rsync</span></span>
<span class="line"><span style="color:#24292e;">s3cmd sync dir-1 s3://bucket-1/dir-2/</span></span></code></pre></div><h3 id="下载文件" tabindex="-1">下载文件 <a class="header-anchor" href="#下载文件" aria-label="Permalink to &quot;下载文件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 下载单个文件</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd get s3://bucket-1/dir-1/file-1 file-1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 下载整个文件夹</span></span>
<span class="line"><span style="color:#e1e4e8;"># 将在当前路径创建 dir-1 文件夹</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd get -r s3://bucket-1/dir-1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 下载整个文件夹</span></span>
<span class="line"><span style="color:#e1e4e8;"># 直接下载内容，不创建 dir-1 文件夹</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd get -r s3://bucket-1/dir-1/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 下载单个文件</span></span>
<span class="line"><span style="color:#24292e;">s3cmd get s3://bucket-1/dir-1/file-1 file-1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 下载整个文件夹</span></span>
<span class="line"><span style="color:#24292e;"># 将在当前路径创建 dir-1 文件夹</span></span>
<span class="line"><span style="color:#24292e;">s3cmd get -r s3://bucket-1/dir-1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 下载整个文件夹</span></span>
<span class="line"><span style="color:#24292e;"># 直接下载内容，不创建 dir-1 文件夹</span></span>
<span class="line"><span style="color:#24292e;">s3cmd get -r s3://bucket-1/dir-1/</span></span></code></pre></div><h3 id="复制文件" tabindex="-1">复制文件 <a class="header-anchor" href="#复制文件" aria-label="Permalink to &quot;复制文件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 复制单个文件</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd cp s3://bucket-1/file-1 s3://bucket-2/file-2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 复制整个文件夹的内容</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd cp s3://bucket-1/dir-1/ s3://bucket-2/dir-2/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 复制单个文件</span></span>
<span class="line"><span style="color:#24292e;">s3cmd cp s3://bucket-1/file-1 s3://bucket-2/file-2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 复制整个文件夹的内容</span></span>
<span class="line"><span style="color:#24292e;">s3cmd cp s3://bucket-1/dir-1/ s3://bucket-2/dir-2/</span></span></code></pre></div><h3 id="移动文件" tabindex="-1">移动文件 <a class="header-anchor" href="#移动文件" aria-label="Permalink to &quot;移动文件&quot;">​</a></h3><p># 移动单个文件 s3cmd mv s3://bucket-1/file-1 s3://bucket-2/file-2</p><p># 移动整个文件夹的内容 s3cmd mv s3://bucket-1/dir-1/ s3://bucket-2/dir-2/</p><h3 id="删除文件" tabindex="-1">删除文件 <a class="header-anchor" href="#删除文件" aria-label="Permalink to &quot;删除文件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 删除单个文件</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd rm s3://bucket-1/file-1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 删除整个文件夹</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd rm -r s3://bucket-1/dir-1/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 删除单个文件</span></span>
<span class="line"><span style="color:#24292e;">s3cmd rm s3://bucket-1/file-1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 删除整个文件夹</span></span>
<span class="line"><span style="color:#24292e;">s3cmd rm -r s3://bucket-1/dir-1/</span></span></code></pre></div><h3 id="删除-bucket" tabindex="-1">删除 bucket <a class="header-anchor" href="#删除-bucket" aria-label="Permalink to &quot;删除 bucket&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 删除一个空的 bucket</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd rb s3://bucket-1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 删除 bucket 和其中的所有内容</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd rb --force s3://bucket-1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 删除一个空的 bucket</span></span>
<span class="line"><span style="color:#24292e;">s3cmd rb s3://bucket-1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 删除 bucket 和其中的所有内容</span></span>
<span class="line"><span style="color:#24292e;">s3cmd rb --force s3://bucket-1</span></span></code></pre></div><h2 id="_2-s3上开启cors" tabindex="-1">2.S3上开启CORS <a class="header-anchor" href="#_2-s3上开启cors" aria-label="Permalink to &quot;2.S3上开启CORS&quot;">​</a></h2><p><a href="https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/ManageCorsUsing.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/ManageCorsUsing.html</a></p><p><a href="https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/VirtualHosting.html#virtual-hosted-style-access" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/VirtualHosting.html#virtual-hosted-style-access</a></p><p><a href="https://docs.aws.amazon.com/zh_cn/sdk-for-javascript/v3/developer-guide/s3-example-photo-album.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/sdk-for-javascript/v3/developer-guide/s3-example-photo-album.html</a></p><ul><li>配置规则</li></ul><p><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/ManageCorsUsing.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/AmazonS3/latest/userguide/ManageCorsUsing.html</a></p><ul><li>案例</li></ul><p>打开s3-&gt;权限-&gt;cors</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;AllowedHeaders&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">        	&quot;*&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;AllowedMethods&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;GET&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;PUT&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;HEAD&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;AllowedOrigins&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;*&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;ExposeHeaders&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;x-amz-server-side-encryption&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;x-amz-request-id&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;x-amz-id-2&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;Access-Control-Allow-Origin&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;MaxAgeSeconds&quot;: 3000</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;AllowedHeaders&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">        	&quot;*&quot;</span></span>
<span class="line"><span style="color:#24292e;">        ],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;AllowedMethods&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">            &quot;GET&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;PUT&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;HEAD&quot;</span></span>
<span class="line"><span style="color:#24292e;">        ],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;AllowedOrigins&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">            &quot;*&quot;</span></span>
<span class="line"><span style="color:#24292e;">        ],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;ExposeHeaders&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">            &quot;x-amz-server-side-encryption&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;x-amz-request-id&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;x-amz-id-2&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;Access-Control-Allow-Origin&quot;</span></span>
<span class="line"><span style="color:#24292e;">        ],</span></span>
<span class="line"><span style="color:#24292e;">        &quot;MaxAgeSeconds&quot;: 3000</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">]</span></span></code></pre></div><h3 id="_2-1cors-方法进行故障排除" tabindex="-1">2.1CORS 方法进行故障排除 <a class="header-anchor" href="#_2-1cors-方法进行故障排除" aria-label="Permalink to &quot;2.1CORS 方法进行故障排除&quot;">​</a></h3><p>1.通过添加 -H &quot;Access-Control-Request-Method:&quot; 标志，使用 cURL 命令利用特定 CORS 方法： Method发出请求。此标志指定要测试的 CORS 方法。使用 --request OPTIONS 标志对请求执行预检检查。</p><p><strong>注意</strong>：Amazon S3 支持 GET、HEAD、PUT、POST 和 DELETE 方法</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://mycorsbucket.s3.amazonaws.com/cors-test.html</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-H</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Access-Control-Request-Method: POST&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--request</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">OPTIONS</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-H</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Origin: http://www.example.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">&lt;?</span><span style="color:#E1E4E8;">xml version=</span><span style="color:#9ECBFF;">&quot;1.0&quot;</span><span style="color:#E1E4E8;"> encoding=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#F97583;">?&gt;</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Error&gt;&lt;Code</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">AccessForbidden</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">/Code&gt;&lt;Message</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">CORSResponse: This CORS request is not allowed. This is usually because the evalution of Origin, request method / Access-Control-Request-Method or Access-Control-Request-Headers are not whitelisted by the resource</span><span style="color:#9ECBFF;">&#39;s CORS spec.&lt;/Message&gt;&lt;Method&gt;POST&lt;/Method&gt;&lt;ResourceType&gt;OBJECT&lt;/ResourceType&gt;&lt;RequestId&gt;190J4Q6222HA2KZ5&lt;/RequestId&gt;&lt;HostId&gt;6oEci3qg88OeoLvBGwkN8K9AGdxyVela8ZKxftXMqyWrtZFfiKMrBwpTAeRiOth8amovJMtAAdA=&lt;/HostId&gt;&lt;/Error&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://mycorsbucket.s3.amazonaws.com/cors-test.html</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-H</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Access-Control-Request-Method: POST&quot;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--request</span><span style="color:#24292E;"> </span><span style="color:#032F62;">OPTIONS</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-H</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Origin: http://www.example.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">&lt;?</span><span style="color:#24292E;">xml version=</span><span style="color:#032F62;">&quot;1.0&quot;</span><span style="color:#24292E;"> encoding=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#D73A49;">?&gt;</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Error&gt;&lt;Code</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">AccessForbidden</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">/Code&gt;&lt;Message</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">CORSResponse: This CORS request is not allowed. This is usually because the evalution of Origin, request method / Access-Control-Request-Method or Access-Control-Request-Headers are not whitelisted by the resource</span><span style="color:#032F62;">&#39;s CORS spec.&lt;/Message&gt;&lt;Method&gt;POST&lt;/Method&gt;&lt;ResourceType&gt;OBJECT&lt;/ResourceType&gt;&lt;RequestId&gt;190J4Q6222HA2KZ5&lt;/RequestId&gt;&lt;HostId&gt;6oEci3qg88OeoLvBGwkN8K9AGdxyVela8ZKxftXMqyWrtZFfiKMrBwpTAeRiOth8amovJMtAAdA=&lt;/HostId&gt;&lt;/Error&gt;</span></span></code></pre></div><p>2.如果请求返回错误，请验证是否在桶上设置了 CORS 配置。请确保已将所需方法添加到桶上的 CORS 规则中。如果设置了 CORS 配置，则您将在 S3 控制台中桶的<strong>权限</strong>部分看到编辑 CORS 配置的选项</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">aws s3api put-bucket-cors --bucket mycorsbucket --cors-configuration &#39;{&quot;CORSRules&quot; : [{&quot;AllowedHeaders&quot;:[&quot;Authorization&quot;],&quot;AllowedMethods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;,&quot;POST&quot;],&quot;AllowedOrigins&quot;:[&quot;http://www.example.com&quot;],&quot;ExposeHeaders&quot;:[&quot;Access-Control-Allow-Origin&quot;]}]}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">aws s3api put-bucket-cors --bucket mycorsbucket --cors-configuration &#39;{&quot;CORSRules&quot; : [{&quot;AllowedHeaders&quot;:[&quot;Authorization&quot;],&quot;AllowedMethods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;,&quot;POST&quot;],&quot;AllowedOrigins&quot;:[&quot;http://www.example.com&quot;],&quot;ExposeHeaders&quot;:[&quot;Access-Control-Allow-Origin&quot;]}]}&#39;</span></span></code></pre></div><p>3.测试更新的 CORS 规则。如果您的方法按预期运行，那么您将收到以下响应：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -i http://mycorsbucket.s3.amazonaws.com/cors-test.html -H &quot;Origin: http://www.example.com&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">x-amz-id-2: tH9jeXGs0rGLGmM8l/4aELEqhe+uBPIFLo7dYqM9nsCOg8tUoqhSVu2ahBV2dn5P7Q5g3Tw1Iaw=</span></span>
<span class="line"><span style="color:#e1e4e8;">x-amz-request-id: DYTP8VXK4HYBBTNS</span></span>
<span class="line"><span style="color:#e1e4e8;">Date: Fri, 01 Mar 2024 02:08:42 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">Access-Control-Allow-Origin: *</span></span>
<span class="line"><span style="color:#e1e4e8;">Access-Control-Allow-Methods: GET</span></span>
<span class="line"><span style="color:#e1e4e8;">Access-Control-Expose-Headers: x-amz-server-side-encryption, x-amz-request-id, x-amz-id-2</span></span>
<span class="line"><span style="color:#e1e4e8;">Access-Control-Max-Age: 3000</span></span>
<span class="line"><span style="color:#e1e4e8;">Vary: Origin, Access-Control-Request-Headers, Access-Control-Request-Method</span></span>
<span class="line"><span style="color:#e1e4e8;">Last-Modified: Wed, 28 Feb 2024 07:46:26 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">ETag: &quot;7e2e5f9a95159aa6c4c176652afa0f77&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">x-amz-server-side-encryption: AES256</span></span>
<span class="line"><span style="color:#e1e4e8;">Accept-Ranges: bytes</span></span>
<span class="line"><span style="color:#e1e4e8;">Content-Type: text/plain</span></span>
<span class="line"><span style="color:#e1e4e8;">Server: AmazonS3</span></span>
<span class="line"><span style="color:#e1e4e8;">Content-Length: 8365</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -i http://mycorsbucket.s3.amazonaws.com/cors-test.html -H &quot;Origin: http://www.example.com&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">x-amz-id-2: tH9jeXGs0rGLGmM8l/4aELEqhe+uBPIFLo7dYqM9nsCOg8tUoqhSVu2ahBV2dn5P7Q5g3Tw1Iaw=</span></span>
<span class="line"><span style="color:#24292e;">x-amz-request-id: DYTP8VXK4HYBBTNS</span></span>
<span class="line"><span style="color:#24292e;">Date: Fri, 01 Mar 2024 02:08:42 GMT</span></span>
<span class="line"><span style="color:#24292e;">Access-Control-Allow-Origin: *</span></span>
<span class="line"><span style="color:#24292e;">Access-Control-Allow-Methods: GET</span></span>
<span class="line"><span style="color:#24292e;">Access-Control-Expose-Headers: x-amz-server-side-encryption, x-amz-request-id, x-amz-id-2</span></span>
<span class="line"><span style="color:#24292e;">Access-Control-Max-Age: 3000</span></span>
<span class="line"><span style="color:#24292e;">Vary: Origin, Access-Control-Request-Headers, Access-Control-Request-Method</span></span>
<span class="line"><span style="color:#24292e;">Last-Modified: Wed, 28 Feb 2024 07:46:26 GMT</span></span>
<span class="line"><span style="color:#24292e;">ETag: &quot;7e2e5f9a95159aa6c4c176652afa0f77&quot;</span></span>
<span class="line"><span style="color:#24292e;">x-amz-server-side-encryption: AES256</span></span>
<span class="line"><span style="color:#24292e;">Accept-Ranges: bytes</span></span>
<span class="line"><span style="color:#24292e;">Content-Type: text/plain</span></span>
<span class="line"><span style="color:#24292e;">Server: AmazonS3</span></span>
<span class="line"><span style="color:#24292e;">Content-Length: 8365</span></span></code></pre></div><p>4.使用您选择的工具捕获完整的请求和响应。对于 Amazon S3 收到的每个请求，您必须有一个 CORS 规则与请求中的数据相匹配</p><ul><li>验证请求是否具有 <strong>Origin</strong> 标头。如果缺少标头，则 Amazon S3 不会将该请求视为跨源请求，也不会在响应中发送 CORS 响应标头。</li><li>验证您的请求中的 Origin 标头是否与指定 CORSRule 中的至少一个 <strong>AllowedOrigins</strong> 元素相匹配。Origin 请求标头中的方案、主机和端口值必须与 CORSRule 中的 <strong>AllowedOrigins</strong> 元素相匹配。例如，假设您将 CORSRule 设置为允许源 <a href="http://www.example.com/" target="_blank" rel="noreferrer">http://www.example.com</a>。当您这样做时，请求中的源 <a href="https://www.example.com" target="_blank" rel="noreferrer">https://www.example.com</a> 和 <a href="http://www.example.com:80" target="_blank" rel="noreferrer">http://www.example.com:80</a> 与配置中允许的源不匹配。</li><li>验证您的请求或预检请求中的方法（在 <strong>Access-Control-Request-Method</strong> 中指定的方法）是否是同一 CORSRule 中的 <strong>AllowedMethods</strong> 元素之一。</li><li>如果预检请求包含 <strong>Access-Control-Request-Headers</strong> 标头，请验证 CORSRule 是否包含 <strong>Access-Control-Request-Headers</strong> 标头中每个值的 AllowedHeader 条目</li></ul><h2 id="_3-nginx代理s3" tabindex="-1">3.nginx代理s3 <a class="header-anchor" href="#_3-nginx代理s3" aria-label="Permalink to &quot;3.nginx代理s3&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  img.xxx.com;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_http_version 1.1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_buffering off;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_request_buffering off;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">include /data/apps/nginx/conf/roles/*.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_hide_header x-amz-id-2;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_hide_header x-amz-request-id;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_hide_header x-amz-meta-s3b-last-modified;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_hide_header x-amz-meta-sha256;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_hide_header x-amz-server-side-encryption;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://s3.ap-xxx-1.amazonaws.com/bitimg.xxx.ai/;</span></span>
<span class="line"><span style="color:#e1e4e8;">	expires 3d;    #缓存3天</span></span>
<span class="line"><span style="color:#e1e4e8;">	access_log /var/log/nginx/oss.log es;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  img.xxx.com;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    proxy_http_version 1.1;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_buffering off;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_request_buffering off;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">include /data/apps/nginx/conf/roles/*.conf;</span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">	proxy_hide_header x-amz-id-2;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_hide_header x-amz-request-id;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_hide_header x-amz-meta-s3b-last-modified;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_hide_header x-amz-meta-sha256;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_hide_header x-amz-server-side-encryption;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://s3.ap-xxx-1.amazonaws.com/bitimg.xxx.ai/;</span></span>
<span class="line"><span style="color:#24292e;">	expires 3d;    #缓存3天</span></span>
<span class="line"><span style="color:#24292e;">	access_log /var/log/nginx/oss.log es;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,47),o=[p];function t(c,r,i,d,u,y){return e(),a("div",null,o)}const m=s(l,[["render",t]]);export{g as __pageData,m as default};
