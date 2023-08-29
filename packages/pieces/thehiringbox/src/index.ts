
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";

export const thehiringbox = createPiece({
  displayName: "Thehiringbox",
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.8.0',
  logoUrl: "https://cdn.activepieces.com/pieces/thehiringbox.png",
  authors: [],
  actions: [],
  triggers: [],
});
