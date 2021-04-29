export const accentColors: { [key: string]: string } = {
  yellow: "#ffc500",
  blue: "#84bbf8",
  lavender: "#657be1",
  green: "#33b080",
  grey: "#b2b3b3",
  orange: "#ed8048",
};

export const sscx = {
  org: "public",
  project: "sscx",
  expNeuronElectroViewId: encodeURIComponent(
    "https://bbp.epfl.ch/neurosciencegraph/data/views/es/dataset"
  ),
  datasetViewId: encodeURIComponent(
    "https://bbp.epfl.ch/neurosciencegraph/data/views/es/dataset"
  ),
};

export const nexus = {
  url: process.env.NEXT_PUBLIC_NEXUS_URL || "https://bbp.epfl.ch/nexus/v1",
  token: process.env.NEXT_PUBLIC_NEXUS_TOKEN,
};

export const nexusPluginBaseUrl = "https://bbp.epfl.ch/nexus/plugins";

export const feedbackDeploymentId =
  process.env.NEXT_PUBLIC_FEEDBACK_DEPLOYMENT_ID;

export const basePath = "/sscx-portal";

const liveContentEnv = process.env.NEXT_PUBLIC_SSCX_LIVE_CONTENT;
export const liveContent = liveContentEnv?.toLowerCase() === "true";

export const isProd = process.env.NEXT_PUBLIC_APP_ENV === "production";
export const FEEDBACK_HOST = isProd ? "whatever" : `http://localhost:8000`;
