import { ref } from 'vue'
import { defineStore } from 'pinia'
import { NoteModel } from '@/models/NoteModel'

export const selectedNoteStore = defineStore('selectingNoteStore', () => {
  const selectedNote = ref(new NoteModel())
  const resetNoteValue = (note?: NoteModel) => {
    selectedNote.value = note || new NoteModel()
  }
  return { selectedNote, resetNoteValue }
})

export const listNoteStore = defineStore('listNoteStore', () => {
  const noteList = ref<NoteModel[]>([])
  const resetListValue = (list?: NoteModel[]) => {
    noteList.value = list || []
  }
  return { noteList, resetListValue }
})
