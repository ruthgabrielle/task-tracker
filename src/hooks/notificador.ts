import { NotificationType } from '@/interfaces/INotification'
import { store } from '@/store'
import { NOTIFY } from '@/store/mutation-type'

type Notificador = {
  notify: (type: NotificationType, title: string, text: string) => void
}

export default (): Notificador => {
  const notify = (
    type: NotificationType,
    title: string,
    text: string
  ): void => {
    store.commit(NOTIFY, {
      title,
      text,
      type,
    })
  }

  return {
    notify,
  }
}
