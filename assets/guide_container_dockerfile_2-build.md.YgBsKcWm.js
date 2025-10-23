import{_ as n,o as s,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const y=JSON.parse('{"title":"1. 镜像构建篇","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/dockerfile/2-build.md","filePath":"guide/container/dockerfile/2-build.md","lastUpdated":1745674312000}'),p={name:"guide/container/dockerfile/2-build.md"},o=e(`<h1 id="_1-镜像构建篇" tabindex="-1">1. 镜像构建篇 <a class="header-anchor" href="#_1-镜像构建篇" aria-label="Permalink to &quot;1. 镜像构建篇&quot;">​</a></h1><h2 id="_1-1-构建上下文" tabindex="-1">1.1 构建上下文 <a class="header-anchor" href="#_1-1-构建上下文" aria-label="Permalink to &quot;1.1 构建上下文&quot;">​</a></h2><p>构建上下文<code>build context</code>，“上下文” 意为和现在这个工作相关的周围环境。在<code>docker</code>镜像的构建过程中有构建上下文<code>build context</code>这一概念，通俗的来说就是指执行<code>docker build</code>时当前的工作目录，不管构建时有没有用到当前目录下的某些文件及目录，默认情况下这个上下文中的文件及目录都会作为构建上下文内容发送给<code>Docker Daemon</code></p><p>当<code>docker build</code>开始执行时，控制台会输出<code>Sending build context to Docker daemon xxxMB</code>，这就表示将当前工作目录下的文件及目录都作为了构建上下文</p><p>前面提到可以在<code>RUN</code>指令中添加<code>--no-cache</code>不使用缓存，同样也可以在执行<code>docker build</code>命令时添加该指令以在镜像构建时不使用缓存</p><blockquote><p>注意：如，COPY /opt/version.json ./ 这种写法就会提示找不到这个文件</p><p>Docker 的 <strong>构建上下文</strong> 就是当前目录（<code>.</code>），所以它 <strong>只能访问当前目录和子目录中的文件</strong>，而不是系统的 <code>/opt</code> 目录</p></blockquote><h2 id="_1-2-忽略构建" tabindex="-1">1.2 忽略构建 <a class="header-anchor" href="#_1-2-忽略构建" aria-label="Permalink to &quot;1.2 忽略构建&quot;">​</a></h2><p>和<code>git</code>忽略文件<code>.gitignore</code>一样的道理，在<code>docker</code>构建镜像时也有<code>.dockerignore</code>，可以用来排除当前工作目录下不需要加入到构建上下文<code>build context</code>中的文件</p><p>例如，在构建<code>npm</code>前端的镜像时项目时，在 <code>Dockerfile</code> 的同一个文件夹中创建一个 <code>.dockerignore</code> 文件，带有以下内容，这样在构建时就可以避免将本地模块以及调试日志被拷贝进入到<code>Docker</code>镜像中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">node_modules</span></span>
<span class="line"><span style="color:#e1e4e8;">npm-debug.log</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">node_modules</span></span>
<span class="line"><span style="color:#24292e;">npm-debug.log</span></span></code></pre></div><h2 id="_1-3-多阶段构建" tabindex="-1">1.3 多阶段构建 <a class="header-anchor" href="#_1-3-多阶段构建" aria-label="Permalink to &quot;1.3 多阶段构建&quot;">​</a></h2><p>多阶段构建的应用场景及优势就是为了降低复杂性并减少依赖，避免镜像包含不必要的软件包</p><p>例如，应用程序的镜像中一般不需要安装开发调试软件包。如果需要从源码编译构建应用，最好的方式就是使用多阶段构建</p><p>简单来说，多阶段构建就是允许一个<code>Dockerfile</code>中出现多条<code>FROM</code>指令，只有最后一条<code>FROM</code>指令中指定的基础镜像作为本次构建镜像的基础镜像，其它的阶段都可以认为是只为中间步骤</p><p>每一条<code>FROM</code>指令都表示着多阶段构建过程中的一个构建阶段，后面的构建阶段可以拷贝利用前面构建阶段的产物</p><p>这里我列举一个编译构建<code>npm</code>项目，利用多阶段构建最终把静态资源制作成<code>nginx</code>镜像的<code>Dockerfile</code></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#### Stage 1: npm build</span></span>
<span class="line"><span style="color:#9ECBFF;">FROM node:12.4.0-alpine as build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">COPY package.json package-lock.json ./</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN npm install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Copy the main application</span></span>
<span class="line"><span style="color:#9ECBFF;">COPY . ./</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Arguments</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Build the application</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN npm run build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#### Stage 2: Serve the application from Nginx </span></span>
<span class="line"><span style="color:#9ECBFF;">FROM nginx:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">COPY --from=build /app/build /var/www</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Copy our custom nginx config</span></span>
<span class="line"><span style="color:#9ECBFF;">COPY nginx.conf /etc/nginx/nginx.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Expose port 3000 to the Docker host, so we can access it </span></span>
<span class="line"><span style="color:#6A737D;"># from the outside.</span></span>
<span class="line"><span style="color:#9ECBFF;">EXPOSE 80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">ENTRYPOINT [&quot;nginx&quot;,&quot;-g&quot;,&quot;daemon off;&quot;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#### Stage 1: npm build</span></span>
<span class="line"><span style="color:#032F62;">FROM node:12.4.0-alpine as build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">COPY package.json package-lock.json ./</span></span>
<span class="line"><span style="color:#032F62;">RUN npm install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Copy the main application</span></span>
<span class="line"><span style="color:#032F62;">COPY . ./</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Arguments</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Build the application</span></span>
<span class="line"><span style="color:#032F62;">RUN npm run build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#### Stage 2: Serve the application from Nginx </span></span>
<span class="line"><span style="color:#032F62;">FROM nginx:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">COPY --from=build /app/build /var/www</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Copy our custom nginx config</span></span>
<span class="line"><span style="color:#032F62;">COPY nginx.conf /etc/nginx/nginx.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Expose port 3000 to the Docker host, so we can access it </span></span>
<span class="line"><span style="color:#6A737D;"># from the outside.</span></span>
<span class="line"><span style="color:#032F62;">EXPOSE 80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">ENTRYPOINT [&quot;nginx&quot;,&quot;-g&quot;,&quot;daemon off;&quot;]</span></span></code></pre></div>`,17),l=[o];function c(i,t,d,r,u,g){return s(),a("div",null,l)}const m=n(p,[["render",c]]);export{y as __pageData,m as default};
