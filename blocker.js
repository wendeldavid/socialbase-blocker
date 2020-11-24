console.log('loading extension');

function block() {
    var aTags = document.getElementsByTagName('a');

    chrome.storage.local.get(["block_list"], function(data) {
        var blockList = data.block_list;

        for (var i = 0; i < aTags.length; i++) {

            for (var j = 0; j < blockList.length; j++) {

                var searchText = blockList[j].name;

                if (aTags[i].className.includes('feed-item__link') && aTags[i].innerHTML.includes(searchText.trim())) {

                    var found = aTags[i];
                    // console.log(found);

                    var blockElement = found.parentElement.parentElement.parentElement.parentElement.parentElement
                    .parentElement.parentElement.parentElement.parentElement.parentElement
                    
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
