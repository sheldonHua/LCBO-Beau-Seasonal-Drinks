var app = {};

app.key = 'MDo0NTQyN2MzYS1hMjA0LTExZTctODg1NS01MzE1NzZlNzljOGI6cjRpVm8wd3k1MktnNkxWQVczSjZhQ1Q2QTVjNFlXSkphdGNZ';

console.log('hello world');

var data = {name: "Bud Light"};


app.init = function(){
	app.ajaxCall(app.key, data);
}

app.ajaxCall = function(accessKey, dataObj){
	var nutritionApi = $.ajax({
		url: `https://lcboapi.com/products?q=beaus`,
		headers: { 'Authorization': 'Token '+ accessKey },
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log(data);
		}
	});	
}


$(function(){
	app.init();
});