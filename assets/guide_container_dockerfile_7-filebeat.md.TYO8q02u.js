import{_ as s,o as a,c as n,R as l}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1. 创建配置","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/dockerfile/7-filebeat.md","filePath":"guide/container/dockerfile/7-filebeat.md","lastUpdated":1736245023000}'),p={name:"guide/container/dockerfile/7-filebeat.md"},o=l(`<h1 id="_1-创建配置" tabindex="-1">1. 创建配置 <a class="header-anchor" href="#_1-创建配置" aria-label="Permalink to &quot;1. 创建配置&quot;">​</a></h1><h2 id="_1-1-dockerfile" tabindex="-1">1.1 dockerfile <a class="header-anchor" href="#_1-1-dockerfile" aria-label="Permalink to &quot;1.1 dockerfile&quot;">​</a></h2><p>vim /data/dockerfile/filebeat/Dockerfile</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">FROM debian:stable-slim</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">ENV FILEBEAT_VERSION=7.17.0 \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">FILEBEAT_SHA1=b89143d745c024f9f764933de77c2d3e88c4f52c9962f9dcdbbf45c656ad901e70935d8373166c90226c74c998db673aabdb8fcdb73a344aca2981672e072af3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">RUN set -x &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">apt-get update &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">apt-get install -y wget &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-\${FILEBEAT_VERSION}-linux-x86_64.tar.gz -O /opt/filebeat.tar.gz &amp;&amp; \\</span></span>
<span class="line"><span style="color:#9ECBFF;">cd /opt &amp;&amp; \\</span></span>
<span class="line"><span style="color:#9ECBFF;">echo&quot;\${FILEBEAT_SHA1}  filebeat.tar.gz&quot; | sha512sum -c - &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">tar xzvf filebeat.tar.gz &amp;&amp; \\</span></span>
<span class="line"><span style="color:#9ECBFF;">cd filebeat-* &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">cp filebeat /bin &amp;&amp; \\</span></span>
<span class="line"><span style="color:#9ECBFF;">cd /opt &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">rm -rf filebeat* &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">apt-get purge -y wget &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">apt-get autoremove -y &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">apt-get clean &amp;&amp; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">COPY docker-entrypoint.sh /</span></span>
<span class="line"><span style="color:#9ECBFF;">ENTRYPOINT [&quot;/docker-entrypoint.sh&quot;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">FROM debian:stable-slim</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">ENV FILEBEAT_VERSION=7.17.0 \\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">FILEBEAT_SHA1=b89143d745c024f9f764933de77c2d3e88c4f52c9962f9dcdbbf45c656ad901e70935d8373166c90226c74c998db673aabdb8fcdb73a344aca2981672e072af3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">RUN set -x &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">apt-get update &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">apt-get install -y wget &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-\${FILEBEAT_VERSION}-linux-x86_64.tar.gz -O /opt/filebeat.tar.gz &amp;&amp; \\</span></span>
<span class="line"><span style="color:#032F62;">cd /opt &amp;&amp; \\</span></span>
<span class="line"><span style="color:#032F62;">echo&quot;\${FILEBEAT_SHA1}  filebeat.tar.gz&quot; | sha512sum -c - &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">tar xzvf filebeat.tar.gz &amp;&amp; \\</span></span>
<span class="line"><span style="color:#032F62;">cd filebeat-* &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">cp filebeat /bin &amp;&amp; \\</span></span>
<span class="line"><span style="color:#032F62;">cd /opt &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">rm -rf filebeat* &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">apt-get purge -y wget &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">apt-get autoremove -y &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">apt-get clean &amp;&amp; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">COPY docker-entrypoint.sh /</span></span>
<span class="line"><span style="color:#032F62;">ENTRYPOINT [&quot;/docker-entrypoint.sh&quot;]</span></span></code></pre></div><h2 id="_1-2-docker-entrypoint-sh" tabindex="-1">1.2 docker-entrypoint.sh <a class="header-anchor" href="#_1-2-docker-entrypoint-sh" aria-label="Permalink to &quot;1.2 docker-entrypoint.sh&quot;">​</a></h2><p>vim /data/dockerfile/filebeat/docker-entrypoint.sh</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ENV</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">\${ENV</span><span style="color:#F97583;">:-</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">PROJ_NAME</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">\${PROJ_NAME</span><span style="color:#F97583;">:-</span><span style="color:#9ECBFF;">&quot;no-define&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">MULTILINE</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">\${MULTILINE</span><span style="color:#F97583;">:-</span><span style="color:#9ECBFF;">&quot;^\\d{2}&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">KAFKA_IP</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">\${KAFKA_IP</span><span style="color:#F97583;">:-</span><span style="color:#9ECBFF;">&quot;10.1.1.10:9092&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/filebeat.yaml</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">filebeat.inputs:</span></span>
<span class="line"><span style="color:#9ECBFF;">- type: log</span></span>
<span class="line"><span style="color:#9ECBFF;">  fields_under_root: true</span></span>
<span class="line"><span style="color:#9ECBFF;">  fields:</span></span>
<span class="line"><span style="color:#9ECBFF;">    topic: logu-\${</span><span style="color:#E1E4E8;">PROJ_NAME</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">  paths:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - /logu/*.log</span></span>
<span class="line"><span style="color:#9ECBFF;">    - /logu/*/*.log</span></span>
<span class="line"><span style="color:#9ECBFF;">    - /logu/*/*/*.log</span></span>
<span class="line"><span style="color:#9ECBFF;">    - /logu/*/*/*/*.log</span></span>
<span class="line"><span style="color:#9ECBFF;">    - /logu/*/*/*/*/*.log</span></span>
<span class="line"><span style="color:#9ECBFF;">    - /logu/*/*/*/*/*/*.log</span></span>
<span class="line"><span style="color:#9ECBFF;">output.kafka:</span></span>
<span class="line"><span style="color:#9ECBFF;">  hosts: [&quot;\${</span><span style="color:#E1E4E8;">KAFKA_IP</span><span style="color:#9ECBFF;">}&quot;]</span></span>
<span class="line"><span style="color:#9ECBFF;">  topic: k8s-fb-</span><span style="color:#E1E4E8;">$ENV</span><span style="color:#9ECBFF;">-%{[topic]}</span></span>
<span class="line"><span style="color:#9ECBFF;">  version: 2.8.0</span></span>
<span class="line"><span style="color:#9ECBFF;">  required_acks: 0</span></span>
<span class="line"><span style="color:#9ECBFF;">  max_message_bytes: 10485760</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-xe</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># If user don&#39;t provide any command</span></span>
<span class="line"><span style="color:#6A737D;"># Run filebeat</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [[ </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">$1</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> ]]; </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#B392F0;"> </span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;"> exec</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">filebeat</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;"> -c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/filebeat.yaml </span></span>
<span class="line"><span style="color:#F97583;">else</span></span>
<span class="line"><span style="color:#B392F0;"> </span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># Else allow the user to run arbitrarily commands like bash</span></span>
<span class="line"><span style="color:#B392F0;"> </span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exec</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">$@</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#F97583;">fi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ENV</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">\${ENV</span><span style="color:#D73A49;">:-</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">PROJ_NAME</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">\${PROJ_NAME</span><span style="color:#D73A49;">:-</span><span style="color:#032F62;">&quot;no-define&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">MULTILINE</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">\${MULTILINE</span><span style="color:#D73A49;">:-</span><span style="color:#032F62;">&quot;^\\d{2}&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">KAFKA_IP</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">\${KAFKA_IP</span><span style="color:#D73A49;">:-</span><span style="color:#032F62;">&quot;10.1.1.10:9092&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/filebeat.yaml</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">filebeat.inputs:</span></span>
<span class="line"><span style="color:#032F62;">- type: log</span></span>
<span class="line"><span style="color:#032F62;">  fields_under_root: true</span></span>
<span class="line"><span style="color:#032F62;">  fields:</span></span>
<span class="line"><span style="color:#032F62;">    topic: logu-\${</span><span style="color:#24292E;">PROJ_NAME</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">  paths:</span></span>
<span class="line"><span style="color:#032F62;">    - /logu/*.log</span></span>
<span class="line"><span style="color:#032F62;">    - /logu/*/*.log</span></span>
<span class="line"><span style="color:#032F62;">    - /logu/*/*/*.log</span></span>
<span class="line"><span style="color:#032F62;">    - /logu/*/*/*/*.log</span></span>
<span class="line"><span style="color:#032F62;">    - /logu/*/*/*/*/*.log</span></span>
<span class="line"><span style="color:#032F62;">    - /logu/*/*/*/*/*/*.log</span></span>
<span class="line"><span style="color:#032F62;">output.kafka:</span></span>
<span class="line"><span style="color:#032F62;">  hosts: [&quot;\${</span><span style="color:#24292E;">KAFKA_IP</span><span style="color:#032F62;">}&quot;]</span></span>
<span class="line"><span style="color:#032F62;">  topic: k8s-fb-</span><span style="color:#24292E;">$ENV</span><span style="color:#032F62;">-%{[topic]}</span></span>
<span class="line"><span style="color:#032F62;">  version: 2.8.0</span></span>
<span class="line"><span style="color:#032F62;">  required_acks: 0</span></span>
<span class="line"><span style="color:#032F62;">  max_message_bytes: 10485760</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">set</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-xe</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># If user don&#39;t provide any command</span></span>
<span class="line"><span style="color:#6A737D;"># Run filebeat</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [[ </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">$1</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> ]]; </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#6F42C1;"> </span><span style="color:#24292E;"> </span><span style="color:#032F62;"> </span><span style="color:#24292E;"> </span><span style="color:#032F62;"> exec</span><span style="color:#24292E;"> </span><span style="color:#032F62;">filebeat</span><span style="color:#24292E;"> </span><span style="color:#032F62;"> -c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/filebeat.yaml </span></span>
<span class="line"><span style="color:#D73A49;">else</span></span>
<span class="line"><span style="color:#6F42C1;"> </span><span style="color:#24292E;"> </span><span style="color:#032F62;"> </span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># Else allow the user to run arbitrarily commands like bash</span></span>
<span class="line"><span style="color:#6F42C1;"> </span><span style="color:#24292E;"> </span><span style="color:#032F62;"> </span><span style="color:#24292E;"> </span><span style="color:#032F62;">exec</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">$@</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#D73A49;">fi</span></span></code></pre></div><h2 id="_1-3-制作镜像" tabindex="-1">1.3 制作镜像 <a class="header-anchor" href="#_1-3-制作镜像" aria-label="Permalink to &quot;1.3 制作镜像&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-t</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">filebeat:v7.17.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-t</span><span style="color:#24292E;"> </span><span style="color:#032F62;">filebeat:v7.17.0</span></span></code></pre></div>`,9),e=[o];function t(c,r,y,E,i,F){return a(),n("div",null,e)}const m=s(p,[["render",t]]);export{u as __pageData,m as default};
