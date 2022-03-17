import { v4 as uuid } from 'uuid';

export abstract class BaseEntity<T> {
    protected _id: string;
    public props: T;

    constructor(props: T, id?: string) {
        this._id = id ?? uuid();
        this.props = props;
    }
}
