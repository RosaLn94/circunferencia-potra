import { createRouter, createWebHistory } from 'vue-router';
import Lobby from './views/Lobby.vue';
import GameRoom from './views/GameRoom.vue';
const routes = [
    { path: '/', component: Lobby },
    { path: '/room/:roomId', component: GameRoom }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;
