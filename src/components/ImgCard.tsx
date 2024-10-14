import Grid from "@mui/material/Grid2";
import Photo from "../interfaces/Photo";
import { Card, CardMedia } from "@mui/material";

export default function ImgCard({
  photo,
  index,
}: {
  photo: Photo;
  index: number;
}) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
      <Card>
        <CardMedia
          className="image"
          component="img"
          height="200"
          image={photo.urls.thumb}
          alt={`image ${index + 1}`}
        />
        <div className="author-name">{photo.user.name}</div>
      </Card>
    </Grid>
  );
}
