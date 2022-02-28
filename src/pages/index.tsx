import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Select from '../components/select'

const queryClient = new QueryClient()

function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Select />
    </QueryClientProvider>
  )
}

export default Home
