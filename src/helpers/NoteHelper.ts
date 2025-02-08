import type { NoteModel } from '@/models/NoteModel'

class NoteHelper {
  /** sort list by title */
  sortNoteListByTitle(list: NoteModel[], sortAsAsc = true) {
    if (sortAsAsc) {
      return list.sort((note1, note2) => note1.title.localeCompare(note2.title))
    }
    return list.sort((note1, note2) => note2.title.localeCompare(note1.title))
  }

  /** sort list by created_at */
  sortNoteListByCreatedAtDate(list: NoteModel[], sortAsAsc = true) {
    if (sortAsAsc) {
      return list.sort((note1, note2) => note1.created_at.localeCompare(note2.created_at))
    }
    return list.sort((note1, note2) => note2.created_at.localeCompare(note1.created_at))
  }

  /** filter list by title includes search text */
  filterNoteListByTitle(list: NoteModel[], searchStr?: string) {
    const s = searchStr?.trim()
    if (s) {
      return list.filter((note) => note.title.includes(s))
    }
    return list
  }
}

export const noteHelper = new NoteHelper()
