import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"一、https搭建步骤","description":"","frontmatter":{},"headers":[],"relativePath":"guide/cloud/aws/cloudfront/1-cloudfront.md","filePath":"guide/cloud/aws/cloudfront/1-cloudfront.md","lastUpdated":1701330715000}'),l={name:"guide/cloud/aws/cloudfront/1-cloudfront.md"},p=e(`<blockquote><p>使用aws cloudfront的前提</p></blockquote><blockquote><p>注意 https or http 统一标准否则出现不能访问.</p></blockquote><h1 id="一、https搭建步骤" tabindex="-1">一、https搭建步骤 <a class="header-anchor" href="#一、https搭建步骤" aria-label="Permalink to &quot;一、https搭建步骤&quot;">​</a></h1><h2 id="_1-创建" tabindex="-1">1.创建 <a class="header-anchor" href="#_1-创建" aria-label="Permalink to &quot;1.创建&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301428376.png" alt="创建"></p><h2 id="_2-入门" tabindex="-1">2.入门 <a class="header-anchor" href="#_2-入门" aria-label="Permalink to &quot;2.入门&quot;">​</a></h2><p>分发类型分为一般的静态文件分发和流媒体分发，即Web和RTMP，我的站点即选择Web类型</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301429433.png" alt="入门"></p><h2 id="_3-源配置" tabindex="-1">3.源配置 <a class="header-anchor" href="#_3-源配置" aria-label="Permalink to &quot;3.源配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">a. 首先要填写源站地址Origin Domain Name，源站可以是一个AWS S3，也可是是一个普通web站点。</span></span>
<span class="line"><span style="color:#e1e4e8;">对于web站点，你要填写的的便是该web站点的域名，不支持直接填写IP；</span></span>
<span class="line"><span style="color:#e1e4e8;">需要注意的是，该域名不能与站点提供给用户访问的域名一致，而是一个单独的回源域名。</span></span>
<span class="line"><span style="color:#e1e4e8;">例如对于我的站点，其域名为www.dancen.com，我新注册了一个域名wwwcdn.dancen.com用于CDN回源。</span></span>
<span class="line"><span style="color:#e1e4e8;">为什么回源域名不能与站点域名一致呢，很好理解，以我的站点为例，当用户访问站点www.dancen.com时，通过DNS系统查询得到站点的CNAME记录，CDN再通过对CNAME的解析到达边缘节点；</span></span>
<span class="line"><span style="color:#e1e4e8;">当需要回源时，CDN又会访问回源域名，如果回源域名也是www.dancen.com，那就形成了一个循环，www.dancen.com -&gt; CDN -&gt; www.dancen.com，而且这是个死循环</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">a. 首先要填写源站地址Origin Domain Name，源站可以是一个AWS S3，也可是是一个普通web站点。</span></span>
<span class="line"><span style="color:#24292e;">对于web站点，你要填写的的便是该web站点的域名，不支持直接填写IP；</span></span>
<span class="line"><span style="color:#24292e;">需要注意的是，该域名不能与站点提供给用户访问的域名一致，而是一个单独的回源域名。</span></span>
<span class="line"><span style="color:#24292e;">例如对于我的站点，其域名为www.dancen.com，我新注册了一个域名wwwcdn.dancen.com用于CDN回源。</span></span>
<span class="line"><span style="color:#24292e;">为什么回源域名不能与站点域名一致呢，很好理解，以我的站点为例，当用户访问站点www.dancen.com时，通过DNS系统查询得到站点的CNAME记录，CDN再通过对CNAME的解析到达边缘节点；</span></span>
<span class="line"><span style="color:#24292e;">当需要回源时，CDN又会访问回源域名，如果回源域名也是www.dancen.com，那就形成了一个循环，www.dancen.com -&gt; CDN -&gt; www.dancen.com，而且这是个死循环</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301429991.png" alt="源配置"></p><blockquote><p>Host 主机头一定的加入, 缓存选择all</p></blockquote><h2 id="_4-缓存配置" tabindex="-1">4.缓存配置 <a class="header-anchor" href="#_4-缓存配置" aria-label="Permalink to &quot;4.缓存配置&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301429139.png" alt="缓存配置"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Use Origin Cache Headers选项表示以源站http header中Cache-Control max-age 或 Cache-Control s-maxage 指令或者 Expires 标头字段的设定为准；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Customize选项中，最短、最长和默认 TTL 值来控制 CloudFront 在缓存中保留对象的时长 (以秒为单位)，超过该时长后才会将另一个请求转发到源。标头值还确定浏览器在缓存中保留对象的时长，超过该时长后才会将另一个请求转发到 CloudFront。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Use Origin Cache Headers选项表示以源站http header中Cache-Control max-age 或 Cache-Control s-maxage 指令或者 Expires 标头字段的设定为准；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Customize选项中，最短、最长和默认 TTL 值来控制 CloudFront 在缓存中保留对象的时长 (以秒为单位)，超过该时长后才会将另一个请求转发到源。标头值还确定浏览器在缓存中保留对象的时长，超过该时长后才会将另一个请求转发到 CloudFront。</span></span></code></pre></div><h2 id="_5-分配设置" tabindex="-1">5.分配设置 <a class="header-anchor" href="#_5-分配设置" aria-label="Permalink to &quot;5.分配设置&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301429869.png" alt="分配设置"></p><h2 id="_6-配置自定义ssl证书" tabindex="-1">6.配置自定义ssl证书 <a class="header-anchor" href="#_6-配置自定义ssl证书" aria-label="Permalink to &quot;6.配置自定义ssl证书&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301429255.png" alt="配置自定义ssl证书"></p><h1 id="二、上传自定义正书" tabindex="-1">二、上传自定义正书 <a class="header-anchor" href="#二、上传自定义正书" aria-label="Permalink to &quot;二、上传自定义正书&quot;">​</a></h1><h2 id="_2-1-美国东部" tabindex="-1">2.1 美国东部 <a class="header-anchor" href="#_2-1-美国东部" aria-label="Permalink to &quot;2.1 美国东部&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301429686.png" alt="ssl证书"></p><ul><li>crt to pem</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">openssl x509 -in www.xx.com.crt -out www.xx.com.pem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">openssl x509 -in www.xx.com.crt -out www.xx.com.pem</span></span></code></pre></div><ul><li>注意</li></ul><blockquote><p>要将 ACM 证书与 API Gateway 边缘优化的自定义域名结合使用，您必须在 美国东部（弗吉尼亚北部） (us-east-1) 区域中请求或导入证书。对于 API Gateway 区域自定义域名，您必须在与 API 相同的区域中请求或导入证书</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">为指定域名获取 ACM 颁发的证书或将证书导入其中</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注册 Internet 域，如 myDomain.com。您可以使用 Amazon Route 53 或获得认可的第三方域注册商。要获取此类注册商的列表，请参阅 ICANN 网站上获得认可的注册商目录。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">要为域名创建 SSL/TLS 证书或将证书导入 ACM 中，请执行以下操作之一：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">为域名请求 ACM 提供的证书</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">登录到 AWS Certificate Manager 控制台。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">选择请求证书。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在域名中，为 API 键入自定义域名，如 api.example.com。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">（可选）选择向此证书添加一个名称。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">选择 Review and request。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">选择 Confirm and request。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果请求有效，Internet 域中注册的所有者必须同意请求，然后 ACM 才能颁发证书。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">将域名的证书导入 ACM 中</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">从证书颁发机构为自定义域名获取 PEM 编码的 SSL/TLS 证书。要获取此类 CA 的部分列表，请参阅 Mozilla 内置 CA 列表</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">使用 OpenSSL 网站中的 OpenSSL 工具包生成证书的私有密钥并将输出结果保存到文件中：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">openssl genrsa -out private-key-file 2048</span></span>
<span class="line"><span style="color:#e1e4e8;">注意</span></span>
<span class="line"><span style="color:#e1e4e8;">Amazon API Gateway 利用 Amazon CloudFront 来支持自定义域名的证书。因此，自定义域名 SSL/TLS 证书的要求和限制由 CloudFront 决定。例如，公有密钥的最大大小为 2048，而私有密钥大小可以是 1024、2048 和 4096。公有密钥的大小取决于所用的证书颁发机构。要求证书颁发机构返回大小不同于默认长度的密钥。有关更多信息，请参阅安全访问对象和创建签名 URL 和签名 Cookie。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">使用 OpenSSL 通过之前生成的私有密钥生成证书签名请求 (CSR)：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">openssl req -new -sha256 -key private-key-file -out CSR-file</span></span>
<span class="line"><span style="color:#e1e4e8;">将 CSR 提交给证书颁发机构并保存生成的证书。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">从证书颁发机构下载证书链。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意</span></span>
<span class="line"><span style="color:#e1e4e8;">如果您通过其他方式获取了私有密钥并且密钥已加密，则您可以使用以下命令解密密钥，然后再将其提交到 API Gateway 以便设置自定义域名。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">openssl pkcs8 -topk8 -inform pem -in MyEncryptedKey.pem -outform pem -nocrypt -out MyDecryptedKey.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">将证书上传到 AWS Certificate Manager：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">登录到 AWS Certificate Manager 控制台。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">选择 Import a certificate。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">对于证书正文，键入或粘贴证书颁发机构提供的 PEM 格式的服务器证书文本。下面显示了此类证书的简短示例。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">EXAMPLECA+KgAwIBAgIQJ1XxJ8Pl++gOfQtj0IBoqDANBgkqhkiG9w0BAQUFADBB</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;">az8Cg1aicxLBQ7EaWIhhgEXAMPLE</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">对于证书私有密钥，键入或粘贴 PEM 格式的证书的私有密钥。下面显示了此类密钥的简短示例。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN RSA PRIVATE KEY-----</span></span>
<span class="line"><span style="color:#e1e4e8;">EXAMPLEBAAKCAQEA2Qb3LDHD7StY7Wj6U2/opV6Xu37qUCCkeDWhwpZMYJ9/nETO</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;">1qGvJ3u04vdnzaYN5WoyN5LFckrlA71+CszD1CGSqbVDWEXAMPLE</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END RSA PRIVATE KEY-----</span></span>
<span class="line"><span style="color:#e1e4e8;">对于证书链，键入或粘贴 PEM 格式的中间证书和根证书（可选），不带任何空白行。如果包含了根证书，您的证书链必须以中间证书开始，以根证书结尾。使用证书颁发机构提供的中间证书。不要包含未在信任路径链中的任何中间证书。下面显示了一个简短示例。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">EXAMPLECA4ugAwIBAgIQWrYdrB5NogYUx1U9Pamy3DANBgkqhkiG9w0BAQUFADCB</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;">8/ifBlIK3se2e4/hEfcEejX/arxbx1BJCHBvlEPNnsdw8EXAMPLE</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">以下是另一个示例。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">Intermediate certificate 2</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">Intermediate certificate 1</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">Optional: Root certificate</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">选择 Review and import。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">成功创建或导入证书后，请记下证书的 ARN。您在设置自定义域名时会需要它</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">为指定域名获取 ACM 颁发的证书或将证书导入其中</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注册 Internet 域，如 myDomain.com。您可以使用 Amazon Route 53 或获得认可的第三方域注册商。要获取此类注册商的列表，请参阅 ICANN 网站上获得认可的注册商目录。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">要为域名创建 SSL/TLS 证书或将证书导入 ACM 中，请执行以下操作之一：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">为域名请求 ACM 提供的证书</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">登录到 AWS Certificate Manager 控制台。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">选择请求证书。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在域名中，为 API 键入自定义域名，如 api.example.com。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">（可选）选择向此证书添加一个名称。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">选择 Review and request。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">选择 Confirm and request。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果请求有效，Internet 域中注册的所有者必须同意请求，然后 ACM 才能颁发证书。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">将域名的证书导入 ACM 中</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">从证书颁发机构为自定义域名获取 PEM 编码的 SSL/TLS 证书。要获取此类 CA 的部分列表，请参阅 Mozilla 内置 CA 列表</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">使用 OpenSSL 网站中的 OpenSSL 工具包生成证书的私有密钥并将输出结果保存到文件中：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">openssl genrsa -out private-key-file 2048</span></span>
<span class="line"><span style="color:#24292e;">注意</span></span>
<span class="line"><span style="color:#24292e;">Amazon API Gateway 利用 Amazon CloudFront 来支持自定义域名的证书。因此，自定义域名 SSL/TLS 证书的要求和限制由 CloudFront 决定。例如，公有密钥的最大大小为 2048，而私有密钥大小可以是 1024、2048 和 4096。公有密钥的大小取决于所用的证书颁发机构。要求证书颁发机构返回大小不同于默认长度的密钥。有关更多信息，请参阅安全访问对象和创建签名 URL 和签名 Cookie。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">使用 OpenSSL 通过之前生成的私有密钥生成证书签名请求 (CSR)：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">openssl req -new -sha256 -key private-key-file -out CSR-file</span></span>
<span class="line"><span style="color:#24292e;">将 CSR 提交给证书颁发机构并保存生成的证书。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">从证书颁发机构下载证书链。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意</span></span>
<span class="line"><span style="color:#24292e;">如果您通过其他方式获取了私有密钥并且密钥已加密，则您可以使用以下命令解密密钥，然后再将其提交到 API Gateway 以便设置自定义域名。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">openssl pkcs8 -topk8 -inform pem -in MyEncryptedKey.pem -outform pem -nocrypt -out MyDecryptedKey.pem</span></span>
<span class="line"><span style="color:#24292e;">将证书上传到 AWS Certificate Manager：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">登录到 AWS Certificate Manager 控制台。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">选择 Import a certificate。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">对于证书正文，键入或粘贴证书颁发机构提供的 PEM 格式的服务器证书文本。下面显示了此类证书的简短示例。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">EXAMPLECA+KgAwIBAgIQJ1XxJ8Pl++gOfQtj0IBoqDANBgkqhkiG9w0BAQUFADBB</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;">az8Cg1aicxLBQ7EaWIhhgEXAMPLE</span></span>
<span class="line"><span style="color:#24292e;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">对于证书私有密钥，键入或粘贴 PEM 格式的证书的私有密钥。下面显示了此类密钥的简短示例。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN RSA PRIVATE KEY-----</span></span>
<span class="line"><span style="color:#24292e;">EXAMPLEBAAKCAQEA2Qb3LDHD7StY7Wj6U2/opV6Xu37qUCCkeDWhwpZMYJ9/nETO</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;">1qGvJ3u04vdnzaYN5WoyN5LFckrlA71+CszD1CGSqbVDWEXAMPLE</span></span>
<span class="line"><span style="color:#24292e;">-----END RSA PRIVATE KEY-----</span></span>
<span class="line"><span style="color:#24292e;">对于证书链，键入或粘贴 PEM 格式的中间证书和根证书（可选），不带任何空白行。如果包含了根证书，您的证书链必须以中间证书开始，以根证书结尾。使用证书颁发机构提供的中间证书。不要包含未在信任路径链中的任何中间证书。下面显示了一个简短示例。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">EXAMPLECA4ugAwIBAgIQWrYdrB5NogYUx1U9Pamy3DANBgkqhkiG9w0BAQUFADCB</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;">8/ifBlIK3se2e4/hEfcEejX/arxbx1BJCHBvlEPNnsdw8EXAMPLE</span></span>
<span class="line"><span style="color:#24292e;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">以下是另一个示例。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">Intermediate certificate 2</span></span>
<span class="line"><span style="color:#24292e;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">Intermediate certificate 1</span></span>
<span class="line"><span style="color:#24292e;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">Optional: Root certificate</span></span>
<span class="line"><span style="color:#24292e;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">选择 Review and import。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">成功创建或导入证书后，请记下证书的 ARN。您在设置自定义域名时会需要它</span></span></code></pre></div><h2 id="_2-2faq" tabindex="-1">2.2FAQ <a class="header-anchor" href="#_2-2faq" aria-label="Permalink to &quot;2.2FAQ&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">简短描述</span></span>
<span class="line"><span style="color:#e1e4e8;">我尝试将第三方 SSL/TLS 证书导入 ACM，但收到了一条类似于以下内容之一的错误消息：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">You have reached the maximum number of certificates.Delete certificates that aren&#39;t in use, or contact AWS Support to request an increase.</span></span>
<span class="line"><span style="color:#e1e4e8;">The certificate field contains more than one certificate.You can specify only one certificate in this field.</span></span>
<span class="line"><span style="color:#e1e4e8;">Unable to validate certificate chain.The certificate chain must start with the immediate signing certificate, followed by any intermediaries in order.The index within the chain of the invalid certificate is: 0.</span></span>
<span class="line"><span style="color:#e1e4e8;">Can&#39;t validate the certificate with the certificate chain.</span></span>
<span class="line"><span style="color:#e1e4e8;">The private key length &lt;key_length&gt; isn&#39;t supported for key algorithm.</span></span>
<span class="line"><span style="color:#e1e4e8;">The certificate body/chain provided isn&#39;t in a valid PEM format, InternalFailure, or Unable to parse certificate.Be sure that the certificate is in PEM format.</span></span>
<span class="line"><span style="color:#e1e4e8;">The private key isn&#39;t supported.</span></span>
<span class="line"><span style="color:#e1e4e8;">解决方法</span></span>
<span class="line"><span style="color:#e1e4e8;">按照与错误消息匹配的说明操作。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意：您可以导入第三方 SSL/TLS 证书，并将证书与 AWS 服务集成。请确保您的证书满足导入证书的先决条件。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">“You have reached the maximum number of certificates.Delete certificates that are not in use, or contact AWS Support to request an increase.”</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">默认情况下，您最多可以将 1000 个证书导入 ACM，但是新的 AWS 账户一开始允许导入的证书数量较少。如果您超过此限制，请联系 AWS Support，请求提高限制。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果您收到此错误消息，但未超过为您账户设置的 1000 个证书限制，则您可能超过了一年内可以导入的证书数量限制。默认情况下，每年可以导入的数量为账户限制值的两倍。例如，如果您的账户限制为 100 个证书，则每年最多可以导入 200 个证书。这包括在过去 365 天内导入和删除的证书。如果您达到此限制，请联系 AWS Support，请求提高限制。有关更多信息，请参阅 ACM 用户指南中的限制。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">“The certificate field contains more than one certificate.You can specify only one certificate in this field.”</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果您要导入证书，请不要在 Certificate body 字段中上传完整的证书链。如果您收到证书捆绑包，它可能包含服务器证书和来自证书颁发机构 (CA) 的证书链。请将在生成证书签名请求 (CSR) 时创建的每个文件（证书、具有中间证书和根证书的证书链以及私有密钥）从捆绑包中分离出来，将文件更改为 PEM 格式，然后将它们分别上传到 ACM。要将证书捆绑包转换为 PEM 格式，请参阅问题排查。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">“Unable to validate certificate chain.The certificate chain must start with the immediate signing certificate, followed by any intermediaries in order.The index within the chain of the invalid certificate is: 0”</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在将某个证书导入 ACM 时，不要将该证书包含在证书链中。证书链应只包含中间证书和根证书。证书链中的证书必须按顺序排列，以中间证书开头，以根证书结尾。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">“Could not validate the certificate with the certificate chain.”</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果 ACM 无法将证书与提供的证书链匹配，请验证该证书链是否与您的证书相关联。您可能需要联系您的证书提供者以寻求进一步帮助。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">“The private key length &lt;key_length&gt; is not supported for key algorithm.”</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在创建 X.509 证书或证书请求时，您需指定必须用于创建私有-公有密钥对的算法和密钥位大小。请确保您的证书密钥满足导入证书的先决条件。如果您的密钥确实满足密钥大小或算法的要求，请让您的证书提供者重新颁发具有受支持密钥大小和算法的证书。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">“The certificate body/chain provided is not in a valid PEM format&quot;, &quot;InternalFailure,&quot; or &quot;Unable to parse certificate.Please ensure the certificate is in PEM format.”</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果证书正文、私有密钥或证书链不是 PEM 格式，则必须转换文件。如果证书文件不包含适当的证书正文，则必须转换该文件。要将证书或证书链从 DER 转换为 PEM 格式，请参阅问题排查。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">“The private key is not supported.”</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果使用 AWS 命令行界面 (AWS CLI) 将证书导入 ACM，请将证书文件的内容（证书正文、私有密钥和证书链）作为字符串传递。您必须通过在文件名前面附加 file:// 来指定证书、证书链和私有密钥。有关更多信息，请参阅 import-certificate。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意：请务必将文件路径 file://key.pem 用于密钥，并将 file://certificate.pem 用于证书。如果不添加文件路径，可能会收到以下错误消息：“The private key is not supported”或“The certificate is not valid”。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">简短描述</span></span>
<span class="line"><span style="color:#24292e;">我尝试将第三方 SSL/TLS 证书导入 ACM，但收到了一条类似于以下内容之一的错误消息：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">You have reached the maximum number of certificates.Delete certificates that aren&#39;t in use, or contact AWS Support to request an increase.</span></span>
<span class="line"><span style="color:#24292e;">The certificate field contains more than one certificate.You can specify only one certificate in this field.</span></span>
<span class="line"><span style="color:#24292e;">Unable to validate certificate chain.The certificate chain must start with the immediate signing certificate, followed by any intermediaries in order.The index within the chain of the invalid certificate is: 0.</span></span>
<span class="line"><span style="color:#24292e;">Can&#39;t validate the certificate with the certificate chain.</span></span>
<span class="line"><span style="color:#24292e;">The private key length &lt;key_length&gt; isn&#39;t supported for key algorithm.</span></span>
<span class="line"><span style="color:#24292e;">The certificate body/chain provided isn&#39;t in a valid PEM format, InternalFailure, or Unable to parse certificate.Be sure that the certificate is in PEM format.</span></span>
<span class="line"><span style="color:#24292e;">The private key isn&#39;t supported.</span></span>
<span class="line"><span style="color:#24292e;">解决方法</span></span>
<span class="line"><span style="color:#24292e;">按照与错误消息匹配的说明操作。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意：您可以导入第三方 SSL/TLS 证书，并将证书与 AWS 服务集成。请确保您的证书满足导入证书的先决条件。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">“You have reached the maximum number of certificates.Delete certificates that are not in use, or contact AWS Support to request an increase.”</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">默认情况下，您最多可以将 1000 个证书导入 ACM，但是新的 AWS 账户一开始允许导入的证书数量较少。如果您超过此限制，请联系 AWS Support，请求提高限制。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果您收到此错误消息，但未超过为您账户设置的 1000 个证书限制，则您可能超过了一年内可以导入的证书数量限制。默认情况下，每年可以导入的数量为账户限制值的两倍。例如，如果您的账户限制为 100 个证书，则每年最多可以导入 200 个证书。这包括在过去 365 天内导入和删除的证书。如果您达到此限制，请联系 AWS Support，请求提高限制。有关更多信息，请参阅 ACM 用户指南中的限制。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">“The certificate field contains more than one certificate.You can specify only one certificate in this field.”</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果您要导入证书，请不要在 Certificate body 字段中上传完整的证书链。如果您收到证书捆绑包，它可能包含服务器证书和来自证书颁发机构 (CA) 的证书链。请将在生成证书签名请求 (CSR) 时创建的每个文件（证书、具有中间证书和根证书的证书链以及私有密钥）从捆绑包中分离出来，将文件更改为 PEM 格式，然后将它们分别上传到 ACM。要将证书捆绑包转换为 PEM 格式，请参阅问题排查。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">“Unable to validate certificate chain.The certificate chain must start with the immediate signing certificate, followed by any intermediaries in order.The index within the chain of the invalid certificate is: 0”</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在将某个证书导入 ACM 时，不要将该证书包含在证书链中。证书链应只包含中间证书和根证书。证书链中的证书必须按顺序排列，以中间证书开头，以根证书结尾。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">“Could not validate the certificate with the certificate chain.”</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果 ACM 无法将证书与提供的证书链匹配，请验证该证书链是否与您的证书相关联。您可能需要联系您的证书提供者以寻求进一步帮助。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">“The private key length &lt;key_length&gt; is not supported for key algorithm.”</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在创建 X.509 证书或证书请求时，您需指定必须用于创建私有-公有密钥对的算法和密钥位大小。请确保您的证书密钥满足导入证书的先决条件。如果您的密钥确实满足密钥大小或算法的要求，请让您的证书提供者重新颁发具有受支持密钥大小和算法的证书。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">“The certificate body/chain provided is not in a valid PEM format&quot;, &quot;InternalFailure,&quot; or &quot;Unable to parse certificate.Please ensure the certificate is in PEM format.”</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果证书正文、私有密钥或证书链不是 PEM 格式，则必须转换文件。如果证书文件不包含适当的证书正文，则必须转换该文件。要将证书或证书链从 DER 转换为 PEM 格式，请参阅问题排查。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">“The private key is not supported.”</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果使用 AWS 命令行界面 (AWS CLI) 将证书导入 ACM，请将证书文件的内容（证书正文、私有密钥和证书链）作为字符串传递。您必须通过在文件名前面附加 file:// 来指定证书、证书链和私有密钥。有关更多信息，请参阅 import-certificate。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意：请务必将文件路径 file://key.pem 用于密钥，并将 file://certificate.pem 用于证书。如果不添加文件路径，可能会收到以下错误消息：“The private key is not supported”或“The certificate is not valid”。</span></span></code></pre></div><p><a href="https://aws.amazon.com/cn/premiumsupport/knowledge-center/acm-import-troubleshooting/" target="_blank" rel="noreferrer">https://aws.amazon.com/cn/premiumsupport/knowledge-center/acm-import-troubleshooting/</a></p><p><a href="https://docs.aws.amazon.com/zh_cn/apigateway/latest/developerguide/how-to-custom-domains-prerequisites.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/apigateway/latest/developerguide/how-to-custom-domains-prerequisites.html</a></p>`,31),o=[p];function c(t,i,r,y,h,d){return n(),a("div",null,o)}const f=s(l,[["render",c]]);export{m as __pageData,f as default};
