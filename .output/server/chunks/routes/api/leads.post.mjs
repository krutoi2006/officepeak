globalThis.__timing__.logStart('Load chunks/routes/api/leads.post');import { c as defineEventHandler, r as readMultipartFormData, e as createError, f as setResponseStatus } from '../../_/nitro.mjs';
import { s as siteConfig } from '../../_/site.mjs';
import { d as deliverSubmission } from '../../_/submissionTransport.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const allowedTypes = /* @__PURE__ */ new Set(["callback", "design", "message", "manager", "tender"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const leads_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e;
  const parts = await readMultipartFormData(event);
  if (!parts) throw createError({ statusCode: 400, statusMessage: "\u041F\u0443\u0441\u0442\u0430\u044F \u0444\u043E\u0440\u043C\u0430." });
  const field = (name2) => {
    const part = parts.find((item) => item.name === name2 && !item.filename);
    return part ? part.data.toString("utf8").trim() : "";
  };
  const type = field("type");
  const name = field("name");
  const phone = field("phone");
  const email = field("email");
  const company = field("company");
  const message = field("message");
  const consent = field("consent") === "true";
  if (field("website")) throw createError({ statusCode: 400, statusMessage: "\u0424\u043E\u0440\u043C\u0430 \u043D\u0435 \u043F\u0440\u043E\u0448\u043B\u0430 \u0430\u043D\u0442\u0438\u0441\u043F\u0430\u043C-\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443." });
  if (!allowedTypes.has(type)) throw createError({ statusCode: 400, statusMessage: "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u0442\u0438\u043F \u0444\u043E\u0440\u043C\u044B." });
  if (name.length < 2) throw createError({ statusCode: 422, statusMessage: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0438\u043C\u044F." });
  if (phone.replace(/\D/g, "").length < 10) throw createError({ statusCode: 422, statusMessage: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0442\u0435\u043B\u0435\u0444\u043E\u043D \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E." });
  if (type === "design" && !email) throw createError({ statusCode: 422, statusMessage: "\u0414\u043B\u044F \u0434\u0438\u0437\u0430\u0439\u043D-\u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u043D\u0443\u0436\u0435\u043D email." });
  if (email && !emailPattern.test(email)) throw createError({ statusCode: 422, statusMessage: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0444\u043E\u0440\u043C\u0430\u0442 email." });
  if (type === "tender" && company.length < 2) throw createError({ statusCode: 422, statusMessage: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438." });
  if (!consent) throw createError({ statusCode: 422, statusMessage: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u0434\u0430\u043D\u043D\u044B\u0445." });
  const attachment = parts.find((item) => item.name === "file" && item.filename);
  let safeAttachment;
  if (attachment) {
    const extension = `.${(_b = ((_a = attachment.filename) != null ? _a : "").split(".").pop()) == null ? void 0 : _b.toLowerCase()}`;
    if (!siteConfig.forms.acceptedFileExtensions.includes(extension) || !siteConfig.forms.acceptedMimeTypes.includes((_c = attachment.type) != null ? _c : "")) throw createError({ statusCode: 422, statusMessage: "\u0424\u043E\u0440\u043C\u0430\u0442 \u0444\u0430\u0439\u043B\u0430 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F." });
    if (attachment.data.byteLength > siteConfig.forms.maxFileSizeBytes) throw createError({ statusCode: 413, statusMessage: "\u0424\u0430\u0439\u043B \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0435\u0442 10 \u041C\u0411." });
    safeAttachment = { name: ((_d = attachment.filename) != null ? _d : "file").replace(/[^a-zA-Zа-яА-ЯёЁ0-9._-]/g, "_").slice(0, 120), type: (_e = attachment.type) != null ? _e : "application/octet-stream", size: attachment.data.byteLength };
  }
  const requestId = `OP-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const payload = { requestId, type, name, phone, email, company, message, attachment: safeAttachment, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  const delivery = await deliverSubmission("lead", payload);
  setResponseStatus(event, delivery.delivered ? 201 : 202);
  return {
    requestId,
    deliveryConfigured: delivery.configured,
    message: delivery.delivered ? "\u0414\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u044B \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u044B \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u043E\u043C\u0443 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0443 \u0437\u0430\u044F\u0432\u043E\u043A." : "\u0414\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u044B \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C, \u043D\u043E \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 CRM/\u043F\u043E\u0447\u0442\u044B \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D \u2014 \u0437\u0430\u044F\u0432\u043A\u0430 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0443. \u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u0438\u043B\u0438 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E."
  };
});

export { leads_post as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/leads.post');
//# sourceMappingURL=leads.post.mjs.map
