export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-5 bg-[#08090D] px-6 py-24">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-white/8 border-t-[#D4AF37]" />
        <img src="/rare-3.png" alt="" className="h-6 w-auto animate-pulse" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-white/30">
        Loading Rarecoin…
      </p>
    </div>
  );
}
