import './RotatingImage.css';

function RotatingImage({image, speed = "medium", size="full"}) {
  if (!image) return <div/>;

  return (
    <div>
        <img src={size === "small" ? image.smallsrc : image.src} 
        className={"Rotating-image " + speed + " " + size} 
        alt={image.alt} />
    </div>
  );
}

export default RotatingImage;
