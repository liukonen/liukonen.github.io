export interface DevArticle {
  id: number
  title: string
  description: string
  url: string
  published_at: string
  tag_list: string[]
  reading_time_minutes: number
}


export const fetchDevArticles = async (username: string, count: number = 3): Promise<DevArticle[]> => {
  const MASTER_LIMIT = 100 
  const CACHE_KEY = `devto_master_${username}`
  const TTL = 3600000
  
  const cached = localStorage.getItem(CACHE_KEY)

  if (cached) {
    const { timestamp, data } = JSON.parse(cached)
    const isExpired = Date.now() - timestamp > TTL
    if (!isExpired) {
        return (data.length >= count) ? data.slice(0, count) : data  
    }
  }

  try {
    const fetchLimit = Math.max(count, MASTER_LIMIT) 
    const response = await fetch(
      `https://dev.to/api/articles?username=${username}&per_page=${fetchLimit}`
    )
    if (!response.ok) throw new Error("Upstream connection failed")
    const data = await response.json()
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      data: data
    }))
    return data.slice(0, count)
  } catch (err) {
    console.error("[System] Article sync failed. Falling back to empty set.", err)
    return []
  }
}