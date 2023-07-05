const { DIAGORIENTE_API_BASE_URL, USE_API_STATIC_FILE } = process.env;
import codes_diplomes from '#/files/codes_diplomes.json';
import allInOne from '#/files/all_in_one.json';

async function codeDiplomes() {
  if (USE_API_STATIC_FILE === 'true') {
    return codes_diplomes;
  }
  const res = await fetch(DIAGORIENTE_API_BASE_URL + '/codes_diplomes');
  return res.json();
}

async function formationsSimilaire(
  code_postal: string,
  rayon: number,
  cfds: string[]
) {
  const urlParams = new URLSearchParams({
    code_postal,
    rayon: rayon.toString(),
  });

  if (USE_API_STATIC_FILE === 'true') {
    return allInOne;
  }

  const res = await fetch(
    DIAGORIENTE_API_BASE_URL + `/all_in_one?${urlParams}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cfds),
    }
  );

  return await res.json();
}

export { codeDiplomes, formationsSimilaire };
