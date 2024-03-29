import{_ as e,c as t,o as a,R as s}from"./chunks/framework.CIzs38F0.js";const _="/assets/20180805225806412.D4dncwth.png",u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/rabbitmq/4-持久化.md","filePath":"guide/Database/rabbitmq/4-持久化.md","lastUpdated":1710405635000}'),i={name:"guide/Database/rabbitmq/4-持久化.md"},o=s('<p>RabbitMQ中<strong>持久化</strong>的概念，所谓持久化，就是RabbitMQ会将内存中的数据(Exchange 交换器，Queue 队列，Message 消息)固化到磁盘，以防异常情况发生时，数据丢失。</p><p>其中，RabbitMQ的持久化分为三个部分：</p><ol><li>交换器(Exchange)的持久化</li><li>队列(Queue)的持久化</li><li>消息(Message)的持久化</li></ol><p>为了保证消息被消费者成功的消费，RabbitMQ提供了<strong>消息确认机制(message acknowledgement)</strong></p><p>持久化：将交换机或队列的数据保存到磁盘，服务器宕机或重启之后依然存在</p><p>非持久化：将交换机或队列的数据保存到内存，服务器宕机或重启之后将不存在</p><p><img src="'+_+'" alt=""></p>',7),n=[o];function r(p,c,d,l,b,g){return a(),t("div",null,n)}const h=e(i,[["render",r]]);export{u as __pageData,h as default};
