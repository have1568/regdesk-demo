## demo 说明 仅仅是初次使用nestjs react 做一个 todolist demo ,计划和想法仅是对之前工作的一些经验总结复习，不一定具备在其他项目中落地
### 构建上的思考
* monorepo 前后端在同一个仓库 适用于 单个团队全员全栈开发
* 多团队需要根据团队负责的模块拆分成多个仓库
* 团队前后端分离需要将前后端分成2个仓库
* 测试与开发需要分离，需要将部分测试 分离到测试项目里，不分开的话单个仓库

## demo 结构
apps/api-server 后端
apps/react-frontend 前端
packages/sdk-api  后端提供 REST API sdk, 可供前端和测试直接使用，省去REST API文档 ？
packages/sdk-rpc  微服务架构下提供RPC契约
packages/util     工具类库
packages/sweeper  重构用于同步重构后刷库
... 
打包还需要优化，没有详细的配置测试

## 关于测试上的一些思考？
* 单元测试：工具类，底层抽象类的与具体业务无关的 ，不用启动整个链路
* 后端e2e测试： 真实的测试API调用；
* 后端集成测试： 在项目架构为微服务的情况下 继承其他服务的方式采用 启动 docker 容器，真实调用rpc,这里有边界条件就是 RPC 自身测试完善，集成测试自身只关注自身逻辑； 
* 前端单元测试： 测试前端的一些业务无关的基础工具和方法；
* 前端e2e测试： 演进方向 playwright node 或者 python 来测试；

## 后端的一些思考
 * 分层思路借鉴 SpringBoot  Spring Data Jpa 来实现， 将 service 和 repo 分开；
 * repo的 封装可以实现 审计、数据库耗时、SASS多租户字段隔离 ，乐观锁等一系列实际项目中的需求；
 * entity schema(API返回标准结构 详情和列表2种基础结构，如果业务需要更特殊，复杂的数据，可以在这里定义。RPC返回值定义)、request3类传输对象；
 * 目前是按照单体但团队组织的代码结构，演进到多团队、微服务很容易

## 前端有什么？
react bootstrap 实现 todolist,包含组件定义、组件通信、状态管理、路由等基本的前端要素

## 启动测试 
`pnpm run test-api`

## 项目启动
docker compose -f docker-compose.yaml up -d
pnpm run start-server-api
pnpm run start-front
##
