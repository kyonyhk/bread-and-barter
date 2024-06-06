'use client';

export const FontsPreloadLinks = () => (
  <>
    <link
      rel="preload"
      href="/fonts/PPTelegraf-Black.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href="/fonts/PPTelegraf-Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href="/fonts/PPTelegraf-Regular.woff2"
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
          src: url('/fonts/PPTelegraf-Black.woff2') format('woff2');
          font-weight: 900;
          font-style: normal;
        }
        @font-face {
          font-family: 'PP Telegraf Bold';
          src: url('/fonts/PPTelegraf-Bold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
        }
        @font-face {
          font-family: 'PP Telegraf Regular';
          src: url('/fonts/PPTelegraf-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
        }

        :root {
          --font-pp-telegraf-black: 'PP Telegraf Black';
          --font-pp-telegraf-bold: 'PP Telegraf Bold';
          --font-pp-telegraf-regular: 'PP Telegraf Regular';
        }
      `,
    }}
  />
);
