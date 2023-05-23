import { defineStore } from 'pinia';
import { mande } from 'mande';
import { AuthenticatedUser, AuthenticationResponse } from '~/utils/models';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    access_token: '',
    isTokenValid: false,
    user: {} as object,
  }),
  persist: true,
  actions: {
    async login(username: string, password: string) {
      const runtimeConfig = useRuntimeConfig();
      const authLogin = mande(runtimeConfig.public.AUTH_TOKEN_URL);
      const authUser = mande(runtimeConfig.public.USER_INFO_URL);
      const makeAuthToken: AuthenticationResponse = await authLogin.post({
        username: username,
        password: password,
      });
      const authResponse = makeAuthToken as AuthenticationResponse;
      if (authResponse.token !== null) {
        this.access_token = authResponse.token;
        const makeAuthUser: AuthenticatedUser = await authUser.get({
          headers: { Authorization: `Bearer ${this.access_token}` },
        });
        this.user = makeAuthUser;
        this.isTokenValid = true;
        navigateTo('/');
      }
    },
    async validateToken() {
      const runtimeConfig = useRuntimeConfig();
      const isValidToken = mande(runtimeConfig.public.AUTH_TOKEN_VALIDATE_URL);
      const isValidTokenResp: AuthenticationResponse =
        await isValidToken.get<AuthenticationResponse>({
          headers: { Authorization: `Bearer ${this.getAccessToken}` },
        });
      this.isTokenValid =
        this.getAccessToken !== '' && isValidTokenResp.isValid;
    },
    logout() {
      this.access_token = '';
      this.user = {};
      this.isTokenValid = false;
      return navigateTo('/');
    },
  },
  getters: {
    getAccessToken: (state) => state.access_token,
    getIsValidToken: (state) => state.isTokenValid,
    getUserInfo: (state) => state.user,
  },
});
