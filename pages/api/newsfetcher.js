import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
    const { category } = req.body;
    if (!category) {
        res.status(400).send({ err: "Must specify news category." });
    } else {
        const newsRes = await fetch(
            `${process.env.FINNHUB_API_BASE_URL}/news?category=${category}&token=${process.env.FINNHUB_API_KEY_1}`
        );
        const newsResBody = await newsRes.json();
        res.status(200).send(newsResBody);
    }
};