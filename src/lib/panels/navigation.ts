export interface NavigationItem {
    url: string,
    name: string,
    isActiveWhen: () => boolean
}