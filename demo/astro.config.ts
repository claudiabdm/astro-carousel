import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    image: {
        domains: ["a.storyblok.com"],
        service: {
            entrypoint: './storyblok-image-service',
            endpoint: `https://a.storyblok.com/f/186233`, // https://www.storyblok.com/tp/optimize-your-storyblok-images-with-image-engine#structure-of-the-url-of-an-image
        }
    }
});
