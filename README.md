# 🚧 WIP 🚧

# astro-carousel 🎠

An accessible carousel component for Astro 🚀 that works by using browser navigation. 

# How to use

Import astro-carousel to your Astro component

````js
---
import Carousel from 'astro-carousel';
---
...
````


To open the carousel from a list of images, you need to use `id="carouselTargetList"` in the parent element and `data-carousel-index` in the anchor tag of children elements. You also need to set the `href` of the anchor tag to ```href={`${path}?image=${i}`}```.
 
```js
<ul id="carouselTargetList">
  {
    images.map((img, i) => {
      return (
        <li>
          <a
            href={`/?image=${i}`}
            data-carousel-index={i}
          >
            <img src={img} alt="" />
          </a>
        </li>
      );
    })
  }
</ul>
```

After importing the Carousel component in your Astro component, you need to create a list of images and pass it as a prop. 

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



