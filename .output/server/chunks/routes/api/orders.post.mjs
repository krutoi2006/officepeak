globalThis.__timing__.logStart('Load chunks/routes/api/orders.post');import { c as defineEventHandler, g as readBody, e as createError, f as setResponseStatus } from '../../_/nitro.mjs';
import { p as productById } from '../../_/catalog.mjs';
import { d as deliverSubmission } from '../../_/submissionTransport.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../../_/site.mjs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const orders_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const text = (key) => {
    var _a;
    return String((_a = body[key]) != null ? _a : "").trim();
  };
  const clientType = text("clientType");
  const name = text("name");
  const phone = text("phone");
  const email = text("email");
  const company = text("company");
  const city = text("city");
  const fulfillment = text("fulfillment");
  const address = text("address");
  if (text("website")) throw createError({ statusCode: 400, statusMessage: "\u0424\u043E\u0440\u043C\u0430 \u043D\u0435 \u043F\u0440\u043E\u0448\u043B\u0430 \u0430\u043D\u0442\u0438\u0441\u043F\u0430\u043C-\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443." });
  if (!["individual", "organization"].includes(clientType)) throw createError({ statusCode: 422, statusMessage: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043F \u043A\u043B\u0438\u0435\u043D\u0442\u0430." });
  if (name.length < 2 || phone.replace(/\D/g, "").length < 10 || !emailPattern.test(email)) throw createError({ statusCode: 422, statusMessage: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0438\u043C\u044F, \u0442\u0435\u043B\u0435\u0444\u043E\u043D \u0438 email." });
  if (clientType === "organization" && company.length < 2) throw createError({ statusCode: 422, statusMessage: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438." });
  if (city.length < 2 || !["delivery", "pickup"].includes(fulfillment) || fulfillment === "delivery" && address.length < 5) throw createError({ statusCode: 422, statusMessage: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0433\u043E\u0440\u043E\u0434 \u0438 \u0441\u043F\u043E\u0441\u043E\u0431 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F." });
  if (body.consent !== true) throw createError({ statusCode: 422, statusMessage: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u0434\u0430\u043D\u043D\u044B\u0445." });
  if (!Array.isArray(body.lines) || !body.lines.length || body.lines.length > 100) throw createError({ statusCode: 422, statusMessage: "\u0421\u043E\u0441\u0442\u0430\u0432 \u0437\u0430\u043A\u0430\u0437\u0430 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u0435\u043D." });
  const lines = body.lines.map((raw) => {
    var _a;
    const product = productById(String((_a = raw.productId) != null ? _a : ""));
    const variant = product == null ? void 0 : product.variants.find((item) => {
      var _a2;
      return item.id === String((_a2 = raw.variantId) != null ? _a2 : "");
    });
    const rawQuantity = Number(raw.quantity);
    if (!product || !variant || !Number.isInteger(rawQuantity) || rawQuantity < 1 || rawQuantity > 999) throw createError({ statusCode: 422, statusMessage: "\u041E\u0434\u043D\u0430 \u0438\u0437 \u043F\u043E\u0437\u0438\u0446\u0438\u0439 \u0437\u0430\u043A\u0430\u0437\u0430 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430." });
    const quantity = rawQuantity;
    return { productId: product.id, productName: product.name, variantId: variant.id, article: variant.article, quantity, unitPrice: variant.price, lineTotal: variant.price * quantity };
  });
  const requestId = `OP-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const payload = { requestId, clientType, name, phone, email, company, inn: text("inn"), city, fulfillment, address, comment: text("comment"), lines, total: lines.reduce((sum, line) => sum + line.lineTotal, 0), createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  const delivery = await deliverSubmission("order", payload);
  setResponseStatus(event, delivery.delivered ? 201 : 202);
  return {
    requestId,
    deliveryConfigured: delivery.configured,
    message: delivery.delivered ? "\u0417\u0430\u044F\u0432\u043A\u0430 \u043F\u0440\u043E\u0448\u043B\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u043D\u0443\u044E \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443 \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u0430 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u043E\u043C\u0443 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0443." : "\u0417\u0430\u044F\u0432\u043A\u0430 \u043F\u0440\u043E\u0448\u043B\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u043D\u0443\u044E \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443, \u043D\u043E CRM/\u043F\u043E\u0447\u0442\u043E\u0432\u044B\u0439 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u0435\u0449\u0451 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D. \u0414\u0430\u043D\u043D\u044B\u0435 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u044B \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443, \u043A\u043E\u0440\u0437\u0438\u043D\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430. \u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 OFFICEPEAK \u043F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443 \u0438\u043B\u0438 email."
  };
});

export { orders_post as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/orders.post');
//# sourceMappingURL=orders.post.mjs.map
