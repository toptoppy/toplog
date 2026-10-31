'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import { AnalyticsOverview } from '@/lib/types'
import {
  BarChart2,
  TrendingUp,
  Eye,
  Calendar,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  FileText,
} from 'lucide-react'

export default function AnalyticsPage() {
  const params = useParams()
  const blogId = Number(params.blogId)

  const [days, setDays] = useState(30)
  const [data, setData] = useState<AnalyticsOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [hoveredPoint, setHoveredPoint] = useState<{ date: string; views: number } | null>(null)

  const loadAnalytics = async (selectedDays: number) => {
    setLoading(true)
    try {
      const overview = await api.analytics.getOverview(blogId, selectedDays)
      setData(overview)
    } catch (err) {
      console.error('Failed to load analytics', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (blogId) {
      loadAnalytics(days)
    }
  }, [blogId, days])

  const maxDailyViews = Math.max(
    ...(data?.viewsByDay.map((p) => p.views) || [1]),
    5
  )

  const totalDeviceViews = data
    ? Object.values(data.deviceBreakdown).reduce((acc, v) => acc + v, 0)
    : 0

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
              <BarChart2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Analytics & Performance
              </h1>
              <p className="text-sm text-slate-500">
                Privacy-first, cookieless metrics on traffic, top essays, and audience channels.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  days === d
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {d} Days
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => loadAnalytics(days)}
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 shadow-sm transition"
            title="Refresh metrics"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      {loading && !data ? (
        <div className="flex h-96 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : data ? (
        <div className="space-y-8">
          {/* Overview Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Total Views
                </span>
                <span className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <Eye className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-slate-900 font-mono">
                {data.totalViews.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-slate-500">All-time recorded page views</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Past 7 Days
                </span>
                <span className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-slate-900 font-mono">
                {data.views7d.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-emerald-600 font-medium">Recent reader activity</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Views Today
                </span>
                <span className="rounded-lg bg-purple-50 p-2 text-purple-600">
                  <Calendar className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-slate-900 font-mono">
                {data.viewsToday.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-slate-500">Since 00:00 UTC</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Primary Device
                </span>
                <span className="rounded-lg bg-amber-50 p-2 text-amber-600">
                  <Monitor className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-slate-900 capitalize">
                {Object.entries(data.deviceBreakdown).sort((a, b) => b[1] - a[1])[0]?.[0] ||
                  'Desktop'}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {totalDeviceViews > 0
                  ? `${Math.round(
                      ((Object.entries(data.deviceBreakdown).sort((a, b) => b[1] - a[1])[0]?.[1] ||
                        0) /
                        totalDeviceViews) *
                        100
                    )}% of audience`
                  : 'Awaiting view data'}
              </p>
            </div>
          </div>

          {/* Interactive Bar Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Traffic Timeseries</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Daily page views over the last {days} days
                </p>
              </div>
              {hoveredPoint && (
                <div className="rounded-lg bg-slate-900 px-3 py-1 text-xs text-white shadow font-mono">
                  {hoveredPoint.date}: <strong>{hoveredPoint.views} views</strong>
                </div>
              )}
            </div>

            {data.viewsByDay.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
                No view data in this period
              </div>
            ) : (
              <div className="relative pt-6">
                <div className="flex items-end gap-1.5 h-56 w-full px-2">
                  {data.viewsByDay.map((point) => {
                    const heightPercent = Math.max((point.views / maxDailyViews) * 100, 4)
                    return (
                      <div
                        key={point.date}
                        className="flex-1 flex flex-col items-center group relative h-full justify-end cursor-pointer"
                        onMouseEnter={() => setHoveredPoint(point)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-sm transition-all duration-300 ${
                            point.views > 0
                              ? 'bg-blue-500 group-hover:bg-blue-600 shadow-sm'
                              : 'bg-slate-100 group-hover:bg-slate-200'
                          }`}
                        />
                      </div>
                    )
                  })}
                </div>

                {/* X-axis date labels */}
                <div className="flex justify-between border-t border-slate-200 pt-2 text-[10px] text-slate-400 font-mono">
                  <span>{data.viewsByDay[0]?.date}</span>
                  <span>
                    {data.viewsByDay[Math.floor(data.viewsByDay.length / 2)]?.date}
                  </span>
                  <span>{data.viewsByDay[data.viewsByDay.length - 1]?.date}</span>
                </div>
              </div>
            )}
          </div>

          {/* Breakdown Section: Top Posts & Top Referrers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Posts */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <h2 className="text-base font-bold text-slate-900">Top Articles</h2>
                </div>
                <span className="text-xs text-slate-400 font-medium">By views</span>
              </div>

              {data.topPosts.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  No post views recorded yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {data.topPosts.map((post, idx) => {
                    const maxPostViews = data.topPosts[0]?.views || 1
                    const widthPercent = Math.max((post.views / maxPostViews) * 100, 5)

                    return (
                      <div key={post.id} className="group">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <Link
                            href={`/blogs/${blogId}/posts/${post.id}`}
                            className="font-semibold text-slate-800 hover:text-blue-600 truncate max-w-[280px] sm:max-w-[360px]"
                          >
                            <span className="text-slate-400 font-mono text-xs mr-2">
                              #{idx + 1}
                            </span>
                            {post.title}
                          </Link>
                          <span className="font-mono text-xs font-semibold text-slate-700 ml-2">
                            {post.views.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${widthPercent}%` }}
                            className="h-full bg-blue-500 rounded-full group-hover:bg-blue-600 transition-all"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Referrers & Devices */}
            <div className="space-y-8">
              {/* Top Referrers */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-purple-600" />
                    <h2 className="text-base font-bold text-slate-900">Top Referrers</h2>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Source channels</span>
                </div>

                {data.topReferrers.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-sm">
                    No referral data available.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {data.topReferrers.map((ref) => {
                      const totalRefViews = data.topReferrers.reduce(
                        (acc, r) => acc + r.count,
                        0
                      )
                      const pct = totalRefViews > 0 ? Math.round((ref.count / totalRefViews) * 100) : 0

                      return (
                        <div
                          key={ref.referrer}
                          className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-slate-50 transition"
                        >
                          <div className="flex items-center gap-2 truncate max-w-[240px]">
                            <span className="h-2 w-2 rounded-full bg-purple-500 shrink-0" />
                            <span className="font-medium text-slate-700 truncate">
                              {ref.referrer}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400 font-mono">{pct}%</span>
                            <span className="font-mono text-xs font-semibold text-slate-800">
                              {ref.count.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Devices Breakdown */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-bold text-slate-900 mb-4">Device Distribution</h2>
                <div className="grid grid-cols-3 gap-3">
                  {['desktop', 'mobile', 'tablet'].map((device) => {
                    const count = data.deviceBreakdown[device] || 0
                    const pct = totalDeviceViews > 0 ? Math.round((count / totalDeviceViews) * 100) : 0
                    const Icon =
                      device === 'mobile'
                        ? Smartphone
                        : device === 'tablet'
                        ? Tablet
                        : Monitor

                    return (
                      <div
                        key={device}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-center"
                      >
                        <Icon className="h-4 w-4 text-slate-500 mx-auto mb-1.5" />
                        <p className="text-xs font-semibold uppercase text-slate-600 capitalize">
                          {device}
                        </p>
                        <p className="text-lg font-bold text-slate-900 font-mono mt-1">{pct}%</p>
                        <p className="text-[10px] text-slate-400">{count} views</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Compliance Banner */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Cookieless, GDPR/CCPA Compliant Analytics:</strong>{' '}
              All metrics are recorded without cookies, cross-site trackers, or personally identifiable information (PII).
              Traffic data is collected via non-blocking browser beacons directly to your self-hosted infrastructure.
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
