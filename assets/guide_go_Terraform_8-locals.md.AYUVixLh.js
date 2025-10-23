import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"1. locals","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/Terraform/8-locals.md","filePath":"guide/go/Terraform/8-locals.md","lastUpdated":1752158731000}'),p={name:"guide/go/Terraform/8-locals.md"},o=l(`<h1 id="_1-locals" tabindex="-1">1. <a href="https://developer.hashicorp.com/terraform/tutorials/configuration-language/locals" target="_blank" rel="noreferrer">locals</a> <a class="header-anchor" href="#_1-locals" aria-label="Permalink to &quot;1. [locals](https://developer.hashicorp.com/terraform/tutorials/configuration-language/locals) { }&quot;">​</a></h1><h2 id="_1-1-使用说明✅" tabindex="-1">1.1 使用说明✅ <a class="header-anchor" href="#_1-1-使用说明✅" aria-label="Permalink to &quot;1.1 使用说明✅&quot;">​</a></h2><p>类似于编程语言中的局部变量，只能在当前文件中使用。</p><p>局部值为表达式分配一个名称，因此我们可以在模块中多次使用该名称，而不是重复复制黏贴相同值。</p><p>比如：</p><p>vim locals.tf</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">locals {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">image_id = &quot;centos_7_9_x64_20G_alibase_20220824.vhd&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 通过local.名字调用</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">password = &quot;5jejYWzSjZhWQc7G22&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">locals {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">image_id = &quot;centos_7_9_x64_20G_alibase_20220824.vhd&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 通过local.名字调用</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">password = &quot;5jejYWzSjZhWQc7G22&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>vim main.tf</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#创建vpc</span></span>
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
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">image_id                   = local.image_id</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#instance_name              = &quot;lyc-test-\${count.index+1}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">instance_name              = &quot;lyc-test&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">vswitch_id                 = alicloud_vswitch.vsw_1.id</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">internet_max_bandwidth_out = 1</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 出网带宽，单位为Mbps</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">password                   = local.password</span></span>
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
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">image_id                   = local.image_id</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#instance_name              = &quot;lyc-test-\${count.index+1}&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">instance_name              = &quot;lyc-test&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">vswitch_id                 = alicloud_vswitch.vsw_1.id</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">internet_max_bandwidth_out = 1</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 出网带宽，单位为Mbps</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">password                   = local.password</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">data_disks {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">name = &quot;data_disk1&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">description = &quot;data_disk1&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 数据盘描述</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">size = 20</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 数据盘大小，单位为GB</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">category = &quot;cloud_essd&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 数据盘类型</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><ul><li>局部值只能在同一模块内的代码中引用。</li><li>局部值可以避免多次修改同一值，提高代码的可读性。但如果过度使用，它们也会增加复杂性，所以请适度使用</li><li>局部值由局部块locals(复数有s)创建，但引用时本地值时省略“s&quot;</li></ul></div>`,10),c=[o];function e(t,r,i,y,u,E){return n(),a("div",null,c)}const q=s(p,[["render",e]]);export{d as __pageData,q as default};
