export const CorsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
  allowedHeaders: "Content-Type, Authorization",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
