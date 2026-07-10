export default function DressCode() {
  return (
    <div className="mb-10 text-center">
      <p className="font-marcellus uppercase tracking-[0.25em] text-[0.78rem] text-rose-gold mb-5 relative">
        <span className="inline-block w-[26px] h-px bg-gold align-middle mr-2.5" />
        Dress Codes
        <span className="inline-block w-[26px] h-px bg-gold align-middle ml-2.5" />
      </p>

      <div className="flex items-center justify-center gap-6 sm:gap-7">
        {/* Group 1 */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex gap-2.5">
            <Swatch color="#fdfaf6" border="#e7d9c9" />
            <Swatch color="#722f37" />
          </div>
          <div className="flex gap-4 text-[0.78rem] text-ink/75">
            <span>White</span>
            <span>Wine</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-16 bg-gold/40" />

        {/* Group 2 */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex gap-2.5">
            <Swatch color="#5b3a2e" />
            <Swatch color="#c9a45a" />
          </div>
          <div className="flex gap-4 text-[0.78rem] text-ink/75">
            <span>Brown</span>
            <span>Gold</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Swatch({
  color,
  border,
}: {
  color: string;
  border?: string;
}) {
  return (
    <div
      className="w-9 h-9 rounded-full"
      style={{
        background: color,
        border: border ? `1px solid ${border}` : "none",
        boxShadow:
          "0 4px 10px rgba(71, 37, 54, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
      }}
    />
  );
}
