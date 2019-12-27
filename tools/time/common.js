$(document).ajaxStart(function () {
    $("#loading").show();
});
$(document).ajaxStop(function () {
    $("#loading").hide();
});
//初始化对话框
$("#dialog").dialog({
    autoOpen: false,
    width: 400,
    buttons: [
        {
            text: "OK",
            click: function () {
                $(this).dialog("close");
            }
        }
    ]
});
fynas = {
    alert: function (content) {
        $("#dialog").dialog("option", {
            modal: true,
            title: "提示"
        }).html(content);
        $("#dialog").dialog("open");
    }
};
