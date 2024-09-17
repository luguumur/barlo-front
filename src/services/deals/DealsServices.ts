import ApiService from "../ApiService";

export async function apiGetDeal<T>(id: string) {
    return ApiService.fetchData<T>({
        url: `deals/${id}`,
        method: 'get',
    });
}

