# AGENTS.md

## 1. 文档目的

本文件定义 **MYX Labs 微信小程序** 项目中 Codex / ChatGPT Desktop 以及其他 AI Coding Agent 必须遵守的开发规则。

本文件属于项目级开发规范。任何自动化代码修改、重构、文件新增、依赖调整、配置修改、测试补充，都必须遵守本文件。

当本文件与临时 Prompt 冲突时：
1. 安全规则优先；
2. 项目架构规则优先；
3. 明确的当前任务要求优先于一般性建议；
4. 若仍存在冲突，先停止修改并说明冲突点。

---

## 2. 项目概述

项目名称：

```text
MYX Labs Mini Program
```

项目目标：

将公开网站 **MYX Labs · Digital Experiments** 的内容重新设计为适合微信生态使用的原生微信小程序。

公开网站：

```text
https://myx-labs.netlify.app/
```

本项目不是 WebView 套壳项目，而是一个原生微信小程序。

第一阶段重点：

- 微信原生小程序
- TypeScript
- WXML
- WXSS
- 静态内容驱动
- 清晰、轻量、移动端友好的 UI
- 为后续 API / 云开发升级保留扩展能力

---

## 3. 技术栈

必须优先使用：

```text
WeChat Mini Program Native
TypeScript
WXML
WXSS
JSON
```

第一阶段禁止未经确认引入：

```text
Taro
uni-app
React
Vue
第三方 UI Framework
大型状态管理框架
复杂 CSS 预处理器
不必要的 npm 依赖
```

如认为必须新增依赖，必须先：

1. 说明引入原因；
2. 说明不用该依赖的替代方案；
3. 说明对包体积、维护、安全性的影响；
4. 等待用户确认后再安装。

---

## 4. 项目目录约定

推荐目录：

```text
myx-labs-miniapp/
├── AGENTS.md
├── README.md
├── docs/
│   ├── REQUIREMENTS.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   └── decisions/
│
├── miniprogram/
│   ├── pages/
│   │   ├── home/
│   │   ├── projects/
│   │   ├── project-detail/
│   │   └── about/
│   │
│   ├── components/
│   │   ├── project-card/
│   │   ├── section-header/
│   │   └── empty-state/
│   │
│   ├── data/
│   │   ├── projects.ts
│   │   ├── notes.ts
│   │   └── profile.ts
│   │
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── assets/
│   ├── app.ts
│   ├── app.json
│   └── app.wxss
│
├── typings/
├── package.json
├── project.config.json
└── tsconfig.json
```

### 目录职责

#### `pages/`
只放页面级代码。

页面负责：

- 页面生命周期
- 页面状态
- 用户事件
- 页面导航
- 调用 service
- 组织页面展示数据

页面不应承载复杂通用业务逻辑。

#### `components/`
只放可复用 UI 组件。

满足以下任一条件时，应考虑抽成组件：

- 两个及以上页面复用；
- 页面内存在清晰的独立 UI 单元；
- 组件具有独立输入参数和事件；
- 页面文件明显过长。

#### `data/`
第一阶段放静态业务数据。

禁止在 WXML 中硬编码大段项目内容。

#### `services/`
封装未来的数据访问层。

例如：

```text
project.service.ts
content.service.ts
analytics.service.ts
```

即使第一阶段使用静态数据，也应避免让页面直接依赖未来的 API 实现细节。

#### `types/`
存放共享 TypeScript 类型定义。

例如：

```text
project.ts
note.ts
profile.ts
common.ts
```

#### `utils/`
仅放纯工具函数。

例如：

- 日期格式化
- URL 处理
- 字符串处理
- 参数校验

禁止把业务流程塞进 `utils/`。

#### `assets/`
放项目自有图片、图标等资源。

避免无意义复制大尺寸图片。

---

## 5. 核心架构原则

必须遵守：

```text
Page
 ↓
Service / Data
 ↓
Type
```

UI 结构：

```text
Page
 ↓
Component
```

不允许出现：

```text
WXML → 直接塞大量业务数据
Page → 到处复制相同业务逻辑
Component → 直接承担全局业务流程
utils → 变成杂物箱
```

设计目标：

- 页面职责清晰；
- 数据模型明确；
- 未来从静态数据切换到 API 时，不需要大规模重写页面；
- 可测试；
- 易读；
- 适合 Codex 持续维护。

---

## 6. TypeScript 规范

### 6.1 基本要求

优先使用 TypeScript 明确类型。

禁止无理由使用：

```ts
any
```

如果确实必须使用 `any`，必须：

```ts
// TODO: explain why any is required
```

并说明原因。

优先使用：

```ts
interface
type
```

定义明确的数据结构。

示例：

```ts
export interface Project {
  id: string
  title: string
  summary: string
  category: ProjectCategory
  tags: string[]
  featured: boolean
}
```

