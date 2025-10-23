import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"查看cpu","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/optimize/index.md","filePath":"guide/Database/pgSql/optimize/index.md","lastUpdated":1711524170000}'),p={name:"guide/Database/pgSql/optimize/index.md"},l=e(`<p><a href="https://www.cnblogs.com/VicLiu/category/1587599.html?page=1" target="_blank" rel="noreferrer">https://www.cnblogs.com/VicLiu/category/1587599.html?page=1</a></p><p>配置文件参数调优</p><p><a href="https://pgtune.leopard.in.ua/#/" target="_blank" rel="noreferrer">https://pgtune.leopard.in.ua/#/</a></p><ul><li><a href="https://github.com/le0pard/pgtune" target="_blank" rel="noreferrer">https://github.com/le0pard/pgtune</a></li></ul><h3 id="db-version-postgresql的版本" tabindex="-1">DB Version：PostgreSQL的版本 <a class="header-anchor" href="#db-version-postgresql的版本" aria-label="Permalink to &quot;DB Version：PostgreSQL的版本&quot;">​</a></h3><p>你不知道？那查下吧，</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT version();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT version();</span></span></code></pre></div><h3 id="os-type-操作系统" tabindex="-1">OS Type：操作系统 <a class="header-anchor" href="#os-type-操作系统" aria-label="Permalink to &quot;OS Type：操作系统&quot;">​</a></h3><p>Windows，Linux还是Mac OS？</p><h3 id="db-type-数据库类型" tabindex="-1">DB Type：数据库类型 <a class="header-anchor" href="#db-type-数据库类型" aria-label="Permalink to &quot;DB Type：数据库类型&quot;">​</a></h3><p>就是打算做什么用，有以下5种选择</p><ul><li>Web application：网页程序</li><li>Online transaction processing systems，联机事务处理（OLTP）系统</li><li>Data warehouses，数据仓库</li><li>Desktop applications，桌面程序</li><li>Mixed type of applications：混合类型（以上两种或以上的组合）</li></ul><h3 id="total-memory-总内存数" tabindex="-1">Total Memory：总内存数 <a class="header-anchor" href="#total-memory-总内存数" aria-label="Permalink to &quot;Total Memory：总内存数&quot;">​</a></h3><h3 id="number-of-cpus-总cpu数" tabindex="-1">Number of CPUs，总CPU数 <a class="header-anchor" href="#number-of-cpus-总cpu数" aria-label="Permalink to &quot;Number of CPUs，总CPU数&quot;">​</a></h3><p>计算公式，</p><ul><li></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CPUs = threads per core * cores per socket * sockets</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CPUs = threads per core * cores per socket * sockets</span></span></code></pre></div><ul><li>threads per core：每核线程数</li><li>cores per socket：每个插座的核数，就是我们平时说几核CPU</li><li>sockets：CPU插座数</li></ul><h3 id="number-of-connections-总连接数" tabindex="-1">Number of Connections， 总连接数 <a class="header-anchor" href="#number-of-connections-总连接数" aria-label="Permalink to &quot;Number of Connections， 总连接数&quot;">​</a></h3><p>这个比较难说，看具体业务场景，PostgreSQL默认100（实际可用97），一般web应用调高些，如果是数据仓库，则可以调低些</p><h3 id="data-storage-数据存储" tabindex="-1">Data Storage， 数据存储 <a class="header-anchor" href="#data-storage-数据存储" aria-label="Permalink to &quot;Data Storage， 数据存储&quot;">​</a></h3><ul><li>SSD Storage：固态硬盘</li><li>Network（SAN）Storage：网络硬盘</li><li>HDD（Storage）：机械硬盘</li></ul><h1 id="查看cpu" tabindex="-1">查看cpu <a class="header-anchor" href="#查看cpu" aria-label="Permalink to &quot;查看cpu&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/*CPU</span></span>
<span class="line"><span style="color:#e1e4e8;">查看CPU型号*/</span></span>
<span class="line"><span style="color:#e1e4e8;">cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/*查看物理CPU个数*/</span></span>
<span class="line"><span style="color:#e1e4e8;">cat /proc/cpuinfo | grep &quot;physical id&quot; | sort -u | wc -l  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/*查看逻辑CPU个数*/</span></span>
<span class="line"><span style="color:#e1e4e8;">cat /proc/cpuinfo | grep &quot;processor&quot; | wc -l  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/*查看CPU内核数*/</span></span>
<span class="line"><span style="color:#e1e4e8;">cat /proc/cpuinfo | grep &quot;cpu cores&quot; | uniq  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/*查看单个物理CPU封装的逻辑CPU数量*/</span></span>
<span class="line"><span style="color:#e1e4e8;">cat /proc/cpuinfo | grep &quot;siblings&quot; | uniq  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/*计算是否开启超线程</span></span>
<span class="line"><span style="color:#e1e4e8;">##逻辑CPU &gt; 物理CPU x CPU核数 #开启超线程</span></span>
<span class="line"><span style="color:#e1e4e8;">##逻辑CPU = 物理CPU x CPU核数 #没有开启超线程或不支持超线程*/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/*查看是否超线程,如果cpu cores数量和siblings数量一致，则没有启用超线程，否则超线程被启用。*/</span></span>
<span class="line"><span style="color:#e1e4e8;">cat /proc/cpuinfo | grep -e &quot;cpu cores&quot;  -e &quot;siblings&quot; | sort | uniq</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/*内存</span></span>
<span class="line"><span style="color:#e1e4e8;">TOP</span></span>
<span class="line"><span style="color:#e1e4e8;">/*命令经常用来监控linux的系统状况，比如cpu、内存的使用等。*/</span></span>
<span class="line"><span style="color:#e1e4e8;">/*查看某个用户内存使用情况,如:postgres*/</span></span>
<span class="line"><span style="color:#e1e4e8;">top -u postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">/*</span></span>
<span class="line"><span style="color:#e1e4e8;">内容解释：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">　　PID：进程的ID</span></span>
<span class="line"><span style="color:#e1e4e8;">　　USER：进程所有者</span></span>
<span class="line"><span style="color:#e1e4e8;">　　PR：进程的优先级别，越小越优先被执行</span></span>
<span class="line"><span style="color:#e1e4e8;">　　NInice：值</span></span>
<span class="line"><span style="color:#e1e4e8;">　　VIRT：进程占用的虚拟内存</span></span>
<span class="line"><span style="color:#e1e4e8;">　　RES：进程占用的物理内存</span></span>
<span class="line"><span style="color:#e1e4e8;">　　SHR：进程使用的共享内存</span></span>
<span class="line"><span style="color:#e1e4e8;">　　S：进程的状态。S表示休眠，R表示正在运行，Z表示僵死状态，N表示该进程优先值为负数</span></span>
<span class="line"><span style="color:#e1e4e8;">　　%CPU：进程占用CPU的使用率</span></span>
<span class="line"><span style="color:#e1e4e8;">　　%MEM：进程使用的物理内存和总内存的百分比</span></span>
<span class="line"><span style="color:#e1e4e8;">　　TIME+：该进程启动后占用的总的CPU时间，即占用CPU使用时间的累加值。</span></span>
<span class="line"><span style="color:#e1e4e8;">　　COMMAND：进程启动命令名称</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">常用的命令：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">　　P：按%CPU使用率排行</span></span>
<span class="line"><span style="color:#e1e4e8;">　　T：按MITE+排行</span></span>
<span class="line"><span style="color:#e1e4e8;">　　M：按%MEM排行</span></span>
<span class="line"><span style="color:#e1e4e8;">*/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/*查看进程相关信息占用的内存情况，(进程号可以通过ps查看)如下所示：*/</span></span>
<span class="line"><span style="color:#e1e4e8;">pmap -d 14596</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ps -e -o &#39;pid,comm,args,pcpu,rsz,vsz,stime,user,uid&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">ps -e -o &#39;pid,comm,args,pcpu,rsz,vsz,stime,user,uid&#39; | grep postgres |  sort -nrk5</span></span>
<span class="line"><span style="color:#e1e4e8;">/*其中rsz为实际内存，上例实现按内存排序，由大到小*/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/*看内存占用*/</span></span>
<span class="line"><span style="color:#e1e4e8;">free -m</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/*看硬盘占用率*/</span></span>
<span class="line"><span style="color:#e1e4e8;">df -h</span></span>
<span class="line"><span style="color:#e1e4e8;">/*查看IO情况*/</span></span>
<span class="line"><span style="color:#e1e4e8;">iostat -x 1 10</span></span>
<span class="line"><span style="color:#e1e4e8;">/*</span></span>
<span class="line"><span style="color:#e1e4e8;">如果 iostat 没有，要 yum install sysstat安装这个包，第一眼看下图红色圈圈的那个如果%util接近100%,表明I/O请求太多,I/O系统已经满负荷，磁盘可能存在瓶颈,一般%util大于70%,I/O压力就比较大，读取速度有较多的wait，然后再看其他的参数，</span></span>
<span class="line"><span style="color:#e1e4e8;">内容解释:</span></span>
<span class="line"><span style="color:#e1e4e8;">rrqm/s:每秒进行merge的读操作数目。即delta(rmerge)/s </span></span>
<span class="line"><span style="color:#e1e4e8;">wrqm/s:每秒进行merge的写操作数目。即delta(wmerge)/s </span></span>
<span class="line"><span style="color:#e1e4e8;">r/s:每秒完成的读I/O设备次数。即delta(rio)/s </span></span>
<span class="line"><span style="color:#e1e4e8;">w/s:每秒完成的写I/0设备次数。即delta(wio)/s </span></span>
<span class="line"><span style="color:#e1e4e8;">rsec/s:每秒读扇区数。即delta(rsect)/s </span></span>
<span class="line"><span style="color:#e1e4e8;">wsec/s:每秒写扇区数。即delta(wsect)/s </span></span>
<span class="line"><span style="color:#e1e4e8;">rKB/s:每秒读K字节数。是rsec/s的一半，因为每扇区大小为512字节 </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">wKB/s:每秒写K字节数。是wsec/s的一半 </span></span>
<span class="line"><span style="color:#e1e4e8;">avgrq-sz:平均每次设备I/O操作的数据大小(扇区)。即delta(rsect+wsect)/delta(rio+wio) </span></span>
<span class="line"><span style="color:#e1e4e8;">avgqu-sz:平均I/O队列长度。即delta(aveq)/s/1000(因为aveq的单位为毫秒) </span></span>
<span class="line"><span style="color:#e1e4e8;">await:平均每次设备I/O操作的等待时间(毫秒)。即delta(ruse+wuse)/delta(rio+wio) </span></span>
<span class="line"><span style="color:#e1e4e8;">svctm:平均每次设备I/O操作的服务时间(毫秒)。即delta(use)/delta(rio+wio) </span></span>
<span class="line"><span style="color:#e1e4e8;">%util:一秒中有百分之多少的时间用于I/O操作,或者说一秒中有多少时间I/O队列是非空的</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">*/</span></span>
<span class="line"><span style="color:#e1e4e8;">/*找到对应进程*/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ll /proc/进程号/exe</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/*CPU</span></span>
<span class="line"><span style="color:#24292e;">查看CPU型号*/</span></span>
<span class="line"><span style="color:#24292e;">cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/*查看物理CPU个数*/</span></span>
<span class="line"><span style="color:#24292e;">cat /proc/cpuinfo | grep &quot;physical id&quot; | sort -u | wc -l  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/*查看逻辑CPU个数*/</span></span>
<span class="line"><span style="color:#24292e;">cat /proc/cpuinfo | grep &quot;processor&quot; | wc -l  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/*查看CPU内核数*/</span></span>
<span class="line"><span style="color:#24292e;">cat /proc/cpuinfo | grep &quot;cpu cores&quot; | uniq  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/*查看单个物理CPU封装的逻辑CPU数量*/</span></span>
<span class="line"><span style="color:#24292e;">cat /proc/cpuinfo | grep &quot;siblings&quot; | uniq  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/*计算是否开启超线程</span></span>
<span class="line"><span style="color:#24292e;">##逻辑CPU &gt; 物理CPU x CPU核数 #开启超线程</span></span>
<span class="line"><span style="color:#24292e;">##逻辑CPU = 物理CPU x CPU核数 #没有开启超线程或不支持超线程*/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/*查看是否超线程,如果cpu cores数量和siblings数量一致，则没有启用超线程，否则超线程被启用。*/</span></span>
<span class="line"><span style="color:#24292e;">cat /proc/cpuinfo | grep -e &quot;cpu cores&quot;  -e &quot;siblings&quot; | sort | uniq</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/*内存</span></span>
<span class="line"><span style="color:#24292e;">TOP</span></span>
<span class="line"><span style="color:#24292e;">/*命令经常用来监控linux的系统状况，比如cpu、内存的使用等。*/</span></span>
<span class="line"><span style="color:#24292e;">/*查看某个用户内存使用情况,如:postgres*/</span></span>
<span class="line"><span style="color:#24292e;">top -u postgres</span></span>
<span class="line"><span style="color:#24292e;">/*</span></span>
<span class="line"><span style="color:#24292e;">内容解释：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">　　PID：进程的ID</span></span>
<span class="line"><span style="color:#24292e;">　　USER：进程所有者</span></span>
<span class="line"><span style="color:#24292e;">　　PR：进程的优先级别，越小越优先被执行</span></span>
<span class="line"><span style="color:#24292e;">　　NInice：值</span></span>
<span class="line"><span style="color:#24292e;">　　VIRT：进程占用的虚拟内存</span></span>
<span class="line"><span style="color:#24292e;">　　RES：进程占用的物理内存</span></span>
<span class="line"><span style="color:#24292e;">　　SHR：进程使用的共享内存</span></span>
<span class="line"><span style="color:#24292e;">　　S：进程的状态。S表示休眠，R表示正在运行，Z表示僵死状态，N表示该进程优先值为负数</span></span>
<span class="line"><span style="color:#24292e;">　　%CPU：进程占用CPU的使用率</span></span>
<span class="line"><span style="color:#24292e;">　　%MEM：进程使用的物理内存和总内存的百分比</span></span>
<span class="line"><span style="color:#24292e;">　　TIME+：该进程启动后占用的总的CPU时间，即占用CPU使用时间的累加值。</span></span>
<span class="line"><span style="color:#24292e;">　　COMMAND：进程启动命令名称</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">常用的命令：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">　　P：按%CPU使用率排行</span></span>
<span class="line"><span style="color:#24292e;">　　T：按MITE+排行</span></span>
<span class="line"><span style="color:#24292e;">　　M：按%MEM排行</span></span>
<span class="line"><span style="color:#24292e;">*/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/*查看进程相关信息占用的内存情况，(进程号可以通过ps查看)如下所示：*/</span></span>
<span class="line"><span style="color:#24292e;">pmap -d 14596</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ps -e -o &#39;pid,comm,args,pcpu,rsz,vsz,stime,user,uid&#39; </span></span>
<span class="line"><span style="color:#24292e;">ps -e -o &#39;pid,comm,args,pcpu,rsz,vsz,stime,user,uid&#39; | grep postgres |  sort -nrk5</span></span>
<span class="line"><span style="color:#24292e;">/*其中rsz为实际内存，上例实现按内存排序，由大到小*/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/*看内存占用*/</span></span>
<span class="line"><span style="color:#24292e;">free -m</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/*看硬盘占用率*/</span></span>
<span class="line"><span style="color:#24292e;">df -h</span></span>
<span class="line"><span style="color:#24292e;">/*查看IO情况*/</span></span>
<span class="line"><span style="color:#24292e;">iostat -x 1 10</span></span>
<span class="line"><span style="color:#24292e;">/*</span></span>
<span class="line"><span style="color:#24292e;">如果 iostat 没有，要 yum install sysstat安装这个包，第一眼看下图红色圈圈的那个如果%util接近100%,表明I/O请求太多,I/O系统已经满负荷，磁盘可能存在瓶颈,一般%util大于70%,I/O压力就比较大，读取速度有较多的wait，然后再看其他的参数，</span></span>
<span class="line"><span style="color:#24292e;">内容解释:</span></span>
<span class="line"><span style="color:#24292e;">rrqm/s:每秒进行merge的读操作数目。即delta(rmerge)/s </span></span>
<span class="line"><span style="color:#24292e;">wrqm/s:每秒进行merge的写操作数目。即delta(wmerge)/s </span></span>
<span class="line"><span style="color:#24292e;">r/s:每秒完成的读I/O设备次数。即delta(rio)/s </span></span>
<span class="line"><span style="color:#24292e;">w/s:每秒完成的写I/0设备次数。即delta(wio)/s </span></span>
<span class="line"><span style="color:#24292e;">rsec/s:每秒读扇区数。即delta(rsect)/s </span></span>
<span class="line"><span style="color:#24292e;">wsec/s:每秒写扇区数。即delta(wsect)/s </span></span>
<span class="line"><span style="color:#24292e;">rKB/s:每秒读K字节数。是rsec/s的一半，因为每扇区大小为512字节 </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">wKB/s:每秒写K字节数。是wsec/s的一半 </span></span>
<span class="line"><span style="color:#24292e;">avgrq-sz:平均每次设备I/O操作的数据大小(扇区)。即delta(rsect+wsect)/delta(rio+wio) </span></span>
<span class="line"><span style="color:#24292e;">avgqu-sz:平均I/O队列长度。即delta(aveq)/s/1000(因为aveq的单位为毫秒) </span></span>
<span class="line"><span style="color:#24292e;">await:平均每次设备I/O操作的等待时间(毫秒)。即delta(ruse+wuse)/delta(rio+wio) </span></span>
<span class="line"><span style="color:#24292e;">svctm:平均每次设备I/O操作的服务时间(毫秒)。即delta(use)/delta(rio+wio) </span></span>
<span class="line"><span style="color:#24292e;">%util:一秒中有百分之多少的时间用于I/O操作,或者说一秒中有多少时间I/O队列是非空的</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">*/</span></span>
<span class="line"><span style="color:#24292e;">/*找到对应进程*/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ll /proc/进程号/exe</span></span></code></pre></div>`,24),o=[l];function c(t,r,i,y,u,d){return n(),a("div",null,o)}const m=s(p,[["render",c]]);export{h as __pageData,m as default};
