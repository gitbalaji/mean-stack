
function parent(){
	 this.name = 'Balaji'; 
	 this.test = function(){
		console.log(this.name);
	 }
}

new parent().test();