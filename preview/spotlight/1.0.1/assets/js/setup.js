/**
 * Setup (for preview only)
 */

$(function() {

  // Add data attributes to device containers

  $(".device__container > div").eq(0).attr("data-device", "iphone");
  $(".device__container > div").eq(1).attr("data-device", "samsung");
  $(".device__container > div").eq(2).attr("data-device", "macbook");


  // Create & append setup block

  var setupBlock = ' <div class="setup active"> <div class="setup__trigger"> <i class="fa fa-gear"></i> </div> <div class="setup__container"> <div class="setup__block"> <h3 class="setup__heading"> Layouts </h3> <a href="index_dark.html" class="setup__img-link"> <img src="assets/img/layout_dark.png" class="img-responsive" alt="Dark layout"> </a> <a href="index_light.html" class="setup__img-link"> <img src="assets/img/layout_light.png" class="img-responsive" alt="Light layout"> </a> <a href="index_coloured.html" class="setup__img-link"> <img src="assets/img/layout_coloured.png" class="img-responsive" alt="Multicolor layout"> </a> </div> <div class="setup__block"> <h3 class="setup__heading"> Devices </h3> <form class="setup__devices"> <div class="radio"> <input type="radio" name="setup__devices" id="setup-devices__iphone_black" value="iphone" data-device-color="black" checked> <label for="setup-devices__iphone_black"> iPhone (black) </label> </div> <div class="radio"> <input type="radio" name="setup__devices" id="setup-devices__iphone_white" value="iphone" data-device-color="white"> <label for="setup-devices__iphone_white"> iPhone (white) </label> </div> <div class="radio"> <input type="radio" name="setup__devices" id="setup-devices__samsung_black" value="samsung" data-device-color="black"> <label for="setup-devices__samsung_black"> Samsung (black) </label> </div> <div class="radio"> <input type="radio" name="setup__devices" id="setup-devices__samsung_white" value="samsung" data-device-color="white"> <label for="setup-devices__samsung_white"> Samsung (white) </label> </div> <div class="radio"> <input type="radio" name="setup__devices" id="setup-devices__macbook" value="macbook"> <label for="setup-devices__macbook"> Macbook </label> </div> </form> </div> </div> </div>';
  $("body").append(setupBlock); 


  // Trigger setup block on click

  $(".setup__trigger").click(function() {
    $(".setup").toggleClass("active");
  });

  // Close setup block on click outside

  if ( $(".setup").hasClass("active") ) {

    $(document).click(function(e) {
      var target = $(e.target);

      if (!target.closest(".setup").length)
        $(".setup").removeClass("active");
    });

  }

  // Switch devices on radio change

  $("input[name='setup__devices']").change(function() {
    var device = $(this).val(),
        deviceColor = $(this).data("device-color");

    $("[data-device]")
      .addClass("hidden")
      .removeClass("animateRight");

    setTimeout(function() {
      $("[data-device='" + device + "'")
        .addClass("animateRight")
        .removeClass("hidden black white")
        .addClass(deviceColor);
      },100);

  });

});


/**
 * Google Analytics
 */

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','../../../../www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-4400411-12', 'auto');
ga('send', 'pageview');