import { installPackage } from "@antfu/install-pkg";
import { createRequire } from "module";

const mode = process.env.NODE_ENV || "development";

export const requireIso = createRequire(import.meta.url);

export function pkgExists(pkgPath): boolean {
  try {
    requireIso.resolve(pkgPath);
    return true;
  } catch (e) {
    return false;
  }
}
export async function installedPkg(
  pkgPath: string,
  installPkg: boolean,
): Promise<boolean> {
  if (pkgExists(pkgPath)) {
    return true;
  }
  if (installPkg && mode === "development") {
    try {
      await installPackage(pkgPath, { silent: true });
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}
export function appendAttributes(
  svg: string,
  styles: Object,
  base64: boolean,
): string {
  let stylesProperty = ``;
  let tag = base64 ? "img" : "svg";
  Object.entries(styles).forEach(([key, value]) => {
    if (base64) stylesProperty += `${key}:${value};`;
    else stylesProperty += `${key}=${value} `;
  });
  let finalSvg = `<${tag}`;
  finalSvg += base64
    ? ` style="${stylesProperty}" src="data:image/svg+xml;utf8,${encodeSvg(
        svg,
      )}">`
    : ` ${stylesProperty}> ${svg}`;
  finalSvg += `</${tag}>`;
  return finalSvg;
}

export async function replaceAsync(str, regex, asyncFn) {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
}

// https://bl.ocks.org/jennyknuth/222825e315d45a738ed9d6e04c7a88d0
function encodeSvg(svg: string) {
  return svg
    .replace(
      "<svg",
      ~svg.indexOf("xmlns")
        ? "<svg"
        : '<svg xmlns="http://www.w3.org/2000/svg"',
    )
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E");
}
