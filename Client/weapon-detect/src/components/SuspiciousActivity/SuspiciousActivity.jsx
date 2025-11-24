import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

export default function SuspiciousActivity() {
  const [calls, setCalls] = useState([])
  const [err, setErr] = useState('')
  const [daysFilter, setDaysFilter] = useState('7')

  const loadCalls = async () => {
    try {
      setErr('')
      const res = await axios.get('http://localhost:3001/api/calls/mine', { withCredentials: true })
      setCalls(res.data?.data || [])
    } catch {
      setErr('Failed to load calls')
    }
  }

  useEffect(() => { loadCalls() }, [])

  const makeCall = async (number, label) => {
    try {
      await axios.post('http://localhost:3001/api/calls', { number, label }, { withCredentials: true })
      await loadCalls()
    } catch {
      console.error('Failed to log call')
    } finally {
      window.location.href = `tel:${number}`
    }
  }

  const cutoff = daysFilter !== 'all' ? moment().subtract(parseInt(daysFilter, 10), 'days') : null
  const visibleCalls = calls.filter(r => r.timestamp && (cutoff ? moment(r.timestamp).isSameOrAfter(cutoff) : true))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h1 className="text-2xl font-semibold text-black">Report Suspicious Activity</h1>
            <p className="text-sm text-gray-500">Quickly call authorities</p>

            <div className="mt-4 flex items-center gap-3">
              <button onClick={() => makeCall('15', 'Police (15)')} className="px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-500">Call Police (15)</button>
              <button onClick={() => makeCall('911', 'Emergency (911)')} className="px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-500">Call 911</button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">My Call Records</h2>
                <p className="text-sm text-gray-500">{daysFilter === 'all' ? 'All calls' : `Last ${daysFilter} days`}</p>
              </div>
              <select value={daysFilter} onChange={(e) => setDaysFilter(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-600">
                <option value="1">1 day</option>
                <option value="4">4 days</option>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
                <option value="all">All</option>
              </select>
            </div>

            {err ? (
              <div className="text-red-600 text-sm mt-4">{err}</div>
            ) : visibleCalls.length === 0 ? (
              <div className="text-gray-500 text-sm mt-6">No calls found.</div>
            ) : (
              <ul className="mt-4 space-y-3">
                {visibleCalls.map((r) => (
                  <li key={r._id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-700">{r.label || r.number}</span>
                          <span className="text-xs text-gray-500">{moment(r.timestamp).format('lll')}</span>
                        </div>
                      </div>
                      <span className="px-3 py-2 rounded-md bg-indigo-600 text-white text-xs">Dialed</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
