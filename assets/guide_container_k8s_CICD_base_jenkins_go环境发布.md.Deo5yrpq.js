import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/CICD/base_jenkins/go环境发布.md","filePath":"guide/container/k8s/CICD/base_jenkins/go环境发布.md","lastUpdated":1721730545000}'),p={name:"guide/container/k8s/CICD/base_jenkins/go环境发布.md"},o=l(`<h2 id="_1-go目录结构" tabindex="-1">1. go目录结构 <a class="header-anchor" href="#_1-go目录结构" aria-label="Permalink to &quot;1. go目录结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 项目目录信息</span></span>
<span class="line"><span style="color:#e1e4e8;">$ tree go-container </span></span>
<span class="line"><span style="color:#e1e4e8;">go-container</span></span>
<span class="line"><span style="color:#e1e4e8;">├── Dockerfile</span></span>
<span class="line"><span style="color:#e1e4e8;">├── go.mod</span></span>
<span class="line"><span style="color:#e1e4e8;">├── go.sum</span></span>
<span class="line"><span style="color:#e1e4e8;">└── main.go</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 项目目录信息</span></span>
<span class="line"><span style="color:#24292e;">$ tree go-container </span></span>
<span class="line"><span style="color:#24292e;">go-container</span></span>
<span class="line"><span style="color:#24292e;">├── Dockerfile</span></span>
<span class="line"><span style="color:#24292e;">├── go.mod</span></span>
<span class="line"><span style="color:#24292e;">├── go.sum</span></span>
<span class="line"><span style="color:#24292e;">└── main.go</span></span></code></pre></div><p>main.go</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">github.com/gin-gonic/gin</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">os</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">time</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;"> engine </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> gin.</span><span style="color:#79B8FF;">Default</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;"> engine.</span><span style="color:#79B8FF;">GET</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">func</span><span style="color:#E1E4E8;">(context </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">gin.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 显示主机名字</span></span>
<span class="line"><span style="color:#E1E4E8;">  hostName, _ </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> os.</span><span style="color:#79B8FF;">Hostname</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  context.</span><span style="color:#79B8FF;">JSON</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">, gin.H{</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">&quot;version&quot;</span><span style="color:#E1E4E8;">:  </span><span style="color:#9ECBFF;">&quot;v1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">&quot;hostName&quot;</span><span style="color:#E1E4E8;">: hostName,</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">&quot;time&quot;</span><span style="color:#E1E4E8;">:     time.</span><span style="color:#79B8FF;">Now</span><span style="color:#E1E4E8;">().</span><span style="color:#79B8FF;">Format</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;2006-01-02 15:04:05&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  })</span></span>
<span class="line"><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;"> _ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> engine.</span><span style="color:#79B8FF;">Run</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;:80&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">github.com/gin-gonic/gin</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">os</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">time</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;"> engine </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> gin.</span><span style="color:#005CC5;">Default</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;"> engine.</span><span style="color:#005CC5;">GET</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">func</span><span style="color:#24292E;">(context </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">gin.Context) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 显示主机名字</span></span>
<span class="line"><span style="color:#24292E;">  hostName, _ </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> os.</span><span style="color:#005CC5;">Hostname</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  context.</span><span style="color:#005CC5;">JSON</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">200</span><span style="color:#24292E;">, gin.H{</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">&quot;version&quot;</span><span style="color:#24292E;">:  </span><span style="color:#032F62;">&quot;v1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">&quot;hostName&quot;</span><span style="color:#24292E;">: hostName,</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">&quot;time&quot;</span><span style="color:#24292E;">:     time.</span><span style="color:#005CC5;">Now</span><span style="color:#24292E;">().</span><span style="color:#005CC5;">Format</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;2006-01-02 15:04:05&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">  })</span></span>
<span class="line"><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;"> _ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> engine.</span><span style="color:#005CC5;">Run</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;:80&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_2-制作镜像" tabindex="-1">2. 制作镜像 <a class="header-anchor" href="#_2-制作镜像" aria-label="Permalink to &quot;2. 制作镜像&quot;">​</a></h2><p>Dockerfile</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># Golang版本；Alpine镜像的体积较小。</span></span>
<span class="line"><span style="color:#9ECBFF;">FROM golang:1.18 as builder</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将代码复制到构建镜像中。</span></span>
<span class="line"><span style="color:#9ECBFF;">ADD . /workspace</span></span>
<span class="line"><span style="color:#9ECBFF;">WORKDIR /workspace</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 挂载构建缓存。</span></span>
<span class="line"><span style="color:#6A737D;"># GOPROXY防止下载失败。</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN --mount=type=cache,target=/go \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">env GOPROXY=https://goproxy.cn,direct \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">go build -buildmode=pie -ldflags &quot;-linkmode external -extldflags -static -w&quot; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">-o /workspace/gin-hello</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 运行时镜像。</span></span>
<span class="line"><span style="color:#6A737D;"># Alpine兼顾了镜像大小和运维性。</span></span>
<span class="line"><span style="color:#9ECBFF;">FROM alpine:3.14</span></span>
<span class="line"><span style="color:#9ECBFF;">EXPOSE 8080</span></span>
<span class="line"><span style="color:#6A737D;"># 复制构建产物。</span></span>
<span class="line"><span style="color:#9ECBFF;">COPY --from=builder /workspace/gin-hello /app/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 指定默认的启动命令。</span></span>
<span class="line"><span style="color:#9ECBFF;">CMD [&quot;/app/gin-hello&quot;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># Golang版本；Alpine镜像的体积较小。</span></span>
<span class="line"><span style="color:#032F62;">FROM golang:1.18 as builder</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将代码复制到构建镜像中。</span></span>
<span class="line"><span style="color:#032F62;">ADD . /workspace</span></span>
<span class="line"><span style="color:#032F62;">WORKDIR /workspace</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 挂载构建缓存。</span></span>
<span class="line"><span style="color:#6A737D;"># GOPROXY防止下载失败。</span></span>
<span class="line"><span style="color:#032F62;">RUN --mount=type=cache,target=/go \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">env GOPROXY=https://goproxy.cn,direct \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">go build -buildmode=pie -ldflags &quot;-linkmode external -extldflags -static -w&quot; \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">-o /workspace/gin-hello</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 运行时镜像。</span></span>
<span class="line"><span style="color:#6A737D;"># Alpine兼顾了镜像大小和运维性。</span></span>
<span class="line"><span style="color:#032F62;">FROM alpine:3.14</span></span>
<span class="line"><span style="color:#032F62;">EXPOSE 8080</span></span>
<span class="line"><span style="color:#6A737D;"># 复制构建产物。</span></span>
<span class="line"><span style="color:#032F62;">COPY --from=builder /workspace/gin-hello /app/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 指定默认的启动命令。</span></span>
<span class="line"><span style="color:#032F62;">CMD [&quot;/app/gin-hello&quot;]</span></span></code></pre></div><h3 id="_2-1-构建镜像" tabindex="-1">2.1 构建镜像 <a class="header-anchor" href="#_2-1-构建镜像" aria-label="Permalink to &quot;2.1 构建镜像&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker build -t test/gin-hello:v1 .</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker build -t test/gin-hello:v1 .</span></span></code></pre></div>`,9),e=[o];function c(t,r,i,y,E,F){return n(),a("div",null,e)}const d=s(p,[["render",c]]);export{g as __pageData,d as default};
