import 'server-only';

import { Grid, Typograhpy } from './MaterialUINext';
import Container from '#/app/components/Container';
import FormationRechercheResult from '#/app/components/FormationRechercheResult';
import FormationList from '#/app/components/FormationList';
import dynamic from 'next/dynamic';

import PostCodeList from '#/files/code_postal.json';

const FormationMap = dynamic(() => import('#/app/components/FormationMap'), {
  ssr: false,
});

export default async function FormationRercherche({ searchParams }: any) {
  const abTesting = searchParams?.abTesting === '1' ? true : false;
  const searchFormations = searchParams?.formations;
  const searchDistance = searchParams?.distance;
  const searchPostCode = searchParams?.postCode;
  const postCodeDetail = PostCodeList.find(
    ({ code_postal }) => code_postal === searchPostCode
  ) || { postCode: '91000', coordinate: [48.626896994, 2.43011442] };

  return (
    <FormationRechercheResult
      searchParams={{
        cfds: searchFormations.split(','),
        distance: searchDistance,
        postCode: searchPostCode,
      }}
    >
      {({ formations, metrics, diplomes }: any) => {
        return formations ? (
          <Grid
            container
            sx={{ flex: '1' }}
            spacing={2}
            direction='row-reverse'
            justifyContent='flex-end'
          >
            <Grid
              item
              md={abTesting ? 6 : 8}
              xs={12}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              <FormationMap
                formations={formations}
                postCodeDetail={postCodeDetail}
              />
            </Grid>

            <Grid sx={{ display: 'flex' }} item md={abTesting ? 6 : 4} xs={12}>
              <div
                style={{
                  flex: '1 1 auto',
                  flexDirection: 'column',
                  display: 'flex',
                }}
              >
                <Container>
                  <Typograhpy variant='h3'>
                    Ces formations pourrait vous intéresser
                  </Typograhpy>
                  <Typograhpy>
                    Ces formations ont des compétences communes avec les
                    formations que vous avez sélectionnées
                  </Typograhpy>
                </Container>

                {/* <Container nopadding>
                  <Checkbox
                    small
                    legend='Diplôme'
                    options={diplomes.map((d: string, index: number) => {
                      return {
                        label: d,
                        nativeInputProps: {
                          name: 'checkboxes-' + index,
                          value: d,
                        },
                      };
                    })}
                    orientation='horizontal'
                  />
                </Container> */}
                <div style={{ flex: '1 1 auto' }}>
                  <FormationList
                    metrics={metrics}
                    formations={formations}
                    abTesting={abTesting}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        ) : (
          <></>
        );
      }}
    </FormationRechercheResult>
  );
}
