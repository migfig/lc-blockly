export enum eRunMode {
    Local = 1,
    Remote = 2
}

export type IStoreContext = {
    getApplications(): IApplication[],
    setApplications(apps: IApplication[]): void,
    getSelectedApplicationId(): string,
    setSelectedApplicationId(id: string): void,
    getTopMenu(): ITopMenu[],
    getLeftMenu(): ILeftMenu[],
    setLeftMenu(menu: ILeftMenu[]): void,
}

export type IApiContext = {
    buildLangChain(elements: any): Promise<string>,
}

export type IDataContext = {
    store: IStoreContext,
    api: IApiContext,
    whoAmI: string,
}

export type IApplication = {
    name: string
    id: string
    content: string
    json: any
}

export type IOption = {
    name: string
    label: string
    link: string
    icon: any
    app: IApplication
}

export type ITopMenu = {
    label: string
    link: string
    icon: any
    options: IOption[] | undefined
}

export type ILeftMenu = {
    label: string
    link: string
    icon: any
    items: IApplication[] | undefined
}

export type IBlockProperty = {
    propertyName: string
    fieldName: string
    isVariable: boolean | undefined
    transform: any | undefined
    assignment: any | undefined
}

export type IStatement = {
    fieldName: string
    isArray: boolean
}

export type IOutput = {
    type: string
    order: number
    content: string
    source: any
}

export type IAppProp = {
    name: string
    value: any
}

export type ICustomWindow = {
    window: Window
    output: IOutput[]
    appProps: IAppProp[]
}
