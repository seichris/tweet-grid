import { Inter } from "next/font/google";
import Head from 'next/head';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zeek Community",
  description: "Top Memes by the Zeek Community",
  imageUrl: '/zeek_screenshot.png',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.zeek.community/" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        {/* <meta property="og:image" content={metadata.imageUrl} /> */}

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.zeek.community/" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        {/* <meta name="twitter:image" content={metadata.imageUrl} /> */}

        <meta property="og:image" content={`https://www.zeek.community${metadata.imageUrl}`} />
        <meta name="twitter:image" content={`https://www.zeek.community${metadata.imageUrl}`} />

      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
