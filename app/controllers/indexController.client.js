'use strict';

(function () {

  
   var apiUrlGetPlaces = window.location.origin + '/api/places';
   var apiUrlAttPlaces = window.location.origin + '/api/place/';
   var apiUrlLogin= window.location.origin + '/auth/twitter';

   $(document).ready(function(){

      if(localStorage.getItem('lastSearch')!= null)
        { 
          $('.loader').show();
          var buffer = localStorage.getItem('lastSearch');
          $('#location').val(buffer);
          $(".list-group").empty();     
          $.ajax({
                   type: "get",
                   url: apiUrlGetPlaces, 
                   data: { location: buffer},
                   dataType: "json"
               }).done(function ( data ) {
                  data.forEach(function(element){   
                   
                     $(".list-group").append("<li class=\"list-group-item row\"><div class=\"col-xs-3\"><img  height=\"171\" width=\"180\" src=\""+ element.image_url +"\"></div><div class=\"col-xs-4 text-left\"><h3>"+element.name+"</h3><div class=\""+element.id+"-span\"><span class=\"star-icon \">☆</span><span class=\"star-icon \">☆</span><span class=\"star-icon \">☆</span><span class=\"star-icon \">☆</span><span class=\"star-icon \">☆</span><p class=\"rating\">"+element.rating+" </p></div><p>"+ (element.price !=undefined ? element.price : "") +"</p><a  onclick=\"window.open('http://maps.google.com/?q=" +element.location.address1 +"', '_blank');\">"+ element.location.address1+"</a></div><div class=\"col-xs-4\"><button  id=\"going-btn\" name=\""+element.id+"\" class=\"btn my-btn going-btn\" ><span id=\""+element.id+"\">"+element.attendance_number+"</span><p> GOING</p></button></div></li>")   
                    
                     $("."+element.id+"-span").children("span").each(function(index){
                       var  value = element.rating - (index + 1)
                          if( value >= 0)
                            $( this ).addClass( "full" );
                          if( value == - 0.5)
                             $( this ).addClass( "half" );
                         })
                  })
                   $('.loader').hide();
                  
               })
               localStorage.clear();
        }
      $('#submit-form').click(function( event ) {
        $('.loader').show();
        localStorage.setItem('lastSearch', $('#location').val());

          $(".list-group").empty();         
          $.ajax({
                   type: "get",
                   url: apiUrlGetPlaces, 
                   data: { location: $('#location').val()},
                   dataType: "json"
               }).done(function ( data ) {
                  data.forEach(function(element){   
                   
                     $(".list-group").append("<li class=\"list-group-item row\"><div class=\"col-xs-3\"><img  height=\"171\" width=\"180\" src=\""+ element.image_url +"\"></div><div class=\"col-xs-4 text-left\"><h3>"+element.name+"</h3><div class=\""+element.id+"-span\"><span class=\"star-icon \">☆</span><span class=\"star-icon \">☆</span><span class=\"star-icon \">☆</span><span class=\"star-icon \">☆</span><span class=\"star-icon \">☆</span><p class=\"rating\">"+element.rating+" </p></div><p>"+ (element.price !=undefined ? element.price : "") +"</p><a  onclick=\"window.open('http://maps.google.com/?q=" +element.location.address1 +"', '_blank');\">"+ element.location.address1+"</a></div><div class=\"col-xs-4\"><button  id=\"going-btn\" name=\""+element.id+"\" class=\"btn my-btn going-btn\" ><span id=\""+element.id+"\">"+element.attendance_number+"</span><p> GOING</p></button></div></li>")   
                    
                     $("."+element.id+"-span").children("span").each(function(index){
                       var  value = element.rating - (index + 1)
                          if( value >= 0)
                            $( this ).addClass( "full" );
                          if( value == - 0.5)
                             $( this ).addClass( "half" );
                         })
                  })
                   $('.loader').hide();
                  
               })
           event.preventDefault();
      })

      $('.list-group').on('click', '#going-btn', function(){
               var spanElement = $(this).children(":first");
               $.ajax({
                   type: "post",
                   url: apiUrlAttPlaces, 
                   data: { city: this.name},
                   dataType: "json"
               }).done(function ( data ) {
                     spanElement.text(data.attendance);
            
               }).fail( function(xhr, textStatus, errorThrown) {
                  if(xhr.status === 401)
                    window.location.href = apiUrlLogin;
               })


      });
   })

})();
