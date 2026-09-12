const myPromise = new Promise((resolve, reject) => {
  let isSuccess = true;

  // Simulate an asynchronous operation (e.g., fetching an API or reading a file)
  setTimeout(() => {
    if (isSuccess) {
      resolve("Data loaded successfully!");
    } else {
      reject("Failed to connect to the server!");
    }
  }, 1000);
});

myPromise
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
