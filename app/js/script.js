var app = {};

app.key = 'MDo0NTQyN2MzYS1hMjA0LTExZTctODg1NS01MzE1NzZlNzljOGI6cjRpVm8wd3k1MktnNkxWQVczSjZhQ1Q2QTVjNFlXSkphdGNZ';

app.drinkArray = [];

app.init = function() {
	app.getDrink(app.key, "beaus");
	//app.getStores(app.key);
}

app.getDrink = function(accessKey, search) {
	$.ajax({
		url: `https://lcboapi.com/products?q=${search}`,
		headers: { 'Authorization': 'Token '+ accessKey },
		type: 'GET',
		dataType: 'json',
		success: function(data){
			app.filterData(data.result);
			//console.log(data);
		}
	});	
}

app.getStores = function(accessKey, product) {
	$.ajax({
		url: `https://lcboapi.com/stores?product_id=${product[i]}`,
		headers: { 'Authorization': 'Token '+ accessKey },
		type: 'GET',
		dataType: 'json',
		success: function(data){
			//console.log(data);
			//app.parseData(data);
		}
	});		
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

	console.log(drinkList);
	$('.drinkCall .wrapper').html(drinkList);
}

app.filterData = function(data) {
	// return seasonal drinks
	var seasonal = data.filter(function(drink) {
		return drink.is_seasonal === true;
	});

	app.parseThumbnail(seasonal);
}

$(function() {
	app.init();
});