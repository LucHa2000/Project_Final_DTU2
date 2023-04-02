let socket = io("http://localhost:4000");

let receiver = "";
let sender = "";
// display chatting Area

$(document).ready(() => {
  $(".inbox-container").hide();

  // send username to server
  socket.emit("user-name", $(".account").text().trim());

  //get list user Online
  socket.on("listUserActive", (data) => {
    console.log(data);
  });

  //listening new message
  socket.on("new-message-private", (data) => {
    //console.log(data);
    receiver = data.sender;
    $(".chat-container").append(
      '<li class="collection-item"><h1>' +
        data.message +
        '</h1><h6 class="nameUser">' +
        data.sender +
        "</h6></li>"
    );
  });

  //listening new icon
  //listening private emotion
  socket.on("new-message-private-emotion", (data) => {
    // $("#container-chat-private").show();
    receiver = data.sender;
    $(".chat-container").append(
      '<div class="message-container-receive"><img class="image-infor-focus text-message message-icon" src ="' +
        data.message +
        '"><h6 class="nameUser">' +
        data.sender +
        "</h6></div>"
    );
  });

  $(".user-chat").click(function (e) {
    //get sender and receiver
    receiver = $(this).text().trim();
    sender = $(".account").text().trim();
    //show chat container
    $(".inbox-container").show();
  });

  $("#send-message").prop("disabled", true);
  //check message change
  $("#message-inbox").keyup(function () {
    let content = $(this).val();
    if (content != "") {
      $("#send-message").prop("disabled", false);
    } else {
      $("#send-message").prop("disabled", true);
    }
  });

  //send message
  $("#send-message").click(function (e) {
    let message = $("#message-inbox").val();
    let content = {
      message: message,
      receiver: receiver.trim(),
      sender: sender,
    };
    socket.emit("content-message", content);
    //append message
    $(".chat-container").append(
      '<li class="collection-item"><h1>' +
        content.message +
        '</h1><p class="nameUser red-text text-darken-2">' +
        content.sender +
        "</p></li>"
    );
    //submit message to the server

    $.ajax({
      type: "POST",
      url: "http://localhost:4000/inbox/saveMessage",
      data: content,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
    });
    $("#message-inbox").val("");
    $("#send-message").prop("disabled", false);
  });
  //send file
  // $("#uploadfile").bind("change", function (e) {
  //   console.log("change");
  //   var data = e.originalEvent.target.files[0];
  //   readThenSendFile(data);
  // });
  // function readThenSendFile(data) {
  //   var reader = new FileReader();
  //   reader.onload = function (evt) {
  //     var msg = {};
  //     //msg.username = username;
  //     msg.file = evt.target.result;
  //     //msg.fileName = data.name;
  //     socket.emit("base64file", msg);
  //   };
  //   reader.readAsDataURL(data);
  // }

  //send icon
  $(".image-emotion").click(function (event) {
    let message = $(this).attr("src");
    let content = {
      message: message,
      receiver: receiver.trim(),
      sender: sender,
    };

    socket.emit("content-emotion", content);
    $(".chat-container").append(
      '<div class="message-container"><img class="image-infor-focus text-message message-icon" src="' +
        message +
        '">' +
        '<h6 class="nameUser">' +
        "You</h6></div>"
    );

    $.ajax({
      type: "POST",
      url: "http://localhost:4000/inbox/saveMessage",
      data: content,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      console.log(data);
    });
  });
});
