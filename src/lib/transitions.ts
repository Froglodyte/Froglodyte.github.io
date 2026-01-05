import {cubicOut} from 'svelte/easing';

export function slideWithFade(node: Element, { duration = 500 }) {
    return {
        duration,
        css: (t: number) => {
            const eased = cubicOut(t);
            return `
                transform: translateX(${(1 - eased) * 100}%);
                position: absolute;
                width: 100%;
            `;
        }
    };
}
