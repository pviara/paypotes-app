export interface Notification {
    readonly type: 'success' | 'error';
    readonly message: string;
}
