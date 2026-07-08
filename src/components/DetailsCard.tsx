export default function DetailsCard() {
  const handleAddToCalendar = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding//EN",
      "BEGIN:VEVENT",
      "SUMMARY:Moroluwayosi & Damilare — Engagement Ceremony",
      "LOCATION:Afen Adebayo Multipurpose Hall, Federal University of Technology, Akure (FUTA)",
      "DESCRIPTION:Engagement ceremony of Moroluwayosi & Damilare.",
      "DTSTART:20261017T070000Z",
      "DTEND:20261017T100000Z",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Moroluwayosi-and-Damilare-Engagement.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="rounded-2xl p-7 pb-6 mb-9"
      style={{
        background: "linear-gradient(180deg, #fffaf6, #fdf1f4)",
        border: "1px solid rgba(198, 161, 91, 0.4)",
        boxShadow: "0 20px 45px -20px rgba(71, 37, 54, 0.45)",
      }}
    >
      {/* Date block */}
      <div className="flex items-baseline justify-center gap-2.5 font-playfair text-plum mb-4">
        <span className="text-lg font-medium">October</span>
        <span className="text-[2.1rem] font-bold text-rose">
          17<sup className="text-[0.5em]">th</sup>
        </span>
        <span className="text-lg font-medium">2026</span>
      </div>

      {/* Ceremony pill */}
      <div
        className="inline-block text-cream px-6 py-2.5 rounded-full font-marcellus tracking-wider text-[0.85rem] uppercase mb-4"
        style={{
          background: "linear-gradient(135deg, #e3cd9a, #c6a15b)",
        }}
      >
        Engagement Ceremony
        <strong className="block font-playfair text-xl tracking-normal mt-0.5 normal-case">
          7:00 AM
        </strong>
      </div>

      {/* Venue */}
      <div className="mb-5">
        <p className="text-[0.95rem] text-ink/75 m-0 font-bold">
          Afen Adebayo
        </p>
        <p className="font-playfair font-bold text-xl text-plum uppercase tracking-wide m-0 mb-1">
          Multipurpose Hall
        </p>
        <p className="text-[0.95rem] text-ink/75 m-0">
          Federal University of Technology, Akure (FUTA)
        </p>
      </div>

      {/* Add to calendar */}
      <button
        onClick={handleAddToCalendar}
        id="calendar-btn"
        className="font-marcellus tracking-[0.12em] uppercase text-[0.72rem] bg-transparent border border-rose-gold text-rose-gold py-2.5 px-5 rounded-full cursor-pointer transition-all duration-300 hover:bg-rose-gold hover:text-cream focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2"
      >
        Add to calendar
      </button>
    </div>
  );
}
