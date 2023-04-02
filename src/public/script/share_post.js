function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val("localhost:4000" + $(element).attr("href")).select();
    document.execCommand("copy");
    $temp.remove();
    return alert("Copy link post successfully!");
}