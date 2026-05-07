import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://personal-website-blog2.vercel.app'),
  title: {
    default: "Vector",
    template: "%s | Vector",
  },
  description: "A clean, modern space for ideas, stories, and connections.",
  openGraph: {
    siteName: "Vector",
    title: "Vector",
    description: "A clean, modern space for ideas, stories, and connections.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vector",
    description: "A clean, modern space for ideas, stories, and connections.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}})()`
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
