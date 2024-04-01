import { Inter } from "next/font/google";
import {Providers} from "src/app/provider";
import NextTopLoader from 'nextjs-toploader';

import Navigation from "./components/header/Navigation";
const inter = Inter({ subsets: ["latin"] });

import "./globals.css"

export const metadata = {
  title: {
    template: " %s | API Data Fetching with Next JS - @adityarizqiardhana",
    default: "API Data Fetching with Next JS - @adityarizqiardhana"
  },
  description: "API Data Fetching with Next JS by @adityarizqiardhana",
};

export default function RootLayout({ children }) {
  return (
    <html>
        <body className={inter.className}>
          <NextTopLoader />
          <Providers>
            <Navigation />
            <main className="max-w-screen-xl mx-auto sm:mt-10 mt-8">
                {children}
            </main>
            <footer className="max-w-screen-xl mx-auto text-center mt-10 py-8 xl:px-0 px-5 border-t border-solid border-gray-300/80">
            © { new Date().getFullYear() } Next Fetch App. All Rights Reserved.
            </footer>
          </Providers>
        </body>
    </html>
  );
}
