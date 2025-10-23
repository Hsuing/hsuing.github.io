import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1. ingress-nginx-controller Pod","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/Ingress/ingress_nginx/4-调优.md","filePath":"guide/container/k8s/Ingress/ingress_nginx/4-调优.md","lastUpdated":1716564011000}'),p={name:"guide/container/k8s/Ingress/ingress_nginx/4-调优.md"},l=e(`<h1 id="_1-ingress-nginx-controller-pod" tabindex="-1">1. ingress-nginx-controller Pod <a class="header-anchor" href="#_1-ingress-nginx-controller-pod" aria-label="Permalink to &quot;1. ingress-nginx-controller Pod&quot;">​</a></h1><p><a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/" target="_blank" rel="noreferrer">nginx-ingress-controller的配置方法</a></p><h2 id="_1-1-pod-容器内核优化" tabindex="-1">1.1 Pod 容器内核优化 <a class="header-anchor" href="#_1-1-pod-容器内核优化" aria-label="Permalink to &quot;1.1 Pod 容器内核优化&quot;">​</a></h2><p>在 ingress-nginx-controller 容器的 deploy.spec.template.spec 添加 initContainers</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">initContainers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">systctl</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alpine:3.10</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">imagePullPolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">IfNotPresent</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">command</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">sh</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">-c</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">              mount -o remount rw /proc/sys</span></span>
<span class="line"><span style="color:#9ECBFF;">              sysctl -w net.core.somaxconn=65535</span></span>
<span class="line"><span style="color:#9ECBFF;">              sysctl -w net.ipv4.tcp_tw_reuse=1</span></span>
<span class="line"><span style="color:#9ECBFF;">              sysctl -w net.ipv4.ip_local_port_range=&quot;1024 65535&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">              sysctl -w fs.file-max=1048576</span></span>
<span class="line"><span style="color:#9ECBFF;">              sysctl -w fs.inotify.max_user_instances=16384</span></span>
<span class="line"><span style="color:#9ECBFF;">              sysctl -w fs.inotify.max_user_watches=524288</span></span>
<span class="line"><span style="color:#9ECBFF;">              sysctl -w fs.inotify.max_queued_events=16384</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">securityContext</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">privileged</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">initContainers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">systctl</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alpine:3.10</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">imagePullPolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">IfNotPresent</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">command</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">sh</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">-c</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">              mount -o remount rw /proc/sys</span></span>
<span class="line"><span style="color:#032F62;">              sysctl -w net.core.somaxconn=65535</span></span>
<span class="line"><span style="color:#032F62;">              sysctl -w net.ipv4.tcp_tw_reuse=1</span></span>
<span class="line"><span style="color:#032F62;">              sysctl -w net.ipv4.ip_local_port_range=&quot;1024 65535&quot;</span></span>
<span class="line"><span style="color:#032F62;">              sysctl -w fs.file-max=1048576</span></span>
<span class="line"><span style="color:#032F62;">              sysctl -w fs.inotify.max_user_instances=16384</span></span>
<span class="line"><span style="color:#032F62;">              sysctl -w fs.inotify.max_user_watches=524288</span></span>
<span class="line"><span style="color:#032F62;">              sysctl -w fs.inotify.max_queued_events=16384</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">securityContext</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">privileged</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span></code></pre></div><h1 id="_2-configmap" tabindex="-1">2 configmap <a class="header-anchor" href="#_2-configmap" aria-label="Permalink to &quot;2 configmap&quot;">​</a></h1><h2 id="_2-1-查看nginx-conf配置" tabindex="-1">2.1 查看nginx.conf配置 <a class="header-anchor" href="#_2-1-查看nginx-conf配置" aria-label="Permalink to &quot;2.1  查看nginx.conf配置&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master ingress]# kubectl -n ingress-nginx exec -ti ingress-nginx-controller-gcv4v cat /etc/nginx/nginx.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master ingress]# kubectl -n ingress-nginx exec -ti ingress-nginx-controller-gcv4v cat /etc/nginx/nginx.conf</span></span></code></pre></div><h2 id="_2-2-ingress-nginx-资源查看" tabindex="-1">2.2 ingress-nginx 资源查看 <a class="header-anchor" href="#_2-2-ingress-nginx-资源查看" aria-label="Permalink to &quot;2.2 ingress-nginx 资源查看&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 查看 Ingress-nginx 全局配置参数:</span></span>
<span class="line"><span style="color:#e1e4e8;">kubectl get cm -n ingress-nginx nginx-ingress-controller -o yaml</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 修改 Ingress-nginx 全局配置参数:</span></span>
<span class="line"><span style="color:#e1e4e8;">kubectl edit cm -n ingress-nginx nginx-ingress-controller</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 查看 Ingress-nginx 全局配置参数:</span></span>
<span class="line"><span style="color:#24292e;">kubectl get cm -n ingress-nginx nginx-ingress-controller -o yaml</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 修改 Ingress-nginx 全局配置参数:</span></span>
<span class="line"><span style="color:#24292e;">kubectl edit cm -n ingress-nginx nginx-ingress-controller</span></span></code></pre></div><h2 id="_2-3-参数" tabindex="-1">2.3 参数 <a class="header-anchor" href="#_2-3-参数" aria-label="Permalink to &quot;2.3 参数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 负载工作机制,轮询</span></span>
<span class="line"><span style="color:#e1e4e8;">load-balance: &quot;round_robin&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 错误日志等级设置 (debug, info, notice, warn, error, crit, alert, or emerg)</span></span>
<span class="line"><span style="color:#e1e4e8;">error-log-level: &quot;notice&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 启用Gzip资源压缩 (3k以上)</span></span>
<span class="line"><span style="color:#e1e4e8;">use-gzip: &quot;true&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip-level: &quot;2&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip-min-length: &quot;3072&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip-types: &quot;text/html text/plain text/css text/javascript application/javascript application/x-javascript application/xml application/x-httpd-php application/x-font-ttf application/json image/x-icon image/svg+xml image/avif image/webp font/ttf font/opentype&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 不建议进行照片压缩 image/jpeg image/gif image/png 可能反而会增加其体积</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 启用Brotli资源压缩（同等条件下优于Gzip，任选一个）</span></span>
<span class="line"><span style="color:#e1e4e8;">enable-brotli: &quot;true&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">brotli-level: 5</span></span>
<span class="line"><span style="color:#e1e4e8;">brotli-min-length: &#39;3072&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">brotli-types: &#39;text/xml image/svg+xml application/x-font-ttf image/vnd.microsoft.icon application/x-font-opentype application/json font/eot application/vnd.ms-fontobject application/javascript font/otf application/xml application/xhtml+xml text/javascript application/x-javascript text/plain application/x-font-truetype application/xml+rss image/x-icon font/opentype text/css image/x-win-bitmap&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 不建议进行照片压缩 image/jpeg image/gif image/png 可能反而会增加其体积</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 启用http2支持(实际上默认是开启的，如果过关闭请将其设置为true)</span></span>
<span class="line"><span style="color:#e1e4e8;">use-http2: &quot;true&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># ssl 会话复用</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_session_cache: &quot;shared:SSL:10m;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl-session-timeout: &quot;10m&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># worker 每个工作进程可以打开的最大文件数与同时打开最大连接数设置</span></span>
<span class="line"><span style="color:#e1e4e8;">worker-processes: &quot;auto&quot; </span></span>
<span class="line"><span style="color:#e1e4e8;">max-worker-open-files: &quot;10240&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">max-worker-connections: &quot;32767&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 连接复用</span></span>
<span class="line"><span style="color:#e1e4e8;">enable-multi-accept: &quot;true&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># keep-alive 连接超时和最大请求数调整 </span></span>
<span class="line"><span style="color:#e1e4e8;">keep-alive: &quot;75&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">keep-alive-requests: &quot;10000&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># upstream-keepalive 与上游Pod连接超时与最大请求数调整</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream-keepalive-time: &quot;30m&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream-keepalive-timeout: &quot;60&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream-keepalive-requests: &quot;10000&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream-keepalive-connections: &quot;512&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># proxy-connect 设置 ingress-nginx 与 pstream pod 之间连接请求超时实践。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置与代理服务器建立连接的超时时间(不能超过75s)</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy-connect-timeout: &quot;30&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置将请求传输到代理服务器的超时时间（以秒为单位）（超时仅在两个连续的写操作之间设置，而不是为整个请求的传输设置）</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy-send-timeout: &quot;120&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置从代理服务器读取响应的超时时间（以秒为单位）</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy-read-timeout: &quot;120&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 负载工作机制,轮询</span></span>
<span class="line"><span style="color:#24292e;">load-balance: &quot;round_robin&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 错误日志等级设置 (debug, info, notice, warn, error, crit, alert, or emerg)</span></span>
<span class="line"><span style="color:#24292e;">error-log-level: &quot;notice&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 启用Gzip资源压缩 (3k以上)</span></span>
<span class="line"><span style="color:#24292e;">use-gzip: &quot;true&quot;</span></span>
<span class="line"><span style="color:#24292e;">gzip-level: &quot;2&quot;</span></span>
<span class="line"><span style="color:#24292e;">gzip-min-length: &quot;3072&quot;</span></span>
<span class="line"><span style="color:#24292e;">gzip-types: &quot;text/html text/plain text/css text/javascript application/javascript application/x-javascript application/xml application/x-httpd-php application/x-font-ttf application/json image/x-icon image/svg+xml image/avif image/webp font/ttf font/opentype&quot;</span></span>
<span class="line"><span style="color:#24292e;"># 不建议进行照片压缩 image/jpeg image/gif image/png 可能反而会增加其体积</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 启用Brotli资源压缩（同等条件下优于Gzip，任选一个）</span></span>
<span class="line"><span style="color:#24292e;">enable-brotli: &quot;true&quot;</span></span>
<span class="line"><span style="color:#24292e;">brotli-level: 5</span></span>
<span class="line"><span style="color:#24292e;">brotli-min-length: &#39;3072&#39;</span></span>
<span class="line"><span style="color:#24292e;">brotli-types: &#39;text/xml image/svg+xml application/x-font-ttf image/vnd.microsoft.icon application/x-font-opentype application/json font/eot application/vnd.ms-fontobject application/javascript font/otf application/xml application/xhtml+xml text/javascript application/x-javascript text/plain application/x-font-truetype application/xml+rss image/x-icon font/opentype text/css image/x-win-bitmap&#39;</span></span>
<span class="line"><span style="color:#24292e;"># 不建议进行照片压缩 image/jpeg image/gif image/png 可能反而会增加其体积</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 启用http2支持(实际上默认是开启的，如果过关闭请将其设置为true)</span></span>
<span class="line"><span style="color:#24292e;">use-http2: &quot;true&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># ssl 会话复用</span></span>
<span class="line"><span style="color:#24292e;">ssl_session_cache: &quot;shared:SSL:10m;&quot;</span></span>
<span class="line"><span style="color:#24292e;">ssl-session-timeout: &quot;10m&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># worker 每个工作进程可以打开的最大文件数与同时打开最大连接数设置</span></span>
<span class="line"><span style="color:#24292e;">worker-processes: &quot;auto&quot; </span></span>
<span class="line"><span style="color:#24292e;">max-worker-open-files: &quot;10240&quot;</span></span>
<span class="line"><span style="color:#24292e;">max-worker-connections: &quot;32767&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 连接复用</span></span>
<span class="line"><span style="color:#24292e;">enable-multi-accept: &quot;true&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># keep-alive 连接超时和最大请求数调整 </span></span>
<span class="line"><span style="color:#24292e;">keep-alive: &quot;75&quot;</span></span>
<span class="line"><span style="color:#24292e;">keep-alive-requests: &quot;10000&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># upstream-keepalive 与上游Pod连接超时与最大请求数调整</span></span>
<span class="line"><span style="color:#24292e;">upstream-keepalive-time: &quot;30m&quot;</span></span>
<span class="line"><span style="color:#24292e;">upstream-keepalive-timeout: &quot;60&quot;</span></span>
<span class="line"><span style="color:#24292e;">upstream-keepalive-requests: &quot;10000&quot;</span></span>
<span class="line"><span style="color:#24292e;">upstream-keepalive-connections: &quot;512&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># proxy-connect 设置 ingress-nginx 与 pstream pod 之间连接请求超时实践。</span></span>
<span class="line"><span style="color:#24292e;"># 设置与代理服务器建立连接的超时时间(不能超过75s)</span></span>
<span class="line"><span style="color:#24292e;">proxy-connect-timeout: &quot;30&quot;</span></span>
<span class="line"><span style="color:#24292e;"># 设置将请求传输到代理服务器的超时时间（以秒为单位）（超时仅在两个连续的写操作之间设置，而不是为整个请求的传输设置）</span></span>
<span class="line"><span style="color:#24292e;">proxy-send-timeout: &quot;120&quot;</span></span>
<span class="line"><span style="color:#24292e;"># 设置从代理服务器读取响应的超时时间（以秒为单位）</span></span>
<span class="line"><span style="color:#24292e;">proxy-read-timeout: &quot;120&quot;</span></span></code></pre></div><h3 id="keep-alive" tabindex="-1">keep-alive <a class="header-anchor" href="#keep-alive" aria-label="Permalink to &quot;keep-alive&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master ingress]# kubectl get configmaps -n ingress-nginx</span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">                       </span><span style="color:#9ECBFF;">DATA</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">AGE</span></span>
<span class="line"><span style="color:#B392F0;">ingress-nginx-controller</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">3</span><span style="color:#9ECBFF;">d1h</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#编辑</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master ingress]# kubectl edit configmaps ingress-nginx-controller -n ingress-nginx</span></span>
<span class="line"><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#B392F0;">apiVersion:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#B392F0;">data:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">keep-alive:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;60&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">keep-alive-requests:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;10000&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">upstream-keepalive-connections:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;10000&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">upstream-keepalive-requests:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;100&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">upstream-keepalive-timeout:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;60&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">max-worker-connections:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;65536&quot;</span></span>
<span class="line"><span style="color:#B392F0;">kind:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#79B8FF;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master ingress]# kubectl get configmaps -n ingress-nginx</span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">                       </span><span style="color:#032F62;">DATA</span><span style="color:#24292E;">   </span><span style="color:#032F62;">AGE</span></span>
<span class="line"><span style="color:#6F42C1;">ingress-nginx-controller</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">      </span><span style="color:#005CC5;">3</span><span style="color:#032F62;">d1h</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#编辑</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master ingress]# kubectl edit configmaps ingress-nginx-controller -n ingress-nginx</span></span>
<span class="line"><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#6F42C1;">apiVersion:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#6F42C1;">data:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">keep-alive:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;60&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">keep-alive-requests:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;10000&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">upstream-keepalive-connections:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;10000&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">upstream-keepalive-requests:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;100&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">upstream-keepalive-timeout:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;60&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">max-worker-connections:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;65536&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">kind:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#005CC5;">...</span></span></code></pre></div><ul><li>参数介绍</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx-ingress-controller</span></span>
<span class="line"><span style="color:#6A737D;"># nginx ingress 性能优化: https://www.nginx.com/blog/tuning-nginx/</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># nginx 与 client 保持的一个长连接能处理的请求数量，默认100，高并发场景建议调高。  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 参考: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#keep-alive-requests</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">keep-alive-requests</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;10000&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># nginx 与 upstream 保持长连接的最大空闲连接数 (不是最大连接数)，默认 320，在高并发下场景下调大，避免频繁建联导致 TIME_WAIT 飙升。  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 参考: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#upstream-keepalive-connections</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">upstream-keepalive-connections</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;2000&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 每个 worker 进程可以打开的最大连接数，默认 16384。  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 参考: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#max-worker-connections</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">max-worker-connections</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;65536&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx-ingress-controller</span></span>
<span class="line"><span style="color:#6A737D;"># nginx ingress 性能优化: https://www.nginx.com/blog/tuning-nginx/</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># nginx 与 client 保持的一个长连接能处理的请求数量，默认100，高并发场景建议调高。  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 参考: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#keep-alive-requests</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">keep-alive-requests</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;10000&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># nginx 与 upstream 保持长连接的最大空闲连接数 (不是最大连接数)，默认 320，在高并发下场景下调大，避免频繁建联导致 TIME_WAIT 飙升。  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 参考: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#upstream-keepalive-connections</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">upstream-keepalive-connections</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;2000&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 每个 worker 进程可以打开的最大连接数，默认 16384。  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 参考: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#max-worker-connections</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">max-worker-connections</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;65536&quot;</span></span></code></pre></div><ul><li>参考</li></ul><p><a href="https://www.nginx.com/blog/tuning-nginx/" target="_blank" rel="noreferrer">Tuning NGINX for Performance</a></p><p><a href="http://nginx.org/en/docs/http/ngx_http_upstream_module.html" target="_blank" rel="noreferrer">ngx_http_upstream_module 官方文档</a></p><h1 id="_3-ingress-annotions规则" tabindex="-1">3. ingress annotions规则 <a class="header-anchor" href="#_3-ingress-annotions规则" aria-label="Permalink to &quot;3. ingress annotions规则&quot;">​</a></h1><h2 id="_3-1-参数" tabindex="-1">3.1 参数 <a class="header-anchor" href="#_3-1-参数" aria-label="Permalink to &quot;3.1 参数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">apiVersion: networking.k8s.io/v1</span></span>
<span class="line"><span style="color:#e1e4e8;">kind: Ingress</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">  annotations:</span></span>
<span class="line"><span style="color:#e1e4e8;">    # 解决: 413 Request Entity Too Large</span></span>
<span class="line"><span style="color:#e1e4e8;">    ingress.kubernetes.io/proxy-body-size: &quot;50m&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 解决：后端大文件上传问题</span></span>
<span class="line"><span style="color:#e1e4e8;">    nginx.ingress.kubernetes.io/client-body-buffer-size: 50m</span></span>
<span class="line"><span style="color:#e1e4e8;">    nginx.ingress.kubernetes.io/proxy-max-temp-file-size: 100m</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 解决: 上传文件较慢问题</span></span>
<span class="line"><span style="color:#e1e4e8;">    nginx.ingress.kubernetes.io/proxy-buffer-size: 50m</span></span>
<span class="line"><span style="color:#e1e4e8;">    nginx.ingress.kubernetes.io/proxy-buffering: &quot;on&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    nginx.ingress.kubernetes.io/proxy-buffers-number: &quot;4&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 解决: 与后端backend超时问题</span></span>
<span class="line"><span style="color:#e1e4e8;">    nginx.ingress.kubernetes.io/proxy-connect-timeout: 300s</span></span>
<span class="line"><span style="color:#e1e4e8;">    nginx.ingress.kubernetes.io/proxy-read-timeout: 180s</span></span>
<span class="line"><span style="color:#e1e4e8;">    nginx.ingress.kubernetes.io/proxy-send-timeout: 180s</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 解决: 处理Nginx代理转发与后端服务文件上传缓存区设置(原生命令)</span></span>
<span class="line"><span style="color:#e1e4e8;">    nginx.ingress.kubernetes.io/server-snippet: |</span></span>
<span class="line"><span style="color:#e1e4e8;">      location ~ fastfile {</span></span>
<span class="line"><span style="color:#e1e4e8;">        client_max_body_size 1024m;   # 允许客户端请求的最大单文件字节数，人话：能上传多大文件</span></span>
<span class="line"><span style="color:#e1e4e8;">        client_body_buffer_size 10m;  # 缓冲区代理缓冲用户端请求的最大字节数，人话：一次能接受多少文件，建议根据带宽上限设置，减少磁盘读写，加快速度</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_connect_timeout 300;    # Nginx与后端代理连接超时时间</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_read_timeout 300;       # 后端服务器响应时间(代理接收超时)时间</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_buffer_size 1024k;      # 设置代理服务器（nginx）保存用户头信息的缓冲区大小</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_buffers 6 500k;             # proxy_buffers缓冲区，网页平均在32k以下的话&gt;，这样设置</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_busy_buffers_size 1024k;    # 高负荷下缓冲大小（proxy_buffers*2）</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_temp_file_write_size 1024k; # 设定缓存文件夹大小，大于这个值将从upstream服务器传输</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">apiVersion: networking.k8s.io/v1</span></span>
<span class="line"><span style="color:#24292e;">kind: Ingress</span></span>
<span class="line"><span style="color:#24292e;">metadata:</span></span>
<span class="line"><span style="color:#24292e;">  annotations:</span></span>
<span class="line"><span style="color:#24292e;">    # 解决: 413 Request Entity Too Large</span></span>
<span class="line"><span style="color:#24292e;">    ingress.kubernetes.io/proxy-body-size: &quot;50m&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 解决：后端大文件上传问题</span></span>
<span class="line"><span style="color:#24292e;">    nginx.ingress.kubernetes.io/client-body-buffer-size: 50m</span></span>
<span class="line"><span style="color:#24292e;">    nginx.ingress.kubernetes.io/proxy-max-temp-file-size: 100m</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 解决: 上传文件较慢问题</span></span>
<span class="line"><span style="color:#24292e;">    nginx.ingress.kubernetes.io/proxy-buffer-size: 50m</span></span>
<span class="line"><span style="color:#24292e;">    nginx.ingress.kubernetes.io/proxy-buffering: &quot;on&quot;</span></span>
<span class="line"><span style="color:#24292e;">    nginx.ingress.kubernetes.io/proxy-buffers-number: &quot;4&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 解决: 与后端backend超时问题</span></span>
<span class="line"><span style="color:#24292e;">    nginx.ingress.kubernetes.io/proxy-connect-timeout: 300s</span></span>
<span class="line"><span style="color:#24292e;">    nginx.ingress.kubernetes.io/proxy-read-timeout: 180s</span></span>
<span class="line"><span style="color:#24292e;">    nginx.ingress.kubernetes.io/proxy-send-timeout: 180s</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 解决: 处理Nginx代理转发与后端服务文件上传缓存区设置(原生命令)</span></span>
<span class="line"><span style="color:#24292e;">    nginx.ingress.kubernetes.io/server-snippet: |</span></span>
<span class="line"><span style="color:#24292e;">      location ~ fastfile {</span></span>
<span class="line"><span style="color:#24292e;">        client_max_body_size 1024m;   # 允许客户端请求的最大单文件字节数，人话：能上传多大文件</span></span>
<span class="line"><span style="color:#24292e;">        client_body_buffer_size 10m;  # 缓冲区代理缓冲用户端请求的最大字节数，人话：一次能接受多少文件，建议根据带宽上限设置，减少磁盘读写，加快速度</span></span>
<span class="line"><span style="color:#24292e;">        proxy_connect_timeout 300;    # Nginx与后端代理连接超时时间</span></span>
<span class="line"><span style="color:#24292e;">        proxy_read_timeout 300;       # 后端服务器响应时间(代理接收超时)时间</span></span>
<span class="line"><span style="color:#24292e;">        proxy_buffer_size 1024k;      # 设置代理服务器（nginx）保存用户头信息的缓冲区大小</span></span>
<span class="line"><span style="color:#24292e;">        proxy_buffers 6 500k;             # proxy_buffers缓冲区，网页平均在32k以下的话&gt;，这样设置</span></span>
<span class="line"><span style="color:#24292e;">        proxy_busy_buffers_size 1024k;    # 高负荷下缓冲大小（proxy_buffers*2）</span></span>
<span class="line"><span style="color:#24292e;">        proxy_temp_file_write_size 1024k; # 设定缓存文件夹大小，大于这个值将从upstream服务器传输</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span></code></pre></div>`,22),o=[l];function t(c,i,r,y,u,g){return n(),a("div",null,o)}const x=s(p,[["render",t]]);export{m as __pageData,x as default};
