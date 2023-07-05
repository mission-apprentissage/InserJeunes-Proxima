const { EXPOSITION_API_BASE_URL, EXPOSITION_API_KEY } = process.env;

async function certifications(
  cfds: string[],
  millesimes: string,
  items_par_page: number
) {
  const urlParams = new URLSearchParams({
    code_certifications: cfds.join(','),
    millesimes: millesimes,
    items_par_page: items_par_page.toString(),
  });

  const res = await fetch(
    EXPOSITION_API_BASE_URL + `/certifications?${urlParams}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': EXPOSITION_API_KEY || '',
      },
    }
  );

  return await res.json();
}

export { certifications };
