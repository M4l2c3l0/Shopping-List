$(function() {                                    //Only starts when DOM loaded
  
  //SETUP
  var $list, $newItemForm, $newItemButton;
  var item = '';                                  //Item is an empty array
  $list = $('ul');                                //Cache the unordered list
  $newItemForm = $('#newItemForm');               //Cache form to add new items
  $newItemButton = $('#newItemButton');           //Cache button to show form
  
  $('li').hide().each(function (index) {          //Hide list items
    $(this).delay(450 * index).fadeIn(1600);      //Then fade them  in
  });
  
  //ITEM COUNTER
  function updateCount() {                        //Declare function
    var items = $('li[class!=complete]').length;  //Number of items in list
    $('#counter').text(items);                    //Added into counter circle
  }
  updateCount();                                  //Call function
  
  //SETUP FORM FOR NEW ITEMS
  $newItemButton.show();                          //Show button
  $newItemForm.hide();                            //Hide form
  $('#showForm').on('click', function() {         //When new item cicked
    $newItemButton.hide();                        //Hide button
    $newItemForm.show();                          //Show form
  });
  
  //ADDING NEW LIST ITEM
  $newItemForm.on('submit', function(e) {         //When new item submitted
    e.preventDefault();                           //Prevent form being submitted
    var text = $('input:text').val();             //Get value of text input
    $list.append('<li>' + text + '</li>');         //Add item to end of the list
    $('input:text').val('');                      //Empty text input
    updateCount();                                //Update count
  });
  
  //CLICK HANDLING - USES DELEGATION ON <ul> ELEMENT
  $list.on('click', 'li', function () {
    var $this = $(this);                          //Cache element in jQuery object
    var complete = $this.hasClass('complete');    //Item complete
    
    if(complete === true) {                       //Check if item is complete
      $this.animate({                             //If so, animate opacity + padding left
        opacity: 0.0,
        paddingLeft: '+=180'
      }, 500, 'swing', function() {               //Use callback when animation completes
        $this.remove();                           //Then completely remove this item
      });
    } else {                                      //Otherwise indicate it is complete
      item = $this.text();                        //Get the text from the list item
      $this.remove();                             //Remove the list item
      $list                                       //Add back to end of list as complete
        .append('<li class=\"complete\">' + item + '</li>')
        .hide().fadeIn(300);                      //Hide it so it can be faded in
      updateCount();                              //Update the counter
    }                                             //End of else
  });                                             //End of event handler
  
});