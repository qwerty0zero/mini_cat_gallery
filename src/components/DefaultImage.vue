<template>
  <div @click="emit('click')" class="image-holder">
      <div v-if="!loaded" class="loader"></div>
      <img v-else :src="src" />
  </div>
</template>


<script setup>

const props = defineProps({ src: String })
const emit = defineEmits(['click'])


import { ref, onMounted } from 'vue'
const loaded = ref(false)


onMounted(() => {
  const img = new Image()
  img.src = props.src
  img.onload = () => loaded.value = true
})
</script>

<style scoped>

.loader{
  min-width: 300px;
  min-height: 300px;
  height: 100%;
  width: 100%;
  background: #161B33;
  border-radius: 0.5rem;
  border:  2px solid #474973;
}
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 0.5rem;
  border:  2px solid #161B33;
  cursor: pointer;


}
.image-holder.extraMargin:last-child {
  margin-bottom: 4rem;
}
</style>