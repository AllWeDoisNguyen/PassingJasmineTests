//************ Initial Tests ****************************************
// $(function() {
// 	console.log("The document is ready!");
// 	$('#new-message-button').on('click', sendMessage);

// 	$('#new-message-button').click(function(){
// 		console.log('****');
// 		console.log('The new message button was clicked!');

// 		var textarea = $('#new-message-body');
// 		console.log('This is the text area');
// 		console.log(textarea);

// 		console.log('This is the message body');
// 		var newMessageBody = textarea.val();
// 		console.log(newMessageBody);

// 	});
//*****************Passing Jasmine Tests *******************************************

$(document).on('ready page:load', function(){

	var whoCanTalk = ['Me', 'Myself', 'I'];
	var i = 0;


	function tellJoke(){
		$.ajax({
      	url: "http://api.icndb.com/jokes/random",
      	method: 'GET',
      	success: function(data){
      		// console.log(data.value.joke);
      		var joke = data.value.joke;
			$('#conversation').append(messageStructure(joke, 'Internet'));	
      	}
		});
	};

	function messageStructure(message, author){
		return  "<li class='message'>\
				<a class='delete' href='#'>Delete</a>\
				<h3 class='author'>" + author + "</h3>\
				<p class='message-body'>" + message + "</p>\
				<span class='timestamp'>" + getTime() + "</span>\
				</li>"
	};

	function getTime(){
		var time = new Date();
		var hours = time.getHours();
		var min = time.getMinutes();
		var formattedTime = hours + ":" + min;
		return formattedTime;
	};

	function createMessage() {
		// console.log('button was clicked');
		// console.log(message);
		var message = $('#new-message-body');
		$("#conversation").append(messageStructure(message.val(), whoCanTalk[i % 3]));
		message.val('');
		i++;
	};

	$('#new-message-button').on('click', createMessage);
	$('#new-message-body').keypress(function(event){
		// console.log(event.which);
		if (event.which === 13){
			event.preventDefault();
			createMessage();
		}
	});
	// $('.delete').on('click', function(){
	// 	console.log($(this));
	$('body').on('click', 'a.delete', function(){
		// console.log($(this).parent());
		$(this).parent().remove();
	});
	$('#lonely').on('click', tellJoke);
});



