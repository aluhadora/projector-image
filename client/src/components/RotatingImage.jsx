import './RotatingImage.css';

function RotatingImage({image, size, classNames}) {
  if (!image) return <div/>;

  return (
    <div className={classNames.filter(c => c && !c.startsWith("fade")).join(" ")}>
        <img src={size === "small" ? image.smallsrc : image.src} 
        className={"Rotating-image " + classNames.filter(c => c && !c.endsWith("Rotation")).join(" ")} 
        alt={image.alt} />
    </div>
  );
}

export default RotatingImage;
