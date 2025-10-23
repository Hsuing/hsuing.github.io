import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1.temporary","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/faq/index.md","filePath":"guide/container/faq/index.md","lastUpdated":1710238820000}'),p={name:"guide/container/faq/index.md"},l=e(`<h1 id="_1-temporary" tabindex="-1">1.temporary <a class="header-anchor" href="#_1-temporary" aria-label="Permalink to &quot;1.temporary&quot;">​</a></h1><p>现象：</p><p>docker build “temporary failure resolving deb.debian.org”</p><p>解决：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">修改docker daemon配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">vim /etc/docker/dameon.json</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;dns&quot;:[&quot;114.114.114.114&quot;,&quot;8.8.8.8&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;iptables&quot;: true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#重启服务</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl restart docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">修改docker daemon配置文件</span></span>
<span class="line"><span style="color:#24292e;">vim /etc/docker/dameon.json</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&quot;dns&quot;:[&quot;114.114.114.114&quot;,&quot;8.8.8.8&quot;]</span></span>
<span class="line"><span style="color:#24292e;">&quot;iptables&quot;: true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#重启服务</span></span>
<span class="line"><span style="color:#24292e;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#24292e;">systemctl restart docker</span></span></code></pre></div><ul><li>dockerfile</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base</span></span>
<span class="line"><span style="color:#9ECBFF;">ENV ASPNETCORE_URLS=http://+:10012</span></span>
<span class="line"><span style="color:#9ECBFF;">WORKDIR /vela/app</span></span>
<span class="line"><span style="color:#6A737D;">#RUN echo &quot;deb https://mirrors.tuna.tsinghua.edu.cn/debian/ sid main contrib non-free&quot; &gt; /etc/apt/sources.list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">RUN  apt-get --allow-releaseinfo-change update -y &amp;&amp; apt-get install -y libgdiplus libc6-dev</span></span>
<span class="line"><span style="color:#9ECBFF;">ENTRYPOINT  chmod +x Activity.Core &amp;&amp; /vela/app/Activity.Core</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base</span></span>
<span class="line"><span style="color:#032F62;">ENV ASPNETCORE_URLS=http://+:10012</span></span>
<span class="line"><span style="color:#032F62;">WORKDIR /vela/app</span></span>
<span class="line"><span style="color:#6A737D;">#RUN echo &quot;deb https://mirrors.tuna.tsinghua.edu.cn/debian/ sid main contrib non-free&quot; &gt; /etc/apt/sources.list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">RUN  apt-get --allow-releaseinfo-change update -y &amp;&amp; apt-get install -y libgdiplus libc6-dev</span></span>
<span class="line"><span style="color:#032F62;">ENTRYPOINT  chmod +x Activity.Core &amp;&amp; /vela/app/Activity.Core</span></span></code></pre></div>`,7),t=[l];function o(c,i,r,d,u,y){return a(),n("div",null,t)}const g=s(p,[["render",o]]);export{h as __pageData,g as default};
