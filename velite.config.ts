import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'src/content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash].[ext]',
    clean: true
  },
  collections: {
    projects: {
      name: 'Project',
      pattern: 'projects/**/*.mdx',
      schema: s.object({
        title: s.string().max(100),
        slug: s.slug('projects'),
        description: s.string().max(500),
        tags: s.array(s.string()),
        status: s.enum(['success', 'primary', 'warning', 'inactive']),
        statusLabel: s.string(),
        participants: s.number().default(0),
        order: s.number().default(0),
        content: s.mdx()
      })
        .transform(data => ({ ...data, permalink: `/projects/${data.slug}` }))
    }
  }
})
