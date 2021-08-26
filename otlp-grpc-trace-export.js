import grpc from 'k6/net/grpc';
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


const client = new grpc.Client();
client.load([], 'opentelemetry/proto/collector/trace/v1/trace_service.proto');

export default () => {

  client.connect(__ENV.ENDPOINT, {
    // plaintext: false
  });

  const data = {
  "resource_spans": [
    {
      "resource": {
        "attributes": [
          {
            "key": "KEY",
            "value": {"string_value": "VALUE"},
          }
        ],
        "dropped_attributes_count": 0
      },
      "instrumentation_library_spans": [
        {
          "instrumentation_library": {
            "name": "INSTRUMENTATION",
            "version": "v0"
          },
          "spans": [
            {
              "trace_id": "QUJDQUFBQURBQkNBQUFBRA==",
              "span_id": "QUJDQUFBQUE=",
              "trace_state": "string",
              "parent_span_id": "QUJDQUFBQUQ=",
              "name": "string",
              "kind": "SPAN_KIND_UNSPECIFIED",
              "start_time_unix_nano": 1629967971000000,
              "end_time_unix_nano": 1629967975000000,
              "attributes": [
                {
                  "key": "KEY",
                  "value": { "string_value": "VALUE"},
                }
              ],
              "dropped_attributes_count": 0,
              "events": [
                {
                  "time_unix_nano": 1629967971000000,
                  "name": "string",
                  "attributes": [
                    {
                      "key": "KEY",
                      "value": { "string_value": "VALUE"},
                    }
                  ],
                  "dropped_attributes_count": 0
                }
              ],
              "dropped_events_count": 0,
              "links": [
                {
                  "trace_id": "QUJDQUFBQURBQkNBQUFBRQ==",
                  "span_id": "QUJDQUFBQUY=",
                  "trace_state": "string",
                  "attributes": [
                    {
                      "key": "KEY",
                      "value": {"string_value": "VALUE"},
                    }
                  ],
                  "dropped_attributes_count": 0
                }
              ],
              "dropped_links_count": 0,
              "status": {
                "deprecated_code": "DEPRECATED_STATUS_CODE_OK",
                "message": "string",
                "code": "STATUS_CODE_UNSET"
              }
            }
          ],
          "schema_url": "string"
        }
      ],
      "schema_url": "string"
    }
  ]
  }

  const response = client.invoke('opentelemetry.proto.collector.trace.v1.TraceService/Export', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  //console.log("GRPC response code: " + response.status + ", response body: " + JSON.stringify(response.message));

  client.close();
};

