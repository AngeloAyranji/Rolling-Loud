import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import { BsPlus, BsWhatsapp, BsMessenger } from "react-icons/bs";
import { HiOutlineEnvelope, HiOutlineEnvelopeOpen } from "react-icons/hi2";

export default function SocialsMenu() {
  const labelProps = {
    variant: "small",
    color: "white",
    className: "absolute right-14 font-normal",
  };

  return (
    <div className="fixed right-4 bottom-4 z-[1000]">
      <div className="relative h-80 w-full">
        <div className="absolute bottom-0 right-0">
          <SpeedDial>
            <SpeedDialHandler>
              <IconButton
                size="lg"
                className="rounded-full group"
                color="purple"
              >
                <HiOutlineEnvelope className="h-5 w-5 transition-transform group-hover:hidden" />
                <HiOutlineEnvelopeOpen className="hidden h-5 w-5 transition-transform group-hover:block" />
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent>
              <SpeedDialAction className="relative">
                <a href="https://wa.me/+96170124129">
                  <BsWhatsapp className="h-5 w-5 text-secondary" />
                </a>
                <Typography {...labelProps}>Whatsapp</Typography>
              </SpeedDialAction>
              <SpeedDialAction className="relative">
                <a href="https://m.me/Skyshop.fpv">
                  <BsMessenger className="h-5 w-5 text-secondary" />
                </a>
                <Typography {...labelProps}>Messenger</Typography>
              </SpeedDialAction>
            </SpeedDialContent>
          </SpeedDial>
        </div>
      </div>
    </div>
  );
}
