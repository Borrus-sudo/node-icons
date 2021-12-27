import {
  appendAttributes,
  installedPkg,
  pkgExists,
  replaceAsync,
} from "./utils";
import { Config } from "./types";
export default function (
  config: Config = {
    installPkg: true,
    beforeEach() {},
    alias: [],
    prefix: "",
    separator: ":",
  },
) {
  const main = {
    async getIcons(iconName, styles) {
      iconName = config.prefix + iconName;
      const [grp, icon] = iconName.split(config.separator);
      let possiblePkgPath1 = "@iconify/json/json/" + grp;
      let possiblePkgPath2 = "@iconify-json/" + grp;
      let pkgPath = "";
      let rawSvg = "";
      if (pkgExists(possiblePkgPath1)) {
        pkgPath = possiblePkgPath1;
      } else {
        const res = await installedPkg(possiblePkgPath2, config.installPkg);
        if (res) {
          pkgPath = possiblePkgPath2;
        }
      }
      if (pkgPath.length > 0) {
        const { icons } = require(possiblePkgPath1);
        for (let grpIcon of Object.keys(icons)) {
          if (grpIcon == icon) {
            rawSvg = icons[grpIcon].body || "";
          }
        }
      }
      return appendAttributes(rawSvg, styles);
    },
    async iconify(text: string, styles, regex: RegExp = /::(.*?)::/g) {
      return await replaceAsync(text, regex, async (_fullText, payload) => {
        return await main.getIcons(payload, styles);
      });
    },
  };
  return main;
}
