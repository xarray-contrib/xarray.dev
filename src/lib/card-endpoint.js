import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const useCard = ({title}) => {
    const { data, error } = useSWR(`/api/card?title=${title}`, fetcher)
    return { data, error }
}
