import 'server-only';

import { Typograhpy } from '#/app/components/MaterialUINext';
import Container from '#/app/components/Container';
import { useTranslation } from '#/app/i18n';
import HomeResearch from '#/app/components/HomeResearch';
import { getFormations } from '#/api/api';
import { Header } from '@codegouvfr/react-dsfr/Header';
import { Footer } from '@codegouvfr/react-dsfr/Footer';
import { headerFooterDisplayItem } from '@codegouvfr/react-dsfr/Display';
import { fr } from '@codegouvfr/react-dsfr';
import { Navigation } from './Navigation';

export default async function Page({ params }: { params: { lang: string } }) {
  const { t } = await useTranslation();

  const formations = await getFormations();

  return (
    <>
      <Header
        brandTop={<>Proxima</>}
        serviceTitle='Proxima'
        homeLinkProps={{
          href: '/',
          title: 'Accueil - Proxima',
        }}
        quickAccessItems={[]}
        navigation={<Navigation />}
      />
      <div
        style={{
          flex: 1,
          width: '100%',
          margin: 'auto',
          maxWidth: 1200,
          ...fr.spacing('padding', {
            topBottom: '10v',
          }),
        }}
      >
        <Container variant='content' maxWidth={false}>
          <Typograhpy variant='h3'>
            {t('Trouvez autour de vous des formations similaires')}
          </Typograhpy>
          <Typograhpy variant='body1'>
            {t(
              'Proxima vous propose de visualiser des formations connexes autour de vous.'
            )}
          </Typograhpy>

          <Container variant='subContent' maxWidth={false}>
            <Typograhpy variant='h5' gutterBottom={true}>
              {t(
                'Recherche de formations similaires par affinités de compétences'
              )}
            </Typograhpy>
            <Typograhpy variant='body2' gutterBottom={true}>
              {t(
                'Découvrez des opportunités de formations proches de celles initialement envisagées. Saisissez le ou les diplômes visés et la plateforme vous proposera une liste de formations semblables en termes de compétences.'
              )}
            </Typograhpy>
            <HomeResearch formations={formations} />
          </Container>
        </Container>
      </div>
      <Footer
        accessibility='fully compliant'
        bottomItems={[headerFooterDisplayItem]}
      />
    </>
  );
}
