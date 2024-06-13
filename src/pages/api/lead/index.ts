import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        if (req.method === 'POST'){
            try {
              const { data } = req.body;
              console.log(data)
              let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://ej498jdb4k.execute-api.ap-southeast-1.amazonaws.com/prod/lead/create',
                headers: { 
                  'x-api-key': 'woLpyQc02j4uUtLJj8OIy4oHXCTKnsQT6PklmPOj', 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              const response = await axios.request(config)
              
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
