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

After importing the Carousel component in your Astro component, you need to create a list of images with an `id="slides"` in the parent element and a class `carousel__slide` in the list elements. 

```js
<Carousel>
  <ul id="slides">
    {
      images.map((img: any) => (
        <li class:list={["carousel__slide"]}>
          <img src={img} alt=""/>
        </li>
      ))
    }
  </ul>
</Carousel>
```



