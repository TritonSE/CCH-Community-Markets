$("#removeAdmin-button").click(function(event){
	const email = $("#removeAdmin-button").val();
	$.post('/admin-panel/removeAdmin', {email}, function(data) {
		if(data['success']){
			window.alert(email + " has successfully been removed as an administrator.");
			location.href='/admin-panel';
		}

		else{
			window.alert("Admin can not be removed please try again.");
		}
	});
});

