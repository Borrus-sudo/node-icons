interface Config {
    installPkg: boolean;
    alias: Map<string, string>;
    prefix: string;
    separator: string;
}

declare function export_default(config?: Partial<Config>): {
    getIcons(iconName: any, styles: any, base64: boolean): Promise<string>;
    getIconsSync(iconName: any, styles: any, base64: boolean): string;
    iconify(text: string, options: {
        styles: object;
        base64: boolean;
    }, regex?: RegExp): Promise<string>;
};

export { export_default as default };
