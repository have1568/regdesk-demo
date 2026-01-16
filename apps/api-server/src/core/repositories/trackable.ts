import { Document, FilterQuery, Model } from 'mongoose';
import { PageResult } from "../response/base.response";


export abstract class TrackableRepository<T extends Document> {
    protected constructor(protected readonly model: Model<T>) {}

    /** 根据 ID 查询单个文档 */
    async findById(id: string): Promise<T | null> {
        const doc = await this.model.findById(id).exec();
        return doc ? doc.toObject() as T : null;
    }


    async create(entity: Partial<T>): Promise<T> {
        const doc = await this.model.create(entity);
        return doc.toObject() as T;
    }


    async update(id: string, entity: Partial<T>): Promise<T | null> {
        const doc = await this.model
            .findByIdAndUpdate(id, entity, { new: true })
            .exec();
        return doc ? doc.toObject() as T : null;
    }


    async delete(id: string): Promise<T | null> {
        const doc = await this.model.findByIdAndDelete(id).exec();
        return doc ? doc.toObject() as T : null;
    }


    async findAll(filter: FilterQuery<T> = {}, sort: any = { createdAt: -1 }): Promise<T[]> {
        const docs = await this.model.find(filter).sort(sort).exec();
        return docs.map(doc => doc.toObject() as T);
    }


    async findByPage(
        filter: FilterQuery<T> = {},
        page_index = 1,
        page_size = 30,
        sort: any = { createdAt: -1 },
    ): Promise<PageResult<T>> {
        const skip = (page_index - 1) * page_size;

        const [itemsDocs, total] = await Promise.all([
            this.model.find(filter).sort(sort).skip(skip).limit(page_size).exec(),
            this.model.countDocuments(filter).exec(),
        ]);

        const items = itemsDocs.map(doc => doc.toObject() as T);

        return {
            items,
            total,
            page_index,
            page_size,
            total_pages: Math.ceil(total / page_size),
        };
    }
}
