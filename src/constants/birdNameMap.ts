export const birdNameMap: Record<string, string> = {
  뱁새: "baepsae",
  벌새: "hummingbird",
  앵무새: "parrot",
  올빼미: "owl",
  카나리아: "canary",
  파랑새: "bluebird",
  익명새: "default",
};

export type BirdNameKr = keyof typeof birdNameMap;
export type BirdNameEn = (typeof birdNameMap)[BirdNameKr];
