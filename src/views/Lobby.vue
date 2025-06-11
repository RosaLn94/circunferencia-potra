<template>
  <div>
    <h2>Bienvenido al lobby</h2>
    <button @click="createRoom">Crear sala</button>
    <button @click="joinRoom">Unirse a una sala existente</button>
    <div v-if="rooms.length > 0">
      <h3>Salas disponibles:</h3>
      <ul>
        <li v-for="room in rooms" :key="room.id">
          <button @click="joinRoom(room.id)">Unirse a la sala {{ room.id }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'  // Asegúrate de importar `ref`
import { useRouter } from 'vue-router'

// Creación de la variable reactiva
const rooms = ref([])  // Lista de salas disponibles
const router = useRouter()

const createRoom = () => {
  // Aquí va la lógica para crear una nueva sala (por ejemplo, generar un ID único y agregarla a `rooms`)
  const roomId = 'room' + Math.floor(Math.random() * 1000)
  rooms.value.push({ id: roomId })
}

const joinRoom = (roomId = '') => {
  // Aquí va la lógica para unirse a una sala (redirigir a GameRoom o similar)
  if (!roomId) {
    roomId = prompt('Ingresa el ID de la sala')
  }
  console.log('Uniéndote a la sala:', roomId)
  router.push(`/room/${roomId}`) 
  // Redirigir a la sala correspondiente, por ejemplo, usando router.push para redirigir a `GameRoom`
}
</script>
