export interface Item {
    id: string,
    subItems: SubItem[]
}

export interface SubItem {
    id: number,
    status: ProcessingStatus
}

export enum ProcessingStatus {
    Created = 0,
    InPorgress,
    Complete
}