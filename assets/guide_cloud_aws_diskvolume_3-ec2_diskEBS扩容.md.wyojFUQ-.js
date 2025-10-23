import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"0x01 扩容磁盘","description":"","frontmatter":{},"headers":[],"relativePath":"guide/cloud/aws/diskvolume/3-ec2_diskEBS扩容.md","filePath":"guide/cloud/aws/diskvolume/3-ec2_diskEBS扩容.md","lastUpdated":1701332406000}'),p={name:"guide/cloud/aws/diskvolume/3-ec2_diskEBS扩容.md"},l=n(`<p>5min不停机扩容EBS卷大小</p><p>对于已经挂载过 EBS 的实例，我们要做仅仅的是扩容，在这个过程中，不影响已有的数据，不会对已有的磁盘做格式化，只单纯增加容量</p><p>分为以下三个步骤：</p><p>1、扩容使用中的 EBS 卷；</p><p>2、扩容分区；</p><p>3、扩容文件系统；</p><h2 id="_1-在ec2实例界面选择相应需要扩容磁盘的实例-选择要扩容的磁盘" tabindex="-1">1. 在ec2实例界面选择相应需要扩容磁盘的实例，选择要扩容的磁盘 <a class="header-anchor" href="#_1-在ec2实例界面选择相应需要扩容磁盘的实例-选择要扩容的磁盘" aria-label="Permalink to &quot;1. 在ec2实例界面选择相应需要扩容磁盘的实例，选择要扩容的磁盘&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301532407.png" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301611006.png" alt="aws-ebs-2"></p><h2 id="_2-修改卷大小" tabindex="-1">2. 修改卷大小 <a class="header-anchor" href="#_2-修改卷大小" aria-label="Permalink to &quot;2. 修改卷大小&quot;">​</a></h2><p>进入控制台，选择 EBS - Volumes -Action - Modify Volume</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301532350.png" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301532617.png" alt=""></p><h2 id="_3-确认" tabindex="-1">3. 确认 <a class="header-anchor" href="#_3-确认" aria-label="Permalink to &quot;3. 确认&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301532273.png" alt=""></p><h1 id="_0x01-扩容磁盘" tabindex="-1">0x01 扩容磁盘 <a class="header-anchor" href="#_0x01-扩容磁盘" aria-label="Permalink to &quot;0x01 扩容磁盘&quot;">​</a></h1><p><strong>安装扩容工具</strong></p><p>yum install cloud-init cloud-utils-growpart gdisk</p><p>等待ebs卷大小调整完成后，在扩容的实例中执行lsblk列出连接到实例的EBS设备</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@ttt] #: lsblk</span></span>
<span class="line"><span style="color:#e1e4e8;">NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT</span></span>
<span class="line"><span style="color:#e1e4e8;">xvda    202:0    0  6000G  0 disk </span></span>
<span class="line"><span style="color:#e1e4e8;">└─xvda1 202:1    0  20G  0 part /</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@ttt] #: lsblk</span></span>
<span class="line"><span style="color:#24292e;">NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT</span></span>
<span class="line"><span style="color:#24292e;">xvda    202:0    0  6000G  0 disk </span></span>
<span class="line"><span style="color:#24292e;">└─xvda1 202:1    0  20G  0 part /</span></span></code></pre></div><p>使用 df -h 查看，/dev/xvda1 设备已扩展为 6000 GiB，但操作系统仍只能看到原来的 20 GiB ext4 文件系统</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@ttt] #: df -h</span></span>
<span class="line"><span style="color:#e1e4e8;">文件系统                       容量  已用  可用 已用% 挂载点</span></span>
<span class="line"><span style="color:#e1e4e8;">devtmpfs                       3.9G   64K  3.9G    1% /dev</span></span>
<span class="line"><span style="color:#e1e4e8;">tmpfs                          3.9G     0  3.9G    0% /dev/shm</span></span>
<span class="line"><span style="color:#e1e4e8;">/dev/xvda1                      20G   12G  8.2G   59% /</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@ttt] #: df -h</span></span>
<span class="line"><span style="color:#24292e;">文件系统                       容量  已用  可用 已用% 挂载点</span></span>
<span class="line"><span style="color:#24292e;">devtmpfs                       3.9G   64K  3.9G    1% /dev</span></span>
<span class="line"><span style="color:#24292e;">tmpfs                          3.9G     0  3.9G    0% /dev/shm</span></span>
<span class="line"><span style="color:#24292e;">/dev/xvda1                      20G   12G  8.2G   59% /</span></span></code></pre></div><p>接下来使用<code>growpart</code>展开修改后的分区**（注意将设备名称与分区名称分隔开）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">格式：growpart diskname part</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@ttt] #: growpart /dev/xvda 1</span></span>
<span class="line"><span style="color:#e1e4e8;">CHANGED: disk=/dev/xvda partition=1: start=4096 old: size=41938910,end=41943006 new: size=104853470,end=104857566</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">格式：growpart diskname part</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@ttt] #: growpart /dev/xvda 1</span></span>
<span class="line"><span style="color:#24292e;">CHANGED: disk=/dev/xvda partition=1: start=4096 old: size=41938910,end=41943006 new: size=104853470,end=104857566</span></span></code></pre></div><p>通过查看<code>lsblk</code>可以确认分区<code>/dev/xvda1</code>现已填充卷<code>/dev/xvda</code>上的可用空间：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@ttt] #: lsblk</span></span>
<span class="line"><span style="color:#e1e4e8;">NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT</span></span>
<span class="line"><span style="color:#e1e4e8;">xvda    202:0    0  6000G  0 disk </span></span>
<span class="line"><span style="color:#e1e4e8;">└─xvda1 202:1    0  6000G  0 part /</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@online-code ~]# file -s /dev/vda*</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@ttt] #: lsblk</span></span>
<span class="line"><span style="color:#24292e;">NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT</span></span>
<span class="line"><span style="color:#24292e;">xvda    202:0    0  6000G  0 disk </span></span>
<span class="line"><span style="color:#24292e;">└─xvda1 202:1    0  6000G  0 part /</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@online-code ~]# file -s /dev/vda*</span></span></code></pre></div><p>对于 Linux ext2、ext3 或 ext4 文件系统，使用以下命令并替换要扩展的设备名称：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@ttt] #: resize2fs /dev/xvda1</span></span>
<span class="line"><span style="color:#e1e4e8;">resize2fs 1.42.12 (29-Aug-2014)</span></span>
<span class="line"><span style="color:#e1e4e8;">Filesystem at /dev/xvda1 is mounted on /; on-line resizing required</span></span>
<span class="line"><span style="color:#e1e4e8;">old_desc_blocks = 2, new_desc_blocks = 4</span></span>
<span class="line"><span style="color:#e1e4e8;">The filesystem on /dev/xvda1 is now 13106683 (4k) blocks long.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@ttt] #: resize2fs /dev/xvda1</span></span>
<span class="line"><span style="color:#24292e;">resize2fs 1.42.12 (29-Aug-2014)</span></span>
<span class="line"><span style="color:#24292e;">Filesystem at /dev/xvda1 is mounted on /; on-line resizing required</span></span>
<span class="line"><span style="color:#24292e;">old_desc_blocks = 2, new_desc_blocks = 4</span></span>
<span class="line"><span style="color:#24292e;">The filesystem on /dev/xvda1 is now 13106683 (4k) blocks long.</span></span></code></pre></div><p>对于xfs文件系统</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># yum install xfsprogs</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#第一步</span></span>
<span class="line"><span style="color:#e1e4e8;"># growpart /dev/nvme0n1 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#第二步</span></span>
<span class="line"><span style="color:#e1e4e8;"># xfs_growfs /dev/nvme0n1p1</span></span>
<span class="line"><span style="color:#e1e4e8;">或者：</span></span>
<span class="line"><span style="color:#e1e4e8;">xfs_growfs -d /data 增大扩展存储卷文件系统</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">说明：nvme0n1是设备名，nvme0n1p1是对应的一个分区，p1表示主分区1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># yum install xfsprogs</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#第一步</span></span>
<span class="line"><span style="color:#24292e;"># growpart /dev/nvme0n1 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#第二步</span></span>
<span class="line"><span style="color:#24292e;"># xfs_growfs /dev/nvme0n1p1</span></span>
<span class="line"><span style="color:#24292e;">或者：</span></span>
<span class="line"><span style="color:#24292e;">xfs_growfs -d /data 增大扩展存储卷文件系统</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">说明：nvme0n1是设备名，nvme0n1p1是对应的一个分区，p1表示主分区1</span></span></code></pre></div><h1 id="_0x02-完成扩容" tabindex="-1">0x02 完成扩容 <a class="header-anchor" href="#_0x02-完成扩容" aria-label="Permalink to &quot;0x02 完成扩容&quot;">​</a></h1><p>至此，磁盘已完成扩容，查看磁盘可用空间：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@ttt]# df -h</span></span>
<span class="line"><span style="color:#e1e4e8;">文件系统                       容量  已用  可用 已用% 挂载点</span></span>
<span class="line"><span style="color:#e1e4e8;">devtmpfs                       3.9G   64K  3.9G    1% /dev</span></span>
<span class="line"><span style="color:#e1e4e8;">tmpfs                          3.9G     0  3.9G    0% /dev/shm</span></span>
<span class="line"><span style="color:#e1e4e8;">/dev/xvda1                      6000G   12G  5988.2G   0.002% /</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@ttt]# df -h</span></span>
<span class="line"><span style="color:#24292e;">文件系统                       容量  已用  可用 已用% 挂载点</span></span>
<span class="line"><span style="color:#24292e;">devtmpfs                       3.9G   64K  3.9G    1% /dev</span></span>
<span class="line"><span style="color:#24292e;">tmpfs                          3.9G     0  3.9G    0% /dev/shm</span></span>
<span class="line"><span style="color:#24292e;">/dev/xvda1                      6000G   12G  5988.2G   0.002% /</span></span></code></pre></div><blockquote><p>如果扩容的是系统盘则需要重启</p><p>一天只能调整一次</p><p>如果没有分区号，直接对整个磁盘进行文件系统扩容</p></blockquote><p>参考文档：</p><p><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volumes-multi.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volumes-multi.html</a></p><p><a href="https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/ebs-restoring-volume.html" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/ebs-restoring-volume.html</a></p><p><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html#extend-linux-file-system" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html#extend-linux-file-system</a></p><p><a href="https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html?icmpid=docs_ec2_console" target="_blank" rel="noreferrer">https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html?icmpid=docs_ec2_console</a></p>`,39),o=[l];function t(c,i,r,d,h,v){return e(),a("div",null,o)}const u=s(p,[["render",t]]);export{m as __pageData,u as default};
