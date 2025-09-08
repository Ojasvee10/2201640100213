import axios from "axios";
import { getAuthToken } from "./auth";

const LOG_API = "http://20.244.56.144/evaluation-service/logs";

export type LogStack = "frontend" | "backend";
export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";
export type LogPackage =
  | "api" | "component" | "hook" | "page" | "state" | "style"
  | "auth" | "config" | "middleware" | "utils"
  | "cache" | "controller" | "cron_job" | "db" | "domain"
  | "handler" | "repository" | "route" | "server" | "service";

export async function Log(stack: LogStack, level: LogLevel, pkg: LogPackage, message: string) {
  try {
    const token = await getAuthToken();
    const res = await axios.post(LOG_API, {
      stack,
      level,
      package: pkg,
      message,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    console.error("Failed to send log:", err.message);
  }
}
