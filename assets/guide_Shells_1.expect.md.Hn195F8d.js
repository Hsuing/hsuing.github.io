import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const q=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Shells/1.expect.md","filePath":"guide/Shells/1.expect.md","lastUpdated":1730991065000}'),l={name:"guide/Shells/1.expect.md"},o=p(`<div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">restoreData</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;psql -h </span><span style="color:#E1E4E8;">$address</span><span style="color:#9ECBFF;"> -p </span><span style="color:#E1E4E8;">$port</span><span style="color:#9ECBFF;"> -U </span><span style="color:#E1E4E8;">$user</span><span style="color:#9ECBFF;"> -W -d </span><span style="color:#E1E4E8;">$bakdbname</span><span style="color:#9ECBFF;"> -f </span><span style="color:#E1E4E8;">$bakFileDirectory</span><span style="color:#9ECBFF;"> &gt;&amp; </span><span style="color:#E1E4E8;">$logDirectory</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#B392F0;">expect</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">#!/bin/expect</span></span>
<span class="line"><span style="color:#9ECBFF;">set timeout 60</span></span>
<span class="line"><span style="color:#9ECBFF;">spawn </span><span style="color:#E1E4E8;">$restoreData</span></span>
<span class="line"><span style="color:#9ECBFF;">expect &quot;*assword:&quot; {send &quot;</span><span style="color:#E1E4E8;">$password</span><span style="color:#9ECBFF;">\\r&quot;}</span></span>
<span class="line"><span style="color:#9ECBFF;">expect eof</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">restoreData</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;psql -h </span><span style="color:#24292E;">$address</span><span style="color:#032F62;"> -p </span><span style="color:#24292E;">$port</span><span style="color:#032F62;"> -U </span><span style="color:#24292E;">$user</span><span style="color:#032F62;"> -W -d </span><span style="color:#24292E;">$bakdbname</span><span style="color:#032F62;"> -f </span><span style="color:#24292E;">$bakFileDirectory</span><span style="color:#032F62;"> &gt;&amp; </span><span style="color:#24292E;">$logDirectory</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">expect</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">#!/bin/expect</span></span>
<span class="line"><span style="color:#032F62;">set timeout 60</span></span>
<span class="line"><span style="color:#032F62;">spawn </span><span style="color:#24292E;">$restoreData</span></span>
<span class="line"><span style="color:#032F62;">expect &quot;*assword:&quot; {send &quot;</span><span style="color:#24292E;">$password</span><span style="color:#032F62;">\\r&quot;}</span></span>
<span class="line"><span style="color:#032F62;">expect eof</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><blockquote><p>免交互式输入密码</p></blockquote><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">/usr/bin/expect</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;-</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">spawn ssh-keygen</span></span>
<span class="line"><span style="color:#9ECBFF;">expect &quot;(/root/.ssh/id_rsa)&quot; {send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#9ECBFF;">expect {</span></span>
<span class="line"><span style="color:#9ECBFF;">       &quot;(empty for no passphrase)&quot; {send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#9ECBFF;">       &quot;already&quot; {send &quot;y\\r&quot;}</span></span>
<span class="line"><span style="color:#9ECBFF;">       }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">expect {</span></span>
<span class="line"><span style="color:#9ECBFF;">       &quot;again&quot; {send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#9ECBFF;">       &quot;(empty for no passphrase)&quot; {send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#9ECBFF;">       }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">expect {</span></span>
<span class="line"><span style="color:#9ECBFF;">       &quot;again&quot; {send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#9ECBFF;">       &quot;#&quot; {send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#9ECBFF;">       }</span></span>
<span class="line"><span style="color:#9ECBFF;">expect &quot;#&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">expect eof</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> IP </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">$( </span><span style="color:#B392F0;">cat</span><span style="color:#9ECBFF;"> host_list )</span></span>
<span class="line"><span style="color:#F97583;">do</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#F97583;">-n</span><span style="color:#E1E4E8;"> IP ];</span><span style="color:#F97583;">then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">/usr/bin/expect</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;-</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">spawn ssh-copy-id root@</span><span style="color:#E1E4E8;">$IP</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">expect {</span></span>
<span class="line"><span style="color:#9ECBFF;">       &quot;*yes/no*&quot;   { send &quot;yes\\r&quot;}</span></span>
<span class="line"><span style="color:#9ECBFF;">       &quot;*password*&quot; { send &quot;redhat\\r&quot; }</span></span>
<span class="line"><span style="color:#9ECBFF;">       }</span></span>
<span class="line"><span style="color:#9ECBFF;">expect {</span></span>
<span class="line"><span style="color:#9ECBFF;">       &quot;*password&quot; { send &quot;redhat\\r&quot;}</span></span>
<span class="line"><span style="color:#9ECBFF;">       &quot;#&quot;         { send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#9ECBFF;">       }</span></span>
<span class="line"><span style="color:#9ECBFF;">expect &quot;#&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">expect eof</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#F97583;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">/usr/bin/expect</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;-</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">spawn ssh-keygen</span></span>
<span class="line"><span style="color:#032F62;">expect &quot;(/root/.ssh/id_rsa)&quot; {send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#032F62;">expect {</span></span>
<span class="line"><span style="color:#032F62;">       &quot;(empty for no passphrase)&quot; {send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#032F62;">       &quot;already&quot; {send &quot;y\\r&quot;}</span></span>
<span class="line"><span style="color:#032F62;">       }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">expect {</span></span>
<span class="line"><span style="color:#032F62;">       &quot;again&quot; {send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#032F62;">       &quot;(empty for no passphrase)&quot; {send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#032F62;">       }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">expect {</span></span>
<span class="line"><span style="color:#032F62;">       &quot;again&quot; {send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#032F62;">       &quot;#&quot; {send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#032F62;">       }</span></span>
<span class="line"><span style="color:#032F62;">expect &quot;#&quot;</span></span>
<span class="line"><span style="color:#032F62;">expect eof</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> IP </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#032F62;">$( </span><span style="color:#6F42C1;">cat</span><span style="color:#032F62;"> host_list )</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#D73A49;">-n</span><span style="color:#24292E;"> IP ];</span><span style="color:#D73A49;">then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">/usr/bin/expect</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;-</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">spawn ssh-copy-id root@</span><span style="color:#24292E;">$IP</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">expect {</span></span>
<span class="line"><span style="color:#032F62;">       &quot;*yes/no*&quot;   { send &quot;yes\\r&quot;}</span></span>
<span class="line"><span style="color:#032F62;">       &quot;*password*&quot; { send &quot;redhat\\r&quot; }</span></span>
<span class="line"><span style="color:#032F62;">       }</span></span>
<span class="line"><span style="color:#032F62;">expect {</span></span>
<span class="line"><span style="color:#032F62;">       &quot;*password&quot; { send &quot;redhat\\r&quot;}</span></span>
<span class="line"><span style="color:#032F62;">       &quot;#&quot;         { send &quot;\\r&quot;}</span></span>
<span class="line"><span style="color:#032F62;">       }</span></span>
<span class="line"><span style="color:#032F62;">expect &quot;#&quot;</span></span>
<span class="line"><span style="color:#032F62;">expect eof</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#D73A49;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">done</span></span></code></pre></div>`,3),e=[o];function t(c,r,y,i,F,u){return n(),a("div",null,e)}const d=s(l,[["render",t]]);export{q as __pageData,d as default};
