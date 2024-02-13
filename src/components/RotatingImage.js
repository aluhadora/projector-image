import '../App.css';

function RotatingImage({image, onClick}) {
  if (!image) return <div/>;

  return (
    <div className="RotatingImage">
        <img src={image.src} className="Rotating-image" alt={image.alt} onClick={onClick} />
    </div>
  );
}

export default RotatingImage;
