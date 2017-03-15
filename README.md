# bombwxapp
## 目录

- [版本日志](#版本日志)
- [分支管理](#分支管理)
- [目录结构](#目录结构)
- [参考资料](#参考资料)
- [功能及页面](#功能及页面)
- [分工](#分工)
- [开发](#开发)


<img src="" alt="二维码" width="50%">
<img src="" alt="首页" width="50%">

更多截图见：https://

## 开源许可证 License AGPLv3
 
> 开源是一种精神，烟圈微信小程序的开源更是蓝山工作室的一种进步
> 
> 开源是自由的，而不是免费的。Free(自由) is not free(免费)

请认真阅读并遵守以下开源协议

`AGPLv3` [GNU Affero General Public License v3.0](https://github.com/yanquan-studio/yanquan/blob/master/LICENSE)
代码仅作学习微信小程序所用，禁止私用，违者必究

---

## 版本日志
> 版本号命名规则 vX.Y.Z
> 
> X: 主版本号, Y: 次版本号, Z: 修订号
> 
> 修饰后缀词(可选) - alpha: 内测版, beta: 公测版, 无(默认): 正式版

~~### v1.0.0 正式版 【待发布】~~

### v0.0.1 alpha 内测版 【当前版本】
* 测试bmob数据库连接
* 2017.3.3 发布
* 开启内测
## 分支管理

```
bombwxapp
  ├─ master       // 默认分支（开发测试版本所用分支；保护分支，只允许由[other]分支-Pull Requests-其他人review而来，故无法push）
  ├─ stable       // 稳定分支（正式版本所用分支；高级保护分支，只允许管理员操作，通常由master分支-Pull Requests而来）
  └─ [other]      // 其他开发分支（只允许该项目Collaborators创建及push分支）
```
---
更多详见wiki：[开发记录/开发须知](https://github.com/lanshan-studio/yanquan/wiki)

### 目录结构
```
yanquan
  ├─ app.json       // 全局配置文件，决定页面文件的路径、窗口表现、设置网络超时时间、设置多tab等     
  ├─ app.js         // 全局js，如执行App()函数来初始化注册小程序
  ├─ app.wxss       // 全局样式
  ├─ utils          // 模块化文件夹，利用module.exports暴露接口，通过require(path)使用模块接口
  │    └─ util.js   // 模块化例子
  ├─ images         // 图片文件夹
  └─ pages          // 页面文件夹
       ├─ index     // 主页
       │    ├─ index.wxml
       │    ├─ index.wxss
       │    └─ index.js
       ├─ news      // 资讯
       │    ├─ news.wxml    // 列表
       │    ├─ news.wxss
       │    ├─ news.js
       │    ├─ detail.wxml   // 详情
       │    ├─ detail.wxss
       │    └─ detail.js
       ├─ more      // 更多
       │    ├─ more.wxml    // 更多 (含绑定用户)
       │    ├─ more.wxss
       │    ├─ more.js
       │    ├─ about.wxml   // 关于
       │    ├─ about.wxss
       │    └─ about.js
       └─ core      // 主页功能文件夹
            ├─ plant       // 实时车间
            │    ├─ plant.wxml
            │    ├─ plant.wxss
            │    └─ plant.js
            └─ other    // 其他
                 └─ ..
```

### 参考资料

* （重要）官方开发文档：https://mp.weixin.qq.com/debug/wxadoc/dev/
* 开发工具：https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html
* 更多资料：https://github.com/Aufree/awesome-wechat-weapp
* 设计指南：https://mp.weixin.qq.com/debug/wxadoc/design/
* flex布局
  * 语法篇：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
  * 实例篇：http://www.ruanyifeng.com/blog/2015/07/flex-examples.html

## v1.0
### 功能及页面
> 共15个页面，3个主tabnav页面

| 编号|  功能        | 路径                       | 视觉设计| 页面重构| 后端接口|前后端交互|
|:---:| -----------  | -------------------------- |:-------:|:------: |:-------:|:--------:|
| 1   | **【主页】** | pages/index/index(.wxml)   | ✔       | ✔       | ✘       |          |
| 10  | 实时车间     | pages/core/plant/plant     |         |         |         |          |
| 11  | 故障查询     | pages/core/search/search   |         |         |         |          |
| 12  | 生产信息     | pages/core/infor/infor     |         |         |         |          |
| 13  | 其他功能     | pages/core/other/other     |         |         | ✔       |          |
| 19  | 故障报修     | pages/core/repair/repair   |         |         |         |          |
| 2   | **【资讯】** | pages/news/news            | ✔       | ✔       |         |          |
|     |   公告       | (同上)                     | ✘       | ✘       | ✔       | ✘        |
|     |   通知       | (同上)                     | ✘       | ✘       | ✔       | ✘        |
| 20  | 资讯详情     | pages/news/detail          |         |         |         |          |
| 3   | **【更多】** | pages/more/more (含绑定用户|         |         |         |          |
|     | 绑定用户     | (同上)                     |         |         |         |          |
|     | 用户信息     | (同上)                     | ✘       | ✘       |         |          |
| 30  | 关于         | pages/more/about           |         |         | ✘       | ✘        |
|     | 反馈         | (跳转至github - new issue) | ✘       | ✘       | ✘       | ✘        |

### 分工
> 项目期限：6月底前

| who    | todo                  |
|:------:| --------------------- |
|   1  | 项目架构，页面1、2、20  |
|   1  | 视觉设计交互（主页面）  |
|   2  | 视觉设计交互（分页面）  |
|   1  | 后台接口完善（基于数采) |
|   2  | 页面10、13        |
|   2  | 页面11、12        |
|   2  | 页面15、16        |
|   1  | 页面19、3、30           |

### 开发
> 每个人创建自己的分支进行开发，开发完成后再通过pull request至master分支。

#### 1、clone代码
```
$ git clone git@github.com:yanquan-studio/yanquan.git
```
```
$ cd yanquan
```
```
$ git remote add origin git@github.com:yanquan-studio/yanquan.git
```

#### 2、在master主分支的基础上创建并切换你自己的分支
```
[master]:$ git checkout -b 你的分支名
```
```
[你的分支]:$ 
```

#### 3、打开微信web开发者工具，并添加项目
* **AppID** 选择 无AppID
* **项目名称** 填写为 yanquan
* **项目目录** 选择clone出的git仓库

---

#### @、提交你的代码至github
```
执行: [pull代码并更新master至你自己的分支] (见下文)
```
```
[你的分支]:$ git push origin 你的分支名
```

#### @、pull代码并更新master至你自己的分支]
```
[你的分支]:$ git add .
```
```
[你的分支]:$ git commit -m "提交信息"
```
pull master代码
```
[你的分支]:$ git pull origin master:master
```
更新master代码到你的分支
```
[你的分支]:$ git rebase master
```

#### @、提交你的代码至master
* 执行: [提交你的代码至github] (见上文)
* 在github上进行create pull request，进行如下选择：
  * base: master
  * compare: 你的分支
* 等待项目管理员review代码，并同意pull request
