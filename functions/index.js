
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51Sir2kDBX0384gEWyLOxmCjoXsQ9ARTQJeu0tKGpjbo1qFpCqc2LE8MHYYLNUCQUiInjiPqiGJRkJyalc1lN4G0H00U6wCbAxU"
); // Your Stripe secret key

// App configuration
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());    

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// API routes

app.get("/", (req, res) => {
  res.status(200).send("Hello from Firebase!");
});

// listen command 

exports.api = functions.https.onRequest(app);

// Example endpoint

// http://127.0.0.1:5001/clone-938d8/us-central1/api




/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {setGlobalOptions} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/https");
// const logger = require("firebase-functions/logger"); 

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
