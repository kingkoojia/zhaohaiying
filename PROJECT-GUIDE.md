# 赵海英律师网站 — 项目指南

> 快速参考。完整规则请阅 **[../统一规则.md](../统一规则.md)**

---

## 工作目录

```
D:\CODEX\律师\
├── site/          ← 网站源码（主力目录，Git 仓库）
├── tools/         ← 辅助工具
├── deploy/        ← 部署脚本
├── docs/          ← 需求文档
├── records/       ← 工作截图
└── archive/       ← 旧版备份
```

---

## 新增文章快速步骤

### 中文文章
1. 复制 `zh-article-template.html` 为 `article-<关键词>.html`
2. 搜索 `【` 替换所有占位符（title、description、og、hreflang、正文、日期等）

### 英文文章
1. 复制 `en-article-template.html` 为 `en-article-<关键词>.html`
2. 替换占位符，确保 `lang-switch` 指向对应中文页

### 推送上线
```bash
cd D:\CODEX\律师\site
git add -A && git commit -m "说明" && git push origin v3
```
或双击 `../deploy/push-github.bat`

---

## 跳转

| 文件 | 说明 |
|------|------|
| `../统一规则.md` | **全面规则文件（必读）** — 含设计系统、代码规范、命名规则、DNS 等 |
| `zh-article-template.html` | 中文文章模板 |
| `en-article-template.html` | 英文文章模板 |
