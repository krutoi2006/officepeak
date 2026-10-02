const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export const useCookieConsent = () => {
  const consent = useCookie<'accepted' | null>('officepeak-cookie-consent', {
    default: () => null,
    maxAge: CONSENT_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: import.meta.env.PROD,
  })

  const accepted = computed(() => consent.value === 'accepted')
  const accept = () => { consent.value = 'accepted' }

  return { accepted, accept }
}
