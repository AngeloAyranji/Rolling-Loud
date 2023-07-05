import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";
import HomeCard from "./HomeCard";

function TimelineSection() {
  return (
    <div className="w-full min-h-screen relative flex justify-center mb-20">
      <div className="w-full mx-auto p-6 md:p-12 max-w-[1400px] relative flex flex-col lg:flex-row">
        <div className="w-full max-w-[600px] z-10 relative">
          <Timeline className="">
            <TimelineItem>
              <TimelineConnector />
              <TimelineHeader className="h-3">
                <TimelineIcon color="white" />
                <Typography
                  variant="h6"
                  color="white"
                  className="leading-none text-2xl uppercase font-bold"
                >
                  Rolling Loud NFT.
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-20 pt-4">
                <Typography
                  variant="small"
                  color="gary"
                  className="font-normal text-gray-300"
                >
                  Welcome to the official Rolling Loud Festival NFT Collection!
                  Secure your exclusive access to one of the hottest music
                  events of the year by purchasing an NFT. With our cutting-edge
                  blockchain technology, owning one of these limited edition
                  NFTs means you hold a digital representation of a coveted
                  ticket to the festival. Join passionate fans on an
                  extraordinary journey through music and culture.
                </Typography>
              </TimelineBody>
            </TimelineItem>
            <TimelineItem>
              <TimelineConnector />
              <TimelineHeader className="h-3">
                <TimelineIcon color="white" />
                <Typography
                  variant="h6"
                  color="white"
                  className="leading-none text-2xl uppercase font-bold"
                >
                  Get Exclusive Access
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-20 pt-4">
                <Typography
                  variant="small"
                  color="gary"
                  className="font-normal text-gray-300"
                >
                  Congratulations on becoming a proud owner of a Rolling Loud
                  Festival NFT! As a token holder, enjoy special privileges like
                  early entry, access to premium viewing areas, and exclusive
                  artist meet and greets. Immerse yourself in the vibrant
                  atmosphere of Rolling Loud, forge connections with fellow
                  enthusiasts, and create unforgettable memories. Experience the
                  festival like never before with unrivaled perks and prestige.
                </Typography>
              </TimelineBody>
            </TimelineItem>
            <TimelineItem>
              <TimelineConnector />
              <TimelineHeader className="h-3">
                <TimelineIcon color="white" />
                <Typography
                  variant="h6"
                  color="white"
                  className="text-2xl font-bold uppercase"
                >
                  Limited and Exclusive Merch
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pt-4">
                <Typography
                  variant="small"
                  color="gary"
                  className="font-normal text-gray-300 mt-2"
                >
                  In addition to extraordinary experiences, your NFT ownership
                  grants you access to limited and exclusive merchandise. Gear
                  up in style with unique designs and items only available to
                  NFT holders. Immerse yourself in the festival spirit with
                  custom apparel, collectible memorabilia, and sought-after
                  items that commemorate this legendary event. Stand out and
                  showcase your dedication with exclusive merchandise reflecting
                  the energy and culture of Rolling Loud. Elevate your festival
                  experience with these one-of-a-kind items that mark your
                  connection to the Rolling Loud NFT community.
                </Typography>
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        </div>
        <div className="w-full items-center justify-center flex">
          <HomeCard />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-[80%]">
          <div className="relative w-full h-full">
            <img
              src="https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/08/05154014/Untitled-design-2022-08-05T153839.975.png"
              className="w-full h-full object-cover brightness-50 z-0"
            />
            <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-gradient-to-r from-[#121212] to-transparent z-1"></div>
            <div className="absolute left-0 top-0 right-0 h-[20%] bg-gradient-to-b from-[#121212] to-transparent z-1"></div>
            <div className="absolute right-0 top-0 bottom-0 w-[60%] bg-gradient-to-l from-[#121212] to-transparent z-1"></div>
            <div className="absolute left-0 bottom-0 right-0 h-[20%] bg-gradient-to-t from-[#121212] to-transparent z-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineSection;
