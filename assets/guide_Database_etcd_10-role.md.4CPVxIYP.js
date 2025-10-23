import{_ as s,o as e,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/etcd/10-role.md","filePath":"guide/Database/etcd/10-role.md","lastUpdated":1703141608000}'),l={name:"guide/Database/etcd/10-role.md"},p=a(`<p>etcd 默认没有开启访问控制。 在生产环境中使用属于裸奔。</p><p>开启访问控制有两种方式</p><ul><li>密钥证书验证</li><li>用户名密码验证</li></ul><h2 id="用户" tabindex="-1">用户 <a class="header-anchor" href="#用户" aria-label="Permalink to &quot;用户&quot;">​</a></h2><p>开启访问认证需要创建root 用户，root 用户默认自动拥有root角色的权限，及超级管理员</p><h2 id="完整添加普通用户权限的步骤" tabindex="-1">完整添加普通用户权限的步骤: <a class="header-anchor" href="#完整添加普通用户权限的步骤" aria-label="Permalink to &quot;完整添加普通用户权限的步骤:&quot;">​</a></h2><ol><li>添加角色 role</li><li>给角色授权 role grant-permission</li><li>添加用户 user</li><li>给用户授予角色权限 user grant-role</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#1. 添加角色 role</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl --user root role add xinweiblog</span></span>
<span class="line"><span style="color:#e1e4e8;">#或则 etcdctl --user root --password (root密码) role add xinweiblog</span></span>
<span class="line"><span style="color:#e1e4e8;">#或则 etcdctl --user root:(root密码) role add xinweiblog</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#2. 给角色授权 role grant-permission</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl --user root role grant-permission xinweiblog --prefix=true readwrite /xinweiblog</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#3. 添加用户 user</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl --user root user add xinwei</span></span>
<span class="line"><span style="color:#e1e4e8;">(设置密码)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#4. 给用户授予角色权限 user grant-role</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl --user root user grant-role xinwei xinweiblog</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#1. 添加角色 role</span></span>
<span class="line"><span style="color:#24292e;">etcdctl --user root role add xinweiblog</span></span>
<span class="line"><span style="color:#24292e;">#或则 etcdctl --user root --password (root密码) role add xinweiblog</span></span>
<span class="line"><span style="color:#24292e;">#或则 etcdctl --user root:(root密码) role add xinweiblog</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#2. 给角色授权 role grant-permission</span></span>
<span class="line"><span style="color:#24292e;">etcdctl --user root role grant-permission xinweiblog --prefix=true readwrite /xinweiblog</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#3. 添加用户 user</span></span>
<span class="line"><span style="color:#24292e;">etcdctl --user root user add xinwei</span></span>
<span class="line"><span style="color:#24292e;">(设置密码)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#4. 给用户授予角色权限 user grant-role</span></span>
<span class="line"><span style="color:#24292e;">etcdctl --user root user grant-role xinwei xinweiblog</span></span></code></pre></div><h2 id="角色" tabindex="-1">角色 <a class="header-anchor" href="#角色" aria-label="Permalink to &quot;角色&quot;">​</a></h2><p>角色理解为指定权限的集合，权限包括 read 、write、 readwrite</p><p>角色用于对访问权限的管理控制。</p><p>系统默认拥有角色root 、guest。</p><p>系统通过授权用户不同权限的角色，实现对用户的访问控制</p><h3 id="用户管理" tabindex="-1">用户管理 <a class="header-anchor" href="#用户管理" aria-label="Permalink to &quot;用户管理&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> etcdctl user --help</span></span>
<span class="line"><span style="color:#e1e4e8;">NAME:</span></span>
<span class="line"><span style="color:#e1e4e8;">   etcdctl user - user add, grant and revoke subcommands</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">USAGE:</span></span>
<span class="line"><span style="color:#e1e4e8;">   etcdctl user command [command options] [arguments...]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">COMMANDS:</span></span>
<span class="line"><span style="color:#e1e4e8;">     add     add a new user for the etcd cluster</span></span>
<span class="line"><span style="color:#e1e4e8;">     get     get details for a user</span></span>
<span class="line"><span style="color:#e1e4e8;">     list    list all current users</span></span>
<span class="line"><span style="color:#e1e4e8;">     remove  remove a user for the etcd cluster</span></span>
<span class="line"><span style="color:#e1e4e8;">     grant   grant roles to an etcd user</span></span>
<span class="line"><span style="color:#e1e4e8;">     revoke  revoke roles for an etcd user</span></span>
<span class="line"><span style="color:#e1e4e8;">     passwd  change password for a user</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">   --help, -h  show help</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> etcdctl user --help</span></span>
<span class="line"><span style="color:#24292e;">NAME:</span></span>
<span class="line"><span style="color:#24292e;">   etcdctl user - user add, grant and revoke subcommands</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">USAGE:</span></span>
<span class="line"><span style="color:#24292e;">   etcdctl user command [command options] [arguments...]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">COMMANDS:</span></span>
<span class="line"><span style="color:#24292e;">     add     add a new user for the etcd cluster</span></span>
<span class="line"><span style="color:#24292e;">     get     get details for a user</span></span>
<span class="line"><span style="color:#24292e;">     list    list all current users</span></span>
<span class="line"><span style="color:#24292e;">     remove  remove a user for the etcd cluster</span></span>
<span class="line"><span style="color:#24292e;">     grant   grant roles to an etcd user</span></span>
<span class="line"><span style="color:#24292e;">     revoke  revoke roles for an etcd user</span></span>
<span class="line"><span style="color:#24292e;">     passwd  change password for a user</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">   --help, -h  show help</span></span></code></pre></div><h3 id="角色管理" tabindex="-1">角色管理 <a class="header-anchor" href="#角色管理" aria-label="Permalink to &quot;角色管理&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">etcdctl role --help</span></span>
<span class="line"><span style="color:#e1e4e8;">NAME:</span></span>
<span class="line"><span style="color:#e1e4e8;">   etcdctl role - role add, grant and revoke subcommands</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">USAGE:</span></span>
<span class="line"><span style="color:#e1e4e8;">   etcdctl role command [command options] [arguments...]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">COMMANDS:</span></span>
<span class="line"><span style="color:#e1e4e8;">     add     add a new role for the etcd cluster</span></span>
<span class="line"><span style="color:#e1e4e8;">     get     get details for a role</span></span>
<span class="line"><span style="color:#e1e4e8;">     list    list all roles</span></span>
<span class="line"><span style="color:#e1e4e8;">     remove  remove a role from the etcd cluster</span></span>
<span class="line"><span style="color:#e1e4e8;">     grant   grant path matches to an etcd role</span></span>
<span class="line"><span style="color:#e1e4e8;">     revoke  revoke path matches for an etcd role</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">   --help, -h  show help</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">etcdctl role --help</span></span>
<span class="line"><span style="color:#24292e;">NAME:</span></span>
<span class="line"><span style="color:#24292e;">   etcdctl role - role add, grant and revoke subcommands</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">USAGE:</span></span>
<span class="line"><span style="color:#24292e;">   etcdctl role command [command options] [arguments...]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">COMMANDS:</span></span>
<span class="line"><span style="color:#24292e;">     add     add a new role for the etcd cluster</span></span>
<span class="line"><span style="color:#24292e;">     get     get details for a role</span></span>
<span class="line"><span style="color:#24292e;">     list    list all roles</span></span>
<span class="line"><span style="color:#24292e;">     remove  remove a role from the etcd cluster</span></span>
<span class="line"><span style="color:#24292e;">     grant   grant path matches to an etcd role</span></span>
<span class="line"><span style="color:#24292e;">     revoke  revoke path matches for an etcd role</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">   --help, -h  show help</span></span></code></pre></div><h2 id="一个例子" tabindex="-1">一个例子 <a class="header-anchor" href="#一个例子" aria-label="Permalink to &quot;一个例子&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- 创建测试目录</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl mkdir /service001</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 添加角色</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl role add r001</span></span>
<span class="line"><span style="color:#e1e4e8;">Role r001 created</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 角色设置权限</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl role grant --path /service001/* --rw r001</span></span>
<span class="line"><span style="color:#e1e4e8;">Role r001 updated</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 添加用户</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl  user add u001</span></span>
<span class="line"><span style="color:#e1e4e8;">New password: </span></span>
<span class="line"><span style="color:#e1e4e8;">User u001 created</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 用户绑定角色</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl  user grant --roles r001 u001</span></span>
<span class="line"><span style="color:#e1e4e8;">User u001 updated</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 查看用户角色</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl  user get u001</span></span>
<span class="line"><span style="color:#e1e4e8;">User: u001</span></span>
<span class="line"><span style="color:#e1e4e8;">Roles:  r001</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 查看角色权限</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl role get r001</span></span>
<span class="line"><span style="color:#e1e4e8;">Role: r001</span></span>
<span class="line"><span style="color:#e1e4e8;">KV Read:</span></span>
<span class="line"><span style="color:#e1e4e8;">	/service001/*</span></span>
<span class="line"><span style="color:#e1e4e8;">KV Write:</span></span>
<span class="line"><span style="color:#e1e4e8;">	/service001/*</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- 创建测试目录</span></span>
<span class="line"><span style="color:#24292e;">etcdctl mkdir /service001</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 添加角色</span></span>
<span class="line"><span style="color:#24292e;">etcdctl role add r001</span></span>
<span class="line"><span style="color:#24292e;">Role r001 created</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 角色设置权限</span></span>
<span class="line"><span style="color:#24292e;">etcdctl role grant --path /service001/* --rw r001</span></span>
<span class="line"><span style="color:#24292e;">Role r001 updated</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 添加用户</span></span>
<span class="line"><span style="color:#24292e;">etcdctl  user add u001</span></span>
<span class="line"><span style="color:#24292e;">New password: </span></span>
<span class="line"><span style="color:#24292e;">User u001 created</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 用户绑定角色</span></span>
<span class="line"><span style="color:#24292e;">etcdctl  user grant --roles r001 u001</span></span>
<span class="line"><span style="color:#24292e;">User u001 updated</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 查看用户角色</span></span>
<span class="line"><span style="color:#24292e;">etcdctl  user get u001</span></span>
<span class="line"><span style="color:#24292e;">User: u001</span></span>
<span class="line"><span style="color:#24292e;">Roles:  r001</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 查看角色权限</span></span>
<span class="line"><span style="color:#24292e;">etcdctl role get r001</span></span>
<span class="line"><span style="color:#24292e;">Role: r001</span></span>
<span class="line"><span style="color:#24292e;">KV Read:</span></span>
<span class="line"><span style="color:#24292e;">	/service001/*</span></span>
<span class="line"><span style="color:#24292e;">KV Write:</span></span>
<span class="line"><span style="color:#24292e;">	/service001/*</span></span></code></pre></div><h2 id="开启认证访问" tabindex="-1">开启认证访问 <a class="header-anchor" href="#开启认证访问" aria-label="Permalink to &quot;开启认证访问&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- 开启认证需要系统拥有root用户，创建root用户会自动关联root角色</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl user add root </span></span>
<span class="line"><span style="color:#e1e4e8;">New password: </span></span>
<span class="line"><span style="color:#e1e4e8;">User root created</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 开启认证模式</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl auth enable</span></span>
<span class="line"><span style="color:#e1e4e8;">Authentication Enabled</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 无认证仍然可访问。。。</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl ls /service001</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- 开启认证需要系统拥有root用户，创建root用户会自动关联root角色</span></span>
<span class="line"><span style="color:#24292e;">etcdctl user add root </span></span>
<span class="line"><span style="color:#24292e;">New password: </span></span>
<span class="line"><span style="color:#24292e;">User root created</span></span>
<span class="line"><span style="color:#24292e;">-- 开启认证模式</span></span>
<span class="line"><span style="color:#24292e;">etcdctl auth enable</span></span>
<span class="line"><span style="color:#24292e;">Authentication Enabled</span></span>
<span class="line"><span style="color:#24292e;">-- 无认证仍然可访问。。。</span></span>
<span class="line"><span style="color:#24292e;">etcdctl ls /service001</span></span></code></pre></div><h2 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h2><p>因为在 Etcd 开启 Basic Auth 之后，默认会启用两个角色 root 和 guest， root 和 guest 角色都拥有所有权限，</p><p>当我们未指定身份的时候其实是通过 guest 角色进行的操作，这里需要注意的是两个角色都不要删除，否则你可能会遇到意想不到的Bug，既然无法删除，</p><p>那么为们可以通过收回权限的方式对 guest 的权限进行限制</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- 使用root用户回收guest角色的所有权限</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl --username root role revoke guest --path=/* --readwrite</span></span>
<span class="line"><span style="color:#e1e4e8;">Password: </span></span>
<span class="line"><span style="color:#e1e4e8;">Role guest updated</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 查看guest角色权限</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl --username root role  get guest</span></span>
<span class="line"><span style="color:#e1e4e8;">Password: </span></span>
<span class="line"><span style="color:#e1e4e8;">Role: guest</span></span>
<span class="line"><span style="color:#e1e4e8;">KV Read:</span></span>
<span class="line"><span style="color:#e1e4e8;">KV Write:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 无认禁止证访问</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl get /service001/a</span></span>
<span class="line"><span style="color:#e1e4e8;">Error:  110: The request requires user authentication (Insufficient credentials) [0]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 使用认证访问 用户名 u001 密码 123456</span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl --username u001:123456 set /service001/a 1</span></span>
<span class="line"><span style="color:#e1e4e8;">1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl --username u001:123456 get /service001/a</span></span>
<span class="line"><span style="color:#e1e4e8;">2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- 使用root用户回收guest角色的所有权限</span></span>
<span class="line"><span style="color:#24292e;">etcdctl --username root role revoke guest --path=/* --readwrite</span></span>
<span class="line"><span style="color:#24292e;">Password: </span></span>
<span class="line"><span style="color:#24292e;">Role guest updated</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 查看guest角色权限</span></span>
<span class="line"><span style="color:#24292e;">etcdctl --username root role  get guest</span></span>
<span class="line"><span style="color:#24292e;">Password: </span></span>
<span class="line"><span style="color:#24292e;">Role: guest</span></span>
<span class="line"><span style="color:#24292e;">KV Read:</span></span>
<span class="line"><span style="color:#24292e;">KV Write:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 无认禁止证访问</span></span>
<span class="line"><span style="color:#24292e;">etcdctl get /service001/a</span></span>
<span class="line"><span style="color:#24292e;">Error:  110: The request requires user authentication (Insufficient credentials) [0]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 使用认证访问 用户名 u001 密码 123456</span></span>
<span class="line"><span style="color:#24292e;">etcdctl --username u001:123456 set /service001/a 1</span></span>
<span class="line"><span style="color:#24292e;">1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">etcdctl --username u001:123456 get /service001/a</span></span>
<span class="line"><span style="color:#24292e;">2</span></span></code></pre></div><p><a href="https://blog.csdn.net/IT_DREAM_ER/article/details/107470959" target="_blank" rel="noreferrer">https://blog.csdn.net/IT_DREAM_ER/article/details/107470959</a></p><p><a href="https://blog.csdn.net/qq522044637/article/details/118867408" target="_blank" rel="noreferrer">https://blog.csdn.net/qq522044637/article/details/118867408</a></p><p><a href="https://learnku.com/articles/48770" target="_blank" rel="noreferrer">https://learnku.com/articles/48770</a></p><p><a href="https://www.cnblogs.com/Alayman/p/15770343.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/Alayman/p/15770343.html</a></p><p><a href="https://www.anquanke.com/post/id/236831" target="_blank" rel="noreferrer">https://www.anquanke.com/post/id/236831</a></p><p><a href="https://www.imooc.com/article/76463" target="_blank" rel="noreferrer">https://www.imooc.com/article/76463</a></p><p><a href="https://codeantenna.com/a/YbfEfh2FNz" target="_blank" rel="noreferrer">https://codeantenna.com/a/YbfEfh2FNz</a></p><p><a href="https://www.huweihuang.com/kubernetes-notes/etcd/etcd-auth-and-security.html" target="_blank" rel="noreferrer">https://www.huweihuang.com/kubernetes-notes/etcd/etcd-auth-and-security.html</a></p>`,34),o=[p];function t(c,r,i,d,y,u){return e(),n("div",null,o)}const m=s(l,[["render",t]]);export{g as __pageData,m as default};
