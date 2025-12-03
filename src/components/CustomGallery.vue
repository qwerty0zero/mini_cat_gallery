<template>
  <div ref="root" class="gallery-container" >
    <slot></slot>
  </div>
</template>


<script setup>
import { ref } from 'vue';


const root = ref(null)

defineExpose({
  root
})

</script>

<style scoped>
.gallery-container{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;

}

@media screen and (max-width: 400px){
  .gallery-container{
    display: flex;
    flex-direction: column;
  }
}
</style>