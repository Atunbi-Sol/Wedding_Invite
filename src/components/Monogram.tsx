interface MonogramProps {
  small?: boolean;
}

export default function Monogram({ small = false }: MonogramProps) {
  const sizeClasses = small
    ? "w-16 h-16 text-xl mt-2"
    : "w-[110px] h-[110px] text-[2.4rem] mb-3.5";

  return (
    <div
      className={`font-playfair font-semibold text-plum border-[1.5px] border-gold rounded-full flex items-center justify-center mx-auto ${sizeClasses}`}
      style={{
        background: "radial-gradient(circle, #fffaf5, #fbeef2)",
        boxShadow: "0 20px 45px -20px rgba(71, 37, 54, 0.45)",
      }}
    >
      M<span className="text-[0.8em] px-0.5 text-[#ffe4ea]">♥</span>D
    </div>
  );
}
