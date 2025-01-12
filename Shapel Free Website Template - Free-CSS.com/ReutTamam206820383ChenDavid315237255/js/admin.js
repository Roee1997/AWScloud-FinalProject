// פונקציה להורדת כל ההזמנות
function loadBookings() {
    fetch('https://api.your-aws-endpoint.com/bookings')  // כאן תכניס את ה-API שלך לשאילתת הזמנות
        .then(response => response.json())  // מחזיר את התשובה כ-JSON
        .then(data => {
            const bookingsTable = document.getElementById("bookingsTable").getElementsByTagName('tbody')[0];
            bookingsTable.innerHTML = ''; // נוודא שטבלה ריקה לפני הוספת נתונים חדשים

            data.forEach(booking => {
                const row = bookingsTable.insertRow();

                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);

                cell1.textContent = booking.name;
                cell2.textContent = booking.checkIn;
                cell3.textContent = booking.checkOut;
                cell4.textContent = booking.guests;
            });
        })
        .catch(error => console.error('Error loading bookings:', error));
}

// פונקציה להורדת כל הפניות מ-צור קשר
function loadContacts() {
    fetch('https://api.your-aws-endpoint.com/contacts')  // כאן תכניס את ה-API שלך לשאילתת פניות
        .then(response => response.json())  // מחזיר את התשובה כ-JSON
        .then(data => {
            const contactsTable = document.getElementById("contactsTable").getElementsByTagName('tbody')[0];
            contactsTable.innerHTML = ''; // נוודא שטבלה ריקה לפני הוספת נתונים חדשים

            data.forEach(contact => {
                const row = contactsTable.insertRow();

                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);

                cell1.textContent = contact.name;
                cell2.textContent = contact.phone;
                cell3.textContent = contact.email;
                cell4.textContent = contact.specialRequests || 'אין';
            });
        })
        .catch(error => console.error('Error loading contacts:', error));
}

// קריאה לפונקציות טעינה כשדף הניהול נטען
window.addEventListener("load", function() {
    loadBookings();  // טוען את ההזמנות
    loadContacts();  // טוען את הפניות
});
