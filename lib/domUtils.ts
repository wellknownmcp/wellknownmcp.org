import type { CheerioAPI } from "cheerio";

export function cleanDataAttributes(el: any, $: any) {
  if (typeof el === "object" && el !== null && "attribs" in el) {
    const attribs = (el as any).attribs as Record<string, string>;
    Object.keys(attribs).forEach(attr => {
      if (attr.startsWith("data-")) $(el).removeAttr(attr);
    });
  }
}
