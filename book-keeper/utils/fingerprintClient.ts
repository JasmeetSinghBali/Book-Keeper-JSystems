import axios from "axios";
import validator from "validator";

export interface fingerprintPD {
    ip: string;
    country: object;
    location: object;
    lastUpdated: string;
    network: object;
    confidence: string;
    confidenceArea: Array<object>;
    securityThreat: string;
    hazardReport: object;
}

/**@desc creates/updates fingerprintPD of the client with reff to IP passed for user to update in DB */
const fpClient = async(clientIP: string): Promise<Boolean | fingerprintPD > => {
    try{
        // check IP address validity
        const isValidIP = validator.isIP(clientIP);

        if(!isValidIP){
            return new Promise<Boolean | fingerprintPD>((resolve)=>{
                resolve(false)
            });
        }

        // make call to geolocation api to determine Location
        const {data} = await axios.get(`https://api.bigdatacloud.net/data/ip-geolocation-full?ip=${clientIP}&localityLanguage=en&key=${process.env.BIGDATA_API_KEY as string}`);

        if(!data){
            return new Promise<Boolean | fingerprintPD>((resolve)=>{
                resolve(false)
            });
        }
        console.log("data from big cloud api");
        console.log(data);

        return new Promise<Boolean | fingerprintPD>((resolve)=>{
            resolve({
                ip: data.ip,
                country: data.country,
                location: data.location,
                lastUpdated: data.lastUpdated,
                network: data.network,
                confidence: data.confidence,
                confidenceArea: data.confidenceArea,
                securityThreat: data.securityThreat,
                hazardReport: data.hazardReport
            })
        });
    }catch(err: any){
        // console.log(err);
        return new Promise<Boolean | fingerprintPD>((resolve)=>{
            resolve(false)
        });
    }
}

export default fpClient;
