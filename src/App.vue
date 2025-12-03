

<script setup>
import { ref, onMounted,onUnmounted } from 'vue'
import { fetchCats } from './CatService.js'
import CustomGallery from '@/components/CustomGallery.vue'
import DefaultImage from '@/components/DefaultImage.vue'
import ModalWindow from '@/components/ModalWindow.vue'

const cats = ref([])
const modalSrc = ref(null)

const customGallery = ref(null)
const isTall = ref(false)
let observer = null
const selectedImage = ref(null)
const isModalOpen = ref(false)

async function loadCats() {
  cats.value = await fetchCats()
}


const selectedIndex = ref(0)

function openModal(index) {
  selectedIndex.value = index
  isModalOpen.value = true
}

function closeModal() {
  selectedImage.value = null
  isModalOpen.value = false
}
function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
onMounted(() => {
  loadCats()

  const el = customGallery.value?.root
  if (!el) return

  const checkHeight = () => {
    const elementHeight = el.offsetHeight
    const screenHeight = window.innerHeight
    isTall.value = elementHeight > screenHeight
  }

  checkHeight()

  observer = new ResizeObserver(() => {
    checkHeight()
  })

  observer.observe(el)
})
</script>




<template>
  <CustomGallery ref="customGallery">
    <template #default>
      <DefaultImage
          v-for="(img, i) in cats"
          :key="img.id"
          :src="img.url"
          @click="openModal(i)"
          :class="{ extraMargin: isTall }"
      />

      <div v-if="cats.length === 0"
           v-for="n in 6"
           :key="n"
           class="fake-skeleton"
      ></div>
    </template>
  </CustomGallery>
  <button :class="{ fixed: isTall }" @click="loadCats">Odśwież koty</button>

  <ModalWindow
      v-if="isModalOpen"
      :images="cats.map(c => c.url)"
      :index="selectedIndex"
      @update:index="selectedIndex = $event"
      @close="closeModal"
  />
</template>

<style scoped>

.fake-skeleton {
  width: 100%;
  min-height: 300px;
  border-radius: 0.5rem;
  border: 2px solid #161B33;
  background: linear-gradient(110deg, #161B33 8%, #2a2f4d 18%, #161B33 33%);
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}
@keyframes shine {
  to { background-position-x: -200%; }
}

button{
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #474973;
  color: #161B33;
  border: 2px solid #161B33;
  font-weight: bold;
  font-size: 1.2rem;
  transition: 0.3s;
  position: relative;
}

button.fixed{
  position: fixed;
  width: calc(100% - 3rem);
  bottom: 2rem;
}
 button:hover{
   background-color: #161B33;
   color: #474973;
   border: 2px solid #474973;
}

@media screen and (max-width: 460px){
  button.fixed{
    width: calc(100% - 1rem);
  }
}
</style>
