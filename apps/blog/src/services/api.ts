// apps/blog/src/services/api.ts

// ======================
// Tipos (front-friendly)
// ======================

export type Media = {
  url?: string
  alt?: string
}

export type Author = {
  id: string
  name: string
  slug: string
  bio?: string
  avatar?: Media
}

export type Category = {
  id: string
  title: string
  slug: string
  createdAt?: string
  updatedAt?: string
}

export type Post = {
  id: string
  title: string
  slug: string
  description?: string
  cover?: Media
  content?: unknown
  hub?: string
  cluster?: string
  tags?: string[]
  category?: { id: string; title: string; slug: string }
  createdAt?: string
  updatedAt?: string
}

// ======================
// Config / helpers
// ======================

// ðŸ’¡ SLUGS DAS COLLECTIONS NO PAYLOAD
// Ajuste aqui se o seu Payload estiver usando nomes em portuguÃªs (ex: 'categorias', 'autores')
const COLLECTION_POSTS = 'posts'
const COLLECTION_CATEGORIES = 'categorias'
const COLLECTION_AUTHORS = 'authors'

const RAW_API_BASE =
  (import.meta as any).env?.PUBLIC_PAYLOAD_URL ||
  (import.meta as any).env?.PAYLOAD_URL ||
  ''

const API_BASE = RAW_API_BASE ? String(RAW_API_BASE).replace(/\/+$/, '') : ''

const API_TOKEN =
  (import.meta as any).env?.PAYLOAD_API_TOKEN ||
  (import.meta as any).env?.PUBLIC_PAYLOAD_API_TOKEN ||
  ''

/**
 * Se vocÃª precisar de um header especÃ­fico (ex: "Bearer xxx" ou "API-Key xxx"),
 * defina PAYLOAD_AUTH_HEADER no .env.
 */
const API_AUTH_HEADER =
  (import.meta as any).env?.PAYLOAD_AUTH_HEADER ||
  (import.meta as any).env?.PUBLIC_PAYLOAD_AUTH_HEADER ||
  ''

export type PayloadListResponse<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  page?: number
  totalPages?: number
  hasNextPage?: boolean
  hasPrevPage?: boolean
  nextPage?: number | null
  prevPage?: number | null
}

export type Paged<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage?: boolean
  hasPrevPage?: boolean
  nextPage?: number | null
  prevPage?: number | null
}

function toPaged<T>(data: PayloadListResponse<T>): Paged<T> {
  return {
    docs: data.docs ?? [],
    totalDocs: data.totalDocs ?? 0,
    limit: data.limit ?? 12,
    page: data.page ?? 1,
    totalPages: data.totalPages ?? 1,
    hasNextPage: data.hasNextPage,
    hasPrevPage: data.hasPrevPage,
    nextPage: data.nextPage ?? null,
    prevPage: data.prevPage ?? null,
  }
}

function assertApiBase() {
  if (!API_BASE) {
    throw new Error(
      'PAYLOAD_URL nÃ£o definido. Defina PAYLOAD_URL ou PUBLIC_PAYLOAD_URL no .env'
    )
  }
}

function joinUrl(base: string, path: string) {
  if (!path) return base
  // Se jÃ¡ Ã© URL absoluta, nÃ£o concatena
  if (/^https?:\/\//i.test(path)) return path
  if (!base) return path
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  assertApiBase()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as any),
  }

  // Auth: preferir header explÃ­cito se existir
  if (API_AUTH_HEADER) {
    headers.Authorization = String(API_AUTH_HEADER)
  } else if (API_TOKEN) {
    // Se o token jÃ¡ vier com esquema (ex: "Bearer xxx"), respeita.
    const tokenStr = String(API_TOKEN)
    headers.Authorization = tokenStr.includes(' ') ? tokenStr : `Bearer ${tokenStr}`
  }

  const res = await fetch(joinUrl(API_BASE, path), { ...init, headers })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(
      `Payload API error ${res.status} ${res.statusText} em ${path}\n${text}`
    )
  }

  return (await res.json()) as T
}

