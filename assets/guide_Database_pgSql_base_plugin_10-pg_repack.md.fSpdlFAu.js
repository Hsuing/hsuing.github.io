import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const b=JSON.parse('{"title":"pg_repack 回收表体积","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/plugin/10-pg_repack.md","filePath":"guide/Database/pgSql/base/plugin/10-pg_repack.md","lastUpdated":1753110162000}'),p={name:"guide/Database/pgSql/base/plugin/10-pg_repack.md"},l=n(`<h1 id="pg-repack-回收表体积" tabindex="-1">pg_repack 回收表体积 <a class="header-anchor" href="#pg-repack-回收表体积" aria-label="Permalink to &quot;pg_repack 回收表体积&quot;">​</a></h1><p>对于某些常进行archiver或者 purge操作的表而言，如果我们不定期回收表空间，则表体积会越涨越大。</p><p>但是pg自带的 vacuum full 在回收的过程中会阻塞读写操作，不能在生产环境直接运行。</p><p>因此，在生产环境 我们常用的表空间收缩工具是pg_squeeze 和 pg_repack</p><p>项目地址: <a href="https://github.com/reorg/pg_repack" target="_blank" rel="noreferrer">https://github.com/reorg/pg_repack</a></p><p><a href="https://help.aliyun.com/zh/rds/apsaradb-rds-for-postgresql/use-the-pg-repack-extension-to-clear-tablespaces?spm=a2c4g.11186623.0.0.72a537c5loNqXx#concept-2071228" target="_blank" rel="noreferrer">https://help.aliyun.com/zh/rds/apsaradb-rds-for-postgresql/use-the-pg-repack-extension-to-clear-tablespaces?spm=a2c4g.11186623.0.0.72a537c5loNqXx#concept-2071228</a></p><p><a href="https://www.postgresql.org/docs/13/sql-vacuum.html" target="_blank" rel="noreferrer">https://www.postgresql.org/docs/13/sql-vacuum.html</a></p><p><a href="https://reorg.github.io/pg_repack/?spm=a2c4g.11186623.0.0.21eb41a2fwfogO" target="_blank" rel="noreferrer">https://reorg.github.io/pg_repack/?spm=a2c4g.11186623.0.0.21eb41a2fwfogO</a></p><p>原理： 新建一个一模一样的影子表，然后拷贝原表的数据，最后rename替换原表。</p><p><code>注意： 待处理的表必须有主键</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install centos-release-scl-rh</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install llvm-toolset-7-clang</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cd /home/postgres</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">tar xf pg_repack-ver_1.4.4.tar.gz </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export PATH=/usr/local/pgsql-11.5/bin:$PATH   -- 需要载入环境变量，不然编译过程中可能找不到pg_config这个文件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cd pg_repack-ver_1.4.4</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install centos-release-scl-rh</span></span>
<span class="line"><span style="color:#24292e;">yum install llvm-toolset-7-clang</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cd /home/postgres</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">tar xf pg_repack-ver_1.4.4.tar.gz </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export PATH=/usr/local/pgsql-11.5/bin:$PATH   -- 需要载入环境变量，不然编译过程中可能找不到pg_config这个文件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cd pg_repack-ver_1.4.4</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span></code></pre></div><p>另外，会生成一个可执行的文件： /home/postgres/pg_repack-ver_1.4.4/bin/pg_repack</p><p>修改配置文件：</p><p>vim /usr/local/pgsql-11.5/data/postgresql.conf</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">shared_preload_libraries = &#39;pg_repack&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">shared_preload_libraries = &#39;pg_repack&#39;</span></span></code></pre></div><p>然后 ，重启pg进程</p><p>使用方法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">create database db1;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">\\c db1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">create extension pg_repack;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">create table testdata (id integer,course int,grade numeric(4,2),testtime date);</span></span>
<span class="line"><span style="color:#e1e4e8;">alter table testdata add primary key (id);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">insert into testdata </span></span>
<span class="line"><span style="color:#e1e4e8;"> select generate_series(1,100) as id,</span></span>
<span class="line"><span style="color:#e1e4e8;"> 10 as course,</span></span>
<span class="line"><span style="color:#e1e4e8;"> 10.11 as grade,</span></span>
<span class="line"><span style="color:#e1e4e8;"> &#39;2017-07-06&#39; as testtime;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">create database db1;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">\\c db1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">create extension pg_repack;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">create table testdata (id integer,course int,grade numeric(4,2),testtime date);</span></span>
<span class="line"><span style="color:#24292e;">alter table testdata add primary key (id);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">insert into testdata </span></span>
<span class="line"><span style="color:#24292e;"> select generate_series(1,100) as id,</span></span>
<span class="line"><span style="color:#24292e;"> 10 as course,</span></span>
<span class="line"><span style="color:#24292e;"> 10.11 as grade,</span></span>
<span class="line"><span style="color:#24292e;"> &#39;2017-07-06&#39; as testtime;</span></span></code></pre></div><p>然后，我们可以去看下PG datadir物理文件大小从1.1GB涨到了1.6GB了</p><p>然后，我们再使用命令 delete from testdata where id between 5000000 and 10000000; 对testdata表删除一半的数据 ，此时可以看到物理文件没有任何缩小。</p><p>然后，在外部使用pg_repack对 color表做空间回收:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cd /home/postgres/pg_repack-ver_1.4.4/bin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">./pg_repack -h 127.0.0.1  --port 5434 -Upostgres -d db1 -t testdata -j 2 -D -k</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cd /home/postgres/pg_repack-ver_1.4.4/bin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">./pg_repack -h 127.0.0.1  --port 5434 -Upostgres -d db1 -t testdata -j 2 -D -k</span></span></code></pre></div><h2 id="pg-repack参数" tabindex="-1">pg_repack参数 <a class="header-anchor" href="#pg-repack参数" aria-label="Permalink to &quot;pg_repack参数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">  -a, --all                 repack all databases</span></span>
<span class="line"><span style="color:#e1e4e8;">  -t, --table=TABLE         repack specific table only</span></span>
<span class="line"><span style="color:#e1e4e8;">  -I, --parent-table=TABLE  repack specific parent table and its inheritors</span></span>
<span class="line"><span style="color:#e1e4e8;">  -c, --schema=SCHEMA       repack tables in specific schema only</span></span>
<span class="line"><span style="color:#e1e4e8;">  -s, --tablespace=TBLSPC   move repacked tables to a new tablespace</span></span>
<span class="line"><span style="color:#e1e4e8;">  -S, --moveidx             move repacked indexes to TBLSPC too</span></span>
<span class="line"><span style="color:#e1e4e8;">  -o, --order-by=COLUMNS    order by columns instead of cluster keys</span></span>
<span class="line"><span style="color:#e1e4e8;">  -n, --no-order            do vacuum full instead of cluster</span></span>
<span class="line"><span style="color:#e1e4e8;">  -N, --dry-run             print what would have been repacked</span></span>
<span class="line"><span style="color:#e1e4e8;">  -j, --jobs=NUM            Use this many parallel jobs for each table</span></span>
<span class="line"><span style="color:#e1e4e8;">  -i, --index=INDEX         move only the specified index</span></span>
<span class="line"><span style="color:#e1e4e8;">  -x, --only-indexes        move only indexes of the specified table</span></span>
<span class="line"><span style="color:#e1e4e8;">  -T, --wait-timeout=SECS   timeout to cancel other backends on conflict</span></span>
<span class="line"><span style="color:#e1e4e8;">  -D, --no-kill-backend     don&#39;t kill other backends when timed out</span></span>
<span class="line"><span style="color:#e1e4e8;">  -Z, --no-analyze          don&#39;t analyze at end</span></span>
<span class="line"><span style="color:#e1e4e8;">  -k, --no-superuser-check  skip superuser checks in client</span></span>
<span class="line"><span style="color:#e1e4e8;">  -C, --exclude-extension   don&#39;t repack tables which belong to specific extension</span></span>
<span class="line"><span style="color:#e1e4e8;">Connection options:</span></span>
<span class="line"><span style="color:#e1e4e8;">  -d, --dbname=DBNAME       database to connect</span></span>
<span class="line"><span style="color:#e1e4e8;">  -h, --host=HOSTNAME       database server host or socket directory</span></span>
<span class="line"><span style="color:#e1e4e8;">  -p, --port=PORT           database server port</span></span>
<span class="line"><span style="color:#e1e4e8;">  -U, --username=USERNAME   user name to connect as</span></span>
<span class="line"><span style="color:#e1e4e8;">  -w, --no-password         never prompt for password</span></span>
<span class="line"><span style="color:#e1e4e8;">  -W, --password            force password prompt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">  -a, --all                 repack all databases</span></span>
<span class="line"><span style="color:#24292e;">  -t, --table=TABLE         repack specific table only</span></span>
<span class="line"><span style="color:#24292e;">  -I, --parent-table=TABLE  repack specific parent table and its inheritors</span></span>
<span class="line"><span style="color:#24292e;">  -c, --schema=SCHEMA       repack tables in specific schema only</span></span>
<span class="line"><span style="color:#24292e;">  -s, --tablespace=TBLSPC   move repacked tables to a new tablespace</span></span>
<span class="line"><span style="color:#24292e;">  -S, --moveidx             move repacked indexes to TBLSPC too</span></span>
<span class="line"><span style="color:#24292e;">  -o, --order-by=COLUMNS    order by columns instead of cluster keys</span></span>
<span class="line"><span style="color:#24292e;">  -n, --no-order            do vacuum full instead of cluster</span></span>
<span class="line"><span style="color:#24292e;">  -N, --dry-run             print what would have been repacked</span></span>
<span class="line"><span style="color:#24292e;">  -j, --jobs=NUM            Use this many parallel jobs for each table</span></span>
<span class="line"><span style="color:#24292e;">  -i, --index=INDEX         move only the specified index</span></span>
<span class="line"><span style="color:#24292e;">  -x, --only-indexes        move only indexes of the specified table</span></span>
<span class="line"><span style="color:#24292e;">  -T, --wait-timeout=SECS   timeout to cancel other backends on conflict</span></span>
<span class="line"><span style="color:#24292e;">  -D, --no-kill-backend     don&#39;t kill other backends when timed out</span></span>
<span class="line"><span style="color:#24292e;">  -Z, --no-analyze          don&#39;t analyze at end</span></span>
<span class="line"><span style="color:#24292e;">  -k, --no-superuser-check  skip superuser checks in client</span></span>
<span class="line"><span style="color:#24292e;">  -C, --exclude-extension   don&#39;t repack tables which belong to specific extension</span></span>
<span class="line"><span style="color:#24292e;">Connection options:</span></span>
<span class="line"><span style="color:#24292e;">  -d, --dbname=DBNAME       database to connect</span></span>
<span class="line"><span style="color:#24292e;">  -h, --host=HOSTNAME       database server host or socket directory</span></span>
<span class="line"><span style="color:#24292e;">  -p, --port=PORT           database server port</span></span>
<span class="line"><span style="color:#24292e;">  -U, --username=USERNAME   user name to connect as</span></span>
<span class="line"><span style="color:#24292e;">  -w, --no-password         never prompt for password</span></span>
<span class="line"><span style="color:#24292e;">  -W, --password            force password prompt</span></span></code></pre></div>`,24),o=[l];function c(t,r,i,d,y,g){return e(),a("div",null,o)}const k=s(p,[["render",c]]);export{b as __pageData,k as default};
