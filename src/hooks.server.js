/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // Skip the well-known path that's causing issues
  if (event.url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
    return new Response('Not Found', { status: 404 })
  }

  const response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace(
        '%unocss-svelte-scoped.global%',
        'unocss_svelte_scoped_global_styles'
      ),
  })
  return response
}