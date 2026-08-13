/**
 * Cinematic placeholder photography (Unsplash CDN).
 * Swap these for Kooka's own event library — the shape stays the same.
 */
const U = "https://images.unsplash.com";

export const media = {
  // Hero / atmosphere
  heroStage: `${U}/photo-1459749411175-04bf5292ceea`,
  heroCrowd: `${U}/photo-1470217957101-da7150b9b681`,
  heroLights: `${U}/photo-1501281668745-f7f57925c3b4`,

  // Live production
  stageRig: `${U}/photo-1540039155733-5bb30b53aa14`,
  ledWall: `${U}/photo-1516450360452-9312f5e86fc7`,
  concertCrowd: `${U}/photo-1514525253161-7a46d19cd819`,
  festival: `${U}/photo-1522158637959-30385a09e0da`,
  festivalNight: `${U}/photo-1506157786151-b8491531f063`,
  djBooth: `${U}/photo-1483393458019-411bc6bd104e`,
  djDeck: `${U}/photo-1533929736458-ca588d08c8be`,
  liveBand: `${U}/photo-1493225457124-a3eb161ffa5f`,
  touring: `${U}/photo-1470225620780-dba8ba36b745`,
  lightBeams: `${U}/photo-1502920917128-1aa500764cbd`,
  smokeStage: `${U}/photo-1508997449629-303059a039c0`,
  crowdHands: `${U}/photo-1533174072545-7a4b6ad7a6c3`,

  // Corporate
  conferenceStage: `${U}/photo-1531058020387-3be344556be6`,
  conferenceHall: `${U}/photo-1505236858219-8359eb29e329`,
  keynote: `${U}/photo-1475721027785-f74eccf877e2`,
  panelTalk: `${U}/photo-1517457373958-b7bdd4587205`,
  audience: `${U}/photo-1540575467063-178a50c2df87`,
  summit: `${U}/photo-1544928147-79a2dbc1f389`,
  speaker: `${U}/photo-1587825140708-dfaf72ae4b04`,
  boardroom: `${U}/photo-1600880292203-757bb62b4baf`,
  workspace: `${U}/photo-1497215728101-856f4ea42174`,
  expo: `${U}/photo-1511578314322-379afb476865`,

  // Celebrations
  weddingAisle: `${U}/photo-1519225421980-715cb0215aed`,
  weddingReception: `${U}/photo-1511285560929-80b456fea0bc`,
  weddingTable: `${U}/photo-1464366400600-7168b8af9bc3`,
  weddingCouple: `${U}/photo-1465495976277-4387d4b0b4c6`,
  galaDinner: `${U}/photo-1414235077428-338989a2e8c0`,
  confetti: `${U}/photo-1492684223066-81342ee5ff30`,
  partyLights: `${U}/photo-1519671482749-fd09be7ccebf`,
  partyFriends: `${U}/photo-1511795409834-ef04bbd61622`,
  balloons: `${U}/photo-1530103862676-de8c9debad1d`,
  celebration: `${U}/photo-1560439514-4e9645039924`,
  nightCrowd: `${U}/photo-1524368535928-5b5e00ddc76b`,

  // Technical
  audioDesk: `${U}/photo-1470019693664-1d202d2c0907`,
  mixingConsole: `${U}/photo-1598488035139-bdbb2231ce04`,
  soundSystem: `${U}/photo-1516280440614-37939bbacd81`,
  studioMonitor: `${U}/photo-1520523839897-bd0b52f945a0`,
  controlRoom: `${U}/photo-1478147427282-58a87a120781`,
  screenArray: `${U}/photo-1550745165-9bc0b252726f`,
  projection: `${U}/photo-1487180144351-b8472da7d491`,
  broadcast: `${U}/photo-1471039497385-b6d6ba609f9c`,

  // Venues & activations
  stadium: `${U}/photo-1461896836934-ffe607ba8211`,
  stadiumNight: `${U}/photo-1540747913346-19e32dc3e97e`,
  arena: `${U}/photo-1431324155629-1a6deb1dec8d`,
  sportCourt: `${U}/photo-1517649763962-0c623066013b`,
  sportArena: `${U}/photo-1552667466-07770ae110d0`,
  runway: `${U}/photo-1445205170230-053b83016050`,
  worship: `${U}/photo-1438032005730-c779502df39b`,
  community: `${U}/photo-1492691527719-9d1e07e534b4`,
} as const;

export type MediaKey = keyof typeof media;

/** Build a sized Unsplash URL. `next/image` still handles final optimization. */
export function img(src: string, width = 1600, quality = 80) {
  return `${src}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

/**
 * Showreel video slot. Drop the master file at `public/media/showreel.mp4`;
 * the player falls back to its poster frame until it exists.
 */
export const showreelVideo = {
  src: "/media/showreel.mp4",
  poster: media.heroStage,
} as const;
