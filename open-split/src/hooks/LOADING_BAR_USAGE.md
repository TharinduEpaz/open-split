# Top Loading Bar Usage

The top loading bar can be controlled from anywhere in your application using the `useLoadingBar` hook.

## Basic Usage

```typescript
import { useLoadingBar } from '@/hooks/use-loading-bar'

function MyComponent() {
  const { start, complete, reset, setProgress } = useLoadingBar()

  const handleAsyncOperation = async () => {
    start() // Start the loading bar
    
    try {
      // Your async operation
      await fetchData()
    } finally {
      complete() // Complete the loading bar
    }
  }

  return <button onClick={handleAsyncOperation}>Load Data</button>
}
```

## Available Methods

- **`start()`** - Starts the loading bar with continuous animation
- **`complete()`** - Completes the loading bar (animates to 100% and fades out)
- **`reset()`** - Resets the loading bar to 0%
- **`setProgress(progress: number)`** - Sets a specific progress value (0-100)

## Examples

### With Form Submission
```typescript
const { start, complete } = useLoadingBar()

const handleSubmit = async (data) => {
  start()
  try {
    await submitForm(data)
  } finally {
    complete()
  }
}
```

### With API Calls
```typescript
const { start, complete } = useLoadingBar()

useEffect(() => {
  const fetchData = async () => {
    start()
    try {
      const response = await fetch('/api/data')
      const data = await response.json()
      // Handle data
    } finally {
      complete()
    }
  }
  fetchData()
}, [])
```

### With Navigation
```typescript
const { start, complete } = useLoadingBar()
const navigate = useNavigate()

const handleNavigation = async () => {
  start()
  try {
    await navigate({ to: '/new-page' })
  } finally {
    complete()
  }
}
```

## Configuration

The loading bar is configured in `src/components/loading-bar.tsx`:
- Color: `#ed6b5a` (theme secondary color)
- Height: `3px`
- Shadow: `true`
- Waiting time: `400ms`
- Transition time: `200ms`

You can modify these values in the `TopLoadingBar` component.

