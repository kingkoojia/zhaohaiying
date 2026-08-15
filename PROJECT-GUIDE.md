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

### 长期规划：服务目录体系（暂不执行）

下一阶段逐步建立 `/services/` 顶层目录，每个业务方向一个子目录：

```
/services/inheritance/
/services/cross-border-divorce/
/services/china-asset-liquidation/
/services/apostille/
/services/foreign-criminal-defense/
```

继承方向进一步细分：

```
/services/inheritance/overseas-chinese-inheritance/
/services/inheritance/foreigner-inheritance-china/
/services/inheritance/china-property-inheritance/
```

**执行红线：**

- 不批量修改已收录的旧 URL，不做大范围 301 迁移；
- 新页面逐步按上述目录结构落地；
- 每新增一个服务目录前，先在本文档确认目录归属与 slug 命名，不随意新建同名目录；
- 目录体系与现有 `article-*.html` / `case-*.html` 页面并存，未来新内容优先使用目录式 URL。

### 新增页面时

- 先在本文档确认目录归属与 slug 命名；
- 一个主题一个目录，不随意新建同名目录；
- 中英文页面使用同一 slug 前缀（如 `/inheritance/...` 与 `/en/inheritance/...`），互为 hreflang；
- 不重复已存在的主题页面。

---

## 文章结构化数据规范（2026-08-14 起）

新建文章/案例时，Article Schema 必须包含以下字段：

```json
{
  "@type": "Article",
  "@id": "https://zhaohaiyinglvshi.com/<页面文件名>#article",
  "headline": "文章标题",
  "description": "文章摘要",
  "url": "https://zhaohaiyinglvshi.com/<页面文件名>",
  "image": "https://zhaohaiyinglvshi.com/images/<文章配图>.jpg",
  "datePublished": "2026-08-14T00:00:00+08:00",
  "dateModified": "2026-08-14T00:00:00+08:00",
  "author": { "@id": "https://zhaohaiyinglvshi.com/#person" },
  "publisher": { "@id": "https://zhaohaiyinglvshi.com/#organization" },
  "about": { "@id": "https://zhaohaiyinglvshi.com/#legal-service" }
}
```

规则：

1. `image` 必须使用代表该文章内容的配图，不使用通用律师头像或 Logo；
2. `datePublished` / `dateModified` 使用 ISO 8601 格式并带 `+08:00` 时区，日期不确定时不编造；
3. 中英文页面必须共用同一套 `@id`（`#person` / `#organization` / `#legal-service`）；
4. 页面 `<head>` 中同步配置 `og:image`，指向该文章配图或全站默认 `images/og-cover.jpg`；
5. `canonical` / `hreflang` / OG 标签必须闭合完整，禁止出现 `">>`、缺 `>` 等笔误。

---

## FAQ Schema 定位（2026-08-14 确认）

- FAQPage Schema 继续保留，全站正常使用；
- 定位是**内容语义 / GEO / 问答理解**，不是 Google 搜索富结果；
- Google 已将 FAQ 富结果展示限制在知名、权威的政府和健康网站，普通商业网站即使正确使用 FAQPage 通常也不会获得该富结果；
- 因此编写 FAQ 时，目标是让 AI 与搜索引擎正确理解"用户问题 → 明确答案"，不追求页面上的折叠展示。

---

## 跳转

| 文件 | 说明 |
|------|------|
| `../统一规则.md` | **全面规则文件（必读）** — 含设计系统、代码规范、命名规则、DNS 等 |
| `zh-article-template.html` | 中文文章模板 |
| `en-article-template.html` | 英文文章模板 |

## 新文章上线必做清单（2026-08-15 起）

1. 正文至少引用 1-3 个权威外部来源，不能只写内部链接。
2. 同步补全 canonical、hreflang、OG、Article Schema。
3. 发布后更新 sitemap.xml 与 llms.txt；启用 RSS/Atom 后同步加入 /feed.xml。
4. 避免 thin content：正文应有完整段落、定义性结论、流程和 FAQ。
5. 关键词自然进入 H1/H2、首段、FAQ。
6. 涉及法条、税率、外汇、海牙认证等，必须写明具体依据和核验日期。
