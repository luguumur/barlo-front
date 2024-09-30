import { toast } from "react-toastify";
import {
  apiDeals,
  apiLocation,
  apiMagazine,
  apiMastheads,
  apiModel,
  apiOwner,
  apiTestimonials,
} from "@/services/home/HomeServices";
import { create } from "zustand";
import { ImageProps } from "../interface";
import getBase64ImageUrl from "./generateBlurPlaceholder";

interface PaymentStore {
  paymentData: any | null;
  loading: boolean;
  mastheads: any;
  model: any;
  owner: any;
  deals: any;
  magazine: any;
  location: any;
  testimonials: any;
  setLoadingState: (_newVal: boolean) => void;
  fetchMastHeadData: () => Promise<void>;
  fetchDealData: () => Promise<void>;
  fetchModelData: () => Promise<void>;
  fetchLocationData: () => Promise<void>;
  fetchOwnerData: () => Promise<void>;
  fetchMagazineData: () => Promise<void>;
  fetchTestimonialsData: () => Promise<void>;
}

export const useHomeStore = create<PaymentStore>((set) => ({
  paymentData: null,
  mastheads: {},
  model: {},
  owner: {},
  location: {},
  deals: {},
  magazine: {},
  testimonials: {},
  loading: true,
  fetchMastHeadData: async () => {
    set({ loading: true });
    try {
      const mastData: any = await apiMastheads<any>().then(({ data }) => data);
      // console.log(mastData);
      // const blurImagePromises = mastData.map((image: any) => {
      //   return getBase64ImageUrl(image.imageurl);
      // });
      // const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

      // let reducedResults: ImageProps[] = [];
      // for (let i = 0; i < reducedResults.length; i++) {
      //   reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
      // }
      // console.log(reducedResults);
      set({
        mastheads: {
          data: mastData,
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("API Error");
    } finally {
      set({ loading: false });
    }
  },
  fetchDealData: async () => {
    set({ loading: true });
    try {
      const dealData = await apiDeals<any>().then(({ data }) => data);
      set({
        deals: {
          data: dealData,
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("API Error");
    } finally {
      set({ loading: false });
    }
  },
  fetchMagazineData: async () => {
    set({ loading: true });
    try {
      const magazineData = await apiMagazine<any>().then(({ data }) => data);
      set({
        magazine: {
          data: magazineData,
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("API Error");
    } finally {
      set({ loading: false });
    }
  },
  fetchModelData: async () => {
    set({ loading: true });
    try {
      const modelData = await apiModel<any>().then(({ data }) => data);
      set({
        model: {
          data: modelData,
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("API Error");
    } finally {
      set({ loading: false });
    }
  },
  fetchLocationData: async () => {
    set({ loading: true });
    try {
      const locationData = await apiLocation<any>().then(({ data }) => data);
      set({
        location: {
          data: locationData,
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("API Error");
    } finally {
      set({ loading: false });
    }
  },
  fetchOwnerData: async () => {
    set({ loading: true });
    try {
      const ownerData = await apiOwner<any>().then(({ data }) => data);
      set({
        owner: {
          data: ownerData,
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("API Error");
    } finally {
      set({ loading: false });
    }
  },
  fetchTestimonialsData: async () => {
    set({ loading: true });
    try {
      const testimonialsData = await apiTestimonials<any>().then(({ data }) => data);
      set({
        testimonials: {
          data: testimonialsData,
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("API Error");
    } finally {
      set({ loading: false });
    }
  },
  setLoadingState: (newValue: boolean) => {
    set({ loading: newValue });
  },
}));
