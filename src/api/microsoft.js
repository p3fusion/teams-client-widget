export const authCallbackMSLogin = (err, data) => {
    if (err) {
        console.log(err)

    }
    if (data) {
        console.log({ data });
    }


}
