import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1. 删除public模式，各自使用私有模式管理数据","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/12-anli_user.md","filePath":"guide/Database/pgSql/base/12-anli_user.md","lastUpdated":1711696988000}'),p={name:"guide/Database/pgSql/base/12-anli_user.md"},l=n(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">业务场景：</span></span>
<span class="line"><span style="color:#e1e4e8;">三个独自子系统bas、app1、app3</span></span>
<span class="line"><span style="color:#e1e4e8;">bas系统的数据为app1和app3系统所共有的基础数据</span></span>
<span class="line"><span style="color:#e1e4e8;">app1可修改bas系统数据，但不能删除</span></span>
<span class="line"><span style="color:#e1e4e8;">app3只能查询bas系统数据，不能修改和删除</span></span>
<span class="line"><span style="color:#e1e4e8;">需求：只需配置一次，后续新增表无需再次配置</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">业务场景：</span></span>
<span class="line"><span style="color:#24292e;">三个独自子系统bas、app1、app3</span></span>
<span class="line"><span style="color:#24292e;">bas系统的数据为app1和app3系统所共有的基础数据</span></span>
<span class="line"><span style="color:#24292e;">app1可修改bas系统数据，但不能删除</span></span>
<span class="line"><span style="color:#24292e;">app3只能查询bas系统数据，不能修改和删除</span></span>
<span class="line"><span style="color:#24292e;">需求：只需配置一次，后续新增表无需再次配置</span></span></code></pre></div><h1 id="_1-删除public模式-各自使用私有模式管理数据" tabindex="-1">1. 删除public模式，各自使用私有模式管理数据 <a class="header-anchor" href="#_1-删除public模式-各自使用私有模式管理数据" aria-label="Permalink to &quot;1. 删除public模式，各自使用私有模式管理数据&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">test=# drop schema if exists public; </span></span>
<span class="line"><span style="color:#e1e4e8;">DROP SCHEMA</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">test=# drop schema if exists public; </span></span>
<span class="line"><span style="color:#24292e;">DROP SCHEMA</span></span></code></pre></div><h1 id="_2-创建三个用户" tabindex="-1">2. 创建三个用户 <a class="header-anchor" href="#_2-创建三个用户" aria-label="Permalink to &quot;2. 创建三个用户&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">test=# create user bas encrypted password &#39;123456&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE</span></span>
<span class="line"><span style="color:#e1e4e8;">test=# create user app1 encrypted password &#39;123456&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE</span></span>
<span class="line"><span style="color:#e1e4e8;">test=# create user app3 encrypted password &#39;123456&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">test=# create user bas encrypted password &#39;123456&#39;;</span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE</span></span>
<span class="line"><span style="color:#24292e;">test=# create user app1 encrypted password &#39;123456&#39;;</span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE</span></span>
<span class="line"><span style="color:#24292e;">test=# create user app3 encrypted password &#39;123456&#39;;</span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE</span></span></code></pre></div><h1 id="_3-创建三个用户对应的schema并各自关联" tabindex="-1">3. 创建三个用户对应的schema并各自关联 <a class="header-anchor" href="#_3-创建三个用户对应的schema并各自关联" aria-label="Permalink to &quot;3. 创建三个用户对应的schema并各自关联&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">test=# create schema bas authorization bas;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#e1e4e8;">test=# create schema app1 authorization app1;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#e1e4e8;">test=# create schema app3 authorization app3;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE SCHEMA</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">test=# create schema bas authorization bas;</span></span>
<span class="line"><span style="color:#24292e;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#24292e;">test=# create schema app1 authorization app1;</span></span>
<span class="line"><span style="color:#24292e;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#24292e;">test=# create schema app3 authorization app3;</span></span>
<span class="line"><span style="color:#24292e;">CREATE SCHEMA</span></span></code></pre></div><h1 id="_4-三个用户各自创建测试表" tabindex="-1">4. 三个用户各自创建测试表 <a class="header-anchor" href="#_4-三个用户各自创建测试表" aria-label="Permalink to &quot;4. 三个用户各自创建测试表&quot;">​</a></h1><p>bas用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[postgres@ha4 ~]$ psql -p6000 -Ubas test</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; create table tbl_bas1(id int);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; create table tbl_bas2(id int);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; insert into tbl_bas1 values(100);</span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT 0 1</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; insert into tbl_bas2 values(200),(300);</span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT 0 2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[postgres@ha4 ~]$ psql -p6000 -Ubas test</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; create table tbl_bas1(id int);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; create table tbl_bas2(id int);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; insert into tbl_bas1 values(100);</span></span>
<span class="line"><span style="color:#24292e;">INSERT 0 1</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; insert into tbl_bas2 values(200),(300);</span></span>
<span class="line"><span style="color:#24292e;">INSERT 0 2</span></span></code></pre></div><p>app1用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[postgres@ha4 ~]$ psql -p6000 -Uapp1 test</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; create table tbl_app1(id int);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[postgres@ha4 ~]$ psql -p6000 -Uapp1 test</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; create table tbl_app1(id int);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span></code></pre></div><p>app3用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[postgres@ha4 ~]$ psql -p6000 -Uapp3 test</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; create table tbl_app3(id int);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[postgres@ha4 ~]$ psql -p6000 -Uapp3 test</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; create table tbl_app3(id int);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span></code></pre></div><h1 id="_5-权限配置" tabindex="-1">5. 权限配置 <a class="header-anchor" href="#_5-权限配置" aria-label="Permalink to &quot;5. 权限配置&quot;">​</a></h1><p>使用bas用户配置schema的usage权限给app1和app3用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">test=&gt; grant usage on schema bas to app1,app3;</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">test=&gt; grant usage on schema bas to app1,app3;</span></span>
<span class="line"><span style="color:#24292e;">GRANT</span></span></code></pre></div><p>使用bas用户配置当前所有表的select权限</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">test=&gt; grant select on all tables in schema bas to app1,app3;</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">test=&gt; grant select on all tables in schema bas to app1,app3;</span></span>
<span class="line"><span style="color:#24292e;">GRANT</span></span></code></pre></div><p>使用bas用户配置当前所有表的update权限</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">test=&gt; grant update on all tables in schema bas to app1;</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">test=&gt; grant update on all tables in schema bas to app1;</span></span>
<span class="line"><span style="color:#24292e;">GRANT</span></span></code></pre></div><p>使用bas用户配置新增表的默认权限</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">test=&gt; alter default privileges in schema bas \\</span></span>
<span class="line"><span style="color:#e1e4e8;">grant select on tables to app1,app3;</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER DEFAULT PRIVILEGES</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; alter default privileges in schema bas \\</span></span>
<span class="line"><span style="color:#e1e4e8;">grant update on tables to app1;</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER DEFAULT PRIVILEGES</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">test=&gt; alter default privileges in schema bas \\</span></span>
<span class="line"><span style="color:#24292e;">grant select on tables to app1,app3;</span></span>
<span class="line"><span style="color:#24292e;">ALTER DEFAULT PRIVILEGES</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; alter default privileges in schema bas \\</span></span>
<span class="line"><span style="color:#24292e;">grant update on tables to app1;</span></span>
<span class="line"><span style="color:#24292e;">ALTER DEFAULT PRIVILEGES</span></span></code></pre></div><h1 id="_6-测试验证" tabindex="-1">6. 测试验证 <a class="header-anchor" href="#_6-测试验证" aria-label="Permalink to &quot;6. 测试验证&quot;">​</a></h1><p>app3用户测试</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">test=&gt; select * from bas.tbl_bas1;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id  </span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;"> 100</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; select * from bas.tbl_bas2;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id  </span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;"> 200</span></span>
<span class="line"><span style="color:#e1e4e8;"> 300</span></span>
<span class="line"><span style="color:#e1e4e8;">(2 rows)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; update bas.tbl_bas1 set id=null;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  permission denied for table tbl_bas1</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; update bas.tbl_bas2 set id=null;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  permission denied for table tbl_bas2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; delete from bas.tbl_bas1;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  permission denied for table tbl_bas1</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; delete from bas.tbl_bas2;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  permission denied for table tbl_bas2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">test=&gt; select * from bas.tbl_bas1;</span></span>
<span class="line"><span style="color:#24292e;"> id  </span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;"> 100</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; select * from bas.tbl_bas2;</span></span>
<span class="line"><span style="color:#24292e;"> id  </span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;"> 200</span></span>
<span class="line"><span style="color:#24292e;"> 300</span></span>
<span class="line"><span style="color:#24292e;">(2 rows)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">test=&gt; update bas.tbl_bas1 set id=null;</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  permission denied for table tbl_bas1</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; update bas.tbl_bas2 set id=null;</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  permission denied for table tbl_bas2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">test=&gt; delete from bas.tbl_bas1;</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  permission denied for table tbl_bas1</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; delete from bas.tbl_bas2;</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  permission denied for table tbl_bas2</span></span></code></pre></div><p>app1用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">test=&gt; select * from bas.tbl_bas1;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id  </span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;"> 100</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; select * from bas.tbl_bas2;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id  </span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;"> 200</span></span>
<span class="line"><span style="color:#e1e4e8;"> 300</span></span>
<span class="line"><span style="color:#e1e4e8;">(2 rows)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; update bas.tbl_bas1 set id=id+1;</span></span>
<span class="line"><span style="color:#e1e4e8;">UPDATE 1</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; update bas.tbl_bas2 set id=id+1;</span></span>
<span class="line"><span style="color:#e1e4e8;">UPDATE 2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; delete from bas.tbl_bas1;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  permission denied for table tbl_bas1</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; delete from bas.tbl_bas2;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  permission denied for table tbl_bas2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">test=&gt; select * from bas.tbl_bas1;</span></span>
<span class="line"><span style="color:#24292e;"> id  </span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;"> 100</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; select * from bas.tbl_bas2;</span></span>
<span class="line"><span style="color:#24292e;"> id  </span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;"> 200</span></span>
<span class="line"><span style="color:#24292e;"> 300</span></span>
<span class="line"><span style="color:#24292e;">(2 rows)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">test=&gt; update bas.tbl_bas1 set id=id+1;</span></span>
<span class="line"><span style="color:#24292e;">UPDATE 1</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; update bas.tbl_bas2 set id=id+1;</span></span>
<span class="line"><span style="color:#24292e;">UPDATE 2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">test=&gt; delete from bas.tbl_bas1;</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  permission denied for table tbl_bas1</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; delete from bas.tbl_bas2;</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  permission denied for table tbl_bas2</span></span></code></pre></div><p>bas用户新增表tbl_bas3</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[postgres@ha4 ~]$ psql -p6000 -Ubas test</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; create table tbl_bas3(id int);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; insert into tbl_bas3 values(500),(900);</span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT 0 2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[postgres@ha4 ~]$ psql -p6000 -Ubas test</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; create table tbl_bas3(id int);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; insert into tbl_bas3 values(500),(900);</span></span>
<span class="line"><span style="color:#24292e;">INSERT 0 2</span></span></code></pre></div><p>app1用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[postgres@ha4 ~]$ psql -p6000 -Uapp1 test</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; select * from bas.tbl_bas3;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id  </span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;"> 500</span></span>
<span class="line"><span style="color:#e1e4e8;"> 900</span></span>
<span class="line"><span style="color:#e1e4e8;">(2 rows)</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; update bas.tbl_bas3 set id=id+1;</span></span>
<span class="line"><span style="color:#e1e4e8;">UPDATE 2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">app3用户</span></span>
<span class="line"><span style="color:#e1e4e8;">[postgres@ha4 ~]$ psql -p6000 -Uapp3 test</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; select * from bas.tbl_bas3;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id  </span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;"> 501</span></span>
<span class="line"><span style="color:#e1e4e8;"> 901</span></span>
<span class="line"><span style="color:#e1e4e8;">(2 rows)</span></span>
<span class="line"><span style="color:#e1e4e8;">test=&gt; update bas.tbl_bas3 set id=id+1;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  permission denied for table tbl_bas3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[postgres@ha4 ~]$ psql -p6000 -Uapp1 test</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; select * from bas.tbl_bas3;</span></span>
<span class="line"><span style="color:#24292e;"> id  </span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;"> 500</span></span>
<span class="line"><span style="color:#24292e;"> 900</span></span>
<span class="line"><span style="color:#24292e;">(2 rows)</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; update bas.tbl_bas3 set id=id+1;</span></span>
<span class="line"><span style="color:#24292e;">UPDATE 2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">app3用户</span></span>
<span class="line"><span style="color:#24292e;">[postgres@ha4 ~]$ psql -p6000 -Uapp3 test</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; select * from bas.tbl_bas3;</span></span>
<span class="line"><span style="color:#24292e;"> id  </span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;"> 501</span></span>
<span class="line"><span style="color:#24292e;"> 901</span></span>
<span class="line"><span style="color:#24292e;">(2 rows)</span></span>
<span class="line"><span style="color:#24292e;">test=&gt; update bas.tbl_bas3 set id=id+1;</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  permission denied for table tbl_bas3</span></span></code></pre></div>`,32),t=[l];function o(c,i,r,d,b,y){return a(),e("div",null,t)}const u=s(p,[["render",o]]);export{h as __pageData,u as default};
