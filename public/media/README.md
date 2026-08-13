# Media slot

Drop the master showreel here as `showreel.mp4` (H.264 MP4, 1080p or 4K).

`components/sections/showreel/ReelPlayer.tsx` reads the path from
`data/media.ts` (`showreelVideo.src`) and falls back to its poster frame while
the file is absent.
