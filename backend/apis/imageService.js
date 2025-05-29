const images = {
  cat: { src: "/assets/images/cat.jpg", alt: "Cat" },
  dog: { src: "/assets/images/dog.jpg", alt: "Dog" },
  rabbit: { src: "/assets/images/rabbit.jpg", alt: "Rabbit" },
  duck: { src: "/assets/images/duck.jpg", alt: "Duck" },
  horse: { src: "/assets/images/horse.jpg", alt: "Horse" },
};

async function getImageByName(imageName) {
  if (!imageName) throw new Error("Image name is required");

  const image = images[imageName];
  if (!image) throw new Error("Image not found");

  return image;
}

module.exports = { getImageByName };
