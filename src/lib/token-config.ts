// Single source of truth for RARE's live acquisition details, referenced
// by the homepage trust bar and the /get-rare page. Nothing below is real
// yet — fill these in once they're known, the UI treats an empty
// contractAddress as "not live yet" and hides the swap links accordingly.
export const RARE_CONFIG = {
  contractAddress: "",
  // Flip to true once the bonding curve graduates to a DEX pool.
  graduated: false,
  proofUrl: "",
  jupiterUrl: "",
};