/**
 * âœ… Compatibilidade: pÃ¡ginas antigas importam { apiFetcher }
 * (ex: src/pages/categoria/[slug].astro)
 */
export async function apiFetcher<T>(path: string, init?: RequestInit): Promise<T> {
  return fetchJson<T>(path, init)
}

// resolve url de media quando o Payload retorna sÃ³ um path relativo
export function resolveMediaUrl(url?: string) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (!API_BASE) return url
  return joinUrl(API_BASE, url)
}

function normalizeMedia(raw: any): Media | undefined {
  if (!raw) return undefined
  if (typeof raw === 'string') return { url: resolveMediaUrl(raw) }
  if (typeof raw === 'object') return { url: resolveMediaUrl(raw.url), alt: raw.alt }
  return undefined
}

function normalizeCategory(raw: any): Category {
  return {
    id: String(raw?.id ?? raw?._id ?? ''),
    title: raw?.title ?? raw?.name ?? raw?.slug ?? '',
    slug: String(raw?.slug ?? ''),
    createdAt: raw?.createdAt,
    updatedAt: raw?.updatedAt,
  }
}

function normalizeAuthor(raw: any): Author {
  return {
    id: String(raw?.id ?? raw?._id ?? ''),
    name: raw?.name ?? raw?.title ?? raw?.slug ?? '',
    slug: String(raw?.slug ?? ''),
    bio: raw?.bio,
    avatar: normalizeMedia(raw?.avatar),
  }
}

function normalizePost(raw: any): Post {
  const category = raw?.category

  const categoryObj =
    category && typeof category === 'object'
      ? {
          id: String(category?.id ?? category?._id ?? ''),
          title: category?.title ?? category?.name ?? category?.slug ?? '',
          slug: String(category?.slug ?? ''),
        }
      : typeof category === 'string'
      ? { id: category, title: '', slug: '' }
      : undefined

  const tags = Array.isArray(raw?.tags)
    ? raw.tags.map((t: any) => String(t))
    : raw?.tags
    ? [String(raw.tags)]
    : undefined

  return {
    id: String(raw?.id ?? raw?._id ?? ''),
    title: raw?.title ?? raw?.name ?? raw?.slug ?? '',
    slug: String(raw?.slug ?? ''),
    description: raw?.description,
    cover: normalizeMedia(raw?.cover),
    content: raw?.content,
    hub: raw?.hub,
    cluster: raw?.cluster,
    tags,
    category: categoryObj,
    createdAt: raw?.createdAt,
    updatedAt: raw?.updatedAt,
  }
}

function buildListQs(params?: { limit?: number; page?: number; sort?: string }) {
  const limit = params?.limit ?? 12
  const page = params?.page ?? 1
  const sort = params?.sort ?? '-createdAt'

  const qs = new URLSearchParams()
  qs.set('limit', String(limit))
  qs.set('page', String(page))
  qs.set('sort', sort)
  return qs
}

// util: slugs paginados (pra getStaticPaths)
async function fetchAllSlugs(collection: string): Promise<string[]> {
  const limit = 200
  let page = 1
  const out: string[] = []

  while (true) {
    const qs = new URLSearchParams()
    qs.set('limit', String(limit))
    qs.set('page', String(page))
    qs.set('sort', 'slug')

    const data = await fetchJson<PayloadListResponse<any>>(
      `/api/${collection}?${qs.toString()}`
    )

    const docs = data.docs ?? []
    out.push(...docs.map((d: any) => String(d?.slug ?? '')).filter(Boolean))

    const totalPages = data.totalPages ?? 1
    if (page >= totalPages) break
    page += 1
  }

  return Array.from(new Set(out))
}

// ======================
// Posts
// ======================

