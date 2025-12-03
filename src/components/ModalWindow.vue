<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="arrow left" @click.stop="prev">&#10094;</button>
      <img :src="currentSrc" />
      <button class="arrow right" @click.stop="next">&#10095;</button>
      <button class="close-btn" @click="close">×</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  images: Array,   // массив всех картинок
  index: Number    // индекс текущей картинки
})

const emit = defineEmits(['close', 'update:index'])

const currentIndex = ref(props.index)
const currentSrc = ref(props.images[currentIndex.value])

watch(() => props.index, (newIndex) => {
  currentIndex.value = newIndex
  currentSrc.value = props.images[currentIndex.value]
})

function prev() {
  currentIndex.value =
      (currentIndex.value - 1 + props.images.length) % props.images.length
  currentSrc.value = props.images[currentIndex.value]
  emit('update:index', currentIndex.value)
}

function next() {
  currentIndex.value =
      (currentIndex.value + 1) % props.images.length
  currentSrc.value = props.images[currentIndex.value]
  emit('update:index', currentIndex.value)
}

function close() {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: #a69cac;
  padding: 1rem;
  border-radius: 0.5rem;
  min-width: 50%;
  max-width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}
button{
  position: fixed;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 3rem;
  color: white;

}
.close-btn {
  top: 3rem;
  right: 3rem;
}

.arrow {
  top: 50%;
  transform: translateY(-50%);
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.arrow.left {
  left: 1rem;
}

.arrow.right {
  right: 1rem;
}

@media screen and (max-width: 460px){
.modal-content{
  padding: 0;
  border: 10px solid #474973;
}
  .arrow.left {
    left: 0;
  }

  .arrow.right {
    right: 0;
  }
  .close-btn {
    right: 1rem;
  }
}
</style>
