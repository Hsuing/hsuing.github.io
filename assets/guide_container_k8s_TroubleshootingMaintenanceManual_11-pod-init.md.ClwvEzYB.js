import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"1. Pod内核优化","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/TroubleshootingMaintenanceManual/11-pod-init.md","filePath":"guide/container/k8s/TroubleshootingMaintenanceManual/11-pod-init.md","lastUpdated":1723628802000}'),l={name:"guide/container/k8s/TroubleshootingMaintenanceManual/11-pod-init.md"},o=p(`<h1 id="_1-pod内核优化" tabindex="-1">1. Pod内核优化 <a class="header-anchor" href="#_1-pod内核优化" aria-label="Permalink to &quot;1. Pod内核优化&quot;">​</a></h1><ul><li>查看</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">conntrack</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-S</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">netstat</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-st</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">egrep</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;drop|reject|overflowed|listen|filter|TCPSYNChallenge&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">conntrack</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-S</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">netstat</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-st</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">egrep</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;drop|reject|overflowed|listen|filter|TCPSYNChallenge&quot;</span></span></code></pre></div><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Pod</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">optimized-pod</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">initContainers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">init-sysctl</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">command</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">sh</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&#39;-c&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">          echo 2048 &gt; /proc/sys/net/core/somaxconn;</span></span>
<span class="line"><span style="color:#9ECBFF;">          echo 262144 &gt; /proc/sys/net/core/netdev_max_backlog;</span></span>
<span class="line"><span style="color:#9ECBFF;">          echo 262144 &gt; /proc/sys/net/core/rmem_max;</span></span>
<span class="line"><span style="color:#9ECBFF;">          echo 262144 &gt; /proc/sys/net/core/wmem_max;</span></span>
<span class="line"><span style="color:#9ECBFF;">          echo 1048576 &gt; /proc/sys/fs/file-max;</span></span>
<span class="line"><span style="color:#9ECBFF;">          echo 1048576 &gt; /proc/sys/fs/nr_open;</span></span>
<span class="line"><span style="color:#9ECBFF;">          echo 10 &gt; /proc/sys/net/ipv4/tcp_fin_timeout;</span></span>
<span class="line"><span style="color:#9ECBFF;">          echo 1 &gt; /proc/sys/net/ipv4/tcp_tw_reuse;</span></span>
<span class="line"><span style="color:#9ECBFF;">          echo 1 &gt; /proc/sys/net/ipv4/tcp_tw_recycle;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100m</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">128Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">50m</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">64Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">terminationMessagePath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/dev/termination-log</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">terminationMessagePolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">File</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">imagePullPolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">IfNotPresent</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">securityContext</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">privileged</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">main-container</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">your-image</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">80</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">512Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">250m</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">dind-storage</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">emptyDir</span><span style="color:#E1E4E8;">: {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Pod</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">optimized-pod</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">initContainers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">init-sysctl</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">busybox</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">command</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">sh</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&#39;-c&#39;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">          echo 2048 &gt; /proc/sys/net/core/somaxconn;</span></span>
<span class="line"><span style="color:#032F62;">          echo 262144 &gt; /proc/sys/net/core/netdev_max_backlog;</span></span>
<span class="line"><span style="color:#032F62;">          echo 262144 &gt; /proc/sys/net/core/rmem_max;</span></span>
<span class="line"><span style="color:#032F62;">          echo 262144 &gt; /proc/sys/net/core/wmem_max;</span></span>
<span class="line"><span style="color:#032F62;">          echo 1048576 &gt; /proc/sys/fs/file-max;</span></span>
<span class="line"><span style="color:#032F62;">          echo 1048576 &gt; /proc/sys/fs/nr_open;</span></span>
<span class="line"><span style="color:#032F62;">          echo 10 &gt; /proc/sys/net/ipv4/tcp_fin_timeout;</span></span>
<span class="line"><span style="color:#032F62;">          echo 1 &gt; /proc/sys/net/ipv4/tcp_tw_reuse;</span></span>
<span class="line"><span style="color:#032F62;">          echo 1 &gt; /proc/sys/net/ipv4/tcp_tw_recycle;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100m</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">128Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">50m</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">64Mi</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">terminationMessagePath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/dev/termination-log</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">terminationMessagePolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">File</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">imagePullPolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">IfNotPresent</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">securityContext</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">privileged</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">main-container</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">your-image</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">80</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">512Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">250m</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">dind-storage</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">emptyDir</span><span style="color:#24292E;">: {}</span></span></code></pre></div><h2 id="_1-1-参数内核解释" tabindex="-1">1.1 参数内核解释 <a class="header-anchor" href="#_1-1-参数内核解释" aria-label="Permalink to &quot;1.1 参数内核解释&quot;">​</a></h2><p><strong><code>net.core.somaxconn = 2048</code></strong>:</p><ul><li>设置 TCP 监听队列的最大长度。用于处理高并发连接请求。</li></ul><p><strong><code>net.core.netdev_max_backlog = 262144</code></strong>:</p><ul><li>当内核处理接收到的数据包时，允许在队列中排队的最大数据包数量。</li></ul><p><strong><code>net.core.rmem_max = 262144</code></strong> 和 <strong><code>net.core.wmem_max = 262144</code></strong>:</p><ul><li>增加套接字发送和接收缓冲区的最大大小，以提高网络吞吐量。</li></ul><p><strong><code>fs.file-max = 1048576</code></strong> 和 <strong><code>fs.nr_open = 1048576</code></strong>:</p><ul><li>增加系统可以同时打开的文件句柄数量。这对于需要大量文件描述符的应用程序很重要。</li></ul><p><strong><code>net.ipv4.tcp_fin_timeout = 10</code></strong>:</p><ul><li>减少 TCP 连接处于 FIN-WAIT-2 状态的时间，加速资源回收。</li></ul><p><strong><code>net.ipv4.tcp_tw_reuse = 1</code></strong> 和 <strong><code>net.ipv4.tcp_tw_recycle = 1</code></strong>:</p><ul><li>允许快速重用和回收 TIME_WAIT 状态的套接字，有助于减少大量短连接带来的影响。</li></ul>`,17),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const g=s(l,[["render",c]]);export{d as __pageData,g as default};
