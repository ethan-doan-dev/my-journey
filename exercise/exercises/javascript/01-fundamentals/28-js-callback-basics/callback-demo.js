function sendNotification(name) {
  console.log(`Hello ${name}, data loaded successfully!`);
}

function fetchData(callback) {
  setTimeout(() => {
    console.log("Data fetched from server successfully");
    callback("John Doe");
  }, 2000); // Simulate a 2-second delay
}

fetchData(sendNotification);
