import {
  AuthResponse,
  Blog,
  CreateBlogInput,
  CreatePostInput,
  Post,
  PostListItem,
  Tag,
  UpdateBlogInput,
  UpdatePostBaseInput,
  UpdateVariantInput,
  User,
  Webhook,
  CreateWebhookInput,
  UpdateWebhookInput,
  WebhookDelivery,
  TestWebhookResult,
  ImportResult,
  Subscriber,
  CreateSubscriberInput,
  Newsletter,
  SendNewsletterResponse,
  AnalyticsOverview,
  BlogMember,
  BlogInvite,
  TeamOverview,
  BlogRole,
  Comment,
  CommentStatus,
  VerifyDomainResult,
  PostRevision,
  AiStatus,
  AiTestResult,
} from './types'

const TOKEN_KEY = 'blog_auth_token'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

export function clearToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {})
  const token = getToken()

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const res = await fetch(path, {
    ...options,
    headers,
  })

  if (!res.ok) {
    let errorMsg = `HTTP Error ${res.status}`
    try {
      const text = await res.text()
      try {
        const errorJson = JSON.parse(text)
        if (errorJson.error) errorMsg = errorJson.error
        else if (errorJson.message) errorMsg = errorJson.message
      } catch {
        if (text) errorMsg = text
      }
    } catch {
      // Body could not be read
    }
    throw new Error(errorMsg)
  }

  if (res.status === 204) {
    return {} as T
  }

  const text = await res.text()
  if (!text) {
    return {} as T
  }

  try {
    return JSON.parse(text) as T
  } catch {
    return text as unknown as T
  }
}

