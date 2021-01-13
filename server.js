const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const fs = require('fs')

let config = JSON.parse(fs.readFileSync('secret.json'))

// Set up axios
const http = axios.create({
    headers: {
        "DB-ACCESS-KEY": config.apiKey,
        "CB-ACCESS-SIGN": "It's ya boi",
        "CB-ACCESS-TIMESTAMP": Date()
    }
})


app.get('/', (req, res) => {
    const params = {

        "id": "9da7a204-544e-5fd1-9a12-61176c5d4cd8",
        "name": "User One",
        "username": "user1",
        "profile_location": null,
        "profile_bio": null,
        "profile_url": "https://coinbase.com/user1",
        "avatar_url": "https://images.coinbase.com/avatar?h=vR%2FY8igBoPwuwGren5JMwvDNGpURAY%2F0nRIOgH%2FY2Qh%2BQ6nomR3qusA%2Bh6o2%0Af9rH&s=128",
        "resource": "user",
        "resource_path": "/v2/user"

    }
    

    let data = http.get('https://api.coinbase.com/v2/accounts/')
        .then(response => {
            data = response
            console.log(response.data.url);
            console.log(response.data.explanation);
            console.log(response.data.error);
            return response.body
        })
        .catch(error => {
            console.log(error);
            return ("error")
        });
    res.send(data)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})  