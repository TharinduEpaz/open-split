import { Outlet, createRootRoute } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import TopLoadingBar from '@/components/loading-bar'
import { useState, useEffect } from 'react'

function DevTools() {
  // Only render devtools in development
  if (!import.meta.env.DEV) {
    return null
  }

  // Dynamic import to ensure tree-shaking in production
  const [Devtools, setDevtools] = useState<any>(null)
  const [RouterPanel, setRouterPanel] = useState<any>(null)

  useEffect(() => {
    if (import.meta.env.DEV) {
      import('@tanstack/react-devtools').then((mod) => {
        setDevtools(() => mod.TanStackDevtools)
      })
      import('@tanstack/react-router-devtools').then((mod) => {
        setRouterPanel(() => mod.TanStackRouterDevtoolsPanel)
      })
    }
  }, [])

  if (!Devtools || !RouterPanel) {
    return null
  }

  return (
    <Devtools
      config={{
        position: 'bottom-right',
      }}
      plugins={[
        {
          name: 'Tanstack Router',
          render: <RouterPanel />,
        },
      ]}
    />
  )
}

export const Route = createRootRoute({
  component: () => (
    <Box
      sx={{
        minHeight: '100vh',
        height: '100%',
        // backgroundColor: 'background.default', // Primary color background for all pages
      }}
    >
      <TopLoadingBar />
      {/* <Header /> */}
      <Outlet />
      <DevTools />
    </Box>
  ),
})
