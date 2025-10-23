import{_ as s,o as e,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const R=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Logs/Clickhouse/cluster/1-install.md","filePath":"guide/Linux/Logs/Clickhouse/cluster/1-install.md","lastUpdated":1731405995000}'),l={name:"guide/Linux/Logs/Clickhouse/cluster/1-install.md"},p=a(`<p><a href="https://cloud.tencent.com/developer/article/2410028" target="_blank" rel="noreferrer">https://cloud.tencent.com/developer/article/2410028</a></p><p><a href="https://www.modb.pro/topic/659277" target="_blank" rel="noreferrer">https://www.modb.pro/topic/659277</a></p><p><a href="https://blog.ikeno.top/posts/clickhouse_cluster_install/" target="_blank" rel="noreferrer">https://blog.ikeno.top/posts/clickhouse_cluster_install/</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- CREATE USER tklbidev</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE USER tklbidev IDENTIFIED BY &#39;old_password&#39; ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- ALTER USER tklbidev</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER USER tklbidev IDENTIFIED BY &#39;new_password&#39; ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- Create Database</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE DATABASE bigscreen ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- Grant Cluster Usage Permission</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT REMOTE ON *.* TO tklbidev ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- Grant Permissions</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT CREATE TABLE, DROP TABLE, TRUNCATE ON bigscreen.* TO tklbidev ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT INSERT, DELETE, ALTER, SELECT ON bigscreen.* TO tklbidev ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- REVOKE Permissions</span></span>
<span class="line"><span style="color:#e1e4e8;">REVOKE CREATE DATABASE, DROP TABLE ON CHAOTI.* FROM psmuserdev ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- Check Perssions</span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW GRANTS FOR tklbidev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- CREATE USER tklbidev</span></span>
<span class="line"><span style="color:#24292e;">CREATE USER tklbidev IDENTIFIED BY &#39;old_password&#39; ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- ALTER USER tklbidev</span></span>
<span class="line"><span style="color:#24292e;">ALTER USER tklbidev IDENTIFIED BY &#39;new_password&#39; ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- Create Database</span></span>
<span class="line"><span style="color:#24292e;">CREATE DATABASE bigscreen ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- Grant Cluster Usage Permission</span></span>
<span class="line"><span style="color:#24292e;">GRANT REMOTE ON *.* TO tklbidev ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- Grant Permissions</span></span>
<span class="line"><span style="color:#24292e;">GRANT CREATE TABLE, DROP TABLE, TRUNCATE ON bigscreen.* TO tklbidev ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#24292e;">GRANT INSERT, DELETE, ALTER, SELECT ON bigscreen.* TO tklbidev ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- REVOKE Permissions</span></span>
<span class="line"><span style="color:#24292e;">REVOKE CREATE DATABASE, DROP TABLE ON CHAOTI.* FROM psmuserdev ON CLUSTER production_cluster_3s2r;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- Check Perssions</span></span>
<span class="line"><span style="color:#24292e;">SHOW GRANTS FOR tklbidev</span></span></code></pre></div>`,4),o=[p];function t(c,r,i,E,T,d){return e(),n("div",null,o)}const u=s(l,[["render",t]]);export{R as __pageData,u as default};
