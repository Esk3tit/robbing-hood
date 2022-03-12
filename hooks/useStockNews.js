import useSWR from 'swr';

const fetcher = async (...args) => {
    const res = await fetch(...args);
    return await res.json();
}

function useStockNews(category) {
    const { data, error } = useSWR(
        `https://finnhub.io/api/v1/news?category=${category}&token=${process.env.FINNHUB_API_KEY_1}`,
        fetcher
    );

    return {
        news: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default useStockNews;