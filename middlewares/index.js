import fs from 'fs/promises';

export const logReqRes = (fileName) => {
    return async (req, res, next) => {
        try {
            const logMessage = `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`;
            await fs.appendFile(fileName, logMessage);
        } catch (err) {
            console.error("Failed to log request:", err);
        }
        next();
    };
};
