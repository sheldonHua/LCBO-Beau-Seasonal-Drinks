var app = {};

app.key = 'MDo0NTQyN2MzYS1hMjA0LTExZTctODg1NS01MzE1NzZlNzljOGI6cjRpVm8wd3k1MktnNkxWQVczSjZhQ1Q2QTVjNFlXSkphdGNZ';

app.drinkArray = [];

var $overlayWrapper = $('.overlay-content .wrapper');

app.init = function() {
	app.getDrink(app.key, "beaus");
	
	$(document).on('click', '.drinks' ,function() {
		app.loader();
		var myNav = document.getElementById("myNav");
		myNav.style.width = "100%";
		myNav.style.backgroundColor = "rgba(0,0,0, 0.9)";
		$('.overlay').addClass('animation');
		var productId = $(this).attr("data-id");
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
			app.parseContent(data, app.parseStore(data.result));
		}
	});		
}

app.parseStore = function(stores){
	var storeList = stores
	.map(function(store){
			var storeHTML = `
				<span>${store.name}, </span>
			`;
			return storeHTML;	
	}).join(' ');

	return storeList;
}

app.parseContent = function(drink, store) {
	console.log(drink);
	if (drink.product.image_url === null){
		var drinkHTML = `
			<div class="drink-content clearfix">
				<div class="img-container">
					<img src="image/placeholder_full.png" />
				</div>
				<div class="content-container">
					<h1>${drink.product.name}</h1>
					<p>${drink.product.tasting_note}</p>
					<h2>Stores:</h2>
					<p class="storeList">${store}</p>
				</div>
			</div>
		`;
		$overlayWrapper.html(drinkHTML);
	}
	else {
		var drinkHTML = `
			<div class="drink-content clearfix">
				<div class="img-container">
					<img src="${drink.product.image_url}" />
				</div>
				<div class="content-container">
					<h1>${drink.product.name}</h1>
					<p>${drink.product.tasting_note}</p>
					<h2>Stores:</h2>
					<p class="storeList">${store}</p>
				</div>
			</div>
		`;
		$overlayWrapper.html(drinkHTML);
	}
	
}

app.parseThumbnail = function(drinks) {
	var drinkList = drinks
	.map(function(drink){
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

	$('.drinkCall .wrapper').html(drinkList);
}

app.filterData = function(data) {
	// return seasonal drinks
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