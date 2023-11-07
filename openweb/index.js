// script.js
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const catalog = document.getElementById('catalog');

    // Initialize an empty catalogData array
    const catalogData = [];

    // Fetch the list from the PHP file
    fetch('index.php')
        .then(response => response.json())
        .then(fetchedData => {
            // Access the fetched array
            console.log(fetchedData);

            // Use the fetched array to create catalog entries and populate catalogData
            fetchedData.forEach(item => {
                // Add the item to the catalogData array
                catalogData.push({
                    name: item.name,
                    image: item.imagePath,
                    link: item.link
                });
            });

            // Now catalogData is populated with the data from PHP
            console.log(catalogData);

            // Render catalog after fetching data
            renderCatalog(catalogData);
        })
        .catch(error => console.error('Error fetching catalog data:', error));

    // Function to render catalog items
    function renderCatalog(data) {
        catalog.innerHTML = ''; // Clear existing items

        data.forEach(item => {
            const catalogItem = document.createElement('div');
            catalogItem.classList.add('catalog-item');

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;

            const link = document.createElement('a');
            link.href = item.link;
            link.textContent = item.name;

            catalogItem.appendChild(img);
            catalogItem.appendChild(link);

            catalog.appendChild(catalogItem);
        });
    }

    // Event listener for search input
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();

        // Filter catalog items based on search term
        const filteredData = catalogData.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        );

        // Render filtered catalog
        renderCatalog(filteredData);
    });
});
