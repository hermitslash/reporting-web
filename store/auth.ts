import { defineStore } from 'pinia';
import { mande } from 'mande';
import { AuthenticatedUser, AuthenticationResponse } from '~/utils/models';
import { toast } from 'vue3-toastify';
const authLogin = mande('http://localhost:9809/api/auth/token');
const isValidToken = mande('http://localhost:9809/api/auth/token/validate');
const authUser = mande('http://localhost:9809/api/auth/userinfo');
export const useAuthStore = defineStore('authStore', {
  state: () => ({
    access_token: '',
    isTokenValid: false,
    user: {} as object,
  }),
  persist: true,
  actions: {
    async login(username: string, password: string) {
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
      const isValidTokenResp: AuthenticationResponse =
        await isValidToken.get<AuthenticationResponse>({
          headers: { Authorization: `Bearer ${this.getAccessToken}` },
        });
      this.isTokenValid = isValidTokenResp.isValid;
    },
    logout() {
      this.access_token = '';
      this.user = {};
      this.isTokenValid = false;
      return navigateTo('/login');
    },
  },
  getters: {
    getAccessToken: (state) => state.access_token,
    getIsValidToken: (state) => state.isTokenValid,
    getUserInfo: (state) => state.user,
  },
});
