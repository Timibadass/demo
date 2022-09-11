import axios from "axios";
const baseUrl = "https://staging-api.bloobloom.com/user/v1";
const collectionsBaseUrl = `${baseUrl}/sales_channels/website/collections`;
const filterParams =
    "filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&filters[Frame_variant_home_trial_available][]=false";
export default {
    fetchCollections() {
        return axios({
            url: `${collectionsBaseUrl}`,
            method: "GET",
        });
    },
    fetchCollection(collection, params) {
        let url = params ?
            `${collectionsBaseUrl}/${collection}/glasses?${filterParams}${params}` :
            `${collectionsBaseUrl}/${collection}/glasses?${filterParams}`;
        return axios({
            url,
            method: "GET",
        });
    },
};