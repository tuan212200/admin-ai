# Resource Override with React Vite

This project includes support for the [Resource Override](https://chrome.google.com/webstore/detail/resource-override/pkoacgokdfckfpndoffpifphamojphii) Chrome extension, which allows you to replace production resources with your local development resources.

## IMPORTANT: sb-admin.kido.vn Redirection Prevented

**Redirection from https://sb-admin.kido.vn to http://localhost:5173/ has been explicitly disabled for security and operational reasons.**

The following measures have been implemented to prevent this redirection:

- The Vite server is configured to only listen on localhost
- CORS is disabled to prevent cross-origin requests
- Resource Override is automatically disabled on the sb-admin.kido.vn domain
- The Resource Override UI control is hidden when on sb-admin.kido.vn

## How Resource Override Works

Resource Override allows you to intercept and replace web resources (JavaScript, CSS, etc.) with local versions during development. This is particularly useful when you want to:

1. Test local changes against a production environment (excluding sb-admin.kido.vn)
2. Debug issues that only occur in production
3. Make quick fixes without deploying to staging environments

## Setup Instructions

### 1. Install the Chrome Extension

First, install the Resource Override extension from the Chrome Web Store:
[Resource Override Extension](https://chrome.google.com/webstore/detail/resource-override/pkoacgokdfckfpndoffpifphamojphii)

### 2. Configure Resource Override

1. Open the Resource Override extension in Chrome
2. Add rules for your allowed production domains
3. **Note: Rules for sb-admin.kido.vn will not work due to security restrictions**

### 3. Start Your Local Development Server

Run your Vite development server:

```bash
npm run dev
```

### 4. Use the In-App Toggle

This application includes a built-in Resource Override control that appears in development mode. You can use this control to:

- See the current Resource Override status
- Toggle Resource Override on/off
- Refresh the page to apply changes

**Note: This control will not appear on sb-admin.kido.vn as redirection is prevented.**

## Important Notes

- Resource Override only works in Chrome with the extension installed
- The toggle state is stored in localStorage
- This feature only works in development mode (`import.meta.env.DEV`)
- Redirection for sb-admin.kido.vn is explicitly prevented for security reasons
- The Vite server is configured to only listen on localhost to prevent external access

## Troubleshooting

- If resources aren't loading, check the Chrome DevTools console for errors
- Ensure your Vite server is running on the correct port (default: 5173)
- Make sure the Resource Override extension is enabled in Chrome
- Remember that sb-admin.kido.vn redirection is intentionally disabled
