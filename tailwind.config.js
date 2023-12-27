/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#a7bcff',
        secondary: '#5d5b8d',
        accent: '#7b96ec',
        navbar: '#3e3c61',
        searchBorder: '#5d5b8d',
        userChatHover: '#2f2d52',
        chatInfoBg: '#5d5b8d',
        chat: '#ddddf7',
        chatInput: 'white',
        ownerMessageBg: '#8da4f1',
        message: 'white',
        inputBorder: '#a7bcff',
      },
      colors: {
        primary: '#a7bcff',
        secondary: '#5d5b8d',
        accent: '#7b96ec',
        navbar: '#3e3c61',
        searchBorder: '#5d5b8d',
        userChatHover: '#2f2d52',
        chatInfoBg: '#5d5b8d',
        chat: '#ddddf7',
        chatInputText: '#2f2d52',
        chatInputPlaceholder: 'lightgray',
        ownerMessageText: 'white',
        messageText: 'gray',
      },
      borderColor: {
        input: '#a7bcff',
      },
      maxWidth: {
        AT: '80%'
      }
    },
  },
  plugins: [],
}

