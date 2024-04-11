import './RotatingImage.css';

function RotatingImage({image, size, classNames}) {
  if (!image) return <div/>;

  let outerClass = 'Rotating-image-outer ' + classNames.filter(c => c && !c.startsWith("fade")).join(" ");
  let innerClass = 'Rotating-image ' + classNames.filter(c => c && !c.endsWith("Rotation")).join(" ");
  let style = {};
  if (image.center && size !== "small") {
    let normalCenter = image.center.height / 2;
    style.marginLeft = `${100*(normalCenter - image.center.x)/image.center.height}%`;
    style.marginTop = `${100*(normalCenter - image.center.y)/image.center.height}%`;
  }

  return (
    <div className={"Rotating-image-wrapper " + (size === "small" ? "small" : "fullSize")}>
      <div className={outerClass}>
          <img src={size === "small" ? image.smallsrc : image.src} 
          className={innerClass}
          alt={image.alt}
          style={style} />
      </div>
    </div>

  );
}

export default RotatingImage;
