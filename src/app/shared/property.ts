import { LitHTMLBehavior } from "./lit-html.behavior";

export function property() {
    return (target: LitHTMLBehavior, propertyKey) => {
        Object.defineProperty(target, propertyKey,
            {
                get: function () { return target[`_${propertyKey}`]; },
                set: function (value) {
                    target.invalidate();
                    target[`_${propertyKey}`] = value;
                }
            });
    }
}