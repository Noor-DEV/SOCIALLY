import React from "react";
import { useTheme, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertisementWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:8000/assets/1674669673392-luke.jpg"
        style={{
          borderRadius: "0.75rem",
          margin: "0.75rem 0",
        }}
      />
      <FlexBetween>
        <Typography color={main}>Chopperz</Typography>
        <Typography color={medium} ml="1rem">
          chopperz.com
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your Pathway to having the cleanest and most beautifully chopped woods
        of any kind of your choice - You name it, we got it.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertisementWidget;
