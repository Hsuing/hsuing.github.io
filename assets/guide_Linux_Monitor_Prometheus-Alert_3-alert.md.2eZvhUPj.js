import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"1. 钉钉告警模板","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Monitor/Prometheus-Alert/3-alert.md","filePath":"guide/Linux/Monitor/Prometheus-Alert/3-alert.md","lastUpdated":1734265147000}'),e={name:"guide/Linux/Monitor/Prometheus-Alert/3-alert.md"},t=l(`<h1 id="_1-钉钉告警模板" tabindex="-1">1. 钉钉告警模板 <a class="header-anchor" href="#_1-钉钉告警模板" aria-label="Permalink to &quot;1. 钉钉告警模板&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{{ $var := .externalURL}}{{ $status := .status}}{{ range $k,$v:=.alerts }} {{if eq $status &quot;resolved&quot;}}</span></span>
<span class="line"><span style="color:#e1e4e8;">## [告警恢复-通知]({{$var}})</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 监控指标: {{$v.labels.alertname}}</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ if eq $v.labels.severity &quot;warning&quot; }}</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 告警级别: **&lt;font color=&quot;#E6A23C&quot;&gt;{{$v.labels.severity}}&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ else if eq $v.labels.severity &quot;critical&quot;  }}</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 告警级别: **&lt;font color=&quot;#F56C6C&quot;&gt;{{$v.labels.severity}}&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ end }}</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 当前状态: **&lt;font color=&quot;#67C23A&quot; size=4&gt;已恢复&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 故障主机: {{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#e1e4e8;">* ###### 告警阈值: {{$v.labels.threshold}}</span></span>
<span class="line"><span style="color:#e1e4e8;">* ###### 开始时间: {{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#e1e4e8;">* ###### 恢复时间: {{GetCSTtime $v.endsAt}}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#### 告警恢复: &lt;font color=&quot;#67C23A&quot;&gt;已恢复,{{$v.annotations.description}}&lt;/font&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ else }}</span></span>
<span class="line"><span style="color:#e1e4e8;">## [监控告警-通知]({{$var}})</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 监控指标: {{$v.labels.alertname}}</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ if eq $v.labels.severity &quot;warning&quot; }}</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 告警级别: **&lt;font color=&quot;#E6A23C&quot; size=4&gt;{{$v.labels.severity}}&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 当前状态: **&lt;font color=&quot;#E6A23C&quot;&gt;需要处理&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ else if eq $v.labels.severity &quot;critical&quot;  }}</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 告警级别: **&lt;font color=&quot;#F56C6C&quot; size=4&gt;{{$v.labels.severity}}&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 当前状态: **&lt;font color=&quot;#F56C6C&quot;&gt;需要处理&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ end }}</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 故障主机: {{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#e1e4e8;">* ###### 告警阈值: {{$v.labels.threshold}}</span></span>
<span class="line"><span style="color:#e1e4e8;">* ###### 持续时间: {{$v.labels.for_time}}</span></span>
<span class="line"><span style="color:#e1e4e8;">* ###### 触发时间: {{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ if eq $v.labels.severity &quot;warning&quot; }}</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 告警触发: &lt;font color=&quot;#E6A23C&quot;&gt;{{$v.annotations.description}}&lt;/font&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ else if eq $v.labels.severity &quot;critical&quot; }}</span></span>
<span class="line"><span style="color:#e1e4e8;">#### 告警触发: &lt;font color=&quot;#F56C6C&quot;&gt;{{$v.annotations.description}}&lt;/font&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ end }}</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ end }}</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ end }}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{{ $var := .externalURL}}{{ $status := .status}}{{ range $k,$v:=.alerts }} {{if eq $status &quot;resolved&quot;}}</span></span>
<span class="line"><span style="color:#24292e;">## [告警恢复-通知]({{$var}})</span></span>
<span class="line"><span style="color:#24292e;">#### 监控指标: {{$v.labels.alertname}}</span></span>
<span class="line"><span style="color:#24292e;">{{ if eq $v.labels.severity &quot;warning&quot; }}</span></span>
<span class="line"><span style="color:#24292e;">#### 告警级别: **&lt;font color=&quot;#E6A23C&quot;&gt;{{$v.labels.severity}}&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#24292e;">{{ else if eq $v.labels.severity &quot;critical&quot;  }}</span></span>
<span class="line"><span style="color:#24292e;">#### 告警级别: **&lt;font color=&quot;#F56C6C&quot;&gt;{{$v.labels.severity}}&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#24292e;">{{ end }}</span></span>
<span class="line"><span style="color:#24292e;">#### 当前状态: **&lt;font color=&quot;#67C23A&quot; size=4&gt;已恢复&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#24292e;">#### 故障主机: {{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#24292e;">* ###### 告警阈值: {{$v.labels.threshold}}</span></span>
<span class="line"><span style="color:#24292e;">* ###### 开始时间: {{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#24292e;">* ###### 恢复时间: {{GetCSTtime $v.endsAt}}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#### 告警恢复: &lt;font color=&quot;#67C23A&quot;&gt;已恢复,{{$v.annotations.description}}&lt;/font&gt;</span></span>
<span class="line"><span style="color:#24292e;">{{ else }}</span></span>
<span class="line"><span style="color:#24292e;">## [监控告警-通知]({{$var}})</span></span>
<span class="line"><span style="color:#24292e;">#### 监控指标: {{$v.labels.alertname}}</span></span>
<span class="line"><span style="color:#24292e;">{{ if eq $v.labels.severity &quot;warning&quot; }}</span></span>
<span class="line"><span style="color:#24292e;">#### 告警级别: **&lt;font color=&quot;#E6A23C&quot; size=4&gt;{{$v.labels.severity}}&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#24292e;">#### 当前状态: **&lt;font color=&quot;#E6A23C&quot;&gt;需要处理&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#24292e;">{{ else if eq $v.labels.severity &quot;critical&quot;  }}</span></span>
<span class="line"><span style="color:#24292e;">#### 告警级别: **&lt;font color=&quot;#F56C6C&quot; size=4&gt;{{$v.labels.severity}}&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#24292e;">#### 当前状态: **&lt;font color=&quot;#F56C6C&quot;&gt;需要处理&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#24292e;">{{ end }}</span></span>
<span class="line"><span style="color:#24292e;">#### 故障主机: {{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#24292e;">* ###### 告警阈值: {{$v.labels.threshold}}</span></span>
<span class="line"><span style="color:#24292e;">* ###### 持续时间: {{$v.labels.for_time}}</span></span>
<span class="line"><span style="color:#24292e;">* ###### 触发时间: {{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#24292e;">{{ if eq $v.labels.severity &quot;warning&quot; }}</span></span>
<span class="line"><span style="color:#24292e;">#### 告警触发: &lt;font color=&quot;#E6A23C&quot;&gt;{{$v.annotations.description}}&lt;/font&gt;</span></span>
<span class="line"><span style="color:#24292e;">{{ else if eq $v.labels.severity &quot;critical&quot; }}</span></span>
<span class="line"><span style="color:#24292e;">#### 告警触发: &lt;font color=&quot;#F56C6C&quot;&gt;{{$v.annotations.description}}&lt;/font&gt;</span></span>
<span class="line"><span style="color:#24292e;">{{ end }}</span></span>
<span class="line"><span style="color:#24292e;">{{ end }}</span></span>
<span class="line"><span style="color:#24292e;">{{ end }}</span></span></code></pre></div><h1 id="_2-邮件报警模板" tabindex="-1">2. 邮件报警模板 <a class="header-anchor" href="#_2-邮件报警模板" aria-label="Permalink to &quot;2. 邮件报警模板&quot;">​</a></h1><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&lt;html&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;meta charset=&quot;utf-8&quot;&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;div style=&quot;position:relative;width:450px;height:auto;margin:0 auto;padding-bottom:5px;border:rgb(224, 221, 224) solid 1px;border-radius:10px&quot;&gt;    &lt;div style=&quot;background-image:url(https://cos.vlinux.cn/www-vlinux-cn-blog-img/gitee-backup/img-master/image/1-1.jpg);width:100%;height:300px;background-size:cover;background-repeat:no-repeat;border-radius:10px 10px 0px 0px&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;div style=&quot;width:40%;height:40px;background-color:rgb(231, 145, 145);margin-top:-20px;margin-left:20px;color:#fff;text-align:center;line-height:40px;border-radius:30px&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">亲爱的：运维同学！</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;div style=&quot;line-height:180%;padding:0 15px 12px;width:90%;margin:auto;margin-bottom:0px;font-size:12px&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&lt;div style=&quot;border-bottom:1px solid rgb(216, 213, 213);font-size:13px;margin:10px 0px;padding:10px 0px&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&lt;span style=&quot;color:#12ADDB;font-weight:bold&quot;&gt;&amp;gt;&amp;nbsp;&lt;/span&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&lt;span&gt;您有一条新的告警信息！&lt;/span&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&lt;a style=&quot;text-decoration:none;color:#12ADDB;font-weight:bold;&quot; href=&quot;{$comment-&gt;permalink}&quot; target=&quot;_blank&quot;&gt;{{ $var := .externalURL}}{{ range $k,$v:=.alerts }}</span></span>
<span class="line"><span style="color:#E1E4E8;">{{</span><span style="color:#9ECBFF;">if eq $v.status &quot;resolved&quot;</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h1&gt;&lt;a href ={{$v.generatorURL}}&gt;北青服务器告警信息&lt;/a&gt;&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h2&gt;&lt;a href ={{$var}}&gt;{{$v.labels.alertname}}&lt;/a&gt;&lt;/h2&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h5&gt;告警级别：{{$v.labels.level}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h5&gt;告警程度：{{$v.labels.severity}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h5&gt;开始时间：{{GetCSTtime $v.startsAt}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h5&gt;结束时间：{{GetCSTtime $v.endsAt}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h5&gt;故障主机IP：{{$v.labels.instance}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h3&gt;{{$v.annotations.recoverymessage}}&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">{{</span><span style="color:#9ECBFF;">else</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h1&gt;&lt;a href ={{$v.generatorURL}}&gt;北青服务器告警信息&lt;/a&gt;&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h2&gt;&lt;a href ={{$var}}&gt;{{$v.labels.alertname}}&lt;/a&gt;&lt;/h2&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h5&gt;告警级别：{{$v.labels.level}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h5&gt;告警程度：{{$v.labels.severity}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h5&gt;开始时间：{{GetCSTtime $v.startsAt}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h5&gt;故障主机IP：{{$v.labels.instance}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;h3&gt;{{$v.annotations.description}}&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">{{</span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">{{ </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;"> }}</span><span style="color:#9ECBFF;">&lt;/a&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;div</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">style=&quot;color:#8c8c8c;font-size:8px;width:93%;margin:auto;margin-top:-30px&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&lt;p style=&quot;padding:20px;&quot;&gt;                                 对生产环境要有一颗敬畏之心！&lt;/p&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;a style=&quot;text-decoration:none;background-color:rgb(155, 151, 221);color:#FFF;width:40%;text-align:center;height:40px;line-height:40px;box-shadow:5px 5px 5px rgba(0,0,0,0.2);margin:-10px auto;display:block;border-radius:30px&quot; href=&quot;http://uc.kococ.cn:9090/&quot; target=&quot;_blank&quot;&gt;查看完整回复内容&lt;/a&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;div style=&quot;color:#8c8c8c;font-size:8px;width:100%;text-align:center;margin-top:30px&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&lt;p&gt;本邮件为系统自动发送，请勿直接回复哦！&lt;/p&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;div style=&quot;color:#8c8c8c;font-size:8px;width:100%;text-align:center&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&lt;p&gt;Copyright © 北青永恒. All Rights Reserved.&lt;/p&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;/div&gt;</span><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#9ECBFF;">&lt;/html&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&lt;html&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;meta charset=&quot;utf-8&quot;&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;div style=&quot;position:relative;width:450px;height:auto;margin:0 auto;padding-bottom:5px;border:rgb(224, 221, 224) solid 1px;border-radius:10px&quot;&gt;    &lt;div style=&quot;background-image:url(https://cos.vlinux.cn/www-vlinux-cn-blog-img/gitee-backup/img-master/image/1-1.jpg);width:100%;height:300px;background-size:cover;background-repeat:no-repeat;border-radius:10px 10px 0px 0px&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;div style=&quot;width:40%;height:40px;background-color:rgb(231, 145, 145);margin-top:-20px;margin-left:20px;color:#fff;text-align:center;line-height:40px;border-radius:30px&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">亲爱的：运维同学！</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;div style=&quot;line-height:180%;padding:0 15px 12px;width:90%;margin:auto;margin-bottom:0px;font-size:12px&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&lt;div style=&quot;border-bottom:1px solid rgb(216, 213, 213);font-size:13px;margin:10px 0px;padding:10px 0px&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&lt;span style=&quot;color:#12ADDB;font-weight:bold&quot;&gt;&amp;gt;&amp;nbsp;&lt;/span&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&lt;span&gt;您有一条新的告警信息！&lt;/span&gt;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&lt;a style=&quot;text-decoration:none;color:#12ADDB;font-weight:bold;&quot; href=&quot;{$comment-&gt;permalink}&quot; target=&quot;_blank&quot;&gt;{{ $var := .externalURL}}{{ range $k,$v:=.alerts }}</span></span>
<span class="line"><span style="color:#24292E;">{{</span><span style="color:#032F62;">if eq $v.status &quot;resolved&quot;</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#032F62;">&lt;h1&gt;&lt;a href ={{$v.generatorURL}}&gt;北青服务器告警信息&lt;/a&gt;&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;h2&gt;&lt;a href ={{$var}}&gt;{{$v.labels.alertname}}&lt;/a&gt;&lt;/h2&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;h5&gt;告警级别：{{$v.labels.level}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;h5&gt;告警程度：{{$v.labels.severity}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;h5&gt;开始时间：{{GetCSTtime $v.startsAt}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;h5&gt;结束时间：{{GetCSTtime $v.endsAt}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;h5&gt;故障主机IP：{{$v.labels.instance}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;h3&gt;{{$v.annotations.recoverymessage}}&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#24292E;">{{</span><span style="color:#032F62;">else</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#032F62;">&lt;h1&gt;&lt;a href ={{$v.generatorURL}}&gt;北青服务器告警信息&lt;/a&gt;&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;h2&gt;&lt;a href ={{$var}}&gt;{{$v.labels.alertname}}&lt;/a&gt;&lt;/h2&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;h5&gt;告警级别：{{$v.labels.level}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;h5&gt;告警程度：{{$v.labels.severity}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;h5&gt;开始时间：{{GetCSTtime $v.startsAt}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;h5&gt;故障主机IP：{{$v.labels.instance}}&lt;/h5&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;h3&gt;{{$v.annotations.description}}&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#24292E;">{{</span><span style="color:#032F62;">end</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">{{ </span><span style="color:#032F62;">end</span><span style="color:#24292E;"> }}</span><span style="color:#032F62;">&lt;/a&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;div</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">style=&quot;color:#8c8c8c;font-size:8px;width:93%;margin:auto;margin-top:-30px&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&lt;p style=&quot;padding:20px;&quot;&gt;                                 对生产环境要有一颗敬畏之心！&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;a style=&quot;text-decoration:none;background-color:rgb(155, 151, 221);color:#FFF;width:40%;text-align:center;height:40px;line-height:40px;box-shadow:5px 5px 5px rgba(0,0,0,0.2);margin:-10px auto;display:block;border-radius:30px&quot; href=&quot;http://uc.kococ.cn:9090/&quot; target=&quot;_blank&quot;&gt;查看完整回复内容&lt;/a&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;div style=&quot;color:#8c8c8c;font-size:8px;width:100%;text-align:center;margin-top:30px&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&lt;p&gt;本邮件为系统自动发送，请勿直接回复哦！&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;div style=&quot;color:#8c8c8c;font-size:8px;width:100%;text-align:center&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&lt;p&gt;Copyright © 北青永恒. All Rights Reserved.&lt;/p&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#032F62;">&lt;/div&gt;</span><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#032F62;">&lt;/html&gt;</span></span></code></pre></div><h1 id="_3-telegram报警模板" tabindex="-1">3. Telegram报警模板 <a class="header-anchor" href="#_3-telegram报警模板" aria-label="Permalink to &quot;3. Telegram报警模板&quot;">​</a></h1><h1 id="_4-飞书报警模板" tabindex="-1">4. 飞书报警模板 <a class="header-anchor" href="#_4-飞书报警模板" aria-label="Permalink to &quot;4. 飞书报警模板&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{{ $var := .externalURL}}{{ range $k,$v:=.alerts }}</span></span>
<span class="line"><span style="color:#e1e4e8;">{{if eq $v.status &quot;resolved&quot;}}</span></span>
<span class="line"><span style="color:#e1e4e8;">**[Prometheus 恢复通知]({{$v.labels.prometheus_url}}) ✅**</span></span>
<span class="line"><span style="color:#e1e4e8;">告警名称：{{$v.labels.alertname}}</span></span>
<span class="line"><span style="color:#e1e4e8;">告警状态：{{$v.status}}</span></span>
<span class="line"><span style="color:#e1e4e8;">开始时间：{{TimeFormat $v.startsAt &quot;2006-01-02 15:04:05&quot;}}</span></span>
<span class="line"><span style="color:#e1e4e8;">结束时间：{{TimeFormat $v.endsAt &quot;2006-01-02 15:04:05&quot;}} </span></span>
<span class="line"><span style="color:#e1e4e8;">实例地址：{{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#e1e4e8;">主机名称：{{$v.labels.hostname}}</span></span>
<span class="line"><span style="color:#e1e4e8;">**{{$v.annotations.description}}**</span></span>
<span class="line"><span style="color:#e1e4e8;">{{else}}</span></span>
<span class="line"><span style="color:#e1e4e8;">**[Prometheus 报警通知]({{$v.labels.prometheus_url}})🔥**</span></span>
<span class="line"><span style="color:#e1e4e8;">告警名称：{{$v.labels.alertname}}</span></span>
<span class="line"><span style="color:#e1e4e8;">告警状态：{{$v.status}} &gt; {{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#e1e4e8;">开始时间：{{TimeFormat $v.startsAt &quot;2006-01-02 15:04:05&quot;}}</span></span>
<span class="line"><span style="color:#e1e4e8;">实例地址：{{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#e1e4e8;">主机名称：{{$v.labels.hostname}}</span></span>
<span class="line"><span style="color:#e1e4e8;">集群名称：{{$v.labels.origin_prometheus}}</span></span>
<span class="line"><span style="color:#e1e4e8;">命名空间：{{$v.labels.namespace}}</span></span>
<span class="line"><span style="color:#e1e4e8;">**{{$v.annotations.description}}**</span></span>
<span class="line"><span style="color:#e1e4e8;">[点击打开Grafana，查看趋势图](http://ip:32561/d/PwMJtdvnz/k8s-for-prometheus-dashboard?orgId=1)</span></span>
<span class="line"><span style="color:#e1e4e8;">[点击打开Prometheus，查看告警信息]({{$v.labels.prometheus_url}})</span></span>
<span class="line"><span style="color:#e1e4e8;">[点击打开Alertmanager，配置告警抑制]({{$v.labels.alertmanager_url}})</span></span>
<span class="line"><span style="color:#e1e4e8;">{{end}}</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ end }}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{{ $var := .externalURL}}{{ range $k,$v:=.alerts }}</span></span>
<span class="line"><span style="color:#24292e;">{{if eq $v.status &quot;resolved&quot;}}</span></span>
<span class="line"><span style="color:#24292e;">**[Prometheus 恢复通知]({{$v.labels.prometheus_url}}) ✅**</span></span>
<span class="line"><span style="color:#24292e;">告警名称：{{$v.labels.alertname}}</span></span>
<span class="line"><span style="color:#24292e;">告警状态：{{$v.status}}</span></span>
<span class="line"><span style="color:#24292e;">开始时间：{{TimeFormat $v.startsAt &quot;2006-01-02 15:04:05&quot;}}</span></span>
<span class="line"><span style="color:#24292e;">结束时间：{{TimeFormat $v.endsAt &quot;2006-01-02 15:04:05&quot;}} </span></span>
<span class="line"><span style="color:#24292e;">实例地址：{{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#24292e;">主机名称：{{$v.labels.hostname}}</span></span>
<span class="line"><span style="color:#24292e;">**{{$v.annotations.description}}**</span></span>
<span class="line"><span style="color:#24292e;">{{else}}</span></span>
<span class="line"><span style="color:#24292e;">**[Prometheus 报警通知]({{$v.labels.prometheus_url}})🔥**</span></span>
<span class="line"><span style="color:#24292e;">告警名称：{{$v.labels.alertname}}</span></span>
<span class="line"><span style="color:#24292e;">告警状态：{{$v.status}} &gt; {{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#24292e;">开始时间：{{TimeFormat $v.startsAt &quot;2006-01-02 15:04:05&quot;}}</span></span>
<span class="line"><span style="color:#24292e;">实例地址：{{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#24292e;">主机名称：{{$v.labels.hostname}}</span></span>
<span class="line"><span style="color:#24292e;">集群名称：{{$v.labels.origin_prometheus}}</span></span>
<span class="line"><span style="color:#24292e;">命名空间：{{$v.labels.namespace}}</span></span>
<span class="line"><span style="color:#24292e;">**{{$v.annotations.description}}**</span></span>
<span class="line"><span style="color:#24292e;">[点击打开Grafana，查看趋势图](http://ip:32561/d/PwMJtdvnz/k8s-for-prometheus-dashboard?orgId=1)</span></span>
<span class="line"><span style="color:#24292e;">[点击打开Prometheus，查看告警信息]({{$v.labels.prometheus_url}})</span></span>
<span class="line"><span style="color:#24292e;">[点击打开Alertmanager，配置告警抑制]({{$v.labels.alertmanager_url}})</span></span>
<span class="line"><span style="color:#24292e;">{{end}}</span></span>
<span class="line"><span style="color:#24292e;">{{ end }}</span></span></code></pre></div><h1 id="_5-企业微信报警模板" tabindex="-1">5. 企业微信报警模板 <a class="header-anchor" href="#_5-企业微信报警模板" aria-label="Permalink to &quot;5. 企业微信报警模板&quot;">​</a></h1><h1 id="_6-k8s报警模板" tabindex="-1">6. k8s报警模板 <a class="header-anchor" href="#_6-k8s报警模板" aria-label="Permalink to &quot;6. k8s报警模板&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{{ $var := .externalURL}}{{ range $k,$v:=.alerts }}</span></span>
<span class="line"><span style="color:#e1e4e8;">{{if eq $v.status &quot;resolved&quot;}}</span></span>
<span class="line"><span style="color:#e1e4e8;">Prometheus 恢复通知✅✅✅</span></span>
<span class="line"><span style="color:#e1e4e8;">🟡【告警名称】{{$v.labels.alertname}}</span></span>
<span class="line"><span style="color:#e1e4e8;">🚨【告警级别】{{ $v.labels.severity}}</span></span>
<span class="line"><span style="color:#e1e4e8;">✅【告警状态】{{$v.status}}</span></span>
<span class="line"><span style="color:#e1e4e8;">🧭【开始时间】{{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#e1e4e8;">🧭【结束时间】{{GetCSTtime $v.endsAt}}</span></span>
<span class="line"><span style="color:#e1e4e8;">🏷【命名空间】 {{$v.labels.namespace}}</span></span>
<span class="line"><span style="color:#e1e4e8;">📡 【实例名称】 {{$v.labels.host}}{{$v.labels.pod}}{{$v.labels.job}}{{$v.labels.deployment}}{{$v.labels.statefulset}}</span></span>
<span class="line"><span style="color:#e1e4e8;">📝【告警详情】 {{ $v.annotations.message }}{{ $v.annotations.description}};{{$v.annotations.summary}}</span></span>
<span class="line"><span style="color:#e1e4e8;">{{else}}</span></span>
<span class="line"><span style="color:#e1e4e8;">Prometheus 告警通知🚨🚨🚨</span></span>
<span class="line"><span style="color:#e1e4e8;">🟡【告警名称】{{$v.labels.alertname}}</span></span>
<span class="line"><span style="color:#e1e4e8;">🚨【告警级别】{{ $v.labels.severity}}</span></span>
<span class="line"><span style="color:#e1e4e8;">🔥【告警状态】{{$v.status}}</span></span>
<span class="line"><span style="color:#e1e4e8;">🧭【开始时间】{{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#e1e4e8;">🏷【命名空间】 {{$v.labels.namespace}}</span></span>
<span class="line"><span style="color:#e1e4e8;">📡 【实例名称】 {{$v.labels.host}}{{$v.labels.pod}}{{$v.labels.job}}{{$v.labels.deployment}}{{$v.labels.statefulset}}</span></span>
<span class="line"><span style="color:#e1e4e8;">📝【告警详情】 {{ $v.annotations.message }}{{ $v.annotations.description}};{{$v.annotations.summary}}</span></span>
<span class="line"><span style="color:#e1e4e8;">🛠【屏蔽告警】{{$v.annotations.more_info}}</span></span>
<span class="line"><span style="color:#e1e4e8;">{{end}}</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ end }}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{{ $var := .externalURL}}{{ range $k,$v:=.alerts }}</span></span>
<span class="line"><span style="color:#24292e;">{{if eq $v.status &quot;resolved&quot;}}</span></span>
<span class="line"><span style="color:#24292e;">Prometheus 恢复通知✅✅✅</span></span>
<span class="line"><span style="color:#24292e;">🟡【告警名称】{{$v.labels.alertname}}</span></span>
<span class="line"><span style="color:#24292e;">🚨【告警级别】{{ $v.labels.severity}}</span></span>
<span class="line"><span style="color:#24292e;">✅【告警状态】{{$v.status}}</span></span>
<span class="line"><span style="color:#24292e;">🧭【开始时间】{{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#24292e;">🧭【结束时间】{{GetCSTtime $v.endsAt}}</span></span>
<span class="line"><span style="color:#24292e;">🏷【命名空间】 {{$v.labels.namespace}}</span></span>
<span class="line"><span style="color:#24292e;">📡 【实例名称】 {{$v.labels.host}}{{$v.labels.pod}}{{$v.labels.job}}{{$v.labels.deployment}}{{$v.labels.statefulset}}</span></span>
<span class="line"><span style="color:#24292e;">📝【告警详情】 {{ $v.annotations.message }}{{ $v.annotations.description}};{{$v.annotations.summary}}</span></span>
<span class="line"><span style="color:#24292e;">{{else}}</span></span>
<span class="line"><span style="color:#24292e;">Prometheus 告警通知🚨🚨🚨</span></span>
<span class="line"><span style="color:#24292e;">🟡【告警名称】{{$v.labels.alertname}}</span></span>
<span class="line"><span style="color:#24292e;">🚨【告警级别】{{ $v.labels.severity}}</span></span>
<span class="line"><span style="color:#24292e;">🔥【告警状态】{{$v.status}}</span></span>
<span class="line"><span style="color:#24292e;">🧭【开始时间】{{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#24292e;">🏷【命名空间】 {{$v.labels.namespace}}</span></span>
<span class="line"><span style="color:#24292e;">📡 【实例名称】 {{$v.labels.host}}{{$v.labels.pod}}{{$v.labels.job}}{{$v.labels.deployment}}{{$v.labels.statefulset}}</span></span>
<span class="line"><span style="color:#24292e;">📝【告警详情】 {{ $v.annotations.message }}{{ $v.annotations.description}};{{$v.annotations.summary}}</span></span>
<span class="line"><span style="color:#24292e;">🛠【屏蔽告警】{{$v.annotations.more_info}}</span></span>
<span class="line"><span style="color:#24292e;">{{end}}</span></span>
<span class="line"><span style="color:#24292e;">{{ end }}</span></span></code></pre></div><p><a href="https://www.wake.wiki/archives/prometheusalertmanager-tong-guo-telegram-fa-song-jing-bao" target="_blank" rel="noreferrer">https://www.wake.wiki/archives/prometheusalertmanager-tong-guo-telegram-fa-song-jing-bao</a></p><p><a href="https://awesome-prometheus-alerts.grep.to/" target="_blank" rel="noreferrer">https://awesome-prometheus-alerts.grep.to/</a></p>`,12),p=[t];function o(r,c,i,y,g,v){return n(),a("div",null,p)}const h=s(e,[["render",o]]);export{d as __pageData,h as default};
