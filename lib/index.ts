import {
  appendAttributes,
  installedPkg,
  pkgExists,
  replaceAsync,
  encodeSvg,
} from "./utils";
import { Config } from "./types";
export default function (
  config: Config = {
    installPkg: true,
    alias: new Map(),
    prefix: "",
    separator: ":",
  },
) {
  const main = {
    async getIcons(iconName, styles, base64: boolean): Promise<string> {
      if (config.alias.has(iconName)) {
        iconName = config.alias.get(iconName);
      }
      if (config.prefix !== "")
        iconName = config.prefix + config.separator + iconName;
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
      if (rawSvg === "") return base64 ? `data:image/svg+xml;utf8,}` : rawSvg;

      const result = appendAttributes(rawSvg, styles);
      return base64 ? `data:image/svg+xml;utf8,${encodeSvg(result)}}` : result;
    },
    async iconify(
      text: string,
      options: { styles: object; base64: boolean },
      regex: RegExp = /::(.*?)::/g,
    ): Promise<string> {
      const result = await replaceAsync(
        text,
        regex,
        async (fullText, payload) => {
          const iconSvg = await main.getIcons(
            payload,
            options.styles,
            options.base64,
          );
          return iconSvg === "" ? fullText : iconSvg;
        },
      );
      return result;
    },
  };
  return main;
}
