import axios from "axios";

export const initiateAppRequest = (clientID) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: 'https://dbzegnu5lj.execute-api.us-east-1.amazonaws.com/develop/teams/init',
            data: JSON.stringify({
                "clientID": clientID
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)            
        })
    })

}