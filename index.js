import axios from "axios";
import * as cheerio from "cheerio";

(async () => {
    const divarHtmlPage = (await axios.get("https://divar.ir/s/tehran")).data
    const $ = cheerio.load(divarHtmlPage)

    const advertisements = []
    const titles = $(".post-card-item-af972 > a").each((index, element) => {
        const advertise = {
            title: $(element).find(".kt-post-card__title").text(),
            price: $(element).find(".kt-post-card__description").text(),
            description: $(element).find(".kt-post-card__bottom-description").text(),
            image: null
        }

        // adding images to advertise
        const imageElements = $(element).find("picture > img")
        if (imageElements.length === 1) advertise.image = imageElements[0].attribs["data-src"]

        advertisements.push(advertise)
    })
    console.log("Scraping is Done.")
})()
