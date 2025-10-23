import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1,drop表后空间不释放","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/faq/1-空间不释放.md","filePath":"guide/Database/pgSql/faq/1-空间不释放.md","lastUpdated":1711706974000}'),p={name:"guide/Database/pgSql/faq/1-空间不释放.md"},l=e(`<h1 id="_1-drop表后空间不释放" tabindex="-1">1,drop表后空间不释放 <a class="header-anchor" href="#_1-drop表后空间不释放" aria-label="Permalink to &quot;1,drop表后空间不释放&quot;">​</a></h1><p>数据库执行drop table XXX后，查看du -sh 已下降，但df -h /pgdb没有减少，是有还有进程使用对应的文件句柄</p><p>1.通过表名确认文件ID</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select pg_relation_filepath(&#39;table_name&#39;);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select pg_relation_filepath(&#39;table_name&#39;);</span></span></code></pre></div><p>2.确认使用文件ID的进程是否可以删除</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">lsof |  grep “文件ID”</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">select *</span></span>
<span class="line"><span style="color:#e1e4e8;">from pg_stat_activity</span></span>
<span class="line"><span style="color:#e1e4e8;">where pid=&quot;PID”</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">lsof |  grep “文件ID”</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">select *</span></span>
<span class="line"><span style="color:#24292e;">from pg_stat_activity</span></span>
<span class="line"><span style="color:#24292e;">where pid=&quot;PID”</span></span></code></pre></div><p>3.删除对应进程</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select pg_terminate_backend(&#39;PID&#39;);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select pg_terminate_backend(&#39;PID&#39;);</span></span></code></pre></div><p>4.数据库drop 对应的表</p><div class="language-csharp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">drop </span><span style="color:#B392F0;">table</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">table_name</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">drop </span><span style="color:#6F42C1;">table</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">table_name</span><span style="color:#24292E;">;</span></span></code></pre></div><h1 id="_2-pid" tabindex="-1">2，pid <a class="header-anchor" href="#_2-pid" aria-label="Permalink to &quot;2，pid&quot;">​</a></h1><p>查看下<strong>postmaster.pid文件的内容</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cd $PGDATA     </span></span>
<span class="line"><span style="color:#e1e4e8;">cat postmaster.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">4188   //postgresql主进程号</span></span>
<span class="line"><span style="color:#e1e4e8;">/pgdata/xjwq/1953/data02/pg_root</span></span>
<span class="line"><span style="color:#e1e4e8;">1585846709</span></span>
<span class="line"><span style="color:#e1e4e8;">1953</span></span>
<span class="line"><span style="color:#e1e4e8;">/pgdata/xjwq/1953/data02/pg_root</span></span>
<span class="line"><span style="color:#e1e4e8;">0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">  1953001    4227076</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cd $PGDATA     </span></span>
<span class="line"><span style="color:#24292e;">cat postmaster.pid</span></span>
<span class="line"><span style="color:#24292e;">4188   //postgresql主进程号</span></span>
<span class="line"><span style="color:#24292e;">/pgdata/xjwq/1953/data02/pg_root</span></span>
<span class="line"><span style="color:#24292e;">1585846709</span></span>
<span class="line"><span style="color:#24292e;">1953</span></span>
<span class="line"><span style="color:#24292e;">/pgdata/xjwq/1953/data02/pg_root</span></span>
<span class="line"><span style="color:#24292e;">0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">  1953001    4227076</span></span></code></pre></div><p><strong>2. 分别对内容做一下解释，以及在文件删除后，如何重建</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1.查看进程号可见为4188</span></span>
<span class="line"><span style="color:#e1e4e8;">ps -elf | grep  &quot;postgres -D&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">0 S postgres  4188     1  0  75   0 - 324843 -     Apr02 ?        00:01:16 /opt/pgsql/bin/postgres -D /pgdata/xjwq/1953/data02/pg_root -p 1953</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2.数据库目录，也就是$PGDATA,这里是/pgdata/xjwq/1953/data02/pg_root</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3.文件创建时间，可以模糊认为是进程启动时间，即4188启动的时间,这里是epoch时间，需要转换，可以通过以下命令取到,时间为16:58:29 2020，然后去转换为epoch时间</span></span>
<span class="line"><span style="color:#e1e4e8;">ps -eo pid,lstart,etime|grep 4188</span></span>
<span class="line"><span style="color:#e1e4e8;">4188 Thu Apr  2 16:58:29 2020  1-00:13:30</span></span>
<span class="line"><span style="color:#e1e4e8;">也可以进入数据库查看：</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_postmaster_start_time();</span></span>
<span class="line"><span style="color:#e1e4e8;">   pg_postmaster_start_time    </span></span>
<span class="line"><span style="color:#e1e4e8;">-------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 2020-04-02 16:58:34.081295+08</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;">这里看到有些偏差，文件里记录的时间应该是文件创建的时间</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select extract(epoch from &#39;2020-04-02 16:58:34&#39;::timestamp);  </span></span>
<span class="line"><span style="color:#e1e4e8;"> date_part  </span></span>
<span class="line"><span style="color:#e1e4e8;">------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 1585817914</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;">目前看来时间不需要特别精准，我给文件写入时间后，都可以正常使用</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">4.数据库端口，即数据库参数port设置</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">5.unix_socket_directory参数设置的目录，这里还是$PGDATA</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">6.监听地址，listen_addresses参数值</span></span>
<span class="line"><span style="color:#e1e4e8;">7.共享段地址的值，这里是key,shmid,通过以下命令取的</span></span>
<span class="line"><span style="color:#e1e4e8;">ipcs -m</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">------ Shared Memory Segments --------</span></span>
<span class="line"><span style="color:#e1e4e8;">key        shmid      owner      perms      bytes      nattch     status      </span></span>
<span class="line"><span style="color:#e1e4e8;">0x001dcce9 4227076    postgres  600        1214545920 641  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">文件里面都是10进制，0x001dcce9转换10进制的值为1953001，然后写入4227076</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1.查看进程号可见为4188</span></span>
<span class="line"><span style="color:#24292e;">ps -elf | grep  &quot;postgres -D&quot;</span></span>
<span class="line"><span style="color:#24292e;">0 S postgres  4188     1  0  75   0 - 324843 -     Apr02 ?        00:01:16 /opt/pgsql/bin/postgres -D /pgdata/xjwq/1953/data02/pg_root -p 1953</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2.数据库目录，也就是$PGDATA,这里是/pgdata/xjwq/1953/data02/pg_root</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3.文件创建时间，可以模糊认为是进程启动时间，即4188启动的时间,这里是epoch时间，需要转换，可以通过以下命令取到,时间为16:58:29 2020，然后去转换为epoch时间</span></span>
<span class="line"><span style="color:#24292e;">ps -eo pid,lstart,etime|grep 4188</span></span>
<span class="line"><span style="color:#24292e;">4188 Thu Apr  2 16:58:29 2020  1-00:13:30</span></span>
<span class="line"><span style="color:#24292e;">也可以进入数据库查看：</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_postmaster_start_time();</span></span>
<span class="line"><span style="color:#24292e;">   pg_postmaster_start_time    </span></span>
<span class="line"><span style="color:#24292e;">-------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> 2020-04-02 16:58:34.081295+08</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;">这里看到有些偏差，文件里记录的时间应该是文件创建的时间</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select extract(epoch from &#39;2020-04-02 16:58:34&#39;::timestamp);  </span></span>
<span class="line"><span style="color:#24292e;"> date_part  </span></span>
<span class="line"><span style="color:#24292e;">------------</span></span>
<span class="line"><span style="color:#24292e;"> 1585817914</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;">目前看来时间不需要特别精准，我给文件写入时间后，都可以正常使用</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">4.数据库端口，即数据库参数port设置</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">5.unix_socket_directory参数设置的目录，这里还是$PGDATA</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">6.监听地址，listen_addresses参数值</span></span>
<span class="line"><span style="color:#24292e;">7.共享段地址的值，这里是key,shmid,通过以下命令取的</span></span>
<span class="line"><span style="color:#24292e;">ipcs -m</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">------ Shared Memory Segments --------</span></span>
<span class="line"><span style="color:#24292e;">key        shmid      owner      perms      bytes      nattch     status      </span></span>
<span class="line"><span style="color:#24292e;">0x001dcce9 4227076    postgres  600        1214545920 641  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">文件里面都是10进制，0x001dcce9转换10进制的值为1953001，然后写入4227076</span></span></code></pre></div><p><strong>3. 找一个正常的数据库复制一个文件，按照上面逐项修改，最后把权限设置为600,重新使用pg_ctl</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$chmod 600 postmaster.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">把文件复制到$PGDATA</span></span>
<span class="line"><span style="color:#e1e4e8;">$pg_ctl reload</span></span>
<span class="line"><span style="color:#e1e4e8;">server signaled</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$chmod 600 postmaster.pid</span></span>
<span class="line"><span style="color:#24292e;">把文件复制到$PGDATA</span></span>
<span class="line"><span style="color:#24292e;">$pg_ctl reload</span></span>
<span class="line"><span style="color:#24292e;">server signaled</span></span></code></pre></div><p><strong>4. 以下是需要用的转换工具</strong></p><p>登陆以下网址进行时间转换： <a href="https://www.epochconverter.com/" target="_blank" rel="noreferrer">https://www.epochconverter.com/</a></p><p>登陆以下地址可以进行16转10进制 <a href="https://tool.oschina.net/hexconvert" target="_blank" rel="noreferrer">https://tool.oschina.net/hexconvert</a></p><h1 id="_3-wal-xlog-区别" tabindex="-1">3，wal xlog 区别 <a class="header-anchor" href="#_3-wal-xlog-区别" aria-label="Permalink to &quot;3，wal xlog 区别&quot;">​</a></h1><p>ostgresql 10.x 叫做 wal、lsn postgresql 9.x 叫做 xlog、location</p><p>在实际应用中经常需要根据 lsn/location 获取 wal/xlog 文件名</p><p>postgresql 10.x</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# select pg_current_wal_lsn();</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_current_wal_lsn </span></span>
<span class="line"><span style="color:#e1e4e8;">--------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 0/1656FE0</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_current_wal_lsn(),</span></span>
<span class="line"><span style="color:#e1e4e8;">           pg_walfile_name(pg_current_wal_lsn()),</span></span>
<span class="line"><span style="color:#e1e4e8;">           pg_walfile_name_offset(pg_current_wal_lsn());</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_current_wal_lsn |     pg_walfile_name      |       pg_walfile_name_offset   </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--------------------+--------------------------+------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 0/1656FE0          | 000000010000000000000001 | (000000010000000000000001,6647776)</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# select pg_current_wal_lsn();</span></span>
<span class="line"><span style="color:#24292e;"> pg_current_wal_lsn </span></span>
<span class="line"><span style="color:#24292e;">--------------------</span></span>
<span class="line"><span style="color:#24292e;"> 0/1656FE0</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_current_wal_lsn(),</span></span>
<span class="line"><span style="color:#24292e;">           pg_walfile_name(pg_current_wal_lsn()),</span></span>
<span class="line"><span style="color:#24292e;">           pg_walfile_name_offset(pg_current_wal_lsn());</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> pg_current_wal_lsn |     pg_walfile_name      |       pg_walfile_name_offset   </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--------------------+--------------------------+------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> 0/1656FE0          | 000000010000000000000001 | (000000010000000000000001,6647776)</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div><p>postgresql 9.x</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# select pg_current_xlog_location();</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_current_xlog_location </span></span>
<span class="line"><span style="color:#e1e4e8;">--------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 596/C4DA2000</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_current_xlog_location(),</span></span>
<span class="line"><span style="color:#e1e4e8;">                  pg_xlogfile_name(pg_current_xlog_location()),</span></span>
<span class="line"><span style="color:#e1e4e8;">                  pg_xlogfile_name_offset(pg_current_xlog_location());</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_current_xlog_location |     pg_xlogfile_name     |       pg_xlogfile_name_offset       </span></span>
<span class="line"><span style="color:#e1e4e8;">--------------------------+--------------------------+-------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 596/C4DA2000             | 0000000100000596000000C4 | (0000000100000596000000C4,14295040)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# select pg_current_xlog_location();</span></span>
<span class="line"><span style="color:#24292e;"> pg_current_xlog_location </span></span>
<span class="line"><span style="color:#24292e;">--------------------------</span></span>
<span class="line"><span style="color:#24292e;"> 596/C4DA2000</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_current_xlog_location(),</span></span>
<span class="line"><span style="color:#24292e;">                  pg_xlogfile_name(pg_current_xlog_location()),</span></span>
<span class="line"><span style="color:#24292e;">                  pg_xlogfile_name_offset(pg_current_xlog_location());</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> pg_current_xlog_location |     pg_xlogfile_name     |       pg_xlogfile_name_offset       </span></span>
<span class="line"><span style="color:#24292e;">--------------------------+--------------------------+-------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> 596/C4DA2000             | 0000000100000596000000C4 | (0000000100000596000000C4,14295040)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div>`,27),o=[l];function c(t,r,i,g,y,d){return a(),n("div",null,o)}const u=s(p,[["render",c]]);export{h as __pageData,u as default};
