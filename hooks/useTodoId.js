import { create } from 'zustand'

const useTodoId = create((set) => ({
    id: '',
    body:'',
    setId: (id) => set(() => ({ id: id })),
    setBody: (body) => set(() => ({ body: body })),

}))

export default useTodoId  