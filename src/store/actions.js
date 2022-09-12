import api from "@/utils/api";

export const getCollections = async({ commit }) => {
    try {
        const response = await api.fetchCollections();
        const { data } = response;
        const { collections } = data;
        commit("SET_COLLECTIONS", collections);
        return collections;
    } catch (error) {
        return error;
    }
};
export const getGlasses = async({ commit, dispatch, state }, { collection, queryParam }) => {
    const finalQueryParam = queryParam ? queryParam : state.queryParam;
    const paginatedQueryParam =
        finalQueryParam + `&page[limit]=12&page[number]=${state.page}`;
    try {
        const response = await api.fetchCollection(collection, paginatedQueryParam);
        const { data } = response;
        const { glasses, meta } = data;
        const totalGlasses = meta.total_count;
        const totalPages = Math.ceil(totalGlasses / 12);
        commit("SET_GLASSES", glasses);
        commit("SET_TOTAL_PAGES", totalPages);
        dispatch("storeCollectionInfo", state.collection);
        return glasses;
    } catch (error) {
        return error;
    }
};

export const changePage = ({ commit, state }, page) => {
    const pageNumber = page ? page : state.page + 1;
    commit("SET_PAGE", pageNumber);
};

export const storeFilterOptions = ({ commit }, { filterValue, queryParam }) => {
    commit("SET_FILTER_OPTIONS", { filterValue, queryParam });
};

export const storeCollectionInfo = ({ commit }, collection) => {
    commit("SET_COLLECTION", collection);
};