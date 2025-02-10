<template>
  <div class="flex flex-col">
    <div class="flex flex-row">
      <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Note List</h2>
      <div class="flex flex-row items-center justify-center">
        <label for="small-input" class="block text-sm font-medium text-gray-900 dark:text-white pr-1 pl-9">Search by
          Title</label>
        <input type="text" id="small-input"
          class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="searchTitle" v-on:keyup="setNoteList()" />
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-50 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3 float-right flex" @click="sortListByTitleClick()">Note Title
              <svg class="pt-0.5 w-3 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
              </svg>
            </th>
            <th scope="col" class="px-6 py-3" @click="sortListByDateClick()">Creation Date
              <svg class="pt-0.5 w-3 h-4 ms-1.5 float-right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
              </svg>
            </th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="odd:dark:bg-gray-900 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            v-for="note in noteList" :key="note.id"
            :class="note.id === selectedNoteStore().selectedNoteId ? 'bg-blue-100' : 'odd:bg-white even:bg-gray-50'">
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

// stores all notes
let allNoteList = [] as NoteModel[];
// filtered notes
const noteList = ref<NoteModel[]>([]);
// note list filter, sort impl
const setNoteList = () => {
  const list = noteHelper.filterNoteListByTitle(allNoteList, searchTitle.value)
  if (sortingByTitle.value) {
    noteHelper.sortNoteListByTitle(list, sortAsc.value)
  } else if (sortingByDate.value) {
    noteHelper.sortNoteListByCreatedAtDate(list, sortAsc.value)
  }
  noteList.value = list;
  console.log('setList', sortAsc.value);
}
const setAllNoteList = (list: NoteModel[]) => {
  allNoteList = list || []
  setNoteList();
}

// listening to global list change
listNoteStore().$subscribe(() => {
  console.log('listNoteStore$subscribe');
  setAllNoteList(listNoteStore().cloneNoteList());
})

// request list on init
onMounted(async () => {
  const list = await noteService.getNotes()
  listNoteStore().resetListValue(list);
})

// note click impl
const noteClick = (id: number) => {
  console.log('noteClick', id);
  selectedNoteStore().resetNoteValue(id);
}

// note delete impl
const noteDeleteClick = async (id: number) => {
  console.log('noteDeleteClick', id);
  const newList = await noteService.deleteNote(id)
  // refresh note list
  listNoteStore().resetListValue(newList);
  // remove from selected
  if (selectedNoteStore().selectedNoteId === id) {
    selectedNoteStore().resetNoteValue();
  }
}

// sort click impl
const sortListByTitleClick = () => {
  if (sortingByTitle.value) {
    noteList.value = noteList.value.reverse();
    sortAsc.value = !sortAsc.value;
  } else {
    noteHelper.sortNoteListByTitle(noteList.value);
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
    noteHelper.sortNoteListByCreatedAtDate(noteList.value);
    sortingByDate.value = true
    sortAsc.value = true
  }
  if (sortingByTitle.value) {
    sortingByTitle.value = false;
  }
  console.log('sortListByDateClick', sortAsc.value);
}

</script>
