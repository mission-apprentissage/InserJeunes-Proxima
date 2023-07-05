import { getFormations } from '#/api/api';
import { useTranslation } from '#/app/i18n';
import CustomHeader from '#/app/components/CustomHeader';

export default async function RechercheLayout({
  children,
}: {
  children: JSX.Element;
}) {
  const { t } = await useTranslation();
  const formations = await getFormations();

  return (
    <>
      <CustomHeader formations={formations} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          margin: 'auto',
          //maxWidth: 1200,

          backgroundColor: ' var(--background-alt-grey)',
        }}
      >
        {children}
      </div>
    </>
  );
}