---

### 6.2 命名规则

变量、函数：

```text
camelCase
```

类型、Interface：

```text
PascalCase
```

常量：

```text
camelCase
```

除非是全局不可变配置，才使用：

```text
UPPER_SNAKE_CASE
```

文件名建议：

```text
kebab-case.ts
```

示例：

```text
project-card.ts
project-detail.ts
content-service.ts
```

---

### 6.3 Boolean 命名

Boolean 优先使用：

```text
is
has
can
should
```

例如：

```ts
isLoading
hasError
canShare
shouldShowMore
```

---

### 6.4 函数规则

函数尽量：

- 单一职责；
- 参数少而明确；
- 返回值可预测；
- 避免隐藏副作用。

不要为了“抽象”而抽象。

---

## 7. WXML 规范

WXML 负责 UI 结构，不负责复杂逻辑。

允许：

```xml
wx:if
wx:elif
wx:else
wx:for
```

但复杂条件应提前在 TypeScript 中计算。

不建议：

```xml
<view wx:if="{{a && b && !c && (d === 'x' || e > 3)}}">
```

应改为：

```ts
shouldShowSection: true
```

然后：

```xml
<view wx:if="{{shouldShowSection}}">
```

列表必须合理设置：

```xml
wx:key
```

避免无意义嵌套 `<view>`。

---

## 8. WXSS 规范

### 8.1 基本原则

优先：

- 简洁；
- 清晰；
- 移动端优先；
- 使用 `rpx`；
- 避免过度装饰；
- 保持视觉层级一致。

### 8.2 全局样式

公共 Design Token 尽量集中管理。

例如：

```css
page {
  background: #f6f7f8;
  color: #1f2329;
}
```

页面 WXSS 不应重复定义大量全局规则。

### 8.3 禁止

未经确认不要：

- 大量使用绝对定位；
- 使用极端 z-index；
- 为修复局部 UI 堆积 magic number；
- 复制相同样式到多个页面。

---

## 9. 页面设计规则

第一阶段主要页面：

```text
Home
Projects
Project Detail
About
```

### Home

职责：

- 品牌介绍
- Featured Projects
- 最新内容入口
- Projects / About 导航

### Projects

职责：

- 项目列表
- 分类展示
- 项目卡片
- 项目详情入口

### Project Detail

职责：

- 项目名称
- 项目简介
- 技术标签
- 内容说明
- 图片
- 外部链接
- 分享能力（后续）

### About

职责：

- MYX Labs 介绍
- 作者 / 品牌说明
- 外部网站入口
- 版本信息

---

## 10. 数据模型规则

核心 Project 模型建议：

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

要求：

- `id` 唯一且稳定；
- 不使用数组索引作为业务 ID；
- URL、图片等可选字段必须做存在性判断；
- 页面不得假定所有可选字段一定存在。

---

## 11. 导航规则

页面路由统一通过：

```text
wx.navigateTo
wx.switchTab
wx.navigateBack
```

根据页面属性合理选择。

传递业务对象时：

优先传递：

```text
id
slug
```

不要把完整 JSON 对象拼到 URL。

示例：

```ts
wx.navigateTo({
  url: `/pages/project-detail/project-detail?id=${projectId}`
})
```

详情页自行根据 ID 获取数据。

---

## 12. 错误处理

任何异步操作必须考虑：

```text
loading
success
empty
error
```

不允许只实现 happy path。

面向用户的错误提示应：

- 简洁；
- 不暴露内部异常栈；
- 给出可理解的下一步。

日志可以保留技术信息，但生产环境不得泄露敏感数据。

---

## 13. 安全规则

### 13.1 禁止提交敏感信息

严禁写入代码库：

```text
AppSecret
API Secret
Access Token
Private Key
Password
个人敏感数据
SAP 内部数据
客户内部 Ticket
客户系统地址
客户账号
生产系统凭证
```

### 13.2 MYX Labs 内容边界

本小程序面向公开内容。

如内容来自其他项目，必须确认其适合公开。

不得因为历史开发项目存在内部 SAP 内容，而直接复制到本小程序。

### 13.3 外部 URL

外部 URL 必须：

- 来自可控数据源；
- 做存在性检查；
- 避免动态执行任意 URL；
- 符合微信平台规则。

---

## 14. 隐私规则

第一阶段原则：

```text
不要求登录
不收集手机号
不收集身份证信息
不收集位置
不读取通讯录
不申请与核心功能无关的权限
```

如后续新增用户数据功能：

必须先更新：

```text
docs/REQUIREMENTS.md
隐私说明
数据保存策略
权限设计
```

---

## 15. 性能规则

Codex 修改代码时应关注：

- 小程序包体积；
- 图片尺寸；
- 首屏渲染；
- 不必要的数据绑定；
- 大数组渲染；
- 重复 setData；
- 无意义网络请求。

