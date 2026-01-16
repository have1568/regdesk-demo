import { definedProperty } from "../uitils/util";
import _ from "lodash";
import { ObjectId } from "mongoose";

export enum SchemaScope {
    Detail = "Detail",
    Reference = "Reference",
    Both = "Both"
}

export function scope(scope: SchemaScope) {
    return function (target: any, name: string) {
        if (scope === SchemaScope.Detail || scope === SchemaScope.Both) {
            if (_.isNil(target.detailParamArr)) {
                definedProperty(target, "detailParamArr", []);
            }

            target.detailParamArr = _.clone(target.detailParamArr);
            target.detailParamArr.push(name);
        }
        if (scope === SchemaScope.Reference || scope === SchemaScope.Both) {
            if (_.isNil(target.referenceParamArr)) {
                definedProperty(target, "referenceParamArr", []);
            }

            target.referenceParamArr = _.clone(target.referenceParamArr);
            target.referenceParamArr.push(name);
        }
    };
}


interface Mapping {
    defineMetadata<E>(resolver: (entity: E, options?: SchemaOptions) => any): any;

    defineMetadata<E, R>(resolver: (entity: E, reference: R) => any): any;

    defineMetadata<E, R>(resolver: (entity: E, reference?: R, options?: any) => any): any;

    defineMetadata<E, R, O>(resolver: (entity: E, reference?: R, options?: O) => any): any;

    defineMetadata(resolver: (entity: any, reference?: any, options?: any) => any): any;
}

class SchemaMapping implements Mapping {
    private constructor() {
    }

    public static create(): Mapping {
        return new SchemaMapping();
    }

    defineMetadata<E>(resolver: (entity: E, options?: SchemaOptions) => any): any;

    defineMetadata<E, R>(resolver: (entity: E, reference: R) => any): any;

    defineMetadata<E, R>(resolver: (entity: E, reference?: R, options?: SchemaOptions) => any): any;

    defineMetadata<E, R, O>(resolver: (entity: E, reference?: R, options?: O) => any): any;

    defineMetadata(resolver: (entity: any, reference?: any, options?: any) => any): any {
        return function (target: any, propertyKey: string) {
            Reflect.defineMetadata(propertyKey, resolver, target, propertyKey);
        };
    }
}

export const mapping = SchemaMapping.create().defineMetadata;

export interface SchemaOptions {

}

export interface SchemaResource {
    [key: string]: any;
}

export interface SchemaReference {
    [key: string]: any;
}

export class BaseSchema<TResource, TReference extends SchemaReference = SchemaReference, TOptions extends SchemaOptions = SchemaOptions> {

    public id?: string;

    public detailParamArr?: string[];

    public referenceParamArr?: string[];

    public entity?: Partial<TResource>;

    public reference?: unknown;

    public _options?: TOptions;

    constructor(entity: TResource, url?: string, reference?: TReference, options?: TOptions) {
        this.entity = { ...entity, ...reference };
        this.reference = reference;
        this._options = options;
        const proto = Object.getPrototypeOf(this);
        if (proto.detailParamArr) this.detailParamArr = [...proto.detailParamArr];
        if (proto.referenceParamArr) this.referenceParamArr = [...proto.referenceParamArr];
    }

    public toDetail(): this {
        this.id = _.get(this.entity, "_id")?.toString();
        if (!_.isEmpty(this.detailParamArr)) {
            this.detailParamArr?.forEach((item) => {
                this._definedProperty(item);
            });
        }

        Reflect.deleteProperty(this, "entity");
        Reflect.deleteProperty(this, "reference");
        Reflect.deleteProperty(this, "referenceParamArr");
        Reflect.deleteProperty(this, "detailParamArr");
        Reflect.deleteProperty(this, "_options");
        return this;
    }

    public toReference(): this {
        this.id = _.get(this.entity, "_id")?.toString();
        if (!_.isNil(this.referenceParamArr)) {
            this.referenceParamArr.forEach((item) => {
                this._definedProperty(item);
            });
        }

        Reflect.deleteProperty(this, "entity");
        Reflect.deleteProperty(this, "reference");
        Reflect.deleteProperty(this, "referenceParamArr");
        Reflect.deleteProperty(this, "detailParamArr");
        Reflect.deleteProperty(this, "_options");
        return this;
    }

    private _definedProperty(name: string) {
        if (Reflect.hasMetadata(name, this, name)) {
            const mapping = Reflect.getMetadata(name, this, name);
            const value = mapping.call(this, this.entity, this.reference, this._options);
            definedProperty(this, name, value === undefined ? null : value);
        }
        else {
            definedProperty(this, name, this.entity![name] === undefined ? null : this.entity![name]);
        }
    }
}

export class PageResult<T> {

    readonly items: T[];
    readonly total: number;
    readonly page_index: number;
    readonly page_size: number;
    readonly total_pages: number;

    constructor(items: T[], total: number, page_index: number, page_size: number) {
        this.items = items;
        this.total = total;
        this.page_index = page_index;
        this.page_size = page_size;
        this.total_pages = Math.ceil(total / page_size);
    }

}


