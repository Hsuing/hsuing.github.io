import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1. S3 cmd","description":"","frontmatter":{},"headers":[],"relativePath":"guide/cloud/aws/diskvolume/4-s3.md","filePath":"guide/cloud/aws/diskvolume/4-s3.md","lastUpdated":1745936384000}'),l={name:"guide/cloud/aws/diskvolume/4-s3.md"},p=n(`<p><a href="https://blog.51cto.com/thedream/1893168" target="_blank" rel="noreferrer">https://blog.51cto.com/thedream/1893168</a></p><p><a href="https://www.cnblogs.com/hei-ma/p/10155004.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/hei-ma/p/10155004.html</a></p><p><a href="https://www.cnblogs.com/syavingcs/p/7302501.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/syavingcs/p/7302501.html</a></p><h1 id="_1-s3-cmd" tabindex="-1">1. S3 cmd <a class="header-anchor" href="#_1-s3-cmd" aria-label="Permalink to &quot;1. S3 cmd&quot;">​</a></h1><p>官方网站 <a href="http://s3tools.org/s3cmd" target="_blank" rel="noreferrer">http://s3tools.org/s3cmd</a></p><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><p>pip install s3cmd</p><p>第一次使用 <code>s3cmd</code> 前，需要先填写必要的信息。运行 <code>s3cmd --configure</code>，填入 csv 文件中的 access key 和 secret key，其余选项通常可以使用默认设定。设置结束后，在 <code>$HOME</code> 目录下会出现一个 <code>.s3cfg</code> 文件，里面存储了所有的设置信息。你可以使用文本编辑器进一步修改它</p><h3 id="创建一个-bucket" tabindex="-1">创建一个 bucket <a class="header-anchor" href="#创建一个-bucket" aria-label="Permalink to &quot;创建一个 bucket&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">s3cmd mb s3://bucket-name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">s3cmd mb s3://bucket-name</span></span></code></pre></div><h3 id="显示所有-bucket" tabindex="-1">显示所有 bucket <a class="header-anchor" href="#显示所有-bucket" aria-label="Permalink to &quot;显示所有 bucket&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">s3cmd ls</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">s3cmd ls</span></span></code></pre></div><h3 id="显示一个-bucket-中的内容" tabindex="-1">显示一个 bucket 中的内容 <a class="header-anchor" href="#显示一个-bucket-中的内容" aria-label="Permalink to &quot;显示一个 bucket 中的内容&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 只显示根目录下的文件和文件夹</span></span>
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
<span class="line"><span style="color:#24292e;">s3cmd rb --force s3://bucket-1</span></span></code></pre></div><h1 id="_2-s3上开启cors" tabindex="-1">2. S3上开启CORS <a class="header-anchor" href="#_2-s3上开启cors" aria-label="Permalink to &quot;2. S3上开启CORS&quot;">​</a></h1><p><a href="https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/ManageCorsUsing.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/ManageCorsUsing.html</a></p><p><a href="https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/VirtualHosting.html#virtual-hosted-style-access" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/VirtualHosting.html#virtual-hosted-style-access</a></p><p><a href="https://docs.aws.amazon.com/zh_cn/sdk-for-javascript/v3/developer-guide/s3-example-photo-album.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/sdk-for-javascript/v3/developer-guide/s3-example-photo-album.html</a></p><h1 id="_3-跨账户复制数据" tabindex="-1">3. 跨账户复制数据 <a class="header-anchor" href="#_3-跨账户复制数据" aria-label="Permalink to &quot;3. 跨账户复制数据&quot;">​</a></h1><h2 id="_3-1-源地址配置" tabindex="-1">3.1 源地址配置 <a class="header-anchor" href="#_3-1-源地址配置" aria-label="Permalink to &quot;3.1 源地址配置&quot;">​</a></h2><p>进入原始数据保存的S3桶，进入桶内，在标签页中点击第三个标签页Permission权限界面，在下方的Bucket Policy位置输入如下的配置。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;Version&quot;: &quot;2012-10-17&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;Statement&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">        {</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;Sid&quot;: &quot;DelegateS3Access&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;Effect&quot;: &quot;Allow&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;Principal&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;AWS&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                    &quot;arn:aws:iam::123456781111:root&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                    &quot;arn:aws:iam::987654321111:root&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                ]</span></span>
<span class="line"><span style="color:#e1e4e8;">            },</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;Action&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;s3:ListBucket&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;s3:GetObject&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">            ],</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;Resource&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;arn:aws:s3:::demo-data-abc/*&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;arn:aws:s3:::demo-data-abc&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">            ]</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;Version&quot;: &quot;2012-10-17&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;Statement&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">        {</span></span>
<span class="line"><span style="color:#24292e;">            &quot;Sid&quot;: &quot;DelegateS3Access&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;Effect&quot;: &quot;Allow&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;Principal&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">                &quot;AWS&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">                    &quot;arn:aws:iam::123456781111:root&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                    &quot;arn:aws:iam::987654321111:root&quot;</span></span>
<span class="line"><span style="color:#24292e;">                ]</span></span>
<span class="line"><span style="color:#24292e;">            },</span></span>
<span class="line"><span style="color:#24292e;">            &quot;Action&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">                &quot;s3:ListBucket&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                &quot;s3:GetObject&quot;</span></span>
<span class="line"><span style="color:#24292e;">            ],</span></span>
<span class="line"><span style="color:#24292e;">            &quot;Resource&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">                &quot;arn:aws:s3:::demo-data-abc/*&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                &quot;arn:aws:s3:::demo-data-abc&quot;</span></span>
<span class="line"><span style="color:#24292e;">            ]</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>请替换上文中的AWS账号为要分发给的用户的账号，如果有多个账号，请分别填写，<code>并将Resource部分的S3桶名字替换为实际要分发数据的桶的名字</code>。在这个AWS账户下的IAM用户隶属的Access Key都将具有权限。此外，如果希望复制整个目录，使用 --recursive 命令，那么就需要提供ListBucket权限，否则将只能逐条复制单个文件而不能复制自动的整个目录。</p><p>注：虽然AWS中国区没有root账号，但是实际操作中本策略可以成功地为中国区的一个AWS账户内的所有IAM用户赋予访问权限。</p><p>现在可以切换到要复制数据的用户账户内，创建IAM用户，创建Access Key，安装AWS CLI客户端，配置Access Key，然后开始数据复制。</p><p>执行如下命令复制整个桶。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">aws s3 cp --recursive s3://demo-data-abc/demo1/ s3://my-demo-bucket/demo1/ --copy-props none</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">aws s3 cp --recursive s3://demo-data-abc/demo1/ s3://my-demo-bucket/demo1/ --copy-props none</span></span></code></pre></div><h1 id="_4-s3上传加速" tabindex="-1">4. s3上传加速 <a class="header-anchor" href="#_4-s3上传加速" aria-label="Permalink to &quot;4. s3上传加速&quot;">​</a></h1><p>S3 Accelerator目前仅在Global区域有效</p><h2 id="_4-1-启动" tabindex="-1">4.1 启动 <a class="header-anchor" href="#_4-1-启动" aria-label="Permalink to &quot;4.1 启动&quot;">​</a></h2><p>进入S3存储桶，点击第二个标签页”属性“，点击高级设置中的”转移加速度“（英文是Tranfer acceleration），点击Enable启用。然后点击Save保存</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250429164658928.png" alt="image-20250429164647041"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250429164733491.png" alt="image-20250429164731268"></p><h2 id="_4-2-费用" tabindex="-1">4.2 费用 <a class="header-anchor" href="#_4-2-费用" aria-label="Permalink to &quot;4.2 费用&quot;">​</a></h2><p>S3 Transfer Acceleration 主要用于上传方向的加速，其原理是利用<a href="https://aws.amazon.com/cn/cloudfront/features/" target="_blank" rel="noreferrer">CloudFront的CDN POP点</a>做加速。</p><p>费用定义在如下页面的下半部分的“传输加速”章节中描述：</p><p><a href="https://aws.amazon.com/cn/s3/pricing/?nc=sn&amp;loc=4" target="_blank" rel="noreferrer">https://aws.amazon.com/cn/s3/pricing/?nc=sn&amp;loc=4</a></p><blockquote><p>官方说明：</p><p><em>每当您使用 S3 Transfer Acceleration 上传对象时，我们都会检查此服务的传输速度是否有可能比常规 Amazon S3 的快。在将同一对象传输到同一目标 AWS 区域时，如果我们确定此服务的传输速度不会快于常规 Amazon S3，那么对于此次使用 S3 Transfer Acceleration 进行的传输，我们将不会收取任何费用，并且可能对此次上传绕过 S3 Transfer Acceleration 系统。</em></p></blockquote><h1 id="_5-挂载s3到ec2" tabindex="-1">5. 挂载s3到ec2 <a class="header-anchor" href="#_5-挂载s3到ec2" aria-label="Permalink to &quot;5. 挂载s3到ec2&quot;">​</a></h1>`,52),c=[p];function o(t,r,i,d,u,h){return a(),e("div",null,c)}const b=s(l,[["render",o]]);export{m as __pageData,b as default};
