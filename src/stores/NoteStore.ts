import { ref } from 'vue'
import { defineStore } from 'pinia'
import { NoteModel } from '@/models/NoteModel'

export const selectedNoteStore = defineStore('selectingNoteStore', () => {
  const selectedNoteId = ref(0)
  const resetNoteValue = (id?: number) => {
    selectedNoteId.value = id || 0
  }

  return { selectedNoteId, resetNoteValue }
})

export const listNoteStore = defineStore('listNoteStore', () => {
  const noteList = ref<NoteModel[]>([])
  const resetListValue = (list?: NoteModel[]) => {
    noteList.value = list || []
  }
  /** reactive */
  const getNoteList = () => noteList.value
  /** non reactive */
  const cloneNoteList = () => noteList.value.map((n) => ({ ...n }))

  return { noteList, resetListValue, getNoteList, cloneNoteList }
})
