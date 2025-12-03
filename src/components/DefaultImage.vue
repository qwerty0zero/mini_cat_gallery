<template>
  <div @click="emit('click')" class="image-holder" :class="{ 'is-loading': !loaded }">
    <div v-if="!loaded" class="loader skeleton-anim"></div>

    <img v-else :src="src" alt="Cat image" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({ src: String })
const emit = defineEmits(['click'])

const loaded = ref(false)

// Функция загрузки изображения
const loadImage = () => {
  loaded.value = false
  const img = new Image()
  img.src = props.src
  img.onload = () => {
    loaded.value = true
  }
}

onMounted(() => {
  loadImage()
})

// Добавляем слежение, на случай если src изменится без размонтирования компонента
watch(() => props.src, () => {
  loadImage()
})
</script>

<style scoped>
.image-holder {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden; /* Важно для скругления углов */
  border-radius: 0.5rem;
  /* Граница перемещена на контейнер, чтобы она была и у скелетона, и у картинки */
  border: 2px solid #161B33;
}

/* Стили для скелетона */
.loader {
  min-width: 300px;
  min-height: 300px;
  height: 100%;
  width: 100%;
  background: #161B33;
}

/* Анимация мерцания */
.skeleton-anim {
  background: linear-gradient(
      110deg,
      #161B33 8%,
      #2a2f4d 18%,
      #161B33 33%
  );
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block; /* Убираем отступы снизу у inline-элементов */
  cursor: pointer;
}

.image-holder.extraMargin:last-child {
  margin-bottom: 4rem;
}
</style>