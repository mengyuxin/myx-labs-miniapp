# REQUIREMENTS.md

## 1. 文档信息

项目：

```text
MYX Labs Mini Program
```

版本：

```text
v0.1
```

状态：

```text
Draft / MVP Baseline
```

目标平台：

```text
微信小程序
```

内容来源：

```text
https://myx-labs.netlify.app/
```

---

## 2. 产品背景

MYX Labs 是一个面向公开访问的 Digital Experiments / Projects 展示空间。

本项目计划将 MYX Labs 的公开内容重新设计为微信原生小程序，以获得更适合微信移动端的浏览、分享和项目展示体验。

本项目不是简单使用 WebView 打开网站，而是重新设计为原生小程序。

---

## 3. 产品目标

MVP 目标：

1. 用户可以快速了解 MYX Labs；
2. 用户可以浏览公开 Projects；
3. 用户可以查看 Project Detail；
4. 用户可以通过分类或内容结构理解不同实验项目；
5. 用户可以访问 MYX Labs 相关公开链接；
6. 小程序 UI 适合手机单手浏览；
7. 项目代码能够继续扩展为动态内容模式。

---

## 4. 非目标

MVP 暂不包含：

```text
用户登录
微信手机号授权
用户账户体系
评论
私信
支付
会员
在线商城
复杂后台管理
SAP 内部资料
客户内部数据
多人协作
复杂内容编辑器
```

第一阶段不做：

```text
WebView 套壳
Taro
uni-app
React
Vue
第三方大型 UI 框架
```

---

## 5. 目标用户

### 5.1 普通访问者

希望：

- 快速了解 MYX Labs；
- 看有哪些项目；
- 查看某个项目的介绍；
- 通过微信方便访问。

### 5.2 技术兴趣用户

希望：

- 查看项目技术方向；
- 查看标签；
- 理解项目用途；
- 访问项目 Demo 或公开网站。

### 5.3 项目作者本人

希望：

- 方便展示自己的实验项目；
- 通过微信分享；
- 后续能够较低成本持续增加项目内容；
- Web 与小程序内容可逐步复用。

---

## 6. 产品定位

关键词：

```text
Digital Experiments
Projects
AI
Tools
Web
Mini Apps
Technology
Personal Lab
```

产品风格：

```text
简洁
技术感
轻量
现代
移动端优先
内容优先
```

避免：

```text
过度企业化
复杂后台感
信息密度过高
大量装饰动画
过度拟物化
```

---

## 7. 信息架构

MVP：

```text
MYX Labs
│
├── Home
│
├── Projects
│   └── Project Detail
│
└── About
```

建议底部导航：

```text
Home
Projects
About
```

`Project Detail` 为二级页面，不进入 TabBar。

---

## 8. 页面需求

# 8.1 Home

页面目的：

让用户在 5~10 秒内理解：

```text
MYX Labs 是什么
这里有什么内容
我可以点哪里
```

### 页面模块

#### Hero

显示：

```text
MYX Labs
Digital Experiments
简短介绍
```

建议文案结构：

```text
MYX Labs

Digital experiments,
small tools and ideas.
```

最终文案可根据品牌语言调整。

---

#### Featured Projects

显示 Featured Project。

每张卡片至少包含：

```text
项目名
一句简介
分类
标签（可选）
封面图（可选）
```

点击：

```text
进入 Project Detail
```

---

#### Explore Projects

提供 Projects 页面入口。

---

#### Latest / Recent

MVP 可选。

如果数据不足，可暂不显示。

---

### Home 验收条件

- [ ] 能显示 MYX Labs 品牌信息
- [ ] Featured Projects 正常渲染
- [ ] 点击项目可进入详情
- [ ] 无 Featured Project 时不报错
- [ ] 页面不存在明显横向滚动
- [ ] 常见手机尺寸下文字可读

---

# 8.2 Projects

页面目的：

集中浏览 MYX Labs 的公开项目。

### 列表字段

每个 Project Card：

```text
coverImage
title
summary
category
tags
```

其中：

```text
coverImage 可选
tags 可选
```

---

### 分类

MVP 分类建议：

```text
All
AI
Web
Tool
Experiment
MiniProgram
Other
```

第一版可以先实现：

```text
All
+
按数据已有分类显示
```

---

### 交互

用户点击 Project Card：

```text
Projects
   ↓
Project Detail
```

URL 参数只传：

```text
id
```

或：

```text
slug
```

---

### 空状态

如果没有项目：

显示：

```text
暂无项目
```

而不是空白页。

---

### Projects 验收条件

- [ ] 项目列表正常显示
- [ ] 数据来自 `data/` 或 service
- [ ] WXML 不硬编码项目详情
- [ ] 点击项目正确跳转
- [ ] 空数据正常
- [ ] 缺少图片时正常
- [ ] 分类字段显示正常

