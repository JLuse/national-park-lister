'use strict'

const apiKey = 'itdYnn3mp1Hvk41OSkubgWpUhRQt28C65wTfzU8L';
const natParkURL = 'https://developer.nps.gov/api/v1/parks';

function getNationalParks(query, maxResults=10) {
    // Second created get nat park function and setup param object
    const params = {
        api_key: apiKey,
        q: query,
        limit: maxResults
    };

    // Third, define query string with formatter function
    // pass the param object
    const queryString = formatQueryParams(params)
    // 4th, Define entire url used for fetch response
    const url = natParkURL + '?' + queryString;
    // console.log(url);

    // 6th, fetch the completed url
    fetch(url)
        .then(response => {
            console.log(response)
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayNatParks(responseJson))
        .catch(err => {
            // console.log(err);
            $('#js-error-message').text(`Sumthin wrong: ${err.message}`);
        });
}

// 5th, define formatQueryParams() from line 16
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

// 7th define display function
function displayNatParks(responseJson) {
    console.log(responseJson.data.length);
    if (!responseJson.data.length) {
        $('#results-list').empty();
        $('.results-header').addClass('hidden');
        $('#js-error-message').text('Re-enter a valid state').removeClass('hidden');;
    } else {
        $('#results-list').empty();
        $('#js-error-message').addClass('hidden');
        for (let i = 0; i < responseJson.data.length; i++) {
            $('#results-list').append(
                `<li><h3>${responseJson.data[i].fullName}</h3>
                <p>${responseJson.data[i].description}</p>
                <a href='${responseJson.data[i].url}'>Link</a>
                </li>`
              )
            }
            //display the results section  
            $('.results-header').removeClass('hidden');

        }
    }


// First set up the form listener
function watchForm() {
    $('form').submit(e => {
        e.preventDefault();

        const searchTerm = $('#js-state-input').val();
        const maxResults = $('#js-max-results').val();
        getNationalParks(searchTerm, maxResults);
    })
}

$(watchForm)