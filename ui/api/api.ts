import { cache } from 'react';
import 'server-only';

import * as Diagoriente from './diagoriente';
import * as Exposition from './exposition';
import { cacheWithObjectArgument } from '#/common/cache';

export const preload = () => {
  getFormations();

  return undefined;
};

export const getFormations = cache(async () => {
  const diplomes = await Diagoriente.codeDiplomes();

  const uniqDiplomes = new Map<string, any>();
  diplomes.forEach(
    ({ code_cfd, ...values }: { code_cfd: string; values: any }) => {
      uniqDiplomes.set(code_cfd, { code_cfd, ...values });
    }
  );

  return Array.from(uniqDiplomes.values()).map(
    (diplome: { libelle_long: string; code_cfd: string }) => {
      return {
        title: `${diplome.libelle_long} (${diplome.code_cfd})`,
        cfd: diplome.code_cfd,
      };
    }
  );
});

export const formationsSimilaire = cacheWithObjectArgument(
  async (postCode: string, distance: number, cfds: string[]) => {
    const formationsResult = await Diagoriente.formationsSimilaire(
      postCode,
      distance,
      cfds
    );

    //Dedup
    const formationsResultDedup = new Map<string, any>();
    formationsResult.forEach((f: any) =>
      formationsResultDedup.set(
        `${f['codeCFD']}#${f['Raison sociale du siret formateur']}#${f['Code Postal']}#${f["Accès à l'apprentissage de la fiche RNCP (oui/non)"]}`,
        f
      )
    );

    const cfdsResult = new Set<string>();
    const diplomes = new Map<string, string>();
    const formations = Array.from(formationsResultDedup.values())
      .slice(0, 200)
      .map((formation: any) => {
        cfdsResult.add(formation['codeCFD']);

        const result = {
          title: formation['Intitulé diplôme (DEPP)'],
          etablissement: formation['Raison sociale du siret formateur'],
          postCode: formation['Code Postal'],
          city: formation['Ville'],
          lat: formation['lat'],
          long: formation['long'],
          distance: formation['Distance'],
          score: formation['score'],
          cfd: formation['codeCFD'],
          rncp: formation['codeRNCP'],
          rome: formation['Codes_Rome_Code'],
          romeLibelle: formation['Codes_Rome_Libelle'],
          diplome: formation['Abrégé de diplôme (RNCP)'],
          isApprentissage:
            formation["Accès à l'apprentissage de la fiche RNCP (oui/non)"] ===
            'oui'
              ? true
              : false,
        };
        diplomes.set(result.diplome, result.diplome);

        return result;
      });

    // Fetch IJ metrics
    const certificationsMetrics = await Exposition.certifications(
      Array.from(cfdsResult),
      '2021',
      cfdsResult.size
    );
    const metrics = new Map<string, any>();
    certificationsMetrics?.certifications.forEach((certification: any) => {
      metrics.set(certification.code_formation_diplome, certification);
    });

    return { formations, metrics, diplomes: Array.from(diplomes.values()) };
  }
);
