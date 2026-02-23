export type ButtonEvent = {
    label?: string;
    buttonMarker?: string;
    conditionalMarker?: string;
};

export type ScriptEvent = {
    textEvent?: string;
    eventMarker?: string;
    buttonEvents?: ButtonEvent[];
};