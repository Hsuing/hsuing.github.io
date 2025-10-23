import{_ as s,o as e,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/optimize/12_postgresqltuner.md","filePath":"guide/Database/pgSql/optimize/12_postgresqltuner.md","lastUpdated":1703063387000}'),p={name:"guide/Database/pgSql/optimize/12_postgresqltuner.md"},l=a(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#该工具基于Perl语言开发,首先安装Perl相关的开发包</span></span>
<span class="line"><span style="color:#e1e4e8;"># yum -y install perl-DBD-Pg perl-DBI </span></span>
<span class="line"><span style="color:#e1e4e8;">#获取工具包</span></span>
<span class="line"><span style="color:#e1e4e8;">#cd /tmp</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># wget -O postgresqltuner.pl https://postgresqltuner.pl --no-check-certificate</span></span>
<span class="line"><span style="color:#e1e4e8;">或</span></span>
<span class="line"><span style="color:#e1e4e8;"># curl -Lo postgresqltuner.pl https://postgresqltuner.pl</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#chmod +x postgresqltuner.pl</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">二、基本使用</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">使用方法：</span></span>
<span class="line"><span style="color:#e1e4e8;">./postgresqltuner.pl --host=127.0.0.1 --database=mydb --user=postgres --password=bitgood123</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#该工具基于Perl语言开发,首先安装Perl相关的开发包</span></span>
<span class="line"><span style="color:#24292e;"># yum -y install perl-DBD-Pg perl-DBI </span></span>
<span class="line"><span style="color:#24292e;">#获取工具包</span></span>
<span class="line"><span style="color:#24292e;">#cd /tmp</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># wget -O postgresqltuner.pl https://postgresqltuner.pl --no-check-certificate</span></span>
<span class="line"><span style="color:#24292e;">或</span></span>
<span class="line"><span style="color:#24292e;"># curl -Lo postgresqltuner.pl https://postgresqltuner.pl</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#chmod +x postgresqltuner.pl</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">二、基本使用</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">使用方法：</span></span>
<span class="line"><span style="color:#24292e;">./postgresqltuner.pl --host=127.0.0.1 --database=mydb --user=postgres --password=bitgood123</span></span></code></pre></div><ul><li>另一种方式</li></ul><p><a href="https://pgtune.leopard.in.ua/" target="_blank" rel="noreferrer">https://pgtune.leopard.in.ua/</a></p>`,3),t=[l];function o(r,c,i,d,g,u){return e(),n("div",null,t)}const h=s(p,[["render",o]]);export{_ as __pageData,h as default};
