import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import https from "https";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const instance = axios.create({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    });
    try {
        if (req.method === 'POST'){
            try {
              const { data } = req.body;
              let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://webapi.barloworld.mn/human-resources',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              const response = await instance.request(config)
              if (response) {
                  res.status(200).json({ message: 'Success!.' });
              } else {
                  res.status(400).json({ message: 'Internal Server Error.' });
              }
            } catch (error) {
              console.log(error)
              res.status(500).json({ message: 'Internal Server Error.', error: error });
            }
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error:any) {
        const erroradetail = new Error(error);
        res.status(400).json({ success: false, error: erroradetail.message });
    }
}
