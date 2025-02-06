import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { NoteModel } from '@/models/NoteModel'
import { noteService } from '@/services/NoteService'

export const noteStore = defineStore('noteStore', () => {
  const selectedNote = ref({} as NoteModel)
  const setSelectedNote = async (id: number) => {
    selectedNote.value = (await noteService.getNote(id)) || {}
  }

  return { selectedNote, setSelectedNote }
})