避免一次 `setData` 发送巨大对象。

图片应优先压缩并选择适合移动端的尺寸。

---

## 16. 可访问性与可用性

UI 必须：

- 保持文字可读；
- 交互区域足够大；
- 不只依赖颜色表达状态；
- 页面返回路径明确；
- 空数据时有 Empty State；
- 错误时有合理提示。

---

## 17. Codex 工作流程

### 17.1 接到任务后

任何中大型任务，Codex 必须先执行：

```text
1. Understand
2. Inspect
3. Analyze
4. Plan
5. Implement
6. Verify
7. Summarize
```

---

### 17.2 修改前

先阅读：

- 当前任务相关文件；
- 直接依赖；
- 数据类型；
- 路由配置；
- 相关组件。

禁止在不了解现状时大范围重写。

---

### 17.3 分析模式

当用户要求：

```text
先分析
不要修改
给方案
```

Codex 不得修改任何文件。

只输出：

- 当前结构；
- 问题；
- 影响范围；
- 推荐方案；
- 修改文件清单；
- 风险。

等待确认。

---

### 17.4 实现模式

得到确认后：

1. 只修改任务范围内文件；
2. 不进行无关重构；
3. 不随意改名；
4. 不删除未知用途代码；
5. 不改变用户未要求的 UI；
6. 保持 diff 尽量小。

---

## 18. 修改代码后的验证

每次修改后至少检查：

```text
TypeScript 编译错误
JSON 格式
WXML binding
wx:key
页面路由
页面路径
事件绑定
空值处理
资源路径
```

如环境允许，执行项目已有的：

```text
typecheck
lint
test
build
```

如果不能运行微信开发者工具，则明确说明：

```text
需要用户在微信开发者工具中进行最终编译验证
```

不得假装已经在模拟器中验证。

---

## 19. 测试规则

第一阶段至少覆盖人工验证场景：

### Home

- 正常加载
- Featured Projects 正常显示
- 点击项目可进入详情
- 无 Featured Project 时页面正常

### Projects

- 列表正常
- 空列表正常
- 项目卡片内容缺少可选字段时正常
- 点击导航正常

### Project Detail

- 正常 ID
- 无效 ID
- 缺少图片
- 缺少外部链接

### About

- 正常显示
- 外链入口存在性检查

---

## 20. Git 规则

Codex 可以：

- 查看 diff；
- 创建合理提交建议；
- 根据要求 commit。

未经明确要求，不得：

```text
git push
force push
reset --hard
删除用户分支
重写历史
```

提交信息建议：

```text
feat: add project detail page
fix: handle invalid project id
refactor: extract project card component
docs: update mini program requirements
```

---

## 21. 文档同步规则

以下变化必须同步文档：

### 功能范围变化

更新：

```text
docs/REQUIREMENTS.md
```

### 架构变化

更新：

```text
docs/ARCHITECTURE.md
```

### 重大技术决策

新增：

```text
docs/decisions/ADR-xxx.md
```

不要让代码和文档长期不一致。

---

## 22. 禁止事项

Codex 不得：

1. 未经确认引入大型框架；
2. 随意重构整个项目；
3. 为“看起来高级”增加复杂抽象；
4. 编造微信 API；
5. 使用不存在的配置字段；
6. 跳过错误处理；
7. 把静态业务数据写死在 WXML；
8. 复制内部或敏感业务内容；
9. 删除不理解用途的文件；
10. 声称执行了实际未执行的测试；
11. 声称发布成功但实际未通过微信开发者工具上传；
12. 未经用户确认执行破坏性 Git 操作。

---

## 23. 优先级原则

发生取舍时按以下优先级：

```text
安全
> 正确性
> 可维护性
> 用户体验
> 简洁性
> 开发速度
> 技术炫技
```

---

## 24. Codex 完成任务后的输出格式

每次完成编码任务后，用简洁格式说明：

```text
完成内容
- ...

修改文件
- path/to/file
- path/to/file

验证
- 已执行 ...
- 需要在微信开发者工具中确认 ...

注意事项
- ...
```

如果没有注意事项，可以省略。

---

## 25. 项目阶段策略

### Phase 1

```text
静态内容
原生 UI
Projects
Project Detail
About
基础导航
```

### Phase 2

```text
内容分类
搜索
分享
收藏（本地）
更多组件
```

### Phase 3

视需求选择：

```text
Netlify API
微信云开发
CMS
远程内容同步
```

任何阶段升级必须优先保持：

```text
Page 与 Data Source 解耦
```

---

## 26. 最终原则

本项目的目标不是追求复杂技术架构，而是：

```text
做一个干净、稳定、易维护、
真正适合微信移动端使用的 MYX Labs 小程序。
```

Codex 应优先帮助项目保持：

```text
Simple
Clear
Safe
Maintainable
Native
```
