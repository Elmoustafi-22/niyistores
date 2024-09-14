import React from "react";
import Hero from "@/components/Hero";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Products from "@/components/Products"
import { stringify } from "postcss";

export default function Home({featuredProduct, newProducts}) {
  return (
    <>
      <div className="">
        <Hero product={featuredProduct} />
        
        <hr class="my-8 h-px border-0 bg-gray-300" />

        <Products products={newProducts}/>
      </div>
    </>
  );
}

export async function getServerSideProps(){
  await mongooseConnect();

  const featuredId = "66e27286ca2a680f0c097c01";
  const collectionId = "66e480df1c0d4addb350cda3";

  const featuredProduct = await Product.findById(featuredId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: 1 },
    limit: 5,
  });
  const collectionProduct = await Product.findById(collectionId);

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      collectionProduct: JSON.parse(stringify(collectionProduct)),
    },
  };
}