export function Mixin(options: { baseCtors: Function[] }) {
    return function (derivedCtor: Function) {
        options.baseCtors.map(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).map(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    };
}