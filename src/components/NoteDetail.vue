<template>
  <div class="flex flex-col px-10">
    <div class="flex flex-row">
      <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Note Detail</h2>
      <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
    </div>
    <div class="flex flex-row items-center justify-center">
      <label for="small-input" class="block text-sm font-medium text-gray-900 dark:text-white pr-3 w-100">Title</label>
      <input type="text" id="small-input"
        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="noteStore().selectedNote.title" />
    </div>
    <div class="flex flex-row items-center justify-center">
      <label for="small-input" class="block text-sm font-medium text-gray-900 dark:text-white pr-3">Created At</label>
      <input type="text" id="small-input"
        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :disabled="true" :value="noteStore().selectedNote.created_at" />
    </div>
    <div class="flex flex-row items-center justify-center">
      <label for="small-input" class="block text-sm font-medium text-gray-900 dark:text-white pr-3">Updated At</label>
      <input type="text" id="small-input"
        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :disabled="true" :value="noteStore().selectedNote.updated_at" />

    </div>

    <div class="flex flex-row items-center justify-center">
      <label for="small-input" class="block text-sm font-medium text-gray-900 dark:text-white pr-3">Content</label>
      <textarea id="message" rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="content..." v-model="noteStore().selectedNote.title"></textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { noteStore } from '@/stores/NoteStore';
</script>
