import Grid from "@mui/material/Grid2";
import ImgCard from "./ImgCard";
import Photo from "../interfaces/Photo";

export default function ImgGrid({ photos }: { photos: Photo[] }) {
  return (
    <div>
      <Grid container spacing={4}>
        {photos.map((photo, index) => (
          <ImgCard photo={photo} index={index} key={index} />
        ))}
      </Grid>
    </div>
  );
}
