/**
 * Loader component that displays a loading animation with rotating sections
 * and spinning letters to simulate a loading state. It uses Tailwind CSS for
 * styling.
 *
 * @component
 * @example
 * return (
 *   <Loader />
 * )
 *
 * @returns {JSX.Element} The Loader component with rotating sections and letters.
 */
export default function Loading() {
  // Array to create 45 sections for the animation
  const sections = Array.from({ length: 45 });

  // Array of letters to display in the spinning animation
  const letters = ["G", "N", "I", "D", "A", "O", "L"];

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#321232]">
      <div className="relative flex items-center justify-center w-24 h-24 rounded-full">
        {/* Animated Sections */}
        {sections.map((_, index) => (
          <div
            key={index}
            className="absolute w-[5px] h-[10px] bg-white bg-opacity-[0.075] rounded"
            style={{
              transform: `rotate(${8 * index}deg) translateY(-45px)`,
              animation: `rotate 2.5s ease infinite`,
              animationDelay: `${0.055 * index}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Spinning Letters */}
      <div className="absolute flex items-center justify-center h-[75px] animate-rotate">
        {letters.map((letter, idx) => (
          <p
            key={idx}
            className="absolute text-white text-2xl font-bebas"
            style={{
              transform: `rotate(${-360 / 7 * idx}deg) translateY(-65px)`,
            }}
          >
            {letter}
          </p>
        ))}
      </div>
    </div>
  );
}
