export const getYears = (): {yearItems: string[]; defaultIndex: number} => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;
  const yearItems = [];
  const defaultIndex = 65;
  for (let i = startYear; i <= currentYear; i++) {
    yearItems.push(i.toString());
  }
  return {yearItems, defaultIndex};
};
