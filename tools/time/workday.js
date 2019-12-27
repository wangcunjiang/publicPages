(function () {
    //计算工作日
    $("#compute-workday").click(function () {
        var me = $(this);
        $("#loading").show();
        $("#workday-result").text("----");
        $.ajax({
            type: "POST",
            url: "/workday/count",
            data: {
                start_date: formatDate($("#start-date").val()),
                end_date: formatDate($("#end-date").val())
            }
        }).done(function (result) {
            $("#loading").hide();
            if (result.status > 0) {
                fynas.alert(result.message);
            } else {
                $("#workday-result").text(result.data.workday);
                $("#total").text(result.data.total);
                $("#weekend").text(result.data.weekend);
                $("#holiday").text(result.data.holiday);
                $("#extra").text(result.data.extra);
                $("#financial").text(result.data.workday - result.data.extra);
                $("#donate").removeClass("hidden");
            }
        });
    });
    //计算本月
    $("#this-month").click(function () {
        var now = new Date();
        $("#start-date").val(formatDate(now.getFullYear() + "-" + (now.getMonth() + 1) + "-01"));
        $("#end-date").val(formatDate(now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()));
        $("#compute-workday").click();
    });
    //计算下月
    $("#next-month").click(function () {
        var now = new Date();
        if (now.getMonth() === 11) {//如果当前是12月，则下月是明年1月
            $("#start-date").val((now.getFullYear() + 1) + "-01-01");
            $("#end-date").val((now.getFullYear() + 1) + "-01-31");
        } else {
            $("#start-date").val(formatDate(now.getFullYear() + "-" + (now.getMonth() + 2) + "-01"));
            $("#end-date").val(formatDate(now.getFullYear() + "-" + (now.getMonth() + 2) + "-" + new Date(now.getFullYear(), now.getMonth() + 2, 0).getDate()));
        }
        $("#compute-workday").click();
    });

    //计算工作日结束日期
    $("#compute-end-date").click(function () {
        $("#loading").show();
        $("#end-date-result").text("----");
        $.ajax({
            type: "POST",
            url: "/workday/end",
            data: {
                start_date: formatDate($("#start-date-2").val()),
                days: $("#days").val()
            }
        }).done(function (result) {
            $("#loading").hide();
            if (result.status > 0) {
                fynas.alert(result.message);
            } else {
                var dayOfWeek = "日一二三四五六".charAt(new Date(result.data).getDay());
                $("#end-date-result").text(result.data + "（周" + dayOfWeek + "）");
                $("#donate").removeClass("hidden");
            }
        });
    });

})();

/**
 * 将2000-1-1补全成2000-01-01日期格式
 * @param {string} str
 * @returns {String}
 */
function formatDate(str)
{
    var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
    if (results && results.length > 3) {
        var date = new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));
        var MM = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
        return date.getFullYear() + "-" + MM + "-" + dd;
    } else {
        return null;
    }
}
