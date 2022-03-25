
export interface ISubInterface {
    subProperty1: number;
    subProperty2: string;
    subProperty3: any;
}

export interface IBigInterface {
    property1: ISubInterface;
    property2: number[];
}