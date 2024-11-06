// src/pages/api/checkStatus.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { predictionId } = req.body;

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      },
    };

    const pollForOutput = async () => {
      const url = `https://api.replicate.com/v1/predictions/${predictionId}`;
      const response = await axios.get(url, config);
      const { output, status } = response.data;
      console.log(output)
      if (output) return { output };
      if (status === 'failed' || status === 'canceled') throw new Error('Generation failed');

      return null;
    };

    // Polling until output is available
    let result;
    while (!result) {
      result = await pollForOutput();
      if (!result) await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching status' });
  }
}
