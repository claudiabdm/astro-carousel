import type { ComponentProps } from "astro/types";
import type Carousel from "~/src/Carousel.astro";

export const images: ComponentProps<typeof Carousel>["images"] = [
  {
    src: "https://a.storyblok.com/f/95455/1350x1080/3ef7748922/p5240368.jpg",
    alt: "",
    width: 1350,
    height: 1080,
    widths: [200, 675, 1350],
  },
  {
    src: "https://a.storyblok.com/f/95455/1350x1080/231d2407ea/p4030184.jpg",
    alt: "",
    width: 1350,
    height: 1080,
    widths: [200, 675, 1350],
  },
  {
    src: "https://a.storyblok.com/f/95455/1350x1080/4aee2a00f4/p5240221.jpg",
    alt: "",
    width: 1350,
    height: 1080,
    widths: [200, 675, 1350],
  },
  {
    src: "https://a.storyblok.com/f/186233/1365x2048/3e6411d521/20230714-1.jpg",
    alt: "",
    width: 1280,
    height: 1920,
    widths: [200, 675, 1350],
  },
];