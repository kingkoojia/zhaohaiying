# 赵海英律师网站 — 项目规范

## 文件命名规则

| 类型 | 命名格式 | 示例 |
|------|---------|------|
| 中文首页 | `index.html` | index.html |
| 英文首页 | `english.html` | english.html |
| 中文文章 | `article-<英文关键词>.html` | article-inheritance-guide.html |
| 英文文章 | `en-article-<英文关键词>.html` | en-article-inheritance-guide.html |
| 中文动态 | `news-<关键词>.html` | news-liaison-office.html |
| 英文动态 | `en-news-<关键词>.html` | en-news-liaison-office.html |

## 如何新增文章

### 中文文章

1. 复制 `zh-article-template.html` 为 `article-<关键词>.html`
2. 修改以下内容（搜索 `【` 找到所有占位符）：
   - `<title>` — 文章标题
   - `<meta name="description">` — 文章描述（150字内）
   - `og:title` / `og:description` / `og:url` — 社交媒体分享信息
   - `canonical` — 当前文章链接
   - `hreflang` — 如果有英文版，指向 `en-...`
   - `<span class="tag">` — 文章分类（涉外继承 / 资产处置 / 跨国离婚等）
   - `<h1>` — 文章标题
   - `<p class="meta">` — 日期
   - 正文内容 — 在 `<!-- 文章正文开始 -->` 和 `<!-- 文章正文结束 -->` 之间

### 英文文章

1. 复制 `en-article-template.html` 为 `en-article-<关键词>.html`
2. 修改占位符（同上，搜 `【`）
3. 确保 `lang-switch` 中的 href 指向对应的中文页面

## 注意事项

- **保持编码**：所有文件必须用 UTF-8 编码保存
- **不要使用零宽空格**：不要在文本中包含 `&#8203;` 或 `\u200b`
- **维护 hreflang**：中英文文章之间需要互相关联
- **导航栏固定**：中式文章用中文导航，英文文章用英文导航
- **移动端底部栏**：中文文件用中文按钮，英文文件用英文按钮

## 目录结构

```
website-v3/
├── index.html                    # 中文首页
├── english.html                  # 英文首页
├── article-*.html                # 中文文章
├── en-article-*.html             # 英文文章
├── news-*.html                   # 中文动态
├── en-news-*.html                # 英文动态
├── zh-article-template.html      # 中文文章模板（新增页面的起点）
├── en-article-template.html      # 英文文章模板
├── images/                       # 图片资源
├── sitemap.xml                   # 站点地图
├── robots.txt                    # 搜索引擎规则
├── CNAME                         # 域名配置
└── .nojekyll                     # GitHub Pages 配置
```


## 统一设计系统

所有页面和工具统一使用以下 CSS 自定义属性（设计令牌）。新增文件时，在 <style> 中直接引用这些变量，不得重新定义。

```css
:root {
  /* 主色 */
  --navy:       #0f1b2d;
  --navy-light: #1a2d4a;
  --gold:       #c9a84c;
  --gold-light: #e8d08a;

  /* 中性色 */
  --cream:      #f8f6f0;
  --white:      #ffffff;
  --gray-100:   #f4f4f4;
  --gray-200:   #e8e6e1;
  --gray-300:   #bcb9b2;
  --gray-600:   #6b6862;
  --gray-800:   #2d2b27;

  /* 文字 */
  --text:       #1a1a1a;
  --text-light: #5a5a5a;

  /* 高亮标注色 */
  --hl-yellow:  #fff3cd;
  --hl-green:   #d4edda;
  --hl-blue:    #cce5ff;
  --hl-red:     #f8d7da;
  --hl-orange:  #ffe5cc;
  --hl-purple:  #e8d5f5;

  /* 阴影 */
  --shadow:     0 2px 20px rgba(15,27,45,0.08);
  --shadow-lg:  0 8px 40px rgba(15,27,45,0.12);

  /* 尺寸 */
  --radius:     8px;
  --radius-lg:  12px;
  --max-width:  1200px;

  /* 字体 */
  --font-serif: Georgia, 'Noto Serif SC', serif;
  --font-sans:  -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;

  /* 动画 */
  --transition: 0.25s ease;
}
```

### 使用规则

1. **背景色** 用 `var(--cream) 而非 #f5f3ef
2. **卡片/面板背景** 用 `var(--white) 而非 #fff
3. **边框** 用 `var(--gray-200) 而非 #e0dcd5
4. **次要文字** 用 `var(--text-light) (#5a5a5a) 而非 #6b6862
5. **深色背景悬停** 用 `var(--navy-light) 而非 #1a2d4a
6. **高亮色** 用 `var(--hl-*) 前缀命名（如 `var(--hl-yellow)）
7. **不在 JS 中硬编码颜色值** —— 如需动态样式，通过 CSS class 切换或读取 getComputedStyle
8. **所有文件以 UTF-8 保存，不得有 BOM**

### 已使用本系统的文件

| 文件 | 类型 |
|------|------|
| website-v3/index.html | 中文首页 |
| website-v3/zh-article-template.html | 中文文章模板 |
| website-v3/en-article-template.html | 英文文章模板 |
| 一键捕获高亮工具.html | 辅助工具 |
| 对话笔记高亮工具.html | 辅助工具 |

如需新增颜色变量，先确认是否已有近似值，然后更新本文档。
