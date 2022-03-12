import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import { GlobalStyles } from '@/styles/global'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
