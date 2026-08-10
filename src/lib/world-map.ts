// Dotted world map data — background dots plus community hub pins and their connections
import DottedMap from "dotted-map";

type Hub = { name: string; lat: number; lng: number };

const HUBS: Hub[] = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "São Paulo", lat: -23.5505, lng: -46.6333 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Lagos", lat: 6.5244, lng: 3.3792 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Manila", lat: 14.5995, lng: 120.9842 },
  { name: "Seoul", lat: 37.5665, lng: 126.978 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
];

const CONNECTIONS: [string, string][] = [
  ["New York", "London"],
  ["London", "Lagos"],
  ["Lagos", "Dubai"],
  ["Dubai", "Mumbai"],
  ["Mumbai", "Singapore"],
  ["Singapore", "Manila"],
  ["Manila", "Seoul"],
  ["Seoul", "Sydney"],
  ["Sydney", "Singapore"],
  ["New York", "São Paulo"],
  ["São Paulo", "Lagos"],
];

// Quadratic-bezier arc between two points, always bulging toward the top
// of the map so connections read as consistent "flight paths".
function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;

  const perpA = { x: -dy / dist, y: dx / dist };
  const perpB = { x: dy / dist, y: -dx / dist };
  const perp = perpA.y < perpB.y ? perpA : perpB;

  const bend = dist * 0.18;
  const cx = mx + perp.x * bend;
  const cy = my + perp.y * bend;

  return `M ${a.x},${a.y} Q ${cx},${cy} ${b.x},${b.y}`;
}

export function getWorldMapData() {
  const map = new DottedMap({ width: 120, grid: "diagonal" });
  const dots = map.getPoints();

  const pins = new Map(
    HUBS.map((hub) => [
      hub.name,
      { ...map.addPin({ lat: hub.lat, lng: hub.lng, data: hub })!, name: hub.name },
    ]),
  );

  const connections = CONNECTIONS.map(([from, to]) => {
    const a = pins.get(from)!;
    const b = pins.get(to)!;
    return { d: arcPath(a, b) };
  });

  return {
    width: map.image.width,
    height: map.image.height,
    dots,
    hubs: Array.from(pins.values()),
    connections,
  };
}
