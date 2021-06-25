console.log('loading extension');

function block() {
    
    var allNames = document.querySelectorAll('span.ss-post-header-author-name > a');

    chrome.storage.local.get(["block_list"], function(data) {
        var blockList = data.block_list;

        for (var i = 0; i < allNames.length; i++) {

            for (var j = 0; j < blockList.length; j++) {

                var searchText = blockList[j].name;

                if (allNames[i].innerHTML.includes(searchText.trim())) {

                    var found = allNames[i];
                    // console.log(found);

                    var blockElement = found.parentElement.parentElement.parentElement.parentElement.parentElement
                    
                    // console.log('blocking...');
                    blockElement.style.display = 'none';
                }
            }
        }
    });

}

document.body.onscroll = function() {
    block();
}
