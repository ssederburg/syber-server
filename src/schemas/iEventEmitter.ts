export interface IEventEmitter {
    emit(source: string, body: any): void
}