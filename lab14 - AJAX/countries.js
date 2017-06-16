// JavaScript Document
$(document).ready(function () {
    //SETUP
    $.ajaxSetup({
        cache: false
    });

    var countriesList = ['Andorra',
                        'United Arab Emirates',
                        'Afghanistan',
                        'Antigua and Barbuda',
                        'Anguilla',
                        'Albania',
                        'Armenia',
                        'Angola',
                        'Antarctica',
                        'Argentina',
                        'American Samoa',
                        'Austria',
                        'Australia',
                        'Aruba',
                        'Åland',
                        'Azerbaijan',
                        'Bosnia and Herzegovina',
                        'Barbados',
                        'Bangladesh',
                        'Belgium',
                        'Burkina Faso',
                        'Bulgaria',
                        'Bahrain',
                        'Burundi',
                        'Benin',
                        'Saint Barthélemy',
                        'Bermuda',
                        'Brunei',
                        'Bolivia',
                        'Bonaire',
                        'Brazil',
                        'Bahamas',
                        'Bhutan',
                        'Bouvet Island',
                        'Botswana',
                        'Belarus',
                        'Belize',
                        'Canada',
                        'Cocos [Keeling] Islands',
                        'Democratic Republic of the Congo',
                        'Central African Republic',
                        'Republic of the Congo',
                        'Switzerland',
                        'Ivory Coast',
                        'Cook Islands',
                        'Chile',
                        'Cameroon',
                        'China',
                        'Colombia',
                        'Costa Rica',
                        'Cuba',
                        'Cape Verde',
                        'Curacao',
                        'Christmas Island',
                        'Cyprus',
                        'Czechia',
                        'Germany',
                        'Djibouti',
                        'Denmark',
                        'Dominica',
                        'Dominican Republic',
                        'Algeria',
                        'Ecuador',
                        'Estonia',
                        'Egypt',
                        'Western Sahara',
                        'Eritrea',
                        'Spain',
                        'Ethiopia',
                        'Finland',
                        'Fiji',
                        'Falkland Islands',
                        'Micronesia',
                        'Faroe Islands',
                        'France',
                        'Gabon',
                        'United Kingdom',
                        'Grenada',
                        'Georgia',
                        'French Guiana',
                        'Guernsey',
                        'Ghana',
                        'Gibraltar',
                        'Greenland',
                        'Gambia',
                        'Guinea',
                        'Guadeloupe',
                        'Equatorial Guinea',
                        'Greece',
                        'South Georgia and the South Sandwich Islands',
                        'Guatemala',
                        'Guam',
                        'Guinea-Bissau',
                        'Guyana',
                        'Hong Kong',
                        'Heard Island and McDonald Islands',
                        'Honduras',
                        'Croatia',
                        'Haiti',
                        'Hungary',
                        'Indonesia',
                        'Ireland',
                        'Israel',
                        'Isle of Man',
                        'India',
                        'British Indian Ocean Territory',
                        'Iraq',
                        'Iran',
                        'Iceland',
                        'Italy',
                        'Jersey',
                        'Jamaica',
                        'Jordan',
                        'Japan',
                        'Kenya',
                        'Kyrgyzstan',
                        'Cambodia',
                        'Kiribati',
                        'Comoros',
                        'Saint Kitts and Nevis',
                        'North Korea',
                        'South Korea',
                        'Kuwait',
                        'Cayman Islands',
                        'Kazakhstan',
                        'Laos',
                        'Lebanon',
                        'Saint Lucia',
                        'Liechtenstein',
                        'Sri Lanka',
                        'Liberia',
                        'Lesotho',
                        'Lithuania',
                        'Luxembourg',
                        'Latvia',
                        'Libya',
                        'Morocco',
                        'Monaco',
                        'Moldova',
                        'Montenegro',
                        'Saint Martin',
                        'Madagascar',
                        'Marshall Islands',
                        'Macedonia',
                        'Mali',
                        'Myanmar [Burma]',
                        'Mongolia',
                        'Macao',
                        'Northern Mariana Islands',
                        'Martinique',
                        'Mauritania',
                        'Montserrat',
                        'Malta',
                        'Mauritius',
                        'Maldives',
                        'Malawi',
                        'Mexico',
                        'Malaysia',
                        'Mozambique',
                        'Namibia',
                        'New Caledonia',
                        'Niger',
                        'Norfolk Island',
                        'Nigeria',
                        'Nicaragua',
                        'Netherlands',
                        'Norway',
                        'Nepal',
                        'Nauru',
                        'Niue',
                        'New Zealand',
                        'Oman',
                        'Panama',
                        'Peru',
                        'French Polynesia',
                        'Papua New Guinea',
                        'Philippines',
                        'Pakistan',
                        'Poland',
                        'Saint Pierre and Miquelon',
                        'Pitcairn Islands',
                        'Puerto Rico',
                        'Palestine',
                        'Portugal',
                        'Palau',
                        'Paraguay',
                        'Qatar',
                        'Réunion',
                        'Romania',
                        'Serbia',
                        'Russia',
                        'Rwanda',
                        'Saudi Arabia',
                        'Solomon Islands',
                        'Seychelles',
                        'Sudan',
                        'Sweden',
                        'Singapore',
                        'Saint Helena',
                        'Slovenia',
                        'Svalbard and Jan Mayen',
                        'Slovakia',
                        'Sierra Leone',
                        'San Marino',
                        'Senegal',
                        'Somalia',
                        'Suriname',
                        'South Sudan',
                        'São Tomé and Príncipe',
                        'El Salvador',
                        'Sint Maarten',
                        'Syria',
                        'Swaziland',
                        'Turks and Caicos Islands',
                        'Chad',
                        'French Southern Territories',
                        'Togo',
                        'Thailand',
                        'Tajikistan',
                        'Tokelau',
                        'East Timor',
                        'Turkmenistan',
                        'Tunisia',
                        'Tonga',
                        'Turkey',
                        'Trinidad and Tobago',
                        'Tuvalu',
                        'Taiwan',
                        'Tanzania',
                        'Ukraine',
                        'Uganda',
                        'U.S. Minor Outlying Islands',
                        'United States',
                        'Uruguay',
                        'Uzbekistan',
                        'Vatican City',
                        'Saint Vincent and the Grenadines',
                        'Venezuela',
                        'British Virgin Islands',
                        'U.S. Virgin Islands',
                        'Vietnam',
                        'Vanuatu',
                        'Wallis and Futuna',
                        'Samoa',
                        'Kosovo',
                        'Yemen',
                        'Mayotte',
                        'South Africa',
                        'Zambia',
                        'Zimbabwe'];
    var continentsList = ['Africa',
                          'Antartica',
                          'Asia',
                          'Europe',
                          'North America',
                          'Oceania',
                          'South America'];

    //EVENT LISTENERS
    $("#countryOrContinet").change(populateOptions);
    $("#goButton").click(ajaxProcedure)

    //AJAX CONNECTION
    function ajaxProcedure() {
        //AJAX FORMATTING SETUP
        var source = "http://api.b246b.ca/scripts/countrylookup.php";

        var option = $("#optionChosed").val();
        var selector = $("#countryOrContinet").val();

        var messageGET = "accesskey=CPSC2030&" + selector + "=" + option;

        if (option) {
            $("#result")
                .html("Looking for your answer...")
                .load(source, messageGET, outputData);


            // Here is the main AJAX call.  This jQuery function always uses GET method for passing data.
            //   The first argument is the script that will run.
            //   The second argument is the data being sent.
            //     (It is always a series of name1=value1&name2=value2&etc. pairs.)
            //   The third argument is what function to call when AJAX is complete.
            //     (That function should have one argument.  It will be for the data that was 
            //      returned from the server.)

            $.getJSON(source, messageGET, outputData);
        }
    };

    //AJAX RELATED FUNCTION
    function outputData(data) {
        if (typeof data !== "string") {
            console.log(typeof data);
            console.log(data[0]);

            $("#result")
                .html("")

            if (data.length === 1)
                countryOutput(data);
            else
                continentOutput(data);
        }
    }

    function countryOutput(data) {

        $("#result")
            .append($("<table></table>")
                .addClass("table")
                .append($("<tr></tr>")
                    .addClass("info")
                    .append("<td>" + "Country" + "</td>")
                    .append("<td>" + "Population" + "</td>")
                )
                .append($("<tr></tr>")
                    .append("<td>" + data[0].country + "</td>")
                    .append("<td>" + formatedNumber(data[0].population) + "</td>")
                )
            );


        //IT WOULD BE NICE DO SOME FORMATTING TO THE OUTPUTED NUMBERS

    }

    function continentOutput(data) {
        var total = 0;

        $("#result").append($("<table></table>"));

        var table = $("#result table");


        table
            .addClass("table")
            .append($("<tr></tr>")
                .addClass("info")
                .append("<td>" + "Country" + "</td>")
                .append("<td>" + "Population" + "</td>")
            );


        for (var i = 0; i < data.length; i++) {
            var population = formatedNumber(data[i].population);
            table
                .append($("<tr></tr>")
                    .append($("<td></td>")
                        .html(data[i].country)
                    )
                    .append($("<td></td>")
                        .html(population)
                    )
                );
            total += +data[i].population;
        }

        table
            .addClass("table")
            .append($("<tr></tr>")
                .addClass("info")
                .append("<td>" + "Total" + "</td>")
                .append("<td>" + formatedNumber(total) + "</td>")
            );

    }

    //DINAMYC HTML CONTENT (NOT RELATED TO AJAX)
    function populateOptions() {
        $("#optionChosed").html("");
        var option = $("#countryOrContinet").val();
        if (option == "country")
            populateCountry();
        else
            populateContinent();
    }

    function populateCountry() {
        for (var i = 0; i < countriesList.length; i++)
            $("#optionChosed")
            .append($("<option></option>")
                .val(countriesList[i])
                .html(countriesList[i])
            );

    }

    function populateContinent() {
        for (var i = 0; i < continentsList.length; i++)
            $("#optionChosed")
            .append($("<option></option>")
                .val(continentsList[i])
                .html(continentsList[i])
            );
    }

    function formatedNumber(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});