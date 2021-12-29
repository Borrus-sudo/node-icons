<!-- DO NOT REMOVE - contributor_list:data:start:["Borrus-sudo"]:end -->

# 🍱 node-icons

[![All Contributors](https://img.shields.io/github/contributors/Borrus-sudo/node-icons?color=orange)](#contributors-)
![License](https://img.shields.io/github/license/Borrus-sudo/node-icons?label=License)
![Last Commit](https://img.shields.io/github/last-commit/Borrus-sudo/node-icons?label=Last%20Commit)
![Stars](https://img.shields.io/github/stars/Borrus-sudo/node-icons)
![Forks](https://img.shields.io/github/forks/Borrus-sudo/node-icons)

## Usage

Checkout its [unit tests](./test/index.test.ts) to see complete usage with output!

```ts
import Icons from "node-icons";
const icons = Icons({
  // auto installs the collection set of an icon if not already installed
  installPkg: true,
  alias: new Map(),
  prefix: "lucide",
  separator: ":",
});
const result = await icons.iconify("This is cool right! ::activity::", {
  // The `styles` object's key value pair are appended as attributes to the svg
  styles: {
    width: 100,
    color: `"red"`, // it is important to have quotes for those values which need them like color="red"
  },
  base64: false,
});
```

The `Icon({})` function expects an object of type [config](./lib/types.ts).
The object returned by it has 2 methods

```ts
type returnVal = {
  getIcons(iconName: any, styles: any, base64: boolean): Promise<string>;
  getIconsSync(iconName: any, styles: any, base64: boolean): string;
  iconify(
    text: string,
    options: {
      styles: object;
      base64: boolean;
    },
    regex?: RegExp,
  ): Promise<string>;
};
```
_With `getIconsSync`, auto installing icons is not possible._

## Installation

`npm i node-icons` or `yarn add node-icons` to install.

`npm i @iconify/json` to install all icons or `npm i @iconify-json/<collection-id>` to install a specific icon set.

## 🎉 Contributing

Contributions are welcome! Whether it is a small documentation change or a breaking feature, we welcome it!

_Please note: All contributions are taken under the MIT license_

<!-- prettier-ignore-start -->
<!-- DO NOT REMOVE - contributor_list:start -->
## 👥 Contributors


- **[@Borrus-sudo](https://github.com/Borrus-sudo)**

<!-- DO NOT REMOVE - contributor_list:end -->
<!-- prettier-ignore-end -->
