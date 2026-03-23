import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import EventIcon from "@mui/icons-material/Event";
import logo from "../Images/logo.png";


export default function ActionAreaCard({ description,
  date, }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="50"
          width="50"
          image={logo}
        />

        <CardContent>
          

          {/* Descriere */}
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            {description}
          </Typography>

          {/* Data jos */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", fontSize: "0.85rem" }}>
      <EventIcon sx={{ fontSize: 16, mr: 0.5 }} />
      {date}
    </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
