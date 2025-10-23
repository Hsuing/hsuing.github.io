import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"Twemproxy Redis 集群的研究和使用","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/Redis/6-twemproxy.md","filePath":"guide/Database/Redis/6-twemproxy.md","lastUpdated":1720533756000}'),p={name:"guide/Database/Redis/6-twemproxy.md"},l=n(`<h1 id="twemproxy-redis-集群的研究和使用" tabindex="-1">Twemproxy Redis 集群的研究和使用 <a class="header-anchor" href="#twemproxy-redis-集群的研究和使用" aria-label="Permalink to &quot;Twemproxy Redis 集群的研究和使用&quot;">​</a></h1><h3 id="_0-twemproxy的特点" tabindex="-1">0. twemproxy的特点 <a class="header-anchor" href="#_0-twemproxy的特点" aria-label="Permalink to &quot;0. twemproxy的特点&quot;">​</a></h3><ol><li><p>对外暴露一个访问节点</p></li><li><p>请求分片（sharding）</p></li><li><p>分片要合理（分片均匀，相同的请求要分配到同样的redis节点）</p></li><li><p>支持失败节点自动删除 – 可以设置重新连接该节点的时间 – 可以设置连接多少次之后删除该节点</p></li><li><p>支持设置HashTag</p><p>– 通过HashTag可以自己设定将两个key哈希到同一个实例上去减少与redis的直接连接数 – 保持与redis的长连接 – 减少了客户端直接与服务器连接的连接数量</p></li><li><p>自动分片到后端多个redis实例上</p><p>– 多种hash算法：md5、crc16、crc32 、crc32a、fnv1_64、fnv1a_64、fnv1_32、fnv1a_32、hsieh、murmur、jenkins – 多种分片算法：ketama(一致性hash算法的一种实现)、modula、random – 可以设置后端实例的权重</p></li><li><p>避免单点问题</p><p>– 可以平行部署多个代理层,通过HAProxy做负载均衡，将redis的读写分散到多个twemproxy上</p></li><li><p>支持状态监控</p><p>– 可设置状态监控ip和端口，访问ip和端口可以得到一个json格式的状态信息串 – 可设置监控信息刷新间隔时间</p></li><li><p>使用 pipelining 处理请求和响应</p><p>– 连接复用，内存复用 – 将多个连接请求，组成reids pipelining统一向redis请求</p></li><li><p>并不是支持所有redis命令</p><p>– 不支持redis的事务操作 – 使用SIDFF, SDIFFSTORE, SINTER, SINTERSTORE, SMOVE, SUNION and SUNIONSTORE命令需要保证key都在同一个分片上</p></li></ol><p>**举个小例子：**比如可以把公司前台的MM看作一个proxy，你是个送快递的，你可以通过这个妹子替你代理把你要送达的包裹给公司内部的人，而你不用知道公司每个人座位在哪里。Twemproxy可以把多台redis server当作一台使用，开发人员通过twemproxy访问这些redis servers 的时候不用关心到底去哪一台redis server读取k-v数据或者把k-v数据更新到数据集中。</p><p>通过Twemproxy可以使用多台服务器来水平扩张redis服务，可以有效的避免单点故障问题。虽然使用Twemproxy需要更多的硬件资源和在redis性能有一定的损失（twitter测试约20%），但是能够提高整个系统的HA也是相当划算的。比如我所在的公司，只使用一台redis server进行读写，但是还有一台slave server一直在同步这台生产服务器的数据。这样做就是为了防止这台单一的生产服务器出现故障时能够有一个&quot;备胎&quot;，可以把前端的redis数据读写请求切换到从服务器上,web程序因而不需要直接去访问mysql数据库。再借助于haproxy(又是proxy)或者VIP技术可以实现一个简单的HA方案，可以避免单点故障。但是这种简单的Master-Slave&quot;备胎&quot;方案不能扩张整个redis的容量（如果用系统内存大小衡量，且不考虑内存不足时把数据swap到磁盘上），最大容量由所有的redis servers中最小内存决定的【木桶的短板】。</p><p>Twemproxy可以把数据sharding（碎片，这里是分散的意思）到多台服务器的上，每台服务器存储着整个数据集的一部分。因而，当某一台redis服务器宕机了，那么也就失去了一部分数据。如果借助于redis的master-slave replication，能保证在任何一台redis不能工作情况下，仍然能够保证能够存在一个整个数据集的完全覆盖，那么整个redis group（或者称作cluster）仍然能够正常工作。</p><p><strong>需要注意的是：</strong> Twemproxy不会增加Redis的性能指标数据，据业界测算，使用twemproxy相比直接使用Redis会带来大约10%的性能下降。但是单个Redis进程的内存管理能力有限。据测算，单个Redis进程内存超过20G之后，效率会急剧下降。目前，建议单个Redis最好配置在8G以内；8G以上的Redis缓存需求，通过Twemproxy来提供支持。</p><p>Twemproxy是一种代理分片机制，由Twitter开源，主要用于减少后端缓存服务器的连接数量。Twemproxy作为代理，可接受来自多个程序的访问，按照路由规则，转发给后台的各个Redis或memcached服务器，再原路返回。该方案很好的解决了单个Redis或memcached实例承载能力的问题。Twemproxy本身也是单点，需要用Keepalived做高可用方案，可以使用多台服务器来水平扩张redis或memcached服务，可以有效的避免单点故障问题</p><h3 id="_1-twemproxy的优缺点" tabindex="-1">1.twemproxy的优缺点 <a class="header-anchor" href="#_1-twemproxy的优缺点" aria-label="Permalink to &quot;1.twemproxy的优缺点&quot;">​</a></h3><p>优点</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">这是一个轻量级的Redis和memcached代理。使用它可以减少缓存服务器的连接数，并且利用它来作分片。这个代理的速度是相当快的，在网上查到会有20%的性能损耗，但上面的redis-benchmark做了测试，发现性能更快。后来找到英文原文，作者是说最差情况下，性能损耗不会多于20%。twemproxy用了pipeline. 首先redis是支持使用pipeline批处理的。twemproxy与每个redis服务器都会建立一个连接，每个连接实现了两个FIFO的队列，通 过这两个队列实现对redis的pipeline访问。将多个客户端的访问合并到一个连接,这样既减少了redis服务器的连接数，又提高了访问性能</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">这是一个轻量级的Redis和memcached代理。使用它可以减少缓存服务器的连接数，并且利用它来作分片。这个代理的速度是相当快的，在网上查到会有20%的性能损耗，但上面的redis-benchmark做了测试，发现性能更快。后来找到英文原文，作者是说最差情况下，性能损耗不会多于20%。twemproxy用了pipeline. 首先redis是支持使用pipeline批处理的。twemproxy与每个redis服务器都会建立一个连接，每个连接实现了两个FIFO的队列，通 过这两个队列实现对redis的pipeline访问。将多个客户端的访问合并到一个连接,这样既减少了redis服务器的连接数，又提高了访问性能</span></span></code></pre></div><p>缺点</p><ul><li><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">- 虽然可以动态移除节点，但该移除节点的数据就丢失了。</span></span>
<span class="line"><span style="color:#e1e4e8;">  redis集群动态增加节点的时候,twemproxy不会对已有数据做重分布.maillist里面作者说这个需要自己写个脚本实现</span></span>
<span class="line"><span style="color:#e1e4e8;">- 性能上的损耗</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">- 虽然可以动态移除节点，但该移除节点的数据就丢失了。</span></span>
<span class="line"><span style="color:#24292e;">  redis集群动态增加节点的时候,twemproxy不会对已有数据做重分布.maillist里面作者说这个需要自己写个脚本实现</span></span>
<span class="line"><span style="color:#24292e;">- 性能上的损耗</span></span></code></pre></div><h2 id="_1-下载和安装twemproxy" tabindex="-1">1. 下载和安装twemproxy <a class="header-anchor" href="#_1-下载和安装twemproxy" aria-label="Permalink to &quot;1. 下载和安装twemproxy&quot;">​</a></h2></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git clone https://github.com/twitter/twemproxy.git</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">yum install autoconf automake</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cd twemproxy/</span></span>
<span class="line"><span style="color:#e1e4e8;">执行</span></span>
<span class="line"><span style="color:#e1e4e8;">aclocal</span></span>
<span class="line"><span style="color:#e1e4e8;">libtoolize --force</span></span>
<span class="line"><span style="color:#e1e4e8;">automake --add-missing</span></span>
<span class="line"><span style="color:#e1e4e8;">autoconf</span></span>
<span class="line"><span style="color:#e1e4e8;">autoheader</span></span>
<span class="line"><span style="color:#e1e4e8;">make clean</span></span>
<span class="line"><span style="color:#e1e4e8;">CFLAGS=&quot;-ggdb3 -O0&quot; autoreconf -fvi &amp;&amp; ./configure  --prefix=/data/apps/twemproxy --enable-debug=log</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@web3 conf]# vi nutcracker.yml</span></span>
<span class="line"><span style="color:#e1e4e8;">beta:</span></span>
<span class="line"><span style="color:#e1e4e8;">  listen: 0.0.0.0:22122</span></span>
<span class="line"><span style="color:#e1e4e8;">  hash: fnv1a_64</span></span>
<span class="line"><span style="color:#e1e4e8;">  hash_tag: &quot;{}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  distribution: ketama</span></span>
<span class="line"><span style="color:#e1e4e8;">  auto_eject_hosts: false</span></span>
<span class="line"><span style="color:#e1e4e8;">  timeout: 400</span></span>
<span class="line"><span style="color:#e1e4e8;">  redis: true</span></span>
<span class="line"><span style="color:#e1e4e8;">  servers:</span></span>
<span class="line"><span style="color:#e1e4e8;">   - 192.168.33.11:6370:1 master0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git clone https://github.com/twitter/twemproxy.git</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">yum install autoconf automake</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cd twemproxy/</span></span>
<span class="line"><span style="color:#24292e;">执行</span></span>
<span class="line"><span style="color:#24292e;">aclocal</span></span>
<span class="line"><span style="color:#24292e;">libtoolize --force</span></span>
<span class="line"><span style="color:#24292e;">automake --add-missing</span></span>
<span class="line"><span style="color:#24292e;">autoconf</span></span>
<span class="line"><span style="color:#24292e;">autoheader</span></span>
<span class="line"><span style="color:#24292e;">make clean</span></span>
<span class="line"><span style="color:#24292e;">CFLAGS=&quot;-ggdb3 -O0&quot; autoreconf -fvi &amp;&amp; ./configure  --prefix=/data/apps/twemproxy --enable-debug=log</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@web3 conf]# vi nutcracker.yml</span></span>
<span class="line"><span style="color:#24292e;">beta:</span></span>
<span class="line"><span style="color:#24292e;">  listen: 0.0.0.0:22122</span></span>
<span class="line"><span style="color:#24292e;">  hash: fnv1a_64</span></span>
<span class="line"><span style="color:#24292e;">  hash_tag: &quot;{}&quot;</span></span>
<span class="line"><span style="color:#24292e;">  distribution: ketama</span></span>
<span class="line"><span style="color:#24292e;">  auto_eject_hosts: false</span></span>
<span class="line"><span style="color:#24292e;">  timeout: 400</span></span>
<span class="line"><span style="color:#24292e;">  redis: true</span></span>
<span class="line"><span style="color:#24292e;">  servers:</span></span>
<span class="line"><span style="color:#24292e;">   - 192.168.33.11:6370:1 master0</span></span></code></pre></div><h3 id="启动twemproxy-nutcracker" tabindex="-1">启动twemproxy (nutcracker) <a class="header-anchor" href="#启动twemproxy-nutcracker" aria-label="Permalink to &quot;启动twemproxy (nutcracker)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@web3 twemproxy]# ./sbin/nutcracker -t</span></span>
<span class="line"><span style="color:#e1e4e8;">nutcracker: configuration file &#39;conf/nutcracker.yml&#39; syntax is ok</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@web3 twemproxy]# ./sbin/nutcracker -d -c /usr/local/twemproxy/conf/nutcracker.yml -p /usr/local/twemproxy/run/redisproxy.pid -o /usr/local/twemproxy/run/redisproxy.log</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@web3 twemproxy]# ./sbin/nutcracker --help</span></span>
<span class="line"><span style="color:#e1e4e8;">This is nutcracker-0.4.1</span></span>
<span class="line"><span style="color:#e1e4e8;">Usage: nutcracker [-?hVdDt] [-v verbosity level] [-o output file]</span></span>
<span class="line"><span style="color:#e1e4e8;">                  [-c conf file] [-s stats port] [-a stats addr]</span></span>
<span class="line"><span style="color:#e1e4e8;">                  [-i stats interval] [-p pid file] [-m mbuf size]</span></span>
<span class="line"><span style="color:#e1e4e8;">Options:</span></span>
<span class="line"><span style="color:#e1e4e8;">-h, –help                   : 查看帮助文档，显示命令选项</span></span>
<span class="line"><span style="color:#e1e4e8;">-V, –version                : 查看nutcracker版本</span></span>
<span class="line"><span style="color:#e1e4e8;">-t, –test-conf              : 测试配置脚本的正确性</span></span>
<span class="line"><span style="color:#e1e4e8;">-d, –daemonize              : 以守护进程运行</span></span>
<span class="line"><span style="color:#e1e4e8;">-D, –describe-stats         : 打印状态描述</span></span>
<span class="line"><span style="color:#e1e4e8;">-v, –verbosity=N            : 设置日志级别 (default: 5, min: 0, max: 11)</span></span>
<span class="line"><span style="color:#e1e4e8;">-o, –output=S               : 设置日志输出路径，默认为标准错误输出 (default: stderr)</span></span>
<span class="line"><span style="color:#e1e4e8;">-c, –conf-file=S            : 指定配置文件路径 (default: conf/nutcracker.yml)</span></span>
<span class="line"><span style="color:#e1e4e8;">-s, –stats-port=N           : 设置状态监控端口，默认22222 (default: 22222)</span></span>
<span class="line"><span style="color:#e1e4e8;">-a, –stats-addr=S           : 设置状态监控IP，默认0.0.0.0 (default: 0.0.0.0)</span></span>
<span class="line"><span style="color:#e1e4e8;">-i, –stats-interval=N       : 设置状态聚合间隔 (default: 30000 msec)</span></span>
<span class="line"><span style="color:#e1e4e8;">-p, –pid-file=S             : 指定进程pid文件路径，默认关闭 (default: off)</span></span>
<span class="line"><span style="color:#e1e4e8;">-m, –mbuf-size=N            : 设置mbuf块大小，以bytes单位 (default: 16384 bytes)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@web3 twemproxy]# ./sbin/nutcracker -t</span></span>
<span class="line"><span style="color:#24292e;">nutcracker: configuration file &#39;conf/nutcracker.yml&#39; syntax is ok</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@web3 twemproxy]# ./sbin/nutcracker -d -c /usr/local/twemproxy/conf/nutcracker.yml -p /usr/local/twemproxy/run/redisproxy.pid -o /usr/local/twemproxy/run/redisproxy.log</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@web3 twemproxy]# ./sbin/nutcracker --help</span></span>
<span class="line"><span style="color:#24292e;">This is nutcracker-0.4.1</span></span>
<span class="line"><span style="color:#24292e;">Usage: nutcracker [-?hVdDt] [-v verbosity level] [-o output file]</span></span>
<span class="line"><span style="color:#24292e;">                  [-c conf file] [-s stats port] [-a stats addr]</span></span>
<span class="line"><span style="color:#24292e;">                  [-i stats interval] [-p pid file] [-m mbuf size]</span></span>
<span class="line"><span style="color:#24292e;">Options:</span></span>
<span class="line"><span style="color:#24292e;">-h, –help                   : 查看帮助文档，显示命令选项</span></span>
<span class="line"><span style="color:#24292e;">-V, –version                : 查看nutcracker版本</span></span>
<span class="line"><span style="color:#24292e;">-t, –test-conf              : 测试配置脚本的正确性</span></span>
<span class="line"><span style="color:#24292e;">-d, –daemonize              : 以守护进程运行</span></span>
<span class="line"><span style="color:#24292e;">-D, –describe-stats         : 打印状态描述</span></span>
<span class="line"><span style="color:#24292e;">-v, –verbosity=N            : 设置日志级别 (default: 5, min: 0, max: 11)</span></span>
<span class="line"><span style="color:#24292e;">-o, –output=S               : 设置日志输出路径，默认为标准错误输出 (default: stderr)</span></span>
<span class="line"><span style="color:#24292e;">-c, –conf-file=S            : 指定配置文件路径 (default: conf/nutcracker.yml)</span></span>
<span class="line"><span style="color:#24292e;">-s, –stats-port=N           : 设置状态监控端口，默认22222 (default: 22222)</span></span>
<span class="line"><span style="color:#24292e;">-a, –stats-addr=S           : 设置状态监控IP，默认0.0.0.0 (default: 0.0.0.0)</span></span>
<span class="line"><span style="color:#24292e;">-i, –stats-interval=N       : 设置状态聚合间隔 (default: 30000 msec)</span></span>
<span class="line"><span style="color:#24292e;">-p, –pid-file=S             : 指定进程pid文件路径，默认关闭 (default: off)</span></span>
<span class="line"><span style="color:#24292e;">-m, –mbuf-size=N            : 设置mbuf块大小，以bytes单位 (default: 16384 bytes)</span></span></code></pre></div><h3 id="连接twemproxy" tabindex="-1">连接twemproxy <a class="header-anchor" href="#连接twemproxy" aria-label="Permalink to &quot;连接twemproxy&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@qwb3 twemproxy]# redis-cli -p 22122</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:22122&gt; set name2 yangyi</span></span>
<span class="line"><span style="color:#e1e4e8;">OK</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:22122&gt; get name2</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;yangyi&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@qwb3 twemproxy]# redis-cli -p 22122</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:22122&gt; set name2 yangyi</span></span>
<span class="line"><span style="color:#24292e;">OK</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:22122&gt; get name2</span></span>
<span class="line"><span style="color:#24292e;">&quot;yangyi&quot;</span></span></code></pre></div>`,18),o=[l];function t(r,c,i,y,d,u){return e(),a("div",null,o)}const f=s(p,[["render",t]]);export{h as __pageData,f as default};
