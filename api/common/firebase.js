const admin = require("firebase-admin");

// Initialize Firebase Admin SDK with your service account JSON
const serviceAccount = require("../../firebase/chat-system.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to send notification to a specific FCM token
async function sendNotificationToToken(fcmToken, title, body, data = {}) {
  const message = {
    token: fcmToken,
    notification: {
      title,
      body,
    },
    data, // Optional custom data
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}

// Example usage
const token = "cFKv1EQUMDyZSWfA0Ee8yM:APA91bFB1XKefHMfuAn3BLWdPivwh6cZZBbcR7UXdbjS-sU9kWN5UkrsJomMbaaS32O-9KLXxR9oFnf-z5bPp-fBE3XuEPxn7zvLCGYCUa-yzfIgFNdaJq0";
sendNotificationToToken(token, "Hello!", "This is a test notification");
