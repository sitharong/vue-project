<template>
  <div class="flex flex-col px-10">
    <div class="flex flex-row">
      <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Note Detail</h2>
      <!-- read mode -->
      <div v-if="viewMode">
        <button class="font-medium dark:text-blue-500 hover:underline pl-10" @click="editNoteClick()"
          :class="!noteData.id ? 'text-gray-600 cursor-not-allowed' : 'text-blue-600'" :disabled="!noteData.id">
          Edit</button>
        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline pl-5" @click="newNoteClick()">
          New</button>
      </div>
      <!-- add/edit mode -->
      <div v-else>
        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline pl-10" @click="saveNoteClick()">
          Save</button>
        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline pl-5" @click="cancelClick()">
          Cancel</button>
      </div>
    </div>
    <div class="flex flex-row items-center justify-center">
      <label for="small-input" class="block text-sm font-medium text-gray-900 dark:text-white pr-3 w-100">Title</label>
      <input type="text" id="small-input" :class="viewMode ? 'bg-gray-50' : 'bg-white-50'" :disabled="viewMode"
        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="noteData.title" />
    </div>
    <div class="flex flex-row items-center justify-center">
      <label for="small-input" class="block text-sm font-medium text-gray-900 dark:text-white pr-3">Created At</label>
      <input type="text" id="small-input"
        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :disabled="true" :value="noteData.created_at" />
    </div>
    <div class="flex flex-row items-center justify-center">
      <label for="small-input" class="block text-sm font-medium text-gray-900 dark:text-white pr-3">Updated At</label>
      <input type="text" id="small-input"
        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :disabled="true" :value="noteData.updated_at" />

    </div>

    <div class="flex flex-row items-center justify-center">
      <label for="small-input" class="block text-sm font-medium text-gray-900 dark:text-white pr-3">Content</label>
      <textarea id="message" rows="4" :class="viewMode ? 'bg-gray-50' : 'bg-white-50'" :disabled="viewMode"
        class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="content..." v-model="noteData.content"></textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { noteHelper } from '@/helpers/NoteHelper';
import { NoteModel } from '@/models/NoteModel';
import { noteService } from '@/services/NoteService';
import { listNoteStore, selectedNoteStore } from '@/stores/NoteStore';
import { ref } from 'vue';

// note data binding with ui form
const noteData = ref(new NoteModel());
const setNoteData = (note?: NoteModel) => {
  noteData.value = note || new NoteModel();
}
// controls view/edit mode
const viewMode = ref(true);
const setViewMode = (viewing: boolean) => {
  viewMode.value = viewing;
}
// listening to note list click
selectedNoteStore().$subscribe(async (_, state) => {
  console.log('selectedNoteStore$subscribe');
  setViewMode(true);
  const selectedNote = noteHelper.findNoteById(listNoteStore().getNoteList(), state.selectedNoteId)
  if (!selectedNote) return;
  // non reactive
  setNoteData({ ...selectedNote });
  if (!selectedNote.hasFullDetail) {
    const newNote = await noteService.getNote(selectedNote.id);
    // refresh ui form with new data
    setNoteData(newNote);
    // stores new data
    Object.assign(selectedNote, newNote)
  }
})

// cache selected note data
let cacheNoteData: NoteModel;
const editNoteClick = () => {
  console.log('editNoteClick');
  setViewMode(false);
  cacheNoteData = { ...noteData.value };
}

const newNoteClick = () => {
  console.log('newNoteClick');
  editNoteClick();
  setNoteData();
}

const saveNoteClick = async () => {
  console.log('saveNoteClick');
  if (!noteData.value.title.trim()) {
    console.log('must input title');
    return;
  }
  let newNoteList: NoteModel[];
  if (noteData.value.id) {
    // update note
    newNoteList = await noteService.updateNote(noteData.value);
  } else {
    // add new note
    newNoteList = await noteService.addNote(noteData.value);
    // auto select new added note
    // const newNoteId = noteHelper.sortNoteListByCreatedAtDate(newNoteList).pop()?.id
  }
  // refresh note list
  listNoteStore().resetListValue(newNoteList);
}

const cancelClick = () => {
  console.log('cancelClick');
  setViewMode(true);
  noteData.value = cacheNoteData;
}

</script>
