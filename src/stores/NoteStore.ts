import { ref } from 'vue'
import { defineStore } from 'pinia'
import { NoteModel } from '@/models/NoteModel'

export const selectedNoteStore = defineStore('selectingNoteStore', () => {
  const selectedNote = ref(new NoteModel())
  const resetNoteValue = (note?: NoteModel) => {
    selectedNote.value = note || new NoteModel()
  }
  /** reactive */
  const getSelectedNote = () => selectedNote.value
  /** non reactive */
  const cloneSelectedNote = () => ({ ...selectedNote.value })

  return { resetNoteValue, getSelectedNote, cloneSelectedNote, selectedNote }
})

export const listNoteStore = defineStore('listNoteStore', () => {
  const noteList = ref<NoteModel[]>([])
  const resetListValue = (list?: NoteModel[]) => {
    noteList.value = list || []
  }
  /** reactive */
  const getNoteList = () => noteList.value
  /** non reactive */
  const cloneNoteList = () => [...noteList.value]

  return { noteList, resetListValue, getNoteList, cloneNoteList }
})
