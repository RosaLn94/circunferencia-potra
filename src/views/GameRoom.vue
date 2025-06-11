<template>
  <div>
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
</template>

<script setup>
import { db } from '../firebase.js'
import { ref as dbRef, onValue, set, remove, onDisconnect } from 'firebase/database'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const roomId = 'sala123'
const userId = Math.random().toString(36).slice(2)
const myName = prompt('Ingresa tu nombre')

const players = ref([])
const isSpinning = ref(false)
const winner = ref(null)
const myTurn = ref(false)

const playerRef = dbRef(db, `rooms/${roomId}/players/${userId}`)

const joinRoom = async () => {
  await set(playerRef, { id: userId, name: myName })

  onDisconnect(playerRef).remove()

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

onMounted(() => {
  joinRoom()
})

onBeforeUnmount(() => {
  remove(playerRef)
})
</script>
