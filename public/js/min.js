        //client side file.
        //create an Ajax Request to Delete An Article

  $(document).ready(function(){
    $('.delete-article-class').on('click',function(e)
      {

      $target = $(e.target);
      console.log($target)
      const id = $target.attr('data-id');//get id of deleted object.stored
      var result = confirm("Want to delete?");
if (!result) {
    //Logic to delete the item
    alert('That was Close ,Your Article is Still Here ♥');

}
//in data-id object like view bag in MVC asp
else {


      $.ajax({
          type : 'DELETE',
          url : '/articles/'+id,
            success:function(response)//if successful delete
            {
            alert ('Deleted Successfully');
            window.location.href='/';

          },
            error:function(err)//falied to delete
            {
            console.log(err);
            }
          });
          }
      });
      });
