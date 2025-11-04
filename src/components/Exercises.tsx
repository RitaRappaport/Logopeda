import React from 'react'

const SvgMouth = ({ variant = 'tongue-front' }: { variant?: 'tongue-front'|'tongue-back'|'rounded-lips' }) => {
  const stroke = '#0f172a'
  const fill = '#e7f5ff'
  return (
    <svg viewBox="0 0 200 120" className="w-full">
      <rect x="1" y="1" width="198" height="118" fill="white" stroke={stroke} rx="8"/>
      {/* simple jaw */}
      <path d="M20,60 Q100,110 180,60" stroke={stroke} fill="none" strokeWidth="2"/>
      {/* tongue variants */}
      {variant==='tongue-front' && <path d="M40,70 Q100,90 160,70" fill={fill} stroke={stroke}/>}
      {variant==='tongue-back' && <path d="M50,80 Q100,60 150,80" fill={fill} stroke={stroke}/>}
      {variant==='rounded-lips' && <ellipse cx="100" cy="40" rx="30" ry="18" fill={fill} stroke={stroke}/>}
    </svg>
  )
}

export default function Exercises(){
  const items = [
    { key: 'ich', title: 'Ich‑Laut [ç]', hint: 'Język blisko podniebienia twardego, delikatne tarcie.', svg: <SvgMouth variant="tongue-front" /> },
    { key: 'ach', title: 'Ach‑Laut [x]', hint: 'Bezdźwięczne tarcie w tylnej części jamy ustnej.', svg: <SvgMouth variant="tongue-back" /> },
    { key: 'ü', title: 'Ü [y]', hint: 'Usta okrągłe jak do „u”, język jak do „i”.', svg: <SvgMouth variant="rounded-lips" /> },
  ]
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {items.map(it => (
        <div key={it.key} className="border rounded p-3 space-y-2">
          <div className="text-lg font-semibold">{it.title}</div>
          <div className="text-slate-700 text-sm">{it.hint}</div>
          {it.svg}
        </div>
      ))}
    </div>
  )
}