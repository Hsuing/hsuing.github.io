import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const F=JSON.parse('{"title":"1. k8s自带切换系统","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/cmd/kubie.md","filePath":"guide/container/k8s/cmd/kubie.md","lastUpdated":1728524698000}'),p={name:"guide/container/k8s/cmd/kubie.md"},e=l(`<h1 id="_1-k8s自带切换系统" tabindex="-1">1. k8s自带切换系统 <a class="header-anchor" href="#_1-k8s自带切换系统" aria-label="Permalink to &quot;1. k8s自带切换系统&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#显示kubeconfig上下文配置</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">view</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#显示上下文列表</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get-contexts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#展示当前所处的上下文</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">current-context</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置默认上下文</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">use-context</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">my-cluster-name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#显示kubeconfig上下文配置</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">view</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#显示上下文列表</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get-contexts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#展示当前所处的上下文</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">current-context</span><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置默认上下文</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">use-context</span><span style="color:#24292E;"> </span><span style="color:#032F62;">my-cluster-name</span></span></code></pre></div><h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h1>`,3),o=[e];function c(t,r,i,y,E,d){return n(),a("div",null,o)}const k=s(p,[["render",c]]);export{F as __pageData,k as default};
