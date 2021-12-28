<!-- DO NOT REMOVE - contributor_list:data:start:["Borrus-sudo"]:end -->

# 🍕 node-icons

[![All Contributors](https://img.shields.io/github/contributors/Borrus-sudo/node-icons?color=orange)](#contributors-)
![License](https://img.shields.io/github/license/Borrus-sudo/node-icons?label=License)
![Last Commit](https://img.shields.io/github/last-commit/Borrus-sudo/node-icons?label=Last%20Commit)
![Stars](https://img.shields.io/github/stars/Borrus-sudo/node-icons)
![Forks](https://img.shields.io/github/forks/Borrus-sudo/node-icons)

## Usage

```ts
import Icons from "node-icons";
const icons = Icons({
  // will install the called icon pkg if it is not installed
  installPkg: true,
  alias: new Map(),
  prefix: "lucide",
  separator: ":",
});
const result = await icons.iconify("This is cool right! ::activity::", {
  styles: {},
  base64: false,
});
```

## 🎉 Contributing

Contributions are welcome! Whether it is a small documentation change or a breaking feature, we welcome it!

_Please note: All contributions are taken under the MIT license_

<!-- prettier-ignore-start -->
<!-- DO NOT REMOVE - contributor_list:start -->
## 👥 Contributors


- **[@Borrus-sudo](https://github.com/Borrus-sudo)**

<!-- DO NOT REMOVE - contributor_list:end -->
<!-- prettier-ignore-end -->
