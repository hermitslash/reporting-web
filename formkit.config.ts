import { DefaultConfigOptions } from '@formkit/vue';
import { createMultiStepPlugin } from '@formkit/addons';
import '@formkit/addons/css/multistep';

const config: DefaultConfigOptions = {
  theme: 'genesis',
  plugins: [createMultiStepPlugin()],
};

export default config;
