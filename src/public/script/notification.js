let socket = io("http://localhost:4000");

const userID = $("#userID").html();
const notificationMessage = $("#message-notification").text();
if (notificationMessage == "") {
  $(".notification-container").hide();
}
const inboxNotification = $("#message-inbox-display").text();
if (inboxNotification == "") {
  $(".notification-container-inbox").hide();
}
$(document).ready(() => {
  if (userID) {
    //send account to server
    socket.emit("accountLogin", userID);

    //send notification
    //bookingNotification(data);
  } else console.log("Not login");
});

socket.on("new-notification", (data) => {
  //set notification Data
  if (data) {
    $(".notification-container").show();
    $("#message-notification").text(data);
  }
});

socket.on("new-notification-inbox", (data) => {
  //set notification inbox
  console.log(data);
  if (data) {
    $(".notification-container-inbox").show();
    $("#message-inbox-display").text(data);
  }
});
