import { siteConfig } from '~/config/site'

export type SubmissionKind = 'lead' | 'order'

export const deliverSubmission = async (kind: SubmissionKind, payload: Record<string, unknown>) => {
  const url = kind === 'lead' ? siteConfig.forms.leadTransportUrl : siteConfig.forms.mailTransportUrl
  if (!url) return { configured: false, delivered: false }
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ kind, payload }),
  })
  if (!response.ok) throw new Error(`Submission transport returned ${response.status}`)
  return { configured: true, delivered: true }
}
