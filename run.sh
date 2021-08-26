source variables-grpc
echo "=========================="
echo "GRPC ENDPOINT: ${ENDPOINT}"
docker run -i \
  -v $PWD:/home/k6 \
  loadimpact/k6 \
  run \
  -e "ENDPOINT=${ENDPOINT}" \
  /home/k6/otlp-grpc-trace-export.js

source variables-http
echo "=========================="
echo "HTTP ENDPOINT: ${ENDPOINT}"
docker run -i \
  -v $PWD:/home/k6 \
  loadimpact/k6 \
  run \
  -e "ENDPOINT=${ENDPOINT}" \
  /home/k6/otlp-http-trace-export.js

