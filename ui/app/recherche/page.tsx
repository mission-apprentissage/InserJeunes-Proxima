import 'server-only';

import { useTranslation } from '#/app/i18n';
import FormationRecherche from '../components/FormationRecherche';
import Loader from '#/app/components/Loader';
import { Suspense } from 'react';

export default async function Page({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { t } = await useTranslation();

  return (
    // Use key to fix issue with suspense on navigation
    <Suspense key={Date.now()} fallback={<Loader />}>
      <FormationRecherche searchParams={searchParams} />
    </Suspense>
  );
}
