import { ref } from 'vue'; // Asegúrate de importar `ref`
import { useRouter } from 'vue-router';
// Creación de la variable reactiva
const rooms = ref([]); // Lista de salas disponibles
const router = useRouter();
const createRoom = () => {
    // Aquí va la lógica para crear una nueva sala (por ejemplo, generar un ID único y agregarla a `rooms`)
    const roomId = 'room' + Math.floor(Math.random() * 1000);
    rooms.value.push({ id: roomId });
};
const joinRoom = (roomId = '') => {
    // Aquí va la lógica para unirse a una sala (redirigir a GameRoom o similar)
    if (!roomId) {
        roomId = prompt('Ingresa el ID de la sala');
    }
    console.log('Uniéndote a la sala:', roomId);
    router.push(`/room/${roomId}`);
    // Redirigir a la sala correspondiente, por ejemplo, usando router.push para redirigir a `GameRoom`
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.createRoom) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.joinRoom) },
});
if (__VLS_ctx.rooms.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (const [room] of __VLS_getVForSourceType((__VLS_ctx.rooms))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (room.id),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.rooms.length > 0))
                        return;
                    __VLS_ctx.joinRoom(room.id);
                } },
        });
        (room.id);
    }
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            rooms: rooms,
            createRoom: createRoom,
            joinRoom: joinRoom,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
