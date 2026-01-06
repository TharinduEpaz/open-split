import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/my-splits/$splitId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
