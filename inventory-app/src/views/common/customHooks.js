export const validateData = async (input, API) => {
  let result = [];
  try {
    let response = await fetch(API, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    let json = await response.json();
    let rs = await json.error.details;
    rs.forEach((item, i) => (result[i] = item.message));
    return result;
  } catch (error) {
    console.log("error", error.message);
    return null;
  }
};

export const saveData = async (input, API) => {
  try {
    // const button = JSON.stringify(input.button);
    // input.button = button;
    console.log("input", input);
    console.log("stringified", JSON.stringify(input));
    let response = await fetch(API, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": "form-data",
      },
      body: JSON.stringify(input),
    });
    return await readResponse(response);
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getData = async (API) => {
  const response = await fetch(API);
  return await readResponse(response);
};

const readResponse = async (response) => {
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.toString().indexOf("json") >= 0) {
    return response.json();
  } else if (contentType.toString().indexOf("text") >= 0) {
    return await response.text();
  }
};

export const setErrorMessage = (id, message) => {
  document.getElementById(id).innerHTML = message;
};

export const collectFormData = (e, formData, setFormData) => {
  const { id, value } = e.target;
  console.log(id, value);
  let data = formData;
  data[id] = value;
  setFormData(data);
};
