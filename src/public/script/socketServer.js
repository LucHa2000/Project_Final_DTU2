const arrayUser = [];
const usersId = [];
let info;
let notificationInbox;
function socketServer(io) {
  //check connect
  io.on("connection", (socket) => {
    //userConnect
    console.log("have a connect ID :" + socket.id);

    //disconnect
    socket.on("disconnect", (data) => {
      //arrayUserGroup.splice(arrayUserGroup.indexOf(userMember), 1);
      //io.sockets.emit("member-out-group", arrayUserGroup);
      console.log("disconnect ....." + socket.id);
    });

    //listening create room
    socket.on("create-room", (data) => {
      socket.join(data);
      //socket.room = data;
      //push room to array rooms
      let rooms = [];

      for (let e of socket.adapter.rooms.keys()) {
        rooms.push(e);
      }

      //send rooms to everyone
      io.sockets.emit("server-send-rooms", rooms);
      //send room when switch , just emit user send request switch room
      socket.emit("server-send-room-socket", data);
    });

    socket.on("user-chat", (data) => {
      io.sockets.in(data.room).emit("server-send-chat", data);
    });
  });
}

let bookingNotification = (data) => {
  // let notification = {
  //   receiver: data.receiver,
  //   content: "Bạn có một thông báo mới !",
  //   sender: userID,
  //   type: data.type,
  // };
  return data;
};

function serverNotification(io, notification, notificationInboxFromServer) {
  info = notification;
  notificationInbox = notificationInboxFromServer;
  console.log("insocket service");
  console.log(notificationInbox);

  io.on("connection", (socket) => {
    //userConnect
    console.log("have a connect ID :" + socket.id);

    //send notification
    socket.on("accountLogin", (data) => {
      arrayUser.push(data);
      socket.username = data;
      usersId[data] = socket.id;
      socket.emit("Server-success-regsiter", data);
    });

    if (info) {
      //send notification doctor
      let doctorSocketId = usersId[info.doctorID];
      io.to(doctorSocketId).emit("new-notification", info.content);
      info = "";
    }

    if (notificationInbox) {
      console.log("in send notification");
      console.log(notificationInbox);
      //send notification doctor
      let doctorSocketId = usersId[notificationInbox.userID];
      io.to(doctorSocketId).emit(
        "new-notification-inbox",
        notificationInbox.content
      );
      notificationInbox = "";
    }
  });
}

module.exports = {
  socketServer: socketServer,
  serverNotification,
  bookingNotification,
};
