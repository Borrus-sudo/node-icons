import Icons from "../lib";
describe("it should pass the tests", () => {
  it("tests the functionality of iconify", async () => {
    expect(2).toEqual(2);
    const icons = Icons();
    const returnVal = await icons.iconify(
      "This is awesome to do ig ::fa:amazon::",
      {
        styles: {
          width: 100,
          colour: `"red"`,
        },
        base64: true,
      },
    );
    expect(returnVal).toBe(
      `This is awesome to do ig <img style="width:100;colour:"red";" src="data:image/svg+xml;utf8,%3Cpath d='M1551 1476q15-6 26-3t11 17.5t-15 33.5q-13 16-44 43.5t-95.5 68t-141 74t-188 58T875 1792q-119 0-238-31t-209-76.5t-172.5-104t-132.5-105t-84-87.5q-8-9-10-16.5t1-12t8-7t11.5-2T61 1355q192 117 300 166q389 176 799 90q190-40 391-135zm207-115q11 16 2.5 69.5T1732 1533q-34 83-85 124q-17 14-26 9t0-24q21-45 44.5-121.5t6.5-98.5q-5-7-15.5-11.5t-27-6t-29.5-2.5t-35 0t-31.5 2t-31 3t-22.5 2q-6 1-13 1.5t-11 1t-8.5 1t-7 .5h-10l-3-.5l-2-1.5l-1.5-3q-6-16 47-40t103-30q46-7 108-1t76 24zm-394-443q0 31 13.5 64t32 58t37.5 46t33 32l13 11l-227 224q-40-37-79-75.5t-58-58.5l-19-20q-11-11-25-33q-38 59-97.5 102.5T860 1332t-140 23t-137.5-21t-117.5-65.5t-83-113T351 993q0-84 28-154t72-116.5t106.5-83t122.5-57T810 548t119.5-18.5t99.5-6.5V396q0-65-21-97q-34-53-121-53q-6 0-16.5 1T830 259t-56 29.5t-56 59.5t-48 96l-294-27q0-60 22-119t67-113t108-95t151.5-65.5T915 0q100 0 181 25t129.5 61.5t81 83t45 86T1364 329v589zm-672 21q0 86 70 133q66 44 139 22q84-25 114-123q14-45 14-101V708q-59 2-111 12t-106.5 33.5t-87 71T692 939z' fill='currentColor'/%3E"></img>`,
    );
  });
  it("tests the functionality of getIcons", async () => {
    const icons = Icons();
    const iconSvg = await icons.getIcons("lucide:activity", {}, false);
    expect(iconSvg).toBe(
      `<svg > <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></g></svg>`,
    );
  });
  it("tests further functionality", async () => {
    const icons = Icons({
      installPkg: true,
      alias: new Map(),
      prefix: "lucide",
      separator: ":",
    });
    const result = await icons.iconify("This is cool right! ::activity::", {
      styles: {},
      base64: false,
    });
    expect(result).toBe(
      `This is cool right! <svg > <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></g></svg>`,
    );
  });
});
