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

    if (error.code === 'messaging/registration-token-not-registered') {
      console.log(`Token not registered or expired: ${fcmToken}`);
      // TODO: Remove or invalidate this token in your DB
      // await removeTokenFromDatabase(fcmToken);
    }
    // Optionally rethrow or just swallow error depending on your logic
    // throw error;
  }
}

// Example usage
const token = "ezCxcfkFWND4P3qY76TYSt:APA91bEpr0tg6aNTjjDUkYk9vmNBjuG5CjG4WrChiiQ1NEle9CtLXDGhR4dlqkZfQZcdfbKc8y93FChc6URh0JrKGaZpxXGiWKbZ6qTYWgERoKrSHezNAy0";
sendNotificationToToken(token, "Hello!", `This is a test notification${new Date()}`);
