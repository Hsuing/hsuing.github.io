import{_ as s,c as a,o as n,R as p}from"./chunks/framework.CIzs38F0.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/cmd/3-find.md","filePath":"guide/Linux/cmd/3-find.md","lastUpdated":1702609653000}'),o={name:"guide/Linux/cmd/3-find.md"},l=p('<ul><li>删除几天之前的文件</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">find</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/home/apps/postgresql/archived_backupfiles/</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-ctime</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">+15</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-type</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">f</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-exec</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{}</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">find</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/home/apps/postgresql/archived_backupfiles/</span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-ctime</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+15</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-type</span><span style="color:#24292E;"> </span><span style="color:#032F62;">f</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-exec</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{}</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\;</span></span></code></pre></div>',2),e=[l];function t(c,r,y,i,E,d){return n(),a("div",null,e)}const C=s(o,[["render",t]]);export{_ as __pageData,C as default};
