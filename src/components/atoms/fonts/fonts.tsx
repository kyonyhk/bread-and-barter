'use client';

import React from 'react';

import PPTelegrafBlack from '/PPTelegraf-Black.woff2';
import PPTelegrafBold from '/PPTelegraf-Bold.woff2';
import PPTelegrafRegular from '/PPTelegraf-Regular.woff2';

export const FontsPreloadLinks = () => (
  <>
    <link
      rel="preload"
      href={PPTelegrafBlack}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href={PPTelegrafBold}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href={PPTelegrafRegular}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
  </>
);

export const FontStyleDeclaration = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
        @font-face {
          font-family: 'PP Telegraf Black';
          src: url('${PPTelegrafBlack}') format('woff2');
          font-weight: 900;
          font-style: normal;
        }
        @font-face {
          font-family: 'PP Telegraf Bold';
          src: url('${PPTelegrafBold}') format('woff2');
          font-weight: 700;
          font-style: normal;
        }
        @font-face {
          font-family: 'PP Telegraf Regular';
          src: url('${PPTelegrafRegular}') format('woff2');
          font-weight: 400;
          font-style: normal;
        }

        :root {
          --font-pp-telegraf-heavy: 'PP Telegraf Black';
          --font-pp-telegraf-bold: 'PP Telegraf Bold';
          --font-pp-telegraf-regular: 'PP Telegraf Regular';
        }
      `,
    }}
  />
);
