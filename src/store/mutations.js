export const SET_COLLECTIONS = (state, collections) => {
    state.collections = collections;
};
export const SET_COLLECTION = (state, collection) => {
    state.collection = collection;
};
export const SET_GLASSES = (state, glasses) => {
    state.glasses = glasses;
};
export const SET_FILTER_OPTIONS = (state, { filterValue, queryParam }) => {
    state.filterOptions = filterValue;
    state.queryParam = queryParam;
};

export const SET_PAGE = (state, page) => {
    state.page = page;
};

export const SET_TOTAL_PAGES = (state, totalPages) => {
    state.totalPages = totalPages;
};