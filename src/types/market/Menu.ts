export interface CreateMenu {
  name: string;
  category: string;
  difficulty: 'easy' | 'normal' | 'hard';
}

export interface Menu {
  id: string;
  time: Date;
  name: string;
  category: string;
  difficulty: 'easy' | 'normal' | 'hard';
}

export interface ScheduledMenu {
  date: string;
  name: string;
  category: string;
  difficulty: 'easy' | 'normal' | 'hard';
}

export interface WeeklyMenu {
  menus: Map<string, ScheduledMenu>;
}

export const menuToSchedle = (menu: Menu, date: string): ScheduledMenu => {
  return {
    date,
    name: menu.name,
    category: menu.category,
    difficulty: menu.difficulty,
  };
};

export const difficultyOrder: Record<Menu['difficulty'], number> = {
  easy: 0,
  normal: 1,
  hard: 2,
};

const CATEGORY_COLORS: Record<string, string> = {
  和食: '#4caf50',
  洋食: '#2196f3',
  中華: '#f44336',
  麺: '#ff9800',
  粉もん: '#9c27b0',
  夏: '#00bcd4',
  冬: '#795548',
  その他: '#9e9e9e',
};

export const categoryOrder: Record<string, number> = {
  和食: 0,
  洋食: 1,
  中華: 2,
  麺: 3,
  粉もん: 4,
  夏: 5,
  冬: 6,
  その他: 7,
};

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;

  if (d !== 0) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

  return { h, s: s * 100, l: l * 100 };
}

const stringToHue = (input: string): number => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 360;
};

const getCategoryHue = (category: string): number => {
  if (category in CATEGORY_COLORS) {
    const { h } = hexToHsl(CATEGORY_COLORS[category]);
    return h;
  }
  return stringToHue(category);
};

const difficultyLightness: Record<Menu['difficulty'], number> = {
  easy: 70,
  normal: 55,
  hard: 45,
};

export const generateColor = (
  category: string,
  difficulty: Menu['difficulty']
): string => {
  const hue = getCategoryHue(category);
  const saturation = 60;
  const lightness = difficultyLightness[difficulty];

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
