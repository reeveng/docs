export function generatePath(path: string, options: Record<string, string> = {}): string {
    if (path.includes(":")) {
        const pathArray = path.split("/").map(item => {
            // substring starts from 1, due to the ":" being on position 0
            const itemWithoutFirstChar = item.substring(1)

            if (item.includes(":") && options[itemWithoutFirstChar]) {
                return options[itemWithoutFirstChar];
            } else if (item.includes(":")) {
                throw Error("this shouldn't happen, you forgot to pass a value to the generatePath function!!!! check it's usages")
            }

            return item;
        })

        return pathArray.join("/")
    }

    console.log("you used the generatePath function somewhere, where it wasn't called with options, kind of defeating its purpose, you can remove the function call there!")

    return path;
}