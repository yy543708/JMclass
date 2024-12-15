$("#btn_search").on("click", function() {

        var knum = $("#knum").val();
        var kname = $("#kname").val();

        if (knum == "") {
            alert("생년월일을 입력하세요!");
            $("#knum").focus();
            return false;
        }
        if (kname == "") {
            alert("이름을 입력하세요!");
            $("#kname").focus();
            return false;
        }

        var proc = "searchMember";

        $.ajax({
            url: '/layouts/jeongmyung/process/main_proc.php',
            type: 'POST',
            dataType: 'text',
            data: {
                knum: knum,
                kname: kname,
                proc: proc
            },
            async: false,
            success: function(data, textStatus, jqXHR) {
                var data_arr = data.split("^^");
                if (data_arr[0].trim() == "ok") {
                    $("#resultText").removeClass("hidden");
                    $("#resultText").html("조회 결과 : " + data_arr[1]);
                } else if (data_arr[0].trim() == "err") {
                    alert("검색되지 않습니다. 이름과 생년월일을 확인하시기 바랍니다.");
                    $("#knum").focus();
                } else {
                    alert("시스템에 문제가 있습니다.[ " + data + " ]\n관리자에게 문의해 주세요.");
                    $("#knum").val("");
                    $("#kname").val("");
                }
            },
            error: function() {
                return;
            }
        });
    });
