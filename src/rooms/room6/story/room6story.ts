export interface BookPage {
    title: string;
    text: string;
    hasPrev?: boolean;
    hasNext?: boolean;
    isEscape?: boolean;
}

export const room6Book: BookPage[] = [
    {
        title: 'The Mysterious Book',
        text: 'This is the end, enter to escape.',
        hasNext: true
    },
    {
        title: 'Part I',
        text: 'Strange Woods tightens around you as an old stone awakens. Two marks glow faintly. One speaks of wandering close to the earth, carrying life step by step through mud and roots. The other whispers of currents and scales shaped by water. You offer the [__________] and the [__________], and the forest listens.',
        hasPrev: true,
        hasNext: true
    },
    {
        title: 'Part II',
        text: 'The path opens to a second carving, higher now, where escape is measured in height and lightness. One mark demands a way upward beyond grasping branches. The other is weightless, etched as if by wind alone. You place the [__________] and the [__________]. The trees shift. Air stirs.',
        hasPrev: true,
        hasNext: true
    },
    {
        title: 'Part III',
        text: 'At the forest’s core, power and freedom wait together. A violet scar pulses like a living crystal, resisting your touch. Beside it rests a simple promise of release, shaped to turn and open. When you set the [__________] and use the [__________], Strange Woods finally lets go.',
        hasPrev: true,
        isEscape: true
    }
];