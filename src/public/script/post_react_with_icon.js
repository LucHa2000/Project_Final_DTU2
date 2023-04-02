$(document).ready(function() {
    $(".btn-react").on("click", function() {
        var dataId = $(this).attr("data-id");
        $(".btn-react-heart").attr("href", "/post/react/1/" + dataId);
    });
    $(".btn-react").on("click", function() {
        var dataId = $(this).attr("data-id");
        $(".btn-react-like").attr("href", "/post/react/2/" + dataId);
    });
    $(".btn-react").on("click", function() {
        var dataId = $(this).attr("data-id");
        $(".btn-react-smile").attr("href", "/post/react/3/" + dataId);
    });
});