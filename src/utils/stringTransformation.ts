export const toCssVar = (string: string, prependDoubleDash:boolean=false) => {
    string = (prependDoubleDash ? `--${string}` : string)
                .replace(/\//g, "--")
                .replace(/\s/g, '-')
                .replace(/\./g, '_')
                .toLowerCase();
    return string;
}