---

# 8.3 Project Detail

页面目的：

完整介绍单个 Project。

### 必须显示

```text
title
summary
category
description
```

### 可选显示

```text
coverImage
tags
externalUrl
createdAt
updatedAt
```

---

### 推荐布局

```text
Project Cover

Title

Category / Tags

Summary

Description

Project Info

Open Project / Visit Website
```

---

### 外部链接

如存在：

```text
externalUrl
```

应提供明确入口。

实际跳转方式必须符合微信小程序平台能力和业务域名规则。

如果链接暂时无法直接打开：

应提供可理解的替代方式，而不是静默失败。

---

### 无效 ID

如果用户访问：

```text
不存在的 project id
```

页面必须显示：

```text
Project not found
```

并提供：

```text
返回 Projects
```

---

### Project Detail 验收条件

- [ ] 正常项目显示完整
- [ ] 无图片不报错
- [ ] 无 externalUrl 不显示按钮
- [ ] 无效 ID 有错误页面
- [ ] 返回导航正常
- [ ] 不通过 URL 传完整 Project JSON

---

# 8.4 About

页面目的：

解释 MYX Labs 是什么。

### 建议内容

```text
MYX Labs
Digital Experiments
项目理念
内容方向
公开网站
版本
```

可以加入：

```text
Built with WeChat Mini Program
```

---

### About 验收条件

- [ ] 品牌介绍正常
- [ ] 外部网站信息正常
- [ ] 不包含内部或敏感内容
- [ ] 页面结构适合移动端

---

## 9. 数据模型

### Project

```ts
export type ProjectCategory =
  | 'AI'
  | 'Web'
  | 'Tool'
  | 'Experiment'
  | 'MiniProgram'
  | 'Other'

export interface Project {
  id: string
  slug: string
  title: string
  summary: string
  description?: string
  category: ProjectCategory
  tags: string[]
  featured: boolean
  coverImage?: string
  externalUrl?: string
  createdAt?: string
  updatedAt?: string
}
```

---

### Profile

建议：

```ts
export interface Profile {
  name: string
  tagline: string
  description: string
  website?: string
}
```

---

## 10. 初始数据源

Phase 1：

```text
TypeScript Static Data
```

例如：

```text
miniprogram/data/projects.ts
miniprogram/data/profile.ts
```

页面不得直接知道数据未来来自：

```text
Static
API
Cloud Database
```

建议页面通过 service 获取：

```text
ProjectService
```

Phase 1 service 可以返回本地数组。

---

## 11. 内容管理策略

MVP：

```text
手工维护 TypeScript / JSON
```

后续可升级：

```text
Netlify API
CMS
微信云开发
Remote JSON
```

升级动态内容时，应尽量不修改 Page 层调用方式。

目标：

```text
Data Source 可替换
Page 尽量稳定
```

---

## 12. UI / UX 要求

### 12.1 设计原则

```text
Mobile First
Content First
Simple
Readable
Fast
```

---

### 12.2 页面宽度

不得出现无意横向滚动。

---

### 12.3 卡片

Project Card 应：

- 有清晰点击感；
- 视觉层级明确；
- 内容不过度拥挤；
- 图片缺失时仍然成立。

---

### 12.4 文字

至少区分：

```text
Page Title
Section Title
Card Title
Body
Metadata
```

---

### 12.5 状态

必须考虑：

```text
Loading
Empty
Error
Normal
```

静态数据阶段可暂时没有真实 Loading，但架构应可扩展。

---

## 13. 导航需求

MVP TabBar 建议：

```text
Home
Projects
About
```

Project Detail：

```text
navigateTo
```

Project → Detail：

```text
/pages/project-detail/project-detail?id=xxx
```

---

## 14. 搜索需求

MVP：

```text
不强制
```

Phase 2 可以增加：

```text
Project Search
Tag Filter
Category Filter
```

若项目数量 < 10，优先不做搜索。

---

## 15. 收藏需求

MVP：

```text
不实现
```

Phase 2 可使用：

```text
wx.setStorageSync
wx.getStorageSync
```

实现本地收藏。

暂不要求登录同步。

---

## 16. 分享需求

MVP：

可规划但不是第一优先级。

后续支持：

```text
分享 Project Detail
分享 MYX Labs Home
```

分享内容不得携带敏感参数。

---

## 17. 图片需求

图片必须：

- 适合移动端；
- 控制体积；
- 保持合理比例；
- 不因图片缺失导致页面布局崩坏。

建议 Project Cover 使用统一比例。

例如：

```text
16:9
```

或：

```text
3:2
```

最终由 DESIGN.md 决定。

---

## 18. 外链需求

公开网站：

