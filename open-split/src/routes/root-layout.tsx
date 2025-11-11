import type React from "react"
import Box from "@mui/material/Box"

export function HomeContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        position: "relative",
        backgroundColor: "#1a1a2e",
        background: `
          radial-gradient(at 20% 50%, hsla(250, 80%, 60%, 0.3) 0px, transparent 50%),
          radial-gradient(at 80% 20%, hsla(280, 85%, 55%, 0.25) 0px, transparent 50%),
          radial-gradient(at 40% 80%, hsla(320, 90%, 65%, 0.2) 0px, transparent 50%),
          radial-gradient(at 90% 70%, hsla(200, 75%, 50%, 0.2) 0px, transparent 50%),
          radial-gradient(at 50% 50%, hsla(270, 80%, 45%, 0.15) 0px, transparent 50%),
          #1a1a2e
        `,
      }}
    >
      {children}
    </Box>
  )
}
