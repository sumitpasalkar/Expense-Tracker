import axios from "axios";


export const postData= async (formData) => {
    const response = await axios.post("http://localhost/expense_api/api.php", formData);
    return response.data;
}


export const validate = async (formData) => {
    try {
      const response = await axios.post("http://localhost/expense_api/login.php", formData);
      console.log("API Response:", response.data); 
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error);
      throw new Error("Network error or invalid response");
    }
  };

export const expDel = async (id) => {
  const response = await axios.delete("http://localhost/expense_api/delete.php", {
    data: { id },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};


export const fetchProf = async (id)=>{
  const response = await axios.get("http://localhost/expense_api/fetch_profile.php",{params:{id}});
  return response.data;
}

export const upProf = async (formData)=>{
  const response = await axios.post("http://localhost/expense_api/fetch_profile.php",formData);
  return response.data;
}