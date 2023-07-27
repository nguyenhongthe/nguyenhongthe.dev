// next-sitemap.config.js
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_METADATA_BASE || 'https://nguyenhongthe.dev',
    generateRobotsTxt: true, // (optional)
    // ...other options
    sitemap: {
         changefreq: 'daily',
         priority: 0.7,
         gzip: true,
         exclude: ['/private-page'],
         pages: [
             {
                 url: '/',
                 changefreq: 'weekly',
                 priority: 1,
             },
             {
                 url: '/contact',
                 changefreq: 'weekly',
                 priority: 0.7,
             },             
             {
                 url: '/projects',
                 changefreq: 'monthly',
                 priority: 0.5,
             },
         ],
    },
};
