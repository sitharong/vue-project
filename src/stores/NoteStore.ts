import { ref } from 'vue'
import { defineStore } from 'pinia'
import { NoteModel } from '@/models/NoteModel'

export const selectedNoteStore = defineStore('selectingNoteStore', () => {
  const selectedNote = ref(new NoteModel())
  const resetValue = (note?: NoteModel) => {
    selectedNote.value = note || new NoteModel()
  }
  return { selectedNote, resetValue }
})

export const listNoteStore = defineStore('listNoteStore', () => {
  const noteList = ref<NoteModel[]>([])

  return { noteList }
})
