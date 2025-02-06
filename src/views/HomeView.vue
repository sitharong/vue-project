<template>
  <main>
    <div class="flex flex-row w-full p-10">
      <NoteList></NoteList>
      <NoteDetail></NoteDetail>
    </div>
  </main>
</template>

<script setup lang="ts">
import NoteDetail from '@/components/NoteDetail.vue'
import NoteList from '@/components/NoteList.vue'
</script>
