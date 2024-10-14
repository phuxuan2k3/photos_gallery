import "./App.css";
import { useEffect, useRef, useState } from "react";
import photosJ from "./test.json";
import { Container, Alert } from "@mui/material";
import ImgGrid from "./components/ImgGrid";
import Photo from "./interfaces/Photo";
import { CircularProgress } from "@mui/material";
import axios from "axios";
const unsplashUrl = import.meta.env.VITE_UNPLASH_PHOTOS_URL;
const unsplashAccessKey = import.meta.env.VITE_UNPLASH_API_ACCESS_KEY;

async function fetchPhotos(
  url: string,
  accessKey: string,
  page: number,
  per_page: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  setLoading(true);
  setTimeout(async () => {
    try {
      const response = await axios.get(
        `${url}client_id=${accessKey}&page=${page}&per_page=${per_page}`
      );
      const data = response.data as Photo[];
      setPhotos((prevPhotos) => [...prevPhotos, ...data]);
    } catch (error) {
      setError("Error fetching photos");
    } finally {
      setLoading(false);
    }
  }, 2000);
}

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const per_page = 10;
  const [error, setError] = useState<string | null>(null);
  const finalPage = 2;

  useEffect(() => {
    fetchPhotos(
      unsplashUrl as string,
      unsplashAccessKey as string,
      page,
      per_page,
      setLoading,
      setPhotos,
      setError
    );
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight &&
        !loading &&
        !error
      ) {
        console.log("bottom");
        const nextPage = page + 1;
        if (nextPage > finalPage && !error) {
          setError("No more photos to load");
          setTimeout(() => setError(null), 2000);
          return;
        }
        setPage(nextPage);
        fetchPhotos(
          unsplashUrl as string,
          unsplashAccessKey as string,
          nextPage,
          per_page,
          setLoading,
          setPhotos,
          setError
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading]);

  return (
    <Container className="body">
      <h1>Photo gallery</h1>
      <ImgGrid photos={photos} />
      <>
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </>
      {error && (
        <Alert
          variant="filled"
          style={{ marginTop: "10px" }}
          severity="error"
          className="error"
        >
          {error}
        </Alert>
      )}
    </Container>
  );
}
