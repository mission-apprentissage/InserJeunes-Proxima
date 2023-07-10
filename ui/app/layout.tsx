import { NextAppDirEmotionCacheProvider } from 'tss-react/next';
import { DsfrHead } from '@codegouvfr/react-dsfr/next-appdir/DsfrHead';
import { DsfrProvider } from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider';
import { getHtmlAttributes } from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes';
import StartDsfr from './StartDsfr';
import { defaultColorScheme } from './defaultColorScheme';
import MuiDsfrThemeProvider from '@codegouvfr/react-dsfr/mui';
import Link from 'next/link';
import { dir } from 'i18next';
import { GlobalStyles } from 'tss-react';

export default function RootLayout({ children }: { children: JSX.Element }) {
  const lang = 'fr';

  return (
    <html
      {...getHtmlAttributes({ defaultColorScheme, lang })}
      dir={dir(lang)}
      style={{
        overflow: '-moz-scrollbars-vertical',
        overflowY: 'scroll',
      }}
    >
      <head>
        <title>Proxima</title>
        <StartDsfr />
        <DsfrHead
          Link={Link}
          preloadFonts={[
            //"Marianne-Light",
            //"Marianne-Light_Italic",
            'Marianne-Regular',
            //"Marianne-Regular_Italic",
            'Marianne-Medium',
            //"Marianne-Medium_Italic",
            'Marianne-Bold',
            //"Marianne-Bold_Italic",
            //"Spectral-Regular",
            //"Spectral-ExtraBold"
          ]}
        />
      </head>
      <body
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <GlobalStyles
          styles={{
            '.fr-btn-fix': {
              fontSize: '1rem',
              lineHeight: '1.5rem',
              minHeight: '2.5rem',
              padding: '0.5rem 1rem',
              backgroundColor:
                'var(--background-action-high-blue-france) !important',
              '--idle': 'transparent  !important',
              '--hover':
                'var(--background-action-high-blue-france-hover) !important',
              '--active':
                'var(--background-action-high-blue-france-active) !important',
              color: 'var(--text-inverted-blue-france) !important',
            },
            '.fr-btn-fix:hover': {
              backgroundColor:
                'var(--background-action-high-blue-france-hover) !important',
            },
          }}
        />

        <DsfrProvider>
          <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
            <MuiDsfrThemeProvider>{children}</MuiDsfrThemeProvider>
          </NextAppDirEmotionCacheProvider>
        </DsfrProvider>
      </body>
    </html>
  );
}
