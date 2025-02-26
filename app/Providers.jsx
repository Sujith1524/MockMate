import { ThemeProvider } from 'next-themes'
import React from 'react'

const providers = ({ children }) => {
    return (
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
            {children}
        </ThemeProvider>
    )
}

export default providers