// Notify
var notyf = new Notyf({
  duration: 2000,
  position: {
    x: "right",
    y: "top",
  },
  dismissible: true,
});

let existNotify = sessionStorage.getItem("notify");
if (existNotify) {
  existNotify = JSON.parse(existNotify);
  if (existNotify.code == "error") {
    notyf.error(existNotify.message);
  } else {
    notyf.success(existNotify.message);
  }
  sessionStorage.removeItem("notify");
}

const drawNotify = (code, message) => {
  sessionStorage.setItem(
    "notify",
    JSON.stringify({
      code: data.code,
      message: data.message,
    })
  );
};
// End notify
