import React from "react";
import Hero from "@/components/Hero";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Products from "@/components/Products";
import Collection from "@/components/Collection";

export default function Home({featuredProduct, newProducts, collectionProduct}) {
  return (
    <>
      <div className="">
        <Hero product={featuredProduct} />

        <hr class="my-8 h-px border-0 bg-gray-300" />

        <Products products={newProducts} />

        <hr class="my-8 h-px border-0 bg-gray-300" />

        <Collection product={collectionProduct} />
      </div>
    </>
  );
}

export async function getServerSideProps(){
  await mongooseConnect();

  const featuredProduct = await Product.findOne({}, null, {
    sort: { _id: 1 },
  });

  const newProducts = await Product.find({}, null, {
    sort: { _id: 1 },
    limit: 5,
  });
  const collectionProduct = await Product.findOne({}, null, {
    sort: { _id: -1 },
  });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      collectionProduct: JSON.parse(JSON.stringify(collectionProduct)),
    },
  };
}