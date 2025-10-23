import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const _=JSON.parse('{"title":"1.dockerignore","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/dockerfile/5-dockerignore.md","filePath":"guide/container/dockerfile/5-dockerignore.md","lastUpdated":1730715813000}'),l={name:"guide/container/dockerfile/5-dockerignore.md"},p=e(`<h1 id="_1-dockerignore" tabindex="-1">1.dockerignore <a class="header-anchor" href="#_1-dockerignore" aria-label="Permalink to &quot;1.dockerignore&quot;">​</a></h1><h2 id="_1-1-介绍" tabindex="-1">1.1 介绍 <a class="header-anchor" href="#_1-1-介绍" aria-label="Permalink to &quot;1.1 介绍&quot;">​</a></h2><p>该<code>.dockerignore</code>文件是隐藏文件也是一个工具，可以帮助你定义你真正需要的Docker <strong>构建上下文</strong>。使用此文件，你可以为这些文件和文件夹规则指定<strong>忽略规则</strong>和<strong>异常</strong>，这些<strong>规则</strong>和<strong>异常</strong>将不包含在<strong>构建上下文中</strong>，因此不会打包到存档中并上载到Docker服务器</p><h2 id="_1-2-语法" tabindex="-1">1.2 语法 <a class="header-anchor" href="#_1-2-语法" aria-label="Permalink to &quot;1.2 语法&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pattern:</span></span>
<span class="line"><span style="color:#e1e4e8;">{term}</span></span>
<span class="line"><span style="color:#e1e4e8;">术语：</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;*&#39;         匹配任何非分隔符字符序列</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;？&#39;        匹配任何单个非分隔符</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;[&#39;[&#39;^&#39;] {character-range}&#39;]&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">字符类（必须是非空的）</span></span>
<span class="line"><span style="color:#e1e4e8;">c匹配字符c    （c！=&#39;*&#39;，&#39;？&#39;，&#39;\\\\&#39;，&#39;[&#39;）</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;\\\\&#39;    c匹配字符c</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">字符范围：</span></span>
<span class="line"><span style="color:#e1e4e8;">c匹配字符c    （c！=&#39;\\\\&#39;，&#39; - &#39;，&#39;]&#39;）</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;\\\\&#39;    c匹配字符c</span></span>
<span class="line"><span style="color:#e1e4e8;">lo&#39; - &#39;hi匹配字符c for lo＆lt; = c＆lt; = hi</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">补充：</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;**&#39;    匹配任意数量的目录（包括零）</span></span>
<span class="line"><span style="color:#e1e4e8;">&#39;！&#39;     行开头！ （感叹号）可用于排除例外情况</span></span>
<span class="line"><span style="color:#e1e4e8;">以此字符开头的&#39;＃&#39;行将被忽略：将其用于评论</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pattern:</span></span>
<span class="line"><span style="color:#24292e;">{term}</span></span>
<span class="line"><span style="color:#24292e;">术语：</span></span>
<span class="line"><span style="color:#24292e;">&#39;*&#39;         匹配任何非分隔符字符序列</span></span>
<span class="line"><span style="color:#24292e;">&#39;？&#39;        匹配任何单个非分隔符</span></span>
<span class="line"><span style="color:#24292e;">&#39;[&#39;[&#39;^&#39;] {character-range}&#39;]&#39;</span></span>
<span class="line"><span style="color:#24292e;">字符类（必须是非空的）</span></span>
<span class="line"><span style="color:#24292e;">c匹配字符c    （c！=&#39;*&#39;，&#39;？&#39;，&#39;\\\\&#39;，&#39;[&#39;）</span></span>
<span class="line"><span style="color:#24292e;">&#39;\\\\&#39;    c匹配字符c</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">字符范围：</span></span>
<span class="line"><span style="color:#24292e;">c匹配字符c    （c！=&#39;\\\\&#39;，&#39; - &#39;，&#39;]&#39;）</span></span>
<span class="line"><span style="color:#24292e;">&#39;\\\\&#39;    c匹配字符c</span></span>
<span class="line"><span style="color:#24292e;">lo&#39; - &#39;hi匹配字符c for lo＆lt; = c＆lt; = hi</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">补充：</span></span>
<span class="line"><span style="color:#24292e;">&#39;**&#39;    匹配任意数量的目录（包括零）</span></span>
<span class="line"><span style="color:#24292e;">&#39;！&#39;     行开头！ （感叹号）可用于排除例外情况</span></span>
<span class="line"><span style="color:#24292e;">以此字符开头的&#39;＃&#39;行将被忽略：将其用于评论</span></span></code></pre></div>`,5),o=[p];function c(r,t,i,d,y,g){return n(),a("div",null,o)}const k=s(l,[["render",c]]);export{_ as __pageData,k as default};