export const api = {
  auth: {
    login: (credentials: { email: string; password: string }) =>
      request<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    register: (data: { email: string; password: string; name: string }) =>
      request<AuthResponse>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    me: () => request<User>('/api/auth/me'),
  },

  blogs: {
    list: () => request<Blog[]>('/api/console/blogs'),
    create: (data: CreateBlogInput) =>
      request<Blog>('/api/console/blogs', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    get: (blogId: number) => request<Blog>(`/api/console/blogs/${blogId}`),
    update: (blogId: number, data: UpdateBlogInput) =>
      request<Blog>(`/api/console/blogs/${blogId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  posts: {
    list: (
      blogId: number,
      params?: { language?: string; status?: string; isPage?: boolean }
    ) => {
      const query = new URLSearchParams()
      if (params?.language) query.set('language', params.language)
      if (params?.status) query.set('status', params.status)
      if (params?.isPage !== undefined) query.set('isPage', String(params.isPage))
      const qs = query.toString() ? `?${query.toString()}` : ''
      return request<PostListItem[]>(`/api/console/blogs/${blogId}/posts${qs}`)
    },
    get: (blogId: number, postId: number) =>
      request<Post>(`/api/console/blogs/${blogId}/posts/${postId}`),
    create: (blogId: number, data: CreatePostInput) =>
      request<Post>(`/api/console/blogs/${blogId}/posts`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateBase: (blogId: number, postId: number, data: UpdatePostBaseInput) =>
      request<Post>(`/api/console/blogs/${blogId}/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    updateVariant: (
      blogId: number,
      postId: number,
      lang: string,
      data: UpdateVariantInput
    ) =>
      request<any>(
        `/api/console/blogs/${blogId}/posts/${postId}/variants/${lang}`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
        }
      ),
    delete: (blogId: number, postId: number) =>
      request<void>(`/api/console/blogs/${blogId}/posts/${postId}`, {
        method: 'DELETE',
      }),
  },

  tags: {
    list: (blogId: number) => request<Tag[]>(`/api/console/blogs/${blogId}/tags`),
    create: (blogId: number, data: { name: string; slug: string }) =>
      request<Tag>(`/api/console/blogs/${blogId}/tags`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    delete: (blogId: number, tagId: number) =>
      request<void>(`/api/console/blogs/${blogId}/tags/${tagId}`, {
        method: 'DELETE',
      }),
  },

  media: {
    upload: async (blogId: number, file: File): Promise<{ url: string }> => {
      const formData = new FormData()
      formData.append('file', file)
      return request<{ url: string }>(`/api/console/blogs/${blogId}/media`, {
        method: 'POST',
        body: formData,
      })
    },
  },

  ai: {
    status: (blogId: number) =>
      request<AiStatus>(`/api/console/blogs/${blogId}/ai/status`),
    test: (blogId: number) =>
      request<AiTestResult>(`/api/console/blogs/${blogId}/ai/test`, {
        method: 'POST',
      }),
    translate: (
      blogId: number,
      postId: number,
      data: { sourceLanguage: string; targetLanguage: string }
    ) =>
      request<any>(
        `/api/console/blogs/${blogId}/posts/${postId}/ai/translate`,
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      ),
    generateSeo: (
      blogId: number,
      postId: number,
      data: { languageCode: string }
    ) =>
      request<{ titles: string[]; metaDescription: string; tags: string[] }>(
        `/api/console/blogs/${blogId}/posts/${postId}/ai/seo`,
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      ),
  },

  webhooks: {
    list: (blogId: number) => request<Webhook[]>(`/api/console/blogs/${blogId}/webhooks`),
    create: (blogId: number, data: CreateWebhookInput) =>
      request<Webhook>(`/api/console/blogs/${blogId}/webhooks`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    get: (blogId: number, webhookId: number) =>
      request<Webhook>(`/api/console/blogs/${blogId}/webhooks/${webhookId}`),
    update: (blogId: number, webhookId: number, data: UpdateWebhookInput) =>
      request<Webhook>(`/api/console/blogs/${blogId}/webhooks/${webhookId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (blogId: number, webhookId: number) =>
      request<void>(`/api/console/blogs/${blogId}/webhooks/${webhookId}`, {
        method: 'DELETE',
      }),
    test: (blogId: number, webhookId: number) =>
      request<TestWebhookResult>(`/api/console/blogs/${blogId}/webhooks/${webhookId}/test`, {
        method: 'POST',
      }),
    deliveries: (blogId: number, webhookId: number) =>
      request<WebhookDelivery[]>(`/api/console/blogs/${blogId}/webhooks/${webhookId}/deliveries`),
  },

  importer: {
    wordpress: async (blogId: number, file: File): Promise<ImportResult> => {
      const formData = new FormData()
      formData.append('file', file)
      return request<ImportResult>(`/api/console/blogs/${blogId}/import/wordpress`, {
        method: 'POST',
        body: formData,
      })
    },
    markdown: async (blogId: number, file: File): Promise<ImportResult> => {
      const formData = new FormData()
      formData.append('file', file)
      return request<ImportResult>(`/api/console/blogs/${blogId}/import/markdown`, {
        method: 'POST',
        body: formData,
      })
    },
  },

  subscribers: {
    list: (blogId: number) =>
      request<Subscriber[]>(`/api/console/blogs/${blogId}/subscribers`),
    create: (blogId: number, data: CreateSubscriberInput) =>
      request<Subscriber>(`/api/console/blogs/${blogId}/subscribers`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    delete: (blogId: number, subscriberId: number) =>
      request<void>(`/api/console/blogs/${blogId}/subscribers/${subscriberId}`, {
        method: 'DELETE',
      }),
  },

  newsletters: {
    list: (blogId: number) =>
      request<Newsletter[]>(`/api/console/blogs/${blogId}/newsletters`),
    sendForPost: (
      blogId: number,
      postId: number,
      data?: { subject?: string; contentHtml?: string }
    ) =>
      request<SendNewsletterResponse>(
        `/api/console/blogs/${blogId}/posts/${postId}/send-newsletter`,
        {
          method: 'POST',
          body: JSON.stringify(data || {}),
        }
      ),
  },

  analytics: {
    getOverview: (blogId: number, days: number = 30) =>
      request<AnalyticsOverview>(`/api/console/blogs/${blogId}/analytics?days=${days}`),
  },

  team: {
    getOverview: (blogId: number) =>
      request<TeamOverview>(`/api/console/blogs/${blogId}/team`),
    invite: (blogId: number, data: { email: string; role: BlogRole }) =>
      request<BlogInvite>(`/api/console/blogs/${blogId}/team/invites`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateRole: (blogId: number, targetUserId: number, role: BlogRole) =>
      request<BlogMember>(`/api/console/blogs/${blogId}/team/members/${targetUserId}`, {
        method: 'PUT',
        body: JSON.stringify({ role }),
      }),
    removeMember: (blogId: number, targetUserId: number) =>
      request<{ success: boolean }>(`/api/console/blogs/${blogId}/team/members/${targetUserId}`, {
        method: 'DELETE',
      }),
    revokeInvite: (blogId: number, inviteId: number) =>
      request<{ success: boolean }>(`/api/console/blogs/${blogId}/team/invites/${inviteId}`, {
        method: 'DELETE',
      }),
    acceptInvite: (token: string) =>
      request<BlogMember>(`/api/console/invites/${token}/accept`, {
        method: 'POST',
      }),
  },

  domains: {
    verify: (blogId: number) =>
      request<VerifyDomainResult>(`/api/console/blogs/${blogId}/domain/verify`, {
        method: 'POST',
      }),
  },

  comments: {
    list: (blogId: number, status?: CommentStatus) => {
      const qs = status ? `?status=${status}` : ''
      return request<Comment[]>(`/api/console/blogs/${blogId}/comments${qs}`)
    },
    updateStatus: (blogId: number, commentId: number, status: CommentStatus) =>
      request<Comment>(`/api/console/blogs/${blogId}/comments/${commentId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),
    delete: (blogId: number, commentId: number) =>
      request<{ success: boolean }>(`/api/console/blogs/${blogId}/comments/${commentId}`, {
        method: 'DELETE',
      }),
  },

  revisions: {
    list: (blogId: number, postId: number, languageCode: string) =>
      request<PostRevision[]>(
        `/api/console/blogs/${blogId}/posts/${postId}/variants/${languageCode}/revisions`
      ),
    restore: (blogId: number, postId: number, languageCode: string, revisionId: number) =>
      request<any>(
        `/api/console/blogs/${blogId}/posts/${postId}/variants/${languageCode}/revisions/${revisionId}/restore`,
        {
          method: 'POST',
        }
      ),
  },

  exportArchive: async (blogId: number, blogSlug: string = 'blog') => {
    const token = getToken()
    const headers: Record<string, string> = {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`/api/console/blogs/${blogId}/export.zip`, { headers })
    if (!res.ok) {
      throw new Error(`Failed to export archive: ${res.statusText}`)
    }
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${blogSlug}-export-${new Date().toISOString().slice(0, 10)}.zip`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  },
}
