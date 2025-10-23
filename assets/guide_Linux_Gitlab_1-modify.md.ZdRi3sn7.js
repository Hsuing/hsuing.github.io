import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1. gitlab域名修改","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Gitlab/1-modify.md","filePath":"guide/Linux/Gitlab/1-modify.md","lastUpdated":1726727909000}'),l={name:"guide/Linux/Gitlab/1-modify.md"},p=e(`<h1 id="_1-gitlab域名修改" tabindex="-1">1. gitlab域名修改 <a class="header-anchor" href="#_1-gitlab域名修改" aria-label="Permalink to &quot;1. gitlab域名修改&quot;">​</a></h1><h2 id="_1-1-修改gitlab配置文件中host" tabindex="-1">1.1 修改gitlab配置文件中host <a class="header-anchor" href="#_1-1-修改gitlab配置文件中host" aria-label="Permalink to &quot;1.1 修改gitlab配置文件中host&quot;">​</a></h2><p>vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">gitlab:¬</span></span>
<span class="line"><span style="color:#e1e4e8;">    ## Web server settings (note: host is the FQDN, do not include http://)¬</span></span>
<span class="line"><span style="color:#e1e4e8;">     host: xxxxxxx.cn// 原域名</span></span>
<span class="line"><span style="color:#e1e4e8;">     port: 81</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">gitlab:¬</span></span>
<span class="line"><span style="color:#24292e;">    ## Web server settings (note: host is the FQDN, do not include http://)¬</span></span>
<span class="line"><span style="color:#24292e;">     host: xxxxxxx.cn// 原域名</span></span>
<span class="line"><span style="color:#24292e;">     port: 81</span></span></code></pre></div><h2 id="_1-2-修改nginx中gitlab配置文件" tabindex="-1">1.2 修改nginx中gitlab配置文件 <a class="header-anchor" href="#_1-2-修改nginx中gitlab配置文件" aria-label="Permalink to &quot;1.2 修改nginx中gitlab配置文件&quot;">​</a></h2><p>vi ~git/nginx/conf/gitlab-http.conf</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">  listen *:81;</span></span>
<span class="line"><span style="color:#e1e4e8;">  server_name xxxxxxx.cn;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ...</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">  listen *:81;</span></span>
<span class="line"><span style="color:#24292e;">  server_name xxxxxxx.cn;</span></span>
<span class="line"><span style="color:#24292e;">    ...</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><h2 id="_1-3-重启nginx和gitlab" tabindex="-1">1.3 重启nginx和gitlab <a class="header-anchor" href="#_1-3-重启nginx和gitlab" aria-label="Permalink to &quot;1.3 重启nginx和gitlab&quot;">​</a></h2><p>sudo gitlab-ctl restart</p><h2 id="_1-4-修改项目中gitlab-runner地址" tabindex="-1">1.4 修改项目中gitlab-runner地址 <a class="header-anchor" href="#_1-4-修改项目中gitlab-runner地址" aria-label="Permalink to &quot;1.4 修改项目中gitlab-runner地址&quot;">​</a></h2><p>vi /etc/gitlab-runner/config.toml</p><p>gitlab-runner restart</p><h1 id="_2-修改密码" tabindex="-1">2. 修改密码 <a class="header-anchor" href="#_2-修改密码" aria-label="Permalink to &quot;2. 修改密码&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">sudo gitlab-rails console production</span></span>
<span class="line"><span style="color:#e1e4e8;">-------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> GitLab:       11.1.4 (63daf37)</span></span>
<span class="line"><span style="color:#e1e4e8;"> GitLab Shell: 7.1.4</span></span>
<span class="line"><span style="color:#e1e4e8;"> postgresql:   9.6.8</span></span>
<span class="line"><span style="color:#e1e4e8;">-------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">Loading production environment (Rails 4.2.10)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">irb(main):001:0&gt; u=User.where(id:1).first</span></span>
<span class="line"><span style="color:#e1e4e8;">=&gt; #&lt;User id:1 @root&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">irb(main):002:0&gt; u.password=&#39;123456&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">=&gt; &quot;123456&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">irb(main):003:0&gt; u.password_confirmation=&#39;123456&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">=&gt; &quot;123456&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">irb(main):004:0&gt; u.save!</span></span>
<span class="line"><span style="color:#e1e4e8;">Enqueued ActionMailer::DeliveryJob (Job ID: 7bffac81-aab5-4d3a-b771-bdffb4145020) to Sidekiq(mailers) with arguments: &quot;DeviseMailer&quot;, &quot;password_change&quot;, &quot;deliver_now&quot;, gid://gitlab/User/1</span></span>
<span class="line"><span style="color:#e1e4e8;">=&gt; true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">irb(main):005:0&gt; exit</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">sudo gitlab-rails console production</span></span>
<span class="line"><span style="color:#24292e;">-------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> GitLab:       11.1.4 (63daf37)</span></span>
<span class="line"><span style="color:#24292e;"> GitLab Shell: 7.1.4</span></span>
<span class="line"><span style="color:#24292e;"> postgresql:   9.6.8</span></span>
<span class="line"><span style="color:#24292e;">-------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292e;">Loading production environment (Rails 4.2.10)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">irb(main):001:0&gt; u=User.where(id:1).first</span></span>
<span class="line"><span style="color:#24292e;">=&gt; #&lt;User id:1 @root&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">irb(main):002:0&gt; u.password=&#39;123456&#39;</span></span>
<span class="line"><span style="color:#24292e;">=&gt; &quot;123456&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">irb(main):003:0&gt; u.password_confirmation=&#39;123456&#39;</span></span>
<span class="line"><span style="color:#24292e;">=&gt; &quot;123456&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">irb(main):004:0&gt; u.save!</span></span>
<span class="line"><span style="color:#24292e;">Enqueued ActionMailer::DeliveryJob (Job ID: 7bffac81-aab5-4d3a-b771-bdffb4145020) to Sidekiq(mailers) with arguments: &quot;DeviseMailer&quot;, &quot;password_change&quot;, &quot;deliver_now&quot;, gid://gitlab/User/1</span></span>
<span class="line"><span style="color:#24292e;">=&gt; true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">irb(main):005:0&gt; exit</span></span></code></pre></div>`,14),t=[p];function o(i,c,r,d,g,b){return a(),n("div",null,t)}const y=s(l,[["render",o]]);export{h as __pageData,y as default};
