let room = '';
let sender = '';
let roomID = '';
const formatDateTime = (date) => {
  const event = new Date(date);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return event.toLocaleDateString('vi-VN', options);
};
// display chatting Area

$(document).ready(() => {
  //get room and sender
  room = $('#roomName').text().trim();
  roomID = $('#roomID').text().trim();
  //send room to Server
  socket.emit('create-room', room);

  let senderID = $('.accountID').text().trim();
  let senderName = $('.accountName').text().trim();
  //show chat container

  $('#send-message').prop('disabled', true);
  //check message change
  $('#message-inbox').keyup(function () {
    let content = $(this).val();
    if (content != '') {
      $('#send-message').prop('disabled', false);
    } else {
      $('#send-message').prop('disabled', true);
    }
  });

  //send message

  $('#send-message').click(function (e) {
    let message = $('#message-inbox').val();
    //let room = $("#room-name").text();
    let content = {
      message: message,
      senderID: senderID,
      senderName: senderName,
      room: room.trim(),
      roomID: roomID.trim(),
    };
    //emit to server
    socket.emit('user-chat', content);

    //submit message to the server

    $.ajax({
      type: 'POST',
      url: 'http://localhost:4000/inbox/saveMessage',
      data: content,
      dataType: 'json',
      encode: true,
    }).done(function (data) {
      console.log(data);
    });
    $('#message-inbox').val('');
    $('#send-message').prop('disabled', false);
  });
});

//listening list rooms from Server
socket.on('server-send-rooms', (data) => {
  // console.log(data);
});

//listening room now
socket.on('server-send-room-socket', (data) => {
  $('#room-name').html(data);
});

//listening message from server
socket.on('server-send-chat', (data) => {
  $('.chat-container').append(
    `
    <li class='collection-item my-2 hover:bg-gray-200 p-2 rounded-lg'>
      <div class="flex justify-between">
        <p class='nameUser font-bold text-sm'>
          ${data.senderName}
        </p>
        <p class="font-normal text-xs text-gray-500">${formatDateTime(new Date())}</p>

      </div>
        <p class="">${data.message}</p>
    </li>
    `

    // '<li class="collection-item my-4"><h1>' +
    //   '</h1><p class="nameUser font-bold text-sm">' +
    //   data.senderName +
    //   "</p>" +
    //   data.message +
    //   "</li>"
  );
  $('#xconversation-container').animate(
    { scrollTop: $('#xconversation-container').prop('scrollHeight') },
    1000
  );
});
