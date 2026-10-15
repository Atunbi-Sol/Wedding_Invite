export default function TransitGuide() {
  const routes = [
    {
      number: "ROUTE 1",
      title: "From Ore / Ondo Route",
      path: "Ondo Park → Cathedral → FUTA North Gate",
      instruction:
        "From the last bus stop, Ondo Park, take a bus or keke to Cathedral. From Cathedral, take a taxi to FUTA North Gate; when you get to the gate, enter and ask for Afen Adebayo Multipurpose Hall.",
    },
    {
      number: "ROUTE 2",
      title: "From Ibadan Route",
      path: "Ibadan Expressway → FUTA North Gate",
      instruction:
        "Stop at FUTA North Gate, enter and ask for Afen Adebayo Multipurpose Hall.",
    },
  ];

  return (
    <div
      className="rounded-2xl p-4 sm:p-5 text-left transition-all duration-300"
      style={{
        background: "linear-gradient(180deg, #fdf8f2 0%, #faf1e4 100%)",
        border: "1px solid rgba(198, 161, 91, 0.35)",
        boxShadow: "0 14px 35px -15px rgba(71, 37, 54, 0.15)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-gold/40 shadow-xs bg-gradient-to-b from-[#fffefc] to-[#f5e6d3]">
          {/* Compass Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="12,5.5 14.5,12 12,10.5 9.5,12" fill="#c97b94" stroke="none" />
            <polygon points="12,18.5 14.5,12 12,13.5 9.5,12" fill="#c6a15b" stroke="none" />
            <circle cx="12" cy="12" r="1.5" fill="#472536" />
          </svg>
        </div>

        <div>
          <h3 className="font-playfair font-bold text-lg sm:text-[1.2rem] text-plum m-0 leading-tight">
            Travel &amp; Transit Guide
          </h3>
          <p className="font-marcellus uppercase tracking-[0.16em] text-[0.62rem] sm:text-[0.68rem] text-gold font-semibold m-0 mt-0.5">
            DIRECTIONS TO AFEN ADEBAYO MULTIPURPOSE HALL (FUTA, AKURE)
          </p>
        </div>
      </div>

      {/* Routes List */}
      <div className="flex flex-col gap-3">
        {routes.map((route) => (
          <div
            key={route.number}
            className="rounded-xl p-3.5 sm:p-4 bg-white/90 border border-gold/20 shadow-xs"
          >
            {/* Route title and badge */}
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-playfair font-bold text-base sm:text-[1.05rem] text-plum m-0">
                {route.title}
              </h4>
              <span className="font-marcellus font-bold text-[0.62rem] tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-[#faeedd] text-[#a06d34] border border-[#ecdac3] shrink-0">
                {route.number}
              </span>
            </div>

            {/* Path summary */}
            <p className="font-cormorant text-[0.96rem] font-medium text-plum/85 m-0 mt-2 leading-snug">
              {route.path}
            </p>

            {/* Turn-by-turn detail */}
            <div className="flex items-start gap-2 mt-2 text-[#73515f] font-cormorant text-[0.92rem] leading-relaxed">
              <span className="text-gold font-bold text-sm leading-none shrink-0 mt-1 select-none">
                ↳
              </span>
              <span>{route.instruction}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
