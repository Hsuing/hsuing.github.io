import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1. docker-compose方式","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Monitor/Prometheus-Alert/1-docker.md","filePath":"guide/Linux/Monitor/Prometheus-Alert/1-docker.md","lastUpdated":1733967691000}'),p={name:"guide/Linux/Monitor/Prometheus-Alert/1-docker.md"},l=e(`<h1 id="_1-docker-compose方式" tabindex="-1">1. docker-compose方式 <a class="header-anchor" href="#_1-docker-compose方式" aria-label="Permalink to &quot;1. docker-compose方式&quot;">​</a></h1><h2 id="_1-1-创建目录" tabindex="-1">1.1 创建目录 <a class="header-anchor" href="#_1-1-创建目录" aria-label="Permalink to &quot;1.1 创建目录&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/monitor/prometheus/prometheus-alert/{config,db}</span></span>
<span class="line"><span style="color:#B392F0;">chmod</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">777</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/monitor/prometheus/prometheus-alert/db</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/monitor/prometheus/prometheus-alert/{config,db}</span></span>
<span class="line"><span style="color:#6F42C1;">chmod</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">777</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/monitor/prometheus/prometheus-alert/db</span></span></code></pre></div><h2 id="_1-2-创建配置文件" tabindex="-1">1.2 创建配置文件 <a class="header-anchor" href="#_1-2-创建配置文件" aria-label="Permalink to &quot;1.2 创建配置文件&quot;">​</a></h2><p><a href="https://github.com/feiyu563/PrometheusAlert/tree/master/conf" target="_blank" rel="noreferrer">官当</a></p><p>vim app.conf</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#---------------------↓全局配置-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">appname = PrometheusAlert</span></span>
<span class="line"><span style="color:#e1e4e8;">#登录用户名</span></span>
<span class="line"><span style="color:#e1e4e8;">login_user=prometheusalert</span></span>
<span class="line"><span style="color:#e1e4e8;">#登录密码</span></span>
<span class="line"><span style="color:#e1e4e8;">login_password=prometheusalert</span></span>
<span class="line"><span style="color:#e1e4e8;">#监听地址</span></span>
<span class="line"><span style="color:#e1e4e8;">httpaddr = &quot;0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#监听端口</span></span>
<span class="line"><span style="color:#e1e4e8;">httpport = 8080</span></span>
<span class="line"><span style="color:#e1e4e8;">runmode = dev</span></span>
<span class="line"><span style="color:#e1e4e8;">#设置代理 proxy = http://123.123.123.123:8080</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy =</span></span>
<span class="line"><span style="color:#e1e4e8;">#开启JSON请求</span></span>
<span class="line"><span style="color:#e1e4e8;">copyrequestbody = true</span></span>
<span class="line"><span style="color:#e1e4e8;">#告警消息标题</span></span>
<span class="line"><span style="color:#e1e4e8;">title=PrometheusAlert</span></span>
<span class="line"><span style="color:#e1e4e8;">#链接到告警平台地址</span></span>
<span class="line"><span style="color:#e1e4e8;">GraylogAlerturl=http://graylog.org</span></span>
<span class="line"><span style="color:#e1e4e8;">#钉钉告警 告警logo图标地址</span></span>
<span class="line"><span style="color:#e1e4e8;">logourl=https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/doc/images/alert-center.png</span></span>
<span class="line"><span style="color:#e1e4e8;">#钉钉告警 恢复logo图标地址</span></span>
<span class="line"><span style="color:#e1e4e8;">rlogourl=https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/doc/images/alert-center.png</span></span>
<span class="line"><span style="color:#e1e4e8;">#短信告警级别(等于3就进行短信告警) 告警级别定义 0 信息,1 警告,2 一般严重,3 严重,4 灾难</span></span>
<span class="line"><span style="color:#e1e4e8;">messagelevel=3</span></span>
<span class="line"><span style="color:#e1e4e8;">#电话告警级别(等于4就进行语音告警) 告警级别定义 0 信息,1 警告,2 一般严重,3 严重,4 灾难</span></span>
<span class="line"><span style="color:#e1e4e8;">phonecalllevel=4</span></span>
<span class="line"><span style="color:#e1e4e8;">#默认拨打号码(页面测试短信和电话功能需要配置此项)</span></span>
<span class="line"><span style="color:#e1e4e8;">defaultphone=xxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#故障恢复是否启用电话通知0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">phonecallresolved=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否前台输出file or console</span></span>
<span class="line"><span style="color:#e1e4e8;">logtype=file</span></span>
<span class="line"><span style="color:#e1e4e8;">#日志文件路径</span></span>
<span class="line"><span style="color:#e1e4e8;">logpath=logs/prometheusalertcenter.log</span></span>
<span class="line"><span style="color:#e1e4e8;">#转换Prometheus,graylog告警消息的时区为CST时区(如默认已经是CST时区，请勿开启)</span></span>
<span class="line"><span style="color:#e1e4e8;">prometheus_cst_time=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#数据库驱动，支持sqlite3，mysql,postgres如使用mysql或postgres，请开启db_host,db_port,db_user,db_password,db_name的注释</span></span>
<span class="line"><span style="color:#e1e4e8;">db_driver=sqlite3</span></span>
<span class="line"><span style="color:#e1e4e8;">#db_host=127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">#db_port=3306</span></span>
<span class="line"><span style="color:#e1e4e8;">#db_user=root</span></span>
<span class="line"><span style="color:#e1e4e8;">#db_password=root</span></span>
<span class="line"><span style="color:#e1e4e8;">#db_name=prometheusalert</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启告警记录 0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">AlertRecord=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启告警记录定时删除 0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">RecordLive=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#告警记录定时删除周期，单位天</span></span>
<span class="line"><span style="color:#e1e4e8;">RecordLiveDay=7</span></span>
<span class="line"><span style="color:#e1e4e8;"># 是否将告警记录写入es7，0为关闭，1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">alert_to_es=0</span></span>
<span class="line"><span style="color:#e1e4e8;"># es地址，是[]string</span></span>
<span class="line"><span style="color:#e1e4e8;"># beego.Appconfig.Strings读取配置为[]string，使用&quot;;&quot;而不是&quot;,&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">to_es_url=http://localhost:9200</span></span>
<span class="line"><span style="color:#e1e4e8;"># to_es_url=http://es1:9200;http://es2:9200;http://es3:9200</span></span>
<span class="line"><span style="color:#e1e4e8;"># es用户和密码</span></span>
<span class="line"><span style="color:#e1e4e8;"># to_es_user=username</span></span>
<span class="line"><span style="color:#e1e4e8;"># to_es_pwd=password</span></span>
<span class="line"><span style="color:#e1e4e8;"># 长连接最大空闲数</span></span>
<span class="line"><span style="color:#e1e4e8;">maxIdleConns=100</span></span>
<span class="line"><span style="color:#e1e4e8;"># 热更新配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">open-hotreload=0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓webhook-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启钉钉告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-dingding=1</span></span>
<span class="line"><span style="color:#e1e4e8;">#默认钉钉机器人地址</span></span>
<span class="line"><span style="color:#e1e4e8;">ddurl=https://oapi.dingtalk.com/robot/send?access_token=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启 @所有人(0为关闭,1为开启)</span></span>
<span class="line"><span style="color:#e1e4e8;">dd_isatall=1</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启钉钉机器人加签，0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;"># 使用方法：https://oapi.dingtalk.com/robot/send?access_token=XXXXXX&amp;secret=mysecret</span></span>
<span class="line"><span style="color:#e1e4e8;">open-dingding-secret=0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启微信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-weixin=1</span></span>
<span class="line"><span style="color:#e1e4e8;">#默认企业微信机器人地址</span></span>
<span class="line"><span style="color:#e1e4e8;">wxurl=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启飞书告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-feishu=1</span></span>
<span class="line"><span style="color:#e1e4e8;">#默认飞书机器人地址</span></span>
<span class="line"><span style="color:#e1e4e8;">fsurl=https://open.feishu.cn/open-apis/bot/hook/xxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"># webhook 发送 http 请求的 contentType, 如 application/json, application/x-www-form-urlencoded，不配置默认 application/json</span></span>
<span class="line"><span style="color:#e1e4e8;">wh_contenttype=application/json</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓腾讯云接口-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启腾讯云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-txdx=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#腾讯云短信接口key</span></span>
<span class="line"><span style="color:#e1e4e8;">TXY_DX_appkey=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#腾讯云短信模版ID 腾讯云短信模版配置可参考 prometheus告警:{1}</span></span>
<span class="line"><span style="color:#e1e4e8;">TXY_DX_tpl_id=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#腾讯云短信sdk app id</span></span>
<span class="line"><span style="color:#e1e4e8;">TXY_DX_sdkappid=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#腾讯云短信签名 根据自己审核通过的签名来填写</span></span>
<span class="line"><span style="color:#e1e4e8;">TXY_DX_sign=腾讯云</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启腾讯云电话告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-txdh=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#腾讯云电话接口key</span></span>
<span class="line"><span style="color:#e1e4e8;">TXY_DH_phonecallappkey=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#腾讯云电话模版ID</span></span>
<span class="line"><span style="color:#e1e4e8;">TXY_DH_phonecalltpl_id=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#腾讯云电话sdk app id</span></span>
<span class="line"><span style="color:#e1e4e8;">TXY_DH_phonecallsdkappid=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓华为云接口-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启华为云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-hwdx=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#华为云短信接口key</span></span>
<span class="line"><span style="color:#e1e4e8;">HWY_DX_APP_Key=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#华为云短信接口Secret</span></span>
<span class="line"><span style="color:#e1e4e8;">HWY_DX_APP_Secret=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#华为云APP接入地址(端口接口地址)</span></span>
<span class="line"><span style="color:#e1e4e8;">HWY_DX_APP_Url=https://rtcsms.cn-north-1.myhuaweicloud.com:10743</span></span>
<span class="line"><span style="color:#e1e4e8;">#华为云短信模板ID</span></span>
<span class="line"><span style="color:#e1e4e8;">HWY_DX_Templateid=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#华为云签名名称，必须是已审核通过的，与模板类型一致的签名名称,按照自己的实际签名填写</span></span>
<span class="line"><span style="color:#e1e4e8;">HWY_DX_Signature=华为云</span></span>
<span class="line"><span style="color:#e1e4e8;">#华为云签名通道号</span></span>
<span class="line"><span style="color:#e1e4e8;">HWY_DX_Sender=xxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓阿里云接口-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启阿里云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-alydx=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#阿里云短信主账号AccessKey的ID</span></span>
<span class="line"><span style="color:#e1e4e8;">ALY_DX_AccessKeyId=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#阿里云短信接口密钥</span></span>
<span class="line"><span style="color:#e1e4e8;">ALY_DX_AccessSecret=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#阿里云短信签名名称</span></span>
<span class="line"><span style="color:#e1e4e8;">ALY_DX_SignName=阿里云</span></span>
<span class="line"><span style="color:#e1e4e8;">#阿里云短信模板ID</span></span>
<span class="line"><span style="color:#e1e4e8;">ALY_DX_Template=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启阿里云电话告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-alydh=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#阿里云电话主账号AccessKey的ID</span></span>
<span class="line"><span style="color:#e1e4e8;">ALY_DH_AccessKeyId=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#阿里云电话接口密钥</span></span>
<span class="line"><span style="color:#e1e4e8;">ALY_DH_AccessSecret=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#阿里云电话被叫显号，必须是已购买的号码</span></span>
<span class="line"><span style="color:#e1e4e8;">ALY_DX_CalledShowNumber=xxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#阿里云电话文本转语音（TTS）模板ID</span></span>
<span class="line"><span style="color:#e1e4e8;">ALY_DH_TtsCode=xxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓容联云接口-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启容联云电话告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-rlydh=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#容联云基础接口地址</span></span>
<span class="line"><span style="color:#e1e4e8;">RLY_URL=https://app.cloopen.com:8883/2013-12-26/Accounts/</span></span>
<span class="line"><span style="color:#e1e4e8;">#容联云后台SID</span></span>
<span class="line"><span style="color:#e1e4e8;">RLY_ACCOUNT_SID=xxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#容联云api-token</span></span>
<span class="line"><span style="color:#e1e4e8;">RLY_ACCOUNT_TOKEN=xxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#容联云app_id</span></span>
<span class="line"><span style="color:#e1e4e8;">RLY_APP_ID=xxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓邮件配置-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启邮件</span></span>
<span class="line"><span style="color:#e1e4e8;">open-email=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#邮件发件服务器地址</span></span>
<span class="line"><span style="color:#e1e4e8;">Email_host=smtp.qq.com</span></span>
<span class="line"><span style="color:#e1e4e8;">#邮件发件服务器端口</span></span>
<span class="line"><span style="color:#e1e4e8;">Email_port=465</span></span>
<span class="line"><span style="color:#e1e4e8;">#邮件帐号</span></span>
<span class="line"><span style="color:#e1e4e8;">Email_user=xxxxxxx@qq.com</span></span>
<span class="line"><span style="color:#e1e4e8;">#邮件密码</span></span>
<span class="line"><span style="color:#e1e4e8;">Email_password=xxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#邮件标题</span></span>
<span class="line"><span style="color:#e1e4e8;">Email_title=运维告警</span></span>
<span class="line"><span style="color:#e1e4e8;">#默认发送邮箱</span></span>
<span class="line"><span style="color:#e1e4e8;">Default_emails=xxxxx@qq.com,xxxxx@qq.com</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓七陌云接口-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启七陌短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-7moordx=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#七陌账户ID</span></span>
<span class="line"><span style="color:#e1e4e8;">7MOOR_ACCOUNT_ID=Nxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#七陌账户APISecret</span></span>
<span class="line"><span style="color:#e1e4e8;">7MOOR_ACCOUNT_APISECRET=xxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#七陌账户短信模板编号</span></span>
<span class="line"><span style="color:#e1e4e8;">7MOOR_DX_TEMPLATENUM=n</span></span>
<span class="line"><span style="color:#e1e4e8;">#注意：七陌短信变量这里只用一个var1，在代码里写死了。</span></span>
<span class="line"><span style="color:#e1e4e8;">#-----------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启七陌webcall语音通知告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-7moordh=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#请在七陌平台添加虚拟服务号、文本节点</span></span>
<span class="line"><span style="color:#e1e4e8;">#七陌账户webcall的虚拟服务号</span></span>
<span class="line"><span style="color:#e1e4e8;">7MOOR_WEBCALL_SERVICENO=xxx</span></span>
<span class="line"><span style="color:#e1e4e8;"># 文本节点里被替换的变量，我配置的是text。如果被替换的变量不是text，请修改此配置</span></span>
<span class="line"><span style="color:#e1e4e8;">7MOOR_WEBCALL_VOICE_VAR=text</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓telegram接口-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启telegram告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-tg=1</span></span>
<span class="line"><span style="color:#e1e4e8;">#tg机器人token</span></span>
<span class="line"><span style="color:#e1e4e8;">TG_TOKEN=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#tg消息模式 个人消息或者频道消息 0为关闭(推送给个人)，1为开启(推送给频道)</span></span>
<span class="line"><span style="color:#e1e4e8;">TG_MODE_CHAN=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#tg用户ID</span></span>
<span class="line"><span style="color:#e1e4e8;">TG_USERID=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#tg频道name或者id, 频道name需要以@开始</span></span>
<span class="line"><span style="color:#e1e4e8;">TG_CHANNAME=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#tg api地址, 可以配置为代理地址</span></span>
<span class="line"><span style="color:#e1e4e8;">#TG_API_PROXY=&quot;https://api.telegram.org/bot%s/%s&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#TG_PARSE_MODE设置为 &quot;1&quot; ，启用Markdown</span></span>
<span class="line"><span style="color:#e1e4e8;">TG_PARSE_MODE = &quot;0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓workwechat接口-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启workwechat告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-workwechat=0</span></span>
<span class="line"><span style="color:#e1e4e8;"># 企业ID</span></span>
<span class="line"><span style="color:#e1e4e8;">WorkWechat_CropID=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"># 应用ID</span></span>
<span class="line"><span style="color:#e1e4e8;">WorkWechat_AgentID=xxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"># 应用secret</span></span>
<span class="line"><span style="color:#e1e4e8;">WorkWechat_AgentSecret=xxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"># 接受用户</span></span>
<span class="line"><span style="color:#e1e4e8;">WorkWechat_ToUser=&quot;zhangsan|lisi&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 接受部门</span></span>
<span class="line"><span style="color:#e1e4e8;">WorkWechat_ToParty=&quot;ops|dev&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 接受标签</span></span>
<span class="line"><span style="color:#e1e4e8;">WorkWechat_ToTag=&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 消息类型, 暂时只支持markdown</span></span>
<span class="line"><span style="color:#e1e4e8;"># WorkWechat_Msgtype = &quot;markdown&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓百度云接口-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启百度云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-baidudx=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#百度云短信接口AK(ACCESS_KEY_ID)</span></span>
<span class="line"><span style="color:#e1e4e8;">BDY_DX_AK=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#百度云短信接口SK(SECRET_ACCESS_KEY)</span></span>
<span class="line"><span style="color:#e1e4e8;">BDY_DX_SK=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#百度云短信ENDPOINT（ENDPOINT参数需要用指定区域的域名来进行定义，如服务所在区域为北京，则为）</span></span>
<span class="line"><span style="color:#e1e4e8;">BDY_DX_ENDPOINT=http://smsv3.bj.baidubce.com</span></span>
<span class="line"><span style="color:#e1e4e8;">#百度云短信模版ID,根据自己审核通过的模版来填写(模版支持一个参数code：如prometheus告警:{code})</span></span>
<span class="line"><span style="color:#e1e4e8;">BDY_DX_TEMPLATE_ID=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#百度云短信签名ID，根据自己审核通过的签名来填写</span></span>
<span class="line"><span style="color:#e1e4e8;">TXY_DX_SIGNATURE_ID=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓百度Hi(如流)-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启百度Hi(如流)告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-ruliu=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#默认百度Hi(如流)机器人地址</span></span>
<span class="line"><span style="color:#e1e4e8;">BDRL_URL=https://api.im.baidu.com/api/msg/groupmsgsend?access_token=xxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">#百度Hi(如流)群ID</span></span>
<span class="line"><span style="color:#e1e4e8;">BDRL_ID=123456</span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓bark接口-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启telegram告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-bark=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#bark默认地址, 建议自行部署bark-server</span></span>
<span class="line"><span style="color:#e1e4e8;">BARK_URL=https://api.day.app</span></span>
<span class="line"><span style="color:#e1e4e8;">#bark key, 多个key使用分割</span></span>
<span class="line"><span style="color:#e1e4e8;">BARK_KEYS=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"># 复制, 推荐开启</span></span>
<span class="line"><span style="color:#e1e4e8;">BARK_COPY=1</span></span>
<span class="line"><span style="color:#e1e4e8;"># 历史记录保存,推荐开启</span></span>
<span class="line"><span style="color:#e1e4e8;">BARK_ARCHIVE=1</span></span>
<span class="line"><span style="color:#e1e4e8;"># 消息分组</span></span>
<span class="line"><span style="color:#e1e4e8;">BARK_GROUP=PrometheusAlert</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓语音播报-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#语音播报需要配合语音播报插件才能使用</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启语音播报通道,0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-voice=1</span></span>
<span class="line"><span style="color:#e1e4e8;">VOICE_IP=127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">VOICE_PORT=9999</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓飞书机器人应用-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启feishuapp告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#e1e4e8;">open-feishuapp=1</span></span>
<span class="line"><span style="color:#e1e4e8;"># APPID</span></span>
<span class="line"><span style="color:#e1e4e8;">FEISHU_APPID=cli_xxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"># APPSECRET</span></span>
<span class="line"><span style="color:#e1e4e8;">FEISHU_APPSECRET=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;"># 可填飞书 用户open_id、user_id、union_ids、部门open_department_id</span></span>
<span class="line"><span style="color:#e1e4e8;">AT_USER_ID=&quot;xxxxxxxx&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓告警组-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"># 有其他新增的配置段，请放在告警组的上面</span></span>
<span class="line"><span style="color:#e1e4e8;"># 暂时仅针对 PrometheusContronller 中的 /prometheus/alert 路由</span></span>
<span class="line"><span style="color:#e1e4e8;"># 告警组如果放在了 wx, dd... 那部分的上分，beego section 取 url 值不太对。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 所以这里使用 include 来包含另告警组配置</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 是否启用告警组功能</span></span>
<span class="line"><span style="color:#e1e4e8;">open-alertgroup=0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 自定义的告警组既可以写在这里，也可以写在单独的文件里。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 写在单独的告警组配置里更便于修改。</span></span>
<span class="line"><span style="color:#e1e4e8;"># include &quot;alertgroup.conf&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#---------------------↓kafka地址-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"># kafka服务器的地址</span></span>
<span class="line"><span style="color:#e1e4e8;">open-kafka=1</span></span>
<span class="line"><span style="color:#e1e4e8;">kafka_server = 127.0.0.1:9092</span></span>
<span class="line"><span style="color:#e1e4e8;"># 写入消息的kafka topic</span></span>
<span class="line"><span style="color:#e1e4e8;">kafka_topic = devops</span></span>
<span class="line"><span style="color:#e1e4e8;"># 用户标记该消息是来自PrometheusAlert,一般无需修改</span></span>
<span class="line"><span style="color:#e1e4e8;">kafka_key = PrometheusAlert</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#---------------------↓全局配置-----------------------</span></span>
<span class="line"><span style="color:#24292e;">appname = PrometheusAlert</span></span>
<span class="line"><span style="color:#24292e;">#登录用户名</span></span>
<span class="line"><span style="color:#24292e;">login_user=prometheusalert</span></span>
<span class="line"><span style="color:#24292e;">#登录密码</span></span>
<span class="line"><span style="color:#24292e;">login_password=prometheusalert</span></span>
<span class="line"><span style="color:#24292e;">#监听地址</span></span>
<span class="line"><span style="color:#24292e;">httpaddr = &quot;0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#24292e;">#监听端口</span></span>
<span class="line"><span style="color:#24292e;">httpport = 8080</span></span>
<span class="line"><span style="color:#24292e;">runmode = dev</span></span>
<span class="line"><span style="color:#24292e;">#设置代理 proxy = http://123.123.123.123:8080</span></span>
<span class="line"><span style="color:#24292e;">proxy =</span></span>
<span class="line"><span style="color:#24292e;">#开启JSON请求</span></span>
<span class="line"><span style="color:#24292e;">copyrequestbody = true</span></span>
<span class="line"><span style="color:#24292e;">#告警消息标题</span></span>
<span class="line"><span style="color:#24292e;">title=PrometheusAlert</span></span>
<span class="line"><span style="color:#24292e;">#链接到告警平台地址</span></span>
<span class="line"><span style="color:#24292e;">GraylogAlerturl=http://graylog.org</span></span>
<span class="line"><span style="color:#24292e;">#钉钉告警 告警logo图标地址</span></span>
<span class="line"><span style="color:#24292e;">logourl=https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/doc/images/alert-center.png</span></span>
<span class="line"><span style="color:#24292e;">#钉钉告警 恢复logo图标地址</span></span>
<span class="line"><span style="color:#24292e;">rlogourl=https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/doc/images/alert-center.png</span></span>
<span class="line"><span style="color:#24292e;">#短信告警级别(等于3就进行短信告警) 告警级别定义 0 信息,1 警告,2 一般严重,3 严重,4 灾难</span></span>
<span class="line"><span style="color:#24292e;">messagelevel=3</span></span>
<span class="line"><span style="color:#24292e;">#电话告警级别(等于4就进行语音告警) 告警级别定义 0 信息,1 警告,2 一般严重,3 严重,4 灾难</span></span>
<span class="line"><span style="color:#24292e;">phonecalllevel=4</span></span>
<span class="line"><span style="color:#24292e;">#默认拨打号码(页面测试短信和电话功能需要配置此项)</span></span>
<span class="line"><span style="color:#24292e;">defaultphone=xxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">#故障恢复是否启用电话通知0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">phonecallresolved=0</span></span>
<span class="line"><span style="color:#24292e;">#是否前台输出file or console</span></span>
<span class="line"><span style="color:#24292e;">logtype=file</span></span>
<span class="line"><span style="color:#24292e;">#日志文件路径</span></span>
<span class="line"><span style="color:#24292e;">logpath=logs/prometheusalertcenter.log</span></span>
<span class="line"><span style="color:#24292e;">#转换Prometheus,graylog告警消息的时区为CST时区(如默认已经是CST时区，请勿开启)</span></span>
<span class="line"><span style="color:#24292e;">prometheus_cst_time=0</span></span>
<span class="line"><span style="color:#24292e;">#数据库驱动，支持sqlite3，mysql,postgres如使用mysql或postgres，请开启db_host,db_port,db_user,db_password,db_name的注释</span></span>
<span class="line"><span style="color:#24292e;">db_driver=sqlite3</span></span>
<span class="line"><span style="color:#24292e;">#db_host=127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">#db_port=3306</span></span>
<span class="line"><span style="color:#24292e;">#db_user=root</span></span>
<span class="line"><span style="color:#24292e;">#db_password=root</span></span>
<span class="line"><span style="color:#24292e;">#db_name=prometheusalert</span></span>
<span class="line"><span style="color:#24292e;">#是否开启告警记录 0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">AlertRecord=0</span></span>
<span class="line"><span style="color:#24292e;">#是否开启告警记录定时删除 0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">RecordLive=0</span></span>
<span class="line"><span style="color:#24292e;">#告警记录定时删除周期，单位天</span></span>
<span class="line"><span style="color:#24292e;">RecordLiveDay=7</span></span>
<span class="line"><span style="color:#24292e;"># 是否将告警记录写入es7，0为关闭，1为开启</span></span>
<span class="line"><span style="color:#24292e;">alert_to_es=0</span></span>
<span class="line"><span style="color:#24292e;"># es地址，是[]string</span></span>
<span class="line"><span style="color:#24292e;"># beego.Appconfig.Strings读取配置为[]string，使用&quot;;&quot;而不是&quot;,&quot;</span></span>
<span class="line"><span style="color:#24292e;">to_es_url=http://localhost:9200</span></span>
<span class="line"><span style="color:#24292e;"># to_es_url=http://es1:9200;http://es2:9200;http://es3:9200</span></span>
<span class="line"><span style="color:#24292e;"># es用户和密码</span></span>
<span class="line"><span style="color:#24292e;"># to_es_user=username</span></span>
<span class="line"><span style="color:#24292e;"># to_es_pwd=password</span></span>
<span class="line"><span style="color:#24292e;"># 长连接最大空闲数</span></span>
<span class="line"><span style="color:#24292e;">maxIdleConns=100</span></span>
<span class="line"><span style="color:#24292e;"># 热更新配置文件</span></span>
<span class="line"><span style="color:#24292e;">open-hotreload=0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓webhook-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启钉钉告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-dingding=1</span></span>
<span class="line"><span style="color:#24292e;">#默认钉钉机器人地址</span></span>
<span class="line"><span style="color:#24292e;">ddurl=https://oapi.dingtalk.com/robot/send?access_token=xxxxx</span></span>
<span class="line"><span style="color:#24292e;">#是否开启 @所有人(0为关闭,1为开启)</span></span>
<span class="line"><span style="color:#24292e;">dd_isatall=1</span></span>
<span class="line"><span style="color:#24292e;">#是否开启钉钉机器人加签，0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;"># 使用方法：https://oapi.dingtalk.com/robot/send?access_token=XXXXXX&amp;secret=mysecret</span></span>
<span class="line"><span style="color:#24292e;">open-dingding-secret=0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#是否开启微信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-weixin=1</span></span>
<span class="line"><span style="color:#24292e;">#默认企业微信机器人地址</span></span>
<span class="line"><span style="color:#24292e;">wxurl=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#是否开启飞书告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-feishu=1</span></span>
<span class="line"><span style="color:#24292e;">#默认飞书机器人地址</span></span>
<span class="line"><span style="color:#24292e;">fsurl=https://open.feishu.cn/open-apis/bot/hook/xxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;"># webhook 发送 http 请求的 contentType, 如 application/json, application/x-www-form-urlencoded，不配置默认 application/json</span></span>
<span class="line"><span style="color:#24292e;">wh_contenttype=application/json</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓腾讯云接口-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启腾讯云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-txdx=0</span></span>
<span class="line"><span style="color:#24292e;">#腾讯云短信接口key</span></span>
<span class="line"><span style="color:#24292e;">TXY_DX_appkey=xxxxx</span></span>
<span class="line"><span style="color:#24292e;">#腾讯云短信模版ID 腾讯云短信模版配置可参考 prometheus告警:{1}</span></span>
<span class="line"><span style="color:#24292e;">TXY_DX_tpl_id=xxxxx</span></span>
<span class="line"><span style="color:#24292e;">#腾讯云短信sdk app id</span></span>
<span class="line"><span style="color:#24292e;">TXY_DX_sdkappid=xxxxx</span></span>
<span class="line"><span style="color:#24292e;">#腾讯云短信签名 根据自己审核通过的签名来填写</span></span>
<span class="line"><span style="color:#24292e;">TXY_DX_sign=腾讯云</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#是否开启腾讯云电话告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-txdh=0</span></span>
<span class="line"><span style="color:#24292e;">#腾讯云电话接口key</span></span>
<span class="line"><span style="color:#24292e;">TXY_DH_phonecallappkey=xxxxx</span></span>
<span class="line"><span style="color:#24292e;">#腾讯云电话模版ID</span></span>
<span class="line"><span style="color:#24292e;">TXY_DH_phonecalltpl_id=xxxxx</span></span>
<span class="line"><span style="color:#24292e;">#腾讯云电话sdk app id</span></span>
<span class="line"><span style="color:#24292e;">TXY_DH_phonecallsdkappid=xxxxx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓华为云接口-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启华为云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-hwdx=0</span></span>
<span class="line"><span style="color:#24292e;">#华为云短信接口key</span></span>
<span class="line"><span style="color:#24292e;">HWY_DX_APP_Key=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">#华为云短信接口Secret</span></span>
<span class="line"><span style="color:#24292e;">HWY_DX_APP_Secret=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">#华为云APP接入地址(端口接口地址)</span></span>
<span class="line"><span style="color:#24292e;">HWY_DX_APP_Url=https://rtcsms.cn-north-1.myhuaweicloud.com:10743</span></span>
<span class="line"><span style="color:#24292e;">#华为云短信模板ID</span></span>
<span class="line"><span style="color:#24292e;">HWY_DX_Templateid=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">#华为云签名名称，必须是已审核通过的，与模板类型一致的签名名称,按照自己的实际签名填写</span></span>
<span class="line"><span style="color:#24292e;">HWY_DX_Signature=华为云</span></span>
<span class="line"><span style="color:#24292e;">#华为云签名通道号</span></span>
<span class="line"><span style="color:#24292e;">HWY_DX_Sender=xxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓阿里云接口-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启阿里云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-alydx=0</span></span>
<span class="line"><span style="color:#24292e;">#阿里云短信主账号AccessKey的ID</span></span>
<span class="line"><span style="color:#24292e;">ALY_DX_AccessKeyId=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">#阿里云短信接口密钥</span></span>
<span class="line"><span style="color:#24292e;">ALY_DX_AccessSecret=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">#阿里云短信签名名称</span></span>
<span class="line"><span style="color:#24292e;">ALY_DX_SignName=阿里云</span></span>
<span class="line"><span style="color:#24292e;">#阿里云短信模板ID</span></span>
<span class="line"><span style="color:#24292e;">ALY_DX_Template=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#是否开启阿里云电话告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-alydh=0</span></span>
<span class="line"><span style="color:#24292e;">#阿里云电话主账号AccessKey的ID</span></span>
<span class="line"><span style="color:#24292e;">ALY_DH_AccessKeyId=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">#阿里云电话接口密钥</span></span>
<span class="line"><span style="color:#24292e;">ALY_DH_AccessSecret=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">#阿里云电话被叫显号，必须是已购买的号码</span></span>
<span class="line"><span style="color:#24292e;">ALY_DX_CalledShowNumber=xxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">#阿里云电话文本转语音（TTS）模板ID</span></span>
<span class="line"><span style="color:#24292e;">ALY_DH_TtsCode=xxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓容联云接口-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启容联云电话告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-rlydh=0</span></span>
<span class="line"><span style="color:#24292e;">#容联云基础接口地址</span></span>
<span class="line"><span style="color:#24292e;">RLY_URL=https://app.cloopen.com:8883/2013-12-26/Accounts/</span></span>
<span class="line"><span style="color:#24292e;">#容联云后台SID</span></span>
<span class="line"><span style="color:#24292e;">RLY_ACCOUNT_SID=xxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">#容联云api-token</span></span>
<span class="line"><span style="color:#24292e;">RLY_ACCOUNT_TOKEN=xxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">#容联云app_id</span></span>
<span class="line"><span style="color:#24292e;">RLY_APP_ID=xxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓邮件配置-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启邮件</span></span>
<span class="line"><span style="color:#24292e;">open-email=0</span></span>
<span class="line"><span style="color:#24292e;">#邮件发件服务器地址</span></span>
<span class="line"><span style="color:#24292e;">Email_host=smtp.qq.com</span></span>
<span class="line"><span style="color:#24292e;">#邮件发件服务器端口</span></span>
<span class="line"><span style="color:#24292e;">Email_port=465</span></span>
<span class="line"><span style="color:#24292e;">#邮件帐号</span></span>
<span class="line"><span style="color:#24292e;">Email_user=xxxxxxx@qq.com</span></span>
<span class="line"><span style="color:#24292e;">#邮件密码</span></span>
<span class="line"><span style="color:#24292e;">Email_password=xxxxxx</span></span>
<span class="line"><span style="color:#24292e;">#邮件标题</span></span>
<span class="line"><span style="color:#24292e;">Email_title=运维告警</span></span>
<span class="line"><span style="color:#24292e;">#默认发送邮箱</span></span>
<span class="line"><span style="color:#24292e;">Default_emails=xxxxx@qq.com,xxxxx@qq.com</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓七陌云接口-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启七陌短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-7moordx=0</span></span>
<span class="line"><span style="color:#24292e;">#七陌账户ID</span></span>
<span class="line"><span style="color:#24292e;">7MOOR_ACCOUNT_ID=Nxxx</span></span>
<span class="line"><span style="color:#24292e;">#七陌账户APISecret</span></span>
<span class="line"><span style="color:#24292e;">7MOOR_ACCOUNT_APISECRET=xxx</span></span>
<span class="line"><span style="color:#24292e;">#七陌账户短信模板编号</span></span>
<span class="line"><span style="color:#24292e;">7MOOR_DX_TEMPLATENUM=n</span></span>
<span class="line"><span style="color:#24292e;">#注意：七陌短信变量这里只用一个var1，在代码里写死了。</span></span>
<span class="line"><span style="color:#24292e;">#-----------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启七陌webcall语音通知告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-7moordh=0</span></span>
<span class="line"><span style="color:#24292e;">#请在七陌平台添加虚拟服务号、文本节点</span></span>
<span class="line"><span style="color:#24292e;">#七陌账户webcall的虚拟服务号</span></span>
<span class="line"><span style="color:#24292e;">7MOOR_WEBCALL_SERVICENO=xxx</span></span>
<span class="line"><span style="color:#24292e;"># 文本节点里被替换的变量，我配置的是text。如果被替换的变量不是text，请修改此配置</span></span>
<span class="line"><span style="color:#24292e;">7MOOR_WEBCALL_VOICE_VAR=text</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓telegram接口-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启telegram告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-tg=1</span></span>
<span class="line"><span style="color:#24292e;">#tg机器人token</span></span>
<span class="line"><span style="color:#24292e;">TG_TOKEN=xxxxx</span></span>
<span class="line"><span style="color:#24292e;">#tg消息模式 个人消息或者频道消息 0为关闭(推送给个人)，1为开启(推送给频道)</span></span>
<span class="line"><span style="color:#24292e;">TG_MODE_CHAN=0</span></span>
<span class="line"><span style="color:#24292e;">#tg用户ID</span></span>
<span class="line"><span style="color:#24292e;">TG_USERID=xxxxx</span></span>
<span class="line"><span style="color:#24292e;">#tg频道name或者id, 频道name需要以@开始</span></span>
<span class="line"><span style="color:#24292e;">TG_CHANNAME=xxxxx</span></span>
<span class="line"><span style="color:#24292e;">#tg api地址, 可以配置为代理地址</span></span>
<span class="line"><span style="color:#24292e;">#TG_API_PROXY=&quot;https://api.telegram.org/bot%s/%s&quot;</span></span>
<span class="line"><span style="color:#24292e;">#TG_PARSE_MODE设置为 &quot;1&quot; ，启用Markdown</span></span>
<span class="line"><span style="color:#24292e;">TG_PARSE_MODE = &quot;0&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓workwechat接口-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启workwechat告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-workwechat=0</span></span>
<span class="line"><span style="color:#24292e;"># 企业ID</span></span>
<span class="line"><span style="color:#24292e;">WorkWechat_CropID=xxxxx</span></span>
<span class="line"><span style="color:#24292e;"># 应用ID</span></span>
<span class="line"><span style="color:#24292e;">WorkWechat_AgentID=xxxx</span></span>
<span class="line"><span style="color:#24292e;"># 应用secret</span></span>
<span class="line"><span style="color:#24292e;">WorkWechat_AgentSecret=xxxx</span></span>
<span class="line"><span style="color:#24292e;"># 接受用户</span></span>
<span class="line"><span style="color:#24292e;">WorkWechat_ToUser=&quot;zhangsan|lisi&quot;</span></span>
<span class="line"><span style="color:#24292e;"># 接受部门</span></span>
<span class="line"><span style="color:#24292e;">WorkWechat_ToParty=&quot;ops|dev&quot;</span></span>
<span class="line"><span style="color:#24292e;"># 接受标签</span></span>
<span class="line"><span style="color:#24292e;">WorkWechat_ToTag=&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;"># 消息类型, 暂时只支持markdown</span></span>
<span class="line"><span style="color:#24292e;"># WorkWechat_Msgtype = &quot;markdown&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓百度云接口-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启百度云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-baidudx=0</span></span>
<span class="line"><span style="color:#24292e;">#百度云短信接口AK(ACCESS_KEY_ID)</span></span>
<span class="line"><span style="color:#24292e;">BDY_DX_AK=xxxxx</span></span>
<span class="line"><span style="color:#24292e;">#百度云短信接口SK(SECRET_ACCESS_KEY)</span></span>
<span class="line"><span style="color:#24292e;">BDY_DX_SK=xxxxx</span></span>
<span class="line"><span style="color:#24292e;">#百度云短信ENDPOINT（ENDPOINT参数需要用指定区域的域名来进行定义，如服务所在区域为北京，则为）</span></span>
<span class="line"><span style="color:#24292e;">BDY_DX_ENDPOINT=http://smsv3.bj.baidubce.com</span></span>
<span class="line"><span style="color:#24292e;">#百度云短信模版ID,根据自己审核通过的模版来填写(模版支持一个参数code：如prometheus告警:{code})</span></span>
<span class="line"><span style="color:#24292e;">BDY_DX_TEMPLATE_ID=xxxxx</span></span>
<span class="line"><span style="color:#24292e;">#百度云短信签名ID，根据自己审核通过的签名来填写</span></span>
<span class="line"><span style="color:#24292e;">TXY_DX_SIGNATURE_ID=xxxxx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓百度Hi(如流)-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启百度Hi(如流)告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-ruliu=0</span></span>
<span class="line"><span style="color:#24292e;">#默认百度Hi(如流)机器人地址</span></span>
<span class="line"><span style="color:#24292e;">BDRL_URL=https://api.im.baidu.com/api/msg/groupmsgsend?access_token=xxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">#百度Hi(如流)群ID</span></span>
<span class="line"><span style="color:#24292e;">BDRL_ID=123456</span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓bark接口-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启telegram告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-bark=0</span></span>
<span class="line"><span style="color:#24292e;">#bark默认地址, 建议自行部署bark-server</span></span>
<span class="line"><span style="color:#24292e;">BARK_URL=https://api.day.app</span></span>
<span class="line"><span style="color:#24292e;">#bark key, 多个key使用分割</span></span>
<span class="line"><span style="color:#24292e;">BARK_KEYS=xxxxx</span></span>
<span class="line"><span style="color:#24292e;"># 复制, 推荐开启</span></span>
<span class="line"><span style="color:#24292e;">BARK_COPY=1</span></span>
<span class="line"><span style="color:#24292e;"># 历史记录保存,推荐开启</span></span>
<span class="line"><span style="color:#24292e;">BARK_ARCHIVE=1</span></span>
<span class="line"><span style="color:#24292e;"># 消息分组</span></span>
<span class="line"><span style="color:#24292e;">BARK_GROUP=PrometheusAlert</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓语音播报-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#语音播报需要配合语音播报插件才能使用</span></span>
<span class="line"><span style="color:#24292e;">#是否开启语音播报通道,0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-voice=1</span></span>
<span class="line"><span style="color:#24292e;">VOICE_IP=127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">VOICE_PORT=9999</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓飞书机器人应用-----------------------</span></span>
<span class="line"><span style="color:#24292e;">#是否开启feishuapp告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#24292e;">open-feishuapp=1</span></span>
<span class="line"><span style="color:#24292e;"># APPID</span></span>
<span class="line"><span style="color:#24292e;">FEISHU_APPID=cli_xxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;"># APPSECRET</span></span>
<span class="line"><span style="color:#24292e;">FEISHU_APPSECRET=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;"># 可填飞书 用户open_id、user_id、union_ids、部门open_department_id</span></span>
<span class="line"><span style="color:#24292e;">AT_USER_ID=&quot;xxxxxxxx&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓告警组-----------------------</span></span>
<span class="line"><span style="color:#24292e;"># 有其他新增的配置段，请放在告警组的上面</span></span>
<span class="line"><span style="color:#24292e;"># 暂时仅针对 PrometheusContronller 中的 /prometheus/alert 路由</span></span>
<span class="line"><span style="color:#24292e;"># 告警组如果放在了 wx, dd... 那部分的上分，beego section 取 url 值不太对。</span></span>
<span class="line"><span style="color:#24292e;"># 所以这里使用 include 来包含另告警组配置</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 是否启用告警组功能</span></span>
<span class="line"><span style="color:#24292e;">open-alertgroup=0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 自定义的告警组既可以写在这里，也可以写在单独的文件里。</span></span>
<span class="line"><span style="color:#24292e;"># 写在单独的告警组配置里更便于修改。</span></span>
<span class="line"><span style="color:#24292e;"># include &quot;alertgroup.conf&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#---------------------↓kafka地址-----------------------</span></span>
<span class="line"><span style="color:#24292e;"># kafka服务器的地址</span></span>
<span class="line"><span style="color:#24292e;">open-kafka=1</span></span>
<span class="line"><span style="color:#24292e;">kafka_server = 127.0.0.1:9092</span></span>
<span class="line"><span style="color:#24292e;"># 写入消息的kafka topic</span></span>
<span class="line"><span style="color:#24292e;">kafka_topic = devops</span></span>
<span class="line"><span style="color:#24292e;"># 用户标记该消息是来自PrometheusAlert,一般无需修改</span></span>
<span class="line"><span style="color:#24292e;">kafka_key = PrometheusAlert</span></span></code></pre></div><h2 id="_1-3-配置docker-compose" tabindex="-1">1.3 配置docker-compose <a class="header-anchor" href="#_1-3-配置docker-compose" aria-label="Permalink to &quot;1.3 配置docker-compose&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;3&#39;</span></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">prometheus-alert</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">feiyu563/prometheus-alert:v4.9.1</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">always</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;19094:8080&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/data/monitor/prometheus/prometheus-alert/db:/app/db</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/data/monitor/prometheus/prometheus-alert/config/app.conf:/app/config/app.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">PA_LOGIN_USER=alertuser</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">PA_LOGIN_PASSWORD=123456</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">PA_TITLE=prometheusAlert</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">PA_OPEN_TG=1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3&#39;</span></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">prometheus-alert</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">feiyu563/prometheus-alert:v4.9.1</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">always</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;19094:8080&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/data/monitor/prometheus/prometheus-alert/db:/app/db</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/data/monitor/prometheus/prometheus-alert/config/app.conf:/app/config/app.conf</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">PA_LOGIN_USER=alertuser</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">PA_LOGIN_PASSWORD=123456</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">PA_TITLE=prometheusAlert</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">PA_OPEN_TG=1</span></span></code></pre></div><ul><li>启动</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker-compose</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">up</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker-compose</span><span style="color:#24292E;"> </span><span style="color:#032F62;">up</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span></span></code></pre></div><h2 id="_1-4-配置nginx" tabindex="-1">1.4 配置nginx <a class="header-anchor" href="#_1-4-配置nginx" aria-label="Permalink to &quot;1.4 配置nginx&quot;">​</a></h2><h1 id="_2-docker方式" tabindex="-1">2. docker方式 <a class="header-anchor" href="#_2-docker方式" aria-label="Permalink to &quot;2. docker方式&quot;">​</a></h1><h1 id="_3-k8s方式" tabindex="-1">3. k8s方式 <a class="header-anchor" href="#_3-k8s方式" aria-label="Permalink to &quot;3. k8s方式&quot;">​</a></h1><p>请看k8s章节</p>`,15),o=[l];function c(t,r,i,x,y,_){return n(),a("div",null,o)}const h=s(p,[["render",c]]);export{u as __pageData,h as default};
