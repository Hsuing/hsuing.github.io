import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const C=JSON.parse('{"title":"1. k8s+containerd部署方式","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/binary/3-安装1.29.x.md","filePath":"guide/container/k8s/binary/3-安装1.29.x.md","lastUpdated":1731319766000}'),p={name:"guide/container/k8s/binary/3-安装1.29.x.md"},o=l(`<h1 id="_1-k8s-containerd部署方式" tabindex="-1">1. k8s+containerd部署方式 <a class="header-anchor" href="#_1-k8s-containerd部署方式" aria-label="Permalink to &quot;1. k8s+containerd部署方式&quot;">​</a></h1><p>通常使用 kubeadm 部署和二进制方式部署，他们之间的区别：</p><ul><li>kubeadm 方式部署，组件容器化部署，只有 kubelet 没有被容器化</li><li>二进制方式部署，传统的守护进程（systemd）管理服务 systemctl</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">目前生产环境部署kubernetes集群主要由两种方式:</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubeadm:</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">kubeadm是一个K8S部署工具，提供kubeadm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init和kubeadm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">join，用于快速部署kubernetes集群。</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">二进制部署:</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">从GitHub下载发行版的二进制包，手动部署每个组件，组成kubernetes集群。</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span></span>
<span class="line"><span style="color:#B392F0;">除了上述介绍的两种方式部署外，还有其他部署方式的途径:</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yum:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">已废弃，目前支持的最新版本为2017年发行的1.5.2版本。</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">minikube:</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">适合开发环境，能够快速在Windows或者Linux构建K8S集群。</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">参考链接:</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">https://minikube.sigs.k8s.io/docs/</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rancher:</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">基于K8S改进发行了轻量级K8S，让K3S孕育而生。</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">参考链接:</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">https://www.rancher.com/</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">KubeSphere:</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">青云科技基于开源KubeSphere快速部署K8S集群。</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">参考链接:</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">https://kubesphere.com.cn</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kuboard:</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">也是对k8s进行二次开发的产品，新增了很多独有的功能。</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">参考链接:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">https://kuboard.cn/</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubeasz:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">使用ansible部署，扩容，缩容kubernetes集群，安装步骤官方文档已经非常详细了。</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">参考链接:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">https://github.com/easzlab/kubeasz/</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">第三方云厂商:</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">比如aws，阿里云，腾讯云，京东云等云厂商均有K8S的相关SAAS产品。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">更多的第三方部署工具:</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">参考链接:</span></span>
<span class="line"><span style="color:#E1E4E8;">           </span><span style="color:#B392F0;">https://landscape.cncf.io/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">目前生产环境部署kubernetes集群主要由两种方式:</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubeadm:</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">kubeadm是一个K8S部署工具，提供kubeadm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init和kubeadm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">join，用于快速部署kubernetes集群。</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">二进制部署:</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">从GitHub下载发行版的二进制包，手动部署每个组件，组成kubernetes集群。</span></span>
<span class="line"><span style="color:#24292E;">		</span></span>
<span class="line"><span style="color:#24292E;">		</span></span>
<span class="line"><span style="color:#6F42C1;">除了上述介绍的两种方式部署外，还有其他部署方式的途径:</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yum:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">已废弃，目前支持的最新版本为2017年发行的1.5.2版本。</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">minikube:</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">适合开发环境，能够快速在Windows或者Linux构建K8S集群。</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">参考链接:</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">https://minikube.sigs.k8s.io/docs/</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rancher:</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">基于K8S改进发行了轻量级K8S，让K3S孕育而生。</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">参考链接:</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">https://www.rancher.com/</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">KubeSphere:</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">青云科技基于开源KubeSphere快速部署K8S集群。</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">参考链接:</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">https://kubesphere.com.cn</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kuboard:</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">也是对k8s进行二次开发的产品，新增了很多独有的功能。</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">参考链接:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">https://kuboard.cn/</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubeasz:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">使用ansible部署，扩容，缩容kubernetes集群，安装步骤官方文档已经非常详细了。</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">参考链接:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">https://github.com/easzlab/kubeasz/</span></span>
<span class="line"><span style="color:#24292E;">			</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">第三方云厂商:</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">比如aws，阿里云，腾讯云，京东云等云厂商均有K8S的相关SAAS产品。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">更多的第三方部署工具:</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">参考链接:</span></span>
<span class="line"><span style="color:#24292E;">           </span><span style="color:#6F42C1;">https://landscape.cncf.io/</span></span></code></pre></div><h1 id="_2-k8s部署规划" tabindex="-1">2. k8s部署规划 <a class="header-anchor" href="#_2-k8s部署规划" aria-label="Permalink to &quot;2. k8s部署规划&quot;">​</a></h1><h2 id="_2-1-集群模式" tabindex="-1">2.1 集群模式 <a class="header-anchor" href="#_2-1-集群模式" aria-label="Permalink to &quot;2.1 集群模式&quot;">​</a></h2><h3 id="_1-nginx" tabindex="-1">1. nginx <a class="header-anchor" href="#_1-nginx" aria-label="Permalink to &quot;1. nginx&quot;">​</a></h3><h3 id="_2-haproxy-keepalived" tabindex="-1">2. haproxy+keepalived <a class="header-anchor" href="#_2-haproxy-keepalived" aria-label="Permalink to &quot;2. haproxy+keepalived&quot;">​</a></h3><h4 id="_1-所有节点-k8s-master-安装keepalived和haproxy" tabindex="-1">1.所有节点(k8s-master)安装keepalived和haproxy <a class="header-anchor" href="#_1-所有节点-k8s-master-安装keepalived和haproxy" aria-label="Permalink to &quot;1.所有节点(k8s-master)安装keepalived和haproxy&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">keepalived</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">haproxy</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">keepalived</span><span style="color:#24292E;"> </span><span style="color:#032F62;">haproxy</span></span></code></pre></div><h4 id="_2-所有节点-k8s-master-配置haproxy-配置文件各个节点相同" tabindex="-1">2.所有节点(k8s-master)配置haproxy，配置文件各个节点相同 <a class="header-anchor" href="#_2-所有节点-k8s-master-配置haproxy-配置文件各个节点相同" aria-label="Permalink to &quot;2.所有节点(k8s-master)配置haproxy，配置文件各个节点相同&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">1</span><span style="color:#E1E4E8;">)备份配置文件</span></span>
<span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/haproxy/haproxy.cfg{,\`</span><span style="color:#B392F0;">date</span><span style="color:#9ECBFF;"> +%F\`</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">2</span><span style="color:#E1E4E8;">)</span><span style="color:#B392F0;">所有节点的配置文件内容相同</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/haproxy/haproxy.cfg</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;">&#39;</span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;">&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">global</span></span>
<span class="line"><span style="color:#9ECBFF;">  maxconn  2000</span></span>
<span class="line"><span style="color:#9ECBFF;">  ulimit-n  16384</span></span>
<span class="line"><span style="color:#9ECBFF;">  log  127.0.0.1 local0 err</span></span>
<span class="line"><span style="color:#9ECBFF;">  stats timeout 30s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">defaults</span></span>
<span class="line"><span style="color:#9ECBFF;">  log global</span></span>
<span class="line"><span style="color:#9ECBFF;">  mode  http</span></span>
<span class="line"><span style="color:#9ECBFF;">  option  httplog</span></span>
<span class="line"><span style="color:#9ECBFF;">  timeout connect 5000</span></span>
<span class="line"><span style="color:#9ECBFF;">  timeout client  50000</span></span>
<span class="line"><span style="color:#9ECBFF;">  timeout server  50000</span></span>
<span class="line"><span style="color:#9ECBFF;">  timeout http-request 15s</span></span>
<span class="line"><span style="color:#9ECBFF;">  timeout http-keep-alive 15s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">frontend monitor-in</span></span>
<span class="line"><span style="color:#9ECBFF;">  bind *:33305</span></span>
<span class="line"><span style="color:#9ECBFF;">  mode http</span></span>
<span class="line"><span style="color:#9ECBFF;">  option httplog</span></span>
<span class="line"><span style="color:#9ECBFF;">  monitor-uri /monitor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">frontend k8s-master</span></span>
<span class="line"><span style="color:#9ECBFF;">  bind 0.0.0.0:16443</span></span>
<span class="line"><span style="color:#9ECBFF;">  bind 127.0.0.1:16443</span></span>
<span class="line"><span style="color:#9ECBFF;">  mode tcp</span></span>
<span class="line"><span style="color:#9ECBFF;">  option tcplog</span></span>
<span class="line"><span style="color:#9ECBFF;">  tcp-request inspect-delay 5s</span></span>
<span class="line"><span style="color:#9ECBFF;">  default_backend k8s-master</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">backend k8s-master</span></span>
<span class="line"><span style="color:#9ECBFF;">  mode tcp</span></span>
<span class="line"><span style="color:#9ECBFF;">  option tcplog</span></span>
<span class="line"><span style="color:#9ECBFF;">  option tcp-check</span></span>
<span class="line"><span style="color:#9ECBFF;">  balance roundrobin</span></span>
<span class="line"><span style="color:#9ECBFF;">  default-server inter 10s downinter 5s rise 2 fall 2 slowstart 60s maxconn 250 maxqueue 256 weight 100</span></span>
<span class="line"><span style="color:#9ECBFF;">  server k8s-master01   10.0.0.201:6443  check</span></span>
<span class="line"><span style="color:#9ECBFF;">  server k8s-master02   10.0.0.202:6443  check</span></span>
<span class="line"><span style="color:#9ECBFF;">  server k8s-master03   10.0.0.203:6443  check</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">1</span><span style="color:#24292E;">)备份配置文件</span></span>
<span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/haproxy/haproxy.cfg{,\`</span><span style="color:#6F42C1;">date</span><span style="color:#032F62;"> +%F\`</span><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">2</span><span style="color:#24292E;">)</span><span style="color:#6F42C1;">所有节点的配置文件内容相同</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/haproxy/haproxy.cfg</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;">&#39;</span><span style="color:#032F62;">EOF</span><span style="color:#24292E;">&#39;</span></span>
<span class="line"><span style="color:#032F62;">global</span></span>
<span class="line"><span style="color:#032F62;">  maxconn  2000</span></span>
<span class="line"><span style="color:#032F62;">  ulimit-n  16384</span></span>
<span class="line"><span style="color:#032F62;">  log  127.0.0.1 local0 err</span></span>
<span class="line"><span style="color:#032F62;">  stats timeout 30s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">defaults</span></span>
<span class="line"><span style="color:#032F62;">  log global</span></span>
<span class="line"><span style="color:#032F62;">  mode  http</span></span>
<span class="line"><span style="color:#032F62;">  option  httplog</span></span>
<span class="line"><span style="color:#032F62;">  timeout connect 5000</span></span>
<span class="line"><span style="color:#032F62;">  timeout client  50000</span></span>
<span class="line"><span style="color:#032F62;">  timeout server  50000</span></span>
<span class="line"><span style="color:#032F62;">  timeout http-request 15s</span></span>
<span class="line"><span style="color:#032F62;">  timeout http-keep-alive 15s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">frontend monitor-in</span></span>
<span class="line"><span style="color:#032F62;">  bind *:33305</span></span>
<span class="line"><span style="color:#032F62;">  mode http</span></span>
<span class="line"><span style="color:#032F62;">  option httplog</span></span>
<span class="line"><span style="color:#032F62;">  monitor-uri /monitor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">frontend k8s-master</span></span>
<span class="line"><span style="color:#032F62;">  bind 0.0.0.0:16443</span></span>
<span class="line"><span style="color:#032F62;">  bind 127.0.0.1:16443</span></span>
<span class="line"><span style="color:#032F62;">  mode tcp</span></span>
<span class="line"><span style="color:#032F62;">  option tcplog</span></span>
<span class="line"><span style="color:#032F62;">  tcp-request inspect-delay 5s</span></span>
<span class="line"><span style="color:#032F62;">  default_backend k8s-master</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">backend k8s-master</span></span>
<span class="line"><span style="color:#032F62;">  mode tcp</span></span>
<span class="line"><span style="color:#032F62;">  option tcplog</span></span>
<span class="line"><span style="color:#032F62;">  option tcp-check</span></span>
<span class="line"><span style="color:#032F62;">  balance roundrobin</span></span>
<span class="line"><span style="color:#032F62;">  default-server inter 10s downinter 5s rise 2 fall 2 slowstart 60s maxconn 250 maxqueue 256 weight 100</span></span>
<span class="line"><span style="color:#032F62;">  server k8s-master01   10.0.0.201:6443  check</span></span>
<span class="line"><span style="color:#032F62;">  server k8s-master02   10.0.0.202:6443  check</span></span>
<span class="line"><span style="color:#032F62;">  server k8s-master03   10.0.0.203:6443  check</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h4 id="_3-所有节点-k8s-master-配置keepalived-配置文件各节点不同" tabindex="-1">3.所有节点(k8s-master)配置keepalived，配置文件各节点不同 <a class="header-anchor" href="#_3-所有节点-k8s-master-配置keepalived-配置文件各节点不同" aria-label="Permalink to &quot;3.所有节点(k8s-master)配置keepalived，配置文件各节点不同&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">1</span><span style="color:#E1E4E8;">)备份配置文件</span></span>
<span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/keepalived/keepalived.conf{,\`</span><span style="color:#B392F0;">date</span><span style="color:#9ECBFF;"> +%F\`</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">2</span><span style="color:#E1E4E8;">)</span><span style="color:#B392F0;">&quot;k8s-master01&quot;</span><span style="color:#B392F0;">节点创建配置文件</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/keepalived/keepalived.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;">&#39;</span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;">&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">! Configuration File for keepalived</span></span>
<span class="line"><span style="color:#9ECBFF;">global_defs {</span></span>
<span class="line"><span style="color:#9ECBFF;">    router_id LVS_DEVEL</span></span>
<span class="line"><span style="color:#9ECBFF;">script_user root</span></span>
<span class="line"><span style="color:#9ECBFF;">    enable_script_security</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">vrrp_script chk_apiserver {</span></span>
<span class="line"><span style="color:#9ECBFF;">    script &quot;/etc/keepalived/check_apiserver.sh&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    interval 5</span></span>
<span class="line"><span style="color:#9ECBFF;">    weight -5</span></span>
<span class="line"><span style="color:#9ECBFF;">    fall 2  </span></span>
<span class="line"><span style="color:#9ECBFF;">    rise 1</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">vrrp_instance VI_1 {</span></span>
<span class="line"><span style="color:#9ECBFF;">    state MASTER</span></span>
<span class="line"><span style="color:#9ECBFF;">    interface ens33</span></span>
<span class="line"><span style="color:#9ECBFF;">    mcast_src_ip 10.0.0.201</span></span>
<span class="line"><span style="color:#9ECBFF;">    virtual_router_id 51</span></span>
<span class="line"><span style="color:#9ECBFF;">    priority 101</span></span>
<span class="line"><span style="color:#9ECBFF;">    advert_int 2</span></span>
<span class="line"><span style="color:#9ECBFF;">    authentication {</span></span>
<span class="line"><span style="color:#9ECBFF;">        auth_type PASS</span></span>
<span class="line"><span style="color:#9ECBFF;">        auth_pass K8SHA_KA_AUTH</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">    virtual_ipaddress {</span></span>
<span class="line"><span style="color:#9ECBFF;">        10.0.0.250</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">    track_script {</span></span>
<span class="line"><span style="color:#9ECBFF;">       chk_apiserver</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">3</span><span style="color:#E1E4E8;">)</span><span style="color:#9ECBFF;">&quot;k8s-master02&quot;</span><span style="color:#E1E4E8;">节点创建配置文件</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/keepalived/keepalived.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;">&#39;</span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;">&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">! Configuration File for keepalived</span></span>
<span class="line"><span style="color:#9ECBFF;">global_defs {</span></span>
<span class="line"><span style="color:#9ECBFF;">    router_id LVS_DEVEL</span></span>
<span class="line"><span style="color:#9ECBFF;">script_user root</span></span>
<span class="line"><span style="color:#9ECBFF;">    enable_script_security</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">vrrp_script chk_apiserver {</span></span>
<span class="line"><span style="color:#9ECBFF;">    script &quot;/etc/keepalived/check_apiserver.sh&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    interval 5</span></span>
<span class="line"><span style="color:#9ECBFF;">    weight -5</span></span>
<span class="line"><span style="color:#9ECBFF;">    fall 2  </span></span>
<span class="line"><span style="color:#9ECBFF;">    rise 1</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">vrrp_instance VI_1 {</span></span>
<span class="line"><span style="color:#9ECBFF;">    state MASTER</span></span>
<span class="line"><span style="color:#9ECBFF;">    interface ens33</span></span>
<span class="line"><span style="color:#9ECBFF;">    mcast_src_ip 10.0.0.202</span></span>
<span class="line"><span style="color:#9ECBFF;">    virtual_router_id 51</span></span>
<span class="line"><span style="color:#9ECBFF;">    priority 101</span></span>
<span class="line"><span style="color:#9ECBFF;">    advert_int 2</span></span>
<span class="line"><span style="color:#9ECBFF;">    authentication {</span></span>
<span class="line"><span style="color:#9ECBFF;">        auth_type PASS</span></span>
<span class="line"><span style="color:#9ECBFF;">        auth_pass K8SHA_KA_AUTH</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">    virtual_ipaddress {</span></span>
<span class="line"><span style="color:#9ECBFF;">        10.0.0.250</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">    track_script {</span></span>
<span class="line"><span style="color:#9ECBFF;">       chk_apiserver</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">4</span><span style="color:#E1E4E8;">)</span><span style="color:#9ECBFF;">&quot;k8s-master03&quot;</span><span style="color:#E1E4E8;">节点创建配置文件</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/keepalived/keepalived.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;">&#39;</span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;">&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">! Configuration File for keepalived</span></span>
<span class="line"><span style="color:#9ECBFF;">global_defs {</span></span>
<span class="line"><span style="color:#9ECBFF;">    router_id LVS_DEVEL</span></span>
<span class="line"><span style="color:#9ECBFF;">script_user root</span></span>
<span class="line"><span style="color:#9ECBFF;">    enable_script_security</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">vrrp_script chk_apiserver {</span></span>
<span class="line"><span style="color:#9ECBFF;">    script &quot;/etc/keepalived/check_apiserver.sh&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    interval 5</span></span>
<span class="line"><span style="color:#9ECBFF;">    weight -5</span></span>
<span class="line"><span style="color:#9ECBFF;">    fall 2  </span></span>
<span class="line"><span style="color:#9ECBFF;">    rise 1</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">vrrp_instance VI_1 {</span></span>
<span class="line"><span style="color:#9ECBFF;">    state MASTER</span></span>
<span class="line"><span style="color:#9ECBFF;">    interface ens33</span></span>
<span class="line"><span style="color:#9ECBFF;">    mcast_src_ip 10.0.0.203</span></span>
<span class="line"><span style="color:#9ECBFF;">    virtual_router_id 51</span></span>
<span class="line"><span style="color:#9ECBFF;">    priority 101</span></span>
<span class="line"><span style="color:#9ECBFF;">    advert_int 2</span></span>
<span class="line"><span style="color:#9ECBFF;">    authentication {</span></span>
<span class="line"><span style="color:#9ECBFF;">        auth_type PASS</span></span>
<span class="line"><span style="color:#9ECBFF;">        auth_pass K8SHA_KA_AUTH</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">    virtual_ipaddress {</span></span>
<span class="line"><span style="color:#9ECBFF;">        10.0.0.250</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">    track_script {</span></span>
<span class="line"><span style="color:#9ECBFF;">       chk_apiserver</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">1</span><span style="color:#24292E;">)备份配置文件</span></span>
<span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/keepalived/keepalived.conf{,\`</span><span style="color:#6F42C1;">date</span><span style="color:#032F62;"> +%F\`</span><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">2</span><span style="color:#24292E;">)</span><span style="color:#6F42C1;">&quot;k8s-master01&quot;</span><span style="color:#6F42C1;">节点创建配置文件</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/keepalived/keepalived.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;">&#39;</span><span style="color:#032F62;">EOF</span><span style="color:#24292E;">&#39;</span></span>
<span class="line"><span style="color:#032F62;">! Configuration File for keepalived</span></span>
<span class="line"><span style="color:#032F62;">global_defs {</span></span>
<span class="line"><span style="color:#032F62;">    router_id LVS_DEVEL</span></span>
<span class="line"><span style="color:#032F62;">script_user root</span></span>
<span class="line"><span style="color:#032F62;">    enable_script_security</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">vrrp_script chk_apiserver {</span></span>
<span class="line"><span style="color:#032F62;">    script &quot;/etc/keepalived/check_apiserver.sh&quot;</span></span>
<span class="line"><span style="color:#032F62;">    interval 5</span></span>
<span class="line"><span style="color:#032F62;">    weight -5</span></span>
<span class="line"><span style="color:#032F62;">    fall 2  </span></span>
<span class="line"><span style="color:#032F62;">    rise 1</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">vrrp_instance VI_1 {</span></span>
<span class="line"><span style="color:#032F62;">    state MASTER</span></span>
<span class="line"><span style="color:#032F62;">    interface ens33</span></span>
<span class="line"><span style="color:#032F62;">    mcast_src_ip 10.0.0.201</span></span>
<span class="line"><span style="color:#032F62;">    virtual_router_id 51</span></span>
<span class="line"><span style="color:#032F62;">    priority 101</span></span>
<span class="line"><span style="color:#032F62;">    advert_int 2</span></span>
<span class="line"><span style="color:#032F62;">    authentication {</span></span>
<span class="line"><span style="color:#032F62;">        auth_type PASS</span></span>
<span class="line"><span style="color:#032F62;">        auth_pass K8SHA_KA_AUTH</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">    virtual_ipaddress {</span></span>
<span class="line"><span style="color:#032F62;">        10.0.0.250</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">    track_script {</span></span>
<span class="line"><span style="color:#032F62;">       chk_apiserver</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">3</span><span style="color:#24292E;">)</span><span style="color:#032F62;">&quot;k8s-master02&quot;</span><span style="color:#24292E;">节点创建配置文件</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/keepalived/keepalived.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;">&#39;</span><span style="color:#032F62;">EOF</span><span style="color:#24292E;">&#39;</span></span>
<span class="line"><span style="color:#032F62;">! Configuration File for keepalived</span></span>
<span class="line"><span style="color:#032F62;">global_defs {</span></span>
<span class="line"><span style="color:#032F62;">    router_id LVS_DEVEL</span></span>
<span class="line"><span style="color:#032F62;">script_user root</span></span>
<span class="line"><span style="color:#032F62;">    enable_script_security</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">vrrp_script chk_apiserver {</span></span>
<span class="line"><span style="color:#032F62;">    script &quot;/etc/keepalived/check_apiserver.sh&quot;</span></span>
<span class="line"><span style="color:#032F62;">    interval 5</span></span>
<span class="line"><span style="color:#032F62;">    weight -5</span></span>
<span class="line"><span style="color:#032F62;">    fall 2  </span></span>
<span class="line"><span style="color:#032F62;">    rise 1</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">vrrp_instance VI_1 {</span></span>
<span class="line"><span style="color:#032F62;">    state MASTER</span></span>
<span class="line"><span style="color:#032F62;">    interface ens33</span></span>
<span class="line"><span style="color:#032F62;">    mcast_src_ip 10.0.0.202</span></span>
<span class="line"><span style="color:#032F62;">    virtual_router_id 51</span></span>
<span class="line"><span style="color:#032F62;">    priority 101</span></span>
<span class="line"><span style="color:#032F62;">    advert_int 2</span></span>
<span class="line"><span style="color:#032F62;">    authentication {</span></span>
<span class="line"><span style="color:#032F62;">        auth_type PASS</span></span>
<span class="line"><span style="color:#032F62;">        auth_pass K8SHA_KA_AUTH</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">    virtual_ipaddress {</span></span>
<span class="line"><span style="color:#032F62;">        10.0.0.250</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">    track_script {</span></span>
<span class="line"><span style="color:#032F62;">       chk_apiserver</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">4</span><span style="color:#24292E;">)</span><span style="color:#032F62;">&quot;k8s-master03&quot;</span><span style="color:#24292E;">节点创建配置文件</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/keepalived/keepalived.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;">&#39;</span><span style="color:#032F62;">EOF</span><span style="color:#24292E;">&#39;</span></span>
<span class="line"><span style="color:#032F62;">! Configuration File for keepalived</span></span>
<span class="line"><span style="color:#032F62;">global_defs {</span></span>
<span class="line"><span style="color:#032F62;">    router_id LVS_DEVEL</span></span>
<span class="line"><span style="color:#032F62;">script_user root</span></span>
<span class="line"><span style="color:#032F62;">    enable_script_security</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">vrrp_script chk_apiserver {</span></span>
<span class="line"><span style="color:#032F62;">    script &quot;/etc/keepalived/check_apiserver.sh&quot;</span></span>
<span class="line"><span style="color:#032F62;">    interval 5</span></span>
<span class="line"><span style="color:#032F62;">    weight -5</span></span>
<span class="line"><span style="color:#032F62;">    fall 2  </span></span>
<span class="line"><span style="color:#032F62;">    rise 1</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">vrrp_instance VI_1 {</span></span>
<span class="line"><span style="color:#032F62;">    state MASTER</span></span>
<span class="line"><span style="color:#032F62;">    interface ens33</span></span>
<span class="line"><span style="color:#032F62;">    mcast_src_ip 10.0.0.203</span></span>
<span class="line"><span style="color:#032F62;">    virtual_router_id 51</span></span>
<span class="line"><span style="color:#032F62;">    priority 101</span></span>
<span class="line"><span style="color:#032F62;">    advert_int 2</span></span>
<span class="line"><span style="color:#032F62;">    authentication {</span></span>
<span class="line"><span style="color:#032F62;">        auth_type PASS</span></span>
<span class="line"><span style="color:#032F62;">        auth_pass K8SHA_KA_AUTH</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">    virtual_ipaddress {</span></span>
<span class="line"><span style="color:#032F62;">        10.0.0.250</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">    track_script {</span></span>
<span class="line"><span style="color:#032F62;">       chk_apiserver</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h4 id="_4-所有节点-k8s-master-配置keepalived健康检查文件" tabindex="-1">4.所有节点(k8s-master)配置KeepAlived健康检查文件 <a class="header-anchor" href="#_4-所有节点-k8s-master-配置keepalived健康检查文件" aria-label="Permalink to &quot;4.所有节点(k8s-master)配置KeepAlived健康检查文件&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">1</span><span style="color:#E1E4E8;">)创建检查脚本</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/keepalived/check_apiserver.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;">&#39;</span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;">&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">err=0</span></span>
<span class="line"><span style="color:#9ECBFF;">for k in $(seq 1 3)</span></span>
<span class="line"><span style="color:#9ECBFF;">do</span></span>
<span class="line"><span style="color:#9ECBFF;">    check_code=$(pgrep haproxy)</span></span>
<span class="line"><span style="color:#9ECBFF;">    if [[ $check_code == &quot;&quot; ]]; then</span></span>
<span class="line"><span style="color:#9ECBFF;">        err=$(expr $err + 1)</span></span>
<span class="line"><span style="color:#9ECBFF;">        sleep 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        continue</span></span>
<span class="line"><span style="color:#9ECBFF;">    else</span></span>
<span class="line"><span style="color:#9ECBFF;">        err=0</span></span>
<span class="line"><span style="color:#9ECBFF;">        break</span></span>
<span class="line"><span style="color:#9ECBFF;">    fi</span></span>
<span class="line"><span style="color:#9ECBFF;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">if [[ $err != &quot;0&quot; ]]; then</span></span>
<span class="line"><span style="color:#9ECBFF;">    echo &quot;systemctl stop keepalived&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    /usr/bin/systemctl stop keepalived</span></span>
<span class="line"><span style="color:#9ECBFF;">    exit 1</span></span>
<span class="line"><span style="color:#9ECBFF;">else</span></span>
<span class="line"><span style="color:#9ECBFF;">    exit 0</span></span>
<span class="line"><span style="color:#9ECBFF;">fi</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">2</span><span style="color:#E1E4E8;">)添加执行权限</span></span>
<span class="line"><span style="color:#B392F0;">chmod</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">+x</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/keepalived/check_apiserver.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">1</span><span style="color:#24292E;">)创建检查脚本</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/keepalived/check_apiserver.sh</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;">&#39;</span><span style="color:#032F62;">EOF</span><span style="color:#24292E;">&#39;</span></span>
<span class="line"><span style="color:#032F62;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">err=0</span></span>
<span class="line"><span style="color:#032F62;">for k in $(seq 1 3)</span></span>
<span class="line"><span style="color:#032F62;">do</span></span>
<span class="line"><span style="color:#032F62;">    check_code=$(pgrep haproxy)</span></span>
<span class="line"><span style="color:#032F62;">    if [[ $check_code == &quot;&quot; ]]; then</span></span>
<span class="line"><span style="color:#032F62;">        err=$(expr $err + 1)</span></span>
<span class="line"><span style="color:#032F62;">        sleep 1</span></span>
<span class="line"><span style="color:#032F62;">        continue</span></span>
<span class="line"><span style="color:#032F62;">    else</span></span>
<span class="line"><span style="color:#032F62;">        err=0</span></span>
<span class="line"><span style="color:#032F62;">        break</span></span>
<span class="line"><span style="color:#032F62;">    fi</span></span>
<span class="line"><span style="color:#032F62;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">if [[ $err != &quot;0&quot; ]]; then</span></span>
<span class="line"><span style="color:#032F62;">    echo &quot;systemctl stop keepalived&quot;</span></span>
<span class="line"><span style="color:#032F62;">    /usr/bin/systemctl stop keepalived</span></span>
<span class="line"><span style="color:#032F62;">    exit 1</span></span>
<span class="line"><span style="color:#032F62;">else</span></span>
<span class="line"><span style="color:#032F62;">    exit 0</span></span>
<span class="line"><span style="color:#032F62;">fi</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">2</span><span style="color:#24292E;">)添加执行权限</span></span>
<span class="line"><span style="color:#6F42C1;">chmod</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+x</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/keepalived/check_apiserver.sh</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>1.我们通过KeepAlived虚拟出来一个VIP，VIP会配置到一个master节点上面，它会通过haproxy暴露的16443的端口反向代理到我们的三个master节点上面，所以我们可以通过VIP的地址加上16443访问到我们的API server;</p><p>2.健康检查会检查haproxy的状态，三次失败就会将KeepAlived停掉，停掉之后KeepAlived会跳到其他的节点;</p></div><ul><li>启动服务</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">1.启动harproxy</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">haproxy</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">2.启动keepalived</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">keepalived</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">2.查看VIP</span></span>
<span class="line"><span style="color:#B392F0;">ip</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">a</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">1.启动harproxy</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">haproxy</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">2.启动keepalived</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">keepalived</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">2.查看VIP</span></span>
<span class="line"><span style="color:#6F42C1;">ip</span><span style="color:#24292E;"> </span><span style="color:#032F62;">a</span></span></code></pre></div><h3 id="_3-云厂商用nlb-elb" tabindex="-1">3.云厂商用nlb,elb <a class="header-anchor" href="#_3-云厂商用nlb-elb" aria-label="Permalink to &quot;3.云厂商用nlb,elb&quot;">​</a></h3><p>如果在云上安装K8S则无安装高可用组件了，毕竟公有云大部分都是不支持keepalived的，可以直接使用云产品，比如阿里的&quot;SLB&quot;，腾讯的&quot;ELB&quot;等SAAS产品;</p><p>推荐使用ELB，SLB有回环的问题，也就是SLB代理的服务器不能反向访问SLB，但是腾讯云修复了这个问题;</p><h2 id="_2-2-资源" tabindex="-1">2.2 资源 <a class="header-anchor" href="#_2-2-资源" aria-label="Permalink to &quot;2.2 资源&quot;">​</a></h2><p><code>生产环境中，建议使用小版本大于5的Kubernetes版本，比如1.19.5以后的才可用于生产环境</code></p><p>vm 环境，规划如下：</p><table><thead><tr><th>k8s 集群角色</th><th>ip 地址</th><th>hostname 主机名称</th><th>资源规格</th><th>操作系统</th><th>安装组件</th></tr></thead><tbody><tr><td>master</td><td></td><td>kube-master-01</td><td>2x4g/60g</td><td>Rocklinux9.4</td><td>containerd，nerdctl，<code>etcd</code>，apiserver，controller-manager，scheduler，kubectl，kubelet，kube-proxy，calico</td></tr><tr><td>work-node</td><td></td><td>kube-node-01</td><td>2x4g/60g</td><td>Rocklinux9.4</td><td>containerd，<code>etcd</code>,nerdctl，kubelet，kube-proxy，calico</td></tr><tr><td>work-node</td><td></td><td>kube-node-02</td><td>2x4g/60g</td><td>Rocklinux9.4</td><td>containerd，<code>etcd</code>,nerdctl，kubelet，kube-proxy，calico</td></tr></tbody></table><p>etcd节省资源,在master,work进行安装,线上环境单独安装</p><h2 id="_2-3-ip分配" tabindex="-1">2.3 Ip分配 <a class="header-anchor" href="#_2-3-ip分配" aria-label="Permalink to &quot;2.3 Ip分配&quot;">​</a></h2><table><thead><tr><th style="text-align:left;">主机名</th><th style="text-align:left;">ip地址</th></tr></thead><tbody><tr><td style="text-align:left;">slb</td><td style="text-align:left;">10.103.236.236</td></tr><tr><td style="text-align:left;">kubeadm-master</td><td style="text-align:left;">10.103.236.150</td></tr><tr><td style="text-align:left;">kubeadm-node01</td><td style="text-align:left;">10.103.236.151</td></tr><tr><td style="text-align:left;">kubeadm-node02</td><td style="text-align:left;">10.103.236.152</td></tr><tr><td style="text-align:left;">pod网段</td><td style="text-align:left;">172.16.0.0/12</td></tr><tr><td style="text-align:left;">service网段</td><td style="text-align:left;">192.168.0.0/16</td></tr><tr><td style="text-align:left;">host网段</td><td style="text-align:left;">10.103.236.0/12</td></tr></tbody></table><h2 id="_2-4-下载" tabindex="-1">2.4 下载 <a class="header-anchor" href="#_2-4-下载" aria-label="Permalink to &quot;2.4 下载&quot;">​</a></h2><p><a href="https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.29.md" target="_blank" rel="noreferrer">https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.29.md</a></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#查看最新版本</span></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Ls</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://dl.k8s.io/release/stable.txt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#查看最新版本</span></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Ls</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://dl.k8s.io/release/stable.txt</span></span></code></pre></div><table><thead><tr><th>软件名字</th><th>版本</th></tr></thead><tbody><tr><td>kubernetes-server</td><td><a href="https://github.com/kubernetes/kubernetes" target="_blank" rel="noreferrer">v1.29.7</a></td></tr><tr><td>containerd</td><td><a href="https://github.com/containerd/containerd/releases/download/v1.7.22/cri-containerd-cni-1.7.22-linux-amd64.tar.gz" target="_blank" rel="noreferrer">v1.7.22</a></td></tr><tr><td>etcd</td><td><a href="https://github.com/etcd-io/etcd/releases/download/v3.5.12/etcd-v3.5.12-linux-amd64.tar.gz" target="_blank" rel="noreferrer">v3.5.12</a></td></tr><tr><td><a href="https://github.com/cloudflare/cfssl/releases" target="_blank" rel="noreferrer">cfssl</a></td><td><a href="https://github.com/cloudflare/cfssl/releases/tag/v1.6.5" target="_blank" rel="noreferrer">v1.6.5</a></td></tr><tr><td>cfssljson</td><td><a href="https://github.com/cloudflare/cfssl/releases/download/v1.6.4/cfssljson_1.6.5_linux_amd64" target="_blank" rel="noreferrer">v1.6.5</a></td></tr></tbody></table><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://dl.k8s.io/v1.29.7/kubernetes-server-linux-amd64.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/containerd/containerd/releases/download/v1.7.22/cri-containerd-cni-1.7.22-linux-amd64.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/etcd-io/etcd/releases/download/v3.5.12/etcd-v3.5.12-linux-amd64.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/cloudflare/cfssl/releases/download/v1.6.5/cfssl_1.6.5_linux_amd64</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin/cfssl</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/cloudflare/cfssl/releases/download/v1.6.5/cfssljson_1.6.5_linux_amd64</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin/cfssljson</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://dl.k8s.io/v1.29.7/kubernetes-server-linux-amd64.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/containerd/containerd/releases/download/v1.7.22/cri-containerd-cni-1.7.22-linux-amd64.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/etcd-io/etcd/releases/download/v3.5.12/etcd-v3.5.12-linux-amd64.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/cloudflare/cfssl/releases/download/v1.6.5/cfssl_1.6.5_linux_amd64</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin/cfssl</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/cloudflare/cfssl/releases/download/v1.6.5/cfssljson_1.6.5_linux_amd64</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin/cfssljson</span></span></code></pre></div><h1 id="_3-部署" tabindex="-1">3. 部署 <a class="header-anchor" href="#_3-部署" aria-label="Permalink to &quot;3. 部署&quot;">​</a></h1><h2 id="_3-1-containerd部署-所有节点" tabindex="-1">3.1 containerd部署-所有节点 <a class="header-anchor" href="#_3-1-containerd部署-所有节点" aria-label="Permalink to &quot;3.1 containerd部署-所有节点&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#解压</span></span>
<span class="line"><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zxvf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cri-containerd-cni-1.7.22-linux-amd64.tar.gz</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-C</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#解压</span></span>
<span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zxvf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cri-containerd-cni-1.7.22-linux-amd64.tar.gz</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-C</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span></span></code></pre></div><ul><li>生成<strong>containerd配置文件</strong></li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/containerd/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">containerd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/containerd/config.toml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config.toml</span></span>
<span class="line"><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#B392F0;">SystemdCgroup</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#修改为true</span></span>
<span class="line"><span style="color:#79B8FF;">...</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">再修改/etc/containerd/config.toml中的</span></span>
<span class="line"><span style="color:#E1E4E8;">[plugins.</span><span style="color:#9ECBFF;">&quot;io.containerd.grpc.v1.cri&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># sandbox_image = &quot;k8s.gcr.io/pause:3.6&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">sandbox_image</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;registry.aliyuncs.com/google_containers/pause:3.9&quot;</span><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">#这里一定要注意，要根据下载到本地 pause镜像的版本来进行修改，否则初始化会过不去。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">再修改,默认是io.containerd.runc.v2,否则crictl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">无法连接containerd</span></span>
<span class="line"><span style="color:#E1E4E8;">[plugins.</span><span style="color:#9ECBFF;">&quot;io.containerd.grpc.v1.cri&quot;</span><span style="color:#E1E4E8;">.containerd.runtimes.runc]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">runtime_type</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;io.containerd.runtime.v1.linux</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/containerd/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">containerd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/containerd/config.toml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config.toml</span></span>
<span class="line"><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#6F42C1;">SystemdCgroup</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#修改为true</span></span>
<span class="line"><span style="color:#005CC5;">...</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">再修改/etc/containerd/config.toml中的</span></span>
<span class="line"><span style="color:#24292E;">[plugins.</span><span style="color:#032F62;">&quot;io.containerd.grpc.v1.cri&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># sandbox_image = &quot;k8s.gcr.io/pause:3.6&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">sandbox_image</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;registry.aliyuncs.com/google_containers/pause:3.9&quot;</span><span style="color:#24292E;">	</span><span style="color:#6A737D;">#这里一定要注意，要根据下载到本地 pause镜像的版本来进行修改，否则初始化会过不去。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">再修改,默认是io.containerd.runc.v2,否则crictl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">无法连接containerd</span></span>
<span class="line"><span style="color:#24292E;">[plugins.</span><span style="color:#032F62;">&quot;io.containerd.grpc.v1.cri&quot;</span><span style="color:#24292E;">.containerd.runtimes.runc]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">runtime_type</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;io.containerd.runtime.v1.linux</span></span></code></pre></div><p>或者用sed修改</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-ri</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s/(.*SystemdCgroup = ).*/\\1true/&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s@(.*sandbox_image = ).*@\\1\\&quot;registry.aliyuncs.com/google_containers/pause:3.9\\&quot;@&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/containerd/config.toml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 命令直接修改， SystemdCgroup ： false -&gt; true</span></span>
<span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/SystemdCgroup/s/false/true/&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/containerd/config.toml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#镜像加速，也可以不修改</span></span>
<span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;s#config_path\\ \\=\\ </span><span style="color:#79B8FF;">\\&quot;\\&quot;</span><span style="color:#9ECBFF;">#config_path\\ \\=\\ </span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">/etc/containerd/certs.d</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">#g&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/containerd/config.toml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-ri</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s/(.*SystemdCgroup = ).*/\\1true/&#39;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s@(.*sandbox_image = ).*@\\1\\&quot;registry.aliyuncs.com/google_containers/pause:3.9\\&quot;@&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/containerd/config.toml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 命令直接修改， SystemdCgroup ： false -&gt; true</span></span>
<span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/SystemdCgroup/s/false/true/&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/containerd/config.toml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#镜像加速，也可以不修改</span></span>
<span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;s#config_path\\ \\=\\ </span><span style="color:#005CC5;">\\&quot;\\&quot;</span><span style="color:#032F62;">#config_path\\ \\=\\ </span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">/etc/containerd/certs.d</span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">#g&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/containerd/config.toml</span></span></code></pre></div><ul><li>启动containerd服务</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 重新加载Unit file</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#开机启动,并启动服务</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">containerd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 重新加载Unit file</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#开机启动,并启动服务</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">containerd</span></span></code></pre></div><ul><li>节点配置crictl客户端连接的运行时位置</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/crictl.yaml</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">runtime-endpoint: unix:///run/containerd/containerd.sock</span></span>
<span class="line"><span style="color:#9ECBFF;">image-endpoint: unix:///run/containerd/containerd.sock</span></span>
<span class="line"><span style="color:#9ECBFF;">timeout: 10</span></span>
<span class="line"><span style="color:#9ECBFF;">debug: false</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/crictl.yaml</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">runtime-endpoint: unix:///run/containerd/containerd.sock</span></span>
<span class="line"><span style="color:#032F62;">image-endpoint: unix:///run/containerd/containerd.sock</span></span>
<span class="line"><span style="color:#032F62;">timeout: 10</span></span>
<span class="line"><span style="color:#032F62;">debug: false</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>由于containerd,桥接默认启动分配的网络是10.4.0.0/24,按需进行修改</p></div><ul><li>验证crictl连通性</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">crictl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">unix:///var/run/containerd/containerd.sock</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">info</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">或者</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# crictl version</span></span>
<span class="line"><span style="color:#B392F0;">Version:</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">0.1</span><span style="color:#9ECBFF;">.0</span></span>
<span class="line"><span style="color:#B392F0;">RuntimeName:</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">containerd</span></span>
<span class="line"><span style="color:#B392F0;">RuntimeVersion:</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">v1.7.22</span></span>
<span class="line"><span style="color:#B392F0;">RuntimeApiVersion:</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">v1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">crictl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">unix:///var/run/containerd/containerd.sock</span><span style="color:#24292E;"> </span><span style="color:#032F62;">info</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">或者</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# crictl version</span></span>
<span class="line"><span style="color:#6F42C1;">Version:</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">0.1</span><span style="color:#032F62;">.0</span></span>
<span class="line"><span style="color:#6F42C1;">RuntimeName:</span><span style="color:#24292E;">  </span><span style="color:#032F62;">containerd</span></span>
<span class="line"><span style="color:#6F42C1;">RuntimeVersion:</span><span style="color:#24292E;">  </span><span style="color:#032F62;">v1.7.22</span></span>
<span class="line"><span style="color:#6F42C1;">RuntimeApiVersion:</span><span style="color:#24292E;">  </span><span style="color:#032F62;">v1</span></span></code></pre></div><blockquote><p>如果没有这个工具,下载方式</p><p>VERSION=&quot;1.29.0&quot;</p><p>wget <a href="https://github.com/kubernetes-sigs/cri-tools/releases/download/$%7BVERSION%7D/crictl-$%7BVERSION%7D-linux-amd64.tar.gz" target="_blank" rel="noreferrer">https://github.com/kubernetes-sigs/cri-tools/releases/download/\${VERSION}/crictl-\${VERSION}-linux-amd64.tar.gz</a></p></blockquote><h2 id="_3-2-部署buildkit-所有节点" tabindex="-1">3.2 部署buildkit-所有节点 <a class="header-anchor" href="#_3-2-部署buildkit-所有节点" aria-label="Permalink to &quot;3.2 部署buildkit-所有节点&quot;">​</a></h2><ul><li>解压</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zxvf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nerdctl-full-1.7.7-linux-amd64.tar.gz</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-C</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zxvf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nerdctl-full-1.7.7-linux-amd64.tar.gz</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-C</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/</span></span></code></pre></div><ul><li>配置systemd文件</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">/usr/local/lib/systemd/system/buildkit.service</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/systemd/system/buildkitd.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;">  </span><span style="color:#032F62;">/usr/local/lib/systemd/system/buildkit.service</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/systemd/system/buildkitd.service</span></span></code></pre></div><ul><li>配置内核参数,否则nerdctl执行命令会提示警告</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;net.bridge.bridge-nf-call-ip6tables = 1&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/sysctl.conf</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;net.bridge.bridge-nf-call-iptables = 1&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/sysctl.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">sysctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;net.bridge.bridge-nf-call-ip6tables = 1&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/sysctl.conf</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;net.bridge.bridge-nf-call-iptables = 1&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/sysctl.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">sysctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span></span></code></pre></div><ul><li>启动服务</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 重新加载Unit file</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#开机启动,并启动服务</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable --now buildkit</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 重新加载Unit file</span></span>
<span class="line"><span style="color:#24292e;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#开机启动,并启动服务</span></span>
<span class="line"><span style="color:#24292e;">systemctl enable --now buildkit</span></span></code></pre></div><h2 id="_3-3-部署nerdctl-所有节点" tabindex="-1">3.3 部署nerdctl-所有节点 <a class="header-anchor" href="#_3-3-部署nerdctl-所有节点" aria-label="Permalink to &quot;3.3 部署nerdctl-所有节点&quot;">​</a></h2><blockquote><p>看3.2环节</p></blockquote><ul><li>验证</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-node-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# nerdctl info</span></span>
<span class="line"><span style="color:#B392F0;">Client:</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Namespace:</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">default</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Debug</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Mode:</span><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">Server:</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Version:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v1.7.22</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Storage</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Driver:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">overlayfs</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Logging</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Driver:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">json-file</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Cgroup</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Driver:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">systemd</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Cgroup</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Version:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Plugins:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">Log:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">fluentd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">journald</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">json-file</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">syslog</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">Storage:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">native</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">overlayfs</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Security</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Options:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">seccomp</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#B392F0;">Profile:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">builtin</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">cgroupns</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Kernel</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Version:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5.14</span><span style="color:#9ECBFF;">.0-427.33.1.el9_4.x86_64</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Operating</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">System:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Rocky</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Linux</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9.4</span><span style="color:#E1E4E8;"> (Blue </span><span style="color:#9ECBFF;">Onyx</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">OSType:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">linux</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Architecture:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">x86_64</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CPUs:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Total</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Memory:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3.543</span><span style="color:#9ECBFF;">GiB</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-node-01</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ID:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">c8f2114c-e5a8-4e14-a8f2-af9f6ca67ba5</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-node-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# nerdctl info</span></span>
<span class="line"><span style="color:#6F42C1;">Client:</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Namespace:</span><span style="color:#24292E;">	</span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Debug</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Mode:</span><span style="color:#24292E;">	</span><span style="color:#005CC5;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">Server:</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Version:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v1.7.22</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Storage</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Driver:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">overlayfs</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Logging</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Driver:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">json-file</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Cgroup</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Driver:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">systemd</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Cgroup</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Version:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Plugins:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Log:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">fluentd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">journald</span><span style="color:#24292E;"> </span><span style="color:#032F62;">json-file</span><span style="color:#24292E;"> </span><span style="color:#032F62;">syslog</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Storage:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">native</span><span style="color:#24292E;"> </span><span style="color:#032F62;">overlayfs</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Security</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Options:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">seccomp</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6F42C1;">Profile:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">builtin</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">cgroupns</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Kernel</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Version:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5.14</span><span style="color:#032F62;">.0-427.33.1.el9_4.x86_64</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Operating</span><span style="color:#24292E;"> </span><span style="color:#032F62;">System:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Rocky</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Linux</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9.4</span><span style="color:#24292E;"> (Blue </span><span style="color:#032F62;">Onyx</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">OSType:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">linux</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Architecture:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">x86_64</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CPUs:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Total</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Memory:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3.543</span><span style="color:#032F62;">GiB</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-node-01</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ID:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">c8f2114c-e5a8-4e14-a8f2-af9f6ca67ba5</span></span></code></pre></div><h2 id="_3-4-部署证书-在master操作" tabindex="-1">3.4 部署证书-在master操作 <a class="header-anchor" href="#_3-4-部署证书-在master操作" aria-label="Permalink to &quot;3.4 部署证书-在master操作&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cfssl_1.6.5_linux_amd64</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin/cfssl</span></span>
<span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cfssljson_1.6.5_linux_amd64</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin/cfssljson</span></span>
<span class="line"><span style="color:#6A737D;">#添加权限</span></span>
<span class="line"><span style="color:#B392F0;">chmod</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">+x</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin/cfssl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin/cfssljson</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cfssl_1.6.5_linux_amd64</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin/cfssl</span></span>
<span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cfssljson_1.6.5_linux_amd64</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin/cfssljson</span></span>
<span class="line"><span style="color:#6A737D;">#添加权限</span></span>
<span class="line"><span style="color:#6F42C1;">chmod</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+x</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin/cfssl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin/cfssljson</span></span></code></pre></div><h2 id="_3-5-部署etcd" tabindex="-1">3.5 部署etcd <a class="header-anchor" href="#_3-5-部署etcd" aria-label="Permalink to &quot;3.5 部署etcd&quot;">​</a></h2><h3 id="_3-5-1-安装" tabindex="-1">3.5.1 安装 <a class="header-anchor" href="#_3-5-1-安装" aria-label="Permalink to &quot;3.5.1 安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-xf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd-v3.5.12-linux-amd64.tar.gz</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--strip-components=1</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-C</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd-v3.5.7-linux-amd64/etcd{,ctl}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#验证</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 init_pack]# etcdctl version</span></span>
<span class="line"><span style="color:#B392F0;">etcdctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">version:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3.5</span><span style="color:#9ECBFF;">.12</span></span>
<span class="line"><span style="color:#B392F0;">API</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">version:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3.5</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-xf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd-v3.5.12-linux-amd64.tar.gz</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--strip-components=1</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-C</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd-v3.5.7-linux-amd64/etcd{,ctl}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#验证</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 init_pack]# etcdctl version</span></span>
<span class="line"><span style="color:#6F42C1;">etcdctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">version:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3.5</span><span style="color:#032F62;">.12</span></span>
<span class="line"><span style="color:#6F42C1;">API</span><span style="color:#24292E;"> </span><span style="color:#032F62;">version:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3.5</span></span></code></pre></div><ul><li>部署其它节点</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">MasterNodes</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;kube-node-01 kube-node-02&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> NODE </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> $MasterNodes; </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> $NODE; </span><span style="color:#B392F0;">scp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin/etcd</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> $NODE</span><span style="color:#9ECBFF;">:/usr/local/bin/</span><span style="color:#E1E4E8;">; </span><span style="color:#F97583;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">MasterNodes</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;kube-node-01 kube-node-02&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> NODE </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> $MasterNodes; </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> $NODE; </span><span style="color:#6F42C1;">scp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin/etcd</span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> $NODE</span><span style="color:#032F62;">:/usr/local/bin/</span><span style="color:#24292E;">; </span><span style="color:#D73A49;">done</span></span></code></pre></div><h3 id="_3-5-2-配置证书" tabindex="-1">3.5.2 配置证书 <a class="header-anchor" href="#_3-5-2-配置证书" aria-label="Permalink to &quot;3.5.2 配置证书&quot;">​</a></h3><ul><li>创建证书目录和配置目录,<code>需要在部署etcd所在节点进行创建</code></li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">/etc/etcd/ssl/</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/etcd/cfg</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/lib/etcd</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/log/etcd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;">  </span><span style="color:#032F62;">/etc/etcd/ssl/</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/etcd/cfg</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/lib/etcd</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/log/etcd</span></span></code></pre></div><ul><li>配置CA证书,<code>只在master01上面执行</code></li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/etcd/ssl/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ca-config.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;signing&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;default&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    },</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;profiles&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;kubernetes&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;usages&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">            &quot;signing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            &quot;key encipherment&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            &quot;server auth&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            &quot;client auth&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        ],</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      }</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">  }</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd-ca-csr.json</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;CN&quot;: &quot;etcd&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#9ECBFF;">  },</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">    {</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;O&quot;: &quot;etcd&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;OU&quot;: &quot;Etcd Security&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">  ],</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;ca&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  }</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 ssl]# cfssl gencert -initca etcd-ca-csr.json </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cfssljson</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-bare</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/etcd/ssl/etcd-ca</span></span>
<span class="line"><span style="color:#B392F0;">2024/09/19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#9ECBFF;">:29:52</span><span style="color:#E1E4E8;"> [INFO] generating a new CA key and certificate from CSR</span></span>
<span class="line"><span style="color:#B392F0;">2024/09/19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#9ECBFF;">:29:52</span><span style="color:#E1E4E8;"> [INFO] generate received request</span></span>
<span class="line"><span style="color:#B392F0;">2024/09/19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#9ECBFF;">:29:52</span><span style="color:#E1E4E8;"> [INFO] received CSR</span></span>
<span class="line"><span style="color:#B392F0;">2024/09/19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#9ECBFF;">:29:52</span><span style="color:#E1E4E8;"> [INFO] generating key: rsa-2048</span></span>
<span class="line"><span style="color:#B392F0;">2024/09/19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#9ECBFF;">:29:52</span><span style="color:#E1E4E8;"> [INFO] encoded CSR</span></span>
<span class="line"><span style="color:#B392F0;">2024/09/19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#9ECBFF;">:29:52</span><span style="color:#E1E4E8;"> [INFO] signed certificate with serial number 120213013390660577809730590415784165837334607123</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/etcd/ssl/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ca-config.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">  &quot;signing&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">    &quot;default&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">      &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#032F62;">    },</span></span>
<span class="line"><span style="color:#032F62;">    &quot;profiles&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">      &quot;kubernetes&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">        &quot;usages&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">            &quot;signing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">            &quot;key encipherment&quot;,</span></span>
<span class="line"><span style="color:#032F62;">            &quot;server auth&quot;,</span></span>
<span class="line"><span style="color:#032F62;">            &quot;client auth&quot;</span></span>
<span class="line"><span style="color:#032F62;">        ],</span></span>
<span class="line"><span style="color:#032F62;">        &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#032F62;">      }</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">  }</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd-ca-csr.json</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">  &quot;CN&quot;: &quot;etcd&quot;,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#032F62;">  },</span></span>
<span class="line"><span style="color:#032F62;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">    {</span></span>
<span class="line"><span style="color:#032F62;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;O&quot;: &quot;etcd&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;OU&quot;: &quot;Etcd Security&quot;</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">  ],</span></span>
<span class="line"><span style="color:#032F62;">  &quot;ca&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">    &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#032F62;">  }</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 ssl]# cfssl gencert -initca etcd-ca-csr.json </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cfssljson</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-bare</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/etcd/ssl/etcd-ca</span></span>
<span class="line"><span style="color:#6F42C1;">2024/09/19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#032F62;">:29:52</span><span style="color:#24292E;"> [INFO] generating a new CA key and certificate from CSR</span></span>
<span class="line"><span style="color:#6F42C1;">2024/09/19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#032F62;">:29:52</span><span style="color:#24292E;"> [INFO] generate received request</span></span>
<span class="line"><span style="color:#6F42C1;">2024/09/19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#032F62;">:29:52</span><span style="color:#24292E;"> [INFO] received CSR</span></span>
<span class="line"><span style="color:#6F42C1;">2024/09/19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#032F62;">:29:52</span><span style="color:#24292E;"> [INFO] generating key: rsa-2048</span></span>
<span class="line"><span style="color:#6F42C1;">2024/09/19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#032F62;">:29:52</span><span style="color:#24292E;"> [INFO] encoded CSR</span></span>
<span class="line"><span style="color:#6F42C1;">2024/09/19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#032F62;">:29:52</span><span style="color:#24292E;"> [INFO] signed certificate with serial number 120213013390660577809730590415784165837334607123</span></span></code></pre></div><ul><li>自签CA签发Etcd HTTPS证书</li></ul><p>创建证书申请文件</p><p><code>文件hosts字段中IP为所有etcd节点的集群内部通信IP，不要漏了！为了方便后期扩容可以多写几个ip预留扩容</code></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd-csr.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;CN&quot;: &quot;etcd&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#9ECBFF;">  },</span></span>
<span class="line"><span style="color:#9ECBFF;"> &quot;hosts&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;127.0.0.1&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;kube-master-01&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;kube-node-02&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;kube-node-01&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;10.103.236.150&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;10.103.236.151&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;10.103.236.152&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">    {</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;O&quot;: &quot;etcd&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;OU&quot;: &quot;Etcd Security&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">  ]</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成证书</span></span>
<span class="line"><span style="color:#B392F0;">cfssl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gencert</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-ca=/etc/etcd/ssl/etcd-ca.pem</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-ca-key=/etc/etcd/ssl/etcd-ca-key.pem</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-config=ca-config.json</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-profile=kubernetes</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">etcd-csr.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cfssljson</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-bare</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/etcd/ssl/etcd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#B392F0;">ls</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-thl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd</span><span style="color:#79B8FF;">*</span></span>
<span class="line"><span style="color:#B392F0;">-rw-r--r--</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1017</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">9</span><span style="color:#9ECBFF;">月</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#9ECBFF;">:44</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd.csr</span></span>
<span class="line"><span style="color:#B392F0;">-rw-r--r--</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">296</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">9</span><span style="color:#9ECBFF;">月</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#9ECBFF;">:35</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd-csr.json</span></span>
<span class="line"><span style="color:#B392F0;">-rw-------</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1675</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">9</span><span style="color:#9ECBFF;">月</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#9ECBFF;">:44</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd-key.pem</span></span>
<span class="line"><span style="color:#B392F0;">-rw-r--r--</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1346</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">9</span><span style="color:#9ECBFF;">月</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#9ECBFF;">:44</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd.pem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd-csr.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">  &quot;CN&quot;: &quot;etcd&quot;,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#032F62;">  },</span></span>
<span class="line"><span style="color:#032F62;"> &quot;hosts&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">    &quot;127.0.0.1&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;kube-master-01&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;kube-node-02&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;kube-node-01&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;10.103.236.150&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;10.103.236.151&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;10.103.236.152&quot;</span></span>
<span class="line"><span style="color:#032F62;">    ],</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">    {</span></span>
<span class="line"><span style="color:#032F62;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;O&quot;: &quot;etcd&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;OU&quot;: &quot;Etcd Security&quot;</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">  ]</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成证书</span></span>
<span class="line"><span style="color:#6F42C1;">cfssl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gencert</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-ca=/etc/etcd/ssl/etcd-ca.pem</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-ca-key=/etc/etcd/ssl/etcd-ca-key.pem</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-config=ca-config.json</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-profile=kubernetes</span><span style="color:#24292E;">  </span><span style="color:#032F62;">etcd-csr.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cfssljson</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-bare</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/etcd/ssl/etcd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#6F42C1;">ls</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-thl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd</span><span style="color:#005CC5;">*</span></span>
<span class="line"><span style="color:#6F42C1;">-rw-r--r--</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1017</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">9</span><span style="color:#032F62;">月</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#032F62;">:44</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd.csr</span></span>
<span class="line"><span style="color:#6F42C1;">-rw-r--r--</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">296</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">9</span><span style="color:#032F62;">月</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#032F62;">:35</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd-csr.json</span></span>
<span class="line"><span style="color:#6F42C1;">-rw-------</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1675</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">9</span><span style="color:#032F62;">月</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#032F62;">:44</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd-key.pem</span></span>
<span class="line"><span style="color:#6F42C1;">-rw-r--r--</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1346</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">9</span><span style="color:#032F62;">月</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#032F62;">:44</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd.pem</span></span></code></pre></div><h3 id="_3-5-3-配置etcd文件" tabindex="-1">3.5.3 配置etcd文件 <a class="header-anchor" href="#_3-5-3-配置etcd文件" aria-label="Permalink to &quot;3.5.3 配置etcd文件&quot;">​</a></h3><p>在master-01上执行，然后把生成的文件拷贝到其他etcd集群主机,<code>修改name(主机名字)和ip</code></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/etcd/cfg/etcd.yml</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">name: &#39;kube-master-01&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">data-dir: /var/lib/etcd</span></span>
<span class="line"><span style="color:#9ECBFF;">snapshot-count: 5000</span></span>
<span class="line"><span style="color:#9ECBFF;">heartbeat-interval: 100</span></span>
<span class="line"><span style="color:#9ECBFF;">election-timeout: 1000</span></span>
<span class="line"><span style="color:#9ECBFF;">quota-backend-bytes: 8589934592  # 设置为 8GB 或根据需要调整</span></span>
<span class="line"><span style="color:#9ECBFF;">listen-peer-urls: &#39;https://10.103.236.150:2380&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">listen-client-urls: &#39;https://10.103.236.150:2379,http://127.0.0.1:2379&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">max-snapshots: 3</span></span>
<span class="line"><span style="color:#9ECBFF;">max-wals: 5</span></span>
<span class="line"><span style="color:#9ECBFF;">initial-advertise-peer-urls: &#39;https://10.103.236.150:2380&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">advertise-client-urls: &#39;https://10.103.236.150:2379&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">initial-cluster: &#39;kube-master-01=https://10.103.236.150:2380,kube-node-01=https://10.103.236.151:2380,kube-node-02=https://10.103.236.152:2380&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">initial-cluster-token: &#39;etcd-k8s-cluster&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">initial-cluster-state: &#39;new&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">strict-reconfig-check: false</span></span>
<span class="line"><span style="color:#9ECBFF;">enable-v2: false  # 推荐关闭</span></span>
<span class="line"><span style="color:#9ECBFF;">enable-pprof: true</span></span>
<span class="line"><span style="color:#9ECBFF;">proxy: &#39;off&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">proxy-failure-wait: 5000</span></span>
<span class="line"><span style="color:#9ECBFF;">proxy-refresh-interval: 30000</span></span>
<span class="line"><span style="color:#9ECBFF;">proxy-dial-timeout: 1000</span></span>
<span class="line"><span style="color:#9ECBFF;">proxy-write-timeout: 5000</span></span>
<span class="line"><span style="color:#9ECBFF;">proxy-read-timeout: 0</span></span>
<span class="line"><span style="color:#9ECBFF;">client-transport-security:</span></span>
<span class="line"><span style="color:#9ECBFF;">  cert-file: &#39;/etc/etcd/ssl/etcd.pem&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">  key-file: &#39;/etc/etcd/ssl/etcd-key.pem&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">  client-cert-auth: true</span></span>
<span class="line"><span style="color:#9ECBFF;">  trusted-ca-file: &#39;/etc/etcd/ssl/etcd-ca.pem&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">  auto-tls: true</span></span>
<span class="line"><span style="color:#9ECBFF;">peer-transport-security:</span></span>
<span class="line"><span style="color:#9ECBFF;">  cert-file: &#39;/etc/etcd/ssl/etcd.pem&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">  key-file: &#39;/etc/etcd/ssl/etcd-key.pem&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">  peer-client-cert-auth: true</span></span>
<span class="line"><span style="color:#9ECBFF;">  trusted-ca-file: &#39;/etc/etcd/ssl/etcd-ca.pem&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">  auto-tls: true</span></span>
<span class="line"><span style="color:#9ECBFF;">log-outputs: [&quot;/var/log/etcd/etcd.log&quot;]</span></span>
<span class="line"><span style="color:#9ECBFF;">force-new-cluster: false</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/etcd/cfg/etcd.yml</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">name: &#39;kube-master-01&#39;</span></span>
<span class="line"><span style="color:#032F62;">data-dir: /var/lib/etcd</span></span>
<span class="line"><span style="color:#032F62;">snapshot-count: 5000</span></span>
<span class="line"><span style="color:#032F62;">heartbeat-interval: 100</span></span>
<span class="line"><span style="color:#032F62;">election-timeout: 1000</span></span>
<span class="line"><span style="color:#032F62;">quota-backend-bytes: 8589934592  # 设置为 8GB 或根据需要调整</span></span>
<span class="line"><span style="color:#032F62;">listen-peer-urls: &#39;https://10.103.236.150:2380&#39;</span></span>
<span class="line"><span style="color:#032F62;">listen-client-urls: &#39;https://10.103.236.150:2379,http://127.0.0.1:2379&#39;</span></span>
<span class="line"><span style="color:#032F62;">max-snapshots: 3</span></span>
<span class="line"><span style="color:#032F62;">max-wals: 5</span></span>
<span class="line"><span style="color:#032F62;">initial-advertise-peer-urls: &#39;https://10.103.236.150:2380&#39;</span></span>
<span class="line"><span style="color:#032F62;">advertise-client-urls: &#39;https://10.103.236.150:2379&#39;</span></span>
<span class="line"><span style="color:#032F62;">initial-cluster: &#39;kube-master-01=https://10.103.236.150:2380,kube-node-01=https://10.103.236.151:2380,kube-node-02=https://10.103.236.152:2380&#39;</span></span>
<span class="line"><span style="color:#032F62;">initial-cluster-token: &#39;etcd-k8s-cluster&#39;</span></span>
<span class="line"><span style="color:#032F62;">initial-cluster-state: &#39;new&#39;</span></span>
<span class="line"><span style="color:#032F62;">strict-reconfig-check: false</span></span>
<span class="line"><span style="color:#032F62;">enable-v2: false  # 推荐关闭</span></span>
<span class="line"><span style="color:#032F62;">enable-pprof: true</span></span>
<span class="line"><span style="color:#032F62;">proxy: &#39;off&#39;</span></span>
<span class="line"><span style="color:#032F62;">proxy-failure-wait: 5000</span></span>
<span class="line"><span style="color:#032F62;">proxy-refresh-interval: 30000</span></span>
<span class="line"><span style="color:#032F62;">proxy-dial-timeout: 1000</span></span>
<span class="line"><span style="color:#032F62;">proxy-write-timeout: 5000</span></span>
<span class="line"><span style="color:#032F62;">proxy-read-timeout: 0</span></span>
<span class="line"><span style="color:#032F62;">client-transport-security:</span></span>
<span class="line"><span style="color:#032F62;">  cert-file: &#39;/etc/etcd/ssl/etcd.pem&#39;</span></span>
<span class="line"><span style="color:#032F62;">  key-file: &#39;/etc/etcd/ssl/etcd-key.pem&#39;</span></span>
<span class="line"><span style="color:#032F62;">  client-cert-auth: true</span></span>
<span class="line"><span style="color:#032F62;">  trusted-ca-file: &#39;/etc/etcd/ssl/etcd-ca.pem&#39;</span></span>
<span class="line"><span style="color:#032F62;">  auto-tls: true</span></span>
<span class="line"><span style="color:#032F62;">peer-transport-security:</span></span>
<span class="line"><span style="color:#032F62;">  cert-file: &#39;/etc/etcd/ssl/etcd.pem&#39;</span></span>
<span class="line"><span style="color:#032F62;">  key-file: &#39;/etc/etcd/ssl/etcd-key.pem&#39;</span></span>
<span class="line"><span style="color:#032F62;">  peer-client-cert-auth: true</span></span>
<span class="line"><span style="color:#032F62;">  trusted-ca-file: &#39;/etc/etcd/ssl/etcd-ca.pem&#39;</span></span>
<span class="line"><span style="color:#032F62;">  auto-tls: true</span></span>
<span class="line"><span style="color:#032F62;">log-outputs: [&quot;/var/log/etcd/etcd.log&quot;]</span></span>
<span class="line"><span style="color:#032F62;">force-new-cluster: false</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><ul><li>复制ssl证书和配置文件到其他etcd所在节点</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 ssl]# Master=</span><span style="color:#9ECBFF;">&#39;kube-node-02 kube-node-01&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> NODE </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> $Master; </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ssh</span><span style="color:#E1E4E8;"> $NODE </span><span style="color:#9ECBFF;">&quot;mkdir -p /etc/etcd/ssl&quot;</span><span style="color:#E1E4E8;">; </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> FILE </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> etcd-ca-key.pem  etcd-ca.pem  etcd-key.pem  etcd.pem; </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">scp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/etcd/ssl/</span><span style="color:#E1E4E8;">\${FILE} $NODE</span><span style="color:#9ECBFF;">:/etc/etcd/ssl/</span><span style="color:#E1E4E8;">\${FILE}; </span><span style="color:#F97583;">done</span><span style="color:#E1E4E8;">; </span><span style="color:#F97583;">done</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#复制配置文件</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 cfg]# cd /etc/etcd/cfg/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 cfg]# scp etcd.yml kube-node-01:/etc/etcd/cfg/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 cfg]# scp etcd.yml kube-node-02:/etc/etcd/cfg/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master-01 ssl]# Master=</span><span style="color:#032F62;">&#39;kube-node-02 kube-node-01&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> NODE </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> $Master; </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ssh</span><span style="color:#24292E;"> $NODE </span><span style="color:#032F62;">&quot;mkdir -p /etc/etcd/ssl&quot;</span><span style="color:#24292E;">; </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> FILE </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> etcd-ca-key.pem  etcd-ca.pem  etcd-key.pem  etcd.pem; </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">scp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/etcd/ssl/</span><span style="color:#24292E;">\${FILE} $NODE</span><span style="color:#032F62;">:/etc/etcd/ssl/</span><span style="color:#24292E;">\${FILE}; </span><span style="color:#D73A49;">done</span><span style="color:#24292E;">; </span><span style="color:#D73A49;">done</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#复制配置文件</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 cfg]# cd /etc/etcd/cfg/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 cfg]# scp etcd.yml kube-node-01:/etc/etcd/cfg/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 cfg]# scp etcd.yml kube-node-02:/etc/etcd/cfg/</span></span></code></pre></div><ul><li>修改name和ip</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vim /etc/etcd/cfg/etcd.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vim /etc/etcd/cfg/etcd.yml</span></span></code></pre></div><h3 id="_3-5-4-配置unit文件" tabindex="-1">3.5.4 配置unit文件 <a class="header-anchor" href="#_3-5-4-配置unit文件" aria-label="Permalink to &quot;3.5.4 配置unit文件&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/lib/systemd/system/etcd.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Etcd Service</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://coreos.com/etcd/docs/v3.5.12/</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network.target</span></span>
<span class="line"><span style="color:#9ECBFF;">Wants=network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">Type=notify</span></span>
<span class="line"><span style="color:#9ECBFF;">Delegate=yes</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/local/bin/etcd --config-file=/etc/etcd/cfg/etcd.yml</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=always</span></span>
<span class="line"><span style="color:#9ECBFF;">RestartSec=10</span></span>
<span class="line"><span style="color:#9ECBFF;">TimeoutStartSec=300</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#9ECBFF;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">OOMScoreAdjust=-999</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">Alias=etcd3.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/lib/systemd/system/etcd.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=Etcd Service</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://coreos.com/etcd/docs/v3.5.12/</span></span>
<span class="line"><span style="color:#032F62;">After=network.target</span></span>
<span class="line"><span style="color:#032F62;">Wants=network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">Type=notify</span></span>
<span class="line"><span style="color:#032F62;">Delegate=yes</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/local/bin/etcd --config-file=/etc/etcd/cfg/etcd.yml</span></span>
<span class="line"><span style="color:#032F62;">Restart=always</span></span>
<span class="line"><span style="color:#032F62;">RestartSec=10</span></span>
<span class="line"><span style="color:#032F62;">TimeoutStartSec=300</span></span>
<span class="line"><span style="color:#032F62;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#032F62;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#032F62;">OOMScoreAdjust=-999</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">Alias=etcd3.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><ul><li>启动服务</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd</span></span></code></pre></div><ul><li>验证</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> ETCDCTL_API</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#B392F0;">etcdctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--endpoints=</span><span style="color:#9ECBFF;">&quot;10.103.236.150:2379,10.103.236.151:2379,10.103.236.152:2379&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--cacert=/etc/etcd/ssl/etcd-ca.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--cert=/etc/etcd/ssl/etcd.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--key=/etc/etcd/ssl/etcd-key.pem</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">endpoint</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--write-out=table</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> ETCDCTL_API</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#6F42C1;">etcdctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--endpoints=</span><span style="color:#032F62;">&quot;10.103.236.150:2379,10.103.236.151:2379,10.103.236.152:2379&quot;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--cacert=/etc/etcd/ssl/etcd-ca.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--cert=/etc/etcd/ssl/etcd.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--key=/etc/etcd/ssl/etcd-key.pem</span><span style="color:#24292E;">  </span><span style="color:#032F62;">endpoint</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--write-out=table</span></span></code></pre></div><h2 id="_3-6-部署kubernetes组件" tabindex="-1">3.6 部署kubernetes组件 <a class="header-anchor" href="#_3-6-部署kubernetes组件" aria-label="Permalink to &quot;3.6 部署kubernetes组件&quot;">​</a></h2><blockquote><p>二进制安装,master节点默认是没有污点, kubeadm安装则有污点</p></blockquote><h3 id="_3-6-1-master节点-所有master节点" tabindex="-1">3.6.1 master节点-所有master节点 <a class="header-anchor" href="#_3-6-1-master节点-所有master节点" aria-label="Permalink to &quot;3.6.1 master节点-所有master节点&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#解压</span></span>
<span class="line"><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-xf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubernetes-server-linux-amd64.tar.gz</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--strip-components=3</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-C</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubernetes/server/bin/kube{let,ctl,-apiserver,-controller-manager,-scheduler,-proxy}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#验证</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 init_pack]# kubectl version</span></span>
<span class="line"><span style="color:#B392F0;">Client</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Version:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v1.29.7</span></span>
<span class="line"><span style="color:#B392F0;">Kustomize</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Version:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v5.0.4-0.20230601165947-6ce0bf390ce3</span></span>
<span class="line"><span style="color:#B392F0;">The</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">connection</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">the</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">localhost:8080</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">was</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">refused</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">did</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">you</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">specify</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">the</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">right</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">host</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">or</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">port?</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#解压</span></span>
<span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-xf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubernetes-server-linux-amd64.tar.gz</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--strip-components=3</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-C</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubernetes/server/bin/kube{let,ctl,-apiserver,-controller-manager,-scheduler,-proxy}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#验证</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 init_pack]# kubectl version</span></span>
<span class="line"><span style="color:#6F42C1;">Client</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Version:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v1.29.7</span></span>
<span class="line"><span style="color:#6F42C1;">Kustomize</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Version:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v5.0.4-0.20230601165947-6ce0bf390ce3</span></span>
<span class="line"><span style="color:#6F42C1;">The</span><span style="color:#24292E;"> </span><span style="color:#032F62;">connection</span><span style="color:#24292E;"> </span><span style="color:#032F62;">to</span><span style="color:#24292E;"> </span><span style="color:#032F62;">the</span><span style="color:#24292E;"> </span><span style="color:#032F62;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">localhost:8080</span><span style="color:#24292E;"> </span><span style="color:#032F62;">was</span><span style="color:#24292E;"> </span><span style="color:#032F62;">refused</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">did</span><span style="color:#24292E;"> </span><span style="color:#032F62;">you</span><span style="color:#24292E;"> </span><span style="color:#032F62;">specify</span><span style="color:#24292E;"> </span><span style="color:#032F62;">the</span><span style="color:#24292E;"> </span><span style="color:#032F62;">right</span><span style="color:#24292E;"> </span><span style="color:#032F62;">host</span><span style="color:#24292E;"> </span><span style="color:#032F62;">or</span><span style="color:#24292E;"> </span><span style="color:#032F62;">port?</span></span></code></pre></div><p>如果有其它master节点</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">MasterNodes</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;kube-master-02 kube-master-03&#39;</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> NODE </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> $MasterNodes; </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> $NODE; </span><span style="color:#B392F0;">scp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin/kube{let,ctl,-apiserver,-controller-manager,-scheduler,-proxy}</span><span style="color:#E1E4E8;"> $NODE</span><span style="color:#9ECBFF;">:/usr/local/bin/</span><span style="color:#E1E4E8;">; </span><span style="color:#F97583;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">MasterNodes</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;kube-master-02 kube-master-03&#39;</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> NODE </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> $MasterNodes; </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> $NODE; </span><span style="color:#6F42C1;">scp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin/kube{let,ctl,-apiserver,-controller-manager,-scheduler,-proxy}</span><span style="color:#24292E;"> $NODE</span><span style="color:#032F62;">:/usr/local/bin/</span><span style="color:#24292E;">; </span><span style="color:#D73A49;">done</span></span></code></pre></div><h4 id="_1-0-生成k8s所需证书" tabindex="-1">1.0 生成k8s所需证书 <a class="header-anchor" href="#_1-0-生成k8s所需证书" aria-label="Permalink to &quot;1.0 生成k8s所需证书&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#所有节点操作</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#所有节点操作</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki</span></span></code></pre></div><h5 id="_1-生成ca" tabindex="-1">1.生成ca <a class="header-anchor" href="#_1-生成ca" aria-label="Permalink to &quot;1.生成ca&quot;">​</a></h5><ul><li>创建ca-csr文件</li></ul><p><code>自签证书颁发机构（CA）,只在master其中一个节点执行</code></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#master01 节点生成 k8s 证书, 写入生成证书所需的配置文件</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ca-csr.json</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;CN&quot;: &quot;kubernetes&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#9ECBFF;">  },</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">    {</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;O&quot;: &quot;Kubernetes&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;OU&quot;: &quot;Kubernetes-manual&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">  ],</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;ca&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  }</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#Kubernetes 使用证书中的 &#39;subject&#39; 的通用名称（Common Name）字段（例如，&quot;/CN=kubernetes&quot;）来 确定用户名， Kubernetes使用证书中的 &#39;subject&#39; 的单位名称 (Organization Name) 字段（例如，&quot;/O=system:masters&quot;）来确定用户组</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#master01 节点生成 k8s 证书, 写入生成证书所需的配置文件</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ca-csr.json</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">  &quot;CN&quot;: &quot;kubernetes&quot;,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#032F62;">  },</span></span>
<span class="line"><span style="color:#032F62;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">    {</span></span>
<span class="line"><span style="color:#032F62;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;O&quot;: &quot;Kubernetes&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;OU&quot;: &quot;Kubernetes-manual&quot;</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">  ],</span></span>
<span class="line"><span style="color:#032F62;">  &quot;ca&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">    &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#032F62;">  }</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#Kubernetes 使用证书中的 &#39;subject&#39; 的通用名称（Common Name）字段（例如，&quot;/CN=kubernetes&quot;）来 确定用户名， Kubernetes使用证书中的 &#39;subject&#39; 的单位名称 (Organization Name) 字段（例如，&quot;/O=system:masters&quot;）来确定用户组</span></span></code></pre></div><ul><li>生成证书</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 pki]# cfssl gencert -initca ca-csr.json </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cfssljson</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-bare</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki/ca</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master-01 pki]# cfssl gencert -initca ca-csr.json </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cfssljson</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-bare</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki/ca</span></span></code></pre></div><h5 id="_2-签发apiserver" tabindex="-1">2.签发apiserver <a class="header-anchor" href="#_2-签发apiserver" aria-label="Permalink to &quot;2.签发apiserver&quot;">​</a></h5><ul><li>创建apiserver-csr</li></ul><p><code>hosts字段中IP为所有集群成员的ip集群内部ip，一个都不能少！为了方便后期扩容可以多写几个预留的IP或者domain</code></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apiserver-csr.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;CN&quot;: &quot;kube-apiserver&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;hosts&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;127.0.0.1&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;10.0.0.1&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;10.255.0.1&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;192.168.0.1&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;10.103.236.150&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;kubernetes&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;kubernetes.default&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;kubernetes.default.svc&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;kubernetes.default.svc.cluster&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;kubernetes.default.svc.cluster.local&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;10.103.236.151&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;10.103.236.152&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    ],</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#9ECBFF;">  },</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">    {</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;O&quot;: &quot;Kubernetes&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;OU&quot;: &quot;Kubernetes-manual&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">  ]</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ca-config.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;signing&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;default&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    },</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;profiles&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;kubernetes&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;usages&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">            &quot;signing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            &quot;key encipherment&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            &quot;server auth&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">            &quot;client auth&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        ],</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      }</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">  }</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># signing：表示该证书可用于签名其它证书；生成的 .pem 证书文件中 CA=TRUE</span></span>
<span class="line"><span style="color:#6A737D;"># expiry：默认的证书到期时间为50年,876000h为100年</span></span>
<span class="line"><span style="color:#6A737D;"># profiles：包含了server auth和client auth，所以可以签发三种不同类型证书；expiry 证书有效期，默认50年，可以定义多个profile</span></span>
<span class="line"><span style="color:#6A737D;"># kubernetes：kubernetes这个名字可以自定义，后续指定profiles时要一致，这就是一个单个的profile</span></span>
<span class="line"><span style="color:#6A737D;"># server auth：表示client可以用该 CA 对server提供的证书进行验证</span></span>
<span class="line"><span style="color:#6A737D;"># client auth：表示server可以用该CA对client提供的证书进行验证</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apiserver-csr.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">  &quot;CN&quot;: &quot;kube-apiserver&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;hosts&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">        &quot;127.0.0.1&quot;,</span></span>
<span class="line"><span style="color:#032F62;">        &quot;10.0.0.1&quot;,</span></span>
<span class="line"><span style="color:#032F62;">        &quot;10.255.0.1&quot;,</span></span>
<span class="line"><span style="color:#032F62;">        &quot;192.168.0.1&quot;,</span></span>
<span class="line"><span style="color:#032F62;">        &quot;10.103.236.150&quot;,</span></span>
<span class="line"><span style="color:#032F62;">        &quot;kubernetes&quot;,</span></span>
<span class="line"><span style="color:#032F62;">        &quot;kubernetes.default&quot;,</span></span>
<span class="line"><span style="color:#032F62;">        &quot;kubernetes.default.svc&quot;,</span></span>
<span class="line"><span style="color:#032F62;">        &quot;kubernetes.default.svc.cluster&quot;,</span></span>
<span class="line"><span style="color:#032F62;">        &quot;kubernetes.default.svc.cluster.local&quot;,</span></span>
<span class="line"><span style="color:#032F62;">        &quot;10.103.236.151&quot;,</span></span>
<span class="line"><span style="color:#032F62;">        &quot;10.103.236.152&quot;</span></span>
<span class="line"><span style="color:#032F62;">    ],</span></span>
<span class="line"><span style="color:#032F62;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#032F62;">  },</span></span>
<span class="line"><span style="color:#032F62;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">    {</span></span>
<span class="line"><span style="color:#032F62;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;O&quot;: &quot;Kubernetes&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;OU&quot;: &quot;Kubernetes-manual&quot;</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">  ]</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ca-config.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">  &quot;signing&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">    &quot;default&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">      &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#032F62;">    },</span></span>
<span class="line"><span style="color:#032F62;">    &quot;profiles&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">      &quot;kubernetes&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">        &quot;usages&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">            &quot;signing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">            &quot;key encipherment&quot;,</span></span>
<span class="line"><span style="color:#032F62;">            &quot;server auth&quot;,</span></span>
<span class="line"><span style="color:#032F62;">            &quot;client auth&quot;</span></span>
<span class="line"><span style="color:#032F62;">        ],</span></span>
<span class="line"><span style="color:#032F62;">        &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#032F62;">      }</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">  }</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># signing：表示该证书可用于签名其它证书；生成的 .pem 证书文件中 CA=TRUE</span></span>
<span class="line"><span style="color:#6A737D;"># expiry：默认的证书到期时间为50年,876000h为100年</span></span>
<span class="line"><span style="color:#6A737D;"># profiles：包含了server auth和client auth，所以可以签发三种不同类型证书；expiry 证书有效期，默认50年，可以定义多个profile</span></span>
<span class="line"><span style="color:#6A737D;"># kubernetes：kubernetes这个名字可以自定义，后续指定profiles时要一致，这就是一个单个的profile</span></span>
<span class="line"><span style="color:#6A737D;"># server auth：表示client可以用该 CA 对server提供的证书进行验证</span></span>
<span class="line"><span style="color:#6A737D;"># client auth：表示server可以用该CA对client提供的证书进行验证</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>&quot;192.168.0.1&quot;为咱们的svc网段的第一个地址，您需要根据自己的场景稍作修改。</p><p>&quot;10.103.236.158&quot;是负载均衡器的VIP地址。如果没有请用eth0地址</p><p>&quot;kubernetes,...,kubernetes.default.svc.cluster.loca&quot;对应的是apiServer解析的A记录。</p><p>&quot;10.103.236.151,...,10.103.236.152&quot;对应的是K8S集群的地址。这里也可以多预留几个,后期扩容</p></div><ul><li>生成证书</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 pki]# cfssl gencert   -ca=/etc/kubernetes/pki/ca.pem -ca-key=/etc/kubernetes/pki/ca-key.pem  -config=ca-config.json -profile=kubernetes   apiserver-csr.json </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cfssljson</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-bare</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki/apiserver</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master-01 pki]# cfssl gencert   -ca=/etc/kubernetes/pki/ca.pem -ca-key=/etc/kubernetes/pki/ca-key.pem  -config=ca-config.json -profile=kubernetes   apiserver-csr.json </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cfssljson</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-bare</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki/apiserver</span></span></code></pre></div><h5 id="_3-生成-apiserver-聚合证书" tabindex="-1">3.生成 apiserver 聚合证书 <a class="header-anchor" href="#_3-生成-apiserver-聚合证书" aria-label="Permalink to &quot;3.生成 apiserver 聚合证书&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">front-proxy-ca-csr.json</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;CN&quot;: &quot;kubernetes&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">     &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">     &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#9ECBFF;">  },</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;ca&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  }</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成</span></span>
<span class="line"><span style="color:#B392F0;">cfssl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gencert</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-initca</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">front-proxy-ca-csr.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cfssljson</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-bare</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki/front-proxy-ca</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">front-proxy-client-csr.json</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;CN&quot;: &quot;front-proxy-client&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">     &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">     &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#9ECBFF;">  }</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cfssl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gencert</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">-ca=/etc/kubernetes/pki/front-proxy-ca.pem   </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">-ca-key=/etc/kubernetes/pki/front-proxy-ca-key.pem   </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">-config=ca-config.json   </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">-profile=kubernetes   </span><span style="color:#9ECBFF;">front-proxy-client-csr.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cfssljson</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-bare</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki/front-proxy-client</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">front-proxy-ca-csr.json</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">  &quot;CN&quot;: &quot;kubernetes&quot;,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">     &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#032F62;">     &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#032F62;">  },</span></span>
<span class="line"><span style="color:#032F62;">  &quot;ca&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">    &quot;expiry&quot;: &quot;876000h&quot;</span></span>
<span class="line"><span style="color:#032F62;">  }</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成</span></span>
<span class="line"><span style="color:#6F42C1;">cfssl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gencert</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">-initca</span><span style="color:#24292E;"> </span><span style="color:#032F62;">front-proxy-ca-csr.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cfssljson</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-bare</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki/front-proxy-ca</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">front-proxy-client-csr.json</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">  &quot;CN&quot;: &quot;front-proxy-client&quot;,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">     &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#032F62;">     &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#032F62;">  }</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cfssl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gencert</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">-ca=/etc/kubernetes/pki/front-proxy-ca.pem   </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">-ca-key=/etc/kubernetes/pki/front-proxy-ca-key.pem   </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">-config=ca-config.json   </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">-profile=kubernetes   </span><span style="color:#032F62;">front-proxy-client-csr.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cfssljson</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-bare</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki/front-proxy-client</span></span></code></pre></div><h5 id="_4-签发controller-manage" tabindex="-1">4.签发controller-manage <a class="header-anchor" href="#_4-签发controller-manage" aria-label="Permalink to &quot;4.签发controller-manage&quot;">​</a></h5><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>注意：节点hosts ip根据所需设置即可。hosts 列表包含所有 kube-controller-manager 节点 IP； CN 为 system:kube- controller-manager</p><p>O 为 system:kube-controller-manager， kubernetes 内置的 ClusterRoleBindings system:kube-controller-manager 赋予 kube-controller-manager 工作所需的权限</p></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">manager-csr.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;CN&quot;: &quot;system:kube-controller-manager&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#9ECBFF;">  },</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">    {</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;O&quot;: &quot;system:kube-controller-manager&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;OU&quot;: &quot;Kubernetes-manual&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">  ]</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成</span></span>
<span class="line"><span style="color:#B392F0;">cfssl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gencert</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-ca=/etc/kubernetes/pki/ca.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-ca-key=/etc/kubernetes/pki/ca-key.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-config=ca-config.json</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-profile=kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">manager-csr.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cfssljson</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-bare</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki/controller-manager</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">manager-csr.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">  &quot;CN&quot;: &quot;system:kube-controller-manager&quot;,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#032F62;">  },</span></span>
<span class="line"><span style="color:#032F62;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">    {</span></span>
<span class="line"><span style="color:#032F62;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;O&quot;: &quot;system:kube-controller-manager&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;OU&quot;: &quot;Kubernetes-manual&quot;</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">  ]</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成</span></span>
<span class="line"><span style="color:#6F42C1;">cfssl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gencert</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-ca=/etc/kubernetes/pki/ca.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-ca-key=/etc/kubernetes/pki/ca-key.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-config=ca-config.json</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-profile=kubernetes</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">manager-csr.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cfssljson</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-bare</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki/controller-manager</span></span></code></pre></div><ul><li>配置上下文</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#设置一个集群</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-cluster</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--certificate-authority=/etc/kubernetes/pki/ca.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--embed-certs=true</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--server=https://10.103.236.150:6443</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/controller-manager.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置一个用户项</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-context</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">system:kube-controller-manager@kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">--cluster=kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">--user=system:kube-controller-manager</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/controller-manager.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置一个上下文环境</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-credentials</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">system:kube-controller-manager</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">--client-certificate=/etc/kubernetes/pki/controller-manager.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">--client-key=/etc/kubernetes/pki/controller-manager-key.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">--embed-certs=true</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/controller-manager.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#使用默认的上下文    </span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">use-context</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">system:kube-controller-manager@kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/controller-manager.kubeconfig</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#设置一个集群</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-cluster</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubernetes</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--certificate-authority=/etc/kubernetes/pki/ca.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--embed-certs=true</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--server=https://10.103.236.150:6443</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/controller-manager.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置一个用户项</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-context</span><span style="color:#24292E;"> </span><span style="color:#032F62;">system:kube-controller-manager@kubernetes</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--cluster=kubernetes</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--user=system:kube-controller-manager</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/controller-manager.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置一个上下文环境</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-credentials</span><span style="color:#24292E;"> </span><span style="color:#032F62;">system:kube-controller-manager</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--client-certificate=/etc/kubernetes/pki/controller-manager.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--client-key=/etc/kubernetes/pki/controller-manager-key.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--embed-certs=true</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/controller-manager.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#使用默认的上下文    </span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">use-context</span><span style="color:#24292E;"> </span><span style="color:#032F62;">system:kube-controller-manager@kubernetes</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/controller-manager.kubeconfig</span></span></code></pre></div><h5 id="_5-签发kube-scheduler" tabindex="-1">5.签发kube-scheduler <a class="header-anchor" href="#_5-签发kube-scheduler" aria-label="Permalink to &quot;5.签发kube-scheduler&quot;">​</a></h5><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>注意：节点hostsip根据所需设置即可。hosts 列表包含所有 kube-scheduler 节点 IP；</p><p>CN 为 system:kube-scheduler、</p><p>O 为 system:kube-scheduler，kubernetes 内置的 ClusterRoleBindings system:kube-scheduler 将赋予 kube-scheduler 工作所需的权限</p></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">scheduler-csr.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;CN&quot;: &quot;system:kube-scheduler&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#9ECBFF;">  },</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">    {</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;O&quot;: &quot;system:kube-scheduler&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;OU&quot;: &quot;Kubernetes-manual&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">  ]</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成</span></span>
<span class="line"><span style="color:#B392F0;">cfssl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gencert</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-ca=/etc/kubernetes/pki/ca.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-ca-key=/etc/kubernetes/pki/ca-key.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-config=ca-config.json</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-profile=kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">scheduler-csr.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cfssljson</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-bare</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki/scheduler</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">scheduler-csr.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">  &quot;CN&quot;: &quot;system:kube-scheduler&quot;,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#032F62;">  },</span></span>
<span class="line"><span style="color:#032F62;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">    {</span></span>
<span class="line"><span style="color:#032F62;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;O&quot;: &quot;system:kube-scheduler&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;OU&quot;: &quot;Kubernetes-manual&quot;</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">  ]</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成</span></span>
<span class="line"><span style="color:#6F42C1;">cfssl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gencert</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-ca=/etc/kubernetes/pki/ca.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-ca-key=/etc/kubernetes/pki/ca-key.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-config=ca-config.json</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-profile=kubernetes</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">scheduler-csr.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cfssljson</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-bare</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki/scheduler</span></span></code></pre></div><ul><li>配置上下文</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-cluster</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--certificate-authority=/etc/kubernetes/pki/ca.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--embed-certs=true</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--server=https://10.103.236.150:6443</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/scheduler.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-credentials</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">system:kube-scheduler</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--client-certificate=/etc/kubernetes/pki/scheduler.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--client-key=/etc/kubernetes/pki/scheduler-key.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--embed-certs=true</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/scheduler.kubeconfig</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-context</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">system:kube-scheduler@kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--cluster=kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--user=system:kube-scheduler</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/scheduler.kubeconfig</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">use-context</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">system:kube-scheduler@kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/scheduler.kubeconfig</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-cluster</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubernetes</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--certificate-authority=/etc/kubernetes/pki/ca.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--embed-certs=true</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--server=https://10.103.236.150:6443</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/scheduler.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-credentials</span><span style="color:#24292E;"> </span><span style="color:#032F62;">system:kube-scheduler</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--client-certificate=/etc/kubernetes/pki/scheduler.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--client-key=/etc/kubernetes/pki/scheduler-key.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--embed-certs=true</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/scheduler.kubeconfig</span></span>
<span class="line"><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-context</span><span style="color:#24292E;"> </span><span style="color:#032F62;">system:kube-scheduler@kubernetes</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--cluster=kubernetes</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--user=system:kube-scheduler</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/scheduler.kubeconfig</span></span>
<span class="line"><span style="color:#24292E;">     </span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">use-context</span><span style="color:#24292E;"> </span><span style="color:#032F62;">system:kube-scheduler@kubernetes</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/scheduler.kubeconfig</span></span></code></pre></div><h5 id="_6-签发admin" tabindex="-1">6.签发admin <a class="header-anchor" href="#_6-签发admin" aria-label="Permalink to &quot;6.签发admin&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 生成 admin 的证书配置</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">admin-csr.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;CN&quot;: &quot;admin&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#9ECBFF;">  },</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">    {</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;O&quot;: &quot;system:masters&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;OU&quot;: &quot;Kubernetes-manual&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">  ]</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成</span></span>
<span class="line"><span style="color:#B392F0;">cfssl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gencert</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-ca=/etc/kubernetes/pki/ca.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-ca-key=/etc/kubernetes/pki/ca-key.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-config=ca-config.json</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-profile=kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">admin-csr.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cfssljson</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-bare</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki/admin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 生成 admin 的证书配置</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">admin-csr.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">  &quot;CN&quot;: &quot;admin&quot;,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#032F62;">  },</span></span>
<span class="line"><span style="color:#032F62;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">    {</span></span>
<span class="line"><span style="color:#032F62;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;O&quot;: &quot;system:masters&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;OU&quot;: &quot;Kubernetes-manual&quot;</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">  ]</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成</span></span>
<span class="line"><span style="color:#6F42C1;">cfssl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gencert</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-ca=/etc/kubernetes/pki/ca.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-ca-key=/etc/kubernetes/pki/ca-key.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-config=ca-config.json</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-profile=kubernetes</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">admin-csr.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cfssljson</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-bare</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki/admin</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>O: system:masters：kube-apiserver 收到使用该证书的客户端请求后，为请求添加组（Group）认证标识 system:masters；</p><p>预定义的 ClusterRoleBinding cluster-admin 将 Group system:masters 与 Role cluster-admin 绑定，该 Role 授予操作集群所需的最高权限；</p><p>&quot;hosts&quot;: [&quot;&quot;],该证书只会被 kubectl 当做 client 证书使用，所以 hosts 字段为空</p></div><ul><li>配置上下文</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-cluster</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubernetes</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--certificate-authority=/etc/kubernetes/pki/ca.pem</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--embed-certs=true</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--server=https://10.103.236.150:6443</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/admin.kubeconfig</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-credentials</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubernetes-admin</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--client-certificate=/etc/kubernetes/pki/admin.pem</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--client-key=/etc/kubernetes/pki/admin-key.pem</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--embed-certs=true</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/admin.kubeconfig</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-context</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubernetes-admin@kubernetes</span><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--cluster=kubernetes</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--user=kubernetes-admin</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/admin.kubeconfig</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">use-context</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubernetes-admin@kubernetes</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/admin.kubeconfig</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-cluster</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubernetes</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--certificate-authority=/etc/kubernetes/pki/ca.pem</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--embed-certs=true</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--server=https://10.103.236.150:6443</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/admin.kubeconfig</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-credentials</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubernetes-admin</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--client-certificate=/etc/kubernetes/pki/admin.pem</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--client-key=/etc/kubernetes/pki/admin-key.pem</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--embed-certs=true</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/admin.kubeconfig</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-context</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubernetes-admin@kubernetes</span><span style="color:#24292E;">    </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--cluster=kubernetes</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--user=kubernetes-admin</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/admin.kubeconfig</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">use-context</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubernetes-admin@kubernetes</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/admin.kubeconfig</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>--certificate-authority：验证 kube-apiserver 证书的根证书；</p><p>--client-certificate、--client-key：刚生成的 admin 证书和私钥，与 kube-apiserver https 通信时使用；</p><p>--embed-certs=true：将 ca.pem 和 admin.pem 证书内容嵌入到生成的 kubectl.kubeconfig 文件中(否则，写入的是证书文件路径，后续拷贝 kubeconfig 到其它机器时，还需要单独拷贝证书文件，不方便。)；</p><p>--server：指定 kube-apiserver 的地址;</p></div><h5 id="_7-签发kube-proxy" tabindex="-1">7.签发kube-proxy <a class="header-anchor" href="#_7-签发kube-proxy" aria-label="Permalink to &quot;7.签发kube-proxy&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 创建 kube-proxy 证书</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-proxy-csr.json</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;CN&quot;: &quot;system:kube-proxy&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#9ECBFF;">  },</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">    {</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;O&quot;: &quot;system:kube-proxy&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">      &quot;OU&quot;: &quot;Kubernetes-manual&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">  ]</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cfssl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gencert</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-ca=/etc/kubernetes/pki/ca.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-ca-key=/etc/kubernetes/pki/ca-key.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-config=ca-config.json</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-profile=kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">kube-proxy-csr.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cfssljson</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-bare</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki/kube-proxy</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 创建 kube-proxy 证书</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-proxy-csr.json</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">  &quot;CN&quot;: &quot;system:kube-proxy&quot;,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;key&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">    &quot;algo&quot;: &quot;rsa&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;size&quot;: 2048</span></span>
<span class="line"><span style="color:#032F62;">  },</span></span>
<span class="line"><span style="color:#032F62;">  &quot;names&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">    {</span></span>
<span class="line"><span style="color:#032F62;">      &quot;C&quot;: &quot;CN&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;ST&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;L&quot;: &quot;Beijing&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;O&quot;: &quot;system:kube-proxy&quot;,</span></span>
<span class="line"><span style="color:#032F62;">      &quot;OU&quot;: &quot;Kubernetes-manual&quot;</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">  ]</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cfssl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gencert</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-ca=/etc/kubernetes/pki/ca.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-ca-key=/etc/kubernetes/pki/ca-key.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-config=ca-config.json</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-profile=kubernetes</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">kube-proxy-csr.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cfssljson</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-bare</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki/kube-proxy</span></span></code></pre></div><ul><li>配置上下文</li></ul><blockquote><p>10.103.236.150 根据环境进行修改,如果有高可用,则这里修改成高可用ip地址</p></blockquote><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#设置一个集群</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-cluster</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubernetes</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--certificate-authority=/etc/kubernetes/pki/ca.pem</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--embed-certs=true</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--server=https://10.103.236.150:6443</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/kube-proxy.kubeconfig</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#6A737D;">#设置一个用户项</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-credentials</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-proxy</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--client-certificate=/etc/kubernetes/pki/kube-proxy.pem</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--client-key=/etc/kubernetes/pki/kube-proxy-key.pem</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--embed-certs=true</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/kube-proxy.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置一个上下文环境</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-context</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-proxy@kubernetes</span><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--cluster=kubernetes</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--user=kube-proxy</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/kube-proxy.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#使用默认的上下文</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">use-context</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-proxy@kubernetes</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--kubeconfig=/etc/kubernetes/kube-proxy.kubeconfig</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#设置一个集群</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-cluster</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubernetes</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--certificate-authority=/etc/kubernetes/pki/ca.pem</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--embed-certs=true</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--server=https://10.103.236.150:6443</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/kube-proxy.kubeconfig</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;">#设置一个用户项</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-credentials</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-proxy</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--client-certificate=/etc/kubernetes/pki/kube-proxy.pem</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--client-key=/etc/kubernetes/pki/kube-proxy-key.pem</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--embed-certs=true</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/kube-proxy.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置一个上下文环境</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-context</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-proxy@kubernetes</span><span style="color:#24292E;">    </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--cluster=kubernetes</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--user=kube-proxy</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/kube-proxy.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#使用默认的上下文</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">use-context</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-proxy@kubernetes</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--kubeconfig=/etc/kubernetes/kube-proxy.kubeconfig</span></span></code></pre></div><p>查看证书有效时间</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">find</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-type</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">f</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;*.pem&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">!</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;*key*&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-exec</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sh</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;echo &quot;File: {}&quot;; openssl x509 -noout -dates -in &quot;{}&quot;&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">find</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-type</span><span style="color:#24292E;"> </span><span style="color:#032F62;">f</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;*.pem&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">!</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;*key*&quot;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-exec</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sh</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;echo &quot;File: {}&quot;; openssl x509 -noout -dates -in &quot;{}&quot;&#39;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\;</span></span></code></pre></div><h5 id="_8-创建serviceaccount" tabindex="-1">8.创建ServiceAccount <a class="header-anchor" href="#_8-创建serviceaccount" aria-label="Permalink to &quot;8.创建ServiceAccount&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#ServiceAccount是k8s一种认证方式，创建ServiceAccount的时候会创建一个与之绑定的secret，这个secret会生成一个token</span></span>
<span class="line"><span style="color:#B392F0;">openssl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">genrsa</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-out</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki/sa.key</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2048</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#基于sa.key创建sa.pub</span></span>
<span class="line"><span style="color:#B392F0;">openssl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rsa</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-in</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki/sa.key</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-pubout</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-out</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki/sa.pub</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#ServiceAccount是k8s一种认证方式，创建ServiceAccount的时候会创建一个与之绑定的secret，这个secret会生成一个token</span></span>
<span class="line"><span style="color:#6F42C1;">openssl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">genrsa</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-out</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki/sa.key</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2048</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#基于sa.key创建sa.pub</span></span>
<span class="line"><span style="color:#6F42C1;">openssl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rsa</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-in</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki/sa.key</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-pubout</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-out</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki/sa.pub</span></span></code></pre></div><blockquote><p>分发到其它master节点上面</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 将证书发送到其他 master 节点</span></span>
<span class="line"><span style="color:#e1e4e8;"># 其他节点创建目录</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir  /etc/kubernetes/pki/ -p</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">for NODE in k8s-master02 k8s-master03; do  for FILE in $(ls /etc/kubernetes/pki | grep -v etcd); do  scp /etc/kubernetes/pki/\${FILE} $NODE:/etc/kubernetes/pki/\${FILE}; done;  for FILE in admin.kubeconfig controller-manager.kubeconfig scheduler.kubeconfig; do  scp /etc/kubernetes/\${FILE} $NODE:/etc/kubernetes/\${FILE}; done; done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 将证书发送到其他 master 节点</span></span>
<span class="line"><span style="color:#24292e;"># 其他节点创建目录</span></span>
<span class="line"><span style="color:#24292e;">mkdir  /etc/kubernetes/pki/ -p</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">for NODE in k8s-master02 k8s-master03; do  for FILE in $(ls /etc/kubernetes/pki | grep -v etcd); do  scp /etc/kubernetes/pki/\${FILE} $NODE:/etc/kubernetes/pki/\${FILE}; done;  for FILE in admin.kubeconfig controller-manager.kubeconfig scheduler.kubeconfig; do  scp /etc/kubernetes/\${FILE} $NODE:/etc/kubernetes/\${FILE}; done; done</span></span></code></pre></div></blockquote><h4 id="_1-1-kube-apiserver" tabindex="-1">1.1 kube-Apiserver <a class="header-anchor" href="#_1-1-kube-apiserver" aria-label="Permalink to &quot;1.1  kube-Apiserver&quot;">​</a></h4><p>所有Master节点创建kube-apiserver service</p><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>本文档使用的k8s service网段为192.168.0.0/16，该网段不能和宿主机的网段、Pod网段的重复，请按需修改</p></div><ul><li>所有节点执行</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/manifests/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/lib/kubelet</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/log/kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/cfg</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/manifests/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/lib/kubelet</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/log/kubernetes</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/cfg</span></span></code></pre></div><ul><li>创建token.csv文件</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/cfg/</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">token.csv</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">$(</span><span style="color:#B392F0;">head</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-c</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">16</span><span style="color:#9ECBFF;"> /dev/urandom </span><span style="color:#F97583;">|</span><span style="color:#9ECBFF;"> </span><span style="color:#B392F0;">od</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-An</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-t</span><span style="color:#9ECBFF;"> x </span><span style="color:#F97583;">|</span><span style="color:#9ECBFF;"> </span><span style="color:#B392F0;">tr</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#9ECBFF;"> &#39; &#39;),kubelet-bootstrap,10001,&quot;system:kubelet-bootstrap&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/cfg/</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">token.csv</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">$(</span><span style="color:#6F42C1;">head</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-c</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">16</span><span style="color:#032F62;"> /dev/urandom </span><span style="color:#D73A49;">|</span><span style="color:#032F62;"> </span><span style="color:#6F42C1;">od</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-An</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-t</span><span style="color:#032F62;"> x </span><span style="color:#D73A49;">|</span><span style="color:#032F62;"> </span><span style="color:#6F42C1;">tr</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-d</span><span style="color:#032F62;"> &#39; &#39;),kubelet-bootstrap,10001,&quot;system:kubelet-bootstrap&quot;</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_1-创建api-server的配置文件" tabindex="-1">1.创建api-server的配置文件 <a class="header-anchor" href="#_1-创建api-server的配置文件" aria-label="Permalink to &quot;1.创建api-server的配置文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/cfg/kube-apiserver.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">KUBE_APISERVER_OPTS=&quot;--logging-format=json </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--v=2 </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--etcd-servers=https://10.103.236.150:2379,https://10.103.236.151:2379,https://10.103.236.152:2379 </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--bind-address=0.0.0.0 </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--secure-port=6443 </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--advertise-address=10.103.236.150 </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--allow-privileged=true </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--service-cluster-ip-range=192.168.0.0/16 </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname  </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--enable-admission-plugins=NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,DefaultTolerationSeconds,NodeRestriction,ResourceQuota </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--authorization-mode=RBAC,Node </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--enable-bootstrap-token-auth=true </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--service-node-port-range=30000-61000 </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--kubelet-client-certificate=/etc/kubernetes/pki/apiserver.pem  </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--kubelet-client-key=/etc/kubernetes/pki/apiserver-key.pem  </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--tls-cert-file=/etc/kubernetes/pki/apiserver.pem  </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--tls-private-key-file=/etc/kubernetes/pki/apiserver-key.pem  </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--client-ca-file=/etc/kubernetes/pki/ca.pem </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--service-account-key-file=/etc/kubernetes/pki/sa.pub  </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--service-account-signing-key-file=/etc/kubernetes/pki/sa.key  </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--service-account-issuer=https://kubernetes.default.svc.cluster.local </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--etcd-cafile=/etc/etcd/ssl/etcd-ca.pem </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--etcd-certfile=/etc/etcd/ssl/etcd.pem </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--etcd-keyfile=/etc/etcd/ssl/etcd-key.pem </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.pem  </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--proxy-client-cert-file=/etc/kubernetes/pki/front-proxy-client.pem  </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--proxy-client-key-file=/etc/kubernetes/pki/front-proxy-client-key.pem  </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--requestheader-allowed-names=aggregator </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--requestheader-extra-headers-prefix=X-Remote-Extra- </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--requestheader-group-headers=X-Remote-Group </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--requestheader-username-headers=X-Remote-User </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--enable-aggregator-routing=true </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--audit-log-maxage=30 </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--audit-log-maxbackup=3 </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--audit-log-maxsize=100 </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--audit-log-path=/var/log/kubernetes/k8s-audit.log&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/cfg/kube-apiserver.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">KUBE_APISERVER_OPTS=&quot;--logging-format=json </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--v=2 </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--etcd-servers=https://10.103.236.150:2379,https://10.103.236.151:2379,https://10.103.236.152:2379 </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--bind-address=0.0.0.0 </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--secure-port=6443 </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--advertise-address=10.103.236.150 </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--allow-privileged=true </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--service-cluster-ip-range=192.168.0.0/16 </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname  </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--enable-admission-plugins=NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,DefaultTolerationSeconds,NodeRestriction,ResourceQuota </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--authorization-mode=RBAC,Node </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--enable-bootstrap-token-auth=true </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--service-node-port-range=30000-61000 </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--kubelet-client-certificate=/etc/kubernetes/pki/apiserver.pem  </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--kubelet-client-key=/etc/kubernetes/pki/apiserver-key.pem  </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--tls-cert-file=/etc/kubernetes/pki/apiserver.pem  </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--tls-private-key-file=/etc/kubernetes/pki/apiserver-key.pem  </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--client-ca-file=/etc/kubernetes/pki/ca.pem </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--service-account-key-file=/etc/kubernetes/pki/sa.pub  </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--service-account-signing-key-file=/etc/kubernetes/pki/sa.key  </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--service-account-issuer=https://kubernetes.default.svc.cluster.local </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--etcd-cafile=/etc/etcd/ssl/etcd-ca.pem </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--etcd-certfile=/etc/etcd/ssl/etcd.pem </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--etcd-keyfile=/etc/etcd/ssl/etcd-key.pem </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.pem  </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--proxy-client-cert-file=/etc/kubernetes/pki/front-proxy-client.pem  </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--proxy-client-key-file=/etc/kubernetes/pki/front-proxy-client-key.pem  </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--requestheader-allowed-names=aggregator </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--requestheader-extra-headers-prefix=X-Remote-Extra- </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--requestheader-group-headers=X-Remote-Group </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--requestheader-username-headers=X-Remote-User </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--enable-aggregator-routing=true </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--audit-log-maxage=30 </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--audit-log-maxbackup=3 </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--audit-log-maxsize=100 </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--audit-log-path=/var/log/kubernetes/k8s-audit.log&quot;</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_2-配置unit文件" tabindex="-1">2.配置unit文件 <a class="header-anchor" href="#_2-配置unit文件" aria-label="Permalink to &quot;2.配置unit文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">/usr/lib/systemd/system/kube-apiserver.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Kubernetes API Server</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">EnvironmentFile=/etc/kubernetes/cfg/kube-apiserver.conf</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/local/bin/kube-apiserver </span><span style="color:#79B8FF;">\\$</span><span style="color:#9ECBFF;">KUBE_APISERVER_OPTS</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=on-failure</span></span>
<span class="line"><span style="color:#9ECBFF;">RestartSec=10s</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNOFILE=65535</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">/usr/lib/systemd/system/kube-apiserver.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=Kubernetes API Server</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">EnvironmentFile=/etc/kubernetes/cfg/kube-apiserver.conf</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/local/bin/kube-apiserver </span><span style="color:#005CC5;">\\$</span><span style="color:#032F62;">KUBE_APISERVER_OPTS</span></span>
<span class="line"><span style="color:#032F62;">Restart=on-failure</span></span>
<span class="line"><span style="color:#032F62;">RestartSec=10s</span></span>
<span class="line"><span style="color:#032F62;">LimitNOFILE=65535</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_3-启动" tabindex="-1">3.启动 <a class="header-anchor" href="#_3-启动" aria-label="Permalink to &quot;3.启动&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-apiserver</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-apiserver</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-apiserver</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-apiserver</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# curl -k https://10.103.236.150:6443/</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">&quot;kind&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Status&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">&quot;apiVersion&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;v1&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">&quot;metadata&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{},</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">&quot;status&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Failure&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">&quot;message&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;forbidden: User </span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">system:anonymous</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;"> cannot get path </span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">/</span><span style="color:#79B8FF;">\\&quot;</span><span style="color:#9ECBFF;">&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">&quot;reason&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Forbidden&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">&quot;details&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{},</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">&quot;code&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">403</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# curl -k https://10.103.236.150:6443/</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">&quot;kind&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Status&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">&quot;apiVersion&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;v1&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">&quot;metadata&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{},</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">&quot;status&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Failure&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">&quot;message&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;forbidden: User </span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">system:anonymous</span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;"> cannot get path </span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">/</span><span style="color:#005CC5;">\\&quot;</span><span style="color:#032F62;">&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">&quot;reason&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Forbidden&quot;,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">&quot;details&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{},</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">&quot;code&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">403</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="_1-2-kube-controller-manager" tabindex="-1">1.2 kube-controller-manager <a class="header-anchor" href="#_1-2-kube-controller-manager" aria-label="Permalink to &quot;1.2 kube-controller-manager&quot;">​</a></h4><p>官档: <a href="https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/" target="_blank" rel="noreferrer">https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/</a></p><h5 id="_1-创建kube-controller-manager配置文件" tabindex="-1">1.创建kube-controller-manager配置文件 <a class="header-anchor" href="#_1-创建kube-controller-manager配置文件" aria-label="Permalink to &quot;1.创建kube-controller-manager配置文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">/etc/kubernetes/cfg/kube-controller-manager.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">KUBE_CONTROLLER_MANAGER_OPTS=&quot; </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --bind-address=0.0.0.0 </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --kubeconfig=/etc/kubernetes/controller-manager.kubeconfig </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --service-cluster-ip-range=192.168.0.0/16 </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --cluster-cidr=172.16.0.0/12 </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --cluster-name=kubernetes </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --allocate-node-cidrs=true </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --leader-elect=true </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --feature-gates=RotateKubeletServerCertificate=true </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --controllers=*,bootstrapsigner,tokencleaner </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --horizontal-pod-autoscaler-sync-period=10s </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --use-service-account-credentials=true </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --logging-format=json </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --cluster-signing-cert-file=/etc/kubernetes/pki/ca.pem </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --cluster-signing-key-file=/etc/kubernetes/pki/ca-key.pem </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --root-ca-file=/etc/kubernetes/pki/ca.pem </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --service-account-private-key-file=/etc/kubernetes/pki/sa.key </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --cluster-signing-duration=438000h0m0s  </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --node-monitor-grace-period=40s </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --node-monitor-period=5s </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --allocate-node-cidrs=true </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --node-cidr-mask-size=24 </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.pem </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --v=2&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">/etc/kubernetes/cfg/kube-controller-manager.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">KUBE_CONTROLLER_MANAGER_OPTS=&quot; </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --bind-address=0.0.0.0 </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --kubeconfig=/etc/kubernetes/controller-manager.kubeconfig </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --service-cluster-ip-range=192.168.0.0/16 </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --cluster-cidr=172.16.0.0/12 </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --cluster-name=kubernetes </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --allocate-node-cidrs=true </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --leader-elect=true </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --feature-gates=RotateKubeletServerCertificate=true </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --controllers=*,bootstrapsigner,tokencleaner </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --horizontal-pod-autoscaler-sync-period=10s </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --use-service-account-credentials=true </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --logging-format=json </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --cluster-signing-cert-file=/etc/kubernetes/pki/ca.pem </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --cluster-signing-key-file=/etc/kubernetes/pki/ca-key.pem </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --root-ca-file=/etc/kubernetes/pki/ca.pem </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --service-account-private-key-file=/etc/kubernetes/pki/sa.key </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --cluster-signing-duration=438000h0m0s  </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --node-monitor-grace-period=40s </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --node-monitor-period=5s </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --allocate-node-cidrs=true </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --node-cidr-mask-size=24 </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.pem </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">  --v=2&quot;</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><blockquote><p>service-cluster-ip-range ----&gt; service 网段</p><p>cluster-cidr --&gt;Pod网段</p></blockquote><h5 id="_2-创建unit文件" tabindex="-1">2.创建unit文件 <a class="header-anchor" href="#_2-创建unit文件" aria-label="Permalink to &quot;2.创建unit文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">/usr/lib/systemd/system/kube-controller-manager.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Kubernetes Controller Manager</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">EnvironmentFile=/etc/kubernetes/cfg/kube-controller-manager.conf</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/local/bin/kube-controller-manager </span><span style="color:#79B8FF;">\\$</span><span style="color:#9ECBFF;">KUBE_CONTROLLER_MANAGER_OPTS</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=on-failure</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNOFILE=65536</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">/usr/lib/systemd/system/kube-controller-manager.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=Kubernetes Controller Manager</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">EnvironmentFile=/etc/kubernetes/cfg/kube-controller-manager.conf</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/local/bin/kube-controller-manager </span><span style="color:#005CC5;">\\$</span><span style="color:#032F62;">KUBE_CONTROLLER_MANAGER_OPTS</span></span>
<span class="line"><span style="color:#032F62;">Restart=on-failure</span></span>
<span class="line"><span style="color:#032F62;">LimitNOFILE=65536</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_3-启动-1" tabindex="-1">3.启动 <a class="header-anchor" href="#_3-启动-1" aria-label="Permalink to &quot;3.启动&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span><span style="color:#E1E4E8;"> ;</span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-controller-manager</span><span style="color:#E1E4E8;">;</span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-controller-manager.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span><span style="color:#24292E;"> ;</span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-controller-manager</span><span style="color:#24292E;">;</span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-controller-manager.service</span></span></code></pre></div><h4 id="_1-3-kube-scheduler" tabindex="-1">1.3 kube-scheduler <a class="header-anchor" href="#_1-3-kube-scheduler" aria-label="Permalink to &quot;1.3 kube-scheduler&quot;">​</a></h4><h5 id="_1-创建-kube-scheduler-配置文件" tabindex="-1">1.创建 kube-scheduler 配置文件 <a class="header-anchor" href="#_1-创建-kube-scheduler-配置文件" aria-label="Permalink to &quot;1.创建 kube-scheduler 配置文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">/etc/kubernetes/cfg/kube-scheduler.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">KUBE_SCHEDULER_OPTS=&quot;--logging-format=json </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--v=2 </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--kubeconfig=/etc/kubernetes/scheduler.kubeconfig </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--authentication-kubeconfig=/etc/kubernetes/scheduler.kubeconfig </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--authorization-kubeconfig=/etc/kubernetes/scheduler.kubeconfig </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--leader-elect </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">--bind-address=0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">/etc/kubernetes/cfg/kube-scheduler.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">KUBE_SCHEDULER_OPTS=&quot;--logging-format=json </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--v=2 </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--kubeconfig=/etc/kubernetes/scheduler.kubeconfig </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--authentication-kubeconfig=/etc/kubernetes/scheduler.kubeconfig </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--authorization-kubeconfig=/etc/kubernetes/scheduler.kubeconfig </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--leader-elect </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">--bind-address=0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_2-创建unit文件-1" tabindex="-1">2.创建unit文件 <a class="header-anchor" href="#_2-创建unit文件-1" aria-label="Permalink to &quot;2.创建unit文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/lib/systemd/system/kube-scheduler.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Kubernetes Scheduler</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">EnvironmentFile=/etc/kubernetes/cfg/kube-scheduler.conf</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/local/bin/kube-scheduler </span><span style="color:#79B8FF;">\\$</span><span style="color:#9ECBFF;">KUBE_SCHEDULER_OPTS</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=on-failure</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNOFILE=65536</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/lib/systemd/system/kube-scheduler.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=Kubernetes Scheduler</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">EnvironmentFile=/etc/kubernetes/cfg/kube-scheduler.conf</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/local/bin/kube-scheduler </span><span style="color:#005CC5;">\\$</span><span style="color:#032F62;">KUBE_SCHEDULER_OPTS</span></span>
<span class="line"><span style="color:#032F62;">Restart=on-failure</span></span>
<span class="line"><span style="color:#032F62;">LimitNOFILE=65536</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_3-启动-2" tabindex="-1">3.启动 <a class="header-anchor" href="#_3-启动-2" aria-label="Permalink to &quot;3.启动&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span><span style="color:#E1E4E8;"> ;</span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-scheduler</span><span style="color:#E1E4E8;">;</span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-scheduler</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span><span style="color:#24292E;"> ;</span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-scheduler</span><span style="color:#24292E;">;</span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-scheduler</span></span></code></pre></div><ul><li>查看状态</li></ul><blockquote><p>如果这里执行kubectl命令日提示8080,则是没有配置kubeconfig文件</p></blockquote><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 查看集群状态</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 kubernetes]# kubectl get cs</span></span>
<span class="line"><span style="color:#B392F0;">Warning:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ComponentStatus</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">is</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">deprecated</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v1.19+</span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">                 </span><span style="color:#9ECBFF;">STATUS</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">MESSAGE</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">ERROR</span></span>
<span class="line"><span style="color:#B392F0;">controller-manager</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">Healthy</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">ok</span></span>
<span class="line"><span style="color:#B392F0;">etcd-0</span><span style="color:#E1E4E8;">               </span><span style="color:#9ECBFF;">Healthy</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">ok</span></span>
<span class="line"><span style="color:#B392F0;">scheduler</span><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">Healthy</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">ok</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 kubernetes]# kubectl cluster-info</span></span>
<span class="line"><span style="color:#B392F0;">Kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">control</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">plane</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">is</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">running</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">at</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://10.103.236.150:6443</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">To</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">further</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">debug</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">and</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">diagnose</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cluster</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">problems,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">use</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;kubectl cluster-info dump&#39;.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 查看集群状态</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 kubernetes]# kubectl get cs</span></span>
<span class="line"><span style="color:#6F42C1;">Warning:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ComponentStatus</span><span style="color:#24292E;"> </span><span style="color:#032F62;">is</span><span style="color:#24292E;"> </span><span style="color:#032F62;">deprecated</span><span style="color:#24292E;"> </span><span style="color:#032F62;">in</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v1.19+</span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">                 </span><span style="color:#032F62;">STATUS</span><span style="color:#24292E;">    </span><span style="color:#032F62;">MESSAGE</span><span style="color:#24292E;">   </span><span style="color:#032F62;">ERROR</span></span>
<span class="line"><span style="color:#6F42C1;">controller-manager</span><span style="color:#24292E;">   </span><span style="color:#032F62;">Healthy</span><span style="color:#24292E;">   </span><span style="color:#032F62;">ok</span></span>
<span class="line"><span style="color:#6F42C1;">etcd-0</span><span style="color:#24292E;">               </span><span style="color:#032F62;">Healthy</span><span style="color:#24292E;">   </span><span style="color:#032F62;">ok</span></span>
<span class="line"><span style="color:#6F42C1;">scheduler</span><span style="color:#24292E;">            </span><span style="color:#032F62;">Healthy</span><span style="color:#24292E;">   </span><span style="color:#032F62;">ok</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 kubernetes]# kubectl cluster-info</span></span>
<span class="line"><span style="color:#6F42C1;">Kubernetes</span><span style="color:#24292E;"> </span><span style="color:#032F62;">control</span><span style="color:#24292E;"> </span><span style="color:#032F62;">plane</span><span style="color:#24292E;"> </span><span style="color:#032F62;">is</span><span style="color:#24292E;"> </span><span style="color:#032F62;">running</span><span style="color:#24292E;"> </span><span style="color:#032F62;">at</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://10.103.236.150:6443</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">To</span><span style="color:#24292E;"> </span><span style="color:#032F62;">further</span><span style="color:#24292E;"> </span><span style="color:#032F62;">debug</span><span style="color:#24292E;"> </span><span style="color:#032F62;">and</span><span style="color:#24292E;"> </span><span style="color:#032F62;">diagnose</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cluster</span><span style="color:#24292E;"> </span><span style="color:#032F62;">problems,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">use</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;kubectl cluster-info dump&#39;.</span></span></code></pre></div><h4 id="_1-4-kube-proxy" tabindex="-1">1.4 kube-proxy <a class="header-anchor" href="#_1-4-kube-proxy" aria-label="Permalink to &quot;1.4 kube-proxy&quot;">​</a></h4><h5 id="_1-创建-kube-proxy-配置文件" tabindex="-1">1.创建 kube-proxy 配置文件 <a class="header-anchor" href="#_1-创建-kube-proxy-配置文件" aria-label="Permalink to &quot;1.创建 kube-proxy 配置文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/kube-proxy.yaml</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">apiVersion: kubeproxy.config.k8s.io/v1alpha1</span></span>
<span class="line"><span style="color:#9ECBFF;">bindAddress: 0.0.0.0</span></span>
<span class="line"><span style="color:#9ECBFF;">clientConnection:</span></span>
<span class="line"><span style="color:#9ECBFF;">  acceptContentTypes: &quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  burst: 10</span></span>
<span class="line"><span style="color:#9ECBFF;">  contentType: application/vnd.kubernetes.protobuf</span></span>
<span class="line"><span style="color:#9ECBFF;">  kubeconfig: /etc/kubernetes/kube-proxy.kubeconfig</span></span>
<span class="line"><span style="color:#9ECBFF;">  qps: 5</span></span>
<span class="line"><span style="color:#9ECBFF;">clusterCIDR: 172.16.0.0/12</span></span>
<span class="line"><span style="color:#9ECBFF;">configSyncPeriod: 15m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">conntrack:</span></span>
<span class="line"><span style="color:#9ECBFF;">  max: null</span></span>
<span class="line"><span style="color:#9ECBFF;">  maxPerCore: 32768</span></span>
<span class="line"><span style="color:#9ECBFF;">  min: 131072</span></span>
<span class="line"><span style="color:#9ECBFF;">  tcpCloseWaitTimeout: 1h0m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">  tcpEstablishedTimeout: 24h0m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">enableProfiling: false</span></span>
<span class="line"><span style="color:#9ECBFF;">healthzBindAddress: 0.0.0.0:10256</span></span>
<span class="line"><span style="color:#9ECBFF;">hostnameOverride: &quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">iptables:</span></span>
<span class="line"><span style="color:#9ECBFF;">  masqueradeAll: false</span></span>
<span class="line"><span style="color:#9ECBFF;">  masqueradeBit: 14</span></span>
<span class="line"><span style="color:#9ECBFF;">  minSyncPeriod: 0s</span></span>
<span class="line"><span style="color:#9ECBFF;">  syncPeriod: 30s</span></span>
<span class="line"><span style="color:#9ECBFF;">ipvs:</span></span>
<span class="line"><span style="color:#9ECBFF;">  masqueradeAll: true</span></span>
<span class="line"><span style="color:#9ECBFF;">  minSyncPeriod: 5s</span></span>
<span class="line"><span style="color:#9ECBFF;">  scheduler: &quot;rr&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  syncPeriod: 30s</span></span>
<span class="line"><span style="color:#9ECBFF;">kind: KubeProxyConfiguration</span></span>
<span class="line"><span style="color:#9ECBFF;">metricsBindAddress: 0.0.0.0:10249</span></span>
<span class="line"><span style="color:#9ECBFF;">mode: &quot;ipvs&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">nodePortAddresses: null</span></span>
<span class="line"><span style="color:#9ECBFF;">oomScoreAdj: -999</span></span>
<span class="line"><span style="color:#9ECBFF;">portRange: &quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">udpIdleTimeout: 250ms</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/kube-proxy.yaml</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">apiVersion: kubeproxy.config.k8s.io/v1alpha1</span></span>
<span class="line"><span style="color:#032F62;">bindAddress: 0.0.0.0</span></span>
<span class="line"><span style="color:#032F62;">clientConnection:</span></span>
<span class="line"><span style="color:#032F62;">  acceptContentTypes: &quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">  burst: 10</span></span>
<span class="line"><span style="color:#032F62;">  contentType: application/vnd.kubernetes.protobuf</span></span>
<span class="line"><span style="color:#032F62;">  kubeconfig: /etc/kubernetes/kube-proxy.kubeconfig</span></span>
<span class="line"><span style="color:#032F62;">  qps: 5</span></span>
<span class="line"><span style="color:#032F62;">clusterCIDR: 172.16.0.0/12</span></span>
<span class="line"><span style="color:#032F62;">configSyncPeriod: 15m0s</span></span>
<span class="line"><span style="color:#032F62;">conntrack:</span></span>
<span class="line"><span style="color:#032F62;">  max: null</span></span>
<span class="line"><span style="color:#032F62;">  maxPerCore: 32768</span></span>
<span class="line"><span style="color:#032F62;">  min: 131072</span></span>
<span class="line"><span style="color:#032F62;">  tcpCloseWaitTimeout: 1h0m0s</span></span>
<span class="line"><span style="color:#032F62;">  tcpEstablishedTimeout: 24h0m0s</span></span>
<span class="line"><span style="color:#032F62;">enableProfiling: false</span></span>
<span class="line"><span style="color:#032F62;">healthzBindAddress: 0.0.0.0:10256</span></span>
<span class="line"><span style="color:#032F62;">hostnameOverride: &quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">iptables:</span></span>
<span class="line"><span style="color:#032F62;">  masqueradeAll: false</span></span>
<span class="line"><span style="color:#032F62;">  masqueradeBit: 14</span></span>
<span class="line"><span style="color:#032F62;">  minSyncPeriod: 0s</span></span>
<span class="line"><span style="color:#032F62;">  syncPeriod: 30s</span></span>
<span class="line"><span style="color:#032F62;">ipvs:</span></span>
<span class="line"><span style="color:#032F62;">  masqueradeAll: true</span></span>
<span class="line"><span style="color:#032F62;">  minSyncPeriod: 5s</span></span>
<span class="line"><span style="color:#032F62;">  scheduler: &quot;rr&quot;</span></span>
<span class="line"><span style="color:#032F62;">  syncPeriod: 30s</span></span>
<span class="line"><span style="color:#032F62;">kind: KubeProxyConfiguration</span></span>
<span class="line"><span style="color:#032F62;">metricsBindAddress: 0.0.0.0:10249</span></span>
<span class="line"><span style="color:#032F62;">mode: &quot;ipvs&quot;</span></span>
<span class="line"><span style="color:#032F62;">nodePortAddresses: null</span></span>
<span class="line"><span style="color:#032F62;">oomScoreAdj: -999</span></span>
<span class="line"><span style="color:#032F62;">portRange: &quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">udpIdleTimeout: 250ms</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_2-配置-unit文件" tabindex="-1">2.配置 unit文件 <a class="header-anchor" href="#_2-配置-unit文件" aria-label="Permalink to &quot;2.配置 unit文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 所有 k8s 节点添加 kube-proxy 的 service 文件</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">/usr/lib/systemd/system/kube-proxy.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Kubernetes Kube Proxy</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/local/bin/kube-proxy </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --config=/etc/kubernetes/kube-proxy.yaml </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --cluster-cidr=172.16.0.0/12 </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --v=2</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=always</span></span>
<span class="line"><span style="color:#9ECBFF;">RestartSec=10s</span></span>
<span class="line"><span style="color:#9ECBFF;">TimeoutStartSec=300</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#9ECBFF;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">OOMScoreAdjust=-999</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 所有 k8s 节点添加 kube-proxy 的 service 文件</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">  </span><span style="color:#032F62;">/usr/lib/systemd/system/kube-proxy.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=Kubernetes Kube Proxy</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#032F62;">After=network.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/local/bin/kube-proxy </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">  --config=/etc/kubernetes/kube-proxy.yaml </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">  --cluster-cidr=172.16.0.0/12 </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">  --v=2</span></span>
<span class="line"><span style="color:#032F62;">Restart=always</span></span>
<span class="line"><span style="color:#032F62;">RestartSec=10s</span></span>
<span class="line"><span style="color:#032F62;">TimeoutStartSec=300</span></span>
<span class="line"><span style="color:#032F62;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#032F62;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#032F62;">OOMScoreAdjust=-999</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_3-启动-3" tabindex="-1">3.启动 <a class="header-anchor" href="#_3-启动-3" aria-label="Permalink to &quot;3.启动&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-proxy.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-proxy.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-proxy.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-proxy.service</span></span></code></pre></div><h4 id="_1-5-kubelet" tabindex="-1">1.5 kubelet <a class="header-anchor" href="#_1-5-kubelet" aria-label="Permalink to &quot;1.5 kubelet&quot;">​</a></h4><h5 id="_1-创建配置文件" tabindex="-1">1.创建配置文件 <a class="header-anchor" href="#_1-创建配置文件" aria-label="Permalink to &quot;1.创建配置文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/kubelet-conf.yml</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">apiVersion: kubelet.config.k8s.io/v1beta1</span></span>
<span class="line"><span style="color:#9ECBFF;">kind: KubeletConfiguration</span></span>
<span class="line"><span style="color:#9ECBFF;">address: 0.0.0.0</span></span>
<span class="line"><span style="color:#9ECBFF;">port: 10250</span></span>
<span class="line"><span style="color:#9ECBFF;">readOnlyPort: 10255</span></span>
<span class="line"><span style="color:#9ECBFF;">authentication:</span></span>
<span class="line"><span style="color:#9ECBFF;">  anonymous:</span></span>
<span class="line"><span style="color:#9ECBFF;">    enabled: false</span></span>
<span class="line"><span style="color:#9ECBFF;">  webhook:</span></span>
<span class="line"><span style="color:#9ECBFF;">    cacheTTL: 2m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">    enabled: true</span></span>
<span class="line"><span style="color:#9ECBFF;">  x509:</span></span>
<span class="line"><span style="color:#9ECBFF;">    clientCAFile: /etc/kubernetes/pki/ca.pem</span></span>
<span class="line"><span style="color:#9ECBFF;">authorization:</span></span>
<span class="line"><span style="color:#9ECBFF;">  mode: Webhook</span></span>
<span class="line"><span style="color:#9ECBFF;">  webhook:</span></span>
<span class="line"><span style="color:#9ECBFF;">    cacheAuthorizedTTL: 5m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">    cacheUnauthorizedTTL: 30s</span></span>
<span class="line"><span style="color:#9ECBFF;">cgroupDriver: systemd</span></span>
<span class="line"><span style="color:#9ECBFF;">cgroupsPerQOS: true</span></span>
<span class="line"><span style="color:#9ECBFF;">clusterDNS:</span></span>
<span class="line"><span style="color:#9ECBFF;">- 192.168.0.10</span></span>
<span class="line"><span style="color:#9ECBFF;">clusterDomain: cluster.local</span></span>
<span class="line"><span style="color:#9ECBFF;">containerLogMaxFiles: 5</span></span>
<span class="line"><span style="color:#9ECBFF;">containerLogMaxSize: 10Mi</span></span>
<span class="line"><span style="color:#9ECBFF;">contentType: application/vnd.kubernetes.protobuf</span></span>
<span class="line"><span style="color:#9ECBFF;">cpuCFSQuota: true</span></span>
<span class="line"><span style="color:#9ECBFF;">cpuManagerPolicy: none</span></span>
<span class="line"><span style="color:#9ECBFF;">cpuManagerReconcilePeriod: 10s</span></span>
<span class="line"><span style="color:#9ECBFF;">enableControllerAttachDetach: true</span></span>
<span class="line"><span style="color:#9ECBFF;">enableDebuggingHandlers: true</span></span>
<span class="line"><span style="color:#9ECBFF;">enforceNodeAllocatable:</span></span>
<span class="line"><span style="color:#9ECBFF;">- pods</span></span>
<span class="line"><span style="color:#9ECBFF;">eventBurst: 10</span></span>
<span class="line"><span style="color:#9ECBFF;">eventRecordQPS: 5</span></span>
<span class="line"><span style="color:#9ECBFF;">evictionHard:</span></span>
<span class="line"><span style="color:#9ECBFF;">  imagefs.available: 15%</span></span>
<span class="line"><span style="color:#9ECBFF;">  memory.available: 100Mi</span></span>
<span class="line"><span style="color:#9ECBFF;">  nodefs.available: 10%</span></span>
<span class="line"><span style="color:#9ECBFF;">  nodefs.inodesFree: 5%</span></span>
<span class="line"><span style="color:#9ECBFF;">evictionPressureTransitionPeriod: 5m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">failSwapOn: true</span></span>
<span class="line"><span style="color:#9ECBFF;">fileCheckFrequency: 20s</span></span>
<span class="line"><span style="color:#9ECBFF;">hairpinMode: promiscuous-bridge</span></span>
<span class="line"><span style="color:#9ECBFF;">healthzBindAddress: 127.0.0.1</span></span>
<span class="line"><span style="color:#9ECBFF;">healthzPort: 10248</span></span>
<span class="line"><span style="color:#9ECBFF;">httpCheckFrequency: 20s</span></span>
<span class="line"><span style="color:#9ECBFF;">imageGCHighThresholdPercent: 85</span></span>
<span class="line"><span style="color:#9ECBFF;">imageGCLowThresholdPercent: 80</span></span>
<span class="line"><span style="color:#9ECBFF;">imageMinimumGCAge: 2m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">iptablesDropBit: 15</span></span>
<span class="line"><span style="color:#9ECBFF;">iptablesMasqueradeBit: 14</span></span>
<span class="line"><span style="color:#9ECBFF;">kubeAPIBurst: 10</span></span>
<span class="line"><span style="color:#9ECBFF;">kubeAPIQPS: 5</span></span>
<span class="line"><span style="color:#9ECBFF;">makeIPTablesUtilChains: true</span></span>
<span class="line"><span style="color:#9ECBFF;">maxOpenFiles: 1000000</span></span>
<span class="line"><span style="color:#9ECBFF;">maxPods: 110</span></span>
<span class="line"><span style="color:#9ECBFF;">nodeStatusUpdateFrequency: 10s</span></span>
<span class="line"><span style="color:#9ECBFF;">oomScoreAdj: -999</span></span>
<span class="line"><span style="color:#9ECBFF;">podPidsLimit: -1</span></span>
<span class="line"><span style="color:#9ECBFF;">registryBurst: 10</span></span>
<span class="line"><span style="color:#9ECBFF;">registryPullQPS: 5</span></span>
<span class="line"><span style="color:#9ECBFF;">resolvConf: /etc/resolv.conf</span></span>
<span class="line"><span style="color:#9ECBFF;">rotateCertificates: true</span></span>
<span class="line"><span style="color:#9ECBFF;">runtimeRequestTimeout: 2m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">serializeImagePulls: true</span></span>
<span class="line"><span style="color:#9ECBFF;">staticPodPath: /etc/kubernetes/manifests</span></span>
<span class="line"><span style="color:#9ECBFF;">streamingConnectionIdleTimeout: 4h0m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">syncFrequency: 1m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">volumeStatsAggPeriod: 1m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/kubelet-conf.yml</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">apiVersion: kubelet.config.k8s.io/v1beta1</span></span>
<span class="line"><span style="color:#032F62;">kind: KubeletConfiguration</span></span>
<span class="line"><span style="color:#032F62;">address: 0.0.0.0</span></span>
<span class="line"><span style="color:#032F62;">port: 10250</span></span>
<span class="line"><span style="color:#032F62;">readOnlyPort: 10255</span></span>
<span class="line"><span style="color:#032F62;">authentication:</span></span>
<span class="line"><span style="color:#032F62;">  anonymous:</span></span>
<span class="line"><span style="color:#032F62;">    enabled: false</span></span>
<span class="line"><span style="color:#032F62;">  webhook:</span></span>
<span class="line"><span style="color:#032F62;">    cacheTTL: 2m0s</span></span>
<span class="line"><span style="color:#032F62;">    enabled: true</span></span>
<span class="line"><span style="color:#032F62;">  x509:</span></span>
<span class="line"><span style="color:#032F62;">    clientCAFile: /etc/kubernetes/pki/ca.pem</span></span>
<span class="line"><span style="color:#032F62;">authorization:</span></span>
<span class="line"><span style="color:#032F62;">  mode: Webhook</span></span>
<span class="line"><span style="color:#032F62;">  webhook:</span></span>
<span class="line"><span style="color:#032F62;">    cacheAuthorizedTTL: 5m0s</span></span>
<span class="line"><span style="color:#032F62;">    cacheUnauthorizedTTL: 30s</span></span>
<span class="line"><span style="color:#032F62;">cgroupDriver: systemd</span></span>
<span class="line"><span style="color:#032F62;">cgroupsPerQOS: true</span></span>
<span class="line"><span style="color:#032F62;">clusterDNS:</span></span>
<span class="line"><span style="color:#032F62;">- 192.168.0.10</span></span>
<span class="line"><span style="color:#032F62;">clusterDomain: cluster.local</span></span>
<span class="line"><span style="color:#032F62;">containerLogMaxFiles: 5</span></span>
<span class="line"><span style="color:#032F62;">containerLogMaxSize: 10Mi</span></span>
<span class="line"><span style="color:#032F62;">contentType: application/vnd.kubernetes.protobuf</span></span>
<span class="line"><span style="color:#032F62;">cpuCFSQuota: true</span></span>
<span class="line"><span style="color:#032F62;">cpuManagerPolicy: none</span></span>
<span class="line"><span style="color:#032F62;">cpuManagerReconcilePeriod: 10s</span></span>
<span class="line"><span style="color:#032F62;">enableControllerAttachDetach: true</span></span>
<span class="line"><span style="color:#032F62;">enableDebuggingHandlers: true</span></span>
<span class="line"><span style="color:#032F62;">enforceNodeAllocatable:</span></span>
<span class="line"><span style="color:#032F62;">- pods</span></span>
<span class="line"><span style="color:#032F62;">eventBurst: 10</span></span>
<span class="line"><span style="color:#032F62;">eventRecordQPS: 5</span></span>
<span class="line"><span style="color:#032F62;">evictionHard:</span></span>
<span class="line"><span style="color:#032F62;">  imagefs.available: 15%</span></span>
<span class="line"><span style="color:#032F62;">  memory.available: 100Mi</span></span>
<span class="line"><span style="color:#032F62;">  nodefs.available: 10%</span></span>
<span class="line"><span style="color:#032F62;">  nodefs.inodesFree: 5%</span></span>
<span class="line"><span style="color:#032F62;">evictionPressureTransitionPeriod: 5m0s</span></span>
<span class="line"><span style="color:#032F62;">failSwapOn: true</span></span>
<span class="line"><span style="color:#032F62;">fileCheckFrequency: 20s</span></span>
<span class="line"><span style="color:#032F62;">hairpinMode: promiscuous-bridge</span></span>
<span class="line"><span style="color:#032F62;">healthzBindAddress: 127.0.0.1</span></span>
<span class="line"><span style="color:#032F62;">healthzPort: 10248</span></span>
<span class="line"><span style="color:#032F62;">httpCheckFrequency: 20s</span></span>
<span class="line"><span style="color:#032F62;">imageGCHighThresholdPercent: 85</span></span>
<span class="line"><span style="color:#032F62;">imageGCLowThresholdPercent: 80</span></span>
<span class="line"><span style="color:#032F62;">imageMinimumGCAge: 2m0s</span></span>
<span class="line"><span style="color:#032F62;">iptablesDropBit: 15</span></span>
<span class="line"><span style="color:#032F62;">iptablesMasqueradeBit: 14</span></span>
<span class="line"><span style="color:#032F62;">kubeAPIBurst: 10</span></span>
<span class="line"><span style="color:#032F62;">kubeAPIQPS: 5</span></span>
<span class="line"><span style="color:#032F62;">makeIPTablesUtilChains: true</span></span>
<span class="line"><span style="color:#032F62;">maxOpenFiles: 1000000</span></span>
<span class="line"><span style="color:#032F62;">maxPods: 110</span></span>
<span class="line"><span style="color:#032F62;">nodeStatusUpdateFrequency: 10s</span></span>
<span class="line"><span style="color:#032F62;">oomScoreAdj: -999</span></span>
<span class="line"><span style="color:#032F62;">podPidsLimit: -1</span></span>
<span class="line"><span style="color:#032F62;">registryBurst: 10</span></span>
<span class="line"><span style="color:#032F62;">registryPullQPS: 5</span></span>
<span class="line"><span style="color:#032F62;">resolvConf: /etc/resolv.conf</span></span>
<span class="line"><span style="color:#032F62;">rotateCertificates: true</span></span>
<span class="line"><span style="color:#032F62;">runtimeRequestTimeout: 2m0s</span></span>
<span class="line"><span style="color:#032F62;">serializeImagePulls: true</span></span>
<span class="line"><span style="color:#032F62;">staticPodPath: /etc/kubernetes/manifests</span></span>
<span class="line"><span style="color:#032F62;">streamingConnectionIdleTimeout: 4h0m0s</span></span>
<span class="line"><span style="color:#032F62;">syncFrequency: 1m0s</span></span>
<span class="line"><span style="color:#032F62;">volumeStatsAggPeriod: 1m0s</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_2-配置unit文件-1" tabindex="-1">2.配置unit文件 <a class="header-anchor" href="#_2-配置unit文件-1" aria-label="Permalink to &quot;2.配置unit文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/lib/systemd/system/kubelet.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Kubernetes Kubelet</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network-online.target firewalld.service cri-docker.service docker.socket containerd.service</span></span>
<span class="line"><span style="color:#9ECBFF;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#9ECBFF;">Requires=containerd.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/local/bin/kubelet </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --cert-dir=/etc/kubernete/pki </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --client-ca-file=/etc/kubernetes/pki/ca.pem </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --kubeconfig=/etc/kubernetes/kubelet.kubeconfig </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --config=/etc/kubernetes/kubelet-conf.yml </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --container-runtime-endpoint=unix:///run/containerd/containerd.sock </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --node-labels=node.kubernetes.io/node= </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --v=2</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=always</span></span>
<span class="line"><span style="color:#9ECBFF;">RestartSec=10s</span></span>
<span class="line"><span style="color:#9ECBFF;">TimeoutStartSec=300</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#9ECBFF;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">OOMScoreAdjust=-999</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/lib/systemd/system/kubelet.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=Kubernetes Kubelet</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#032F62;">After=network-online.target firewalld.service cri-docker.service docker.socket containerd.service</span></span>
<span class="line"><span style="color:#032F62;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#032F62;">Requires=containerd.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/local/bin/kubelet </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --cert-dir=/etc/kubernete/pki </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --client-ca-file=/etc/kubernetes/pki/ca.pem </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --kubeconfig=/etc/kubernetes/kubelet.kubeconfig </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --config=/etc/kubernetes/kubelet-conf.yml </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --container-runtime-endpoint=unix:///run/containerd/containerd.sock </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --node-labels=node.kubernetes.io/node= </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --v=2</span></span>
<span class="line"><span style="color:#032F62;">Restart=always</span></span>
<span class="line"><span style="color:#032F62;">RestartSec=10s</span></span>
<span class="line"><span style="color:#032F62;">TimeoutStartSec=300</span></span>
<span class="line"><span style="color:#032F62;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#032F62;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#032F62;">OOMScoreAdjust=-999</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_3-启动-4" tabindex="-1">3.启动 <a class="header-anchor" href="#_3-启动-4" aria-label="Permalink to &quot;3.启动&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubelet.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubelet.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubelet.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubelet.service</span></span></code></pre></div><h4 id="_1-6-tls-bootstrapping" tabindex="-1">1.6 TLS Bootstrapping <a class="header-anchor" href="#_1-6-tls-bootstrapping" aria-label="Permalink to &quot;1.6 TLS Bootstrapping&quot;">​</a></h4><p><a href="https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/kubelet-tls-bootstrapping/" target="_blank" rel="noreferrer">https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/kubelet-tls-bootstrapping/</a></p><h5 id="_1-介绍" tabindex="-1">1.介绍 <a class="header-anchor" href="#_1-介绍" aria-label="Permalink to &quot;1.介绍&quot;">​</a></h5><p>在一个 Kubernetes 集群中，Worker 节点上的组件（kubelet 和 kube-proxy）需要与 Kubernetes 控制平面组件通信，尤其是 kube-apiserver。 为了通信的安全性， 需要使用到节点上的客户端 TLS 证书。</p><p>但是客户端很多，又很难有通用的 TSL 证书直接使用，如果每一次加节点都需要重新生成证书，那维护将变得非常麻烦。</p><p>为了简化这一过程，从 1.4 版本开始，Kubernetes 引入了一个证书请求和签名 API</p><p>采用 TLS bootstrapping 生成证书的大致简化流程如下：</p><ul><li>管理员通过 apiserver 生成一个 bootstrap token 并将它写入到 kubeconfig 文件中。</li><li>Kubelet 通过 --bootstrap-kubeconfig 启动参数指定 kubeconfig 文件，然后调用 apiserver 的 API 接口，生成自己所需的服务器和客户端证书。</li><li>证书生成后，Kubelet 采用生成的证书和 apiserver 进行通信，并删除本地的 kubeconfig 文件，避免 bootstrap token 泄漏。</li></ul><p>想要启动该功能，只需要在 apiserver 中启动参数中添加 <code>--enable-bootstrap-token-auth</code>，并创建一个 Kubelet 访问的 bootstrap token secret 即可。</p><p><a href="https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/bootstrap-tokens/" target="_blank" rel="noreferrer">https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/bootstrap-tokens/</a></p><h5 id="_2-部署" tabindex="-1">2.部署 <a class="header-anchor" href="#_2-部署" aria-label="Permalink to &quot;2.部署&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 在 master01 上配置</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;--server&quot;只想的是负载均衡器的IP地址，由负载均衡器对master节点进行反向代理</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;--token&quot;也可以自定义，但也要同时修改&quot;bootstrap&quot;的Secret的&quot;token-id&quot;和&quot;token-secret&quot;对应值</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置集群</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-cluster</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubernetes</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--certificate-authority=/etc/kubernetes/pki/ca.pem     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--embed-certs=true     </span><span style="color:#79B8FF;">--server=https://10.103.236.150:6443</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#创建用户</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-credentials</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tls-bootstrap-token-user</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--token=c8ad9c.2e4d610cf3e7426e </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#将集群和用户进行绑定</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-context</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tls-bootstrap-token-user@kubernetes</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--cluster=kubernetes     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--user=tls-bootstrap-token-user     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#配置默认的上下文</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">use-context</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tls-bootstrap-token-user@kubernetes</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/root/.kube</span><span style="color:#E1E4E8;"> ; </span><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/admin.kubeconfig</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/root/.kube/config</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 在 master01 上配置</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;--server&quot;只想的是负载均衡器的IP地址，由负载均衡器对master节点进行反向代理</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;--token&quot;也可以自定义，但也要同时修改&quot;bootstrap&quot;的Secret的&quot;token-id&quot;和&quot;token-secret&quot;对应值</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置集群</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-cluster</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubernetes</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--certificate-authority=/etc/kubernetes/pki/ca.pem     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--embed-certs=true     </span><span style="color:#005CC5;">--server=https://10.103.236.150:6443</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#创建用户</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-credentials</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tls-bootstrap-token-user</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--token=c8ad9c.2e4d610cf3e7426e </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#将集群和用户进行绑定</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-context</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tls-bootstrap-token-user@kubernetes</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--cluster=kubernetes     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--user=tls-bootstrap-token-user     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#配置默认的上下文</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">use-context</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tls-bootstrap-token-user@kubernetes</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/root/.kube</span><span style="color:#24292E;"> ; </span><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/admin.kubeconfig</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/root/.kube/config</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bootstrap.secret.yaml</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">apiVersion: v1</span></span>
<span class="line"><span style="color:#9ECBFF;">kind: Secret</span></span>
<span class="line"><span style="color:#9ECBFF;">metadata:</span></span>
<span class="line"><span style="color:#9ECBFF;">  name: bootstrap-token-c8ad9c</span></span>
<span class="line"><span style="color:#9ECBFF;">  namespace: kube-system</span></span>
<span class="line"><span style="color:#9ECBFF;">type: bootstrap.kubernetes.io/token</span></span>
<span class="line"><span style="color:#9ECBFF;">stringData:</span></span>
<span class="line"><span style="color:#9ECBFF;">  description: &quot;The default bootstrap token generated by &#39;kubelet &#39;.&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  token-id: c8ad9c</span></span>
<span class="line"><span style="color:#9ECBFF;">  token-secret: 2e4d610cf3e7426e</span></span>
<span class="line"><span style="color:#9ECBFF;">  usage-bootstrap-authentication: &quot;true&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  usage-bootstrap-signing: &quot;true&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  auth-extra-groups:  system:bootstrappers:default-node-token,system:bootstrappers:worker,system:bootstrappers:ingress</span></span>
<span class="line"><span style="color:#9ECBFF;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">---</span></span>
<span class="line"><span style="color:#9ECBFF;">apiVersion: rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#9ECBFF;">kind: ClusterRoleBinding</span></span>
<span class="line"><span style="color:#9ECBFF;">metadata:</span></span>
<span class="line"><span style="color:#9ECBFF;">  name: kubelet-bootstrap</span></span>
<span class="line"><span style="color:#9ECBFF;">roleRef:</span></span>
<span class="line"><span style="color:#9ECBFF;">  apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#9ECBFF;">  kind: ClusterRole</span></span>
<span class="line"><span style="color:#9ECBFF;">  name: system:node-bootstrapper</span></span>
<span class="line"><span style="color:#9ECBFF;">subjects:</span></span>
<span class="line"><span style="color:#9ECBFF;">- apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#9ECBFF;">  kind: Group</span></span>
<span class="line"><span style="color:#9ECBFF;">  name: system:bootstrappers:default-node-token</span></span>
<span class="line"><span style="color:#9ECBFF;">---</span></span>
<span class="line"><span style="color:#9ECBFF;">apiVersion: rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#9ECBFF;">kind: ClusterRoleBinding</span></span>
<span class="line"><span style="color:#9ECBFF;">metadata:</span></span>
<span class="line"><span style="color:#9ECBFF;">  name: node-autoapprove-bootstrap</span></span>
<span class="line"><span style="color:#9ECBFF;">roleRef:</span></span>
<span class="line"><span style="color:#9ECBFF;">  apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#9ECBFF;">  kind: ClusterRole</span></span>
<span class="line"><span style="color:#9ECBFF;">  name: system:certificates.k8s.io:certificatesigningrequests:nodeclient</span></span>
<span class="line"><span style="color:#9ECBFF;">subjects:</span></span>
<span class="line"><span style="color:#9ECBFF;">- apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#9ECBFF;">  kind: Group</span></span>
<span class="line"><span style="color:#9ECBFF;">  name: system:bootstrappers:default-node-token</span></span>
<span class="line"><span style="color:#9ECBFF;">---</span></span>
<span class="line"><span style="color:#9ECBFF;">apiVersion: rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#9ECBFF;">kind: ClusterRoleBinding</span></span>
<span class="line"><span style="color:#9ECBFF;">metadata:</span></span>
<span class="line"><span style="color:#9ECBFF;">  name: node-autoapprove-certificate-rotation</span></span>
<span class="line"><span style="color:#9ECBFF;">roleRef:</span></span>
<span class="line"><span style="color:#9ECBFF;">  apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#9ECBFF;">  kind: ClusterRole</span></span>
<span class="line"><span style="color:#9ECBFF;">  name: system:certificates.k8s.io:certificatesigningrequests:selfnodeclient</span></span>
<span class="line"><span style="color:#9ECBFF;">subjects:</span></span>
<span class="line"><span style="color:#9ECBFF;">- apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#9ECBFF;">  kind: Group</span></span>
<span class="line"><span style="color:#9ECBFF;">  name: system:nodes</span></span>
<span class="line"><span style="color:#9ECBFF;">---</span></span>
<span class="line"><span style="color:#9ECBFF;">apiVersion: rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#9ECBFF;">kind: ClusterRole</span></span>
<span class="line"><span style="color:#9ECBFF;">metadata:</span></span>
<span class="line"><span style="color:#9ECBFF;">  annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">    rbac.authorization.kubernetes.io/autoupdate: &quot;true&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">    kubernetes.io/bootstrapping: rbac-defaults</span></span>
<span class="line"><span style="color:#9ECBFF;">  name: system:kube-apiserver-to-kubelet</span></span>
<span class="line"><span style="color:#9ECBFF;">rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">  - apiGroups:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - &quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    resources:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - nodes/proxy</span></span>
<span class="line"><span style="color:#9ECBFF;">      - nodes/stats</span></span>
<span class="line"><span style="color:#9ECBFF;">      - nodes/log</span></span>
<span class="line"><span style="color:#9ECBFF;">      - nodes/spec</span></span>
<span class="line"><span style="color:#9ECBFF;">      - nodes/metrics</span></span>
<span class="line"><span style="color:#9ECBFF;">    verbs:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - &quot;*&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">---</span></span>
<span class="line"><span style="color:#9ECBFF;">apiVersion: rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#9ECBFF;">kind: ClusterRoleBinding</span></span>
<span class="line"><span style="color:#9ECBFF;">metadata:</span></span>
<span class="line"><span style="color:#9ECBFF;">  name: system:kube-apiserver</span></span>
<span class="line"><span style="color:#9ECBFF;">  namespace: &quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">roleRef:</span></span>
<span class="line"><span style="color:#9ECBFF;">  apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#9ECBFF;">  kind: ClusterRole</span></span>
<span class="line"><span style="color:#9ECBFF;">  name: system:kube-apiserver-to-kubelet</span></span>
<span class="line"><span style="color:#9ECBFF;">subjects:</span></span>
<span class="line"><span style="color:#9ECBFF;">  - apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#9ECBFF;">    kind: User</span></span>
<span class="line"><span style="color:#9ECBFF;">    name: kube-apiserver</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bootstrap.secret.yaml</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">apiVersion: v1</span></span>
<span class="line"><span style="color:#032F62;">kind: Secret</span></span>
<span class="line"><span style="color:#032F62;">metadata:</span></span>
<span class="line"><span style="color:#032F62;">  name: bootstrap-token-c8ad9c</span></span>
<span class="line"><span style="color:#032F62;">  namespace: kube-system</span></span>
<span class="line"><span style="color:#032F62;">type: bootstrap.kubernetes.io/token</span></span>
<span class="line"><span style="color:#032F62;">stringData:</span></span>
<span class="line"><span style="color:#032F62;">  description: &quot;The default bootstrap token generated by &#39;kubelet &#39;.&quot;</span></span>
<span class="line"><span style="color:#032F62;">  token-id: c8ad9c</span></span>
<span class="line"><span style="color:#032F62;">  token-secret: 2e4d610cf3e7426e</span></span>
<span class="line"><span style="color:#032F62;">  usage-bootstrap-authentication: &quot;true&quot;</span></span>
<span class="line"><span style="color:#032F62;">  usage-bootstrap-signing: &quot;true&quot;</span></span>
<span class="line"><span style="color:#032F62;">  auth-extra-groups:  system:bootstrappers:default-node-token,system:bootstrappers:worker,system:bootstrappers:ingress</span></span>
<span class="line"><span style="color:#032F62;"> </span></span>
<span class="line"><span style="color:#032F62;">---</span></span>
<span class="line"><span style="color:#032F62;">apiVersion: rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#032F62;">kind: ClusterRoleBinding</span></span>
<span class="line"><span style="color:#032F62;">metadata:</span></span>
<span class="line"><span style="color:#032F62;">  name: kubelet-bootstrap</span></span>
<span class="line"><span style="color:#032F62;">roleRef:</span></span>
<span class="line"><span style="color:#032F62;">  apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#032F62;">  kind: ClusterRole</span></span>
<span class="line"><span style="color:#032F62;">  name: system:node-bootstrapper</span></span>
<span class="line"><span style="color:#032F62;">subjects:</span></span>
<span class="line"><span style="color:#032F62;">- apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#032F62;">  kind: Group</span></span>
<span class="line"><span style="color:#032F62;">  name: system:bootstrappers:default-node-token</span></span>
<span class="line"><span style="color:#032F62;">---</span></span>
<span class="line"><span style="color:#032F62;">apiVersion: rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#032F62;">kind: ClusterRoleBinding</span></span>
<span class="line"><span style="color:#032F62;">metadata:</span></span>
<span class="line"><span style="color:#032F62;">  name: node-autoapprove-bootstrap</span></span>
<span class="line"><span style="color:#032F62;">roleRef:</span></span>
<span class="line"><span style="color:#032F62;">  apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#032F62;">  kind: ClusterRole</span></span>
<span class="line"><span style="color:#032F62;">  name: system:certificates.k8s.io:certificatesigningrequests:nodeclient</span></span>
<span class="line"><span style="color:#032F62;">subjects:</span></span>
<span class="line"><span style="color:#032F62;">- apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#032F62;">  kind: Group</span></span>
<span class="line"><span style="color:#032F62;">  name: system:bootstrappers:default-node-token</span></span>
<span class="line"><span style="color:#032F62;">---</span></span>
<span class="line"><span style="color:#032F62;">apiVersion: rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#032F62;">kind: ClusterRoleBinding</span></span>
<span class="line"><span style="color:#032F62;">metadata:</span></span>
<span class="line"><span style="color:#032F62;">  name: node-autoapprove-certificate-rotation</span></span>
<span class="line"><span style="color:#032F62;">roleRef:</span></span>
<span class="line"><span style="color:#032F62;">  apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#032F62;">  kind: ClusterRole</span></span>
<span class="line"><span style="color:#032F62;">  name: system:certificates.k8s.io:certificatesigningrequests:selfnodeclient</span></span>
<span class="line"><span style="color:#032F62;">subjects:</span></span>
<span class="line"><span style="color:#032F62;">- apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#032F62;">  kind: Group</span></span>
<span class="line"><span style="color:#032F62;">  name: system:nodes</span></span>
<span class="line"><span style="color:#032F62;">---</span></span>
<span class="line"><span style="color:#032F62;">apiVersion: rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#032F62;">kind: ClusterRole</span></span>
<span class="line"><span style="color:#032F62;">metadata:</span></span>
<span class="line"><span style="color:#032F62;">  annotations:</span></span>
<span class="line"><span style="color:#032F62;">    rbac.authorization.kubernetes.io/autoupdate: &quot;true&quot;</span></span>
<span class="line"><span style="color:#032F62;">  labels:</span></span>
<span class="line"><span style="color:#032F62;">    kubernetes.io/bootstrapping: rbac-defaults</span></span>
<span class="line"><span style="color:#032F62;">  name: system:kube-apiserver-to-kubelet</span></span>
<span class="line"><span style="color:#032F62;">rules:</span></span>
<span class="line"><span style="color:#032F62;">  - apiGroups:</span></span>
<span class="line"><span style="color:#032F62;">      - &quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">    resources:</span></span>
<span class="line"><span style="color:#032F62;">      - nodes/proxy</span></span>
<span class="line"><span style="color:#032F62;">      - nodes/stats</span></span>
<span class="line"><span style="color:#032F62;">      - nodes/log</span></span>
<span class="line"><span style="color:#032F62;">      - nodes/spec</span></span>
<span class="line"><span style="color:#032F62;">      - nodes/metrics</span></span>
<span class="line"><span style="color:#032F62;">    verbs:</span></span>
<span class="line"><span style="color:#032F62;">      - &quot;*&quot;</span></span>
<span class="line"><span style="color:#032F62;">---</span></span>
<span class="line"><span style="color:#032F62;">apiVersion: rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#032F62;">kind: ClusterRoleBinding</span></span>
<span class="line"><span style="color:#032F62;">metadata:</span></span>
<span class="line"><span style="color:#032F62;">  name: system:kube-apiserver</span></span>
<span class="line"><span style="color:#032F62;">  namespace: &quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">roleRef:</span></span>
<span class="line"><span style="color:#032F62;">  apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#032F62;">  kind: ClusterRole</span></span>
<span class="line"><span style="color:#032F62;">  name: system:kube-apiserver-to-kubelet</span></span>
<span class="line"><span style="color:#032F62;">subjects:</span></span>
<span class="line"><span style="color:#032F62;">  - apiGroup: rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#032F62;">    kind: User</span></span>
<span class="line"><span style="color:#032F62;">    name: kube-apiserver</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><ul><li>创建</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bootstrap.secret.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bootstrap.secret.yaml</span></span></code></pre></div><h3 id="_3-6-2-node节点" tabindex="-1">3.6.2 node节点 <a class="header-anchor" href="#_3-6-2-node节点" aria-label="Permalink to &quot;3.6.2 node节点&quot;">​</a></h3><h4 id="_1-部署" tabindex="-1">1.部署 <a class="header-anchor" href="#_1-部署" aria-label="Permalink to &quot;1.部署&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">WorkNodes</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;kube-node-01 kube-node-02&#39;</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> NODE </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> $WorkNodes; </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> $NODE; </span><span style="color:#B392F0;">scp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin/kube{let,-proxy}</span><span style="color:#E1E4E8;"> $NODE</span><span style="color:#9ECBFF;">:/usr/local/bin/</span><span style="color:#E1E4E8;">; </span><span style="color:#F97583;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">WorkNodes</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;kube-node-01 kube-node-02&#39;</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> NODE </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> $WorkNodes; </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> $NODE; </span><span style="color:#6F42C1;">scp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin/kube{let,-proxy}</span><span style="color:#24292E;"> $NODE</span><span style="color:#032F62;">:/usr/local/bin/</span><span style="color:#24292E;">; </span><span style="color:#D73A49;">done</span></span></code></pre></div><h5 id="_1-复制证书" tabindex="-1">1.复制证书 <a class="header-anchor" href="#_1-复制证书" aria-label="Permalink to &quot;1.复制证书&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 在 master01 上将证书复制到 node 节点</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> NODE </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> kube-node-01 kube-node-02; </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ssh</span><span style="color:#E1E4E8;"> $NODE </span><span style="color:#9ECBFF;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/{pki,manifests}</span><span style="color:#E1E4E8;">; </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> FILE </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> pki/ca.pem pki/ca-key.pem pki/front-proxy-ca.pem bootstrap-kubelet.kubeconfig kube-proxy.kubeconfig; </span><span style="color:#F97583;">do</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">scp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/</span><span style="color:#E1E4E8;">$FILE $NODE</span><span style="color:#9ECBFF;">:/etc/kubernetes/</span><span style="color:#E1E4E8;">\${FILE}; </span><span style="color:#F97583;">done</span><span style="color:#E1E4E8;">; </span><span style="color:#F97583;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 在 master01 上将证书复制到 node 节点</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> NODE </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> kube-node-01 kube-node-02; </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ssh</span><span style="color:#24292E;"> $NODE </span><span style="color:#032F62;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/{pki,manifests}</span><span style="color:#24292E;">; </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> FILE </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> pki/ca.pem pki/ca-key.pem pki/front-proxy-ca.pem bootstrap-kubelet.kubeconfig kube-proxy.kubeconfig; </span><span style="color:#D73A49;">do</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">scp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/</span><span style="color:#24292E;">$FILE $NODE</span><span style="color:#032F62;">:/etc/kubernetes/</span><span style="color:#24292E;">\${FILE}; </span><span style="color:#D73A49;">done</span><span style="color:#24292E;">; </span><span style="color:#D73A49;">done</span></span></code></pre></div><h4 id="_2-kubelet" tabindex="-1">2.kubelet <a class="header-anchor" href="#_2-kubelet" aria-label="Permalink to &quot;2.kubelet&quot;">​</a></h4><h5 id="_1-创建配置文件-1" tabindex="-1">1.创建配置文件 <a class="header-anchor" href="#_1-创建配置文件-1" aria-label="Permalink to &quot;1.创建配置文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/kubelet-conf.yml</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">apiVersion: kubelet.config.k8s.io/v1beta1</span></span>
<span class="line"><span style="color:#9ECBFF;">kind: KubeletConfiguration</span></span>
<span class="line"><span style="color:#9ECBFF;">address: 0.0.0.0</span></span>
<span class="line"><span style="color:#9ECBFF;">port: 10250</span></span>
<span class="line"><span style="color:#9ECBFF;">readOnlyPort: 10255</span></span>
<span class="line"><span style="color:#9ECBFF;">authentication:</span></span>
<span class="line"><span style="color:#9ECBFF;">  anonymous:</span></span>
<span class="line"><span style="color:#9ECBFF;">    enabled: false</span></span>
<span class="line"><span style="color:#9ECBFF;">  webhook:</span></span>
<span class="line"><span style="color:#9ECBFF;">    cacheTTL: 2m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">    enabled: true</span></span>
<span class="line"><span style="color:#9ECBFF;">  x509:</span></span>
<span class="line"><span style="color:#9ECBFF;">    clientCAFile: /etc/kubernetes/pki/ca.pem</span></span>
<span class="line"><span style="color:#9ECBFF;">authorization:</span></span>
<span class="line"><span style="color:#9ECBFF;">  mode: Webhook</span></span>
<span class="line"><span style="color:#9ECBFF;">  webhook:</span></span>
<span class="line"><span style="color:#9ECBFF;">    cacheAuthorizedTTL: 5m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">    cacheUnauthorizedTTL: 30s</span></span>
<span class="line"><span style="color:#9ECBFF;">cgroupDriver: systemd</span></span>
<span class="line"><span style="color:#9ECBFF;">cgroupsPerQOS: true</span></span>
<span class="line"><span style="color:#9ECBFF;">clusterDNS:</span></span>
<span class="line"><span style="color:#9ECBFF;">- 192.168.0.10</span></span>
<span class="line"><span style="color:#9ECBFF;">clusterDomain: cluster.local</span></span>
<span class="line"><span style="color:#9ECBFF;">containerLogMaxFiles: 5</span></span>
<span class="line"><span style="color:#9ECBFF;">containerLogMaxSize: 10Mi</span></span>
<span class="line"><span style="color:#9ECBFF;">contentType: application/vnd.kubernetes.protobuf</span></span>
<span class="line"><span style="color:#9ECBFF;">cpuCFSQuota: true</span></span>
<span class="line"><span style="color:#9ECBFF;">cpuManagerPolicy: none</span></span>
<span class="line"><span style="color:#9ECBFF;">cpuManagerReconcilePeriod: 10s</span></span>
<span class="line"><span style="color:#9ECBFF;">enableControllerAttachDetach: true</span></span>
<span class="line"><span style="color:#9ECBFF;">enableDebuggingHandlers: true</span></span>
<span class="line"><span style="color:#9ECBFF;">enforceNodeAllocatable:</span></span>
<span class="line"><span style="color:#9ECBFF;">- pods</span></span>
<span class="line"><span style="color:#9ECBFF;">eventBurst: 10</span></span>
<span class="line"><span style="color:#9ECBFF;">eventRecordQPS: 5</span></span>
<span class="line"><span style="color:#9ECBFF;">evictionHard:</span></span>
<span class="line"><span style="color:#9ECBFF;">  imagefs.available: 15%</span></span>
<span class="line"><span style="color:#9ECBFF;">  memory.available: 100Mi</span></span>
<span class="line"><span style="color:#9ECBFF;">  nodefs.available: 10%</span></span>
<span class="line"><span style="color:#9ECBFF;">  nodefs.inodesFree: 5%</span></span>
<span class="line"><span style="color:#9ECBFF;">evictionPressureTransitionPeriod: 5m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">failSwapOn: true</span></span>
<span class="line"><span style="color:#9ECBFF;">fileCheckFrequency: 20s</span></span>
<span class="line"><span style="color:#9ECBFF;">hairpinMode: promiscuous-bridge</span></span>
<span class="line"><span style="color:#9ECBFF;">healthzBindAddress: 127.0.0.1</span></span>
<span class="line"><span style="color:#9ECBFF;">healthzPort: 10248</span></span>
<span class="line"><span style="color:#9ECBFF;">httpCheckFrequency: 20s</span></span>
<span class="line"><span style="color:#9ECBFF;">imageGCHighThresholdPercent: 85</span></span>
<span class="line"><span style="color:#9ECBFF;">imageGCLowThresholdPercent: 80</span></span>
<span class="line"><span style="color:#9ECBFF;">imageMinimumGCAge: 2m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">iptablesDropBit: 15</span></span>
<span class="line"><span style="color:#9ECBFF;">iptablesMasqueradeBit: 14</span></span>
<span class="line"><span style="color:#9ECBFF;">kubeAPIBurst: 10</span></span>
<span class="line"><span style="color:#9ECBFF;">kubeAPIQPS: 5</span></span>
<span class="line"><span style="color:#9ECBFF;">makeIPTablesUtilChains: true</span></span>
<span class="line"><span style="color:#9ECBFF;">maxOpenFiles: 1000000</span></span>
<span class="line"><span style="color:#9ECBFF;">maxPods: 110</span></span>
<span class="line"><span style="color:#9ECBFF;">nodeStatusUpdateFrequency: 10s</span></span>
<span class="line"><span style="color:#9ECBFF;">oomScoreAdj: -999</span></span>
<span class="line"><span style="color:#9ECBFF;">podPidsLimit: -1</span></span>
<span class="line"><span style="color:#9ECBFF;">registryBurst: 10</span></span>
<span class="line"><span style="color:#9ECBFF;">registryPullQPS: 5</span></span>
<span class="line"><span style="color:#9ECBFF;">resolvConf: /etc/resolv.conf</span></span>
<span class="line"><span style="color:#9ECBFF;">rotateCertificates: true</span></span>
<span class="line"><span style="color:#9ECBFF;">runtimeRequestTimeout: 2m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">serializeImagePulls: true</span></span>
<span class="line"><span style="color:#9ECBFF;">staticPodPath: /etc/kubernetes/manifests</span></span>
<span class="line"><span style="color:#9ECBFF;">streamingConnectionIdleTimeout: 4h0m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">syncFrequency: 1m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">volumeStatsAggPeriod: 1m0s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/kubelet-conf.yml</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">apiVersion: kubelet.config.k8s.io/v1beta1</span></span>
<span class="line"><span style="color:#032F62;">kind: KubeletConfiguration</span></span>
<span class="line"><span style="color:#032F62;">address: 0.0.0.0</span></span>
<span class="line"><span style="color:#032F62;">port: 10250</span></span>
<span class="line"><span style="color:#032F62;">readOnlyPort: 10255</span></span>
<span class="line"><span style="color:#032F62;">authentication:</span></span>
<span class="line"><span style="color:#032F62;">  anonymous:</span></span>
<span class="line"><span style="color:#032F62;">    enabled: false</span></span>
<span class="line"><span style="color:#032F62;">  webhook:</span></span>
<span class="line"><span style="color:#032F62;">    cacheTTL: 2m0s</span></span>
<span class="line"><span style="color:#032F62;">    enabled: true</span></span>
<span class="line"><span style="color:#032F62;">  x509:</span></span>
<span class="line"><span style="color:#032F62;">    clientCAFile: /etc/kubernetes/pki/ca.pem</span></span>
<span class="line"><span style="color:#032F62;">authorization:</span></span>
<span class="line"><span style="color:#032F62;">  mode: Webhook</span></span>
<span class="line"><span style="color:#032F62;">  webhook:</span></span>
<span class="line"><span style="color:#032F62;">    cacheAuthorizedTTL: 5m0s</span></span>
<span class="line"><span style="color:#032F62;">    cacheUnauthorizedTTL: 30s</span></span>
<span class="line"><span style="color:#032F62;">cgroupDriver: systemd</span></span>
<span class="line"><span style="color:#032F62;">cgroupsPerQOS: true</span></span>
<span class="line"><span style="color:#032F62;">clusterDNS:</span></span>
<span class="line"><span style="color:#032F62;">- 192.168.0.10</span></span>
<span class="line"><span style="color:#032F62;">clusterDomain: cluster.local</span></span>
<span class="line"><span style="color:#032F62;">containerLogMaxFiles: 5</span></span>
<span class="line"><span style="color:#032F62;">containerLogMaxSize: 10Mi</span></span>
<span class="line"><span style="color:#032F62;">contentType: application/vnd.kubernetes.protobuf</span></span>
<span class="line"><span style="color:#032F62;">cpuCFSQuota: true</span></span>
<span class="line"><span style="color:#032F62;">cpuManagerPolicy: none</span></span>
<span class="line"><span style="color:#032F62;">cpuManagerReconcilePeriod: 10s</span></span>
<span class="line"><span style="color:#032F62;">enableControllerAttachDetach: true</span></span>
<span class="line"><span style="color:#032F62;">enableDebuggingHandlers: true</span></span>
<span class="line"><span style="color:#032F62;">enforceNodeAllocatable:</span></span>
<span class="line"><span style="color:#032F62;">- pods</span></span>
<span class="line"><span style="color:#032F62;">eventBurst: 10</span></span>
<span class="line"><span style="color:#032F62;">eventRecordQPS: 5</span></span>
<span class="line"><span style="color:#032F62;">evictionHard:</span></span>
<span class="line"><span style="color:#032F62;">  imagefs.available: 15%</span></span>
<span class="line"><span style="color:#032F62;">  memory.available: 100Mi</span></span>
<span class="line"><span style="color:#032F62;">  nodefs.available: 10%</span></span>
<span class="line"><span style="color:#032F62;">  nodefs.inodesFree: 5%</span></span>
<span class="line"><span style="color:#032F62;">evictionPressureTransitionPeriod: 5m0s</span></span>
<span class="line"><span style="color:#032F62;">failSwapOn: true</span></span>
<span class="line"><span style="color:#032F62;">fileCheckFrequency: 20s</span></span>
<span class="line"><span style="color:#032F62;">hairpinMode: promiscuous-bridge</span></span>
<span class="line"><span style="color:#032F62;">healthzBindAddress: 127.0.0.1</span></span>
<span class="line"><span style="color:#032F62;">healthzPort: 10248</span></span>
<span class="line"><span style="color:#032F62;">httpCheckFrequency: 20s</span></span>
<span class="line"><span style="color:#032F62;">imageGCHighThresholdPercent: 85</span></span>
<span class="line"><span style="color:#032F62;">imageGCLowThresholdPercent: 80</span></span>
<span class="line"><span style="color:#032F62;">imageMinimumGCAge: 2m0s</span></span>
<span class="line"><span style="color:#032F62;">iptablesDropBit: 15</span></span>
<span class="line"><span style="color:#032F62;">iptablesMasqueradeBit: 14</span></span>
<span class="line"><span style="color:#032F62;">kubeAPIBurst: 10</span></span>
<span class="line"><span style="color:#032F62;">kubeAPIQPS: 5</span></span>
<span class="line"><span style="color:#032F62;">makeIPTablesUtilChains: true</span></span>
<span class="line"><span style="color:#032F62;">maxOpenFiles: 1000000</span></span>
<span class="line"><span style="color:#032F62;">maxPods: 110</span></span>
<span class="line"><span style="color:#032F62;">nodeStatusUpdateFrequency: 10s</span></span>
<span class="line"><span style="color:#032F62;">oomScoreAdj: -999</span></span>
<span class="line"><span style="color:#032F62;">podPidsLimit: -1</span></span>
<span class="line"><span style="color:#032F62;">registryBurst: 10</span></span>
<span class="line"><span style="color:#032F62;">registryPullQPS: 5</span></span>
<span class="line"><span style="color:#032F62;">resolvConf: /etc/resolv.conf</span></span>
<span class="line"><span style="color:#032F62;">rotateCertificates: true</span></span>
<span class="line"><span style="color:#032F62;">runtimeRequestTimeout: 2m0s</span></span>
<span class="line"><span style="color:#032F62;">serializeImagePulls: true</span></span>
<span class="line"><span style="color:#032F62;">staticPodPath: /etc/kubernetes/manifests</span></span>
<span class="line"><span style="color:#032F62;">streamingConnectionIdleTimeout: 4h0m0s</span></span>
<span class="line"><span style="color:#032F62;">syncFrequency: 1m0s</span></span>
<span class="line"><span style="color:#032F62;">volumeStatsAggPeriod: 1m0s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_2-配置unit文件-2" tabindex="-1">2.配置unit文件 <a class="header-anchor" href="#_2-配置unit文件-2" aria-label="Permalink to &quot;2.配置unit文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/lib/systemd/system/kubelet.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Kubernetes Kubelet</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network-online.target firewalld.service cri-docker.service docker.socket containerd.service</span></span>
<span class="line"><span style="color:#9ECBFF;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#9ECBFF;">Requires=containerd.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/local/bin/kubelet </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --cert-dir=/etc/kubernete/pki </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --client-ca-file=/etc/kubernetes/pki/ca.pem </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --kubeconfig=/etc/kubernetes/kubelet.kubeconfig </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --config=/etc/kubernetes/kubelet-conf.yml </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --container-runtime-endpoint=unix:///run/containerd/containerd.sock </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --node-labels=node.kubernetes.io/node= </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --v=2</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=always</span></span>
<span class="line"><span style="color:#9ECBFF;">RestartSec=10s</span></span>
<span class="line"><span style="color:#9ECBFF;">TimeoutStartSec=300</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#9ECBFF;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">OOMScoreAdjust=-999</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/lib/systemd/system/kubelet.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=Kubernetes Kubelet</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#032F62;">After=network-online.target firewalld.service cri-docker.service docker.socket containerd.service</span></span>
<span class="line"><span style="color:#032F62;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#032F62;">Requires=containerd.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/local/bin/kubelet </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --cert-dir=/etc/kubernete/pki </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --client-ca-file=/etc/kubernetes/pki/ca.pem </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --kubeconfig=/etc/kubernetes/kubelet.kubeconfig </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --config=/etc/kubernetes/kubelet-conf.yml </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --container-runtime-endpoint=unix:///run/containerd/containerd.sock </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --node-labels=node.kubernetes.io/node= </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --v=2</span></span>
<span class="line"><span style="color:#032F62;">Restart=always</span></span>
<span class="line"><span style="color:#032F62;">RestartSec=10s</span></span>
<span class="line"><span style="color:#032F62;">TimeoutStartSec=300</span></span>
<span class="line"><span style="color:#032F62;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#032F62;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#032F62;">OOMScoreAdjust=-999</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_3-启动-5" tabindex="-1">3.启动 <a class="header-anchor" href="#_3-启动-5" aria-label="Permalink to &quot;3.启动&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubelet.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubelet.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubelet.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubelet.service</span></span></code></pre></div><h4 id="_3-kube-proxy" tabindex="-1">3.kube-proxy <a class="header-anchor" href="#_3-kube-proxy" aria-label="Permalink to &quot;3.kube-proxy&quot;">​</a></h4><h5 id="_1-创建-kube-proxy-配置文件-1" tabindex="-1">1.创建 kube-proxy 配置文件 <a class="header-anchor" href="#_1-创建-kube-proxy-配置文件-1" aria-label="Permalink to &quot;1.创建 kube-proxy 配置文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 所有 k8s节点添加 kube-proxy 的配置</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/kube-proxy.yaml</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">apiVersion: kubeproxy.config.k8s.io/v1alpha1</span></span>
<span class="line"><span style="color:#9ECBFF;">bindAddress: 0.0.0.0</span></span>
<span class="line"><span style="color:#9ECBFF;">cgroupDriver: systemd</span></span>
<span class="line"><span style="color:#9ECBFF;">clusterDNS:</span></span>
<span class="line"><span style="color:#9ECBFF;">- 192.168.0.10</span></span>
<span class="line"><span style="color:#9ECBFF;">clientConnection:</span></span>
<span class="line"><span style="color:#9ECBFF;">  acceptContentTypes: &quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  burst: 10</span></span>
<span class="line"><span style="color:#9ECBFF;">  contentType: application/vnd.kubernetes.protobuf</span></span>
<span class="line"><span style="color:#9ECBFF;">  kubeconfig: /etc/kubernetes/kube-proxy.kubeconfig</span></span>
<span class="line"><span style="color:#9ECBFF;">  qps: 5</span></span>
<span class="line"><span style="color:#9ECBFF;">clusterCIDR: 172.16.0.0/12</span></span>
<span class="line"><span style="color:#9ECBFF;">configSyncPeriod: 15m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">conntrack:</span></span>
<span class="line"><span style="color:#9ECBFF;">  max: null</span></span>
<span class="line"><span style="color:#9ECBFF;">  maxPerCore: 32768</span></span>
<span class="line"><span style="color:#9ECBFF;">  min: 131072</span></span>
<span class="line"><span style="color:#9ECBFF;">  tcpCloseWaitTimeout: 1h0m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">  tcpEstablishedTimeout: 24h0m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">enableProfiling: false</span></span>
<span class="line"><span style="color:#9ECBFF;">healthzBindAddress: 0.0.0.0:10256</span></span>
<span class="line"><span style="color:#9ECBFF;">hostnameOverride: &quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">iptables:</span></span>
<span class="line"><span style="color:#9ECBFF;">  masqueradeAll: false</span></span>
<span class="line"><span style="color:#9ECBFF;">  masqueradeBit: 14</span></span>
<span class="line"><span style="color:#9ECBFF;">  minSyncPeriod: 0s</span></span>
<span class="line"><span style="color:#9ECBFF;">  syncPeriod: 30s</span></span>
<span class="line"><span style="color:#9ECBFF;">ipvs:</span></span>
<span class="line"><span style="color:#9ECBFF;">  masqueradeAll: true</span></span>
<span class="line"><span style="color:#9ECBFF;">  minSyncPeriod: 5s</span></span>
<span class="line"><span style="color:#9ECBFF;">  scheduler: &quot;rr&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  syncPeriod: 30s</span></span>
<span class="line"><span style="color:#9ECBFF;">kind: KubeProxyConfiguration</span></span>
<span class="line"><span style="color:#9ECBFF;">metricsBindAddress: 0.0.0.0:10249</span></span>
<span class="line"><span style="color:#9ECBFF;">mode: &quot;ipvs&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">nodePortAddresses: null</span></span>
<span class="line"><span style="color:#9ECBFF;">oomScoreAdj: -999</span></span>
<span class="line"><span style="color:#9ECBFF;">portRange: &quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">udpIdleTimeout: 250ms</span></span>
<span class="line"><span style="color:#9ECBFF;">clusterDomain: cluster.local </span></span>
<span class="line"><span style="color:#9ECBFF;">failSwapOn: false</span></span>
<span class="line"><span style="color:#9ECBFF;">authentication:</span></span>
<span class="line"><span style="color:#9ECBFF;">  anonymous:</span></span>
<span class="line"><span style="color:#9ECBFF;">    enabled: false</span></span>
<span class="line"><span style="color:#9ECBFF;">  webhook:</span></span>
<span class="line"><span style="color:#9ECBFF;">    cacheTTL: 2m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">    enabled: true</span></span>
<span class="line"><span style="color:#9ECBFF;">  x509:</span></span>
<span class="line"><span style="color:#9ECBFF;">    clientCAFile: /etc/kubernetes/pki/ca.pem </span></span>
<span class="line"><span style="color:#9ECBFF;">authorization:</span></span>
<span class="line"><span style="color:#9ECBFF;">  mode: Webhook</span></span>
<span class="line"><span style="color:#9ECBFF;">  webhook:</span></span>
<span class="line"><span style="color:#9ECBFF;">    cacheAuthorizedTTL: 5m0s</span></span>
<span class="line"><span style="color:#9ECBFF;">    cacheUnauthorizedTTL: 30s</span></span>
<span class="line"><span style="color:#9ECBFF;">evictionHard:</span></span>
<span class="line"><span style="color:#9ECBFF;">  imagefs.available: 15%</span></span>
<span class="line"><span style="color:#9ECBFF;">  memory.available: 100Mi</span></span>
<span class="line"><span style="color:#9ECBFF;">  nodefs.available: 10%</span></span>
<span class="line"><span style="color:#9ECBFF;">  nodefs.inodesFree: 5%</span></span>
<span class="line"><span style="color:#9ECBFF;">maxOpenFiles: 1000000</span></span>
<span class="line"><span style="color:#9ECBFF;">maxPods: 110</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 所有 k8s节点添加 kube-proxy 的配置</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/kube-proxy.yaml</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">apiVersion: kubeproxy.config.k8s.io/v1alpha1</span></span>
<span class="line"><span style="color:#032F62;">bindAddress: 0.0.0.0</span></span>
<span class="line"><span style="color:#032F62;">cgroupDriver: systemd</span></span>
<span class="line"><span style="color:#032F62;">clusterDNS:</span></span>
<span class="line"><span style="color:#032F62;">- 192.168.0.10</span></span>
<span class="line"><span style="color:#032F62;">clientConnection:</span></span>
<span class="line"><span style="color:#032F62;">  acceptContentTypes: &quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">  burst: 10</span></span>
<span class="line"><span style="color:#032F62;">  contentType: application/vnd.kubernetes.protobuf</span></span>
<span class="line"><span style="color:#032F62;">  kubeconfig: /etc/kubernetes/kube-proxy.kubeconfig</span></span>
<span class="line"><span style="color:#032F62;">  qps: 5</span></span>
<span class="line"><span style="color:#032F62;">clusterCIDR: 172.16.0.0/12</span></span>
<span class="line"><span style="color:#032F62;">configSyncPeriod: 15m0s</span></span>
<span class="line"><span style="color:#032F62;">conntrack:</span></span>
<span class="line"><span style="color:#032F62;">  max: null</span></span>
<span class="line"><span style="color:#032F62;">  maxPerCore: 32768</span></span>
<span class="line"><span style="color:#032F62;">  min: 131072</span></span>
<span class="line"><span style="color:#032F62;">  tcpCloseWaitTimeout: 1h0m0s</span></span>
<span class="line"><span style="color:#032F62;">  tcpEstablishedTimeout: 24h0m0s</span></span>
<span class="line"><span style="color:#032F62;">enableProfiling: false</span></span>
<span class="line"><span style="color:#032F62;">healthzBindAddress: 0.0.0.0:10256</span></span>
<span class="line"><span style="color:#032F62;">hostnameOverride: &quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">iptables:</span></span>
<span class="line"><span style="color:#032F62;">  masqueradeAll: false</span></span>
<span class="line"><span style="color:#032F62;">  masqueradeBit: 14</span></span>
<span class="line"><span style="color:#032F62;">  minSyncPeriod: 0s</span></span>
<span class="line"><span style="color:#032F62;">  syncPeriod: 30s</span></span>
<span class="line"><span style="color:#032F62;">ipvs:</span></span>
<span class="line"><span style="color:#032F62;">  masqueradeAll: true</span></span>
<span class="line"><span style="color:#032F62;">  minSyncPeriod: 5s</span></span>
<span class="line"><span style="color:#032F62;">  scheduler: &quot;rr&quot;</span></span>
<span class="line"><span style="color:#032F62;">  syncPeriod: 30s</span></span>
<span class="line"><span style="color:#032F62;">kind: KubeProxyConfiguration</span></span>
<span class="line"><span style="color:#032F62;">metricsBindAddress: 0.0.0.0:10249</span></span>
<span class="line"><span style="color:#032F62;">mode: &quot;ipvs&quot;</span></span>
<span class="line"><span style="color:#032F62;">nodePortAddresses: null</span></span>
<span class="line"><span style="color:#032F62;">oomScoreAdj: -999</span></span>
<span class="line"><span style="color:#032F62;">portRange: &quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">udpIdleTimeout: 250ms</span></span>
<span class="line"><span style="color:#032F62;">clusterDomain: cluster.local </span></span>
<span class="line"><span style="color:#032F62;">failSwapOn: false</span></span>
<span class="line"><span style="color:#032F62;">authentication:</span></span>
<span class="line"><span style="color:#032F62;">  anonymous:</span></span>
<span class="line"><span style="color:#032F62;">    enabled: false</span></span>
<span class="line"><span style="color:#032F62;">  webhook:</span></span>
<span class="line"><span style="color:#032F62;">    cacheTTL: 2m0s</span></span>
<span class="line"><span style="color:#032F62;">    enabled: true</span></span>
<span class="line"><span style="color:#032F62;">  x509:</span></span>
<span class="line"><span style="color:#032F62;">    clientCAFile: /etc/kubernetes/pki/ca.pem </span></span>
<span class="line"><span style="color:#032F62;">authorization:</span></span>
<span class="line"><span style="color:#032F62;">  mode: Webhook</span></span>
<span class="line"><span style="color:#032F62;">  webhook:</span></span>
<span class="line"><span style="color:#032F62;">    cacheAuthorizedTTL: 5m0s</span></span>
<span class="line"><span style="color:#032F62;">    cacheUnauthorizedTTL: 30s</span></span>
<span class="line"><span style="color:#032F62;">evictionHard:</span></span>
<span class="line"><span style="color:#032F62;">  imagefs.available: 15%</span></span>
<span class="line"><span style="color:#032F62;">  memory.available: 100Mi</span></span>
<span class="line"><span style="color:#032F62;">  nodefs.available: 10%</span></span>
<span class="line"><span style="color:#032F62;">  nodefs.inodesFree: 5%</span></span>
<span class="line"><span style="color:#032F62;">maxOpenFiles: 1000000</span></span>
<span class="line"><span style="color:#032F62;">maxPods: 110</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_2-配置-unit文件-1" tabindex="-1">2.配置 unit文件 <a class="header-anchor" href="#_2-配置-unit文件-1" aria-label="Permalink to &quot;2.配置 unit文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 所有 k8s 节点添加 kube-proxy 的 service 文件</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">/usr/lib/systemd/system/kube-proxy.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Kubernetes Kube Proxy</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/local/bin/kube-proxy </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --config=/etc/kubernetes/kube-proxy.yaml </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --cluster-cidr=172.16.0.0/12 </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">  --v=2</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=always</span></span>
<span class="line"><span style="color:#9ECBFF;">RestartSec=10s</span></span>
<span class="line"><span style="color:#9ECBFF;">TimeoutStartSec=300</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#9ECBFF;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">OOMScoreAdjust=-999</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 所有 k8s 节点添加 kube-proxy 的 service 文件</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">  </span><span style="color:#032F62;">/usr/lib/systemd/system/kube-proxy.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=Kubernetes Kube Proxy</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#032F62;">After=network.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/local/bin/kube-proxy </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">  --config=/etc/kubernetes/kube-proxy.yaml </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">  --cluster-cidr=172.16.0.0/12 </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">  --v=2</span></span>
<span class="line"><span style="color:#032F62;">Restart=always</span></span>
<span class="line"><span style="color:#032F62;">RestartSec=10s</span></span>
<span class="line"><span style="color:#032F62;">TimeoutStartSec=300</span></span>
<span class="line"><span style="color:#032F62;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#032F62;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#032F62;">OOMScoreAdjust=-999</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_3-启动-6" tabindex="-1">3.启动 <a class="header-anchor" href="#_3-启动-6" aria-label="Permalink to &quot;3.启动&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-proxy.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-proxy.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-proxy.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-proxy.service</span></span></code></pre></div><h3 id="_3-6-3检查集群健康性" tabindex="-1">3.6.3检查集群健康性 <a class="header-anchor" href="#_3-6-3检查集群健康性" aria-label="Permalink to &quot;3.6.3检查集群健康性&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">Warning:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ComponentStatus</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">is</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">deprecated</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v1.19+</span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">                 </span><span style="color:#9ECBFF;">STATUS</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">MESSAGE</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">ERROR</span></span>
<span class="line"><span style="color:#B392F0;">controller-manager</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">Healthy</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">ok</span></span>
<span class="line"><span style="color:#B392F0;">scheduler</span><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">Healthy</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">ok</span></span>
<span class="line"><span style="color:#B392F0;">etcd-0</span><span style="color:#E1E4E8;">               </span><span style="color:#9ECBFF;">Healthy</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">ok</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--raw=</span><span style="color:#9ECBFF;">&#39;/readyz?verbose&#39;</span></span>
<span class="line"><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#B392F0;">readyz</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">check</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">passed</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--raw=</span><span style="color:#9ECBFF;">&#39;/livez?verbose&#39;</span></span>
<span class="line"><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#B392F0;">livez</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">check</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">passed</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">Warning:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ComponentStatus</span><span style="color:#24292E;"> </span><span style="color:#032F62;">is</span><span style="color:#24292E;"> </span><span style="color:#032F62;">deprecated</span><span style="color:#24292E;"> </span><span style="color:#032F62;">in</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v1.19+</span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">                 </span><span style="color:#032F62;">STATUS</span><span style="color:#24292E;">    </span><span style="color:#032F62;">MESSAGE</span><span style="color:#24292E;">   </span><span style="color:#032F62;">ERROR</span></span>
<span class="line"><span style="color:#6F42C1;">controller-manager</span><span style="color:#24292E;">   </span><span style="color:#032F62;">Healthy</span><span style="color:#24292E;">   </span><span style="color:#032F62;">ok</span></span>
<span class="line"><span style="color:#6F42C1;">scheduler</span><span style="color:#24292E;">            </span><span style="color:#032F62;">Healthy</span><span style="color:#24292E;">   </span><span style="color:#032F62;">ok</span></span>
<span class="line"><span style="color:#6F42C1;">etcd-0</span><span style="color:#24292E;">               </span><span style="color:#032F62;">Healthy</span><span style="color:#24292E;">   </span><span style="color:#032F62;">ok</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--raw=</span><span style="color:#032F62;">&#39;/readyz?verbose&#39;</span></span>
<span class="line"><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#6F42C1;">readyz</span><span style="color:#24292E;"> </span><span style="color:#032F62;">check</span><span style="color:#24292E;"> </span><span style="color:#032F62;">passed</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--raw=</span><span style="color:#032F62;">&#39;/livez?verbose&#39;</span></span>
<span class="line"><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#6F42C1;">livez</span><span style="color:#24292E;"> </span><span style="color:#032F62;">check</span><span style="color:#24292E;"> </span><span style="color:#032F62;">passed</span></span></code></pre></div><h3 id="_3-6-4-部署网络插件-master节点" tabindex="-1">3.6.4 部署网络插件-master节点 <a class="header-anchor" href="#_3-6-4-部署网络插件-master节点" aria-label="Permalink to &quot;3.6.4 部署网络插件-master节点&quot;">​</a></h3><ul><li>版本兼容性</li></ul><table><thead><tr><th>calico版本</th><th>kubernetes版本</th></tr></thead><tbody><tr><td><a href="https://docs.tigera.io/archive/v3.18/getting-started/kubernetes/requirements#kubernetes-requirements" target="_blank" rel="noreferrer">v3.18</a></td><td>v1.20、1.19、1.18</td></tr><tr><td>v3.19</td><td>v1.21、v1.20、1.19</td></tr><tr><td>v3.20</td><td>v1.21、v1.20、1.19</td></tr><tr><td>v3.21</td><td>v1.22、v1.21、v1.20</td></tr><tr><td>v3.22</td><td>v1.23、v1.22、v1.21</td></tr><tr><td>v3.23</td><td>v1.23、v1.22、v1.21</td></tr><tr><td>v3.24</td><td>v1.25、v1.24、v1.23、v1.22</td></tr><tr><td><a href="https://docs.tigera.io/calico/3.26/getting-started/kubernetes/requirements#kernel-dependencies" target="_blank" rel="noreferrer">v3.26</a></td><td>v1.28、v1.27、v1.26、v1.25、v1.24</td></tr><tr><td>v3.27</td><td>v1.29、v1.28、v1.27</td></tr><tr><td>v3.28</td><td>v1.30、v1.29、v1.28、v1.27</td></tr></tbody></table><h4 id="_1-calico" tabindex="-1">1.calico <a class="header-anchor" href="#_1-calico" aria-label="Permalink to &quot;1.calico&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/projectcalico/calico/blob/master/manifests/calico-typha.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">或者</span></span>
<span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://projectcalico.docs.tigera.io/archive/v3.25/manifests/calico.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/projectcalico/calico/blob/master/manifests/calico-typha.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">或者</span></span>
<span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://projectcalico.docs.tigera.io/archive/v3.25/manifests/calico.yaml</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#修改POD网段</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">CALICO_IPV4POOL_CIDR</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#B392F0;">value:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;172.16.0.0/12&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 修改为 BGP 模式</span></span>
<span class="line"><span style="color:#6A737D;"># Enable IPIP</span></span>
<span class="line"><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">CALICO_IPV4POOL_IPIP</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">value:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Always&quot;</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#改成Off</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#修改POD网段</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CALICO_IPV4POOL_CIDR</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6F42C1;">value:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;172.16.0.0/12&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 修改为 BGP 模式</span></span>
<span class="line"><span style="color:#6A737D;"># Enable IPIP</span></span>
<span class="line"><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CALICO_IPV4POOL_IPIP</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">value:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Always&quot;</span><span style="color:#24292E;">  </span><span style="color:#6A737D;">#改成Off</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#或者通过sed修改</span></span>
<span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s/# - name: CALICO_IPV4POOL_CIDR/- name: CALICO_IPV4POOL_CIDR/g&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">calico.yaml</span></span>
<span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s/#   value: &quot;192.168.0.0\\/16&quot;/  value: &quot;172.16.0.0\\/12&quot;/g&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">calico.yaml</span></span>
<span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s/&quot;type&quot;: &quot;calico-ipam&quot;/&quot;type&quot;: &quot;calico-ipam&quot;,\\n              &quot;assign_ipv4&quot;: &quot;true&quot;/g&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">calico.yaml</span></span>
<span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;s#docker.io/calico/#m.daocloud.io/docker.io/calico/#g&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">calico.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#或者通过sed修改</span></span>
<span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s/# - name: CALICO_IPV4POOL_CIDR/- name: CALICO_IPV4POOL_CIDR/g&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">calico.yaml</span></span>
<span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s/#   value: &quot;192.168.0.0\\/16&quot;/  value: &quot;172.16.0.0\\/12&quot;/g&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">calico.yaml</span></span>
<span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s/&quot;type&quot;: &quot;calico-ipam&quot;/&quot;type&quot;: &quot;calico-ipam&quot;,\\n              &quot;assign_ipv4&quot;: &quot;true&quot;/g&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">calico.yaml</span></span>
<span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;s#docker.io/calico/#m.daocloud.io/docker.io/calico/#g&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">calico.yaml</span></span></code></pre></div><ul><li>执行</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">calico.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">calico.yaml</span></span></code></pre></div><ul><li>查看效果</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 init_pack]# kubectl get pod -A -owide</span></span>
<span class="line"><span style="color:#B392F0;">NAMESPACE</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">NAME</span><span style="color:#E1E4E8;">                                      </span><span style="color:#9ECBFF;">READY</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">STATUS</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">RESTARTS</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">AGE</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">IP</span><span style="color:#E1E4E8;">               </span><span style="color:#9ECBFF;">NODE</span><span style="color:#E1E4E8;">             </span><span style="color:#9ECBFF;">NOMINATED</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">NODE</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">READINESS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">GATES</span></span>
<span class="line"><span style="color:#B392F0;">kube-node-02</span><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">           </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">kube-system</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">calico-kube-controllers-bd77b565b-tv5jt</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">/1</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">Running</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">34</span><span style="color:#9ECBFF;">m</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">10.88</span><span style="color:#9ECBFF;">.0.2</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">kube-node-01</span><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">           </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">kube-system</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">calico-node-2nc7p</span><span style="color:#E1E4E8;">                         </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">/1</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">Running</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">34</span><span style="color:#9ECBFF;">m</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">10.103</span><span style="color:#9ECBFF;">.236.152</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">kube-node-02</span><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">           </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">kube-system</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">calico-node-8qw5w</span><span style="color:#E1E4E8;">                         </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">/1</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">Running</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">34</span><span style="color:#9ECBFF;">m</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">10.103</span><span style="color:#9ECBFF;">.236.151</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">kube-node-01</span><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">           </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">kube-system</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">calico-node-sn9xm</span><span style="color:#E1E4E8;">                         </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">/1</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">Running</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">34</span><span style="color:#9ECBFF;">m</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">10.103</span><span style="color:#9ECBFF;">.236.150</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">kube-master-01</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">           </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master-01 init_pack]# kubectl get pod -A -owide</span></span>
<span class="line"><span style="color:#6F42C1;">NAMESPACE</span><span style="color:#24292E;">     </span><span style="color:#032F62;">NAME</span><span style="color:#24292E;">                                      </span><span style="color:#032F62;">READY</span><span style="color:#24292E;">   </span><span style="color:#032F62;">STATUS</span><span style="color:#24292E;">    </span><span style="color:#032F62;">RESTARTS</span><span style="color:#24292E;">   </span><span style="color:#032F62;">AGE</span><span style="color:#24292E;">   </span><span style="color:#032F62;">IP</span><span style="color:#24292E;">               </span><span style="color:#032F62;">NODE</span><span style="color:#24292E;">             </span><span style="color:#032F62;">NOMINATED</span><span style="color:#24292E;"> </span><span style="color:#032F62;">NODE</span><span style="color:#24292E;">   </span><span style="color:#032F62;">READINESS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">GATES</span></span>
<span class="line"><span style="color:#6F42C1;">kube-node-02</span><span style="color:#24292E;">     </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">           </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">kube-system</span><span style="color:#24292E;">   </span><span style="color:#032F62;">calico-kube-controllers-bd77b565b-tv5jt</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">/1</span><span style="color:#24292E;">     </span><span style="color:#032F62;">Running</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">34</span><span style="color:#032F62;">m</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">10.88</span><span style="color:#032F62;">.0.2</span><span style="color:#24292E;">        </span><span style="color:#032F62;">kube-node-01</span><span style="color:#24292E;">     </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">           </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">kube-system</span><span style="color:#24292E;">   </span><span style="color:#032F62;">calico-node-2nc7p</span><span style="color:#24292E;">                         </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">/1</span><span style="color:#24292E;">     </span><span style="color:#032F62;">Running</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">34</span><span style="color:#032F62;">m</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">10.103</span><span style="color:#032F62;">.236.152</span><span style="color:#24292E;">   </span><span style="color:#032F62;">kube-node-02</span><span style="color:#24292E;">     </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">           </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">kube-system</span><span style="color:#24292E;">   </span><span style="color:#032F62;">calico-node-8qw5w</span><span style="color:#24292E;">                         </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">/1</span><span style="color:#24292E;">     </span><span style="color:#032F62;">Running</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">34</span><span style="color:#032F62;">m</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">10.103</span><span style="color:#032F62;">.236.151</span><span style="color:#24292E;">   </span><span style="color:#032F62;">kube-node-01</span><span style="color:#24292E;">     </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">           </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">kube-system</span><span style="color:#24292E;">   </span><span style="color:#032F62;">calico-node-sn9xm</span><span style="color:#24292E;">                         </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">/1</span><span style="color:#24292E;">     </span><span style="color:#032F62;">Running</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">34</span><span style="color:#032F62;">m</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">10.103</span><span style="color:#032F62;">.236.150</span><span style="color:#24292E;">   </span><span style="color:#032F62;">kube-master-01</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">           </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h5 id="calicoctl客户端工具" tabindex="-1"><strong>calicoctl客户端工具</strong> <a class="header-anchor" href="#calicoctl客户端工具" aria-label="Permalink to &quot;**calicoctl客户端工具**&quot;">​</a></h5><p>下载地址：<a href="https://github.com/projectcalico/calico" target="_blank" rel="noreferrer">https://github.com/projectcalico/calico</a></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#创建配置文件</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/calico</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">/etc/calico/calicoctl.cfg</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">apiVersion: projectcalico.org/v3</span></span>
<span class="line"><span style="color:#9ECBFF;">kind: CalicoAPIConfig</span></span>
<span class="line"><span style="color:#9ECBFF;">metadata:</span></span>
<span class="line"><span style="color:#9ECBFF;">spec:</span></span>
<span class="line"><span style="color:#9ECBFF;">  datastoreType: &quot;kubernetes&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  kubeconfig: &quot;/root/.kube/config&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#验证</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 init_pack]# calicoctl node status</span></span>
<span class="line"><span style="color:#B392F0;">Calico</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">process</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">is</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">running.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">IPv4</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">BGP</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span></span>
<span class="line"><span style="color:#B392F0;">+----------------+-------------------+-------+----------+-------------+</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">PEER</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ADDRESS</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">     </span><span style="color:#B392F0;">PEER</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">TYPE</span><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">STATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">SINCE</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">INFO</span><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#B392F0;">+----------------+-------------------+-------+----------+-------------+</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">10.103.236.151</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">node-to-node</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mesh</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">up</span><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">02:11:45</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Established</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">10.103.236.152</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">node-to-node</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mesh</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">up</span><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">02:11:48</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Established</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#B392F0;">+----------------+-------------------+-------+----------+-------------+</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">IPv6</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">BGP</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span></span>
<span class="line"><span style="color:#B392F0;">No</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">IPv6</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">peers</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">found.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#创建配置文件</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/calico</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">/etc/calico/calicoctl.cfg</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">apiVersion: projectcalico.org/v3</span></span>
<span class="line"><span style="color:#032F62;">kind: CalicoAPIConfig</span></span>
<span class="line"><span style="color:#032F62;">metadata:</span></span>
<span class="line"><span style="color:#032F62;">spec:</span></span>
<span class="line"><span style="color:#032F62;">  datastoreType: &quot;kubernetes&quot;</span></span>
<span class="line"><span style="color:#032F62;">  kubeconfig: &quot;/root/.kube/config&quot;</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#验证</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 init_pack]# calicoctl node status</span></span>
<span class="line"><span style="color:#6F42C1;">Calico</span><span style="color:#24292E;"> </span><span style="color:#032F62;">process</span><span style="color:#24292E;"> </span><span style="color:#032F62;">is</span><span style="color:#24292E;"> </span><span style="color:#032F62;">running.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">IPv4</span><span style="color:#24292E;"> </span><span style="color:#032F62;">BGP</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span></span>
<span class="line"><span style="color:#6F42C1;">+----------------+-------------------+-------+----------+-------------+</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">  </span><span style="color:#6F42C1;">PEER</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ADDRESS</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">     </span><span style="color:#6F42C1;">PEER</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TYPE</span><span style="color:#24292E;">     </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">STATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">  </span><span style="color:#6F42C1;">SINCE</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">    </span><span style="color:#6F42C1;">INFO</span><span style="color:#24292E;">     </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#6F42C1;">+----------------+-------------------+-------+----------+-------------+</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">10.103.236.151</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">node-to-node</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mesh</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">up</span><span style="color:#24292E;">    </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">02:11:45</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Established</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">10.103.236.152</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">node-to-node</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mesh</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">up</span><span style="color:#24292E;">    </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">02:11:48</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Established</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#6F42C1;">+----------------+-------------------+-------+----------+-------------+</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">IPv6</span><span style="color:#24292E;"> </span><span style="color:#032F62;">BGP</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span></span>
<span class="line"><span style="color:#6F42C1;">No</span><span style="color:#24292E;"> </span><span style="color:#032F62;">IPv6</span><span style="color:#24292E;"> </span><span style="color:#032F62;">peers</span><span style="color:#24292E;"> </span><span style="color:#032F62;">found.</span></span></code></pre></div><h4 id="_2-coredns" tabindex="-1">2.coredns <a class="header-anchor" href="#_2-coredns" aria-label="Permalink to &quot;2.coredns&quot;">​</a></h4><p>官方文档，<strong><a href="https://coredns.io/plugins/ready/" target="_blank" rel="noreferrer">https://coredns.io/plugins/ready/</a></strong></p><p>CoreDNS用于集群内部Service名称解析</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://raw.githubusercontent.com/coredns/deployment/master/kubernetes/coredns.yaml.sed</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#修改corefile.yaml</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">Corefile:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">.</span><span style="color:#E1E4E8;">:53 </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">log</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">errors</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">health</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">lameduck</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5</span><span style="color:#9ECBFF;">s</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">ready</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">kubernetes</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cluster.local</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">in-addr.arpa</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ip6.arpa</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#修改为</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">pods</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">insecure</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">fallthrough</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">in-addr.arpa</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ip6.arpa</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">ttl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">prometheus</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">:9153</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">forward</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/resolv.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#修改为本机的resolv.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">cache</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">loop</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">reload</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">loadbalance</span></span>
<span class="line"><span style="color:#E1E4E8;">    }#去掉这个地方的后缀</span></span>
<span class="line"><span style="color:#6A737D;">#修改文件，参考/etc/kubernetes/kubelet-config.yml 配置文件中的clusterIP</span></span>
<span class="line"><span style="color:#B392F0;">spec:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">selector:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">k8s-app:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-dns</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">clusterIP:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10.96</span><span style="color:#9ECBFF;">.0.10</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#根据自己需求进行修改</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://raw.githubusercontent.com/coredns/deployment/master/kubernetes/coredns.yaml.sed</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#修改corefile.yaml</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Corefile:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">.</span><span style="color:#24292E;">:53 </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">log</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">errors</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">health</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">lameduck</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span><span style="color:#032F62;">s</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">ready</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">kubernetes</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cluster.local</span><span style="color:#24292E;"> </span><span style="color:#032F62;">in-addr.arpa</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ip6.arpa</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#修改为</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">pods</span><span style="color:#24292E;"> </span><span style="color:#032F62;">insecure</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">fallthrough</span><span style="color:#24292E;"> </span><span style="color:#032F62;">in-addr.arpa</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ip6.arpa</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">ttl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">prometheus</span><span style="color:#24292E;"> </span><span style="color:#032F62;">:9153</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">forward</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/resolv.conf</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#修改为本机的resolv.conf</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">cache</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">loop</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">reload</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">loadbalance</span></span>
<span class="line"><span style="color:#24292E;">    }#去掉这个地方的后缀</span></span>
<span class="line"><span style="color:#6A737D;">#修改文件，参考/etc/kubernetes/kubelet-config.yml 配置文件中的clusterIP</span></span>
<span class="line"><span style="color:#6F42C1;">spec:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">selector:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">k8s-app:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-dns</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">clusterIP:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10.96</span><span style="color:#032F62;">.0.10</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#根据自己需求进行修改</span></span></code></pre></div><h3 id="_3-6-5部署-metrics-server" tabindex="-1">3.6.5部署 Metrics Server <a class="header-anchor" href="#_3-6-5部署-metrics-server" aria-label="Permalink to &quot;3.6.5部署 Metrics Server&quot;">​</a></h3><p>各版本对应关系</p><table><thead><tr><th>Metrics Server</th><th>kubernetes</th></tr></thead><tbody><tr><td><a href="https://github.com/kubernetes-sigs/metrics-server/releases/tag/v0.7.2" target="_blank" rel="noreferrer">v0.7.2</a></td><td>v1.29.8</td></tr><tr><td><a href="https://github.com/kubernetes-sigs/metrics-server/releases/tag/v0.7.1" target="_blank" rel="noreferrer">v0.7.1</a></td><td>v1.29.2</td></tr><tr><td><a href="https://github.com/kubernetes-sigs/metrics-server/releases/tag/v0.6.3" target="_blank" rel="noreferrer">v0.6.3</a></td><td>v1.23.17</td></tr><tr><td><a href="https://github.com/kubernetes-sigs/metrics-server/releases/tag/v0.6.0" target="_blank" rel="noreferrer">v0.6.0</a></td><td>v1.22.2</td></tr></tbody></table><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#下载最新</span></span>
<span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#下载最新</span></span>
<span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml</span></span></code></pre></div><ul><li>修改配置</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 修改配置</span></span>
<span class="line"><span style="color:#B392F0;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">components.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#6A737D;"># 1</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">args:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--cert-dir=/tmp</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--secure-port=10250</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--kubelet-use-node-status-port</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--metric-resolution=15s</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--kubelet-insecure-tls</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.pem</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--requestheader-username-headers=X-Remote-User</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--requestheader-group-headers=X-Remote-Group</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--requestheader-extra-headers-prefix=X-Remote-Extra-</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 2</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">volumeMounts:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mountPath:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/tmp</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tmp-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ca-ssl</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">mountPath:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 3</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">volumes:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">emptyDir:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{}</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tmp-dir</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ca-ssl</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">hostPath:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">path:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/pki</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 修改配置</span></span>
<span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">components.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#6A737D;"># 1</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">args:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--cert-dir=/tmp</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--secure-port=10250</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--kubelet-use-node-status-port</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--metric-resolution=15s</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--kubelet-insecure-tls</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.pem</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--requestheader-username-headers=X-Remote-User</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--requestheader-group-headers=X-Remote-Group</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--requestheader-extra-headers-prefix=X-Remote-Extra-</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 2</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">volumeMounts:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mountPath:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/tmp</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tmp-dir</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ca-ssl</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">mountPath:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 3</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">volumes:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">emptyDir:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{}</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tmp-dir</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ca-ssl</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">hostPath:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">path:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/pki</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span></code></pre></div><ul><li>执行</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">components.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">components.yaml</span></span></code></pre></div><ul><li>查看效果</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@kube-master-01 init_pack]# kubectl top node</span></span>
<span class="line"><span style="color:#e1e4e8;">NAME             CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%</span></span>
<span class="line"><span style="color:#e1e4e8;">kube-master-01   263m         13%    1487Mi          39%</span></span>
<span class="line"><span style="color:#e1e4e8;">kube-node-01     212m         10%    593Mi           15%</span></span>
<span class="line"><span style="color:#e1e4e8;">kube-node-02     162m         8%     566Mi           14%</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@kube-master-01 init_pack]# kubectl top node</span></span>
<span class="line"><span style="color:#24292e;">NAME             CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%</span></span>
<span class="line"><span style="color:#24292e;">kube-master-01   263m         13%    1487Mi          39%</span></span>
<span class="line"><span style="color:#24292e;">kube-node-01     212m         10%    593Mi           15%</span></span>
<span class="line"><span style="color:#24292e;">kube-node-02     162m         8%     566Mi           14%</span></span></code></pre></div><h3 id="_3-6-6-验证集群" tabindex="-1">3.6.6 验证集群 <a class="header-anchor" href="#_3-6-6-验证集群" aria-label="Permalink to &quot;3.6.6 验证集群&quot;">​</a></h3><blockquote><p>集群结果：</p><ol><li>Pod必须能解析Service</li><li>Pod必须能解析跨namespace的Service</li><li>每个节点都必须要能访问Kubernetes的kubernetes svc 443和kube-dns的service 53</li><li>Pod和Pod之前要能通</li></ol><p>a) 同namespace能通信</p><p>b) 跨namespace能通信</p><p>c) 跨机器能通信</p></blockquote><h4 id="_1-创建" tabindex="-1">1.创建 <a class="header-anchor" href="#_1-创建" aria-label="Permalink to &quot;1.创建&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">deployment</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--image=nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--replicas=3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#创建负载均衡</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">expose</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">deployment</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--port=8080</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--target-port=80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看pod，默认命名空间是defalut</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 CoreDNS]# kubectl get pod</span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">                     </span><span style="color:#9ECBFF;">READY</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">STATUS</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">RESTARTS</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">AGE</span></span>
<span class="line"><span style="color:#B392F0;">nginx-7854ff8877-8z9jj</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">/1</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">Running</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">118</span><span style="color:#9ECBFF;">s</span></span>
<span class="line"><span style="color:#B392F0;">nginx-7854ff8877-985nf</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">/1</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">Running</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">118</span><span style="color:#9ECBFF;">s</span></span>
<span class="line"><span style="color:#B392F0;">nginx-7854ff8877-9sszv</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">/1</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">Running</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">118</span><span style="color:#9ECBFF;">s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看service</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 CoreDNS]#  kubectl get service</span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">TYPE</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">CLUSTER-IP</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">EXTERNAL-IP</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">PORT</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">S</span><span style="color:#E1E4E8;">)    </span><span style="color:#9ECBFF;">AGE</span></span>
<span class="line"><span style="color:#B392F0;">kubernetes</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">ClusterIP</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.0.1</span><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">443</span><span style="color:#9ECBFF;">/TCP</span><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">151</span><span style="color:#9ECBFF;">m</span></span>
<span class="line"><span style="color:#B392F0;">nginx</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">ClusterIP</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.212.179</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">8080</span><span style="color:#9ECBFF;">/TCP</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">119</span><span style="color:#9ECBFF;">s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#验证svc</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 CoreDNS]# curl -I 192.168.212.179:8080</span></span>
<span class="line"><span style="color:#B392F0;">HTTP/1.1</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">OK</span></span>
<span class="line"><span style="color:#B392F0;">Server:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx/1.27.1</span></span>
<span class="line"><span style="color:#B392F0;">Date:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Sun,</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Sep</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2024</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">05</span><span style="color:#9ECBFF;">:25:47</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">GMT</span></span>
<span class="line"><span style="color:#B392F0;">Content-Type:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">text/html</span></span>
<span class="line"><span style="color:#B392F0;">Content-Length:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">615</span></span>
<span class="line"><span style="color:#B392F0;">Last-Modified:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Mon,</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Aug</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2024</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">14</span><span style="color:#9ECBFF;">:21:01</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">GMT</span></span>
<span class="line"><span style="color:#B392F0;">Connection:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">keep-alive</span></span>
<span class="line"><span style="color:#B392F0;">ETag:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;66ba1a4d-267&quot;</span></span>
<span class="line"><span style="color:#B392F0;">Accept-Ranges:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bytes</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> </span><span style="color:#032F62;">deployment</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--image=nginx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--replicas=3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#创建负载均衡</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">expose</span><span style="color:#24292E;"> </span><span style="color:#032F62;">deployment</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--port=8080</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--target-port=80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看pod，默认命名空间是defalut</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 CoreDNS]# kubectl get pod</span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">                     </span><span style="color:#032F62;">READY</span><span style="color:#24292E;">   </span><span style="color:#032F62;">STATUS</span><span style="color:#24292E;">    </span><span style="color:#032F62;">RESTARTS</span><span style="color:#24292E;">   </span><span style="color:#032F62;">AGE</span></span>
<span class="line"><span style="color:#6F42C1;">nginx-7854ff8877-8z9jj</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">/1</span><span style="color:#24292E;">     </span><span style="color:#032F62;">Running</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">118</span><span style="color:#032F62;">s</span></span>
<span class="line"><span style="color:#6F42C1;">nginx-7854ff8877-985nf</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">/1</span><span style="color:#24292E;">     </span><span style="color:#032F62;">Running</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">118</span><span style="color:#032F62;">s</span></span>
<span class="line"><span style="color:#6F42C1;">nginx-7854ff8877-9sszv</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">/1</span><span style="color:#24292E;">     </span><span style="color:#032F62;">Running</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">118</span><span style="color:#032F62;">s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看service</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 CoreDNS]#  kubectl get service</span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">         </span><span style="color:#032F62;">TYPE</span><span style="color:#24292E;">        </span><span style="color:#032F62;">CLUSTER-IP</span><span style="color:#24292E;">        </span><span style="color:#032F62;">EXTERNAL-IP</span><span style="color:#24292E;">   </span><span style="color:#032F62;">PORT</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">S</span><span style="color:#24292E;">)    </span><span style="color:#032F62;">AGE</span></span>
<span class="line"><span style="color:#6F42C1;">kubernetes</span><span style="color:#24292E;">   </span><span style="color:#032F62;">ClusterIP</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.0.1</span><span style="color:#24292E;">       </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">        </span><span style="color:#005CC5;">443</span><span style="color:#032F62;">/TCP</span><span style="color:#24292E;">    </span><span style="color:#005CC5;">151</span><span style="color:#032F62;">m</span></span>
<span class="line"><span style="color:#6F42C1;">nginx</span><span style="color:#24292E;">        </span><span style="color:#032F62;">ClusterIP</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.212.179</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">        </span><span style="color:#005CC5;">8080</span><span style="color:#032F62;">/TCP</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">119</span><span style="color:#032F62;">s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#验证svc</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 CoreDNS]# curl -I 192.168.212.179:8080</span></span>
<span class="line"><span style="color:#6F42C1;">HTTP/1.1</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;"> </span><span style="color:#032F62;">OK</span></span>
<span class="line"><span style="color:#6F42C1;">Server:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx/1.27.1</span></span>
<span class="line"><span style="color:#6F42C1;">Date:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Sun,</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">22</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Sep</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2024</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">05</span><span style="color:#032F62;">:25:47</span><span style="color:#24292E;"> </span><span style="color:#032F62;">GMT</span></span>
<span class="line"><span style="color:#6F42C1;">Content-Type:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">text/html</span></span>
<span class="line"><span style="color:#6F42C1;">Content-Length:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">615</span></span>
<span class="line"><span style="color:#6F42C1;">Last-Modified:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Mon,</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Aug</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2024</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">14</span><span style="color:#032F62;">:21:01</span><span style="color:#24292E;"> </span><span style="color:#032F62;">GMT</span></span>
<span class="line"><span style="color:#6F42C1;">Connection:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">keep-alive</span></span>
<span class="line"><span style="color:#6F42C1;">ETag:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;66ba1a4d-267&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">Accept-Ranges:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bytes</span></span></code></pre></div><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#或者</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">cat &lt;&lt;EOF | kubectl create -f -</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx-deployment</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx:1.25.1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">80</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Service</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx-service</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">80</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">targetPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">80</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">nodePort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30080</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">NodePort</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看</span></span>
<span class="line"><span style="color:#9ECBFF;">kubectl get pod</span></span>
<span class="line"><span style="color:#9ECBFF;">kubectl get svc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#或者</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">cat &lt;&lt;EOF | kubectl create -f -</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx-deployment</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx:1.25.1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">80</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Service</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx-service</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">80</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">targetPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">80</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">nodePort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30080</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">NodePort</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看</span></span>
<span class="line"><span style="color:#032F62;">kubectl get pod</span></span>
<span class="line"><span style="color:#032F62;">kubectl get svc</span></span></code></pre></div><h4 id="_2-检查ip连通性" tabindex="-1">2.检查ip连通性 <a class="header-anchor" href="#_2-检查ip连通性" aria-label="Permalink to &quot;2.检查ip连通性&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 CoreDNS]# kubectl get pod -owide</span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">                     </span><span style="color:#9ECBFF;">READY</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">STATUS</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">RESTARTS</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">AGE</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">IP</span><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">NODE</span><span style="color:#E1E4E8;">             </span><span style="color:#9ECBFF;">NOMINATED</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">NODE</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">READINESS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">GATES</span></span>
<span class="line"><span style="color:#B392F0;">nginx-7854ff8877-8z9jj</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">/1</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">Running</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">4</span><span style="color:#9ECBFF;">m35s</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">172.18</span><span style="color:#9ECBFF;">.10.65</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">kube-node-01</span><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">           </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">nginx-7854ff8877-985nf</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">/1</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">Running</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">4</span><span style="color:#9ECBFF;">m35s</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">172.25</span><span style="color:#9ECBFF;">.241.2</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">kube-node-02</span><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">           </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">nginx-7854ff8877-9sszv</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">/1</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">Running</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">4</span><span style="color:#9ECBFF;">m35s</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">172.18</span><span style="color:#9ECBFF;">.201.68</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">kube-master-01</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">           </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#在每个节点上ping其他pod节点上的ip</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exec</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-ti</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">busybox</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sh</span></span>
<span class="line"><span style="color:#B392F0;">/#ping</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">pod_ip</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master-01 CoreDNS]# kubectl get pod -owide</span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">                     </span><span style="color:#032F62;">READY</span><span style="color:#24292E;">   </span><span style="color:#032F62;">STATUS</span><span style="color:#24292E;">    </span><span style="color:#032F62;">RESTARTS</span><span style="color:#24292E;">   </span><span style="color:#032F62;">AGE</span><span style="color:#24292E;">     </span><span style="color:#032F62;">IP</span><span style="color:#24292E;">              </span><span style="color:#032F62;">NODE</span><span style="color:#24292E;">             </span><span style="color:#032F62;">NOMINATED</span><span style="color:#24292E;"> </span><span style="color:#032F62;">NODE</span><span style="color:#24292E;">   </span><span style="color:#032F62;">READINESS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">GATES</span></span>
<span class="line"><span style="color:#6F42C1;">nginx-7854ff8877-8z9jj</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">/1</span><span style="color:#24292E;">     </span><span style="color:#032F62;">Running</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">4</span><span style="color:#032F62;">m35s</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">172.18</span><span style="color:#032F62;">.10.65</span><span style="color:#24292E;">    </span><span style="color:#032F62;">kube-node-01</span><span style="color:#24292E;">     </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">           </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">nginx-7854ff8877-985nf</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">/1</span><span style="color:#24292E;">     </span><span style="color:#032F62;">Running</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">4</span><span style="color:#032F62;">m35s</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">172.25</span><span style="color:#032F62;">.241.2</span><span style="color:#24292E;">    </span><span style="color:#032F62;">kube-node-02</span><span style="color:#24292E;">     </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">           </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">nginx-7854ff8877-9sszv</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">/1</span><span style="color:#24292E;">     </span><span style="color:#032F62;">Running</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">4</span><span style="color:#032F62;">m35s</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">172.18</span><span style="color:#032F62;">.201.68</span><span style="color:#24292E;">   </span><span style="color:#032F62;">kube-master-01</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">           </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#在每个节点上ping其他pod节点上的ip</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">exec</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-ti</span><span style="color:#24292E;"> </span><span style="color:#032F62;">busybox</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sh</span></span>
<span class="line"><span style="color:#6F42C1;">/#ping</span><span style="color:#24292E;">  </span><span style="color:#032F62;">pod_ip</span></span></code></pre></div><h4 id="_3-检查service可达性" tabindex="-1">3.检查service可达性 <a class="header-anchor" href="#_3-检查service可达性" aria-label="Permalink to &quot;3.检查service可达性&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#在每个节点上访问服务</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">service-ip:port</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#在每个节点上访问服务</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">service-ip:port</span></span></code></pre></div><h4 id="_4-检查dns" tabindex="-1">4.检查dns <a class="header-anchor" href="#_4-检查dns" aria-label="Permalink to &quot;4.检查dns&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat&lt;&lt;EOF</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span></span>
<span class="line"><span style="color:#B392F0;">apiVersion:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#B392F0;">kind:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Pod</span></span>
<span class="line"><span style="color:#B392F0;">metadata:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">namespace:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">default</span></span>
<span class="line"><span style="color:#B392F0;">spec:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">containers:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">image:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">busybox:1.28.3</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">command</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sleep</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;3600&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">imagePullPolicy:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">IfNotPresent</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">restartPolicy:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Always</span></span>
<span class="line"><span style="color:#B392F0;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat&lt;&lt;EOF</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span></span>
<span class="line"><span style="color:#6F42C1;">apiVersion:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#6F42C1;">kind:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Pod</span></span>
<span class="line"><span style="color:#6F42C1;">metadata:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">busybox</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">namespace:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#6F42C1;">spec:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">containers:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">busybox</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">image:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">busybox:1.28.3</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">command</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sleep</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;3600&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">imagePullPolicy:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">IfNotPresent</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">restartPolicy:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Always</span></span>
<span class="line"><span style="color:#6F42C1;">EOF</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#进入pod容器中去</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 CoreDNS]# kubectl exec -it nginx-7854ff8877-9sszv /bin/bash</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exec</span><span style="color:#E1E4E8;"> [POD] [COMMAND] is DEPRECATED and will be removed </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> a future version. Use kubectl exec [POD] -- [COMMAND] instead.</span></span>
<span class="line"><span style="color:#B392F0;">root@nginx-7854ff8877-9sszv:/#</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看dns解析</span></span>
<span class="line"><span style="color:#B392F0;">root@nginx-7854ff8877-9sszv:/#</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/resolv.conf</span></span>
<span class="line"><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">default.svc.cluster.local</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">svc.cluster.local</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cluster.local</span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.0.10</span></span>
<span class="line"><span style="color:#B392F0;">options</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ndots:5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 CoreDNS]# kubectl get service -n kube-system</span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">       </span><span style="color:#9ECBFF;">TYPE</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">CLUSTER-IP</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">EXTERNAL-IP</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">PORT</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">S</span><span style="color:#E1E4E8;">)                  </span><span style="color:#9ECBFF;">AGE</span></span>
<span class="line"><span style="color:#B392F0;">kube-dns</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">ClusterIP</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.0.10</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">53</span><span style="color:#9ECBFF;">/UDP,53/TCP,9153/TCP</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">24</span><span style="color:#9ECBFF;">m</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">root@nginx-7854ff8877-9sszv:/#</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-I</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx.default.svc.cluster.local:8080</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#进入pod容器中去</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 CoreDNS]# kubectl exec -it nginx-7854ff8877-9sszv /bin/bash</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">exec</span><span style="color:#24292E;"> [POD] [COMMAND] is DEPRECATED and will be removed </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> a future version. Use kubectl exec [POD] -- [COMMAND] instead.</span></span>
<span class="line"><span style="color:#6F42C1;">root@nginx-7854ff8877-9sszv:/#</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看dns解析</span></span>
<span class="line"><span style="color:#6F42C1;">root@nginx-7854ff8877-9sszv:/#</span><span style="color:#24292E;">  </span><span style="color:#032F62;">cat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/resolv.conf</span></span>
<span class="line"><span style="color:#6F42C1;">search</span><span style="color:#24292E;"> </span><span style="color:#032F62;">default.svc.cluster.local</span><span style="color:#24292E;"> </span><span style="color:#032F62;">svc.cluster.local</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cluster.local</span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.0.10</span></span>
<span class="line"><span style="color:#6F42C1;">options</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ndots:5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 CoreDNS]# kubectl get service -n kube-system</span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">       </span><span style="color:#032F62;">TYPE</span><span style="color:#24292E;">        </span><span style="color:#032F62;">CLUSTER-IP</span><span style="color:#24292E;">     </span><span style="color:#032F62;">EXTERNAL-IP</span><span style="color:#24292E;">   </span><span style="color:#032F62;">PORT</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">S</span><span style="color:#24292E;">)                  </span><span style="color:#032F62;">AGE</span></span>
<span class="line"><span style="color:#6F42C1;">kube-dns</span><span style="color:#24292E;">   </span><span style="color:#032F62;">ClusterIP</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.0.10</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">        </span><span style="color:#005CC5;">53</span><span style="color:#032F62;">/UDP,53/TCP,9153/TCP</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">24</span><span style="color:#032F62;">m</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">root@nginx-7854ff8877-9sszv:/#</span><span style="color:#24292E;"> </span><span style="color:#032F62;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-I</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx.default.svc.cluster.local:8080</span></span></code></pre></div><ul><li>用pod解析默认命名空间中的kubernetes</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">svc</span></span>
<span class="line"><span style="color:#6A737D;">#NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE</span></span>
<span class="line"><span style="color:#B392F0;">kubernetes</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">ClusterIP</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.0.1</span><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">443</span><span style="color:#9ECBFF;">/TCP</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">32</span><span style="color:#9ECBFF;">d</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# kubectl exec  busybox -n default -- nslookup kubernetes</span></span>
<span class="line"><span style="color:#B392F0;">Server:</span><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.0.10</span></span>
<span class="line"><span style="color:#B392F0;">Address</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.0.10</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-dns.kube-system.svc.cluster.local</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">Name:</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">kubernetes</span></span>
<span class="line"><span style="color:#B392F0;">Address</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.0.1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubernetes.default.svc.cluster.local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">svc</span></span>
<span class="line"><span style="color:#6A737D;">#NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE</span></span>
<span class="line"><span style="color:#6F42C1;">kubernetes</span><span style="color:#24292E;">    </span><span style="color:#032F62;">ClusterIP</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.0.1</span><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">        </span><span style="color:#005CC5;">443</span><span style="color:#032F62;">/TCP</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">32</span><span style="color:#032F62;">d</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@kube-master-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# kubectl exec  busybox -n default -- nslookup kubernetes</span></span>
<span class="line"><span style="color:#6F42C1;">Server:</span><span style="color:#24292E;">    </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.0.10</span></span>
<span class="line"><span style="color:#6F42C1;">Address</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.0.10</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-dns.kube-system.svc.cluster.local</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">Name:</span><span style="color:#24292E;">      </span><span style="color:#032F62;">kubernetes</span></span>
<span class="line"><span style="color:#6F42C1;">Address</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.0.1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubernetes.default.svc.cluster.local</span></span></code></pre></div><ul><li><h4 id="测试跨命名空间是否可以解析" tabindex="-1">测试跨命名空间是否可以解析 <a class="header-anchor" href="#测试跨命名空间是否可以解析" aria-label="Permalink to &quot;测试跨命名空间是否可以解析&quot;">​</a></h4></li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# kubectl exec  busybox -n default -- nslookup kube-dns.kube-system</span></span>
<span class="line"><span style="color:#B392F0;">Server:</span><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.0.10</span></span>
<span class="line"><span style="color:#B392F0;">Address</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.0.10</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-dns.kube-system.svc.cluster.local</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">Name:</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">kube-dns.kube-system</span></span>
<span class="line"><span style="color:#B392F0;">Address</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.0.10</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-dns.kube-system.svc.cluster.local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# kubectl exec  busybox -n default -- nslookup kube-dns.kube-system</span></span>
<span class="line"><span style="color:#6F42C1;">Server:</span><span style="color:#24292E;">    </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.0.10</span></span>
<span class="line"><span style="color:#6F42C1;">Address</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.0.10</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-dns.kube-system.svc.cluster.local</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">Name:</span><span style="color:#24292E;">      </span><span style="color:#032F62;">kube-dns.kube-system</span></span>
<span class="line"><span style="color:#6F42C1;">Address</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.0.10</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-dns.kube-system.svc.cluster.local</span></span></code></pre></div><h2 id="_3-7-安装命令补全" tabindex="-1">3.7 安装命令补全 <a class="header-anchor" href="#_3-7-安装命令补全" aria-label="Permalink to &quot;3.7 安装命令补全&quot;">​</a></h2><p><a href="https://kubernetes.io/docs/tasks/tools/#enabling-shell-autocompletion" target="_blank" rel="noreferrer">官当</a></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bash-completion</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span></span>
<span class="line"><span style="color:#79B8FF;">source</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/share/bash-completion/bash_completion</span></span>
<span class="line"><span style="color:#79B8FF;">source</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&lt;(</span><span style="color:#B392F0;">kubectl</span><span style="color:#9ECBFF;"> completion bash)</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;source &lt;(kubectl completion bash)&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">~/.bashrc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bash-completion</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span></span>
<span class="line"><span style="color:#005CC5;">source</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/share/bash-completion/bash_completion</span></span>
<span class="line"><span style="color:#005CC5;">source</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&lt;(</span><span style="color:#6F42C1;">kubectl</span><span style="color:#032F62;"> completion bash)</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;source &lt;(kubectl completion bash)&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~/.bashrc</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">alias</span><span style="color:#E1E4E8;"> ectl</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;etcdhelper  --endpoints=&quot;10.103.236.150:2379,10.103.236.151:2379,10.103.236.152:2379&quot; --cacert=/etc/etcd/ssl/etcd-ca.pem --cert=/etc/etcd/ssl/etcd.pem --key=/etc/etcd/ssl/etcd-key.pem&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看当前的 schedule 主节点</span></span>
<span class="line"><span style="color:#B392F0;">ectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/registry/leases/kube-system/kube-scheduler</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看当前的 controllermanager 主节点</span></span>
<span class="line"><span style="color:#B392F0;">ectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/registry/leases/kube-system/kube-controller-manager</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/profile</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;"># ETCD 变量</span></span>
<span class="line"><span style="color:#9ECBFF;">export ETCDCTL_API=3</span></span>
<span class="line"><span style="color:#9ECBFF;">alias etcdctl=&#39;etcdctl --endpoints=&quot;10.103.236.150:2379,10.103.236.151:2379,10.103.236.152:2379&quot; --cacert=/etc/etcd/ssl/etcd-ca.pem --cert=/etc/etcd/ssl/etcd.pem --key=/etc/etcd/ssl/etcd-key.pem&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">alias</span><span style="color:#24292E;"> ectl</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;etcdhelper  --endpoints=&quot;10.103.236.150:2379,10.103.236.151:2379,10.103.236.152:2379&quot; --cacert=/etc/etcd/ssl/etcd-ca.pem --cert=/etc/etcd/ssl/etcd.pem --key=/etc/etcd/ssl/etcd-key.pem&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看当前的 schedule 主节点</span></span>
<span class="line"><span style="color:#6F42C1;">ectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/registry/leases/kube-system/kube-scheduler</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看当前的 controllermanager 主节点</span></span>
<span class="line"><span style="color:#6F42C1;">ectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/registry/leases/kube-system/kube-controller-manager</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/profile</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;"># ETCD 变量</span></span>
<span class="line"><span style="color:#032F62;">export ETCDCTL_API=3</span></span>
<span class="line"><span style="color:#032F62;">alias etcdctl=&#39;etcdctl --endpoints=&quot;10.103.236.150:2379,10.103.236.151:2379,10.103.236.152:2379&quot; --cacert=/etc/etcd/ssl/etcd-ca.pem --cert=/etc/etcd/ssl/etcd.pem --key=/etc/etcd/ssl/etcd-key.pem&#39;</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><blockquote><p>读取 etcd 的方式：<a href="https://github.com/openshift/origin/tree/master/tools/etcdhelper" target="_blank" rel="noreferrer">https://github.com/openshift/origin/tree/master/tools/etcdhelper</a></p></blockquote><h2 id="_3-8-修改k8s数据目录" tabindex="-1">3.8 修改k8s数据目录 <a class="header-anchor" href="#_3-8-修改k8s数据目录" aria-label="Permalink to &quot;3.8 修改k8s数据目录&quot;">​</a></h2><h2 id="_3-9-faq" tabindex="-1">3.9 FAQ <a class="header-anchor" href="#_3-9-faq" aria-label="Permalink to &quot;3.9 FAQ&quot;">​</a></h2><p>[ERROR] Get &quot;<a href="https://192.168.0.1/api?timeout=32s" target="_blank" rel="noreferrer">https://192.168.0.1:443/api?timeout=32s</a>&quot;: tls: failed to verify certificate: x509: certificate is valid for 127.0.0.1,10.103.236.150,10.103.236.151,10.103.236.152, not 192.168.0.1</p><p>报错原因: 使用&quot;192.168.0.1&quot;作为svc地址，和证书预定义的svc的IP地址不匹配导致的错误。</p>`,276),e=[o];function t(c,r,y,i,E,F){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{C as __pageData,d as default};
