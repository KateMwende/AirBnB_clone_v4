$(document).ready(function () {
  const checkBox = {};

  $('.amenity-checkbox').change(function () {
    const amenityId = $('this').data('id');
    const amenityName = $('this').data('name');

    if ($(this).is(':checked')) {
      checkBox[amenityId] = amenityName;
    } else {
      delete checkBox[amenityId];
    }
    $('.amenities h4').text(Object.values(checkBox).join(', '));
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api-status').addClass('available');
    } else {
      $('#api-status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      $('.places').append(data.map(place => {
        return `<article>
          <div class="title">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guests </div>
            <div class="number_rooms">${place.number_rooms} Bedrooms </div>
            <div class="number_bathrooms">${place.number_bathrooms}Bathrooms </div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`;
      }));
    }
  });

  $('.button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(checkBox) }),
      dataType: 'json',
      success: function (data) {
        $('SECTION.places').append(data.map(place => {
          return `<article>
            <div class="title">
              <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
            <div class="max_guest">${place.max_guest} Guests </div>
            <div class="number_rooms">${place.number_rooms} Bedrooms </div>
            <div class="number_bathrooms">${place.number_bathrooms}Bathrooms </div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`;
        }));
      }
    });
  });
});
