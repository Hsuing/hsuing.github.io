import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Logs/Elasticsearch/index.md","filePath":"guide/Linux/Logs/Elasticsearch/index.md","lastUpdated":1754578172000}'),t={name:"guide/Linux/Logs/Elasticsearch/index.md"},p=n(`<p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/20250807142536616.png" alt=""></p><p>优化</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">queue.mem.events: 30000 </span></span>
<span class="line"><span style="color:#e1e4e8;">output.elasticsearch.bulk_max_size: 20000</span></span>
<span class="line"><span style="color:#e1e4e8;">max_event_size: 1457600</span></span>
<span class="line"><span style="color:#e1e4e8;">max_header_size: 485760</span></span>
<span class="line"><span style="color:#e1e4e8;">idle_timeout: 90s</span></span>
<span class="line"><span style="color:#e1e4e8;">read_timeout: 300s</span></span>
<span class="line"><span style="color:#e1e4e8;">write_timeout: 300s</span></span>
<span class="line"><span style="color:#e1e4e8;">output.elasticsearch.worker: 5</span></span>
<span class="line"><span style="color:#e1e4e8;">output.elasticsearch.timeout: 300</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">queue.mem.events: 30000 </span></span>
<span class="line"><span style="color:#24292e;">output.elasticsearch.bulk_max_size: 20000</span></span>
<span class="line"><span style="color:#24292e;">max_event_size: 1457600</span></span>
<span class="line"><span style="color:#24292e;">max_header_size: 485760</span></span>
<span class="line"><span style="color:#24292e;">idle_timeout: 90s</span></span>
<span class="line"><span style="color:#24292e;">read_timeout: 300s</span></span>
<span class="line"><span style="color:#24292e;">write_timeout: 300s</span></span>
<span class="line"><span style="color:#24292e;">output.elasticsearch.worker: 5</span></span>
<span class="line"><span style="color:#24292e;">output.elasticsearch.timeout: 300</span></span></code></pre></div>`,3),l=[p];function o(c,i,r,_,u,d){return e(),a("div",null,l)}const y=s(t,[["render",o]]);export{h as __pageData,y as default};
