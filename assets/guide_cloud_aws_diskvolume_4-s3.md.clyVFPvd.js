import{_ as s,o as a,c as e,R as n}from"./chunks/framework.byfcZK4E.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/cloud/aws/diskvolume/4-s3.md","filePath":"guide/cloud/aws/diskvolume/4-s3.md","lastUpdated":1701247404000}'),l={name:"guide/cloud/aws/diskvolume/4-s3.md"},p=n(`<p><a href="https://blog.51cto.com/thedream/1893168" target="_blank" rel="noreferrer">https://blog.51cto.com/thedream/1893168</a></p><p><a href="https://www.cnblogs.com/hei-ma/p/10155004.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/hei-ma/p/10155004.html</a></p><p><a href="https://www.cnblogs.com/syavingcs/p/7302501.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/syavingcs/p/7302501.html</a></p><h2 id="_1-s3-cmd" tabindex="-1">1.S3 cmd <a class="header-anchor" href="#_1-s3-cmd" aria-label="Permalink to &quot;1.S3 cmd&quot;">​</a></h2><p>官方网站 <a href="http://s3tools.org/s3cmd" target="_blank" rel="noreferrer">http://s3tools.org/s3cmd</a></p><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><p>pip install s3cmd</p><p>第一次使用 <code>s3cmd</code> 前，需要先填写必要的信息。运行 <code>s3cmd --configure</code>，填入 csv 文件中的 access key 和 secret key，其余选项通常可以使用默认设定。设置结束后，在 <code>$HOME</code> 目录下会出现一个 <code>.s3cfg</code> 文件，里面存储了所有的设置信息。你可以使用文本编辑器进一步修改它</p><h3 id="创建一个-bucket" tabindex="-1">创建一个 bucket <a class="header-anchor" href="#创建一个-bucket" aria-label="Permalink to &quot;创建一个 bucket&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">s3cmd mb s3://bucket-name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">s3cmd mb s3://bucket-name</span></span></code></pre></div><h3 id="显示所有-bucket" tabindex="-1">显示所有 bucket <a class="header-anchor" href="#显示所有-bucket" aria-label="Permalink to &quot;显示所有 bucket&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">s3cmd ls</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">s3cmd ls</span></span></code></pre></div><h3 id="显示一个-bucket-中的内容" tabindex="-1">显示一个 bucket 中的内容 <a class="header-anchor" href="#显示一个-bucket-中的内容" aria-label="Permalink to &quot;显示一个 bucket 中的内容&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 只显示根目录下的文件和文件夹</span></span>
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
<span class="line"><span style="color:#e1e4e8;">\\# 删除整个文件夹</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd rm -r s3://bucket-1/dir-1/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 删除单个文件</span></span>
<span class="line"><span style="color:#24292e;">s3cmd rm s3://bucket-1/file-1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">\\# 删除整个文件夹</span></span>
<span class="line"><span style="color:#24292e;">s3cmd rm -r s3://bucket-1/dir-1/</span></span></code></pre></div><h3 id="删除-bucket" tabindex="-1">删除 bucket <a class="header-anchor" href="#删除-bucket" aria-label="Permalink to &quot;删除 bucket&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 删除一个空的 bucket</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd rb s3://bucket-1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 删除 bucket 和其中的所有内容</span></span>
<span class="line"><span style="color:#e1e4e8;">s3cmd rb --force s3://bucket-1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 删除一个空的 bucket</span></span>
<span class="line"><span style="color:#24292e;">s3cmd rb s3://bucket-1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 删除 bucket 和其中的所有内容</span></span>
<span class="line"><span style="color:#24292e;">s3cmd rb --force s3://bucket-1</span></span></code></pre></div><h2 id="_2-s3上开启cors" tabindex="-1">2.S3上开启CORS <a class="header-anchor" href="#_2-s3上开启cors" aria-label="Permalink to &quot;2.S3上开启CORS&quot;">​</a></h2><p><a href="https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/ManageCorsUsing.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/ManageCorsUsing.html</a></p><p><a href="https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/VirtualHosting.html#virtual-hosted-style-access" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/VirtualHosting.html#virtual-hosted-style-access</a></p><p><a href="https://docs.aws.amazon.com/zh_cn/sdk-for-javascript/v3/developer-guide/s3-example-photo-album.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/sdk-for-javascript/v3/developer-guide/s3-example-photo-album.html</a></p>`,31),c=[p];function t(o,r,i,d,h,u){return a(),e("div",null,c)}const k=s(l,[["render",t]]);export{m as __pageData,k as default};
