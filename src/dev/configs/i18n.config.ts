import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nOptions,
} from 'nestjs-i18n';

export const i18nConfig: I18nOptions = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: './dist/dev/i18n/',
    watch: true,
  },
  resolvers: [
    { use: HeaderResolver, options: ['lang'] },
    AcceptLanguageResolver,
  ],
};
