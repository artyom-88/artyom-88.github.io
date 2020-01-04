import { IJson } from '../Interface/IJson';
import IPageData from '../Interface/IPageData';
import ISource from '../Interface/ISource';

export default class JsonSource<TPageData extends IPageData> implements ISource<TPageData> {
    private readonly items: TPageData[] = [];

    constructor({ data }: IJson<TPageData>) {
        this.items = data;
    }

    public async getData(): Promise<TPageData[]> {
        return Promise.resolve(this.items);
    }
}