<template>
  <div>
    <h1>La circunferencia de la potra</h1>

    <div v-if="!isJoined">
      <input v-model="myName" placeholder="Introduce tu nombre" />
      <button @click="startGame" :disabled="myName.trim() === ''">Entrar a la sala</button>
    </div>

    <div v-else>
      <h2>Sala: {{ roomId }}</h2>
      <p>Jugadores conectados: {{ players.length }}/4</p>
      <ul>
        <li v-for="p in players" :key="p.id">{{ p.name }}</li>
      </ul>

      <div v-if="players.length === 4">
        <button @click="spin" :disabled="isSpinning || !myTurn">Girar Ruleta</button>
        <p v-if="winner">Ganador: {{ winner }}</p>
      </div>

      <div v-if="isSpinning">🎯 Girando...</div>
    </div>
  </div>
</template>

<script setup>
import { db } from '../firebase.js'
import { ref as dbRef, onValue, set, remove, onDisconnect } from 'firebase/database'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const roomId = route.params.roomId
const userId = Math.random().toString(36).slice(2)

const myName = ref('')
const isJoined = ref(false)
const players = ref([])
const isSpinning = ref(false)
const winner = ref(null)
const myTurn = ref(false)

let playerRef = null

const startGame = async () => {
  playerRef = dbRef(db, `rooms/${roomId}/players/${userId}`)

  await set(playerRef, { id: userId, name: myName.value })
  onDisconnect(playerRef).remove()

  isJoined.value = true

  onValue(dbRef(db, `rooms/${roomId}/players`), snapshot => {
    const val = snapshot.val() || {}
    players.value = Object.values(val)
    myTurn.value = Object.keys(val)[0] === userId
  })

  onValue(dbRef(db, `rooms/${roomId}/spin`), snapshot => {
    const data = snapshot.val()
    if (data) {
      isSpinning.value = true
      setTimeout(() => {
        const index = Math.floor((360 - (data.angle % 360)) / (360 / 4)) % 4
        winner.value = players.value[index]?.name || 'Desconocido'
        isSpinning.value = false
      }, 4000)
    }
  })
}

const spin = async () => {
  const angle = Math.floor(Math.random() * 360)
  await set(dbRef(db, `rooms/${roomId}/spin`), {
    angle,
    time: Date.now()
  })
}

onBeforeUnmount(() => {
  if (playerRef) remove(playerRef)
})
</script>
