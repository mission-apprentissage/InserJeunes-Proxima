'use client';

import Container from '#/app/components/Container';
import { Typograhpy, Grid, Box, Stack, Divider } from './MaterialUINext';
import { Tag } from '@codegouvfr/react-dsfr/Tag';
import { fr } from '@codegouvfr/react-dsfr';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';
import { useEffect } from 'react';
import { useWindowSize } from '@react-hook/window-size';

const cache = new CellMeasurerCache({
  defaultHeight: 204,
  fixedWidth: true,
});

function FormationItem({ formation, metrics }: any) {
  const metric = metrics.get(formation.cfd);

  return (
    <Grid item md={12} xs={12} style={{ margin: fr.spacing('2v') }}>
      <Container variant='subContent'>
        <Grid container spacing={2}>
          <Grid item lg={7} md={12} xs={12}>
            <Typograhpy variant='h6'>{formation.title}</Typograhpy>
            <Typograhpy mt={fr.spacing('2v')} mb={fr.spacing('2v')}>
              {formation.etablissement}
            </Typograhpy>
            <Typograhpy variant='body2'>
              {formation.postCode} {formation.city}
            </Typograhpy>
            <Typograhpy component='div' variant='body2'>
              <Box
                sx={{
                  fontStyle: 'italic',
                  color: 'var(--grey-625-425)',
                }}
              >
                {Math.round(formation.distance)} km(s) du lieu de recherche
              </Box>
            </Typograhpy>
            <Stack mt={fr.spacing('2v')} spacing={1}>
              {formation.isApprentissage ? (
                <Tag
                  style={{
                    backgroundColor: '#00AC8C',
                    borderRadius: '0.5rem',
                    fontWeight: '700',
                  }}
                  iconId={'fr-icon-briefcase-fill'}
                >
                  Contrat apprentissage
                </Tag>
              ) : (
                <Tag
                  style={{
                    backgroundColor: '#AFAFF9',
                    borderRadius: '0.5rem',
                    fontWeight: '700',
                  }}
                  iconId={'fr-icon-briefcase-fill'}
                >
                  Voie scolaire
                </Tag>
              )}
            </Stack>
          </Grid>
          <Box display={{ md: 'none', lg: 'block' }}>
            <Divider orientation='vertical' sx={{ mr: '-1px' }}></Divider>
          </Box>
          <Grid item lg={5} md={12}>
            <Stack mt={fr.spacing('2v')} spacing={1}>
              {metric?.taux_en_emploi_6_mois !== undefined ? (
                <Container
                  variant='content'
                  nopadding
                  disableGutters
                  style={{ padding: fr.spacing('1v') }}
                >
                  <Grid container>
                    <Grid
                      item
                      md={6}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <i
                        style={{ marginRight: fr.spacing('1v') }}
                        className={fr.cx(
                          'fr-icon--lg',
                          'fr-icon-briefcase-fill'
                        )}
                      />
                      <Typograhpy variant={'h2'} style={{ color: '#3A55D1' }}>
                        {metric.taux_en_emploi_6_mois}%
                      </Typograhpy>
                    </Grid>
                    <Grid item md={6}>
                      <Typograhpy variant='body2'>
                        en emploi au bout de 6 mois
                      </Typograhpy>
                    </Grid>
                  </Grid>
                </Container>
              ) : (
                <></>
              )}

              {metric?.taux_en_formation !== undefined ? (
                <Container
                  variant='content'
                  nopadding
                  disableGutters
                  style={{ padding: fr.spacing('1v') }}
                >
                  <Grid container>
                    <Grid
                      item
                      md={6}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <i
                        style={{ marginRight: fr.spacing('1v') }}
                        className={fr.cx(
                          'fr-icon--lg',
                          'ri-graduation-cap-line'
                        )}
                      />
                      <Typograhpy variant={'h2'} style={{ color: '#3A55D1' }}>
                        {metric.taux_en_formation}%
                      </Typograhpy>
                    </Grid>
                    <Grid item md={6}>
                      <Typograhpy variant='body2'>
                        inscrits en formation
                      </Typograhpy>
                    </Grid>
                  </Grid>
                </Container>
              ) : (
                <></>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default function FormationList({ formations, metrics }: any) {
  const metricsMap = new Map(metrics);
  let listRef: List | null = null;
  const [width, height] = useWindowSize();

  useEffect(() => {
    cache.clearAll();
    listRef && listRef.forceUpdateGrid();
  }, [width, height, listRef]);

  return (
    <>
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={(ref) => (listRef = ref)}
            height={height}
            rowCount={formations.length}
            rowHeight={(index) => {
              return cache.rowHeight(index);
            }}
            // deferredMeasurementCache={cache}
            rowRenderer={({ index, isScrolling, key, parent, style }) => {
              return (
                <CellMeasurer
                  cache={cache}
                  columnIndex={0}
                  key={key}
                  parent={parent}
                  rowIndex={index}
                >
                  <div key={key} style={style}>
                    <FormationItem
                      formation={formations[index]}
                      metrics={metricsMap}
                    />
                  </div>
                </CellMeasurer>
              );
            }}
            width={width}
          />
        )}
      </AutoSizer>
    </>
  );
}
