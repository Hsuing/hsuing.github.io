import{_ as s,o as a,c as n,R as p}from"./chunks/framework.zUbWieqp.js";const _=JSON.parse('{"title":"流程","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/backup/6-pg_basebackup.md","filePath":"guide/Database/pgSql/backup/6-pg_basebackup.md","lastUpdated":1728986210000}'),l={name:"guide/Database/pgSql/backup/6-pg_basebackup.md"},o=p(`<h1 id="流程" tabindex="-1">流程 <a class="header-anchor" href="#流程" aria-label="Permalink to &quot;流程&quot;">​</a></h1><p>(1)执行pg_start_backup 命令</p><ul><li>force into the full-page wirte mode.</li><li>witch to the current WAL segment file (version 8.4 or later).</li><li>Do checkpoint</li><li>Create a backup_label file-此文件创建于base目录的同一层，包含有关基本备份本身的基本信息，例如此检查点的检查点位置.</li></ul><p>backup_label file文件包含内容</p><p>(2)使用tar/cp命令对SPGDATA目录进行备份</p><p>(3)执行pg_stop_backup 命令</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202403221705195.png" alt="image-20240322170509921"></p><h1 id="_1-pg-basebackup" tabindex="-1">1.pg_basebackup <a class="header-anchor" href="#_1-pg-basebackup" aria-label="Permalink to &quot;1.pg_basebackup&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#物理备</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看表空间目录</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">\\db</span></span>
<span class="line"><span style="color:#E1E4E8;">           </span><span style="color:#B392F0;">List</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">of</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tablespaces</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">Name</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Owner</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">Location</span><span style="color:#E1E4E8;">       </span></span>
<span class="line"><span style="color:#B392F0;">---------------+----------+-------------------------------------</span></span>
<span class="line"><span style="color:#B392F0;">pg_default</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">postgres</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#B392F0;">pg_global</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">postgres</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#B392F0;">tbs_francs</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">postgres</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">/database/pg93/pg_tbs/tbs_francs</span></span>
<span class="line"><span style="color:#B392F0;">tbs_source_db</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">postgres</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">/database/pg93/pg_tbs/tbs_source_db</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">#如果有则有，如果没有则没有</span></span>
<span class="line"><span style="color:#6A737D;">#备注：先查看表空间目录和数据目录，因为这些目录需要在备库主机上手工创建</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 切换一个日志</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">pg_switch_wal</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">pg_switch_wal</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">---------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">0/30000078</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看时间戳</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">current_timestamp</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">current_timestamp</span><span style="color:#E1E4E8;">       </span></span>
<span class="line"><span style="color:#B392F0;">-------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">2020-08-03</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">18</span><span style="color:#9ECBFF;">:20:10.155438+08</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#创建基础备份：</span></span>
<span class="line"><span style="color:#6A737D;">#语法：</span></span>
<span class="line"><span style="color:#B392F0;">pg_basebackup</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Ft</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Pv</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Xf</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-z</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">backupdi</span><span style="color:#E1E4E8;">r</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Z5</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-h</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&lt;hostname&gt;&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">por</span><span style="color:#E1E4E8;">t</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-U</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">usernam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-W</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">backupdir-----&gt;导出的备份文件路径。系统会自动创建目录，但是如果该目录已经存在且不为空，则会报错</span></span>
<span class="line"><span style="color:#B392F0;">-W</span><span style="color:#E1E4E8;">       </span><span style="color:#79B8FF;">-----</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">密码</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@pg01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]$ pg_basebackup -Ft -Pv -Xf -z -Z5 -p 5532 -D /data/pgdata/data/backup/</span></span>
<span class="line"><span style="color:#B392F0;">pg_basebackup:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">initiating</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">base</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">backup,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">waiting</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">for</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">checkpoint</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">complete</span></span>
<span class="line"><span style="color:#B392F0;">pg_basebackup:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">checkpoint</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">completed</span></span>
<span class="line"><span style="color:#B392F0;">pg_basebackup:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">write-ahead</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">point:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#9ECBFF;">/2B000028</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">timeline</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#B392F0;">103245/103245</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kB</span><span style="color:#E1E4E8;"> (100%), 1/1 tablespace                                         </span></span>
<span class="line"><span style="color:#B392F0;">pg_basebackup:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">write-ahead</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">point:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#9ECBFF;">/2B000100</span></span>
<span class="line"><span style="color:#B392F0;">pg_basebackup:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">syncing</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">disk</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">...</span></span>
<span class="line"><span style="color:#B392F0;">pg_basebackup:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">base</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">backup</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">completed</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@pg01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]$ ls  /data/pgdata/data/backup/</span></span>
<span class="line"><span style="color:#B392F0;">base.tar.gz</span></span>
<span class="line"><span style="color:#B392F0;">其中base是$pgdata目录的备份</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">2，移除故障的数据目录或者新建数据目录，在pg02</span></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@pg02 pgdata]$ mv data data_old</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">3,创建新的数据库目录</span></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@pg02 pgdata]$ mkdir data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@pg02 pgdata]$ chmod 700 data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#解压</span></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@pg02 pgdata]$ tar zxvf base.tar.gz  -C  data/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#修改postgresql.auto.conf，默认这个文件是空</span></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@pg02 data]$ cat postgresql.auto.conf </span></span>
<span class="line"><span style="color:#6A737D;"># Do not edit this file manually!</span></span>
<span class="line"><span style="color:#6A737D;"># It will be overwritten by the ALTER SYSTEM command.</span></span>
<span class="line"><span style="color:#6A737D;">#添加以下两行</span></span>
<span class="line"><span style="color:#B392F0;">restore_command</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;cp /data/pgdata/archive/%f %p &gt; /data/pgdata/archive/recovery.log 2&gt;&amp;1&#39;</span></span>
<span class="line"><span style="color:#B392F0;">recovery_target_time</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39; 2020-08-03 17:39:38.928572+08&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#启动</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@pg02 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# systemctl start postgresql</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#物理备</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看表空间目录</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">#</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">\\db</span></span>
<span class="line"><span style="color:#24292E;">           </span><span style="color:#6F42C1;">List</span><span style="color:#24292E;"> </span><span style="color:#032F62;">of</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tablespaces</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Name</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Owner</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">       </span><span style="color:#6F42C1;">Location</span><span style="color:#24292E;">       </span></span>
<span class="line"><span style="color:#6F42C1;">---------------+----------+-------------------------------------</span></span>
<span class="line"><span style="color:#6F42C1;">pg_default</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">postgres</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#6F42C1;">pg_global</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">postgres</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#6F42C1;">tbs_francs</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">postgres</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">/database/pg93/pg_tbs/tbs_francs</span></span>
<span class="line"><span style="color:#6F42C1;">tbs_source_db</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">postgres</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">/database/pg93/pg_tbs/tbs_source_db</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">4</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">#如果有则有，如果没有则没有</span></span>
<span class="line"><span style="color:#6A737D;">#备注：先查看表空间目录和数据目录，因为这些目录需要在备库主机上手工创建</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 切换一个日志</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">#</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">pg_switch_wal</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">pg_switch_wal</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">---------------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">0/30000078</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看时间戳</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">#</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">current_timestamp</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">current_timestamp</span><span style="color:#24292E;">       </span></span>
<span class="line"><span style="color:#6F42C1;">-------------------------------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">2020-08-03</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">18</span><span style="color:#032F62;">:20:10.155438+08</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#创建基础备份：</span></span>
<span class="line"><span style="color:#6A737D;">#语法：</span></span>
<span class="line"><span style="color:#6F42C1;">pg_basebackup</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Ft</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Pv</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Xf</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-z</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">backupdi</span><span style="color:#24292E;">r</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Z5</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-h</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&lt;hostname&gt;&#39;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">por</span><span style="color:#24292E;">t</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-U</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">usernam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-W</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">backupdir-----&gt;导出的备份文件路径。系统会自动创建目录，但是如果该目录已经存在且不为空，则会报错</span></span>
<span class="line"><span style="color:#6F42C1;">-W</span><span style="color:#24292E;">       </span><span style="color:#005CC5;">-----</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">密码</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[postgres@pg01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]$ pg_basebackup -Ft -Pv -Xf -z -Z5 -p 5532 -D /data/pgdata/data/backup/</span></span>
<span class="line"><span style="color:#6F42C1;">pg_basebackup:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">initiating</span><span style="color:#24292E;"> </span><span style="color:#032F62;">base</span><span style="color:#24292E;"> </span><span style="color:#032F62;">backup,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">waiting</span><span style="color:#24292E;"> </span><span style="color:#032F62;">for</span><span style="color:#24292E;"> </span><span style="color:#032F62;">checkpoint</span><span style="color:#24292E;"> </span><span style="color:#032F62;">to</span><span style="color:#24292E;"> </span><span style="color:#032F62;">complete</span></span>
<span class="line"><span style="color:#6F42C1;">pg_basebackup:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">checkpoint</span><span style="color:#24292E;"> </span><span style="color:#032F62;">completed</span></span>
<span class="line"><span style="color:#6F42C1;">pg_basebackup:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">write-ahead</span><span style="color:#24292E;"> </span><span style="color:#032F62;">log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">point:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#032F62;">/2B000028</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;"> </span><span style="color:#032F62;">timeline</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#6F42C1;">103245/103245</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kB</span><span style="color:#24292E;"> (100%), 1/1 tablespace                                         </span></span>
<span class="line"><span style="color:#6F42C1;">pg_basebackup:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">write-ahead</span><span style="color:#24292E;"> </span><span style="color:#032F62;">log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">end</span><span style="color:#24292E;"> </span><span style="color:#032F62;">point:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#032F62;">/2B000100</span></span>
<span class="line"><span style="color:#6F42C1;">pg_basebackup:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">syncing</span><span style="color:#24292E;"> </span><span style="color:#032F62;">data</span><span style="color:#24292E;"> </span><span style="color:#032F62;">to</span><span style="color:#24292E;"> </span><span style="color:#032F62;">disk</span><span style="color:#24292E;"> </span><span style="color:#032F62;">...</span></span>
<span class="line"><span style="color:#6F42C1;">pg_basebackup:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">base</span><span style="color:#24292E;"> </span><span style="color:#032F62;">backup</span><span style="color:#24292E;"> </span><span style="color:#032F62;">completed</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#24292E;">[postgres@pg01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]$ ls  /data/pgdata/data/backup/</span></span>
<span class="line"><span style="color:#6F42C1;">base.tar.gz</span></span>
<span class="line"><span style="color:#6F42C1;">其中base是$pgdata目录的备份</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">2，移除故障的数据目录或者新建数据目录，在pg02</span></span>
<span class="line"><span style="color:#24292E;">[postgres@pg02 pgdata]$ mv data data_old</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">3,创建新的数据库目录</span></span>
<span class="line"><span style="color:#24292E;">[postgres@pg02 pgdata]$ mkdir data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[postgres@pg02 pgdata]$ chmod 700 data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#解压</span></span>
<span class="line"><span style="color:#24292E;">[postgres@pg02 pgdata]$ tar zxvf base.tar.gz  -C  data/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#修改postgresql.auto.conf，默认这个文件是空</span></span>
<span class="line"><span style="color:#24292E;">[postgres@pg02 data]$ cat postgresql.auto.conf </span></span>
<span class="line"><span style="color:#6A737D;"># Do not edit this file manually!</span></span>
<span class="line"><span style="color:#6A737D;"># It will be overwritten by the ALTER SYSTEM command.</span></span>
<span class="line"><span style="color:#6A737D;">#添加以下两行</span></span>
<span class="line"><span style="color:#6F42C1;">restore_command</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;cp /data/pgdata/archive/%f %p &gt; /data/pgdata/archive/recovery.log 2&gt;&amp;1&#39;</span></span>
<span class="line"><span style="color:#6F42C1;">recovery_target_time</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39; 2020-08-03 17:39:38.928572+08&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#启动</span></span>
<span class="line"><span style="color:#24292E;">[root@pg02 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# systemctl start postgresql</span></span></code></pre></div><h2 id="恢复到最新" tabindex="-1">--恢复到最新 <a class="header-anchor" href="#恢复到最新" aria-label="Permalink to &quot;--恢复到最新&quot;">​</a></h2><p>recovery_target_timeline = &#39;latest&#39;</p><h2 id="恢复到指定的时间点" tabindex="-1">--恢复到指定的时间点 <a class="header-anchor" href="#恢复到指定的时间点" aria-label="Permalink to &quot;--恢复到指定的时间点&quot;">​</a></h2><p>recovery_target_time = &#39; 2020-08-03 17:39:38.928572+08&#39;</p><h2 id="创建还原点" tabindex="-1">--创建还原点 <a class="header-anchor" href="#创建还原点" aria-label="Permalink to &quot;--创建还原点&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> pg_create_restore_point(</span><span style="color:#9ECBFF;">&#39;restore_point1&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_create_restore_point </span></span>
<span class="line"><span style="color:#6A737D;">-------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">2E000140</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> pg_create_restore_point(</span><span style="color:#032F62;">&#39;restore_point1&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;"> pg_create_restore_point </span></span>
<span class="line"><span style="color:#6A737D;">-------------------------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">2E000140</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span></code></pre></div><h2 id="恢复到还原点" tabindex="-1">--恢复到还原点 <a class="header-anchor" href="#恢复到还原点" aria-label="Permalink to &quot;--恢复到还原点&quot;">​</a></h2><p>recovery_target_timeline = &#39;restore_point1&#39;</p><h1 id="_2-热备份" tabindex="-1">2.热备份 <a class="header-anchor" href="#_2-热备份" aria-label="Permalink to &quot;2.热备份&quot;">​</a></h1><p>pg12</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1#</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_start_backup(&#39;hot_back&#39;) ;</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_start_backup </span></span>
<span class="line"><span style="color:#e1e4e8;">-----------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 0/A000028</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2#cp</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zcvf \${PG_HOME}/pg_hotbackup_$DATE.tar.gz $PG_DATA</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3#stop</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_stop_backup() ;</span></span>
<span class="line"><span style="color:#e1e4e8;">NOTICE:  all required WAL segments have been archived</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_stop_backup </span></span>
<span class="line"><span style="color:#e1e4e8;">----------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 0/B000050</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">4#重新生成wal</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_switch_wal() ;</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_switch_wal </span></span>
<span class="line"><span style="color:#e1e4e8;">---------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 0/C000078</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">5#查看当前wal</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_current_wal_lsn();</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_current_wal_lsn </span></span>
<span class="line"><span style="color:#e1e4e8;">--------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 0/D000060</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1#</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_start_backup(&#39;hot_back&#39;) ;</span></span>
<span class="line"><span style="color:#24292e;"> pg_start_backup </span></span>
<span class="line"><span style="color:#24292e;">-----------------</span></span>
<span class="line"><span style="color:#24292e;"> 0/A000028</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2#cp</span></span>
<span class="line"><span style="color:#24292e;">tar zcvf \${PG_HOME}/pg_hotbackup_$DATE.tar.gz $PG_DATA</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3#stop</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_stop_backup() ;</span></span>
<span class="line"><span style="color:#24292e;">NOTICE:  all required WAL segments have been archived</span></span>
<span class="line"><span style="color:#24292e;"> pg_stop_backup </span></span>
<span class="line"><span style="color:#24292e;">----------------</span></span>
<span class="line"><span style="color:#24292e;"> 0/B000050</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">4#重新生成wal</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_switch_wal() ;</span></span>
<span class="line"><span style="color:#24292e;"> pg_switch_wal </span></span>
<span class="line"><span style="color:#24292e;">---------------</span></span>
<span class="line"><span style="color:#24292e;"> 0/C000078</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">5#查看当前wal</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_current_wal_lsn();</span></span>
<span class="line"><span style="color:#24292e;"> pg_current_wal_lsn </span></span>
<span class="line"><span style="color:#24292e;">--------------------</span></span>
<span class="line"><span style="color:#24292e;"> 0/D000060</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div><p><a href="https://www.cnblogs.com/star521/p/15076941.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/star521/p/15076941.html</a></p>`,21),e=[o];function c(t,r,y,E,i,F){return a(),n("div",null,e)}const d=s(l,[["render",c]]);export{_ as __pageData,d as default};
