import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Gitlab/gitlab-ciyaml.md","filePath":"guide/Linux/Gitlab/gitlab-ciyaml.md","lastUpdated":1712917766000}'),l={name:"guide/Linux/Gitlab/gitlab-ciyaml.md"},p=e(`<ul><li><p>官方介绍: <a href="https://docs.gitlab.com/ee/ci/yaml/" target="_blank" rel="noreferrer">https://docs.gitlab.com/ee/ci/yaml/</a></p></li><li><p>例子</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">image: ruby:2.1</span></span>
<span class="line"><span style="color:#e1e4e8;">services:</span></span>
<span class="line"><span style="color:#e1e4e8;">  - postgres</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">before_script:</span></span>
<span class="line"><span style="color:#e1e4e8;">  - bundle install</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">after_script:</span></span>
<span class="line"><span style="color:#e1e4e8;">  - rm secrets</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">stages:</span></span>
<span class="line"><span style="color:#e1e4e8;">  - build</span></span>
<span class="line"><span style="color:#e1e4e8;">  - test</span></span>
<span class="line"><span style="color:#e1e4e8;">  - deploy</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">job1:</span></span>
<span class="line"><span style="color:#e1e4e8;">  stage: build</span></span>
<span class="line"><span style="color:#e1e4e8;">  script:</span></span>
<span class="line"><span style="color:#e1e4e8;">    - execute-script-for-job1</span></span>
<span class="line"><span style="color:#e1e4e8;">  only:</span></span>
<span class="line"><span style="color:#e1e4e8;">    - master</span></span>
<span class="line"><span style="color:#e1e4e8;">  tags:</span></span>
<span class="line"><span style="color:#e1e4e8;">    - docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">image: ruby:2.1</span></span>
<span class="line"><span style="color:#24292e;">services:</span></span>
<span class="line"><span style="color:#24292e;">  - postgres</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">before_script:</span></span>
<span class="line"><span style="color:#24292e;">  - bundle install</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">after_script:</span></span>
<span class="line"><span style="color:#24292e;">  - rm secrets</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">stages:</span></span>
<span class="line"><span style="color:#24292e;">  - build</span></span>
<span class="line"><span style="color:#24292e;">  - test</span></span>
<span class="line"><span style="color:#24292e;">  - deploy</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">job1:</span></span>
<span class="line"><span style="color:#24292e;">  stage: build</span></span>
<span class="line"><span style="color:#24292e;">  script:</span></span>
<span class="line"><span style="color:#24292e;">    - execute-script-for-job1</span></span>
<span class="line"><span style="color:#24292e;">  only:</span></span>
<span class="line"><span style="color:#24292e;">    - master</span></span>
<span class="line"><span style="color:#24292e;">  tags:</span></span>
<span class="line"><span style="color:#24292e;">    - docker</span></span></code></pre></div><ul><li>图解</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202404081359537.png" alt="图解"></p>`,4),c=[p];function o(t,i,r,y,d,g){return n(),a("div",null,c)}const b=s(l,[["render",o]]);export{_ as __pageData,b as default};
