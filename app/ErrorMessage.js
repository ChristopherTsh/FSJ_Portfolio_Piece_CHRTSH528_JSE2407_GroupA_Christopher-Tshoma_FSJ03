/**
 * Custom404 component displays a 404 error page with a playful animation
 * and a button to switch between light and dark themes. It includes a
 * "Back to home" link and a theme toggle button.
 *
 * @component
 * @example
 * return (
 *   <Custom404 />
 * )
 *
 * @returns {JSX.Element} The Custom 404 error page with theme switcher and navigation link.
 */
import { useEffect } from 'react';

export default function Custom404() {
  useEffect(() => {
    const colorSwitcher = document.querySelector("[data-theme-color-switch]");
    let currentTheme = "light";

    // Toggle between light and dark themes on button click
    colorSwitcher.addEventListener("click", function () {
      const root = document.documentElement;

      if (currentTheme === "dark") {
        root.style.setProperty("--bg-color", "#fff");
        root.style.setProperty("--text-color", "#000");
        colorSwitcher.textContent = "\u{1F319}"; // Moon icon
        currentTheme = "light";
      } else {
        root.style.setProperty("--bg-color", "#050505");
        root.style.setProperty("--text-color", "#fff");
        colorSwitcher.textContent = "\u{2600}"; // Sun icon
        currentTheme = "dark";
      }

      colorSwitcher.setAttribute("data-theme", currentTheme);
    });
  }, []);

  return (
    <main className="flex flex-col justify-center items-center h-screen bg-white text-black">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-black rounded-full animate-ping"></div>
        </div>
        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-black rounded-full animate-ping"></div>
        </div>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-yellow-400">Looks like you are lost</h1>
        <p className="text-xl font-light mt-4">404 error</p>
      </div>

      <a
        href="/"
        className="text-lg px-8 py-4 bg-transparent border border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-white transition duration-300"
      >
        Back to home
      </a>

      <button
        className="mt-10 text-3xl text-yellow-400 hover:text-yellow-500"
        data-theme-color-switch
        aria-label="Switch theme"
      >
        &#127769;
      </button>
    </main>
  );
}
