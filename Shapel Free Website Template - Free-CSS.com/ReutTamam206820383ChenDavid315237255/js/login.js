// האזנה לטופס התחברות
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // מניעת ריענון דף

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // בדיקה מול מסד נתונים (שלב זה מדמה קריאה ל-API)
    fetch("https://api.your-endpoint.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (data.isAdmin) {
                // אם המשתמש הוא מנהל
                window.location.href = "admin.html"; // הפניה לדף ניהול
            } else {
                alert("ברוך הבא! אין לך הרשאות מנהל.");
            }
        } else {
            alert("שם משתמש או סיסמה שגויים.");
        }
    })
    .catch(error => console.error("Error:", error));
});
// הצגת ה-modal
const loginButton = document.getElementById("loginButton");
const loginModal = document.getElementById("loginModal");
const closeButton = document.querySelector(".close");

loginButton.addEventListener("click", function () {
    loginModal.style.display = "flex"; // הצגת ה-modal
});

closeButton.addEventListener("click", function () {
    loginModal.style.display = "none"; // סגירת ה-modal
});

window.addEventListener("click", function (event) {
    if (event.target === loginModal) {
        loginModal.style.display = "none"; // סגירה בלחיצה מחוץ לחלון
    }
});
