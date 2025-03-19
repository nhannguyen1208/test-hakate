import { Container, Typography, Button, Box, Grid, Card, CardMedia, CardContent, Link } from "@mui/material";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [news, setNews] = useState([]);

  const safeFormatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-GB");
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/home");
        const data = await res.json();

        const formattedNews = data.map((item) => ({
          ...item,
          date: safeFormatDate(item.date),
        }));

        setNews(formattedNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box textAlign="left" sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Bringing the benefits of AI to everyone
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mt: 1 }}>
          We research and develop the fields of Artificial Intelligence:  
          Natural Language, Computer Vision, Machine Learning, Big Data Analysis.
        </Typography>
        <Button variant="contained" sx={{ mt: 2, bgcolor: "#2639ED" }}>
          Explore
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        {[
          { img: "/ai1.png" },
          { img: "/ai2.png" },
          { img: "/ai3.png" },
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardMedia component="img" height="160" image={item.img} />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", color: "#2639ED", mb: 4 }}>
          AI News in the World
        </Typography>

        <Slider {...sliderSettings}>
          {news.map((item) => (
            <Box key={item._id} sx={{ p: 1 }}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, display: "flex", flexDirection: "column", height: "100%", mx: 2 }}>
                <CardMedia component="img" height="180" image={item.image_url} alt={item.title} />

                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      {item.title}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      Date: {item.date}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#333" }}>
                      {item.content ? item.content.substring(0, 150) + "..." : "No content available."}
                    </Typography>
                  </div>

                  <div>
                    <Typography sx={{ mt: 1 }}>
                      <Link href={item.link} target="_blank" sx={{ fontWeight: "bold" }}>
                        Read more
                      </Link>
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 1, color: "gray", fontStyle: "italic" }}>
                      "{item.content}"
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
}