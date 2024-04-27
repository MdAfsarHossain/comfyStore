import { ProductsContainer, Filters, PaginationContainer } from "../components";
import { customFetch } from "../utils";

const url = '/products';

const allProductsQuery = (queryParams) => {
    const {search, category, company, sort, price, shipping, page} = queryParams;

    return {
        queryKey: [
            'products',
            search ?? '',
            category ?? 'all',
            company ?? 'all',
            sort ?? 'a-z',
            price ?? 100000,
            shipping ?? false,
            page ?? 1,
        ],

        queryFn: () => customFetch(url, {
            params: queryParams,
        }),
    };
};


export const loader = (queryClient) =>  async ({request}) => {

    // console.log(request);
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries(),]);

    // const params = new URL(request.url).searchParams;
    // const search = params.get('search');
    // console.log(search);

    // const response = await customFetch(url, {params});
    const response = await queryClient.ensureQueryData(allProductsQuery(params));

    const products = response.data.data;
    const meta = response.data.meta;
    // console.log(products);
    // console.log(meta);
    return {products, meta, params};
}

const Products = () => {
    return (
        <div>
            <Filters />
            <ProductsContainer />
            <PaginationContainer />
        </div>
    );
};

export default Products;