import http from 'k6/http'
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '1m', target: 100 },
  ],
  batch: 150,
  vus: 10,
  insecureSkipTLSVerify: true,
};

export default () => {

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const data = {"resourceSpans":[{"resource":{"attributes":[{"key":"service.name","value":{"stringValue":"unknown_service"}},{"key":"telemetry.sdk.language","value":{"stringValue":"webjs"}},{"key":"telemetry.sdk.name","value":{"stringValue":"opentelemetry"}},{"key":"telemetry.sdk.version","value":{"stringValue":"0.23.0"}}],"droppedAttributesCount":0},"instrumentationLibrarySpans":[{"spans":[{"traceId":"5661215315a87ad7dd8448b4101a59a9","spanId":"29f50492db6b0ced","name":"files-series-info-0","kind":1,"startTimeUnixNano":1625600800211400200,"endTimeUnixNano":1625600800700400000,"attributes":[],"droppedAttributesCount":0,"events":[{"timeUnixNano":1625600800700400000,"name":"fetching-span1-completed","attributes":[],"droppedAttributesCount":0}],"droppedEventsCount":0,"status":{"code":0},"links":[],"droppedLinksCount":0}],"instrumentationLibrary":{"name":"example-tracer-web"}}]}]}

  let response = http.post(`${__ENV.ENDPOINT}`, JSON.stringify(data), params);

  check(response, {
    'status is OK': (r) => r && r.status === 200,
  });

  //console.log("HTTP response code: " + response.status + ", response body: " + JSON.stringify(response.message));

};

