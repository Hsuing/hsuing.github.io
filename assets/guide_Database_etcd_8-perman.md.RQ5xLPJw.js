import{_ as s,o as e,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/etcd/8-perman.md","filePath":"guide/Database/etcd/8-perman.md","lastUpdated":1703141608000}'),p={name:"guide/Database/etcd/8-perman.md"},l=a(`<p>官方文档，<a href="https://etcd.io/docs/v3.4/op-guide/performance/" target="_blank" rel="noreferrer">https://etcd.io/docs/v3.4/op-guide/performance/</a></p><h2 id="pprof-是什么" tabindex="-1">pprof 是什么？ <a class="header-anchor" href="#pprof-是什么" aria-label="Permalink to &quot;pprof 是什么？&quot;">​</a></h2><p>pprof 是用于可视化的性能分析工具，可以捕捉到多维度的运行状态的数据。</p><p>pprof 以 profile.proto 读取分析样本的集合，并生成报告以可视化并帮助分析数据（支持文本和图形报告）。</p><p>profile.proto 是一个 Protocol Buffer v3 的描述文件，它描述了一组 callstack 和 symbolization 信息， 作用是表示统计分析的一组采样的调用栈，是很常见的 stacktrace 配置文件格式。</p><h3 id="支持什么模式" tabindex="-1">支持什么模式 <a class="header-anchor" href="#支持什么模式" aria-label="Permalink to &quot;支持什么模式&quot;">​</a></h3><ul><li>Report generation：报告生成</li><li>Interactive terminal use：交互式终端使用</li><li>Web interface：Web 界面</li></ul><h3 id="可以做什么" tabindex="-1">可以做什么 <a class="header-anchor" href="#可以做什么" aria-label="Permalink to &quot;可以做什么&quot;">​</a></h3><ul><li>CPU Profiling：CPU 分析，按照一定的频率采集所监听的应用程序 CPU（含寄存器）的使用情况，可确定应用程序在主动消耗 CPU 周期时花费时间的位置</li><li>Memory Profiling：内存分析，在应用程序进行堆分配时记录堆栈跟踪，用于监视当前和历史内存使用情况，以及检查内存泄漏</li><li>Block Profiling：阻塞分析，记录 goroutine 阻塞等待同步（包括定时器通道）的位置</li><li>Mutex Profiling：互斥锁分析，报告互斥锁的竞争情况</li></ul><h2 id="go-pprof-tool-安装" tabindex="-1">GO pprof tool 安装 <a class="header-anchor" href="#go-pprof-tool-安装" aria-label="Permalink to &quot;GO pprof tool 安装&quot;">​</a></h2><p>为了方便，我们制作了 tools 工具包镜像 <code>registry.cn-shenzhen.aliyuncs.com/rancher/tools</code>，此镜像内置了 go pprof tool，以及常用的系统维护，网络维护工具</p><p>go pprof tool 安装参考：<a href="https://github.com/google/pprof#building-pprof" target="_blank" rel="noreferrer">https://github.com/google/pprof#building-pprof</a></p><p><a href="https://github.com/xiaoluhong/kubernetes-issues-solution/blob/master/tools/Dockerfile" target="_blank" rel="noreferrer">https://github.com/xiaoluhong/kubernetes-issues-solution/blob/master/tools/Dockerfile</a></p><h2 id="etcd-启用-pprof" tabindex="-1">etcd 启用 pprof <a class="header-anchor" href="#etcd-启用-pprof" aria-label="Permalink to &quot;etcd 启用 pprof&quot;">​</a></h2><p>接下来以 etcd 性能分析为例。</p><p>对于 rancher 自定义集群或者 rke 集群，默认没有开启 <strong>pprof</strong> 分析功能。可在集群配置或者 rke 配置文件中添加 <code>extra_env ETCD_ENABLE_PPROF=true</code> 或 <code>extra_args enable-pprof: true</code>，两个参数二选一。其他类型的 K8S 集群，可以在 etcd 的启动参数中添加 <code>ETCD_ENABLE_PPROF=true</code> 或 <code>--enable-pprof=true</code>，也是两个参数二选一。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">services:</span></span>
<span class="line"><span style="color:#e1e4e8;">    etcd:</span></span>
<span class="line"><span style="color:#e1e4e8;">      extra_args:</span></span>
<span class="line"><span style="color:#e1e4e8;">        max-request-bytes: 10485760</span></span>
<span class="line"><span style="color:#e1e4e8;">        snapshot-count: 50000</span></span>
<span class="line"><span style="color:#e1e4e8;">        log-level: info # supports debug, info, warn, error, panic, or fatal.</span></span>
<span class="line"><span style="color:#e1e4e8;">        debug: false</span></span>
<span class="line"><span style="color:#e1e4e8;">       # enable-pprof: true</span></span>
<span class="line"><span style="color:#e1e4e8;">      backup_config:</span></span>
<span class="line"><span style="color:#e1e4e8;">        interval_hours: 12</span></span>
<span class="line"><span style="color:#e1e4e8;">        retention: 6</span></span>
<span class="line"><span style="color:#e1e4e8;">      extra_env:</span></span>
<span class="line"><span style="color:#e1e4e8;">        - ETCD_ENABLE_PPROF=true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">services:</span></span>
<span class="line"><span style="color:#24292e;">    etcd:</span></span>
<span class="line"><span style="color:#24292e;">      extra_args:</span></span>
<span class="line"><span style="color:#24292e;">        max-request-bytes: 10485760</span></span>
<span class="line"><span style="color:#24292e;">        snapshot-count: 50000</span></span>
<span class="line"><span style="color:#24292e;">        log-level: info # supports debug, info, warn, error, panic, or fatal.</span></span>
<span class="line"><span style="color:#24292e;">        debug: false</span></span>
<span class="line"><span style="color:#24292e;">       # enable-pprof: true</span></span>
<span class="line"><span style="color:#24292e;">      backup_config:</span></span>
<span class="line"><span style="color:#24292e;">        interval_hours: 12</span></span>
<span class="line"><span style="color:#24292e;">        retention: 6</span></span>
<span class="line"><span style="color:#24292e;">      extra_env:</span></span>
<span class="line"><span style="color:#24292e;">        - ETCD_ENABLE_PPROF=true</span></span></code></pre></div><h2 id="性能分析" tabindex="-1">性能分析 <a class="header-anchor" href="#性能分析" aria-label="Permalink to &quot;性能分析&quot;">​</a></h2><p>对于 rancher 自定义集群或者 rke 集群，默认开启了 etcd 双向认证，那么在进行 pprof 查看数据的时候，需要提供客户端 ssl 证书。可以直接通过挂载卷（-v /etc/kubernetes/ssl/:/etc/kubernetes/ssl/:ro）的方式把主机证书目录挂载到 tools 容器中。</p><h3 id="获取应用当前的内存情况" tabindex="-1">获取应用当前的内存情况 <a class="header-anchor" href="#获取应用当前的内存情况" aria-label="Permalink to &quot;获取应用当前的内存情况&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">NODE_IP=&#39;192.168.1.224&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">docker run --rm -ti -p 10086:10086 -e NODE_IP=\${NODE_IP} \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -v /etc/kubernetes/ssl/:/etc/kubernetes/ssl/:ro \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  registry.cn-shenzhen.aliyuncs.com/rancher/tools \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  pprof \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -tls_ca /etc/kubernetes/ssl/kube-ca.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -tls_cert /etc/kubernetes/ssl/kube-etcd-\`echo \${NODE_IP}|sed &#39;s/\\./-/g&#39;\`.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -tls_key /etc/kubernetes/ssl/kube-etcd-\`echo \${NODE_IP}|sed &#39;s/\\./-/g&#39;\`-key.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -http=0.0.0.0:10086 https://\`echo \${NODE_IP}\`:2379/debug/pprof/heap</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">NODE_IP=&#39;192.168.1.224&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">docker run --rm -ti -p 10086:10086 -e NODE_IP=\${NODE_IP} \\</span></span>
<span class="line"><span style="color:#24292e;">  -v /etc/kubernetes/ssl/:/etc/kubernetes/ssl/:ro \\</span></span>
<span class="line"><span style="color:#24292e;">  registry.cn-shenzhen.aliyuncs.com/rancher/tools \\</span></span>
<span class="line"><span style="color:#24292e;">  pprof \\</span></span>
<span class="line"><span style="color:#24292e;">  -tls_ca /etc/kubernetes/ssl/kube-ca.pem \\</span></span>
<span class="line"><span style="color:#24292e;">  -tls_cert /etc/kubernetes/ssl/kube-etcd-\`echo \${NODE_IP}|sed &#39;s/\\./-/g&#39;\`.pem \\</span></span>
<span class="line"><span style="color:#24292e;">  -tls_key /etc/kubernetes/ssl/kube-etcd-\`echo \${NODE_IP}|sed &#39;s/\\./-/g&#39;\`-key.pem \\</span></span>
<span class="line"><span style="color:#24292e;">  -http=0.0.0.0:10086 https://\`echo \${NODE_IP}\`:2379/debug/pprof/heap</span></span></code></pre></div><h3 id="采集应用-60s-内的-cpu-使用情况" tabindex="-1">采集应用 60s 内的 cpu 使用情况 <a class="header-anchor" href="#采集应用-60s-内的-cpu-使用情况" aria-label="Permalink to &quot;采集应用 60s 内的 cpu 使用情况&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">NODE_IP=&#39;192.168.1.224&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">docker run --rm -ti -p 10086:10086 -e NODE_IP=\${NODE_IP} \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -v /etc/kubernetes/ssl/:/etc/kubernetes/ssl/:ro \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  registry.cn-shenzhen.aliyuncs.com/rancher/tools \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  pprof \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -tls_ca /etc/kubernetes/ssl/kube-ca.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -tls_cert /etc/kubernetes/ssl/kube-etcd-\`echo \${NODE_IP}|sed &#39;s/\\./-/g&#39;\`.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -tls_key /etc/kubernetes/ssl/kube-etcd-\`echo \${NODE_IP}|sed &#39;s/\\./-/g&#39;\`-key.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -http=0.0.0.0:10086 https://\`echo \${NODE_IP}\`:2379/debug/pprof/profile</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">NODE_IP=&#39;192.168.1.224&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">docker run --rm -ti -p 10086:10086 -e NODE_IP=\${NODE_IP} \\</span></span>
<span class="line"><span style="color:#24292e;">  -v /etc/kubernetes/ssl/:/etc/kubernetes/ssl/:ro \\</span></span>
<span class="line"><span style="color:#24292e;">  registry.cn-shenzhen.aliyuncs.com/rancher/tools \\</span></span>
<span class="line"><span style="color:#24292e;">  pprof \\</span></span>
<span class="line"><span style="color:#24292e;">  -tls_ca /etc/kubernetes/ssl/kube-ca.pem \\</span></span>
<span class="line"><span style="color:#24292e;">  -tls_cert /etc/kubernetes/ssl/kube-etcd-\`echo \${NODE_IP}|sed &#39;s/\\./-/g&#39;\`.pem \\</span></span>
<span class="line"><span style="color:#24292e;">  -tls_key /etc/kubernetes/ssl/kube-etcd-\`echo \${NODE_IP}|sed &#39;s/\\./-/g&#39;\`-key.pem \\</span></span>
<span class="line"><span style="color:#24292e;">  -http=0.0.0.0:10086 https://\`echo \${NODE_IP}\`:2379/debug/pprof/profile</span></span></code></pre></div><h3 id="采集当前-goroutine-情况" tabindex="-1">采集当前 goroutine 情况 <a class="header-anchor" href="#采集当前-goroutine-情况" aria-label="Permalink to &quot;采集当前 goroutine 情况&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">NODE_IP=&#39;192.168.1.224&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">docker run --rm -ti -p 10086:10086 -e NODE_IP=\${NODE_IP} \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -v /etc/kubernetes/ssl/:/etc/kubernetes/ssl/:ro \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  registry.cn-shenzhen.aliyuncs.com/rancher/tools \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  pprof \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -tls_ca /etc/kubernetes/ssl/kube-ca.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -tls_cert /etc/kubernetes/ssl/kube-etcd-\`echo \${NODE_IP}|sed &#39;s/\\./-/g&#39;\`.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -tls_key /etc/kubernetes/ssl/kube-etcd-\`echo \${NODE_IP}|sed &#39;s/\\./-/g&#39;\`-key.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  -http=0.0.0.0:10086 https://\`echo \${NODE_IP}\`:2379/debug/pprof/goroutine</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">NODE_IP=&#39;192.168.1.224&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">docker run --rm -ti -p 10086:10086 -e NODE_IP=\${NODE_IP} \\</span></span>
<span class="line"><span style="color:#24292e;">  -v /etc/kubernetes/ssl/:/etc/kubernetes/ssl/:ro \\</span></span>
<span class="line"><span style="color:#24292e;">  registry.cn-shenzhen.aliyuncs.com/rancher/tools \\</span></span>
<span class="line"><span style="color:#24292e;">  pprof \\</span></span>
<span class="line"><span style="color:#24292e;">  -tls_ca /etc/kubernetes/ssl/kube-ca.pem \\</span></span>
<span class="line"><span style="color:#24292e;">  -tls_cert /etc/kubernetes/ssl/kube-etcd-\`echo \${NODE_IP}|sed &#39;s/\\./-/g&#39;\`.pem \\</span></span>
<span class="line"><span style="color:#24292e;">  -tls_key /etc/kubernetes/ssl/kube-etcd-\`echo \${NODE_IP}|sed &#39;s/\\./-/g&#39;\`-key.pem \\</span></span>
<span class="line"><span style="color:#24292e;">  -http=0.0.0.0:10086 https://\`echo \${NODE_IP}\`:2379/debug/pprof/goroutine</span></span></code></pre></div><h2 id="数据查看" tabindex="-1">数据查看 <a class="header-anchor" href="#数据查看" aria-label="Permalink to &quot;数据查看&quot;">​</a></h2><p>通过访问 <code>主机 IP:10086</code> 查看 pprof Web 界面，点击 <strong>VIEW</strong> 查看不通的视图</p>`,27),o=[l];function t(c,r,i,u,d,h){return e(),n("div",null,o)}const k=s(p,[["render",t]]);export{y as __pageData,k as default};
