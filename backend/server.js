const express = require('express')
const cors = require('cors');
const app = express();
const {spawn} = require("child_process")

PORT = 5000

app.use(cors());
app.use(express.json());

async function sendtopython(data) {
    return new Promise((resolve, reject) => {
        const pythonprocess = spawn("python", [
            `processInputs.py`,
            data
        ]);

        let output = ''
        pythonprocess.stdout.on('data', (data) => {
            output += data.toString();
        })

        pythonprocess.stderr.on('data', (error) => {
            console.log(`Error: ${error}`)
            reject(error);
        })

        pythonprocess.on('close', (code) => {
            if (code == 0) {
                resolve(output.trim());
            } else {
                reject(`Python process exited with code ${code}`)
            }
        })
    }).catch((err) => {
        console.error('Promise rejected:', err);
        throw err;  
    });
}


app.get("/", (req, res) => {
    res.send({res: "working"});
})
app.post("/chat", async (req, res) => {
    try {
    const {message} = req.body.message
    const res = await sendtopython(message)
    console.log(res)
    } catch(error) {
        console.log("error");
    }

    
})

app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`)
});

