import{_ as s,o as a,c as n,R as p}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1. 容器方式","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Monitor/Grafana/1-docker-compose.md","filePath":"guide/Linux/Monitor/Grafana/1-docker-compose.md","lastUpdated":1733967691000}'),l={name:"guide/Linux/Monitor/Grafana/1-docker-compose.md"},o=p(`<h1 id="_1-容器方式" tabindex="-1">1. 容器方式 <a class="header-anchor" href="#_1-容器方式" aria-label="Permalink to &quot;1. 容器方式&quot;">​</a></h1><p><a href="https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/" target="_blank" rel="noreferrer">官当</a></p><h2 id="_1-1-docker-compose" tabindex="-1">1.1 docker-compose <a class="header-anchor" href="#_1-1-docker-compose" aria-label="Permalink to &quot;1.1 docker-compose&quot;">​</a></h2><h3 id="_1-创建目录" tabindex="-1">1.创建目录 <a class="header-anchor" href="#_1-创建目录" aria-label="Permalink to &quot;1.创建目录&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/monitor/prometheus/grafana/{config,data}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/monitor/prometheus/grafana/{config,data}</span></span></code></pre></div><h3 id="_2-创建配置文件" tabindex="-1">2.创建配置文件 <a class="header-anchor" href="#_2-创建配置文件" aria-label="Permalink to &quot;2.创建配置文件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat &gt; /data/monitor/prometheus/grafana/config/grafana.ini &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">[server]</span></span>
<span class="line"><span style="color:#e1e4e8;">enable_gzip = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># To add HTTPS support:</span></span>
<span class="line"><span style="color:#e1e4e8;">#protocol = https</span></span>
<span class="line"><span style="color:#e1e4e8;">#;http_addr =</span></span>
<span class="line"><span style="color:#e1e4e8;">#http_port = 3000</span></span>
<span class="line"><span style="color:#e1e4e8;">#domain = localhost</span></span>
<span class="line"><span style="color:#e1e4e8;">#enforce_domain = false</span></span>
<span class="line"><span style="color:#e1e4e8;">#root_url = https://localhost:3000</span></span>
<span class="line"><span style="color:#e1e4e8;">#router_logging = false</span></span>
<span class="line"><span style="color:#e1e4e8;">#static_root_path = public</span></span>
<span class="line"><span style="color:#e1e4e8;">#cert_file = /etc/certs/cert.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">#cert_key = /etc/certs/cert-key.pem</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[security]</span></span>
<span class="line"><span style="color:#e1e4e8;"># If you want to embed grafana into an iframe for example</span></span>
<span class="line"><span style="color:#e1e4e8;">allow_embedding = true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[users]</span></span>
<span class="line"><span style="color:#e1e4e8;">default_theme = dark</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat &gt; /data/monitor/prometheus/grafana/config/grafana.ini &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#24292e;">[server]</span></span>
<span class="line"><span style="color:#24292e;">enable_gzip = true</span></span>
<span class="line"><span style="color:#24292e;"># To add HTTPS support:</span></span>
<span class="line"><span style="color:#24292e;">#protocol = https</span></span>
<span class="line"><span style="color:#24292e;">#;http_addr =</span></span>
<span class="line"><span style="color:#24292e;">#http_port = 3000</span></span>
<span class="line"><span style="color:#24292e;">#domain = localhost</span></span>
<span class="line"><span style="color:#24292e;">#enforce_domain = false</span></span>
<span class="line"><span style="color:#24292e;">#root_url = https://localhost:3000</span></span>
<span class="line"><span style="color:#24292e;">#router_logging = false</span></span>
<span class="line"><span style="color:#24292e;">#static_root_path = public</span></span>
<span class="line"><span style="color:#24292e;">#cert_file = /etc/certs/cert.pem</span></span>
<span class="line"><span style="color:#24292e;">#cert_key = /etc/certs/cert-key.pem</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[security]</span></span>
<span class="line"><span style="color:#24292e;"># If you want to embed grafana into an iframe for example</span></span>
<span class="line"><span style="color:#24292e;">allow_embedding = true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[users]</span></span>
<span class="line"><span style="color:#24292e;">default_theme = dark</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span></code></pre></div><h3 id="_3-创建yaml文件" tabindex="-1">3.创建yaml文件 <a class="header-anchor" href="#_3-创建yaml文件" aria-label="Permalink to &quot;3.创建yaml文件&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">cat &gt;docker-compose.yaml &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;3&#39;</span></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">grafana</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/grafana:v11</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">grafana</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">always</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">GF_SECURITY_ADMIN_USER=admin</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">GF_SECURITY_ADMIN_PASSWORD=grafana</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">GF_USERS_ALLOW_SIGN_UP=false</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#- GF_INSTALL_PLUGINS=&quot;grafana-clock-panel,grafana-simple-json-datasource,grafana-worldmap-panel,grafana-piechart-panel&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;3000:3000&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/data/monitor/prometheus/grafana/config/grafana.ini:/etc/grafana/grafana.ini</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/data/monitor/prometheus/grafana/data:/var/lib/grafana</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#- /data/monitor/prometheus/grafana/provisioning/:/etc/grafana/provisioning/</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">cat &gt;docker-compose.yaml &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3&#39;</span></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">grafana</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/grafana:v11</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">grafana</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">always</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">GF_SECURITY_ADMIN_USER=admin</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">GF_SECURITY_ADMIN_PASSWORD=grafana</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">GF_USERS_ALLOW_SIGN_UP=false</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#- GF_INSTALL_PLUGINS=&quot;grafana-clock-panel,grafana-simple-json-datasource,grafana-worldmap-panel,grafana-piechart-panel&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;3000:3000&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/data/monitor/prometheus/grafana/config/grafana.ini:/etc/grafana/grafana.ini</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/data/monitor/prometheus/grafana/data:/var/lib/grafana</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#- /data/monitor/prometheus/grafana/provisioning/:/etc/grafana/provisioning/</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><ul><li>启动</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker-compose up -d</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker-compose up -d</span></span></code></pre></div><h3 id="_4-nginx代理" tabindex="-1">4.nginx代理 <a class="header-anchor" href="#_4-nginx代理" aria-label="Permalink to &quot;4.nginx代理&quot;">​</a></h3><ul><li>配置<a href="https://grafana.com/tutorials/run-grafana-behind-a-proxy/#1" target="_blank" rel="noreferrer">grafana</a></li></ul><p>vim grafana.ini</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[server]</span></span>
<span class="line"><span style="color:#e1e4e8;">domain = example.com</span></span>
<span class="line"><span style="color:#e1e4e8;">root_url = %(protocol)s://%(domain)s:%(http_port)s/grafana/</span></span>
<span class="line"><span style="color:#e1e4e8;">serve_from_sub_path = true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[server]</span></span>
<span class="line"><span style="color:#24292e;">domain = example.com</span></span>
<span class="line"><span style="color:#24292e;">root_url = %(protocol)s://%(domain)s:%(http_port)s/grafana/</span></span>
<span class="line"><span style="color:#24292e;">serve_from_sub_path = true</span></span></code></pre></div><ul><li>配置nginx</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^~</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">/grafana/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">http://172.18.110.129:3000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Real-IP</span><span style="color:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Forwarded-For</span><span style="color:#E1E4E8;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">proxy_http_version</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Connection</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Keep-Alive&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Host</span><span style="color:#E1E4E8;"> $http_host;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Upgrade</span><span style="color:#E1E4E8;"> $http_upgrade;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Connection</span><span style="color:#E1E4E8;"> $connection_upgrade;</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^~</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">/grafana/api/live/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">http://172.18.110.129:3000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Real-IP</span><span style="color:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Forwarded-For</span><span style="color:#E1E4E8;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">proxy_http_version</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Connection</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Keep-Alive&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Host</span><span style="color:#E1E4E8;"> $http_host;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Upgrade</span><span style="color:#E1E4E8;"> $http_upgrade;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Connection</span><span style="color:#E1E4E8;"> $connection_upgrade;</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">   </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^~</span><span style="color:#24292E;">  </span><span style="color:#032F62;">/grafana/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;">     </span><span style="color:#032F62;">http://172.18.110.129:3000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Real-IP</span><span style="color:#24292E;"> $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Forwarded-For</span><span style="color:#24292E;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">proxy_http_version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Connection</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Keep-Alive&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Host</span><span style="color:#24292E;"> $http_host;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Upgrade</span><span style="color:#24292E;"> $http_upgrade;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Connection</span><span style="color:#24292E;"> $connection_upgrade;</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^~</span><span style="color:#24292E;">  </span><span style="color:#032F62;">/grafana/api/live/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;">     </span><span style="color:#032F62;">http://172.18.110.129:3000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Real-IP</span><span style="color:#24292E;"> $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Forwarded-For</span><span style="color:#24292E;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">proxy_http_version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Connection</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Keep-Alive&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Host</span><span style="color:#24292E;"> $http_host;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Upgrade</span><span style="color:#24292E;"> $http_upgrade;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Connection</span><span style="color:#24292E;"> $connection_upgrade;</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202412111353542.png" alt="image-20241211135311698"></p><h2 id="_1-2-k8s方式" tabindex="-1">1.2 k8s方式 <a class="header-anchor" href="#_1-2-k8s方式" aria-label="Permalink to &quot;1.2 k8s方式&quot;">​</a></h2><p>请看k8s章节</p>`,20),e=[o];function t(r,c,y,E,i,d){return a(),n("div",null,e)}const F=s(l,[["render",t]]);export{h as __pageData,F as default};
