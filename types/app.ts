export interface App {
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    appContent?: AppContent;
}

export interface AppContent{
    [key: string]: AppContentItem;
}

export enum AppContentItemType{
    component,
    function,
}

export interface AppContentItem{
    type: AppContentItemType;
    content: AppContentItemContent;
}

export interface AppContentItemContent{
    [key: string]: AppContentItemContentValue
}

export type AppContentItemContentValue = string | number | boolean | AppContentItemContent;

export type AppRecentlyCreated = Omit<App, "appContent">;
