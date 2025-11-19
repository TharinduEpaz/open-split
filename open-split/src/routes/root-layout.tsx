import type React from 'react'
import Box from '@mui/material/Box'

export function HomeContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        id="mesh-gradient"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter
            id="blur"
            filterUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1000"
            height="500"
          >
            <feGaussianBlur stdDeviation="189" />
          </filter>
          <filter id="noise" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1"
              numOctaves={3}
              result="turbulence"
              stitchTiles="stitch"
            />
            <feBlend in="SourceGraphic" in2="turbulence" mode="overlay" />
          </filter>
        </defs>
        <rect id="background" width="100%" height="100%" fill="#FFFFFF" />
        <g id="swatches" width="1000" height="500" filter="url(#blur)">
          <rect x="-96" y="-203" width="952" height="986" fill="#F7AC68" />
          <rect x="-130" y="-156" width="960" height="512" fill="#ECE6CE" />
          <rect x="-98" y="238" width="336" height="384" fill="#ED6B5A" />
          <rect x="725" y="-171" width="450" height="522" fill="#3B3E5A" />
        </g>
        <rect
          x="0"
          y="0"
          width="1000"
          height="500"
          style={{
            mixBlendMode: 'soft-light',
            filter: 'url(#noise)',
            opacity: '20%',
          }}
        ></rect>
      </Box>
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
    </Box>
  )
}
