import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Container } from '@mui/material'
import BasicBreadcrumbs from '@/components/breadcrumb'

export const Route = createFileRoute('/my-splits')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Container className="mt-10 mb-10 bg-primary" maxWidth="md" >
      <BasicBreadcrumbs />
      <Outlet />
    </Container>
  )
}
