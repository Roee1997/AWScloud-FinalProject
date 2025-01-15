// Cognito Login URL
const cognitoLoginUrl =
    'https://us-east-1u8diopodh.auth.us-east-1.amazoncognito.com/login?client_id=1hfg4usrg0a6lr0393nmnia1vq&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A5500%2Findex.html';

/**
 * Redirect user to Cognito login page when clicking the login button
 */
const redirectToCognitoLogin = () => {
    window.location.href = cognitoLoginUrl;
};

/**
 * Parse tokens from URL after Cognito login redirect
 */
const parseTokensFromUrl = () => {
    const hash = window.location.hash.substring(1); // Get the part after the `#`
    const params = new URLSearchParams(hash);

    const accessToken = params.get('access_token');
    const idToken = params.get('id_token');
    const expiresIn = params.get('expires_in');
    const tokenType = params.get('token_type');

    if (accessToken && idToken) {
        console.log('Access Token:', accessToken);
        console.log('ID Token:', idToken);

        // Store tokens securely (consider using HttpOnly cookies for sensitive apps)
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('idToken', idToken);

        // Optionally, redirect to a dashboard or display user information
        alert('Login successful!');
    } else {
        console.warn('No tokens found in the URL.');
    }
};

// Event listener for the login button
document.getElementById('loginButton').addEventListener('click', redirectToCognitoLogin);

// Call the token parsing function when the page loads
window.onload = parseTokensFromUrl;
