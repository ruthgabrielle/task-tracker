import { NotificationType } from '@/interfaces/INotification'
import { NOTIFY } from '@/store/mutation-type'
import { store } from '@/store'

export const notificationMixin = {
  methods: {
    notify(type: NotificationType, title: string, text: string): void {
      store.commit(NOTIFY, {
        title,
        text,
        type,
      })
    },
  },
}
