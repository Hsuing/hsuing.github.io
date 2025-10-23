import{_ as s,o as a,c as n,R as p}from"./chunks/framework.zUbWieqp.js";const C=JSON.parse('{"title":"1. Dockerfile文件","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/dockerfile/4-jdk.md","filePath":"guide/container/dockerfile/4-jdk.md","lastUpdated":1733739638000}'),l={name:"guide/container/dockerfile/4-jdk.md"},o=p(`<h1 id="_1-dockerfile文件" tabindex="-1">1. Dockerfile文件 <a class="header-anchor" href="#_1-dockerfile文件" aria-label="Permalink to &quot;1. Dockerfile文件&quot;">​</a></h1><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> alpine:3.17</span></span>
<span class="line"><span style="color:#F97583;">CMD</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&quot;/bin/sh&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#F97583;">MAINTAINER</span><span style="color:#E1E4E8;"> GLJ</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> TIME_ZONE=</span><span style="color:#9ECBFF;">&quot;Asia/Shanghai&quot;</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> ALPINE_GLIBC_PACKAGE_VERSION=</span><span style="color:#9ECBFF;">&quot;2.34-r0&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Install glibc</span></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> locale.md glibc-$ALPINE_GLIBC_PACKAGE_VERSION.apk glibc-bin-$ALPINE_GLIBC_PACKAGE_VERSION.apk glibc-i18n-$ALPINE_GLIBC_PACKAGE_VERSION.apk ./</span></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> sgerrand.rsa.pub /etc/apk/keys/sgerrand.rsa.pub</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> sed -i </span><span style="color:#9ECBFF;">&#39;s/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g&#39;</span><span style="color:#E1E4E8;"> /etc/apk/repositories \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; apk add --no-cache ca-certificates libstdc++ fontconfig tzdata \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; apk add --update ttf-dejavu \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; fc-cache --force \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; cp /usr/share/zoneinfo/$TIME_ZONE /etc/localtime \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; echo $TIME_ZONE &gt; /etc/timezone \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; apk del tzdata \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; mv /etc/nsswitch.conf /etc/nsswitch.conf.bak \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; apk add --no-cache --force-overwrite glibc-$ALPINE_GLIBC_PACKAGE_VERSION.apk glibc-bin-$ALPINE_GLIBC_PACKAGE_VERSION.apk glibc-i18n-$ALPINE_GLIBC_PACKAGE_VERSION.apk \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; mv /etc/nsswitch.conf.bak /etc/nsswitch.conf \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; cat locale.md | tr -d </span><span style="color:#9ECBFF;">&#39;</span><span style="color:#79B8FF;">\\r</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;"> | xargs -i /usr/glibc-compat/bin/localedef -i {} -f UTF-8 {}.UTF-8 \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; rm -f glibc-$ALPINE_GLIBC_PACKAGE_VERSION.apk glibc-bin-$ALPINE_GLIBC_PACKAGE_VERSION.apk glibc-i18n-$ALPINE_GLIBC_PACKAGE_VERSION.apk locale.md \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; rm -rf /var/cache/apk/* \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; addgroup -g 2888 apps \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; adduser -u 2888 -G apps -h /home/apps -D apps</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Support Chinese</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> LANG=zh_CN.UTF-8</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> LANGUAGE=zh_CN.UTF-8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Install JDK1.8</span></span>
<span class="line"><span style="color:#F97583;">ADD</span><span style="color:#E1E4E8;"> jdk-8u341-linux-x64.tar.gz /usr/local/jdk</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> JAVA_HOME=/usr/local/jdk/jdk1.8.0_341</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> JRE_HOME=$JAVA_HOME/jre</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> PATH=$JAVA_HOME/bin:$PATH</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> alpine:3.17</span></span>
<span class="line"><span style="color:#D73A49;">CMD</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;/bin/sh&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#D73A49;">MAINTAINER</span><span style="color:#24292E;"> GLJ</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> TIME_ZONE=</span><span style="color:#032F62;">&quot;Asia/Shanghai&quot;</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> ALPINE_GLIBC_PACKAGE_VERSION=</span><span style="color:#032F62;">&quot;2.34-r0&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Install glibc</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> locale.md glibc-$ALPINE_GLIBC_PACKAGE_VERSION.apk glibc-bin-$ALPINE_GLIBC_PACKAGE_VERSION.apk glibc-i18n-$ALPINE_GLIBC_PACKAGE_VERSION.apk ./</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> sgerrand.rsa.pub /etc/apk/keys/sgerrand.rsa.pub</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> sed -i </span><span style="color:#032F62;">&#39;s/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g&#39;</span><span style="color:#24292E;"> /etc/apk/repositories \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; apk add --no-cache ca-certificates libstdc++ fontconfig tzdata \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; apk add --update ttf-dejavu \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; fc-cache --force \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; cp /usr/share/zoneinfo/$TIME_ZONE /etc/localtime \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; echo $TIME_ZONE &gt; /etc/timezone \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; apk del tzdata \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; mv /etc/nsswitch.conf /etc/nsswitch.conf.bak \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; apk add --no-cache --force-overwrite glibc-$ALPINE_GLIBC_PACKAGE_VERSION.apk glibc-bin-$ALPINE_GLIBC_PACKAGE_VERSION.apk glibc-i18n-$ALPINE_GLIBC_PACKAGE_VERSION.apk \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; mv /etc/nsswitch.conf.bak /etc/nsswitch.conf \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; cat locale.md | tr -d </span><span style="color:#032F62;">&#39;</span><span style="color:#005CC5;">\\r</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;"> | xargs -i /usr/glibc-compat/bin/localedef -i {} -f UTF-8 {}.UTF-8 \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; rm -f glibc-$ALPINE_GLIBC_PACKAGE_VERSION.apk glibc-bin-$ALPINE_GLIBC_PACKAGE_VERSION.apk glibc-i18n-$ALPINE_GLIBC_PACKAGE_VERSION.apk locale.md \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; rm -rf /var/cache/apk/* \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; addgroup -g 2888 apps \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; adduser -u 2888 -G apps -h /home/apps -D apps</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Support Chinese</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> LANG=zh_CN.UTF-8</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> LANGUAGE=zh_CN.UTF-8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Install JDK1.8</span></span>
<span class="line"><span style="color:#D73A49;">ADD</span><span style="color:#24292E;"> jdk-8u341-linux-x64.tar.gz /usr/local/jdk</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> JAVA_HOME=/usr/local/jdk/jdk1.8.0_341</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> JRE_HOME=$JAVA_HOME/jre</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> PATH=$JAVA_HOME/bin:$PATH</span></span></code></pre></div><ul><li>构建镜像</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-t</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">base-jdk8:v1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-t</span><span style="color:#24292E;"> </span><span style="color:#032F62;">base-jdk8:v1</span></span></code></pre></div><h1 id="_2-第二种方式" tabindex="-1">2. 第二种方式 <a class="header-anchor" href="#_2-第二种方式" aria-label="Permalink to &quot;2. 第二种方式&quot;">​</a></h1><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 基于alpine-glibc:alpine-3.17_glibc-2.34构建</span></span>
<span class="line"><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> frolvlad/alpine-glibc:alpine-3.17_glibc-2.34</span></span>
<span class="line"><span style="color:#F97583;">MAINTAINER</span><span style="color:#E1E4E8;"> GLJ</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Install JDK1.8</span></span>
<span class="line"><span style="color:#F97583;">ADD</span><span style="color:#E1E4E8;"> jdk-8u341-linux-x64.tar.gz /usr/local/jdk</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> JAVA_HOME=/usr/local/jdk/jdk1.8.0_341</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> JRE_HOME \${JAVA_HOME}/jre</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> CLASSPATH .:\${JAVA_HOME}/lib:\${JRE_HOME}/lib</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> PATH=$JAVA_HOME/bin:$PATH</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> TIME_ZONE=</span><span style="color:#9ECBFF;">&quot;Asia/Shanghai&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 安装 JRE</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> sed -i </span><span style="color:#9ECBFF;">&#39;s/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g&#39;</span><span style="color:#E1E4E8;"> /etc/apk/repositories \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; apk add --no-cache libstdc++ fontconfig tzdata \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; apk add --update ttf-dejavu \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; fc-cache --force \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; cp /usr/share/zoneinfo/$TIME_ZONE /etc/localtime \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; echo $TIME_ZONE &gt; /etc/timezone \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; apk del tzdata \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; rm -rf /var/cache/apk/* \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; addgroup -g 2888 apps \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; adduser -u 2888 -G apps -h /home/apps -D apps</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 基于alpine-glibc:alpine-3.17_glibc-2.34构建</span></span>
<span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> frolvlad/alpine-glibc:alpine-3.17_glibc-2.34</span></span>
<span class="line"><span style="color:#D73A49;">MAINTAINER</span><span style="color:#24292E;"> GLJ</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Install JDK1.8</span></span>
<span class="line"><span style="color:#D73A49;">ADD</span><span style="color:#24292E;"> jdk-8u341-linux-x64.tar.gz /usr/local/jdk</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> JAVA_HOME=/usr/local/jdk/jdk1.8.0_341</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> JRE_HOME \${JAVA_HOME}/jre</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> CLASSPATH .:\${JAVA_HOME}/lib:\${JRE_HOME}/lib</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> PATH=$JAVA_HOME/bin:$PATH</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> TIME_ZONE=</span><span style="color:#032F62;">&quot;Asia/Shanghai&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 安装 JRE</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> sed -i </span><span style="color:#032F62;">&#39;s/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g&#39;</span><span style="color:#24292E;"> /etc/apk/repositories \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; apk add --no-cache libstdc++ fontconfig tzdata \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; apk add --update ttf-dejavu \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; fc-cache --force \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; cp /usr/share/zoneinfo/$TIME_ZONE /etc/localtime \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; echo $TIME_ZONE &gt; /etc/timezone \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; apk del tzdata \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; rm -rf /var/cache/apk/* \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; addgroup -g 2888 apps \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; adduser -u 2888 -G apps -h /home/apps -D apps</span></span></code></pre></div><h1 id="_3-镜像漏扫验证" tabindex="-1">3. 镜像漏扫验证 <a class="header-anchor" href="#_3-镜像漏扫验证" aria-label="Permalink to &quot;3. 镜像漏扫验证&quot;">​</a></h1><p>使用第三方，一定的进行镜像扫描</p><h1 id="_4-java案例" tabindex="-1">4. java案例 <a class="header-anchor" href="#_4-java案例" aria-label="Permalink to &quot;4. java案例&quot;">​</a></h1><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> base-jdk8:v1</span></span>
<span class="line"><span style="color:#F97583;">USER</span><span style="color:#E1E4E8;"> gzapps</span></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> --chown=apps:apps app.jar /home/apps/app.jar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># env for application</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> PORT=</span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> JAVA_OPTS=</span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> AGENT_ARGS=</span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">EXPOSE</span><span style="color:#E1E4E8;"> $PORT</span></span>
<span class="line"><span style="color:#F97583;">WORKDIR</span><span style="color:#E1E4E8;"> /home/gzapps</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">ENTRYPOINT</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&quot;/bin/bash&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;-c&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;java \${AGENT_ARGS} \${JAVA_OPTS} -jar app.jar&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#6A737D;">#ENTRYPOINT exec java -Djava.security.egd=file:/dev/./urandom -jar -Xms512m -Xmx512m -Xmn200M app.jar &gt; app.jar.log</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> base-jdk8:v1</span></span>
<span class="line"><span style="color:#D73A49;">USER</span><span style="color:#24292E;"> gzapps</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> --chown=apps:apps app.jar /home/apps/app.jar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># env for application</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> PORT=</span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> JAVA_OPTS=</span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> AGENT_ARGS=</span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">EXPOSE</span><span style="color:#24292E;"> $PORT</span></span>
<span class="line"><span style="color:#D73A49;">WORKDIR</span><span style="color:#24292E;"> /home/gzapps</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">ENTRYPOINT</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;/bin/bash&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;-c&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;java \${AGENT_ARGS} \${JAVA_OPTS} -jar app.jar&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#6A737D;">#ENTRYPOINT exec java -Djava.security.egd=file:/dev/./urandom -jar -Xms512m -Xmx512m -Xmn200M app.jar &gt; app.jar.log</span></span></code></pre></div><hr><h1 id="_5-使用jlink构建自定义-jre-镜像" tabindex="-1">5. 使用jlink构建自定义 JRE 镜像 <a class="header-anchor" href="#_5-使用jlink构建自定义-jre-镜像" aria-label="Permalink to &quot;5. 使用jlink构建自定义 JRE 镜像&quot;">​</a></h1><p>以用来打包Java应用的基础镜像有几种，包括：</p><ul><li>JDK Alpine基础镜像：这些镜像体积较小，但不适合所有应用，因此可能会面临一些库的兼容性问题。</li><li>JDK Slim基础镜像：这些镜像基于Debian或Ubuntu，相较于完整的JDK镜像来说体积较小，但仍然比较大。</li><li>JDK完整基础镜像：这些镜像体积较大，包含运行应用所需的所有模块和依赖项。</li></ul><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>不能使用JRE镜像而使用JDK镜像,从Java 11开始，JRE不再可用</p></div><p>为了对比大小，我们采用openjdk:17-jdk-slim，eclipse-temurin:17-jdk-alpine</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">FROM openjdk:17-jdk-slim</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置容器中的工作目录</span></span>
<span class="line"><span style="color:#9ECBFF;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建用户</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN addgroup --system spring &amp;&amp; adduser --system spring --ingroup spring</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 切换到用户</span></span>
<span class="line"><span style="color:#9ECBFF;">USER spring:spring</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">COPY target/*.jar app.jar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">EXPOSE 8080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">CMD [&quot;java&quot;, &quot;-jar&quot;, &quot;app.jar&quot;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">FROM openjdk:17-jdk-slim</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置容器中的工作目录</span></span>
<span class="line"><span style="color:#032F62;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建用户</span></span>
<span class="line"><span style="color:#032F62;">RUN addgroup --system spring &amp;&amp; adduser --system spring --ingroup spring</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 切换到用户</span></span>
<span class="line"><span style="color:#032F62;">USER spring:spring</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">COPY target/*.jar app.jar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">EXPOSE 8080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">CMD [&quot;java&quot;, &quot;-jar&quot;, &quot;app.jar&quot;]</span></span></code></pre></div><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">FROM eclipse-temurin:17-jdk-alpine</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">ARG APPLICATION_USER=spring</span></span>
<span class="line"><span style="color:#6A737D;"># 创建一个用户来运行应用，不以root用户运行</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN addgroup --system $APPLICATION_USER &amp;&amp; adduser --system $APPLICATION_USER --ingroup $APPLICATION_USER</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建应用目录</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN mkdir /app &amp;&amp; chown -R $APPLICATION_USER /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置运行应用的用户</span></span>
<span class="line"><span style="color:#9ECBFF;">USER $APPLICATION_USER</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将jar文件复制到容器中</span></span>
<span class="line"><span style="color:#9ECBFF;">COPY --chown=$APPLICATION_USER:$APPLICATION_USER target/*.jar /app/app.jar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置工作目录</span></span>
<span class="line"><span style="color:#9ECBFF;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 暴露端口</span></span>
<span class="line"><span style="color:#9ECBFF;">EXPOSE 8080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 运行应用</span></span>
<span class="line"><span style="color:#9ECBFF;">ENTRYPOINT [&quot;java&quot;, &quot;-jar&quot;, &quot;/app/app.jar&quot;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">FROM eclipse-temurin:17-jdk-alpine</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">ARG APPLICATION_USER=spring</span></span>
<span class="line"><span style="color:#6A737D;"># 创建一个用户来运行应用，不以root用户运行</span></span>
<span class="line"><span style="color:#032F62;">RUN addgroup --system $APPLICATION_USER &amp;&amp; adduser --system $APPLICATION_USER --ingroup $APPLICATION_USER</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建应用目录</span></span>
<span class="line"><span style="color:#032F62;">RUN mkdir /app &amp;&amp; chown -R $APPLICATION_USER /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置运行应用的用户</span></span>
<span class="line"><span style="color:#032F62;">USER $APPLICATION_USER</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将jar文件复制到容器中</span></span>
<span class="line"><span style="color:#032F62;">COPY --chown=$APPLICATION_USER:$APPLICATION_USER target/*.jar /app/app.jar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置工作目录</span></span>
<span class="line"><span style="color:#032F62;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 暴露端口</span></span>
<span class="line"><span style="color:#032F62;">EXPOSE 8080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 运行应用</span></span>
<span class="line"><span style="color:#032F62;">ENTRYPOINT [&quot;java&quot;, &quot;-jar&quot;, &quot;/app/app.jar&quot;]</span></span></code></pre></div><ul><li>完整案例</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 第一阶段，构建自定义 JRE</span></span>
<span class="line"><span style="color:#9ECBFF;">FROM eclipse-temurin:17-jdk-alpine AS jre-builder</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">RUN mkdir /opt/app</span></span>
<span class="line"><span style="color:#9ECBFF;">COPY . /opt/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">WORKDIR /opt/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">ENV MAVEN_VERSION 3.5.4</span></span>
<span class="line"><span style="color:#9ECBFF;">ENV MAVEN_HOME /usr/lib/mvn</span></span>
<span class="line"><span style="color:#9ECBFF;">ENV PATH $MAVEN_HOME/bin:$PATH</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">RUN apk update &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">apk add --no-cache tar binutils</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">RUN wget http://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">tar -zxvf apache-maven-$MAVEN_VERSION-bin.tar.gz &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">rm apache-maven-$MAVEN_VERSION-bin.tar.gz &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">mv apache-maven-$MAVEN_VERSION /usr/lib/mvn</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">RUN mvn package -DskipTests</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN jar xvf target/spring-error-handling-rfc-9457-0.0.1-SNAPSHOT.jar</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN jdeps --ignore-missing-deps -q  \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">--recursive  \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">--multi-release 17  \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">--print-module-deps  \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">--class-path &#39;BOOT-INF/lib/*&#39;  \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">target/spring-error-handling-rfc-9457-0.0.1-SNAPSHOT.jar &gt; modules.txt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 构建小型 JRE 镜像，--add-modules ALL-MODULE-PATH</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN $JAVA_HOME/bin/jlink \\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">--verbose \\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">--add-modules $(cat modules.txt) \\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">--strip-debug \\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">--no-man-pages \\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">--no-header-files \\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">--compress=2 \\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">--output /optimized-jdk-17</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 第二阶段，使用自定义 JRE 并构建应用镜像</span></span>
<span class="line"><span style="color:#9ECBFF;">FROM alpine:latest</span></span>
<span class="line"><span style="color:#9ECBFF;">ENV JAVA_HOME=/opt/jdk/jdk-17</span></span>
<span class="line"><span style="color:#9ECBFF;">ENV PATH=&quot;\${JAVA_HOME}/bin:\${PATH}&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 从基础镜像复制 JRE</span></span>
<span class="line"><span style="color:#9ECBFF;">COPY --from=jre-builder /optimized-jdk-17 $JAVA_HOME</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 添加应用用户</span></span>
<span class="line"><span style="color:#9ECBFF;">ARG APPLICATION_USER=spring</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建用户以运行应用程序，不以 root 身份运行</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN addgroup --system $APPLICATION_USER &amp;&amp;  adduser --system $APPLICATION_USER --ingroup $APPLICATION_USER</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建应用程序目录</span></span>
<span class="line"><span style="color:#9ECBFF;">RUN mkdir /app &amp;&amp; chown -R $APPLICATION_USER /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">COPY --chown=$APPLICATION_USER:$APPLICATION_USER target/*.jar /app/app.jar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">USER $APPLICATION_USER</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">EXPOSE 8080</span></span>
<span class="line"><span style="color:#9ECBFF;">ENTRYPOINT [ &quot;java&quot;, &quot;-jar&quot;, &quot;/app/app.jar&quot; ]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 第一阶段，构建自定义 JRE</span></span>
<span class="line"><span style="color:#032F62;">FROM eclipse-temurin:17-jdk-alpine AS jre-builder</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">RUN mkdir /opt/app</span></span>
<span class="line"><span style="color:#032F62;">COPY . /opt/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">WORKDIR /opt/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">ENV MAVEN_VERSION 3.5.4</span></span>
<span class="line"><span style="color:#032F62;">ENV MAVEN_HOME /usr/lib/mvn</span></span>
<span class="line"><span style="color:#032F62;">ENV PATH $MAVEN_HOME/bin:$PATH</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">RUN apk update &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">apk add --no-cache tar binutils</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">RUN wget http://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">tar -zxvf apache-maven-$MAVEN_VERSION-bin.tar.gz &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">rm apache-maven-$MAVEN_VERSION-bin.tar.gz &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">mv apache-maven-$MAVEN_VERSION /usr/lib/mvn</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">RUN mvn package -DskipTests</span></span>
<span class="line"><span style="color:#032F62;">RUN jar xvf target/spring-error-handling-rfc-9457-0.0.1-SNAPSHOT.jar</span></span>
<span class="line"><span style="color:#032F62;">RUN jdeps --ignore-missing-deps -q  \\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">--recursive  \\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">--multi-release 17  \\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">--print-module-deps  \\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">--class-path &#39;BOOT-INF/lib/*&#39;  \\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">target/spring-error-handling-rfc-9457-0.0.1-SNAPSHOT.jar &gt; modules.txt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 构建小型 JRE 镜像，--add-modules ALL-MODULE-PATH</span></span>
<span class="line"><span style="color:#032F62;">RUN $JAVA_HOME/bin/jlink \\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#032F62;">--verbose \\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#032F62;">--add-modules $(cat modules.txt) \\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#032F62;">--strip-debug \\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#032F62;">--no-man-pages \\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#032F62;">--no-header-files \\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#032F62;">--compress=2 \\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#032F62;">--output /optimized-jdk-17</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 第二阶段，使用自定义 JRE 并构建应用镜像</span></span>
<span class="line"><span style="color:#032F62;">FROM alpine:latest</span></span>
<span class="line"><span style="color:#032F62;">ENV JAVA_HOME=/opt/jdk/jdk-17</span></span>
<span class="line"><span style="color:#032F62;">ENV PATH=&quot;\${JAVA_HOME}/bin:\${PATH}&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 从基础镜像复制 JRE</span></span>
<span class="line"><span style="color:#032F62;">COPY --from=jre-builder /optimized-jdk-17 $JAVA_HOME</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 添加应用用户</span></span>
<span class="line"><span style="color:#032F62;">ARG APPLICATION_USER=spring</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建用户以运行应用程序，不以 root 身份运行</span></span>
<span class="line"><span style="color:#032F62;">RUN addgroup --system $APPLICATION_USER &amp;&amp;  adduser --system $APPLICATION_USER --ingroup $APPLICATION_USER</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建应用程序目录</span></span>
<span class="line"><span style="color:#032F62;">RUN mkdir /app &amp;&amp; chown -R $APPLICATION_USER /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">COPY --chown=$APPLICATION_USER:$APPLICATION_USER target/*.jar /app/app.jar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">WORKDIR /app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">USER $APPLICATION_USER</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">EXPOSE 8080</span></span>
<span class="line"><span style="color:#032F62;">ENTRYPOINT [ &quot;java&quot;, &quot;-jar&quot;, &quot;/app/app.jar&quot; ]</span></span></code></pre></div><h1 id="_6-cgroups-v1-和cgroups-v2" tabindex="-1">6. Cgroups v1 和Cgroups v2 <a class="header-anchor" href="#_6-cgroups-v1-和cgroups-v2" aria-label="Permalink to &quot;6. Cgroups v1 和Cgroups v2&quot;">​</a></h1><p>当你在物理机或者虚拟机上配置 JVM 参数时，JVM会默认使用主机上1/4的内存作为堆内存，你也可以选择使用-Xmx/-Xms 来指定 Java 堆内存大小。在容器化环境中，每个容器实例的内存大小由Cgroups配置决定，而低版本JVM对Cgroups的支持是不太友好的。</p><h2 id="_6-1-v1" tabindex="-1">6.1 v1 <a class="header-anchor" href="#_6-1-v1" aria-label="Permalink to &quot;6.1 v1&quot;">​</a></h2><p>JDK 1.8.0_131(包含)之前的版本，不指定参数情况下，无法识别Cgroups内存限制，使用主机1/4的内存作为最大堆内存</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">512</span><span style="color:#9ECBFF;">Mi</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">openjdk:8u121</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">java</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-XshowSettings:vm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-version</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">VM</span></span>
<span class="line"><span style="color:#B392F0;">VM</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">settings:</span><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#B392F0;">Max.</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Heap</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Size</span><span style="color:#E1E4E8;"> (Estimated): 1.56G    </span></span>
<span class="line"><span style="color:#B392F0;">Ergonomics</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Machine</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Class:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">server</span><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#B392F0;">Using</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">VM:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">OpenJDK</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">64</span><span style="color:#9ECBFF;">-Bit</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">VM</span></span>
<span class="line"><span style="color:#B392F0;">openjdk</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">version</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;1.8.0_121&quot;</span></span>
<span class="line"><span style="color:#B392F0;">OpenJDK</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Runtime</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Environment</span><span style="color:#E1E4E8;"> (build </span><span style="color:#79B8FF;">1.8</span><span style="color:#9ECBFF;">.0_121-8u121-b13-1~bpo8+1-b13</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#B392F0;">OpenJDK</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">64</span><span style="color:#9ECBFF;">-Bit</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">VM</span><span style="color:#E1E4E8;"> (build </span><span style="color:#79B8FF;">25.121</span><span style="color:#9ECBFF;">-b13,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mixed</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mode</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#指定xms</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">512</span><span style="color:#9ECBFF;">Mi</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">openjdk:8u121</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">java</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Xms512m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Xmx512m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XshowSettings:vm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-version</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">VM</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">512</span><span style="color:#032F62;">Mi</span><span style="color:#24292E;"> </span><span style="color:#032F62;">openjdk:8u121</span><span style="color:#24292E;"> </span><span style="color:#032F62;">java</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-XshowSettings:vm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-version</span><span style="color:#24292E;"> </span><span style="color:#032F62;">VM</span></span>
<span class="line"><span style="color:#6F42C1;">VM</span><span style="color:#24292E;"> </span><span style="color:#032F62;">settings:</span><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6F42C1;">Max.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Heap</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Size</span><span style="color:#24292E;"> (Estimated): 1.56G    </span></span>
<span class="line"><span style="color:#6F42C1;">Ergonomics</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Machine</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Class:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">server</span><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6F42C1;">Using</span><span style="color:#24292E;"> </span><span style="color:#032F62;">VM:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">OpenJDK</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">64</span><span style="color:#032F62;">-Bit</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">VM</span></span>
<span class="line"><span style="color:#6F42C1;">openjdk</span><span style="color:#24292E;"> </span><span style="color:#032F62;">version</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;1.8.0_121&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">OpenJDK</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Runtime</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Environment</span><span style="color:#24292E;"> (build </span><span style="color:#005CC5;">1.8</span><span style="color:#032F62;">.0_121-8u121-b13-1~bpo8+1-b13</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">OpenJDK</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">64</span><span style="color:#032F62;">-Bit</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">VM</span><span style="color:#24292E;"> (build </span><span style="color:#005CC5;">25.121</span><span style="color:#032F62;">-b13,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mixed</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mode</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#指定xms</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">512</span><span style="color:#032F62;">Mi</span><span style="color:#24292E;"> </span><span style="color:#032F62;">openjdk:8u121</span><span style="color:#24292E;"> </span><span style="color:#032F62;">java</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Xms512m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Xmx512m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XshowSettings:vm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-version</span><span style="color:#24292E;"> </span><span style="color:#032F62;">VM</span></span></code></pre></div><p>在jdk 1.8.0_131版本开始，加入了两个新参数<code>-XX:+UnlockExperimentalVMOptions</code>和<code>-XX:+UseCGroupMemoryLimitForHeap</code>来动态感知容器的Cgroups内存限制，最大堆内存为Cgroups内存限制的1/4</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">512</span><span style="color:#9ECBFF;">Mi</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">openjdk:8u131</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">java</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XX:+UnlockExperimentalVMOptions</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-XX:+UseCGroupMemoryLimitForHeap</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XshowSettings:vm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-version</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">VM</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">512</span><span style="color:#032F62;">Mi</span><span style="color:#24292E;"> </span><span style="color:#032F62;">openjdk:8u131</span><span style="color:#24292E;"> </span><span style="color:#032F62;">java</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XX:+UnlockExperimentalVMOptions</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-XX:+UseCGroupMemoryLimitForHeap</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XshowSettings:vm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-version</span><span style="color:#24292E;"> </span><span style="color:#032F62;">VM</span></span></code></pre></div><p>新参数<code>-XX:+UnlockExperimentalVMOptions</code>和<code>-XX:+UseCGroupMemoryLimitForHeap</code>虽然能动态感知Cgroups内存限制，但是却只能使用1/4，无法修改。此时可以使用另外两个参数<code>-XX:MaxRAMFraction</code>和<code>-XX:MinRAMFraction</code>，<strong>参数值必须为整数</strong>，取值参考如下表格：</p><table><thead><tr><th>MaxRAMFraction/MinRAMFraction值</th><th>Cgroups内存限制百分比</th></tr></thead><tbody><tr><td>1</td><td>90%</td></tr><tr><td>2</td><td>50%</td></tr><tr><td>3</td><td>33%</td></tr><tr><td>4</td><td>25%</td></tr></tbody></table><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">512</span><span style="color:#9ECBFF;">Mi</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">openjdk:8u131</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">java</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XX:+UnlockExperimentalVMOptions</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-XX:+UseCGroupMemoryLimitForHeap</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XX:MaxRAMFraction=2</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XshowSettings:vm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-version</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">VM</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">512</span><span style="color:#032F62;">Mi</span><span style="color:#24292E;"> </span><span style="color:#032F62;">openjdk:8u131</span><span style="color:#24292E;"> </span><span style="color:#032F62;">java</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XX:+UnlockExperimentalVMOptions</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-XX:+UseCGroupMemoryLimitForHeap</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XX:MaxRAMFraction=2</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XshowSettings:vm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-version</span><span style="color:#24292E;"> </span><span style="color:#032F62;">VM</span></span></code></pre></div><p>使用jdk 1.8.0_191版本镜像启动容器，不指定参数，jvm能动态感知Cgroups内存限制，最大堆内存为Cgroups内存限制的1/4</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">512</span><span style="color:#9ECBFF;">Mi</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">openjdk:8u191-alpine</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">java</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-XshowSettings:vm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-version</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">VM</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">512</span><span style="color:#032F62;">Mi</span><span style="color:#24292E;"> </span><span style="color:#032F62;">openjdk:8u191-alpine</span><span style="color:#24292E;"> </span><span style="color:#032F62;">java</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-XshowSettings:vm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-version</span><span style="color:#24292E;"> </span><span style="color:#032F62;">VM</span></span></code></pre></div><p>指定参数，使用<code>-Xms</code>和<code>-Xmx</code>指定初始堆内存和最大堆内存</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">512</span><span style="color:#9ECBFF;">Mi</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">openjdk:8u191-alpine</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">java</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Xms512m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Xmx512m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XshowSettings:vm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-version</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">VM</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">512</span><span style="color:#032F62;">Mi</span><span style="color:#24292E;"> </span><span style="color:#032F62;">openjdk:8u191-alpine</span><span style="color:#24292E;"> </span><span style="color:#032F62;">java</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Xms512m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Xmx512m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XshowSettings:vm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-version</span><span style="color:#24292E;"> </span><span style="color:#032F62;">VM</span></span></code></pre></div><p>jdk 1.8.0_191版本开始，<code>-XX:MaxRAMFraction</code>和<code>-XX:MinRAMFraction</code>被弃用，使用<code>MaxRAMPercentage</code>和<code>MinRAMPercentage</code>来修改堆内存在Cgroups内存限制的占比，<strong>参数值是Double类型必须带小数点</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">512</span><span style="color:#9ECBFF;">Mi</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">openjdk:8u191-alpine</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">java</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XX:MaxRAMPercentage=50.0</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XX:MinRAMPercentage=50.0</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XshowSettings:vm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-version</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">VM</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">512</span><span style="color:#032F62;">Mi</span><span style="color:#24292E;"> </span><span style="color:#032F62;">openjdk:8u191-alpine</span><span style="color:#24292E;"> </span><span style="color:#032F62;">java</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XX:MaxRAMPercentage=50.0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XX:MinRAMPercentage=50.0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XshowSettings:vm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-version</span><span style="color:#24292E;"> </span><span style="color:#032F62;">VM</span></span></code></pre></div><ul><li><p><code>Xms</code>和<code>Xmx</code>能适应所有JDK版本，但不能动态感知容器的Cgroups限制，且参数优先级最高，与其他参数一起配置时，其他参数不生效。</p></li><li><p><code>-XX:+UnlockExperimentalVMOptions</code>和<code>-XX:+UseCGroupMemoryLimitForHeap</code>在1.8.0_131版本开始启用，能动态感知容器的Cgroups限制，但最大堆内存只能使用容器Cgroups内存限制的1/4。</p></li><li><p><code>-XX:MaxRAMFraction</code>和<code>-XX:MinRAMFraction</code>在1.8.0_131版本开始启用，可以修改堆内存占容器Cgroups内存限制的百分比，但百分比的值不能自由指定(比如不能指定40%)，在1.8.0_191版本开始弃用。</p></li><li><p><code>MaxRAMPercentage</code>和<code>MinRAMPercentage</code>在1.8.0_191版本开始启用，可以自定义修改堆内存占容器Cgroups内存限制的百分比。</p></li></ul><h2 id="_6-2-v2" tabindex="-1">6.2 v2 <a class="header-anchor" href="#_6-2-v2" aria-label="Permalink to &quot;6.2 v2&quot;">​</a></h2><p>jdk需要1.8.0_372、11.0.16及更高版本才能动态感知Cgroups的内存限制</p><p>总结：</p><p>1.使用容器感知的 JDK 版本。对于使用 Cgroup V1 的集群，需要升级至 1.8.0_191以及更高版本；对于使用 Cgroup V2 的集群，需要升级至 1.8.0_372、11.0.16及更高版本。</p><p>2.由于Java应用使用的总内存不仅仅只有堆内存，还有堆外内存和直接内存。所以设置容器内存上限时必须大于堆内存，应该按照 Java 进程使用的内存量上浮 20%～30% 设置容器内存 limit。如果初次运行程序，并不了解其实际内存使用量，可以先设置一个较大的 limit 让程序运行一段时间，根据监控获取实际平均使用值对容器内存 limit 进行调整。</p><p>3.如果在容器内仅运行一个Java 应用程序，则将初始堆大小与最大堆大小最好配置相等。如果不相等，JVM会根据堆内存使用量在Xms与Xmx之间动态修改堆内存大小，导致额外的系统开销和频繁的垃圾回收。</p><p>4.使用<code>-XX:+HeapDumpOnOutOfMemoryError</code>和<code>-XX:HeapDumpPath</code>参数，在JVM发生OOM时，自动生成dump文件。dump文件路径最好是持久化挂载路径避免容器重启dump文件丢失。</p>`,44),e=[o];function c(t,r,E,i,y,F){return a(),n("div",null,e)}const m=s(l,[["render",c]]);export{C as __pageData,m as default};
