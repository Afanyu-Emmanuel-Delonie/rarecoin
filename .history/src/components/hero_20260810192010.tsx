// Home hero — headline/CTAs on top, dotted world map beneath
import CtaButton from "./cta-button";

function DottedWorldMap() {
  return (
    <svg
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full text-rare-secondary"
      aria-hidden="true"
    >
      <defs>
        <pattern id="map-dots" width="13" height="13" patternUnits="userSpaceOnUse">
          <circle cx="1.6" cy="1.6" r="1.6" fill="currentColor" />
        </pattern>
        <clipPath id="map-continents">
          <path d="M120,45 L220,55 L260,90 L275,130 L250,175 L220,215 L170,230 L140,205 L100,215 L60,180 L45,130 L55,90 L90,55 Z" />
          <path d="M230,240 L280,235 L305,270 L310,320 L295,370 L270,420 L245,430 L220,400 L210,340 L215,290 Z" />
          <path d="M440,60 L480,55 L515,70 L525,100 L510,130 L480,150 L450,140 L430,110 L435,80 Z" />
          <path d="M450,155 L500,150 L540,175 L555,220 L545,270 L555,320 L520,375 L480,385 L455,340 L440,280 L445,220 L430,180 Z" />
          <path d="M540,90 L600,50 L680,40 L760,55 L830,70 L875,110 L860,150 L820,180 L780,220 L720,250 L660,260 L600,230 L560,190 L535,140 Z" />
          <path d="M780,330 L840,320 L880,340 L895,375 L870,405 L820,410 L785,390 L770,360 Z" />
        </clipPath>
        <linearGradient id="map-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="45%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="map-fade-mask">
          <rect width="1000" height="500" fill="url(#map-fade)" />
        </mask>
      </defs>
      <g clipPath="url(#map-continents)" mask="url(#map-fade-mask)">
        <rect width="1000" height="500" fill="url(#map-dots)" />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 pt-28 pb-16 text-center md:pt-36">
        <span className="rounded-full border border-rare-ink/10 bg-rare-secondary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-rare-primary">
          Fair Launch · Solana · 1,000,000,000 RARE
        </span>

        <h1 className="font-heading text-5xl font-bold tracking-tight text-rare-ink md:text-7xl">
          Own the Rare. Shape the Future.
        </h1>

        <p className="max-w-2xl text-lg text-rare-ink/70">
          Rarecoin is a fixed-supply, fair-launch token — no presale, no team
          allocation, no hidden supply. 100% public from the first trade.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <CtaButton href="/docs">Read the White Paper</CtaButton>
          <CtaButton href="/tokenomics" variant="secondary">
            View Tokenomics
          </CtaButton>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 opacity-70 md:h-96">
        <DottedWorldMap />
      </div>
    </section>
  );
}
