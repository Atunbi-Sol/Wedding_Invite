export default function DetailsCard() {
  const handleAddToCalendar = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding//EN",
      "BEGIN:VEVENT",
      "SUMMARY:Moroluwayosi & Damilare — Traditional Wedding",
      "LOCATION:Afen Adebayo Multipurpose Hall, Federal University of Technology, Akure (FUTA)",
      "DESCRIPTION:Traditional Wedding (Engagement Ceremony) of Moroluwayosi & Damilare.",
      "DTSTART:20261017T060000Z",
      "DTEND:20261017T090000Z",
      "END:VEVENT",
      "BEGIN:VEVENT",
      "SUMMARY:Moroluwayosi & Damilare — Church Wedding & Reception",
      "LOCATION:Afen Adebayo Multipurpose Hall, Federal University of Technology, Akure (FUTA)",
      "DESCRIPTION:Church Wedding Ceremony (Solemnization of Holy Matrimony) followed by Reception.",
      "DTSTART:20261017T100000Z",
      "DTEND:20261017T160000Z",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Moroluwayosi-and-Damilare-Wedding.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="rounded-2xl p-6 pb-6 mb-9"
      style={{
        background: "linear-gradient(180deg, #fffaf6, #fdf1f4)",
        border: "1px solid rgba(198, 161, 91, 0.4)",
        boxShadow: "0 20px 45px -20px rgba(71, 37, 54, 0.45)",
      }}
    >
      {/* Date block */}
      <div className="flex items-baseline justify-center gap-2.5 font-playfair text-plum mb-6">
        <span className="text-lg font-medium">October</span>
        <span className="text-[2.1rem] font-bold text-rose">
          17<sup className="text-[0.5em]">th</sup>
        </span>
        <span className="text-lg font-medium">2026</span>
      </div>

      {/* Grid of Events */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-1.5 my-6 text-center sm:divide-x sm:divide-gold/30">
        
        {/* Traditional Wedding */}
        <div className="flex flex-col items-center px-1">
          <div className="w-12 h-12 rounded-full bg-blush flex items-center justify-center mb-2.5 border border-gold/10 shadow-xs">
            {/* Abebe Fan Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gold">
              <path d="M12 14c4.418 0 8-3.582 8-8H4c0 4.418 3.582 8 8 8z" fill="currentColor" opacity="0.15" />
              <path d="M4 6c0 4.418 3.582 8 8 8s8-3.582 8-8M4 6h16M12 14v6M10 20h4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 6v8M8 6.5C8.5 9 10 11.5 12 14M16 6.5C15.5 9 14 11.5 12 14" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
            </svg>
          </div>
          <span className="font-marcellus text-[0.68rem] tracking-wider text-plum uppercase font-bold min-h-[28px] flex items-center justify-center">
            Traditional Wedding
          </span>
          <span className="font-playfair font-bold text-sm text-rose mt-1">
            7:00AM
          </span>
        </div>

        {/* Church Wedding */}
        <div className="flex flex-col items-center px-1 pt-4 sm:pt-0 border-t border-gold/20 sm:border-t-0">
          <div className="w-12 h-12 rounded-full bg-blush flex items-center justify-center mb-2.5 border border-gold/10 shadow-xs">
            {/* Church Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gold">
              <path d="M12 2v6M10 4h4M12 8l-8 6h16l-8-6z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 14v7h12v-7" strokeLinecap="round" />
              <path d="M10 21v-4a2 2 0 0 1 4 0v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-marcellus text-[0.68rem] tracking-wider text-plum uppercase font-bold min-h-[28px] flex items-center justify-center">
            Church Wedding
          </span>
          <span className="font-playfair font-bold text-sm text-rose mt-1">
            11:00AM
          </span>
        </div>

        {/* Reception */}
        <div className="flex flex-col items-center px-1 pt-4 sm:pt-0 border-t border-gold/20 sm:border-t-0">
          <div className="w-12 h-12 rounded-full bg-blush flex items-center justify-center mb-2.5 border border-gold/10 shadow-xs">
            {/* Champagne Glasses Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gold">
              <path d="M9 13.5c-1-1-1.5-3-1.5-5h5c0 2-.5 4-1.5 5M9 13.5v5m0 0H7m2 0h2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 13.5c1-1 1.5-3 1.5-5h-5c0 2 .5 4 1.5 5M15 13.5v5m0 0h-2m2 0h2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 4v2M10 5.5l1.5 1.5M14 5.5L12.5 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-marcellus text-[0.68rem] tracking-wider text-plum uppercase font-bold min-h-[28px] flex items-center justify-center">
            Reception
          </span>
          <span className="font-playfair italic text-xs text-rose mt-1 leading-tight">
            follows<br />immediately
          </span>
        </div>

        {/* Venue */}
        <div className="flex flex-col items-center px-1 pt-4 sm:pt-0 border-t border-gold/20 sm:border-t-0">
          <div className="w-12 h-12 rounded-full bg-blush flex items-center justify-center mb-2.5 border border-gold/10 shadow-xs">
            {/* Map Pin Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gold">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-marcellus text-[0.68rem] tracking-wider text-plum uppercase font-bold min-h-[28px] flex items-center justify-center">
            Venue
          </span>
          <span className="font-playfair text-[0.72rem] text-rose mt-1 leading-normal max-w-[125px] sm:max-w-none">
            Afen Adebayo Multipurpose Hall, FUTA, Akure
          </span>
        </div>

      </div>

      {/* Decorative line with heart */}
      <div className="relative flex items-center justify-center my-6">
        <div className="w-full border-t border-gold/30 absolute"></div>
        <div className="relative bg-[#fdf5f5] px-3 text-gold text-sm select-none">♥</div>
      </div>

      {/* Add to calendar */}
      <div className="mt-4">
        <button
          onClick={handleAddToCalendar}
          id="calendar-btn"
          className="font-marcellus tracking-[0.12em] uppercase text-[0.72rem] bg-transparent border border-rose-gold text-rose-gold py-2.5 px-5 rounded-full cursor-pointer transition-all duration-300 hover:bg-rose-gold hover:text-cream focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
        >
          Add to calendar
        </button>
      </div>
    </div>
  );
}

