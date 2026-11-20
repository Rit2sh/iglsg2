import axios from "axios";

export async function getLocationFromIP(ip: string) {
    try {
        const res = await axios.get(`https://ipapi.co/${ip}/json/`);

        if (!res.status) return null;

        const data = res.data;

        return {
            city: data.city,
            region: data.region,
            country: data.country_name,
            latitude: data.latitude,
            longitude: data.longitude,
            org: data.org,
        };
    } catch {
        return null;
    }
}