import { Router } from '@vaadin/router';
import './components/home-page.js';
import './components/rick-morty.js';

const outlet = document.querySelector('#outlet');
const router = new Router(outlet);

router.setRoutes([
  { path: '/', component: 'home-page' },
  { path: '/characters', component: 'rick-morty' },
  { path: '/characters/:id', component: 'rick-morty' } 
]);
