export const isSetupComplete = (settings: UserSettings) => {
  return Object.values(settings).every(setting => setting);
};
