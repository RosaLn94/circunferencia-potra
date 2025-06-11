import { db } from '../firebase.js';
import { ref as dbRef, onValue, set, remove, onDisconnect } from 'firebase/database';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const roomId = route.params.roomId;
const userId = Math.random().toString(36).slice(2);
const myName = ref('');
const isJoined = ref(false);
const players = ref([]);
const isSpinning = ref(false);
const winner = ref(null);
const myTurn = ref(false);
let playerRef = null;
const startGame = async () => {
    playerRef = dbRef(db, `rooms/${roomId}/players/${userId}`);
    await set(playerRef, { id: userId, name: myName.value });
    onDisconnect(playerRef).remove();
    isJoined.value = true;
    onValue(dbRef(db, `rooms/${roomId}/players`), snapshot => {
        const val = snapshot.val() || {};
        players.value = Object.values(val);
        myTurn.value = Object.keys(val)[0] === userId;
    });
    onValue(dbRef(db, `rooms/${roomId}/spin`), snapshot => {
        const data = snapshot.val();
        if (data) {
            isSpinning.value = true;
            setTimeout(() => {
                const index = Math.floor((360 - (data.angle % 360)) / (360 / 4)) % 4;
                winner.value = players.value[index]?.name || 'Desconocido';
                isSpinning.value = false;
            }, 4000);
        }
    });
};
const spin = async () => {
    const angle = Math.floor(Math.random() * 360);
    await set(dbRef(db, `rooms/${roomId}/spin`), {
        angle,
        time: Date.now()
    });
};
onBeforeUnmount(() => {
    if (playerRef)
        remove(playerRef);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
if (!__VLS_ctx.isJoined) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        placeholder: "Introduce tu nombre",
    });
    (__VLS_ctx.myName);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.startGame) },
        disabled: (__VLS_ctx.myName.trim() === ''),
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    (__VLS_ctx.roomId);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.players.length);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (const [p] of __VLS_getVForSourceType((__VLS_ctx.players))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            key: (p.id),
        });
        (p.name);
    }
    if (__VLS_ctx.players.length === 4) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.spin) },
            disabled: (__VLS_ctx.isSpinning || !__VLS_ctx.myTurn),
        });
        if (__VLS_ctx.winner) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (__VLS_ctx.winner);
        }
    }
    if (__VLS_ctx.isSpinning) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    }
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            roomId: roomId,
            myName: myName,
            isJoined: isJoined,
            players: players,
            isSpinning: isSpinning,
            winner: winner,
            myTurn: myTurn,
            startGame: startGame,
            spin: spin,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
