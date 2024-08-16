import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { auth } from "../store/auth.ts";

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
    path: "/",
    name: "Dragable",
    component: Dragable,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
