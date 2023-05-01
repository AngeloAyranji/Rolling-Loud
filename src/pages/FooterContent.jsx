import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function FooterContent({ name }) {
  return (
    <div className="w-full mx-auto flex justify-center items-center">
      <div className="max-w-[1400px] w-full">
        <div className="flex flex-col justify-center items-start p-4 md:p-6 lg:p-8 2xl:pl-14 space-y-8">
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            className="!text-white !text-sm !breadcrumbs !scrollbar-thumb-rounded-full !scrollbar-thumb-base-100 !pb-4 !scrollbar-thumb-sm"
          >
            <Link to="/">Home</Link>
            <Link to={`/footer/about`}>About Us</Link>
          </Breadcrumbs>
          <h2 className="text-xl xl:text-3xl font-bold text-white uppercase tracking-wide">
            {name}
          </h2>
          <div className="h-[2px] w-full bg-primary"></div>
          <p className="text-secondary-content text-lg tracking-wide">
            Welcome to our online drone shop! We are a team of drone enthusiasts
            who are passionate about providing you with the latest and best
            technology in unmanned aerial vehicles. Our mission is to make the
            world of drones accessible to everyone by offering a wide range of
            products at competitive prices. Our team consists of experienced
            pilots, technicians, and customer service representatives who are
            dedicated to ensuring that you have the best possible shopping
            experience. We understand that buying a drone can be a daunting
            task, which is why we are always here to help answer any questions
            or concerns you may have. We strive to provide you with the most
            up-to-date information and expert advice so that you can make an
            informed decision about your purchase. At our online drone shop, we
            only sell products from the most trusted and reputable brands in the
            industry. We believe that quality is key, which is why we rigorously
            test all of our products before they are added to our inventory. We
            also offer a wide range of accessories and replacement parts, so
            that you can customize and repair your drone as needed. Whether you
            are a professional photographer, videographer, or just someone who
            wants to explore the world from a new perspective, we have the
            perfect drone for you. Thank you for choosing our online drone shop
            as your one-stop-shop for all your drone needs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterContent;
