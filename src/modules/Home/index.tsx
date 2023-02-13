import AddRounded from "@mui/icons-material/AddRounded";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import Typography from "@mui/joy/Typography";
import { User } from "@supabase/auth-helpers-nextjs";
import NextLink from "next/link";
import React from "react";

import LatestDives from "./LatestDives";

interface HomeProps {
  user: User;
  dives: any;
}

const Home: React.FC<HomeProps> = ({ user, dives }) => (
  <>
    <Typography level="h4" component="h1">
      Hi {user.user_metadata.first_name} 🤿
    </Typography>

    {dives?.length ? (
      <Typography level="h6" textColor="GrayText" component="h2">
        You've logged{" "}
        <Typography component="span" color="primary">
          {dives.length} {dives.length === 1 ? "dive" : "dives"}
        </Typography>{" "}
        so far
      </Typography>
    ) : (
      <Typography level="h6" textColor="GrayText" component="h2">
        You{" "}
        <Typography component="span" color="primary">
          haven't logged any dives
        </Typography>{" "}
        yet 😱
      </Typography>
    )}

    <NextLink href="/dives/new" passHref>
      <Button
        sx={{ mt: 2 }}
        startDecorator={<AddRounded />}
        component="a"
        size="lg"
      >
        Log dive
      </Button>
    </NextLink>

    <Grid container gap={6} mt={6}>
      <Grid xs={12}>
        <LatestDives />
      </Grid>
    </Grid>
  </>
);

export default Home;
