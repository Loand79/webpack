declare module '*.module.scss' {
    interface IClassesNames {
        [className: string]: string
    }
    const classNames: IClassesNames
    export = classNames
}

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";