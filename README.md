# 闲鱼获客阅读指南

小树闲鱼获客文章的可视化导读。静态网页，无构建依赖，支持九章目录、品类卡片、七天时间线、主题化复盘菜单、夜间模式与字号调整。

文章是重组摘要，不是逐字转载。原文入口保留在页面中。

## GitHub Pages

1. 仓库进入 **Settings → Pages → Build and deployment**。
2. **Source** 选择 **GitHub Actions**。
3. 推送到 `main` 后自动部署；也可以在 **Actions → Deploy website to GitHub Pages → Run workflow** 手动运行。
4. 成功后地址为 `https://k-zhaochao.github.io/xianyu-teach/`；最终地址以工作流部署步骤的输出为准。

部署工作流只上传 `dist/`，不上传验证脚本、文档或 Git 元数据。部署任务使用 GitHub 自带的令牌与 OIDC，不需要额外配置部署密钥。

## 本地阅读

直接用浏览器打开 `dist/index.html`，或在仓库根目录运行：

```sh
python -m http.server 8765 --directory dist
```

访问 `http://localhost:8765/`。

## 修改与检查

- `dist/index.html`：内容及 SVG 图标。
- `dist/gov.css`：门户风格、明暗主题、响应布局与动画。
- `dist/app.js`：品类、时间线、复盘与阅读控制。
- `dist/ui.js`：自定义下拉菜单、键盘操作及动画。
- `.github/workflows/pages.yml`：验证、上传及部署工作流。

检查命令：

```sh
node --check dist/app.js
node --check dist/ui.js
node scripts/check-site.mjs
```

保留资源的相对路径，以适配 GitHub Pages 的 `/xianyu-teach/` 项目子路径。
