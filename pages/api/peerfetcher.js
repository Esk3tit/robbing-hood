import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
    const { ticker } = req.body;
    if (!ticker) {
        res.status(400).send({ err: "Must specify stock ticker." });
    } else {
        const tickerRes = await fetch(
            `${process.env.FINNHUB_API_BASE_URL}/stock/peers?symbol=${ticker}&token=${process.env.FINNHUB_API_KEY_1}`
        );
        const tickerResBody = await tickerRes.json();
        res.status(200).send(tickerResBody);
    }
};