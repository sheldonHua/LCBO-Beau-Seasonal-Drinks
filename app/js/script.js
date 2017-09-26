var app = {};

app.key = 'MDo0NTQyN2MzYS1hMjA0LTExZTctODg1NS01MzE1NzZlNzljOGI6cjRpVm8wd3k1MktnNkxWQVczSjZhQ1Q2QTVjNFlXSkphdGNZ';

app.init = function() {
	app.ajaxCall(app.key, "beaus");
}

app.ajaxCall = function(accessKey, search) {
	$.ajax({
		url: `https://lcboapi.com/products?q=${search}`,
		headers: { 'Authorization': 'Token '+ accessKey },
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log(data);
			app.filter(data.result);
		}
	});	
}

app.filter = function(data) {
	// return seasonal drinks
	app.seasonal = data.filter(function(drink) {
		return drink.is_seasonal === true;
	});
	// return array of product id(s)
	app.productId = app.seasonal.map(function(drink) {
		return drink.id;
	});

	console.log(app.seasonal);
	console.log(app.productId);
}

$(function() {
	app.init();
});