export const openapiSpec = {
  openapi: "3.0.3",
  info: {
    title: "PWA INSTALLATION API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:4000",
    },
  ],
  paths: {
    "/api/pwainstallation": {
      get: {
        summary: "Get list of PWA installations",
        responses: {
          "200": { description: "OK" },
        },
      },
      post: {
        summary: "Create new PWA installation",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreatePwaInstallationDto", // ✅ use only msisdn + consented_to_install
              },
            },
          },
        },
        responses: {
          "201": { description: "Created" },
        },
      },
    },
    "/api/pwainstallation/msisdn/{msisdn}": {
      get: {
        summary: "Get PWA installation by MSISDN",
        parameters: [
          {
            name: "msisdn",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "OK" },
          "404": { description: "Not Found" },
        },
      },
    },
  },
  components: {
    schemas: {
      CreatePwaInstallationDto: { // ✅ new schema for POST
        type: "object",
        properties: {
          msisdn: { type: "string" },
          consented_to_install: { type: "boolean" },
        },
        required: ["msisdn", "consented_to_install"],
      },
    },
  },
};
