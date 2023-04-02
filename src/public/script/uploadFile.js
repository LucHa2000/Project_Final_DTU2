// function handleFiles(files) {
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];

//     if (!file.type.startsWith('image/')) {
//       continue;
//     }

//     const img = document.createElement('img');
//     img.classList.add('obj');
//     img.file = file;
//     preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

//     const reader = new FileReader();
//     reader.onload = (function (aImg) {
//       return function (e) {
//         aImg.src = e.target.result;
//       };
//     })(img);
//     reader.readAsDataURL(file);
//   }
// }

const fileSelect = document.getElementById('fileSelect'),
  fileElem = document.getElementById('fileElem'),
  fileList = document.getElementById('fileList');

fileSelect.addEventListener(
  'click',
  function (e) {
    if (fileElem) {
      fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
  },
  false
);

fileElem.addEventListener('change', handleFiles, false);

function handleFiles() {
  if (this.files.length) {
    // fileList.innerHTML = '';
    // const list = document.createElement('ul');
    // fileList.appendChild(list);
    for (let i = 0; i < this.files.length; i++) {
      // const li = document.createElement('li');
      // list.appendChild(li);

      const img = document.getElementById('profile-avatar');
      img.src = URL.createObjectURL(this.files[i]);
      // img.height = 60;
      img.onload = function () {
        URL.revokeObjectURL(this.src);
      };
      // li.appendChild(img);
      // const info = document.createElement('span');
      // info.innerHTML = this.files[i].name + ': ' + this.files[i].size + ' bytes';
      // li.appendChild(info);
    }
  }
}
