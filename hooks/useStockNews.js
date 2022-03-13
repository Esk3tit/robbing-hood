import useSWR from 'swr';

function useStockNews(category) {
    const { data, error } = useSWR(
        `${process.env.FINNHUB_API_BASE_URL}/news?category=${category}&token=${process.env.FINNHUB_API_KEY_1}`
    );

    return {
        news: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default useStockNews;