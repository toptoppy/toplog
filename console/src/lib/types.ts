export type UserRole = 'ADMIN' | 'AUTHOR' | 'EDITOR'
export type BlogRole = 'ADMIN' | 'EDITOR' | 'AUTHOR'
export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED'
export type CommentStatus = 'PENDING' | 'APPROVED' | 'SPAM' | 'DELETED'
export type DnsStatus = 'UNVERIFIED' | 'VERIFIED' | 'MISCONFIGURED'

export interface User {
  id: number
  email: string
  name: string
  role: UserRole
}

export interface AuthResponse {
  token: string
  user: User
}

export interface Blog {
  id: number
  ownerId: number
  subdomain: string
  customDomain: string | null
  title: string
  description: string | null
  defaultLanguage: string
  themeName: string
  codeHead?: string | null
  codeFoot?: string | null
  accentColor: string
  fontFamily: string
  logoUrl?: string | null
  faviconUrl?: string | null
  domainVerifiedAt?: string | null
  domainDnsStatus: DnsStatus
  darkModeEnabled?: boolean
  aiApiKey?: string | null
  aiBaseUrl?: string | null
  aiModel?: string | null
  hasCustomAiKey?: boolean
  createdAt: string
}

export interface CreateBlogInput {
  subdomain: string
  title: string
  description?: string
  defaultLanguage?: string
  accentColor?: string
  fontFamily?: string
}

export interface UpdateBlogInput {
  title?: string
  description?: string
  customDomain?: string
  defaultLanguage?: string
  themeName?: string
  codeHead?: string | null
  codeFoot?: string | null
  accentColor?: string
  fontFamily?: string
  logoUrl?: string | null
  faviconUrl?: string | null
  darkModeEnabled?: boolean
  aiApiKey?: string | null
  aiBaseUrl?: string | null
  aiModel?: string | null
}

export interface Tag {
  id: number
  blogId: number
  name: string
  slug: string
}

export interface PostVariant {
  id: number
  postId: number
  languageCode: string
  slug: string
  title: string
  description: string | null
  contentJson: string
  contentHtml: string
  status: PostStatus
  publishedAt: string | null
  scheduledAt: string | null
  updatedAt: string
  readingTimeMinutes?: number
  wordCount?: number
}

export interface Post {
  id: number
  blogId: number
  isFeatured: boolean
  isPage: boolean
  featuredImageUrl: string | null
  canonicalUrl: string | null
  createdAt: string
  updatedAt: string
  variants: PostVariant[]
  tags: Tag[]
}

export interface PostListItem {
  id: number
  blogId: number
  isFeatured: boolean
  isPage: boolean
  featuredImageUrl: string | null
  createdAt: string
  variant: PostVariant | null
  tags: Tag[]
}

export interface CreatePostInput {
  title: string
  slug: string
  languageCode?: string
  description?: string
  contentJson?: string
  contentHtml?: string
  isFeatured?: boolean
  isPage?: boolean
  featuredImageUrl?: string
  tagIds?: number[]
  status?: PostStatus
  scheduledAt?: string | null
  publishedAt?: string | null
}

export interface UpdatePostBaseInput {
  isFeatured?: boolean
  isPage?: boolean
  featuredImageUrl?: string | null
  canonicalUrl?: string | null
  tagIds?: number[]
}

export interface UpdateVariantInput {
  title: string
  slug: string
  description?: string
  contentJson?: string
  contentHtml?: string
  status?: PostStatus
  scheduledAt?: string | null
  publishedAt?: string | null
}

export interface PublicPostListItem {
  id: number
  slug: string
  title: string
  description: string | null
  isFeatured: boolean
  isPage: boolean
  featuredImageUrl: string | null
  publishedAt: string | null
  publishedAtFormatted: string | null
  readingTimeMinutes: number
  tags: Tag[]
  languageCode: string
}

export interface PublicPostDetail extends PublicPostListItem {
  contentHtml: string
  contentJson: string
  canonicalUrl: string | null
  wordCount: number
  relatedPosts: PublicPostListItem[]
}

export interface Webhook {
  id: number
  blogId: number
  url: string
  secret: string
  events: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateWebhookInput {
  url: string
  secret?: string
  events: string[]
  isActive: boolean
}

export interface UpdateWebhookInput {
  url: string
  secret?: string
  events: string[]
  isActive: boolean
}

export interface WebhookDelivery {
  id: number
  webhookId: number
  event: string
  payload: string
  responseStatus: number | null
  responseBody: string | null
  durationMs: number | null
  errorMessage: string | null
  createdAt: string
}

export interface TestWebhookResult {
  success: boolean
  statusCode: number | null
  durationMs: number
  errorMessage: string | null
}

export interface ImportResult {
  success: boolean
  importedPostsCount: number
  importedPagesCount: number
  importedTagsCount: number
  errors: string[]
  message: string
}

export interface MediaItem {
  filename: string
  url: string
  sizeBytes: number
  contentType: string
  createdAt: string
}

export type SubscriberStatus = 'ACTIVE' | 'UNSUBSCRIBED'

export interface Subscriber {
  id: number
  blogId: number
  email: string
  name: string | null
  status: SubscriberStatus
  createdAt: string
}

export interface CreateSubscriberInput {
  email: string
  name?: string
  status?: SubscriberStatus
}

export interface Newsletter {
  id: number
  blogId: number
  postId: number | null
  subject: string
  recipientCount: number
  sentAt: string
}

export interface SendNewsletterResponse {
  success: boolean
  recipientCount: number
  message: string
}

export interface TimeseriesPoint {
  date: string
  views: number
}

export interface TopPostStat {
  id: number
  title: string
  slug: string
  views: number
}

export interface ReferrerStat {
  referrer: string
  count: number
}

export interface AnalyticsOverview {
  totalViews: number
  views7d: number
  viewsToday: number
  viewsByDay: TimeseriesPoint[]
  topPosts: TopPostStat[]
  topReferrers: ReferrerStat[]
  deviceBreakdown: Record<string, number>
}

export interface BlogMember {
  id: number
  blogId: number
  userId: number
  email: string
  name: string
  role: BlogRole
  createdAt: string
}

export interface BlogInvite {
  id: number
  blogId: number
  email: string
  role: BlogRole
  token: string
  expiresAt: string
  createdAt: string
}

export interface TeamOverview {
  members: BlogMember[]
  pendingInvites: BlogInvite[]
}

export interface VerifyDomainResult {
  domain: string
  dnsStatus: DnsStatus
  verified: boolean
  detectedIps: string[]
  expectedCnameOrIp: string
  sslReady?: boolean
  sslStatus?: string
  message: string
}

export interface Comment {
  id: number
  blogId: number
  postId: number
  parentId: number | null
  authorName: string
  authorEmail: string
  authorWebsite: string | null
  content: string
  status: CommentStatus
  createdAt: string
  postTitle?: string
}

export interface PostRevision {
  id: number
  postVariantId: number
  title: string
  slug: string
  contentHtml: string
  contentJson: string
  description: string | null
  status: PostStatus
  createdByUserId: number | null
  createdByName?: string | null
  createdAt: string
  wordCount: number
}

export interface AiStatus {
  configured: boolean
  provider: string
  baseUrl: string
  model: string
  isCustom?: boolean
}

export interface AiTestResult {
  success: boolean
  provider: string
  model: string
  latencyMs?: number
  message?: string
  error?: string
}




