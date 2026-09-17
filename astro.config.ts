import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

// Hashnode-style /slug URLs → /posts/slug (canonicals + old shares)
function blogRootRedirects() {
  const dir = join(process.cwd(), 'src/content/blog')
  const redirects: Record<string, string> = {}
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isFile() || !/\.(?:md|mdx)$/.test(entry.name))
      continue
    const slug = entry.name.replace(/\.(?:md|mdx)$/, '')
    redirects[`/${slug}`] = `/posts/${slug}`
  }
  return redirects
}

export default defineConfig({
  site: 'https://iamshadmirza.com',
  redirects: blogRootRedirects(),
  server: {
    port: 1977,
  },
  integrations: [
    mdx(),
    sitemap(),
    UnoCSS({
      injectReset: true,
    }),
    vue(),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      wrap: true,
    },
  },
})
