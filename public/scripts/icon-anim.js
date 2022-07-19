$(document).ready(function() {

$('#icon-retweet').on('mouseover', function() {
  $(this).addClass('fa-spin');
});
$('#icon-retweet').on('mouseout', function() {
  $(this).removeClass('fa-spin');
});




$('#icon-heart').on('mouseover', function() {
  $(this).addClass('fa-beat');
});
$('#icon-heart').on('mouseout', function() {
  $(this).removeClass('fa-beat');
});




$('#icon-flag').on('mouseover', function() {
  $(this).addClass('fa-flip');
});
$('#icon-flag').on('mouseout', function() {
  $(this).removeClass('fa-flip');
});




});


