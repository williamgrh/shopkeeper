export interface Champion {
  blurb: string;
  id: string;
  image: {
    full: string;
    group: string;
    h: number;
    sprite: string;
    w: number;
    x: number;
    y: number;
  };
  info: {
    attack: number;
    defense: number;
    difficulty: number;
    magic: number;
  };
  key: string;
  name: string;
  parttype: string;
  stats: {
    [key: string]: number; // TODO: type these fully?
  };
  tags: string[];
  title: string;
  version: string;
}

export interface Item {
  name: string;
  image: {
    full: string;
  };
  gold: {
    purchasable: boolean;
    total: number;
  };
  tags: string[];
  maps: {
    [mapId: string]: boolean;
  };
  hideFromAll: boolean;
  requiredChampion?: string;
  requiredAlly?: string;
}
