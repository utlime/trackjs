declare type TrackJSInstallOptions = {
    capture?: boolean;
    size?: number;
};
export declare class TrackJS {
    private static capture;
    private static queue?;
    static install({ capture, size }: TrackJSInstallOptions): void;
    private static sendError;
    private static sendUsage;
    static onError(error: string): void;
    static enable(): void;
}
export {};
