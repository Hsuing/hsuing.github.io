import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1.GO搭建","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/2-安装.md","filePath":"guide/go/2-安装.md","lastUpdated":1721730545000}'),l={name:"guide/go/2-安装.md"},o=e(`<h1 id="_1-go搭建" tabindex="-1">1.GO搭建 <a class="header-anchor" href="#_1-go搭建" aria-label="Permalink to &quot;1.GO搭建&quot;">​</a></h1><p>go下载地址，<a href="https://go.dev/dl/" target="_blank" rel="noreferrer">https://go.dev/dl/</a></p><p>或者，<a href="https://golang.google.cn/dl/" target="_blank" rel="noreferrer">https://golang.google.cn/dl/</a></p><p>或者，<a href="https://studygolang.com/" target="_blank" rel="noreferrer">https://studygolang.com/</a></p><h2 id="_1-1win" tabindex="-1">1.1win <a class="header-anchor" href="#_1-1win" aria-label="Permalink to &quot;1.1win&quot;">​</a></h2><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><p>在c盘创建go目录</p><p>安装路径c:/go，其他安装都选择“下一步”即可</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311171413238.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311171413403.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311171413267.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311171413624.jpg" alt=""></p><p>点击完成</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">go env验证是否安装成功</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">go env</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">set GO111MODULE=</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOARCH=amd64</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOBIN=</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOCACHE=C:\\Users\\app\\AppData\\Local\\go-build</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOENV=C:\\Users\\app\\AppData\\Roaming\\go\\env</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOEXE=.exe</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOEXPERIMENT=</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOFLAGS=</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOHOSTARCH=amd64</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOHOSTOS=windows</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOINSECURE=</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOMODCACHE=C:\\Users\\app\\go\\pkg\\mod</span></span>
<span class="line"><span style="color:#e1e4e8;">set GONOPROXY=</span></span>
<span class="line"><span style="color:#e1e4e8;">set GONOSUMDB=</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOOS=windows</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOPATH=C:\\Users\\app\\go</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOPRIVATE=</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOPROXY=https://proxy.golang.org,direct</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOROOT=C:\\Program Files\\Go</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOSUMDB=sum.golang.org</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOTMPDIR=</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOTOOLDIR=C:\\Program Files\\Go\\pkg\\tool\\windows_amd64</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOVCS=</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOVERSION=go1.17.13</span></span>
<span class="line"><span style="color:#e1e4e8;">set GCCGO=gccgo</span></span>
<span class="line"><span style="color:#e1e4e8;">set AR=ar</span></span>
<span class="line"><span style="color:#e1e4e8;">set CC=gcc</span></span>
<span class="line"><span style="color:#e1e4e8;">set CXX=g++</span></span>
<span class="line"><span style="color:#e1e4e8;">set CGO_ENABLED=1</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOMOD=NUL</span></span>
<span class="line"><span style="color:#e1e4e8;">set CGO_CFLAGS=-g -O2</span></span>
<span class="line"><span style="color:#e1e4e8;">set CGO_CPPFLAGS=</span></span>
<span class="line"><span style="color:#e1e4e8;">set CGO_CXXFLAGS=-g -O2</span></span>
<span class="line"><span style="color:#e1e4e8;">set CGO_FFLAGS=-g -O2</span></span>
<span class="line"><span style="color:#e1e4e8;">set CGO_LDFLAGS=-g -O2</span></span>
<span class="line"><span style="color:#e1e4e8;">set PKG_CONFIG=pkg-config</span></span>
<span class="line"><span style="color:#e1e4e8;">set GOGCCFLAGS=-m64 -mthreads -fno-caret-diagnostics -Qunused-arguments -fmessagld -gno-record-gcc-switches</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">go env验证是否安装成功</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">go env</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">set GO111MODULE=</span></span>
<span class="line"><span style="color:#24292e;">set GOARCH=amd64</span></span>
<span class="line"><span style="color:#24292e;">set GOBIN=</span></span>
<span class="line"><span style="color:#24292e;">set GOCACHE=C:\\Users\\app\\AppData\\Local\\go-build</span></span>
<span class="line"><span style="color:#24292e;">set GOENV=C:\\Users\\app\\AppData\\Roaming\\go\\env</span></span>
<span class="line"><span style="color:#24292e;">set GOEXE=.exe</span></span>
<span class="line"><span style="color:#24292e;">set GOEXPERIMENT=</span></span>
<span class="line"><span style="color:#24292e;">set GOFLAGS=</span></span>
<span class="line"><span style="color:#24292e;">set GOHOSTARCH=amd64</span></span>
<span class="line"><span style="color:#24292e;">set GOHOSTOS=windows</span></span>
<span class="line"><span style="color:#24292e;">set GOINSECURE=</span></span>
<span class="line"><span style="color:#24292e;">set GOMODCACHE=C:\\Users\\app\\go\\pkg\\mod</span></span>
<span class="line"><span style="color:#24292e;">set GONOPROXY=</span></span>
<span class="line"><span style="color:#24292e;">set GONOSUMDB=</span></span>
<span class="line"><span style="color:#24292e;">set GOOS=windows</span></span>
<span class="line"><span style="color:#24292e;">set GOPATH=C:\\Users\\app\\go</span></span>
<span class="line"><span style="color:#24292e;">set GOPRIVATE=</span></span>
<span class="line"><span style="color:#24292e;">set GOPROXY=https://proxy.golang.org,direct</span></span>
<span class="line"><span style="color:#24292e;">set GOROOT=C:\\Program Files\\Go</span></span>
<span class="line"><span style="color:#24292e;">set GOSUMDB=sum.golang.org</span></span>
<span class="line"><span style="color:#24292e;">set GOTMPDIR=</span></span>
<span class="line"><span style="color:#24292e;">set GOTOOLDIR=C:\\Program Files\\Go\\pkg\\tool\\windows_amd64</span></span>
<span class="line"><span style="color:#24292e;">set GOVCS=</span></span>
<span class="line"><span style="color:#24292e;">set GOVERSION=go1.17.13</span></span>
<span class="line"><span style="color:#24292e;">set GCCGO=gccgo</span></span>
<span class="line"><span style="color:#24292e;">set AR=ar</span></span>
<span class="line"><span style="color:#24292e;">set CC=gcc</span></span>
<span class="line"><span style="color:#24292e;">set CXX=g++</span></span>
<span class="line"><span style="color:#24292e;">set CGO_ENABLED=1</span></span>
<span class="line"><span style="color:#24292e;">set GOMOD=NUL</span></span>
<span class="line"><span style="color:#24292e;">set CGO_CFLAGS=-g -O2</span></span>
<span class="line"><span style="color:#24292e;">set CGO_CPPFLAGS=</span></span>
<span class="line"><span style="color:#24292e;">set CGO_CXXFLAGS=-g -O2</span></span>
<span class="line"><span style="color:#24292e;">set CGO_FFLAGS=-g -O2</span></span>
<span class="line"><span style="color:#24292e;">set CGO_LDFLAGS=-g -O2</span></span>
<span class="line"><span style="color:#24292e;">set PKG_CONFIG=pkg-config</span></span>
<span class="line"><span style="color:#24292e;">set GOGCCFLAGS=-m64 -mthreads -fno-caret-diagnostics -Qunused-arguments -fmessagld -gno-record-gcc-switches</span></span></code></pre></div><h3 id="配置win下环境变量" tabindex="-1">配置win下环境变量 <a class="header-anchor" href="#配置win下环境变量" aria-label="Permalink to &quot;配置win下环境变量&quot;">​</a></h3><p>电脑---》属性----》高级系统设置----》环境变量设置----》系统环境变量-----》PATH--》新建---》粘贴go bin 路径--》确定</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407202218689.png" alt="image-20240720221753779"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407202221334.png" alt="image-20240720222012159"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">在任何目录执行go 命令</span></span>
<span class="line"><span style="color:#e1e4e8;">go version</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">在任何目录执行go 命令</span></span>
<span class="line"><span style="color:#24292e;">go version</span></span></code></pre></div><h3 id="配置go环境变量" tabindex="-1">配置go环境变量 <a class="header-anchor" href="#配置go环境变量" aria-label="Permalink to &quot;配置go环境变量&quot;">​</a></h3><table><thead><tr><th>名字</th><th>说明</th></tr></thead><tbody><tr><td>GOROOT</td><td><strong>目录</strong>指的是go环境的安装目录，go的编译器、标准库等都存放在这个目录下</td></tr><tr><td>GOPATH</td><td>指的是项目的开发目录,存在三个目录结构,分别是src、pkg、bin目录 bin:编译文件目录(第三方编译出的可执行文件都在这个目录下)、pkg第三方包目、src:项目源文件目录，<code>高版本不在使用这个</code></td></tr></tbody></table><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$go env</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">//go111</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">是从1.11版本之后开始支持</span></span>
<span class="line"><span style="color:#B392F0;">//开启mod模式（项目管理需要用到）</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">env</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-w</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">GO111MODULE=on</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">//重新设置成七牛镜像源（用原有的会比较慢）</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">env</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-w</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">GOPROXY=https://goproxy.cn,direct</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">//关闭包的MD5校验</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">env</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-w</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">GOSUMDB=off</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$go env</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">//go111</span><span style="color:#24292E;"> </span><span style="color:#032F62;">是从1.11版本之后开始支持</span></span>
<span class="line"><span style="color:#6F42C1;">//开启mod模式（项目管理需要用到）</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">go</span><span style="color:#24292E;"> </span><span style="color:#032F62;">env</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-w</span><span style="color:#24292E;"> </span><span style="color:#032F62;">GO111MODULE=on</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">//重新设置成七牛镜像源（用原有的会比较慢）</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">go</span><span style="color:#24292E;"> </span><span style="color:#032F62;">env</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-w</span><span style="color:#24292E;"> </span><span style="color:#032F62;">GOPROXY=https://goproxy.cn,direct</span><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">//关闭包的MD5校验</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">go</span><span style="color:#24292E;"> </span><span style="color:#032F62;">env</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-w</span><span style="color:#24292E;"> </span><span style="color:#032F62;">GOSUMDB=off</span></span></code></pre></div><h3 id="配置git" tabindex="-1">配置git <a class="header-anchor" href="#配置git" aria-label="Permalink to &quot;配置git&quot;">​</a></h3><p><a href="https://www.git-scm.com/download/" target="_blank" rel="noreferrer">https://www.git-scm.com/download/</a></p><p>安装一路默认</p><p>环境变量参考go</p><h2 id="_1-2linux" tabindex="-1">1.2Linux <a class="header-anchor" href="#_1-2linux" aria-label="Permalink to &quot;1.2Linux&quot;">​</a></h2><p>解压、下载省略</p><h3 id="配置环境变量" tabindex="-1">配置环境变量 <a class="header-anchor" href="#配置环境变量" aria-label="Permalink to &quot;配置环境变量&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/profile</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> GOROOT</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/usr/local/go</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> GOPATH</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">$HOME</span><span style="color:#9ECBFF;">/GolangProjects</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> GOPROXY</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">https://goproxy.cn,direct</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> GO111MODULE</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">on</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> PATH</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">$PATH</span><span style="color:#9ECBFF;">:</span><span style="color:#E1E4E8;">$GOROOT</span><span style="color:#9ECBFF;">/bin:</span><span style="color:#E1E4E8;">$GOPATH</span><span style="color:#9ECBFF;">/bin</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#刷新生效</span></span>
<span class="line"><span style="color:#79B8FF;">source</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/profile</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看版本</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">version</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/profile</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> GOROOT</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/usr/local/go</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> GOPATH</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">$HOME</span><span style="color:#032F62;">/GolangProjects</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> GOPROXY</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">https://goproxy.cn,direct</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> GO111MODULE</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">on</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> PATH</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">$PATH</span><span style="color:#032F62;">:</span><span style="color:#24292E;">$GOROOT</span><span style="color:#032F62;">/bin:</span><span style="color:#24292E;">$GOPATH</span><span style="color:#032F62;">/bin</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#刷新生效</span></span>
<span class="line"><span style="color:#005CC5;">source</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/profile</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看版本</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">go</span><span style="color:#24292E;"> </span><span style="color:#032F62;">version</span></span></code></pre></div><h1 id="_2-go开发工具" tabindex="-1">2.GO开发工具 <a class="header-anchor" href="#_2-go开发工具" aria-label="Permalink to &quot;2.GO开发工具&quot;">​</a></h1><h2 id="_2-1vscode" tabindex="-1">2.1vscode <a class="header-anchor" href="#_2-1vscode" aria-label="Permalink to &quot;2.1vscode&quot;">​</a></h2><p>vscode，<a href="https://code.visualstudio.com" target="_blank" rel="noreferrer">https://code.visualstudio.com</a></p><p>插件参考，<a href="https://marketplace.visualstudio.com/items?itemName=golang.go" target="_blank" rel="noreferrer">https://marketplace.visualstudio.com/items?itemName=golang.go</a></p><ul><li>安装go插件</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311171400213.jpg" alt=""></p><ul><li><h3 id="安装go插件所依赖" tabindex="-1">安装Go插件所依赖 <a class="header-anchor" href="#安装go插件所依赖" aria-label="Permalink to &quot;安装Go插件所依赖&quot;">​</a></h3></li></ul><p>go tools，上面的go插件会提示你安装它的一些依赖及工具</p><ul><li>如果没有提示，可以点击右下角 Analysis Tools Missing。最后点击 Install 安装。</li><li>或者按ctrl+shift+p 调出命令面板，输入go install tools</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311171400687.jpg" alt=""></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#手动安装</span></span>
<span class="line"><span style="color:#B392F0;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">golang.org/x/tools/gopls@v0.15.3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#安装最新</span></span>
<span class="line"><span style="color:#B392F0;">go</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">golang.org/x/tools/gopls@latest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#手动安装</span></span>
<span class="line"><span style="color:#6F42C1;">go</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">golang.org/x/tools/gopls@v0.15.3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#安装最新</span></span>
<span class="line"><span style="color:#6F42C1;">go</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">golang.org/x/tools/gopls@latest</span></span></code></pre></div><ul><li>安装code runner，运行脚本</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311171400623.jpg" alt=""></p><h3 id="_2-1-1配置setting" tabindex="-1">2.1.1配置setting <a class="header-anchor" href="#_2-1-1配置setting" aria-label="Permalink to &quot;2.1.1配置setting&quot;">​</a></h3><ul><li>自动完成未导入的包</li></ul><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;go.autocompleteUnimportedPackages&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;go.autocompleteUnimportedPackages&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span></code></pre></div><ul><li>显示包代码提示</li></ul><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;go.inferGopath&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;go.inferGopath&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span></code></pre></div><ul><li>设置引用子级包下的函数跳转，如&quot;gonote/util&quot; 的util内的函数，</li></ul><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;go.docsTool&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;gogetdoc&quot;</span><span style="color:#E1E4E8;">,</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;go.docsTool&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;gogetdoc&quot;</span><span style="color:#24292E;">,</span></span></code></pre></div><blockquote><p>修改 &quot;go.docsTool&quot; 为 gogetdoc，默认是 godoc</p></blockquote><h3 id="_2-1-2推荐设置" tabindex="-1">2.1.2推荐设置 <a class="header-anchor" href="#_2-1-2推荐设置" aria-label="Permalink to &quot;2.1.2推荐设置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">    &quot;go.goroot&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;go.gopath&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;go.inferGopath&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;go.autocompleteUnimportedPackages&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;go.gocodePackageLookupMode&quot;: &quot;go&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;go.gotoSymbol.includeImports&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;go.useCodeSnippetsOnFunctionSuggest&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;go.useCodeSnippetsOnFunctionSuggestWithoutType&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;go.docsTool&quot;: &quot;gogetdoc&quot;,</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">    &quot;go.goroot&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;go.gopath&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;go.inferGopath&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;go.autocompleteUnimportedPackages&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;go.gocodePackageLookupMode&quot;: &quot;go&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;go.gotoSymbol.includeImports&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;go.useCodeSnippetsOnFunctionSuggest&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;go.useCodeSnippetsOnFunctionSuggestWithoutType&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;go.docsTool&quot;: &quot;gogetdoc&quot;,</span></span></code></pre></div><h3 id="_2-1-3快捷键位置" tabindex="-1">2.1.3快捷键位置 <a class="header-anchor" href="#_2-1-3快捷键位置" aria-label="Permalink to &quot;2.1.3快捷键位置&quot;">​</a></h3><p>File-》Preferences-》Keyboard shaortcuts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">行注释，ctrl + /</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">块注释，shift+alt+a （可以修改成，ctrl+shift+/）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">行删除，ctrl+shift+k</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">查找文件，ctrl + e</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">打开设置命令行， ctrl + shift + p</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">行注释，ctrl + /</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">块注释，shift+alt+a （可以修改成，ctrl+shift+/）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">行删除，ctrl+shift+k</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">查找文件，ctrl + e</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">打开设置命令行， ctrl + shift + p</span></span></code></pre></div><h3 id="_2-1-4快速生成代码片段" tabindex="-1">2.1.4快速生成代码片段 <a class="header-anchor" href="#_2-1-4快速生成代码片段" aria-label="Permalink to &quot;2.1.4快速生成代码片段&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pkgm   main包+main主函数</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ff  fmt.Printf(&quot;&quot;,var)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">for for i :=0; i &lt; count; i++ {}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">forr for _, v := range v {}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">fmain func main() {}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">a.print! fmt.Printf(&quot;a: %v\\n&quot;,a)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pkgm   main包+main主函数</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ff  fmt.Printf(&quot;&quot;,var)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">for for i :=0; i &lt; count; i++ {}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">forr for _, v := range v {}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">fmain func main() {}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">a.print! fmt.Printf(&quot;a: %v\\n&quot;,a)</span></span></code></pre></div><h2 id="_2-2goland" tabindex="-1">2.2goland <a class="header-anchor" href="#_2-2goland" aria-label="Permalink to &quot;2.2goland&quot;">​</a></h2><p>下载地址，<a href="https://www.jetbrains.com.cn/go/download/" target="_blank" rel="noreferrer">https://www.jetbrains.com.cn/go/download/</a></p><p>打开Goland的设置，GoLand | Preferences | Plugins，搜索所需要的插件安装即可</p><ul><li>常用插件</li></ul><h3 id="rainbow-brackets" tabindex="-1">Rainbow Brackets <a class="header-anchor" href="#rainbow-brackets" aria-label="Permalink to &quot;Rainbow Brackets&quot;">​</a></h3><p>括号加上颜色</p><h3 id="goanno" tabindex="-1">Goanno <a class="header-anchor" href="#goanno" aria-label="Permalink to &quot;Goanno&quot;">​</a></h3><p>功能： 1.普通函数 2.接口中的函数 3.支持自定义模版</p><h3 id="filewatchers" tabindex="-1">FileWatchers <a class="header-anchor" href="#filewatchers" aria-label="Permalink to &quot;FileWatchers&quot;">​</a></h3><p>Goland可以在文件监听中集成常见的Go代码检查工具，如go fmt，goimports，golangci-lint，按提示安装这几个工具，并设置使用范围为Global，在文件发生变更的时候会自动触发这些工具，并给出代码检查结果提示</p><h3 id="gittoolbox" tabindex="-1">GitToolBox <a class="header-anchor" href="#gittoolbox" aria-label="Permalink to &quot;GitToolBox&quot;">​</a></h3><p>该插件在当前代码编辑页面显示当前代码提交的用户名、时间、以及备注信息</p><h3 id="protocol-buffers" tabindex="-1">Protocol Buffers <a class="header-anchor" href="#protocol-buffers" aria-label="Permalink to &quot;Protocol Buffers&quot;">​</a></h3><p>该插件可以渲染proto文件，高亮proto语法，并且可以链接proto文件互相引用</p><h3 id="csv" tabindex="-1">csv <a class="header-anchor" href="#csv" aria-label="Permalink to &quot;csv&quot;">​</a></h3><p>CSV 是常用的文件扩展名。这不是一个很好的文件扩展名，但有时你以 CSV 格式获取数据，需要对其进行处理。CSV 插件可让你做到这一点</p><h3 id="git-commit-template" tabindex="-1">git commit template <a class="header-anchor" href="#git-commit-template" aria-label="Permalink to &quot;git commit template&quot;">​</a></h3><h3 id="material" tabindex="-1">Material <a class="header-anchor" href="#material" aria-label="Permalink to &quot;Material&quot;">​</a></h3><p>主题</p><p>Goland ---&gt; File ---&gt; Editor ---&gt; Color Scheme ---&gt; General</p><h3 id="codeglance-pro" tabindex="-1">CodeGlance pro <a class="header-anchor" href="#codeglance-pro" aria-label="Permalink to &quot;CodeGlance pro&quot;">​</a></h3><p>旁边浏览框</p><h3 id="设置package模板" tabindex="-1">设置package模板 <a class="header-anchor" href="#设置package模板" aria-label="Permalink to &quot;设置package模板&quot;">​</a></h3><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311171401352.jpg" alt=""></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">  @author: \${USER}</span></span>
<span class="line"><span style="color:#6A737D;">  @since: \${DATE}</span></span>
<span class="line"><span style="color:#6A737D;">  @desc: //TODO</span></span>
<span class="line"><span style="color:#6A737D;">**/</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> \${GO_PACKAGE_NAME}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">  @author: \${USER}</span></span>
<span class="line"><span style="color:#6A737D;">  @since: \${DATE}</span></span>
<span class="line"><span style="color:#6A737D;">  @desc: //TODO</span></span>
<span class="line"><span style="color:#6A737D;">**/</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> \${GO_PACKAGE_NAME}</span></span></code></pre></div><h3 id="go-fmt" tabindex="-1">go fmt <a class="header-anchor" href="#go-fmt" aria-label="Permalink to &quot;go fmt&quot;">​</a></h3><p>自动格式化代码</p><h2 id="_2-3快捷键" tabindex="-1">2.3快捷键 <a class="header-anchor" href="#_2-3快捷键" aria-label="Permalink to &quot;2.3快捷键&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">删除行： ctrl + L</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">重新格式化代码 ctrl + K</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">开始新行  ctrl +enter</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">删除行： ctrl + L</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">重新格式化代码 ctrl + K</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">开始新行  ctrl +enter</span></span></code></pre></div><h1 id="_3-go常用命令" tabindex="-1">3.GO常用命令 <a class="header-anchor" href="#_3-go常用命令" aria-label="Permalink to &quot;3.GO常用命令&quot;">​</a></h1><p>在终端输入<code>go help</code> 即可显示所有的go命令</p><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>build</td><td>编译包和依赖</td></tr><tr><td>clean</td><td>移除对象文件，go clean</td></tr><tr><td>doc</td><td>显示包或者符号的文档</td></tr><tr><td>env</td><td>打印go 环境信息</td></tr><tr><td>bug</td><td>启动错误报告</td></tr><tr><td>fix</td><td>运行go tool fix</td></tr><tr><td>fmt</td><td>运行go fmt 进行格式化</td></tr><tr><td>generate</td><td>从processing source 生成go文件</td></tr><tr><td>run</td><td>运行go文件，go run main.go</td></tr><tr><td>get</td><td>下载并安装包和依赖，<a href="https://pkg.go.dev/" target="_blank" rel="noreferrer">https://pkg.go.dev/</a></td></tr><tr><td>install</td><td>编译并安装包和依赖</td></tr><tr><td>list</td><td>列出包</td></tr><tr><td>run</td><td>运行测试</td></tr><tr><td>tool</td><td>运行go 提供的工具</td></tr><tr><td>version</td><td>显示go版本</td></tr><tr><td>mod</td><td>初始化项目，进行可以get下载，go mod init go_pro，goland自动生成</td></tr></tbody></table><p>参考文档，<a href="https://go.dev/doc/cmd" target="_blank" rel="noreferrer">https://go.dev/doc/cmd</a></p><h1 id="_4-调试工具" tabindex="-1">4.调试工具 <a class="header-anchor" href="#_4-调试工具" aria-label="Permalink to &quot;4.调试工具&quot;">​</a></h1><p><a href="https://github.com/bloomrpc/bloomrpc/" target="_blank" rel="noreferrer">https://github.com/bloomrpc/bloomrpc/</a></p>`,93),p=[o];function t(c,r,i,d,g,y){return a(),n("div",null,p)}const E=s(l,[["render",t]]);export{u as __pageData,E as default};
