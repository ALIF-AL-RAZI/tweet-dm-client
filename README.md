# Introduction

This is material design template created based on materially structure

# Getting Started

1. Installation process
    - run 'npm install / yarn'
    - start dev server run 'npm run start / yarn start'
2. Deployment process
    - Goto full-version directory and open package.json. Update homepage URL to the production URL
    - Goto full-version directory and run 'npm run build / yarn build'

<!--  -->

# Change note by FoysalBN

1. add new page+Route

    - [ add view component ](src/views/tweetsy)
    - [ add route ](src/routes/MainRoutes.js)
    - [ add item on sidebar ](src/menu-items/tweetsy.js)
    - `\src\utils\locales\en.json`

2. header

    - [Header](src/layout/MainLayout/Header/index.js)

3. Right side panel(user)

    - `\src\layout\MainLayout\Header\ProfileSection\`

4. add circular progress on BTN wit condition
   `startIcon={isProcessing ? <CircularProgress size={13} color="inherit" /> : null}`

5. toast

    - containner :
      `{/* Toastify container */} <ToastContainer position="bottom-right" autoClose={2000} />`

    - Toast:
      `toast('Collection Created.', { autoClose: 2500, type: 'success' }); `

    ***

    - loading tweet:
      ` // Toastify- show loading toast`
      `const loadingAI = toast.loading('Generating ....');`

    - update loading tweet
      `toast.update(loadingAI, { render: 'Post generated', type: 'success', isLoading: false, autoClose: 500 });`

6. [Customization menue Disabled - line:127](src/layout/MainLayout/index.js)

7. email, password register and login with firebase (Abu Taher)

A. register (name, email & password)
actually (one firebase register and backend register)
A.1 firebse register using (email and password)
then
A.2 if firebase success then call backend api (base_url auth/email-password-register)

    # backend

    backend register with (name, email & password)

    for a new user direct navigate ('/unauthenticated');

B. Login

B.1 first login firebase with (email and password)

if firebase success then call backend API (base_url auth/email-password-login)

if backend auth pass then check

If user not Active navigate("/unauthenticated")
"# MacroDMs-client" 
"# email-scrapper-client" 
#   l e a d f o r e s t - c l i e n t  
 "# leadforest-client" 
#   c o n n e c t - v i d - c l i e n t  
 "# connectvid-client" 
#   r r w e b - c l i e n t  
 #   r r w e b - s e r v e r  
 