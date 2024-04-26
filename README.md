# astro-carousel 🎠

An accessible carousel component for Astro 🚀 that works by using browser navigation. 

Demo: https://astro-carousel.pages.dev
Live example: https://kuraunaito.com/photos/saint-malo/?image=0

<img width="1512" alt="Screenshot 2024-04-26 at 11 56 36" src="https://github.com/claudiabdm/astro-carousel/assets/44007726/8da45769-72da-4dc3-a43c-ee7151ecdc01">

# Installation

```bash
npm install astro-carousel
```

# Usage

Import astro-carousel to your Astro component

````js
---
import Carousel from 'astro-carousel';
---
...
````

To open the carousel from a list of images, you need to use `id="carouselTargetList"` in the parent element and `data-carousel-index={index}` in the anchor tag of children elements. You also need to set the `href` of the anchor tag to ```href={`${path}?image=${index}`}```.
 
```js
<ul id="carouselTargetList">
  {
    images.map((img, index) => {
      return (
        <li>
          <a
            href={`/?image=${index}`}
            data-carousel-index={index}
          >
            <img src={img} alt="" />
          </a>
        </li>
      );
    })
  }
</ul>
```

After importing the Carousel component in your Astro component, you just need to create a list of images and pass it as a prop. 

```js
---
const images: ComponentProps<typeof Carousel>["images"] = [
  {
    src: "https://a.storyblok.com/f/95455/1350x1080/3ef7748922/p5240368.jpg",
    alt: "",
    format: "webp",
    width: 1350,
    height: 1080,
    widths: [450, 675, 1350],
  }
];
---

<Carousel images={images} />
```



