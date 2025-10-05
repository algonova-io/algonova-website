import {computed, reactive} from "vue";

type ModalStore = {
    data: any,
    chatActive: boolean,
    contactActive: boolean,
}

const store = reactive<ModalStore>({
    data: '',
    chatActive: false,
    contactActive: false,
})

export const useModalStore = () => {
    const chatActive = computed(() => store.chatActive)
    const contactActive = computed(() => store.contactActive)
    const data = computed(() => store.data)
    function toggleChat() {
        store.chatActive = !store.chatActive
    }

    function toggleContact() {
        store.contactActive = !store.contactActive
    }

    function setData(data: any) {
        store.data = data
    }

    function closeAll() {
        store.chatActive = false
        store.contactActive = false
    }

    const isModalActive = computed(() => store.chatActive || store.contactActive)

    return {
        chatActive,
        contactActive,
        data,
        toggleChat,
        toggleContact,
        closeAll,
        setData,
        isModalActive,
    }
}