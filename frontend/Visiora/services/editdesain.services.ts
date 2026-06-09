import { BASE_URL } from "@/constants/api";

const API_URL =
  `${BASE_URL}/api/design`;

export const createDesign = async (
  token: string,
  payload: any
) => {

  console.log(
    "createDesign request",
    API_URL,
    payload
  );

  const response =
    await fetch(
      API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`
        },

        body:
          JSON.stringify(
            payload
          )
      }
    );

  console.log(
    "STATUS:",
    response.status
  );

  const result =
    await response.json();

  console.log(
    "RESULT:",
    result
  );

  return result;
};

export const updateDesign = async (
  token: string,
  designId: number,
  payload: any
) => {

  const url =
    `${API_URL}/${designId}`;

  console.log(
    "updateDesign request",
    url,
    payload
  );

  const response =
    await fetch(
      url,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`
        },

        body:
          JSON.stringify(
            payload
          )
      }
    );

  console.log(
    "UPDATE STATUS:",
    response.status
  );

  const result =
    await response.json();

  console.log(
    "UPDATE RESULT:",
    result
  );

  return result;
};

export const getDesignById = async (
  token: string,
  designId: number
) => {

  const url =
    `${API_URL}/${designId}`;

  console.log(
    "getDesignById request",
    url
  );

  const response =
    await fetch(
      url,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  console.log(
    "GET DESIGN STATUS:",
    response.status
  );

  const result =
    await response.json();

  console.log(
    "GET DESIGN RESULT:",
    result
  );

  return result;
};

export const getHistoryDesign = async (
  token: string
) => {

  const url =
    `${API_URL}/history`;

  console.log(
    "getHistoryDesign request",
    url
  );

  const response =
    await fetch(
      url,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  console.log(
    "HISTORY STATUS:",
    response.status
  );

  const result =
    await response.json();

  console.log(
    "HISTORY RESULT:",
    result
  );

  return result;
};
export const generateCaptionFromImage = async (
  token: string,
  imageUri: string
) => {

  const formData = new FormData();

  formData.append("image", {
    uri: imageUri,
    name: "image.jpg",
    type: "image/jpeg",
  } as any);

  const response =
    await fetch(
      `${API_URL}/generate-caption`,
      {
        method: "POST",
        headers: {
          Authorization:
            `Bearer ${token}`
        },
        body: formData,
      }
    );

  const result =
    await response.json();

  return result;
};
