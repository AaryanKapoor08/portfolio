// Fortnite item rarities, mapped to the .rarity-* CSS classes in index.css.
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

export const rarityClass = (r: Rarity) => `rarity-${r}`;
