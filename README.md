# Engineering & Management Notes

A personal blog built with Next.js 16, featuring MDX support, dark/light theme switching, and SEO optimization.

## 🚀 Features

- **Next.js 16** with App Router
- **MDX Support** for rich blog content
- **Dark/Light Theme** with system preference detection
- **SEO Optimized** with metadata, sitemap, and robots.txt
- **Responsive Design** mobile-friendly layout
- **Typography** using Google Fonts (Crete Round & Work Sans)
- **Static Site Generation** for optimal performance

## 📁 Project Structure

```
blog/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Homepage with about section and recent posts
│   ├── globals.css         # Global styles and theme variables
│   ├── blog/
│   │   ├── page.tsx        # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx    # Individual blog post page
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── robots.ts           # SEO robots configuration
│   └── sitemap.ts          # Dynamic sitemap generation
├── components/
│   ├── ThemeProvider.tsx   # Theme context provider
│   ├── ThemeToggle.tsx     # Theme toggle button
│   ├── Navigation.tsx      # Main navigation with mobile menu
│   ├── Footer.tsx          # Site footer
│   ├── AboutSection.tsx    # Reusable about section
│   ├── PostCard.tsx        # Blog post card component
│   └── MDXContent.tsx      # MDX content renderer
├── lib/
│   └── mdx.ts             # MDX utilities and post management
├── posts/
│   ├── markdown-syntax-guide.mdx
│   ├── getting-started-with-nextjs.mdx
│   └── the-power-of-typescript.mdx
└── public/
    └── profile-placeholder.svg
```

## 🎨 Design

- **Light Theme**: Warm beige background (#fff6ef) with dark gray text (#505050)
- **Dark Theme**: Deep blue background (#02111a) with light gray text (#d6d6d6)
- **Headings**: Crete Round font in #152035 (light) / #fff (dark)
- **Body**: Work Sans font

## 📝 Creating Blog Posts

Blog posts are written in MDX format and stored in the `/posts` directory.

### Post Frontmatter

```yaml
---
title: Your Post Title
publishDate: 2024-11-08
description: A brief description of your post
tags:
  - Tag1
  - Tag2
heroImage: /path/to/image.jpg  # Optional
---
```

### Adding a New Post

1. Create a new `.mdx` file in the `/posts` directory
2. Add the required frontmatter
3. Write your content using Markdown/MDX
4. The post will automatically appear on the blog page

## 🛠️ Development

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd blog

# Install dependencies
bun install
# or
npm install
```

### Running the Development Server

```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
bun run build
# or
npm run build
```

### Starting Production Server

```bash
bun run start
# or
npm run start
```

## 📦 Dependencies

- **next**: React framework
- **react** & **react-dom**: React library
- **@next/mdx**: MDX support for Next.js
- **next-mdx-remote**: MDX rendering
- **gray-matter**: Frontmatter parser
- **reading-time**: Reading time estimation
- **remark-gfm**: GitHub Flavored Markdown
- **rehype-highlight**: Code syntax highlighting
- **highlight.js**: Syntax highlighting styles
- **tailwindcss**: Utility-first CSS framework

## 🌐 Deployment

The site is optimized for deployment on:
- Vercel (recommended)
- Netlify
- Any static hosting service

### Environment Variables

No environment variables are required for basic functionality.

## 📄 License

All rights reserved © 2024 Engineering & Management Notes

## 👤 Author

**Ivan Matiishyn**

A writer based in New York City, interested in all things tech, science, and photography.

---

Built with ❤️ using Next.js 16
