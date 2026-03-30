import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://7ff7da5abd8d8036269e886bbff62b55@o4511121556307968.ingest.us.sentry.io/4511121566138368",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
