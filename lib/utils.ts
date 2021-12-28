import { installPackage } from "@antfu/install-pkg";

const mode = process.env.NODE_ENV || "development";

export function pkgExists(pkgPath): boolean {
  try {
    require.resolve(pkgPath);
    return true;
  } catch (e) {
    return false;
  }
}
export async function installedPkg(
  pkgPath: string,
  installPkg: boolean,
): Promise<boolean> {
  let flag = true;
  if (pkgExists(pkgPath)) {
    return flag;
  }
  if (installPkg && mode !== "development") {
    try {
      await installPackage(pkgPath, { silent: true });
      return true;
    } catch (e) {
      return false;
    }
  } else {
    flag = false;
  }
  return flag;
}
export function appendAttributes(svg, styles): string {
  let finalSvg = `<svg`;
  Object.entries(styles).forEach(([key, value]) => {
    finalSvg += ` ${key}="${value}"`;
  });
  finalSvg += `> ${svg}`;
  finalSvg += `</svg>`;
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
export function encodeSvg(svg: string) {
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
