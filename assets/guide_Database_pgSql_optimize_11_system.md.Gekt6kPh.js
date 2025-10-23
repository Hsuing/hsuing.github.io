import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/optimize/11_system.md","filePath":"guide/Database/pgSql/optimize/11_system.md","lastUpdated":1703063387000}'),l={name:"guide/Database/pgSql/optimize/11_system.md"},p=e(`<h4 id="系统优化" tabindex="-1">系统优化 <a class="header-anchor" href="#系统优化" aria-label="Permalink to &quot;系统优化&quot;">​</a></h4><h4 id="修改-etc-grub-conf" tabindex="-1">修改 /etc/grub.conf <a class="header-anchor" href="#修改-etc-grub-conf" aria-label="Permalink to &quot;修改 /etc/grub.conf&quot;">​</a></h4><p>关闭 numa=off ，修改磁盘IO调度方式 elevator=deadline</p><p>修改方法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">grubby --update-kernel=ALL --args=&quot;transparent_hugepage=never&quot; --args=&quot;elevator=deadline&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">验证：</span></span>
<span class="line"><span style="color:#e1e4e8;">grubby --info=ALL</span></span>
<span class="line"><span style="color:#e1e4e8;">返回</span></span>
<span class="line"><span style="color:#e1e4e8;">args=&quot;ro crashkernel=auto rhgb quiet numa=off elevator=deadline&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">grubby --update-kernel=ALL --args=&quot;transparent_hugepage=never&quot; --args=&quot;elevator=deadline&quot;</span></span>
<span class="line"><span style="color:#24292e;">验证：</span></span>
<span class="line"><span style="color:#24292e;">grubby --info=ALL</span></span>
<span class="line"><span style="color:#24292e;">返回</span></span>
<span class="line"><span style="color:#24292e;">args=&quot;ro crashkernel=auto rhgb quiet numa=off elevator=deadline&quot;</span></span></code></pre></div><h4 id="关闭内存大页-hugepage" tabindex="-1">关闭内存大页 hugepage <a class="header-anchor" href="#关闭内存大页-hugepage" aria-label="Permalink to &quot;关闭内存大页 hugepage&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">验证是否开启方法1： </span></span>
<span class="line"><span style="color:#e1e4e8;">如果以下文件不存在，则是THP已经从内核中移除。</span></span>
<span class="line"><span style="color:#e1e4e8;">/sys/kernel/mm/transparent_hugepage or /sys/kernel/mm/redhat_transparent_hugepage</span></span>
<span class="line"><span style="color:#e1e4e8;">验证是否开启方法2： </span></span>
<span class="line"><span style="color:#e1e4e8;">cat /sys/kernel/mm/transparent_hugepage/enabled</span></span>
<span class="line"><span style="color:#e1e4e8;">[always] madvise never</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[always] == 》表示开启</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">验证是否开启方法1： </span></span>
<span class="line"><span style="color:#24292e;">如果以下文件不存在，则是THP已经从内核中移除。</span></span>
<span class="line"><span style="color:#24292e;">/sys/kernel/mm/transparent_hugepage or /sys/kernel/mm/redhat_transparent_hugepage</span></span>
<span class="line"><span style="color:#24292e;">验证是否开启方法2： </span></span>
<span class="line"><span style="color:#24292e;">cat /sys/kernel/mm/transparent_hugepage/enabled</span></span>
<span class="line"><span style="color:#24292e;">[always] madvise never</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[always] == 》表示开启</span></span></code></pre></div><h4 id="禁用内存大页" tabindex="-1">禁用内存大页 <a class="header-anchor" href="#禁用内存大页" aria-label="Permalink to &quot;禁用内存大页&quot;">​</a></h4><h5 id="方法" tabindex="-1">方法： <a class="header-anchor" href="#方法" aria-label="Permalink to &quot;方法：&quot;">​</a></h5><p>修改 /etc/rc.local</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># vi /etc/rc.local #追加，禁用大页</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if test -f /sys/kernel/mm/transparent_hugepage/enabled; then</span></span>
<span class="line"><span style="color:#e1e4e8;">  echo never &gt; /sys/kernel/mm/transparent_hugepage/enabled</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;">if test -f /sys/kernel/mm/transparent_hugepage/defrag; then</span></span>
<span class="line"><span style="color:#e1e4e8;">  echo never &gt; /sys/kernel/mm/transparent_hugepage/defrag</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># vi /etc/rc.local #追加，禁用大页</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if test -f /sys/kernel/mm/transparent_hugepage/enabled; then</span></span>
<span class="line"><span style="color:#24292e;">  echo never &gt; /sys/kernel/mm/transparent_hugepage/enabled</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;">if test -f /sys/kernel/mm/transparent_hugepage/defrag; then</span></span>
<span class="line"><span style="color:#24292e;">  echo never &gt; /sys/kernel/mm/transparent_hugepage/defrag</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span></code></pre></div><h4 id="内核优化" tabindex="-1">内核优化 <a class="header-anchor" href="#内核优化" aria-label="Permalink to &quot;内核优化&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vi /etc/sysctl.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vi /etc/sysctl.conf</span></span></code></pre></div><p>添加内容如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vm.swappiness = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">kernel.shmmax=135497418752</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.rmem_max = 4194304</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.wmem_max = 4194304</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.rmem_default = 262144</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.wmem_default = 262144</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_local_port_range = 9000 65535</span></span>
<span class="line"><span style="color:#e1e4e8;">kernel.sem = 50100 64128000 50100 1280</span></span>
<span class="line"><span style="color:#e1e4e8;">vm.dirty_background_bytes = 102400000</span></span>
<span class="line"><span style="color:#e1e4e8;">vm.dirty_ratio = 80</span></span>
<span class="line"><span style="color:#e1e4e8;">vm.nr_hugepages = 102352</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/security/limits.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">* soft nofile 655360</span></span>
<span class="line"><span style="color:#e1e4e8;">* hard nofile 655360</span></span>
<span class="line"><span style="color:#e1e4e8;">* soft nproc 655360</span></span>
<span class="line"><span style="color:#e1e4e8;">* hard nproc 655360</span></span>
<span class="line"><span style="color:#e1e4e8;">* soft stack unlimited</span></span>
<span class="line"><span style="color:#e1e4e8;">* hard stack unlimited</span></span>
<span class="line"><span style="color:#e1e4e8;">* soft   memlock    250000000</span></span>
<span class="line"><span style="color:#e1e4e8;">* hard   memlock    250000000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vm.swappiness = 0</span></span>
<span class="line"><span style="color:#24292e;">kernel.shmmax=135497418752</span></span>
<span class="line"><span style="color:#24292e;">net.core.rmem_max = 4194304</span></span>
<span class="line"><span style="color:#24292e;">net.core.wmem_max = 4194304</span></span>
<span class="line"><span style="color:#24292e;">net.core.rmem_default = 262144</span></span>
<span class="line"><span style="color:#24292e;">net.core.wmem_default = 262144</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_local_port_range = 9000 65535</span></span>
<span class="line"><span style="color:#24292e;">kernel.sem = 50100 64128000 50100 1280</span></span>
<span class="line"><span style="color:#24292e;">vm.dirty_background_bytes = 102400000</span></span>
<span class="line"><span style="color:#24292e;">vm.dirty_ratio = 80</span></span>
<span class="line"><span style="color:#24292e;">vm.nr_hugepages = 102352</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/etc/security/limits.conf</span></span>
<span class="line"><span style="color:#24292e;">* soft nofile 655360</span></span>
<span class="line"><span style="color:#24292e;">* hard nofile 655360</span></span>
<span class="line"><span style="color:#24292e;">* soft nproc 655360</span></span>
<span class="line"><span style="color:#24292e;">* hard nproc 655360</span></span>
<span class="line"><span style="color:#24292e;">* soft stack unlimited</span></span>
<span class="line"><span style="color:#24292e;">* hard stack unlimited</span></span>
<span class="line"><span style="color:#24292e;">* soft   memlock    250000000</span></span>
<span class="line"><span style="color:#24292e;">* hard   memlock    250000000</span></span></code></pre></div><h4 id="块设备预读" tabindex="-1">块设备预读 <a class="header-anchor" href="#块设备预读" aria-label="Permalink to &quot;块设备预读&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">blockdev --setra 16384 /dev/sda</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">设置开机启动生效：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;blockdev --setra 16384 /dev/sda&quot; &gt;&gt; /etc/rc.local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">blockdev --setra 16384 /dev/sda</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">设置开机启动生效：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;blockdev --setra 16384 /dev/sda&quot; &gt;&gt; /etc/rc.local</span></span></code></pre></div><h2 id="应用层" tabindex="-1">应用层 <a class="header-anchor" href="#应用层" aria-label="Permalink to &quot;应用层&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">show max_connections;</span></span>
<span class="line"><span style="color:#e1e4e8;">show shared_buffers;</span></span>
<span class="line"><span style="color:#e1e4e8;">show wal_buffers;</span></span>
<span class="line"><span style="color:#e1e4e8;">show checkpoint_completion_target;</span></span>
<span class="line"><span style="color:#e1e4e8;">show checkpoint_timeout;</span></span>
<span class="line"><span style="color:#e1e4e8;">show fsync;</span></span>
<span class="line"><span style="color:#e1e4e8;">show commit_delay;</span></span>
<span class="line"><span style="color:#e1e4e8;">show autovacuum_work_mem;</span></span>
<span class="line"><span style="color:#e1e4e8;">show commit_siblings;</span></span>
<span class="line"><span style="color:#e1e4e8;">show effective_cache_size;</span></span>
<span class="line"><span style="color:#e1e4e8;">show maintenance_work_mem;</span></span>
<span class="line"><span style="color:#e1e4e8;">show work_mem;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1.用超级用户运行</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT pg_reload_conf();</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2.用UNIX的kill手动发起HUP信号</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$kill -HUP PID</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3.使用pg_ctl命令触发SIGHUP信号</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$pg_ctl reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">show max_connections;</span></span>
<span class="line"><span style="color:#24292e;">show shared_buffers;</span></span>
<span class="line"><span style="color:#24292e;">show wal_buffers;</span></span>
<span class="line"><span style="color:#24292e;">show checkpoint_completion_target;</span></span>
<span class="line"><span style="color:#24292e;">show checkpoint_timeout;</span></span>
<span class="line"><span style="color:#24292e;">show fsync;</span></span>
<span class="line"><span style="color:#24292e;">show commit_delay;</span></span>
<span class="line"><span style="color:#24292e;">show autovacuum_work_mem;</span></span>
<span class="line"><span style="color:#24292e;">show commit_siblings;</span></span>
<span class="line"><span style="color:#24292e;">show effective_cache_size;</span></span>
<span class="line"><span style="color:#24292e;">show maintenance_work_mem;</span></span>
<span class="line"><span style="color:#24292e;">show work_mem;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1.用超级用户运行</span></span>
<span class="line"><span style="color:#24292e;">postgres=# </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SELECT pg_reload_conf();</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2.用UNIX的kill手动发起HUP信号</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$kill -HUP PID</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3.使用pg_ctl命令触发SIGHUP信号</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$pg_ctl reload</span></span></code></pre></div><p><a href="https://www.kancloud.cn/taobaomysql/monthly/140098" target="_blank" rel="noreferrer">https://www.kancloud.cn/taobaomysql/monthly/140098</a></p>`,20),o=[p];function c(t,r,i,y,d,h){return a(),n("div",null,o)}const u=s(l,[["render",c]]);export{g as __pageData,u as default};
