import{_ as e,c as t,o as a,R as r}from"./chunks/framework.CIzs38F0.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/cluster/index.md","filePath":"guide/Database/pgSql/cluster/index.md","lastUpdated":1711535325000}'),p={name:"guide/Database/pgSql/cluster/index.md"},l=r('<h3 id="流复制的原理" tabindex="-1">流复制的原理： <a class="header-anchor" href="#流复制的原理" aria-label="Permalink to &quot;流复制的原理：&quot;">​</a></h3><p>物理复制也叫流复制，流复制的原理是主库把WAL发送给备库，备库接收WAL后，进行重放</p><h3 id="逻辑复制的原理" tabindex="-1">逻辑复制的原理： <a class="header-anchor" href="#逻辑复制的原理" aria-label="Permalink to &quot;逻辑复制的原理：&quot;">​</a></h3><p>逻辑复制也是基于WAL文件，在逻辑复制中把主库称为源端库，备库称为目标端数据库，源端数据库根据预先指定好的逻辑解析规则对WAL文件进行解析，把DML操作解析成一定的逻辑变化信息（标准SQL语句），源端数据库把标准SQL语句发给目标端数据库，目标端数据库接收到之后进行应用，从而实现数据同步</p><h3 id="流复制和逻辑复制的区别" tabindex="-1">流复制和逻辑复制的区别： <a class="header-anchor" href="#流复制和逻辑复制的区别" aria-label="Permalink to &quot;流复制和逻辑复制的区别：&quot;">​</a></h3><p>流复制主库上的事务提交不需要等待备库接收到WAL文件后的确认，逻辑复制相反。</p><p>流复制要求主备库的大版本一致，逻辑复制可以跨大版本的数据同步，也可以实现异构数据库的数据同步。</p><p>流复制的主库可读写，从库只允许读，逻辑复制的目标端数据库要求可读写</p><p>流复制是对实例级别的复制（整个postgresql数据库），逻辑复制是选择性的复制一些表，所以是对表级别的复制。</p><p>流复制有主库的DDL、DML操作，逻辑复制只有DML操作</p><p><a href="https://www.cnblogs.com/applerosa/p/13160566.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/applerosa/p/13160566.html</a></p><p>#高可用性</p><p><a href="https://postgres.fun/categories/PG%E9%AB%98%E5%8F%AF%E7%94%A8%E6%80%A7/" target="_blank" rel="noreferrer">https://postgres.fun/categories/PG高可用性/</a></p><p><a href="https://blog.csdn.net/ctypyb2002/article/details/118342721?spm=1001.2014.3001.5501" target="_blank" rel="noreferrer">https://blog.csdn.net/ctypyb2002/article/details/118342721?spm=1001.2014.3001.5501</a></p><p>keepalived</p><p><a href="https://blog.csdn.net/ywd1992/article/details/104754086" target="_blank" rel="noreferrer">https://blog.csdn.net/ywd1992/article/details/104754086</a></p><p><a href="https://www.modb.pro/db/75268" target="_blank" rel="noreferrer">https://www.modb.pro/db/75268</a></p><p>--with-segsize=10 --with-blocksize=16 \\ --with-wal-blocksize=16 \\ --with-libedit-preferred</p><p>$ initdb -D /var/lib/pgsql/11/data \\ --wal-segsize=64</p><p>pg_monitor</p><p><a href="https://blog.csdn.net/ctypyb2002/article/details/117325019?spm=1001.2014.3001.5501" target="_blank" rel="noreferrer">https://blog.csdn.net/ctypyb2002/article/details/117325019?spm=1001.2014.3001.5501</a></p><p><a href="https://cloud.tencent.com/developer/article/1785162?from=article.detail.1688964" target="_blank" rel="noreferrer">https://cloud.tencent.com/developer/article/1785162?from=article.detail.1688964</a></p>',22),s=[l];function o(i,n,c,d,h,b){return a(),t("div",null,s)}const f=e(p,[["render",o]]);export{g as __pageData,f as default};