globalThis.__timing__.logStart('Load chunks/_/submissionTransport');import { s as siteConfig } from './site.mjs';

const deliverSubmission = async (kind, payload) => {
  const url = kind === "lead" ? siteConfig.forms.leadTransportUrl : siteConfig.forms.mailTransportUrl;
  if (!url) return { configured: false, delivered: false };
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ kind, payload })
  });
  if (!response.ok) throw new Error(`Submission transport returned ${response.status}`);
  return { configured: true, delivered: true };
};

export { deliverSubmission as d };;globalThis.__timing__.logEnd('Load chunks/_/submissionTransport');
//# sourceMappingURL=submissionTransport.mjs.map
