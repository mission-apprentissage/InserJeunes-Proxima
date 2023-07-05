// TODO: change if we need translation one day
export async function useTranslation() {
  return {
    t: (str: string) => str,
  };
}
