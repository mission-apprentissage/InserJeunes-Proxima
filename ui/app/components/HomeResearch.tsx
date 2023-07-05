'use client';
import Button from '@codegouvfr/react-dsfr/Button';
import { useTranslation } from '#/app/i18n/client';
import PostCode from '#/app/components/forms/PostCode';
import Distance from '#/app/components/forms/Distance';
import Formation from '#/app/components/forms/Formation';
import { Grid } from '#/app/components/MaterialUINext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormationType } from '#/app/components/forms/Formation';

const schema = yup
  .object({
    postCode: yup
      .string()
      .matches(/[0-9]{5}/)
      .required(),
    distance: yup.number().positive().integer().min(1).max(100).required(),
    formations: yup.array().min(1).required(),
  })
  .required();

export default function HomeResearch({
  formations,
}: {
  formations: FormationType[];
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchFormations: FormationType[] =
    searchParams
      .get('formations')
      ?.split(',')
      .map((f) => ({
        cfd: f,
        title: formations.find(({ cfd }) => cfd === f)?.title || '',
      }))
      .filter(({ cfd }) => !!cfd) || [];
  const searchDistance = parseInt(searchParams.get('distance') || '10');
  const searchPostCode = searchParams.get('postCode') || '';

  type FormData = {
    formations: FormationType[];
    distance: number;
    postCode: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      formations: searchFormations,
      distance: searchDistance,
      postCode: searchPostCode,
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    const urlParams = new URLSearchParams({
      formations: data.formations.map((f) => f.cfd).join(','),
      distance: data.distance.toString(),
      postCode: data.postCode || '',
    });
    router.push(`/recherche/?${urlParams}`);
  });

  return (
    <form autoComplete='off' onSubmit={onSubmit} style={{ flex: '1' }}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Controller
            name='formations'
            control={control}
            render={(form) => (
              <Formation
                formations={formations}
                form={{ ...form, error: errors?.formations }}
              />
            )}
          />
        </Grid>
        <Grid item md={2} xs={6}>
          <Controller
            name='postCode'
            control={control}
            render={(form) => (
              <PostCode form={{ ...form, error: errors?.postCode }} />
            )}
          />
        </Grid>
        <Grid item md={2} xs={6}>
          <Controller
            name='distance'
            control={control}
            render={({ field, fieldState }) => (
              <Distance form={{ field, fieldState, error: errors?.distance }} />
            )}
          />
        </Grid>
        <Grid item md={2} xs={4}>
          <Button type={'submit'} style={{ height: '100%' }}>
            {t('Rechercher')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
