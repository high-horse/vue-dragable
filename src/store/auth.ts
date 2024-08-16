import { reactive } from "vue";

export const auth = reactive({
  user: null,
  isAuthenticated: false,
});