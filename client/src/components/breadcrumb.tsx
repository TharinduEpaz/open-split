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
const breadcrumbMap: Record<string, Array<BreadcrumbItem>> = {
  '/': [],
  '/create-split': [
    { label: 'Home', href: '/' },
    { label: 'Create Split', href: '/create-split' },
  ],
  '/my-splits': [
    { label: 'Home', href: '/' },
    { label: 'My Splits', href: '/my-splits' },
  ],
}

// Helper function to generate breadcrumbs for dynamic routes
const getBreadcrumbs = (pathname: string): Array<BreadcrumbItem> => {
  // Check if it's a split details page
  if (pathname.startsWith('/my-splits/') && pathname !== '/my-splits') {
    return [
      { label: 'Home', href: '/' },
      { label: 'My Splits', href: '/my-splits' },
      { label: 'Split Details', href: pathname },
    ]
  }

  return breadcrumbMap[pathname] || []
}

export default function BasicBreadcrumbs() {
  const location = useLocation()
  const breadcrumbs = getBreadcrumbs(location.pathname)
  return (
    <div role="presentation" className="py-2 mb-6">
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
