import{_ as s,o as n,c as a,R as o}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1. 什么是预置器provisioner？","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/Terraform/16-三种预置器.md","filePath":"guide/go/Terraform/16-三种预置器.md","lastUpdated":1753370025000}'),l={name:"guide/go/Terraform/16-三种预置器.md"},p=o(`<h1 id="_1-什么是预置器provisioner" tabindex="-1">1. 什么是预置器provisioner？ <a class="header-anchor" href="#_1-什么是预置器provisioner" aria-label="Permalink to &quot;1. 什么是预置器provisioner？&quot;">​</a></h1><p>借助Terraform provisioner，我们可以使用单个命令在云环境中对基础设施配置进行编码并构建虚拟服务器 （和其他资源）。在构建的虚拟服务器上，设置各种中间件等准备应用程序执行环境（所谓的provisioning过 程）。</p><p>可以使用provisioner在远程或本地机器上指定特定的操作，以便为服务器或其他基础设施对象服务。 Terraform帮我们创建好instance以后，这个时候我们只是有一个空的instance，很多情况下，我们需要做一些初 始化的操作，例如安装必要的软件包，创建用户，修改配置文件等。</p><p><a href="https://developer.hashicorp.com/terraform/language/resources/provisioners/syntax" target="_blank" rel="noreferrer">https://developer.hashicorp.com/terraform/language/resources/provisioners/syntax</a></p><h2 id="_1-2-provisioner的三种功能" tabindex="-1">1.2 provisioner的三种功能 <a class="header-anchor" href="#_1-2-provisioner的三种功能" aria-label="Permalink to &quot;1.2 provisioner的三种功能&quot;">​</a></h2><p>rovisioner提供了三种功能：</p><p>Remote-exec Provisioner：在远端资源创建后调用该资源延的脚本。</p><p>File Provisioner：复制文件或目录到远程。</p><p>Local-exec Provisioner：在资源创建后调用本地可执行文件。</p><h3 id="远程执行命令" tabindex="-1"><a href="https://developer.hashicorp.com/terraform/language/resources/provisioners/remote-exec" target="_blank" rel="noreferrer">远程执行命令</a> <a class="header-anchor" href="#远程执行命令" aria-label="Permalink to &quot;[远程执行命令](https://developer.hashicorp.com/terraform/language/resources/provisioners/remote-exec)&quot;">​</a></h3><p>命令说明</p><p>provisioner &quot;remote-exec&quot; {} 在服务器上远程执行命令</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#创建ECS实例</span></span>
<span class="line"><span style="color:#9ECBFF;">resource &quot;alicloud_instance&quot; &quot;instance&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># cn-shanghai</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#count = 2 # 创建2台ECS实例,默认不写count，则创建1台ECS实例</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">availability_zone    = &quot;cn-shanghai-b&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">security_groups      = [&quot;\${alicloud_security_group.nsg1.id}&quot;]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">instance_type        = &quot;ecs.e-c1m1.large&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#若实例规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">system_disk_category = &quot;cloud_essd&quot;</span><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;">#若磁盘规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">system_disk_size     = 40</span><span style="color:#E1E4E8;">                 </span><span style="color:#6A737D;"># 系统盘大小，单位为GB</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">image_id             = local.image_id</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#instance_name              = &quot;lyc-test-\${count.index+1}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">instance_name              = &quot;lyc-test&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">vswitch_id                 = alicloud_vswitch.vsw_1.id</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">internet_max_bandwidth_out = 1</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 出网带宽，单位为Mbps</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">password                   = local.password</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># data_disks {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#   name = &quot;data_disk1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#   description = &quot;data_disk1&quot; # 数据盘描述</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#   size = 20 # 数据盘大小，单位为GB</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#   category = &quot;cloud_essd&quot; # 数据盘类型</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">//provisioner</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">provisioner &quot;remote-exec&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">inline = [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;mkdir /root/test&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;echo &#39;Hello, World!&#39; &gt; /root/test/hello.txt&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">connection {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">type     = &quot;ssh&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">user     = &quot;root&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">password = local.password</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">host     = self.public_ip</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#创建ECS实例</span></span>
<span class="line"><span style="color:#032F62;">resource &quot;alicloud_instance&quot; &quot;instance&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># cn-shanghai</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#count = 2 # 创建2台ECS实例,默认不写count，则创建1台ECS实例</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">availability_zone    = &quot;cn-shanghai-b&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">security_groups      = [&quot;\${alicloud_security_group.nsg1.id}&quot;]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">instance_type        = &quot;ecs.e-c1m1.large&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#若实例规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">system_disk_category = &quot;cloud_essd&quot;</span><span style="color:#24292E;">       </span><span style="color:#6A737D;">#若磁盘规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">system_disk_size     = 40</span><span style="color:#24292E;">                 </span><span style="color:#6A737D;"># 系统盘大小，单位为GB</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">image_id             = local.image_id</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#instance_name              = &quot;lyc-test-\${count.index+1}&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">instance_name              = &quot;lyc-test&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">vswitch_id                 = alicloud_vswitch.vsw_1.id</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">internet_max_bandwidth_out = 1</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 出网带宽，单位为Mbps</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">password                   = local.password</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># data_disks {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#   name = &quot;data_disk1&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#   description = &quot;data_disk1&quot; # 数据盘描述</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#   size = 20 # 数据盘大小，单位为GB</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#   category = &quot;cloud_essd&quot; # 数据盘类型</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">//provisioner</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">provisioner &quot;remote-exec&quot; {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">inline = [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;mkdir /root/test&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;echo &#39;Hello, World!&#39; &gt; /root/test/hello.txt&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">connection {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">type     = &quot;ssh&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">user     = &quot;root&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">password = local.password</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">host     = self.public_ip</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>阿里上面获取元数据</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://100.100.100.200/latest/meta-data/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://100.100.100.200/latest/meta-data/</span></span></code></pre></div><blockquote><p>这里有个问题，就是如果命令执行失败，在执行会把原先的机器删除，在次创建新的实例来运行命令</p></blockquote><h3 id="复制本地文件到远程命令file" tabindex="-1">复制本地文件到远程命令file <a class="header-anchor" href="#复制本地文件到远程命令file" aria-label="Permalink to &quot;复制本地文件到远程命令file&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">//复制本地文件到远程</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">provisioner &quot;file&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">source      = &quot;local_file.txt&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">destination = &quot;/root/test/local_file.txt&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">//连接远程,connection 也可以放到provisioner中</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">connection {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">type     = &quot;ssh&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">user     = &quot;root&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">password = local.password</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">host     = self.public_ip</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">//复制本地文件到远程</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">provisioner &quot;file&quot; {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">source      = &quot;local_file.txt&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">destination = &quot;/root/test/local_file.txt&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">//连接远程,connection 也可以放到provisioner中</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">connection {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">type     = &quot;ssh&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">user     = &quot;root&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">password = local.password</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">host     = self.public_ip</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span></code></pre></div><h3 id="本地" tabindex="-1">本地 <a class="header-anchor" href="#本地" aria-label="Permalink to &quot;本地&quot;">​</a></h3><h3 id="执行命令local-exec" tabindex="-1">执行命令local-exec <a class="header-anchor" href="#执行命令local-exec" aria-label="Permalink to &quot;执行命令local-exec&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">//本地执行命令</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">provisioner &quot;local-exec&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">command = &quot;echo \${self.public_ip} &gt; output.txt&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#032F62;">//本地执行命令</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">provisioner &quot;local-exec&quot; {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">command = &quot;echo \${self.public_ip} &gt; output.txt&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">💡 说明</p><p>file provisioners、remote-exec provisioners需要connection 与服务器进行连接才可工作，local-exec不需要。</p><p>local-exec（本地执行）是被推荐的，他的优势是可以比较事物是否发生变化和达到期望状态的方式，以便我 们可以检测到变化（声明式模型就是这样维护的）。</p><p>rmote-exec（远程执行）是不被推荐的。官方不建议使用远程执行脚本，Terraform无法感知你执行了什么，不知道命令是否实际执行成功，状态是如何。因此如果是初始化操作，建议使用<strong>user_data</strong>用户数据执行，provisioners只在临时需要或必要时使用。</p><p>我们资源创建成功，但是provisioner没有执行成功，此时Terraform会认为我们的资源是“不安全”的，Terraform 会将这个资源标记为tainted，当我们下次执行apply的时候，Terraform不会重新尝试provisioner，它会直接将标记为tainted的资源删掉，然后重新创建，通过这样的方式来触发provisioner进行再次尝试。因此是十分危险和不推荐的。</p><p>povisioner只能作为最后手段使用。最佳实践是，使用配置管理工具Ansible。由管理配置工具接管服务器，并做所有事情，管理工具有更多的可见性，可控性，管理。</p></div>`,22),e=[p];function t(c,r,i,E,y,u){return n(),a("div",null,e)}const q=s(l,[["render",t]]);export{h as __pageData,q as default};
