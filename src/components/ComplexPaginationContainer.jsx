import {useLoaderData, useLocation, useNavigate} from 'react-router-dom';

const ComplexPaginationContainer = () => {

    const {meta} = useLoaderData();
    const {pageCount, page} = meta.pagination;

    const {search, pathname} = useLocation();
    const navigate = useNavigate();

    const handlePageChange = (pageNumber) => {
        // console.log(search);
        // console.log(pathname);
        // console.log(pageNumber);
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', pageNumber);
        navigate(`${pathname}?${searchParams.toString()}`);
    };

    if(pageCount < 2) return null;

    const addPageButton = ({ pageNumber, activeClass }) => {
        return (
            <button key={pageNumber} className={`btn btn-xs sm:btn-md border-none join-item ${activeClass ? 'bg-base-300 border-base-300' : ''}`} onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
        );
    };


    const renderPageButtons = () => {
        const pageButtons = [];
        // first button
        pageButtons.push(addPageButton({pageNumber: 1, activeClass: page === 1}));

        // dots
        if(page > 2) {
            pageButtons.push(
                <button className="join-item btn btn-xm sm:btn-md" key="dots-1">...</button>
            );
        }

        // active/current page
        if(page !== 1 && page !== pageCount) {
            pageButtons.push(addPageButton({pageNumber: page, activeClass: true}));
        }

        // dots
        if(page < pageCount - 1) {
            pageButtons.push(
                <button className='join-item btn btn-xs sm:btn-md' key='dots-2'>...</button>
            )
        }

        // Last button
        pageButtons.push(addPageButton({pageNumber: pageCount, activeClass: page === pageCount }));

        return pageButtons;
    }


    return (
        <div className='mt-16 flex justify-end'>
            <div className="join">
                <button className='btn btn-xs sm:btn-md join-item' onClick={() => {
                    let prevPage = page - 1;
                    if(prevPage < 1) prevPage = pageCount;
                    // handlePageChange('prev');
                    handlePageChange(prevPage);
                }}>
                    Prev
                </button>

                {/* Render Page Butttons */}
                {renderPageButtons()}

                <button className='btn btn-xs sm:btn-md join-item' onClick={() => {
                    let nextPage = page + 1;
                    if(nextPage > pageCount) nextPage = 1;
                    // handlePageChange('next');
                    handlePageChange(nextPage);
                }}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ComplexPaginationContainer;