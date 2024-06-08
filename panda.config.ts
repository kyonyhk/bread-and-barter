import { defineConfig } from '@pandacss/dev';
import { avatarRecipe } from '@repo/components/atoms/avatar/recipe';

export default defineConfig({
  presets: ['@pandacss/preset-base', '@park-ui/panda-preset'],

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/app/**/*.{ts,tsx,js,jsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      slotRecipes: {
        avatar: avatarRecipe,
      },
      tokens: {
        colors: {
          yellow100: {
            DEFAULT: { value: 'rgba(255, 192, 9, 1.0)' },
          },
          yellow80: {
            DEFAULT: { value: 'rgba(255, 192, 9, 0.8)' },
          },
          yellow50: {
            DEFAULT: { value: 'rgba(255, 192, 9, 0.5)' },
          },
          yellow20: {
            DEFAULT: { value: 'rgba(255, 192, 9, 0.2)' },
          },
          yellow10: {
            DEFAULT: { value: 'rgba(255, 192, 9, 0.1)' },
          },
          yellow5: {
            DEFAULT: { value: 'rgba(255, 192, 9, 0.05)' },
          },
          altyellow: {
            DEFAULT: { value: 'rgba(255, 241, 203, 1.0)' },
          },
          green100: {
            DEFAULT: { value: 'rgba(48, 255, 205, 1.0)' },
          },
          green80: {
            DEFAULT: { value: 'rgba(48, 255, 205, 0.8)' },
          },
          green50: {
            DEFAULT: { value: 'rgba(48, 255, 205, 0.5)' },
          },
          green20: {
            DEFAULT: { value: 'rgba(48, 255, 205, 0.2)' },
          },
          green10: {
            DEFAULT: { value: 'rgba(48, 255, 205 , 0.1)' },
          },
          green5: {
            DEFAULT: { value: 'rgba(48, 255, 205, 0.05)' },
          },
          altgreen: {
            DEFAULT: { value: 'rgba(161, 255, 212, 1.0)' },
          },
          red100: {
            DEFAULT: { value: 'rgba(255, 108, 108, 1.0)' },
          },
          red80: {
            DEFAULT: { value: 'rgba(255, 108, 108, 0.8)' },
          },
          red50: {
            DEFAULT: { value: 'rgba(255, 108, 108, 0.5)' },
          },
          red20: {
            DEFAULT: { value: 'rgba(255, 108, 108, 0.2)' },
          },
          red10: {
            DEFAULT: { value: 'rgba(255, 108, 108, 0.1)' },
          },
          red5: {
            DEFAULT: { value: 'rgba(255, 108, 108, 0.05)' },
          },
          altred: {
            DEFAULT: { value: 'rgba(255, 172, 154, 1.0)' },
          },
          black: {
            DEFAULT: { value: 'rgba(0, 1, 10, 1.0)' },
          },
          white: {
            DEFAULT: { value: 'rgba(234, 234, 234, 1.0)' },
          },
        },
        fonts: {
          pptelegrafblack: { value: 'var(--font-pp-telegraf-black)' },
          pptelegrafbold: { value: 'var(--font-pp-telegraf-bold)' },
          pptelegrafregular: { value: 'var(--font-pp-telegraf-regular)' },
        },
      },
    },
    textStyles: {
      heading1: {
        value: {
          fontFamily: 'pptelegrafblack',
          fontWeight: '900',
          fontSize: '120px',
          lineHeight: '96px',
        },
      },
      heading2: {
        value: {
          fontFamily: 'pptelegrafblack',
          fontWeight: '900',
          fontSize: '100px',
          lineHeight: '80px',
        },
      },
      heading3: {
        value: {
          fontFamily: 'pptelegrafblack',
          fontWeight: '900',
          fontSize: '64px',
          lineHeight: '48px',
        },
      },
      heading4: {
        value: {
          fontFamily: 'pptelegrafblack',
          fontWeight: '900',
          fontSize: '40px',
          lineHeight: '32px',
        },
      },
      subheading1: {
        value: {
          fontFamily: 'pptelegrafbold',
          fontWeight: '700',
          fontSize: '40px',
          lineHeight: '32px',
        },
      },
      subheading2: {
        value: {
          fontFamily: 'pptelegrafbold',
          fontWeight: '700',
          fontSize: '32px',
          lineHeight: '28px',
        },
      },
      subheading3: {
        value: {
          fontFamily: 'pptelegrafbold',
          fontWeight: '700',
          fontSize: '24px',
          lineHeight: '24px',
        },
      },
      subheading4: {
        value: {
          fontFamily: 'pptelegrafbold',
          fontWeight: '700',
          fontSize: '20px',
          lineHeight: '20px',
        },
      },
      subheading5: {
        value: {
          fontFamily: 'pptelegrafbold',
          fontWeight: '700',
          fontSize: '16px',
          lineHeight: '16px',
        },
      },
      paragraph1: {
        value: {
          fontFamily: 'pptelegrafregular',
          fontWeight: '400',
          fontSize: '16px',
        },
      },
      paragraph2: {
        value: {
          fontFamily: 'pptelegrafregular',
          fontWeight: '400',
          fontSize: '14px',
        },
      },
      paragraph3: {
        value: {
          fontFamily: 'pptelegrafregular',
          fontWeight: '400',
          fontSize: '12px',
        },
      },
      paragraph4: {
        value: {
          fontFamily: 'pptelegrafregular',
          fontWeight: '400',
          fontSize: '10px',
        },
      },
    },
  },

  // The output directory for your css system
  emitPackage: true,
  outdir: 'styled-system',
  jsxFramework: 'react',
});
