const videoContainer = document.querySelector("#videos");

const vm = new Vue({
  el: "#app",
  data: {
    userToken: "",
    roomToken: "",
    roomId: "",
    room: undefined,
    client: undefined,
  },

  //base data old
  computed: {
    roomUrl: function () {
      return `${location.hostname}:4000/callVideo?room=${this.roomId}`;
    },
  },

  mounted() {
    api.setRestToken();
    //read url
    const urlParams = new URLSearchParams(location.search);
    const roomId = urlParams.get("room");

    if (roomId) {
      this.roomId = roomId;
      this.joinRoom();
    }
  },
  methods: {
    //login to stringge
    login: function () {
      return new Promise(async (resolve) => {
        const userId = (Math.random() * 1000).toFixed(0);
        const userToken = await api.getUserToken(userId);
        this.userToken = userToken;

        const client = new StringeeClient();
        client.on("authen", (result) => {
          console.log("on authen ", result);
          resolve(result);
        });

        client.connect(userToken);

        this.client = client;
      });
    },

    publishVideo: async function (shareScreen = false) {
      const localTrack = await StringeeVideo.createLocalVideoTrack(
        this.client,
        {
          audio: true,
          screen: shareScreen,
          video: true,
          videoDimensions: { width: 640, height: 360 },
        }
      );

      const videoElement = localTrack.attach();
      videoContainer.appendChild(videoElement);

      //join room
      const roomData = await StringeeVideo.joinRoom(
        this.client,
        this.roomToken
      );
      const room = roomData.room;
      console.log({ roomData, room });
      this.room = room;

      //clear method
      room.clearAllOnMethos();
      room.on("addtrack", async (event) => {
        //get track
        const trackInfo = event.info.track;
        //your track
        if (trackInfo.serverId === localTrack.serverId) {
          return;
        }
        this.subscribeTrack(trackInfo);
      });
      //remove track when leave
      room.on("removetrack", (event) => {
        if (!event.track) {
          return;
        }
        const elements = event.track.detach();
        elements.forEach((element) => element.remove());
      });
      //sub all user in room
      roomData.listTracksInfo.forEach((trackInfo) =>
        this.subscribeTrack(trackInfo)
      );

      //publish room for everyone
      room.publish(localTrack);
    },
    createRoom: async function () {
      const room = await api.createRoom();

      const roomToken = await api.getRoomToken(room.roomId);

      this.roomId = room.roomId;
      this.roomToken = roomToken;

      //login
      await this.login();
      await this.publishVideo();

      //add roomId
      const displayRoomId = document.querySelector("#roomId");
      displayRoomId.textContent = this.roomId;
      //add room url
      const displayRoomUrl = document.querySelector("#roomUrl");
      displayRoomUrl.textContent = this.roomUrl;
      //videoContainer.appendChild(videoElement);
      console.log(this.roomId);
    },
    joinRoom: async function (showPrompt = false) {
      if (showPrompt) {
        const roomId = prompt("past this roomID ");
        if (!roomId) {
          return;
        }
        this.roomId = roomId;
      }

      const roomToken = await api.getRoomToken(this.roomId);

      this.roomToken = roomToken;

      //login and publish
      await this.login();
      await this.publishVideo();
    },

    subscribeTrack: async function (trackInfo) {
      //attach track
      const track = await this.room.subscribe(trackInfo.serverId);
      track.on("ready", () => {
        const ele = track.attach();
        this.addVideo(ele);
      });
    },
    addVideo: function (videoElement) {
      videoElement.setAttribute("controls", true);
      videoElement.setAttribute("playsinline", true);
      videoContainer.appendChild(videoElement);
    },
  },
});
