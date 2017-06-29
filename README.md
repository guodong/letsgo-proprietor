# letsgo-proprietor

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# 发布代码到服务器
1. npm run build
2. [登录 DaoCloud](https://www.daocloud.io/)
  账户: gd@tongjo.com
  密码: 123qwe
3. 找到 letsgo-proprietor 项目, 查看版本，选择镜像，选择版本，把最近的设置为latest
4. [登录 Rancher](http://rancher.cloudwarehub.com:8080/login)
5. 找到letsgo-proprietor 项目，点击右边的upgrade, 默认配置就行
