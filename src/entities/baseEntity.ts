import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity<T> {
    protected _id: string;
    public props: T;

    constructor(parameters: T, id: string) {
        this._id = id ?? uuidv4();
        this.props = parameters;
    }
}
