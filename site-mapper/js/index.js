$(document).ready(function() {
    
    $('#show').on('click', function(){
       $('#preview').hide();
       $('#learn').hide();
       $('#mainApp').fadeIn();
       $('#print').fadeIn();
    });
    
    $('h3').on('click', function(){
       window.print();
       return false;   
    });
    
    $('.firstclick').on('click', function() {
        $("#item").fadeToggle("fast");
    });
    $('.secondclick').on('click', function() {
        $(this).parent().next('#item').fadeToggle("fast");
    });
    
      $('.firstclick2').on('click', function() {
        $(".itemcol2").fadeToggle("fast");
    });
    $('.firstclick3').on('click', function() {
        $(".itemcol3").fadeToggle("fast");
    });
    $('.firstclick4').on('click', function() {
        $(".itemcol4").fadeToggle("fast");
    });
    $('.firstclick5').on('click', function() {
        $(".itemcol5").fadeToggle("fast");
    });
    $('.firstclick6').on('click', function() {
        $(".itemcol6").fadeToggle("fast");
    });
    $('.firstclick7').on('click', function() {
        $(".itemcol7").fadeToggle("fast");
    });
     $('.firstclick8').on('click', function() {
        $(".itemcol8").fadeToggle("fast");
    });
      $('.firstclick9').on('click', function() {
        $(".itemcol9").fadeToggle("fast");
    });
    $('.firstclick10').on('click', function() {
        $(".itemcol10").fadeToggle("fast");
    });
    $('.firstclick11').on('click', function() {
        $(".itemcol11").fadeToggle("fast");
    });
    $('.firstclick12').on('click', function() {
        $(".itemcol12").fadeToggle("fast");
    });
    $('.firstclick13').on('click', function() {
        $(".itemcol13").fadeToggle("fast");
    });
    $('.firstclick14').on('click', function() {
        $(".itemcol14").fadeToggle("fast");
    });
    
    
    
     $('#next').on('click', function() {
        $('#column2').fadeToggle();
        $('.n2').fadeToggle();
    });
    $('.n2').on('click', function() {
        $('#column3').fadeToggle();
        $('.n3').fadeToggle();
    });
     $('.n3').on('click', function() {
        $('#column4').fadeToggle();
         $('.n4').fadeToggle();
    });
     $('.n4').on('click', function() {
        $('#column5').fadeToggle();
        $('.n5').fadeToggle();
    });
     $('.n5').on('click', function() {
        $('#column6').fadeToggle();
        $('.n6').fadeToggle();
    });
    $('.n6').on('click', function() {
        $('#column7').fadeToggle();
        $('.n7').fadeToggle();
    });
    $('.n7').on('click', function() {
        $('#column8').fadeToggle();
        $('.n8').fadeToggle();
    });
    $('.n8').on('click', function() {
        $('#column9').fadeToggle();
        $('.n9').fadeToggle();
    });
     $('.n9').on('click', function() {
        $('#column10').fadeToggle();
        $('.n10').fadeToggle();
    });
     $('.n10').on('click', function() {
        $('#column11').fadeToggle();
        $('.n11').fadeToggle();
    });
    $('.n11').on('click', function() {
        $('#column12').fadeToggle();
        $('.n12').fadeToggle();
    });
    $('.n12').on('click', function() {
        $('#column13').fadeToggle();
        $('.n13').fadeToggle();
    });
     $('.n13').on('click', function() {
        $('#column14').fadeToggle();
    });
});