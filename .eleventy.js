const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addPassthroughCopy("./src/img");
    eleventyConfig.addPassthroughCopy("./src/js");

    const md = new markdownIt({
        html: true
    });

    const { DateTime } = require("luxon");

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).setLocale('en-gb').toLocaleString(DateTime.DATE_FULL);
    });

    eleventyConfig.addPairedShortcode("markdown", (content) => {
        return md.render(content);
    });

    eleventyConfig.addNunjucksFilter('split', (str, delimiter) => str.split(delimiter));

    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};