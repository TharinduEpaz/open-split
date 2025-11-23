import { TanStackDevtools } from '@tanstack/react-devtools'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import Box from '@mui/material/Box'
import TopLoadingBar from '@/components/loading-bar'

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
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </Box>
  ),
})
