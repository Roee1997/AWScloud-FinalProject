const apiUrl = 'https://lb15wqqox4.execute-api.us-east-1.amazonaws.com/dev';

const fetchAndDisplayRooms = async () => {
    try {
        // Fetch room details from the API
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const rooms = JSON.parse(data.body); // Parse the `body` field as JSON

        // Select the roomDetails div
        const roomDetailsDiv = document.getElementById('roomDetails');
        roomDetailsDiv.innerHTML = ''; // Clear previous content

        if (rooms.length > 0) {
            // Loop through the rooms and create cards for each
            rooms.forEach((room) => {
                const roomCard = document.createElement('div');
                roomCard.classList.add('room-card');

                roomCard.innerHTML = `
                    <div class="card">
                        <h3>${room.RoomType}</h3>
                        <p><strong>Description:</strong> ${room.Description}</p>
                        <p><strong>Price per night:</strong> ${room.PricePerNight} ₪</p>
                        <p><strong>Max Guests:</strong> ${room.MaxGuests}</p>
                        <p><strong>Available:</strong> ${room.Available ? 'Yes' : 'No'}</p>
                        <p><strong>Amenities:</strong></p>
                        <ul>
                            ${room.Amenities.map((amenity) => `<li>${amenity}</li>`).join('')}
                        </ul>
                    </div>
                `;

                roomDetailsDiv.appendChild(roomCard);
            });

            roomDetailsDiv.style.display = 'block'; // Show the div
        } else {
            roomDetailsDiv.innerHTML = '<p>No rooms available</p>';
            roomDetailsDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching room details:', error);
        const roomDetailsDiv = document.getElementById('roomDetails');
        roomDetailsDiv.innerHTML = '<p>Failed to load room details. Please try again later.</p>';
        roomDetailsDiv.style.display = 'block';
    }
};

// Event listener for the "Book Now" button
document.querySelector('.booking-button').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission
    fetchAndDisplayRooms();
});
