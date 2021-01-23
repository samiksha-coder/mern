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
    let response = await fetch(API, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return response.status === 200
      ? await response.json()
      : await response.text();
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
export const setErrorMessage = (id, message) => {
  document.getElementById(id).innerHTML = message;
};
