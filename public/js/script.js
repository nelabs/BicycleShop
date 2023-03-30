$('#edit-post-form').submit(function(event) {
  event.preventDefault(); // prevent the form from submitting normally
  var postId = $('input[name="_id"]').val();
  var formData = $(this).serialize(); // get form data as a string
  $.ajax({
    url: '/members/posts/' + postId,
    type: 'PATCH',
    data: formData,
    success: function(response) {
      // handle success response
      console.log(postId);
      $('#success-message').toggle();
      $('#success-message').html('Item has been updated successfully!');

    },
    error: function(error) {
      // handle error response
      console.log(error);

    }
  });
});