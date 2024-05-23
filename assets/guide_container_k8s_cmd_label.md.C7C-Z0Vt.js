import{_ as e,c as l,o as a,R as o}from"./chunks/framework.CIzs38F0.js";const u=JSON.parse('{"title":"Label","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/cmd/label.md","filePath":"guide/container/k8s/cmd/label.md","lastUpdated":1714030813000}'),t={name:"guide/container/k8s/cmd/label.md"},i=o('<h1 id="label" tabindex="-1">Label <a class="header-anchor" href="#label" aria-label="Permalink to &quot;Label&quot;">​</a></h1><ol><li>Label是一个键值对，可以附加在任何对象上，比如Node,Pod,Service,RC等。Label和资源对象是多对多的关系，即一个Label可以被添加到多个对象上，一个对象也可以定义多个Label。</li><li>Label的作用主要用来实现精细的、多维度的资源分组管理，以便进行资源分配，调度，配置，部署等工作。</li><li>Label通俗理解就是“标签”，通过标签来过滤筛选指定的对象，进行具体的操作。k8s通过Label Selector(标签选择器)来筛选指定Label的资源对象，类似SQL语句中的条件查询（WHERE语句）。</li><li>Label Selector有基于等式和基于集合的两种表达方式，可以多个条件进行组合使用。</li></ol><ul><li>基于等式：name=redis-slave（匹配name=redis-slave的资源对象）;env!=product(匹配所有不具有标签env=product的资源对象)</li><li>基于集合：name in (redis-slave,redis-master);name not in (php-frontend)（匹配所有不具有标签name=php-frontend的资源对象）</li></ul><p><strong>使用场景</strong></p><ol><li>kube-controller进程通过资源对象RC上定义的Label Selector来筛选要监控的Pod副本数，从而实现副本数始终保持预期数目。</li><li>kube-proxy进程通过Service的Label Selector来选择对应Pod，自动建立每个Service到对应Pod的请求转发路由表，从而实现Service的智能负载均衡机制。</li><li>kube-scheduler实现Pod定向调度：对Node定义特定的Label，并且在Pod定义文件中使用NodeSelector标签调度策略。</li></ol>',5),r=[i];function n(d,c,s,_,b,p){return a(),l("div",null,r)}const L=e(t,[["render",n]]);export{u as __pageData,L as default};