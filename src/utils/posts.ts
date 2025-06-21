import type { CollectionPosts, PostKey } from '@/types'
import { getCollection } from 'astro:content'

export function sortPostsByDate(itemA: CollectionPosts, itemB: CollectionPosts) {
  return new Date(itemB.data.date).getTime() - new Date(itemA.data.date).getTime()
}

export async function getPosts(path?: string, collection: PostKey = 'blog') {
  return (await getCollection(collection, (post) => {
    const isDraft = import.meta.env.PROD ? post.data.draft !== true : true

    // If no path is provided (main blog page), exclude notes and talks
    if (!path) {
      return isDraft && !post.slug.includes('notes/') && !post.slug.includes('talks/')
    }

    // If path is provided, filter by the specific path
    return isDraft && post.slug.includes(path)
  })).sort(sortPostsByDate)
}
