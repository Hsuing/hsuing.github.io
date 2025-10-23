import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Shells/1-syntax.md","filePath":"guide/Shells/1-syntax.md","lastUpdated":1729765555000}'),l={name:"guide/Shells/1-syntax.md"},p=e(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 执行命令遇到错误就退出</span></span>
<span class="line"><span style="color:#e1e4e8;">set -e</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 脚本中遇到不存在的变量就退出</span></span>
<span class="line"><span style="color:#e1e4e8;">set -u</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 执行指令的时候，同时把指令输出，方便观察结果</span></span>
<span class="line"><span style="color:#e1e4e8;">set -x</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 执行管道的时候，如果前面的命令出错，管道后面的命令会停止</span></span>
<span class="line"><span style="color:#e1e4e8;">set -o pipefail</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 执行命令遇到错误就退出</span></span>
<span class="line"><span style="color:#24292e;">set -e</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 脚本中遇到不存在的变量就退出</span></span>
<span class="line"><span style="color:#24292e;">set -u</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 执行指令的时候，同时把指令输出，方便观察结果</span></span>
<span class="line"><span style="color:#24292e;">set -x</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 执行管道的时候，如果前面的命令出错，管道后面的命令会停止</span></span>
<span class="line"><span style="color:#24292e;">set -o pipefail</span></span></code></pre></div>`,1),t=[p];function o(c,i,r,d,y,_){return n(),a("div",null,t)}const g=s(l,[["render",o]]);export{u as __pageData,g as default};
