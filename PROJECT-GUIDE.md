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

## URL 规范（2026-08-14 起）

### 原则

1. **旧 URL 不动。** 已被搜索引擎收录的 `/article-*.html`、`/case-*.html` 等页面保持原样，不批量改路径、不做 301 迁移，避免收录波动。
2. **新页面逐步规范。** 新内容优先采用清晰、稳定的目录式结构，长期统一使用英文 slug，不中英混用。
3. **优先级从高到低：** 内容质量 > URL 规范 > 目录层级。URL 只是加分项，不因追求规范牺牲内容与收录稳定。

### 推荐格式

```
/inheritance/
/inheritance/overseas-chinese-real-estate-tax/
/inheritance/foreigner-inheritance-china/
```

中文站正文仍用中文标题，仅 URL 使用英文 slug，保持跨语言一致与编码友好。

### 新增页面时

- 先在本文档确认目录归属与 slug 命名；
- 一个主题一个目录，不随意新建同名目录；
- 中英文页面使用同一 slug 前缀（如 `/inheritance/...` 与 `/en/inheritance/...`），互为 hreflang；
- 不重复已存在的主题页面。

---

## 跳转

| 文件 | 说明 |
|------|------|
| `../统一规则.md` | **全面规则文件（必读）** — 含设计系统、代码规范、命名规则、DNS 等 |
| `zh-article-template.html` | 中文文章模板 |
| `en-article-template.html` | 英文文章模板 |
