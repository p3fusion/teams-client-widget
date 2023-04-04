import React, { useEffect, useState } from 'react'

const ConnectWatcher = (props) => {

    const [MR, setMR] = useState(null);
    const { display, setDisplay } = props
    const clientID = window.clientID || "guests"
    useEffect(() => checkConnectWidget(), [])

    const checkConnectWidget = () => {
        if (window.connect) {
            console.log("Connect Widget is Available")
            console.log("Checking Connect app is initialized or not")
            isCCpInitiated()
        }
    }

    const isCCpInitiated = () => {
        let i = 0;
        const PollInterval = setInterval(() => {
            console.log(`Presolved::CCP::Polling to get the login status ${i}`);
            if (window.connect.agent.initialized) {
                clearInterval(PollInterval)
                listenIncomingActivities()
                setDisplay({ ...display, CCPInitiated: true })
                console.log(`Presolved::CCP::Login success stoppping the poll`);
            }
            if (i > 30) {
                clearInterval(PollInterval)
                console.log(`Presolved::CCP::Login failed stoppping the poll`);
            }
            i++;
        }, 1000);
    }

    const listenIncomingActivities = () => {
        window.connect.contact(function (contact) {
            contact.onConnecting(function (ctx) {
                let contactAttributes = ctx._getData()
                console.log("Presolved::connect::contact::onConnecting::");
            })
            contact.onIncoming(function (ctx) {
                let contactAttributes = ctx._getData()
                console.log("Presolved::connect::contact::onIncoming::");

            });

            contact.onRefresh(function (ctx) {
                let contactAttributes = ctx._getData()
                console.log("Presolved::connect::contact::onRefresh::");
            });

            contact.onAccepted(function (ctx) {
                let contactAttributes = ctx._getData()
                try {
                    console.log("Presolved::connect::contact::onAccepted::");
                    startRecording()

                }
                catch (error) {
                }
            });

            contact.onEnded(function (ctx) {
                try {
                    console.log("Presolved::connect::contact::onEnded::");
                    let contactAttributes = ctx._getData()
                    stopRecording()
                } catch (error) {
                    console.error({
                        error
                    })
                }

            });

            contact.onConnected(function (ctx) {
                console.log("Presolved::connect::contact::onConnected::",);

            });
            contact.onMissed(function (ctx) {
                console.log("Presolved::connect::contact::onMissed::", ctx);
            })
        });

    }
    const recordScreen = async () => {
        return await navigator.mediaDevices.getDisplayMedia({
            audio: false,
            video: {
                width: 1280,
                height: 720,
                frameRate: 30,
                cursor: "always",
                displaySurface: "monitor",
                logicalSurface: true,
                resizeMode: "none",
                aspectRatio: 1.7777777778

            }
        });
    }
    const createRecorder = (stream, mimeType) => {
        // the stream data is stored in this array
        let recordedChunks = [];
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function (e) {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        }
        mediaRecorder.onstop = function () {
            saveFile(recordedChunks);
            recordedChunks = [];
        }
        mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
        return mediaRecorder;
    }
    const startRecording = () => {
        //let stream = await 
        recordScreen().then((stream) => {
            let mimeType = 'video/webm';
            let mediaRecorder = createRecorder(stream, mimeType);
            setMR(mediaRecorder)
            window.mediaRecorder = mediaRecorder
            setDisplay({ ...display, IsRecording: true })
        });

    }
    const stopRecording = () => {
        if (MR) {
            MR.stop();
            //setMR(null)
        }
        if (window.mediaRecorder) {
            window.mediaRecorder.stop()
        }

        setDisplay({ ...display, IsRecording: false })
    }
    const saveFile = (recordedChunks) => {
        const blob = new Blob(recordedChunks, {
            type: 'video/webm'
        });
        // window.open(URL.createObjectURL(blob));
        saveFileToS3(recordedChunks)
    }
    const saveFileToS3 = (recordedChunks) => {
        const blob = new Blob(recordedChunks, {
            type: 'video/webm'
        });
        const file = new File([blob], 'test.webm', { type: 'video/webm' });
        const fileName = `${clientID}/${moment().format('x')}.webm`

        Storage.put(fileName, file, {
            contentType: 'video/webm',

            level: 'public',
        }).then(result => console.log({ saveFileToS3: result }))
            .catch(err => console.log({ saveFileToS3: err }));

    }

    return (
        <div>

        </div>
    )
}

export default ConnectWatcher



