import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

function History() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const [daysFilter, setDaysFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("latest")

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)
        setErr("")
        const user = await axios.get("http://localhost:3001/user/profile", { withCredentials: true })
        const userID = user.data._id
        const res = await axios.get(`http://localhost:3001/api/detection/${userID}`, { withCredentials: true })
        const data = Array.isArray(res.data?.data) ? res.data.data : []
        const sorted = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        setItems(sorted)
      } catch {
        setErr("Failed to load history.")
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const filtered = useMemo(() => {
    const cutoff = daysFilter !== 'all' ? moment().subtract(parseInt(daysFilter, 10), 'days') : null
    let list = items.filter(i => {
      const ts = i.timestamp || i.createdAt || i.updatedAt
      const inDays = cutoff ? (ts && moment(ts).isSameOrAfter(cutoff)) : true
      const q = search.trim().toLowerCase()
      const klass = String(i.class_name || '').toLowerCase()
      const loc = String(i.location || '').toLowerCase()
      const matchesText = q ? (klass.includes(q) || loc.includes(q)) : true
      const matchesStatus = statusFilter === 'all' ? true : statusFilter === 'ack' ? !!i.isViewed : !i.isViewed
      return inDays && matchesText && matchesStatus
    })
    list = list.sort((a,b) => {
      if (sortBy === 'latest') return new Date(b.timestamp || b.createdAt || b.updatedAt) - new Date(a.timestamp || a.createdAt || a.updatedAt)
      if (sortBy === 'oldest') return new Date(a.timestamp || a.createdAt || a.updatedAt) - new Date(b.timestamp || b.createdAt || b.updatedAt)
      if (sortBy === 'confidence-high') return (b.confidence || 0) - (a.confidence || 0)
      if (sortBy === 'confidence-low') return (a.confidence || 0) - (b.confidence || 0)
      return 0
    })
    return list
  }, [items, daysFilter, search, statusFilter, sortBy])

  const [page, setPage] = useState(1)
  const pageSize = 9
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const startIdx = (page - 1) * pageSize
  const pageItems = filtered.slice(startIdx, startIdx + pageSize)
  useEffect(() => { if (page > totalPages) setPage(1) }, [filtered.length, totalPages])

  const formatInPK = (ts) => {
    try {
      const d = new Date(ts)
      return new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(d)
    } catch {
      return ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-black">View History</h1>
              <p className="text-sm text-gray-500">{daysFilter === "all" ? "All alerts" : `Alerts from last ${daysFilter} days`}</p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100">{filtered.length} total</span>
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-2">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search class or location" className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700">
              <option value="all">All</option>
              <option value="ack">Acknowledged</option>
              <option value="unack">Unacknowledged</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700">
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="confidence-high">Confidence high</option>
              <option value="confidence-low">Confidence low</option>
            </select>
            <select value={daysFilter} onChange={(e) => setDaysFilter(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700">
              <option value="1">1 day</option>
              <option value="4">4 days</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        ) : err ? (
          <div className="text-center py-8 text-red-600">{err}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No history found.</div>
        ) : (
          <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageItems.map((alert) => (
              <div key={alert._id} className="rounded-xl bg-white border border-gray-200 shadow hover:shadow-md transition overflow-hidden">
                <div className="relative">
                  {alert.s3_url ? (
                    <img src={alert.s3_url} alt="detection" className="w-full h-40 object-cover" />
                  ) : (
                    <div className="w-full h-40 bg-gray-100" />
                  )}
                  <div className="absolute top-2 left-2 flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-900/80 text-white">{alert.class_name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${alert.isViewed ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{alert.isViewed ? 'Acknowledged' : 'Unacknowledged'}</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    {alert.s3_url && (
                      <a href={alert.s3_url} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 rounded bg-blue-600 text-white">Open</a>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {alert.timestamp ? formatInPK(alert.timestamp) : (alert.createdAt ? formatInPK(alert.createdAt) : "—")}
                  </div>
                  <div className="mt-1 text-sm text-gray-700 truncate">
                    {alert.location || "Unknown location"}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-gray-500">Page {page} of {totalPages}</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Prev</button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Next</button>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default History
