import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/kvm/1.install.md","filePath":"guide/container/kvm/1.install.md","lastUpdated":1714030813000}'),l={name:"guide/container/kvm/1.install.md"},p=e(`<h2 id="_1、先决条件" tabindex="-1">1、先决条件 <a class="header-anchor" href="#_1、先决条件" aria-label="Permalink to &quot;1、先决条件&quot;">​</a></h2><p>要运行带有2 GB以上RAM的guest虚拟机，您必须具有64位主机系统。 在继续安装之前，请确保您的Ubuntu主机支持KVM虚拟化。系统应具有带VT-x（vmx）的Intel处理器或具有AMD-V（svm）技术支持的AMD处理器</p><h3 id="_1-0查看cpu型号-物理cpu颗数" tabindex="-1">1.0查看cpu型号，物理cpu颗数 <a class="header-anchor" href="#_1-0查看cpu型号-物理cpu颗数" aria-label="Permalink to &quot;1.0查看cpu型号，物理cpu颗数&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@kvm-node1 ~]# cat /proc/cpuinfo | grep name | cut -d: -f2 | uniq -c</span></span>
<span class="line"><span style="color:#e1e4e8;">      1  Intel(R) Core(TM) i5-6260U CPU @ 1.80GHz</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@kvm-node1 ~]# cat /proc/cpuinfo | grep physical | sort -n | uniq -c</span></span>
<span class="line"><span style="color:#e1e4e8;">      1 address sizes   : 43 bits physical, 48 bits virtual</span></span>
<span class="line"><span style="color:#e1e4e8;">      1 physical id     : 0              ###说明有一颗cpu,颗数是从0开始的</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@kvm-node1 ~]# cat /proc/cpuinfo | grep name | cut -d: -f2 | uniq -c</span></span>
<span class="line"><span style="color:#24292e;">      1  Intel(R) Core(TM) i5-6260U CPU @ 1.80GHz</span></span>
<span class="line"><span style="color:#24292e;">[root@kvm-node1 ~]# cat /proc/cpuinfo | grep physical | sort -n | uniq -c</span></span>
<span class="line"><span style="color:#24292e;">      1 address sizes   : 43 bits physical, 48 bits virtual</span></span>
<span class="line"><span style="color:#24292e;">      1 physical id     : 0              ###说明有一颗cpu,颗数是从0开始的</span></span></code></pre></div><h3 id="_1-1查看内存" tabindex="-1">1.1查看内存 <a class="header-anchor" href="#_1-1查看内存" aria-label="Permalink to &quot;1.1查看内存&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@kvm-node1 ~]# dmidecode|grep -A5 &quot;Memory Device&quot;|grep Size | cut -d: -f2 | sort -n | uniq -c</span></span>
<span class="line"><span style="color:#e1e4e8;">    127  No Module Installed</span></span>
<span class="line"><span style="color:#e1e4e8;">     63  1 kB</span></span>
<span class="line"><span style="color:#e1e4e8;">      1  8 GB</span></span>
<span class="line"><span style="color:#e1e4e8;">      1  8192 MB                          ###接了一根内存，每根内存的大小为8G</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@kvm-node1 ~]# dmidecode|grep -A5 &quot;Memory Device&quot;|grep Size | cut -d: -f2 | sort -n | uniq -c</span></span>
<span class="line"><span style="color:#24292e;">    127  No Module Installed</span></span>
<span class="line"><span style="color:#24292e;">     63  1 kB</span></span>
<span class="line"><span style="color:#24292e;">      1  8 GB</span></span>
<span class="line"><span style="color:#24292e;">      1  8192 MB                          ###接了一根内存，每根内存的大小为8G</span></span></code></pre></div><h3 id="_1-2处理器支持硬件虚拟化" tabindex="-1">1.2处理器支持硬件虚拟化 <a class="header-anchor" href="#_1-2处理器支持硬件虚拟化" aria-label="Permalink to &quot;1.2处理器支持硬件虚拟化&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">grep -Eoc &#39;(vmx|svm)&#39; /proc/cpuinfo</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果CPU支持硬件虚拟化，则该命令将输出一个大于零的数字，即CPU核心的数量。否则，如果输出是，0则表示CPU不支持硬件虚拟化</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在某些计算机上，制造商可能会在BIOS中禁用虚拟技术扩展</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">grep -Eoc &#39;(vmx|svm)&#39; /proc/cpuinfo</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果CPU支持硬件虚拟化，则该命令将输出一个大于零的数字，即CPU核心的数量。否则，如果输出是，0则表示CPU不支持硬件虚拟化</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在某些计算机上，制造商可能会在BIOS中禁用虚拟技术扩展</span></span></code></pre></div><p>要检查BIOS中是否启用了VT，请使用kvm-ok软件包中随附的工具。以超级用户或具有sudo特权的用户身份输入以下命令来安装cpu-checker包含该kvm-ok命令的软件包：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo apt </span><span style="color:#F97583;">update</span></span>
<span class="line"><span style="color:#E1E4E8;">sudo apt install cpu</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">checker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo apt </span><span style="color:#D73A49;">update</span></span>
<span class="line"><span style="color:#24292E;">sudo apt install cpu</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">checker</span></span></code></pre></div><p>安装完成后，检查您的系统是否可以运行硬件加速的KVM虚拟机：</p><div class="language-undefined vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">undefined</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">kvm-ok</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">kvm-ok</span></span></code></pre></div><p>如果未在BIOS中禁用处理器虚拟化功能，则输出将如下所示：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">INFO</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">dev</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">kvm exists</span></span>
<span class="line"><span style="color:#79B8FF;">KVM</span><span style="color:#E1E4E8;"> acceleration can be used</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">INFO</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">dev</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">kvm exists</span></span>
<span class="line"><span style="color:#005CC5;">KVM</span><span style="color:#24292E;"> acceleration can be used</span></span></code></pre></div><p>否则，该命令将打印，并显示一条失败消息以及关于如何启用扩展程序的一条可选消息。启用AMD-V或VT技术的过程取决于您的主板和处理器类型。请查阅主板文档，以获取有关如何配置系统BIOS的信息</p><h2 id="_2、安装" tabindex="-1">2、安装 <a class="header-anchor" href="#_2、安装" aria-label="Permalink to &quot;2、安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virtinst virt-manager</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#检查是否安装成功 </span></span>
<span class="line"><span style="color:#e1e4e8;">lsmod | grep kvm</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#centos7</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install -y qemu-kvm qemu-img qemu-kvm-tools virt-manager libvirt   virt-install virt-viewer virt-v2v bridge-utils libguestfs-tools </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">libguestfs是用于访问和修改虚拟机的磁盘镜像的一组工具集合。libguestfs提供了访问和编辑客户机中的文件、脚本化修改客户机中的信息、监控磁盘使用和空闲的统计信息、P2V、V2V、创建客户机、克隆客户机、备份磁盘内容、格式化磁盘、调整磁盘大小等非常丰富的功能。</span></span>
<span class="line"><span style="color:#e1e4e8;">libguestfs-tools提供了很多工具，可以分别对应不同的功能和使用场景，如：</span></span>
<span class="line"><span style="color:#e1e4e8;">virt-ls用于列出虚拟机中的文件</span></span>
<span class="line"><span style="color:#e1e4e8;">virt-copy-in用于往虚拟机中复制文件或目录</span></span>
<span class="line"><span style="color:#e1e4e8;">virt-copy-out用于从虚拟机往外复制文件或目录</span></span>
<span class="line"><span style="color:#e1e4e8;">virt-resize用于调整磁盘大小</span></span>
<span class="line"><span style="color:#e1e4e8;">virt-cat用于显示虚拟机中的一个文件的内容</span></span>
<span class="line"><span style="color:#e1e4e8;">virt-edit用于编辑虚拟机中的文件</span></span>
<span class="line"><span style="color:#e1e4e8;">virt-df用于查看虚拟机中文件系统空间使用情况</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virtinst virt-manager</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#检查是否安装成功 </span></span>
<span class="line"><span style="color:#24292e;">lsmod | grep kvm</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#centos7</span></span>
<span class="line"><span style="color:#24292e;">yum install -y qemu-kvm qemu-img qemu-kvm-tools virt-manager libvirt   virt-install virt-viewer virt-v2v bridge-utils libguestfs-tools </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">libguestfs是用于访问和修改虚拟机的磁盘镜像的一组工具集合。libguestfs提供了访问和编辑客户机中的文件、脚本化修改客户机中的信息、监控磁盘使用和空闲的统计信息、P2V、V2V、创建客户机、克隆客户机、备份磁盘内容、格式化磁盘、调整磁盘大小等非常丰富的功能。</span></span>
<span class="line"><span style="color:#24292e;">libguestfs-tools提供了很多工具，可以分别对应不同的功能和使用场景，如：</span></span>
<span class="line"><span style="color:#24292e;">virt-ls用于列出虚拟机中的文件</span></span>
<span class="line"><span style="color:#24292e;">virt-copy-in用于往虚拟机中复制文件或目录</span></span>
<span class="line"><span style="color:#24292e;">virt-copy-out用于从虚拟机往外复制文件或目录</span></span>
<span class="line"><span style="color:#24292e;">virt-resize用于调整磁盘大小</span></span>
<span class="line"><span style="color:#24292e;">virt-cat用于显示虚拟机中的一个文件的内容</span></span>
<span class="line"><span style="color:#24292e;">virt-edit用于编辑虚拟机中的文件</span></span>
<span class="line"><span style="color:#24292e;">virt-df用于查看虚拟机中文件系统空间使用情况</span></span></code></pre></div><ul><li>qemu-kvm -为KVM管理程序提供硬件仿真的软件。</li><li>libvirt-daemon-system -用于将libvirt守护程序作为系统服务运行的配置文件。</li><li>libvirt-clients -用于管理虚拟化平台的软件。</li><li>bridge-utils -一组用于配置以太网桥的命令行工具。</li><li>virtinst -一组用于创建虚拟机的命令行工具。</li><li>virt-manager -易于使用的GUI界面和支持命令行工具，用于通过libvirt管理虚拟机</li></ul><h3 id="_2-0开机启动" tabindex="-1">2.0开机启动 <a class="header-anchor" href="#_2-0开机启动" aria-label="Permalink to &quot;2.0开机启动&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># systemctl start libvirtd </span></span>
<span class="line"><span style="color:#e1e4e8;"># systemctl enable libvirtd</span></span>
<span class="line"><span style="color:#e1e4e8;"># systemctl list-unit-files |grep libvirtd.service //打印启动虚拟化和设置开机自启情况</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># systemctl start libvirtd </span></span>
<span class="line"><span style="color:#24292e;"># systemctl enable libvirtd</span></span>
<span class="line"><span style="color:#24292e;"># systemctl list-unit-files |grep libvirtd.service //打印启动虚拟化和设置开机自启情况</span></span></code></pre></div><h3 id="_2-1添加用户" tabindex="-1">2.1添加用户 <a class="header-anchor" href="#_2-1添加用户" aria-label="Permalink to &quot;2.1添加用户&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#为了能够创建和管理虚拟机，您需要将用户添加到“ libvirt”和“ kvm”组中</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sudo usermod -aG libvirt $USER</span></span>
<span class="line"><span style="color:#e1e4e8;">sudo usermod -aG kvm $USER</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$USER 是一个环境变量，其中包含当前登录用户的名称。</span></span>
<span class="line"><span style="color:#e1e4e8;">注销并重新登录，以便刷新组成员身份</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#为了能够创建和管理虚拟机，您需要将用户添加到“ libvirt”和“ kvm”组中</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sudo usermod -aG libvirt $USER</span></span>
<span class="line"><span style="color:#24292e;">sudo usermod -aG kvm $USER</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$USER 是一个环境变量，其中包含当前登录用户的名称。</span></span>
<span class="line"><span style="color:#24292e;">注销并重新登录，以便刷新组成员身份</span></span></code></pre></div><h3 id="_2-2查看版本" tabindex="-1">2.2查看版本 <a class="header-anchor" href="#_2-2查看版本" aria-label="Permalink to &quot;2.2查看版本&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#查看virsh的版本</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@kvm-node1 ~]# virsh --version </span></span>
<span class="line"><span style="color:#e1e4e8;">4.5.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看 virt-install工具的版本</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@kvm-node1 ~]# virt-install --version   </span></span>
<span class="line"><span style="color:#e1e4e8;">1.5.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@kvm-node1 ~]# ln -s /usr/libexec/qemu-kvm /usr/bin/qemu-kvm</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@kvm-node1 ~]# qemu-kvm -version</span></span>
<span class="line"><span style="color:#e1e4e8;">QEMU emulator version 1.5.3 (qemu-kvm-1.5.3-175.el7_9.5), Copyright (c) 2003-2008 Fabrice Bellard</span></span>
<span class="line"><span style="color:#e1e4e8;">#查看qemu-kvm版本</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@kvm-node1 ~]# ln -s /usr/libexec/qemu-kvm /usr/bin/qemu-kvm</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@kvm-node1 ~]# qemu-kvm -version</span></span>
<span class="line"><span style="color:#e1e4e8;">QEMU emulator version 1.5.3 (qemu-kvm-1.5.3-175.el7_9.5), Copyright (c) 2003-2008 Fabrice Bellard</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#查看virsh的版本</span></span>
<span class="line"><span style="color:#24292e;">[root@kvm-node1 ~]# virsh --version </span></span>
<span class="line"><span style="color:#24292e;">4.5.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看 virt-install工具的版本</span></span>
<span class="line"><span style="color:#24292e;">[root@kvm-node1 ~]# virt-install --version   </span></span>
<span class="line"><span style="color:#24292e;">1.5.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@kvm-node1 ~]# ln -s /usr/libexec/qemu-kvm /usr/bin/qemu-kvm</span></span>
<span class="line"><span style="color:#24292e;">[root@kvm-node1 ~]# qemu-kvm -version</span></span>
<span class="line"><span style="color:#24292e;">QEMU emulator version 1.5.3 (qemu-kvm-1.5.3-175.el7_9.5), Copyright (c) 2003-2008 Fabrice Bellard</span></span>
<span class="line"><span style="color:#24292e;">#查看qemu-kvm版本</span></span>
<span class="line"><span style="color:#24292e;">[root@kvm-node1 ~]# ln -s /usr/libexec/qemu-kvm /usr/bin/qemu-kvm</span></span>
<span class="line"><span style="color:#24292e;">[root@kvm-node1 ~]# qemu-kvm -version</span></span>
<span class="line"><span style="color:#24292e;">QEMU emulator version 1.5.3 (qemu-kvm-1.5.3-175.el7_9.5), Copyright (c) 2003-2008 Fabrice Bellard</span></span></code></pre></div><h3 id="_2-3网桥" tabindex="-1">2.3网桥 <a class="header-anchor" href="#_2-3网桥" aria-label="Permalink to &quot;2.3网桥&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#centos7</span></span>
<span class="line"><span style="color:#e1e4e8;">#停用NetworkManager服务</span></span>
<span class="line"><span style="color:#e1e4e8;">#查看状态</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl   status   NetworkManager</span></span>
<span class="line"><span style="color:#e1e4e8;">#停止NetworkManager</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl   stop   NetworkManager</span></span>
<span class="line"><span style="color:#e1e4e8;">#关闭开机启动</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl   disable   NetworkManager</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#创建br0网桥</span></span>
<span class="line"><span style="color:#e1e4e8;">cat   /etc/sysconfig/network-scripts/ifcfg-ens33</span></span>
<span class="line"><span style="color:#e1e4e8;">TYPE=Ethernet</span></span>
<span class="line"><span style="color:#e1e4e8;">PROXY_METHOD=none</span></span>
<span class="line"><span style="color:#e1e4e8;">BROWSER_ONLY=no</span></span>
<span class="line"><span style="color:#e1e4e8;">BOOTPROTO=static</span></span>
<span class="line"><span style="color:#e1e4e8;">DEFROUTE=yes</span></span>
<span class="line"><span style="color:#e1e4e8;">IPV4_FAILURE_FATAL=no</span></span>
<span class="line"><span style="color:#e1e4e8;">NAME=ens33</span></span>
<span class="line"><span style="color:#e1e4e8;">DEVICE=ens33</span></span>
<span class="line"><span style="color:#e1e4e8;">ONBOOT=yes</span></span>
<span class="line"><span style="color:#e1e4e8;">BRIDGE=br0</span></span>
<span class="line"><span style="color:#e1e4e8;">IPADDR=192.168.10.225</span></span>
<span class="line"><span style="color:#e1e4e8;">NETMASK=255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">GATEWAY=192.168.10.1</span></span>
<span class="line"><span style="color:#e1e4e8;">DNS1=114.114.114.114</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cat   /etc/sysconfig/network-scripts/ifcfg-br0</span></span>
<span class="line"><span style="color:#e1e4e8;">DEVICE=br0</span></span>
<span class="line"><span style="color:#e1e4e8;">TYPE=Bridge</span></span>
<span class="line"><span style="color:#e1e4e8;">ONBOOT=yes</span></span>
<span class="line"><span style="color:#e1e4e8;">BOOTPROTO=static</span></span>
<span class="line"><span style="color:#e1e4e8;">IPADDR=192.168.10.225</span></span>
<span class="line"><span style="color:#e1e4e8;">NETMASK=255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">GATEWAY=192.168.10.1</span></span>
<span class="line"><span style="color:#e1e4e8;">DNS1=114.114.114.114</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#重启网络</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl   restart  network</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看网桥</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@kvm-node1 ~]# brctl show</span></span>
<span class="line"><span style="color:#e1e4e8;">bridge name     bridge id               STP enabled     interfaces</span></span>
<span class="line"><span style="color:#e1e4e8;">br0             8000.000c293ae6c4       no              ens33</span></span>
<span class="line"><span style="color:#e1e4e8;">virbr0          8000.525400eb3239       yes             virbr0-nic</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#centos7</span></span>
<span class="line"><span style="color:#24292e;">#停用NetworkManager服务</span></span>
<span class="line"><span style="color:#24292e;">#查看状态</span></span>
<span class="line"><span style="color:#24292e;">systemctl   status   NetworkManager</span></span>
<span class="line"><span style="color:#24292e;">#停止NetworkManager</span></span>
<span class="line"><span style="color:#24292e;">systemctl   stop   NetworkManager</span></span>
<span class="line"><span style="color:#24292e;">#关闭开机启动</span></span>
<span class="line"><span style="color:#24292e;">systemctl   disable   NetworkManager</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#创建br0网桥</span></span>
<span class="line"><span style="color:#24292e;">cat   /etc/sysconfig/network-scripts/ifcfg-ens33</span></span>
<span class="line"><span style="color:#24292e;">TYPE=Ethernet</span></span>
<span class="line"><span style="color:#24292e;">PROXY_METHOD=none</span></span>
<span class="line"><span style="color:#24292e;">BROWSER_ONLY=no</span></span>
<span class="line"><span style="color:#24292e;">BOOTPROTO=static</span></span>
<span class="line"><span style="color:#24292e;">DEFROUTE=yes</span></span>
<span class="line"><span style="color:#24292e;">IPV4_FAILURE_FATAL=no</span></span>
<span class="line"><span style="color:#24292e;">NAME=ens33</span></span>
<span class="line"><span style="color:#24292e;">DEVICE=ens33</span></span>
<span class="line"><span style="color:#24292e;">ONBOOT=yes</span></span>
<span class="line"><span style="color:#24292e;">BRIDGE=br0</span></span>
<span class="line"><span style="color:#24292e;">IPADDR=192.168.10.225</span></span>
<span class="line"><span style="color:#24292e;">NETMASK=255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">GATEWAY=192.168.10.1</span></span>
<span class="line"><span style="color:#24292e;">DNS1=114.114.114.114</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cat   /etc/sysconfig/network-scripts/ifcfg-br0</span></span>
<span class="line"><span style="color:#24292e;">DEVICE=br0</span></span>
<span class="line"><span style="color:#24292e;">TYPE=Bridge</span></span>
<span class="line"><span style="color:#24292e;">ONBOOT=yes</span></span>
<span class="line"><span style="color:#24292e;">BOOTPROTO=static</span></span>
<span class="line"><span style="color:#24292e;">IPADDR=192.168.10.225</span></span>
<span class="line"><span style="color:#24292e;">NETMASK=255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">GATEWAY=192.168.10.1</span></span>
<span class="line"><span style="color:#24292e;">DNS1=114.114.114.114</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#重启网络</span></span>
<span class="line"><span style="color:#24292e;">systemctl   restart  network</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看网桥</span></span>
<span class="line"><span style="color:#24292e;">[root@kvm-node1 ~]# brctl show</span></span>
<span class="line"><span style="color:#24292e;">bridge name     bridge id               STP enabled     interfaces</span></span>
<span class="line"><span style="color:#24292e;">br0             8000.000c293ae6c4       no              ens33</span></span>
<span class="line"><span style="color:#24292e;">virbr0          8000.525400eb3239       yes             virbr0-nic</span></span></code></pre></div>`,26),o=[p];function c(t,i,r,y,d,v){return n(),a("div",null,o)}const h=s(l,[["render",c]]);export{m as __pageData,h as default};
