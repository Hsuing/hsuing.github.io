import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1.vue3+vite+ts打包时报错","description":"","frontmatter":{},"headers":[],"relativePath":"guide/vue/faq/index.md","filePath":"guide/vue/faq/index.md","lastUpdated":1730197614000}'),l={name:"guide/vue/faq/index.md"},p=e(`<h1 id="_1-vue3-vite-ts打包时报错" tabindex="-1">1.vue3+vite+ts打包时报错 <a class="header-anchor" href="#_1-vue3-vite-ts打包时报错" aria-label="Permalink to &quot;1.vue3+vite+ts打包时报错&quot;">​</a></h1><ul><li>现象</li></ul><p><strong>Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory</strong></p><ul><li>解决方式</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#1</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">increase-memory-limit</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cross-env</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--dev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#2</span></span>
<span class="line"><span style="color:#B392F0;">在package.json的script中添加：</span></span>
<span class="line"><span style="color:#B392F0;">&quot;fix-memory-limit&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;cross-env LIMIT=4096 increase-memory-limit&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">（这是4G的，如果不行可以把4096改成8192）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#3</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">fix-memory-limit</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#4，重新执行build</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docs:build</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#1</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">increase-memory-limit</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cross-env</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--dev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#2</span></span>
<span class="line"><span style="color:#6F42C1;">在package.json的script中添加：</span></span>
<span class="line"><span style="color:#6F42C1;">&quot;fix-memory-limit&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;cross-env LIMIT=4096 increase-memory-limit&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">（这是4G的，如果不行可以把4096改成8192）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#3</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#032F62;">fix-memory-limit</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#4，重新执行build</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docs:build</span></span></code></pre></div><p><strong>之后的打包还爆内存不足的错误就继续先yarn run fix-memory-limit 再yarn build</strong> 即可</p><p><strong>如果打完包遇到这个提示，包块的大小超过了限制</strong></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202403292230137.png" alt="image-20240329223025229"></p><ul><li>解决方式</li></ul><p><strong>在vite.config.ts里添加这些进行优化</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">build: {</span></span>
<span class="line"><span style="color:#e1e4e8;">  sourcemap: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">  minify: &#39;terser&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  chunkSizeWarningLimit: 1500,</span></span>
<span class="line"><span style="color:#e1e4e8;">  terserOptions: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    compress: {</span></span>
<span class="line"><span style="color:#e1e4e8;">      drop_console: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">      drop_debugger: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  rollupOptions: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    output: {</span></span>
<span class="line"><span style="color:#e1e4e8;">      manualChunks(id) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        if (id.includes(&#39;node_modules&#39;)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">          return id</span></span>
<span class="line"><span style="color:#e1e4e8;">            .toString()</span></span>
<span class="line"><span style="color:#e1e4e8;">            .split(&#39;node_modules/&#39;)[1]</span></span>
<span class="line"><span style="color:#e1e4e8;">            .split(&#39;/&#39;)[0]</span></span>
<span class="line"><span style="color:#e1e4e8;">            .toString();</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">      },</span></span>
<span class="line"><span style="color:#e1e4e8;">      chunkFileNames: (chunkInfo) =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">        const facadeModuleId = chunkInfo.facadeModuleId</span></span>
<span class="line"><span style="color:#e1e4e8;">          ? chunkInfo.facadeModuleId.split(&#39;/&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">          : [];</span></span>
<span class="line"><span style="color:#e1e4e8;">        const fileName =</span></span>
<span class="line"><span style="color:#e1e4e8;">          facadeModuleId[facadeModuleId.length - 2] || &#39;[name]&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        return \`js/\${fileName}/[name].[hash].js\`;</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">build: {</span></span>
<span class="line"><span style="color:#24292e;">  sourcemap: false,</span></span>
<span class="line"><span style="color:#24292e;">  minify: &#39;terser&#39;,</span></span>
<span class="line"><span style="color:#24292e;">  chunkSizeWarningLimit: 1500,</span></span>
<span class="line"><span style="color:#24292e;">  terserOptions: {</span></span>
<span class="line"><span style="color:#24292e;">    compress: {</span></span>
<span class="line"><span style="color:#24292e;">      drop_console: true,</span></span>
<span class="line"><span style="color:#24292e;">      drop_debugger: true</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  rollupOptions: {</span></span>
<span class="line"><span style="color:#24292e;">    output: {</span></span>
<span class="line"><span style="color:#24292e;">      manualChunks(id) {</span></span>
<span class="line"><span style="color:#24292e;">        if (id.includes(&#39;node_modules&#39;)) {</span></span>
<span class="line"><span style="color:#24292e;">          return id</span></span>
<span class="line"><span style="color:#24292e;">            .toString()</span></span>
<span class="line"><span style="color:#24292e;">            .split(&#39;node_modules/&#39;)[1]</span></span>
<span class="line"><span style="color:#24292e;">            .split(&#39;/&#39;)[0]</span></span>
<span class="line"><span style="color:#24292e;">            .toString();</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">      },</span></span>
<span class="line"><span style="color:#24292e;">      chunkFileNames: (chunkInfo) =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">        const facadeModuleId = chunkInfo.facadeModuleId</span></span>
<span class="line"><span style="color:#24292e;">          ? chunkInfo.facadeModuleId.split(&#39;/&#39;)</span></span>
<span class="line"><span style="color:#24292e;">          : [];</span></span>
<span class="line"><span style="color:#24292e;">        const fileName =</span></span>
<span class="line"><span style="color:#24292e;">          facadeModuleId[facadeModuleId.length - 2] || &#39;[name]&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        return \`js/\${fileName}/[name].[hash].js\`;</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>项目，</p><p><a href="https://github.com/noovertime7/kubemanage?tab=readme-ov-file" target="_blank" rel="noreferrer">https://github.com/noovertime7/kubemanage?tab=readme-ov-file</a></p>`,13),o=[p];function c(t,r,i,y,d,u){return n(),a("div",null,o)}const g=s(l,[["render",c]]);export{h as __pageData,g as default};
