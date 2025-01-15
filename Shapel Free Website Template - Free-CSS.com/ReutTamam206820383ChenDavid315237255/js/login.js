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
 * Decode a JWT token (header and payload)
 */
const decodeJwtToken = (token) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        console.error('Invalid token format');
        return null;
    }

    try {
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));
        return { header, payload };
    } catch (e) {
        console.error('Error decoding token:', e);
        return null;
    }
};

/**
 * Parse tokens from URL after Cognito login redirect and decode them
 */
const parseTokensFromUrl = () => {
    const hash = window.location.hash.substring(1); // Get the part after the `#`
    const params = new URLSearchParams(hash);

    const accessToken = params.get('access_token');
    const idToken = params.get('id_token');

    if (accessToken && idToken) {
        console.log('Access Token:', accessToken);
        console.log('ID Token:', idToken);

        // Decode and display tokens
        const decodedAccessToken = decodeJwtToken(accessToken);
        const decodedIdToken = decodeJwtToken(idToken);

        if (decodedAccessToken) {
            console.log('Decoded Access Token:', decodedAccessToken);
            localStorage.setItem('accessTokenPayload', JSON.stringify(decodedAccessToken.payload));
        }

        if (decodedIdToken) {
            console.log('Decoded ID Token:', decodedIdToken);
            localStorage.setItem('idTokenPayload', JSON.stringify(decodedIdToken.payload));
        }

        // Store tokens securely (temporarily using localStorage for demonstration)
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('idToken', idToken);

        alert('Login successful! Tokens decoded and stored.');
    } else {
        console.warn('No tokens found in the URL.');
    }
};

// Event listener for the login button
document.getElementById('loginButton').addEventListener('click', redirectToCognitoLogin);

// Call the token parsing function when the page loads
window.onload = parseTokensFromUrl;
