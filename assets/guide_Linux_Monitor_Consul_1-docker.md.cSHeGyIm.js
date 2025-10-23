import{_ as s,o as n,c as a,R as o}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"1. docker方式","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Monitor/Consul/1-docker.md","filePath":"guide/Linux/Monitor/Consul/1-docker.md","lastUpdated":1734603886000}'),l={name:"guide/Linux/Monitor/Consul/1-docker.md"},p=o(`<h1 id="_1-docker方式" tabindex="-1">1. docker方式 <a class="header-anchor" href="#_1-docker方式" aria-label="Permalink to &quot;1. docker方式&quot;">​</a></h1><p><a href="https://developer.hashicorp.com/consul/tutorials/archive/docker-container-agents" target="_blank" rel="noreferrer">官当</a></p><h1 id="_2-docker-compose方式" tabindex="-1">2. docker-compose方式 <a class="header-anchor" href="#_2-docker-compose方式" aria-label="Permalink to &quot;2. docker-compose方式&quot;">​</a></h1><h2 id="_2-1-创建目录" tabindex="-1">2.1 创建目录 <a class="header-anchor" href="#_2-1-创建目录" aria-label="Permalink to &quot;2.1 创建目录&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/monitor/prometheus/consul/config</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/monitor/prometheus/consul/config</span></span></code></pre></div><h2 id="_2-2-创建配置文件" tabindex="-1">2.2 创建配置文件 <a class="header-anchor" href="#_2-2-创建配置文件" aria-label="Permalink to &quot;2.2 创建配置文件&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/monitor/prometheus/consul/config</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">server.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;node_name&quot;: &quot;consul-server&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;server&quot;: true,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;bootstrap&quot; : true,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;ui_config&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;enabled&quot; : true</span></span>
<span class="line"><span style="color:#9ECBFF;">    },</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;data_dir&quot;: &quot;/consul/data&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;addresses&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;http&quot; : &quot;0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    },</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;bind_addr&quot;: &quot;0.0.0.0&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;client_addr&quot;: &quot;0.0.0.0&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;connect&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;enabled&quot;: true</span></span>
<span class="line"><span style="color:#9ECBFF;">    },</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;log_level&quot;: &quot;debug&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;log_file&quot;: &quot;/consul/log/consul.log&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;log_rotate_max_size&quot;: &quot;100MB&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;log_rotate_max_age&quot;: &quot;7d&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;log_rotate_max_backups&quot;: &quot;5&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">    &quot;log_rotate_compress&quot;: &quot;true&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/monitor/prometheus/consul/config</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">server.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">    &quot;node_name&quot;: &quot;consul-server&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;server&quot;: true,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;bootstrap&quot; : true,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;ui_config&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">        &quot;enabled&quot; : true</span></span>
<span class="line"><span style="color:#032F62;">    },</span></span>
<span class="line"><span style="color:#032F62;">    &quot;data_dir&quot;: &quot;/consul/data&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;addresses&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">        &quot;http&quot; : &quot;0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#032F62;">    },</span></span>
<span class="line"><span style="color:#032F62;">    &quot;bind_addr&quot;: &quot;0.0.0.0&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;client_addr&quot;: &quot;0.0.0.0&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;connect&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">        &quot;enabled&quot;: true</span></span>
<span class="line"><span style="color:#032F62;">    },</span></span>
<span class="line"><span style="color:#032F62;">    &quot;log_level&quot;: &quot;debug&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;log_file&quot;: &quot;/consul/log/consul.log&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;log_rotate_max_size&quot;: &quot;100MB&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;log_rotate_max_age&quot;: &quot;7d&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;log_rotate_max_backups&quot;: &quot;5&quot;,</span></span>
<span class="line"><span style="color:#032F62;">    &quot;log_rotate_compress&quot;: &quot;true&quot;</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h2 id="_2-3-yaml文件" tabindex="-1">2.3 yaml文件 <a class="header-anchor" href="#_2-3-yaml文件" aria-label="Permalink to &quot;2.3 yaml文件&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;3&#39;</span></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">consul-server</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/consul:v1.20</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#hashicorp/consul:1.20</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">consul-server</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">always</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     - </span><span style="color:#9ECBFF;">/data/monitor/consul/config/server.json:/consul/config/server.json:ro</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;8500:8500&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;8600:8600/tcp&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;8600:8600/udp&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">command</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;agent&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;-server&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;-bootstrap-expect=1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;-ui&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;-client=0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;-bind=0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;-datacenter=dc1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;-data-dir=/consul/data&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">logging</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">driver</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;json-file&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">options</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">max-size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;100m&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">max-file</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;3&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3&#39;</span></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">consul-server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/consul:v1.20</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#hashicorp/consul:1.20</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">consul-server</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">always</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">     - </span><span style="color:#032F62;">/data/monitor/consul/config/server.json:/consul/config/server.json:ro</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;8500:8500&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;8600:8600/tcp&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;8600:8600/udp&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">command</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;agent&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;-server&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;-bootstrap-expect=1&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;-ui&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;-client=0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;-bind=0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;-datacenter=dc1&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;-data-dir=/consul/data&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">logging</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">driver</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;json-file&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">options</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">max-size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;100m&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">max-file</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;3&quot;</span></span></code></pre></div><ul><li>启动</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker-compose up -d</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker-compose up -d</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202412191516391.png" alt="image-20241219151628093"></p><h1 id="_3-k8s方式" tabindex="-1">3. k8s方式 <a class="header-anchor" href="#_3-k8s方式" aria-label="Permalink to &quot;3. k8s方式&quot;">​</a></h1><p>请看k8s章节</p>`,14),e=[p];function t(c,r,u,i,y,E){return n(),a("div",null,e)}const F=s(l,[["render",t]]);export{d as __pageData,F as default};
