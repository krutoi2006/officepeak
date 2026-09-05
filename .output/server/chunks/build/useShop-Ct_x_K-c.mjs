globalThis.__timing__.logStart('Load chunks/build/useShop-Ct_x_K-c');import { computed, ref } from 'vue';
import { I as klona, J as getRequestHeader, d as destr, K as isEqual, L as setCookie, M as getCookie, N as deleteCookie } from '../_/nitro.mjs';
import { d as useNuxtApp } from './server.mjs';
import { u as useState } from './state-tqLlnwND.mjs';

const NullObject = /* @__PURE__ */ (() => {
  const C = function() {
  };
  C.prototype = /* @__PURE__ */ Object.create(null);
  return C;
})();
function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = new NullObject();
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const unsplash = (id, width = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=86`;
const demoMedia = {
  hero: [
    unsplash("photo-1497366811353-6870744d04b2", 2200),
    unsplash("photo-1497366754035-f200968a6e72", 2200),
    unsplash("photo-1497366216548-37526070297c", 2200)
  ],
  executive: unsplash("photo-1524758631624-e2822e304c36"),
  staff: unsplash("photo-1497366216548-37526070297c"),
  meeting: unsplash("photo-1572025442646-866d16c84a54"),
  reception: unsplash("photo-1497366754035-f200968a6e72"),
  chairs: unsplash("photo-1505843490538-5133c6c7d0e1"),
  waiting: unsplash("photo-1555041469-a586c61ea9bc"),
  kitchen: unsplash("photo-1556912167-f556f1f39fdf"),
  acoustic: unsplash("photo-1598928506311-c55ded91a20c"),
  storage: unsplash("photo-1595515106969-1ce29566ff1c"),
  adjustable: unsplash("photo-1518455027359-f3f8164ba6bd"),
  metal: unsplash("photo-1538688423619-a81d3f23454b"),
  project: unsplash("photo-1497366754035-f200968a6e72"),
  detail: [
    unsplash("photo-1518455027359-f3f8164ba6bd"),
    unsplash("photo-1497366216548-37526070297c"),
    unsplash("photo-1497366754035-f200968a6e72")
  ]
};
const image = (src, alt) => ({ src, alt });
const color = (id, name, hex, material) => ({ id, name, hex, material });
const size = (width, depth, height) => ({
  width,
  depth,
  height,
  label: `${width} \xD7 ${depth} \xD7 ${height} \u043C\u043C`
});
const palette = {
  oak: color("oak", "\u0414\u0443\u0431 \u043D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u044B\u0439", "#B89466", "\u041B\u0414\u0421\u041F"),
  lightOak: color("light-oak", "\u0414\u0443\u0431 \u0441\u0432\u0435\u0442\u043B\u044B\u0439", "#D8C3A0", "\u041B\u0414\u0421\u041F"),
  walnut: color("walnut", "\u041E\u0440\u0435\u0445", "#6D4935", "\u0428\u043F\u043E\u043D"),
  graphite: color("graphite", "\u0413\u0440\u0430\u0444\u0438\u0442", "#4B4D4C", "\u041F\u043E\u0440\u043E\u0448\u043A\u043E\u0432\u0430\u044F \u043E\u043A\u0440\u0430\u0441\u043A\u0430"),
  black: color("black", "\u0427\u0451\u0440\u043D\u044B\u0439", "#1D1D1D", "\u041C\u0435\u0442\u0430\u043B\u043B"),
  white: color("white", "\u0411\u0435\u043B\u044B\u0439", "#F0F0EC", "\u041B\u0414\u0421\u041F"),
  grey: color("grey", "\u0421\u0435\u0440\u044B\u0439 \u043C\u0435\u043B\u0430\u043D\u0436", "#999B98", "\u0422\u043A\u0430\u043D\u044C"),
  green: color("green", "\u0425\u0432\u043E\u0439\u043D\u044B\u0439 \u0437\u0435\u043B\u0451\u043D\u044B\u0439", "#496459", "\u0422\u043A\u0430\u043D\u044C"),
  blue: color("blue", "\u0421\u0438\u043D\u0438\u0439", "#485B78", "\u0422\u043A\u0430\u043D\u044C")
};
const subcategories = {
  chairs: [
    ["executive-chairs", "\u041A\u0440\u0435\u0441\u043B\u0430 \u0434\u043B\u044F \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F"],
    ["staff-chairs", "\u041A\u0440\u0435\u0441\u043B\u0430 \u0434\u043B\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0430"],
    ["meeting-chairs", "\u041A\u0440\u0435\u0441\u043B\u0430 \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043E\u0432"],
    ["visitor-chairs", "\u0421\u0442\u0443\u043B\u044C\u044F \u0434\u043B\u044F \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439"],
    ["bar-stools", "\u0411\u0430\u0440\u043D\u044B\u0435 \u0441\u0442\u0443\u043B\u044C\u044F"]
  ],
  waiting: [
    ["sofas-armchairs", "\u0414\u0438\u0432\u0430\u043D\u044B \u0438 \u043A\u0440\u0435\u0441\u043B\u0430"],
    ["poufs", "\u041F\u0443\u0444\u044B"],
    ["coffee-tables", "\u0416\u0443\u0440\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0442\u043E\u043B\u044B"],
    ["coat-racks", "\u0412\u0435\u0448\u0430\u043B\u043A\u0438"],
    ["multi-seat", "\u041C\u043D\u043E\u0433\u043E\u043C\u0435\u0441\u0442\u043D\u044B\u0435 \u0441\u0435\u043A\u0446\u0438\u0438"],
    ["lounge-chairs", "\u041B\u0430\u0443\u043D\u0436-\u043A\u0440\u0435\u0441\u043B\u0430"]
  ],
  kitchen: [
    ["mini-kitchens", "\u041C\u0438\u043D\u0438-\u043A\u0443\u0445\u043D\u0438 \u0434\u043B\u044F \u043E\u0444\u0438\u0441\u0430"],
    ["modular-kitchens", "\u041C\u043E\u0434\u0443\u043B\u044C\u043D\u044B\u0435 \u043A\u0443\u0445\u043D\u0438"],
    ["custom-kitchens", "\u041A\u0443\u0445\u043D\u0438 \u043D\u0430 \u0437\u0430\u043A\u0430\u0437"],
    ["dining-chairs", "\u041E\u0431\u0435\u0434\u0435\u043D\u043D\u044B\u0435 \u0441\u0442\u0443\u043B\u044C\u044F"],
    ["dining-tables", "\u041E\u0431\u0435\u0434\u0435\u043D\u043D\u044B\u0435 \u0441\u0442\u043E\u043B\u044B"],
    ["bar-tables", "\u0411\u0430\u0440\u043D\u044B\u0435 \u0441\u0442\u043E\u043B\u044B"]
  ],
  acoustic: [
    ["acoustic-booths", "\u0410\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043A\u0430\u0431\u0438\u043D\u044B"],
    ["acoustic-screens", "\u0410\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u044D\u043A\u0440\u0430\u043D\u044B"],
    ["screen-dividers", "\u0410\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u044D\u043A\u0440\u0430\u043D\u044B-\u043F\u0435\u0440\u0435\u0433\u043E\u0440\u043E\u0434\u043A\u0438"],
    ["acoustic-cabins", "\u0410\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043A\u0430\u0431\u0438\u043D\u043A\u0438"],
    ["wall-panels", "\u041D\u0430\u0441\u0442\u0435\u043D\u043D\u044B\u0435 \u043F\u0430\u043D\u0435\u043B\u0438"],
    ["suspended-panels", "\u041F\u043E\u0434\u0432\u0435\u0441\u043D\u044B\u0435 \u043F\u0430\u043D\u0435\u043B\u0438 \u0438 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438"],
    ["floor-dividers", "\u041D\u0430\u043F\u043E\u043B\u044C\u043D\u044B\u0435 \u043F\u0435\u0440\u0435\u0433\u043E\u0440\u043E\u0434\u043A\u0438"],
    ["desk-screens", "\u041D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u044B\u0435 \u044D\u043A\u0440\u0430\u043D\u044B"]
  ],
  metal: [
    ["safes", "\u0421\u0435\u0439\u0444\u044B"],
    ["racks", "\u0421\u0442\u0435\u043B\u043B\u0430\u0436\u0438"],
    ["accounting-cabinets", "\u0411\u0443\u0445\u0433\u0430\u043B\u0442\u0435\u0440\u0441\u043A\u0438\u0435 \u0448\u043A\u0430\u0444\u044B"],
    ["office-cabinets", "\u0428\u043A\u0430\u0444\u044B \u0434\u043B\u044F \u043E\u0444\u0438\u0441\u0430"],
    ["locker-cabinets", "\u0428\u043A\u0430\u0444\u044B \u0434\u043B\u044F \u0440\u0430\u0437\u0434\u0435\u0432\u0430\u043B\u043E\u043A"],
    ["card-files", "\u041A\u0430\u0440\u0442\u043E\u0442\u0435\u043A\u0438"],
    ["metal-beds", "\u041C\u0435\u0442\u0430\u043B\u043B\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043A\u0440\u043E\u0432\u0430\u0442\u0438"],
    ["wardrobe-systems", "\u0413\u0430\u0440\u0434\u0435\u0440\u043E\u0431\u043D\u044B\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B"]
  ],
  project: [
    ["hotel-furniture", "\u041C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u0433\u043E\u0441\u0442\u0438\u043D\u0438\u0446"],
    ["home-furniture", "\u041C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u0434\u043E\u043C\u0430"],
    ["courtroom-furniture", "\u0421\u0443\u0434\u0435\u0431\u043D\u0430\u044F \u043C\u0435\u0431\u0435\u043B\u044C"]
  ]
};
const makeSubs = (items = []) => items.map(([slug, name]) => ({ id: slug, slug, name }));
const demoCategories = [
  { id: "executive-offices", slug: "executive-offices", name: "\u041A\u0430\u0431\u0438\u043D\u0435\u0442\u044B \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F", description: "\u041C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0430 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F.", image: image(demoMedia.executive, "\u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F"), subcategories: [] },
  { id: "staff-furniture", slug: "staff-furniture", name: "\u041C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0430", description: "\u0420\u0430\u0431\u043E\u0447\u0438\u0435 \u043C\u0435\u0441\u0442\u0430 \u0434\u043B\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u044B.", image: image(demoMedia.staff, "\u0420\u0430\u0431\u043E\u0447\u0435\u0435 \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u043E \u0434\u043B\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u044B"), subcategories: [] },
  { id: "meeting-areas", slug: "meeting-areas", name: "\u0417\u043E\u043D\u044B \u043F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043E\u0432", description: "\u0421\u0442\u043E\u043B\u044B \u0438 \u043A\u0440\u0435\u0441\u043B\u0430 \u0434\u043B\u044F \u0432\u0441\u0442\u0440\u0435\u0447.", image: image(demoMedia.meeting, "\u041F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043D\u0430\u044F \u043A\u043E\u043C\u043D\u0430\u0442\u0430"), subcategories: [] },
  { id: "reception-desks", slug: "reception-desks", name: "\u0421\u0442\u043E\u0439\u043A\u0438 \u0440\u0435\u0441\u0435\u043F\u0448\u043D", description: "\u0421\u0442\u043E\u0439\u043A\u0438 \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u043D\u043E\u0439 \u0437\u043E\u043D\u044B.", image: image(demoMedia.reception, "\u0421\u0442\u043E\u0439\u043A\u0430 \u0440\u0435\u0441\u0435\u043F\u0448\u043D \u0432 \u0441\u0432\u0435\u0442\u043B\u043E\u043C \u043E\u0444\u0438\u0441\u0435"), subcategories: [] },
  { id: "chairs", slug: "chairs", name: "\u041A\u0440\u0435\u0441\u043B\u0430 \u0438 \u0441\u0442\u0443\u043B\u044C\u044F", description: "\u041A\u0440\u0435\u0441\u043B\u0430 \u0438 \u0441\u0442\u0443\u043B\u044C\u044F \u0434\u043B\u044F \u043E\u0444\u0438\u0441\u0430.", image: image(demoMedia.chairs, "\u042D\u0440\u0433\u043E\u043D\u043E\u043C\u0438\u0447\u043D\u043E\u0435 \u043E\u0444\u0438\u0441\u043D\u043E\u0435 \u043A\u0440\u0435\u0441\u043B\u043E"), subcategories: makeSubs(subcategories.chairs) },
  { id: "waiting-areas", slug: "waiting-areas", name: "\u0417\u043E\u043D\u044B \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F", description: "\u041C\u044F\u0433\u043A\u0430\u044F \u043C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u0437\u043E\u043D \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F.", image: image(demoMedia.waiting, "\u041C\u044F\u0433\u043A\u0430\u044F \u043C\u0435\u0431\u0435\u043B\u044C \u0432 \u0437\u043E\u043D\u0435 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F"), subcategories: makeSubs(subcategories.waiting) },
  { id: "office-kitchens", slug: "office-kitchens", name: "\u041A\u0443\u0445\u043D\u0438 \u0434\u043B\u044F \u043E\u0444\u0438\u0441\u0430", description: "\u0413\u043E\u0442\u043E\u0432\u044B\u0435 \u043A\u0443\u0445\u043D\u0438 \u0434\u043B\u044F \u043E\u0444\u0438\u0441\u0430.", image: image(demoMedia.kitchen, "\u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F \u043E\u0444\u0438\u0441\u043D\u0430\u044F \u043A\u0443\u0445\u043D\u044F"), subcategories: makeSubs(subcategories.kitchen) },
  { id: "acoustic-solutions", slug: "acoustic-solutions", name: "\u0410\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F", description: "\u041A\u0430\u0431\u0438\u043D\u044B \u0438 \u043F\u0430\u043D\u0435\u043B\u0438 \u0434\u043B\u044F \u0442\u0438\u0448\u0438\u043D\u044B.", image: image(demoMedia.acoustic, "\u0410\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u043E\u0444\u0438\u0441\u0430"), subcategories: makeSubs(subcategories.acoustic) },
  { id: "storage-systems", slug: "storage-systems", name: "\u0421\u0438\u0441\u0442\u0435\u043C\u044B \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F", description: "\u0428\u043A\u0430\u0444\u044B, \u0442\u0443\u043C\u0431\u044B \u0438 \u0441\u0442\u0435\u043B\u043B\u0430\u0436\u0438.", image: image(demoMedia.storage, "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0432 \u043E\u0444\u0438\u0441\u0435"), subcategories: [] },
  { id: "adjustable-desks", slug: "adjustable-desks", name: "\u0420\u0435\u0433\u0443\u043B\u0438\u0440\u0443\u0435\u043C\u044B\u0435 \u0441\u0442\u043E\u043B\u044B", description: "\u0421\u0442\u043E\u043B\u044B \u0441 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u043E\u0439 \u0432\u044B\u0441\u043E\u0442\u044B.", image: image(demoMedia.adjustable, "\u0421\u0442\u043E\u043B \u0441 \u0440\u0435\u0433\u0443\u043B\u0438\u0440\u043E\u0432\u043A\u043E\u0439 \u0432\u044B\u0441\u043E\u0442\u044B"), subcategories: [] },
  { id: "metal-furniture", slug: "metal-furniture", name: "\u041C\u0435\u0442\u0430\u043B\u043B\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043C\u0435\u0431\u0435\u043B\u044C", description: "\u0428\u043A\u0430\u0444\u044B, \u0441\u0435\u0439\u0444\u044B \u0438 \u0441\u0442\u0435\u043B\u043B\u0430\u0436\u0438 \u0438\u0437 \u043C\u0435\u0442\u0430\u043B\u043B\u0430.", image: image(demoMedia.metal, "\u041C\u0435\u0442\u0430\u043B\u043B\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043E\u0444\u0438\u0441\u043D\u044B\u0439 \u0441\u0442\u0435\u043B\u043B\u0430\u0436"), subcategories: makeSubs(subcategories.metal) },
  { id: "project-furniture", slug: "project-furniture", name: "\u041F\u0440\u043E\u0435\u043A\u0442\u043D\u0430\u044F \u043C\u0435\u0431\u0435\u043B\u044C", description: "\u041C\u0435\u0431\u0435\u043B\u044C \u043F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u043F\u0440\u043E\u0435\u043A\u0442\u0443.", image: image(demoMedia.project, "\u041F\u0440\u043E\u0435\u043A\u0442\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u044C\u0435\u0440 \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0430"), subcategories: makeSubs(subcategories.project) }
];
const demoCollections = [
  {
    id: "axis",
    slug: "axis",
    name: "Axis",
    categoryId: "executive-offices",
    description: "\u041C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0430 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F.",
    image: image(demoMedia.executive, "\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F Axis \u0432 \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F"),
    images: [image(demoMedia.executive, "\u041A\u0430\u0431\u0438\u043D\u0435\u0442 Axis"), image(demoMedia.detail[1], "\u0420\u0430\u0431\u043E\u0447\u0430\u044F \u0437\u043E\u043D\u0430 \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438 Axis")],
    colors: [palette.walnut, palette.graphite, palette.lightOak],
    priceFrom: 128e3,
    groups: [{ id: "desks", name: "\u0420\u0430\u0431\u043E\u0447\u0438\u0435 \u0441\u0442\u043E\u043B\u044B", description: "\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u0438 \u043F\u0440\u0438\u0441\u0442\u0430\u0432\u043D\u044B\u0435 \u0441\u0442\u043E\u043B\u044B." }, { id: "storage", name: "\u0421\u0438\u0441\u0442\u0435\u043C\u044B \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F", description: "\u0422\u0443\u043C\u0431\u044B \u0438 \u0448\u043A\u0430\u0444\u044B \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438." }],
    specifications: { \u0421\u0442\u0438\u043B\u044C: "\u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0439", \u041E\u0441\u043D\u043E\u0432\u0430: "\u041B\u0414\u0421\u041F \u0438 \u043C\u0435\u0442\u0430\u043B\u043B", \u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: "\u041A\u0430\u0431\u0438\u043D\u0435\u0442 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F" },
    relatedCollectionIds: ["rift"],
    isFeatured: true
  },
  {
    id: "rift",
    slug: "rift",
    name: "Rift",
    categoryId: "staff-furniture",
    description: "\u0420\u0430\u0431\u043E\u0447\u0438\u0435 \u043C\u0435\u0441\u0442\u0430 \u0434\u043B\u044F \u043E\u0434\u043D\u043E\u0433\u043E \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430 \u0438\u043B\u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u044B.",
    image: image(demoMedia.staff, "\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F Rift \u0434\u043B\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0430"),
    images: [image(demoMedia.staff, "\u0420\u0430\u0431\u043E\u0447\u0438\u0435 \u0441\u0442\u0430\u043D\u0446\u0438\u0438 Rift"), image(demoMedia.detail[2], "\u041A\u043E\u043C\u0430\u043D\u0434\u043D\u043E\u0435 \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u043E Rift")],
    colors: [palette.lightOak, palette.white, palette.graphite, palette.green],
    priceFrom: 46500,
    groups: [{ id: "workstations", name: "\u0420\u0430\u0431\u043E\u0447\u0438\u0435 \u0441\u0442\u0430\u043D\u0446\u0438\u0438", description: "\u041E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u0435 \u0438 \u0433\u0440\u0443\u043F\u043F\u043E\u0432\u044B\u0435 \u0440\u0430\u0431\u043E\u0447\u0438\u0435 \u043C\u0435\u0441\u0442\u0430." }, { id: "screens", name: "\u042D\u043A\u0440\u0430\u043D\u044B", description: "\u041D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u044B\u0435 \u0430\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u044D\u043A\u0440\u0430\u043D\u044B." }],
    specifications: { \u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F: "\u041C\u043E\u0434\u0443\u043B\u044C\u043D\u0430\u044F", \u041A\u0430\u0440\u043A\u0430\u0441: "\u0421\u0442\u0430\u043B\u044C", \u0421\u0442\u043E\u043B\u0435\u0448\u043D\u0438\u0446\u0430: "\u041B\u0414\u0421\u041F" },
    relatedCollectionIds: ["axis", "quiet"],
    isFeatured: true
  },
  {
    id: "forum",
    slug: "forum",
    name: "Forum",
    categoryId: "meeting-areas",
    description: "\u0421\u0442\u043E\u043B\u044B \u0434\u043B\u044F \u0432\u0441\u0442\u0440\u0435\u0447 \u0438 \u043F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043E\u0432.",
    image: image(demoMedia.meeting, "\u041F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043D\u0430\u044F \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F Forum"),
    images: [image(demoMedia.meeting, "\u0421\u0442\u043E\u043B Forum \u0432 \u043F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043D\u043E\u0439"), image(demoMedia.reception, "\u0414\u0435\u0442\u0430\u043B\u0438 \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438 Forum")],
    colors: [palette.oak, palette.walnut, palette.black],
    priceFrom: 89e3,
    groups: [{ id: "meeting-tables", name: "\u041F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043D\u044B\u0435 \u0441\u0442\u043E\u043B\u044B", description: "\u0421\u0442\u043E\u043B\u044B \u0440\u0430\u0437\u043D\u044B\u0445 \u0444\u043E\u0440\u043C \u0438 \u0440\u0430\u0437\u043C\u0435\u0440\u043E\u0432." }],
    specifications: { \u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: "\u041F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043D\u044B\u0435 \u0437\u043E\u043D\u044B", \u0424\u043E\u0440\u043C\u0430: "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0430\u044F \u0438\u043B\u0438 \u043E\u0432\u0430\u043B\u044C\u043D\u0430\u044F" },
    relatedCollectionIds: ["axis"],
    isFeatured: true
  },
  {
    id: "contour",
    slug: "contour",
    name: "Contour",
    categoryId: "reception-desks",
    description: "\u0421\u0442\u043E\u0439\u043A\u0438 \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u043D\u043E\u0439 \u0437\u043E\u043D\u044B \u043E\u0444\u0438\u0441\u0430.",
    image: image(demoMedia.reception, "\u0421\u0442\u043E\u0439\u043A\u0430 \u0440\u0435\u0441\u0435\u043F\u0448\u043D Contour"),
    images: [image(demoMedia.reception, "\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F Contour"), image(demoMedia.executive, "\u041C\u043E\u0434\u0443\u043B\u0438 Contour")],
    colors: [palette.white, palette.lightOak, palette.graphite],
    priceFrom: 152e3,
    groups: [{ id: "reception-modules", name: "\u041C\u043E\u0434\u0443\u043B\u0438 \u0440\u0435\u0441\u0435\u043F\u0448\u043D", description: "\u041F\u0440\u044F\u043C\u044B\u0435, \u0443\u0433\u043B\u043E\u0432\u044B\u0435 \u0438 \u0437\u0430\u0432\u0435\u0440\u0448\u0430\u044E\u0449\u0438\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B." }],
    specifications: { \u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F: "\u0421\u0431\u043E\u0440\u043D\u043E-\u043C\u043E\u0434\u0443\u043B\u044C\u043D\u0430\u044F", \u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B: "\u041B\u0414\u0421\u041F" },
    relatedCollectionIds: ["rift"],
    isFeatured: false
  },
  {
    id: "quiet",
    slug: "quiet",
    name: "Quiet",
    categoryId: "acoustic-solutions",
    subcategoryId: "acoustic-booths",
    description: "\u041A\u0430\u0431\u0438\u043D\u044B \u0438 \u044D\u043A\u0440\u0430\u043D\u044B \u0434\u043B\u044F \u0442\u0438\u0445\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B.",
    image: image(demoMedia.acoustic, "\u0410\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F Quiet"),
    images: [image(demoMedia.acoustic, "\u0410\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043A\u0430\u0431\u0438\u043D\u0430 Quiet"), image(demoMedia.staff, "\u042D\u043A\u0440\u0430\u043D Quiet \u0432 \u043E\u0444\u0438\u0441\u0435")],
    colors: [palette.grey, palette.green, palette.blue],
    priceFrom: 24500,
    groups: [{ id: "booths", name: "\u041A\u0430\u0431\u0438\u043D\u044B", description: "\u041E\u0434\u043D\u043E\u043C\u0435\u0441\u0442\u043D\u044B\u0435 \u0438 \u043F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043D\u044B\u0435 \u043A\u0430\u0431\u0438\u043D\u044B." }, { id: "screens", name: "\u042D\u043A\u0440\u0430\u043D\u044B", description: "\u041D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u044B\u0435 \u0438 \u043D\u0430\u043F\u043E\u043B\u044C\u043D\u044B\u0435 \u044D\u043A\u0440\u0430\u043D\u044B." }],
    specifications: { \u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0448\u0443\u043C\u0430", \u041E\u0431\u0438\u0432\u043A\u0430: "\u0410\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0442\u043A\u0430\u043D\u044C" },
    relatedCollectionIds: ["rift"],
    isFeatured: true
  },
  {
    id: "vertex",
    slug: "vertex",
    name: "Vertex",
    categoryId: "adjustable-desks",
    description: "\u0421\u0442\u043E\u043B\u044B \u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u043E\u0439 \u0432\u044B\u0441\u043E\u0442\u044B.",
    image: image(demoMedia.adjustable, "\u0420\u0435\u0433\u0443\u043B\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u0441\u0442\u043E\u043B Vertex"),
    images: [image(demoMedia.adjustable, "\u0421\u0442\u043E\u043B Vertex"), image(demoMedia.detail[0], "\u0420\u0430\u0431\u043E\u0447\u0435\u0435 \u043C\u0435\u0441\u0442\u043E Vertex")],
    colors: [palette.white, palette.oak, palette.black],
    priceFrom: 69e3,
    groups: [{ id: "adjustable-desks", name: "\u0420\u0435\u0433\u0443\u043B\u0438\u0440\u0443\u0435\u043C\u044B\u0435 \u0441\u0442\u043E\u043B\u044B", description: "\u0421\u0442\u043E\u043B\u044B \u0434\u043B\u044F \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0445 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u043C\u0435\u0441\u0442." }],
    specifications: { \u041F\u0440\u0438\u0432\u043E\u0434: "\u042D\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u0435\u0441\u043A\u0438\u0439", \u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435: "\u041A\u043D\u043E\u043F\u043E\u0447\u043D\u0430\u044F \u043F\u0430\u043D\u0435\u043B\u044C" },
    relatedCollectionIds: ["rift"],
    isFeatured: true
  }
];
const makeProduct = (seed) => {
  var _a, _b, _c, _d, _e, _f;
  const colors = (_a = seed.colors) != null ? _a : [palette.oak, palette.graphite];
  const dimensions = (_b = seed.dimensions) != null ? _b : size(1600, 800, 750);
  const images = [image(seed.image, seed.name), image(demoMedia.detail[1], `${seed.name}, \u0432\u0438\u0434 \u0432 \u0438\u043D\u0442\u0435\u0440\u044C\u0435\u0440\u0435`), image(demoMedia.detail[2], `${seed.name}, \u0434\u0435\u0442\u0430\u043B\u044C`)];
  return {
    id: seed.id,
    slug: seed.id,
    name: seed.name,
    categoryId: seed.categoryId,
    collectionId: seed.collectionId,
    groupId: seed.groupId,
    subcategoryId: seed.subcategoryId,
    description: seed.description,
    images,
    variants: colors.slice(0, 2).map((item, index) => {
      var _a2, _b2;
      return {
        id: `${seed.id}-${item.id}-${index + 1}`,
        article: `${seed.article}-${index + 1}`,
        color: item,
        dimensions: index === 0 ? dimensions : { ...dimensions, width: dimensions.width + 200, label: `${dimensions.width + 200} \xD7 ${dimensions.depth} \xD7 ${dimensions.height} \u043C\u043C` },
        price: seed.price + index * 7e3,
        oldPrice: index === 0 ? seed.oldPrice : void 0,
        availability: index === 0 ? (_a2 = seed.availability) != null ? _a2 : "in-stock" : "on-order",
        stockQuantity: index === 0 && ((_b2 = seed.availability) != null ? _b2 : "in-stock") === "in-stock" ? 8 : 0,
        imageIndex: index
      };
    }),
    specifications: { \u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: (_d = (_c = demoCategories.find((item) => item.id === seed.categoryId)) == null ? void 0 : _c.name) != null ? _d : "\u041E\u0444\u0438\u0441", \u041A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F: "\u0421\u0431\u043E\u0440\u043D\u0430\u044F", \u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E: "\u041F\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0443" },
    materials: ["\u041B\u0414\u0421\u041F \u043A\u043B\u0430\u0441\u0441\u0430 E1", "\u041C\u0435\u0442\u0430\u043B\u043B\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0444\u0443\u0440\u043D\u0438\u0442\u0443\u0440\u0430", (_f = (_e = colors[0]) == null ? void 0 : _e.material) != null ? _f : "\u041A\u043E\u043C\u0431\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B"],
    warranty: "\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0438 \u0443\u043A\u0430\u0437\u0430\u043D\u044B \u0432 \u0437\u0430\u043A\u0430\u0437\u0435.",
    features: ["\u041C\u043E\u0436\u043D\u043E \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442", "\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0446\u0432\u0435\u0442\u043E\u0432", "\u041F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F \u043E\u0444\u0438\u0441\u0430"],
    isNew: Boolean(seed.isNew),
    isRecommended: Boolean(seed.recommended)
  };
};
const demoProducts = [
  makeProduct({ id: "axis-director-desk", name: "\u0421\u0442\u043E\u043B \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F Axis", article: "AX-D", categoryId: "executive-offices", collectionId: "axis", groupId: "desks", image: demoMedia.executive, price: 128e3, oldPrice: 142e3, colors: [palette.walnut, palette.lightOak], dimensions: size(2e3, 900, 750), description: "\u0421\u0442\u043E\u043B \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F \u0441 \u043A\u0430\u0431\u0435\u043B\u044C-\u043A\u0430\u043D\u0430\u043B\u043E\u043C.", isNew: true, recommended: true }),
  makeProduct({ id: "axis-storage", name: "\u0428\u043A\u0430\u0444 \u043A\u043E\u043C\u0431\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 Axis", article: "AX-S", categoryId: "executive-offices", collectionId: "axis", groupId: "storage", image: demoMedia.storage, price: 86e3, colors: [palette.walnut, palette.graphite], dimensions: size(900, 450, 2100), description: "\u0428\u043A\u0430\u0444 \u0434\u043B\u044F \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0438 \u043B\u0438\u0447\u043D\u044B\u0445 \u0432\u0435\u0449\u0435\u0439." }),
  makeProduct({ id: "rift-workstation", name: "\u0420\u0430\u0431\u043E\u0447\u0430\u044F \u0441\u0442\u0430\u043D\u0446\u0438\u044F Rift", article: "RF-W", categoryId: "staff-furniture", collectionId: "rift", groupId: "workstations", image: demoMedia.staff, price: 46500, availability: "on-order", colors: [palette.lightOak, palette.white], description: "\u0420\u0430\u0431\u043E\u0447\u0435\u0435 \u043C\u0435\u0441\u0442\u043E \u0441 \u043C\u0435\u0442\u0430\u043B\u043B\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u043A\u0430\u0440\u043A\u0430\u0441\u043E\u043C.", isNew: true, recommended: true }),
  makeProduct({ id: "forum-table", name: "\u041F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043D\u044B\u0439 \u0441\u0442\u043E\u043B Forum", article: "FR-T", categoryId: "meeting-areas", collectionId: "forum", groupId: "meeting-tables", image: demoMedia.meeting, price: 89e3, colors: [palette.oak, palette.walnut], dimensions: size(2400, 1100, 750), description: "\u041F\u0440\u043E\u0441\u0442\u043E\u0440\u043D\u044B\u0439 \u0441\u0442\u043E\u043B \u0434\u043B\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u043D\u044B\u0445 \u0432\u0441\u0442\u0440\u0435\u0447 \u0438 \u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u0439.", recommended: true }),
  makeProduct({ id: "contour-reception", name: "\u0421\u0442\u043E\u0439\u043A\u0430 \u0440\u0435\u0441\u0435\u043F\u0448\u043D Contour", article: "CT-R", categoryId: "reception-desks", collectionId: "contour", groupId: "reception-modules", image: demoMedia.reception, price: 152e3, availability: "on-order", colors: [palette.white, palette.lightOak], dimensions: size(2200, 850, 1150), description: "\u0421\u0442\u043E\u0439\u043A\u0430 \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u043D\u043E\u0439 \u0437\u043E\u043D\u044B." }),
  makeProduct({ id: "motion-chair", name: "\u041A\u0440\u0435\u0441\u043B\u043E \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F Motion", article: "MO-C", categoryId: "chairs", subcategoryId: "executive-chairs", image: demoMedia.chairs, price: 68e3, oldPrice: 75e3, colors: [palette.black, palette.grey], dimensions: size(680, 680, 1220), description: "\u041A\u0440\u0435\u0441\u043B\u043E \u0441 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u043E\u0439 \u0441\u043F\u0438\u043D\u043A\u0438 \u0438 \u043F\u043E\u0434\u043B\u043E\u043A\u043E\u0442\u043D\u0438\u043A\u043E\u0432.", recommended: true }),
  makeProduct({ id: "soft-lounge", name: "\u041B\u0430\u0443\u043D\u0436-\u043A\u0440\u0435\u0441\u043B\u043E Soft", article: "SF-L", categoryId: "waiting-areas", subcategoryId: "lounge-chairs", image: demoMedia.waiting, price: 54e3, colors: [palette.grey, palette.green], dimensions: size(820, 780, 840), description: "\u041C\u044F\u0433\u043A\u043E\u0435 \u043A\u0440\u0435\u0441\u043B\u043E \u0434\u043B\u044F \u0437\u043E\u043D \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F \u0438 \u043D\u0435\u0444\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u044B\u0445 \u0432\u0441\u0442\u0440\u0435\u0447.", isNew: true }),
  makeProduct({ id: "compact-kitchen", name: "\u041C\u0438\u043D\u0438-\u043A\u0443\u0445\u043D\u044F Compact", article: "CK-M", categoryId: "office-kitchens", subcategoryId: "mini-kitchens", image: demoMedia.kitchen, price: 198e3, availability: "on-order", colors: [palette.white, palette.lightOak], dimensions: size(1800, 650, 2200), description: "\u041D\u0435\u0431\u043E\u043B\u044C\u0448\u0430\u044F \u043A\u0443\u0445\u043D\u044F \u0434\u043B\u044F \u043E\u0444\u0438\u0441\u0430." }),
  makeProduct({ id: "quiet-booth", name: "\u0410\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043A\u0430\u0431\u0438\u043D\u0430 Quiet One", article: "QT-B", categoryId: "acoustic-solutions", collectionId: "quiet", groupId: "booths", subcategoryId: "acoustic-booths", image: demoMedia.acoustic, price: 45e4, availability: "on-order", colors: [palette.grey, palette.green], dimensions: size(1050, 1050, 2250), description: "\u041E\u0434\u043D\u043E\u043C\u0435\u0441\u0442\u043D\u0430\u044F \u043A\u0430\u0431\u0438\u043D\u0430 \u0434\u043B\u044F \u0437\u0432\u043E\u043D\u043A\u043E\u0432 \u0438 \u0441\u043E\u0441\u0440\u0435\u0434\u043E\u0442\u043E\u0447\u0435\u043D\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B.", isNew: true, recommended: true }),
  makeProduct({ id: "quiet-screen", name: "\u041D\u0430\u0441\u0442\u043E\u043B\u044C\u043D\u044B\u0439 \u044D\u043A\u0440\u0430\u043D Quiet", article: "QT-S", categoryId: "acoustic-solutions", collectionId: "quiet", groupId: "screens", subcategoryId: "desk-screens", image: demoMedia.staff, price: 24500, colors: [palette.grey, palette.blue], dimensions: size(1400, 40, 450), description: "\u0410\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u044D\u043A\u0440\u0430\u043D \u0434\u043B\u044F \u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u044F \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u043C\u0435\u0441\u0442." }),
  makeProduct({ id: "grid-cabinet", name: "\u0428\u043A\u0430\u0444 Grid", article: "GR-C", categoryId: "storage-systems", image: demoMedia.storage, price: 59e3, colors: [palette.lightOak, palette.graphite], dimensions: size(900, 450, 2100), description: "\u0428\u043A\u0430\u0444 \u0434\u043B\u044F \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0438 \u0432\u0435\u0449\u0435\u0439." }),
  makeProduct({ id: "vertex-desk", name: "\u0421\u0442\u043E\u043B \u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u0440\u0435\u0433\u0443\u043B\u0438\u0440\u043E\u0432\u043A\u043E\u0439 Vertex", article: "VX-D", categoryId: "adjustable-desks", collectionId: "vertex", groupId: "adjustable-desks", image: demoMedia.adjustable, price: 69e3, colors: [palette.white, palette.oak], dimensions: size(1400, 750, 1250), description: "\u0421\u0442\u043E\u043B \u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u043E\u0439 \u0432\u044B\u0441\u043E\u0442\u044B.", isNew: true }),
  makeProduct({ id: "metal-safe", name: "\u041E\u0444\u0438\u0441\u043D\u044B\u0439 \u0441\u0435\u0439\u0444 Secure", article: "SC-S", categoryId: "metal-furniture", subcategoryId: "safes", image: demoMedia.metal, price: 78e3, colors: [palette.graphite, palette.black], dimensions: size(520, 480, 850), description: "\u041C\u0435\u0442\u0430\u043B\u043B\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0441\u0435\u0439\u0444 \u0434\u043B\u044F \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0438 \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u0435\u0439." }),
  makeProduct({ id: "hotel-console", name: "\u041A\u043E\u043D\u0441\u043E\u043B\u044C Hotel Line", article: "HL-C", categoryId: "project-furniture", subcategoryId: "hotel-furniture", image: demoMedia.project, price: 97e3, availability: "on-order", colors: [palette.walnut, palette.lightOak], dimensions: size(1600, 450, 820), description: "\u041A\u043E\u043D\u0441\u043E\u043B\u044C \u0434\u043B\u044F \u0433\u043E\u0441\u0442\u0438\u043D\u0438\u0446 \u0438 \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u0437\u043E\u043D." })
];
const demoCatalog = {
  categories: demoCategories,
  collections: demoCollections,
  products: demoProducts
};
const normalizeCatalog = (snapshot2) => ({
  categories: snapshot2.categories.map((category) => ({ ...category, subcategories: [...category.subcategories] })),
  collections: snapshot2.collections.map((collection) => ({
    ...collection,
    images: [...collection.images],
    colors: [...collection.colors],
    groups: [...collection.groups],
    relatedCollectionIds: [...collection.relatedCollectionIds]
  })),
  products: snapshot2.products.map((product) => ({
    ...product,
    images: [...product.images],
    variants: [...product.variants],
    materials: [...product.materials],
    features: [...product.features]
  }))
});
const snapshot = normalizeCatalog(demoCatalog);
const categories = snapshot.categories;
const collections = snapshot.collections;
const products = snapshot.products;
const categoryById = (id) => categories.find((item) => item.id === id);
const categoryBySlug = (slug) => categories.find((item) => item.slug === slug);
const collectionById = (id) => collections.find((item) => item.id === id);
const collectionBySlug = (slug) => collections.find((item) => item.slug === slug);
const productById = (id) => products.find((item) => item.id === id || item.slug === id);
const formatPrice = (value) => new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value);
const availabilityLabel = (value) => value === "in-stock" ? "\u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438" : "\u041F\u043E\u0434 \u0437\u0430\u043A\u0430\u0437";
const productStartingPrice = (product) => Math.min(...product.variants.map((variant) => variant.price));
const productSearchText = (product) => {
  const category = categoryById(product.categoryId);
  const collection = collectionById(product.collectionId);
  return [
    product.name,
    category == null ? void 0 : category.name,
    collection == null ? void 0 : collection.name,
    product.description,
    ...product.variants.map((variant) => `${variant.article} ${variant.color.name} ${variant.dimensions.label}`),
    ...Object.entries(product.specifications).flat(),
    ...product.features,
    ...product.materials
  ].filter(Boolean).join(" ").toLocaleLowerCase("ru-RU");
};
function useRequestEvent(nuxtApp) {
  var _a;
  nuxtApp || (nuxtApp = useNuxtApp());
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => {
    const decoded = decodeURIComponent(val);
    const parsed = destr(decoded);
    if (typeof parsed === "number" && (!Number.isFinite(parsed) || String(parsed) !== decoded)) {
      return decoded;
    }
    return parsed;
  },
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a, _b, _c;
  const opts = { ...CookieDefaults, ..._opts };
  (_a = opts.filter) != null ? _a : opts.filter = (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : (_c = cookies[name]) != null ? _c : (_b = opts.default) == null ? void 0 : _b.call(opts));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies || (nuxtApp._cookies = {});
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const clampQuantity = (quantity) => Math.max(1, Math.min(999, Math.round(quantity || 1)));
const useShop = () => {
  const cart = useCookie("officepeak-cart", { default: () => [], maxAge: 60 * 60 * 24 * 90, sameSite: "lax", watch: true });
  const favorites = useCookie("officepeak-favorites", { default: () => [], maxAge: 60 * 60 * 24 * 365, sameSite: "lax", watch: true });
  const cartOpen = useState("cartOpen", () => false);
  const menuOpen = useState("menuOpen", () => false);
  const items = computed(() => cart.value.flatMap((line) => {
    const product = productById(line.productId);
    const variant = product == null ? void 0 : product.variants.find((item) => item.id === line.variantId);
    if (!product || !variant) return [];
    return [{ ...line, key: `${line.productId}:${line.variantId}`, product, variant, lineTotal: variant.price * line.quantity }];
  }));
  const count = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0));
  const total = computed(() => items.value.reduce((sum, item) => sum + item.lineTotal, 0));
  const add = (product, quantity = 1, variantOrId) => {
    var _a;
    const variantId = typeof variantOrId === "string" ? variantOrId : variantOrId == null ? void 0 : variantOrId.id;
    const variant = (_a = product.variants.find((item) => item.id === variantId)) != null ? _a : product.variants[0];
    if (!variant) return;
    const existing = cart.value.find((item) => item.productId === product.id && item.variantId === variant.id);
    cart.value = existing ? cart.value.map((item) => item === existing ? { ...item, quantity: clampQuantity(item.quantity + quantity) } : item) : [...cart.value, { productId: product.id, variantId: variant.id, quantity: clampQuantity(quantity) }];
    cartOpen.value = true;
  };
  const setQuantity = (productId, variantId, quantity) => {
    cart.value = cart.value.map((item) => item.productId === productId && item.variantId === variantId ? { ...item, quantity: clampQuantity(quantity) } : item);
  };
  const remove = (productId, variantId) => {
    cart.value = cart.value.filter((item) => item.productId !== productId || item.variantId !== variantId);
  };
  const toggleFavorite = (id) => {
    favorites.value = favorites.value.includes(id) ? favorites.value.filter((item) => item !== id) : [...favorites.value, id];
  };
  return { cart, items, favorites, cartOpen, menuOpen, count, total, add, setQuantity, remove, toggleFavorite };
};

export { availabilityLabel as a, categories as b, collections as c, demoMedia as d, productSearchText as e, formatPrice as f, productById as g, categoryById as h, collectionById as i, productStartingPrice as j, categoryBySlug as k, collectionBySlug as l, products as p, useShop as u };;globalThis.__timing__.logEnd('Load chunks/build/useShop-Ct_x_K-c');
//# sourceMappingURL=useShop-Ct_x_K-c.mjs.map
