//split and replace with boinga
String.prototype.allReplace = function(){
	var str = this;
	var txt = str.split(",");
	return str;

}


//template for each story in main language
var listTemplate = _.template(
	"<% if (photo)" +
	"{%><div class='row'>"+
		"<div class='col-md-8'><h5 class='straps'><%= strap %></h5><h4 class='headline'><a href='<%= url %>'><%= head %></a></h4><p class='authorname inline'><%= author %></p><p class='date inline'><%= date %></p></div>"+ 
		"<div class='col-md-4'><img class='img-responsive' src='<%= photo %>'></div>"+
	  "</div><%}"+
	"else" +
	"{%><div class='row'>"+
		"<div class='col-md-8'><h5 class='straps'><%= strap %></h5><h4 class='headline'><a href='<%= url %>'><%= head %></a></h4><p class='authorname inline'><%= author %></p><p class='date inline'><%= date %></p></div>"+
		"</div>"+
	"<%}%>"+
	"<hr class='linebreak'>"

);


var wsj_world = $.getJSON( "data/wsj_world.json", function(data) {
	
	data.forEach( function(d){
		var eachstrap = d.headlines

		var eachstory = eachstrap.forEach(function(m){
			
			//parse date
			var date = new Date(m.date);
	    	var dateToStr = date.toUTCString().split(' ');
	    	var cleanDate = dateToStr[2] + ' ' + dateToStr[1] + ', ' + dateToStr[3];
			
			//find all authors
			var author = []
			m.authors.forEach(function(n){
				var authorname = n.authorName;
				author.push(authorname)
			})

			//find image, avoid null src
			var image = m.image;
			if (m.image == null)
			{
				var count = 0;
	            for (k in m.images){
	            	count++;
	            	if (count == 2)
	            	{
	            		image = m.images[k]
	            		break;
	            	}
	            }
			}


			
			
			$('.english').append( 
				listTemplate({
					strap:m.flashline,
					url:m.desktop_url, 
					head: m.headline, 
					date:cleanDate, 
					author:author,
					photo:image
				})
			)


			//????toggle between two languages
			$(".button-row").on("click", function(){
				$('.button-row').removeClass('selected')
				// console.log($(this))
				$(this).addClass('selected')
				var thisid = $(this).attr("dataid");
				

				if (thisid == 'english'){
					$('.english').append( 
						listTemplate({
							strap:m.flashline,
							url:m.desktop_url, 
							head: m.headline, 
							date:cleanDate, 
							author:author,
							photo:image
						})
					)
				}else {
					$('.martin').append( 
						listTemplate({
							strap:m.headline,
							url:m.desktop_url, 
							head: m.headline, 
							date:cleanDate, 
							author:author,
							photo:image
						})
					)
				}


				$('.switch-chart').removeClass("selected");
				$('#'+thisid).addClass("selected");

			})
			
			




		})

		
	})

			



});