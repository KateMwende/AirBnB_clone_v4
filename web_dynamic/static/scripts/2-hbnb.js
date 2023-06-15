$(document).ready(function () {
  const checkBox = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      checkBox[amenityId] = amenityName;
    } else {
      delete checkBox[amenityId];
    }
    $('.amenities > h4').text(Object.values(checkBox).join(', '));
  });

  $.get('http://0.0.0.0:5003/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api-status').addClass('available');
    } else {
      $('#api-status').removeClass('available');
    }
  });
});