```text
https://myx-labs.netlify.app/
```

外链行为必须根据微信小程序正式能力实施。

不得假设任意 HTTPS URL 都可以直接从小程序打开。

正式实现前检查：

- 小程序业务域名要求；
- web-view 限制；
- 用户体验；
- 审核要求。

---

## 19. 隐私要求

MVP 原则：

```text
No Login
No Phone Number
No Location
No Contacts
No Personal Data Collection
```

如果不需要权限：

```text
不要申请权限
```

未来新增任何数据收集必须更新本需求文档。

---

## 20. 安全要求

不得包含：

```text
SAP 客户数据
SAP Ticket 内部信息
客户名称和系统地址
AppSecret
API Key
Token
密码
Private Key
内部文档
个人隐私信息
```

公开项目内容必须适合公开展示。

---

## 21. 性能要求

MVP 目标：

- 首屏尽可能快；
- 图片经过优化；
- 不加载无用资源；
- 避免大型第三方依赖；
- 避免巨大 `setData`；
- 避免重复渲染。

---

## 22. 兼容性

主要目标：

```text
iOS WeChat
Android WeChat
微信开发者工具
```

最低基础库版本由项目实际配置决定。

不要无理由使用非常新的 API。

如使用新 API，应确认兼容性。

---

## 23. 代码质量要求

必须：

```text
TypeScript
清晰命名
合理组件化
明确类型
错误处理
空值处理
小范围修改
```

尽量避免：

```text
any
超长 Page
超长函数
重复代码
magic number
WXML 复杂表达式
```

---

## 24. MVP 功能清单

### P0

- [ ] Home
- [ ] Projects
- [ ] Project Detail
- [ ] About
- [ ] Project 静态数据模型
- [ ] 页面导航
- [ ] 无效项目处理
- [ ] 基础 UI
- [ ] 基础响应式布局

### P1

- [ ] Featured Projects
- [ ] Category
- [ ] Tags
- [ ] Empty State
- [ ] External Link
- [ ] 基础分享

### P2

- [ ] Search
- [ ] Filter
- [ ] Local Favorites
- [ ] 动态内容 API
- [ ] Analytics

---

## 25. MVP 完成定义

MVP 完成必须满足：

```text
微信开发者工具编译无错误
Home 可访问
Projects 可访问
Project Detail 可访问
About 可访问
至少存在真实 MYX Labs Project 数据
Project navigation 正常
无效 ID 不崩溃
无明显 UI overflow
没有敏感数据
没有未使用的大型依赖
```

并完成至少一次：

```text
真机预览
```

---

## 26. Phase 1 开发顺序

推荐：

### Step 1

整理基础模板：

```text
删除无用 demo 页面
建立标准目录
建立 types
建立 data
```

### Step 2

定义：

```text
Project
Profile
```

### Step 3

实现：

```text
Project Service
```

### Step 4

实现：

```text
Home
```

### Step 5

抽取：

```text
Project Card Component
```

### Step 6

实现：

```text
Projects
```

### Step 7

实现：

```text
Project Detail
```

### Step 8

实现：

```text
About
```

### Step 9

统一：

```text
Global Style
Navigation
Empty State
Error State
```

### Step 10

微信开发者工具：

```text
Compile
Simulator Test
Real Device Preview
```

---

## 27. Phase 2 候选需求

项目稳定后考虑：

```text
项目分类筛选
标签筛选
搜索
本地收藏
微信分享
项目二维码
深色模式
动画
远程内容
```

是否实施取决于实际使用价值。

---

## 28. Phase 3 候选架构

未来如 MYX Labs 内容增加，可考虑：

### Option A

```text
Netlify
   ↓
JSON/API
   ↓
WeChat Mini Program
```

### Option B

```text
CMS
 ↓
API
 ↓
Web + Mini Program
```

### Option C

```text
WeChat Cloud Development
```

选择原则：

```text
内容维护成本
Web / 小程序是否需要共享数据
平台限制
费用
维护复杂度
```

---

## 29. 项目成功标准

项目成功不以代码量衡量。

成功意味着：

1. 用户打开后很快理解 MYX Labs；
2. Projects 浏览体验自然；
3. Project Detail 清晰；
4. 页面在微信中看起来像原生产品，而不是网页复制；
5. 内容维护简单；
6. 后续增加项目无需修改大量代码；
7. 项目可以安全公开分享。

---

## 30. 当前 MVP 决策

当前确定：

```text
项目：MYX Labs Mini Program
平台：微信小程序
实现：原生
语言：TypeScript
UI：WXML + WXSS
内容：公开 MYX Labs 内容
数据：Phase 1 静态
框架：无
第三方 UI：无
登录：无
后端：Phase 1 无
```

后续任何重大变更，应同步更新本文件。
