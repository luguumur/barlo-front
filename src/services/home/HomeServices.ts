import ApiService from "../ApiService";

export async function apiMastheads<T>() {
  return ApiService.fetchData<T>({
    url: "mastheads",
    method: "get",
  });
}

export async function apiDeals<T>() {
  return ApiService.fetchData<T>({
    url: "deals",
    method: "get",
  });
}

export async function apiMagazine<T>() {
  return ApiService.fetchData<T>({
    url: "magazines",
    method: "get",
  });
}

export async function apiModel<T>() {
  return ApiService.fetchData<T>({
    url: "store/attribute-values?attribute_id=clx2rlgzv0005w3hvkqzb1fyo",
    method: "get",
  });
}

export async function apiLocation<T>() {
  return ApiService.fetchData<T>({
    url: "store/attribute-values?attribute_id=clx2rl7l30004w3hv38mtjjbq",
    method: "get",
  });
}

export async function apiOwner<T>() {
  return ApiService.fetchData<T>({
    url: "store/attribute-values?attribute_id=clx2rkyy60003w3hvmr8tg2e5",
    method: "get",
  });
}

export async function apiTestimonials<T>() {
  return ApiService.fetchData<T>({
    url: "testimonials",
    method: "get",
  });
}
