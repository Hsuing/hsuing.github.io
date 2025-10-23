import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"1. nginx基于Secret实现TLS实践","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/cmd/secret.md","filePath":"guide/container/k8s/cmd/secret.md","lastUpdated":1717150816000}'),p={name:"guide/container/k8s/cmd/secret.md"},o=l(`<h1 id="_1-nginx基于secret实现tls实践" tabindex="-1">1. nginx基于Secret实现TLS实践 <a class="header-anchor" href="#_1-nginx基于secret实现tls实践" aria-label="Permalink to &quot;1. nginx基于Secret实现TLS实践&quot;">​</a></h1><p>需求：</p><ul><li><p>运⾏⼀个Nginx容器</p></li><li><p>Nginx虚拟站点配置⽂件来源于ConfigMap</p></li><li><p>Nginx虚拟站点需要使⽤的TLS证书，来源于Secret</p></li><li><p>验证Nginx服务是否已提供Https访问访问。</p></li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202405302153703.png" alt="image-20240530215305636"></p><h2 id="_1-1-创建tls" tabindex="-1">1.1 创建tls <a class="header-anchor" href="#_1-1-创建tls" aria-label="Permalink to &quot;1.1 创建tls&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">创建⾃签证书</span></span>
<span class="line"><span style="color:#6A737D;">#生成key</span></span>
<span class="line"><span style="color:#B392F0;">openssl</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">genrsa</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-out</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx.key</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2048</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成crt</span></span>
<span class="line"><span style="color:#B392F0;">openssl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">req</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-x509</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-key</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx.key</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-out</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx.crt</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-subj</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/C=CN/ST=BJ/L=BJ/O=DevOps/CN=book.ikubernetes.net&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master secret]# kubectl create secret tls nginx-tls-secret --key=nginx.key --cert=nginx.crt</span></span>
<span class="line"><span style="color:#B392F0;">secret/nginx-tls-secret</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">created</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">创建⾃签证书</span></span>
<span class="line"><span style="color:#6A737D;">#生成key</span></span>
<span class="line"><span style="color:#6F42C1;">openssl</span><span style="color:#24292E;">  </span><span style="color:#032F62;">genrsa</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-out</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx.key</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2048</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成crt</span></span>
<span class="line"><span style="color:#6F42C1;">openssl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">req</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-x509</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx.key</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-out</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx.crt</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-subj</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/C=CN/ST=BJ/L=BJ/O=DevOps/CN=book.ikubernetes.net&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@kube-master secret]# kubectl create secret tls nginx-tls-secret --key=nginx.key --cert=nginx.crt</span></span>
<span class="line"><span style="color:#6F42C1;">secret/nginx-tls-secret</span><span style="color:#24292E;"> </span><span style="color:#032F62;">created</span></span></code></pre></div><h2 id="_1-2-创建configmap" tabindex="-1">1.2 创建Configmap <a class="header-anchor" href="#_1-2-创建configmap" aria-label="Permalink to &quot;1.2 创建Configmap&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">cat 1.nginx-configmap.yaml</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx-ssl-vhosts</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">book.ikubernetes.net.conf</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    server {</span></span>
<span class="line"><span style="color:#9ECBFF;">      listen 443 ssl;</span></span>
<span class="line"><span style="color:#9ECBFF;">      server_name book.ikubernetes.net;</span></span>
<span class="line"><span style="color:#9ECBFF;">      root /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#9ECBFF;">      ssl_certificate /etc/ssl/certs/tls.crt;</span></span>
<span class="line"><span style="color:#9ECBFF;">      ssl_certificate_key /etc/ssl/certs/tls.key;</span></span>
<span class="line"><span style="color:#9ECBFF;">      ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#9ECBFF;">      location / {</span></span>
<span class="line"><span style="color:#9ECBFF;">        index index.html;</span></span>
<span class="line"><span style="color:#9ECBFF;">      }</span></span>
<span class="line"><span style="color:#9ECBFF;">      }</span></span>
<span class="line"><span style="color:#9ECBFF;">    server {</span></span>
<span class="line"><span style="color:#9ECBFF;">      listen 80;</span></span>
<span class="line"><span style="color:#9ECBFF;">      server_name book.ikubernetes.net;</span></span>
<span class="line"><span style="color:#9ECBFF;">      return 302 https://$server_name$request_uri;</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">cat 1.nginx-configmap.yaml</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx-ssl-vhosts</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">book.ikubernetes.net.conf</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    server {</span></span>
<span class="line"><span style="color:#032F62;">      listen 443 ssl;</span></span>
<span class="line"><span style="color:#032F62;">      server_name book.ikubernetes.net;</span></span>
<span class="line"><span style="color:#032F62;">      root /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#032F62;">      ssl_certificate /etc/ssl/certs/tls.crt;</span></span>
<span class="line"><span style="color:#032F62;">      ssl_certificate_key /etc/ssl/certs/tls.key;</span></span>
<span class="line"><span style="color:#032F62;">      ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#032F62;">      location / {</span></span>
<span class="line"><span style="color:#032F62;">        index index.html;</span></span>
<span class="line"><span style="color:#032F62;">      }</span></span>
<span class="line"><span style="color:#032F62;">      }</span></span>
<span class="line"><span style="color:#032F62;">    server {</span></span>
<span class="line"><span style="color:#032F62;">      listen 80;</span></span>
<span class="line"><span style="color:#032F62;">      server_name book.ikubernetes.net;</span></span>
<span class="line"><span style="color:#032F62;">      return 302 https://$server_name$request_uri;</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#执行</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master secret]# kubectl apply -f 1.nginx-configmap.yaml</span></span>
<span class="line"><span style="color:#B392F0;">configmap/nginx-ssl-vhosts</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">created</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#执行</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master secret]# kubectl apply -f 1.nginx-configmap.yaml</span></span>
<span class="line"><span style="color:#6F42C1;">configmap/nginx-ssl-vhosts</span><span style="color:#24292E;"> </span><span style="color:#032F62;">created</span></span></code></pre></div><h2 id="_1-3-创建pod" tabindex="-1">1.3 创建Pod <a class="header-anchor" href="#_1-3-创建pod" aria-label="Permalink to &quot;1.3 创建Pod&quot;">​</a></h2><p>创建<code>Nginxpod</code>，挂载 <code>ConfigMap</code> 的虚拟主机配置，⽽后挂载虚拟主机所需要依赖的 <code>tls </code>证书⽂件</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">root@kube-master secret</span><span style="color:#E1E4E8;">]# </span><span style="color:#9ECBFF;">cat 2.nginx-pod-ssl.yaml</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Pod</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx-ssl-demo</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx-ssl-certs</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">secret</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">secretName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx-tls-secret</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx-ssl-conf</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">configMap</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx-ssl-vhosts</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">items</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">book.ikubernetes.net.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">book.ikubernetes.net.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx-ssl-demo</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx:latest</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">80</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">443</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx-ssl-certs</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/etc/ssl/certs/</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">readOnly</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx-ssl-conf</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/etc/nginx/conf.d/</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">readOnly</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;">root@kube-master secret</span><span style="color:#24292E;">]# </span><span style="color:#032F62;">cat 2.nginx-pod-ssl.yaml</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Pod</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx-ssl-demo</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx-ssl-certs</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">secret</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">secretName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx-tls-secret</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx-ssl-conf</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">configMap</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx-ssl-vhosts</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">items</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">key</span><span style="color:#24292E;">: </span><span style="color:#032F62;">book.ikubernetes.net.conf</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">book.ikubernetes.net.conf</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx-ssl-demo</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx:latest</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">80</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">443</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx-ssl-certs</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/etc/ssl/certs/</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">readOnly</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx-ssl-conf</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/etc/nginx/conf.d/</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">readOnly</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#执行</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master secret]# kubectl apply -f 2.nginx-pod-ssl.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看pod</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master secret]# kubectl get pod nginx-ssl-demo -owide</span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">             </span><span style="color:#9ECBFF;">READY</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">STATUS</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">RESTARTS</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">AGE</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">IP</span><span style="color:#E1E4E8;">             </span><span style="color:#9ECBFF;">NODE</span><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">NOMINATED</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">NODE</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">READINESS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">GATES</span></span>
<span class="line"><span style="color:#B392F0;">nginx-ssl-demo</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">/1</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">Running</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> (5m35s </span><span style="color:#9ECBFF;">ago</span><span style="color:#E1E4E8;">)   176m   172.30.0.177   kube-node01   </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">none</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">           </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">none</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#执行</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master secret]# kubectl apply -f 2.nginx-pod-ssl.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看pod</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master secret]# kubectl get pod nginx-ssl-demo -owide</span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">             </span><span style="color:#032F62;">READY</span><span style="color:#24292E;">   </span><span style="color:#032F62;">STATUS</span><span style="color:#24292E;">    </span><span style="color:#032F62;">RESTARTS</span><span style="color:#24292E;">        </span><span style="color:#032F62;">AGE</span><span style="color:#24292E;">    </span><span style="color:#032F62;">IP</span><span style="color:#24292E;">             </span><span style="color:#032F62;">NODE</span><span style="color:#24292E;">          </span><span style="color:#032F62;">NOMINATED</span><span style="color:#24292E;"> </span><span style="color:#032F62;">NODE</span><span style="color:#24292E;">   </span><span style="color:#032F62;">READINESS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">GATES</span></span>
<span class="line"><span style="color:#6F42C1;">nginx-ssl-demo</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">/1</span><span style="color:#24292E;">     </span><span style="color:#032F62;">Running</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> (5m35s </span><span style="color:#032F62;">ago</span><span style="color:#24292E;">)   176m   172.30.0.177   kube-node01   </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">none</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">           </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">none</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><ul><li>验证效果</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master secret]# curl -I -k https://172.30.0.177</span></span>
<span class="line"><span style="color:#B392F0;">HTTP/1.1</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">OK</span></span>
<span class="line"><span style="color:#B392F0;">Server:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx/1.25.5</span></span>
<span class="line"><span style="color:#B392F0;">Date:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Thu,</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">May</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2024</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">13</span><span style="color:#9ECBFF;">:27:04</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">GMT</span></span>
<span class="line"><span style="color:#B392F0;">Content-Type:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">text/html</span></span>
<span class="line"><span style="color:#B392F0;">Content-Length:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">615</span></span>
<span class="line"><span style="color:#B392F0;">Last-Modified:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Tue,</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Apr</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2024</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">14</span><span style="color:#9ECBFF;">:29:59</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">GMT</span></span>
<span class="line"><span style="color:#B392F0;">Connection:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">keep-alive</span></span>
<span class="line"><span style="color:#B392F0;">ETag:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;661e8b67-267&quot;</span></span>
<span class="line"><span style="color:#B392F0;">Accept-Ranges:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bytes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看ssl</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master secret]# curl -I -v -k https://172.30.0.177</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> About to </span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">() to 172.30.0.177 port 443 (#0)</span></span>
<span class="line"><span style="color:#B392F0;">*</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">Trying</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">172.30</span><span style="color:#9ECBFF;">.0.177...</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> Connected to 172.30.0.177 (</span><span style="color:#B392F0;">172.30.0.177</span><span style="color:#E1E4E8;">) port 443 (#0)</span></span>
<span class="line"><span style="color:#B392F0;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Initializing</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">NSS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">certpath:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sql:/etc/pki/nssdb</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> skipping SSL peer certificate verification</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> SSL connection using TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> Server certificate:</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> 	subject: CN=book.ikubernetes.net,O=DevOps,L=BJ,ST=BJ,C=CN</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> 	start date: 5月 30 07:18:43 2024 GMT</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> 	expire date: 6月 29 07:18:43 2024 GMT</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> 	common name: book.ikubernetes.net</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> 	issuer: CN=book.ikubernetes.net,O=DevOps,L=BJ,ST=BJ,C=CN</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> HEAD / HTTP/1.1</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> User-Agent: curl/7.29.0</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> Host: 172.30.0.177</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> Accept: </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">/</span><span style="color:#F97583;">*</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master secret]# curl -I -k https://172.30.0.177</span></span>
<span class="line"><span style="color:#6F42C1;">HTTP/1.1</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;"> </span><span style="color:#032F62;">OK</span></span>
<span class="line"><span style="color:#6F42C1;">Server:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx/1.25.5</span></span>
<span class="line"><span style="color:#6F42C1;">Date:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Thu,</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">30</span><span style="color:#24292E;"> </span><span style="color:#032F62;">May</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2024</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">13</span><span style="color:#032F62;">:27:04</span><span style="color:#24292E;"> </span><span style="color:#032F62;">GMT</span></span>
<span class="line"><span style="color:#6F42C1;">Content-Type:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">text/html</span></span>
<span class="line"><span style="color:#6F42C1;">Content-Length:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">615</span></span>
<span class="line"><span style="color:#6F42C1;">Last-Modified:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Tue,</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Apr</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2024</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">14</span><span style="color:#032F62;">:29:59</span><span style="color:#24292E;"> </span><span style="color:#032F62;">GMT</span></span>
<span class="line"><span style="color:#6F42C1;">Connection:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">keep-alive</span></span>
<span class="line"><span style="color:#6F42C1;">ETag:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;661e8b67-267&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">Accept-Ranges:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bytes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看ssl</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master secret]# curl -I -v -k https://172.30.0.177</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> About to </span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">() to 172.30.0.177 port 443 (#0)</span></span>
<span class="line"><span style="color:#6F42C1;">*</span><span style="color:#24292E;">   </span><span style="color:#032F62;">Trying</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">172.30</span><span style="color:#032F62;">.0.177...</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> Connected to 172.30.0.177 (</span><span style="color:#6F42C1;">172.30.0.177</span><span style="color:#24292E;">) port 443 (#0)</span></span>
<span class="line"><span style="color:#6F42C1;">*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Initializing</span><span style="color:#24292E;"> </span><span style="color:#032F62;">NSS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">with</span><span style="color:#24292E;"> </span><span style="color:#032F62;">certpath:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sql:/etc/pki/nssdb</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> skipping SSL peer certificate verification</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> SSL connection using TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> Server certificate:</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> 	subject: CN=book.ikubernetes.net,O=DevOps,L=BJ,ST=BJ,C=CN</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> 	start date: 5月 30 07:18:43 2024 GMT</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> 	expire date: 6月 29 07:18:43 2024 GMT</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> 	common name: book.ikubernetes.net</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> 	issuer: CN=book.ikubernetes.net,O=DevOps,L=BJ,ST=BJ,C=CN</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> HEAD / HTTP/1.1</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> User-Agent: curl/7.29.0</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> Host: 172.30.0.177</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> Accept: </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">/</span><span style="color:#D73A49;">*</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span></span></code></pre></div>`,15),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const g=s(p,[["render",t]]);export{d as __pageData,g as default};
