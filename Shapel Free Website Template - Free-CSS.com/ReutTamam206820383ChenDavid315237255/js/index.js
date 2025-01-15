// API URL
const apiUrl = "https://lb15wqqox4.execute-api.us-east-1.amazonaws.com/dev";

// Fetch room details from API and display them
const fetchRoomDetails = async () => {
    try {
        // Fetch data from the API
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const roomDetailsDiv = document.getElementById("roomDetails");

        // Clear any existing content
        roomDetailsDiv.innerHTML = "";

        // Check if data is not empty
        if (data.length > 0) {
            data.forEach((room) => {
                // Create a room card
                const roomCard = document.createElement("div");
                roomCard.classList.add("room-card");

                roomCard.innerHTML = `
                    <h3>${room.RoomType}</h3>
                    <p><strong>Description:</strong> ${room.Description}</p>
                    <p><strong>Price per night:</strong> ${room.PricePerNight} ₪</p>
                    <p><strong>Max Guests:</strong> ${room.MaxGuests}</p>
                    <p><strong>Available:</strong> ${room.Available ? "Yes" : "No"}</p>
                    <p><strong>Amenities:</strong> ${room.Amenities.join(", ")}</p>
                `;

                roomDetailsDiv.appendChild(roomCard);
            });

            // Show the div
            roomDetailsDiv.style.display = "block";
        } else {
            roomDetailsDiv.innerHTML = "<p>No rooms available</p>";
            roomDetailsDiv.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching room details:", error);
        alert("Failed to fetch room details. Please try again later.");
    }
};

// Event listener for the "book now" button
document.getElementById("bookNowButton").addEventListener("click", () => {
    fetchRoomDetails();
});
