'use client';
import Header from '@codegouvfr/react-dsfr/Header';
import { makeStyles } from 'tss-react/dsfr';
import HomeResearch from '#/app/components/HomeResearch';
import { Suspense } from 'react';

export default function CustomHeader({ formations }: { formations: any }) {
  const { classes, cx } = useStyles();

  return (
    <Header
      className={cx(classes.root)}
      brandTop={<>Proxima</>}
      serviceTitle='Proxima'
      homeLinkProps={{
        href: '/',
        title: 'Accueil - Proxima',
      }}
      quickAccessItems={[
        <Suspense key={'header'}>
          <HomeResearch formations={formations} />
        </Suspense>,
      ]}
    />
  );
}

CustomHeader.displayName = CustomHeader.name;

const useStyles = makeStyles({ name: CustomHeader.name })((theme) => ({
  root: {
    ul: {
      flexGrow: '1',
      li: {
        flexGrow: 1,
      },
    },
    '.fr-header__tools': {
      flex: '1 1 auto',
    },
  },
}));
