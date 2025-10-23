import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"1.mongostat","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/mongodb/8_monitor.md","filePath":"guide/Database/mongodb/8_monitor.md","lastUpdated":1704853811000}'),t={name:"guide/Database/mongodb/8_monitor.md"},l=n(`<h1 id="_1-mongostat" tabindex="-1">1.mongostat <a class="header-anchor" href="#_1-mongostat" aria-label="Permalink to &quot;1.mongostat&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@slave01 ~]#mongostat  --help</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@slave01 ~]# mongostat </span></span>
<span class="line"><span style="color:#e1e4e8;">insert query update delete getmore command dirty used flushes vsize   res qrw arw net_in net_out conn                time</span></span>
<span class="line"><span style="color:#e1e4e8;">    *0    *0     *0     *0       0     0|0  0.0% 0.0%       0 1.52G 90.0M 0|0 1|0   111b   51.9k    3 Dec 16 03:43:39.161</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@slave01 ~]#mongostat  --help</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@slave01 ~]# mongostat </span></span>
<span class="line"><span style="color:#24292e;">insert query update delete getmore command dirty used flushes vsize   res qrw arw net_in net_out conn                time</span></span>
<span class="line"><span style="color:#24292e;">    *0    *0     *0     *0       0     0|0  0.0% 0.0%       0 1.52G 90.0M 0|0 1|0   111b   51.9k    3 Dec 16 03:43:39.161</span></span></code></pre></div><ul><li>密码形式</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@slave01 ~]# mongostat -u admin -p 123456 -h 127.0.0.1 --port=27017 --authenticationDatabase admin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@slave01 ~]# mongostat -u admin -p 123456 -h 127.0.0.1 --port=27017 --authenticationDatabase admin</span></span></code></pre></div><h2 id="参数解释" tabindex="-1">参数解释 <a class="header-anchor" href="#参数解释" aria-label="Permalink to &quot;参数解释&quot;">​</a></h2><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>inserts/s</td><td>每秒插入次数</td></tr><tr><td>query/s</td><td>每秒查询次数</td></tr><tr><td>update/s</td><td>每秒更新次数</td></tr><tr><td>delete/s</td><td>每秒删除次数</td></tr><tr><td>getmore/s</td><td>每秒执行getmore次数</td></tr><tr><td>command/s</td><td>每秒的命令数，比以上插入、查找、更新、删除的综合还多，还统计了别的命令</td></tr><tr><td>flushs/s</td><td>每秒执行fsync将数据写入硬盘的次数</td></tr><tr><td>mapped/s</td><td>所有的被mmap的数据量，单位是MB</td></tr><tr><td>vsize</td><td>虚拟内存使用量，单位MB</td></tr><tr><td>res</td><td>物理内存使用量，单位MB</td></tr><tr><td>faults/s</td><td>每秒访问失败数（只有Linux有），数据被交换出物理内存，放到swap。不要超过100，否则就是机器内存太小，造成频繁swap写入。此时要升级内存或者扩展</td></tr><tr><td>locked %</td><td>被锁的时间百分比，尽量控制在50%以下</td></tr><tr><td>idx miss %</td><td>索引不命中所占百分比。如果太高的话就要考虑索引是不是少</td></tr><tr><td>q t|r|w</td><td>Mongodb接收到太多的命令而数据库被锁住无法执行完成，它会将命令加入队列。这一栏显示了总共、读、写3个队列的长度，都为0的话表示mongo毫无压力。高并发时，一般队列值会升高</td></tr><tr><td>conn</td><td>当前连接数</td></tr><tr><td>time</td><td>时间戳</td></tr></tbody></table><h1 id="mongotop" tabindex="-1">mongotop <a class="header-anchor" href="#mongotop" aria-label="Permalink to &quot;mongotop&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@slave01 ~]# mongotop </span></span>
<span class="line"><span style="color:#e1e4e8;">2021-12-16T04:06:04.133-0500	connected to: mongodb://localhost/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                    ns    total    read    write    2021-12-16T04:06:05-05:00</span></span>
<span class="line"><span style="color:#e1e4e8;">  admin.system.version      0ms     0ms      0ms                             </span></span>
<span class="line"><span style="color:#e1e4e8;">config.system.sessions      0ms     0ms      0ms                             </span></span>
<span class="line"><span style="color:#e1e4e8;">   config.transactions      0ms     0ms      0ms                             </span></span>
<span class="line"><span style="color:#e1e4e8;">  local.system.replset      0ms     0ms      0ms</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@slave01 ~]# mongotop </span></span>
<span class="line"><span style="color:#24292e;">2021-12-16T04:06:04.133-0500	connected to: mongodb://localhost/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                    ns    total    read    write    2021-12-16T04:06:05-05:00</span></span>
<span class="line"><span style="color:#24292e;">  admin.system.version      0ms     0ms      0ms                             </span></span>
<span class="line"><span style="color:#24292e;">config.system.sessions      0ms     0ms      0ms                             </span></span>
<span class="line"><span style="color:#24292e;">   config.transactions      0ms     0ms      0ms                             </span></span>
<span class="line"><span style="color:#24292e;">  local.system.replset      0ms     0ms      0ms</span></span></code></pre></div><h1 id="profiler" tabindex="-1">profiler <a class="header-anchor" href="#profiler" aria-label="Permalink to &quot;profiler&quot;">​</a></h1><p><strong>profiler</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">test&gt; show dbs;</span></span>
<span class="line"><span style="color:#e1e4e8;">admin      184 kB</span></span>
<span class="line"><span style="color:#e1e4e8;">config    73.7 kB</span></span>
<span class="line"><span style="color:#e1e4e8;">examples  81.9 kB</span></span>
<span class="line"><span style="color:#e1e4e8;">local     81.9 kB</span></span>
<span class="line"><span style="color:#e1e4e8;">test       156 kB</span></span>
<span class="line"><span style="color:#e1e4e8;">test&gt; use test</span></span>
<span class="line"><span style="color:#e1e4e8;">already on db test</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">test&gt; db.setProfilingLevel(2);</span></span>
<span class="line"><span style="color:#e1e4e8;">{ was: 0, slowms: 100, sampleRate: 1, ok: 1 }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">test&gt;  db.system.profile.find().sort({$natural:-1})</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看系统中的慢查询数量</span></span>
<span class="line"><span style="color:#e1e4e8;">test&gt; db.system.profile.count();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">test&gt; show dbs;</span></span>
<span class="line"><span style="color:#24292e;">admin      184 kB</span></span>
<span class="line"><span style="color:#24292e;">config    73.7 kB</span></span>
<span class="line"><span style="color:#24292e;">examples  81.9 kB</span></span>
<span class="line"><span style="color:#24292e;">local     81.9 kB</span></span>
<span class="line"><span style="color:#24292e;">test       156 kB</span></span>
<span class="line"><span style="color:#24292e;">test&gt; use test</span></span>
<span class="line"><span style="color:#24292e;">already on db test</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">test&gt; db.setProfilingLevel(2);</span></span>
<span class="line"><span style="color:#24292e;">{ was: 0, slowms: 100, sampleRate: 1, ok: 1 }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">test&gt;  db.system.profile.find().sort({$natural:-1})</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看系统中的慢查询数量</span></span>
<span class="line"><span style="color:#24292e;">test&gt; db.system.profile.count();</span></span></code></pre></div><h1 id="获取服务器状态" tabindex="-1">获取服务器状态 <a class="header-anchor" href="#获取服务器状态" aria-label="Permalink to &quot;获取服务器状态&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">db.serverStatus()			#查看所有的监控信息</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">db.serverStatus().network	#单独查看网络流量信息</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">db.serverStatus().opcounters	#统计增、删、改、查的次数</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">db.serverStatus().connections#连接</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">db.serverStatus()			#查看所有的监控信息</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">db.serverStatus().network	#单独查看网络流量信息</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">db.serverStatus().opcounters	#统计增、删、改、查的次数</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">db.serverStatus().connections#连接</span></span></code></pre></div><p>指标，<a href="https://www.jianshu.com/p/0f0121444591" target="_blank" rel="noreferrer">https://www.jianshu.com/p/0f0121444591</a></p><h1 id="granfa" tabindex="-1">granfa <a class="header-anchor" href="#granfa" aria-label="Permalink to &quot;granfa&quot;">​</a></h1><p><a href="https://blog.csdn.net/weixin_45444133/article/details/115821625" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_45444133/article/details/115821625</a></p><h1 id="zabbix" tabindex="-1">zabbix <a class="header-anchor" href="#zabbix" aria-label="Permalink to &quot;zabbix&quot;">​</a></h1><p><a href="https://blog.csdn.net/qq_40907977/article/details/106854946" target="_blank" rel="noreferrer">https://blog.csdn.net/qq_40907977/article/details/106854946</a></p>`,18),p=[l];function o(r,c,i,d,m,h){return a(),e("div",null,p)}const u=s(t,[["render",o]]);export{g as __pageData,u as default};
