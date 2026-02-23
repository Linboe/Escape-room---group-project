export type ButtonEvent = {
    label?: string;
    buttonMarker?: string;
    conditional?: boolean;
    conditionalMarker?: string;
};

export type ScriptEvent = {
    textEvent?: string;
    eventMarker?: string;
    buttonEvents?: ButtonEvent[];
};