import axios from "axios";
import * as cheerio from "cheerio";

export interface BrandLogoResponse {
  logo?: string;
  error?: string;
}

export async function fetchBrandLogo(brandName: string): Promise<BrandLogoResponse> {
  try {
    const formattedBrandName = brandName.toLowerCase().replace(/\s+/g, "-");
    const searchUrl = `/api/proxy/worldvectorlogo/search/${encodeURIComponent(formattedBrandName)}`;

    console.log("Searching logo for:", brandName, "at URL:", searchUrl);

    const response = await axios.get(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);

    const logoElement = $("a[href*='/logo/'] img").first();
    const logoSrc = logoElement.attr("src");

    if (!logoSrc) {
      return { error: "Logo not found for brand: " + brandName };
    }

    const logoUrl = logoSrc.startsWith("http") ? logoSrc : `https://worldvectorlogo.com${logoSrc}`;
    console.log("Found logo URL:", logoUrl);

    return { logo: logoUrl };
  } catch (error) {
    console.error("Error fetching brand logo:", error);
    return { error: "Failed to fetch logo: " + (error as Error).message };
  }
}
