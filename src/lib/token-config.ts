// Single source of truth for RARE's live acquisition details, referenced
// by the homepage trust bar and the /get-rare page.
export const RARE_CONFIG = {
  contractAddress: "jX6565vyY3WJAVmwsXFNMVaxM9vQaD9SvbRGsD3pooL",
  // RARE has graduated to a DEX pool, so swaps route through Jupiter rather than Proof's bonding curve.
  graduated: true,
  proofUrl: "",
  jupiterUrl: "https://jup.ag/swap/SOL-jX6565vyY3WJAVmwsXFNMVaxM9vQaD9SvbRGsD3pooL",
  dexScreenerUrl: "https://dexscreener.com/solana/BzMFRS7NkpGC1V7t8T9crtT8kJMmxS2SLBZqvPdyaVRj",
};
