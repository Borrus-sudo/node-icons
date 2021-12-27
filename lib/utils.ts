import { installPackage } from "@antfu/install-pkg";

const mode = process.env.NODE_ENV || "developement";

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
  if (installPkg && mode !== "developement") {
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
