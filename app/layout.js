// app/layout.js
import "./globals.css";
import Footer from "./components/Footer";
import MetaTags from "./components/MetaTags";
import Navbar from "./components/Navbar";

/**
 * Root layout component that renders the main application structure.
 *
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Child components to be rendered inside the layout.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <MetaTags
          title="E-Commerce Site"
          description="Shop for the best products"
        />
      </head>
      <body>
        <Navbar />
        <div className="max-w-7xl mx-auto p-4">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
