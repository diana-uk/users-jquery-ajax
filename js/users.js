const users = function() {
        // Define the API endpoint URL
        const apiUrl = 'https://jsonplaceholder.typicode.com/users';

        // Error handling
        const showError = (message, className) => {
            $('tbody').html(`<tr><td colspan="3" class="${className}">${message}</td></tr>`);
        };

        // Display loading indicator
        const showLoading = () => {
            $('.c-loader-container').show();
        };

        // Hide loading indicator
        const hideLoading = () => {
            $('.c-loader-container').hide();
        };
        const populateTable = () => {
            showLoading();

            // Make an AJAX request to the API
            $.ajax({
                url: apiUrl,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    hideLoading();
                    
                    if(data.length === 0) {
                        showError('No data found.');
                        return;
                    }

                    const searchQuery = $('#id-search-input').val().trim().toLowerCase();
                    console.log(searchQuery);

                    const filteredData = searchQuery 
                    ? data.filter((user) => {        
                        return user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchQuery.toLowerCase()
                        );
                    })
                    : data;
                    console.log(filteredData)
                    $('tbody').empty();
                    // Iterate through the data and build the table rows
                    filteredData.forEach(function (user) {
                        const tableRow = `<tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                        </tr>`;
                        $('#id-users-data-table tbody').append(tableRow);

                    })

                },
                error: function (error) {
                    hideLoading();
                    console.error('Error fetching data: ',error);
                    showError('Error fetching data.', TEXT_CLASSES.errorTextClass);
                }
            });
        }
        // Initial population of the table
        // populateTable();

        // Search functionality
        $('#id-search-input').on('input', function () { 
            populateTable();
        });
        return {
            populateTable
        }
   
}();
