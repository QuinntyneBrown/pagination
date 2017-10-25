export function Mixin(options: { behaviors: Function[] }) {
    return function (derivedCtor: Function) {
        options.behaviors.map(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).map(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    };
}