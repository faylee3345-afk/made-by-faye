# MADE BY FAYE

李杉杉（Faye）的个人作品集网站。作品优先，创作者其次。不是简历模板。

当前仓库从空目录新建，技术栈：

- React + TypeScript + Vite
- React Router
- GSAP（唯一动效库）
- SCSS Modules
- 内容：`content/` 里的 Markdown
- 后台：Decap CMS（`/admin`）
- 部署：Netlify + Git Gateway（GitHub 只作代码和内容仓库）

## 信息结构

### Sitemap

- `/` 首页（滚动发现全部品类）
- `/work` 全部作品 + 文字筛选
- `/work/:slug` 项目详情
- `/about` 关于我
- `/moments` 片刻
- `/admin` 内容后台
- 未匹配路径：404

### 首页滚动

1. HERO（MADE BY FAYE）
2. 精选作品 / SELECTED WORKS
3. 镜头之前 / ON CAMERA
4. 赛场现场 / SPORTS
5. Statement：表达，不只发生在话筒前。
6. 故事之间 / STORIES
7. 创作现场 / CREATIVE
8. 舞台与现场 / STAGE
9. 内容与编辑 / EDITORIAL
10. 关于我预览
11. 片刻预览
12. 联系
13. Footer

## 启动前台

```bash
npm install
npm run dev
```

打开 http://localhost:5173

## 启动后台（本地）

需要两个进程：

```bash
npm run dev
```

另开一个终端：

```bash
npm run cms
```

然后打开：http://localhost:5173/admin/

`local_backend: true` 会让后台直接改你电脑里的 `content/` 和 `public/uploads/`，不用登录 GitHub。

## 线上后台

网站部署到 Netlify 后：

1. Netlify 站点开启 Identity
2. 开启 Git Gateway，连到这个 GitHub 仓库
3. 邀请你自己的邮箱成为 Identity 用户
4. 打开 `https://你的域名/admin/` 登录
5. 在后台改作品 → 自动 commit 到 GitHub → Netlify 重新部署

不要把 GitHub Token 写进网站或 `.env`。

## 新增一个作品

1. 打开 `/admin`
2. 进入「作品」→ New
3. 填写中文标题、slug（英文短横线）、年份、一级分类、角色
4. 上传封面到 `uploads/projects/`
5. 需要视频就填 YouTube / Bilibili / 文件
6. Gallery 每张图选 layout：full / wide / half / portrait
7. 若要出现在首页精选：勾选「是否精选」，并设置精选排序 1–8
8. 勾选「是否公开」后 Publish

前台不需要改 TypeScript。

## 修改 Featured / About / 联系方式

- Featured：作品条目里的「是否精选」和「精选排序」
- About：「关于我」集合
- 联系方式、首页标题、Accent：「网站设置」
- 片刻：「片刻」集合
- 奖项节点：「一些节点」（不会出现在首页 Hero）

## 关键文件

- 内容：`content/projects/` `content/moments/` `content/about.md` `content/settings.md` `content/milestones/`
- 图片：`public/uploads/`
- 后台配置：`public/admin/config.yml`
- 视觉 token：`src/styles/tokens.scss`
- 页面：`src/pages/`
- 组件：`src/components/`
- 内容读取：`src/lib/content.ts`

## 部署

1. 把仓库推到 GitHub
2. 在 [Netlify](https://www.netlify.com/) Import 这个仓库
3. Build command: `npm run build`
4. Publish directory: `dist`
5. 环境变量（可选）：`VITE_SITE_URL=https://你的域名`
6. 开启 Identity + Git Gateway

GitHub Pages 需要额外 OAuth 代理，会让 CMS 变难用，所以没有采用。

## 后台登录失败时

- 本地：确认 `npm run cms` 在跑，地址是 `/admin/` 不是 React 页面
- 线上：Netlify Identity 是否开启、Git Gateway 是否连对仓库和 `main` 分支
- 浏览器是否拦截第三方 cookie
- 你是否收到并接受了 Identity 邀请

## 还需要你替换的内容

现在的封面、Hero、片刻图都是 **占位图**（深色编辑风 SVG，带 REPLACE IN CMS 字样）。请用真实工作现场照片替换。优先：

1. 首页 Hero 横幅或 3–5 秒现场视频
2. 精选 8 个作品封面
3. About 工作照（不要证件照）
4. 片刻照片
5. 联系方式里的真实 Email / 社交链接（现在是 example 占位）
6. 各作品的视频链接
7. 文案里你想改掉的细节

## 命令

```bash
npm run dev      # 前台
npm run cms      # 本地 CMS
npm run build    # 生产构建
npm run lint     # 检查
npm run preview  # 预览构建结果
```
