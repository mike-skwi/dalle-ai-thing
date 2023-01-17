import * as dotenv from 'dotenv';
dotenv.config();

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.KEY,
});

const openai = new OpenAIApi(configuration);

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// post takes two args, one is a url of the api, 
// second is a cb that has req / res
app.post('/dream', async (req, res) => {
    const prompt = req.body.prompt;

    const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: '1024x1024'
    });

    const image = aiResponse.data.data[0].url;
    res.send({ image });
});

app.listen(8080, () => console.log('hmm'));
