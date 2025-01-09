import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function MediaCard() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "full" }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://i0.wp.com/www.delhiwire.com/wp-content/uploads/2024/12/Chill-Guy-Meme.png?resize=400%2C240&ssl=1"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Looking For Form?
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Click the below Link to Go
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate("/form-layout")}>
            Click Here To Go
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
