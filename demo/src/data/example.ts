import type { ComponentProps } from "astro/types";
import type Carousel from "~/src/Carousel.astro";

export const images: ComponentProps<typeof Carousel>["images"] = [
  {
    src: "/_image.webp",
    alt: "",
    width: 1350,
    height: 1080,
    widths: [200, 675, 1350],
  },
  {
    src: "/_image-2.webp",
    alt: "",
    width: 1350,
    height: 1080,
    widths: [200, 675, 1350],
  },
  {
    src: "/_image-3.webp",
    alt: "",
    width: 1350,
    height: 1080,
    widths: [200, 675, 1350],
  },
  {
    src: "/_image-4.webp",
    alt: "",
    width: 1280,
    height: 1920,
    widths: [200, 675, 1350],
  },
  {
    src: "/_image-5.webp",
    alt: "",
    width: 2048,
    height: 1152,
    widths: [200, 675, 1350],
  },
];