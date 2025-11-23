import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Container } from '@mui/material'
import BasicBreadcrumbs from '@/components/breadcrumb'

export const Route = createFileRoute('/my-splits')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Container className="p-10 h-full rounded-md " maxWidth="lg">
      <BasicBreadcrumbs />
      <Outlet />
    </Container>
  )
}
