'use strict';

(function () {

  
   var apiUrlGetPlaces = window.location.origin + '/api/places';
   var apiUrlAttPlaces = window.location.origin + '/api/place/';


   $(document).ready(function(){
      $('#submit-form').click(function( event ) {
          $(".list-group").empty();
          $.ajax({
                   type: "get",
                   url: apiUrlGetPlaces, 
                   data: { location: $('#location').val()},
                   dataType: "json"
               }).done(function ( data ) {
                  data.forEach(function(element){   
                     $(".list-group").append("<li class=\"list-group-item row\"><div class=\"col-xs-3\"><img  height=\"171\" width=\"180\" src=\""+ element.image_url +"\"></div><div class=\"col-xs-4 text-left\"><h3>"+element.name+"</h3><p>"+element.rating+" </p><p>"+ (element.price !=undefined ? element.price : "") +"</p><p>"+ element.location.address1+"</p></div><div class=\"col-xs-4\"><button  id=\"going-btn\" name=\""+element.id+"\" class=\"btn my-btn going-btn\" ><span id=\"number-going\">0</span><p> GOING</p></button></div></li>")   
                  })
                  
               })
           event.preventDefault();
      })

      $('.list-group').on('click', '#going-btn', function(){
               $.ajax({
                   type: "post",
                   url: apiUrlAttPlaces + this.name, 
                   dataType: "json"
               }).done(function ( data ) {
                     console.log(data);

               })


      });
   })

})();
