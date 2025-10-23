import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const q=JSON.parse('{"title":"1. 创建ecs","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/Terraform/实战2-阿里云-ecs.md","filePath":"guide/go/Terraform/实战2-阿里云-ecs.md","lastUpdated":1753535386000}'),p={name:"guide/go/Terraform/实战2-阿里云-ecs.md"},o=l(`<h1 id="_1-创建ecs" tabindex="-1">1. 创建ecs <a class="header-anchor" href="#_1-创建ecs" aria-label="Permalink to &quot;1. 创建ecs&quot;">​</a></h1><p>定义一台 <code>ECS</code> 实例</p><ul><li>可用区</li><li>安全组</li><li>实例规格</li><li>系统盘类型</li><li>名称描述</li><li>镜像</li><li>实例名称</li><li>交换机</li><li>带宽</li><li>付费类型</li><li>账户密码</li></ul><h2 id="_1-2-按量付费✅" tabindex="-1">1.2 按量付费✅ <a class="header-anchor" href="#_1-2-按量付费✅" aria-label="Permalink to &quot;1.2 按量付费✅&quot;">​</a></h2><p>vim main.tf</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#创建vpc</span></span>
<span class="line"><span style="color:#e1e4e8;">resource &quot;alicloud_vpc&quot; &quot;vpc&quot; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  vpc_name   = &quot;vpc_1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  cidr_block = &quot;10.0.0.0/16&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 创建vswitch</span></span>
<span class="line"><span style="color:#e1e4e8;"># alicloud_vswitch是阿里云的资源字段，vsw_1字段是tf文件中的自定义唯一资源名称,vswitch_name字段是在阿里云上的自定义备注名</span></span>
<span class="line"><span style="color:#e1e4e8;">resource &quot;alicloud_vswitch&quot; &quot;vsw_1&quot; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  vswitch_name = &quot;vsw_aliyun1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  vpc_id       = alicloud_vpc.vpc.id</span></span>
<span class="line"><span style="color:#e1e4e8;">  cidr_block   = &quot;10.0.0.0/24&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  zone_id      = &quot;cn-shanghai-b&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#新建安全组</span></span>
<span class="line"><span style="color:#e1e4e8;">resource &quot;alicloud_security_group&quot; &quot;nsg1&quot; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  security_group_name   = &quot;lyc_aliyun_nsg1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  vpc_id = alicloud_vpc.vpc.id</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#将nsg_rule1、nsg_rule2加入安全组lyc_aliyun_nsg1中</span></span>
<span class="line"><span style="color:#e1e4e8;">resource &quot;alicloud_security_group_rule&quot; &quot;nsg_rule1&quot; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  type              = &quot;ingress&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ip_protocol       = &quot;tcp&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  nic_type          = &quot;intranet&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  policy            = &quot;accept&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  port_range        = &quot;1/65535&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  priority          = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">  security_group_id = alicloud_security_group.nsg1.id</span></span>
<span class="line"><span style="color:#e1e4e8;">  cidr_ip           = &quot;0.0.0.0/0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#创建ECS实例</span></span>
<span class="line"><span style="color:#e1e4e8;">resource &quot;alicloud_instance&quot; &quot;instance&quot; {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # cn-shanghai</span></span>
<span class="line"><span style="color:#e1e4e8;">  availability_zone          = &quot;cn-shanghai-b&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  security_groups            = [&quot;\${alicloud_security_group.nsg1.id}&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">  instance_type              = &quot;ecs.e-c1m1.large&quot; #若实例规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#e1e4e8;">  system_disk_category       = &quot;cloud_essd&quot; #若磁盘规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#e1e4e8;">  system_disk_size           = 40 # 系统盘大小，单位为GB</span></span>
<span class="line"><span style="color:#e1e4e8;">  image_id                   = &quot;centos_7_9_x64_20G_alibase_20220824.vhd&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  instance_name              = &quot;lyc-test&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  vswitch_id                 = alicloud_vswitch.vsw_1.id</span></span>
<span class="line"><span style="color:#e1e4e8;">  internet_max_bandwidth_out = 1 # 出网带宽，单位为Mbps</span></span>
<span class="line"><span style="color:#e1e4e8;">  password                   = &quot;5jejYWzSjZhWQc7G22&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#创建vpc</span></span>
<span class="line"><span style="color:#24292e;">resource &quot;alicloud_vpc&quot; &quot;vpc&quot; {</span></span>
<span class="line"><span style="color:#24292e;">  vpc_name   = &quot;vpc_1&quot;</span></span>
<span class="line"><span style="color:#24292e;">  cidr_block = &quot;10.0.0.0/16&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 创建vswitch</span></span>
<span class="line"><span style="color:#24292e;"># alicloud_vswitch是阿里云的资源字段，vsw_1字段是tf文件中的自定义唯一资源名称,vswitch_name字段是在阿里云上的自定义备注名</span></span>
<span class="line"><span style="color:#24292e;">resource &quot;alicloud_vswitch&quot; &quot;vsw_1&quot; {</span></span>
<span class="line"><span style="color:#24292e;">  vswitch_name = &quot;vsw_aliyun1&quot;</span></span>
<span class="line"><span style="color:#24292e;">  vpc_id       = alicloud_vpc.vpc.id</span></span>
<span class="line"><span style="color:#24292e;">  cidr_block   = &quot;10.0.0.0/24&quot;</span></span>
<span class="line"><span style="color:#24292e;">  zone_id      = &quot;cn-shanghai-b&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#新建安全组</span></span>
<span class="line"><span style="color:#24292e;">resource &quot;alicloud_security_group&quot; &quot;nsg1&quot; {</span></span>
<span class="line"><span style="color:#24292e;">  security_group_name   = &quot;lyc_aliyun_nsg1&quot;</span></span>
<span class="line"><span style="color:#24292e;">  vpc_id = alicloud_vpc.vpc.id</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#将nsg_rule1、nsg_rule2加入安全组lyc_aliyun_nsg1中</span></span>
<span class="line"><span style="color:#24292e;">resource &quot;alicloud_security_group_rule&quot; &quot;nsg_rule1&quot; {</span></span>
<span class="line"><span style="color:#24292e;">  type              = &quot;ingress&quot;</span></span>
<span class="line"><span style="color:#24292e;">  ip_protocol       = &quot;tcp&quot;</span></span>
<span class="line"><span style="color:#24292e;">  nic_type          = &quot;intranet&quot;</span></span>
<span class="line"><span style="color:#24292e;">  policy            = &quot;accept&quot;</span></span>
<span class="line"><span style="color:#24292e;">  port_range        = &quot;1/65535&quot;</span></span>
<span class="line"><span style="color:#24292e;">  priority          = 1</span></span>
<span class="line"><span style="color:#24292e;">  security_group_id = alicloud_security_group.nsg1.id</span></span>
<span class="line"><span style="color:#24292e;">  cidr_ip           = &quot;0.0.0.0/0&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#创建ECS实例</span></span>
<span class="line"><span style="color:#24292e;">resource &quot;alicloud_instance&quot; &quot;instance&quot; {</span></span>
<span class="line"><span style="color:#24292e;">  # cn-shanghai</span></span>
<span class="line"><span style="color:#24292e;">  availability_zone          = &quot;cn-shanghai-b&quot;</span></span>
<span class="line"><span style="color:#24292e;">  security_groups            = [&quot;\${alicloud_security_group.nsg1.id}&quot;]</span></span>
<span class="line"><span style="color:#24292e;">  instance_type              = &quot;ecs.e-c1m1.large&quot; #若实例规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#24292e;">  system_disk_category       = &quot;cloud_essd&quot; #若磁盘规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#24292e;">  system_disk_size           = 40 # 系统盘大小，单位为GB</span></span>
<span class="line"><span style="color:#24292e;">  image_id                   = &quot;centos_7_9_x64_20G_alibase_20220824.vhd&quot;</span></span>
<span class="line"><span style="color:#24292e;">  instance_name              = &quot;lyc-test&quot;</span></span>
<span class="line"><span style="color:#24292e;">  vswitch_id                 = alicloud_vswitch.vsw_1.id</span></span>
<span class="line"><span style="color:#24292e;">  internet_max_bandwidth_out = 1 # 出网带宽，单位为Mbps</span></span>
<span class="line"><span style="color:#24292e;">  password                   = &quot;5jejYWzSjZhWQc7G22&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_1-3-创建多台ecs✅" tabindex="-1">1.3 创建多台ecs✅ <a class="header-anchor" href="#_1-3-创建多台ecs✅" aria-label="Permalink to &quot;1.3 创建多台ecs✅&quot;">​</a></h2><p>vi main.tf</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#创建vpc</span></span>
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
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">security_group_name   = &quot;lyc_aliyun_nsg1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">vpc_id = alicloud_vpc.vpc.id</span></span>
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
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">count = 2</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 创建2台ECS实例</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">availability_zone          = &quot;cn-shanghai-b&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">security_groups            = [&quot;\${alicloud_security_group.nsg1.id}&quot;]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">instance_type              = &quot;ecs.e-c1m1.large&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#若实例规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">system_disk_category       = &quot;cloud_essd&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#若磁盘规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">system_disk_size           = 40</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 系统盘大小，单位为GB</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">image_id                   = &quot;centos_7_9_x64_20G_alibase_20220824.vhd&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">instance_name              = &quot;lyc-test-\${count.index+1}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">vswitch_id                 = alicloud_vswitch.vsw_1.id</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">internet_max_bandwidth_out = 1</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 出网带宽，单位为Mbps</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">password                   = &quot;5jejYWzSjZhWQc7G22&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#创建vpc</span></span>
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
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">security_group_name   = &quot;lyc_aliyun_nsg1&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">vpc_id = alicloud_vpc.vpc.id</span></span>
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
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">count = 2</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 创建2台ECS实例</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">availability_zone          = &quot;cn-shanghai-b&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">security_groups            = [&quot;\${alicloud_security_group.nsg1.id}&quot;]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">instance_type              = &quot;ecs.e-c1m1.large&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#若实例规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">system_disk_category       = &quot;cloud_essd&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#若磁盘规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">system_disk_size           = 40</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 系统盘大小，单位为GB</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">image_id                   = &quot;centos_7_9_x64_20G_alibase_20220824.vhd&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">instance_name              = &quot;lyc-test-\${count.index+1}&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">vswitch_id                 = alicloud_vswitch.vsw_1.id</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">internet_max_bandwidth_out = 1</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 出网带宽，单位为Mbps</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">password                   = &quot;5jejYWzSjZhWQc7G22&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>使用count = 2 # 创建2台ECS实例，instance_name = &quot;lyc-test-\${count.index+1}&quot;</p><p>\${} 为函数</p><p>其他方式，复制多个 instance 资源，不推荐这个方式</p></blockquote><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250710121306783.png" alt="image-20250710121303215"></p><h2 id="_1-4-挂载数据盘✅" tabindex="-1">1.4 挂载数据盘✅ <a class="header-anchor" href="#_1-4-挂载数据盘✅" aria-label="Permalink to &quot;1.4 挂载数据盘✅&quot;">​</a></h2><p>vim main.tf</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#创建vpc</span></span>
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
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">security_group_name   = &quot;lyc_aliyun_nsg1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">vpc_id = alicloud_vpc.vpc.id</span></span>
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
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">availability_zone          = &quot;cn-shanghai-b&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">security_groups            = [&quot;\${alicloud_security_group.nsg1.id}&quot;]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">instance_type              = &quot;ecs.e-c1m1.large&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#若实例规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">system_disk_category       = &quot;cloud_essd&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#若磁盘规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">system_disk_size           = 40</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 系统盘大小，单位为GB</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">image_id                   = &quot;centos_7_9_x64_20G_alibase_20220824.vhd&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">instance_name              = &quot;lyc-test-\${count.index+1}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">vswitch_id                 = alicloud_vswitch.vsw_1.id</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">internet_max_bandwidth_out = 1</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 出网带宽，单位为Mbps</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">password                   = &quot;5jejYWzSjZhWQc7G22&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">data_disks {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">name = &quot;data_disk1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">description = &quot;data_disk1&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 数据盘描述</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">size = 20</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 数据盘大小，单位为GB</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">category = &quot;cloud_essd&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 数据盘类型</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#创建vpc</span></span>
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
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">security_group_name   = &quot;lyc_aliyun_nsg1&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">vpc_id = alicloud_vpc.vpc.id</span></span>
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
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">availability_zone          = &quot;cn-shanghai-b&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">security_groups            = [&quot;\${alicloud_security_group.nsg1.id}&quot;]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">instance_type              = &quot;ecs.e-c1m1.large&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#若实例规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">system_disk_category       = &quot;cloud_essd&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#若磁盘规格下线，请使用目前售卖中的实例规格</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">system_disk_size           = 40</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 系统盘大小，单位为GB</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">image_id                   = &quot;centos_7_9_x64_20G_alibase_20220824.vhd&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">instance_name              = &quot;lyc-test-\${count.index+1}&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">vswitch_id                 = alicloud_vswitch.vsw_1.id</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">internet_max_bandwidth_out = 1</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 出网带宽，单位为Mbps</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">password                   = &quot;5jejYWzSjZhWQc7G22&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">data_disks {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">name = &quot;data_disk1&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">description = &quot;data_disk1&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 数据盘描述</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">size = 20</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 数据盘大小，单位为GB</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">category = &quot;cloud_essd&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 数据盘类型</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>使用data_disks 参数控制数据盘</p></blockquote><h1 id="_2-过滤镜像" tabindex="-1">2. 过滤镜像 <a class="header-anchor" href="#_2-过滤镜像" aria-label="Permalink to &quot;2. 过滤镜像&quot;">​</a></h1><p>比如，<a href="https://ecs.console.aliyun.com/image/region/cn-shanghai/systemImageList" target="_blank" rel="noreferrer">https://ecs.console.aliyun.com/image/region/cn-shanghai/systemImageList</a></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250725184542222.png" alt="image-20250725184539690"></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">data </span><span style="color:#9ECBFF;">&quot;alicloud_images&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;images_ds&quot;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">owners</span><span style="color:#E1E4E8;">     </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">&quot;system&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">name_regex</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">&quot;^centos_7&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">architecture</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">&quot;x86_64&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#6A737D;">// output 把值传递出去，给其他地方引用</span></span>
<span class="line"><span style="color:#E1E4E8;">output </span><span style="color:#9ECBFF;">&quot;first_image_id&quot;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">&quot;\${data.alicloud_images.images_ds.images.0.id}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">data </span><span style="color:#032F62;">&quot;alicloud_images&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;images_ds&quot;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">owners</span><span style="color:#24292E;">     </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">&quot;system&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">name_regex</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">&quot;^centos_7&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">architecture</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">&quot;x86_64&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;">// output 把值传递出去，给其他地方引用</span></span>
<span class="line"><span style="color:#24292E;">output </span><span style="color:#032F62;">&quot;first_image_id&quot;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">value</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">&quot;\${data.alicloud_images.images_ds.images.0.id}&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,19),e=[o];function c(t,i,r,u,y,E){return n(),a("div",null,e)}const d=s(p,[["render",c]]);export{q as __pageData,d as default};
