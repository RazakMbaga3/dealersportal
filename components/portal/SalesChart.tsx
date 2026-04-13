'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { MonthlyStat } from '@/types'

interface SalesChartProps {
  data: MonthlyStat[]
}

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fontFamily: 'var(--font-body)', fill: '#6b7280' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fontFamily: 'var(--font-body)', fill: '#6b7280' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}MT`}
          width={48}
        />
        <Tooltip
          formatter={(value, name) => [
            `${value} MT`,
            name === 'salesMT' ? 'Sales' : 'Target',
          ]}
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: 12,
            fontFamily: 'var(--font-body)',
          }}
        />
        <Legend
          formatter={(value) => (value === 'salesMT' ? 'Sales' : 'Target')}
          wrapperStyle={{ fontSize: 12, fontFamily: 'var(--font-body)' }}
        />
        <Bar dataKey="targetMT" fill="#173158" radius={[3, 3, 0, 0]} barSize={14} />
        <Bar dataKey="salesMT" fill="#f49545" radius={[3, 3, 0, 0]} barSize={14} />
      </BarChart>
    </ResponsiveContainer>
  )
}
