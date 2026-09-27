export enum Currency {
  USD = 'usd',
  AUD = 'aud',
  CAD = 'cad',
}

export enum Rarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

// Estimated complexity levels for ticket points
export enum REWARD_POINT_VALUES {
  ONE_POINT = 1,
  TWO_POINTS = 4,
  THREE_POINTS = 8,
  FIVE_POINTS = 16,
  NINE_POINTS = 45,
  EIGHTEEN_POINTS = 95,
  EIGHTY_ONE_POINTS = Infinity,
}

// Ticket point options
export enum REWARD_POINT_OPTIONS {
  ONE_POINT = 1,
  TWO_POINTS = 2,
  THREE_POINTS = 3,
  FIVE_POINTS = 5,
  NINE_POINTS = 9,
  EIGHTEEN_POINTS = 18,
  EIGHTY_ONE_POINTS = 81,
}

// List of ticket point options
export const REWARD_POINT_OPTIONS_LIST = [
  REWARD_POINT_OPTIONS.ONE_POINT,
  REWARD_POINT_OPTIONS.TWO_POINTS,
  REWARD_POINT_OPTIONS.THREE_POINTS,
  REWARD_POINT_OPTIONS.FIVE_POINTS,
  REWARD_POINT_OPTIONS.NINE_POINTS,
  REWARD_POINT_OPTIONS.EIGHTEEN_POINTS,
  REWARD_POINT_OPTIONS.EIGHTY_ONE_POINTS,
];

export interface RewardInterface {
  id?: string;
  // userId?: string;
  quantity?: number;
  category: string;
  variant: string | { type: string; value: string };
  description?: string;
  name?: string;
  cost?: number;
  maxPurchaseQuantity: number;
}
