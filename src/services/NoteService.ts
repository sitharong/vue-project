import type { NoteModel } from '@/models/NoteModel'
import { userService } from './UserService'

class NoteService {
  private readonly endpoint = `${userService.endpoint}/note`

  private get req() {
    return userService.reqClient
  }

  async getNotes() {
    const res = await this.req.get<NoteModel[]>(`${this.endpoint}/list`)
    return res?.data || []
  }

  async getNote(id: number) {
    const res = await this.req.get<NoteModel>(`${this.endpoint}/${id}`)
    const note = res.data
    if (note?.id) {
      note.hasFullDetail = true
    }
    return note
  }

  async addNote(data: NoteModel) {
    const res = await this.req.post<NoteModel[]>(this.endpoint, data)
    return res?.data
  }

  async updateNote(data: NoteModel) {
    const res = await this.req.put<NoteModel[]>(this.endpoint, data)
    return res?.data
  }

  async deleteNote(id: number) {
    const res = await this.req.delete<NoteModel[]>(`${this.endpoint}/${id}`)
    return res?.data
  }
}

export const noteService = new NoteService()
