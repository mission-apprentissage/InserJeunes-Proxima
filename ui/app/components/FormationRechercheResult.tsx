import { formationsSimilaire } from '#/api/api';

export default async function FormationRechercheResult({
  searchParams: { cfds, postCode, distance },
  children,
}: any) {
  const results = await formationsSimilaire(postCode, distance, cfds);

  return <>{children(results)}</>;
}
