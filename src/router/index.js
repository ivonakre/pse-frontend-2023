import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from "@/views/HomeView";
import PredmetiView from "@/views/PredmetiView";
import ProfesoriView from "@/views/ProfesoriView";
import TerminiPredavanjaView from "@/views/TerminiPredavanjaView";
import UcionicaView from "@/views/UcionicaView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/predmeti',
    name: 'predmeti',
    component: PredmetiView
  },
  {
    path: '/profesori',
    name: 'profesori',
    component: ProfesoriView
  },
  {
    path: '/terminipredavanja',
    name: 'terminipredavanja',
    component: TerminiPredavanjaView
  },
  {
    path: '/ucionica',
    name: 'ucionica',
    component: UcionicaView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router