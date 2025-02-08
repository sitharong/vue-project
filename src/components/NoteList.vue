<template>
  <div class="flex flex-col">
    <div class="flex flex-row">
      <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Note List</h2>
      <div class="flex flex-row items-center justify-center">
        <label for="small-input" class="block text-sm font-medium text-gray-900 dark:text-white pr-1 pl-9">Search by
          Title</label>
        <input type="text" id="small-input"
          class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="searchTitle" v-on:keyup="setList()" />
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-50 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3" @click="sortListByTitleClick()">Note Title</th>
            <th scope="col" class="px-6 py-3" @click="sortListByDateClick()">Creation Date</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            v-for="note in noteList" :key="note.id">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              @click="noteClick(note.id)">
              {{ note.title }}
            </th>
            <td class="px-6 py-4" @click="noteClick(note.id)">{{ note.created_at }}</td>
            <td class="px-6 py-4">
              <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                @click="noteDeleteClick(note.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import type { NoteModel } from '@/models/NoteModel';
import { noteService } from '@/services/NoteService'
import { onMounted, ref } from 'vue'
import { listNoteStore, selectedNoteStore } from '@/stores/NoteStore';
import { noteHelper } from '@/helpers/NoteHelper';

// title search input binding
const searchTitle = ref('');

// sort binding
const sortingByTitle = ref<boolean>()
const sortingByDate = ref<boolean>()
const sortAsc = ref<boolean>()

// note list binding
const noteList = ref<NoteModel[]>([]);
// note list filter, sort impl
const setList = () => {
  const list = noteHelper.filterNoteListByTitle(listNoteStore().cloneNoteList(), searchTitle.value)
  if (sortingByTitle.value) {
    noteList.value = noteHelper.sortNoteListByTitle(list, sortAsc.value)
  } else if (sortingByDate.value) {
    noteList.value = noteHelper.sortNoteListByCreatedAtDate(list, sortAsc.value)
  } else {
    noteList.value = list;
  }
  console.log('setList', sortAsc.value);
}

// listening to global list change
listNoteStore().$subscribe(setList)

// request list on init
onMounted(async () => {
  const list = await noteService.getNotes()
  listNoteStore().resetListValue(list);
})

// note click impl
const noteClick = async (id: number) => {
  console.log('noteClick');
  const note = await noteService.getNote(id);
  selectedNoteStore().resetNoteValue(note);
}

// note delete impl
const noteDeleteClick = async (id: number) => {
  console.log('noteDeleteClick');
  const newList = await noteService.deleteNote(id)
  listNoteStore().resetListValue(newList);
}

// sort click impl
const sortListByTitleClick = () => {
  if (sortingByTitle.value) {
    noteList.value = noteList.value.reverse();
    sortAsc.value = !sortAsc.value;
  } else {
    noteList.value = noteHelper.sortNoteListByTitle(noteList.value);
    sortingByTitle.value = true
    sortAsc.value = true
  }
  if (sortingByDate.value) {
    sortingByDate.value = false;
  }
  console.log('sortListByTitleClick', sortAsc.value);
}

const sortListByDateClick = () => {
  if (sortingByDate.value) {
    noteList.value = noteList.value.reverse();
    sortAsc.value = !sortAsc.value;
  } else {
    noteList.value = noteHelper.sortNoteListByCreatedAtDate(noteList.value);
    sortingByDate.value = true
    sortAsc.value = true
  }
  if (sortingByTitle.value) {
    sortingByTitle.value = false;
  }
  console.log('sortListByDateClick', sortAsc.value);
}

</script>
