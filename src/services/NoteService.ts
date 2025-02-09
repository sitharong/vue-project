import type { NoteModel } from '@/models/NoteModel'
import axios from 'axios'

class NoteService {
  //set in properties file
  private readonly endpoint = '//localhost:5123/api/note'

  async getNotes() {
    const res = await axios.get<NoteModel[]>(`${this.endpoint}/list`)
    return res?.data || []
  }

  async getNote(id: number) {
    const res = await axios.get<NoteModel>(`${this.endpoint}/${id}`)
    const note = res.data
    if (note?.id) {
      note.hasFullDetail = true
    }
    return note
  }

  async addNote(data: NoteModel) {
    const res = await axios.post<NoteModel[]>(this.endpoint, data)
    return res?.data
  }

  async updateNote(data: NoteModel) {
    const res = await axios.put<NoteModel[]>(this.endpoint, data)
    return res?.data
  }

  async deleteNote(id: number) {
    const res = await axios.delete<NoteModel[]>(`${this.endpoint}/${id}`)
    return res?.data
  }
}

export const noteService = new NoteService()
