import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { useAuth } from "../store/auth.ts";

import Dragable from "../views/Dragable.vue";
import Login from "../views/Login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/dragable",
    name: "dragable",
    component: Dragable,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const auth = useAuth();

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.state.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
