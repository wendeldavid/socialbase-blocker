var data = []

function loadData(){
    chrome.storage.local.get("block_list", function(items) {
        console.log('loaded');
        if (!!items && !!items.block_list) {
            if ((typeof items.block_list) === "string") {

                var blockList = items.block_list.split(",");
                for (var i = 0; i < blockList.length; i++) {
                    data.push({
                        name : blockList[i]
                    });
                }
            } else {
                data = items.block_list;
            }
        }
        updateTable();
    });
}

function load_options() {
    console.log('load');
    loadData();
    
    $("#btAdd").click(function() {
        var blocked = $("#blockedInput").val();
        data.push({
            name : blocked
        });
        updateTable();
        $("#blockedInput").val("");
    });

    $("#btSave").click(function() {
        chrome.storage.local.set({
            "block_list" : data
        }, function() {
            console.log('saved');
        });
    });    
}

function removeRow(index) {
    data.splice(index, 1);
    updateTable();
}

function updateTable() {
    var $table = $('table');

    $table.find("tbody").remove();
    $table.append("<tbody></tbody>");
    var tableData = $table.find("tbody");

    for (var i = 0; i < data.length; i++) {
        tableData.append('<tr id="row_' + i + '"><td>' + data[i].name + '</td><td><button id="btRemove_' + i + '" type="button" class="btn btn-warning btRemove">remover</button></td></tr>');
        $('.btRemove').click(function(evt) {
            var index = evt.target.id.substr(9)
            removeRow(index);
        });
    }
}

document.addEventListener('DOMContentLoaded', load_options);


