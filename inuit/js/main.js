google.load("feeds", "1");

$(function(){
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/u1fukui/repos',
    cache: false,
    dataType: 'jsonp',
    success: function(data) {
      var datas, i, l, repoElement, reposElement, desc;
      datas = data.data;
      reposElement = $('#repositories ul');
      for(i=0, l=datas.length; i<l; i++) {
        data = datas[i];
        repoElement = $('<li><a class="url"></a><span class="desc" /></li>');
        repoElement.find('a').attr('href', data.html_url).html(data.name);
        desc = (data.description || '').slice(0, 20);
        if(desc != (data.description || '')) {
          desc += '...';
        }
        repoElement.find('.desc').text(desc);
        if(data.fork){
          repoElement.addClass('fork');
        }

        if(data.language){
          repoElement.addClass('lang-' + data.language.toLowerCase());
        }

        reposElement.append(repoElement);
      }
    }
  });
});

function initialize() {
  var feed = new google.feeds.Feed("http://u1fukui.hateblo.jp/feed");
  feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
  feed.load(function(result) {
    if (!result.error) {
      var container = $('#blog_archive ul');
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href", entry.link);
        a.appendChild(document.createTextNode(entry.title));
        li.appendChild(a);
        container.append(li);
      }
    }
  });
}
google.setOnLoadCallback(initialize);