export async function getPosts(params?: {
  limit?: number
  page?: number
  sort?: string
}): Promise<Post[]> {
  const qs = buildListQs(params)
  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_POSTS}?${qs.toString()}`
  )
  return (data.docs || []).map(normalizePost)
}

export async function getPostsPaged(params?: {
  limit?: number
  page?: number
  sort?: string
}): Promise<Paged<Post>> {
  const qs = buildListQs(params)
  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_POSTS}?${qs.toString()}`
  )
  return { ...toPaged(data), docs: (data.docs || []).map(normalizePost) }
}

export async function getAllPostSlugs(): Promise<string[]> {
  return fetchAllSlugs(COLLECTION_POSTS)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!slug) return null

  const qs = new URLSearchParams()
  qs.set('where[slug][equals]', slug)
  qs.set('limit', '1')

  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_POSTS}?${qs.toString()}`
  )
  const doc = data.docs?.[0]
  return doc ? normalizePost(doc) : null
}

export async function getPostsByHub(
  hub: string,
  params?: { limit?: number; page?: number; sort?: string }
): Promise<Post[]> {
  if (!hub) return []

  const qs = buildListQs(params)
  qs.set('where[hub][equals]', hub)

  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_POSTS}?${qs.toString()}`
  )
  return (data.docs || []).map(normalizePost)
}

export async function getPostsByHubPaged(
  hub: string,
  params?: { limit?: number; page?: number; sort?: string }
): Promise<Paged<Post>> {
  if (!hub) return { docs: [], totalDocs: 0, limit: params?.limit ?? 12, page: params?.page ?? 1, totalPages: 1 }

  const qs = buildListQs(params)
  qs.set('where[hub][equals]', hub)

  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_POSTS}?${qs.toString()}`
  )
  return { ...toPaged(data), docs: (data.docs || []).map(normalizePost) }
}

export async function getPostsByCluster(
  cluster: string,
  params?: { limit?: number; page?: number; sort?: string }
): Promise<Post[]> {
  if (!cluster) return []

  const qs = buildListQs(params)
  qs.set('where[cluster][equals]', cluster)

  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_POSTS}?${qs.toString()}`
  )
  return (data.docs || []).map(normalizePost)
}

export async function getPostsByTag(
  tag: string,
  params?: { limit?: number; page?: number; sort?: string }
): Promise<Post[]> {
  if (!tag) return []

  const qs = buildListQs(params)

  // tentativa 1: tags como array
  qs.set('where[tags][contains]', tag)
  let data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_POSTS}?${qs.toString()}`
  )
  let docs = data.docs || []

  // tentativa 2: tags como string
  if (!docs.length) {
    qs.delete('where[tags][contains]')
    qs.set('where[tags][equals]', tag)
    data = await fetchJson<PayloadListResponse<any>>(
      `/api/${COLLECTION_POSTS}?${qs.toString()}`
    )
    docs = data.docs || []
  }

  return docs.map(normalizePost)
}

export async function getPostsByTagPaged(
  tag: string,
  params?: { limit?: number; page?: number; sort?: string }
): Promise<Paged<Post>> {
  const limit = params?.limit ?? 12
  const page = params?.page ?? 1
  const sort = params?.sort ?? '-createdAt'

  if (!tag) return { docs: [], totalDocs: 0, limit, page, totalPages: 1 }

  const qs = new URLSearchParams()
  qs.set('limit', String(limit))
  qs.set('page', String(page))
  qs.set('sort', sort)

  // tentativa 1: tags como array
  qs.set('where[tags][contains]', tag)
  let data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_POSTS}?${qs.toString()}`
  )
  let docs = data.docs || []

  // tentativa 2: tags como string
  if (!docs.length) {
    qs.delete('where[tags][contains]')
    qs.set('where[tags][equals]', tag)
    data = await fetchJson<PayloadListResponse<any>>(
      `/api/${COLLECTION_POSTS}?${qs.toString()}`
    )
  }

  return { ...toPaged(data), docs: (data.docs || []).map(normalizePost) }
}

// ======================
// Search (paged)
// ======================

