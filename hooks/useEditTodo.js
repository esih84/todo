import { create } from 'zustand'

const useEditTodo = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),

}))

export default useEditTodo