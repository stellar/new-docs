import throttle from "lodash/throttle";

const METRICS_ENDPOINT = "https://api.amplitude.com/2/httpapi";
let cache = [];

const uploadMetrics = throttle(() => {
  const toUpload = cache;
  cache = [];
  if (!process.env.AMPLITUDE_KEY) {
    // eslint-disable-next-line no-console
    console.log("No metrics API key present, not uploading events", toUpload);
    return;
  }
  fetch(METRICS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      apiKey: process.env.AMPLITUDE_KEY,
      events: toUpload,
    },
  });
}, 500);

export const emitMetric = (name, body) => {
  cache.push({
    event_name: name,
    event_properties: body,
    // user_id is required
    user_id: "00000",
    // device_id is required
    device_id: "00000",
  });
  uploadMetrics();
};
