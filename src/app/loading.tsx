export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-5 bg-[#F4F6FB] px-6 py-24">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-[#0b0c12]/8 border-t-[#0f3f93]" />
        <img src="/rarecoin.svg" alt="" className="h-6 w-auto animate-pulse" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#0b0c12]/35">
        Loading Rarecoin…
      </p>
    </div>
  );
}