export async function searchPostsPaged(
  q: string,
  params?: { limit?: number; page?: number; sort?: string }
): Promise<Paged<Post>> {
  const limit = params?.limit ?? 12
  const page = params?.page ?? 1
  const sort = params?.sort ?? '-createdAt'
  const query = (q ?? '').trim()

  if (!query) return getPostsPaged({ limit, page, sort })

  const qs = new URLSearchParams()
  qs.set('limit', String(limit))
  qs.set('page', String(page))
  qs.set('sort', sort)

  // OR title like OR description like
  qs.set('where[or][0][title][like]', query)
  qs.set('where[or][1][description][like]', query)

  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_POSTS}?${qs.toString()}`
  )

  return { ...toPaged(data), docs: (data.docs || []).map(normalizePost) }
}

// ======================
// Categories
// ======================

export async function getCategories(): Promise<Category[]> {
  const qs = new URLSearchParams()
  qs.set('limit', '200')
  qs.set('sort', 'title')

  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_CATEGORIES}?${qs.toString()}`
  )
  return (data.docs || []).map(normalizeCategory)
}

export async function getCategoriesPaged(params?: {
  limit?: number
  page?: number
  sort?: string
}): Promise<Paged<Category>> {
  const qs = buildListQs(params)
  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_CATEGORIES}?${qs.toString()}`
  )
  return { ...toPaged(data), docs: (data.docs || []).map(normalizeCategory) }
}

export async function getAllCategorySlugs(): Promise<string[]> {
  return fetchAllSlugs(COLLECTION_CATEGORIES)
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!slug) return null

  const qs = new URLSearchParams()
  qs.set('where[slug][equals]', slug)
  qs.set('limit', '1')

  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_CATEGORIES}?${qs.toString()}`
  )
  const doc = data.docs?.[0]
  return doc ? normalizeCategory(doc) : null
}

export async function getPostsByCategorySlug(
  categorySlug: string,
  params?: { limit?: number; page?: number; sort?: string }
): Promise<Post[]> {
  if (!categorySlug) return []

  const category = await getCategoryBySlug(categorySlug)
  if (!category?.id) return []

  const qs = buildListQs(params)
  qs.set('where[category][equals]', category.id)

  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_POSTS}?${qs.toString()}`
  )
  return (data.docs || []).map(normalizePost)
}

export async function getPostsByCategorySlugPaged(
  categorySlug: string,
  params?: { limit?: number; page?: number; sort?: string }
): Promise<Paged<Post>> {
  const limit = params?.limit ?? 12
  const page = params?.page ?? 1
  const sort = params?.sort ?? '-createdAt'

  if (!categorySlug) return { docs: [], totalDocs: 0, limit, page, totalPages: 1 }

  const category = await getCategoryBySlug(categorySlug)
  if (!category?.id) return { docs: [], totalDocs: 0, limit, page, totalPages: 1 }

  const qs = new URLSearchParams()
  qs.set('limit', String(limit))
  qs.set('page', String(page))
  qs.set('sort', sort)
  qs.set('where[category][equals]', category.id)

  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_POSTS}?${qs.toString()}`
  )

  return { ...toPaged(data), docs: (data.docs || []).map(normalizePost) }
}

// ======================
// Authors
// ======================

export async function getAllAuthors(): Promise<Author[]> {
  const qs = new URLSearchParams()
  qs.set('limit', '200')
  qs.set('sort', 'name')

  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_AUTHORS}?${qs.toString()}`
  )
  return (data.docs || []).map(normalizeAuthor)
}

export async function getAllAuthorsPaged(params?: {
  limit?: number
  page?: number
  sort?: string
}): Promise<Paged<Author>> {
  const qs = buildListQs(params)
  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_AUTHORS}?${qs.toString()}`
  )
  return { ...toPaged(data), docs: (data.docs || []).map(normalizeAuthor) }
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  if (!slug) return null

  const qs = new URLSearchParams()
  qs.set('where[slug][equals]', slug)
  qs.set('limit', '1')

  const data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_AUTHORS}?${qs.toString()}`
  )
  const doc = data.docs?.[0]
  return doc ? normalizeAuthor(doc) : null
}

async function getPostsByAuthorId(
  authorId: string,
  params?: { limit?: number; page?: number; sort?: string }
): Promise<Post[]> {
  if (!authorId) return []

  const qs = buildListQs(params)

  // Tentativa 1: relationship singular "author"
  qs.set('where[author][equals]', authorId)
  let data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_POSTS}?${qs.toString()}`
  )
  let docs = data.docs || []

  // Fallback: relationship array "authors"
  if (!docs.length) {
    qs.delete('where[author][equals]')
    qs.set('where[authors][contains]', authorId)
    data = await fetchJson<PayloadListResponse<any>>(
      `/api/${COLLECTION_POSTS}?${qs.toString()}`
    )
    docs = data.docs || []
  }

  return docs.map(normalizePost)
}

