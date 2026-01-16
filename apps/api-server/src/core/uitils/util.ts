export function definedProperty(target: any, property: string, value: any) {
    Reflect.defineProperty(target, property, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
}
