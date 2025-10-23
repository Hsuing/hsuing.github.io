import{_ as s,o as e,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/灰度/README.md","filePath":"guide/Linux/web/nginx/灰度/README.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/灰度/README.md"},l=a(`<p>灰度发布可以保证整体系统的稳定，在初始灰度的时候就可以发现、调整问题，以保证其影响度</p><p>灰度发布常见一般有三种方式:</p><p>Nginx+LUA方式</p><p>根据Cookie实现灰度发布</p><p>根据来路IP实现灰度发布</p><ul><li>特点</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">保证整体系统稳定性，在初始灰度的时候就可以发现、调整问题，影响范围可控；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">新功能逐步评估性能，稳定性和健康状况，如果出问题影响范围很小，相对用户体验也少；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">用户无感知，平滑过渡</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">保证整体系统稳定性，在初始灰度的时候就可以发现、调整问题，影响范围可控；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">新功能逐步评估性能，稳定性和健康状况，如果出问题影响范围很小，相对用户体验也少；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">用户无感知，平滑过渡</span></span></code></pre></div><p>如果业务对用户依赖很强，建议灰度发布。</p><p>如果是K8S平台，滚动更新是现成的方案，建议先直接使用</p><p>灰度发布：根据比例将老版本升级，例如80%用户访问是老版本，20%用户访问是新版本</p>`,10),t=[l];function o(c,i,r,d,_,u){return e(),n("div",null,t)}const y=s(p,[["render",o]]);export{h as __pageData,y as default};
