<template>
  <Transition name="modal-fade" appear>
    <div class="modal-overlay" @click.self="close">
      <button class="arrow left" @click="prev">&#10094;</button>
      <button class="arrow right" @click="next">&#10095;</button>
      <button class="close-btn" @click="close">×</button>

      <div class="modal-content">
        <Transition name="image-switch" mode="out-in">
          <img :src="currentSrc" :key="currentIndex" />
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  images: Array,
  index: Number
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
  background: rgba(0,0,0,0.8);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  background: transparent;
  padding: 0;
  border-radius: 0.5rem;
  max-width: 80%;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 10px 30px rgba(0,0,0,0.5));
}

img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 0.5rem;
  display: block;
}

button {
  position: fixed;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 3rem;
  color: white;
  transition: transform 0.2s ease, color 0.2s ease;
  z-index: 1010;
  outline: none;
}

button:hover {
  transform: scale(1.1);
  color: #a69cac;
}

.close-btn {
  top: 2rem;
  right: 2rem;
}

.arrow {
  top: 50%;
  transform: translateY(-50%);
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.arrow:hover {
  transform: translateY(-50%) scale(1.1);
}

.arrow.left { left: 2rem; }
.arrow.right { right: 2rem; }

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.8) translateY(20px);
}

.image-switch-enter-active,
.image-switch-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.image-switch-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.image-switch-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

@media screen and (max-width: 460px){
  .modal-content {
    max-width: 95%;
  }
  .arrow {
    width: 3rem;
    height: 3rem;
    background: rgba(0,0,0,0.3);
    border-radius: 50%;
  }
  .arrow.left { left: 0.5rem; }
  .arrow.right { right: 0.5rem; }
  .close-btn { top: 1rem; right: 1rem; font-size: 2.5rem; }
}
</style>