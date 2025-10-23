import{_ as n,D as a,o as e,c as p,I as l,w as o,R as t,a as c}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/cloud/ali/1-dns.md","filePath":"guide/cloud/ali/1-dns.md","lastUpdated":1701247404000}'),i={name:"guide/cloud/ali/1-dns.md"},r=t(`<ul><li>定时任务检查域名解析，调用alidns.sh更新DNS解析</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;"># alidns.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">#https://www.cnblogs.com/elvi/p/11663910.html</span></span>
<span class="line"><span style="color:#e1e4e8;">#阿里云DNS api接口 shell 更改DNS解析</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##############################</span></span>
<span class="line"><span style="color:#e1e4e8;">which dig &amp;&gt;/dev/null || { yum install -y bind-utils ; } || { echo &quot;need to install dig&quot;;exit 1; }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##配置</span></span>
<span class="line"><span style="color:#e1e4e8;">host=&quot;abcd&quot; #主机名</span></span>
<span class="line"><span style="color:#e1e4e8;">domain=&quot;qq.com&quot; #域名</span></span>
<span class="line"><span style="color:#e1e4e8;">ak=&quot;LTAI4FoDtp4y7ENqxxxxxxxxxx&quot;  #阿里云AccessKey ID</span></span>
<span class="line"><span style="color:#e1e4e8;">sk=&quot;lVNCxCVGciaJqUxxxxxxxxxxxx&amp;&quot;  #阿里云Access Key Secret  后面多个 &amp;</span></span>
<span class="line"><span style="color:#e1e4e8;">timestamp=\`date -u +&quot;%Y-%m-%dT%H:%M:%SZ&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##############################</span></span>
<span class="line"><span style="color:#e1e4e8;">#hash签名使用</span></span>
<span class="line"><span style="color:#e1e4e8;">urlencode1() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    local length=&quot;\${#1}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    i=0</span></span>
<span class="line"><span style="color:#e1e4e8;">    out=&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    for i in $(awk &quot;BEGIN { for ( i=0; i&lt;$length; i++ ) { print i; } }&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    do</span></span>
<span class="line"><span style="color:#e1e4e8;">        local c=&quot;\${1:$i:1}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        case $c in</span></span>
<span class="line"><span style="color:#e1e4e8;">            [a-zA-Z0-9.~&#39;&amp;&#39;=_-]) out=&quot;$out$c&quot; ;;</span></span>
<span class="line"><span style="color:#e1e4e8;">            *) out=&quot;$out\`printf &#39;%%%02X&#39; &quot;&#39;$c&quot;\`&quot; ;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        esac</span></span>
<span class="line"><span style="color:#e1e4e8;">        i=$(($i + 1))</span></span>
<span class="line"><span style="color:#e1e4e8;">     done</span></span>
<span class="line"><span style="color:#e1e4e8;">     echo -n $out</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">urlencode2() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    local length=&quot;\${#1}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    i=0</span></span>
<span class="line"><span style="color:#e1e4e8;">    out=&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    for i in $(awk &quot;BEGIN { for ( i=0; i&lt;$length; i++ ) { print i; } }&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    do</span></span>
<span class="line"><span style="color:#e1e4e8;">        local c=&quot;\${1:$i:1}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        case $c in</span></span>
<span class="line"><span style="color:#e1e4e8;">            [a-zA-Z0-9.~_-]) out=&quot;$out$c&quot; ;;</span></span>
<span class="line"><span style="color:#e1e4e8;">            *) out=&quot;$out\`printf &#39;%%%02X&#39; &quot;&#39;$c&quot;\`&quot; ;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        esac</span></span>
<span class="line"><span style="color:#e1e4e8;">        i=$(($i + 1))</span></span>
<span class="line"><span style="color:#e1e4e8;">     done</span></span>
<span class="line"><span style="color:#e1e4e8;">     echo -n $out</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##############################</span></span>
<span class="line"><span style="color:#e1e4e8;">#函数</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">send_request() {   </span></span>
<span class="line"><span style="color:#e1e4e8;">args=&quot;AccessKeyId=$ak&amp;Action=$1&amp;Format=json&amp;$2&amp;Version=2015-01-09&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">StringToSign1=&quot;$(urlencode1 $args)&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">StringToSign2=&quot;GET&amp;%2F&amp;$(urlencode2 $StringToSign1)&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">hash=$(urlencode2 $(echo -n &quot;$StringToSign2&quot; | openssl dgst -sha1 -hmac $sk -binary | openssl base64))</span></span>
<span class="line"><span style="color:#e1e4e8;">RESULT=$(curl -k -s &quot;https://alidns.aliyuncs.com/?$args&amp;Signature=$hash&quot;)  ## 2&gt; /dev/null)</span></span>
<span class="line"><span style="color:#e1e4e8;">echo $RESULT</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">query_recordid() {</span></span>
<span class="line"><span style="color:#e1e4e8;"> if [ &quot;$host&quot; = &quot;@&quot; ]; then </span></span>
<span class="line"><span style="color:#e1e4e8;">echo \`send_request &quot;DescribeSubDomainRecords&quot; &quot;SignatureMethod=HMAC-SHA1&amp;SignatureNonce=$timestamp&amp;SignatureVersion=1.0&amp;SubDomain=$domain&amp;Timestamp=$timestamp&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;"> else</span></span>
<span class="line"><span style="color:#e1e4e8;">echo \`send_request &quot;DescribeSubDomainRecords&quot; &quot;SignatureMethod=HMAC-SHA1&amp;SignatureNonce=$timestamp&amp;SignatureVersion=1.0&amp;SubDomain=$host.$domain&amp;Timestamp=$timestamp&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;"> fi</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">update_record() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    echo \`send_request &quot;UpdateDomainRecord&quot; &quot;RR=$host&amp;RecordId=$1&amp;SignatureMethod=HMAC-SHA1&amp;SignatureNonce=$timestamp&amp;SignatureVersion=1.0&amp;Timestamp=$timestamp&amp;Type=A&amp;Value=$ip&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">add_record() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    echo \`send_request &quot;AddDomainRecord&amp;DomainName=$domain&quot; &quot;RR=$host&amp;SignatureMethod=HMAC-SHA1&amp;SignatureNonce=$timestamp&amp;SignatureVersion=1.0&amp;Timestamp=$timestamp&amp;Type=A&amp;Value=$ip&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_host() {</span></span>
<span class="line"><span style="color:#e1e4e8;">#echo &quot;新增解析&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">RESULT=\`add_record\`</span></span>
<span class="line"><span style="color:#e1e4e8;">record_id=$(echo $RESULT | grep -o &quot;RecordId\\&quot;:\\&quot;[0-9]*\\&quot;&quot; | grep -o &quot;[0-9]*&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">[ &quot;$record_id&quot; = &quot;&quot; ] &amp;&amp; { echo &quot;$host.$domain  $ip  AddError&quot;;exit 1; }</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;$host.$domain  $ip  AddHost $(date +&#39;%F %T&#39;)&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">up_host() {</span></span>
<span class="line"><span style="color:#e1e4e8;">#echo &quot;更新解析&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#查询RecordId</span></span>
<span class="line"><span style="color:#e1e4e8;">RESULT=\`query_recordid\`</span></span>
<span class="line"><span style="color:#e1e4e8;">record_id=$(echo $RESULT | grep -o &quot;RecordId\\&quot;:\\&quot;[0-9]*&quot; | grep -o &quot;[0-9]*&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">[ &quot;$record_id&quot; = &quot;&quot; ] &amp;&amp; { echo &quot;get record_id error&quot;;exit 1; }</span></span>
<span class="line"><span style="color:#e1e4e8;">#更新</span></span>
<span class="line"><span style="color:#e1e4e8;">RESULT=\`update_record $record_id\`</span></span>
<span class="line"><span style="color:#e1e4e8;">record_id=$(echo $RESULT | grep -o &quot;RecordId\\&quot;:\\&quot;[0-9]*\\&quot;&quot; | grep -o &quot;[0-9]*&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">[ &quot;$record_id&quot; = &quot;&quot; ] &amp;&amp; { echo &quot;$host.$domain  $ip  UpError&quot;;exit 1; }</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;$host.$domain    $ip  UpHost $(date +&#39;%F %T&#39;)&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##############################</span></span>
<span class="line"><span style="color:#e1e4e8;">#获取本地外网ip并更新dns</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># #ip</span></span>
<span class="line"><span style="color:#e1e4e8;"># UA=&quot;Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 6.3; blog.elven.vip)&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"># ip=$(curl -s -A &quot;$UA&quot; http://ipv4.icanhazip.com)</span></span>
<span class="line"><span style="color:#e1e4e8;"># ip_dns=$(dig @dns23.hichina.com \${host}.\${domain} A +short)</span></span>
<span class="line"><span style="color:#e1e4e8;"># # echo ip  $ip</span></span>
<span class="line"><span style="color:#e1e4e8;"># # echo ip_dns  $ip_dns</span></span>
<span class="line"><span style="color:#e1e4e8;"># [ -n &quot;$ip&quot; ] || { echo &quot;ip error&quot;; }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># if [ -n &quot;$ip_dns&quot; -a &quot;$ip_dns&quot; = &quot;$ip&quot; ];then</span></span>
<span class="line"><span style="color:#e1e4e8;">    # echo &quot;$host.$domain    $ip_dns&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"># elif [ &quot;$ip_dns&quot; = &quot;&quot; ];then</span></span>
<span class="line"><span style="color:#e1e4e8;">    # add_host</span></span>
<span class="line"><span style="color:#e1e4e8;"># else</span></span>
<span class="line"><span style="color:#e1e4e8;">    # up_host</span></span>
<span class="line"><span style="color:#e1e4e8;"># fi</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##############################</span></span>
<span class="line"><span style="color:#e1e4e8;">#传参  主机 域名 ip</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">alidns() {</span></span>
<span class="line"><span style="color:#e1e4e8;"># var:  host domain ip</span></span>
<span class="line"><span style="color:#e1e4e8;">host=&quot;$1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">domain=$2</span></span>
<span class="line"><span style="color:#e1e4e8;">ip=$3</span></span>
<span class="line"><span style="color:#e1e4e8;">ip_dns=$(dig @dns23.hichina.com \${host}.\${domain} A +short)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if [ $# -eq 2 ];then</span></span>
<span class="line"><span style="color:#e1e4e8;">    if [ -n &quot;$ip_dns&quot; ];then</span></span>
<span class="line"><span style="color:#e1e4e8;">        echo &quot;$host.$domain    $ip_dns&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    else</span></span>
<span class="line"><span style="color:#e1e4e8;">        echo &quot;$host.$domain  no found&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    fi</span></span>
<span class="line"><span style="color:#e1e4e8;">elif [ $# -eq 3 ];then</span></span>
<span class="line"><span style="color:#e1e4e8;">    if [ &quot;$ip&quot; = &quot;$ip_dns&quot; ];then</span></span>
<span class="line"><span style="color:#e1e4e8;">        echo &quot;$host.$domain    $ip_dns&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    else</span></span>
<span class="line"><span style="color:#e1e4e8;">        [ \`echo $ip |grep -oE &#39;[0-9]{0,3}\\.[0-9]{0,3}\\.[0-9]{0,3}\\.[0-9]{0,3}&#39; |wc -l\` -eq 0 ] &amp;&amp; { echo &quot;ip $ip error&quot;;exit 1; }</span></span>
<span class="line"><span style="color:#e1e4e8;">        [ &quot;$ip_dns&quot; = &quot;&quot; ] &amp;&amp; { add_host ; } || { up_host ; }</span></span>
<span class="line"><span style="color:#e1e4e8;">    fi</span></span>
<span class="line"><span style="color:#e1e4e8;">else</span></span>
<span class="line"><span style="color:#e1e4e8;">    echo &quot;eg:$0  www  abc.com  192.168.18.18&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">alidns &quot;$@&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 使用实例 增加或更新  *.abc.elven.vip ,通配符使用&#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"># bash alidns.sh  &#39;*.abc&#39;  elven.vip  192.168.18.18</span></span>
<span class="line"><span style="color:#e1e4e8;">##############################</span></span>
<span class="line"><span style="color:#e1e4e8;"># api https://help.aliyun.com/knowledge_detail/39863.html</span></span>
<span class="line"><span style="color:#e1e4e8;">##############################</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;"># alidns.sh</span></span>
<span class="line"><span style="color:#24292e;">#https://www.cnblogs.com/elvi/p/11663910.html</span></span>
<span class="line"><span style="color:#24292e;">#阿里云DNS api接口 shell 更改DNS解析</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##############################</span></span>
<span class="line"><span style="color:#24292e;">which dig &amp;&gt;/dev/null || { yum install -y bind-utils ; } || { echo &quot;need to install dig&quot;;exit 1; }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##配置</span></span>
<span class="line"><span style="color:#24292e;">host=&quot;abcd&quot; #主机名</span></span>
<span class="line"><span style="color:#24292e;">domain=&quot;qq.com&quot; #域名</span></span>
<span class="line"><span style="color:#24292e;">ak=&quot;LTAI4FoDtp4y7ENqxxxxxxxxxx&quot;  #阿里云AccessKey ID</span></span>
<span class="line"><span style="color:#24292e;">sk=&quot;lVNCxCVGciaJqUxxxxxxxxxxxx&amp;&quot;  #阿里云Access Key Secret  后面多个 &amp;</span></span>
<span class="line"><span style="color:#24292e;">timestamp=\`date -u +&quot;%Y-%m-%dT%H:%M:%SZ&quot;\`</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##############################</span></span>
<span class="line"><span style="color:#24292e;">#hash签名使用</span></span>
<span class="line"><span style="color:#24292e;">urlencode1() {</span></span>
<span class="line"><span style="color:#24292e;">    local length=&quot;\${#1}&quot;</span></span>
<span class="line"><span style="color:#24292e;">    i=0</span></span>
<span class="line"><span style="color:#24292e;">    out=&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">    for i in $(awk &quot;BEGIN { for ( i=0; i&lt;$length; i++ ) { print i; } }&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    do</span></span>
<span class="line"><span style="color:#24292e;">        local c=&quot;\${1:$i:1}&quot;</span></span>
<span class="line"><span style="color:#24292e;">        case $c in</span></span>
<span class="line"><span style="color:#24292e;">            [a-zA-Z0-9.~&#39;&amp;&#39;=_-]) out=&quot;$out$c&quot; ;;</span></span>
<span class="line"><span style="color:#24292e;">            *) out=&quot;$out\`printf &#39;%%%02X&#39; &quot;&#39;$c&quot;\`&quot; ;;</span></span>
<span class="line"><span style="color:#24292e;">        esac</span></span>
<span class="line"><span style="color:#24292e;">        i=$(($i + 1))</span></span>
<span class="line"><span style="color:#24292e;">     done</span></span>
<span class="line"><span style="color:#24292e;">     echo -n $out</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">urlencode2() {</span></span>
<span class="line"><span style="color:#24292e;">    local length=&quot;\${#1}&quot;</span></span>
<span class="line"><span style="color:#24292e;">    i=0</span></span>
<span class="line"><span style="color:#24292e;">    out=&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">    for i in $(awk &quot;BEGIN { for ( i=0; i&lt;$length; i++ ) { print i; } }&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    do</span></span>
<span class="line"><span style="color:#24292e;">        local c=&quot;\${1:$i:1}&quot;</span></span>
<span class="line"><span style="color:#24292e;">        case $c in</span></span>
<span class="line"><span style="color:#24292e;">            [a-zA-Z0-9.~_-]) out=&quot;$out$c&quot; ;;</span></span>
<span class="line"><span style="color:#24292e;">            *) out=&quot;$out\`printf &#39;%%%02X&#39; &quot;&#39;$c&quot;\`&quot; ;;</span></span>
<span class="line"><span style="color:#24292e;">        esac</span></span>
<span class="line"><span style="color:#24292e;">        i=$(($i + 1))</span></span>
<span class="line"><span style="color:#24292e;">     done</span></span>
<span class="line"><span style="color:#24292e;">     echo -n $out</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##############################</span></span>
<span class="line"><span style="color:#24292e;">#函数</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">send_request() {   </span></span>
<span class="line"><span style="color:#24292e;">args=&quot;AccessKeyId=$ak&amp;Action=$1&amp;Format=json&amp;$2&amp;Version=2015-01-09&quot;</span></span>
<span class="line"><span style="color:#24292e;">StringToSign1=&quot;$(urlencode1 $args)&quot;</span></span>
<span class="line"><span style="color:#24292e;">StringToSign2=&quot;GET&amp;%2F&amp;$(urlencode2 $StringToSign1)&quot;</span></span>
<span class="line"><span style="color:#24292e;">hash=$(urlencode2 $(echo -n &quot;$StringToSign2&quot; | openssl dgst -sha1 -hmac $sk -binary | openssl base64))</span></span>
<span class="line"><span style="color:#24292e;">RESULT=$(curl -k -s &quot;https://alidns.aliyuncs.com/?$args&amp;Signature=$hash&quot;)  ## 2&gt; /dev/null)</span></span>
<span class="line"><span style="color:#24292e;">echo $RESULT</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">query_recordid() {</span></span>
<span class="line"><span style="color:#24292e;"> if [ &quot;$host&quot; = &quot;@&quot; ]; then </span></span>
<span class="line"><span style="color:#24292e;">echo \`send_request &quot;DescribeSubDomainRecords&quot; &quot;SignatureMethod=HMAC-SHA1&amp;SignatureNonce=$timestamp&amp;SignatureVersion=1.0&amp;SubDomain=$domain&amp;Timestamp=$timestamp&quot;\`</span></span>
<span class="line"><span style="color:#24292e;"> else</span></span>
<span class="line"><span style="color:#24292e;">echo \`send_request &quot;DescribeSubDomainRecords&quot; &quot;SignatureMethod=HMAC-SHA1&amp;SignatureNonce=$timestamp&amp;SignatureVersion=1.0&amp;SubDomain=$host.$domain&amp;Timestamp=$timestamp&quot;\`</span></span>
<span class="line"><span style="color:#24292e;"> fi</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">update_record() {</span></span>
<span class="line"><span style="color:#24292e;">    echo \`send_request &quot;UpdateDomainRecord&quot; &quot;RR=$host&amp;RecordId=$1&amp;SignatureMethod=HMAC-SHA1&amp;SignatureNonce=$timestamp&amp;SignatureVersion=1.0&amp;Timestamp=$timestamp&amp;Type=A&amp;Value=$ip&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">add_record() {</span></span>
<span class="line"><span style="color:#24292e;">    echo \`send_request &quot;AddDomainRecord&amp;DomainName=$domain&quot; &quot;RR=$host&amp;SignatureMethod=HMAC-SHA1&amp;SignatureNonce=$timestamp&amp;SignatureVersion=1.0&amp;Timestamp=$timestamp&amp;Type=A&amp;Value=$ip&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_host() {</span></span>
<span class="line"><span style="color:#24292e;">#echo &quot;新增解析&quot;</span></span>
<span class="line"><span style="color:#24292e;">RESULT=\`add_record\`</span></span>
<span class="line"><span style="color:#24292e;">record_id=$(echo $RESULT | grep -o &quot;RecordId\\&quot;:\\&quot;[0-9]*\\&quot;&quot; | grep -o &quot;[0-9]*&quot;)</span></span>
<span class="line"><span style="color:#24292e;">[ &quot;$record_id&quot; = &quot;&quot; ] &amp;&amp; { echo &quot;$host.$domain  $ip  AddError&quot;;exit 1; }</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;$host.$domain  $ip  AddHost $(date +&#39;%F %T&#39;)&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">up_host() {</span></span>
<span class="line"><span style="color:#24292e;">#echo &quot;更新解析&quot;</span></span>
<span class="line"><span style="color:#24292e;">#查询RecordId</span></span>
<span class="line"><span style="color:#24292e;">RESULT=\`query_recordid\`</span></span>
<span class="line"><span style="color:#24292e;">record_id=$(echo $RESULT | grep -o &quot;RecordId\\&quot;:\\&quot;[0-9]*&quot; | grep -o &quot;[0-9]*&quot;)</span></span>
<span class="line"><span style="color:#24292e;">[ &quot;$record_id&quot; = &quot;&quot; ] &amp;&amp; { echo &quot;get record_id error&quot;;exit 1; }</span></span>
<span class="line"><span style="color:#24292e;">#更新</span></span>
<span class="line"><span style="color:#24292e;">RESULT=\`update_record $record_id\`</span></span>
<span class="line"><span style="color:#24292e;">record_id=$(echo $RESULT | grep -o &quot;RecordId\\&quot;:\\&quot;[0-9]*\\&quot;&quot; | grep -o &quot;[0-9]*&quot;)</span></span>
<span class="line"><span style="color:#24292e;">[ &quot;$record_id&quot; = &quot;&quot; ] &amp;&amp; { echo &quot;$host.$domain  $ip  UpError&quot;;exit 1; }</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;$host.$domain    $ip  UpHost $(date +&#39;%F %T&#39;)&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##############################</span></span>
<span class="line"><span style="color:#24292e;">#获取本地外网ip并更新dns</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># #ip</span></span>
<span class="line"><span style="color:#24292e;"># UA=&quot;Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 6.3; blog.elven.vip)&quot;</span></span>
<span class="line"><span style="color:#24292e;"># ip=$(curl -s -A &quot;$UA&quot; http://ipv4.icanhazip.com)</span></span>
<span class="line"><span style="color:#24292e;"># ip_dns=$(dig @dns23.hichina.com \${host}.\${domain} A +short)</span></span>
<span class="line"><span style="color:#24292e;"># # echo ip  $ip</span></span>
<span class="line"><span style="color:#24292e;"># # echo ip_dns  $ip_dns</span></span>
<span class="line"><span style="color:#24292e;"># [ -n &quot;$ip&quot; ] || { echo &quot;ip error&quot;; }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># if [ -n &quot;$ip_dns&quot; -a &quot;$ip_dns&quot; = &quot;$ip&quot; ];then</span></span>
<span class="line"><span style="color:#24292e;">    # echo &quot;$host.$domain    $ip_dns&quot;</span></span>
<span class="line"><span style="color:#24292e;"># elif [ &quot;$ip_dns&quot; = &quot;&quot; ];then</span></span>
<span class="line"><span style="color:#24292e;">    # add_host</span></span>
<span class="line"><span style="color:#24292e;"># else</span></span>
<span class="line"><span style="color:#24292e;">    # up_host</span></span>
<span class="line"><span style="color:#24292e;"># fi</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##############################</span></span>
<span class="line"><span style="color:#24292e;">#传参  主机 域名 ip</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">alidns() {</span></span>
<span class="line"><span style="color:#24292e;"># var:  host domain ip</span></span>
<span class="line"><span style="color:#24292e;">host=&quot;$1&quot;</span></span>
<span class="line"><span style="color:#24292e;">domain=$2</span></span>
<span class="line"><span style="color:#24292e;">ip=$3</span></span>
<span class="line"><span style="color:#24292e;">ip_dns=$(dig @dns23.hichina.com \${host}.\${domain} A +short)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if [ $# -eq 2 ];then</span></span>
<span class="line"><span style="color:#24292e;">    if [ -n &quot;$ip_dns&quot; ];then</span></span>
<span class="line"><span style="color:#24292e;">        echo &quot;$host.$domain    $ip_dns&quot;</span></span>
<span class="line"><span style="color:#24292e;">    else</span></span>
<span class="line"><span style="color:#24292e;">        echo &quot;$host.$domain  no found&quot;</span></span>
<span class="line"><span style="color:#24292e;">    fi</span></span>
<span class="line"><span style="color:#24292e;">elif [ $# -eq 3 ];then</span></span>
<span class="line"><span style="color:#24292e;">    if [ &quot;$ip&quot; = &quot;$ip_dns&quot; ];then</span></span>
<span class="line"><span style="color:#24292e;">        echo &quot;$host.$domain    $ip_dns&quot;</span></span>
<span class="line"><span style="color:#24292e;">    else</span></span>
<span class="line"><span style="color:#24292e;">        [ \`echo $ip |grep -oE &#39;[0-9]{0,3}\\.[0-9]{0,3}\\.[0-9]{0,3}\\.[0-9]{0,3}&#39; |wc -l\` -eq 0 ] &amp;&amp; { echo &quot;ip $ip error&quot;;exit 1; }</span></span>
<span class="line"><span style="color:#24292e;">        [ &quot;$ip_dns&quot; = &quot;&quot; ] &amp;&amp; { add_host ; } || { up_host ; }</span></span>
<span class="line"><span style="color:#24292e;">    fi</span></span>
<span class="line"><span style="color:#24292e;">else</span></span>
<span class="line"><span style="color:#24292e;">    echo &quot;eg:$0  www  abc.com  192.168.18.18&quot;</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">alidns &quot;$@&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 使用实例 增加或更新  *.abc.elven.vip ,通配符使用&#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;"># bash alidns.sh  &#39;*.abc&#39;  elven.vip  192.168.18.18</span></span>
<span class="line"><span style="color:#24292e;">##############################</span></span>
<span class="line"><span style="color:#24292e;"># api https://help.aliyun.com/knowledge_detail/39863.html</span></span>
<span class="line"><span style="color:#24292e;">##############################</span></span></code></pre></div>`,2);function u(q,y,d,$,m,h){const s=a("center");return e(),p("div",null,[l(s,null,{default:o(()=>[c("阿里云DNS api接口 shell 更改DNS解析")]),_:1}),r])}const S=n(i,[["render",u]]);export{g as __pageData,S as default};
