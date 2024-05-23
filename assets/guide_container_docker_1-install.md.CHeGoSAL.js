import{_ as s,c as a,o as n,R as l}from"./chunks/framework.CIzs38F0.js";const E=JSON.parse('{"title":"1.安装","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/docker/1-install.md","filePath":"guide/container/docker/1-install.md","lastUpdated":1714030813000}'),o={name:"guide/container/docker/1-install.md"},p=l(`<h1 id="_1-安装" tabindex="-1">1.安装 <a class="header-anchor" href="#_1-安装" aria-label="Permalink to &quot;1.安装&quot;">​</a></h1><p>官方，<a href="https://docs.docker.com/engine/install/centos/" target="_blank" rel="noreferrer">https://docs.docker.com/engine/install/centos/</a></p><h2 id="_1-1yum方式" tabindex="-1">1.1yum方式 <a class="header-anchor" href="#_1-1yum方式" aria-label="Permalink to &quot;1.1yum方式&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#安装依赖</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">device-mapper-persistent-data</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">lvm2</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bash-completion</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#安装具体版本</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-ce-20.10.15</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#安装依赖</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">device-mapper-persistent-data</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lvm2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bash-completion</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#安装具体版本</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-ce-20.10.15</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span></span></code></pre></div><h2 id="_1-2修改配置文件" tabindex="-1">1.2修改配置文件 <a class="header-anchor" href="#_1-2修改配置文件" aria-label="Permalink to &quot;1.2修改配置文件&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#创建docker目录</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/docker/daemon.json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;exec-opts&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">  	&quot;native.cgroupdriver=systemd&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  ],</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;max-concurrent-downloads&quot;: 10,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;max-concurrent-uploads&quot;: 5,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;live-restore&quot;:true,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;log-driver&quot;: &quot;json-file&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;log-opts&quot;: {</span></span>
<span class="line"><span style="color:#9ECBFF;">  	&quot;max-size&quot;: &quot;100m&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">	&quot;max-file&quot;:&quot;5&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  },</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;storage-driver&quot;: &quot;overlay2&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;storage-opts&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">  	&quot;overlay2.override_kernel_check=true&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">  ],</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;registry-mirrors&quot; : [</span></span>
<span class="line"><span style="color:#9ECBFF;">  ],</span></span>
<span class="line"><span style="color:#9ECBFF;">  &quot;data-root&quot;: &quot;/data/docker&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#创建docker目录</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/docker/daemon.json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#032F62;">  &quot;exec-opts&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">  	&quot;native.cgroupdriver=systemd&quot;</span></span>
<span class="line"><span style="color:#032F62;">  ],</span></span>
<span class="line"><span style="color:#032F62;">  &quot;max-concurrent-downloads&quot;: 10,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;max-concurrent-uploads&quot;: 5,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;live-restore&quot;:true,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;log-driver&quot;: &quot;json-file&quot;,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;log-opts&quot;: {</span></span>
<span class="line"><span style="color:#032F62;">  	&quot;max-size&quot;: &quot;100m&quot;,</span></span>
<span class="line"><span style="color:#032F62;">	&quot;max-file&quot;:&quot;5&quot;</span></span>
<span class="line"><span style="color:#032F62;">  },</span></span>
<span class="line"><span style="color:#032F62;">  &quot;storage-driver&quot;: &quot;overlay2&quot;,</span></span>
<span class="line"><span style="color:#032F62;">  &quot;storage-opts&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">  	&quot;overlay2.override_kernel_check=true&quot;</span></span>
<span class="line"><span style="color:#032F62;">  ],</span></span>
<span class="line"><span style="color:#032F62;">  &quot;registry-mirrors&quot; : [</span></span>
<span class="line"><span style="color:#032F62;">  ],</span></span>
<span class="line"><span style="color:#032F62;">  &quot;data-root&quot;: &quot;/data/docker&quot;</span></span>
<span class="line"><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h2 id="_1-3添加用户-可选" tabindex="-1">1.3添加用户(可选) <a class="header-anchor" href="#_1-3添加用户-可选" aria-label="Permalink to &quot;1.3添加用户(可选)&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">useradd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">dev</span></span>
<span class="line"><span style="color:#B392F0;">usermod</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-aG</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">dev</span></span>
<span class="line"><span style="color:#B392F0;">newgrp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">useradd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">dev</span></span>
<span class="line"><span style="color:#6F42C1;">usermod</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-aG</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">dev</span></span>
<span class="line"><span style="color:#6F42C1;">newgrp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span></span></code></pre></div><h2 id="_1-4启动" tabindex="-1">1.4启动 <a class="header-anchor" href="#_1-4启动" aria-label="Permalink to &quot;1.4启动&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span></span></code></pre></div>`,10),e=[p];function t(c,r,i,y,d,F){return n(),a("div",null,e)}const q=s(o,[["render",t]]);export{E as __pageData,q as default};
