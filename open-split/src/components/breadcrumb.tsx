import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useLocation } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

// Map of routes to their breadcrumb items
const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
  '/': [
    { label: 'Home', href: '/' }
  ],
  '/create-split': [
    { label: 'Home', href: '/' },
    { label: 'Create Split', href: '/create-split' }
  ]
}

export default function BasicBreadcrumbs() {
  const location = useLocation()

  const breadcrumbs = breadcrumbMap[location.pathname] || []

  return (
    <div role="presentation"  className="py-2">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<ChevronRight size={16} />}
      >
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1

          return isLast ? (
            <Typography key={item.href} color="text.primary">
              {item.label}
            </Typography>
          ) : (
            <Link
              key={item.href}
              underline="hover"
              color="inherit"
              href={item.href}
            >
              {item.label}
            </Link>
          )
        })}
      </Breadcrumbs>
    </div>
  )
}
