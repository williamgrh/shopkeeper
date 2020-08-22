export type ChampionStatisticType =
  | ChampionFlatStatisticType
  | ChampionGrowthStatisticTypes
  | ChampionGrowthStatisticRateTypes;

export enum ChampionFlatStatisticType {
  MoveSpeed = "movespeed",
  AttackRange = "attackrange",
}

export enum ChampionGrowthStatisticTypes {
  HealthPoints = "hp",
  ManaPoints = "mp",
  Armor = "armor",
  MagicResist = "spellblock",
  HealthPointsRegen = "hpregen",
  ManaPointsRegen = "mpregen",
  CriticalStrike = "crit",
  AttackDamage = "attackdamage",
  AttackSpeed = "attackspeed",
}

export enum ChampionGrowthStatisticRateTypes {
  HealthPointsPerLevel = "hpperlevel",
  ManaPointsPerLevel = "mpperlevel",
  ArmorPerLevel = "armorperlevel",
  MagicResistPerLevel = "spellblockperlevel",
  HealthPointsRegenPerLevel = "hpregenperlevel",
  ManaPointsRegenPerLevel = "mpregenperlevel",
  CriticalStrikePerLevel = "critperlevel",
  AttackDamagePerLevel = "attackdamageperlevel",
  AttackSpeedPerLevel = "attackspeedperlevel",
}

export enum ItemStatistic {
  FlatHPPoolMod = "FlatHPPoolMod",
  rFlatHPModPerLevel = "rFlatHPModPerLevel",
  FlatMPPoolMod = "FlatMPPoolMod",
  rFlatMPModPerLevel = "rFlatMPModPerLevel",
  PercentHPPoolMod = "PercentHPPoolMod",
  PercentMPPoolMod = "PercentMPPoolMod",
  FlatHPRegenMod = "FlatHPRegenMod",
  rFlatHPRegenModPerLevel = "rFlatHPRegenModPerLevel",
  PercentHPRegenMod = "PercentHPRegenMod",
  FlatMPRegenMod = "FlatMPRegenMod",
  rFlatMPRegenModPerLevel = "rFlatMPRegenModPerLevel",
  PercentMPRegenMod = "PercentMPRegenMod",
  FlatArmorMod = "FlatArmorMod",
  rFlatArmorModPerLevel = "rFlatArmorModPerLevel",
  PercentArmorMod = "PercentArmorMod",
  rFlatArmorPenetrationMod = "rFlatArmorPenetrationMod",
  rFlatArmorPenetrationModPerLevel = "rFlatArmorPenetrationModPerLevel",
  rPercentArmorPenetrationMod = "rPercentArmorPenetrationMod",
  rPercentArmorPenetrationModPerLevel = "rPercentArmorPenetrationModPerLevel",
  FlatPhysicalDamageMod = "FlatPhysicalDamageMod",
  rFlatPhysicalDamageModPerLevel = "rFlatPhysicalDamageModPerLevel",
  PercentPhysicalDamageMod = "PercentPhysicalDamageMod",
  FlatMagicDamageMod = "FlatMagicDamageMod",
  rFlatMagicDamageModPerLevel = "rFlatMagicDamageModPerLevel",
  PercentMagicDamageMod = "PercentMagicDamageMod",
  FlatMovementSpeedMod = "FlatMovementSpeedMod",
  rFlatMovementSpeedModPerLevel = "rFlatMovementSpeedModPerLevel",
  PercentMovementSpeedMod = "PercentMovementSpeedMod",
  rPercentMovementSpeedModPerLevel = "rPercentMovementSpeedModPerLevel",
  FlatAttackSpeedMod = "FlatAttackSpeedMod",
  PercentAttackSpeedMod = "PercentAttackSpeedMod",
  rPercentAttackSpeedModPerLevel = "rPercentAttackSpeedModPerLevel",
  rFlatDodgeMod = "rFlatDodgeMod",
  rFlatDodgeModPerLevel = "rFlatDodgeModPerLevel",
  PercentDodgeMod = "PercentDodgeMod",
  FlatCritChanceMod = "FlatCritChanceMod",
  rFlatCritChanceModPerLevel = "rFlatCritChanceModPerLevel",
  PercentCritChanceMod = "PercentCritChanceMod",
  FlatCritDamageMod = "FlatCritDamageMod",
  rFlatCritDamageModPerLevel = "rFlatCritDamageModPerLevel",
  PercentCritDamageMod = "PercentCritDamageMod",
  FlatBlockMod = "FlatBlockMod",
  PercentBlockMod = "PercentBlockMod",
  FlatSpellBlockMod = "FlatSpellBlockMod",
  rFlatSpellBlockModPerLevel = "rFlatSpellBlockModPerLevel",
  PercentSpellBlockMod = "PercentSpellBlockMod",
  FlatEXPBonus = "FlatEXPBonus",
  PercentEXPBonus = "PercentEXPBonus",
  rPercentCooldownMod = "rPercentCooldownMod",
  rPercentCooldownModPerLevel = "rPercentCooldownModPerLevel",
  rFlatTimeDeadMod = "rFlatTimeDeadMod",
  rFlatTimeDeadModPerLevel = "rFlatTimeDeadModPerLevel",
  rPercentTimeDeadMod = "rPercentTimeDeadMod",
  rPercentTimeDeadModPerLevel = "rPercentTimeDeadModPerLevel",
  rFlatGoldPer10Mod = "rFlatGoldPer10Mod",
  rFlatMagicPenetrationMod = "rFlatMagicPenetrationMod",
  rFlatMagicPenetrationModPerLevel = "rFlatMagicPenetrationModPerLevel",
  rPercentMagicPenetrationMod = "rPercentMagicPenetrationMod",
  rPercentMagicPenetrationModPerLevel = "rPercentMagicPenetrationModPerLevel",
  FlatEnergyRegenMod = "FlatEnergyRegenMod",
  rFlatEnergyRegenModPerLevel = "rFlatEnergyRegenModPerLevel",
  FlatEnergyPoolMod = "FlatEnergyPoolMod",
  rFlatEnergyModPerLevel = "rFlatEnergyModPerLevel",
  PercentLifeStealMod = "PercentLifeStealMod",
  PercentSpellVampMo = "PercentSpellVampMod",
}

export type ChampionStatistics = { [key in ChampionStatisticType]: number };

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
  stats: ChampionStatistics;
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
  consumed?: boolean;
  stats: { [key in ItemStatistic]: number };
}
