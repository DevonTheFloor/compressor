const { compress } = require("compress-images/promise");
const ENV = require("../env");
const OUTPUT_path = "./comp-img/comp-";

const logFileReqReport = (req) => {
    if (ENV.mode === "development") {
        console.log("Process starting ...");
        console.log("req.file :", req.file);
        console.log("req.body :", req.body);
        console.log("T comp :", req.body.rangeValue);
        console.log("req.file.filename: ", req.file.filename);
        console.log("req.file.path :", req.file.path);
    }
};

/*const logCompressReport = (error, completed, statistic) => {
    console.log("Rapport de compression :");
    console.log("-------------");
    console.log("erreur :", error);
    console.log("achevé :", completed);
    console.log("static :", statistic);
    console.log("-------------");
    console.log("TERMINUS");
};
*/
const asyncImages = async (onProgress, req, tcomp) => {
    let mineTypePicture = "";

    switch (req.file.mimetype) {
    case "image/jpg":
        mineTypePicture = "jpg";
        break;
    case "image/jpeg":
        mineTypePicture = "jpg";
        break;
    case "image/png":
        mineTypePicture = "png";
        break;
    case "image/gif":
        mineTypePicture = "gif";
        break;
    case "image/svg":
        mineTypePicture = "svg";
        break;
    case "image/svg+xml":
        mineTypePicture = "svg";
        break;
    default:
        break;
    }
    const result = await compress({
        source: "./"+req.file.path,
        destination: OUTPUT_path,
        onProgress,
        enginesSetup: {
            jpg: { engine: mineTypePicture === "jpg"? "mozjpeg": false, command: ["-quality", tcomp ] },
            png: { engine:  mineTypePicture === "png"? "pngquant": false, command: ["--quality=10-"+tcomp, "-o"] },
            svg: { engine:  mineTypePicture === "svg"? "svgo": false, command: "--multipass" },
            gif: { engine: mineTypePicture === "gif"? "gifsicle": false, command: ["--colors", tcomp, "--use-col=web"] },
        }
    });
    const { statistics, errors } = result;

};

asyncImages((req, res, error, statistic, completed) => {
    if (error) {
        console.log(error);
        res.status(500).json({error, statistic});
    }
    const pinctureLink = `http://${ENV.host}:${ENV.port}/assets/${ENV.picturePrefix + req.file.filename}`;
    console.log("picktureLink : ", pinctureLink);
    res.status(200).json({pictureLink: pinctureLink});
});


exports.jpgComp = (req, res, tcomp) => {
    // log fichier entrée
    logFileReqReport(req);
    asyncImages(req, res, tcomp);
};

exports.pngComp = (req, res, tcomp) => {
    // log fichier entrée
    logFileReqReport(req);
    asyncImages(req, res, tcomp);
};

exports.gifComp = (req, res, tcomp) => {
    // log fichier entrée
    logFileReqReport(req);
    asyncImages(req, res, tcomp);
};

exports.svgComp = (req, res, tcomp) => {
    // log fichier entrée
    logFileReqReport(req);
    asyncImages(req, res, tcomp);
};

