import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const C=JSON.parse('{"title":"1.配置dockerfile","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/dockerfile/8-nodejs.md","filePath":"guide/container/dockerfile/8-nodejs.md","lastUpdated":1745674312000}'),l={name:"guide/container/dockerfile/8-nodejs.md"},o=p(`<h1 id="_1-配置dockerfile" tabindex="-1">1.配置dockerfile <a class="header-anchor" href="#_1-配置dockerfile" aria-label="Permalink to &quot;1.配置dockerfile&quot;">​</a></h1><p>vi Dockerfile</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 安装依赖</span></span>
<span class="line"><span style="color:#B392F0;">FROM</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">node:22-alpine</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">AS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">deps</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.</span></span>
<span class="line"><span style="color:#B392F0;">RUN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apk</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--no-cache</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">libc6-compat</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">WORKDIR</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">COPY</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">package.json</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">package-lock.json</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">./</span></span>
<span class="line"><span style="color:#B392F0;">RUN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 构建镜像</span></span>
<span class="line"><span style="color:#B392F0;">FROM</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">node-22-alpine</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">AS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">runner</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">WORKDIR</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建非 root 用户 （以用户名 app 为例）</span></span>
<span class="line"><span style="color:#B392F0;">RUN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">addgroup</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-S</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">app</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">adduser</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-S</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">app</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-G</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">app</span></span>
<span class="line"><span style="color:#B392F0;">USER</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">app</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 从第一阶段复制依赖 node_modules</span></span>
<span class="line"><span style="color:#B392F0;">COPY</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span></span>
<span class="line"><span style="color:#B392F0;">COPY</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--from=deps</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/app/node_modules</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">./node_modules</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">RUN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 生产环境变量</span></span>
<span class="line"><span style="color:#6A737D;"># Next.js 会收集完全匿名的使用数据用于分析。</span></span>
<span class="line"><span style="color:#6A737D;"># 详情请访问：https://nextjs.org/telemetry</span></span>
<span class="line"><span style="color:#6A737D;"># 若要禁用此功能，请取消注释以下行：</span></span>
<span class="line"><span style="color:#6A737D;"># ENV NEXT_TELEMETRY_DISABLED=1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">NODE_ENV=production</span></span>
<span class="line"><span style="color:#B392F0;">ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">HOSTNAME=&quot;0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#B392F0;">EXPOSE</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 启动应用程序</span></span>
<span class="line"><span style="color:#B392F0;">CMD</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&quot;npm&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;start&quot;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 安装依赖</span></span>
<span class="line"><span style="color:#6F42C1;">FROM</span><span style="color:#24292E;"> </span><span style="color:#032F62;">node:22-alpine</span><span style="color:#24292E;"> </span><span style="color:#032F62;">AS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">deps</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.</span></span>
<span class="line"><span style="color:#6F42C1;">RUN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apk</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--no-cache</span><span style="color:#24292E;"> </span><span style="color:#032F62;">libc6-compat</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">WORKDIR</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">COPY</span><span style="color:#24292E;"> </span><span style="color:#032F62;">package.json</span><span style="color:#24292E;"> </span><span style="color:#032F62;">package-lock.json</span><span style="color:#24292E;"> </span><span style="color:#032F62;">./</span></span>
<span class="line"><span style="color:#6F42C1;">RUN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 构建镜像</span></span>
<span class="line"><span style="color:#6F42C1;">FROM</span><span style="color:#24292E;"> </span><span style="color:#032F62;">node-22-alpine</span><span style="color:#24292E;"> </span><span style="color:#032F62;">AS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">runner</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">WORKDIR</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建非 root 用户 （以用户名 app 为例）</span></span>
<span class="line"><span style="color:#6F42C1;">RUN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">addgroup</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-S</span><span style="color:#24292E;"> </span><span style="color:#032F62;">app</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">adduser</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-S</span><span style="color:#24292E;"> </span><span style="color:#032F62;">app</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-G</span><span style="color:#24292E;"> </span><span style="color:#032F62;">app</span></span>
<span class="line"><span style="color:#6F42C1;">USER</span><span style="color:#24292E;"> </span><span style="color:#032F62;">app</span><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 从第一阶段复制依赖 node_modules</span></span>
<span class="line"><span style="color:#6F42C1;">COPY</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span></span>
<span class="line"><span style="color:#6F42C1;">COPY</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--from=deps</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/app/node_modules</span><span style="color:#24292E;"> </span><span style="color:#032F62;">./node_modules</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">RUN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 生产环境变量</span></span>
<span class="line"><span style="color:#6A737D;"># Next.js 会收集完全匿名的使用数据用于分析。</span></span>
<span class="line"><span style="color:#6A737D;"># 详情请访问：https://nextjs.org/telemetry</span></span>
<span class="line"><span style="color:#6A737D;"># 若要禁用此功能，请取消注释以下行：</span></span>
<span class="line"><span style="color:#6A737D;"># ENV NEXT_TELEMETRY_DISABLED=1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">ENV</span><span style="color:#24292E;"> </span><span style="color:#032F62;">NODE_ENV=production</span></span>
<span class="line"><span style="color:#6F42C1;">ENV</span><span style="color:#24292E;"> </span><span style="color:#032F62;">HOSTNAME=&quot;0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">EXPOSE</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 启动应用程序</span></span>
<span class="line"><span style="color:#6F42C1;">CMD</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;npm&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;start&quot;]</span></span></code></pre></div><h2 id="_1-1配置dockerignore" tabindex="-1">1.1配置dockerignore <a class="header-anchor" href="#_1-1配置dockerignore" aria-label="Permalink to &quot;1.1配置dockerignore&quot;">​</a></h2><p>同时在 Dockerfile 同级目录创建一个 <code>.dockerignore</code> 文件，以从 Docker 构建上下文中排除不必要的文件：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">node_modules</span></span>
<span class="line"><span style="color:#B392F0;">Dockerfile</span></span>
<span class="line"><span style="color:#B392F0;">README.md</span></span>
<span class="line"><span style="color:#B392F0;">.dockerignore</span></span>
<span class="line"><span style="color:#B392F0;">.git</span></span>
<span class="line"><span style="color:#B392F0;">.next</span></span>
<span class="line"><span style="color:#B392F0;">.env*</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">node_modules</span></span>
<span class="line"><span style="color:#6F42C1;">Dockerfile</span></span>
<span class="line"><span style="color:#6F42C1;">README.md</span></span>
<span class="line"><span style="color:#6F42C1;">.dockerignore</span></span>
<span class="line"><span style="color:#6F42C1;">.git</span></span>
<span class="line"><span style="color:#6F42C1;">.next</span></span>
<span class="line"><span style="color:#6F42C1;">.env*</span></span></code></pre></div><h1 id="_2-使用容器编译node-js" tabindex="-1">2.使用容器编译node.js <a class="header-anchor" href="#_2-使用容器编译node-js" aria-label="Permalink to &quot;2.使用容器编译node.js&quot;">​</a></h1><p>由于没有node.js环境，采用镜像方式进行编译</p><p>创建Dockerfile</p><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> node:lts-alpine</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">WORKDIR</span><span style="color:#E1E4E8;"> /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 复制 package 文件</span></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> package*.json ./</span></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> /opt/version.json ./</span></span>
<span class="line"><span style="color:#6A737D;"># 安装依赖</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> npm install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 构建项目</span></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> . .</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> npm run build:development</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> node:lts-alpine</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">WORKDIR</span><span style="color:#24292E;"> /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 复制 package 文件</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> package*.json ./</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> /opt/version.json ./</span></span>
<span class="line"><span style="color:#6A737D;"># 安装依赖</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> npm install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 构建项目</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> . .</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> npm run build:development</span></span></code></pre></div><p>分离静态文件</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/version.json</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-t</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">myplsapp:v1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">extract-stage</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">myplsapp:v1</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">extract-stage:/app/dist</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">./dist</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">extract-stage</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rmi</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">myplsapp:v1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/version.json</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-t</span><span style="color:#24292E;"> </span><span style="color:#032F62;">myplsapp:v1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">extract-stage</span><span style="color:#24292E;"> </span><span style="color:#032F62;">myplsapp:v1</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">extract-stage:/app/dist</span><span style="color:#24292E;"> </span><span style="color:#032F62;">./dist</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">extract-stage</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rmi</span><span style="color:#24292E;"> </span><span style="color:#032F62;">myplsapp:v1</span></span></code></pre></div>`,12),e=[o];function c(t,r,y,E,i,F){return n(),a("div",null,e)}const B=s(l,[["render",c]]);export{C as __pageData,B as default};
