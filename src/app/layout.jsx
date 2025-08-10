import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "World Damilare Day!",
  description: "A special birthday scrapbook site for Esho 🎉",
  icons: {
    icon: "/favicon.ico", // favicon in /public
  },
  openGraph: {
    title: "World Damilare Day!",
    description: "A special birthday scrapbook site for Esho 🎉",
    url: "https://birthday-scrapbook-six.vercel.app/", // replace with your actual domain
    siteName: "World Damilare Day!",
    images: [
      {
        url: "https://birthday-scrapbook-six.vercel.app/damilare.png", // absolute URL, 1200x630 recommended
        width: 1200,
        height: 630,
        alt: "World Damilare Day Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "World Damilare Day!",
    description: "A special birthday scrapbook site for Esho 🎉",
    images: ["https://birthday-scrapbook-six.vercel.app/damilare.png"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
