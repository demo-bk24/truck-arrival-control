import { environment } from 'src/environments/environment';

const { endpoint } = environment;

export const END_POINTS = {
  base: `${endpoint}`,
  setup: 'setup',
  account: 'account',
  control: 'control',
  common: 'common',
  public: 'public',
};
