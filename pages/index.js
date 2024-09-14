import React from "react";
import Hero from "@/components/Hero";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home({featuredProduct}) {
  return (
    <>
      <div className="">
        <Hero product={featuredProduct} />
        <hr class="my-8 h-px border-0 bg-gray-300" />
      </div>
    </>
  );
}

export async function getServerSideProps(){
  await mongooseConnect();

  const featuredId = "66e27286ca2a680f0c097c01";

  const featuredProduct = await Product.findById(featuredId);

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct))
    }
  }
}