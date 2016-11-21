//split and replace with boinga
String.prototype.doMartian = function() {
    var str = this.split(' ');
    var txt = '';
    str.forEach(function(item) {
      item = item.length > 3 ? 'boinga' : item;
      txt += ' ' + item;
    });
    txt = txt.trim();
    return txt;
}


//template for each story in main language
var listTemplate = _.template(
	"<% if (photo)" +
	"{%><div class='row'>" +
	"<div class='col-md-8'><h5 class='straps'><%= strap %></h5><h4 class='headline'><a href='<%= url %>'><%= head %></a></h4><p class='authorname inline'><%= author %></p><p class='date inline'><%= date %></p><p><%= text %></p></div>" +
	"<div class='col-md-4'><img class='img-responsive' src='<%= photo %>'></div>" +
	"</div><%}" +
	"else" +
	"{%><div class='row'>" +
	"<div class='col-md-8'><h5 class='straps'><%= strap %></h5><h4 class='headline'><a href='<%= url %>'><%= head %></a></h4><p class='authorname inline'><%= author %></p><p class='date inline'><%= date %></p></div>" +
	"</div>" +
	"<%}%>" +
	"<hr class='linebreak'>"
	// "<% if (photo)" +
	// "{%><div class='row'>" +
	// "<div class='col-md-8'><h5 class='straps'><%= strap %></h5><h4 class='headline'><a href='<%= url %>'><%= head %></a></h4><p class='authorname inline'><%= author %></p><p class='date inline'><%= date %></p><p><%= text %></p></div>" +
	// "<div class='col-md-4'><img class='img-responsive' src='<%= photo %>'></div>" +
	// "</div><%}" +
	// "else if (text)" +
	// "{%><div class='row'>" +
	// "<div class='col-md-8'><h5 class='straps'><%= strap %></h5><h4 class='headline'><a href='<%= url %>'><%= head %></a></h4><p class='authorname inline'><%= author %></p><p class='date inline'><%= date %></p><p><%= text %></p></div>" +
	// "</div><%}"+
	// "else" +
	// "{%><div class='row'>" +
	// "<div class='col-md-8'><h5 class='straps'><%= strap %></h5><h4 class='headline'><a href='<%= url %>'><%= head %></a></h4><p class='authorname inline'><%= author %></p><p class='date inline'><%= date %></p></div>" +
	// "</div>" +
	// "<%}%>" +
	// "<hr class='linebreak'>"
);





//main 
var wsj_world = $.getJSON("data/wsj_world.json", function(data) {
	
	function doRender(type) {
		$('#contain-wrap').html('');

		data.forEach(function(d) {
			var eachstrap = d.headlines

			var eachstory = eachstrap.forEach(function(m) {
				//parse date
				var date = new Date(m.date);
				var dateToStr = date.toUTCString().split(' ');
				var cleanDate = dateToStr[2] + ' ' + dateToStr[1] + ', ' + dateToStr[3];

				//find all authors
				var author = []
				m.authors.forEach(function(n) {
				  var authorname = n.authorName;
				  //change the name of author to Martian languange, its not necessary for real use, but...just try if we need
				  if (type == 'martian') {
				    author.push(authorname.doMartian());
				  } else {
				    author.push(authorname);
				  }
				})

				//find image from key 'image', avoid null src, if so find the first object of key 'images'
				var image = m.image;
				if (m.image == null) {
				  var count = 0;
				  for (k in m.images) {
				    count++;
				    if (count == 2) {
				      image = m.images[k]
				      break;
				    }
				  }
				}
  
			

				//switch chart 
				if (type == 'english') {
					$('#contain-wrap').append(
						listTemplate({
							strap: m.flashline,
							url: m.desktop_url,
							head: m.headline,
							date: cleanDate,
							author: author,
							photo: image,
							text: m.text
						})
				  	);
				} else {
					if(m.text == null){
						$('#contain-wrap').append(
							listTemplate({
								strap: m.flashline.doMartian(),
								url: m.desktop_url,
								head: m.headline.doMartian(),
								date: cleanDate,
								author: author,
								photo: image,
								text: m.text
							})
						);
				} else {
					$('#contain-wrap').append(
						listTemplate({
							strap: m.flashline.doMartian(),
							url: m.desktop_url,
							head: m.headline.doMartian(),
							date: cleanDate,
							author: author,
							photo: image,
							text: m.text.doMartian()
						})
					)
				}
				
				}



			})
		});
	}

	//render chart
	doRender('english');



	//toggle between two languages
	$(".button-row").on("click", function() {
		$('.button-row').removeClass('selected')
		  // console.log($(this))
		$(this).addClass('selected')
		var thisid = $(this).data("lang");
		if (thisid == 'english') {
		  doRender('english');
		} else {
		  doRender('martian');
		}
	});

});