const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=86`

export const demoMedia = {
  hero: [
    unsplash('photo-1497366811353-6870744d04b2', 2200),
    unsplash('photo-1497366754035-f200968a6e72', 2200),
    unsplash('photo-1497366216548-37526070297c', 2200),
  ],
  executive: unsplash('photo-1524758631624-e2822e304c36'),
  staff: unsplash('photo-1497366216548-37526070297c'),
  meeting: unsplash('photo-1572025442646-866d16c84a54'),
  reception: unsplash('photo-1497366754035-f200968a6e72'),
  chairs: unsplash('photo-1505843490538-5133c6c7d0e1'),
  waiting: unsplash('photo-1555041469-a586c61ea9bc'),
  kitchen: unsplash('photo-1556912167-f556f1f39fdf'),
  acoustic: unsplash('photo-1598928506311-c55ded91a20c'),
  storage: unsplash('photo-1595515106969-1ce29566ff1c'),
  adjustable: unsplash('photo-1518455027359-f3f8164ba6bd'),
  metal: unsplash('photo-1538688423619-a81d3f23454b'),
  project: unsplash('photo-1497366754035-f200968a6e72'),
  detail: [
    unsplash('photo-1518455027359-f3f8164ba6bd'),
    unsplash('photo-1497366216548-37526070297c'),
    unsplash('photo-1497366754035-f200968a6e72'),
  ],
} as const
