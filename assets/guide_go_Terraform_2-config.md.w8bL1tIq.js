import{_ as s,o as a,c as n,R as l}from"./chunks/framework.zUbWieqp.js";const q=JSON.parse('{"title":"1. Terraform 目录","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/Terraform/2-config.md","filePath":"guide/go/Terraform/2-config.md","lastUpdated":1753535386000}'),p={name:"guide/go/Terraform/2-config.md"},o=l(`<h1 id="_1-terraform-目录" tabindex="-1">1. <strong>Terraform 目录</strong> <a class="header-anchor" href="#_1-terraform-目录" aria-label="Permalink to &quot;1. **Terraform 目录**&quot;">​</a></h1><p>Terraform 语言的代码存储在文件扩展名为 <code>.tf</code> 的纯文本文件中。该语言还有一种基于 JSON 的变体，以 <code>.tf.json</code> 文件扩展名命名。</p><h2 id="_1-2-文件类型" tabindex="-1">1.2 文件类型 <a class="header-anchor" href="#_1-2-文件类型" aria-label="Permalink to &quot;1.2 文件类型&quot;">​</a></h2><h3 id="tf" tabindex="-1">*.tf <a class="header-anchor" href="#tf" aria-label="Permalink to &quot;*.tf&quot;">​</a></h3><p>自定义的工程文件。理解为你期望的Terraform基础设施资源的状态。</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250719181115076.png" alt="image-20250719181105054"></p><h3 id="terraform-tfvars" tabindex="-1">terraform.tfvars <a class="header-anchor" href="#terraform-tfvars" aria-label="Permalink to &quot;terraform.tfvars&quot;">​</a></h3><p>读取变量文件。<code>是固定文件名，不可修改，否则会导致Terraform读取不到</code></p><h3 id="terraform" tabindex="-1">.terraform <a class="header-anchor" href="#terraform" aria-label="Permalink to &quot;.terraform&quot;">​</a></h3><p>目录下存放了依赖的providers的缓存文件</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250719181154629.png" alt="image-20250719181152164"></p><h3 id="terraform-locl-hcl" tabindex="-1">.terraform.locl.hcl <a class="header-anchor" href="#terraform-locl-hcl" aria-label="Permalink to &quot;.terraform.locl.hcl&quot;">​</a></h3><p>依赖锁文件，锁定terraform配置依赖的适配的providers的版本。</p><p>terraform.lock.hcl是执行terraforminit命令时在当前工作目录下生成的文件。它记录了当时确定的提供者 (Provider等外部系统及其指定版本）和模块（写在.tf文件中的代码）之间的依赖关系和兼容性。</p><p>这样，terraformapply可以在运行时使用相同的决策。</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250719181704461.png" alt="image-20250719181702279"></p><p>锁文件本身并不是 Terraform 配置的一部分，因此它没有以 <code>.tf</code> 为后缀的文件名。然而，它确实使用了与 Terraform 相同的语言：HashiCorp 配置语言（HCL）。因此锁文件的后缀为 <code>.hcl</code> 。</p><h3 id="terraform-tfstate" tabindex="-1">terraform.tfstate <a class="header-anchor" href="#terraform-tfstate" aria-label="Permalink to &quot;terraform.tfstate&quot;">​</a></h3><p>tfstate 文件，全名为 Terraform State 文件，是 Terraform 用来存储管理的基础设施的当前状态的文件。</p><p>Terraform使用状态文件来跟踪有关基础架构的资源和元数据信息。默认情况下，环境状态本地存储在Terraform工作区目录中名为terraform.tfstate的文件中，同时还有一个名为terraform.tfstate.backup的备份文件。在完成至少一个terraform apply之前，状态文件将不存在。</p><h3 id="terraform-tfstate-backup" tabindex="-1">terraform.tfstate.backup <a class="header-anchor" href="#terraform-tfstate-backup" aria-label="Permalink to &quot;terraform.tfstate.backup&quot;">​</a></h3><p>记录Terraform基础设施资源上一个状态(tfstate)。</p><p>​ 每次应用Terrafrom时，它都会将基础架构的当前状态写入名为terraform.tfstate的文件。并且它会 将l旧状态文件移动到名为 terraform.tfstate.backup的文件，并创建一个新的 terraform.tfstate文件。</p><p>​ 默认情况下，状态文件的备份会写入terraform.tfstate.backup以防状态文件丢失或损坏以简化恢复。 因此，当您运行 terraform apply 时，如果进行了更改，状态将被更新。以前的版本将保存为 terraform.tfstate.backup。</p><h3 id="terraform-tfstate-lock-info" tabindex="-1">.terraform.tfstate.lock.info <a class="header-anchor" href="#terraform-tfstate-lock-info" aria-label="Permalink to &quot;.terraform.tfstate.lock.info&quot;">​</a></h3><p>部署过程中加锁文件。一旦部署完自动删除</p><p>多人使用Terraform配置项目执行操作时候时候会涉及执行环境和远端状态同步的问题。关于数据库的操作， 同一个数据的修改，或者删除的时候，需要加锁处理。因此，Terraform引l入了锁的机制避免多个执行环境操作同 一个backend导致状态不同步。这里的.terraform.tfstate.lock.info文件就是部署过程中的加锁状态文件。</p><h1 id="_2-注释" tabindex="-1">2. 注释 <a class="header-anchor" href="#_2-注释" aria-label="Permalink to &quot;2. 注释&quot;">​</a></h1><p><code>#</code> 开启单行注释，在行尾结束</p><p><code>//</code> 也开始单行注释，作为 <code>#</code> 的替代方案。</p><p><code>/*</code> 和 <code>*/</code> 是可能跨越多行的注释的开始和结束分隔符。</p><h1 id="_3-项目层级结构" tabindex="-1">3. 项目层级结构 <a class="header-anchor" href="#_3-项目层级结构" aria-label="Permalink to &quot;3. 项目层级结构&quot;">​</a></h1><p><a href="https://cloud.google.com/docs/terraform/best-practices-for-terraform?hl=zh-cn#root-modules" target="_blank" rel="noreferrer">https://cloud.google.com/docs/terraform/best-practices-for-terraform?hl=zh-cn#root-modules</a></p><h2 id="_3-1-五种层级说明" tabindex="-1">3.1 五种层级说明 <a class="header-anchor" href="#_3-1-五种层级说明" aria-label="Permalink to &quot;3.1 五种层级说明&quot;">​</a></h2><p>合理使用层级结构可以提升运维效率，使得文件更加可读、可看、可用及可维护。我们将代码结构进行分层，有如下好处：</p><ol><li>有组织的安排代码编写的文件，使得逻辑更加清晰。</li><li>分层结构能使得简化运维难度，提升运维效率。</li><li>分层使得工程更加优雅。</li></ol><h3 id="单层" tabindex="-1">单层 <a class="header-anchor" href="#单层" aria-label="Permalink to &quot;单层&quot;">​</a></h3><p>所谓单层级，就是将所有文件写在一个文件中。就一个main.tf文件。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># Configure the AliCloud Provider</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">provider &quot;alicloud&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">access_key = &quot;xxx&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">secret_key = &quot;xxx&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">#创建vpc</span></span>
<span class="line"><span style="color:#9ECBFF;">resource &quot;alicloud_vpc&quot; &quot;vpc&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">vpc_name   = &quot;vpc_1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">cidr_block = &quot;10.0.0.0/16&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建vswitch</span></span>
<span class="line"><span style="color:#6A737D;"># alicloud_vswitch是阿里云的资源字段，vsw_1字段是tf文件中的自定义唯一资源名称,vswitch_name字段是在阿里云上的自定义备注名</span></span>
<span class="line"><span style="color:#9ECBFF;">resource &quot;alicloud_vswitch&quot; &quot;vsw_1&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">vswitch_name = &quot;vsw_aliyun1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">vpc_id       = alicloud_vpc.vpc.id</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">cidr_block   = &quot;10.0.0.0/24&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">zone_id      = &quot;cn-shanghai-b&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#新建安全组</span></span>
<span class="line"><span style="color:#9ECBFF;">resource &quot;alicloud_security_group&quot; &quot;nsg1&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">security_group_name = &quot;lyc_aliyun_nsg1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">vpc_id              = alicloud_vpc.vpc.id</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#将nsg_rule1、nsg_rule2加入安全组lyc_aliyun_nsg1中</span></span>
<span class="line"><span style="color:#9ECBFF;">resource &quot;alicloud_security_group_rule&quot; &quot;nsg_rule1&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">type              = &quot;ingress&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">ip_protocol       = &quot;tcp&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">nic_type          = &quot;intranet&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">policy            = &quot;accept&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">port_range        = &quot;1/65535&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">priority          = 1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">security_group_id = alicloud_security_group.nsg1.id</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">cidr_ip           = &quot;0.0.0.0/0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#创建ECS实例</span></span>
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
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># Configure the AliCloud Provider</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">provider &quot;alicloud&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">access_key = &quot;xxx&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">secret_key = &quot;xxx&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">#创建vpc</span></span>
<span class="line"><span style="color:#032F62;">resource &quot;alicloud_vpc&quot; &quot;vpc&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">vpc_name   = &quot;vpc_1&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">cidr_block = &quot;10.0.0.0/16&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建vswitch</span></span>
<span class="line"><span style="color:#6A737D;"># alicloud_vswitch是阿里云的资源字段，vsw_1字段是tf文件中的自定义唯一资源名称,vswitch_name字段是在阿里云上的自定义备注名</span></span>
<span class="line"><span style="color:#032F62;">resource &quot;alicloud_vswitch&quot; &quot;vsw_1&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">vswitch_name = &quot;vsw_aliyun1&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">vpc_id       = alicloud_vpc.vpc.id</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">cidr_block   = &quot;10.0.0.0/24&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">zone_id      = &quot;cn-shanghai-b&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#新建安全组</span></span>
<span class="line"><span style="color:#032F62;">resource &quot;alicloud_security_group&quot; &quot;nsg1&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">security_group_name = &quot;lyc_aliyun_nsg1&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">vpc_id              = alicloud_vpc.vpc.id</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#将nsg_rule1、nsg_rule2加入安全组lyc_aliyun_nsg1中</span></span>
<span class="line"><span style="color:#032F62;">resource &quot;alicloud_security_group_rule&quot; &quot;nsg_rule1&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">type              = &quot;ingress&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">ip_protocol       = &quot;tcp&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">nic_type          = &quot;intranet&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">policy            = &quot;accept&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">port_range        = &quot;1/65535&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">priority          = 1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">security_group_id = alicloud_security_group.nsg1.id</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">cidr_ip           = &quot;0.0.0.0/0&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#创建ECS实例</span></span>
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
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="最小化模块层级" tabindex="-1">最小化模块层级 <a class="header-anchor" href="#最小化模块层级" aria-label="Permalink to &quot;最小化模块层级&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">root</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main.tf</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">outputs.tf</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">provider.tf</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">terraform.tfvars</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#B392F0;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">variables.tf</span></span>
<span class="line"><span style="color:#B392F0;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">version.tf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">root</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">--</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main.tf</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">--</span><span style="color:#24292E;"> </span><span style="color:#032F62;">outputs.tf</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">--</span><span style="color:#24292E;"> </span><span style="color:#032F62;">provider.tf</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">--</span><span style="color:#24292E;"> </span><span style="color:#032F62;">terraform.tfvars</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">--</span><span style="color:#24292E;"> </span><span style="color:#032F62;">variables.tf</span></span>
<span class="line"><span style="color:#6F42C1;">--</span><span style="color:#24292E;"> </span><span style="color:#032F62;">version.tf</span></span></code></pre></div><h3 id="标准三层级说明" tabindex="-1">标准三层级说明 <a class="header-anchor" href="#标准三层级说明" aria-label="Permalink to &quot;标准三层级说明&quot;">​</a></h3><p>所谓三层级，是将文件分为褪层、模块文件夹层、各模块层。三层结构对应如下图中的红、黄、绿三个矩形框</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250716172903193.png" alt="image-20250716172759593"></p><p>典型层级树</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250716173527660.png" alt="image-20250716173341802"></p><h3 id="常用层级文件说明" tabindex="-1">常用层级文件说明 <a class="header-anchor" href="#常用层级文件说明" aria-label="Permalink to &quot;常用层级文件说明&quot;">​</a></h3><p>version.tf，定义Terraform的版本以及provider版本</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">terraform {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">required_providers {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">alicloud = {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">source = &quot;aliyun/alicloud&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">version = &quot;&gt;= 1.253.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">terraform {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">required_providers {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">alicloud = {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">source = &quot;aliyun/alicloud&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">version = &quot;&gt;= 1.253.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>provider.tf 配置provider云厂商的文件</p><p>单独一个provider.tf文件。其中provider可自定义，修改成任意名称，Terraform会自动找到内部的provider{}块。建议使用provider.tf或者providers.tf（如果内部配置有多个云厂商，用复数s)比较清晰明了且直观。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#定义云厂商</span></span>
<span class="line"><span style="color:#9ECBFF;">provider &quot;alicloud&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">region     = var.region</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">access_key = var.ak</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#修改成自己的ak</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">secret_key = var.sk</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#修改成自己的sk</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#定义云厂商</span></span>
<span class="line"><span style="color:#032F62;">provider &quot;alicloud&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">region     = var.region</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">access_key = var.ak</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#修改成自己的ak</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">secret_key = var.sk</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#修改成自己的sk</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>配置多个provider</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">terraform {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#定义terraform 版本</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">requiredd_version &gt;= &quot;v0.15.4&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#定义provider</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">required_providers {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">alicloud = {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">source = &quot;aliyun/alicloud&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">version = &quot;&gt;= 1.253.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">aws = {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">source = &quot;hashicorp/aws&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">version = &quot;&gt;= 6.3.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">terraform {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#定义terraform 版本</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">requiredd_version &gt;= &quot;v0.15.4&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#定义provider</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">required_providers {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">alicloud = {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">source = &quot;aliyun/alicloud&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">version = &quot;&gt;= 1.253.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#032F62;">aws = {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">source = &quot;hashicorp/aws&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">version = &quot;&gt;= 6.3.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>main.tf Terraform的主文件，通常包括引l用各子模块</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">module &quot;vpc&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">source = &quot;./modules/vpc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">module &quot;security_group&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">source = &quot;./modules/security_groups&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">vpc_id = module.vpc.vpc_id</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">module &quot;ecs&quot; {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">source = &quot;./modules/ecs&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">security_groups = module.security_groups.security_groups_id</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">vswitch_id= module.vpc.vswitch_id</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">module &quot;vpc&quot; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">source = &quot;./modules/vpc&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">module &quot;security_group&quot; {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">source = &quot;./modules/security_groups&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">vpc_id = module.vpc.vpc_id</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">module &quot;ecs&quot; {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">source = &quot;./modules/ecs&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">security_groups = module.security_groups.security_groups_id</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">vswitch_id= module.vpc.vswitch_id</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_3-2-其他方式" tabindex="-1">3.2 其他方式 <a class="header-anchor" href="#_3-2-其他方式" aria-label="Permalink to &quot;3.2 其他方式&quot;">​</a></h2><p><strong>Environment Directory Structure:</strong></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250725154419167.jpeg" alt="img"></p><p><strong>Modules Directory Structure:</strong></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250725154511960.jpeg" alt="img"></p><p>参考：</p><p><a href="https://help.aliyun.com/zh/terraform/basic-concepts?spm=a2c4g.11186623.help-menu-95817.d_3_0_0.63a11e53XrcMx9" target="_blank" rel="noreferrer">https://help.aliyun.com/zh/terraform/basic-concepts?spm=a2c4g.11186623.help-menu-95817.d_3_0_0.63a11e53XrcMx9</a></p><p>规范：</p><p><a href="https://cloud.google.com/docs/terraform/best-practices-for-terraform?hl=zh-cn" target="_blank" rel="noreferrer">https://cloud.google.com/docs/terraform/best-practices-for-terraform?hl=zh-cn</a></p><p><a href="https://docs.aws.amazon.com/zh_cn/prescriptive-guidance/latest/terraform-aws-provider-best-practices/structure.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/prescriptive-guidance/latest/terraform-aws-provider-best-practices/structure.html</a></p>`,66),e=[o];function t(c,r,i,y,u,E){return a(),n("div",null,e)}const h=s(p,[["render",t]]);export{q as __pageData,h as default};
