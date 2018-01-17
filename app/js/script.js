var app = {};

app.key = 'MDo0NTQyN2MzYS1hMjA0LTExZTctODg1NS01MzE1NzZlNzljOGI6cjRpVm8wd3k1MktnNkxWQVczSjZhQ1Q2QTVjNFlXSkphdGNZ';

var $overlayWrapper = $('.overlay-content .wrapper');

app.init = function() {
	// Search product Beau's
	app.getDrink(app.key, "beaus");
	
	$(document).on('click', '.drinks' ,function() {
		app.loader();
		var myNav = document.getElementById("myNav");
		myNav.style.width = "100%";
		myNav.style.backgroundColor = "rgba(0,0,0, 0.9)";
		$('.overlay').addClass('animation');
		var productId = $(this).attr("data-id");

		// Get store and drink content and append it onto flyover
		app.getStores(app.key, productId);

	});

	$(document).on('click', '.closebtn' ,function() {
		$('.overlay').removeClass('animation');
		$overlayWrapper.empty();
		document.getElementById("myNav").style.width = "0%";
	});

}

app.getDrink = function(accessKey, search) {
	$.ajax({
		url: `https://lcboapi.com/products?q=${search}`,
		headers: { 'Authorization': 'Token '+ accessKey },
		type: 'GET',
		dataType: 'json',
		success: function(data){
			app.filterData(data.result);
		}
	});	
}

app.getStores = function(accessKey, product) {
	$.ajax({
		url: `https://lcboapi.com/stores?product_id=${product}`,
		headers: { 'Authorization': 'Token '+ accessKey },
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log(data)
			app.parseContent(data, app.parseStore(data.result));
		}
	});		
}

app.parseStore = function(stores){
	// Generate an array of store locations formatted in html
	var storeList = stores
	.map(function(store){
			var storeHTML = `
				<a href="http://maps.google.com/?q=${store.address_line_1 + " " + store.city }" target="_blank"><i class="fa fa-map-marker" aria-hidden="true"></i> ${store.name}, </a>
			`;
			return storeHTML;	
	}).join(' ');

	return storeList;
}

app.parseContent = function(drink, store) {
	// If data is null replace with placeholder content
	if (drink.product.image_url === null) {
		drink.product.image_url = "image/placeholder_full.png";
	}

	if (drink.product.tasting_note === null) {
		drink.product.tasting_note = "No description available.";
	}

	var drinkHTML = `
		<div class="drink-content clearfix">
			<div class="img-container">
				<img src="${drink.product.image_url}" />
			</div>
			<div class="content-container">
				<h1>${drink.product.name}</h1>
				<p>${drink.product.tasting_note}</p>
				<h2>Available LCBO locations:</h2>
				<ul>
				<li class="storeList">${store}</li>
				</ul>
			</div>
		</div>
	`;	

	// Append drink content onto flyover
	$overlayWrapper.html(drinkHTML);
}

app.parseThumbnail = function(drinks) {

	// Generate an array with all the drinks formatted in html
	var drinkList = drinks
	.map(function(drink){

			// Use placeholder image if no thumbnail image is returned from api
			if (drink.image_thumb_url === null){
				var drinkHTML = `
					<div class="drinks" data-id="${drink.id}">
						<img src="image/placeholder.png" />
						<h1>${drink.name}</h1>
					</div>
				`;
				return drinkHTML;
			}
			else {
				var drinkHTML = `
					<div class="drinks" data-id="${drink.id}">
						<img src="${drink.image_thumb_url}" />
						<h1>${drink.name}</h1>
					</div>
				`;
				return drinkHTML;
			}
		}).join(' ');

	// Append drinks onto page
	$('.drinkCall .wrapper').html(drinkList);
}

app.filterData = function(data) {
	// Filter and return seasonal drinks only
	var seasonal = data.filter(function(drink) {
		return drink.is_seasonal === true;
	});
	app.parseThumbnail(seasonal);
}

app.loader = function(){
	$overlayWrapper.html(`<div class="spinner">
		  <div class="bounce1"></div>
		  <div class="bounce2"></div>
		  <div class="bounce3"></div>
	</div>`);
}

$(function() {
	app.init();
});