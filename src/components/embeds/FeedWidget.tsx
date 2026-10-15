import { useEffect, type ReactNode } from 'react'
import type { FeedWidgetProvider } from '../../data/site'
import { loadScript, loadStylesheet } from '../../lib/utils'

/*
 * Live social-feed widgets. Both providers render into the container
 * below once their script loads. If a provider's dashboard gives you a
 * different snippet, mirror its container markup + script URL here.
 */
const PROVIDERS: Record<FeedWidgetProvider, { script: string; stylesheet?: string; render: (id: string) => ReactNode }> = {
  elfsight: {
    script: 'https://elfsightcdn.com/platform.js',
    render: (id) => <div className={`elfsight-app-${id}`} data-elfsight-app-lazy="" />,
  },
  juicer: {
    script: 'https://assets.juicer.io/embed.js',
    stylesheet: 'https://assets.juicer.io/embed.css',
    render: (id) => <ul className="juicer-feed" data-feed-id={id} data-per="12" />,
  },
}

export function FeedWidget({ provider, id }: { provider: FeedWidgetProvider; id: string }) {
  const config = PROVIDERS[provider]

  useEffect(() => {
    if (config.stylesheet) loadStylesheet(config.stylesheet)
    loadScript(config.script)
  }, [config])

  return <div className="min-h-64 overflow-hidden rounded-3xl">{config.render(id)}</div>
}
