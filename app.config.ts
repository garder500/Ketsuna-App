import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  "name": "Ketsuna",
  "slug": "Ketsuna",
  "version": "1.0.0",
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/images/adaptive-icon.png",
      "backgroundColor": "#ffffff"
    },
    "package": "com.ketsuna.com",
    "googleServicesFile": process.env.GOOGLE_SERVICES_JSON
  },
});
