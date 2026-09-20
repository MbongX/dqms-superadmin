import type { Metadata } from "next";
import "./globals.css"
export const metadata: Metadata = { 
    title: "DQMS Super Admin", 
    description: "DQMS platform administration demo" 
};

export default function RootLayout({children}:{children:React.ReactNode}){
    return <html lang="en"><body>{children}</body></html>}