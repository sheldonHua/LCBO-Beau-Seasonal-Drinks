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
			app.getProductId(data.result);
			//console.log(data);
		}
	});	
}

app.getStores = function(accessKey, product) {
	var drinkList = [];
	for (i = 0; i < product.length; i++){
		$.ajax({
			url: `https://lcboapi.com/stores?product_id=${product[i]}`,
			headers: { 'Authorization': 'Token '+ accessKey },
			type: 'GET',
			dataType: 'json',
			success: function(data){
				console.log(data);
				app.parseData(data);
			}
		});	
	}

	console.log(app.drinkArray);
	//console.log(drinkList);

	//app.parseData(drinkList);
	//once loop is done display html

}

app.parseData = function(data) {
	var drinkHtml = 
	`<div class="food"><img src="${data.product.image_thumb_url}"/></div>`;

	app.drinkArray.push(drinkHtml);

}

app.getProductId = function(data) {
	// return seasonal drinks
	var seasonal = data.filter(function(drink) {
		return drink.is_seasonal === true;
	});

	// return array of product id(s)
	var productId = seasonal.map(function(drink) {
		return drink.id;
	});

	//console.log(productId);

	app.getStores(app.key, productId);
}

$(function() {
	app.init();
});