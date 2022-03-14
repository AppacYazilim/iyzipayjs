import { OutgoingHttpHeaders } from "http";
import https from "https";
import { URL } from "url";


export function httpsRequest(url: URL,  method: string, data?: Buffer, headers?: OutgoingHttpHeaders): Promise<Buffer> {

  return new Promise((resolve, reject) => {

    console.log(`httpsRequest: ${url.href} ${method}`);
    console.log("headers: ", headers);
    console.log("Body: ", data?.toString("utf8"));

    const req = https.request({
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method, headers
    }, res => {
      
      res.setEncoding("utf8");


      const contentLength = res.headers["content-length"] ? parseInt(res.headers["content-length"]) : 0;

      let rawData = Buffer.alloc(contentLength ?? 100);

      res.on("data", d => {
        rawData += d;
      });

      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error(`${res.statusCode} ${res.statusMessage}, data: ${rawData.toString("utf8")}`));
          return;
        } else {

          resolve(rawData);

        }
      });
    });

    req.on("error", error => {
      reject(error);
    });
    if(data) {
      req.write(data);
    }
    req.end();
  });
}
