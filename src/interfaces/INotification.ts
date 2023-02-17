export enum NotificationType {
    SUCCESS,
    FAIL,
    ATENTION
}

export interface INotification {
    title: string
    text: string
    type: NotificationType
    id: number
}