async function getPostsByAuthorIdPaged(
  authorId: string,
  params?: { limit?: number; page?: number; sort?: string }
): Promise<Paged<Post>> {
  const limit = params?.limit ?? 12
  const page = params?.page ?? 1
  const sort = params?.sort ?? '-createdAt'

  if (!authorId) return { docs: [], totalDocs: 0, limit, page, totalPages: 1 }

  const qs = new URLSearchParams()
  qs.set('limit', String(limit))
  qs.set('page', String(page))
  qs.set('sort', sort)

  // Tentativa 1: relationship singular "author"
  qs.set('where[author][equals]', authorId)
  let data = await fetchJson<PayloadListResponse<any>>(
    `/api/${COLLECTION_POSTS}?${qs.toString()}`
  )

  // Fallback: relationship array "authors"
  if (!(data.docs || []).length) {
    qs.delete('where[author][equals]')
    qs.set('where[authors][contains]', authorId)
    data = await fetchJson<PayloadListResponse<any>>(
      `/api/${COLLECTION_POSTS}?${qs.toString()}`
    )
  }

  return { ...toPaged(data), docs: (data.docs || []).map(normalizePost) }
}

export async function getPostsByAuthor(
  authorSlug: string,
  params?: { limit?: number; page?: number; sort?: string }
): Promise<Post[]> {
  const author = await getAuthorBySlug(authorSlug)
  if (!author?.id) return []
  return getPostsByAuthorId(author.id, params)
}

export async function getPostsByAuthorPaged(
  authorSlug: string,
  params?: { limit?: number; page?: number; sort?: string }
): Promise<Paged<Post>> {
  const author = await getAuthorBySlug(authorSlug)
  if (!author?.id) {
    return { docs: [], totalDocs: 0, limit: params?.limit ?? 12, page: params?.page ?? 1, totalPages: 1 }
  }
  return getPostsByAuthorIdPaged(author.id, params)
}
// ======================================
// Search helper (usado em /buscar)
// ======================================
export async function searchPosts(
  query: string,
  opts?: { limit?: number; page?: number; sort?: string }
) {
  const q = (query ?? "").trim().toLowerCase();
  if (!q) return [];

  // usa a mesma fonte de getPosts (Payload) e filtra local
  const posts = await getPosts({
    limit: opts?.limit ?? 200,
    page: opts?.page ?? 1,
    sort: opts?.sort ?? "-createdAt",
  });

  const hay = (p: any) =>
    [
      p?.title,
      p?.description,
      p?.hub,
      p?.cluster,
      ...(Array.isArray(p?.tags) ? p.tags : []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

  return posts.filter((p: any) => hay(p).includes(q));
}

// AUTO-FIX: export faltando para destravar build
export const getAllClusters = (..._args: any[]) => {
  throw new Error('TODO: implement getAllClusters');
};


// AUTO-FIX: export faltando para destravar build
export const getAllTags = (..._args: any[]) => {
  throw new Error('TODO: implement getAllTags');
};
// ... (mantenha todo o seu código anterior exatamente como está até a linha 460)

// ======================================
// ADIÇÕES PARA DESTRAVAR O BUILD
// ======================================
