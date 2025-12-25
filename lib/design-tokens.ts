export const spacing = {
  xs: "0.5rem", // 8px
  sm: "1rem", // 16px
  md: "1.5rem", // 24px
  lg: "2rem", // 32px
  xl: "3rem", // 48px
  xxl: "4rem", // 64px
} as const;

export const sizes = {
  input: "h-10", // 40px
  buttonSm: "h-8", // 32px
  buttonMd: "h-10", // 40px
  buttonLg: "h-12", // 48px
  navbar: "h-16", // 64px
  cardMinHeight: "min-h-[200px]",
  avatarSm: "w-8 h-8", // 32px
  avatarMd: "w-10 h-10", // 40px
  avatarLg: "w-12 h-12", // 48px
} as const;

export const containerWidths = {
  sm: "max-w-sm", // 384px
  md: "max-w-md", // 448px
  lg: "max-w-lg", // 512px
  xl: "max-w-xl", // 576px
  "2xl": "max-w-2xl", // 672px
  "4xl": "max-w-4xl", // 896px
  "7xl": "max-w-7xl", // 1280px
} as const;

export const borderRadius = {
  sm: "rounded-lg", // 8px
  md: "rounded-xl", // 12px
  lg: "rounded-2xl", // 16px
  full: "rounded-full",
} as const;
