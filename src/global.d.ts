declare module '*.module.scss' {
    interface IClassesNames {
        [className: string]: string
    }
    const classNames: IClassesNames
    export = classNames
}
