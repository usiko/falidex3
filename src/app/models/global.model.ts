export interface ILoadingBarState {
    enable: boolean;
    error?: boolean;
    value?: number;
    buffer?: number;
    message?: string;
}
