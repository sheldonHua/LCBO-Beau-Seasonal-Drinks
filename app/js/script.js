var app = {};

app.key = 'MDo0NTQyN2MzYS1hMjA0LTExZTctODg1NS01MzE1NzZlNzljOGI6cjRpVm8wd3k1MktnNkxWQVczSjZhQ1Q2QTVjNFlXSkphdGNZ';

console.log('hello world');

var data = {name: "Bud Light"};


app.init = function(){
	app.ajaxCall(app.key, data);
}

app.ajaxCall = function(accessKey){
	var nutritionApi = $.ajax({
		url: `https://lcboapi.com/products?access_key=${accessKey}`,
		headers: { 'Authorization': 'Token '+ accesskey }
		type: 'GET',
		dataType: 'json',
		data: JSON.stringify(dataObj) ,
		success: function(data){
			console.log(data);
		}
	});	
}


$(function(){
	app.init();
});