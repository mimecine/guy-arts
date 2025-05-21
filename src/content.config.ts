import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { unescape } from 'querystring';

const things = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/things' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            hidden: z.boolean().default(false),
            materials: z.string().optional().nullish(),
            dimensions: z.string().optional().nullish(),
            price: z.number().optional().nullish(),
            image: image().transform((image) => {
                console.log('image', image, unescape(image));
                return unescape(image);
            }),
            images: z
                .array(
                    z.object({
                        src: image().transform((image) => {
                            return image.src?.replace(/^\//, '');
                        }),
                        alt: z.string().optional(),
                        caption: z.string().optional()
                    })
                )
                .optional()
        })
});

const pages = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/pages' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            image: image()
                .transform((image) => {
                    return unescape(image); // transforms image __ASTRO_IMAGE_/src/assets/An%20Image.jpg to image __ASTRO_IMAGE_/src/assets/An Image.jpg
                })
                .optional()
                .nullish()
        })
});

const posts = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/posts' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            image: image()
                .transform((image) => {
                    return unescape(image); // transforms image __ASTRO_IMAGE_/src/assets/An%20Image.jpg to image __ASTRO_IMAGE_/src/assets/An Image.jpg
                })
                .optional()
                .nullish()
        })
});

export const collections = {
    things,
    pages,
    posts
};
