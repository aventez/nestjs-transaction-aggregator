import { registerAs } from "@nestjs/config";

export default registerAs("bankApis", () => ({
  revolutApiUrl: process.env.REVOLUT_API_URL,
  sterlingBankApiUrl: process.env.STERLINGBANK_API_URL,
  monzoApiUrl: process.env.MONZO_API_URL,
}));
