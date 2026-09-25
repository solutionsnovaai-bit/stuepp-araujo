import { useRef } from 'react'
import { words } from '../content'
import { useSceneActivity } from '../hooks/useSceneActivity'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { MonogramIcon } from './BrandMark'

export default function WordRibbon() {
  const ref = useRef<HTMLDivElement>(null)
  const active = useSceneActivity(ref, 0)
  const { reduced } = useMotionPreferences()
  return <div ref={ref} className={`ribbon ${active && !reduced ? 'is-moving' : ''}`} aria-label={words.join(', ')}>
    <div className="ribbon-track" aria-hidden="true">
      {[0, 1].map(copy => <div className="ribbon-group" key={copy}>
        {words.map(w => <span className="ribbon-item" key={w}><span>{w}</span><MonogramIcon className="ribbon-mono" /></span>)}
      </div>)}
    </div>
  </div>
}
