import Roadmap from "@/components/roadmap";

export default function RoadmapPage() {
  return (
    <div className="pt-20 bg-[#F4F6FB]">
      <div className="bg-[#0b0c12] px-6 pt-28 pb-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Roadmap</span>
          <h1 className="mt-3 font-heading text-5xl font-bold text-white md:text-6xl">Five phases.<br />One direction.</h1>
        </div>
      </div>
      <Roadmap />
    </div>
  );
}
