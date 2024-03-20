import type { ExternalImageService, ImageTransform, AstroConfig, ImageOutputFormat } from "astro";
import { baseService } from "astro/assets";

function getSize(filename: string = ''): { width: number; height: number } {
    const [width, height] = filename
        .replace("https://a.storyblok.com/f/", "")
        .split("/")[1]
        .split("x");
    return { width: Number(width), height: Number(height) };
}

interface StoryblokImageTransform extends ImageTransform {
    smart?: boolean, // https://www.storyblok.com/docs/image-service#facial-detection-and-smart-cropping
    'fit-in'?: boolean, // https://www.storyblok.com/docs/image-service#fit-in
    filters?: {
        fill?: string, // #hexadecimal RGB expression (without the # character)
        quality?: number, // 0-100 https://www.storyblok.com/docs/image-service#quality-optimization
        focal?: string, // https://www.storyblok.com/docs/image-service#custom-focal-point,
        grayscale?: boolean, // https://www.storyblok.com/docs/image-service#grayscale
        blur?: number, // https://www.storyblok.com/docs/image-service#blur
        rotate?: number, // https://www.storyblok.com/docs/image-service#rotation
        brightness?: number, // https://www.storyblok.com/docs/image-service#brightness
        'round-corner'?: string, // https://www.storyblok.com/docs/image-service#rounded-corners
    }
}

const service: ExternalImageService = {
    ...baseService,
    validateOptions(options: StoryblokImageTransform) {
        const originalSrc = typeof options.src === 'string' ? options.src : options.src.src;
        const width = Math.ceil(options.width ?? getSize(originalSrc).width);
        const height = Math.ceil(options.height ?? getSize(originalSrc).height);
        return { ...options, width, height };
    },
    getURL(options: StoryblokImageTransform) {
        const format = `format(${options.format ?? 'webp'})`;
        const filters = Object.entries((options.filters ?? {})).reduce((acc, [key, value]) => {
            acc.push(`${key}(${value})`);
            return acc;
        }, [] as string[]).join(':');
        let url = `${options.src}/m/${options.width ?? 0}x${options.height ?? 0}/filters:${format}`;
        if (filters) url = url.concat(`filters:${filters}`);
        return url;
    },
    getHTMLAttributes(options: StoryblokImageTransform) {
        const { src, format, quality, ...attributes } = options;
        return {
            ...attributes,
        };
    }
};


export default service;