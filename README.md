# stripe-checkout-simple
## Installation instructions
```
npm install
```
## Directory structure
```bash
├── client
│   ├── cancel.index
│   ├── index.html
│   ├── script.html
│   └── success.html
├── server
│   ├── node_modules
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
└── README.md
```

## File should create
- Code below should be in `.env` file
- The stripe private key below is for testing and which can be obtained from [keys](https://stripe.com/docs/keys)

```
CLIENT_URL=http://127.0.0.1:5500/client
STRIPE_PRIVATE_KEY=sk_test_4eC39HqLyjWDarjtT1zdp7dc
```

## Hint
- Nodemon only watches a subset of files in the dorectory. You can instruct nodemon to look for changes to .env by telling it what to watch in the nodemon command, e.g.: `nodemon -w . -w .env server.js`
- Wactch out for every path which set in `js` pr `.env`
- Cors problem is solved by using cors module in this example
- Basic test card numbers can be obtained from [testing](https://stripe.com/docs/testing)