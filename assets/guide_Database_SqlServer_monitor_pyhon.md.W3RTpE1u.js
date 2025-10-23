import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const q=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/SqlServer/monitor/pyhon.md","filePath":"guide/Database/SqlServer/monitor/pyhon.md","lastUpdated":1720533756000}'),l={name:"guide/Database/SqlServer/monitor/pyhon.md"},p=e(`<p><strong>配置文件</strong> qqmssqltest_db_server_conf.ini</p><p>同过此配置文件获取DB Server信息、DB信息、UID信息、邮件服务器信息等</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[sqlserver]</span></span>
<span class="line"><span style="color:#e1e4e8;">db_user = XXXXXX</span></span>
<span class="line"><span style="color:#e1e4e8;">db_pwd = XXXXXXX</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[sqlserver_qq]</span></span>
<span class="line"><span style="color:#e1e4e8;">db_host = 110.119.120.114</span></span>
<span class="line"><span style="color:#e1e4e8;">db_port = 1433</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[windows]</span></span>
<span class="line"><span style="color:#e1e4e8;">user = </span></span>
<span class="line"><span style="color:#e1e4e8;">pwd = </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[mail]</span></span>
<span class="line"><span style="color:#e1e4e8;">host = zheshiceshidemail.qq.com</span></span>
<span class="line"><span style="color:#e1e4e8;">port = 25</span></span>
<span class="line"><span style="color:#e1e4e8;">user = </span></span>
<span class="line"><span style="color:#e1e4e8;">pwd = </span></span>
<span class="line"><span style="color:#e1e4e8;">sender = zhejiushiceshidebuyaodangzhen@qq.com</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[sqlserver]</span></span>
<span class="line"><span style="color:#24292e;">db_user = XXXXXX</span></span>
<span class="line"><span style="color:#24292e;">db_pwd = XXXXXXX</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[sqlserver_qq]</span></span>
<span class="line"><span style="color:#24292e;">db_host = 110.119.120.114</span></span>
<span class="line"><span style="color:#24292e;">db_port = 1433</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[windows]</span></span>
<span class="line"><span style="color:#24292e;">user = </span></span>
<span class="line"><span style="color:#24292e;">pwd = </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[mail]</span></span>
<span class="line"><span style="color:#24292e;">host = zheshiceshidemail.qq.com</span></span>
<span class="line"><span style="color:#24292e;">port = 25</span></span>
<span class="line"><span style="color:#24292e;">user = </span></span>
<span class="line"><span style="color:#24292e;">pwd = </span></span>
<span class="line"><span style="color:#24292e;">sender = zhejiushiceshidebuyaodangzhen@qq.com</span></span></code></pre></div><p>获取连接串的组件mssql_get_db_connect.py</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># -*- coding: utf-8 -*-</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">import sys</span></span>
<span class="line"><span style="color:#e1e4e8;">import os</span></span>
<span class="line"><span style="color:#e1e4e8;">import datetime</span></span>
<span class="line"><span style="color:#e1e4e8;">import configparser</span></span>
<span class="line"><span style="color:#e1e4e8;">import pymssql</span></span>
<span class="line"><span style="color:#e1e4e8;"># pip3 install pymssql-2.1.4-cp37-cp37m-win_amd64.whl</span></span>
<span class="line"><span style="color:#e1e4e8;"># pip3 install pymssql -i https://pypi.doubanio.com/simple</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 获取连接串信息</span></span>
<span class="line"><span style="color:#e1e4e8;">def mssql_get_db_connect(db_host, db_port):</span></span>
<span class="line"><span style="color:#e1e4e8;">    db_host = db_host</span></span>
<span class="line"><span style="color:#e1e4e8;">    db_port = db_port</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    db_ps_file = os.path.join(sys.path[0], &quot;qqmssqltest_db_server_conf.ini&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    config = configparser.ConfigParser()</span></span>
<span class="line"><span style="color:#e1e4e8;">    config.read(db_ps_file, encoding=&quot;utf-8&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    db_user = config.get(&#39;sqlserver&#39;, &#39;db_user&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    db_pwd = config.get(&#39;sqlserver&#39;, &#39;db_pwd&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    conn = pymssql.connect(host=db_host, port=db_port, user=db_user, password=db_pwd, charset=&quot;utf8&quot;, login_timeout=5, timeout=600, autocommit=True)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    return conn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># -*- coding: utf-8 -*-</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">import sys</span></span>
<span class="line"><span style="color:#24292e;">import os</span></span>
<span class="line"><span style="color:#24292e;">import datetime</span></span>
<span class="line"><span style="color:#24292e;">import configparser</span></span>
<span class="line"><span style="color:#24292e;">import pymssql</span></span>
<span class="line"><span style="color:#24292e;"># pip3 install pymssql-2.1.4-cp37-cp37m-win_amd64.whl</span></span>
<span class="line"><span style="color:#24292e;"># pip3 install pymssql -i https://pypi.doubanio.com/simple</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 获取连接串信息</span></span>
<span class="line"><span style="color:#24292e;">def mssql_get_db_connect(db_host, db_port):</span></span>
<span class="line"><span style="color:#24292e;">    db_host = db_host</span></span>
<span class="line"><span style="color:#24292e;">    db_port = db_port</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    db_ps_file = os.path.join(sys.path[0], &quot;qqmssqltest_db_server_conf.ini&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    config = configparser.ConfigParser()</span></span>
<span class="line"><span style="color:#24292e;">    config.read(db_ps_file, encoding=&quot;utf-8&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    db_user = config.get(&#39;sqlserver&#39;, &#39;db_user&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    db_pwd = config.get(&#39;sqlserver&#39;, &#39;db_pwd&#39;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    conn = pymssql.connect(host=db_host, port=db_port, user=db_user, password=db_pwd, charset=&quot;utf8&quot;, login_timeout=5, timeout=600, autocommit=True)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    return conn</span></span></code></pre></div><p>执行SQL语句的组件mysql_exec_sql.py</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># -*- coding: utf-8 -*-</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">import mysql_get_db_connect</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">def mysql_exec_dml_sql(db_host, db_port, exec_sql):</span></span>
<span class="line"><span style="color:#e1e4e8;">    conn = mysql_get_db_connect.mysql_get_db_connect(db_host, db_port)</span></span>
<span class="line"><span style="color:#e1e4e8;">    with conn.cursor() as cursor_db:</span></span>
<span class="line"><span style="color:#e1e4e8;">        cursor_db.execute(exec_sql)</span></span>
<span class="line"><span style="color:#e1e4e8;">        conn.commit()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">def mysql_exec_select_sql(db_host, db_port, exec_sql):</span></span>
<span class="line"><span style="color:#e1e4e8;">    conn = mysql_get_db_connect.mysql_get_db_connect(db_host, db_port)</span></span>
<span class="line"><span style="color:#e1e4e8;">    with conn.cursor() as cursor_db:</span></span>
<span class="line"><span style="color:#e1e4e8;">        cursor_db.execute(exec_sql)</span></span>
<span class="line"><span style="color:#e1e4e8;">        sql_rst = cursor_db.fetchall()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    return sql_rst</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">def mysql_exec_select_sql_include_colnames(db_host, db_port, exec_sql):</span></span>
<span class="line"><span style="color:#e1e4e8;">    conn = mysql_get_db_connect.mysql_get_db_connect(db_host, db_port)</span></span>
<span class="line"><span style="color:#e1e4e8;">    with conn.cursor() as cursor_db:</span></span>
<span class="line"><span style="color:#e1e4e8;">        cursor_db.execute(exec_sql)</span></span>
<span class="line"><span style="color:#e1e4e8;">        sql_rst = cursor_db.fetchall()</span></span>
<span class="line"><span style="color:#e1e4e8;">        col_names = cursor_db.description</span></span>
<span class="line"><span style="color:#e1e4e8;">    return sql_rst, col_names</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># -*- coding: utf-8 -*-</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">import mysql_get_db_connect</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">def mysql_exec_dml_sql(db_host, db_port, exec_sql):</span></span>
<span class="line"><span style="color:#24292e;">    conn = mysql_get_db_connect.mysql_get_db_connect(db_host, db_port)</span></span>
<span class="line"><span style="color:#24292e;">    with conn.cursor() as cursor_db:</span></span>
<span class="line"><span style="color:#24292e;">        cursor_db.execute(exec_sql)</span></span>
<span class="line"><span style="color:#24292e;">        conn.commit()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">def mysql_exec_select_sql(db_host, db_port, exec_sql):</span></span>
<span class="line"><span style="color:#24292e;">    conn = mysql_get_db_connect.mysql_get_db_connect(db_host, db_port)</span></span>
<span class="line"><span style="color:#24292e;">    with conn.cursor() as cursor_db:</span></span>
<span class="line"><span style="color:#24292e;">        cursor_db.execute(exec_sql)</span></span>
<span class="line"><span style="color:#24292e;">        sql_rst = cursor_db.fetchall()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    return sql_rst</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">def mysql_exec_select_sql_include_colnames(db_host, db_port, exec_sql):</span></span>
<span class="line"><span style="color:#24292e;">    conn = mysql_get_db_connect.mysql_get_db_connect(db_host, db_port)</span></span>
<span class="line"><span style="color:#24292e;">    with conn.cursor() as cursor_db:</span></span>
<span class="line"><span style="color:#24292e;">        cursor_db.execute(exec_sql)</span></span>
<span class="line"><span style="color:#24292e;">        sql_rst = cursor_db.fetchall()</span></span>
<span class="line"><span style="color:#24292e;">        col_names = cursor_db.description</span></span>
<span class="line"><span style="color:#24292e;">    return sql_rst, col_names</span></span></code></pre></div><p>发邮件的功能send_monitor_mail.py</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># -*- coding: utf-8 -*-</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># pip3 install PyEmail</span></span>
<span class="line"><span style="color:#e1e4e8;">import smtplib</span></span>
<span class="line"><span style="color:#e1e4e8;">from email.mime.text import MIMEText</span></span>
<span class="line"><span style="color:#e1e4e8;">import configparser</span></span>
<span class="line"><span style="color:#e1e4e8;">import os</span></span>
<span class="line"><span style="color:#e1e4e8;">import sys</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 发送告警邮件</span></span>
<span class="line"><span style="color:#e1e4e8;">def send_monitor_mail(mail_subject, mail_body, mail_receivers=&quot;testwukongbaigujing@qq.com&quot;):</span></span>
<span class="line"><span style="color:#e1e4e8;">    db_ps_file = os.path.join(sys.path[0], &quot;qqmssqltest_db_server_conf.ini&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    config = configparser.ConfigParser()</span></span>
<span class="line"><span style="color:#e1e4e8;">    config.read(db_ps_file, encoding=&quot;utf-8&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    mail_host = config.get(&#39;mail&#39;, &#39;host&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    mail_port = config.get(&#39;mail&#39;, &#39;port&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    # mail_user = config.get(&#39;mail&#39;, &#39;user&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    # mail_pwd = config.get(&#39;mail&#39;, &#39;pwd&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    sender = config.get(&#39;mail&#39;, &#39;sender&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    # receivers = config.get(&#39;mail&#39;, &#39;receivers&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 发送HTML格式邮件</span></span>
<span class="line"><span style="color:#e1e4e8;">    message = MIMEText(mail_body, &#39;html&#39;, &#39;utf-8&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    # message = MIMEText(mail_body, &#39;plain&#39;, &#39;utf-8&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    message[&#39;subject&#39;] = mail_subject</span></span>
<span class="line"><span style="color:#e1e4e8;">    message[&#39;From&#39;] = sender</span></span>
<span class="line"><span style="color:#e1e4e8;">    message[&#39;To&#39;] = mail_receivers</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    try:</span></span>
<span class="line"><span style="color:#e1e4e8;">        smtpObj = smtplib.SMTP()</span></span>
<span class="line"><span style="color:#e1e4e8;">        smtpObj.connect(mail_host, mail_port)          # 25 为 SMTP 端口号</span></span>
<span class="line"><span style="color:#e1e4e8;">        # SMTP AUTH extension not supported by server.</span></span>
<span class="line"><span style="color:#e1e4e8;">        # https://github.com/miguelgrinberg/microblog/issues/76</span></span>
<span class="line"><span style="color:#e1e4e8;">        # smtpObj.ehlo()</span></span>
<span class="line"><span style="color:#e1e4e8;">        # smtpObj.starttls()</span></span>
<span class="line"><span style="color:#e1e4e8;">        # smtpObj.login(mail_user, mail_pwd)</span></span>
<span class="line"><span style="color:#e1e4e8;">        smtpObj.sendmail(sender, mail_receivers, message.as_string())</span></span>
<span class="line"><span style="color:#e1e4e8;">        smtpObj.quit()</span></span>
<span class="line"><span style="color:#e1e4e8;">        print(&quot;邮件发送成功&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    except Exception as e:</span></span>
<span class="line"><span style="color:#e1e4e8;">        print(e)</span></span>
<span class="line"><span style="color:#e1e4e8;">    # except smtplib.SMTPException:</span></span>
<span class="line"><span style="color:#e1e4e8;">        # print(&quot;Error: 无法发送邮件&quot;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># -*- coding: utf-8 -*-</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># pip3 install PyEmail</span></span>
<span class="line"><span style="color:#24292e;">import smtplib</span></span>
<span class="line"><span style="color:#24292e;">from email.mime.text import MIMEText</span></span>
<span class="line"><span style="color:#24292e;">import configparser</span></span>
<span class="line"><span style="color:#24292e;">import os</span></span>
<span class="line"><span style="color:#24292e;">import sys</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 发送告警邮件</span></span>
<span class="line"><span style="color:#24292e;">def send_monitor_mail(mail_subject, mail_body, mail_receivers=&quot;testwukongbaigujing@qq.com&quot;):</span></span>
<span class="line"><span style="color:#24292e;">    db_ps_file = os.path.join(sys.path[0], &quot;qqmssqltest_db_server_conf.ini&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    config = configparser.ConfigParser()</span></span>
<span class="line"><span style="color:#24292e;">    config.read(db_ps_file, encoding=&quot;utf-8&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    mail_host = config.get(&#39;mail&#39;, &#39;host&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    mail_port = config.get(&#39;mail&#39;, &#39;port&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    # mail_user = config.get(&#39;mail&#39;, &#39;user&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    # mail_pwd = config.get(&#39;mail&#39;, &#39;pwd&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    sender = config.get(&#39;mail&#39;, &#39;sender&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    # receivers = config.get(&#39;mail&#39;, &#39;receivers&#39;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 发送HTML格式邮件</span></span>
<span class="line"><span style="color:#24292e;">    message = MIMEText(mail_body, &#39;html&#39;, &#39;utf-8&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    # message = MIMEText(mail_body, &#39;plain&#39;, &#39;utf-8&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    message[&#39;subject&#39;] = mail_subject</span></span>
<span class="line"><span style="color:#24292e;">    message[&#39;From&#39;] = sender</span></span>
<span class="line"><span style="color:#24292e;">    message[&#39;To&#39;] = mail_receivers</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    try:</span></span>
<span class="line"><span style="color:#24292e;">        smtpObj = smtplib.SMTP()</span></span>
<span class="line"><span style="color:#24292e;">        smtpObj.connect(mail_host, mail_port)          # 25 为 SMTP 端口号</span></span>
<span class="line"><span style="color:#24292e;">        # SMTP AUTH extension not supported by server.</span></span>
<span class="line"><span style="color:#24292e;">        # https://github.com/miguelgrinberg/microblog/issues/76</span></span>
<span class="line"><span style="color:#24292e;">        # smtpObj.ehlo()</span></span>
<span class="line"><span style="color:#24292e;">        # smtpObj.starttls()</span></span>
<span class="line"><span style="color:#24292e;">        # smtpObj.login(mail_user, mail_pwd)</span></span>
<span class="line"><span style="color:#24292e;">        smtpObj.sendmail(sender, mail_receivers, message.as_string())</span></span>
<span class="line"><span style="color:#24292e;">        smtpObj.quit()</span></span>
<span class="line"><span style="color:#24292e;">        print(&quot;邮件发送成功&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    except Exception as e:</span></span>
<span class="line"><span style="color:#24292e;">        print(e)</span></span>
<span class="line"><span style="color:#24292e;">    # except smtplib.SMTPException:</span></span>
<span class="line"><span style="color:#24292e;">        # print(&quot;Error: 无法发送邮件&quot;)</span></span></code></pre></div><h3 id="_3-主要功能代码" tabindex="-1">3.主要功能代码 <a class="header-anchor" href="#_3-主要功能代码" aria-label="Permalink to &quot;3.主要功能代码&quot;">​</a></h3><p>收集到的DB数据文件的信息保存到表mssql_dblogsize中，其建表的脚本如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE TABLE [dbo].[mssql_dblogsize](</span></span>
<span class="line"><span style="color:#e1e4e8;">    [id] [int] IDENTITY(1,1) NOT NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">    [createtime] [datetime] NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">    [vip] [nvarchar](100) NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">    [port] [nvarchar](100) NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">    [Environment] [nvarchar](200) NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">    [Dbname] [varchar](200) NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">    [Logical_Name] [varchar](200) NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">    [Physical_Name] [varchar](1500) NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">    [Size] [bigint] NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">PRIMARY KEY CLUSTERED </span></span>
<span class="line"><span style="color:#e1e4e8;">(</span></span>
<span class="line"><span style="color:#e1e4e8;">    [id] ASC</span></span>
<span class="line"><span style="color:#e1e4e8;">)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]</span></span>
<span class="line"><span style="color:#e1e4e8;">) ON [PRIMARY]</span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE [dbo].[mssql_dblogsize] ADD  DEFAULT (getdate()) FOR [createtime]</span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE TABLE [dbo].[mssql_dblogsize](</span></span>
<span class="line"><span style="color:#24292e;">    [id] [int] IDENTITY(1,1) NOT NULL,</span></span>
<span class="line"><span style="color:#24292e;">    [createtime] [datetime] NULL,</span></span>
<span class="line"><span style="color:#24292e;">    [vip] [nvarchar](100) NULL,</span></span>
<span class="line"><span style="color:#24292e;">    [port] [nvarchar](100) NULL,</span></span>
<span class="line"><span style="color:#24292e;">    [Environment] [nvarchar](200) NULL,</span></span>
<span class="line"><span style="color:#24292e;">    [Dbname] [varchar](200) NULL,</span></span>
<span class="line"><span style="color:#24292e;">    [Logical_Name] [varchar](200) NULL,</span></span>
<span class="line"><span style="color:#24292e;">    [Physical_Name] [varchar](1500) NULL,</span></span>
<span class="line"><span style="color:#24292e;">    [Size] [bigint] NULL,</span></span>
<span class="line"><span style="color:#24292e;">PRIMARY KEY CLUSTERED </span></span>
<span class="line"><span style="color:#24292e;">(</span></span>
<span class="line"><span style="color:#24292e;">    [id] ASC</span></span>
<span class="line"><span style="color:#24292e;">)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]</span></span>
<span class="line"><span style="color:#24292e;">) ON [PRIMARY]</span></span>
<span class="line"><span style="color:#24292e;">GO</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE [dbo].[mssql_dblogsize] ADD  DEFAULT (getdate()) FOR [createtime]</span></span>
<span class="line"><span style="color:#24292e;">GO</span></span></code></pre></div><p>为了方便对表mssql_dblogsize的数据进行管理和展示，在其基础上抽象加工出了一个视图v_mssql_dblogsize，注意Size大小的转换（Size/128/1024 as SizeGB）</p><p>创建视图的脚本如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE view [dbo].[v_mssql_dblogsize]</span></span>
<span class="line"><span style="color:#e1e4e8;">as </span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT [id]</span></span>
<span class="line"><span style="color:#e1e4e8;">      ,[createtime]</span></span>
<span class="line"><span style="color:#e1e4e8;">      ,[vip]</span></span>
<span class="line"><span style="color:#e1e4e8;">      ,[port]</span></span>
<span class="line"><span style="color:#e1e4e8;">      ,[Environment]</span></span>
<span class="line"><span style="color:#e1e4e8;">      ,[Dbname]</span></span>
<span class="line"><span style="color:#e1e4e8;">      ,[Logical_Name]</span></span>
<span class="line"><span style="color:#e1e4e8;">      ,[Physical_Name]</span></span>
<span class="line"><span style="color:#e1e4e8;">      ,Size/128/1024 as SizeGB</span></span>
<span class="line"><span style="color:#e1e4e8;">  FROM [dbo].[mssql_dblogsize] </span></span>
<span class="line"><span style="color:#e1e4e8;">where size &gt;50*128*1024</span></span>
<span class="line"><span style="color:#e1e4e8;">and Physical_Name like &#39;%ldf%&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE view [dbo].[v_mssql_dblogsize]</span></span>
<span class="line"><span style="color:#24292e;">as </span></span>
<span class="line"><span style="color:#24292e;">SELECT [id]</span></span>
<span class="line"><span style="color:#24292e;">      ,[createtime]</span></span>
<span class="line"><span style="color:#24292e;">      ,[vip]</span></span>
<span class="line"><span style="color:#24292e;">      ,[port]</span></span>
<span class="line"><span style="color:#24292e;">      ,[Environment]</span></span>
<span class="line"><span style="color:#24292e;">      ,[Dbname]</span></span>
<span class="line"><span style="color:#24292e;">      ,[Logical_Name]</span></span>
<span class="line"><span style="color:#24292e;">      ,[Physical_Name]</span></span>
<span class="line"><span style="color:#24292e;">      ,Size/128/1024 as SizeGB</span></span>
<span class="line"><span style="color:#24292e;">  FROM [dbo].[mssql_dblogsize] </span></span>
<span class="line"><span style="color:#24292e;">where size &gt;50*128*1024</span></span>
<span class="line"><span style="color:#24292e;">and Physical_Name like &#39;%ldf%&#39;</span></span>
<span class="line"><span style="color:#24292e;">GO</span></span></code></pre></div><p>本测试实例使用的数据库为qqDB，监控的各个DB Server保存在了表QQDBServer中，注意Port 不一定为标准端口1433.</p><p>collect_mssql_dblogsize_info.py</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># -*- coding: utf-8 -*-</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">import sys</span></span>
<span class="line"><span style="color:#e1e4e8;">import os</span></span>
<span class="line"><span style="color:#e1e4e8;">import configparser</span></span>
<span class="line"><span style="color:#e1e4e8;">import pymssql</span></span>
<span class="line"><span style="color:#e1e4e8;">import mssql_get_db_connect</span></span>
<span class="line"><span style="color:#e1e4e8;">import mssql_exec_sql</span></span>
<span class="line"><span style="color:#e1e4e8;">from datetime import datetime</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">def collect_mssql_dblogsize_info():</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    db_ps_file = os.path.join(sys.path[0], &quot;qqmssqltest_db_server_conf.ini&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    config = configparser.ConfigParser()</span></span>
<span class="line"><span style="color:#e1e4e8;">    config.read(db_ps_file, encoding=&quot;utf-8&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    m_db_host = config.get(&#39;sqlserver_qq&#39;, &#39;db_host&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    m_db_port = config.getint(&#39;sqlserver_qq&#39;, &#39;db_port&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 获取需要遍历的DB列表</span></span>
<span class="line"><span style="color:#e1e4e8;">    exec_sql_1 = &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT IP, case Port when &#39;1444,1433&#39; then &#39;1433&#39; else Port end as Port, Environment</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM qqDB.dbo.QQDBServer  </span></span>
<span class="line"><span style="color:#e1e4e8;">where InUse =1 AND ServerType IN (&#39;SQL&#39;) </span></span>
<span class="line"><span style="color:#e1e4e8;">and IP=VIP ;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    sql_rst_1 = mssql_exec_sql.mssql_exec_select_sql(m_db_host, m_db_port, exec_sql_1)</span></span>
<span class="line"><span style="color:#e1e4e8;">    for j in sql_rst_1:</span></span>
<span class="line"><span style="color:#e1e4e8;">        db_host_2 = j[0]</span></span>
<span class="line"><span style="color:#e1e4e8;">        db_port_2 = j[1]</span></span>
<span class="line"><span style="color:#e1e4e8;">        db_Environment = j[2]</span></span>
<span class="line"><span style="color:#e1e4e8;">        exec_sql_2 = &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        select &#39;&quot;&quot;&quot; + db_host_2 + &quot;&quot;&quot;&#39; as vip, &#39;&quot;&quot;&quot; + db_port_2 + &quot;&quot;&quot;&#39; as port, &#39;&quot;&quot;&quot; + db_Environment + &quot;&quot;&quot;&#39; as Environment,DB_NAME(database_id) AS DatabaseName,</span></span>
<span class="line"><span style="color:#e1e4e8;">Name AS Logical_Name,</span></span>
<span class="line"><span style="color:#e1e4e8;">Physical_Name, size </span></span>
<span class="line"><span style="color:#e1e4e8;">FROM master.sys.master_files;</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        try:</span></span>
<span class="line"><span style="color:#e1e4e8;">           sql_rst_2 = mssql_exec_sql.mssql_exec_select_sql(db_host_2, db_port_2, exec_sql_2)</span></span>
<span class="line"><span style="color:#e1e4e8;">        except Exception as e:</span></span>
<span class="line"><span style="color:#e1e4e8;">           print(e)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        for k in sql_rst_2:</span></span>
<span class="line"><span style="color:#e1e4e8;">           exec_sql_3 = &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">           insert into qqDB..mssql_dblogsize([vip], [port], [Environment], [Dbname], [Logical_Name], [Physical_Name], [Size]) </span></span>
<span class="line"><span style="color:#e1e4e8;">           values(&#39;%s&#39;, &#39;%s&#39;, &#39;%s&#39;, &#39;%s&#39;, &#39;%s&#39;, &#39;%s&#39;, &#39;%s&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">           &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">           conn = mssql_get_db_connect.mssql_get_db_connect(m_db_host, m_db_port)</span></span>
<span class="line"><span style="color:#e1e4e8;">           with conn.cursor() as cursor_db:</span></span>
<span class="line"><span style="color:#e1e4e8;">               cursor_db.execute(exec_sql_3 % (k[0], k[1], k[2], k[3], k[4], k[5], k[6] ))</span></span>
<span class="line"><span style="color:#e1e4e8;">               conn.commit()</span></span>
<span class="line"><span style="color:#e1e4e8;">collect_mssql_dblogsize_info()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># -*- coding: utf-8 -*-</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">import sys</span></span>
<span class="line"><span style="color:#24292e;">import os</span></span>
<span class="line"><span style="color:#24292e;">import configparser</span></span>
<span class="line"><span style="color:#24292e;">import pymssql</span></span>
<span class="line"><span style="color:#24292e;">import mssql_get_db_connect</span></span>
<span class="line"><span style="color:#24292e;">import mssql_exec_sql</span></span>
<span class="line"><span style="color:#24292e;">from datetime import datetime</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">def collect_mssql_dblogsize_info():</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    db_ps_file = os.path.join(sys.path[0], &quot;qqmssqltest_db_server_conf.ini&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    config = configparser.ConfigParser()</span></span>
<span class="line"><span style="color:#24292e;">    config.read(db_ps_file, encoding=&quot;utf-8&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    m_db_host = config.get(&#39;sqlserver_qq&#39;, &#39;db_host&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    m_db_port = config.getint(&#39;sqlserver_qq&#39;, &#39;db_port&#39;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 获取需要遍历的DB列表</span></span>
<span class="line"><span style="color:#24292e;">    exec_sql_1 = &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">SELECT IP, case Port when &#39;1444,1433&#39; then &#39;1433&#39; else Port end as Port, Environment</span></span>
<span class="line"><span style="color:#24292e;">FROM qqDB.dbo.QQDBServer  </span></span>
<span class="line"><span style="color:#24292e;">where InUse =1 AND ServerType IN (&#39;SQL&#39;) </span></span>
<span class="line"><span style="color:#24292e;">and IP=VIP ;</span></span>
<span class="line"><span style="color:#24292e;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">    sql_rst_1 = mssql_exec_sql.mssql_exec_select_sql(m_db_host, m_db_port, exec_sql_1)</span></span>
<span class="line"><span style="color:#24292e;">    for j in sql_rst_1:</span></span>
<span class="line"><span style="color:#24292e;">        db_host_2 = j[0]</span></span>
<span class="line"><span style="color:#24292e;">        db_port_2 = j[1]</span></span>
<span class="line"><span style="color:#24292e;">        db_Environment = j[2]</span></span>
<span class="line"><span style="color:#24292e;">        exec_sql_2 = &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">        select &#39;&quot;&quot;&quot; + db_host_2 + &quot;&quot;&quot;&#39; as vip, &#39;&quot;&quot;&quot; + db_port_2 + &quot;&quot;&quot;&#39; as port, &#39;&quot;&quot;&quot; + db_Environment + &quot;&quot;&quot;&#39; as Environment,DB_NAME(database_id) AS DatabaseName,</span></span>
<span class="line"><span style="color:#24292e;">Name AS Logical_Name,</span></span>
<span class="line"><span style="color:#24292e;">Physical_Name, size </span></span>
<span class="line"><span style="color:#24292e;">FROM master.sys.master_files;</span></span>
<span class="line"><span style="color:#24292e;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">        try:</span></span>
<span class="line"><span style="color:#24292e;">           sql_rst_2 = mssql_exec_sql.mssql_exec_select_sql(db_host_2, db_port_2, exec_sql_2)</span></span>
<span class="line"><span style="color:#24292e;">        except Exception as e:</span></span>
<span class="line"><span style="color:#24292e;">           print(e)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        for k in sql_rst_2:</span></span>
<span class="line"><span style="color:#24292e;">           exec_sql_3 = &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">           insert into qqDB..mssql_dblogsize([vip], [port], [Environment], [Dbname], [Logical_Name], [Physical_Name], [Size]) </span></span>
<span class="line"><span style="color:#24292e;">           values(&#39;%s&#39;, &#39;%s&#39;, &#39;%s&#39;, &#39;%s&#39;, &#39;%s&#39;, &#39;%s&#39;, &#39;%s&#39;);</span></span>
<span class="line"><span style="color:#24292e;">           &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">           conn = mssql_get_db_connect.mssql_get_db_connect(m_db_host, m_db_port)</span></span>
<span class="line"><span style="color:#24292e;">           with conn.cursor() as cursor_db:</span></span>
<span class="line"><span style="color:#24292e;">               cursor_db.execute(exec_sql_3 % (k[0], k[1], k[2], k[3], k[4], k[5], k[6] ))</span></span>
<span class="line"><span style="color:#24292e;">               conn.commit()</span></span>
<span class="line"><span style="color:#24292e;">collect_mssql_dblogsize_info()</span></span></code></pre></div><p>告警邮件的功能实现为mssql_alert_dblogsize.py,此份代码的告警阈值设置的为50G，数据来自于视图v_mssql_dblogsize。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># -*- coding: utf-8 -*-</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">import sys</span></span>
<span class="line"><span style="color:#e1e4e8;">import os</span></span>
<span class="line"><span style="color:#e1e4e8;">import configparser</span></span>
<span class="line"><span style="color:#e1e4e8;">import pymssql</span></span>
<span class="line"><span style="color:#e1e4e8;">import mssql_get_db_connect</span></span>
<span class="line"><span style="color:#e1e4e8;">import mssql_exec_sql</span></span>
<span class="line"><span style="color:#e1e4e8;">import datetime</span></span>
<span class="line"><span style="color:#e1e4e8;">import send_monitor_mail</span></span>
<span class="line"><span style="color:#e1e4e8;">import pandas as pd</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">def mssql_alert_dblogsize():</span></span>
<span class="line"><span style="color:#e1e4e8;">    mail_subject = &quot;SQL Server DB Log Size Greater than 50G, please check!!! &quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    mail_receivers = &quot;testDBAgrp@qtiantianq.com&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    db_ps_file = os.path.join(sys.path[0], &quot;qqmssqltest_db_server_conf.ini&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    config = configparser.ConfigParser()</span></span>
<span class="line"><span style="color:#e1e4e8;">    config.read(db_ps_file, encoding=&quot;utf-8&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    m_db_host = config.get(&#39;sqlserver_qq&#39;, &#39;db_host&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    m_db_port = config.getint(&#39;sqlserver_qq&#39;, &#39;db_port&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 获取需要遍历的DB列表</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    exec_sql_4 = &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        SELECT [vip] as IP,[port],[Environment],[Dbname]</span></span>
<span class="line"><span style="color:#e1e4e8;">      ,[Logical_Name],[Physical_Name],[SizeGB],[createtime]</span></span>
<span class="line"><span style="color:#e1e4e8;">  FROM qqDB.[dbo].[v_mssql_dblogsize]</span></span>
<span class="line"><span style="color:#e1e4e8;">  order by VIP,Dbname;</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    sql_rst_4, col_name = mssql_exec_sql.mssql_exec_select_sql_include_colnames(m_db_host, m_db_port, exec_sql_4)</span></span>
<span class="line"><span style="color:#e1e4e8;">    # print(sql_rst_4)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    if len(sql_rst_4):</span></span>
<span class="line"><span style="color:#e1e4e8;">        mail_time = datetime.datetime.now().strftime(&#39;%Y-%m-%d %H:%M:%S&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        columns = []</span></span>
<span class="line"><span style="color:#e1e4e8;">        for i in range(len(col_name)):</span></span>
<span class="line"><span style="color:#e1e4e8;">            columns.append(col_name[i][0])</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        df = pd.DataFrame(columns=columns)</span></span>
<span class="line"><span style="color:#e1e4e8;">        for i in range(len(sql_rst_4)):</span></span>
<span class="line"><span style="color:#e1e4e8;">            df.loc[i] = list(sql_rst_4[i])</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        mail_body = df.to_html(index=False, justify=&quot;left&quot;).replace(&#39;&lt;th&gt;&#39;, &#39;&lt;th style = &quot;color:red; text-align:left; background-color: yellow&quot;&gt;&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">        mail_html = &quot;&lt;html&gt;&lt;body&gt;&lt;h4&gt;&quot; + &quot;Deal All : &quot; + &quot;&lt;br&gt;&lt;h4&gt;&quot; + &quot;以下数据库的db log文件，已大于50G.请及时检查，谢谢！ &quot; + &quot;&lt;br&gt;&lt;h4&gt;&quot; + mail_body + &quot;&lt;/body&gt;&lt;/html&gt;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        send_monitor_mail.send_monitor_mail(mail_subject=mail_subject, mail_body=mail_html, mail_receivers=mail_receivers)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mssql_alert_dblogsize()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># -*- coding: utf-8 -*-</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">import sys</span></span>
<span class="line"><span style="color:#24292e;">import os</span></span>
<span class="line"><span style="color:#24292e;">import configparser</span></span>
<span class="line"><span style="color:#24292e;">import pymssql</span></span>
<span class="line"><span style="color:#24292e;">import mssql_get_db_connect</span></span>
<span class="line"><span style="color:#24292e;">import mssql_exec_sql</span></span>
<span class="line"><span style="color:#24292e;">import datetime</span></span>
<span class="line"><span style="color:#24292e;">import send_monitor_mail</span></span>
<span class="line"><span style="color:#24292e;">import pandas as pd</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">def mssql_alert_dblogsize():</span></span>
<span class="line"><span style="color:#24292e;">    mail_subject = &quot;SQL Server DB Log Size Greater than 50G, please check!!! &quot;</span></span>
<span class="line"><span style="color:#24292e;">    mail_receivers = &quot;testDBAgrp@qtiantianq.com&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    db_ps_file = os.path.join(sys.path[0], &quot;qqmssqltest_db_server_conf.ini&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    config = configparser.ConfigParser()</span></span>
<span class="line"><span style="color:#24292e;">    config.read(db_ps_file, encoding=&quot;utf-8&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    m_db_host = config.get(&#39;sqlserver_qq&#39;, &#39;db_host&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    m_db_port = config.getint(&#39;sqlserver_qq&#39;, &#39;db_port&#39;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 获取需要遍历的DB列表</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    exec_sql_4 = &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">        SELECT [vip] as IP,[port],[Environment],[Dbname]</span></span>
<span class="line"><span style="color:#24292e;">      ,[Logical_Name],[Physical_Name],[SizeGB],[createtime]</span></span>
<span class="line"><span style="color:#24292e;">  FROM qqDB.[dbo].[v_mssql_dblogsize]</span></span>
<span class="line"><span style="color:#24292e;">  order by VIP,Dbname;</span></span>
<span class="line"><span style="color:#24292e;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">    sql_rst_4, col_name = mssql_exec_sql.mssql_exec_select_sql_include_colnames(m_db_host, m_db_port, exec_sql_4)</span></span>
<span class="line"><span style="color:#24292e;">    # print(sql_rst_4)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    if len(sql_rst_4):</span></span>
<span class="line"><span style="color:#24292e;">        mail_time = datetime.datetime.now().strftime(&#39;%Y-%m-%d %H:%M:%S&#39;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        columns = []</span></span>
<span class="line"><span style="color:#24292e;">        for i in range(len(col_name)):</span></span>
<span class="line"><span style="color:#24292e;">            columns.append(col_name[i][0])</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        df = pd.DataFrame(columns=columns)</span></span>
<span class="line"><span style="color:#24292e;">        for i in range(len(sql_rst_4)):</span></span>
<span class="line"><span style="color:#24292e;">            df.loc[i] = list(sql_rst_4[i])</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        mail_body = df.to_html(index=False, justify=&quot;left&quot;).replace(&#39;&lt;th&gt;&#39;, &#39;&lt;th style = &quot;color:red; text-align:left; background-color: yellow&quot;&gt;&#39;)</span></span>
<span class="line"><span style="color:#24292e;">        mail_html = &quot;&lt;html&gt;&lt;body&gt;&lt;h4&gt;&quot; + &quot;Deal All : &quot; + &quot;&lt;br&gt;&lt;h4&gt;&quot; + &quot;以下数据库的db log文件，已大于50G.请及时检查，谢谢！ &quot; + &quot;&lt;br&gt;&lt;h4&gt;&quot; + mail_body + &quot;&lt;/body&gt;&lt;/html&gt;&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        send_monitor_mail.send_monitor_mail(mail_subject=mail_subject, mail_body=mail_html, mail_receivers=mail_receivers)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mssql_alert_dblogsize()</span></span></code></pre></div>`,20),o=[p];function c(t,i,r,_,y,d){return n(),a("div",null,o)}const u=s(l,[["render",c]]);export{q as __pageData,u as default};
