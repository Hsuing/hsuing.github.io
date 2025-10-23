import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/dockerfile/python.md","filePath":"guide/container/dockerfile/python.md","lastUpdated":1752937417000}'),l={name:"guide/container/dockerfile/python.md"},o=p(`<div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># Dockerfile.multi-stage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Stage 1: Build</span></span>
<span class="line"><span style="color:#B392F0;">FROM</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">python:3.9-alpine</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">AS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">builder</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Install necessary build dependencies</span></span>
<span class="line"><span style="color:#B392F0;">RUN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apk</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--no-cache</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build-base</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; </span><span style="color:#B392F0;">apk</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--no-cache</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gfortran</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">musl-dev</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">lapack-dev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Set the working directory</span></span>
<span class="line"><span style="color:#B392F0;">WORKDIR</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Copy the requirements file and install dependencies</span></span>
<span class="line"><span style="color:#B392F0;">COPY</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">requirements.txt</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">./</span></span>
<span class="line"><span style="color:#B392F0;">RUN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pip</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--no-cache-dir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">requirements.txt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Copy the rest of the application code to the working directory</span></span>
<span class="line"><span style="color:#B392F0;">COPY</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Uninstall unnecessary dependencies</span></span>
<span class="line"><span style="color:#B392F0;">RUN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pip</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">uninstall</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pandas</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">apk</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">del</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build-base</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gfortran</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">musl-dev</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">lapack-dev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Stage 2: Production</span></span>
<span class="line"><span style="color:#B392F0;">FROM</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">python:3.9-alpine</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Set the working directory</span></span>
<span class="line"><span style="color:#B392F0;">WORKDIR</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Copy only the necessary files from the build stage</span></span>
<span class="line"><span style="color:#B392F0;">COPY</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--from=builder</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/app</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Expose the port the app will run on</span></span>
<span class="line"><span style="color:#B392F0;">EXPOSE</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Run the Flask app</span></span>
<span class="line"><span style="color:#B392F0;">CMD</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&quot;python&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;app.py&quot;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># Dockerfile.multi-stage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Stage 1: Build</span></span>
<span class="line"><span style="color:#6F42C1;">FROM</span><span style="color:#24292E;"> </span><span style="color:#032F62;">python:3.9-alpine</span><span style="color:#24292E;"> </span><span style="color:#032F62;">AS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">builder</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Install necessary build dependencies</span></span>
<span class="line"><span style="color:#6F42C1;">RUN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apk</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--no-cache</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build-base</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; </span><span style="color:#6F42C1;">apk</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--no-cache</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gfortran</span><span style="color:#24292E;"> </span><span style="color:#032F62;">musl-dev</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lapack-dev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Set the working directory</span></span>
<span class="line"><span style="color:#6F42C1;">WORKDIR</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Copy the requirements file and install dependencies</span></span>
<span class="line"><span style="color:#6F42C1;">COPY</span><span style="color:#24292E;"> </span><span style="color:#032F62;">requirements.txt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">./</span></span>
<span class="line"><span style="color:#6F42C1;">RUN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pip</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--no-cache-dir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">requirements.txt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Copy the rest of the application code to the working directory</span></span>
<span class="line"><span style="color:#6F42C1;">COPY</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Uninstall unnecessary dependencies</span></span>
<span class="line"><span style="color:#6F42C1;">RUN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pip</span><span style="color:#24292E;"> </span><span style="color:#032F62;">uninstall</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pandas</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">apk</span><span style="color:#24292E;"> </span><span style="color:#032F62;">del</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build-base</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gfortran</span><span style="color:#24292E;"> </span><span style="color:#032F62;">musl-dev</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lapack-dev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Stage 2: Production</span></span>
<span class="line"><span style="color:#6F42C1;">FROM</span><span style="color:#24292E;"> </span><span style="color:#032F62;">python:3.9-alpine</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Set the working directory</span></span>
<span class="line"><span style="color:#6F42C1;">WORKDIR</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Copy only the necessary files from the build stage</span></span>
<span class="line"><span style="color:#6F42C1;">COPY</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--from=builder</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/app</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Expose the port the app will run on</span></span>
<span class="line"><span style="color:#6F42C1;">EXPOSE</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Run the Flask app</span></span>
<span class="line"><span style="color:#6F42C1;">CMD</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;python&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;app.py&quot;]</span></span></code></pre></div><ul><li>编译</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Dockerfile.multi-stage</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-t</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">flask-app:multi-stage</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Dockerfile.multi-stage</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-t</span><span style="color:#24292E;"> </span><span style="color:#032F62;">flask-app:multi-stage</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span></span></code></pre></div>`,3),e=[o];function c(t,r,y,E,i,F){return n(),a("div",null,e)}const u=s(l,[["render",c]]);export{C as __pageData,u as default};
