import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const E=JSON.parse('{"title":"1. dotnet","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/dockerfile/1-example.md","filePath":"guide/container/dockerfile/1-example.md","lastUpdated":1720533756000}'),l={name:"guide/container/dockerfile/1-example.md"},e=p(`<h1 id="_1-dotnet" tabindex="-1">1. dotnet <a class="header-anchor" href="#_1-dotnet" aria-label="Permalink to &quot;1. dotnet&quot;">​</a></h1><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 使用官方的.NET Core SDK作为基础镜像</span></span>
<span class="line"><span style="color:#9ECBFF;">FROM mcr.microsoft.com/dotnet/sdk:latest AS build-env</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置工作目录</span></span>
<span class="line"><span style="color:#9ECBFF;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将项目文件复制到工作目录</span></span>
<span class="line"><span style="color:#9ECBFF;">COPY *.csproj ./</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 恢复项目依赖项</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN dotnet restore</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将所有项目文件复制到工作目录</span></span>
<span class="line"><span style="color:#9ECBFF;">COPY . ./</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 构建项目</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN dotnet build -c Release -o out</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 选择运行时镜像</span></span>
<span class="line"><span style="color:#9ECBFF;">FROM mcr.microsoft.com/dotnet/aspnet:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置工作目录</span></span>
<span class="line"><span style="color:#9ECBFF;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 从构建镜像中复制发布的内容</span></span>
<span class="line"><span style="color:#9ECBFF;">COPY --from=build-env /app/out .</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 暴露8060端口</span></span>
<span class="line"><span style="color:#9ECBFF;">EXPOSE 8060</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置环境变量来指定服务器URL</span></span>
<span class="line"><span style="color:#9ECBFF;">ENV ASPNETCORE_URLS=http://0.0.0.0:8060</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 运行应用程序</span></span>
<span class="line"><span style="color:#9ECBFF;">ENTRYPOINT [&quot;dotnet&quot;, &quot;SendMessage.WebApi.dll&quot;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 使用官方的.NET Core SDK作为基础镜像</span></span>
<span class="line"><span style="color:#032F62;">FROM mcr.microsoft.com/dotnet/sdk:latest AS build-env</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置工作目录</span></span>
<span class="line"><span style="color:#032F62;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将项目文件复制到工作目录</span></span>
<span class="line"><span style="color:#032F62;">COPY *.csproj ./</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 恢复项目依赖项</span></span>
<span class="line"><span style="color:#032F62;">RUN dotnet restore</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将所有项目文件复制到工作目录</span></span>
<span class="line"><span style="color:#032F62;">COPY . ./</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 构建项目</span></span>
<span class="line"><span style="color:#032F62;">RUN dotnet build -c Release -o out</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 选择运行时镜像</span></span>
<span class="line"><span style="color:#032F62;">FROM mcr.microsoft.com/dotnet/aspnet:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置工作目录</span></span>
<span class="line"><span style="color:#032F62;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 从构建镜像中复制发布的内容</span></span>
<span class="line"><span style="color:#032F62;">COPY --from=build-env /app/out .</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 暴露8060端口</span></span>
<span class="line"><span style="color:#032F62;">EXPOSE 8060</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置环境变量来指定服务器URL</span></span>
<span class="line"><span style="color:#032F62;">ENV ASPNETCORE_URLS=http://0.0.0.0:8060</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 运行应用程序</span></span>
<span class="line"><span style="color:#032F62;">ENTRYPOINT [&quot;dotnet&quot;, &quot;SendMessage.WebApi.dll&quot;]</span></span></code></pre></div><h3 id="多个port" tabindex="-1">多个port <a class="header-anchor" href="#多个port" aria-label="Permalink to &quot;多个port&quot;">​</a></h3><p>dotnet /data/ufun/moniTradeService/Storm.Trade.ServiceHost.dll --ip 172.21.203.187 --port 10087 --server.urls <a href="http://172.21.203.187:8000" target="_blank" rel="noreferrer">http://172.21.203.187:8000</a></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 使用官方的.NET Core SDK作为基础镜像</span></span>
<span class="line"><span style="color:#9ECBFF;">FROM mcr.microsoft.com/dotnet/sdk:latest AS build-env</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置工作目录</span></span>
<span class="line"><span style="color:#9ECBFF;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将项目文件复制到工作目录</span></span>
<span class="line"><span style="color:#9ECBFF;">COPY *.csproj ./</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 恢复项目依赖项</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN dotnet restore</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将所有项目文件复制到工作目录</span></span>
<span class="line"><span style="color:#9ECBFF;">COPY . ./</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 构建项目</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN dotnet build -c Release -o out</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 选择运行时镜像</span></span>
<span class="line"><span style="color:#9ECBFF;">FROM mcr.microsoft.com/dotnet/aspnet:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置工作目录</span></span>
<span class="line"><span style="color:#9ECBFF;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 从构建镜像中复制发布的内容</span></span>
<span class="line"><span style="color:#9ECBFF;">COPY --from=build-env /app/out .</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 暴露端口</span></span>
<span class="line"><span style="color:#9ECBFF;">EXPOSE 8000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置环境变量来指定服务器URL和IP</span></span>
<span class="line"><span style="color:#9ECBFF;">ENV ASPNETCORE_URLS=http://0.0.0.0:8000</span></span>
<span class="line"><span style="color:#9ECBFF;">ENV IP=172.21.203.187</span></span>
<span class="line"><span style="color:#9ECBFF;">ENV PORT=10087</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 运行应用程序</span></span>
<span class="line"><span style="color:#9ECBFF;">ENTRYPOINT [&quot;dotnet&quot;, &quot;Storm.Trade.ServiceHost.dll&quot;, &quot;--ip&quot;, &quot;$IP&quot;, &quot;--port&quot;, &quot;$PORT&quot;, &quot;--server.urls&quot;, &quot;$ASPNETCORE_URLS&quot;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 使用官方的.NET Core SDK作为基础镜像</span></span>
<span class="line"><span style="color:#032F62;">FROM mcr.microsoft.com/dotnet/sdk:latest AS build-env</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置工作目录</span></span>
<span class="line"><span style="color:#032F62;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将项目文件复制到工作目录</span></span>
<span class="line"><span style="color:#032F62;">COPY *.csproj ./</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 恢复项目依赖项</span></span>
<span class="line"><span style="color:#032F62;">RUN dotnet restore</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将所有项目文件复制到工作目录</span></span>
<span class="line"><span style="color:#032F62;">COPY . ./</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 构建项目</span></span>
<span class="line"><span style="color:#032F62;">RUN dotnet build -c Release -o out</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 选择运行时镜像</span></span>
<span class="line"><span style="color:#032F62;">FROM mcr.microsoft.com/dotnet/aspnet:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置工作目录</span></span>
<span class="line"><span style="color:#032F62;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 从构建镜像中复制发布的内容</span></span>
<span class="line"><span style="color:#032F62;">COPY --from=build-env /app/out .</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 暴露端口</span></span>
<span class="line"><span style="color:#032F62;">EXPOSE 8000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置环境变量来指定服务器URL和IP</span></span>
<span class="line"><span style="color:#032F62;">ENV ASPNETCORE_URLS=http://0.0.0.0:8000</span></span>
<span class="line"><span style="color:#032F62;">ENV IP=172.21.203.187</span></span>
<span class="line"><span style="color:#032F62;">ENV PORT=10087</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 运行应用程序</span></span>
<span class="line"><span style="color:#032F62;">ENTRYPOINT [&quot;dotnet&quot;, &quot;Storm.Trade.ServiceHost.dll&quot;, &quot;--ip&quot;, &quot;$IP&quot;, &quot;--port&quot;, &quot;$PORT&quot;, &quot;--server.urls&quot;, &quot;$ASPNETCORE_URLS&quot;]</span></span></code></pre></div><p>上面错误</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">FROM mcr.microsoft.com/dotnet/sdk:2.1 AS base</span></span>
<span class="line"><span style="color:#9ECBFF;">WORKDIR /vela/app</span></span>
<span class="line"><span style="color:#9ECBFF;">ENV ASPNETCORE_URLS=http://+:8000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">ENTRYPOINT dotnet Storm.Trade.ServiceHost.dll --ip 172.31.32.171 --port 10087 --server.urls $ASPNETCORE_URLS</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">FROM mcr.microsoft.com/dotnet/sdk:2.1 AS base</span></span>
<span class="line"><span style="color:#032F62;">WORKDIR /vela/app</span></span>
<span class="line"><span style="color:#032F62;">ENV ASPNETCORE_URLS=http://+:8000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">ENTRYPOINT dotnet Storm.Trade.ServiceHost.dll --ip 172.31.32.171 --port 10087 --server.urls $ASPNETCORE_URLS</span></span></code></pre></div>`,7),o=[e];function c(t,i,r,d,y,F){return n(),a("div",null,o)}const R=s(l,[["render",c]]);export{E as __pageData,R as default};
