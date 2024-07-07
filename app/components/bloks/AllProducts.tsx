import { storyblokEditable } from "@storyblok/react";
import type { AllProductsStoryblok } from "~/types";
import { ProductsList } from "../ProductsList";

export const AllProducts = ({ blok }: AllProductsStoryblok) => {
  const { _uid } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid} className="">
      <ProductsList />
    </div>
  );
};
