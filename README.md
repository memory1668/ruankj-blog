# ruankj-blog
个人博客
## 配置
当前项目的服务器配置是

前端(http-server)：localhost:3001    http-server -p 3001

后端(node.js)：localhost:3000	npm run dev

nginx需要修改的配置（反向代理）
端口修改为：8081
```
location / {
  proxy_pass http://localhost:3001;
}
		
location /api/ {
  proxy_pass http://localhost:3000;
  proxy_set_header Host $host;
}
```
博客首页url:http://localhost:8081/index.html
