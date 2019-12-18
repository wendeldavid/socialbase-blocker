function save_options() {
    console.log('save');
    var input = document.getElementById('blocked_list');

    chrome.storage.local.set({
        "block_list": input.value
    }, function() {
        console.log('saved');
    });
}
function load_options() {
    console.log('load');
    var input = document.getElementById('blocked_list');
    
    chrome.storage.local.get(["block_list"], function(items) {
        console.log('loaded');
        if (!!items && !!items.block_list) {
            document.getElementById('blocked_list').value = items.block_list;
        }
    });
}

document.addEventListener('DOMContentLoaded', load_options);
document.getElementById('save_button').addEventListener('click', save_options);