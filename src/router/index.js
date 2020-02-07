import Vue from "vue";
import VueRouter from "vue-router";
import Listado from "../views/Listado.vue";
import Detalle from "../views/Detalle.vue";
import Favoritos from "../views/Favoritos.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "listado",
    component: Listado
  },
  {
    path: "/detalle/:teamId",
    name: "detalle",
    component: Detalle,
    props: true
  },
  {
    path: "/favoritos",
    name: "favoritos",
    component: Favoritos
  }
];

const router = new VueRouter({
  routes
});

export default router;
