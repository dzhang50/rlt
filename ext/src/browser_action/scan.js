chrome.tabs.executeScript(null, {
  code: 'document.body.innerHTML;'
}, function (arrayOfResults) {
  try {
    var r = new Readability(arrayOfResults[0], {});
  } catch (ex) {
    return console.error(ex.stack);
  }
  var div = document.createElement('div');
  div.innerHTML = r.getContent(true);
  var text = div.innerText;
  text = text.replace(/^\s+|\s+$/g, '');
  text = text.replace(/\s{2,}/g, ' ');
});
