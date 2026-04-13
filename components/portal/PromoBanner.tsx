'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const promos = [
  {
    type: 'product' as const,
    headline: 'Nyati Super 42',
    grade: 'CEM II A-L 42.5R',
    sub: 'Rapid strength gain for high-grade concrete, blocks, precast & prestressed structures.',
    features: ['High Early Strength', 'High Final Compressive Strength', 'High Soundness'],
    image: '/assets/NyatiSuper42.webp',
    // orange bag — warm gradient
    bg: 'bg-gradient-to-r from-[#c96a00] to-[#e07b00]',
    badge: 'bg-[#f49545]/20 text-white border border-white/20',
  },
  {
    type: 'product' as const,
    headline: 'Nyati Duramax 42',
    grade: 'CEM II B-M 42.5N',
    sub: 'Excellent workability and durability for demanding structures and hydraulic applications.',
    features: ['Low Heat Generation', 'Enhanced Workability', 'Normal Initial Strength'],
    image: '/assets/NyatiDuramax42.webp',
    // yellow bag — deep blue gradient for contrast
    bg: 'bg-gradient-to-r from-[#173158] to-[#1e4070]',
    badge: 'bg-white/10 text-white border border-white/20',
  },
  {
    type: 'product' as const,
    headline: 'Nyati Premium OPC',
    grade: 'CEM I OPC 42.5N',
    sub: 'Unmatched strength and flowability — the go-to choice for critical structures and large-scale projects.',
    features: ['High Early Strength', 'Smooth Flowability', 'High Final Compressive Strength'],
    image: '/assets/NyatiPremiumOPC.webp',
    // white/steel bag — dark navy gradient
    bg: 'bg-gradient-to-r from-[#0f2040] to-[#173158]',
    badge: 'bg-white/10 text-white border border-white/20',
  },
  {
    type: 'product' as const,
    headline: 'Nyati Max 32',
    grade: 'CEM II B-L 32.5N',
    sub: 'Reliable everyday cement for foundations, masonry, road stabilization, and plastering.',
    features: ['Normal Setting', 'Enhanced Workability', 'High Soundness'],
    image: '/assets/NyatiMax32.webp',
    // green bag — deep green gradient
    bg: 'bg-gradient-to-r from-[#0f5c3a] to-[#147a4c]',
    badge: 'bg-white/10 text-white border border-white/20',
  },
  {
    type: 'promo' as const,
    headline: 'Dealer Incentive Program',
    grade: '',
    sub: 'Achieve 110% of monthly target and earn a 2% volume rebate. Top performers qualify for quarterly bonus rewards.',
    features: ['2% Volume Rebate', 'Quarterly Bonus', 'Priority Allocation'],
    image: null,
    bg: 'bg-gradient-to-r from-[#f49545] to-[#e07b00]',
    badge: 'bg-white/20 text-white border border-white/30',
  },
]

export default function PromoBanner() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % promos.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const promo = promos[index]

  return (
    <div className={`relative ${promo.bg} text-white rounded-xl overflow-hidden flex items-stretch min-h-28`}>
      {/* Text content */}
      <div className="flex-1 px-5 py-4 flex flex-col justify-between z-10 min-w-0">
        <div>
          {/* Grade badge */}
          {promo.grade && (
            <span className={`inline-block text-[10px] font-semibold uppercase tracking-widest rounded-full px-2 py-0.5 mb-2 font-body ${promo.badge}`}>
              {promo.grade}
            </span>
          )}

          {/* Headline */}
          <p className="text-lg font-bold font-display leading-tight">{promo.headline}</p>

          {/* Sub */}
          <p className="text-xs text-white/75 font-body mt-1 leading-relaxed line-clamp-2">
            {promo.sub}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          {/* Feature pills */}
          <div className="flex flex-wrap gap-1.5">
            {promo.features.map((f) => (
              <span
                key={f}
                className="text-[10px] font-semibold bg-white/15 rounded-full px-2 py-0.5 font-body whitespace-nowrap"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Dot indicators — pushed right */}
          <div className="ml-auto flex gap-1.5 shrink-0">
            {promos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/35'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product bag image */}
      {promo.image && (
        <div className="relative shrink-0 w-28 sm:w-36 self-stretch">
          {/* Left-side fade so image blends into gradient */}
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/30 to-transparent z-10 pointer-events-none" />
          <Image
            src={promo.image}
            alt={promo.headline}
            fill
            className="object-contain object-center drop-shadow-lg"
            sizes="(max-width: 640px) 112px, 144px"
          />
        </div>
      )}

      {/* Decorative circles for promo-type slides (no image) */}
      {!promo.image && (
        <>
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -right-4 -bottom-10 h-24 w-24 rounded-full bg-white/10 pointer-events-none" />
        </>
      )}
    </div>
  )
}
