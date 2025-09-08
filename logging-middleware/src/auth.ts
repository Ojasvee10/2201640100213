import axios from "axios";

let cachedToken: string | null = null;

export async function getAuthToken(): Promise<string> {
  if (cachedToken) return cachedToken;

  const res = await axios.post("http://20.244.56.144/evaluation-service/auth", {
    email: "your_email@college.edu",
    name: "Your Name",
    rollNo: "your_rollno",
    accessCode: "your_access_code",
    clientID: "your_client_id",
    clientSecret: "your_client_secret"
  });

  cachedToken = res.data.access_token;
  return cachedToken!;
}
